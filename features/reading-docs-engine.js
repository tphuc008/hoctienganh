/* Smart Reading Engine V2: user-supplied passage and Google Docs-authored explanations. */
(function(global){
"use strict";
let lesson=null,state=null,timer=null,selection=null;
const ROOT="mis-reading-root";
const $=id=>document.getElementById(id);
const h=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const normalize=s=>String(s==null?"":s).trim().toLocaleLowerCase("en").replace(/\s+/g," ").replace(/[\u2018\u2019]/g,"'");
const uid=()=>typeof readLearnerSession==="function"?readLearnerSession()?.user?.id:null;
const key=()=>uid()&&lesson?"reading-docs-v2-"+lesson.slug+"-"+uid():null;
const limit=()=>60*(lesson?.minutes||20);
const count=()=>lesson?.questions.reduce((n,q)=>n+(q.type==="choose2"?2:1),0)||0;
const slotIds=q=>q.type==="choose2"?q.ids:[q.id];
const completedQ=q=>q.type==="choose2"?Math.min(2,(state.answers[q.id]||[]).length):normalize(state.answers[q.id])?1:0;
const completed=()=>lesson.questions.reduce((n,q)=>n+completedQ(q),0);
const cleanAnswer=(q,x)=>q.type==="input"?normalize(x):String(x||"").trim().toUpperCase();
const singleCorrect=q=>{
 const actual=cleanAnswer(q,state.answers[q.id]),accepted=[q.answer,...(q.accept||[])].map(x=>cleanAnswer(q,x));
 return accepted.includes(actual);
};
const points=q=>q.type==="choose2"?(state.answers[q.id]||[]).filter(x=>q.answer.includes(x)).length:(singleCorrect(q)?1:0);
const score=()=>lesson.questions.reduce((n,q)=>n+points(q),0);
const left=()=>Math.max(0,Math.ceil((state.startedAt+limit()*1000-Date.now())/1000));
const formatTime=s=>String(Math.floor(Math.max(0,s)/60)).padStart(2,"0")+":"+String(Math.floor(Math.max(0,s)%60)).padStart(2,"0");
function newId(){return global.crypto?.randomUUID?.()||"reading-"+Date.now()+"-"+Math.random().toString(36).slice(2)}
function read(){try{return key()?JSON.parse(localStorage.getItem(key())||"null"):null}catch(_){return null}}
function save(){
 try{if(key())localStorage.setItem(key(),JSON.stringify(state))}catch(_){}
 if(state&&global.LearningCore?.userId?.()&&global.LearningFlow?.track)
   LearningFlow.track({category:"reading",slug:lesson.route,started:true,startedAt:state.startedAt,done:completed(),total:count(),completed:!!state.submitted,mode:"submit"});
}
function fresh(){return {startedAt:Date.now(),submitted:false,submittedAt:null,answers:{},highlights:[],focus:lesson.questions[0].id,mobileTab:"reading",split:52,submissionId:newId(),saved:false}}
function stop(){if(timer){clearInterval(timer);timer=null}}
function tick(){if(!state||!$("mis-clock"))return;
 const s=left();$("mis-clock").textContent=state.submitted?formatTime((state.submittedAt-state.startedAt)/1000):formatTime(s);
 $("mis-clock").classList.toggle("warning",!state.submitted&&s<121);
 if(!s&&!state.submitted)submit(true);
}
function start(reset){
 const old=read();if(reset&&old&&!old.submitted&&!confirm("Làm lại và xóa tiến độ hiện tại?"))return;
 if(reset)global.LearningFlow?.reset?.("reading",lesson.route);
 state=reset||!old?fresh():old;state.saving=false;state.highlights=state.highlights||[];state.answers=state.answers||{};save();render();
}
function exitPage(){if(state&&!state.submitted&&!confirm("Thoát bài? Câu trả lời và thời gian đang làm được giữ lại."))return;location.hash="grade-12/reading"}
function switchTab(tab){if(!state||!$("mis-app"))return;
 state.mobileTab=tab==="reading"?"reading":"questions";$("mis-app").dataset.tab=state.mobileTab;
 document.querySelectorAll(".mis-mobile-switch button").forEach(b=>b.classList.toggle("active",b.dataset.tab===state.mobileTab));save();
}

function renderMarked(str,p){
 const marks=(state.highlights||[]).filter(x=>x.p===p).map(x=>{
  const start=Number.isInteger(x.start)?x.start:str.indexOf(x.text);
  return {a:start,b:start+String(x.text||"").length,k:"user"};
 }).filter(x=>x.a>=0&&x.b<=str.length&&x.b>x.a);
 if(state.submitted){
  const q=lesson.questions.find(x=>x.id===Number(state.focus));
  // Anchors were verified against the exact original passage during import.
  if(q)for(const anchor of q.anchors||[{p:q.p,quote:q.quote}]){
   if(anchor.p!==p||!anchor.quote)continue;
   const start=str.indexOf(anchor.quote);
   if(start>=0)marks.push({a:start,b:start+anchor.quote.length,k:"evidence"});
  }
 }
 if(!marks.length)return h(str);
 const flags=new Uint8Array(str.length);
 marks.filter(x=>x.k==="user").forEach(x=>{for(let i=x.a;i<x.b;i++)flags[i]=1});
 marks.filter(x=>x.k==="evidence").forEach(x=>{for(let i=x.a;i<x.b;i++)flags[i]=2});
 let out="",start=0,k=flags[0]||0;
 for(let i=1;i<=str.length;i++){const nk=i===str.length?-1:flags[i]||0;
  if(nk!==k){const part=h(str.slice(start,i));
   out+=k===2?'<mark class="mis-evidence" data-evidence-p="'+p+'">'+part+'</mark>':k===1?'<mark>'+part+'</mark>':part;
   start=i;k=nk;
  }
 }
 return out;
}

function passageHTML(){
 return '<div class="mis-kicker">IELTS Academic Reading · '+h(lesson.level||"Reading")+'</div>'+
  '<h1 class="mis-passage-title">'+h(lesson.title)+'</h1>'+
  '<div class="mis-passage-sub">'+h(lesson.subtitle||"")+" · "+lesson.paragraphs.length+' đoạn văn</div>'+
  '<div class="mis-reading-tools"><button onclick="smartReadingHighlight()">✎ Highlight</button><button onclick="smartReadingDictionary()">⚑ Tra từ (Cambridge)</button></div>'+
  '<p id="mis-selection-status" class="mis-selection-status">Bôi đen một từ hoặc cụm từ trong bài đọc để đánh dấu hoặc tra nghĩa.</p>'+
  lesson.paragraphs.map((p,i)=>'<p class="mis-paragraph" id="mis-p-'+i+'" data-p="'+i+'"><strong>'+String(i+1)+'.</strong> '+renderMarked(p,i)+'</p>').join("");
}
function options(q){if(q.type==="ynng")return ["YES","NO","NOT GIVEN"].map(key=>({key,text:""}));if(q.type==="tfng")return ["TRUE","FALSE","NOT GIVEN"].map(key=>({key,text:""}));return q.options||lesson.banks?.[q.bank]||[]}
function choiceHTML(q){
 const isTwo=q.type==="choose2",terse=["bank","match","heading","ending"].includes(q.type),chosen=isTwo?(state.answers[q.id]||[]):[state.answers[q.id]];
 return '<div class="mis-options'+(isTwo?" mis-multi-options":"")+'" role="group" aria-label="Câu '+h(slotIds(q).join("–"))+'">'+options(q).map(o=>{
 const active=chosen.includes(o.key),correct=state.submitted&&(isTwo?q.answer.includes(o.key):q.answer===o.key);
 const wrong=state.submitted&&active&&!correct;
 return '<button type="button" class="mis-option'+(correct?" mis-answer-correct":"")+(wrong?" mis-answer-wrong":"")+
 '" aria-pressed="'+active+'" data-option="'+h(o.key)+'" '+(state.submitted?"disabled":"")+' onclick="smartReadingChoose('+q.id+',\''+h(o.key)+'\')">'+
 '<strong>'+h(o.key)+'</strong>'+(o.text&&!terse?' <span class="mis-option-text">'+h(o.text)+'</span>':"")+'</button>';
 }).join("")+'</div>'+(isTwo?'<div class="mis-selection-status">'+chosen.length+'/2 lựa chọn</div>':"");
}

function docInline(value){
 // Preserve the author's characters; only add semantic emphasis.
 return h(value).replace(/(“[^”]+”|‘[^’]+’)/g,'<span class="mis-doc-inline-quote">$1</span>');
}
function docParagraphs(value){
 const source=String(value||""),paragraphs=[];
 for(const block of source.split(/\n{2,}/)){
  const sentences=block.replace(/([.!?][”’"]?)([ \t]+)(?=[A-ZÀ-Ỹ“])/gu,"$1\u0000$2").split("\u0000");
  let current="";
  for(const raw of sentences){
   const sentence=raw.trim();if(!sentence)continue;
   if(current&&current.length+sentence.length>255){paragraphs.push(current);current=sentence}
   else current+=(current?" ":"")+sentence;
  }
  if(current)paragraphs.push(current);
 }
 return paragraphs.map(text=>'<p>'+docInline(text)+'</p>').join("");
}
function docProse(value){
 const source=String(value||"");
 // Quote and immediately attached punctuation move together into a source card.
 const quote=/(“[^”]{75,}”[.!?,;:]?|"[^"]{75,}"[.!?,;:]?)/g;
 let cursor=0,out="",match;
 while((match=quote.exec(source))){
  out+=docParagraphs(source.slice(cursor,match.index));
  out+='<blockquote class="mis-doc-source-quote">'+h(match[0])+'</blockquote>';
  cursor=match.index+match[0].length;
 }
 return out+docParagraphs(source.slice(cursor));
}
function explanation(q){
 if(!state.submitted)return "";
 const e=q.explain||{},correct=points(q)===(q.type==="choose2"?2:1);
 const answer=Array.isArray(q.answer)?q.answer.join(" + "):q.answer;
 const current=q.type==="choose2"?(state.answers[q.id]||[]).join(", "):state.answers[q.id]||"(chưa trả lời)";
 const steps=[
  ["01","Hiểu câu chuyện / logic",e.logic,"logic"],
  ["02","Bằng chứng & paraphrase",e.evidence,"evidence"],
  ["03","Phân tích đáp án sai / bẫy",e.traps,"traps"]
 ];
 const cards=steps.map(([num,title,body,kind])=>
  '<section class="mis-doc-card mis-doc-card--'+kind+'" aria-labelledby="mis-doc-title-'+q.id+'-'+num+'">'+
   '<div class="mis-doc-card-heading"><span class="mis-doc-index">'+num+'</span>'+
    '<h4 id="mis-doc-title-'+q.id+'-'+num+'">'+h(title)+'</h4></div>'+
   '<div class="mis-doc-prose">'+docProse(body)+'</div>'+
   (kind==="evidence"?'<button type="button" class="mis-tool mis-evidence-link" onclick="smartReadingEvidence('+q.id+')">⌖ Trỏ đến dẫn chứng trong bài đọc</button>':"")+
  '</section>').join("");
 const notice=q.editorialNote?
  '<p class="mis-doc-warning"><strong>Ghi chú đối chiếu:</strong> '+h(q.editorialNote)+'</p>':"";
 return '<div class="mis-review'+(correct?"":" wrong")+' mis-doc-exp mis-doc-layout-cards">'+
  '<div class="mis-doc-result"><div class="mis-doc-status"><span class="mis-doc-small">Câu '+q.id+' · '+(correct?"Chính xác":"Chưa chính xác")+'</span>'+
   '<strong>Đáp án: '+h(answer)+'</strong></div>'+
   '<div class="mis-doc-picked">Bạn chọn: <strong>'+h(current)+'</strong></div></div>'+
  (e.heading?'<h3 class="mis-doc-summary">'+h(e.heading.replace(/^Câu\s+\d+\s*[—–-]\s*[^|]*\|\s*/,""))+'</h3>':"")+
  '<div class="mis-doc-cards">'+cards+'</div>'+notice+'</div>';
}
function questionHTML(q){
 const ids=slotIds(q),input=q.type==="input",chosen=state.answers[q.id]||"";
 return '<article class="mis-q-card" id="mis-q-'+q.id+'"><p class="mis-question-text"><span class="mis-num">'+ids.join("–")+'</span> '+h(q.question)+'</p>'+
 (input?'<div class="mis-flow-row"><label for="mis-in-'+q.id+'">Answer</label><input class="mis-input" id="mis-in-'+q.id+'" autocomplete="off" spellcheck="false" maxlength="100" value="'+h(chosen)+'" placeholder="'+h(q.rule||"ONE WORD ONLY")+'" '+(state.submitted?"disabled":"")+' oninput="smartReadingInput('+q.id+',this.value)"></div>':choiceHTML(q))+
 explanation(q)+'</article>';
}
function questionsHTML(){
 const result=state.submitted?'<div class="mis-results-banner"><strong>'+score()+'/'+count()+' câu đúng</strong><div>Thời gian: '+formatTime((state.submittedAt-state.startedAt)/1000)+' · Chọn số câu để đối chiếu dẫn chứng.</div></div>':"";
 return result+lesson.groups.map(g=>'<section class="mis-q-section"><h2>Questions '+h(g.label)+'</h2><p class="mis-q-instruction">'+h(g.instruction)+'</p>'+
 (g.bank&&g.bank!=="paragraphs"?'<div class="mis-answer-bank">'+(lesson.banks[g.bank]||[]).map(o=>'<p><strong>'+h(o.key)+'</strong> '+h(o.text)+'</p>').join("")+'</div>':"")+
 g.ids.map(id=>lesson.questions.find(q=>q.id===id)).filter(Boolean).map(questionHTML).join("")+'</section>').join("");
}
function navHTML(){return lesson.questions.flatMap(q=>slotIds(q)).map(id=>'<button id="mis-nav-'+id+'" class="mis-jump" onclick="smartReadingGo('+id+')" aria-label="Đến câu '+id+'">'+id+'</button>').join("")}
function paint(){
 if(!$("mis-app"))return;
 lesson.questions.forEach(q=>{const ids=slotIds(q);ids.forEach((id,ix)=>{
  const el=$("mis-nav-"+id);if(!el)return;
  let done=completedQ(q)>= (q.type==="choose2"?2:1);
  let good=points(q)===(q.type==="choose2"?2:1);
  if(q.type==="choose2"&&state.submitted){const selected=state.answers[q.id]||[];good=q.answer.includes(selected[ix])}
  el.className="mis-jump"+(state.submitted?(good?" right":" wrong"):(done?" done":""))+(Number(state.focus)===q.id?" focused":"");
 })});
 $("mis-status").innerHTML=state.submitted?'<strong>'+score()+'/'+count()+'</strong> câu đúng':'<strong>'+completed()+'/'+count()+'</strong> đã làm';
 global.LearningFlow?.paint?.($("readingFlowStatus"),{started:true,done:completed(),total:count(),completed:!!state.submitted,mode:"submit"});
}
function capture(){
 const sel=window.getSelection?.();if(!sel||sel.isCollapsed||!sel.rangeCount)return;
 const range=sel.getRangeAt(0),root=range.commonAncestorContainer.nodeType===1?range.commonAncestorContainer:range.commonAncestorContainer.parentElement;
 const para=root?.closest?.(".mis-paragraph");if(!para)return;
 const raw=range.toString(),text=raw.trim();if(!text||text.length>500)return;
 const pre=range.cloneRange();pre.selectNodeContents(para);pre.setEnd(range.startContainer,range.startOffset);
 const start=pre.toString().length-3+(raw.length-raw.trimStart().length);const p=Number(para.dataset.p);
 if(start<0||lesson.paragraphs[p]?.slice(start,start+text.length)!==text)return;
 selection={p,text,start,end:start+text.length};
 if($("mis-selection-status"))$("mis-selection-status").textContent="Đã chọn: “"+text.slice(0,72)+"”";
}
function highlight(){
 if(!selection){alert("Hãy bôi đen chữ trong bài đọc trước.");return}
 const existing=state.highlights||[];if(!existing.some(x=>x.p===selection.p&&x.start===selection.start&&x.end===selection.end))existing.push(selection);
 state.highlights=existing;save();
 const pane=$("mis-passage-pane"),pos=pane.scrollTop;pane.innerHTML=passageHTML();pane.scrollTop=pos;attachSelection();
}
function dictionary(){
 if(!selection){alert("Hãy chọn từ/cụm từ trước.");return}
 window.open("https://dictionary.cambridge.org/dictionary/english/"+encodeURIComponent(selection.text.trim().split(/\s+/).slice(0,5).join(" ")),"_blank","noopener,noreferrer")
}
function attachSelection(){const pane=$("mis-passage-pane");pane?.addEventListener("mouseup",capture);pane?.addEventListener("keyup",capture)}
function setInput(id,value){
 if(state.submitted)return;
 const q=lesson.questions.find(x=>x.id===Number(id)),max=Number(q.maxWords||1);
 state.answers[id]=value;state.focus=id;const el=$("mis-in-"+id);
 el?.classList.toggle("error",normalize(value).split(" ").filter(Boolean).length>max);save();paint();
}
function choose(id,letter){
 if(state.submitted)return;
 const q=lesson.questions.find(x=>x.id===Number(id));
 if(q.type==="choose2"){
  let a=[...(state.answers[id]||[])],ix=a.indexOf(letter);
  if(ix>=0)a.splice(ix,1);else if(a.length<2)a.push(letter);
  state.answers[id]=a;
 }else state.answers[id]=letter;
 state.focus=id;save();
 const card=$("mis-q-"+id),opts=card?.querySelector(".mis-options");
 if(opts){
  if(q.type==="choose2"&&opts.nextElementSibling?.classList.contains("mis-selection-status"))
    opts.nextElementSibling.remove();
  opts.outerHTML=choiceHTML(q);
 }

 paint();
}

function go(id,showEvidence){
 const q=lesson.questions.find(x=>slotIds(x).includes(Number(id)));if(!q)return;
 state.focus=q.id;save();
 if(window.innerWidth<=730)switchTab(showEvidence?"reading":"questions");
 paint();
 if(!showEvidence)$("mis-q-"+q.id)?.scrollIntoView({behavior:MotionCore.scrollBehavior(),block:"start"});
 if(state.submitted){
  const pane=$("mis-passage-pane");
  if(pane){
   // Restore the user's reading position on normal navigation; only an explicit
   // evidence action is allowed to scroll the reading pane.
   const before=pane.scrollTop;
   pane.innerHTML=passageHTML();attachSelection();
   pane.scrollTop=before;
   if(showEvidence){
    const target=pane.querySelector(".mis-evidence");
    if(target){
     const box=target.getBoundingClientRect(),host=pane.getBoundingClientRect();
     const top=pane.scrollTop+box.top-host.top-Math.max(70,host.height*.24);
     pane.scrollTo({top:Math.max(0,top),behavior:MotionCore.scrollBehavior()});
    }else{
     const status=$("mis-selection-status");
     if(status)status.textContent="Dẫn chứng chưa được định vị chính xác; vui lòng kiểm tra lời giải.";
    }
   }
  }
 }
}
function setupDivider(){
 const handle=$("mis-divider"),layout=$("mis-layout");if(!handle||!layout)return;
 handle.addEventListener("pointerdown",e=>{
  if(innerWidth<=730)return;e.preventDefault();handle.setPointerCapture(e.pointerId);
  const move=ev=>{if(!handle.hasPointerCapture(ev.pointerId))return;
   const ratio=Math.max(32,Math.min(68,Math.round((ev.clientX-layout.getBoundingClientRect().left)/layout.clientWidth*100)));
   state.split=ratio;layout.style.gridTemplateColumns="minmax(320px,"+ratio+"fr) 8px minmax(320px,"+(100-ratio)+"fr)";
  };
  const up=()=>{save();handle.removeEventListener("pointermove",move);handle.removeEventListener("pointerup",up);handle.removeEventListener("pointercancel",up)};
  handle.addEventListener("pointermove",move);handle.addEventListener("pointerup",up);handle.addEventListener("pointercancel",up);
 });
}
async function persist(){
 if(!state?.submitted||state.saved||state.saving)return;
 state.saving=true;save();
 try{
  const auth=typeof readLearnerSession==="function"?readLearnerSession():null;
  if(!auth?.access_token||!auth?.user?.id)throw Error("Cần đăng nhập để lưu kết quả");
  const url=global.SUPABASE_URL||"https://ouicitkpfukterkilqzu.supabase.co";
  const api=global.SUPABASE_KEY||"sb_publishable_JI7CbbcaNM_3NJOr81qODg_yemK8QJ2";
  if(!url||!api)throw Error("Cấu hình lưu kết quả không khả dụng");
  const meta=auth.user.user_metadata||{},answers={};
  lesson.questions.forEach(q=>{
   if(q.type==="choose2"){
    const selected=[...(state.answers[q.id]||[])];
    q.ids.forEach((id,i)=>{const answer=selected[i]||"";
     answers[id]={answer,correct_answer:q.answer.join(" / ")+" (any order)",is_correct:q.answer.includes(answer),question_type:q.type};
    });
   }else{
    answers[q.id]={answer:state.answers[q.id]??"",correct_answer:q.answer,is_correct:singleCorrect(q),question_type:q.type};
   }
  });
  const payload={submission_id:state.submissionId,user_id:auth.user.id,
   username:String(meta.username||"").slice(0,24),display_name:String(meta.display_name||meta.username||"Học viên").slice(0,40),
   exercise_slug:lesson.route,exercise_title:lesson.title,score:score(),total_questions:count(),answers,
   duration_seconds:Math.max(1,Math.min(limit(),Math.round((state.submittedAt-state.startedAt)/1000))),
   submission_type:state.submissionType||"manual",started_at:new Date(state.startedAt).toISOString(),submitted_at:new Date(state.submittedAt).toISOString()};
  const res=await fetch(url+"/rest/v1/reading_submissions?on_conflict=submission_id",{method:"POST",headers:{"apikey":api,"Authorization":"Bearer "+auth.access_token,"Content-Type":"application/json","Prefer":"resolution=ignore-duplicates,return=minimal"},body:JSON.stringify(payload)});
  if(!res.ok)throw Error("HTTP "+res.status);
  state.saved=true;state.saving=false;save();const status=$("mis-save-status");if(status)status.textContent="Đã lưu ✓";
 }catch(err){state.saving=false;state.saveError=String(err?.message||err);save();const status=$("mis-save-status");if(status)status.textContent="Chưa lưu · bấm Lưu lại"}
}
function submit(auto){
 if(state.submitted)return;
 const invalid=lesson.questions.filter(q=>q.type==="input"&&normalize(state.answers[q.id]).split(" ").filter(Boolean).length>Number(q.maxWords||1));
 if(invalid.length&&!auto){alert("Vượt giới hạn từ ở câu "+invalid.map(x=>x.id).join(", "));return}
 if(!auto&&!confirm("Nộp bài? "+Math.max(0,count()-completed())+" câu chưa làm. Đáp án và lời giải sẽ được mở sau khi nộp."))return;
 state.submitted=true;state.submittedAt=auto?state.startedAt+limit()*1000:Date.now();state.focus=lesson.questions[0].id;
 state.submissionType=auto?"timeout":"manual";save();render();persist();
 global.LearningCore?.submitPractice?.({category:"reading",slug:lesson.route,correct:score(),total:count(),duration:Math.max(1,Math.min(limit(),Math.round((state.submittedAt-state.startedAt)/1000))),submissionId:state.submissionId,details:{submissionType:state.submissionType}})?.catch?.(err=>console.warn("Reading sync queued",err));
}
function render(){
 stop();selection=null;document.body.classList.add("mis-reading-mode");
 const page=$("pageMount");if(page)page.style.display="none";
 let mount=$(ROOT);if(!mount){mount=document.createElement("div");mount.id=ROOT;document.body.appendChild(mount)}
 mount.innerHTML='<div id="mis-app" class="mis-app" data-tab="'+h(state.mobileTab||"reading")+'">'+
 '<header class="mis-topbar"><div class="mis-top-left"><button class="mis-exit" aria-label="Thoát" onclick="smartReadingExit()">×</button><div><div class="mis-title">'+h(lesson.title)+'</div><div class="mis-subtitle">IELTS Academic Reading · '+count()+' questions</div></div></div>'+
 '<div class="mis-top-mid"><span id="mis-clock" class="mis-clock">'+formatTime(limit())+'</span><span class="mis-score-mini" id="mis-status"></span><span id="readingFlowStatus"></span><span id="mis-save-status" class="mis-save-status"></span></div>'+
 '<div class="mis-top-actions">'+(state.submitted?'<button class="mis-submit" onclick="smartReadingStart(true)">Làm lại ↻</button><button class="mis-tool" onclick="smartReadingSave()">Lưu lại</button>':'<button class="mis-submit" onclick="smartReadingSubmit(false)">Nộp bài →</button>')+'</div></header>'+
 '<div class="mis-mobile-switch"><button data-tab="reading" class="'+(state.mobileTab==="reading"?"active":"")+'" onclick="smartReadingTab(\'reading\')">Bài đọc</button><button data-tab="questions" class="'+(state.mobileTab==="questions"?"active":"")+'" onclick="smartReadingTab(\'questions\')">Câu hỏi</button></div>'+
 '<div class="mis-workspace" id="mis-layout" style="grid-template-columns:minmax(320px,'+Number(state.split||52)+'fr) 8px minmax(320px,'+(100-Number(state.split||52))+'fr)">'+
 '<div class="mis-left" id="mis-passage-pane">'+passageHTML()+'</div><div class="mis-divider" id="mis-divider" role="separator" aria-orientation="vertical"></div>'+
 '<div class="mis-right" id="mis-question-pane">'+questionsHTML()+'</div></div>'+
 '<footer class="mis-bottom"><div class="mis-progress-grid">'+navHTML()+'</div><div class="mis-bottom-actions"><button class="mis-footer-btn" onclick="'+(state.submitted?"smartReadingStart(true)":"smartReadingSubmit(false)")+'">'+(state.submitted?"Làm lại":"Nộp bài")+'</button></div></footer></div>';
 attachSelection();setupDivider();paint();tick();
 if(!state.submitted)timer=setInterval(tick,800);
 if(state.submitted&&!state.saved){state.saving=false;persist()}
}
function landing(slug){
 lesson=global.SMART_READING_BANK?.[slug];if(!lesson)throw Error("Reading lesson not found: "+slug);
 stop();document.body.classList.remove("mis-reading-mode");$(ROOT)?.remove();
 const mount=$("pageMount");if(!mount)return;mount.style.display="block";
 const saved=read(),title=h(lesson.title);
 mount.innerHTML='<div class="breadcrumbs"><button class="crumb-btn" onclick="location.hash=\'grade-12/reading\'">Reading</button><span>›</span><span>'+title+'</span></div>'+
 '<div class="exercise-intro"><div class="eyebrow">IELTS-style · Reading Practice</div><h1>'+title+'</h1>'+
 '<p>'+count()+' câu · '+h(lesson.minutes)+' phút · '+h(lesson.types)+'</p>'+
 '<p>Bài đọc và câu hỏi được nhập từ PDF bạn cung cấp; giải thích chi tiết lấy từ Google Docs. Trỏ dẫn chứng, highlight và tra từ hoạt động như Robots and us. Đáp án và lời giải xuất hiện sau khi nộp.</p>'+
 ''+
 '<button class="primary" onclick="smartReadingStart(false)">'+(saved?.startedAt?(saved.submitted?"Xem kết quả đã lưu →":"Tiếp tục bài đang làm →"):"Bắt đầu làm bài →")+'</button></div>';
}
function destroy(){stop();document.body.classList.remove("mis-reading-mode");$(ROOT)?.remove()}
global.renderSmartReadingExercise=landing;
global.destroySmartReading=destroy;
global.smartReadingStart=start;
global.smartReadingExit=exitPage;
global.smartReadingTab=switchTab;
global.smartReadingHighlight=highlight;
global.smartReadingDictionary=dictionary;
global.smartReadingChoose=choose;
global.smartReadingInput=setInput;
global.smartReadingGo=id=>go(id,false);
global.smartReadingEvidence=id=>go(id,true);
global.smartReadingSubmit=submit;
global.smartReadingSave=persist;

global.getSmartReadingPrintData=function(slug){
 const d=global.SMART_READING_BANK?.[slug||lesson?.slug];if(!d)return null;
 const passage=d.paragraphs.map((p,i)=>(i+1)+". "+p).join("\n\n");
 const groups=d.groups.map((g,i)=>({
  label:"Questions "+g.label,instruction:g.instruction,passage:i===0?passage:"",
  answerBank:g.bank?(d.banks?.[g.bank]||[]):[],
  questions:g.ids.map(id=>d.questions.find(q=>q.id===id)).filter(Boolean).map(q=>({
   number:q.id,prompt:q.question,
   options:q.type==="mcq"?(q.options||[]).map(o=>o.text):[],
   answer:q.answer,shortAnswer:q.answer,
   details:[
    {title:"01. Hiểu câu chuyện / logic",text:q.explain?.logic||""},
    {title:"02. Bằng chứng & paraphrase",text:q.explain?.evidence||""},
    {title:"03. Phân tích đáp án sai / bẫy",text:q.explain?.traps||""},
    ...(q.editorialNote?[{title:"Ghi chú biên tập",text:q.editorialNote}]:[])
   ]
  }))
 }));
 return {title:d.title,groups};
};

})(window);
