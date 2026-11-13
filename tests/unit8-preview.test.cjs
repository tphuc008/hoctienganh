const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");

test("Grade 12 Unit 8 publishes exactly two original 20-question fixed-order sets",()=>{
  const source=fs.readFileSync(path.join(__dirname,"..","grade12-unit8-test.js"),"utf8");
  const window={};
  vm.runInNewContext(source,{window});
  const b=window.G12_U8_TEST_BANK;
  assert.equal(b.grade,12);
  assert.equal(b.unit,88,"Existing Basic Review must retain its own public route");
  assert.equal(b.displayUnitNumber,8);
  assert.equal(b.title,"Wildlife Conservation");
  assert.equal(b.version,3,"Change version to invalidate old two-question drafts");
  assert.equal(b.pilotFixedFormat,true,"Existing reading layout is reused without a new renderer");
  assert.equal(Object.keys(b.levelConfig).length,2);
  assert.equal(b.questions.length,40);
  assert.equal(b.explanations.length,40);
  assert.equal(Object.keys(b.explanationById).length,40);
  const seenIds=new Set();
  const expected=[
    {set:1,title:"Set 1 – Dễ",keys:"ACBDABDCACDBACDBACDB",
      answers:["kept safe","save","got better","started","pass on","required","accepted","left unprotected","survive","serious",
       "coast","looks after","waste","examine","treat","recover","support","conserve","put up","make"]},
    {set:2,title:"Set 2 – Khó",keys:"BACDBACCDBBBADCCDADB",
      answers:["distraught","cautious","downplaying","endanger","were overlooked","strictly regulated","squander","with substantial dissent",
       "degrade","debilitating","invasive","crowd out","unchecked","overexploitation","unanimously","deterrent",
       "rangers","sanctuary","rehabilitate","fall through"]}
  ];
  for(const spec of expected){
    const cfg=b.levelConfig[spec.set];
    assert.equal(cfg.title,spec.title);
    assert.equal(cfg.fixedOrder,true);
    assert.equal(cfg.pool.length,20);
    assert.equal(cfg.pending,undefined);
    const setQuestions=cfg.pool.map(i=>b.questions[i]);
    assert.deepEqual(Array.from(setQuestions,q=>q.sourceQuestionNo),Array.from({length:20},(_,i)=>i+1));
    assert.equal(setQuestions.map(q=>"ABCD"[q.a]).join(""),spec.keys,"Original answer key and order");
    assert.deepEqual(Array.from(setQuestions,q=>q.o[q.a]),spec.answers,"Original correct option text");

    let passage=null;
    for(let i=0;i<20;i++){
      const index=cfg.pool[i],q=b.questions[index],d=b.explanations[index];
      assert.equal(q.o.length,4);
      assert.equal(new Set(q.o).size,4,"Unique visible options in "+q.id);
      assert.equal(q.lockOptions,true,"No option shuffle without also updating original letter keys");
      assert.ok(!seenIds.has(q.id),"Duplicated id "+q.id);
      seenIds.add(q.id);
      assert.equal(b.explanationById[q.id],d);
      assert.equal(d.mode,"semantic_precision");
      assert.equal(d.requiresReview,false);
      assert.equal(d.preserve,true);
      assert.equal(d.options.length,4);
      assert.equal(d.examples.length,4);
      assert.ok(d.translation.length>20,"Question translation");
      assert.equal(d.step1.length,3);
      for(const field of d.step1)assert.ok(field.length>25,"Evidence, reasoning and useful phrases must be present");

      if(i<10){
        assert.equal(q.type,undefined);
        assert.match(q.q,/[.!?]$/);
        assert.equal(q.promptType,i<5?"SYNONYM · CLOSEST IN MEANING":"ANTONYM · OPPOSITE IN MEANING");
        assert.ok(q.q.toLowerCase().includes(q.target.toLowerCase()),"Highlighted word not in source: "+q.id);
      }else{
        assert.equal(q.type,"reading");
        assert.equal(q.q,"Which option best fits blank ("+(i+1)+")?");
        assert.equal(q.focus,"("+(i+1)+") ______");
        if(passage===null)passage=q.context;
        assert.equal(q.context,passage,"One shared passage in each cloze");
        assert.equal((q.context.match(/\(\d+\) ______/g)||[]).length,10,"Must keep all ten cloze blanks");
        for(let n=11;n<=20;n++)assert.ok(q.context.includes("("+n+") ______"),"Missing blank "+n);
      }
      for(let j=0;j<4;j++){
        const opt=d.options[j],example=d.examples[j];
        assert.equal(opt.label,"ABCD"[j]);
        assert.equal(example.label,"ABCD"[j]);
        assert.equal(q.o[j],opt.word);
        assert.equal(q.o[j],example.word);
        assert.ok(opt.meaning.length>2);
        assert.ok(opt.analysis.length>24,"Question-specific A-D reasoning "+q.id);
        assert.ok(example.en.length>20,"English example "+q.id);
        assert.ok(example.vi.length>18,"Vietnamese translation "+q.id);
        assert.match(example.en,/[.!?]$/,"Complete usage sentence "+q.id);
      }
    }
    assert.equal(cfg.pool.slice(0,10).filter(i=>!b.questions[i].context).length,10);
    assert.equal(cfg.pool.slice(10).filter(i=>b.questions[i].context).length,10);
  }
  assert.equal(seenIds.size,40);
  assert.equal(b.levelConfig[1].pool.every(i=>!b.levelConfig[2].pool.includes(i)),true);
});
