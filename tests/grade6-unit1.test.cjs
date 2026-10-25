const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");
const root=path.resolve(__dirname,"..");
const read=p=>fs.readFileSync(path.join(root,p),"utf8");
function boot(){
  const browser={};
  const context={window:browser};
  vm.runInNewContext(read("content/grade6-unit1-part-a.js"),context);
  vm.runInNewContext(read("content/grade6-unit1-part-b.js"),context);
  return browser;
}
test("Grade 6 Unit 1 has 34 vocabulary entries and 132 source items in the proper sections",()=>{
  const w=boot();
  assert.equal(w.G6_U1_PART_A.words.reduce((n,g)=>n+g.items.length,0),34);
  for(const group of w.G6_U1_PART_A.words)for(const word of group.items){
    assert.equal(word.examples.length,2,word.word);
    assert.ok(word.usage&&word.usage.length>4,word.word);
  }
  assert.deepEqual(Array.from(w.G6_U1_PART_A.grammar,x=>x.forms.length),[3,3]);
  const groups=[...w.G6_U1_PART_A.groups,...w.G6_U1_PART_B.groups];
  assert.equal(groups.length,13);
  assert.equal(groups.reduce((n,g)=>n+g.items.length,0),132);
  assert.equal(w.G6_U1_PART_B.extra.items.length,30);
  for(const n of [1,2,3])assert.equal(w.G6_U1_PART_B.extra.items.filter(q=>q.set===n).length,10);
  const ids=groups.flatMap(g=>g.items.map(q=>q.id));
  assert.equal(new Set(ids).size,132);
});
test("Every scored choice has four options, validated key and brief source-specific explanation",()=>{
  const w=boot();
  const all=[...w.G6_U1_PART_A.groups,...w.G6_U1_PART_B.groups,w.G6_U1_PART_B.extra];
  for(const group of all)for(const q of group.items){
    assert.ok(q.note&&q.note.length>8,q.id||"new exercise");
    if(q.kind==="mcq"){
      assert.equal(q.o.length,4,q.id);
      assert.ok(q.a===null||Number.isInteger(q.a)&&q.a>=0&&q.a<4,q.id);
    }else if(q.kind==="input")assert.ok(Array.isArray(q.answers),q.id);
  }
});
test("Ambiguous questions remain visible but not automatically graded",()=>{
  const w=boot();
  const all=[...w.G6_U1_PART_A.groups,...w.G6_U1_PART_B.groups];
  const get=id=>all.flatMap(g=>g.items).find(q=>q.id===id);
  for(const id of ["vocabulary-32","reading-comprehension-2","reading-comprehension-5"])
    assert.equal(get(id).a,null,id);
  for(const id of ["rearrangement-1","rearrangement-3"])
    assert.equal(get(id).answers.length,0,id);
});
test("Unit 1 interface initializes and renders exactly three tabs, no print tab",()=>{
  const w=boot();let html="";
  const mount={style:{},set innerHTML(value){html=value;},get innerHTML(){return html;}};
  const doc={
    head:{appendChild(){}},addEventListener(){},
    createElement(){return {id:"",textContent:""};},
    getElementById(id){return id==="pageMount"?mount:null;}
  };
  w.LearningCore={fingerprint:()=> "v1",userId:()=> "test-user",readDraft:()=>null,writeDraft:()=>true};
  w.scrollTo=()=>{};w.scrollY=0;
  vm.runInNewContext(read("features/grade6-unit1.js"),{window:w,document:doc});
  assert.equal(typeof w.renderGrade6Unit1,"function");
  w.renderGrade6Unit1("knowledge");
  assert.match(html,/34 từ vựng/);
  assert.match(html,/Present Simple/);
  assert.match(html,/My cousin lives at a boarding school/);
  assert.match(html,/We don't have English lessons on Sundays/);
  w.renderGrade6Unit1("original");
  assert.match(html,/132 bài tập gốc/);
  assert.match(html,/Phát âm khác biệt/);
  w.renderGrade6Unit1("practice");
  assert.match(html,/30 câu luyện thêm/);
  assert.match(html,/SET 01/);
  assert.match(html,/SET 02/);
  assert.match(html,/SET 03/);
  assert.match(html,/10 câu/);
  assert.doesNotMatch(html,/Chọn số câu:/);
  assert.doesNotMatch(html,/04 · In đề/);
});
test("Grade 6 routes are added without replacing Grade 9–12 catalogue",()=>{
  const src=read("content/manifest.js");
  for(const route of ["grade-6/unit-1","grade-6/unit-1/original","grade-6/unit-1/practice"])
    assert.ok(src.includes(route),route);
  for(const label of ["Lớp 9","Lớp 10","Lớp 12"])assert.ok(src.includes(label),label);
  assert.ok(!src.includes('route:"grade-6/unit-1/print"'));
});


test("Each new practice set has distinct stable IDs and complete answer feedback",()=>{
  const w=boot(), items=w.G6_U1_PART_B.extra.items;
  assert.equal(new Set(items.map(q=>q.id)).size,30);
  for(const n of [1,2,3])for(const item of items.filter(q=>q.set===n)){
    assert.ok(item.id&&item.note.length>18,item.id);
    if(item.kind==="mcq")assert.ok(item.a>=0&&item.a<4);
    else assert.ok(Array.isArray(item.answers)&&item.answers.length>=1);
  }
});
test("Website ExplanationV1 shows its three-stage detail after checking a set answer",()=>{
  const w=boot(), handlers={};let html="",saved=null;
  const mount={style:{},set innerHTML(value){html=value;},get innerHTML(){return html;}};
  const doc={head:{appendChild(){}},addEventListener(name,callback){handlers[name]=callback;},
    createElement(){return {id:"",textContent:""};},
    getElementById(id){return id==="pageMount"?mount:null;}};
  w.LearningCore={fingerprint:()=> "v2",userId:()=> "student-one",readDraft:()=>saved,writeDraft:(k,id,data)=>{saved=data;return true;}};
  w.scrollTo=()=>{};w.scrollY=0;
  const context={window:w,document:doc};
  vm.runInNewContext(read("features/explanation-v1.js"),context);
  vm.runInNewContext(read("features/grade6-unit1.js"),context);
  w.renderGrade6Unit1("practice");
  const root={querySelector(){return null;},querySelectorAll(){return [];}};
  const field={dataset:{g6Answer:"extra-1"},value:"0",
    matches:s=>s==="[data-g6-answer]",
    hasAttribute:()=>false,
    closest:s=>s===".g6-root"?{}:s===".g6-item"?root:null};
  handlers.change({target:field});
  handlers.click({target:{closest:s=>s==="[data-g6-check]"?{dataset:{g6Check:"extra-1"}}:null}});
  assert.match(html,/data-explanation-v1="1"/);
  assert.match(html,/Xem giải thích chi tiết/);
  assert.match(html,/Bằng chứng/);
  assert.match(html,/Phân tích A–D/);
  assert.match(html,/Vận dụng/);
  assert.match(html,/data-review-status="ready"/);
});
