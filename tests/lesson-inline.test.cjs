const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");
const root=path.join(__dirname,"..");
const read=p=>fs.readFileSync(path.join(root,p),"utf8");
test("Unit 7 publishes the complete original handout without solutions",()=>{
 const window={};vm.runInNewContext(read("content/lesson-plans-data.js"),{window});
 const unit=window.LessonPlanCatalog.units.find(u=>u.id===7);
 assert.ok(unit.lessonPublished);
 assert.equal(unit.originalExercises.length,40);
 assert.equal(new Set(unit.originalExercises.map(q=>q.id)).size,40);
 for(let i=0;i<40;i++){
   const q=unit.originalExercises[i];
   assert.equal(q.id,"u7-v10-"+String(i+1).padStart(2,"0"));
   assert.equal(q.options.length,4);
   assert.ok(q.text.length>25);
   for(const forbidden of ["answer","correctIndex","explanation","why","choices"])assert.ok(!(forbidden in q),"Private answer field exposed: "+forbidden);
 }
 assert.equal(unit.originalExercises.filter(q=>q.part==="context").length,28);
 assert.equal(unit.originalExercises.filter(q=>q.part==="closest").length,6);
 assert.equal(unit.originalExercises.filter(q=>q.part==="opposite").length,6);
});
test("Lesson page uses protected Semantic Precision explanations",()=>{
 const js=read("features/lesson-plans.js");
 assert.match(js,/function originalQuestion\(q,n\)/);
 assert.match(js,/getKey\(q\.id\)/);
 assert.match(js,/class="lp-inline-answer"/);
 assert.match(js,/function semanticExplanation\(q,k,forPrint=false\)/);
 assert.match(js,/class="semantic-step"/);
 assert.match(js,/semantic-options-grid/);
 assert.match(js,/semantic-examples-grid/);
 assert.match(js,/semantic-remember/);
 assert.match(js,/accessAllowed\(\)/);
 assert.doesNotMatch(js,/data-lp-tab/);
 assert.match(js,/loadAccess\(n\)/);
 assert.match(js,/function openUnitPage\(id,chosenPage\)/);
});

test("Unit 7 has three distinct, addressable learning pages",()=>{
 const window={};
 vm.runInNewContext(read("content/manifest.js"),{window,document:{},console});
 const entries=window.ContentManifest.entries;
 const pages=[
   ["grade-12/lesson-plans/unit-7","renderLessonPlansUnit"],
   ["grade-12/lesson-plans/unit-7/practice","renderLessonPlansPractice"],
   ["grade-12/lesson-plans/unit-7/print","renderLessonPlansPrint"]
 ];
 for(const [route,handler] of pages){
   const item=entries.find(x=>x.route===route);
   assert.ok(item,"Missing Unit 7 page "+route);
   assert.equal(item.kind,"handler");
   assert.equal(item.handler,handler);
 }
 const js=read("features/lesson-plans.js");
 assert.match(js,/const screens=\{lesson,practice,print:printing\}/);
 assert.match(js,/screens\[page\]\(u\)/);
 assert.match(js,/pageLink\(u,"lesson"/);
 assert.match(js,/pageLink\(u,"practice"/);
 assert.match(js,/pageLink\(u,"print"/);
 assert.match(js,/requestId!==accessRequestId/);
 assert.doesNotMatch(js,/lesson\(u\)\+'<\/section>'\+/);
});

test("Print page has part selection, two answer formats, and short keys at the end",()=>{
 const js=read("features/lesson-plans.js");
 assert.match(js,/printParts=\{context:true,closest:true,opposite:true\}/);
 assert.match(js,/data-lp-print-part/);
 assert.match(js,/\[\["key","In đề \+ đáp án ngắn"\],\["detailed","In đề \+ giải chi tiết"\]\]/);
 assert.match(js,/const answerKey=printMode==="key"/);
 assert.match(js,/content\+answerKey/);
 assert.match(js,/printMode==="detailed"\?semanticExplanation\(q,key,true\)/);
 assert.doesNotMatch(js,/\["questions","Đề bài"\]/);
 assert.doesNotMatch(js,/printMode="questions"/);
 assert.match(js,/!accessAllowed\(\)\|\|!selected.length/);
});
