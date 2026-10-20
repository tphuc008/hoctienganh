/* Shared learning infrastructure: add new content through register(), not index.html routing. */
(function(global){
  "use strict";
  const registry=new Map();
  const routes=new Map();
  const PREFIX="hoctienganh:attempt:v1";
  function register(content){
    if(!content||typeof content.id!=="string"||typeof content.route!=="string"||typeof content.title!=="string")
      throw new Error("Invalid learning content: id, route and title are required");
    if(registry.has(content.id)||routes.has(content.route))throw new Error("Duplicate learning content: "+content.id);
    const item=Object.freeze({...content});
    registry.set(item.id,item);routes.set(item.route,item);
    return item;
  }
  function list(filter={}){
    return [...registry.values()].filter(x=>Object.keys(filter).every(k=>x[k]===filter[k]));
  }
  function resolve(route){return routes.get(route)||null;}
  function renderRoute(route){
    const item=resolve(route);
    if(!item||typeof item.render!=="function")return false;
    item.render();return true;
  }
  function userId(){
    try{
      const s=typeof global.readLearnerSession==="function"?global.readLearnerSession():null;
      return s&&s.user&&s.user.id?String(s.user.id):null;
    }catch(_){return null}
  }
  function draftKey(kind,identity){
    const id=userId();
    if(!id||!kind||!identity)return null;
    return PREFIX+":"+id+":"+encodeURIComponent(kind)+":"+encodeURIComponent(identity);
  }
  function readDraft(kind,identity){
    const key=draftKey(kind,identity);
    if(!key)return null;
    try{const obj=JSON.parse(localStorage.getItem(key)||"null");return obj&&obj.version===1?obj.data:null;}catch(_){return null}
  }
  function writeDraft(kind,identity,data){
    const key=draftKey(kind,identity);
    if(!key)return false;
    try{localStorage.setItem(key,JSON.stringify({version:1,updatedAt:Date.now(),data}));return true}
    catch(e){console.warn("Could not save learning attempt",e);return false}
  }
  function clearDraft(kind,identity){
    const key=draftKey(kind,identity);
    if(key)try{localStorage.removeItem(key)}catch(_){}
  }
  function fingerprint(value){
    // Stable content signature: invalidate stale answer orders if a lesson changes.
    const source=JSON.stringify(value)||"null";
    let hash=2166136261;
    for(let i=0;i<source.length;i++){
      hash^=source.charCodeAt(i);
      hash=Math.imul(hash,16777619);
    }
    return (hash>>>0).toString(36);
  }
  function uuid(){
    if(global.crypto&&typeof crypto.randomUUID==="function")return crypto.randomUUID();
    // RFC4122 compatible fallback for older browsers.
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,c=>{
      const v=Math.floor(Math.random()*16);return (c==="x"?v:(v&3|8)).toString(16);
    });
  }
  function pendingKey(id){return "hoctienganh:pending:v1:"+id}
  function readPending(id){try{return JSON.parse(localStorage.getItem(pendingKey(id))||"{}")||{}}catch(_){return {}}}
  function updatePending(id,submissionId,payload){
    try{
      const all=readPending(id);
      if(payload)all[submissionId]=payload;else delete all[submissionId];
      localStorage.setItem(pendingKey(id),JSON.stringify(all));
    }catch(e){console.warn("Could not persist pending submission",e)}
  }
  async function postPractice(session,payload){
    const resp=await fetch(global.SUPABASE_URL+"/rest/v1/practice_submissions?on_conflict=submission_id",{
      method:"POST",keepalive:true,headers:{
        apikey:global.SUPABASE_KEY,Authorization:"Bearer "+session.access_token,
        "Content-Type":"application/json","Prefer":"resolution=ignore-duplicates,return=minimal"
      },body:JSON.stringify(payload)
    });
    if(!resp.ok)throw new Error("Saving result failed ("+resp.status+")");
  }
  async function submitPractice(data){
    if(!["school","listening","grammar","vocabulary","reading","exam"].includes(data.category))
      throw new Error("Invalid practice category");
    if(!data.slug||!Number.isInteger(data.total)||data.total<1||data.total>200)
      throw new Error("Invalid practice result");
    const owner=userId();
    if(!owner)throw new Error("A learner account is required to save results");
    const submissionId=data.submissionId||uuid();
    const payload={
      submission_id:submissionId,user_id:owner,category:data.category,
      exercise_slug:String(data.slug).slice(0,160),
      correct_answers:Math.max(0,Math.min(data.total,Math.floor(Number(data.correct)||0))),
      total_questions:data.total,
      duration_seconds:Math.max(0,Math.min(14400,Math.round(Number(data.duration)||0))),
      details:data.details||{}
    };
    // Queue before awaiting the network, so a lost connection never discards a finished attempt.
    updatePending(owner,submissionId,payload);
    const session=typeof global.ensureLearnerSession==="function"?await global.ensureLearnerSession():null;
    if(!session||!session.user||!session.access_token||session.user.id!==owner)
      throw new Error("Session unavailable or switched accounts; result queued for retry");
    await postPractice(session,payload);
    updatePending(owner,submissionId,null);
    return submissionId;
  }
  let flushing=false;
  async function flushPending(){
    if(flushing)return;
    const session=typeof global.ensureLearnerSession==="function"?await global.ensureLearnerSession():null;
    if(!session?.user?.id||!session.access_token)return;
    flushing=true;
    try{
      const all=readPending(session.user.id);
      for(const [submissionId,payload] of Object.entries(all)){
        try{
          if(payload.user_id!==session.user.id)continue;
          await postPractice(session,payload);
          updatePending(session.user.id,submissionId,null);
        }catch(e){console.warn("Pending result not yet synced",e)}
      }
    }finally{flushing=false}
  }
  // Generic Listening state adapter: same persistence behavior for any video/category.
  function attachListening(opts){
    const {id,parts,state,prefix,panelId,readAnswer,restoreSubmitted,restoreAnswers,updateProgress}=opts;
    const owner=userId();
    const sourceHash=fingerprint(parts);
    const existing=readDraft("listening",id)||{};
    const snapshot=existing.__sourceHash===sourceHash?existing:{};
    function persist(){
      if(!owner||userId()!==owner)return;
      const saved={};
      parts.forEach(part=>{
        const answers={};
        const panel=document.getElementById(panelId);
        const old=readDraft("listening",id)?.[part.id]?.answers||{};
        part.questions.forEach(q=>{answers[q.id]=panel&&panel.isConnected?readAnswer(part,q):(old[q.id]||"")});
        const st=state[part.id];
        saved[part.id]={answers,submitted:!!st.submitted,answersVisible:!!st.answersVisible,
          startedAt:st.startedAt,submissionId:st.submissionId||null,
          remoteSaved:!!st.remoteSaved,activityTracked:!!st.activityTracked};
      });
      saved.__sourceHash=sourceHash;
      writeDraft("listening",id,saved);
    }
    parts.forEach(part=>{
      const previous=snapshot[part.id];
      if(!previous||typeof previous!=="object")return;
      state[part.id].startedAt=Number(previous.startedAt)||Date.now();
      state[part.id].submissionId=previous.submissionId||null;
      state[part.id].remoteSaved=!!previous.remoteSaved;
      state[part.id].activityTracked=!!previous.activityTracked;
      part.questions.forEach(q=>{
        const value=String(previous.answers?.[q.id]||"");
        if(q.type==="mc"){
          document.querySelectorAll('input[name="'+prefix+'-p'+part.id+'-q-'+q.id+'"]').forEach(x=>{x.checked=x.value===value});
        }else{
          const input=document.getElementById(prefix+"-p"+part.id+"-input-"+q.id);
          if(input)input.value=value;
        }
      });
      updateProgress(part.id);
      if(previous.submitted){
        restoreSubmitted(part.id,true);
        if(previous.answersVisible)restoreAnswers(part.id,true);
      }
    });
    const panel=document.getElementById(panelId);
    if(panel){
      panel.addEventListener("input",persist);
      panel.addEventListener("change",persist);
    }
    return persist;
  }
  global.LearningCore=Object.freeze({
    register,list,resolve,renderRoute,userId,draftKey,readDraft,writeDraft,clearDraft,uuid,fingerprint,submitPractice,flushPending,attachListening
  });
})(window);
