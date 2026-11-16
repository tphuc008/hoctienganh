const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const vm=require("node:vm");
const path=require("node:path");
const base=path.join(__dirname,"..");
const read=file=>fs.readFileSync(path.join(base,file),"utf8");

function boot(extraBank={}){
 const root={
  innerHTML:"",style:{},
  querySelectorAll(){return []},
  querySelector(){return null}
 };
 const drafts={};
 const window={
  location:{hash:""},scrollTo(){},
  LearningCore:{
   fingerprint(value){return JSON.stringify(value)},
   readDraft(kind,id){return drafts[kind+"/"+id]||null},
   writeDraft(kind,id,data){drafts[kind+"/"+id]=data;return true}
  }
 };
 const document={getElementById(id){return id==="pageMount"?root:null}};
 const context={window,document,location:window.location};
 vm.runInNewContext(read("content/hsg-tinh/practice-bank.js"),context);
 vm.runInNewContext(read("content/hsg-tinh/sentence-transformation-bank.js"),context);
 Object.assign(window.HSGTopicPracticeBank,extraBank);
 vm.runInNewContext(read("features/hsg-topic-practice.js"),context);
 vm.runInNewContext(read("features/hsg-tinh.js"),context);
 return {window,root};
}

test("HSG library retains existing papers and adds practice entry",async()=>{
 const {window,root}=boot();
 await window.TeacherHSG.open("teacher/hsg-tinh");
 assert.match(root.innerHTML,/Thư viện đề thi/);
 assert.match(root.innerHTML,/Hải Phòng/);
 assert.match(root.innerHTML,/Luyện tập theo dạng/);
});
test("HSG library uses a compact, searchable list of eight papers",async()=>{
 const {window,root}=boot();
 await window.TeacherHSG.open("teacher/hsg-tinh");
 assert.match(root.innerHTML,/class="hsg-exam-list"/);
 assert.match(root.innerHTML,/id="hsg-catalogue-search"/);
 assert.equal((root.innerHTML.match(/class="hsg-exam-row"/g)||[]).length,8);
 assert.doesNotMatch(root.innerHTML,/class="hsg-hero"/);
});
test("HSG library puts an unfinished exam ahead of untouched exams",async()=>{
 const {window,root}=boot();
 const seed=window.LearningCore.readDraft;
 window.LearningCore.readDraft=(kind,id)=>id==="hsg-tinh/son-la"?{answers:{"g1:26":{type:"mcq",value:"A"}}}:seed(kind,id);
 await window.TeacherHSG.open("teacher/hsg-tinh");
 assert.equal(root.innerHTML.match(/data-exam="([^"]+)"/)[1],"son-la");
 assert.match(root.innerHTML,/1\/57 câu/);
});
test("Practice catalogue renders grouped question types",async()=>{
 const {window,root}=boot();
 await window.TeacherHSG.open("teacher/hsg-tinh/practice");
 assert.match(root.innerHTML,/Grammar &amp; Vocabulary/);
 assert.match(root.innerHTML,/Reading &amp; Cloze/);
 assert.match(root.innerHTML,/Sentence Transformation/);
});
test("Empty topic opens three set cards and a 10-slot placeholder",async()=>{
 const {window,root}=boot();
 await window.TeacherHSG.open("teacher/hsg-tinh/practice/word-formation");
 assert.match(root.innerHTML,/Set 01/);
 assert.match(root.innerHTML,/Set 03/);
 await window.TeacherHSG.open("teacher/hsg-tinh/practice/word-formation/set-01");
 assert.match(root.innerHTML,/Chưa có câu hỏi/);
 assert.equal((root.innerHTML.match(/class="hsg-p-dot" disabled/g)||[]).length,10);
});
test("Provided questions render but answer explanations are hidden during practice",async()=>{
 const {window,root}=boot({
  "lexico-grammar":[{id:"set-01",questions:[{
   stem:"Choose the correct form.",options:["a","b","c","d"],
   answer:"B",explanation:"SECRET_TEST_EXPLANATION"
  }]}]
 });
 await window.TeacherHSG.open("teacher/hsg-tinh/practice/lexico-grammar/set-01");
 assert.match(root.innerHTML,/Choose the correct form/);
 assert.match(root.innerHTML,/data-hsgp-choice="B"/);
 assert.doesNotMatch(root.innerHTML,/SECRET_TEST_EXPLANATION/);
});

test("Sentence Transformation imports 131 original Google Docs questions in 13 sets",()=>{
 const {window}=boot();
 const sets=window.HSGTopicPracticeBank["sentence-transformation"];
 assert.equal(sets.length,13);
 assert.equal(sets.reduce((n,s)=>n+s.questions.length,0),131);
 assert.deepEqual(Array.from(sets,s=>s.questions.length),[10,10,10,10,11,10,10,10,10,10,10,10,10]);
 const all=sets.flatMap(s=>s.questions);
 assert.ok(all.every(q=>q.stem&&q.target&&q.answer&&
   ["structure","pattern","breakdown","transformation","pitfalls"].every(k=>q.analysis[k])));
 assert.equal(all.filter(q=>q.sourceNote).length,20);
 assert.equal(all.filter(q=>q.appendixNote).length,20);
 assert.match(all[0].stem,/Richard only took over the family business/);
 assert.match(all[0].answer,/Had it not been for his father/);
});
test("Sentence Transformation presents focused sets and progressive explanation",async()=>{
 const {window,root}=boot();
 await window.TeacherHSG.open("teacher/hsg-tinh/practice/sentence-transformation");
 assert.match(root.innerHTML,/hsg-st-set-list/);
 assert.equal((root.innerHTML.match(/class="hsg-st-set-item"/g)||[]).length,13);
 let reveal=null;
 root.querySelector=selector=>selector==="[data-hsgp-reveal]"?{
  addEventListener(name,listener){if(name==="click")reveal=listener;}
 }:null;
 await window.TeacherHSG.open("teacher/hsg-tinh/practice/sentence-transformation/set-01");
 assert.match(root.innerHTML,/Richard only took over the family business/);
 assert.match(root.innerHTML,/Xem đáp án & giải thích/);
 assert.doesNotMatch(root.innerHTML,/Had it not been for his father/);
 assert.doesNotMatch(root.innerHTML,/General Grammar Pattern/);
 assert.equal(typeof reveal,"function");
 reveal();
 assert.match(root.innerHTML,/Had it not been for his father/);
 assert.match(root.innerHTML,/General Grammar Pattern/);
 assert.match(root.innerHTML,/Grammatical Breakdown/);
 assert.match(root.innerHTML,/Lưu ý đáp án gốc/);
 reveal();
 assert.doesNotMatch(root.innerHTML,/Had it not been for his father/);
});

test("Teacher route allows practice topic and nested set URLs",()=>{
 const html=read("index.html");
 assert.match(html,/hsg-topic-practice\.js/);
 assert.match(html,/practice-bank\.js/);
 assert.match(html,/sentence-transformation-bank\.js/);
 assert.ok(html.includes(String.raw`^teacher\/hsg-tinh(?:\/[a-z0-9-]+){0,3}$`));
});
