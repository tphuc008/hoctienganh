const {chromium}=require("playwright");
const assert=require("node:assert/strict");

(async()=>{
  const browser=await chromium.launch({headless:true});
  const context=await browser.newContext({viewport:{width:1280,height:900}});
  const page=await context.newPage();
  const errors=[],missing=[];
  page.on("pageerror",e=>errors.push(e.message));
  page.on("response",r=>{
    if(r.url().startsWith("http://127.0.0.1:4173/")&&r.status()>=400)missing.push(r.status()+" "+r.url());
  });
  let unlocked=false;
  // Synthetic CI-only answer data; never import the actual private answer key.
  const synthetic=Array.from({length:40},(_,i)=>({
    questionId:"u7-v10-"+String(i+1).padStart(2,"0"),
    correctIndex:(i+1)%4,
    correctMeaning:"Mocked meaning, not a real answer.",
    why:"Mocked reason for browser test.",
    choices:["alpha","beta","gamma","delta"].map(w=>({
      label:w,explanation:"Mocked comparison "+w,example:"Example sentence for "+w+"."
    }))
  }));
  await page.route("https://ouicitkpfukterkilqzu.supabase.co/**",route=>{
    const url=route.request().url();
    const result=url.includes("/rest/v1/lesson_teacher_roles")?[]
      :url.includes("/rest/v1/lesson_unlocks")?[{unlocked}]
      :url.includes("/rest/v1/lesson_solutions")?(unlocked?[{payload:synthetic}]:[])
      :url.includes("/rest/v1/")?[]:{};
    return route.fulfill({status:200,contentType:"application/json",body:JSON.stringify(result),
      headers:{"access-control-allow-origin":"*"}});
  });
  await page.addInitScript(()=>{
    const id="00000000-0000-4000-8000-000000000042",token="mock-tutoring";
    localStorage.setItem("hoctienganh_learner_auth_v1",JSON.stringify({
      access_token:"fake-browser-only",refresh_token:"fake",
      expires_at_ms:Date.now()+3600000,
      user:{id,user_metadata:{username:"audit",display_name:"Test Student"}}
    }));
    localStorage.setItem("hoctienganh_access_tutoring",JSON.stringify({
      token,area:"tutoring",expiresAt:new Date(Date.now()+3600000).toISOString()
    }));
    sessionStorage.setItem("hoctienganh_valid_tutoring",JSON.stringify({token,until:Date.now()+3600000}));
    localStorage.setItem("hoctienganh_active_area","tutoring");
  });
  const base="http://127.0.0.1:4173/#grade-12/lesson-plans/unit-7";
  async function open(suffix,selector,accessLabel){
    await page.goto(base+suffix,{waitUntil:"domcontentloaded",timeout:22000});
    await page.locator(selector).first().waitFor({state:"visible",timeout:18000});
    if(accessLabel)await page.waitForFunction(
      label=>document.querySelector(".lp-inline-access strong")?.textContent?.includes(label),
      accessLabel,{timeout:12000});
  }
  try{
    await open("",".lp-inline-question","Lời giải hiện đang khóa");
    assert.equal(await page.locator(".lp-inline-question").count(),40);
    await page.locator('#lp-question-1 [data-lp-original-answer][value="0"]').check();
    assert.equal(await page.locator('#lp-question-1 [data-lp-original-check]').isDisabled(),true);
    assert.equal(await page.locator("#lp-question-1 .semantic-feedback").count(),0);
    unlocked=true;
    await page.reload({waitUntil:"domcontentloaded",timeout:22000});
    await page.locator(".lp-inline-question").first().waitFor({state:"visible",timeout:14000});
    await page.waitForFunction(()=>document.querySelector(".lp-inline-access strong")?.textContent?.includes("Lời giải đã sẵn sàng"),null,{timeout:14000}).catch(async e=>{
      throw new Error("Unlock state did not update: "+await page.locator(".lp-inline-access").innerText()+"; "+e.message);
    });
    assert.equal(await page.locator("#lp-question-1 .lp-inline-answer").count(),0);
    await page.locator('#lp-question-1 [data-lp-original-answer][value="0"]').check();
    await page.locator('#lp-question-1 [data-lp-original-check]').click();
    await page.locator("#lp-question-1 .lp-inline-result.is-incorrect").waitFor();
    assert.equal(await page.locator("#lp-question-1 .semantic-step").count(),3);
    assert.equal(await page.locator("#lp-question-1 .semantic-option").count(),4);
    assert.equal(await page.locator("#lp-question-1 .semantic-example").count(),4);
    await page.locator('#lp-question-1 [data-lp-original-reset]').click();
    await page.locator('#lp-question-1 [data-lp-original-answer][value="1"]').check();
    await page.locator('#lp-question-1 [data-lp-original-check]').click();
    await page.locator("#lp-question-1 .lp-inline-result.is-correct").waitFor();
    const hero=await page.locator(".lp-preview-hero").evaluate(el=>getComputedStyle(el).backgroundImage);
    assert.match(hero,/239, 246, 255|248, 251, 255/,"Blue background expected");
    await open("/print","#lp-section-print");
    await page.locator('[data-lp-print-now]:not([disabled])').waitFor({timeout:14000});
    assert.equal(await page.locator('[data-lp-print-part]').count(),3);
    assert.equal(await page.locator('[data-lp-print-mode]').count(),2);
    await page.locator('[data-lp-print-part="context"]').uncheck();
    await page.locator('[data-lp-print-part="opposite"]').uncheck();
    assert.match(await page.locator(".lp-print-count").innerText(),/6 \/ 40 câu/);
    await page.locator(".lp-print-preview > summary").click();
    assert.equal(await page.locator(".lp-print-sheet .lp-quiz-question").count(),6);
    assert.equal(await page.locator(".lp-print-key-grid span").count(),6);
    assert.equal(await page.locator(".lp-print-answer-key").count(),1);
    assert.equal(await page.locator(".lp-semantic-print").count(),0);
    const keyLast=await page.locator(".lp-print-sheet").evaluate(el=>{
      const k=el.querySelector(".lp-print-answer-key"),q=el.querySelectorAll(".lp-quiz-question");
      return Boolean(k&&q.length&&(q[q.length-1].compareDocumentPosition(k)&Node.DOCUMENT_POSITION_FOLLOWING));
    });
    assert.ok(keyLast,"The short-answer key must come after all questions");
    await page.evaluate(()=>{window.__prints=0;window.print=()=>{window.__prints++}});
    await page.locator('[data-lp-print-now]').click();
    assert.equal(await page.evaluate(()=>window.__prints),1,"The print button must actually invoke print");
    await page.emulateMedia({media:"print"});
    const pdfKey=await page.pdf({format:"A4",printBackground:true});
    assert.ok(pdfKey.length>8000,"Short answer output must produce a non-empty PDF");
    await page.emulateMedia({media:"screen"});
    await page.evaluate(()=>window.dispatchEvent(new Event("afterprint")));
    await page.locator('[data-lp-print-mode="detailed"]').click();
    await page.locator(".lp-print-preview > summary").click();
    assert.equal(await page.locator(".lp-print-answer-key").count(),0);
    assert.equal(await page.locator(".lp-semantic-print").count(),6);
    assert.equal(await page.locator(".lp-semantic-print .semantic-step").count(),18);
    await page.locator('[data-lp-print-now]').click();
    await page.emulateMedia({media:"print"});
    const pdfDetailed=await page.pdf({format:"A4",printBackground:true});
    assert.ok(pdfDetailed.length>12000,"Detailed explanations must print into a non-empty PDF");
    await page.emulateMedia({media:"screen"});
    await page.evaluate(()=>window.dispatchEvent(new Event("afterprint")));
    await page.locator('[data-lp-print-part="closest"]').uncheck();
    assert.equal(await page.locator('[data-lp-print-now]').isDisabled(),true);
    assert.deepEqual(errors,[],"Browser JS errors");
    assert.deepEqual(missing,[],"Missing website assets");
    console.log("LESSON CHECK, INLINE FEEDBACK, TWO PRINT MODES, PART SELECTION, A4 PDF: PASS");
  }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
