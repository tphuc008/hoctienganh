const {chromium}=require("playwright");
const assert=require("node:assert/strict");
(async()=>{
 const browser=await chromium.launch({headless:true});
 const ctx=await browser.newContext({viewport:{width:1280,height:840}});
 const page=await ctx.newPage(),errors=[],missing=[];
 page.on("pageerror",e=>errors.push(e.message));
 page.on("response",r=>{if(r.url().startsWith("http://127.0.0.1:4173/")&&r.status()>=400)missing.push(r.status()+" "+r.url())});
 await page.route("https://ouicitkpfukterkilqzu.supabase.co/**",route=>route.fulfill({
   status:200,contentType:"application/json",body:route.request().url().includes("/rest/v1/")?"[]":"{}",
   headers:{"access-control-allow-origin":"*"}
 }));
 await page.addInitScript(()=>{
  const userId="00000000-0000-4000-8000-000000000042";
  localStorage.setItem("hoctienganh_learner_auth_v1",JSON.stringify({
   access_token:"fake-manifest-test",refresh_token:"fake",
   expires_at_ms:Date.now()+3600000,user:{id:userId,user_metadata:{username:"audit",display_name:"Manifest Auditor"}}
  }));
  const token="mock-tutoring";
  localStorage.setItem("hoctienganh_access_tutoring",JSON.stringify({token,area:"tutoring",
   expiresAt:new Date(Date.now()+3600000).toISOString()}));
  sessionStorage.setItem("hoctienganh_valid_tutoring",JSON.stringify({token,until:Date.now()+3600000}));
  localStorage.setItem("hoctienganh_active_area",location.hash.startsWith("#school/")?"school":"tutoring");
 });
 const base="http://127.0.0.1:4173/";
 async function open(route,selector){
  await page.goto(base+"#"+route,{waitUntil:"domcontentloaded",timeout:22000});
  try{await page.locator(selector).first().waitFor({timeout:15000,state:"visible"})}
  catch(e){throw Error("Route "+route+" did not show "+selector+"; body="+
     (await page.locator("#pageMount").innerText()).slice(0,500)+"; error="+e.message)}
  assert.equal(new URL(page.url()).hash.slice(1),route);
 }
 try{
  await open("grade-12",".units");
  const catalogue=await page.evaluate(()=>({
   count:ContentManifest.vocabulary.length,
   routes:ContentManifest.entries.map(x=>x.route),
   valid:ContentManifest.validate(),
   units:ContentManifest.vocabulary.map(x=>({grade:x.grade,unit:x.id,route:"grade-"+x.grade+"/unit-"+x.id}))
  }));
  assert.equal(catalogue.valid,true);
  assert.equal(catalogue.count,14);
  assert.equal(new Set(catalogue.routes).size,catalogue.routes.length);
  console.log("Manifest catalogue: "+catalogue.count+" Vocabulary units and "+catalogue.routes.length+" unique pages");
  for(const u of catalogue.units){
   await open(u.route,".exercise-grid");
   const counts=await page.evaluate(({grade,unit})=>({
    real:Object.keys(window.ContentManifest.loadedBanks()[grade+"-"+unit].levelConfig).length,
    displayed:document.querySelectorAll("#pageMount .exercise-card").length
   }),u);
   assert.equal(counts.real,counts.displayed,"Mismatch for "+u.route);
   await open(u.route+"/vocabulary-practice-1",".exercise-intro");
   console.log("PASS "+u.route+" and vocabulary-practice-1");
  }
  await open("grammar",".units");
  const grammarCards=await page.locator("#pageMount .unit-card").count();
  assert.equal(grammarCards,1);
  await open("grammar/prefix-suffix",".exercise-grid");
  await open("grammar/prefix-suffix/set-1",".exercise-intro");
  await page.locator(".exercise-intro button.primary").click();
  await page.locator("#quizShell").waitFor({state:"visible",timeout:12000});
  console.log("Grammar cards, direct set link and engine: passed");
  await open("school/grade-10/midterm-1/set-7",".exercise-intro");
  console.log("School manifest routes and access separation: passed");
  // These three lessons are in Tutoring, whereas the preceding test opened School.
  await open("tutoring",".units");
  await open("grade-12/lesson-plans/unit-7",".lp-inline-question");
  assert.equal(await page.locator(".lp-inline-question").count(),40,"Lesson page should show 40 original questions");
  assert.equal(await page.locator("#lp-section-practice").count(),0,"Practice page must not be on the lesson page");
  await open("grade-12/lesson-plans/unit-7/practice","#lp-section-practice");
  assert.equal(await page.locator(".lp-inline-question").count(),0,"Practice page must not include 40 original questions");
  assert.equal(await page.locator("#lp-section-print").count(),0,"Print page must not be on the practice page");
  await open("grade-12/lesson-plans/unit-7/print","#lp-section-print");
  assert.equal(await page.locator("#lp-section-study").count(),0,"Print page must not contain the original study page");
  assert.equal(await page.locator('[data-lp-print-part]').count(),3,"Three handout Part selectors required");
  assert.equal(await page.locator('[data-lp-print-mode]').count(),2,"Only answer-key and detailed-solution print modes");
  assert.equal(await page.locator('.lp-print-key-grid').count(),0,"Protected keys never render for locked users");
  await page.locator('[data-lp-print-part="context"]').uncheck();
  await page.locator('[data-lp-print-part="opposite"]').uncheck();
  assert.match(await page.locator('.lp-print-count').innerText(),/6 \/ 40 câu/);
  assert.equal(await page.locator('[data-lp-print-now]').isDisabled(),true);
  assert.equal(await page.locator(".lp-page-nav a").count(),3);
  console.log("Unit 7 three-page navigation and content separation: passed");
  assert.deepEqual(missing,[],"Missing same-origin source assets");
  assert.deepEqual(errors,[],"Uncaught browser JS errors");
  console.log("ALL CONTENT MANIFEST BROWSER REGRESSIONS PASSED");
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
