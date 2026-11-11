const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");
const root=path.resolve(__dirname,"..");
const file=p=>fs.readFileSync(path.join(root,p),"utf8");
const parts=["yawning","left-handed","pacific","law","margaret"];
const bankFiles=parts.map(p=>"content/reading-original-"+p+".js");
function load(){
 const window={};const context=vm.createContext({window});
 bankFiles.forEach(f=>vm.runInContext(file(f),context,{filename:f}));
 return window.ORIGINAL_READING_BANK;
}
test("Five original Reading lessons publish 67 answer slots with unique routes and source links",()=>{
 const data=load(),lessons=Object.values(data),routes=new Set();
 assert.equal(lessons.length,5);
 let slots=0;
 lessons.forEach(l=>{
  assert.ok(l.slug&&l.title&&l.source.startsWith("https://mini-ielts.com/"));
  assert.ok(!routes.has(l.route));routes.add(l.route);
  const ids=l.questions.flatMap(q=>q.type==="choose2"?q.ids:[q.id]);
  slots+=ids.length;
  assert.deepEqual(Array.from(ids),[...Array(ids.length)].map((_,i)=>i+1),l.slug+" continuous numbering");
  assert.equal(l.groups.flatMap(g=>g.ids).join(","),l.questions.map(q=>q.id).join(","));
  assert.ok(l.paragraphs.length>=5,l.slug+" substantial independent passage");
 });
 assert.equal(slots,67);
 const manifest=file("content/manifest.js");
 lessons.forEach(l=>assert.ok(manifest.includes('route:"'+l.route+'"'),l.slug+" manifest route"));
});
test("Every answer is legal for its type and has an exact source clue and specific analysis",()=>{
 const data=load();
 for(const d of Object.values(data))for(const q of d.questions){
  assert.ok(d.paragraphs[q.p]?.includes(q.quote),d.slug+" #"+q.id+" exact evidence");
  const ex=q.explain||{};
  for(const prop of ["mechanism","trap","paraphrase"])
   assert.ok(ex[prop]?.length>=14,d.slug+" #"+q.id+" missing "+prop);
  const opts=q.options||d.banks?.[q.bank]||
   (q.type==="ynng"?["YES","NO","NOT GIVEN"]:q.type==="tfng"?["TRUE","FALSE","NOT GIVEN"]:[]).map(key=>({key}));
  if(q.type!=="input"){
   const keys=new Set(opts.map(x=>x.key));
   assert.equal(keys.size,opts.length,d.slug+" #"+q.id+" duplicate choices");
   for(const ans of Array.isArray(q.answer)?q.answer:[q.answer])
    assert.ok(keys.has(ans),d.slug+" #"+q.id+" impossible key "+ans);
  }else{
   assert.ok(q.answer&&q.maxWords<=2);
   assert.ok(d.paragraphs.some(p=>p.toLowerCase().includes(q.answer.toLowerCase())),d.slug+" #"+q.id+" absent input answer");
  }
  if(q.type==="mcq"){
   assert.equal(opts.length,4);
   assert.deepEqual(Object.keys(ex.options||{}).sort(),["A","B","C","D"],d.slug+" #"+q.id+" all distractors analysed");
  }
  if(q.type==="choose2"){
   assert.deepEqual(Array.from(q.ids),[7,8]);
   assert.equal(q.answer.length,2);
   assert.equal(new Set(q.answer).size,2);
   assert.equal(q.answer.filter(x=>["B","D"].includes(x)).length,2);
  }
 }
});
test("Reader scripts parse and answer-review validator accepts complete three-choice matching",()=>{
 const scripts=["features/reading-original-library.js","grade12-robots-reading.js","features/explanation-v1.js","features/universal-print.js"];
 scripts.forEach(p=>assert.doesNotThrow(()=>new vm.Script(file(p)),p));
 const window={};vm.runInNewContext(file("features/explanation-v1.js"),{window});
 const model={type:"reading",answer:"A",quickReason:"Precise supporting evidence",
  evidence:[{locator:"F",quote:"We should restrict their abilities",note:"Safety rationale"}],
  reasoning:"Restrict abilities for safety matches the claim.",
  options:[
   {word:"Martin Rees",correct:true,analysis:"Recommends limits for safety."},
   {word:"Daniel Wolpert",correct:false,analysis:"Compares overall benefits with risks instead."},
   {word:"Kathleen Richardson",correct:false,analysis:"Challenges the scale of existing fears."}
  ]};
 assert.equal(window.ExplanationV1.validated(model).status,"ready");
 assert.match(window.ExplanationV1.render(model),/Phân tích các phương án/);
});
