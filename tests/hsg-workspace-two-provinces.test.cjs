/* Regression: reuse Hai Phong UI & solution structure for next two exams.
 * Run: node tests/hsg-workspace-two-provinces.test.cjs
 */
"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");
const base=path.resolve(__dirname,"..");
const read=p=>fs.readFileSync(path.join(base,p),"utf8");
const main=read("features/hsg-tinh.js");
const browser={};
vm.runInNewContext(read("features/hsg-workspace-v1.js"),{window:browser});
vm.runInNewContext(read("features/hsg-exam-solutions-v1.js"),{window:browser});
const index=read("index.html");
const defs=[["dh-vinh",11,91],["phu-tho",8,71]];
for(const [id,count,total] of defs){
 const m=JSON.parse(read("content/hsg-tinh/"+id+".workspace.json"));
 const solutions=JSON.parse(read("content/hsg-tinh/"+id+".solutions.json"));
 const match=main.match(new RegExp('"'+id+'":(\\[\\[[\\s\\S]*?\\]\\]),\\s*\\n "'));
 assert.ok(match,"Missing canonical groups for "+id);
 const original=JSON.parse(match[1]);
 const typed=browser.HSGWorkspaceV1.validate(m,id,original,null);
 assert.equal(typed.parts.length,count);
 assert.equal(typed.questionTotal,total);
 assert.ok(typed.parts.every(x=>x.source==="source-extracted"));
 assert.ok(typed.parts.every(x=>x.questionFlow===(x.layout==="focused"?"one-at-a-time":"scroll-list")));
 const pages=original.map(([partId,name,start,end,kind])=>({id:partId,name,start,end,kind}));
 const checked=browser.HSGExamSolutions.validate(solutions,id,pages);
 assert.equal(checked.records.length,total-1,"All objectively keyed items must have source-backed references");
 const invalid=JSON.parse(JSON.stringify(checked));
 invalid.records=[{partId:pages[0].id,number:pages[0].start,correctAnswer:"A",verified:true}];
 assert.throws(()=>browser.HSGExamSolutions.validate(invalid,id,pages));
 const attempts={[pages[0].id+":"+pages[0].start]:{type:pages[0].kind,value:checked.records[0].correctAnswer}};
 const report=browser.HSGExamSolutions.build({id,title:id,year:"2026"},pages,attempts,()=>({stem:"Source question"}),checked);
 assert.equal(report.totals.total,total);
 assert.equal(report.totals.answered,1);
 assert.ok(report.all.every(q=>["correct","wrong","review","unanswered"].includes(q.status)));
 assert.equal(report.totals.correct,1,"Correct reference must grade as correct");
 assert.equal(report.solutions.verifiedCount,total-1,"Only the essay has no single reference answer");
 assert.ok(!report.all.some(q=>q.group!=="essay"&&!q.reference),"No missing objective reference");
 assert.ok(report.all.find(q=>q.group==="essay").reference===null,"Essay must not be auto marked");
}
const v=JSON.parse(read("content/hsg-tinh/dh-vinh.workspace.json"));
assert.equal(v.numbering,"per-part");
assert.ok(v.parts.filter(x=>x.start===1).length>1,"Vinh reuses local question numbers");
const vmResult=JSON.parse(read("content/hsg-tinh/phu-tho.workspace.json"));
assert.ok(vmResult.parts.some(p=>p.id==="essay"));
assert.ok(vmResult.parts.some(p=>p.layout==="reading"));
const captures=[];
const root={style:{display:""},set innerHTML(html){captures.push(html);throw Error("HTML_CAPTURED")}};
const document={getElementById(id){return id==="pageMount"?root:null}};
const local={...browser};
const exposed=main.replace("global.TeacherHSG={open,catalogue:CONFIGS};","global.TeacherHSG={open,catalogue:CONFIGS};global.__audit={state,renderExam};");
vm.runInNewContext(exposed,{window:local,document});
for(const [id,count] of defs){
 const manifest=JSON.parse(read("content/hsg-tinh/"+id+".workspace.json"));
 for(const part of [manifest.parts[0],manifest.parts.find(p=>p.layout==="reading"),manifest.parts.find(p=>p.input==="essay")]){
  const state=local.__audit.state;
  state.exam={id,title:id,subtitle:"HSG exam",year:"2026"};
  state.data={workspace:manifest,pages:[],structured:null};
  state.group=part.id;state.question=part.start;
  state.answers={};state.review={};state.resultVisible=false;
  assert.throws(()=>local.__audit.renderExam(),/HTML_CAPTURED/);
  const html=captures.at(-1);
  assert.match(html,/hsg-hp-focusbar/);
  assert.ok(html.includes("hsg-exam-mode--"+part.layout));
  assert.equal((html.match(/<option value=/g)||[]).length,count);
  if(part.input==="essay")assert.ok(html.includes("hsg-hp-writing"));
 }
}
assert.ok(index.includes("hsg-exam-solutions-v1.js?v=20261023-keyed-answers-v2"));
assert.ok(index.includes("hsg-tinh.js?v=20261023-keyed-answers-v2"));
assert.ok(index.includes("hsg-workspace-v1.css?v=20261023-two-provinces-v2"));
console.log("Vinh and Phu Tho manifests, 160 keyed answers, conservative grading, essay exceptions and 6 UI modes validated.");
