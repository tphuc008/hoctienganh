const {chromium}=require("playwright");
const assert=require("node:assert/strict");
(async()=>{
 const browser=await chromium.launch({headless:true});
 const page=await browser.newPage({viewport:{width:1270,height:820}});
 const runtime=[];
 page.on("pageerror",e=>runtime.push(e.message));
 await page.route("https://ouicitkpfukterkilqzu.supabase.co/**",route=>
   route.fulfill({status:200,contentType:"application/json",
     body:route.request().url().includes("/rest/v1/")?"[]":"{}",
     headers:{"access-control-allow-origin":"*"}}));
 await page.route("https://www.youtube.com/**",route=>route.abort());
 await page.addInitScript(()=>{
  const user={id:"00000000-0000-4000-8000-000000000042",user_metadata:{username:"e2e",display_name:"Flow Auditor"}};
  localStorage.setItem("hoctienganh_learner_auth_v1",JSON.stringify({
    user,access_token:"mock",refresh_token:"mock",expires_at_ms:Date.now()+3600000}));
  for(const area of ["school","tutoring"]){
    const token="mock-"+area;
    localStorage.setItem("hoctienganh_access_"+area,JSON.stringify({
     token,area,expiresAt:new Date(Date.now()+3600000).toISOString()}));
    sessionStorage.setItem("hoctienganh_valid_"+area,JSON.stringify({token,until:Date.now()+3600000}));
  }
 });
 const base="http://127.0.0.1:4173/";
 async function open(route,selector){
  await page.evaluate(area=>localStorage.setItem("hoctienganh_active_area",area),
    route.startsWith("school/")?"school":"tutoring");
  await page.goto(base+"#"+route,{waitUntil:"domcontentloaded"});
  await page.locator(selector).first().waitFor({state:"visible",timeout:12000});
 }
 async function status(category,slug){
  return page.evaluate(([a,b])=>window.LearningFlow.read(a,b),[category,slug]);
 }
 try{
  await page.goto(base,{waitUntil:"domcontentloaded"});
  await page.locator("#pageMount .hero").waitFor({timeout:10000});
  await open("grade-12/unit-1/vocabulary-practice-1",".exercise-intro");
  await page.locator(".exercise-intro button.primary").click();
  await page.locator("#quizFlowStatus[data-learning-phase='in_progress']").waitFor();
  let v=await status("vocabulary","grade-12/unit-1/set-1");
  assert.equal(v.done,0);
  assert.equal(v.phase,"in_progress");
  await page.reload({waitUntil:"domcontentloaded"});
  await page.locator(".exercise-intro button.primary").click();
  await page.locator("#quizFlowStatus[data-learning-phase='in_progress']").waitFor();
  assert.equal((await status("vocabulary","grade-12/unit-1/set-1")).startedAt,v.startedAt);
  console.log("VOCABULARY lifecycle / refresh: PASS");

  await open("grammar/prefix-suffix/set-1",".exercise-intro");
  await page.locator(".exercise-intro button.primary").click();
  await page.locator("#quizFlowStatus[data-learning-phase='in_progress']").waitFor();
  assert.equal((await status("grammar","grammar/prefix-suffix/set-1")).total,10);
  console.log("GRAMMAR lifecycle: PASS");

  await open("school/grade-10/midterm-1/set-1",".exercise-intro");
  await page.locator(".exercise-intro button.primary").click();
  await page.locator("[data-school-quiz] .learning-flow-badge[data-learning-phase='in_progress']").waitFor();
  let sh=await status("school","school/grade-10/midterm-1/set-1");
  assert.ok(sh&&sh.total>0);
  await page.reload({waitUntil:"domcontentloaded"});
  await page.locator(".exercise-intro button.primary").click();
  await page.locator("[data-school-quiz] .learning-flow-badge").waitFor();
  assert.equal((await status("school","school/grade-10/midterm-1/set-1")).startedAt,sh.startedAt);
  console.log("SCHOOL lifecycle / refresh: PASS");

  await open("grade-10/mid-term-test/test-3",".mt-question");
  await page.locator(".mt-option").first().click();
  await page.locator(".learning-flow-badge[data-learning-phase='in_progress']").waitFor();
  let ex=await status("exam","grade-10/mid-term-test/test-3");
  assert.equal(ex.phase,"in_progress");
  assert.ok(ex.total>20);
  await page.reload({waitUntil:"domcontentloaded"});
  await page.locator(".mt-question").waitFor();
  assert.equal((await status("exam","grade-10/mid-term-test/test-3")).startedAt,ex.startedAt);
  console.log("MIDTERM lifecycle / refresh: PASS");

  for(const [route,slug,panel,submit] of [
    ["listening/entertainment/change-your-life-one-tiny-step-at-a-time","entertainment/", "#listeningQuestionPanel","#submitListeningBtn1"],
    ["listening/news/former-openai-employee-ai-might-really-kill-us-all","news/","#newsListeningQuestionPanel","#newsSubmit1"]
  ]){
    await open(route,panel);
    await page.locator(panel+" .learning-flow-badge").first().waitFor();
    const item=await page.evaluate(prefix=>{
      return Object.values(LearningFlow).length, null
    },slug);
    const input=page.locator(panel+" .listening-part.active input").first();
    const type=await input.getAttribute("type");
    if(type==="radio")await input.check();else await input.fill("some answer");
    const recorded=await page.evaluate(p=>{
      const key=Object.keys(localStorage).find(x=>x.includes("hoctienganh:attempt:v1")&&x.includes("lifecycle")&&x.includes(encodeURIComponent("listening/"+p)));
      return key?JSON.parse(localStorage.getItem(key)).data:null;
    },slug);
    assert.ok(recorded&&recorded.done>=1,"Listening attempt not tracked");
    await page.locator(submit).click();
    const badge=page.locator(panel+" .learning-flow-badge[data-learning-phase='completed']").first();
    await badge.waitFor();
    await page.reload({waitUntil:"domcontentloaded"});
    await badge.waitFor();
    console.log(route+" lifecycle / submit / refresh: PASS");
  }
  await open("grade-12/reading/robots-and-us",".exercise-intro");
  await page.evaluate(()=>window.robotsContinue());
  await page.locator("#readingFlowStatus[data-learning-phase='in_progress']").waitFor();
  let rd=await status("reading","grade-12/reading/robots-and-us");
  assert.equal(rd.total,14);
  await page.evaluate(()=>window.robotsSetChoice(27,"A"));
  assert.equal((await status("reading","grade-12/reading/robots-and-us")).done,1);
  await page.reload({waitUntil:"domcontentloaded"});
  await page.locator(".exercise-intro button.primary").click();
  await page.locator("#readingFlowStatus").waitFor();
  assert.equal((await status("reading","grade-12/reading/robots-and-us")).startedAt,rd.startedAt);
  console.log("READING lifecycle / answer / refresh: PASS");

  assert.deepEqual(runtime,[],"No uncaught JS errors");
  console.log("ALL SHARED LIFECYCLE BROWSER TESTS PASSED");
 }finally{await browser.close();}
})().catch(err=>{console.error(err);process.exitCode=1});
