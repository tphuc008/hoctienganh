const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");

const root=path.join(__dirname,"..");
const read=name=>fs.readFileSync(path.join(root,name),"utf8");
const vocabularySources=[
  ["9-1","grade9-unit1.js","G9_U1_BANK"],
  ["9-2","grade9-unit2.js","G9_U2_BANK"],
  ["9-3","grade9-unit3.js","G9_U3_BANK"],
  ["9-4","grade9-unit4.js","G9_U4_BANK"],
  ["9-5","grade9-unit5.js","G9_U5_BANK"],
  ["10-3","grade10-unit3.js","G10_U3_BANK"]
];

function loadExplanationOutput(){
  const window={};
  const context=vm.createContext({window});
  for(const [,source] of vocabularySources)
    vm.runInContext(read(source),context,{filename:source});
  vm.runInContext(read("sentence-translations.js"),context,{filename:"sentence-translations.js"});
  const banks={};
  for(const [key,,globalName] of vocabularySources)
    banks[key]=window[globalName];
  const before={};
  for(const [key,bank] of Object.entries(banks)){
    before[key]=bank.questions.map(q=>({q:q.q,options:JSON.stringify(q.o),answer:q.a,id:q.id}));
  }

  // Execute the real site's explanation formatter, not a copied reimplementation.
  // Deliberately stop before quiz initialization and authentication.
  const html=read("index.html");
  const start=html.indexOf("function explanationGloss(");
  const end=html.indexOf('let activeMode="grade";',start);
  assert.ok(start>=0&&end>start,"Vocabulary explanation formatter must be present");
  context.BANKS=banks;
  vm.runInContext(html.slice(start,end),context,{filename:"index.html vocabulary formatter"});
  return {banks,before};
}

test("All 360 Grade 9–10 vocabulary answers preserve their keys and have usable feedback",()=>{
  const {banks,before}=loadExplanationOutput();
  assert.equal(Object.values(banks).reduce((n,b)=>n+b.questions.length,0),360);
  for(const [key,bank] of Object.entries(banks)){
    assert.equal(bank.questions.length,bank.explanations.length,key+" question/feedback count");
    for(const [i,q] of bank.questions.entries()){
      const ex=bank.explanations[i];
      assert.equal(q.q,before[key][i].q,key+" prompt must not be changed");
      assert.equal(JSON.stringify(q.o),before[key][i].options,key+" answer choices must not be changed");
      assert.equal(q.a,before[key][i].answer,key+" correct answer must not be changed");
      assert.equal(q.id,before[key][i].id,key+" stable question ID must not change");
      assert.ok(Number.isInteger(q.a)&&q.a>=0&&q.a<q.o.length,key+" invalid key "+(i+1));
      assert.ok(ex?.meaning?.trim()&&ex?.why?.trim()&&ex?.contrast?.trim(),
        key+" missing explanation "+(i+1));
      assert.doesNotMatch(ex.why+" "+ex.contrast,/selectional restriction/i,
        key+" avoid unexplained linguistic jargon "+(i+1));
      assert.doesNotMatch(ex.contrast,/thuộc đúng nhóm danh từ chỉ người|thuộc đúng nhóm danh từ gọi tên đúng loại đối tượng/i,
        key+" never assume noun category "+(i+1));
    }
  }
});

test("Noun meanings and contextual evidence are used instead of misleading -er/-or suffix guesses",()=>{
  const {banks}=loadExplanationOutput();
  const unit=banks["10-3"];
  function get(answer){
    const i=unit.questions.findIndex(q=>q.o[q.a]===answer);
    assert.ok(i>=0,"Missing test term: "+answer);
    return unit.explanations[i];
  }
  for(const [word,meaning,clue] of [
    ["music career","sự nghiệp âm nhạc","professional opportunities"],
    ["bamboo clapper","phách tre","made from bamboo"],
    ["concert ticket","vé xem hòa nhạc","going to the show"],
    ["event organiser","người/ban tổ chức sự kiện","checked the schedule"],
    ["audience","khán giả","cheered loudly"]
  ]){
    const ex=get(word);
    assert.ok(ex.contrast.includes(meaning),word+" must use curated meaning");
    assert.ok((ex.why+" "+ex.contrast).includes(clue),word+" must cite a real clue");
    if(["music career","bamboo clapper","concert ticket"].includes(word)){
      assert.doesNotMatch(ex.why+" "+ex.contrast,/danh từ chỉ người|là người|người thực hiện/i,
        word+" does not denote a person");
    }
  }
});

test("Explicit writer explanations outrank generic grammar templates",()=>{
  const {banks}=loadExplanationOutput();
  const q=banks["10-3"].questions;
  const ex=banks["10-3"].explanations;
  const i=q.findIndex(q=>q.o[q.a]==="music career");
  assert.ok(i>=0);
  assert.match(ex[i].why,/Winning the competition/);
  assert.match(ex[i].why,/professional opportunities/);
  const j=q.findIndex(q=>q.o[q.a]==="bamboo clapper");
  assert.match(ex[j].why,/kept the beat/);
});
