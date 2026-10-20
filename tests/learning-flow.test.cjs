const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");
const root=path.join(__dirname,"..");
function load(){
  let uid="learner-a";
  const db=new Map(),head=[];
  const localStorage={
    getItem:k=>db.get(k)||null,setItem:(k,v)=>db.set(k,String(v)),
    removeItem:k=>db.delete(k)
  };
  const window={readLearnerSession:()=>({user:{id:uid}})};
  const document={head:{appendChild:x=>head.push(x)},createElement:()=>({})};
  const context=vm.createContext({window,document,localStorage,console,Date,crypto:{randomUUID:()=>"test-id"}});
  for(const file of ["core/learning-core.js","core/learning-flow.js"])
    vm.runInContext(fs.readFileSync(path.join(root,file),"utf8"),context,{filename:file});
  return {flow:window.LearningFlow,db,head,setUser:id=>uid=id};
}
test("A single ready/active/completed vocabulary is used by every exercise type",()=>{
  const {flow}=load();
  assert.equal(flow.snapshot({total:10,done:0}).phase,"ready");
  assert.equal(flow.snapshot({started:true,total:10,done:4}).phase,"in_progress");
  assert.equal(flow.snapshot({started:true,total:10,done:10,completed:true}).phase,"completed");
  assert.equal(flow.snapshot({started:true,total:10,done:10,completed:true,mode:"mastery"}).text,"Đã hoàn thành · 10/10");
  assert.equal(flow.snapshot({started:true,total:10,done:6,completed:true}).text,"Đã nộp · 6/10");
  assert.equal(flow.snapshot({started:true,total:10,done:10}).phase,"in_progress","All answered does not imply submission");
});
test("Per-account lifecycle is isolated and restart clears only its own progress",()=>{
  const {flow,setUser}=load();
  flow.track({category:"school",slug:"lesson/1",started:true,startedAt:12,done:3,total:10});
  assert.equal(flow.read("school","lesson/1").done,3);
  setUser("learner-b");
  assert.equal(flow.read("school","lesson/1"),null);
  assert.equal(flow.track({category:"school",slug:"lesson/1",ownerId:"learner-a",started:true,done:4,total:10}),null);
  assert.equal(flow.read("school","lesson/1"),null);
  flow.track({category:"school",slug:"lesson/1",started:true,done:1,total:10});
  assert.equal(flow.read("school","lesson/1").done,1);
  flow.reset("school","lesson/1");
  assert.equal(flow.read("school","lesson/1"),null);
  setUser("learner-a");
  assert.equal(flow.read("school","lesson/1").done,3);
});
test("Tracking a submitted exercise retains the original attempt timestamp",()=>{
  const {flow}=load();
  flow.track({category:"reading",slug:"passage",started:true,done:8,total:14,startedAt:100});
  const active=flow.read("reading","passage");
  flow.track({category:"reading",slug:"passage",started:true,done:8,total:14,completed:true});
  const result=flow.read("reading","passage");
  assert.equal(result.phase,"completed");
  assert.equal(result.startedAt,active.startedAt);
  assert.ok(result.completedAt>0);
  assert.equal(result.synced,false);
});
test("Progress guards and status UI are safe and unambiguous",()=>{
  const {flow,head}=load();
  for(const wrong of [{done:-1,total:10},{done:11,total:10},{done:1,total:0},{done:NaN,total:10}])
    assert.throws(()=>flow.snapshot(wrong),/invalid/);
  assert.throws(()=>flow.track({category:"unknown",slug:"foo",done:0,total:1}),/invalid/);
  assert.match(flow.markup({total:2,done:1,started:true}),/Đang làm · 1\/2/);
  const elt={classList:{add:()=>{}},dataset:{},setAttribute(){},textContent:""};
  flow.paint(elt,{total:5,done:5,completed:true,started:true});
  assert.equal(elt.dataset.learningPhase,"completed");
  assert.equal(elt.textContent,"Đã nộp · 5/5");
  assert.equal(head.length,1,"Inject shared styling once");
});
test("All lesson engines call shared learner lifecycle",()=>{
  for(const file of ["index.html","school-ui.js","listening-entertainment.js",
    "listening-news.js","grade12-reading.js","grade12-robots-reading.js","grade10-midterm.js"]){
    const text=fs.readFileSync(path.join(root,file),"utf8");
    assert.match(text,/LearningFlow\.(?:track|paint|markup)/,"Missing lifecycle in "+file);
  }
});
