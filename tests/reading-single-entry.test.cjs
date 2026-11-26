const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const source=fs.readFileSync("index.html","utf8");
const manifest=fs.readFileSync("content/manifest.js","utf8");
const list=fs.readFileSync("grade12-reading.js","utf8");
test("Tutoring displays a single Reading shortcut and Grade 12 no longer duplicates it",()=>{
  const dashboard=fs.readFileSync("features/tutoring-dashboard-v2.js","utf8");
  assert.equal((dashboard.match(/href="#grade-12\/reading"/g)||[]).length,1);
  assert.doesNotMatch(source,/data-reading-route|const readingHTML/);
  const catalogue=fs.readFileSync("features/course-library-v2.js","utf8");
  assert.doesNotMatch(catalogue,/grade-12\/reading/);
});
test("Reading library still lists all published articles and original passage routes",()=>{
  assert.match(list,/LearningCore\.list\(\{category:"reading",grade:12,listing:true\}\)/);
  assert.match(list,/entries\.map\(item=>/);
  assert.match(list,/location\.hash=btn\.dataset\.readingPath/);
  const routes=[...manifest.matchAll(/route:"grade-12\/reading\/[^"]+"/g)].map(x=>x[0]);
  assert.equal(routes.length,3,"Two original Reading passages plus Pacific Navigation");
  assert.ok(routes.some(x=>x.includes("/pacific-navigation-and-voyaging")));

  assert.ok(routes.some(x=>x.includes("/robots-and-us")));
  assert.ok(routes.some(x=>x.includes("/marketing-and-the-information-age")));
  for(const slug of ["yawning","being-left-handed-in-a-right-handed-world","the-importance-of-law","australian-artist-margaret-preston"]){
    assert.ok(!routes.some(x=>x.includes("/"+slug)),slug+" removed from catalogue");
  }
});
