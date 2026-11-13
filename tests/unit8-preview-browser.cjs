const {chromium}=require("playwright");
const assert=require("node:assert/strict");
(async()=>{
  const browser=await chromium.launch({headless:true});
  const ctx=await browser.newContext({viewport:{width:1280,height:840}});
  const page=await ctx.newPage(),errors=[],missing=[];
  page.on("pageerror",e=>errors.push(e.message));
  page.on("response",r=>{
    if(r.url().startsWith("http://127.0.0.1:4173/")&&r.status()>=400)
      missing.push(r.status()+" "+r.url());
  });
  await page.route("https://ouicitkpfukterkilqzu.supabase.co/**",route=>route.fulfill({
    status:200,contentType:"application/json",
    body:route.request().url().includes("/rest/v1/")?"[]":"{}",
    headers:{"access-control-allow-origin":"*"}
  }));
  await page.addInitScript(()=>{
    const userId="00000000-0000-4000-8000-000000000088";
    localStorage.setItem("hoctienganh_learner_auth_v1",JSON.stringify({
      access_token:"fake-unit8-preview",refresh_token:"fake",
      expires_at_ms:Date.now()+3600000,
      user:{id:userId,user_metadata:{username:"unit8-audit",display_name:"Unit 8 Preview Auditor"}}
    }));
    const token="mock-tutoring";
    localStorage.setItem("hoctienganh_access_tutoring",JSON.stringify({
      token,area:"tutoring",expiresAt:new Date(Date.now()+3600000).toISOString()
    }));
    sessionStorage.setItem("hoctienganh_valid_tutoring",JSON.stringify({token,until:Date.now()+3600000}));
    localStorage.setItem("hoctienganh_active_area","tutoring");
  });
  const base="http://127.0.0.1:4173/";
  const open=async(route,selector)=>{
    await page.goto(base+"#"+route,{waitUntil:"domcontentloaded",timeout:22000});
    await page.locator(selector).first().waitFor({state:"visible",timeout:16000});
    assert.equal(new URL(page.url()).hash.slice(1),route);
  };
  try{
    await open("grade-12/unit-88",".exercise-card");
    assert.equal(await page.locator(".exercise-card").count(),2);
    assert.match(await page.locator("#pageMount").innerText(),/Wildlife Conservation/);
    for(const [setNo,title,answer,clozeAnswer] of [
      [1,"Set 1 – Dễ","kept safe","coast"],
      [2,"Set 2 – Khó","distraught","invasive"]
    ]){
      await open("grade-12/unit-88",".exercise-card");
      assert.match(await page.locator(".exercise-card").nth(setNo-1).innerText(),new RegExp(title));
      await open("grade-12/unit-88/vocabulary-practice-"+setNo,".exercise-intro");
      assert.match(await page.locator(".exercise-intro").innerText(),new RegExp(title));
      assert.match(await page.locator(".exercise-intro").innerText(),/2 questions/);
      await page.locator(".exercise-intro button.primary").click();
      await page.locator("#quizShell").waitFor({state:"visible",timeout:12000});
      assert.equal(await page.locator(".vocab-target").count(),1);
      assert.equal(await page.locator(".answers .answer").count(),4);
      await page.locator(".answers .answer").filter({hasText:answer}).click();
      await page.locator("[data-explanation-v1='1']").waitFor({timeout:10000});
      const panel=page.locator("[data-explanation-v1='1']");
      assert.equal(await panel.getAttribute("data-review-status"),"ready");
      await panel.locator("summary").click();
      assert.equal(await panel.locator(".ev1-choice").count(),4);
      assert.equal(await panel.locator(".ev1-example").count(),4);
      await page.locator("#nextBtn").click();
      await page.locator(".reading-pane").waitFor({timeout:10000});
      assert.match(await page.locator(".reading-pane").innerText(),/\(11\) ______/);
      assert.equal(await page.locator(".reading-pane .reading-text").count(),1);
      assert.equal(await page.locator(".answers .answer").count(),4);
      await page.locator(".answers .answer").filter({hasText:clozeAnswer}).click();
      const clozePanel=page.locator("[data-explanation-v1='1']");
      await clozePanel.waitFor({timeout:10000});
      assert.equal(await clozePanel.getAttribute("data-review-status"),"ready");
      await clozePanel.locator("summary").click();
      assert.equal(await clozePanel.locator(".ev1-example").count(),4);
      console.log("PASS Unit 8 "+title+" — synonym, cloze, A-D and deep feedback");
    }
    assert.deepEqual(errors,[],"Uncaught JavaScript errors");
    assert.deepEqual(missing,[],"Missing same-origin assets");
    console.log("ALL GRADE 12 UNIT 8 PREVIEW BROWSER CHECKS PASSED");
  }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
