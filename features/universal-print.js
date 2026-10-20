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
function source(){
 const r=hash();
 if(/^grade-12\/lesson-plans\/unit-\d+(?:\/(?:practice|print))?$/.test(r))return {redirect:true};
 if(/^grade-(9|10|12)\/unit-\d+\/vocabulary-practice-\d+$/.test(r)||/^grammar\/[^/]+\/set-\d+$/.test(r))return {get:()=>global.getUniversalVocabPrintData?.()};
 if(/^school\/grade-10\/midterm-1\/set-\d+$/.test(r))return {get:()=>global.getUniversalSchoolPrintData?.()};
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
   '<p>Chưa có câu hỏi được tải trên trang này. Hãy mở hoặc bắt đầu bài tập trước.</p>';
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
 host.querySelector(".pc-status").textContent=n?"Đã chọn "+n+" câu. Bản in mở ở tab riêng.":"Hãy chọn ít nhất một phần để in.";
}
const css=`
 @page{size:A4;margin:16mm}
 *{box-sizing:border-box}
 body{margin:0;background:#edf4ff;color:#172033;font:10pt/1.55 Arial,"Segoe UI",sans-serif}
 .toolbar{max-width:900px;margin:14px auto;display:flex;align-items:center;justify-content:space-between;gap:14px;padding:10px 18px}
 .toolbar p{margin:0;font-size:10pt;color:#475569}
 .toolbar button{border:0;border-radius:9px;padding:12px 17px;color:white;background:#2563eb;font-weight:800;cursor:pointer}
 main{max-width:900px;margin:0 auto 30px;padding:35px 44px;background:white;box-shadow:0 12px 36px rgba(30,60,120,.1)}
 .topline{display:flex;justify-content:space-between;border-bottom:1px solid #94a3b8;padding-bottom:8px;font-size:9pt;font-weight:bold}
 h1{text-align:center;font-size:19pt;margin:22px 0 4px;line-height:1.3}
 .intro{text-align:center;color:#64748b;font-size:9pt;margin:0 0 26px}
 h2{font-size:12pt;margin:23px 0 14px;padding-bottom:7px;border-bottom:1px solid #94a3b8;break-after:avoid}
 article.question{margin:0 0 18px}
 .stem{margin:0 0 8px;line-height:1.6;overflow-wrap:break-word;break-after:avoid}
 .options{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px 19px;margin:0 0 11px 10px;font-size:9.5pt}
 .options>div{overflow-wrap:break-word;break-inside:avoid}
 .write-line{height:20px;border-bottom:1px dotted #cbd5e1}
 .passage{white-space:pre-wrap;line-height:1.7;font-size:9.5pt;background:#f8fafc;border:1px solid #cbd5e1;padding:14px;margin:12px 0 20px}
 .key-page{break-before:page;page-break-before:always;margin-top:18px}
 .key-page h2{text-align:center;border-top:2px solid #172033;padding-top:14px}
 .key-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px 5px;font-size:9.5pt}
 .key-grid>span{break-inside:avoid;overflow-wrap:break-word}
 .explain{margin:9px 0 19px;border:1px solid #cbd5e1;border-radius:6px;padding:10px;font-size:9pt;line-height:1.6}
 .explain>strong{display:block;background:#eff6ff;padding:7px;color:#1e40af}
 .explain section{margin-top:10px;break-inside:avoid}
 .explain h3{font-size:9.5pt;margin:0 0 5px}
 .explain p{white-space:pre-wrap;margin:0 0 7px}
 .explain .notice{color:#64748b;font-style:italic}
 .explain .feedback-title{font-weight:bold;background:#eff6ff;padding:7px;margin-bottom:8px}
 .explain .semantic-step{padding:9px 0;border-bottom:1px solid #d9e7f5}
 .explain .semantic-step-label{display:flex;gap:9px;align-items:center;margin-bottom:9px}
 .explain .semantic-step-label>span{background:#dbeafe;border-radius:5px;padding:3px 8px;font-weight:bold}
 .explain .semantic-step-label b{font-size:9pt}
 .explain .semantic-step-label small{display:block;color:#64748b}
 .explain .semantic-prose p{margin:5px 0}
 .explain .semantic-options-grid,.explain .semantic-examples-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
 .explain .semantic-option,.explain .semantic-example,.explain .deep-box{border:1px solid #cbd5e1;padding:8px;break-inside:avoid}
 .explain .semantic-option.correct-analysis{background:#f0fdf4}
 .explain .semantic-option-head,.explain .semantic-example-title{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:6px}
 .explain .semantic-option-head>span,.explain .semantic-example-title>span{font-weight:bold}
 .explain .semantic-option-head em{font-size:8pt;color:#64748b}
 .explain .semantic-option p,.explain .semantic-example p{margin:0}
 .explain .example-vi{margin-top:5px!important;color:#475569}
 .explain .semantic-remember{background:#eff6ff;padding:8px;margin:10px 0}
 .explain .semantic-remember b{display:block}
 .explain .deep-box{margin:7px 0}
 .explain .deep-box b{display:block;margin-bottom:4px}
 .explain .sentence-translation{color:#64748b}
 .explain .word-family-row,.explain .mt-writing-step{padding:7px;background:#eff6ff;margin:5px 0}
 .explain .mt-note{margin:6px 0;border:1px solid #cbd5e1;padding:7px}
 .explain .mt-subtle{color:#64748b}
 .foot{border-top:1px solid #cbd5e1;padding-top:10px;margin-top:25px;text-align:center;color:#64748b;font-size:9pt}
 @media print{
  body{background:white}
  .toolbar{display:none!important}
  main{margin:0;padding:0;max-width:none;box-shadow:none}
  .options,.explain .semantic-options-grid,.explain .semantic-examples-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
  h2{break-after:avoid}
 }
`;
function html(data,groups,mode){
 let auto=0,items=[],keys=[];
 for(const group of groups){
  let part='<section><h2>'+esc(group.label||"Bài tập")+'</h2>';
  if(group.passage)part+='<div class="passage">'+esc(group.passage)+'</div>';
  for(const q of group.questions){
   const number=q.number==null?++auto:q.number;
   part+='<article class="question"><p class="stem"><strong>'+esc(number)+'.</strong> '+multiline(q.prompt)+'</p>';
   if(q.context&&q.context!==group.passage)part+='<div class="passage">'+esc(q.context)+'</div>';
   if(Array.isArray(q.options)&&q.options.length)part+='<div class="options">'+q.options.map((t,i)=>'<div><strong>'+A[i]+'.</strong> '+multiline(t)+'</div>').join("")+'</div>';
   else part+='<div class="write-line"></div>';
   keys.push('<span><b>'+esc(number)+'.</b> '+esc(q.shortAnswer??q.answer??"—")+'</span>');
   if(mode==="detailed"){
    part+='<div class="explain"><strong>Đáp án: '+esc(q.answer||"—")+'</strong>';
    if(q.detailHtml)part+=q.detailHtml;
    else if(q.details?.length)part+=q.details.map(d=>'<section><h3>'+esc(d.title||"Giải thích")+'</h3><p>'+esc(d.text||"")+'</p></section>').join("");
    else part+='<p class="notice">Chưa có lời giải chi tiết được biên soạn.</p>';
    if(q.detailAvailable===false)part+='<p class="notice">Chưa có phân tích chuyên sâu cho câu này. Có thể đối chiếu đáp án và nghe lại tại mốc nêu trên.</p>';
    part+='</div>';
   }
   part+='</article>';
  }
  items.push(part+'</section>');
 }
 const keyPage=mode==="key"?'<section class="key-page"><h2>ANSWER KEY · ĐÁP ÁN NGẮN</h2><div class="key-grid">'+keys.join("")+'</div></section>':"";
 return '<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'+
 '<title>'+esc(data.title)+' · Bản in</title><style>'+css+'</style></head><body>'+
 '<div class="toolbar"><p><b>'+esc(data.title)+'</b><br>Nếu hộp thoại in chưa mở, hãy nhấn In / Lưu PDF.</p><button id="printAgain">🖨 In / Lưu PDF</button></div>'+
 '<main><div class="topline"><span>ENGLISH PRACTICE HUB</span><span>A4 WORKSHEET</span></div>'+
 '<h1>'+esc(data.title)+'</h1><p class="intro">'+(mode==="key"?"Đáp án ngắn nằm ở trang cuối":"Lời giải chi tiết nằm dưới từng câu")+'</p>'+
 items.join("")+keyPage+'<div class="foot">English Practice Hub</div></main></body></html>';
}
function printSelected(){
 const groups=chosen();if(!data||!groups.length)return;
 const mode=host.querySelector('input[name="pc-format"]:checked')?.value==="detailed"?"detailed":"key";
 const win=global.open("","_blank");
 if(!win){global.alert("Trình duyệt đã chặn tab in. Hãy cho phép mở tab mới cho website.");return;}
 try{
  win.opener=null;win.document.open();win.document.write(html(data,groups,mode));win.document.close();
  win.document.getElementById("printAgain").addEventListener("click",()=>win.print());
  win.focus();
  const go=()=>Promise.resolve(win.document.fonts?.ready).then(()=>{if(!win.closed)win.setTimeout(()=>win.print(),200)});
  if(win.document.readyState==="complete")go();else win.addEventListener("load",go,{once:true});
 }catch(e){win.close();global.alert("Không tạo được bản in. Vui lòng thử lại.");}
}
let scheduled=false;
function sync(){
 const allow=!!source()&&(!global.readLearnerSession||!!global.readLearnerSession());
 if(host.hidden===allow)host.hidden=!allow;
 if(hash()!==currentRoute){currentRoute=hash();data=null;close();}
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
