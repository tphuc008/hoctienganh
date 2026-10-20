const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");
const read=name=>fs.readFileSync(path.join(__dirname,"..",name),"utf8");
function boot(){
 const window={};vm.runInNewContext(read("features/explanation-v1.js"),{window},{filename:"explanation-v1.js"});
 return window.ExplanationV1;
}
test("V1 renders concise feedback with accessible three-stage disclosure",()=>{
 const x=boot(),q={o:["original","local","sustainable","famous"],a:0};
 const d={why:"Not a modern copy confirms original.",contrast:"Copy contrasts with original.",
  options:q.o.map((w,i)=>({meaning:w,analysis:"Reason "+w})),
  examples:q.o.map(w=>({en:"A full example using "+w+".",vi:"Câu ví dụ về "+w+"."}))};
 const model=x.vocab(q,d),html=x.render(model);
 assert.equal(model.answer,"original");
 assert.match(html,/data-explanation-v1="1"/);
 assert.equal((html.match(/<section class="semantic-step ev1-step"/g)||[]).length,3);
 assert.equal((html.match(/class="ev1-choice semantic-option/g)||[]).length,4);
 assert.equal((html.match(/class="ev1-example semantic-example/g)||[]).length,4);
 assert.match(html,/<details class="ev1-details">/);
 assert.ok(html.indexOf("Not a modern copy")<html.indexOf("<details"));
 assert.equal(x.validated(model).status,"ready");
 const printed=x.render(model,{print:true,className:"lp-semantic-print"});
 assert.match(printed,/class="ev1-details" open/);
 assert.match(printed,/lp-semantic-print/);
});
test("Evidence gaps are visible; the shared renderer does not invent supporting claims",()=>{
 const x=boot();
 const listening=x.listening({type:"mc",time:79,answer:"B",options:["A","B","C"]});
 assert.equal(listening.answer,"B. B");
 assert.equal(x.validated(listening).status,"needs_review");
 const html=x.render(listening);
 assert.match(html,/Mốc nghe 1:19/);
 assert.match(html,/chưa phải transcript|chưa có bằng chứng/i);
 assert.match(html,/data-review-status="needs_review"/);
 assert.doesNotMatch(html,/Transcript:|According to the speaker/);
 const vocab=x.vocab({o:["career","organiser","audience","clapper"],a:0},
   {why:"The context is about professional opportunities.",contrast:"career is not a person."});
 assert.equal(x.validated(vocab).status,"needs_review","Vocabulary without four translated examples is not approved");
 assert.doesNotMatch(x.render(vocab),/A full example using/);
});
test("Private Lesson Plans solutions map one-to-one with A–D, without data persistence",()=>{
 const x=boot(),q={options:["option one","option two","option three","option four"]};
 const privateKey={correctIndex:2,why:"Evidence already verified",correctMeaning:"Specific meaning",
  choices:q.options.map((w,i)=>({explanation:"Why "+w,example:"Sentence "+w+".",exampleVi:"Bản dịch "+w}))};
 const model=x.lesson(q,privateKey);
 assert.match(model.answer,/^C\./);
 assert.equal(x.validated(model).status,"ready");
 assert.equal(model.options[2].correct,true);
 assert.equal(model.examples[2].word,"option three");
 assert.equal(model.options[2].word,model.examples[2].word);
 assert.ok(!("solutions" in x));
 const source=read("features/lesson-plans.js");
 assert.match(source,/if\(!k \|\| !accessAllowed\(\)/);
 assert.match(source,/getKey\(q\.id\)/);
 assert.match(source,/lesson_solutions\?select=payload/);
});
test("Multiple choice content is escaped before entering HTML",()=>{
 const x=boot();
 const html=x.render({type:"vocabulary",answer:'<img src=x onerror=alert(1)>',
   quickReason:'<script>attack</script>',evidence:["<b>proof</b>"],
   reasoning:"Safe text"});
 assert.doesNotMatch(html,/<script>|<img src=x/);
 assert.match(html,/&lt;script&gt;/);
 assert.match(html,/&lt;img/);
});
test("V1 covers all non-grammar learning modules without changing their unlock conditions",()=>{
 const html=read("index.html");
 assert.match(html,/features\/explanation-v1\.js\?v=/);
 assert.match(html,/activeMode!=="grammar"&&window\.ExplanationV1/);
 const school=read("school-ui.js"),mid=read("grade10-midterm.js");
 assert.match(school,/ExplanationV1\.school/);
 assert.match(mid,/ExplanationV1\.midterm/);
 for(const module of ["grade12-reading.js","grade12-robots-reading.js"]){
  const s=read(module);assert.match(s,/if\(!state\.submitted\|\|!window\.ExplanationV1\)/);
 }
 for(const module of ["listening-entertainment.js","listening-news.js"]){
  const s=read(module);assert.match(s,/if\(!st\.submitted\)return/);
  assert.match(s,/st\.answersVisible&&window\.ExplanationV1/);
 }
});
