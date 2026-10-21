/* Website Vocab — HSG Print Engine V1.1
   A single semantic renderer shared by the HSG print dialog and specimen preview.
   All content is source-derived. It never prints answer keys or saved answers. */
(function(global){
"use strict";
const TOKEN_VERSION="exam-print-v1.1";
const esc=value=>String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const inline=value=>esc(value).replace(/(_{3,})/g,'<span class="hsg-print-blank">$1</span>');
const isCompact=options=>options.length===4&&options.every(opt=>
 String(opt).length<=50&&!/[\r\n]/.test(String(opt)))&&
 options.reduce((sum,opt)=>sum+String(opt).length,0)<=150;
function choiceGrid(options){
 if(!Array.isArray(options)||options.length!==4)throw Error("Print MCQ requires four options");
 return '<div class="hsg-print-choices '+(isCompact(options)?"is-compact":"is-long")+'">'+
 options.map((option,i)=>'<div class="hsg-print-choice"><b>'+String.fromCharCode(65+i)+'.</b><span>'+inline(option)+'</span></div>').join("")+
 '</div>';
}
function partHeading(title,first,last,index){
 return '<header class="hsg-print-part-head">'+
  '<div class="hsg-print-part-number">PART '+String(index).padStart(2,"0")+'</div>'+
  '<div><h2>'+esc(title)+'</h2><p>Questions '+first+'–'+last+' · '+(last-first+1)+' items</p></div>'+
 '</header>';
}
function sourceBlocks(blocks){
 if(!Array.isArray(blocks))throw Error("Missing print passage blocks");
 return blocks.map(block=>{
  const value=String(block.text||"");
  if(!value.trim())return "";
  if(block.type==="heading")return '<h3 class="hsg-print-source-subhead">'+inline(value)+'</h3>';
  if(block.type==="bullet")return '<p class="hsg-print-bullet">'+inline(value.replace(/^•\s*/,""))+'</p>';
  return '<p class="hsg-print-prose hsg-print-schema-'+esc(block.type||"paragraph")+'">'+inline(value)+'</p>';
 }).join("");
}
function answerGrid(items){
 return '<div class="hsg-print-short-answer-grid">'+items.map(item=>
  '<div class="hsg-print-answer-cell"><strong>'+item.number+'.</strong><span class="hsg-print-handwriting-line"></span>'+
    (item.word?'<small>'+esc(item.word)+'</small>':"")+
  '</div>').join("")+'</div>';
}
function renderStructuredPart(part,index=1){
 if(!part||!Array.isArray(part.questions)||!Array.isArray(part.passage))throw Error("Missing validated part data");
 const title=part.title||"Exam Part",first=part.start,last=part.end;
 const questions=part.questions.slice().sort((a,b)=>a.number-b.number);
 if(questions.length!==last-first+1)throw Error("Print question range mismatch: "+part.id);
 let section="";
 if(part.kind==="guided_cloze"){
  section='<div class="hsg-print-answer-section-title">Choose A, B, C or D</div>'+
   questions.map(q=>'<article class="hsg-print-source-question">'+
    '<div class="hsg-print-source-num">'+q.number+'.</div>'+
    '<div class="hsg-print-source-q-body">'+choiceGrid(q.options)+'</div></article>').join("");
 }else if(part.kind==="reading_comprehension"){
  section=questions.map(q=>'<article class="hsg-print-source-question">'+
   '<div class="hsg-print-source-num">'+q.number+'.</div>'+
   '<div class="hsg-print-source-q-body"><p class="hsg-print-source-stem">'+inline(q.stem)+'</p>'+
   choiceGrid(q.options)+'</div></article>').join("");
 }else if(part.kind==="open_cloze"||part.kind==="word_formation"){
  section='<div class="hsg-print-answer-section-title">Answer spaces</div>'+answerGrid(questions);
 }else throw Error("Unsupported structured print kind: "+part.kind);
 return '<section class="hsg-print-part hsg-print-structured" data-hsg-print-kind="'+esc(part.kind)+'">'+
  partHeading(title,first,last,index)+
  '<div class="hsg-print-structured-passage">'+sourceBlocks(part.passage)+'</div>'+
  '<div class="hsg-print-question-list">'+section+'</div>'+
 '</section>';
}
function renderPaper({title,subtitle="",year="",label="",countLabel="",content="",excludeListening=true}){
 return '<div class="hsg-print-document" id="hsg-print-sheet" data-print-standard="'+TOKEN_VERSION+'">'+
 '<header class="hsg-print-cover">'+
  '<div class="hsg-print-header-top"><span>ENGLISH PRACTICE HUB</span><span>HSG TỈNH · EXAM PRACTICE</span></div>'+
  '<div class="hsg-print-eyebrow">ĐỀ LUYỆN TẬP TIẾNG ANH</div>'+
  '<h1>'+esc(title)+'</h1>'+
  '<p class="hsg-print-subtitle">'+esc(subtitle)+(year?' · '+esc(year):"")+'</p>'+
  '<div class="hsg-print-info-row"><span class="hsg-print-info-scope">'+esc(label)+'</span><span>'+esc(countLabel)+'</span></div>'+
  '<div class="hsg-print-student"><span>Họ và tên: <i></i></span><span>Lớp: <i></i></span></div>'+
 '</header>'+
 '<main class="hsg-print-paper-main">'+content+'</main>'+
 '<footer class="hsg-print-final"><span>ENGLISH PRACTICE HUB</span><span>HẾT'+(excludeListening?' · Không bao gồm Listening':'')+' · Không kèm lời giải</span></footer>'+
 '</div>';
}
global.HSGPrintEngine=Object.freeze({version:TOKEN_VERSION,esc,inline,isCompact,choiceGrid,partHeading,sourceBlocks,answerGrid,renderStructuredPart,renderPaper});
})(window);
