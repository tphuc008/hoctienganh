/* HSG Hai Phong editorial explanation preview regression test.
 * node --test tests/hsg-hai-phong-explanations.test.cjs
 * Intentionally does NOT certify the six inferred answers as an official key.
 */
const test=require("node:test"),assert=require("node:assert/strict");
const fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const root=path.resolve(__dirname,"..");
const read=p=>fs.readFileSync(path.join(root,p),"utf8");
const ctx={window:{}};
vm.runInNewContext(read("features/hsg-hai-phong-v11-full.js"),ctx);
vm.runInNewContext(read("features/hsg-hai-phong-explanations.js"),ctx);
vm.runInNewContext(read("features/hsg-hai-phong-explanation-formats.js"),ctx);
vm.runInNewContext(read("features/explanation-v1.js"),ctx);
const M=ctx.window.HSGHaiPhongExplanations,E=ctx.window.ExplanationV1,F=ctx.window.HSGHaiPhongFormat;
const data=JSON.parse(read("content/hsg-tinh/hai-phong.structured.json"));
test("Editorial Hai Phong reference count is 80 question records plus essay preview, no global grading",()=>{
 assert.equal(M.numbers.length,81);
 assert.equal(M.numbers[0],21);
 assert.equal(M.numbers[79],100);
 assert.equal(M.numbers[80],1);
 assert.equal(M.available("son-la","g2b",46,{options:[]},"We would like to (46)"),false);
 assert.equal(M.available("hai-phong","g2b",46,{options:["invalid","invalid","invalid","invalid"]},"We would like to (46)"),false);
 assert.equal(M.available("hai-phong","g2b",45,{options:[]},"When comparing all smart homes"),false);
});
test("All 40 structured questions have source-gated editorial explanation specs",()=>{
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
 assert.equal(found,40);
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
 assert.match(read("features/hsg-hai-phong-explanation-formats.js"),/không dùng để chấm điểm/);
 assert.match(js,/data-hsg-exp-jump/);
 assert.ok(ix.indexOf("features/hsg-hai-phong-explanations.js")<ix.indexOf("features/hsg-hai-phong-explanation-formats.js"));
 assert.ok(ix.indexOf("features/hsg-hai-phong-explanation-formats.js")<ix.indexOf("features/hsg-tinh.js"));
 assert.match(js,/global\.HSGHaiPhongFormat\?\.render/);
 assert.equal(M.available("phu-tho","e",51,{type:"error"},fragment),false);
});

test("Hai Phong-only formats render by task type and preserve sentence transformation",()=>{
 const from=(id,number)=>{
  const part=data.parts.find(p=>p.id===id),q=part.questions.find(x=>x.number===number);
  const passage=part.passage.map(x=>x.text).join("\n");
  const spec=M.spec("hai-phong",id,number,q,passage);
  return {q,p:passage,s:spec,html:F.render(id,number,q,passage,spec)};
 };
 const a=from("g2b",47);
 assert.match(a.html,/Giải thích collocation/);
 assert.match(a.html,/Dịch \/ nghĩa tiếng Việt/);
 assert.equal((a.html.match(/class="ev1-example/g)||[]).length,4);
 const b=from("oc",68);
 assert.match(b.html,/Căn cứ/);
 assert.match(b.html,/Loại trừ/);
 assert.match(b.html,/Ghi nhớ/);
 const c=from("rc",80);
 assert.match(c.html,/Context Clue/);
 assert.match(c.html,/Coherence/);
 assert.match(c.html,/Elimination/);
 assert.match(c.html,/Some simply imagine conversations in their heads/);
 const d=from("r",83);
 assert.match(d.html,/Question Focus/);
 assert.match(d.html,/Locate/);
 assert.match(d.html,/required to stay at home/);
 assert.match(d.html,/lack of ability/);
 const e=from("wp",61);
 assert.match(e.html,/promote \(động từ\)/);
 assert.match(e.html,/Từ loại cần điền/);
 const error=F.render("e",51,{stem:"Identify errors"},
  "Peer pressure is a psychological force that influence many teenagers",
  M.spec("hai-phong","e",51,{type:"error",stem:"Identify errors"},
  "Peer pressure is a psychological force that influence many teenagers"));
 assert.match(error,/Dòng/); assert.match(error,/Vì sao sai/);
 const w=F.render("w",91,{stem:"sentence transformation"},"",{
  answer:"Example",quickReason:"Explanation",reasoning:"Rule"});
 assert.equal(w,null);
});
