/* Error Correction source fidelity: show only original line labels.
 * A PDF hard newline is not a reliable printed line number.
 * Never assign 1,2,3... to arbitrary extracted/OCR rows.
 */
(function(global){
"use strict";
const clean=s=>String(s||"").replace(/\r\n?/g,"\n").replace(/[\u200b-\u200d\ufeff]/g,"").replace(/\u00a0/g," ").replace(/[ \t]+\n/g,"\n");
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const ANCHORS={
 "hai-phong":/Part 3\.\s*Identify 5 errors/i,
 "tay-ninh":/The passage below contains 5 mistakes/i,
 "thanh-hoa":/III\.\s*The passage below contains 5 mistakes/i
};
const GENERIC=/(?:^|\n)[ \t]*(?:PART\s*(?:2|II|B)[.:)]?\s*[^\n]{0,80}(?:ERROR\s*CORRECTION|MISTAKES)|(?:III|IV|V)\.\s*[^\n]{0,65}(?:passage.*mistakes|correction)|[^\n]{0,85}(?:passage|text)[^\n]{0,90}(?:contains?\s+(?:\d+|five|ten)\s+(?:mistakes|errors)|(?:mistakes|errors)\s+to\s+(?:correct|find))|[^\n]{0,80}(?:identify|find|correct)\s+(?:the\s+)?(?:\d+|five|ten)?\s*(?:grammatical\s+)?(?:mistakes|errors))/gim;
const END=/(?:^|\n)[ \t]*(?:YOUR\s+ANSWERS?\b|ANSWER\s+SHEET\b|PART\s*(?:3|III|4|IV|5|V)[.:)]?\s|(?:IV|V|VI|VII|VIII|IX|X)\.\s+|Questions?\s+\d{1,3}\.\s*|SECTION\s+[CDE][.:])/gim;
function extract(examId,source){
 const text=clean(source);
 let start=-1;
 const fixed=ANCHORS[examId];
 if(fixed){const m=fixed.exec(text);if(m)start=m.index}
 if(start<0){
  const candidates=[...text.matchAll(GENERIC)];
  // Select a task instruction that is followed by substantive text; avoid
  // selecting a different task merely because it mentions "error".
  const viable=candidates.filter(m=>text.slice(m.index,m.index+1300).length>240);
  if(viable.length)start=viable[0].index;
 }
 if(start<0)return {text:"",verified:false,reason:"Không xác định chắc chắn vị trí bài Error Correction trong đề nguồn."};
 const tail=text.slice(start);
 const breaks=[...tail.matchAll(END)];
 let end=tail.length;
 for(const stop of breaks){
  if(stop.index<60)continue;
  end=stop.index;break;
 }
 let selected=tail.slice(0,Math.min(end,7000)).trim();
 // Source OCR in Đại học Vinh misread the printed line labels 5 as "=)"
 // and 11 as "81". Neighbouring 4/6 and 10/12 confirm their positions.
 // Correct ONLY the line markers, never the underlying question words.
 if(examId==="dh-vinh"){
  selected=selected.replace(/(?:^|\n)([ \t]*)=\)[ \t]+(?=Benedict Cumberbatch)/i,"\n$15 ");
  selected=selected.replace(/(?:^|\n)([ \t]*)81[ \t]+(?=outstanding performance)/i,"\n$111 ");
 }
 if(selected.length<75)return {text:"",verified:false,reason:"Đoạn Error Correction được trích xuất quá ngắn để xác minh."};
 return {text:selected,verified:true,reason:""};
}
function numbered(text){
 const src=clean(text).split("\n");
 const entries=[];
 for(let i=0;i<src.length;i++){
  const line=src[i].trim();
  const m=/^(?:Line\s+)?(0|[1-9]\d?)[.)]?[ \t]*(?:[_|]\s*)?(.*)$/i.exec(line);
  if(!m)continue;
  const n=Number(m[1]);
  // Reject ordinary question numbers and unrelated tables.
  if(n>30||/\b(?:mistake|correction|answers?)\b/i.test(m[2]))continue;
  entries.push({n,index:i,first:m[2]});
 }
 for(let k=0;k<entries.length;k++){
  const e=entries[k];if(e.n!==1)continue;
  let seq=[e],expected=2;
  for(let j=k+1;j<entries.length&&expected<=30;j++){
   const nxt=entries[j];
   if(nxt.n===expected){seq.push(nxt);expected++;}
   else if(nxt.n<expected&&nxt.n!==0)break;
   else if(nxt.n>expected)break;
  }
  if(seq.length<6)continue;
  const lines=seq.map((item,i)=>{
   const limit=i+1<seq.length?seq[i+1].index:src.length;
   const pieces=[item.first,...src.slice(item.index+1,limit)].map(x=>x.trim()).filter(Boolean);
   return {number:item.n,text:pieces.join(" ").replace(/\s+/g," ").trim()};
  });
  // A numbered answer sheet 1..10 with empty spaces is not a source passage.
  if(lines.filter(x=>x.text.length>=18).length<Math.ceil(lines.length*.65))continue;
  // Stop at exactly the explicitly numbered original lines.
  return {lines,sourceStart:seq[0].index,sourceEnd:seq[seq.length-1].index};
 }
 return null;
}
function columnNumbered(source){
 const all=clean(source).split("\n");
 // Some PDFs extract an entire narrow column of labels (1...12) BEFORE
 // extracting the text column. Zip them only when text-row counts match.
 for(let i=0;i<all.length;i++){
  if(all[i].trim()!=="1")continue;
  const labels=[];let at=i,expected=1;
  while(at<all.length&&expected<=30){
   const current=all[at].trim();
   if(!current){at++;continue}
   if(!/^\d{1,2}$/.test(current)||Number(current)!==expected)break;
   labels.push(expected++);at++;
  }
  if(labels.length<5)continue;
  const content=[];
  for(;at<all.length;at++){
   const line=all[at].trim();
   if(/^(?:Example\s*:|YOUR\s+ANSWERS?\b|PART\s+\d+[.:)]|Questions?\s+\d+)/i.test(line))break;
   if(line)content.push(line);
  }
  if(content.length!==labels.length)continue;
  if(content.filter(t=>t.length>=22).length<Math.ceil(labels.length*.7))continue;
  return {lines:labels.map((number,k)=>({number,text:content[k]})),
   sourceStart:i,sourceEnd:at,originalColumn:true};
 }
 return null;
}
function parse(text){
 const source=clean(text).trim();
 const matched=numbered(source)||columnNumbered(source);
 if(matched){
  return {hasOriginalLines:true,lines:matched.lines,paragraphs:[],note:"",
    introduction:source.split("\n").slice(0,matched.sourceStart).join("\n").trim()};
 }
 const paragraphs=source.split(/\n\s*\n+/).map(block=>block.split("\n").map(x=>x.trim()).filter(Boolean).join(" ").replace(/[ \t]{2,}/g," ").trim()).filter(Boolean);
 return {hasOriginalLines:false,lines:[],paragraphs,
  note:"Đề gốc không đánh số dòng. Chọn/bôi đen cụm sai; không tự đánh số theo xuống dòng PDF.",
  introduction:""};
}
function screen(model,answer){
 const r=answer||{};
 const intro=model.introduction?'<p class="hsg-error-introduction">'+esc(model.introduction)+'</p>':"";
 if(model.hasOriginalLines){
  return '<section class="hsg-passage-page hsg-error-source" data-error-original-lines="true">'+
   '<p class="hsg-error-source-tip">Số dòng giữ nguyên theo đề gốc. Chọn dòng hoặc bôi đen từ/cụm sai.</p>'+intro+
   '<div class="hsg-error-lines">'+model.lines.map(line=>
    '<div class="hsg-error-line'+(String(r.line||"")===String(line.number)?' is-selected':'')+'" data-hsg-line="'+line.number+'" tabindex="0" role="button" aria-label="Chọn dòng '+line.number+'">'+
     '<span class="hsg-line-number" aria-hidden="true">'+line.number+'</span>'+
     '<span class="hsg-line-text">'+esc(line.text)+'</span></div>').join("")+'</div></section>';
 }
 return '<section class="hsg-passage-page hsg-error-source" data-error-original-lines="false">'+
  '<p class="hsg-error-source-tip">'+esc(model.note)+'</p>'+
  '<div class="hsg-error-unnumbered">'+model.paragraphs.map((p,i)=>
   '<p class="hsg-error-unnumbered-paragraph" data-hsg-error-paragraph="'+i+'">'+esc(p)+'</p>').join("")+'</div></section>';
}
function print(model){
 if(model.hasOriginalLines)return '<div class="hsg-print-error-source">'+
  (model.introduction?'<p class="hsg-print-instruction">'+esc(model.introduction)+'</p>':"")+
  model.lines.map(row=>'<div class="hsg-print-error-line"><b>'+row.number+'</b><span>'+esc(row.text)+'</span></div>').join("")+'</div>';
 return '<div class="hsg-print-error-source">'+model.paragraphs.map(p=>
  '<p class="hsg-print-prose">'+esc(p)+'</p>').join("")+'</div>';
}
global.HSGErrorLines=Object.freeze({extract,parse,numbered,screen,print});
})(window);
