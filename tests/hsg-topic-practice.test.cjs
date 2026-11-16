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
test("Teacher route allows practice topic and nested set URLs",()=>{
 const html=read("index.html");
 assert.match(html,/hsg-topic-practice\.js/);
 assert.match(html,/practice-bank\.js/);
 assert.ok(html.includes(String.raw`^teacher\/hsg-tinh(?:\/[a-z0-9-]+){0,3}$`));
});
