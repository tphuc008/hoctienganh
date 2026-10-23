const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");
const root=path.join(__dirname,"..");
const read=name=>fs.readFileSync(path.join(root,name),"utf8");
function boot(){
  const window={};
  const ctx=vm.createContext({window});
  for(const file of ["content/grammar-topic-compiler.js","content/grammar-topic3.js","content/grammar-topic6.js","content/grammar-foundation-explanations.js"])
    vm.runInContext(read(file),ctx,{filename:file});
  return window;
}
for(const n of [3,6]){
  test("Foundation Topic "+n+" compiles eight complete lessons in the Topic 05 format",()=>{
    const g=boot(),d=g["GrammarTopic"+n+"Data"];
    assert.equal(d.sections.length,8);
    assert.equal(d.skills.length,8);
    assert.equal(d.practice.length,24);
    assert.equal(d.mastery.length,12);
    assert.equal(d.reviewSets.set1.length,24);
    assert.equal(d.reviewSets.set2.length,24);
    assert.equal(d.repairs.length,8);
    assert.equal(d.detectives.length,8);
    assert.equal(d.writing.length,4);
    assert.ok(d.sections.every(s=>s.examples.length===10&&s.checks.length===2));
    const all=[...d.sections.flatMap(s=>s.checks),...d.practice,...d.mastery,...d.repairs,...d.reviewSets.set1,...d.reviewSets.set2];
    const unique=new Map(all.map(q=>[q.id,q]));
    assert.equal(unique.size,80);
    for(const q of unique.values()){
      assert.equal(q.options.length,4);
      assert.equal(new Set(q.options).size,4);
      assert.equal(q.correct,0);
      assert.ok(q.stem.includes("___"),q.id);
      assert.ok(q.vi.length>=12,q.id);
      assert.ok(q.explain.clue.length>30,q.id);
      for(let i=1;i<4;i++){
        assert.ok(q.explain.wrong[i].includes("“"+q.options[i]+"”"),q.id+" / "+i);
        assert.ok(q.explain.wrong[i].length>65,q.id+" / "+i);
      }
    }
    for(const s of d.sections){
      assert.ok(s.learnV1.meaning&&s.learnV1.formula&&s.learnV1.core,s.id);
      assert.ok(s.misconception&&s.contrast&&s.steps.length>=3,s.id);
      assert.equal(s.examples.filter(x=>x.normal&&x.inverted&&x.vi&&x.why).length,10,s.id);
      assert.ok(s.checks.every(q=>q.discovery?.correct===0&&q.discovery?.options.length===2),s.id);
    }
    assert.equal(g.GrammarFoundationExplanationAudit,160);
  });
  test("Foundation Topic "+n+" uses the original five-stage Grammar 05 studio UI",()=>{
    const g=boot();
    const mount={style:{},innerHTML:"",contains(){return true;},addEventListener(type,fn){this[type]=fn;},querySelectorAll(){return [];}};
    const answers=new Map();
    const topicRoute="#teacher/grammar/topic-"+n;
    const win={...g,scrollY:0,scrollTo(){}};
    const context=vm.createContext({
      window:win,
      document:{getElementById(id){assert.equal(id,"pageMount");return mount;}},
      location:{hash:topicRoute},
      localStorage:{getItem(k){return answers.get(k)||null;},setItem(k,v){answers.set(k,v);}},
      Intl,Date,Math,Array,Object,JSON,Number,String
    });
    vm.runInContext(read("features/grammar-topic-studio.js"),context,{filename:"grammar-topic-studio.js"});
    const factory=win.TeacherGrammarStudioFactory;
    const studio=factory(win["GrammarTopic"+n+"Data"],{
      topicNum:n,heroVi:"Kiểm tra",heroEn:"Testing",subtitle:"Foundation preview",
      beforeLabel:"Câu gốc / lỗi thường gặp",afterLabel:"Câu đúng",reviewCount:24
    });
    const click=(action,dataset={})=>mount.click({target:{closest(){return {dataset:{g21:action,...dataset}};}}});
    studio.open(topicRoute.slice(1),{user:{id:"foundation-teacher"}});
    assert.match(mount.innerHTML,/1\. Ý nghĩa & cách dùng/);
    assert.match(mount.innerHTML,/4\. Ví dụ đối chiếu/);
    assert.match(mount.innerHTML,/6\. Quick Check/);
    const labels=["Lý thuyết","Luyện tập","Chữa lỗi","Kiểm tra","Ôn tập"];
    for(const label of labels)assert.ok(mount.innerHTML.includes(label),label);
    const d=win["GrammarTopic"+n+"Data"],q=d.sections[0].checks[0];
    click("detect",{id:q.id,index:"0"});
    click("discovery-next",{id:q.id});
    click("answer",{kind:"guided",id:q.id,index:"0"});
    assert.match(mount.innerHTML,/Chính xác/);
    assert.ok([...answers.values()].some(x=>x.includes('"correct":true')));
    click("tab",{tab:"practice"});
    assert.match(mount.innerHTML,/Câu 1 \/ 24/);
    click("tab",{tab:"clinic"});
    assert.match(mount.innerHTML,/SKILL MAP/);
    click("tab",{tab:"mastery"});
    assert.match(mount.innerHTML,/Kiểm tra mức độ thành thạo/);
    click("tab",{tab:"review"});
    assert.match(mount.innerHTML,/Review 1/);
  });
}
test("Foundation routes are teacher protected and the library exposes both entries",()=>{
  const html=read("index.html"),lib=read("features/grammar-library.js");
  assert.ok(html.includes("topic-(?:3|5|6|19|21|22)"));
  assert.ok(html.includes("content/grammar-topic3.js"));
  assert.ok(html.includes("content/grammar-topic6.js"));
  assert.ok(html.includes("content/grammar-foundation-explanations.js"));
  assert.ok(html.indexOf("await hasTeacherPreviewAccess(learnerSession)")<html.indexOf("await renderTeacherGrammarNew(hash,learnerSession)"));
  assert.ok(lib.includes("available:[3,5,6,19,21,22]"));
});
