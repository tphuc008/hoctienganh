/* Common A4 printing for the public exercise engines; Unit 7's protected handout retains its own printer. */
(function(global){
"use strict";
const A="ABCDEFGHIJKLMNOPQRSTUVWXYZ",host=document.createElement("div");
host.id="printCenter";host.hidden=true;
const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const multiline=s=>esc(s).replace(/\n/g,"<br>");
const hash=()=>location.hash.replace(/^#/,"");
function listeningData(type){
 const arr=type==="news"?global.LISTENING_NEWS_PARTS:global.LISTENING_ENTERTAINMENT_PARTS;
 if(!Array.isArray(arr))return null;
 return {title:type==="news"?"Listening · AI Safety Interview":"Listening · Change Your Life",
 groups:arr.map(p=>({label:p.label+" · "+p.approx,questions:p.questions.map(q=>{
  const short=q.type==="mc"?q.answer:q.answerText||q.answers?.[0]||"";
  const answer=q.type==="mc"?short+". "+(q.options?.[A.indexOf(short)]||""):short;
  return {number:q.id,prompt:q.prompt,options:q.options||[],answer,shortAnswer:short,
   details:[{title:"Nghe lại để kiểm chứng",text:"Mốc audio khoảng "+Math.floor((q.time||0)/60)+":"+String((q.time||0)%60).padStart(2,"0")+". Nghe lại đoạn này và đối chiếu với đáp án."}],
   detailAvailable:false};
 })}))};
}

function schoolFallback(){
 const match=hash().match(/^school\/grade-10\/midterm-1\/set-(\d+)$/);
 const data=global.SCHOOL_G10_MIDTERM1;if(!match||!Array.isArray(data?.items))return null;
 const bounds=[[0,12],[12,27],[27,39],[39,51],[51,66],[66,81],[81,96]];
 const idx=Number(match[1])-1,range=bounds[idx];
 if(!range)return null;
 return {title:"Lớp 10 · Ôn tập giữa kì 1 · Set "+(idx+1),
 groups:[{label:"Set "+(idx+1),questions:data.items.slice(...range).map((q,i)=>{
  const info=global.SCHOOL_G10_EXPLANATIONS?.[q.sourceNo]||{};
  const opts=q.kind==="mcq"?q.o||[]:[];
  const short=q.kind==="mcq"?"ABCD"[q.a]:q.answers?.[0]||"";
  return {number:q.sourceNo||i+1,prompt:q.q,context:data.contexts?.[q.ctx]||"",
   options:opts,answer:q.kind==="mcq"?short+". "+String(opts[q.a]||""):short,shortAnswer:short,
   details:[{title:"Khái niệm",text:info.concept||q.note||""},
    {title:"Vì sao đúng",text:info.why||q.note||""},
    {title:"Cấu trúc và cách dùng",text:info.usage||""},
    {title:"Phân biệt phương án",text:info.contrast||""}].filter(x=>x.text)};
 })}]};
}

function source(){
 const r=hash();
 if(/^grade-12\/lesson-plans\/unit-\d+(?:\/(?:practice|print))?$/.test(r))return {redirect:true};
 if(/^grade-(9|10|12)\/unit-\d+\/vocabulary-practice-\d+$/.test(r)||/^grammar\/[^/]+\/set-\d+$/.test(r))return {get:()=>global.getUniversalVocabPrintData?.()};
 if(/^school\/grade-10\/midterm-1\/set-\d+$/.test(r))return {get:()=>global.getUniversalSchoolPrintData?.()||schoolFallback()};
 if(/^grade-10\/mid-term-test\/test-[3-6]$/.test(r))return {get:()=>global.getUniversalMidtermPrintData?.()};
 if(r==="grade-12/reading/marketing-and-the-information-age")return {get:()=>global.getUniversalMISPrintData?.()};
 if(r==="grade-12/reading/robots-and-us")return {get:()=>global.getUniversalRobotsPrintData?.()};
 if(r==="listening/entertainment/change-your-life-one-tiny-step-at-a-time")return {get:()=>listeningData("entertainment")};
 if(r==="listening/news/former-openai-employee-ai-might-really-kill-us-all")return {get:()=>listeningData("news")};
 return null;
}
let data=null,currentRoute="",requested=false;
function buildControls(){
 host.innerHTML='<button class="pc-toggle" type="button" aria-haspopup="dialog" aria-expanded="false">🖨 In bài tập</button>'+
 '<section class="pc-dialog" role="dialog" aria-label="Tùy chọn in" hidden>'+
 '<div class="pc-head"><b>In bài tập · A4</b><button type="button" class="pc-close" aria-label="Đóng">×</button></div>'+
 '<div class="pc-content"></div>'+
 '<fieldset class="pc-modes"><legend>Định dạng bản in</legend>'+
 '<label><input type="radio" name="pc-format" value="key" checked> Bài tập + đáp án ngắn ở cuối</label>'+
 '<label><input type="radio" name="pc-format" value="detailed"> Bài tập + lời giải chi tiết</label></fieldset>'+
 '<p class="pc-status" role="status"></p><button class="pc-print" type="button">🖨 Mở bản in / Lưu PDF</button></section>';
 document.body.appendChild(host);
 host.querySelector(".pc-toggle").addEventListener("click",()=>{
  const p=source();if(p?.redirect){location.hash="grade-12/lesson-plans/unit-7/print";return;}
  const dialog=host.querySelector(".pc-dialog");dialog.hidden=!dialog.hidden;
  host.querySelector(".pc-toggle").setAttribute("aria-expanded",String(!dialog.hidden));
  if(!dialog.hidden)refresh();
 });
 host.querySelector(".pc-close").addEventListener("click",close);
 host.querySelector(".pc-content").addEventListener("change",validate);
 host.querySelector(".pc-print").addEventListener("click",printSelected);
}
function close(){host.querySelector(".pc-dialog").hidden=true;host.querySelector(".pc-toggle").setAttribute("aria-expanded","false");}
function refresh(){
 try{
  const proposed=source()?.get?.();
  data=proposed&&Array.isArray(proposed.groups)&&proposed.groups.some(g=>g.questions?.length)?proposed:null;
  host.querySelector(".pc-content").innerHTML=data?
   '<p class="pc-title">'+esc(data.title)+'</p>'+
   '<div class="pc-group-list">'+data.groups.map((g,i)=>'<label><input type="checkbox" data-pc-group="'+i+'" checked><span>'+esc(g.label||"Phần "+(i+1))+
   ' <small>('+g.questions.length+' câu)</small></span></label>').join("")+'</div>':
   '<p>Chưa có câu hỏi · Mở bài tập trước khi in.</p>';
 }catch(e){data=null;host.querySelector(".pc-content").textContent="Chưa tải được nội dung để in.";console.warn("Print data unavailable",e);}
 validate();
}
function chosen(){
 if(!data)return [];
 const set=new Set([...host.querySelectorAll("[data-pc-group]:checked")].map(x=>Number(x.dataset.pcGroup)));
 return data.groups.filter((_,i)=>set.has(i)&&Array.isArray(_.questions));
}
function validate(){
 const n=chosen().reduce((sum,g)=>sum+g.questions.length,0);
 host.querySelector(".pc-print").disabled=!n;
 host.querySelector(".pc-status").textContent=n?"Đã chọn "+n+" câu · Mở tab in riêng.":"Chọn ít nhất một phần.";
}
const css=global.PrintDesignSystem.css();

function html(data,groups,mode){
 const design=global.PrintDesignSystem;
 let auto=0,sections=[],keys=[];
 for(const group of groups){
  const questions=Array.isArray(group.questions)?group.questions:[];
  const sharedContext=group.passage||(
    questions.length&&questions[0].context&&questions.every(q=>q.context===questions[0].context)
      ?questions[0].context:"");
  const title=group.label||"Bài tập";
  const listening=/listening|nghe\b/i.test(data.title+" "+title);
  let section='<section class="ep-part"><h2>'+esc(title)+'</h2>';
  if(listening)section+='<p class="ep-listening-note">Bài Listening: sử dụng audio của bài học trên website khi làm đề giấy.</p>';
  if(sharedContext)section+=design.passage(sharedContext);
  let lastContext=sharedContext;
  for(const q of questions){
   const number=q.number==null?++auto:q.number;
   if(q.context&&q.context!==sharedContext&&q.context!==lastContext){
    section+=design.passage(q.context);
   }
   lastContext=q.context||sharedContext;
   const options=Array.isArray(q.options)?q.options:[];
   section+='<article class="ep-question'+(String(q.prompt||"").length>360?' long':'')+'">'+
     '<div class="ep-question-head"><b class="ep-num">'+esc(number)+'.</b>'+
     '<span class="ep-stem">'+design.multiline(q.prompt)+'</span></div>';
   if(options.length===4)section+=design.choices(options);
   else if(options.length) section+='<div class="ep-options long">'+options.map((o,i)=>
     '<div class="ep-option"><b>'+esc(A[i]||String(i+1))+'.</b><span>'+design.multiline(o)+'</span></div>').join("")+'</div>';
   else section+='<div class="ep-answer-line"></div>';
   keys.push('<span><b>'+esc(number)+'.</b> '+esc(q.shortAnswer??q.answer??"—")+'</span>');
   if(mode==="detailed"){
    section+='<div class="ep-detail"><strong>Đáp án: '+esc(q.answer||"—")+'</strong>';
    if(q.detailHtml)section+=q.detailHtml.replace(/class="ev1-details"/g,'class="ev1-details" open').replace(/Xem giải thích chi tiết/g,"Giải thích chi tiết");
    else if(q.details?.length)section+=q.details.map(d=>'<section><h3>'+esc(d.title||"Giải thích")+'</h3><p>'+esc(d.text||"")+'</p></section>').join("");
    else section+='<p class="notice">Chưa có giải chi tiết.</p>';
    if(q.detailAvailable===false)section+='<p class="notice">Chưa có giải chi tiết · Đối chiếu đáp án và nghe lại.</p>';
    section+='</div>';
   }
   section+='</article>';
  }
  sections.push(section+'</section>');
 }
 const keyPage=mode==="key"?'<section class="ep-key-page"><h2>ANSWER KEY · ĐÁP ÁN NGẮN</h2><div class="ep-key-grid">'+keys.join("")+'</div></section>':"";
 return '<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'+
  '<title>'+esc(data.title)+' · Bản in</title><style>'+css+'</style></head><body>'+
  '<div class="toolbar"><p><b>'+esc(data.title)+'</b><br>Đề in khổ A4 · Mỗi dạng bài có bố cục phù hợp.</p>'+
  '<button id="printAgain" type="button">🖨 In / Lưu PDF</button></div>'+
  '<main><div class="ep-paper" data-print-standard="'+design.version+'">'+
  design.header(data.title,mode==="key"?"ĐỀ + ĐÁP ÁN CUỐI":"ĐỀ + GIẢI CHI TIẾT")+
  sections.join("")+keyPage+
  '<footer class="ep-foot">ENGLISH PRACTICE HUB · BẢN IN BÀI TẬP</footer>'+
  '</div></main></body></html>';
}

function printSelected(){
 const groups=chosen();if(!data||!groups.length)return;
 const mode=host.querySelector('input[name="pc-format"]:checked')?.value==="detailed"?"detailed":"key";
 const win=global.open("","_blank");
 if(!win){global.alert("Hãy cho phép website mở tab mới để in.");return;}
 try{
  win.opener=null;win.document.open();win.document.write(html(data,groups,mode));win.document.close();
  win.document.getElementById("printAgain").addEventListener("click",()=>win.print());
  win.focus();
  const go=()=>Promise.resolve(win.document.fonts?.ready).then(()=>{if(!win.closed)win.setTimeout(()=>win.print(),200)});
  if(win.document.readyState==="complete")go();else win.addEventListener("load",go,{once:true});
 }catch(e){win.close();global.alert("Không tạo được bản in · Thử lại.");}
}
let scheduled=false;
function sync(){
 const allow=!!source()&&(!global.readLearnerSession||!!global.readLearnerSession())&&
   !document.getElementById("accessPassInput")&&!document.querySelector(".account-card");
 if(host.hidden===allow)host.hidden=!allow;
 if(hash()!==currentRoute){
  currentRoute=hash();data=null;close();
  const shortMode=host.querySelector('input[name="pc-format"][value="key"]');
  if(shortMode)shortMode.checked=true;
 }
}
function queueSync(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;sync();});}
function boot(){
 buildControls();sync();
 global.addEventListener("hashchange",queueSync);
 const obs=new MutationObserver(queueSync);
 obs.observe(document.getElementById("pageMount")||document.body,{childList:true,subtree:true});
 obs.observe(document.getElementById("quizShell")||document.body,{attributes:true,attributeFilter:["style"]});
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
/* Current quiz questions are the authoritative, already-shuffled attempt.
   Print these exact questions, including contextual passages and full existing explanations. */
window.getUniversalVocabPrintData=function(){
  if(!Array.isArray(activeQuestions)||!activeQuestions.length||!activeBank)return null;
  const id=location.hash.replace(/^#/,"");
  if(!(/^grade-(9|10|12)\/unit-\d+\/vocabulary-practice-\d+$/.test(id)||
      /^grammar\/[^/]+\/set-\d+$/.test(id)))return null;
  const firstContext=String(activeQuestions[0]?.context||"");
  const sharedContext=firstContext&&activeQuestions.every(q=>String(q.context||"")===firstContext)
    ?firstContext:"";
  const name=activeMode==="grammar"?activeBank.title+" · Set "+activeSet:
    "Lớp "+activeGrade+" · "+currentUnitLabel()+" · "+getSetTitle(activeSet);
  return {title:name,groups:[{label:activeMode==="grammar"?"Grammar":"Vocabulary Practice",
    passage:sharedContext,
    questions:activeQuestions.map((q,index)=>{
      const input=q.kind==="input";
      return {number:index+1,prompt:q.q||"",
        context:q.context&&!sharedContext?q.context:"",
        options:input?[]:(Array.isArray(q.o)?q.o:[]),
        answer:correctAnswerText(q),
        shortAnswer:input?correctAnswerText(q):Number.isInteger(q.a)?"ABCD"[q.a]:"—",
        detailHtml:deepFeedback(index)};
    })
  }]};
};
global.UniversalPrint=Object.freeze({source,html});
})(window);
