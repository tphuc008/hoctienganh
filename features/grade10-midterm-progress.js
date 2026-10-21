/* Single canonical Mid Term Test draft for the HSG-style paper and inline assessment.
 * Signed-in: existing LearningCore exam draft, scoped to learner.
 * Guest: per-browser localStorage; never auto-merged with a signed-in account.
 * Preserve legacy exam-source answers, checked states and flagged questions.
 */
(function(g){
"use strict";
const ROOT="grade-10/mid-term-test";
const VERSION=2;
const isObj=x=>!!x&&typeof x==="object"&&!Array.isArray(x);
const cleanMap=(map,ids)=>Object.fromEntries(Object.entries(isObj(map)?map:{}).filter(([k])=>ids.has(k)));
const bounded=(v,length)=>Math.max(0,Math.min(length-1,Number.isInteger(Number(v))?Number(v):0));
function guestKey(n){return "hoctienganh:midterm:guest:v2:test-"+n}
function account(){return g.LearningCore?.userId?.()||null}
function raw(key){
 try{return JSON.parse(g.localStorage.getItem(key)||"null")}catch(_){return null}
}
function metadata(kind,identity){
 const id=account();if(!id)return null;
 const key="hoctienganh:attempt:v1:"+id+":"+encodeURIComponent(kind)+":"+encodeURIComponent(identity);
 const wrapper=raw(key);
 return wrapper&&wrapper.version===1?{data:wrapper.data,updatedAt:Number(wrapper.updatedAt)||0}:null;
}
function testKey(n){return ROOT+"/test-"+n}
function sourceKey(n){return ROOT+"/source-test-"+n}
function adaptSourceKey(s,n){return n+"-"+String(s).replace(/^k([12])-/i,(_,v)=>"K"+v+"-")}
function start(n,questions){
 const ids=new Set(questions.map(x=>x.id)),owner=account();
 const exam=owner?metadata("exam",testKey(n)):null;
 const source=owner?metadata("exam-source",sourceKey(n)):null;
 const guest=owner?null:raw(guestKey(n));
 const oldExam=isObj(exam?.data)?exam.data:null;
 const legacy=isObj(source?.data)?source.data:null;
 if(isObj(owner?oldExam:guest)&&(owner?oldExam:guest).unifiedVersion===VERSION){
  const d=owner?oldExam:guest;
  return sanitize({...d},ids,questions.length,n);
 }
 // Legacy migration: newest of the two snapshots is authoritative for overlapping
 // answers, including deliberately removed answers. Preserve older nonconflicting
 // answers when they are absent from the newer snapshot only if newer was exam.
 const normalizedLegacy={};
 for(const [key,value] of Object.entries(legacy?.answers||{})){
  const id=adaptSourceKey(key,n);
  if(ids.has(id)&&typeof value==="string"&&value.trim())normalizedLegacy[id]=value;
 }
 const examAnswers=cleanMap(oldExam?.answers,ids);
 const newerSource=(Number(legacy?.updated)||Number(source?.updatedAt)||0)>Number(exam?.updatedAt||0);
 const answers=newerSource?{...normalizedLegacy}:{...normalizedLegacy,...examAnswers};
 const checked=cleanMap(oldExam?.checked,ids),revealed=cleanMap(oldExam?.revealed,ids);
 for(const id of ids){
  if(!answers[id]||String(answers[id])!==String(examAnswers[id]||"")){delete checked[id];delete revealed[id]}
 }
 const flags={};
 for(const [k,v] of Object.entries(legacy?.flags||{})){const id=adaptSourceKey(k,n);if(ids.has(id)&&v)flags[id]=true}
 const newestIndex=newerSource?legacy?.index:oldExam?.index;
 const updatedAt=Math.max(Number(exam?.updatedAt)||0,Number(legacy?.updated)||0,Number(source?.updatedAt)||0);
 return sanitize({unifiedVersion:VERSION,answers,checked,revealed,flags,index:bounded(newestIndex,questions.length),
  startedAt:Number(oldExam?.startedAt)||Date.now(),
  submissionId:oldExam?.submissionId||g.LearningCore?.uuid?.()||String(Date.now()),
  recorded:!!oldExam?.recorded&&Object.keys(checked).length===questions.length,
  updatedAt},ids,questions.length,n);
}
function sanitize(d,ids,length,n){
 d.unifiedVersion=VERSION;
 d.answers=cleanMap(d.answers,ids);d.checked=cleanMap(d.checked,ids);
 d.revealed=cleanMap(d.revealed,ids);d.flags=cleanMap(d.flags,ids);
 d.index=bounded(d.index,length);d.startedAt=Number(d.startedAt)||Date.now();
 d.submissionId=d.submissionId||g.LearningCore?.uuid?.()||String(Date.now());
 d.updatedAt=Number(d.updatedAt)||Date.now();
 for(const id of ids)if(!String(d.answers[id]||"").trim()){delete d.checked[id];delete d.revealed[id]}
 return d;
}
function save(n,d){
 d.unifiedVersion=VERSION;d.updatedAt=Date.now();
 if(account())return !!g.LearningCore?.writeDraft?.("exam",testKey(n),d);
 try{g.localStorage.setItem(guestKey(n),JSON.stringify(d));return true}
 catch(e){console.warn("Unable to persist Mid Term Test draft",e);return false}
}
function reset(n){
 if(account()){g.LearningCore?.clearDraft?.("exam",testKey(n));g.LearningCore?.clearDraft?.("exam-source",sourceKey(n))}
 else try{g.localStorage.removeItem(guestKey(n))}catch(_){}
}
g.G10MidtermProgress={start,save,reset,account,guestKey};
})(window);