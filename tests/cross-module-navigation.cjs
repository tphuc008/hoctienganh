const {chromium}=require("playwright");
const assert=require("node:assert/strict");
const origin="http://127.0.0.1:4173/";
(async()=>{
 const browser=await chromium.launch({headless:true});
 const context=await browser.newContext({viewport:{width:1366,height:800}});
 const page=await context.newPage();
 const jsErrors=[],assets=[];
 page.on("pageerror",e=>jsErrors.push(e.message));
 page.on("response",r=>{
  if(r.url().startsWith(origin)&&r.status()>=400)assets.push(r.url()+" "+r.status());
 });
 await page.route("https://ouicitkpfukterkilqzu.supabase.co/**",route=>route.fulfill({
  status:200,contentType:"application/json",body:route.request().url().includes("/rest/v1/")?"[]":"{}",
  headers:{"access-control-allow-origin":"*"}
 }));
 await page.route("https://www.youtube.com/**",route=>route.abort());
 await page.addInitScript(()=>{
  const id="00000000-0000-4000-8000-000000000042";
  localStorage.setItem("hoctienganh_learner_auth_v1",JSON.stringify({
   access_token:"fake-audit",refresh_token:"fake",expires_at_ms:Date.now()+3600000,
   user:{id,user_metadata:{username:"audit",display_name:"Audit Student"}}
  }));
  for(const area of ["school","tutoring"]){
   const token="mock-"+area;
   localStorage.setItem("hoctienganh_access_"+area,JSON.stringify({
     token,area,expiresAt:new Date(Date.now()+3600000).toISOString()
   }));
   sessionStorage.setItem("hoctienganh_valid_"+area,JSON.stringify({token,until:Date.now()+3600000}));
  }
 });
 try{
  await page.goto(origin,{waitUntil:"domcontentloaded",timeout:20000});
  await page.locator("#pageMount .hero").waitFor({timeout:20000});
  const requests=[
   ["grade-12/unit-1",".exercise-grid","tutoring"],
   ["grammar/prefix-suffix",".exercise-grid","tutoring"],
   ["grade-12/reading/robots-and-us",".exercise-intro","tutoring"],
   ["listening/entertainment/change-your-life-one-tiny-step-at-a-time","#listeningQuestionPanel","tutoring"],
   ["listening/news/former-openai-employee-ai-might-really-kill-us-all","#newsListeningQuestionPanel","tutoring"],
   ["grade-10/mid-term-test/test-3",".mt-question","tutoring"],
   ["grade-10/mid-term-test",".mt-quiz-grid","tutoring"],
   ["school/grade-10/midterm-1/set-1",".exercise-intro","school"],
   ["school/grade-10/midterm-1",".exercise-grid","school"],
   ["grade-12/unit-7/vocabulary-practice-11",".exercise-intro","tutoring"],
   ["history","#learningHistoryList","tutoring"],
   ["grade-12/unit-1",".exercise-grid","tutoring"]
  ];
  for(const [route,selector,area] of requests){
   await page.evaluate(({route,area})=>{
     localStorage.setItem("hoctienganh_active_area",area);
     location.hash="#"+route;
   },{route,area});
   await page.locator(selector).first().waitFor({state:"visible",timeout:14000});
   await page.waitForTimeout(160);
   assert.equal(new URL(page.url()).hash,"#"+route);
   const state=await page.evaluate(()=>({
     text:(document.getElementById("pageMount")?.innerText||"").slice(0,800),
     page:document.getElementById("pageMount")?.style.display,
     quiz:document.getElementById("quizShell")?.style.display
   }));
   assert.ok(state.page==="block"||state.quiz==="block",route+" has no visible content");
   assert.ok(!state.text.includes("Không tải được bài học"),route+" shows a loading error");
   console.log("SPA NO-RELOAD PASS "+route);
  }
  const scripts=await page.evaluate(()=>[...document.querySelectorAll("script[src]")].map(e=>new URL(e.src).pathname));
  for(const path of [...new Set(scripts)]){
   assert.equal(scripts.filter(x=>x===path).length,1,"Duplicate script injected: "+path);
  }
  assert.deepEqual(assets,[],"Missing same-origin assets");
  assert.deepEqual(jsErrors,[],"Uncaught SPA navigation errors");
  console.log("ALL CROSS-MODULE SPA NAVIGATION TESTS PASSED; "+requests.length+" routes");
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});