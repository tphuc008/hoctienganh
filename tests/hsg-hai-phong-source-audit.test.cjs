/* Hai Phong source-paper fidelity audit.
 * Run with: node tests/hsg-hai-phong-source-audit.test.cjs
 * This test inspects the compressed original source, not guessed mock exam text.
 */
"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");
const zlib=require("node:zlib");
const root=path.resolve(__dirname,"..");
const read=p=>fs.readFileSync(path.join(root,p),"utf8");
const packed=read("content/hsg-tinh/hai-phong.txt").trim();
const original=JSON.parse(zlib.gunzipSync(Buffer.from(packed,"base64")).toString("utf8"));
assert.equal(original.id,"hai-phong");
const pages=original.pages;
const byPage=n=>pages.find(p=>p.sourcePage===n)?.text||"";
assert.ok(pages.length>=7,"Original examination pages must be present");
assert.match(byPage(4),/Identify 5 errors in the text below/i);
assert.match(byPage(4),/Question 51/);
assert.match(byPage(7),/THREE AND SIX\s*\n?\s*WORDS/i);
assert.match(byPage(7),/Do not change this word in any way/i);
assert.match(byPage(7),/Question 100/);
assert.match(byPage(7),/Part 3\. Paragraph writing/i);
const browser={};
const errorLines=read("features/hsg-error-lines.js");
vm.runInNewContext(errorLines,{window:browser});
const extracted=browser.HSGErrorLines.extract("hai-phong",byPage(4));
assert.equal(extracted.verified,true);
const passage=browser.HSGErrorLines.parse(extracted.text);
assert.equal(passage.hasOriginalLines,true,"Retain numbered lines rather than arbitrary OCR wrapping");
assert.equal(passage.lines.length,12);
assert.equal(passage.lines[0].number,1);
assert.equal(passage.lines.at(-1).number,12);
const app=read("features/hsg-tinh.js");
const signature="global.TeacherHSG={open,catalogue:CONFIGS};";
assert.equal(app.split(signature).length-1,1);
const injected=app.replace(signature,signature+"global.__HSG_AUDIT__={state,getQuestion};");
vm.runInNewContext(injected,{window:browser,document:{}});
const {state,getQuestion}=browser.__HSG_AUDIT__;
state.exam={id:"hai-phong"};
state.data={pages};
function assertComplete(group,from,to){
 for(let n=from;n<=to;n++){
  const q=getQuestion(group,n);
  assert.ok(q.stem&&q.stem.length>12,"Question "+n+" must have its complete source stem");
  if(group.kind==="mcq"){
   assert.ok(Array.isArray(q.options)&&q.options.length===4,"Question "+n+" lacks 4 source choices");
   assert.ok(q.options.every(a=>a.trim().length>0),"Question "+n+" has an empty option");
  }
 }
}
assertComplete({id:"g1",kind:"mcq",pages:[2,3]},21,40);
assertComplete({id:"wf",kind:"word",pages:[4]},56,60);
assertComplete({id:"w",kind:"rewrite",pages:[7]},91,100);
const q100=getQuestion({id:"w",kind:"rewrite",pages:[7]},100);
assert.ok(q100.stem.includes("The fire in"),"Q100 must retain its answer prompt");
assert.doesNotMatch(q100.stem,/Paragraph writing|Some people think that parents should involve/i,
 "Removed essay must not leak into question 100");
const q29=getQuestion({id:"g1",kind:"mcq",pages:[2,3]},29);
assert.equal(q29.options[0],"Were you to require");
assert.equal(q29.options[1],"Should you require");
assert.equal(q29.options[2],"Required");
assert.equal(q29.options[3],"Had you required");
const manifest=JSON.parse(read("content/hsg-tinh/hai-phong.workspace.json"));
const errorTask=manifest.parts.find(p=>p.id==="e").task;
assert.equal(errorTask.errorCount,5);
assert.equal(errorTask.numberedSourceLines.end,passage.lines.length);
const tasks=manifest.parts.find(p=>p.id==="w").subtasks;
assert.equal(tasks[0].start,91);
assert.equal(tasks[0].end,95);
assert.equal(tasks[0].minWords,3);
assert.equal(tasks[0].maxWords,6);
assert.equal(tasks[1].start,96);
assert.equal(tasks[1].end,100);
assert.equal(tasks[1].maxWords,undefined);
console.log("Hai Phong source fidelity: Q21-40, Q56-60, Q91-100, Q29 page split, Q100 essay boundary, and 12 original correction lines verified.");
