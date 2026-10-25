const {chromium}=require("playwright");
const assert=require("node:assert/strict");
(async()=>{
 const browser=await chromium.launch({headless:true});
 const context=await browser.newContext({viewport:{width:1200,height:850}});
 const page=await context.newPage(),errors=[],missing=[];
 page.on("pageerror",e=>errors.push(e.message));
 page.on("response",res=>{if(res.url().startsWith("http://127.0.0.1:4173/")&&res.status()>=400)missing.push(res.status()+" "+res.url());});
 await page.route("https://ouicitkpfukterkilqzu.supabase.co/**",route=>
   route.fulfill({status:200,contentType:"application/json",
    body:route.request().url().includes("/rest/v1/")?"[]":"{}",
    headers:{"access-control-allow-origin":"*"}}));
 await page.addInitScript(()=>{
   const id="00000000-0000-4000-8000-000000000091";
   localStorage.setItem("hoctienganh_learner_auth_v1",JSON.stringify({
     access_token:"fake-grade6-browser",refresh_token:"fake",
     expires_at_ms:Date.now()+3600000,
     user:{id,user_metadata:{username:"grade6-audit",display_name:"Grade 6 Browser Check"}}
   }));
   const token="mock-tutoring";
   localStorage.setItem("hoctienganh_access_tutoring",JSON.stringify({
     token,area:"tutoring",expiresAt:new Date(Date.now()+3600000).toISOString()
   }));
   sessionStorage.setItem("hoctienganh_valid_tutoring",JSON.stringify({token,until:Date.now()+3600000}));
   localStorage.setItem("hoctienganh_active_area","tutoring");
 });
 const base="http://127.0.0.1:4173/";
 async function open(route,selector){
   await page.goto(base+"#"+route,{waitUntil:"domcontentloaded"});
   await page.locator(selector).first().waitFor({state:"visible",timeout:16000});
 }
 try{
   await open("grade-6/unit-1",".g6-word");
   assert.equal(await page.locator(".g6-word").count(),34);
   assert.equal(await page.locator(".g6-word-examples p").count(),68);
   assert.equal(await page.locator(".g6-grammar-examples>div").count(),6);
   console.log("GRADE6 knowledge: 34 words, 68 contextual examples, six grammar examples");
   await open("grade-6/unit-1/original","#g6-q-pronunciation-1");
   assert.equal(await page.locator(".g6-item").count(),5);
   await page.locator("#g6-q-pronunciation-1 .g6-option").nth(3).click();
   await page.locator("#g6-q-pronunciation-1 [data-g6-check]").click();
   await page.locator("#g6-q-pronunciation-1 [data-explanation-v1]").waitFor();
   const explanation=await page.locator("#g6-q-pronunciation-1 [data-explanation-v1]").getAttribute("data-review-status");
   assert.equal(explanation,"ready");
   assert.equal(await page.locator("#g6-q-pronunciation-1 .ev1-details").count(),1);
   console.log("GRADE6 original: checked answer and standard expandable explanation");
   await open("grade-6/unit-1/practice",".g6-set-grid");
   assert.equal(await page.locator(".g6-set").count(),3);
   assert.equal(await page.locator(".g6-item").count(),10);
   await page.locator("#g6-q-extra-1 .g6-option").first().click();
   await page.locator("#g6-q-extra-1 [data-g6-check]").click();
   await page.locator("#g6-q-extra-1 [data-explanation-v1]").waitFor();
   await page.locator('[data-g6-set="2"]').click();
   assert.equal(await page.locator(".g6-item").count(),10);
   assert.equal(await page.locator("#g6-q-extra-1").count(),0);
   await page.locator('[data-g6-set="3"]').click();
   assert.equal(await page.locator(".g6-item").count(),10);
   assert.equal(await page.locator("#g6-q-extra-21").count(),1);
   await page.locator('[data-g6-set="1"]').click();
   assert.equal(await page.locator("#g6-q-extra-1 [data-explanation-v1]").count(),1);
   await page.reload({waitUntil:"domcontentloaded"});
   await page.locator("#g6-q-extra-1 [data-explanation-v1]").waitFor({timeout:16000});
   console.log("GRADE6 practice: 3 distinct 10-question sets and saved progress after reload");
   assert.deepEqual(errors,[],"JavaScript runtime errors");
   assert.deepEqual(missing,[],"Missing static assets");
   console.log("ALL GRADE 6 BROWSER CHECKS PASSED");
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
