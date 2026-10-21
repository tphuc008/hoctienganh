"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");
const root=path.resolve(__dirname,"..");
const source=fs.readFileSync(path.join(root,"features/hsg-part-system.js"),"utf8");
const document=JSON.parse(fs.readFileSync(path.join(root,"content/hsg-tinh/hai-phong.structured.json"),"utf8"));
const sandbox={window:{}};
vm.runInNewContext(source,sandbox,{filename:"hsg-part-system.js"});
const system=sandbox.window.HSGPartSystem;
const htmlEscape=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;");
const expected={g2a:[41,45],g2b:[46,50],wp:[61,65],oc:[66,75],rc:[76,80],r:[81,90]};

test("Hải Phòng structured parts validate as a single source of truth",()=>{
 assert.strictEqual(system.validate(document,"hai-phong"),document);
 assert.deepEqual(Object.fromEntries(document.parts.map(p=>[p.id,[p.start,p.end]])),expected);
 assert.equal(document.parts.reduce((n,p)=>n+p.questions.length,0),40);
});
for(const part of document.parts){
 test(part.id+": each question has an exact number and independently validated source gap",()=>{
  assert.equal(part.questions.length,part.end-part.start+1);
  for(let n=part.start;n<=part.end;n++){
   const q=system.question(part,n);
   assert.equal(q.number,n);
   assert.equal(q.type,system.KINDS[part.kind]);
   if(part.kind!=="reading_comprehension"){
    const html=system.renderPassage(part,{},part.id,n,htmlEscape);
    assert.match(html,new RegExp('data-hsg-gap="'+n+'"'));
   }
   if(q.type==="mcq"){
    assert.equal(q.options.length,4);
    assert.ok(q.options.every(v=>v.trim()));
   }else assert.equal(q.options,undefined);
  }
 });
}
test("question 45, 50, 80 and 90 do not absorb the next section",()=>{
 for(const number of [45,50,80,90]){
  const part=document.parts.find(p=>p.questions.some(q=>q.number===number));
  const q=system.question(part,number);
  assert.equal(q.options.length,4);
  assert.doesNotMatch(q.options.join(" "),/\b(?:Part 3|SECTION IV|Read the following letter|Cán bộ coi thi)\b/i);
 }
});
test("document layout preserves separate headings, bullets, salutation and 3 reading paragraphs",()=>{
 const letter=system.getPart(document,"g2b");
 assert.ok(letter.passage.some(b=>b.type==="salutation"));
 assert.ok(letter.passage.some(b=>b.type==="closing"));
 assert.equal(letter.passage.filter(b=>b.type==="bullet").length,3);
 assert.equal(system.getPart(document,"r").passage.length,3);
});
test("gap uses saved student selection without exposing correct-answer keys",()=>{
 const part=system.getPart(document,"g2a");
 const html=system.renderPassage(part,{"g2a:41":{type:"mcq",value:"B"}},"g2a",41,htmlEscape);
 assert.match(html,/data-hsg-gap="41"/);
 assert.match(html,/the others/);
 assert.doesNotMatch(html,/correctAnswer|is-correct/i);
});
test("validation rejects malformed options and missing source gaps",()=>{
 const invalid=JSON.parse(JSON.stringify(document));
 invalid.parts[0].questions[0].options.pop();
 assert.throws(()=>system.validate(invalid,"hai-phong"),/options/);
 const other=JSON.parse(JSON.stringify(document));
 const block=other.parts[0].passage.find(b=>b.text.includes("(41) _____"));
 block.text=block.text.replace("(41) _____","(41)");
 assert.throws(()=>system.validate(other,"hai-phong"),/gap/);
});
