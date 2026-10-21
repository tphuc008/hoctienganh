/* Unified HSG-style Mid Term Test: one answer state, inline marking and Grade 12 explanations. */
(function(global){
"use strict";
const ROOT="grade-10/mid-term-test";
const BASE="./content/grade10-midterm-six-tests.txt?v=20261021-all6-1";
const STYLE="features/grade10-midterm-study.css?v=20261021-unified-v1";
const COUNTS=[0,50,43,45,50,45,46];
const NAMES=["","Mr. Khanh","Ms. Oanh","Mr. Tuấn Anh","Ms. Nguyên","Mr. Trí","Mrs. Quyên 2"];
const state={doc:null,questions:[],test:0,index:0,answers:{},checked:{},revealed:{},flags:{},owner:null,parsed:null,graded:null,draft:null,summary:false,unsaved:false};
let allText=null;
const $=id=>document.getElementById(id);
const esc=x=>String(x??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");
const meaningful=v=>!!String(v??"").trim();
function initCss(){
 if($("g10x-style"))return;
 const el=document.createElement("link");el.rel="stylesheet";el.id="g10x-style";el.href=STYLE;document.head.appendChild(el);
}
async function fetchText(){
 if(allText)return allText;
 const r=await fetch(BASE,{cache:"no-store"});
 if(!r.ok)throw new Error("Không tải được đề gốc ("+r.status+")");
 const t=await r.text();
 const heads=[...t.matchAll(/^TEST\s+([1-6])\s+\(([^)\n]+)\)/gm)];
 if(heads.length!==6||heads.map(m=>m[1]).join("")!=="123456")throw new Error("File không đủ 6 Test");
 allText=t;return allText;
}
function testText(all,n){
 const heads=[...all.matchAll(/^TEST\s+([1-6])\s+\(([^)\n]+)\)/gm)];
 const i=heads.findIndex(x=>Number(x[1])===n);
 return i<0?"":all.slice(heads[i].index,i+1<heads.length?heads[i+1].index:all.length).trim();
}
const SECTION=/^(?:KNOWLEDEG\s*[12]:|KNOWLEDGE\s*[12]:|(?:[IVX]+\))?\s*(?:Read the following|Read the passage|Read the text|Mark the letter|For Questions|FILL IN THE BLANKS|Rearrangement|TURN INTO THE PASSIVE VOICE|Rewrite the following|Choose the correct answer|Read the following advertisement|Read the following leaflet))/i;
function contextStart(line){
 const s=String(line||"").trim();
 return SECTION.test(s)||/^[A-Z][A-Z \d!,?–—\-’'&]{13,85}$/.test(s)&&!/^A\.\s/.test(s);
}
function splitTail(str){
 const lines=str.split("\n");
 for(let i=1;i<lines.length;i++){
   if(contextStart(lines[i])&&lines.slice(0,i).join("").trim()){
     return [lines.slice(0,i).join("\n").trim(),lines.slice(i).join("\n").trim()];
   }
 }
 return [str.trim(),""];
}
function optionSeries(part){
 // Some dialogue items use A/B/C/D as speaker labels before the actual A–D choices.
 // Select the last complete series, not the first.
 const matches=[...part.matchAll(/(?:^|[\n\t ])([A-D])\.[ \t]*(?=\S)/g)];
 let best=null;
 for(let i=0;i<matches.length;i++){
   if(matches[i][1]!=="A")continue;
   const b=matches.slice(i+1).find(m=>m[1]==="B"),c=b&&matches.find(m=>m.index>b.index&&m[1]==="C");
   const d=c&&matches.find(m=>m.index>c.index&&m[1]==="D");
   if(!b||!c||!d)continue;
   if(matches.some(m=>m[1]==="A"&&m.index>matches[i].index&&m.index<d.index))continue;
   const marks=[matches[i],b,c,d];
   best={start:marks[0].index+marks[0][0].indexOf("A."),marks};
 }
 if(!best)return null;
 const opts=best.marks.map((m,i)=>{
   const start=m.index+m[0].length;
   const end=i<3?best.marks[i+1].index:part.length;
   return part.slice(start,end).trim();
 });
 return {position:best.start,marks:best.marks,options:opts};
}
function parsePaper(raw,n){
 const markers=[];
 const pattern=n===2?/^[ \t]*(?:Question\s*(\d{1,2})\s*[.:]?\s*|(\d{1,2})\.\s+(?=\S))/gm:/^[ \t]*\.?[ \t]*Question\s*(\d{1,2})\s*[.:]?\s*/gm;
 for(const m of raw.matchAll(pattern)){
   const num=Number(m[1]||m[2]);
   if(!Number.isInteger(num)||num<1||num>50)continue;
   markers.push({number:num,start:m.index,bodyAt:m.index+m[0].length});
 }
 let paperIntro=raw.slice(0,markers[0]?.start||raw.length).trim();
 let carry=paperIntro,questions=[];
 let knowledge=1,last=-1;
 for(let j=0;j<markers.length;j++){
   const q=markers[j],next=j+1<markers.length?markers[j+1].start:raw.length;
   let section=raw.slice(q.bodyAt,next).trim();
   const options=optionSeries(section);
   let prompt="",choices=null,tail="";
   if(options){
     prompt=section.slice(0,options.position).trim();
     const all=options.options.slice();
     const cut=splitTail(all[3]);all[3]=cut[0];tail=cut[1];
     choices=all;
   }else{
     const cut=splitTail(section);prompt=cut[0];tail=cut[1];
   }
   if(n===4&&q.number===1&&last>=1)knowledge=2;
   if(j===0)carry=paperIntro;
   const intro=carry;
   const identifier=n===4&&q.number<=10?"k"+knowledge+"-"+q.number:String(q.number);
   const type=choices&&choices.every(x=>x.trim())?"choice":"written";
   questions.push({id:identifier,number:q.number,knowledge:n===4?knowledge:null,prompt,choices:type==="choice"?choices:null,kind:type,intro,raw:section});
   if(tail){carry=tail}
   else if(q.number===25||q.number===30||q.number===35||q.number===40||q.number===43)carry="";
   else if(carry&&!/(?:read|passage|advertisement|leaflet|music festival|pollution|notice|circular economy|music camp|paper or digital|artificial intelligence|environmentally friendly)/i.test(carry))carry="";
   last=q.number;
 }
 return {raw,questions,paperIntro};
}
function correctCounts(p,n){
 if(p.questions.length!==COUNTS[n])throw new Error("Sai số lượng câu của Test "+n+": "+p.questions.length+"/"+COUNTS[n]);
 const ids=new Set(p.questions.map(q=>q.id));
 if(ids.size!==p.questions.length)throw new Error("Trùng số câu tại Test "+n);
 return true;
}
function persist(){
 state.draft.index=state.index;state.draft.answers=state.answers;state.draft.checked=state.checked;
 state.draft.revealed=state.revealed;state.draft.flags=state.flags;
 state.unsaved=!global.G10MidtermProgress.save(state.test,state.draft);
}
function qid(q){return q.canonicalId}
function graded(q){return state.graded.questions[state.questions.indexOf(q)]}
function answered(q){return meaningful(state.answers[qid(q)])}
function done(){return state.questions.filter(answered).length}
function checkedCount(){return state.questions.filter(q=>state.checked[qid(q)]).length}
function result(q){return global.G10MidtermAssessment.grade(graded(q),state.answers[qid(q)]||"")}
function score(){
 const completed=state.questions.filter(q=>state.checked[qid(q)]);
 const correct=completed.filter(q=>result(q).right&&!state.revealed[qid(q)]).length;
 const excluded=state.graded.questions.filter(q=>global.G10MidtermAssessment.unscored(q)).length;
 return {correct,completed:completed.length,excluded,eligible:state.questions.length-excluded,answered:done()};
}
function passage(q){
 let v=String(q.intro||"").trim();
 if(!v||v.length<95||!/(?:read|music|plastic|pollution|environment|technology|food|conservation|work|family|AI|circular|camp|concert|notice)/i.test(v))return "";
 return v;
}
function kindLabel(q){
 if(q.knowledge)return "Knowledge "+q.knowledge+" · "+(q.kind==="choice"?"Trắc nghiệm":"Tự luận");
 return q.kind==="choice"?"Chọn một đáp án A–D":"Viết câu trả lời";
}
function optionHtml(q){
 const id=qid(q),checked=!!state.checked[id],correct=global.G10MidtermAssessment.grade(graded(q),state.answers[id]||"");
 return '<div class="g10x-choice-list" role="group" aria-label="Đáp án câu '+q.number+'">'+
 q.choices.map((v,i)=>{
  const l="ABCD"[i],sel=state.answers[id]===l,isCorrect=checked&&correct.accepted.includes(l);
  const status=checked?(sel?"<small>Bạn đã chọn</small>":isCorrect?"<small>Đáp án chấp nhận</small>":""):"";
  return '<button type="button" class="g10x-choice'+(sel?' is-selected':'')+(checked&&sel&&!correct.right?' is-wrong':'')+(isCorrect?' is-correct':'')+'" data-g10x-choice="'+l+'" aria-pressed="'+sel+'" '+(checked?'disabled':'')+'><span class="g10x-letter">'+l+'</span><span>'+esc(v)+status+'</span></button>';
 }).join("")+'</div>';
}
function responseHtml(q){
 const id=qid(q);
 return '<div class="g10x-response"><div class="g10x-q-head"><span class="g10x-q-number">Câu '+q.number+'</span><span class="g10x-kind">'+esc(kindLabel(q))+'</span></div>'+
 '<div class="g10x-prompt">'+esc(q.prompt||"Dựa vào đoạn văn để chọn đáp án cho chỗ trống ("+q.number+").")+'</div>'+
 (q.kind==="choice"?optionHtml(q):'<label class="g10x-written-label" for="g10x-write">Câu trả lời của bạn</label>'+
 '<textarea class="g10x-written" id="g10x-write" data-g10x-write '+(state.checked[id]?'disabled':'')+' placeholder="Nhập đáp án hoặc thứ tự các câu…">'+esc(state.answers[id]||"")+'</textarea>')+'</div>';
}
function feedback(q){
 const id=qid(q);if(!state.checked[id])return "";
 const gradeQ=graded(q),mark=result(q),input=state.answers[id]||"";
 const status=mark.excluded?"⚠ Câu này không tính điểm":state.revealed[id]?"Đã mở lời giải":mark.right?"✓ Chính xác":"✕ Chưa chính xác";
 const context=global.G10MidtermAssessment.context(state.graded,gradeQ)||q.intro||"";
 const explanation=global.G10MidtermAssessment.explain(gradeQ,context);
 return '<div class="g10x-feedback"><div class="g10x-check-result '+(mark.right?"is-right":"")+'"><b>'+status+'</b>'+
 '<span>Đáp án của bạn: '+esc(input)+' · Đáp án tham khảo: '+esc(mark.correctAnswer)+'</span></div>'+explanation+
 (gradeQ.warning?'<div class="g10x-warning">Lưu ý về câu gốc: '+esc(gradeQ.warning)+'</div>':"")+'</div>';
}
function highlightedIntro(text,n){
 return esc(text).replace(new RegExp("(\\("+n+"\\)\\s*_{2,})","g"),'<mark class="g10x-current-gap">$1</mark>');
}
function bodyHtml(q){
 const intro=passage(q),isReading=!!intro&&intro.length>460;
 let content=responseHtml(q);
 const p=intro?'<details class="g10x-context" open><summary>Đề bài / đoạn văn dùng chung</summary><div>'+highlightedIntro(intro,q.number)+'</div></details>':"";
 if(isReading)return '<div class="g10x-reading-grid">'+p+content+'</div>'+feedback(q);
 return p+content+feedback(q);
}
function navHtml(){
 return state.questions.map((q,i)=>{
  const label=q.knowledge&&q.number<=10?String(q.knowledge)+"."+q.number:String(q.number);
  return '<button type="button" data-g10x-nav="'+i+'" class="'+(answered(q)?"has-answer ":"")+(state.flags[qid(q)]?"flagged ":"")+(i===state.index?"active":"")+'" aria-label="Đến câu '+label+'" aria-current="'+(i===state.index?'true':'false')+'">'+label+'</button>';
 }).join("");
}
function printReady(){
 return '<section class="g10x-print-only" aria-hidden="true"><h1>TEST '+state.test+' – '+esc(NAMES[state.test])+'</h1><pre>'+esc(state.parsed.raw)+'</pre></section>';
}
function render(){
 const q=state.questions[state.index];
 const total=state.questions.length,count=done(),pct=Math.round(count/total*100);
 const mount=$("pageMount");mount.style.display="block";$("quizShell")?.style&&( $("quizShell").style.display="none");
 mount.innerHTML='<div class="g10x-root"><div class="breadcrumbs"><button class="crumb-btn" onclick="goGrade(10)">Lớp 10</button><span>›</span><button class="crumb-btn" onclick="location.hash=\''+ROOT+'\'">Mid Term Test</button><span>›</span><span>Test '+state.test+'</span></div>'+
 '<header class="g10x-hero"><div class="g10x-eyebrow">Học thêm · Grade 10 · Exam practice</div><h1>Test '+state.test+' · '+esc(NAMES[state.test])+'</h1>'+
 
 '<div class="g10x-tags"><span>'+total+' câu</span></div></header>'+
 '<div class="g10x-progress" aria-label="Tiến độ bài làm"><strong>'+count+' / '+total+' câu</strong><div class="g10x-track"><i style="width:'+pct+'%"></i></div><small>'+pct+'% đã trả lời</small></div>'+
 '<div class="g10x-layout"><section class="g10x-paper"><div class="g10x-paper-head"><div><b>Question '+q.number+'</b><small>'+esc(kindLabel(q))+'</small></div><div><small>Câu '+(state.index+1)+' / '+total+'</small></div></div>'+
 '<div class="g10x-page-body">'+bodyHtml(q)+
 '<div class="g10x-q-actions"><button type="button" data-g10x-action="prev"'+(state.index===0?' disabled':'')+'>← Trước</button>'+
 '<button type="button" data-g10x-action="flag" class="'+(state.flags[q.id]?"g10x-flagged":"")+'">'+(state.flags[q.id]?"★ Đã đánh dấu":"☆ Đánh dấu")+'</button>'+
 '<button type="button" data-g10x-action="clear">Xóa đáp án</button>'+
 '<span class="g10x-status">'+(answered(q)?"Đã trả lời":"Chưa trả lời")+'</span>'+
 '<button type="button" class="g10x-primary" data-g10x-action="next"'+(state.index===total-1?' disabled':'')+'>Tiếp →</button></div></div>'+
 '</section>'+
 '<aside class="g10x-sheet" aria-label="Phiếu trả lời"><div class="g10x-sheet-head"><div><b>Phiếu trả lời</b></div><b>'+count+'/'+total+'</b></div>'+
 '<div class="g10x-sheet-inner"><div class="g10x-legend"><span><b></b>Đã làm</span><span><b class="flag"></b>Cần xem lại</span></div>'+
 '<nav class="g10x-nav" aria-label="Danh sách câu hỏi">'+navHtml()+'</nav>'+
 '<div class="g10x-actions"><button type="button" data-g10x-action="next-unanswered">Đến câu chưa trả lời</button>'+
 '<button type="button" data-g10x-action="interactive" class="g10x-primary">Kiểm tra & giải thích →</button>'+
 '<button type="button" data-g10x-action="print">In đề đầy đủ</button>'+
 '<button type="button" data-g10x-action="home">← Danh sách 6 Test</button></div>'+
 '</div></aside></div>'+printReady()+'</div>';
 bind();
}
function rerender(keep=false){
 const y=global.scrollY||0;render();if(keep)global.scrollTo?.({top:y,behavior:"instant"});
}
function choice(letter){
 const q=state.questions[state.index];state.answers[q.id]=letter;persist();rerender(true);
}
function advance(target){
 if(target<0||target>=state.questions.length)return;
 state.index=target;persist();render();
 const paper=$("pageMount");paper?.scrollIntoView?.({block:"start",behavior:"smooth"});
}
function bind(){
 const root=$("pageMount");const q=state.questions[state.index];
 root.querySelectorAll("[data-g10x-choice]").forEach(b=>b.addEventListener("click",()=>choice(b.dataset.g10xChoice)));
 root.querySelectorAll("[data-g10x-nav]").forEach(b=>b.addEventListener("click",()=>advance(Number(b.dataset.g10xNav))));
 const input=$("g10x-write");
 if(input)input.addEventListener("input",()=>{
  state.answers[q.id]=input.value;persist();
  const stat=root.querySelector(".g10x-status");if(stat)stat.textContent=answered(q)?"Đã trả lời":"Chưa trả lời";
  const number=root.querySelector('.g10x-nav button[data-g10x-nav="'+state.index+'"]');
  if(number)number.classList.toggle("has-answer",answered(q));
  const d=done(),p=Math.round(100*d/state.questions.length);
  const progress=root.querySelector(".g10x-progress strong");if(progress)progress.textContent=d+" / "+state.questions.length+" câu";
  const track=root.querySelector(".g10x-track i");if(track)track.style.width=p+"%";
 });
 root.querySelectorAll("[data-g10x-action]").forEach(b=>b.addEventListener("click",()=>{
  const v=b.dataset.g10xAction;
  if(v==="prev")return advance(state.index-1);
  if(v==="next")return advance(state.index+1);
  if(v==="home"){location.hash=ROOT;return}
  if(v==="interactive"){location.hash=ROOT+"/test-"+state.test;return}
  if(v==="next-unanswered"){const idx=state.questions.findIndex(x=>!answered(x));return advance(idx<0?state.index:idx)}
  if(v==="print"){global.print?.();return}
  if(v==="flag"){state.flags[q.id]=!state.flags[q.id];persist();return rerender(true)}
  if(v==="clear"){delete state.answers[q.id];persist();return rerender(true)}
 }));
}
async function open(n){
 n=Number(n);
 if(!Number.isInteger(n)||n<1||n>6){location.hash=ROOT;return}
 initCss();
 const mount=$("pageMount");mount.style.display="block";$("quizShell")?.style&&($("quizShell").style.display="none");
 mount.innerHTML='<div class="g10x-hero"><h1>Đang mở Test '+n+'…</h1></div>';
 try{
  const raw=testText(await fetchText(),n);
  const doc=parsePaper(raw,n);correctCounts(doc,n);
  if(location.hash!="#"+ROOT+"/source-test-"+n)return;
  state.test=n;state.parsed=doc;state.questions=doc.questions;state.owner=global.LearningCore?.userId?.()||null;
  const old=saved(n);state.answers=old.answers;state.flags=old.flags;state.index=Math.min(Math.max(old.index,0),state.questions.length-1);
  render();global.scrollTo?.({top:0,behavior:"smooth"});
 }catch(err){
  mount.innerHTML='<div class="unit-hero"><h1>Không mở được Test '+n+'</h1><p>'+esc(err.message||err)+'</p>'+
  '<button class="secondary" onclick="location.hash=\''+ROOT+'\'">Quay lại 6 đề</button></div>';
 }
}
global.renderG10MidTermSourceTest=open;
// Enables source parser audits without opening the student UI.
global.G10MidtermPaperParser={parsePaper,correctCounts,testText};
})(window);
