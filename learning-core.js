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
  function uuid(){
    if(global.crypto&&typeof crypto.randomUUID==="function")return crypto.randomUUID();
    // RFC4122 compatible fallback for older browsers.
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,c=>{
      const v=Math.floor(Math.random()*16);return (c==="x"?v:(v&3|8)).toString(16);
    });
  }
  async function submitPractice(data){
    if(!["school","listening","grammar","vocabulary","reading"].includes(data.category))throw new Error("Invalid practice category");
    if(!data.slug||!Number.isInteger(data.total)||data.total<1||data.total>200)throw new Error("Invalid practice result");
    const correct=Math.max(0,Math.min(data.total,Number(data.correct)||0));
    const duration=Math.max(0,Math.min(14400,Math.round(Number(data.duration)||0)));
    const session=typeof global.ensureLearnerSession==="function"?await global.ensureLearnerSession():null;
    if(!session||!session.user||!session.access_token)throw new Error("Please sign in again before saving your score");
    const submissionId=data.submissionId||uuid();
    const payload={
      submission_id:submissionId,user_id:session.user.id,category:data.category,
      exercise_slug:String(data.slug).slice(0,160),correct_answers:correct,
      total_questions:data.total,duration_seconds:duration,
      details:data.details||{}
    };
    const resp=await fetch(global.SUPABASE_URL+"/rest/v1/practice_submissions?on_conflict=submission_id",{
      method:"POST",keepalive:true,headers:{
        apikey:global.SUPABASE_KEY,Authorization:"Bearer "+session.access_token,
        "Content-Type":"application/json","Prefer":"resolution=ignore-duplicates,return=minimal"
      },body:JSON.stringify(payload)
    });
    if(!resp.ok)throw new Error("Saving result failed ("+resp.status+")");
    return submissionId;
  }
  global.LearningCore=Object.freeze({
    register,list,resolve,renderRoute,userId,draftKey,readDraft,writeDraft,clearDraft,uuid,submitPractice
  });
})(window);
