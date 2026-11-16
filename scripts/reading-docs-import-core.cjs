"use strict";
/*
 * Smart Reading Import V2: deterministic Google Docs explanation ingestion.
 * Input: Google Drive get_document_text().result.paragraphs and a separately
 * validated PDF question bank. Never alters questions or answer keys.
 * Run from an authenticated importer/ChatGPT workflow, NOT in public browser.
 */
const HEAD=/^Câu\s+(\d+)(?:\s*[–—-]\s*(\d+))?\b/i;
const LABELS=[
 [/^1\.\s*Hiểu câu chuyện\s*\/\s*logic:\s*/i,"logic"],
 [/^2\.\s*Bằng chứng\s*\+\s*paraphrase:\s*/i,"evidence"],
 [/^3\.\s*Phân tích đáp án sai\s*\/\s*bẫy:\s*/i,"traps"]
];
const clean=x=>String(x==null?"":x).trim();
const norm=x=>clean(x).toLocaleLowerCase("en").replace(/[“”"'’.,?!()\[\]:;…]/g," ").replace(/\s+/g," ");
function parse(paragraphs){
 if(!Array.isArray(paragraphs))throw Error("Google Docs paragraphs array is required");
 const items=[];let active=null,field=null;
 for(const para of paragraphs){
  const line=clean(typeof para==="string"?para:para?.text);
  if(!line)continue;
  const match=line.match(HEAD);
  if(match&&(para?.namedStyleType==="HEADING_2"||/^Câu\s+\d+\s*[—–-]/i.test(line))){
   const from=Number(match[1]),to=match[2]?Number(match[2]):from;
   if(to<from||to-from>5)throw Error("Invalid question range: "+line);
   const ids=Array.from({length:to-from+1},(_,i)=>from+i);
   if(items.some(x=>x.ids.some(id=>ids.includes(id))))throw Error("Duplicate question identifier: "+ids.join(","));
   active={id:from,ids,heading:line,docQuestion:"",docAnswer:"",logic:"",evidence:"",traps:""};
   items.push(active);field=null;continue;
  }
  if(!active||line.startsWith("GHI CHÚ CHO GIÁO VIÊN"))continue;
  if(/^ĐỀ:\s*/i.test(line)){active.docQuestion=line.replace(/^ĐỀ:\s*/i,"");field="docQuestion";continue}
  if(/^ĐÁP ÁN:\s*/i.test(line)){active.docAnswer=line.replace(/^ĐÁP ÁN:\s*/i,"").split(/\s+[—–]\s+/)[0];field="docAnswer";continue}
  const tag=LABELS.find(([re])=>re.test(line));
  if(tag){field=tag[1];active[field]=line.replace(tag[0],"");continue}
  if(field&&active[field])active[field]+="\n"+line;
 }
 return items;
}
function answerTokens(answer){
 if(Array.isArray(answer))return [...answer].map(x=>clean(x).toUpperCase()).sort();
 const a=clean(answer).toUpperCase().replace(/\s*\([^)]*\)\s*$/,"");
 return a.split(/\s*(?:,|\/|\+|&|\bAND\b)\s*/).map(x=>x.trim()).filter(Boolean).sort();
}
function sameAnswer(a,b){return JSON.stringify(answerTokens(a))===JSON.stringify(answerTokens(b))}
function matchQuestion(question,docQuestion){
 const original=norm(question);
 const supplied=norm(docQuestion);
 if(!supplied)return {ok:false,exact:false};
 // Docs can show all A-D options after the stem.
 if(supplied.startsWith(original))return {ok:true,exact:true};
 const a=new Set(original.split(" ").filter(Boolean)),b=new Set(supplied.split(" ").filter(Boolean));
 const common=[...a].filter(x=>b.has(x)).length;
 return {ok:common/Math.max(1,a.size)>=.75,exact:false};
}
function findAnchors(paragraphs,evidence){
 const quotes=[...clean(evidence).matchAll(/“([^”]+)”|"([^"]+)"/g)]
  .map(m=>m[1]||m[2]).flatMap(x=>x.split(/…|\.\.\.|\[\s*(?:and)?\s*\]/)).map(clean)
  .filter(x=>x.length>=15).sort((a,b)=>b.length-a.length);
 const anchors=[];
 for(const quote of quotes){
  const matches=[];
  for(let p=0;p<paragraphs.length;p++){
   if(typeof paragraphs[p]!=="string")continue;
   const start=paragraphs[p].indexOf(quote);
   if(start>=0)matches.push({p,quote,start});
  }
  // A snippet occurring in multiple places is ambiguous and is never guessed.
  if(matches.length!==1)continue;
  const anchor=matches[0];
  if(anchors.some(x=>x.p===anchor.p&&x.quote.includes(anchor.quote)))continue;
  anchors.push({p:anchor.p,quote:anchor.quote});
  if(anchors.length===3)break;
 }
 return anchors;
}
function apply(lesson,paragraphs,{allowPartial=true}={}){
 if(!lesson||!Array.isArray(lesson.questions)||!Array.isArray(lesson.paragraphs))
  throw Error("A validated PDF question bank is required");
 const parsed=parse(paragraphs),errors=[],warnings=[],updates=[];
 const copy=JSON.parse(JSON.stringify(lesson));
 const byId=new Map(copy.questions.map(q=>[q.id,q]));
 const sourceTitle=lesson.title||"";
 for(const item of parsed){
  const q=byId.get(item.id);
  if(!q||item.ids.some(id=>!byId.has(id))){errors.push("Unknown question(s) "+item.ids.join(", "));continue}
  if(q.type==="choose2"&&JSON.stringify(item.ids)!==JSON.stringify(q.ids)){
   errors.push("Choose TWO group ID mismatch at "+q.id);continue
  }
  if(q.type!=="choose2"&&item.ids.length!==1){errors.push("Unexpected grouped questions at "+q.id);continue}
  if(!sameAnswer(q.answer,item.docAnswer)){
   errors.push("Answer-key mismatch for "+sourceTitle+" Q"+item.id);continue
  }
  if(!item.logic||!item.evidence||!item.traps){
   errors.push("Incomplete explanation for Q"+item.id);continue
  }
  const fingerprint=matchQuestion(q.question,item.docQuestion);
  if(!fingerprint.ok){errors.push("Question stem mismatch for Q"+item.id);continue}
  if(!fingerprint.exact)warnings.push("Question text differs from PDF at Q"+item.id+"; check punctuation/source wording");
  const anchors=findAnchors(copy.paragraphs,item.evidence);
  if(!anchors.length){errors.push("No unique exact evidence anchor for Q"+item.id);continue}
  q.explain={heading:item.heading,logic:item.logic,evidence:item.evidence,traps:item.traps,docQuestion:item.docQuestion,docAnswer:item.docAnswer};
  q.anchors=anchors;q.p=anchors[0].p;q.quote=anchors[0].quote;
  updates.push(q.id);
 }
 if(!allowPartial&&updates.length!==copy.questions.length)errors.push("Document does not cover every question");
 return {ready:errors.length===0,lesson:errors.length?null:copy,updated:updates,errors,warnings};
}
module.exports={parse,findAnchors,apply,sameAnswer,matchQuestion};
