/* Canonical learner history: preserve legacy rows, collapse only proven identical
 * submission IDs. Never guess duplicates based on a nearby timestamp. */
(function(global){
 "use strict";
 const names={exam:"Đề thi",school:"Học trên trường",listening:"Listening",
   grammar:"Grammar",vocabulary:"Vocabulary",reading:"Reading"};
 const id=x=>String(x||"").toLowerCase().trim();
 const time=x=>{const n=Date.parse(x||"");return Number.isFinite(n)?n:0};
 function merge(primary=[],vocab=[],reading=[]){
  const found=new Set();
  const out=[];
  const append=(row,identifier)=>{
   if(identifier&&found.has(identifier))return;
   if(identifier)found.add(identifier);
   out.push(row);
  };
  primary.forEach((x,i)=>{
   const uuid=id(x.submission_id);
   append({key:uuid||"primary-"+i,source:"canonical",category:x.category,
    slug:x.exercise_slug||"",title:x.exercise_slug||"Bài tập",
    correct:Number(x.correct_answers)||0,total:Number(x.total_questions)||0,
    date:x.created_at,metric:x.category==="vocabulary"||x.category==="grammar"||x.category==="school"
      ?"first_try":"correct",submissionId:uuid},uuid);
  });
  // Any score with a linked UUID is the same attempt as a canonical row of that ID.
  vocab.forEach((x,i)=>{
   const uuid=id(x.practice_submission_id);
   const grade=Number(x.grade),unit=Number(x.unit_no),set=Number(x.set_no);
   append({key:uuid||"vocab-"+(x.id??i),source:"legacy",category:"vocabulary",
    slug:"grade-"+grade+"/unit-"+unit+"/set-"+set,
    title:"Lớp "+grade+" · Unit "+unit+" · Set "+set,
    correct:Number(x.first_try_correct)||0,total:Number(x.total_questions)||0,
    date:x.created_at,metric:"first_try",submissionId:uuid},uuid);
  });
  reading.forEach((x,i)=>{
   const uuid=id(x.submission_id);
   append({key:uuid||"reading-"+(x.id??i),source:"legacy",category:"reading",
    slug:x.exercise_slug||"",title:x.exercise_title||x.exercise_slug||"Reading",
    correct:Number(x.score)||0,total:Number(x.total_questions)||0,
    date:x.created_at,metric:"correct",submissionId:uuid},uuid);
  });
  // Descending time, stable for equal dates.
  return out.map((row,index)=>({...row,index})).sort((a,b)=>time(b.date)-time(a.date)||a.index-b.index);
 }
 function totals(rows){
  const counts={};
  rows.forEach(x=>{counts[x.category]=(counts[x.category]||0)+1});
  return {attempts:rows.length,byCategory:counts};
 }
 global.LearningHistoryCore=Object.freeze({merge,totals,names});
})(window);
