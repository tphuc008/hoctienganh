const {chromium}=require("playwright");
const assert=require("node:assert/strict");
(async()=>{
 const browser=await chromium.launch({headless:true});
 const ctx=await browser.newContext({viewport:{width:1280,height:850}});
 const page=await ctx.newPage(), errors=[];
 page.on("pageerror",e=>errors.push(e.message));
 const base="http://127.0.0.1:4173/";
 try{
  await page.goto(base,{waitUntil:"domcontentloaded"});
  await page.locator("#loginUsername").waitFor({timeout:20000});
  await page.getByText("Tạo tài khoản",{exact:true}).first().click();
  await page.locator("#signupDisplayName").waitFor();
  console.log("GUEST AUTH: OK");
  // Never use a real account or write to the production Supabase project.
  await page.route("https://ouicitkpfukterkilqzu.supabase.co/**",route=>{
   const url=route.request().url();
   const body=url.includes("/rest/v1/")?"[]":JSON.stringify({ok:true});
   route.fulfill({status:200,contentType:"application/json",body});
  });
  await page.addInitScript(()=>{
    const uid="00000000-0000-4000-8000-000000000042";
    localStorage.setItem("hoctienganh_learner_auth_v1",JSON.stringify({
     access_token:"fake-e2e-jwt",refresh_token:"fake",
     expires_at_ms:Date.now()+3600000,
     user:{id:uid,user_metadata:{username:"e2e",display_name:"E2E Test Learner"}}
    }));
    for(const area of ["school","tutoring"]){
     const token="mock-"+area;
     localStorage.setItem("hoctienganh_access_"+area,JSON.stringify({token,area,expiresAt:new Date(Date.now()+3600000).toISOString()}));
     sessionStorage.setItem("hoctienganh_valid_"+area,JSON.stringify({token,until:Date.now()+3600000}));
    }
    localStorage.setItem("hoctienganh_active_area","tutoring");
  });
  await page.reload({waitUntil:"domcontentloaded"});
  assert.equal(await page.evaluate(()=>window.LearningCore.userId()),"00000000-0000-4000-8000-000000000042","mock learner session");
  await page.locator("#pageMount .hero").waitFor({timeout:12000});
  async function open(route,selector){
   // The portal intentionally clears the active area; emulate entering the right area.
   await page.evaluate(area=>localStorage.setItem("hoctienganh_active_area",area),
      route.startsWith("school/")?"school":"tutoring");
   await page.goto(base+"#"+route,{waitUntil:"domcontentloaded"});
   try{await page.locator(selector).first().waitFor({timeout:12000})}
   catch(e){
     const debug=await page.evaluate(()=>({
       url:location.href,
       text:document.querySelector("#pageMount")?.innerText?.slice(0,900),
       html:document.querySelector("#pageMount")?.innerHTML?.slice(0,1300),
       uid:window.LearningCore?.userId?.(),
       registry:window.LearningCore?.list?.().length,
       active:localStorage.getItem("hoctienganh_active_area")
     }));
     console.error("FAILED ROUTE",route,JSON.stringify(debug),"PAGE ERRORS",JSON.stringify(errors));
     throw e;
   }
   console.log("ROUTE "+route+": OK");
  }
  await open("grade-12/reading",".exercise-grid");
  await open("grade-12/reading/robots-and-us",".exercise-intro");
  await open("grade-12/reading/marketing-and-the-information-age",".exercise-intro");
  await open("listening/news/former-openai-employee-ai-might-really-kill-us-all","#newsListeningQuestionPanel");
  await open("listening/entertainment/change-your-life-one-tiny-step-at-a-time","#listeningQuestionPanel");
  await open("school/grade-10/midterm-1/set-1",".exercise-intro");
  await page.locator(".exercise-intro button.primary").click();
  await page.locator("[data-school-quiz='1']").waitFor();
  const getSchool=()=>page.evaluate(()=>window.LearningCore.readDraft("school","grade-10/midterm-1/set-1"));
  const before=await getSchool();assert.ok(before&&before.startedAt,"school progress saved");
  await page.reload({waitUntil:"domcontentloaded"});
  await page.locator(".exercise-intro button.primary").click();
  const after=await getSchool();assert.equal(after.startedAt,before.startedAt,"school resumed");
  console.log("SCHOOL REFRESH/RESUME: OK");
  await open("grade-10/mid-term-test/test-3",".mt-question");
  await page.locator(".mt-option").first().click();
  const first=await page.evaluate(()=>window.LearningCore.readDraft("exam","grade-10/mid-term-test/test-3"));
  assert.ok(first&&Object.keys(first.answers).length>0,"midterm answer autosaved");
  await page.reload({waitUntil:"domcontentloaded"});
  await page.locator(".mt-option").first().waitFor();
  const resumed=await page.evaluate(()=>window.LearningCore.readDraft("exam","grade-10/mid-term-test/test-3"));
  assert.deepEqual(resumed.answers,first.answers);
  console.log("MIDTERM REFRESH/RESUME: OK");
  await open("grade-10/mid-term-test/test-4",".mt-question");
  await open("grade-10/mid-term-test/test-5",".mt-question");
  await open("grade-10/mid-term-test/test-6",".mt-question");
  await open("history","#learningHistoryList");
  assert.deepEqual(errors,[],"Browser runtime errors");
  console.log("ALL BROWSER SMOKE CHECKS PASSED");
 }finally{await browser.close()}
})().catch(err=>{console.error(err);process.exitCode=1});
