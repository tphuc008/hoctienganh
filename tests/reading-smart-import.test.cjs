const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const vm=require("node:vm");

const w={};
vm.runInNewContext(fs.readFileSync("content/reading-pacific-docs.js","utf8"),{window:w});
const d=w.SMART_READING_BANK["pacific-navigation-and-voyaging"];
const engine=fs.readFileSync("features/reading-docs-engine.js","utf8");
const manifest=fs.readFileSync("content/manifest.js","utf8");

test("Pacific PDF has all 14 original answer slots and three sections",()=>{
 assert.equal(d.questions.length,14);
 assert.deepEqual([...d.questions].map(q=>q.id),Array.from({length:14},(_,i)=>i+1));
 assert.deepEqual([...d.questions].map(q=>q.answer),["YES","NO","YES","YES","NOT GIVEN","A","C","B","D","B","C","A","D","E"]);
 assert.deepEqual([...d.groups].map(g=>g.label),["1–5","6–10","11–14"]);
 assert.deepEqual([...d.groups].flatMap(g=>[...g.ids]),Array.from({length:14},(_,i)=>i+1));
 assert.ok(d.sourceRevision&&d.sourceDocument);
});

test("Every Google Docs explanation is independently mapped and complete",()=>{
 for(const q of d.questions){
  assert.ok(q.explain.heading.startsWith("Câu "+q.id+" "));
  assert.ok(q.explain.docQuestion.startsWith("The ")||q.explain.docQuestion.length>20);
  assert.equal(q.explain.docAnswer,q.answer,"answer matches source key "+q.id);
  for(const section of ["logic","evidence","traps"]){
   assert.ok(q.explain[section]?.length>100,"incomplete "+section+" Q"+q.id);
  }
 }
 assert.equal(d.questions.find(q=>q.id===14).needsReview,true);
 assert.match(d.questions.find(q=>q.id===14).explain.traps,/MẠNH HƠN/);
});

test("Evidence anchors map to exact character ranges in the passage",()=>{
 assert.equal(d.paragraphs.length,8);
 for(const q of d.questions){
  assert.ok(Array.isArray(q.anchors)&&q.anchors.length>=1);
  for(const a of q.anchors){
   const p=d.paragraphs[a.p];
   assert.ok(p&&p.includes(a.quote),"unmatched Q"+q.id+" anchor: "+a.quote);
   assert.equal(a.p,q.p);
  }
 }
 assert.match(d.questions[0].quote,/no human population until/);
 assert.match(engine,/pane\.scrollTop=before/,"question navigation preserves reading scroll");
 assert.match(engine,/pane\.scrollTo\(\{top:Math\.max\(0,top\),behavior:"smooth"\}\)/);
 assert.match(engine,/mis-evidence/,"exact quoted characters are highlighted");
});

test("MCQ is four-way while matching endings uses a single shared A-F bank",()=>{
 const mcq=d.questions.filter(q=>q.type==="mcq");
 const endings=d.questions.filter(q=>q.type==="ending");
 assert.equal(mcq.length,5);
 assert.equal(endings.length,4);
 assert.deepEqual([...d.banks.endings].map(x=>x.key),["A","B","C","D","E","F"]);
 for(const q of mcq){
  assert.deepEqual([...q.options].map(o=>o.key),["A","B","C","D"]);
  assert.ok(q.options.some(o=>o.key===q.answer));
 }
 for(const q of endings){
  assert.equal(q.bank,"endings");
  assert.ok(d.banks.endings.some(o=>o.key===q.answer));
  assert.ok(!q.options,"endings do not repeat options on every question");
 }
 assert.ok(d.groups[2].bank==="endings");
 assert.match(manifest,/id:"reading-pacific-docs"/);
 assert.match(manifest,/renderSmartReadingExercise/);
});
