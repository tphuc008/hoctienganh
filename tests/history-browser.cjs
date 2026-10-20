const {chromium}=require("playwright");
const assert=require("node:assert/strict");
const UID="00000000-0000-4000-8000-000000000042",BASE="http://127.0.0.1:4173/";
const A="aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",B="bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb";
(async()=>{
 const browser=await chromium.launch({headless:true});
 const page=await browser.newPage({viewport:{width:1280,height:830}});
 const errors=[],requests=[];
 page.on("pageerror",x=>errors.push(x.message));
 await page.route("https://ouicitkpfukterkilqzu.supabase.co/**",route=>{
  const url=route.request().url();requests.push({url,method:route.request().method()});
  let rows=[];
  if(url.includes("/rest/v1/practice_submissions")){
   rows=[
    {submission_id:A,category:"reading",exercise_slug:"grade-12/reading/robots-and-us",correct_answers:10,total_questions:14,created_at:"2026-10-20T09:00:00Z"},
    {submission_id:B,category:"vocabulary",exercise_slug:"grade-12/unit-1/set-1",correct_answers:8,total_questions:10,created_at:"2026-10-20T09:01:00Z"}
   ];
  }else if(url.includes("/rest/v1/scores")){
   rows=[
    {id:2,practice_submission_id:B,grade:12,unit_no:1,set_no:1,first_try_correct:8,total_questions:10,created_at:"2026-10-20T09:01:00Z"},
    {id:1,practice_submission_id:null,grade:9,unit_no:1,set_no:1,first_try_correct:5,total_questions:20,created_at:"2025-01-01T00:00:00Z"}
   ];
  }else if(url.includes("/rest/v1/reading_submissions")){
   rows=[{id:"1",submission_id:A,exercise_slug:"grade-12/reading/robots-and-us",exercise_title:"Robots and us",score:10,total_questions:14,created_at:"2026-10-20T09:00:00Z"}];
  }
  route.fulfill({status:200,contentType:"application/json",
    headers:{"access-control-allow-origin":"*"},body:JSON.stringify(rows)});
 });
 await page.addInitScript(id=>{
  localStorage.setItem("hoctienganh_learner_auth_v1",JSON.stringify({access_token:"fake-e2e",refresh_token:"fake",
   expires_at_ms:Date.now()+3600000,user:{id,user_metadata:{username:"audit",display_name:"History Auditor"}}}));
  const token="mock-tutoring";
  localStorage.setItem("hoctienganh_access_tutoring",JSON.stringify({token,area:"tutoring",expiresAt:new Date(Date.now()+3600000).toISOString()}));
  sessionStorage.setItem("hoctienganh_valid_tutoring",JSON.stringify({token,until:Date.now()+3600000}));
  localStorage.setItem("hoctienganh_active_area","tutoring");
 },UID);
 try{
  await page.goto(BASE+"#history",{waitUntil:"domcontentloaded"});
  await page.locator("#historyEntries .review-item").first().waitFor({timeout:12000});
  assert.equal(await page.locator("#historyEntries .review-item").count(),3,
    "Two matching UUIDs must be shown exactly once, and unlinked old score preserved");
  assert.match(await page.locator("#historyEntries").innerText(),/Đúng lần đầu/);
  assert.equal(await page.locator("#historyFilters [data-history-filter='reading']").count(),1);
  await page.locator("#historyFilters [data-history-filter='reading']").click();
  assert.equal(await page.locator("#historyEntries .review-item").count(),1,"Reading filter");
  await page.locator("#historyFilters [data-history-filter='all']").click();
  assert.equal(await page.locator("#historyEntries .review-item").count(),3,"All filter");
  assert.ok(requests.filter(x=>/rest\/v1\/(practice_submissions|scores|reading_submissions)/.test(x.url))
   .every(x=>x.url.includes("user_id=eq."+UID)), "History queries must be account scoped");
  assert.ok(!requests.some(x=>x.url.includes("/rpc/record_tutoring_activity")),"Streak RPC must never be called");
  assert.deepEqual(errors,[],"No browser exceptions");
  console.log("HISTORY DEDUP / FILTER / OWNER SCOPE / NO CLIENT STREAK RPC: PASS");
 }finally{await browser.close()}
})().catch(err=>{console.error(err);process.exitCode=1});
