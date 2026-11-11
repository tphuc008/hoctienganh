const {chromium}=require("playwright");
const assert=require("node:assert/strict");
(async()=>{
 const browser=await chromium.launch({headless:true});
 const page=await browser.newPage({viewport:{width:1280,height:850}});
 const errors=[];
 page.on("pageerror",e=>errors.push(e.message));
 page.on("dialog",d=>d.accept());
 await page.route("https://ouicitkpfukterkilqzu.supabase.co/**",route=>route.fulfill({
  status:201,contentType:"application/json",body:"{}",
  headers:{"access-control-allow-origin":"*"}
 }));
 await page.addInitScript(()=>{
  const user="00000000-0000-4000-8000-000000000071";
  localStorage.setItem("hoctienganh_learner_auth_v1",JSON.stringify({
   access_token:"fake-reading-test",refresh_token:"fake",
   expires_at_ms:Date.now()+3600000,user:{id:user,user_metadata:{username:"reading-audit"}}
  }));
  const token="mock-tutoring";
  localStorage.setItem("hoctienganh_access_tutoring",JSON.stringify({token,area:"tutoring",
   expiresAt:new Date(Date.now()+3600000).toISOString()}));
  sessionStorage.setItem("hoctienganh_valid_tutoring",JSON.stringify({token,until:Date.now()+3600000}));
  localStorage.setItem("hoctienganh_active_area","tutoring");
 });
 const base="http://127.0.0.1:4173/";
 async function open(slug,total){
  await page.goto(base+"#grade-12/reading/"+slug,{waitUntil:"domcontentloaded"});
  await page.locator(".exercise-intro #five-start").waitFor({state:"visible",timeout:18000});
  await page.locator("#five-start").click();
  await page.locator(".five-app").waitFor({state:"visible",timeout:12000});
  assert.equal(await page.locator(".mis-q-card").count(),total===13&&slug==="the-importance-of-law"?12:total);
  assert.match(await page.locator("#mis-status").innerText(),new RegExp("/"+total));
  assert.ok(await page.locator(".mis-paragraph").count()>=6);
 }
 try{
  await open("yawning",14);
  await page.locator('#five-q-1 [data-five-value="K"]').click();
  assert.match(await page.locator("#mis-status").innerText(),/1\/14/);
  await page.reload({waitUntil:"domcontentloaded"});
  await page.locator(".five-app").waitFor();
  assert.equal(await page.locator('#five-q-1 [data-five-value="K"]').getAttribute("aria-pressed"),"true");
  await page.locator(".mis-topbar [data-five-submit]").click();
  await page.locator(".mis-results-banner").waitFor();
  assert.match(await page.locator(".mis-results-banner").innerText(),/1\/14/);
  await page.locator('#five-q-1 details summary').click();
  assert.match(await page.locator('#five-q-1 .five-lab-explanation').innerText(),/BẰNG CHỨNG/);
  await page.locator('#five-q-1 [data-five-proof]').click();
  assert.ok(await page.locator('#mis-passage-pane mark.mis-evidence').count()>=1);
  console.log("PASS Yawning choices, reload, submit, detailed explanation and proof");
  await open("the-importance-of-law",13);
  await page.locator('#five-q-7 [data-five-value="D"]').click();
  await page.locator('#five-q-7 [data-five-value="C"]').click();
  assert.equal(await page.locator('#five-q-7 [aria-pressed="true"]').count(),2);
  await page.locator(".mis-topbar [data-five-submit]").click();
  await page.locator(".mis-results-banner").waitFor();
  assert.match(await page.locator(".mis-results-banner").innerText(),/2\/13/);
  assert.match(await page.locator('#five-q-7 .five-lab-explanation').innerText(),/2\/2 điểm/);
  console.log("PASS Law order-independent grouped scoring");
  await open("australian-artist-margaret-preston",13);
  await page.locator('#five-q-10 [data-five-input]').fill("STENCILING");
  await page.locator('#five-q-13 [data-five-input]').fill(" 400 ");
  await page.locator(".mis-topbar [data-five-submit]").click();
  await page.locator(".mis-results-banner").waitFor();
  assert.match(await page.locator(".mis-results-banner").innerText(),/2\/13/);
  console.log("PASS Margaret word/number normalisation");
  for(const slug of ["being-left-handed-in-a-right-handed-world","pacific-navigation-and-voyaging"]){
   await open(slug,slug.startsWith("being")?13:14);
   console.log("PASS route "+slug);
  }
  await page.setViewportSize({width:390,height:830});
  await page.locator(".mis-topbar [data-five-submit]").click();
  await page.locator("#five-q-1 [data-five-proof]").click();
  assert.equal(await page.locator(".five-app").getAttribute("data-tab"),"reading");
  assert.ok(await page.locator('#mis-passage-pane mark.mis-evidence').count()>=1);
  console.log("PASS Mobile proof switches to reading tab");
  assert.deepEqual(errors,[],"Unexpected uncaught browser errors");
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
