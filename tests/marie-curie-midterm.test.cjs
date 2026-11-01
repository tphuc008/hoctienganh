/* Regression checks for the user-supplied Marie Curie midterm import. */
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const vm=require("node:vm");
const path=require("node:path");
const ROOT=path.resolve(__dirname,"..");
function load(p,window){
 const sandbox={window,console,location:{hash:"#grade-10/mid-term-test"},document:{}};
 vm.runInNewContext(fs.readFileSync(path.join(ROOT,p),"utf8"),sandbox,{filename:p});
 return window;
}
const win={};
load("content/grade10-midterm-marie-curie.js",win);
load("content/grade10-midterm-marie-explanations.js",win);
load("features/grade10-midterm-six-tests.js",win);
const test7=win.G10_MIDTERM_MARIE.test;
test("Marie Curie test preserves exactly the 69 supplied question numbers",()=>{
 assert.equal(test7.id,7);
 assert.equal(test7.questions.length,69);
 assert.deepEqual(Array.from(test7.questions,x=>x.number),[
  ...Array.from({length:27},(_,i)=>i+1),
  ...Array.from({length:42},(_,i)=>i+39)
 ]);
 assert.equal(new Set(test7.questions.map(q=>q.id)).size,69);
 assert.equal(win.G10_MIDTERM_MARIE.paper.questions.length,69);
 assert.ok(win.G10MidtermPaperParser.correctCounts(win.G10_MIDTERM_MARIE.paper,7));
});
test("All MCQs have four choices; every other exercise has a written response",()=>{
 for(const q of test7.questions){
  assert.ok(q.hint&&q.stem&&q.answer,q.id);
  if(q.options){assert.equal(q.options.length,4,q.id)}
  else {assert.ok(q.number>=46,q.id);assert.equal(q.options,null)}
 }
});
test("Reading passages are available for questions 39–45 and faulty Q42 is unscored",()=>{
 for(const q of test7.questions.filter(q=>q.number>=39&&q.number<=45)){
  assert.ok(q.context.length>350,q.id);
 }
 const q42=test7.questions.find(q=>q.number===42);
 assert.equal(q42.answer,"N/A");
 assert.match(q42.warning,/không tính điểm/);
});
test("Detailed explanations cover the real A–D options and retain original answer text",()=>{
 for(const q of test7.questions){
  const spec=win.G10_MIDTERM_MARIE_EXPLAIN(q,q.context,{render:spec=>spec});
  assert.ok(spec.evidence.length>=1,q.id);
  assert.ok(spec.quickReason,q.id);
  if(q.options){
   assert.equal(spec.options.length,4,q.id);
   assert.ok(spec.options.every((o,i)=>o.word===q.options[i]&&o.analysis),q.id);
  } else assert.ok(spec.application,q.id);
 }
 for(const q of test7.questions.filter(q=>q.number>=11&&q.number<=19)){
  const spec=win.G10_MIDTERM_MARIE_EXPLAIN(q,q.context,{render:spec=>spec});
  assert.equal(spec.examples.length,4,q.id);
  assert.ok(spec.examples.every(x=>x.en&&x.vi),q.id);
 }
});
test("The shared Mid-term routes register Test 7 and both data dependencies",()=>{
 const m=fs.readFileSync(path.join(ROOT,"content/manifest.js"),"utf8");
 const base=fs.readFileSync(path.join(ROOT,"grade10-midterm.js"),"utf8");
 assert.match(m,/\[1,2,3,4,5,6,7\]/);
 assert.match(m,/grade10-midterm-marie-curie\.js/);
 assert.match(m,/grade10-midterm-marie-explanations\.js/);
 assert.match(base,/G10_MIDTERM_MARIE/);
 assert.match(base,/"7-42"/);
});
