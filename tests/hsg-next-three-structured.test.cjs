"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");
const zlib=require("node:zlib");
const root=path.resolve(__dirname,"..");
const runtime={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,"features/hsg-part-system.js"),"utf8"),runtime);
vm.runInNewContext(fs.readFileSync(path.join(root,"features/hsg-workspace-v1.js"),"utf8"),runtime);
const typed=runtime.window.HSGPartSystem;
const workspaces=runtime.window.HSGWorkspaceV1;
const expected={
 "dh-vinh":{c2:[11,15,"yes_no_not_given"],c4:[19,23,"matching"]},
 "phu-tho":{r1:[51,60,"guided_cloze"],r2:[61,70,"open_cloze"],r3:[71,80,"reading_comprehension"]},
 "son-la":{g1:[26,30,"guided_cloze"],g2:[31,40,"guided_cloze"],oc:[51,55,"open_cloze"],r:[61,67,"reading_comprehension"]}
};
const norm=s=>String(s).replace(/[\\u200b-\\u200d\\ufeff]/g," ").replace(/\\s+/g," ").trim();
for(const [id,parts] of Object.entries(expected)){
 const folder=path.join(root,"content/hsg-tinh");
 const doc=JSON.parse(fs.readFileSync(path.join(folder,id+".structured.json"),"utf8"));
 const workspace=JSON.parse(fs.readFileSync(path.join(folder,id+".workspace.json"),"utf8"));
 const compressed=fs.readFileSync(path.join(folder,id+".txt"),"utf8").trim();
 const source=JSON.parse(zlib.gunzipSync(Buffer.from(compressed,"base64")).toString("utf8"));
 const text=norm(source.pages.map(p=>p.text).join("\\n"));
 test(id+": schema, source boundaries and workspace alignment",()=>{
  assert.equal(typed.validate(doc,id),doc);
  assert.deepEqual(Object.keys(parts).sort(),doc.parts.map(p=>p.id).sort());
  for(const p of doc.parts){
   const [first,last,kind]=parts[p.id];
   assert.deepEqual([p.start,p.end,p.kind],[first,last,kind]);
   const ws=workspace.parts.find(x=>x.id===p.id);
   assert.ok(ws&&ws.source==="structured","workspace must select typed source for "+p.id);
   assert.equal(ws.input,typed.KINDS[kind]);
   for(const block of p.passage){
    assert.ok(text.includes(norm(block.text)),"passage not supported by source: "+p.id+" / "+block.text.slice(0,60));
   }
   for(let n=first;n<=last;n++){
    const q=typed.question(p,n);
    assert.ok(q&&q.number===n&&q.stem.trim());
    if(["guided_cloze","open_cloze"].includes(kind)){
     const markup=typed.renderPassage(p,{},p.id,n,x=>String(x));
     assert.match(markup,new RegExp('data-hsg-gap="'+n+'"'));
    }
    if(q.type==="mcq"){
     assert.equal(q.options.length,4);
     for(const choice of q.options)assert.ok(text.includes(norm(choice)),"choice not in original exam "+id+"/"+p.id+"/"+n);
    }else assert.equal(q.options,undefined);
   }
  }
 });
}
test("new datasets never embed solutions or substitute fabricated A–D for YES/NO/NOT GIVEN or Matching",()=>{
 for(const id of Object.keys(expected)){
  const data=JSON.parse(fs.readFileSync(path.join(root,"content/hsg-tinh",id+".structured.json"),"utf8"));
  assert.doesNotMatch(JSON.stringify(data),/correctAnswer|distractorAnalysis|answerKey|isCorrect/);
  for(const p of data.parts.filter(p=>["yes_no_not_given","matching"].includes(p.kind))){
   assert.ok(p.questions.every(q=>!Object.hasOwn(q,"options")));
   const html=typed.renderPassage(p,{},p.id,p.start,x=>String(x));
   assert.match(html,/hsg-schema-passage/);
  }
 }
});
test("Phú Thọ conversation heading appears exactly once",()=>{
 const doc=JSON.parse(fs.readFileSync(path.join(root,"content/hsg-tinh/phu-tho.structured.json"),"utf8"));
 const part=typed.getPart(doc,"r3");
 const title="NOW EVERYONE IS CONNECTED, IS THIS THE DEATH OF CONVERSATION?";
 assert.equal(part.passage.filter(x=>x.text.includes(title)).length,1);
 assert.equal(part.passage[0].type,"heading");
});
