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
 "son-la":{g1:"mcq",g2:"mcq",wf:"word",pr:"fill",oc:"fill",m:"match",r:"mcq",h:"match",tf:"tfng",w:"rewrite"}
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
 assert.deepEqual(Object.fromEntries(Object.entries(docs).map(([id,d])=>[id,d.records.length])),{"dh-vinh":90,"phu-tho":70,"son-la":55});
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
   assert.ok(html.includes("data-hsg-next-three-format"));
   assert.ok(!html.includes("Một số dòng/trích dẫn còn cần đối chiếu"));
   assert.ok(!html.includes("undefined")&&!html.includes("null</p>"));
   done++;
  }
 }
 assert.equal(done,215);
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


test("Phu Tho Lexico-Grammar has 60 original bilingual A-D examples and full Vietnamese meanings",()=>{
 const d=docs["phu-tho"];
 for(let n=21;n<=35;n++){
  const r=d.records.find(x=>x.partId==="g"&&x.number===n);
  assert.equal(r.examples.length,4,"Missing A–D example for Phú Thọ "+n);
  assert.equal(r.examples.map(x=>x.word).join(""),"ABCD");
  assert.ok(r.examples.every(x=>x.en.length>20&&x.vi.length>15));
  assert.ok(r.translation.length>20,"Missing Vietnamese contextual translation "+n);
  const q={type:"mcq",stem:r.evidence[0].quote,options:["A","B","C","D"]};
  const spec=M.asExplanationV1(r,q,{kind:"mcq"});
  const html=F.render("phu-tho","g",n,q,r,spec);
  assert.equal((html.match(/class="ev1-example semantic-example"/g)||[]).length,4);
  assert.ok(!html.includes("Hiện mới có"));
 }
 for(let n=36;n<=45;n++){
  const r=d.records.find(x=>x.partId==="wf"&&x.number===n);
  assert.ok(r.baseWord&&r.partOfSpeech&&r.confusionNote);
 }
 const question30=d.records.find(x=>x.partId==="g"&&x.number===30);
 assert.deepEqual(question30.reviewChoices,["C"]);
 assert.equal(M.assess("mcq",{value:"C"},question30),"review");
 assert.match(F.render("phu-tho","g",30,{type:"mcq",stem:question30.evidence[0].quote,options:["at loggerheads","on the house","at daggers drawn","under their breath"]},question30,M.asExplanationV1(question30,{type:"mcq",options:["at loggerheads","on the house","at daggers drawn","under their breath"]},{kind:"mcq"})),/cũng có cơ sở ngôn ngữ/);
});


test("All 55 Sơn La answerable questions have source-specific evidence and type-aligned answers",()=>{
 const d=docs["son-la"],groups=examGroups["son-la"],counts={};
 const keys=new Set(d.records.map(r=>r.partId+":"+r.number));
 for(const r of d.records){
  counts[r.partId]=(counts[r.partId]||0)+1;
  assert.ok(r.evidence[0].quote.length>=20,"Missing context for "+r.partId+":"+r.number);
  assert.ok(r.explanation.length>=30,"Missing causal explanation for "+r.partId+":"+r.number);
  assert.ok(r.transferablePattern.length>=10,"Missing transferable pattern for "+r.partId+":"+r.number);
  const q={type:groups[r.partId],stem:r.evidence[0].quote,options:["A","B","C","D"]};
  const html=F.render("son-la",r.partId,r.number,q,r,M.asExplanationV1(r,q,{kind:groups[r.partId]}));
  if(r.partId!=="w")assert.ok(html&&html.includes("Đáp án"),"No answer card "+r.partId+":"+r.number);
 }
 for(const [part,start,end] of [["g1",26,30],["g2",31,40],["wf",41,45],["pr",46,50],["oc",51,55],["m",56,60],["r",61,67],["h",68,71],["tf",72,75],["w",76,80]])
  for(let n=start;n<=end;n++)assert.ok(keys.has(part+":"+n),"Missing Son La "+part+":"+n);
 assert.deepEqual(counts,{g1:5,g2:10,w:5,wf:5,pr:5,oc:5,m:5,r:7,h:4,tf:4});
 for(let n=26;n<=40;n++){
  const r=d.records.find(r=>r.number===n);
  assert.equal(r.examples.length,4,"Four distinct A–D examples for "+n);
  assert.equal(r.examples.map(e=>e.word).join(""),"ABCD");
  assert.equal(r.optionNotes.length,4,"Four option explanations for "+n);
 }
});
test("Ambiguous source questions are never categorically marked wrong",()=>{
 const d=docs["son-la"];
 for(const [part,n,alternative,main] of [["g2",34,"C","A"],["g2",36,"B","A"],["g2",38,"B","C"]]){
  const r=d.records.find(r=>r.partId===part&&r.number===n);
  assert.equal(r.correctAnswer,main);
  assert.ok(r.reviewChoices.includes(alternative));
  assert.equal(M.assess("mcq",{value:alternative},r),"review");
  assert.equal(M.assess("mcq",{value:main},r),"correct");
 }
 for(const [n,alt] of [[54,"because"],[54,"as"],[55,"fully"],[55,"better"]]){
  const r=d.records.find(r=>r.partId==="oc"&&r.number===n);
  assert.ok(r.acceptedAnswers.includes(alt));
  assert.equal(M.assess("fill",{value:alt},r),"correct");
 }
});
test("Both Sơn La open-writing tasks contain independent word-count-compliant models",()=>{
 const d=docs["son-la"];
 const tasks=d.essayGuidances;
 assert.equal(tasks.length,2);
 assert.equal(tasks.map(x=>x.partId).join(","),"email,essay");
 const w=s=>s.trim().split(/\s+/).length;
 for(const x of tasks){
  assert.equal(x.wordCount,w(x.sample));
  assert.ok(M.essayExplanationV1(x).application===x.sample);
  assert.ok(x.criteria.length>=4);
 }
 assert.ok(w(tasks[0].sample)>=70&&w(tasks[0].sample)<=80);
 assert.ok(w(tasks[1].sample)>=140&&w(tasks[1].sample)<=160);
});


test("Two Sơn La writing guides are routed to their own post-submit part",()=>{
 const source=read("features/hsg-tinh.js");
 assert.match(source,/bank\?\.essayGuidances\?\.find\(x=>x\.partId===g\.id\)/);
 const d=docs["son-la"];
 const parts=[
  {id:"email",name:"Email Writing",start:1,end:1,kind:"essay"},
  {id:"essay",name:"Paragraph Writing",start:1,end:1,kind:"essay"}
 ];
 const report=M.build({id:"son-la",title:"Sơn La",year:"2026–2027"},parts,{},()=>({type:"essay",stem:"Writing task"}),d);
 assert.equal(report.solutions.essayGuidances.length,2);
 assert.equal(report.parts.length,2);
 for(const part of report.parts){
  const guide=report.solutions.essayGuidances.find(x=>x.partId===part.id);
  assert.ok(guide);
  assert.equal(M.essayExplanationV1(guide).application,guide.sample);
 }
});
