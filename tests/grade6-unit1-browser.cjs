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
   await page.locator("#g6-q-pronunciation-1 [data-g6-mcq-explanation]").waitFor();
   assert.equal(await page.locator("#g6-q-pronunciation-1 .g6-example-row").count(),4);
   console.log("GRADE6 original: checked answer and four short examples");
   await open("grade-6/unit-1/practice",".g6-set-grid");
   assert.equal(await page.locator(".g6-set").count(),3);
   assert.equal(await page.locator(".g6-item").count(),10);
   await page.locator("#g6-q-extra-1 .g6-option").first().click();
   await page.locator("#g6-q-extra-1 [data-g6-check]").click();
   await page.locator("#g6-q-extra-1 [data-g6-mcq-explanation]").waitFor();
   await page.locator('[data-g6-set="2"]').click();
   assert.equal(await page.locator(".g6-item").count(),10);
   assert.equal(await page.locator("#g6-q-extra-1").count(),0);
   await page.locator('[data-g6-set="3"]').click();
   assert.equal(await page.locator(".g6-item").count(),10);
   assert.equal(await page.locator("#g6-q-extra-21").count(),1);
   await page.locator('[data-g6-set="1"]').click();
   assert.equal(await page.locator("#g6-q-extra-1 [data-g6-mcq-explanation]").count(),1);
   await page.reload({waitUntil:"domcontentloaded"});
   await page.locator("#g6-q-extra-1 [data-g6-mcq-explanation]").waitFor({timeout:16000});
   console.log("GRADE6 practice: 3 sets with saved progress after reload");
   // Unit 2 mirrors Unit 1 but uses its own data attributes and learner draft.
   await open("grade-6/unit-2",".g6-u2-root .g6-word");
   assert.equal(await page.locator(".g6-u2-root .g6-word").count(),35);
   await open("grade-6/unit-2/original",".g6-u2-root .g6-group");
   await page.locator('[data-g6-u2-group="vocabulary"]').click();
   await page.locator("#g6-q-vocabulary-1 .g6-option").nth(1).click();
   await page.locator("#g6-q-vocabulary-1 [data-g6-u2-check]").click();
   await page.locator("#g6-q-vocabulary-1 [data-unit-mcq-explanation]").waitFor();
   assert.equal(await page.locator("#g6-q-vocabulary-1 .g6-example-row").count(),4);
   assert.match(await page.locator("#g6-q-vocabulary-1 .g6-example-set").innerText(),/Nghĩa thường gặp/);
   await open("grade-6/unit-2/practice",".g6-u2-root .g6-set-grid");
   assert.equal(await page.locator(".g6-u2-root .g6-set").count(),3);
   assert.equal(await page.locator(".g6-u2-root .g6-item").count(),10);
   // Unit 3 has independent content and verified Reading evidence.
   await open("grade-6/unit-3",".g6-u3-root .g6-word");
   assert.equal(await page.locator(".g6-u3-root .g6-word").count(),44);
   await open("grade-6/unit-3/original",".g6-u3-root .g6-group");
   await page.locator('[data-g6-u3-group="reading-comprehension"]').click();
   await page.locator("#g6-q-reading-comprehension-1 .g6-option").nth(1).click();
   await page.locator("#g6-q-reading-comprehension-1 [data-g6-u3-check]").click();
   await page.locator("#g6-q-reading-comprehension-1 [data-unit-reading-explanation]").waitFor();
   assert.match(await page.locator("#g6-q-reading-comprehension-1 [data-unit-reading-explanation]").innerText(),/Vị trí trong bài/);
   await open("grade-6/unit-3/practice",".g6-u3-root .g6-set-grid");
   assert.equal(await page.locator(".g6-u3-root .g6-item").count(),10);
   await open("grade-6/unit-2/original",".g6-u2-root .g6-group");
   await page.locator('[data-g6-u2-group="vocabulary"]').click();
   assert.equal(await page.locator("#g6-q-vocabulary-1 [data-unit-mcq-explanation]").count(),1);
   console.log("GRADE6 Unit 2 / 3: knowledge, A–D examples, Reading evidence and independent drafts");
   assert.deepEqual(errors,[],"JavaScript runtime errors");
   assert.deepEqual(missing,[],"Missing static assets");
   console.log("ALL GRADE 6 BROWSER CHECKS PASSED");
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
