const {chromium}=require("playwright");
const assert=require("node:assert/strict");
const {spawnSync}=require("node:child_process");
function pdfText(buf){
 const r=spawnSync("pdftotext",["-","-"],{input:buf,encoding:"utf8",maxBuffer:10*1024*1024});
 assert.equal(r.status,0,r.stderr||"PDF text extraction failed");return r.stdout;
}
(async()=>{
 const browser=await chromium.launch({headless:true});
 const page=await browser.newPage({viewport:{width:1250,height:900}});
 const errors=[];
 page.on("pageerror",e=>errors.push(e.message));
 await page.route("https://ouicitkpfukterkilqzu.supabase.co/**",route=>route.fulfill({
  status:200,contentType:"application/json",
  headers:{"access-control-allow-origin":"*"},
  body:route.request().url().includes("/rest/v1/")?"[]":"{}"
 }));
 await page.addInitScript(()=>{
  const token="mock-tutoring",now=Date.now();
  localStorage.setItem("hoctienganh_learner_auth_v1",JSON.stringify({
   access_token:"mock",refresh_token:"mock",expires_at_ms:now+3600000,
   user:{id:"00000000-0000-4000-8000-000000000042",user_metadata:{username:"audit",display_name:"Print Auditor"}}
  }));
  localStorage.setItem("hoctienganh_access_tutoring",JSON.stringify({
   token,area:"tutoring",expiresAt:new Date(now+3600000).toISOString()
  }));
  sessionStorage.setItem("hoctienganh_valid_tutoring",JSON.stringify({token,until:now+3600000}));
  localStorage.setItem("hoctienganh_access_school",JSON.stringify({
    token:"mock-school",area:"school",expiresAt:new Date(now+3600000).toISOString()
  }));
  sessionStorage.setItem("hoctienganh_valid_school",JSON.stringify({
    token:"mock-school",until:now+3600000
  }));
  localStorage.setItem("hoctienganh_active_area","tutoring");
 });
 const base="http://127.0.0.1:4173/#";
 async function go(route,selector){
  await page.goto(base+route,{waitUntil:"domcontentloaded",timeout:25000});
  await page.locator(selector).first().waitFor({state:"visible",timeout:25000});
  await page.locator(".pc-toggle").waitFor({state:"visible",timeout:20000});
 }
 async function popup(mode="key"){
  await page.locator(".pc-toggle").click();
  await page.locator(".pc-dialog").waitFor({state:"visible"});
  await page.locator('input[name="pc-format"][value="'+mode+'"]').check();
  const [tab]=await Promise.all([
   page.waitForEvent("popup",{timeout:15000}),
   page.locator(".pc-print").click()
  ]);
  await tab.locator("main h1").waitFor({state:"visible",timeout:12000});
  const buf=await tab.pdf({format:"A4",printBackground:true});
  const text=pdfText(buf);
  assert.ok(text.length>30,"Actual PDF text is empty");
  assert.equal(await tab.locator("link[rel=stylesheet]").count(),0,"Standalone print page must not import site CSS");
  return {tab,text};
 }
 try{
  await go("grade-9/unit-1/vocabulary-practice-1",".exercise-intro");
  const vocab=await page.evaluate(()=>window.getUniversalVocabPrintData?.());
  assert.ok(vocab?.groups[0]?.questions?.length>=5,"Grade 9 vocabulary questions must be printable");
  assert.ok(vocab.groups[0].questions.every(x=>x.answer&&x.detailHtml));
  let z=await popup("key");
  assert.match(z.text,/ANSWER KEY/);
  assert.ok(z.text.includes("1."));
  assert.ok(!z.text.includes("Dịch nghĩa + giải thích ngữ cảnh"));
  await z.tab.close();

  await go("grade-12/unit-7/vocabulary-practice-1",".exercise-intro");
  const semantic=await page.evaluate(()=>window.getUniversalVocabPrintData?.());
  assert.ok(semantic?.groups[0]?.questions?.length>0,"Semantic vocabulary set must be printable");
  z=await popup("detailed");
  assert.ok(z.text.includes("Đáp án:"));
  assert.ok(z.text.includes("Giải thích")||z.text.includes("Dịch nghĩa"));
  await z.tab.close();

  await go("grammar/prefix-suffix/set-1",".exercise-intro");
  const grammar=await page.evaluate(()=>window.getUniversalVocabPrintData?.());
  assert.equal(grammar.groups[0].questions.length,10,"Grammar word form and MCQ set");
  assert.ok(grammar.groups[0].questions.some(x=>!x.options.length),"Word form input should be included");

  await go("school/grade-10/midterm-1/set-1",".exercise-intro");
  assert.equal(await page.locator("#accessPassInput").count(),0,
    "School session must be validated; access prompt is not an exercise.");
  const school=await page.evaluate(()=>window.UniversalPrint?.source()?.get());
  if(!school)console.log("SCHOOL PRINT DIAGNOSTIC",await page.evaluate(()=>({
   hash:location.hash,providerType:typeof window.getUniversalSchoolPrintData,
   source:window.UniversalPrint?.source()?.get?.()?.title||null,
   schoolBank:!!window.SCHOOL_G10_MIDTERM1,schoolExplanations:!!window.SCHOOL_G10_EXPLANATIONS,
   scripts:[...document.scripts].map(s=>s.src).filter(x=>/school|print/.test(x)),
   intro:document.querySelector(".exercise-intro")?.innerText?.slice(0,220)
  })));
  assert.ok(school?.groups?.length,"School route must resolve printable question data");
  assert.equal(school.groups[0].questions.length,12);
  assert.ok(school.groups[0].questions.every(x=>x.detailHtml||x.details?.length));
  z=await popup("key");assert.match(z.text,/ANSWER KEY/);await z.tab.close();

  await page.goto(base+"tutoring",{waitUntil:"domcontentloaded"});
  await page.locator(".units").first().waitFor({state:"visible",timeout:12000});
  await go("grade-12/reading/marketing-and-the-information-age",".exercise-intro");
  const mis=await page.evaluate(()=>window.getUniversalMISPrintData?.());
  assert.equal(mis.groups[0].questions.length,14);
  assert.ok(mis.groups[0].passage.length>1000);
  z=await popup("detailed");
  assert.ok(z.text.includes("Marketing")&&z.text.includes("Đáp án"));
  await z.tab.close();

  await go("grade-12/reading/robots-and-us",".exercise-intro");
  const robots=await page.evaluate(()=>window.getUniversalRobotsPrintData?.());
  assert.equal(robots.groups[0].questions.length,14);
  assert.ok(robots.groups[0].questions.every(x=>x.details?.length>0));

  await go("listening/entertainment/change-your-life-one-tiny-step-at-a-time","#listeningQuestionPanel");
  const l=await page.evaluate(()=>window.LISTENING_ENTERTAINMENT_PARTS);
  assert.ok(l?.length>=2);
  await page.locator(".pc-toggle").click();
  const groups=page.locator("[data-pc-group]");
  assert.equal(await groups.count(),l.length);
  await groups.nth(1).uncheck();
  await page.locator('input[name="pc-format"][value="key"]').check();
  const [lt]=await Promise.all([page.waitForEvent("popup"),page.locator(".pc-print").click()]);
  await lt.locator("main h1").waitFor();
  assert.equal(await lt.locator(".group").count(),0); // HTML uses section instead of framework wrappers.
  const ltText=pdfText(await lt.pdf({format:"A4"}));
  assert.match(ltText,/ANSWER KEY/);
  await lt.close();

  await go("listening/news/former-openai-employee-ai-might-really-kill-us-all","#newsListeningQuestionPanel");
  assert.ok((await page.evaluate(()=>window.LISTENING_NEWS_PARTS))?.length>=2);
  await go("grade-10/mid-term-test/test-3",".mt-question");
  const exam=await page.evaluate(()=>window.getUniversalMidtermPrintData?.());
  assert.ok(exam?.groups.flatMap(x=>x.questions).length>=30);
  assert.ok(exam.groups.flatMap(x=>x.questions).every(x=>x.detailHtml));
  assert.deepEqual(errors,[],"Browser JavaScript errors");
  console.log("UNIVERSAL PRINT: vocab, semantic, grammar, school, reading, listening, exam, A4 PDFs PASS");
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
