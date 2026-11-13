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
      access_token:"fake-unit8-full",refresh_token:"fake",expires_at_ms:Date.now()+3600000,
      user:{id:userId,user_metadata:{username:"unit8-audit",display_name:"Unit 8 Full Auditor"}}
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
  const specs=[
    {set:1,title:"Set 1 – Dễ",keys:["kept safe","save","got better","started","pass on","required","accepted","left unprotected","survive","serious",
       "coast","looks after","waste","examine","treat","recover","support","conserve","put up","make"]},
    {set:2,title:"Set 2 – Khó",keys:["distraught","cautious","downplaying","endanger","were overlooked","strictly regulated","squander","with substantial dissent","degrade","debilitating",
       "invasive","crowd out","unchecked","overexploitation","unanimously","deterrent","rangers","sanctuary","rehabilitate","fall through"]}
  ];
  try{
    await open("grade-12/unit-88",".exercise-card");
    assert.equal(await page.locator(".exercise-card").count(),2);
    assert.match(await page.locator("#pageMount").innerText(),/Wildlife Conservation/);
    for(const spec of specs){
      await open("grade-12/unit-88",".exercise-card");
      assert.match(await page.locator(".exercise-card").nth(spec.set-1).innerText(),new RegExp(spec.title));
      assert.match(await page.locator(".exercise-card").nth(spec.set-1).innerText(),/20 questions/);
      await open("grade-12/unit-88/vocabulary-practice-"+spec.set,".exercise-intro");
      assert.match(await page.locator(".exercise-intro").innerText(),new RegExp(spec.title));
      assert.match(await page.locator(".exercise-intro").innerText(),/20 questions/);
      await page.locator(".exercise-intro button.primary").click();
      await page.locator("#quizShell").waitFor({state:"visible",timeout:12000});
      for(let i=0;i<20;i++){
        const row=page.locator(".answers .answer");
        assert.equal(await row.count(),4,"Four answers in set "+spec.set+", question "+(i+1));
        if(i<10){
          assert.equal(await page.locator(".vocab-target").count(),1,"Original target underlined");
          const expectedType=i<5?"SYNONYM":"ANTONYM";
          assert.match(await page.locator(".question-mode").innerText(),new RegExp(expectedType));
        }else{
          await page.locator(".reading-pane").waitFor({state:"visible",timeout:12000});
          assert.equal(await page.locator(".reading-text").count(),1,"Shared cloze reading visible");
          const text=await page.locator(".reading-text").innerText();
          assert.equal((text.match(/\(\d+\) ______/g)||[]).length,10,
            "Full 10-gap passage must remain visible, set "+spec.set);
          assert.match(await page.locator(".reading-focus").innerText(),new RegExp("\\("+(i+1)+"\\) ______"));
        }
        const answer=row.filter({hasText:spec.keys[i]});
        assert.equal(await answer.count(),1,"Cannot uniquely locate correct answer "+spec.keys[i]);
        await answer.click();
        const feedback=page.locator("[data-explanation-v1='1']");
        await feedback.waitFor({state:"visible",timeout:12000});
        assert.equal(await feedback.getAttribute("data-review-status"),"ready",
          "Explanation completeness set "+spec.set+" Q"+(i+1));
        if(i===0||i===9||i===10||i===19){
          await feedback.locator("summary").click();
          assert.equal(await feedback.locator(".ev1-choice").count(),4,"A-D analyses");
          assert.equal(await feedback.locator(".ev1-example").count(),4,"Four bilingual usage examples");
          assert.equal(await feedback.locator(".example-vi").count(),4,"Four Vietnamese translations");
        }
        if(i<19)await page.locator("#nextBtn").click();
      }
      await page.locator("#finishBtn").click();
      await page.locator("#resultScreen").waitFor({state:"visible",timeout:16000});
      assert.equal(await page.locator("#scoreBig").innerText(),"100%");
      assert.equal(await page.locator("#reviewList .review-item").count(),20);
      console.log("PASS full Unit 8 "+spec.title+": 20/20 questions, reading, scoring, bilingual deep feedback");
    }
    assert.deepEqual(errors,[],"Uncaught JavaScript errors");
    assert.deepEqual(missing,[],"Missing same-origin assets");
    console.log("ALL GRADE 12 UNIT 8 FULL-RELEASE BROWSER CHECKS PASSED");
  }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
