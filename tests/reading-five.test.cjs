const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const vm=require("node:vm");
const path=require("node:path");
const root=path.join(__dirname,"..");
function read(p){return fs.readFileSync(path.join(root,p),"utf8")}
function load(){
 const ctx=vm.createContext({window:{},console});
 vm.runInContext(read("content/reading-five-practice.js"),ctx);
 vm.runInContext(read("features/reading-five.js"),ctx);
 return ctx.window;
}
const expected={
 "yawning":14,
 "being-left-handed-in-a-right-handed-world":13,
 "pacific-navigation-and-voyaging":14,
 "the-importance-of-law":13,
 "australian-artist-margaret-preston":13
};
test("Five study adaptations contain exactly 67 graded marks and complete deep feedback",()=>{
 const w=load(),bank=w.FIVE_READING_BANK;
 assert.deepEqual(Object.keys(bank).sort(),Object.keys(expected).sort());
 let overall=0;
 for(const [slug,lesson] of Object.entries(bank)){
  assert.equal(lesson.slug,slug);
  assert.equal(lesson.total,expected[slug]);
  assert.equal(lesson.path,"grade-12/reading/"+slug);
  assert.match(lesson.source,/^https:\/\/mini-ielts\.com\/\d+\/print\/reading\//);
  assert.equal(lesson.minutes,20);
  assert.ok(lesson.paragraphs.length>=6);
  assert.ok(lesson.sections.length>=2);
  w.FiveReadingTest.validate(lesson);
  let points=0,full=0;
  const ids=new Set();
  for(const q of lesson.questions){
   assert.ok(!ids.has(q.id),"duplicate "+slug+" #"+q.id);ids.add(q.id);
   assert.ok(q.evidence.length>=45,"evidence too thin "+slug+" #"+q.id);
   assert.ok(q.reason.length>=60,"reason too thin "+slug+" #"+q.id);
   assert.ok(q.trap.length>=50,"trap too thin "+slug+" #"+q.id);
   assert.ok(q.paraphrase,"no paraphrase "+slug+" #"+q.id);
   assert.ok(q.anchor&&lesson.paragraphs[q.p].includes(q.anchor),"unlocatable evidence "+slug+" #"+q.id);
   const sec=lesson.sections.find(s=>s.ids.includes(q.id));
   assert.ok(sec,"no section "+slug+" #"+q.id);
   const choices=q.options||sec.options||[];
   if(q.type==="choice"){
    assert.ok(choices.length>=3,"choice bank underpopulated "+slug+" #"+q.id);
    assert.deepEqual(Object.keys(q.analysis).sort(),Array.from(choices,x=>x[0]).sort(),"option-level rationale missing "+slug+" #"+q.id);
    for(const c of choices)assert.ok(q.analysis[c[0]].length>20);
   }else if(q.type==="input"){
    assert.equal(q.maxWords,1);
   }else if(q.type==="multi"){
    assert.equal(q.choose,2);
    assert.deepEqual(q.answer,["C","D"]);
    assert.equal(choices.length,5);
    assert.deepEqual(Object.keys(q.analysis).sort(),["A","B","C","D","E"]);
   }
   const marks=q.type==="multi"?q.choose:1;
   points+=marks;
   full+=w.FiveReadingTest.score(q,q.answer);
   assert.equal(w.FiveReadingTest.score(q,""),0);
  }
  assert.equal(points,lesson.total);
  assert.equal(full,lesson.total);
  overall+=points;
 }
 assert.equal(overall,67);
});
test("Choose TWO accepts C+D and D+C, scores partial matches only when complete",()=>{
 const w=load(),q=w.FIVE_READING_BANK["the-importance-of-law"].questions.find(x=>x.type==="multi");
 assert.equal(w.FiveReadingTest.score(q,["C","D"]),2);
 assert.equal(w.FiveReadingTest.score(q,["D","C"]),2);
 assert.equal(w.FiveReadingTest.score(q,["D","A"]),1);
 assert.equal(w.FiveReadingTest.score(q,["A","B"]),0);
 assert.equal(w.FiveReadingTest.score(q,["C"]),0);
});
test("Matching heading labels are unique and heading ii is present",()=>{
 const w=load(),s=w.FIVE_READING_BANK["the-importance-of-law"].sections[0],labels=s.options.map(x=>x[0]);
 assert.deepEqual(labels,["i","ii","iii","iv","v","vi","vii","viii"]);
 assert.equal(w.FIVE_READING_BANK["the-importance-of-law"].questions.find(q=>q.id===6).answer,"ii");
});
test("Answer normalisation preserves identity while tolerating case and whitespace",()=>{
 const w=load(),score=w.FiveReadingTest.score;
 const marg=w.FIVE_READING_BANK["australian-artist-margaret-preston"];
 assert.equal(score(marg.questions.find(q=>q.id===10)," STENCILING "),1);
 assert.equal(score(marg.questions.find(q=>q.id===13)," 400 "),1);
 assert.equal(score(marg.questions.find(q=>q.id===13),"1953"),0);
 const law=w.FIVE_READING_BANK["the-importance-of-law"];
 assert.equal(score(law.questions.find(q=>q.id===10)," journalists  "),1);
 assert.equal(score(law.questions.find(q=>q.id===12),"DEDICATION"),1);
 assert.equal(score(law.questions.find(q=>q.id===12),"dedicated"),0);
});
test("Published catalogue exposes five distinct new Reading routes without changing Robots",()=>{
 const manifest=read("content/manifest.js");
 for(const [slug,total] of Object.entries(expected)){
  assert.ok(manifest.includes('route:"grade-12/reading/'+slug+'"'));
  assert.ok(manifest.includes('args: ["'+slug+'"]'));
 }
 assert.ok(manifest.includes('route:"grade-12/reading/robots-and-us"'));
 assert.match(read("index.html"),/destroyFiveReading/);
 assert.match(read("features/explanation-v1.js"),/options.length>=2/);
 assert.match(read("grade12-robots-reading.js"),/window\.robotsGoEvidence=goEvidence/);
});
