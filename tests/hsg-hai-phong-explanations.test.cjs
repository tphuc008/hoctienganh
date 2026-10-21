/* HSG Hai Phong editorial explanation preview regression test.
 * node --test tests/hsg-hai-phong-explanations.test.cjs
 * Intentionally does NOT certify the six inferred answers as an official key.
 */
const test=require("node:test"),assert=require("node:assert/strict");
const fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const root=path.resolve(__dirname,"..");
const read=p=>fs.readFileSync(path.join(root,p),"utf8");
const ctx={window:{}};
vm.runInNewContext(read("features/hsg-hai-phong-explanations.js"),ctx);
vm.runInNewContext(read("features/explanation-v1.js"),ctx);
const M=ctx.window.HSGHaiPhongExplanations,E=ctx.window.ExplanationV1;
const data=JSON.parse(read("content/hsg-tinh/hai-phong.structured.json"));
test("Only six Hai Phong explanations, no global grading or other exams",()=>{
 assert.equal(M.numbers.join(","),"46,47,48,51,61,81");
 assert.equal(M.available("son-la","g2b",46,{options:[]},"We would like to (46)"),false);
 assert.equal(M.available("hai-phong","g2b",46,{options:["invalid","invalid","invalid","invalid"]},"We would like to (46)"),false);
 assert.equal(M.available("hai-phong","g2b",45,{options:[]},"When comparing all smart homes"),false);
});
test("Five structured samples match the published original passage/options",()=>{
 let found=0;
 for(const part of data.parts)for(const q of part.questions){
  const p=part.passage.map(x=>x.text).join("\n");
  if(!M.available("hai-phong",part.id,q.number,q,p))continue;
  const s=M.spec("hai-phong",part.id,q.number,q,p);
  assert.ok(s);assert.equal(s.needsReview,true);
  assert.equal(E.validated(s).status,"needs_review");
  assert.match(E.render(s),/data-explanation-v1="1"/);
  assert.equal((E.render(s).match(/semantic-step ev1-step/g)||[]).length,3);
  if(q.options)assert.deepEqual(Array.from(s.options,x=>x.word),q.options);
  if(s.type==="vocabulary"){
   assert.equal(s.examples.length,4);
   for(const example of s.examples)assert.ok(example.en&&example.vi);
  }
  if(q.number===81)assert.equal(s.evidence.length,3);
  found++;
 }
 assert.equal(found,5);
});
test("Error correction sample belongs to true Hai Phong line 1",()=>{
 const fragment="Peer pressure is a psychological force that influence many teenagers";
 const q={type:"error",stem:"Identify one error"};
 assert.equal(M.available("hai-phong","e",51,q,fragment),true);
 const spec=M.spec("hai-phong","e",51,q,fragment);
 assert.equal(spec.answer,"Dòng 1: influence → influences");
 assert.equal(spec.needsReview,true);
 assert.equal(spec.options.length,0);
});
test("UI provides explicit reveal and never scores reference material",()=>{
 const js=read("features/hsg-tinh.js");
 const ix=read("index.html");
 assert.match(js,/function attachHSGExplanationControls\(/);
 assert.match(js,/data-hsg-explain-toggle/);
 assert.match(js,/global\.ExplanationV1\.render\(spec/);
 assert.match(js,/Chưa đối chiếu với đáp án chính thức/);
 assert.match(js,/data-hsg-exp-jump/);
 assert.ok(ix.indexOf("features/hsg-hai-phong-explanations.js")<ix.indexOf("features/hsg-tinh.js"));
 assert.equal(M.available("phu-tho","e",51,{type:"error"},fragment),false);
});
