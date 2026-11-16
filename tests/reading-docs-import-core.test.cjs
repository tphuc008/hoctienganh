const test=require("node:test");
const assert=require("node:assert/strict");
const {parse,apply,findAnchors,sameAnswer}=require("../scripts/reading-docs-import-core.cjs");
const source="Experiments such as these cannot categorically confirm or negate a hypothesis.";
function doc(answer="C",quote=source){
 return [
  {text:"Câu 11 — C | Giới hạn nghiên cứu",namedStyleType:"HEADING_2"},
  {text:"ĐỀ: One limitation in the information produced by all of this research is that it"},
  {text:"ĐÁP ÁN: "+answer+" — was not conclusive evidence"},
  {text:"1. Hiểu câu chuyện / logic: Nghiên cứu chỉ cung cấp bằng chứng chứ không xác định chắc chắn một lý thuyết."},
  {text:"2. Bằng chứng + paraphrase: Passage viết “"+quote+"” cho thấy không thể khẳng định dứt khoát."},
  {text:"3. Phân tích đáp án sai / bẫy: Không đồng nhất giả thuyết với kết luận đã được chứng minh."}
 ];
}
function lesson(){
 return {title:"Pacific Navigation and Voyaging",paragraphs:["The writer says: experiments such as these cannot categorically confirm or negate a hypothesis."],
  questions:[{id:11,type:"ending",question:"One limitation in the information produced by all of this research is that it",answer:"C",p:0,quote:""}]};
}
test("Google Docs headings become independent explanation records",()=>{
 const records=parse(doc());
 assert.equal(records.length,1);
 assert.equal(records[0].id,11);
 assert.equal(records[0].docAnswer,"C");
 assert.match(records[0].logic,/Nghiên cứu/);
 assert.match(records[0].evidence,/Passage viết/);
 assert.match(records[0].traps,/khẳng định/);
});
test("A case-only difference is an exact verified quote, not a guessed location",()=>{
 const anchors=findAnchors(lesson().paragraphs,doc()[4].text);
 assert.equal(anchors.length,1);
 assert.equal(anchors[0].p,0);
 assert.equal(anchors[0].quote,"experiments as these cannot categorically confirm or negate a hypothesis.".replace("experiments as","experiments such as"));
 const out=apply(lesson(),doc(),{allowPartial:false});
 assert.equal(out.ready,true);
 assert.deepEqual(out.updated,[11]);
 assert.equal(out.lesson.questions[0].answer,"C");
 assert.ok(out.lesson.questions[0].quote.startsWith("experiments"));
});
test("Wrong keys and missing evidence fail closed without altering the question bank",()=>{
 const original=lesson();
 const wrong=apply(original,doc("A"));
 assert.equal(wrong.ready,false);
 assert.equal(wrong.lesson,null);
 assert.match(wrong.errors.join("|"),/Answer-key mismatch/);
 const notFound=apply(original,doc("C","No exact source quote can possibly match."));
 assert.equal(notFound.ready,false);
 assert.match(notFound.errors.join("|"),/No unique exact evidence anchor/);
 assert.equal(original.questions[0].answer,"C");
});
test("Repeated snippets do not produce ambiguous highlights",()=>{
 const passage=["same decisive source sentence","another same decisive source sentence"];
 assert.deepEqual(findAnchors(passage,'“same decisive source sentence”'),[]);
});
test("Choose TWO answers are order-independent and have one shared group ID",()=>{
 assert.equal(sameAnswer(["C","D"],"D, C"),true);
 const got=parse([
  {text:"Câu 7–8 — C, D | Hai phương án",namedStyleType:"HEADING_2"},
  {text:"ĐỀ: Which TWO statements are correct?"},
  {text:"ĐÁP ÁN: D, C"},
  {text:"1. Hiểu câu chuyện / logic: Hai đáp án đều được nhắc đến."},
  {text:"2. Bằng chứng + paraphrase: “Both valid statements are in the passage.”"},
  {text:"3. Phân tích đáp án sai / bẫy: Loại ba lựa chọn còn lại."}
 ]);
 assert.deepEqual(got[0].ids,[7,8]);
});
