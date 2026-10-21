const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");
const read=name=>fs.readFileSync(path.join(__dirname,"..",name),"utf8");
const scripts=[
 "grade10-midterm-data.js","grade10-midterm-explanations.js",
 "grade10-midterm-precision.js","grade10-midterm-quality.js",
 "grade10-midterm-reading-details.js","features/explanation-v1.js"
];
function boot(){
 const window={},context=vm.createContext({window});
 for(const src of scripts)vm.runInContext(read(src),context,{filename:src});
 return window;
}
const banned=/Đây là lý do lựa chọn này khác nghĩa hoặc khác chức năng|Khi làm câu tương tự, nhận diện clue trước|Xét chức năng từ loại, nghĩa trong ngữ cảnh và mẫu kết hợp|The teacher asked us to check the word choice|Từ này có vẻ hợp vì nằm gần cùng semantic field/;
test("All 160 Grade 10 midterm MCQs suppress uninformative explanation templates",()=>{
 const w=boot(),tests=w.G10_MIDTERM_PARSE(read("grade10-midterm-source.txt"));
 const qs=tests.flatMap(t=>t.questions).filter(q=>q.options);
 assert.equal(qs.length,160);
 for(const q of qs){
  const saved=JSON.stringify({stem:q.stem,answer:q.answer,options:q.options});
  const d=w.G10_MIDTERM_EXPLAIN(q,"");
  assert.equal(d.options.length,4,q.id+" four option analyses retained");
  assert.equal(d.examples.length,4,q.id+" four examples retained");
  const html=w.ExplanationV1.render(w.ExplanationV1.midterm(q,d));
  assert.doesNotMatch(html,banned,q.id+" must not publish boilerplate");
  if(d.options.some(x=>!String(x.analysis||"").trim())){
   assert.match(html,/data-review-status="needs_review"/,q.id+" unknown rationale should be flagged");
   assert.match(html,/Chưa có phân tích riêng được xác minh/,q.id+" no fabricated reasoning");
  }
  assert.equal(JSON.stringify({stem:q.stem,answer:q.answer,options:q.options}),saved,q.id+" original answer unchanged");
 }
});
test("Food waste versus gender equality has individual, contextual A–D rationales",()=>{
 const w=boot(),q=w.G10_MIDTERM_PARSE(read("grade10-midterm-source.txt")).flatMap(t=>t.questions).find(q=>q.id==="4-K1-6");
 assert.ok(q);
 assert.equal(q.answer,"B");
 const d=w.G10_MIDTERM_EXPLAIN(q,"");
 assert.deepEqual(d.options.map(x=>x.word),q.options);
 const checks=[/làm việc|công việc/,/thực phẩm|mua đúng/,/gắn kết tình cảm/,/bình đẳng quyền|giới tính/];
 for(let i=0;i<4;i++)assert.match(d.options[i].analysis,checks[i],q.id+"/"+String.fromCharCode(65+i));
 assert.match(d.remember,/food waste/);
 assert.doesNotMatch(d.options[2].analysis,/dạng V-ing|hậu tố/i,"noun phrase must not be guessed from -ing");
});
test("Grade 12 generated semantic explanations are flagged, not claimed to be reviewed",()=>{
 const w=boot(),ctx=vm.createContext({window:w});
 vm.runInContext(read("grade12-semantic-builder.js"),ctx);
 vm.runInContext(read("grade12-unit1-semantic.js"),ctx);
 const b=w.G12_U1_SEMANTIC_BANK;
 assert.ok(b?.questions?.length>=80);
 const i=b.explanations.findIndex(x=>x.requiresReview);
 assert.ok(i>=0,"Generated set must carry review status");
 const d=b.explanations[i],q=b.questions[i];
 assert.doesNotMatch(JSON.stringify(d),banned);
 const html=w.ExplanationV1.render(w.ExplanationV1.vocab(q,d));
 assert.match(html,/data-review-status="needs_review"/);
});
test("Display strips future boilerplate regressions rather than inventing replacement evidence",()=>{
 const {ExplanationV1:e}=boot();
 const line="Sự gắn kết gia đình, không phải lãng phí thực phẩm. Đây là lý do lựa chọn này khác nghĩa hoặc khác chức năng với “food waste” trong chính ngữ cảnh của câu.";
 const model={type:"midterm",answer:"B",quickReason:"Mua vừa đủ giảm thực phẩm dư thừa.",
  evidence:["Buying only the food we need"],reasoning:"Giảm lượng bị bỏ đi.",
  options:["A","B","C","D"].map((word,i)=>({word,analysis:i===0?line:"Phân tích cụ thể về "+word+"."}))};
 const html=e.render(model);
 assert.doesNotMatch(html,/Đây là lý do lựa chọn này khác nghĩa/);
 assert.match(html,/Sự gắn kết gia đình, không phải lãng phí thực phẩm/);
 assert.match(html,/data-review-status="needs_review"/);
});