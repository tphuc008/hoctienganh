const {chromium}=require("playwright");
const assert=require("node:assert/strict");
(async()=>{
 const browser=await chromium.launch({headless:true});
 const context=await browser.newContext({viewport:{width:1280,height:820}});
 const page=await context.newPage(),errors=[],missing=[];
 page.on("pageerror",e=>errors.push(e.message));
 page.on("response",r=>{if(r.url().startsWith("http://127.0.0.1:4173/")&&r.status()>=400)missing.push(r.status()+" "+r.url())});
 await page.route("https://ouicitkpfukterkilqzu.supabase.co/**",route=>route.fulfill({status:200,contentType:"application/json",body:route.request().url().includes("/rest/v1/")?"[]":"{}",
  headers:{"access-control-allow-origin":"*"}}));
 await page.route("https://www.youtube.com/**",route=>route.abort());
 await page.addInitScript(()=>{
  const id="00000000-0000-4000-8000-000000000042";
  localStorage.setItem("hoctienganh_learner_auth_v1",JSON.stringify({access_token:"mock",refresh_token:"mock",expires_at_ms:Date.now()+3600000,
   user:{id,user_metadata:{username:"audit",display_name:"UI audit"}}}));
  for(const area of ["school","tutoring"]){
   const token="mock-"+area;
   localStorage.setItem("hoctienganh_access_"+area,JSON.stringify({token,area,expiresAt:new Date(Date.now()+3600000).toISOString()}));
   sessionStorage.setItem("hoctienganh_valid_"+area,JSON.stringify({token,until:Date.now()+3600000}));
  }
 });
 const base="http://127.0.0.1:4173/";
 const inspect=()=>page.evaluate(()=>{
  const scripts=[...document.querySelectorAll("script[src]")].map(x=>new URL(x.src).pathname.split("/").pop());
  return {scripts,css:[...document.querySelectorAll("link[rel=stylesheet]")].map(x=>x.getAttribute("href"))};
 });
 async function open(route,selector){
  await page.evaluate(area=>localStorage.setItem("hoctienganh_active_area",area),route.startsWith("school/")?"school":"tutoring");
  await page.goto(base+"#"+route,{waitUntil:"domcontentloaded",timeout:26000});
  await page.locator(selector).first().waitFor({timeout:17000,state:"visible"});
  console.log("ROUTE OK "+route);
 }
 const lazy=[
  "grade10-midterm-data.js","grade10-midterm-explanations.js","grade10-midterm-precision.js",
  "grade10-midterm-reading-details.js","grade10-midterm-quality.js","grade10-midterm.js",
  "school-grade10-midterm1.js","school-grade10-explanations.js","school-ui.js",
  "listening-entertainment.js","listening-news.js","grade12-reading.js","grade12-robots-reading.js"
 ];
 try{
  const result=await page.goto(base,{waitUntil:"domcontentloaded",timeout:26000});
  assert.equal(result.status(),200);
  await page.locator("#pageMount .hero").waitFor({timeout:16000});
  assert.equal(await page.locator("#brandBtn").evaluate(el=>el.tagName),"BUTTON","Brand navigation needs native keyboard support");
  assert.equal(await page.locator("html").getAttribute("lang"),"vi","Vietnamese interface needs appropriate document language");
  await page.locator(".skip-link").focus();
  await page.keyboard.press("Enter");
  assert.equal(await page.evaluate(()=>document.activeElement.id),"pageMount","Skip navigation must focus active learning content");
  const initial=await inspect();
  for(const name of lazy)assert.ok(!initial.scripts.includes(name),"Eager script "+name);
  assert.ok(initial.css.some(x=>x.startsWith("styles/site.css")),"Extracted stylesheet not found");
  assert.ok(initial.css.some(x=>x.startsWith("styles/study-workspace.css")),"Shared responsive study design not loaded");
  const grid=await page.locator(".units").evaluate(el=>getComputedStyle(el).gridTemplateColumns.split(" ").filter(Boolean).length);
  assert.ok(grid>=3,"Desktop discovery should show a scannable multi-column course grid");

  assert.ok(initial.scripts.length<=26,"Initial scripts not reduced: "+initial.scripts.length);
  const source=await (await context.request.get(base)).text();
  assert.ok(Buffer.byteLength(source,"utf8")<120000,"HTML still has a large inline CSS payload");
  console.log("STARTUP PASS: "+initial.scripts.length+" scripts, HTML "+Buffer.byteLength(source)+" bytes");
  await open("tutoring",".study-access-settings");
  assert.equal(await page.locator(".study-access-settings").count(),1,"Secondary access controls should be collapsed within the course home");
  await open("listening/entertainment/change-your-life-one-tiny-step-at-a-time","#listeningQuestionPanel");
  assert.equal((await inspect()).scripts.filter(x=>x==="listening-entertainment.js").length,1);
  assert.ok(!(await inspect()).scripts.includes("listening-news.js"));
  await open("listening/news/former-openai-employee-ai-might-really-kill-us-all","#newsListeningQuestionPanel");
  assert.equal((await inspect()).scripts.filter(x=>x==="listening-news.js").length,1);
  await open("grade-12/reading",".exercise-grid");
  assert.equal((await inspect()).scripts.filter(x=>x==="grade12-reading.js").length,1);
  await open("grade-12/reading/robots-and-us",".exercise-intro");
  assert.equal((await inspect()).scripts.filter(x=>x==="grade12-robots-reading.js").length,1);
  await open("school/grade-10/midterm-1/set-1",".exercise-intro");
  for(const x of ["school-grade10-midterm1.js","school-grade10-explanations.js","school-ui.js"]){
   assert.equal((await inspect()).scripts.filter(z=>z===x).length,1,"School dependency "+x);
  }
  await open("grade-10/mid-term-test/test-3",".mt-question");
  for(const x of lazy.filter(x=>x.startsWith("grade10-midterm"))){
   assert.equal((await inspect()).scripts.filter(z=>z===x).length,1,"Exam dependency "+x);
  }
  await open("grade-10/mid-term-test/test-6",".mt-question");
  assert.equal((await inspect()).scripts.filter(z=>z==="grade10-midterm.js").length,1,"Repeated route reloaded exam engine");
  console.log("LAZY ROUTES AND DEPENDENCY ORDER: PASS");
  await page.emulateMedia({reducedMotion:"reduce"});
  const motion=await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior);
  assert.equal(motion,"auto","Reduced motion preference must disable smooth scrolling");
  await page.emulateMedia({reducedMotion:"no-preference"});
  console.log("SHARED ACCESSIBILITY CSS: PASS");
  await page.setViewportSize({width:390,height:844});
  await open("grade-12",".exercise-grid");
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+4),
    "Mobile course catalogue should not create horizontal page scrolling");
  assert.equal(await page.locator(".exercise-grid").first().evaluate(el=>getComputedStyle(el).gridTemplateColumns.split(" ").filter(Boolean).length),1,
    "Mobile course catalogue must use one column");
  await open("grade-12/unit-1",".exercise-grid");
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+4),
    "Mobile exercise overview should fit the viewport");
  await page.setViewportSize({width:1280,height:820});
  console.log("SHARED STUDY WORKSPACE DESKTOP/MOBILE: PASS");
  assert.deepEqual(missing,[],"Missing JS/CSS requests");
  assert.deepEqual(errors,[],"Uncaught errors during direct lazy navigation");
  console.log("ALL UI AND PERFORMANCE CHECKS PASSED");
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});