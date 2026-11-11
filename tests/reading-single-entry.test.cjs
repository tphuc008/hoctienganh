const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const source=fs.readFileSync("index.html","utf8");
const manifest=fs.readFileSync("content/manifest.js","utf8");
const list=fs.readFileSync("grade12-reading.js","utf8");
test("Grade 12 displays exactly one Reading entry that opens the Reading library",()=>{
  const section=source.split("const readingHTML=id===12?")[1]?.split("const lessonPlansHTML")[0];
  assert.ok(section,"Grade 12 Reading overview found");
  assert.match(section,/data-reading-route="grade-12\/reading"/);
  assert.match(section,/<h3>Reading<\/h3>/);
  assert.doesNotMatch(section,/\.map\(item=>/,"No one-card-per-passage rendering in Grade overview");
  assert.match(source,/btn\.dataset\.readingRoute/,"Card navigates to library");
});
test("Reading library still lists all published articles and original passage routes",()=>{
  assert.match(list,/LearningCore\.list\(\{category:"reading",grade:12,listing:true\}\)/);
  assert.match(list,/entries\.map\(item=>/);
  assert.match(list,/location\.hash=btn\.dataset\.readingPath/);
  const routes=[...manifest.matchAll(/route:"grade-12\/reading\/[^"]+"/g)].map(x=>x[0]);
  assert.equal(routes.length,2,"Only the two original Reading passages remain");
  assert.ok(routes.some(x=>x.includes("/robots-and-us")));
  assert.ok(routes.some(x=>x.includes("/marketing-and-the-information-age")));
  for(const slug of ["yawning","being-left-handed-in-a-right-handed-world","pacific-navigation-and-voyaging","the-importance-of-law","australian-artist-margaret-preston"]){
    assert.ok(!routes.some(x=>x.includes("/"+slug)),slug+" removed from catalogue");
  }
});
