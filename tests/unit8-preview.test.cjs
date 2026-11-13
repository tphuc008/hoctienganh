const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");

test("Grade 12 Unit 8 preview is exactly two sets of two ORIGINAL questions",()=>{
  const source=fs.readFileSync(path.join(__dirname,"..","grade12-unit8-test.js"),"utf8");
  const window={};
  vm.runInNewContext(source,{window});
  const b=window.G12_U8_TEST_BANK;
  assert.equal(b.grade,12);
  assert.equal(b.unit,88);
  assert.equal(b.displayUnitNumber,8);
  assert.equal(b.title,"Wildlife Conservation");
  assert.equal(b.pilotFixedFormat,true);
  assert.equal(Object.keys(b.levelConfig).length,2);
  assert.equal(b.questions.length,4);
  assert.equal(b.explanations.length,4);
  const expected=[
    {set:1,title:"Set 1 – Dễ",key:["kept safe","coast"],types:[undefined,"reading"]},
    {set:2,title:"Set 2 – Khó",key:["distraught","invasive"],types:[undefined,"reading"]}
  ];
  for(const spec of expected){
    const cfg=b.levelConfig[spec.set];
    assert.equal(cfg.title,spec.title);
    assert.equal(cfg.fixedOrder,true);
    assert.equal(cfg.pool.length,2);
    cfg.pool.forEach((index,i)=>{
      const q=b.questions[index],d=b.explanations[index];
      assert.equal(q.o[q.a],spec.key[i]);
      assert.equal(q.type,spec.types[i]);
      assert.equal(q.lockOptions,true);
      assert.equal(q.sourceQuestionNo,i===0?1:11);
      assert.equal(b.explanationById[q.id],d);
      assert.equal(d.mode,"semantic_precision");
      assert.equal(d.requiresReview,false);
      assert.equal(d.options.length,4);
      assert.equal(d.examples.length,4);
      assert.equal(d.translation.length>20,true);
      assert.equal(d.step1.length,3);
      for(let j=0;j<4;j++){
        assert.equal(q.o[j],d.options[j].word);
        assert.equal(q.o[j],d.examples[j].word);
        assert.ok(d.options[j].analysis.length>25);
        assert.ok(d.examples[j].en.length>20);
        assert.ok(d.examples[j].vi.length>20);
      }
      if(q.type==="reading"){
        assert.equal((q.context.match(/_{4,}/g)||[]).length,1,
          "Only the tested cloze blank may remain unfilled in the preview");
        assert.ok(q.context.includes("(11) ______"));
      }else assert.ok(q.q.toLowerCase().includes(q.target));
    });
  }
});
