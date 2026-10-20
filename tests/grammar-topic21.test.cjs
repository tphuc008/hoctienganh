const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");
const root=path.join(__dirname,"..");
function bootData(){
  const browser={};
  vm.runInNewContext(fs.readFileSync(path.join(root,"content/grammar-topic21-data.js"),"utf8"),{window:browser});
  vm.runInNewContext(fs.readFileSync(path.join(root,"content/grammar-topic21-explanations.js"),"utf8"),{window:browser});
  return browser.GrammarTopic21Data;
}
function bootStudio(){
  const data=bootData();
  const cache=new Map(),listeners={};
  const mount={style:{},innerHTML:"",contains(){return true},addEventListener(kind,fn){listeners[kind]=fn;}};
  const windowStub={GrammarTopic21Data:data,scrollY:0,scrollTo(){}};
  const context={
    window:windowStub,document:{getElementById(id){assert.equal(id,"pageMount");return mount;}},
    location:{hash:"#teacher/grammar/topic-21"},
    localStorage:{getItem(k){return cache.get(k)||null;},setItem(k,v){cache.set(k,v);}},
    Intl,Date,Math,Array,Object,JSON,Number,String
  };
  vm.runInNewContext(fs.readFileSync(path.join(root,"features/grammar-topic21.js"),"utf8"),context);
  const click=(action,dataset={})=>listeners.click({target:{closest(){return {dataset:{g21:action,...dataset}};}}});
  windowStub.TeacherGrammar21.open("teacher/grammar/topic-21",{user:{id:"test-teacher"}});
  return {data,mount,cache,click,context};
}
test("Topic 21 is a complete Learn-first course with unique checked answers",()=>{
  const d=bootData();
  assert.equal(d.sections.length,7);
  assert.equal(d.sections.flatMap(x=>x.checks).length,14);
  assert.equal(d.practice.length,16);
  assert.equal(d.mastery.length,10);
  assert.equal(d.repairs.length,7);
  assert.equal(d.review.length,5);
  const all=[...d.sections.flatMap(x=>x.checks),...d.practice,...d.mastery,...d.repairs,...d.review];
  assert.equal(new Set(all.map(x=>x.id)).size,all.length);
  const skillSet=new Set(d.skills.map(x=>x.id));
  all.forEach(q=>{
    assert.ok(skillSet.has(q.skill));
    assert.equal(q.options.length,4);
    assert.equal(new Set(q.options).size,4);
    assert.ok(Number.isInteger(q.correct)&&q.correct>=0&&q.correct<4);
    assert.ok(q.why.length>15);
  });
  all.forEach(q=>{
    assert.ok(q.explain?.clue?.length>20&&q.explain?.rule?.length>20,"Missing clear reasoning: "+q.id);
    [0,1,2,3].filter(i=>i!==q.correct).forEach(i=>assert.ok(q.explain?.wrong?.[i]?.length>20,"Missing wrong-option explanation: "+q.id+"/"+i));
  });
  d.sections.forEach(s=>{
    assert.ok(s.concept&&s.form&&s.contrast&&s.misconception&&s.steps.length>=3&&s.examples.length>=2);
    assert.equal(s.checks.length,2);
  });
});
test("Topic 21 renders Learn without diagnostic, then gives specific instant feedback",()=>{
  const t=bootStudio();
  assert.match(t.mount.innerHTML,/Cơ chế đảo trợ động từ/);
  assert.match(t.mount.innerHTML,/CONCEPT/);
  assert.match(t.mount.innerHTML,/FORM/);
  assert.match(t.mount.innerHTML,/CONTRAST/);
  assert.doesNotMatch(t.mount.innerHTML,/Diagnostic Test/);
  const q=t.data.sections[0].checks[0];
  const wrong=[0,1,2,3].find(x=>x!==q.correct);
  t.click("answer",{kind:"guided",id:q.id,index:String(wrong)});
  assert.match(t.mount.innerHTML,/Vì sao chưa đúng/);
  assert.match(t.mount.innerHTML,/Gợi ý: nhìn dấu hiệu/);
  assert.doesNotMatch(t.mount.innerHTML,/Câu hoàn chỉnh \/ Đáp án đúng/);
  t.click("answer",{kind:"guided",id:q.id,index:String(q.correct)});
  assert.match(t.mount.innerHTML,/Chính xác/);
  assert.match(t.mount.innerHTML,/1\. Nhìn dấu hiệu trong câu/);
  assert.match(t.mount.innerHTML,/2\. Suy ra cách viết đúng/);
  assert.match(t.mount.innerHTML,/3\. Câu hoàn chỉnh \/ Đáp án đúng/);
  assert.match(t.mount.innerHTML,/Vì sao các đáp án khác sai/);
  assert.ok([...t.cache.values()].some(v=>v.includes('"correct":true')));
});
test("Independent practice withholds feedback until submission, then clinic identifies errors",()=>{
  const t=bootStudio();
  t.click("tab",{tab:"practice"});
  assert.doesNotMatch(t.mount.innerHTML,/Quy tắc cần nhớ:/);
  assert.doesNotMatch(t.mount.innerHTML,/Vì sao các đáp án khác sai/);
  const first=t.data.practice[0];
  const wrong=[0,1,2,3].find(x=>x!==first.correct);
  t.data.practice.forEach((q,i)=>t.click("answer",{kind:"practice",id:q.id,index:String(i===0?wrong:q.correct)}));
  assert.doesNotMatch(t.mount.innerHTML,/Quy tắc cần nhớ:/);
  assert.doesNotMatch(t.mount.innerHTML,/Vì sao các đáp án khác sai/);
  t.click("submit",{kind:"practice"});
  assert.match(t.mount.innerHTML,/KẾT QUẢ PRACTICE/);
  assert.match(t.mount.innerHTML,/Quy tắc cần nhớ/);
  assert.match(t.mount.innerHTML,/Vì sao các đáp án khác sai/);
  t.click("tab",{tab:"clinic"});
  assert.match(t.mount.innerHTML,/Repair question/);
  assert.match(t.mount.innerHTML,/Cơ chế đảo trợ động từ/);
});
test("Final mastery requires 8/10 plus essential skills; answer positions are shuffled for display",()=>{
  const t=bootStudio();
  t.click("tab",{tab:"mastery"});
  const q=t.data.mastery[0];
  const markup=t.mount.innerHTML.match(new RegExp('id="g21-'+q.id+'"([\\s\\S]*?)</article>'));
  assert.ok(markup);
  assert.equal((markup[1].match(/data-kind="mastery"/g)||[]).length,4);
  t.data.mastery.forEach(q=>t.click("answer",{kind:"mastery",id:q.id,index:String(q.correct)}));
  t.click("submit",{kind:"mastery"});
  assert.match(t.mount.innerHTML,/Đạt chuẩn thử nghiệm/);
  t.click("tab",{tab:"review"});
  assert.match(t.mount.innerHTML,/Review 1/);
});
test("Production teacher route validates role before loading the Topic 21 feature",()=>{
  const html=fs.readFileSync(path.join(root,"index.html"),"utf8");
  const route=html.slice(html.indexOf('if(hash.startsWith("teacher/"))'),html.indexOf('if(hash==="school")'));
  assert.match(route,/teacher\/grammar\/topic-21/);
  assert.ok(route.indexOf("await hasTeacherPreviewAccess(learnerSession)")>=0);
  assert.ok(route.indexOf("await hasTeacherPreviewAccess(learnerSession)")<route.indexOf("await renderTeacherGrammar21"));
  assert.match(html,/content\/grammar-topic21-data\.js/);
  assert.match(html,/features\/grammar-topic21\.js/);
});
