const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
function load(){
  const sandbox={window:{},console,document:{},location:{hash:''}};
  vm.createContext(sandbox);
  function execute(file){vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),sandbox,{filename:file});}
  execute('features/explanation-v1.js');
  execute('content/school-grade10-pdf.js');
  for(let i=1;i<=9;i++)execute(`content/school-grade10-explain-${i}.js`);
  execute('content/school-grade10-explanation-concise.js');
  execute('features/school-grade10-units.js');
  return sandbox.window;
}
test('All 306 School Grade 10 questions have source-linked, three-stage explanations',()=>{
  const api=load(),db=api.schoolUnitData(),details=api.SCHOOL_G10_DETAILED_EXPLANATIONS;
  assert.equal(Object.keys(details).length,306);
  assert.equal(db[3].groups.length,15);
  assert.equal(db[4].groups.length,16);
  assert.equal(db[3].count,142);
  assert.equal(db[4].count,164);
  assert.equal(db[3].words.length,72);
  assert.equal(db[4].words.length,68);
  const ids=new Set();let questions=0, vocab=0, written=0;
  for(const unit of [3,4])for(const group of db[unit].groups)for(const q of group.items){
    questions++;
    assert.ok(!ids.has(q.id),`Duplicate ${q.id}`);ids.add(q.id);
    const detail=details[q.id];assert.ok(detail,`Missing detail: ${q.id}`);
    assert.ok(detail.quickReason?.length>15,`Insufficient quick explanation: ${q.id}`);
    assert.ok(detail.evidence?.length>0,`Missing source evidence: ${q.id}`);
    assert.ok(detail.reasoning?.length>15 || detail.options?.some(o=>o.analysis?.length>10),`Missing reasoning: ${q.id}`);
    assert.ok(detail.application?.length>10 || detail.examples?.length===4,`Missing transfer: ${q.id}`);
    if(q.kind==='mcq'){
      assert.equal(q.options.length,4,`Bad source options: ${q.id}`);
      assert.equal(detail.options?.length,4,`Missing A-D contrast: ${q.id}`);
      assert.ok(detail.options.every(x=>x.analysis?.length>8),`Thin option rationale: ${q.id}`);
    }else written++;
    if(q.section==='B'){
      vocab++;
      assert.equal(detail.examples.length,4,`Missing four examples: ${q.id}`);
      assert.ok(detail.examples.every(x=>x.en?.length>15 && x.vi?.length>15),`Missing bilingual usage: ${q.id}`);
    }
  }
  assert.equal(questions,306);
  assert.equal(vocab,80);
  assert.equal(written,57);
  for(const id of ['3:A-2:2','4:A-2:6','3:B-1:5','4:E-3:4']){
    assert.equal(details[id].needsReview,true,`Source warning lost: ${id}`);
    const [unit,group,num]=id.split(':');
    assert.equal(db[+unit].groups.find(x=>x.id===group).items[+num-1].eligible,false,`Flawed source key remains scored: ${id}`);
  }
});
test('Canonical ExplanationV1 renderer shows quick reason, three stages and four bilingual examples',()=>{
  const api=load(), db=api.schoolUnitData(), group=db[3].groups.find(x=>x.id==='B-3');
  const q=group.items[0],d=api.SCHOOL_G10_DETAILED_EXPLANATIONS[q.id];
  const options=d.options.map((o,i)=>({...o,word:q.options[i]}));
  const examples=d.examples.map((o,i)=>({...o,word:q.options[i]}));
  const html=api.ExplanationV1.render({...d,options,examples,answer:q.answer});
  assert.match(html,/ev1-details/);
  assert.match(html,/ev1-short/);
  assert.equal((html.match(/class="semantic-step ev1-step"/g)||[]).length,3);
  assert.equal((html.match(/semantic-option-head/g)||[]).length,4);
  assert.equal((html.match(/class="example-en"/g)||[]).length,4);
  assert.equal((html.match(/class="example-vi"/g)||[]).length,4);
  assert.match(html,/data-review-status="ready"/);
});

test('School Grade 10 explanations omit repeated long-form filler without dropping evidence or examples',()=>{
 const api=load(),data=api.SCHOOL_G10_DETAILED_EXPLANATIONS;
 assert.equal(api.SCHOOL_G10_EXPLANATIONS_CONCISE_VERSION,1);
 let optionCount=0,exampleCount=0,duplicateNotes=0,wordCount=0;
 for(const [id,d] of Object.entries(data)){
  assert.ok(Array.isArray(d.evidence)&&d.evidence.length, 'Missing evidence '+id);
  for(const e of d.evidence){
   assert.ok(e.quote?.length>3,'Source quote dropped '+id);
   if(e.note && e.note.trim()===d.quickReason.trim())duplicateNotes++;
  }
  const analyses=d.options||[];
  if(analyses.length===4){
    assert.equal(d.reasoning||'', '', 'Duplicate long MCQ reasoning '+id);
    optionCount+=analyses.length;
  }
  for(const o of analyses){
    assert.doesNotMatch(o.analysis,/Chỗ trống giữa|thay đổi ý hoặc chức năng của thông tin tại vị trí hỏi|Đối chiếu cụ thể:|kiểm tra cặp hỏi–đáp\/đại từ ở các câu tương ứng/i,'Unedited filler '+id);
  }
  if(id.includes(':B-')){
    assert.equal(d.examples.length,4,'Bilingual vocabulary examples dropped '+id);
    exampleCount+=d.examples.length;
    assert.equal(d.application||'', '', 'Redundant introduction before four bilingual examples '+id);
  }
  wordCount+=JSON.stringify(d).length;
 }
 assert.equal(duplicateNotes,0);
 assert.equal(optionCount,996);
 assert.equal(exampleCount,320);
 assert.ok(wordCount<350000, 'Explanation bank remains excessively repetitive: '+wordCount);
});
