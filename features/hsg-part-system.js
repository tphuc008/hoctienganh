/* HSG Part System v1
 * Data contract shared across new HSG exams.
 * Source text, gaps, stems and options are validated BEFORE rendering.
 * No question text is inferred from page layout at runtime.
 */
(function(global){
"use strict";
const KINDS=Object.freeze({
 guided_cloze:"mcq",
 open_cloze:"fill",
 word_formation:"word",
 reading_comprehension:"mcq"
});
const blockTypes=new Set(["heading","salutation","closing","bullet","paragraph"]);
const own=(o,k)=>Object.prototype.hasOwnProperty.call(o,k);
const fail=(scope,message)=>{throw new Error("HSG structured data ["+scope+"]: "+message)};
function validate(doc,expectedExam){
 if(!doc||doc.version!==1||doc.examId!==expectedExam||!Array.isArray(doc.parts)||!doc.parts.length)fail(expectedExam,"unsupported schema or wrong exam ID");
 const ids=new Set();
 for(const part of doc.parts){
  if(!part||!part.id||ids.has(part.id)||!own(KINDS,part.kind))fail(expectedExam,"duplicate/unknown part");
  ids.add(part.id);
  if(!Number.isInteger(part.start)||!Number.isInteger(part.end)||part.end<part.start)fail(part.id,"invalid question range");
  if(!Array.isArray(part.passage)||!part.passage.length||part.passage.some(b=>!blockTypes.has(b.type)||typeof b.text!=="string"||!b.text.trim()))fail(part.id,"missing structured passage");
  if(!Array.isArray(part.questions)||part.questions.length!==part.end-part.start+1)fail(part.id,"question count mismatch");
  const passage=part.passage.map(b=>b.text).join("\n");
  const seen=new Set();
  for(const q of part.questions){
   if(!q||!Number.isInteger(q.number)||q.number<part.start||q.number>part.end||seen.has(q.number)||typeof q.stem!=="string"||!q.stem.trim())fail(part.id,"invalid number or missing stem");
   seen.add(q.number);
   if(part.kind!=="reading_comprehension"&&!new RegExp("\\("+q.number+"(?:\\.\\s*[^)]*)?\\)\\s*_{2,}").test(passage))fail(part.id,"missing gap "+q.number);
   if(part.kind==="word_formation"&&(!q.word||typeof q.word!=="string"))fail(part.id,"missing source word "+q.number);
   if(KINDS[part.kind]==="mcq"&&(!Array.isArray(q.options)||q.options.length!==4||q.options.some(x=>typeof x!=="string"||!x.trim()||x.length>600)))fail(part.id,"missing/incomplete options for "+q.number);
   if(KINDS[part.kind]!=="mcq"&&own(q,"options"))fail(part.id,"unexpected MCQ choices on "+q.number);
  }
 }
 return doc;
}
function getPart(doc,id){return doc?.parts?.find(p=>p.id===id)||null}
function question(part,number){
 const q=part?.questions?.find(q=>q.number===number);
 return q?{...q,type:KINDS[part.kind],structured:true,partKind:part.kind}:null;
}
function renderPassage(part,answers,group,selected,escapeText){
 if(!part)return "";
 const escape=escapeText||((v)=>String(v));
 const byNumber=new Map(part.questions.map(q=>[q.number,q]));
 function phrase(source){
  let result="",cursor=0;
  const expr=/\((\d{2,3})(?:\.\s*([^)]+))?\)\s*_{2,}/g;
  for(const match of source.matchAll(expr)){
   const number=Number(match[1]),q=byNumber.get(number);
   if(!q)continue;
   result+=escape(source.slice(cursor,match.index));
   const selection=String(answers[group+":"+number]?.value||"").trim();
   const code=q.options?.findIndex((_,i)=>selection===String.fromCharCode(65+i));
   const chosenLabel=code>=0?String.fromCharCode(65+code):"";
   const chosen=chosenLabel?(q.options[code].length>38?chosenLabel+". "+q.options[code].slice(0,35)+"…":q.options[code]):selection.slice(0,55);
   const word=q.word?" · "+escape(q.word):"";
   result+='<button type="button" data-hsg-gap="'+number+'" class="hsg-schema-gap'+(number===selected?' is-current':'')+(chosen?' is-answered':'')+'" aria-label="Gap '+number+(chosen?' · '+escape(chosen):'')+'"><b>('+number+')</b><span>'+ (chosen?escape(chosen):'________') +'</span>'+word+'</button>';
   cursor=match.index+match[0].length;
  }
  return result+escape(source.slice(cursor));
 }
 return '<section class="hsg-passage-page hsg-schema-passage" data-hsg-kind="'+escape(part.kind)+'" aria-label="'+escape(part.title||"Reading passage")+'">'+
  part.passage.map(b=>{
   const cls="hsg-schema-block hsg-schema-"+b.type,tag=b.type==="heading"?"h3":"p";
   return '<'+tag+' class="'+cls+'">'+phrase(b.text)+'</'+tag+'>';
  }).join("")+'</section>';
}
function renderKindClass(part){return part?" hsg-schema-"+part.kind:""}
global.HSGPartSystem=Object.freeze({validate,getPart,question,renderPassage,renderKindClass,KINDS});
})(window);
