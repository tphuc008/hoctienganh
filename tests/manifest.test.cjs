const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const vm=require("node:vm");
const source=fs.readFileSync(require("node:path").join(__dirname,"..","content","manifest.js"),"utf8");
function boot(code=source,scriptBehavior=()=>{}){
  const scripts=[];
  const window={};
  const document={head:{appendChild(tag){
    scripts.push(tag.src);scriptBehavior(tag,window);
    queueMicrotask(()=>tag.onload?.());
  }},createElement:()=>({})};
  vm.runInNewContext(code,{window,document,console});
  return {manifest:window.ContentManifest,window,scripts};
}

test("Content Manifest is the authoritative, unique published catalogue",()=>{
  const {manifest}=boot();
  assert.equal(manifest.validate(),true);
  assert.equal(manifest.vocabulary.length,14);
  assert.equal(manifest.grammar.length,1);
  const pages=manifest.entries;
  assert.equal(new Set(pages.map(x=>x.id)).size,pages.length);
  assert.equal(new Set(pages.map(x=>x.route)).size,pages.length);
  assert.ok(pages.find(x=>x.route==="grade-12/unit-8"));
  assert.ok(pages.find(x=>x.route==="school/grade-10/midterm-1/set-7"));
  assert.ok(pages.find(x=>x.route==="grade-10/mid-term-test/test-6"));
  assert.ok(pages.find(x=>x.route==="grammar/prefix-suffix"));
  assert.ok(pages.find(x=>x.route==="grade-12/reading/robots-and-us"));
});

test("Direct links to exercise sets resolve from manifest without manual routing",()=>{
  const {manifest}=boot();
  const vocab=manifest.matchSetRoute("grade-12/unit-7/vocabulary-practice-11");
  assert.equal(vocab.kind,"vocabulary-set");
  assert.equal(vocab.unit,7);
  assert.equal(vocab.setNo,11);
  assert.equal(manifest.matchSetRoute("grade-12/unit-999/vocabulary-practice-1"),null);
  assert.equal(manifest.matchSetRoute("grammar/prefix-suffix/set-1").kind,"grammar-set");
  assert.equal(manifest.matchSetRoute("grammar/unknown/set-1"),null);
});

test("A new Vocabulary unit needs only one manifest entry and one JS content file",async()=>{
  const modified=source.replace("  const grammar=[",`  vocabulary.push({grade:12,id:9,title:"Unit 9",subtitle:"Sample only",bankGlobal:"G12_U9_BANK",source:"grade12-unit9.js"});\n  const grammar=[`);
  assert.notEqual(modified,source);
  const bank={questions:[{kind:"mcq",q:"Sample",o:["one","two","three","four"],a:0}],
    explanations:[{meaning:"Sample"}],levelConfig:{1:{pool:[0]}}};
  const {manifest,scripts}=boot(modified,(tag,window)=>{
    if(tag.src==="grade12-unit9.js")window.G12_U9_BANK=bank;
  });
  assert.ok(manifest.entries.find(x=>x.route==="grade-12/unit-9"));
  assert.equal(manifest.units.find(x=>x.grade===12&&x.id===9).subtitle,"Sample only");
  assert.equal(manifest.matchSetRoute("grade-12/unit-9/vocabulary-practice-1").setNo,1);
  const item={kind:"vocabulary-unit",grade:12,unit:9};
  assert.equal(await manifest.ensureBank(item),bank);
  assert.equal(await manifest.ensureBank(item),bank);
  assert.deepEqual(scripts,["grade12-unit9.js"],"Script must load at most once");
});

test("Manifest rejects duplicate routes and unsafe source paths",async()=>{
  const duplicate=source.replace('route:"school/grade-10/midterm-1",title:', 'route:"school/grade-10",title:');
  assert.notEqual(duplicate,source);
  assert.throws(()=>boot(duplicate),/duplicate\/invalid/);
  const malicious=source.replace('source:"grade9-unit1.js"','source:"../escape.js"');
  const {manifest}=boot(malicious);
  await assert.rejects(manifest.ensureBank({kind:"vocabulary-unit",grade:9,unit:1}),/unsafe script path/);
});

test("A new Reading or Listening page can load its renderer from a manifest source file",async()=>{
  const changed=source.replace("  const entries=[",`  pages.push({id:"new-reading",route:"grade-12/reading/new-passage",title:"New Passage",category:"reading",kind:"handler",handler:"renderNewPassage",source:"reading-new-passage.js"});\n  const entries=[`);
  assert.notEqual(changed,source);
  const {manifest,scripts}=boot(changed,(tag,window)=>{
    if(tag.src==="reading-new-passage.js")window.renderNewPassage=()=>"rendered";
  });
  const item=manifest.entries.find(x=>x.route==="grade-12/reading/new-passage");
  assert.ok(item);
  assert.equal((await manifest.ensureHandler(item))(),"rendered");
  assert.equal((await manifest.ensureHandler(item))(),"rendered");
  assert.deepEqual(scripts,["reading-new-passage.js"]);
});

test("Every existing manifest-declared source file exists",()=>{
  const path=require("node:path");
  const root=path.join(__dirname,"..");
  const {manifest}=boot();
  const sources=[
    ...manifest.vocabulary.map(x=>x.source),...manifest.grammar.map(x=>x.source),
    ...manifest.entries.filter(x=>x.source).map(x=>x.source)
  ];
  for(const file of new Set(sources)){
    assert.ok(fs.existsSync(path.join(root,file)),"Missing content source: "+file);
  }
});
