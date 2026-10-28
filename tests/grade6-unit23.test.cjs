const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");
const ROOT=path.resolve(__dirname,"..");
const read=p=>fs.readFileSync(path.join(ROOT,p),"utf8");
const data=(u)=>{
 const w={};
 const cx={window:w};
 vm.runInNewContext(read("content/grade6-unit"+u+"-part-a.js"),cx);
 vm.runInNewContext(read("content/grade6-unit"+u+"-part-b.js"),cx);
 return [w["G6_U"+u+"_PART_A"],w["G6_U"+u+"_PART_B"]];
};
for(const unit of [2,3]){
 test("Unit "+unit+" has exact original count, complete examples and 3 sets",()=>{
  const [a,b]=data(unit);
  const groups=[...a.groups,...b.groups,b.extra];
  const total=[...a.groups,...b.groups].reduce((n,g)=>n+g.items.length,0);
  assert.equal(total,unit===2?103:93);
  assert.equal(b.extra.items.length,30);
  assert.deepEqual([1,2,3].map(n=>b.extra.items.filter(q=>q.set===n).length),[10,10,10]);
  const ids=groups.flatMap(g=>g.items.map(q=>q.id));
  assert.equal(ids.length,new Set(ids).size);
  assert.equal(groups.some(g=>g.id==="paragraph"),false);
  assert.ok(a.words.every(g=>g.items.every(w=>w.word&&w.meaning&&w.ipa&&w.examples.length===2&&w.usage)));
  let nonReadingMcq=0;
  for(const g of groups)for(const q of g.items){
   assert.ok(q.note&&q.translation,q.id);
   if(q.kind==="mcq"){
    assert.equal(q.o.length,4,q.id);
    assert.ok(q.a===null||Number.isInteger(q.a)&&q.a>=0&&q.a<4,q.id);
    if(!g.id.startsWith("reading-")){
     nonReadingMcq++;
     assert.equal(q.examples?.length,4,q.id);
     q.examples.forEach((e,i)=>{
      assert.equal(e.word,q.o[i],q.id);
      assert.ok(e.meaning.length>=2&&e.en.length>=20,q.id+" "+i);
     });
    } else {
     assert.ok(q.readingEvidence?.length,q.id);
     q.readingEvidence.forEach(e=>assert.ok(g.passage.includes(e.text),q.id+" evidence not in passage"));
    }
   } else {
     assert.ok(Array.isArray(q.answers),q.id);
   }
  }
  assert.equal(nonReadingMcq,70);
 });
 test("Unit "+unit+" renders knowledge, original exercise, practice, and isolated feedback",()=>{
  const [a,b]=data(unit);
  const w={};
  w["G6_U"+unit+"_PART_A"]=a; w["G6_U"+unit+"_PART_B"]=b;
  const handlers={};let html="",stored=null;
  const mount={style:{},set innerHTML(v){html=v},get innerHTML(){return html}};
  const doc={
   head:{appendChild(){}},
   createElement(){return {id:"",textContent:""}},
   getElementById(id){return id==="pageMount"?mount:null},
   addEventListener(name,cb){handlers[name]=cb},
   querySelectorAll(){return []},querySelector(){return null}
  };
  w.LearningCore={
   fingerprint:()=>"fingerprint-"+unit,userId:()=>"test-student",
   readDraft:(subject,key)=>{assert.equal(key,"grade6-unit-"+unit);return stored},
   writeDraft:(subject,key,value)=>{assert.equal(key,"grade6-unit-"+unit);stored=value;return true}
  };
  w.scrollTo=()=>{};w.scrollY=0;
  vm.runInNewContext(read("features/grade6-unit"+unit+".js"),{window:w,document:doc});
  const render=w["renderGrade6Unit"+unit];
  assert.equal(typeof render,"function");
  render("knowledge");
  assert.match(html,/Vocabulary/);assert.match(html,/Grammar/);
  assert.match(html,unit===2?/My Home/:/My Friends/);
  render("original");assert.match(html,/Bài tập gốc/);
  assert.doesNotMatch(html,/Writing · Đoạn văn/);
  render("practice");assert.match(html,/SET 01/);assert.match(html,/SET 03/);
  const prop="g6U"+unit+"Answer",check="g6U"+unit+"Check";
  const box={querySelector(){return null},querySelectorAll(){return []}};
  const target={dataset:{[prop]:"extra-1"},value:"0",
   closest:s=>s===".g6-u"+unit+"-root"?{}:s===".g6-item"?box:null,
   matches:s=>s==="[data-g6-u"+unit+"-answer]",hasAttribute:()=>false};
  handlers.change({target});
  assert.equal(stored.answers["extra-1"],"0");
  handlers.click({target:{closest:s=>s==="[data-g6-u"+unit+"-check]"?{dataset:{[check]:"extra-1"}}:null}});
  assert.ok(stored.checked["extra-1"]);
  assert.match(html,/4 ví dụ B1–C1/);
  assert.match(html,/Nghĩa thường gặp:/);
  assert.equal((html.match(/class="g6-example-row"/g)||[]).length,4);
 });
}
test("Grade 6 Unit 1 remains untouched and the two new units have their own routes",()=>{
 const m=read("content/manifest.js");
 for(const u of [1,2,3])for(const suffix of ["","/original","/practice"])
   assert.ok(m.includes('route:"grade-6/unit-'+u+suffix+'"'));
 for(const u of [2,3]){
   assert.match(m,new RegExp('renderGrade6Unit'+u));
   assert.ok(m.includes('subtitle:"'+(u===2?"My Home":"My Friends")+'",live:true'));
 }
});
