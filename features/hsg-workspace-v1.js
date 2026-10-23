/* Shared Exam Workspace V1: declarative layout contract, no grading or source parsing.
 * Layout describes HOW questions display, not WHAT answer is correct.
 * Written to be reusable for new provincial exams after a validated manifest exists.
 */
(function(global){
"use strict";
const LAYOUTS=new Set(["focused","split","error","reading"]);
const INPUTS=new Set(["mcq","fill","word","error","rewrite","match","ynng","tfng","essay"]);
const SOURCES=new Set(["structured","source-extracted"]);
const OPTIONS=new Set(["compact","stacked","standard"]);
const FLOW=new Set(["one-at-a-time","scroll-list"]);
const own=(value,key)=>Object.prototype.hasOwnProperty.call(value,key);
const fail=(scope,message)=>{throw Error("Exam Workspace ["+scope+"]: "+message)};
function validate(doc,examId,legacyParts,structured){
 if(!doc||doc.version!==1||doc.standard!=="exam-workspace-v1"||doc.examId!==examId)fail(examId,"invalid workspace version or ID");
 if(!Array.isArray(legacyParts)||!legacyParts.length||!Array.isArray(doc.parts))fail(examId,"missing exam parts");
 if(doc.parts.length!==legacyParts.length)fail(examId,"part count differs from the published exam");
 const numbering=doc.numbering||"continuous";
 if(!["continuous","per-part"].includes(numbering))fail(examId,"unsupported numbering convention");
 const range=doc.questionRange;
 if(numbering==="continuous"&&(!range||!Number.isInteger(range.start)||!Number.isInteger(range.end)||range.start>range.end))fail(examId,"invalid question range");
 if(numbering==="per-part"&&range!==undefined)fail(examId,"per-part numbering must not set global questionRange");
 const structuredParts=new Set((structured?.parts||[]).map(part=>part.id));
 const seen=new Set();let total=0,expectedStart=range?.start;
 const parts=doc.parts.map((part,index)=>{
  const legacy=legacyParts[index];
  if(!part||seen.has(part.id)||part.id!==legacy[0])fail(examId,"Part ID/order mismatch at "+(index+1));
  seen.add(part.id);
  if(!Number.isInteger(part.start)||!Number.isInteger(part.end)||part.start!==legacy[2]||part.end!==legacy[3])fail(part.id,"number range mismatch");
  if(numbering==="continuous"&&part.start!==expectedStart)fail(part.id,"gap or duplicate in question numbering");
  if(numbering==="continuous")expectedStart=part.end+1;
  total+=part.end-part.start+1;
  if(!INPUTS.has(part.input)||part.input!==legacy[4])fail(part.id,"input type differs from exam source");
  if(!LAYOUTS.has(part.layout)||!SOURCES.has(part.source)||!OPTIONS.has(part.optionLayout)||!FLOW.has(part.questionFlow))fail(part.id,"unsupported presentation setting");
  if(part.questionFlow!==(part.layout==="focused"?"one-at-a-time":"scroll-list"))fail(part.id,"incompatible question flow");
  if(part.source==="structured"&&!structuredParts.has(part.id))fail(part.id,"declared structured data is missing");
  if(part.source==="source-extracted"&&structuredParts.has(part.id))fail(part.id,"structured source exists; manifest source status must be updated");
  if(part.layout==="focused"){
   if(own(part,"passageRatio"))fail(part.id,"focused layout cannot define passage width");
  }else if(!Number.isInteger(part.passageRatio)||part.passageRatio<30||part.passageRatio>70)fail(part.id,"passageRatio must be 30–70");
  if(part.layout==="error"&&part.input!=="error")fail(part.id,"error correction needs error input");
  if(own(part,"task")){
   const task=part.task;
   if(part.input!=="error"||task?.kind!=="find-and-correct"||
      !Number.isInteger(task.errorCount)||task.errorCount!==part.end-part.start+1||
      !Number.isInteger(task.numberedSourceLines?.start)||!Number.isInteger(task.numberedSourceLines?.end)||
      task.numberedSourceLines.start!==1||task.numberedSourceLines.end<task.numberedSourceLines.start||
      typeof task.instruction!=="string"||!task.instruction.trim())
    fail(part.id,"invalid shared error-passage specification");
  }
  if(own(part,"subtasks")){
   if(part.input!=="rewrite"||part.layout!=="focused"||!Array.isArray(part.subtasks)||!part.subtasks.length)
    fail(part.id,"subtasks only supported for focused rewrites");
   let expected=part.start;
   for(const sub of part.subtasks){
    if(!Number.isInteger(sub.start)||!Number.isInteger(sub.end)||sub.start!==expected||sub.end<sub.start||
       sub.end>part.end||typeof sub.instruction!=="string"||!sub.instruction.trim())
     fail(part.id,"subtask range or instruction is invalid");
    expected=sub.end+1;
    if(sub.kind==="keyword-transformation"){
     if(!Number.isInteger(sub.minWords)||!Number.isInteger(sub.maxWords)||
        sub.minWords<1||sub.maxWords<sub.minWords||sub.keywordMustBeUnchanged!==true)
      fail(part.id,"keyword transformation requires a word limit and unchanged keyword");
    }else if(sub.kind==="sentence-completion"){
     if(own(sub,"minWords")||own(sub,"maxWords")||own(sub,"keywordMustBeUnchanged"))
      fail(part.id,"sentence completion cannot inherit keyword restrictions");
    }else fail(part.id,"unknown subtask kind");
   }
   if(expected!==part.end+1)fail(part.id,"rewrite subtasks leave uncovered questions");
  }
  return Object.freeze({...part});
 });
 if(numbering==="continuous"&&(expectedStart!==range.end+1||total!==range.end-range.start+1))fail(examId,"uncovered exam questions");
 if(numbering==="per-part"&&total<1)fail(examId,"empty exam");
 const settings=doc.settings||{};
 if(settings.autoSaveStatus!=="errors-only"||settings.passageScroll!=="independent"||settings.questionScroll!=="independent"||settings.mobileReadingTabs!==true)fail(examId,"unsupported workspace accessibility/scroll policy");
 if(settings.solutions){
  const policy=settings.solutions;
  if(policy.mode!=="review-first"||policy.grading!=="not-configured"||
    policy.answers!=="only-verified"||policy.explanations!=="source-grounded")
   fail(examId,"unverified solution policy");
 }
 return Object.freeze({...doc,parts:Object.freeze(parts),questionTotal:total});
}
function getPart(doc,id){return doc?.parts?.find(part=>part.id===id)||null}
function getSubtask(part,number){return part?.subtasks?.find(sub=>number>=sub.start&&number<=sub.end)||null}
function className(part){return part&&LAYOUTS.has(part.layout)?"hsg-exam-ws-v1 hsg-exam-mode--"+part.layout:""}
global.HSGWorkspaceV1=Object.freeze({version:"1.2",validate,getPart,getSubtask,className});
})(window);
