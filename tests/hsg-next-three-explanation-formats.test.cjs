/* node --test tests/hsg-next-three-explanation-formats.test.cjs */
"use strict";
const test=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),vm=require("node:vm"),path=require("node:path"),zlib=require("node:zlib");
const root=path.resolve(__dirname,".."),read=p=>fs.readFileSync(path.join(root,p),"utf8");
const win={};
for(const file of ["features/hsg-exam-solutions-v1.js","features/hsg-next-three-explanation-formats.js"])
 vm.runInNewContext(read(file),{window:win});
const F=win.HSGNextThreeFormat,M=win.HSGExamSolutions;
const examGroups={
 "dh-vinh":{b1:"mcq",b2:"error",b3:"word",c1:"mcq",c2:"ynng",c3:"fill",c4:"match",c5:"fill",c6:"match",d:"rewrite"},
 "phu-tho":{g:"mcq",wf:"word",e:"error",r1:"mcq",r2:"fill",r3:"mcq",w:"rewrite"},
 "son-la":{g1:"mcq",g2:"mcq",w:"rewrite"}
};
const docs=Object.fromEntries(Object.keys(examGroups).map(id=>[id,JSON.parse(read("content/hsg-tinh/"+id+".solutions.json"))]));
const prefixes={
 "dh-vinh:d":["Not only","If I were","You are","It was","Most modern companies insist","Anyone caught","The investors should","I don’t know","My close friend","Minh"],
 "phu-tho:w":["Never","The company expanded","Although Anna","If it had","Some people are","Linda feels like","The answer is","My teacher is never","She only called her sister for some advice","My daughter"],
 "son-la:w":["Only after","The young programmer, whose","The principal is","There is no point","Sophia has not"]
};
const writingOffset={"dh-vinh":1,"phu-tho":81,"son-la":76};
const norm=s=>String(s||"").toLowerCase().replace(/[^a-z0-9]/g,"");
const storedPaper=id=>JSON.parse(zlib.gunzipSync(Buffer.from(read("content/hsg-tinh/"+id+".txt").trim(),"base64")).toString("utf8")).pages.map(x=>x.text).join("\n");

test("Three neighboring HSG papers have an accurate number of sourced explanation records",()=>{
 assert.deepEqual(Object.fromEntries(Object.entries(docs).map(([id,d])=>[id,d.records.length])),{"dh-vinh":90,"phu-tho":70,"son-la":12});
 for(const [id,d] of Object.entries(docs)){
  const used=new Set();
  for(const record of d.records){
   assert.equal(record.verified,true);
   assert.equal(record.provenance.official,false);
   assert.equal(used.has(record.partId+":"+record.number),false);
   used.add(record.partId+":"+record.number);
   assert.ok(examGroups[id][record.partId]);
  }
 }
});
test("Every published reference uses its own subject-specific stages and remains nonofficial",()=>{
 let done=0;
 for(const [id,doc] of Object.entries(docs)){
  for(const r of doc.records){
   const kind=examGroups[id][r.partId],write=kind==="rewrite";
   const source=r.evidence[0].quote;
   const prefix=write?prefixes[id+":"+r.partId][r.number-writingOffset[id]]:"";
   const q={type:kind,stem:source+"\n"+prefix+" __________",options:["A","B","C","D"]};
   const spec=M.asExplanationV1(r,q,{kind});
   const html=F.render(id,r.partId,r.number,q,r,spec);
   assert.ok(html,id+" "+r.partId+":"+r.number+" should render");
   const labels=["Cấu trúc ngữ pháp","Ghi nhớ (Key Takeaway)","Câu hoàn chỉnh","Đáp án"];
   if(write){
    for(const label of labels)assert.ok(html.includes(label),id+" "+r.number+" missing "+label);
    assert.equal((html.match(/semantic-step-label/g)||[]).length,4);
   }else{
    assert.ok((html.match(/semantic-step-label/g)||[]).length>=3);
   }
   assert.ok(html.includes("không phải đáp án chính thức"));
   assert.ok(!html.includes("undefined")&&!html.includes("null</p>"));
   done++;
  }
 }
 assert.equal(done,172);
});
test("Original question text supports all 25 curated full sentences and source-verified prefixes",()=>{
 for(const [id,doc] of Object.entries(docs)){
  const paper=norm(storedPaper(id));
  const rows=doc.records.filter(r=>examGroups[id][r.partId]==="rewrite");
  assert.equal(rows.length,id==="son-la"?5:10);
  for(const r of rows){
   const quote=String(r.evidence[0].quote);
   const prefix=prefixes[id+":"+r.partId][r.number-writingOffset[id]];
   const quoteHead=norm(quote.split(/\s[—>]\s/)[0]).slice(0,32);
   assert.ok(paper.includes(norm(prefix)),id+" "+r.number+" prefix not in original paper");
   assert.ok(paper.includes(quoteHead),id+" "+r.number+" original not in source");
   const q={type:"rewrite",stem:quote+"\n"+prefix+" ______"};
   const spec=M.asExplanationV1(r,q,{kind:"rewrite"});
   assert.ok(F.render(id,r.partId,r.number,q,r,spec));
   assert.equal(F.render(id,r.partId,r.number,{stem:"Completely different prompt"} ,r,spec),null,
    "Source mismatch should refuse sentence completion");
  }
 }
});
test("Previously incomplete fragments are repaired without changing source constraints",()=>{
 const v=docs["dh-vinh"].records.find(r=>r.partId==="d"&&r.number===7);
 assert.equal(v.correctAnswer,"have viewed what happened in a");
 const p=docs["phu-tho"].records.find(r=>r.partId==="w"&&r.number===90);
 assert.equal(p.correctAnswer,"suddenly turned on the waterworks");
 assert.ok(p.correctAnswer.split(" ").length<=6);
});
test("Other exams and unreleased essays keep existing renderer / review behavior",()=>{
 const r=docs["phu-tho"].records[0],q={type:"mcq",stem:r.evidence[0].quote,options:["A","B","C","D"]};
 const spec=M.asExplanationV1(r,q,{kind:"mcq"});
 assert.equal(F.render("hai-phong","g",21,q,r,spec),null);
 assert.equal(F.render("tay-ninh","g",21,q,r,spec),null);
 assert.equal(F.render("phu-tho","g",21,{type:"essay",stem:q.stem},r,spec),null);
 assert.equal(F.render("phu-tho","g",21,q,null,spec),null);
 const page=read("index.html"),js=read("features/hsg-tinh.js");
 assert.ok(page.indexOf("features/hsg-exam-solutions-v1.js")<page.indexOf("features/hsg-next-three-explanation-formats.js"));
 assert.ok(page.indexOf("features/hsg-next-three-explanation-formats.js")<page.indexOf("features/hsg-tinh.js"));
 assert.ok(js.includes("!state.answerReviewUnlocked"));
 assert.ok(js.includes("global.HSGNextThreeFormat?.render"));
 assert.ok(js.includes("global.ExplanationV1.render(spec"));
});
