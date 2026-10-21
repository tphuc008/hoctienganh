/* HSG Print Design System V1.1: dependency-free regression checks.
   Run from repository root: node tests/hsg-print-standard-v11.test.cjs */
"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");
const base=path.resolve(__dirname,"..");
const read=p=>fs.readFileSync(path.join(base,p),"utf8");
const window={};
vm.runInNewContext(read("features/hsg-print-engine.js"),{window});
const engine=window.HSGPrintEngine;
assert.ok(engine,"Print engine loaded");
const cases=JSON.parse(read("content/hsg-tinh/hai-phong.structured.json")).parts;
assert.equal(cases.length,6,"Structured Hai Phong pilot must retain six parts");
let itemCount=0,optionCount=0,answerCount=0;
for(const [i,part] of cases.entries()){
 const html=engine.renderStructuredPart(part,i+1);
 assert.ok(html.includes("PART "+String(i+1).padStart(2,"0")),"Part numbered");
 assert.ok(html.includes(part.title),"Part title preserved");
 assert.equal(part.questions.length,part.end-part.start+1,"Question range");
 const choices=(html.match(/class="hsg-print-choice"/g)||[]).length;
 const blanks=(html.match(/class="hsg-print-answer-cell"/g)||[]).length;
 if(["guided_cloze","reading_comprehension"].includes(part.kind)){
  assert.equal(choices,part.questions.length*4,"One A-D grid per MCQ");
  assert.equal(blanks,0);
 }else{
  assert.equal(choices,0);
  assert.equal(blanks,part.questions.length,"One answer space per cloze/word item");
 }
 itemCount+=part.questions.length;optionCount+=choices;answerCount+=blanks;
 for(const block of part.passage)assert.ok(html.includes(engine.esc(block.text.slice(0,20)).replace(/^•\s*/,"")) ||
  (block.type==="bullet"&&html.includes(engine.esc(block.text.replace(/^•\s*/,"").slice(0,20)))),
  "Original structured passage text is present");
}
assert.equal(itemCount,40);
assert.equal(optionCount,100);
assert.equal(answerCount,15);
assert.equal(engine.isCompact(["short","brief","okay","yes"]),true);
assert.equal(engine.isCompact(["a".repeat(51),"b","c","d"]),false);
assert.equal(engine.isCompact(["a".repeat(40),"b".repeat(40),"c".repeat(40),"d".repeat(40)]),false);
assert.match(engine.choiceGrid(["short","brief","okay","yes"]),/is-compact/);
assert.match(engine.choiceGrid(["a".repeat(51),"brief","okay","yes"]),/is-long/);
const paper=engine.renderPaper({
 title:"Specimen",subtitle:"Sample",year:"2026",label:"Two parts",
 countLabel:"15 items",content:cases.slice(0,2).map((p,i)=>engine.renderStructuredPart(p,i+1)).join("")
});
assert.match(paper,/data-print-standard="exam-print-v1\.1"/);
assert.match(paper,/Họ và tên/);
assert.ok(!paper.includes("answer-key"));
const css=read("features/hsg-print.css");
const screen=read("features/hsg-tinh.css");
assert.equal((css.match(/@page\s*\{/g)||[]).length,1,"Only one canonical A4 page rule");
assert.equal((css.match(/@media\s+print\s*\{/g)||[]).length,1,"Only one canonical print stylesheet block");
assert.equal((screen.match(/@page\s*\{|@media\s+print\s*\{/g)||[]).length,0,"Legacy CSS contains no print overrides");
const index=read("index.html");
assert.ok(index.indexOf("hsg-print-engine.js")>index.indexOf("hsg-part-system.js"));
assert.ok(index.indexOf("hsg-print-engine.js")<index.indexOf("features/hsg-tinh.js"));
const main=read("features/hsg-tinh.js");
assert.ok(main.includes("full?printParts():chosen"),"Full and selected parts use one print pipeline");
assert.ok(main.includes("global.HSGPrintEngine.renderStructuredPart"));
assert.ok(main.includes("global.HSGPrintEngine.renderPaper"));
console.log("HSG print V1.1 PASS: 6 parts, 40 items, 100 options, 15 answer cells; one A4 stylesheet");
