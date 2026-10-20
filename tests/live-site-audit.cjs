const {chromium}=require("playwright");
const assert=require("node:assert/strict");
const BASE="https://tphuc008.github.io/hoctienganh/";
const ORIGIN=new URL(BASE).origin;
const SUBA="https://ouicitkpfukterkilqzu.supabase.co/";
const errors=[],checks=[],assetErrors=[],mockWrites=[];
const uuid="00000000-0000-4000-8000-000000000042";
const delay=ms=>new Promise(r=>setTimeout(r,ms));
async function check(name,fn){
  try{await fn();checks.push({name,pass:true});console.log("PASS | "+name)}
  catch(err){checks.push({name,pass:false,detail:String(err.message||err)});console.error("FAIL | "+name+" | "+String(err.message||err).slice(0,650))}
}
async function main(){
 const browser=await chromium.launch({headless:true});
 try{
  const guest=await browser.newPage({viewport:{width:1365,height:850}});
  guest.on("pageerror",err=>errors.push("GUEST "+err.message));
  guest.on("response",r=>{const u=new URL(r.url());if(u.origin===ORIGIN&&u.pathname.startsWith("/hoctienganh/")&&r.status()>=400)assetErrors.push(r.status()+" "+r.url())});
  await check("Real deployed URL and login page",async()=>{
    const response=await guest.goto(BASE,{waitUntil:"domcontentloaded",timeout:45000});
    assert.equal(response.status(),200);
    await guest.locator("#loginUsername").waitFor({timeout:15000});
    assert.match((await guest.locator("#pageMount").innerText()),/Đăng nhập/);
  });
  await check("Public signup form",async()=>{
    await guest.getByText("Tạo tài khoản",{exact:true}).first().click();
    await guest.locator("#signupDisplayName").waitFor({timeout:10000});
  });
  await guest.close();

  const ctx=await browser.newContext({viewport:{width:1365,height:850}});
  await ctx.route(SUBA+"**",route=>{
    const url=route.request().url();
    if(route.request().method()==="POST"&&url.includes("/rest/v1/practice_submissions")){
      mockWrites.push(JSON.parse(route.request().postData()||"{}"));
    }
    const payload=url.includes("/rest/v1/")?"[]":JSON.stringify({ok:true});
    return route.fulfill({status:200,contentType:"application/json",body:payload,
      headers:{"access-control-allow-origin":"*","access-control-allow-headers":"*"}});
  });
  // Video playback is intentionally not checked here. Do not depend on YouTube availability.
  await ctx.route("https://www.youtube.com/**",route=>route.abort());
  await ctx.addInitScript(id=>{
    if(!localStorage.getItem("hoctienganh_learner_auth_v1")){
      localStorage.setItem("hoctienganh_learner_auth_v1",JSON.stringify({
        access_token:"fake-browser-audit",refresh_token:"fake",expires_at_ms:Date.now()+3600000,
        user:{id,user_metadata:{username:"audit",display_name:"Browser Audit"}}
      }));
    }
    for(const area of ["school","tutoring"]){
      const token="mock-"+area;
      localStorage.setItem("hoctienganh_access_"+area,JSON.stringify({
        token,area,expiresAt:new Date(Date.now()+3600000).toISOString()
      }));
      sessionStorage.setItem("hoctienganh_valid_"+area,JSON.stringify({
        token,until:Date.now()+3600000
      }));
    }
  },uuid);
  const page=await ctx.newPage();
  page.on("pageerror",err=>errors.push("STUDENT "+err.message));
  page.on("response",r=>{const u=new URL(r.url());if(u.origin===ORIGIN&&u.pathname.startsWith("/hoctienganh/")&&r.status()>=400)assetErrors.push(r.status()+" "+r.url())});
  await check("Synthetic learner initialized without real Supabase writes",async()=>{
    await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:45000});
    await page.locator("#pageMount .hero").waitFor({timeout:16000});
    const result=await page.evaluate(()=>({id:LearningCore.userId(),lessons:LearningCore.list().length}));
    assert.equal(result.id,uuid);
    assert.ok(result.lessons>=20);
  });
  async function open(route,selector,area){
    const kind=area||(route.startsWith("school/")?"school":"tutoring");
    await page.evaluate(area=>localStorage.setItem("hoctienganh_active_area",area),kind);
    await page.goto(BASE+"#"+route,{waitUntil:"domcontentloaded",timeout:45000});
    await page.locator(selector).first().waitFor({timeout:9000,state:"visible"});
    assert.ok((await page.locator("#pageMount").innerText()).trim().length>30,"Empty page");
    assert.equal(new URL(page.url()).hash.slice(1),route,"Route redirected");
  }
  const routes=[
    ["grade-9",".units"],["grade-9/unit-1",".exercise-grid"],["grade-9/unit-2",".exercise-grid"],
    ["grade-9/unit-3",".exercise-grid"],["grade-9/unit-4",".exercise-grid"],["grade-9/unit-5",".exercise-grid"],
    ["grade-10",".units"],["grade-10/unit-3",".exercise-grid"],
    ["grade-12",".units"],
    ...Array.from({length:8},(_,i)=>["grade-12/unit-"+(i+1),".exercise-grid"]),
    ["grammar",".units"],
    ["grade-12/reading",".exercise-grid"],
    ["grade-12/reading/marketing-and-the-information-age",".exercise-intro"],
    ["grade-12/reading/robots-and-us",".exercise-intro"],
    ["listening",".units"],["listening/news",".entertainment-video-grid"],
    ["listening/entertainment",".entertainment-video-grid"],
    ["listening/news/former-openai-employee-ai-might-really-kill-us-all","#newsListeningQuestionPanel"],
    ["listening/entertainment/change-your-life-one-tiny-step-at-a-time","#listeningQuestionPanel"],
    ["school/grade-10",".exercise-grid"],["school/grade-10/midterm-1",".exercise-grid"],
    ...Array.from({length:7},(_,i)=>["school/grade-10/midterm-1/set-"+(i+1),".exercise-intro"]),
    ["grade-10/mid-term-test",".mt-quiz-grid"],
    ...[3,4,5,6].map(n=>["grade-10/mid-term-test/test-"+n,".mt-question"]),
    ["history","#learningHistoryList"]
  ];
  for(const [route,sel] of routes)
    await check("Live route "+route,async()=>await open(route,sel));
  // Verify the actual local drafts and their restoration, not just page existence.
  await check("Live School attempt survives reload",async()=>{
    await open("school/grade-10/midterm-1/set-1",".exercise-intro");
    await page.locator(".exercise-intro button.primary").click();
    await page.locator("[data-school-quiz='1']").waitFor({timeout:8000});
    const before=await page.evaluate(()=>LearningCore.readDraft("school","grade-10/midterm-1/set-1"));
    assert.ok(before&&before.startedAt);
    await page.reload({waitUntil:"domcontentloaded"});
    await page.locator(".exercise-intro button.primary").click();
    await page.locator("[data-school-quiz='1']").waitFor({timeout:8000});
    const after=await page.evaluate(()=>LearningCore.readDraft("school","grade-10/midterm-1/set-1"));
    assert.equal(after.startedAt,before.startedAt);
  });
  await check("Live Grade 10 mid-term answer survives reload",async()=>{
    await open("grade-10/mid-term-test/test-3",".mt-question");
    await page.locator(".mt-option").first().click();
    const before=await page.evaluate(()=>LearningCore.readDraft("exam","grade-10/mid-term-test/test-3"));
    assert.ok(Object.keys(before?.answers||{}).length>0);
    await page.reload({waitUntil:"domcontentloaded"});
    await page.locator(".mt-option").first().waitFor({timeout:9000});
    const after=await page.evaluate(()=>LearningCore.readDraft("exam","grade-10/mid-term-test/test-3"));
    assert.deepEqual(after.answers,before.answers);
  });
  await check("Live Vocabulary attempt survives reload",async()=>{
    await open("grade-12/unit-1/vocabulary-practice-1",".exercise-intro");
    await page.locator(".exercise-intro button.primary").click();
    await page.locator("#quizShell").waitFor({state:"visible",timeout:8000});
    const before=await page.evaluate(()=>LearningCore.readDraft("quiz","grade-12/unit-1/set-1"));
    assert.ok(before?.startedAt,"Missing initial draft");
    await page.reload({waitUntil:"domcontentloaded"});
    await page.locator(".exercise-intro button.primary").click();
    await page.locator("#quizShell").waitFor({state:"visible",timeout:8000});
    const after=await page.evaluate(()=>LearningCore.readDraft("quiz","grade-12/unit-1/set-1"));
    assert.equal(after.startedAt,before.startedAt);
  });
  for(const [kind,route,partPrefix,panel] of [
    ["Entertainment","listening/entertainment/change-your-life-one-tiny-step-at-a-time","entertainment/","#listeningQuestionPanel"],
    ["News","listening/news/former-openai-employee-ai-might-really-kill-us-all","news/","#newsListeningQuestionPanel"]
  ]){
    await check("Live "+kind+" listening response survives reload",async()=>{
      await open(route,panel);
      const input=page.locator(panel+" .listening-part.active input:not([disabled])").first();
      await input.waitFor({timeout:8000});
      const type=await input.getAttribute("type");
      if(type==="radio")await input.check();else await input.fill("test answer");
      const old=await page.evaluate(prefix=>{
        const keys=Object.keys(localStorage).filter(k=>k.includes("hoctienganh:attempt:v1")&&k.includes("listening"));
        const item=keys.find(k=>k.includes(encodeURIComponent(prefix)));
        return item?localStorage.getItem(item):null;
      },partPrefix);
      assert.ok(old,"No listening draft saved");
      await page.reload({waitUntil:"domcontentloaded"});
      await page.locator(panel).waitFor({timeout:9000});
      const inputAgain=page.locator(panel+" .listening-part.active input:not([disabled])").first();
      const changed=type==="radio"?await inputAgain.isChecked():await inputAgain.inputValue()==="test answer";
      assert.ok(changed,"Response was not restored");
    });
  }
  for(const [label,route,button,prefix] of [
    ["Entertainment","listening/entertainment/change-your-life-one-tiny-step-at-a-time","#submitListeningBtn1","entertainment/"],
    ["News","listening/news/former-openai-employee-ai-might-really-kill-us-all","#newsSubmit1","news/"]
  ]){
    await check("Live "+label+" score upload and no duplication after reload (Supabase mocked)",async()=>{
      await open(route,".listening-part.active");
      const previous=mockWrites.length;
      await page.locator(button).click();
      await page.waitForFunction(p=>{
        const key=Object.keys(localStorage).find(k=>k.includes(":listening:")&&k.includes(encodeURIComponent(p)));
        if(!key)return false;
        try{return !!JSON.parse(localStorage.getItem(key)).data[1].remoteSaved}catch(e){return false}
      },prefix,{timeout:12000});
      const sent=mockWrites.slice(previous);
      assert.equal(sent.length,1,"Unexpected number of submissions");
      assert.equal(sent[0].category,"listening");
      assert.equal(sent[0].user_id,uuid);
      assert.ok(sent[0].total_questions>0);
      await page.reload({waitUntil:"domcontentloaded"});
      await page.locator(button).waitFor({timeout:9000});
      assert.equal(await page.locator(button).isDisabled(),true,"Submitted answers not locked");
      await delay(250);
      assert.equal(mockWrites.length,previous+1,"Reload caused duplicate score upload");
    });
  }
  await check("No missing same-origin scripts or CSS",async()=>{
    assert.deepEqual([...new Set(assetErrors)],[]);
  });
  await check("No uncaught JavaScript errors during tested journeys",async()=>{
    assert.deepEqual(errors,[]);
  });
  const mobile=await browser.newContext({viewport:{width:390,height:844},isMobile:true,deviceScaleFactor:2});
  await mobile.route(SUBA+"**",route=>route.fulfill({status:200,contentType:"application/json",body:"[]",headers:{"access-control-allow-origin":"*"}}));
  await mobile.addInitScript(id=>{
    localStorage.setItem("hoctienganh_learner_auth_v1",JSON.stringify({access_token:"fake-mobile",expires_at_ms:Date.now()+3600000,user:{id,user_metadata:{display_name:"Audit",username:"audit"}}}));
    localStorage.setItem("hoctienganh_active_area","tutoring");
    const token="mobile-tutoring";
    localStorage.setItem("hoctienganh_access_tutoring",JSON.stringify({token,area:"tutoring",expiresAt:new Date(Date.now()+3600000).toISOString()}));
    sessionStorage.setItem("hoctienganh_valid_tutoring",JSON.stringify({token,until:Date.now()+3600000}));
  },uuid);
  const p=await mobile.newPage();
  await check("Mobile rendering and viewport overflow",async()=>{
    await p.goto(BASE+"#grade-12/unit-1",{waitUntil:"domcontentloaded",timeout:45000});
    await p.locator(".exercise-grid").waitFor({timeout:12000});
    const measured=await p.evaluate(()=>({scroll:document.documentElement.scrollWidth,screen:window.innerWidth}));
    assert.ok(measured.scroll<=measured.screen+5,JSON.stringify(measured));
  });
  await mobile.close();await ctx.close();
 }finally{await browser.close()}
 console.log("RESULTS "+JSON.stringify({passed:checks.filter(x=>x.pass).length,failed:checks.filter(x=>!x.pass).length,failures:checks.filter(x=>!x.pass),assetErrors,uncaught:errors}));
 if(checks.some(x=>!x.pass))process.exitCode=1;
}
main().catch(e=>{console.error("AUDIT FATAL",e);process.exitCode=1});