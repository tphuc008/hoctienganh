/* node tests/hsg-explanation-seven-exams.test.cjs */
"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const root=path.resolve(__dirname,"..");
const get=p=>fs.readFileSync(path.join(root,p),"utf8");
const modules={},win={};
for(const p of ["features/explanation-v1.js","features/hsg-workspace-v1.js","features/hsg-exam-solutions-v1.js"]){
 modules[p]=get(p);vm.runInNewContext(modules[p],{window:win});
}
const source=get("features/hsg-tinh.js");
const idList=[
 ["hai-phong",10,80,null],
 ["dh-vinh",11,91,90],
 ["phu-tho",8,71,70],
 ["son-la",12,57,55],
 ["tay-ninh",9,66,10],
 ["thanh-hoa",11,71,10],
 ["phan-boi-chau",11,77,10],
 ["ptnk",4,520,0]
];
const selector=(id)=>{
 const marker=' "'+id+'":[[',start=source.indexOf(marker);
 assert.ok(start>=0,"No exam canonical parts "+id);
 const end=source.indexOf('\n "',start+5);
 return [...source.slice(start,end>=0?end:undefined).matchAll(/\["([^"]+)","([^"]+)",(\d+),(\d+),"([^"]+)",\[[^\]]*\]\]/g)]
 .map(x=>[x[1],x[2],+x[3],+x[4],x[5],[]]);
};
const docs={};
for(const [id,count,total,solutionsCount] of idList){
 const conf=JSON.parse(get("content/hsg-tinh/"+id+".workspace.json"));
 const parts=selector(id);
 const structured=id==="hai-phong"?JSON.parse(get("content/hsg-tinh/hai-phong.structured.json")):null;
 const validated=win.HSGWorkspaceV1.validate(conf,id,parts,structured);
 assert.equal(validated.parts.length,count);
 assert.equal(validated.questionTotal,total);
 if(solutionsCount===null)continue;
 const answers=JSON.parse(get("content/hsg-tinh/"+id+".solutions.json"));
 const sections=parts.map(x=>({id:x[0],name:x[1],start:x[2],end:x[3],kind:x[4]}));
 win.HSGExamSolutions.validate(answers,id,sections);
 assert.equal(answers.records.length,solutionsCount);
 assert.ok(answers.records.every(r=>r.provenance?.official===false));
 for(const record of answers.records.slice(0,Math.min(8,answers.records.length))){
  const part=sections.find(x=>x.id===record.partId);
  const question={type:part.kind,options:part.kind==="mcq"?["Option A","Option B","Option C","Option D"]:null};
  const spec=win.HSGExamSolutions.asExplanationV1(record,question,part);
  const html=win.ExplanationV1.render(spec);
  for(const heading of ["Bằng chứng","Phân tích","Vận dụng"]){
   assert.ok(html.includes(heading),id+" missing "+heading+" "+record.partId+":"+record.number);
  }
  assert.ok(html.includes("Đáp án:"));
 }
 docs[id]={workspace:conf,solutions:answers};
}
let captured="";
const page={style:{display:"block"},set innerHTML(text){captured=text;throw Error("CAPTURED")}};
const doc={getElementById(id){return id==="pageMount"?page:null}};
const code=source.replace("global.TeacherHSG={open,catalogue:CONFIGS};",
 "global.TeacherHSG={open,catalogue:CONFIGS};global.__audit={state,renderExam,hsgExplanationControl};");
assert.notEqual(code,source);
vm.runInNewContext(code,{window:win,document:doc});
for(const [id,count,total,solutionsCount] of idList.filter(x=>x[3]!==null)){
 const state=win.__audit.state;
 state.exam={id,title:id,subtitle:"Exam",year:"2026"};
 state.data={workspace:docs[id].workspace,solutions:docs[id].solutions,pages:[],structured:null};
 state.group=docs[id].workspace.parts[0].id;
 state.question=docs[id].workspace.parts[0].start;
 state.answers={};state.review={};state.resultVisible=false;state.answerReviewUnlocked=false;
 assert.throws(()=>win.__audit.renderExam(),/CAPTURED/);
 assert.ok(captured.includes("hsg-hp-focusbar"),"Missing shared header "+id);
 assert.equal((captured.match(/<option value=/g)||[]).length,count);
 if(!docs[id].solutions.records.length)continue;
 const answer=docs[id].solutions.records[0];
 const group={id:answer.partId,kind:docs[id].workspace.parts.find(p=>p.id===answer.partId).input};
 const q={type:group.kind,options:group.kind==="mcq"?["A choice","B choice","C choice","D choice"]:null};
 assert.equal(win.__audit.hsgExplanationControl(group,answer.number,q),"","Solutions revealed before finishing "+id);
 state.answerReviewUnlocked=true;
 const panel=win.__audit.hsgExplanationControl(group,answer.number,q);
 assert.ok(panel.includes("data-explanation-v1")&&panel.includes("ev1-step"),"Native renderer absent "+id);
}
const index=get("index.html");
assert.ok(index.includes("features/explanation-v1.js"));
assert.ok(index.includes("features/hsg-exam-solutions-v1.js?v=20261023-explanation-v3"));
assert.ok(index.includes("features/hsg-tinh.js?v=20261023-explanation-v3"));
assert.ok(index.includes("features/hsg-print.css?v=20261021-error-lines-v1"));
console.log("Eight HSG exam workspaces and seven solution banks use the original three-step explanation renderer.");
