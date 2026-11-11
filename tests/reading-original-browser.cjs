const {chromium}=require("playwright");
const assert=require("node:assert/strict");
(async()=>{
 const browser=await chromium.launch({headless:true});
 const page=await browser.newPage({viewport:{width:1250,height:850}});
 const errors=[],missing=[];
 page.on("pageerror",e=>errors.push(e.message));
 page.on("response",r=>{if(r.url().startsWith("http://127.0.0.1:4173/")&&r.status()>=400)missing.push(r.status()+" "+r.url())});
 page.on("dialog",d=>d.accept());
 await page.route("https://ouicitkpfukterkilqzu.supabase.co/**",r=>r.fulfill({status:200,contentType:"application/json",body:r.request().url().includes("/rest/v1/")?"[]":"{}",headers:{"access-control-allow-origin":"*"}}));
 await page.addInitScript(()=>{
  const uid="00000000-0000-4000-8000-000000000042";
  localStorage.setItem("hoctienganh_learner_auth_v1",JSON.stringify({
   access_token:"fake-original-reading-test",refresh_token:"fake",expires_at_ms:Date.now()+3600000,
   user:{id:uid,user_metadata:{username:"reader",display_name:"Browser Reader"}}
  }));
  const token="mock-tutoring";
  localStorage.setItem("hoctienganh_access_tutoring",JSON.stringify({token,area:"tutoring",expiresAt:new Date(Date.now()+3600000).toISOString()}));
  sessionStorage.setItem("hoctienganh_valid_tutoring",JSON.stringify({token,until:Date.now()+3600000}));
  localStorage.setItem("hoctienganh_active_area","tutoring");
 });
 const slugs=["yawning","being-left-handed-in-a-right-handed-world","pacific-navigation-and-voyaging","the-importance-of-law","australian-artist-margaret-preston"];
 const expected=[14,13,14,13,13];
 const base="http://127.0.0.1:4173/";
 async function open(slug){
  await page.goto(base+"#grade-12/reading/"+slug,{waitUntil:"domcontentloaded"});
  await page.locator(".exercise-intro button.primary").waitFor({state:"visible",timeout:18000});
  await page.locator(".exercise-intro button.primary").click();
  await page.locator("#mis-app").waitFor({state:"visible",timeout:12000});
 }
 try{
  await page.goto(base+"#grade-12",{waitUntil:"domcontentloaded"});
  const gradeReading=page.locator('#pageMount [data-reading-route]');
  await gradeReading.waitFor({state:"visible",timeout:16000});
  assert.equal(await gradeReading.count(),1,"Grade 12 should show one Reading library card");
  assert.equal(await gradeReading.getAttribute("data-reading-route"),"grade-12/reading");
  await gradeReading.click();
  await page.locator("#pageMount [data-reading-path]").first().waitFor({state:"visible",timeout:12000});
  assert.equal(await page.locator("#pageMount [data-reading-path]").count(),7,"Reading library should expose all seven passages");
  console.log("PASS Grade 12 single Reading card → seven-passage library");
  for(let i=0;i<slugs.length;i++){
   await open(slugs[i]);
   const total=await page.locator(".mis-jump").count();
   assert.equal(total,expected[i],slugs[i]+" numbered answer slots");
   const passage=await page.locator(".mis-paragraph").count();
   assert.equal(passage,6,slugs[i]+" paragraph count");
   if(slugs[i]==="being-left-handed-in-a-right-handed-world"){
    assert.doesNotMatch(await page.locator("#mis-question-pane").innerText(),/Population patterns and family resemblance/,"paragraph match options must not disclose paragraph summaries");
   }
   const choices=await page.locator(".mis-option").count();
   assert.ok(choices>0,slugs[i]+" must have interactive options");
   await page.locator(".mis-option").first().click();
   const status=await page.locator("#mis-status").innerText();
   assert.match(status,/\d+\/\d+/);
   if(slugs[i]==="the-importance-of-law"){
    const group=page.locator("#mis-q-7");
    await group.locator('[data-option="D"]').click();
    await group.locator('[data-option="B"]').click();
    assert.equal(await group.locator('[aria-pressed="true"]').count(),2,"choose-two order-independent selection");
    assert.equal(await page.locator("#mis-nav-7").count(),1);
    assert.equal(await page.locator("#mis-nav-8").count(),1);
   }
   await page.locator(".mis-topbar .mis-submit").click();
   await page.locator(".mis-results-banner").waitFor({state:"visible",timeout:12000});
   const body=await page.locator(".mis-results-banner").innerText();
   assert.match(body,new RegExp("/"+expected[i]+" câu đúng"));
   assert.equal(await page.locator(".mis-review").count(),expected[i]-(slugs[i]==="the-importance-of-law"?1:0));
   if(slugs[i]==="the-importance-of-law")assert.match(body,/2\/13|3\/13/);
    const print=await page.evaluate(()=>window.UniversalPrint?.source?.()?.get?.());
    assert.ok(print?.groups?.length>=2,"A4 print data must be available after submission");
    assert.equal(print.groups.filter(g=>g.passage).length,1,"print source passage once");
    assert.equal(print.groups.reduce((sum,g)=>sum+g.questions.reduce((n,q)=>n+(String(q.number).includes("–")?2:1),0),0),expected[i],"print preserves all answer slots");
    if(slugs[i]==="the-importance-of-law"){
     assert.ok(print.groups[0].questions[0].optionLabels.includes("ii"),"Roman heading labels retained");
     assert.equal(print.groups[1].questions[0].number,"7–8","Choose TWO print grouped numbering");
    }
    if(slugs[i]==="yawning")assert.equal(print.groups[0].answerBank.length,11,"summary bank printed once");

   await page.setViewportSize({width:390,height:800});
   const btn=page.locator(".mis-evidence-link").first();
   await page.locator('.mis-mobile-switch [data-tab="questions"]').click();
   await btn.click();
   assert.equal(await page.locator("#mis-app").getAttribute("data-tab"),"reading","evidence should open passage on mobile");
   assert.ok(await page.locator("#mis-passage-pane .mis-evidence").count()>0,"actual source quote highlighted");
   await page.setViewportSize({width:1250,height:850});
   console.log("PASS "+slugs[i]+" "+expected[i]+" slots + evidence");
  }
  // Existing Robots 3-choice explanations must be marked 'ready' after submission.
  await page.goto(base+"#grade-12/reading/robots-and-us",{waitUntil:"domcontentloaded"});
  await page.locator(".exercise-intro button.primary").waitFor({timeout:16000});
  await page.locator(".exercise-intro button.primary").click();
  await page.locator(".mis-topbar .mis-submit").click();
  await page.locator(".mis-review").first().waitFor({timeout:12000});
  assert.equal(await page.locator('[data-review-status="needs_review"]').count(),0,"3-choice matching explanation false positives");
  console.log("PASS Robots legacy review validator");
  assert.deepEqual(errors,[],"JS page errors");
  assert.deepEqual(missing,[],"Missing local assets");
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
