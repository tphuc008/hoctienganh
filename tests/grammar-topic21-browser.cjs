const {chromium}=require("playwright");
const assert=require("node:assert/strict");
(async()=>{
 const browser=await chromium.launch({headless:true});
 const uid="00000000-0000-4000-8000-000000002121";
 const context=await browser.newContext({viewport:{width:1280,height:850}});
 const page=await context.newPage(),errors=[];
 let teacher=true;
 page.on("pageerror",err=>errors.push(err.message));
 try{
  await page.route("https://ouicitkpfukterkilqzu.supabase.co/**",async route=>{
   const url=route.request().url();
   if(url.includes("/rest/v1/lesson_teacher_roles")){
     return route.fulfill({status:200,contentType:"application/json",body:JSON.stringify(teacher?[{user_id:uid}]:[])});
   }
   return route.fulfill({status:200,contentType:"application/json",body:url.includes("/rest/v1/")?"[]":"{}"});
  });
  await page.addInitScript(userId=>{
   localStorage.setItem("hoctienganh_learner_auth_v1",JSON.stringify({
    access_token:"fake-topic21-jwt",refresh_token:"fake",expires_at_ms:Date.now()+3600000,
    user:{id:userId,user_metadata:{username:"teacherpilot",display_name:"Teacher Pilot"}}
   }));
  },uid);
  const base="http://127.0.0.1:4173/";
  await page.goto(base+"#teacher/grammar",{waitUntil:"domcontentloaded"});
  await page.locator(".g21-card").waitFor({timeout:20000});
  assert.match(await page.locator(".g21-card").innerText(),/CHUYÊN ĐỀ 21/);
  await page.locator('[data-g21="open"]').click();
  await page.locator(".g21-main").waitFor({timeout:20000});
  assert.match(await page.locator(".g21-main").innerText(),/Cơ chế đảo trợ động từ/);
  assert.equal(await page.locator(".g21-main .g21-question").count(),2);
  await page.locator('[data-g21="answer"][data-id="l1q1"][data-index="0"]').click();
  assert.match(await page.locator("#g21-l1q1 .g21-feedback").innerText(),/Cần kiểm tra lại/);
  await page.locator('[data-g21="answer"][data-id="l1q1"][data-index="1"]').click();
  assert.match(await page.locator("#g21-l1q1 .g21-feedback").innerText(),/Chính xác/);
  await page.locator('[data-g21="answer"][data-id="l1q2"][data-index="0"]').click();
  await page.reload({waitUntil:"domcontentloaded"});
  await page.locator(".g21-main").waitFor({timeout:20000});
  assert.match(await page.locator(".g21-progress-label").innerText(),/1\/7/);
  console.log("TOPIC 21 LEARN + RESUME: OK");
  await page.locator('[data-g21="tab"][data-tab="practice"]').click();
  assert.equal(await page.locator(".g21-main .g21-feedback").count(),0);
  await page.evaluate(()=>{
   const root=document.getElementById("pageMount");
   for(const q of window.GrammarTopic21Data.practice){
     const btn=root.querySelector('[data-g21="answer"][data-id="'+q.id+'"][data-index="'+q.correct+'"]');
     if(!btn)throw Error("Missing answer control "+q.id);
     btn.click();
   }
  });
  assert.equal(await page.locator(".g21-main .g21-feedback").count(),0);
  await page.locator('[data-g21="submit"][data-kind="practice"]').click();
  assert.equal(await page.locator(".g21-main .g21-feedback.good").count(),16);
  console.log("TOPIC 21 INDEPENDENT PRACTICE: OK");
  await page.locator('[data-g21="tab"][data-tab="mastery"]').click();
  await page.evaluate(()=>{
   for(const q of window.GrammarTopic21Data.mastery){
     document.querySelector('[data-g21="answer"][data-id="'+q.id+'"][data-index="'+q.correct+'"]').click();
   }
  });
  await page.locator('[data-g21="submit"][data-kind="mastery"]').click();
  assert.match(await page.locator(".g21-main").innerText(),/Đạt chuẩn thử nghiệm/);
  await page.locator('[data-g21="tab"][data-tab="review"]').click();
  assert.match(await page.locator(".g21-main").innerText(),/Review 1/);
  console.log("TOPIC 21 MASTERY + REVIEW: OK");
  await page.setViewportSize({width:390,height:844});
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+3),"Topic 21 must not overflow mobile viewport");
  teacher=false;
  await page.goto(base+"#teacher/grammar/topic-21",{waitUntil:"domcontentloaded"});
  await page.reload({waitUntil:"domcontentloaded"});
  await page.getByText("Không có quyền truy cập",{exact:true}).waitFor({timeout:20000});
  assert.equal(await page.locator(".g21-main").count(),0);
  assert.deepEqual(errors,[],"No uncaught page errors");
  console.log("TOPIC 21 TEACHER ROLE CHECK: OK");
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
