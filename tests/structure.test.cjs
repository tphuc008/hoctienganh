const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");
const root=path.join(__dirname,"..");
const read=name=>fs.readFileSync(path.join(root,name),"utf8");

test("Every loaded script exists and all JavaScript parses",()=>{
  const html=read("index.html");
  const paths=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1].split("?")[0]);
  assert.ok(paths.includes("core/learning-core.js"));
  assert.ok(paths.includes("content/manifest.js"));
  const files=fs.readdirSync(root).filter(f=>f.endsWith(".js"));
  for(const name of files)new vm.Script(read(name),{filename:name});
  for(const name of paths){
    assert.ok(fs.existsSync(path.join(root,name)),"Missing script: "+name);
    new vm.Script(read(name),{filename:name});
  }
  const inline=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
  assert.ok(inline.length>0,"Expected main inline application script");
  for(const match of inline)new vm.Script(match[1],{filename:"index.html inline"});
});

function setup(){
  const data=new Map();
  let user="learner-a",requests=[],fail=false;
  const window={
    SUPABASE_URL:"https://example.supabase.co",SUPABASE_KEY:"public-test-key",
    readLearnerSession:()=>({user:{id:user}}),
    ensureLearnerSession:async()=>({access_token:"test-jwt",user:{id:user}})
  };
  const localStorage={
    getItem:key=>data.has(key)?data.get(key):null,
    setItem:(key,value)=>data.set(key,String(value)),
    removeItem:key=>data.delete(key)
  };
  const fetch=async(url,options)=>{
    requests.push({url,options});
    return {ok:!fail,status:fail?503:201};
  };
  const document={};
  const context=vm.createContext({window,localStorage,fetch,console,document,crypto:{randomUUID:()=> "00000000-0000-4000-8000-000000000001"}});
  vm.runInContext(read("core/learning-core.js"),context,{filename:"core/learning-core.js"});
  return {core:window.LearningCore,data,requests,document,setUser:x=>user=x,setFail:x=>fail=x};
}

test("Lesson IDs and routes are unique and discoverable",()=>{
  const {core}=setup();
  core.register({id:"grade12-unit9",route:"grade-12/unit-9",title:"Unit 9",category:"vocabulary",grade:12});
  assert.equal(core.resolve("grade-12/unit-9").title,"Unit 9");
  assert.equal(core.list({grade:12}).length,1);
  assert.throws(()=>core.register({id:"grade12-unit9",route:"grade-12/unit-10",title:"Copy"}),/Duplicate/);
  assert.throws(()=>core.register({id:"other",route:"grade-12/unit-9",title:"Copy"}),/Duplicate/);
});

test("Drafts never cross between authenticated learners",()=>{
  const {core,setUser}=setup();
  core.writeDraft("school","test/set-1",{answers:[1]});
  setUser("learner-b");
  assert.equal(core.readDraft("school","test/set-1"),null);
  core.writeDraft("school","test/set-1",{answers:[2]});
  setUser("learner-a");
  assert.equal(core.readDraft("school","test/set-1").answers[0],1);
  core.clearDraft("school","test/set-1");
  assert.equal(core.readDraft("school","test/set-1"),null);
  setUser("learner-b");
  assert.equal(core.readDraft("school","test/set-1").answers[0],2);
});

test("Scores use account-owned UUIDs and retry after network errors",async()=>{
  const {core,data,requests,setFail}=setup();
  const payload={category:"school",slug:"school/grade-10/set-1",correct:9,total:10,duration:90,
    submissionId:"11111111-1111-4111-8111-111111111111"};
  setFail(true);
  await assert.rejects(core.submitPractice(payload),/failed/i);
  assert.equal(Object.keys(JSON.parse(data.get("hoctienganh:pending:v1:learner-a"))).length,1);
  setFail(false);
  await core.flushPending();
  assert.equal(Object.keys(JSON.parse(data.get("hoctienganh:pending:v1:learner-a"))).length,0);
  assert.equal(requests.length,2);
  const sent=JSON.parse(requests[1].options.body);
  assert.equal(sent.user_id,"learner-a");
  assert.equal(sent.submission_id,payload.submissionId);
  assert.ok(requests[1].url.includes("on_conflict=submission_id"));
});

test("Core module never exposes results to another account",()=>{
  const {core,setUser}=setup();
  core.writeDraft("listening","news/video-a",{part:1,submitted:true});
  setUser("learner-b");
  assert.equal(core.readDraft("listening","news/video-a"),null);
});

test("Legacy Grade 10 midterm routes and all new routes remain intact",()=>{
  const html=read("index.html");
  const manifest=read("content/manifest.js");
  assert.match(manifest,/grade-10\/mid-term-test\/test-/);
  assert.match(manifest,/renderG10MidTermTest/);
  assert.match(manifest,/grade-12\/reading\/robots-and-us/);
  assert.match(html,/ContentManifest\.entries/);
  assert.match(html,/LearningCore\.renderRoute/);
  for(const file of ["grade10-midterm.js","grade10-midterm-source.txt","school-ui.js","listening-news.js","listening-entertainment.js","grade12-reading.js"])
    assert.ok(fs.existsSync(path.join(root,file)),"Missing legacy feature: "+file);
});

test("Listening progress restores MCQ, text and submitted state without credit twice",()=>{
  const {core,document,setUser}=setup();
  const radioA={value:"A",checked:false},radioB={value:"B",checked:false},fill={value:""};
  const listeners={};
  const panel={isConnected:true,addEventListener:(type,callback)=>{listeners[type]=callback}};
  document.getElementById=id=>id==="video-panel"?panel:id==="ent-p1-input-2"?fill:null;
  document.querySelectorAll=()=>[radioA,radioB];
  const parts=[{id:1,questions:[{id:1,type:"mc"},{id:2,type:"fill"}]}];
  const state={1:{submitted:false,startedAt:1,answersVisible:false}};
  let restores=0;
  const opts={id:"video-unique-id",parts,state,prefix:"ent",panelId:"video-panel",
    readAnswer:(p,q)=>q.type==="mc"?(radioB.checked?"B":radioA.checked?"A":""):fill.value,
    restoreSubmitted:(id,silent)=>{assert.equal(silent,true);restores++;state[1].submitted=true;},
    restoreAnswers:()=>{},updateProgress:()=>{}};
  core.attachListening(opts);
  radioB.checked=true;fill.value="ocean";listeners.change();
  state[1].submitted=true;
  const saved=core.readDraft("listening","video-unique-id");
  assert.equal(saved[1].answers[1],"B");assert.equal(saved[1].answers[2],"ocean");
  // A rerender uses a fresh set of controls and recovers the saved work.
  state[1]={submitted:false,startedAt:123,answersVisible:false};
  radioA.checked=false;radioB.checked=false;fill.value="";
  core.attachListening(opts);
  assert.equal(radioB.checked,true);assert.equal(fill.value,"ocean");
  assert.equal(restores,0,"Submission must not be restored until its state has been persisted");
  setUser("learner-b");
  radioB.checked=false;fill.value="other";
  listeners.change();
  assert.equal(core.readDraft("listening","video-unique-id"),null);
});

test("Midterm answers are stored under the learner and completion is guarded",()=>{
  const source=read("grade10-midterm.js");
  assert.match(source,/function mtRestore\(test\)/);
  assert.match(source,/LearningCore\.writeDraft\("exam"/);
  assert.match(source,/if\(done===test\.questions\.length&&!mtState\.recorded\)/);
  assert.match(source,/category:"exam"/);
});
