const test=require("node:test");
const assert=require("node:assert/strict");
const vm=require("node:vm");
const fs=require("node:fs");
const path=require("node:path");
const code=fs.readFileSync(path.join(__dirname,"../core/history-core.js"),"utf8");
function load(){const window={};vm.runInNewContext(code,{window});return window.LearningHistoryCore}
const A="aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
const B="bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb";
const C="cccccccc-cccc-4ccc-8ccc-cccccccccccc";

test("Exact UUID merges Reading and Vocabulary dual writes without losing old history",()=>{
 const m=load();
 const result=m.merge([
  {submission_id:A,category:"reading",exercise_slug:"reading/ex",correct_answers:10,total_questions:14,created_at:"2026-10-20T08:00:00Z"},
  {submission_id:B,category:"vocabulary",exercise_slug:"grade-12/unit-2/set-1",correct_answers:8,total_questions:10,created_at:"2026-10-20T08:01:00Z"}
 ],[
  {id:3,practice_submission_id:B,grade:12,unit_no:2,set_no:1,first_try_correct:8,total_questions:10,created_at:"2026-10-20T08:01:00Z"},
  {id:4,practice_submission_id:null,grade:12,unit_no:1,set_no:1,first_try_correct:6,total_questions:20,created_at:"2024-10-01T08:00:00Z"}
 ],[
  {submission_id:A,exercise_slug:"reading/ex",exercise_title:"Reading 1",score:10,total_questions:14,created_at:"2026-10-20T08:00:00Z"},
  {submission_id:C,exercise_slug:"reading/old",exercise_title:"Old Passage",score:9,total_questions:14,created_at:"2025-04-01T08:00:00Z"}
 ]);
 assert.equal(result.length,4);
 assert.equal(result[0].submissionId,B);
 assert.equal(result[1].submissionId,A);
 assert.equal(result[2].submissionId,C);
 assert.equal(result[3].source,"legacy");
 assert.equal(result[0].metric,"first_try");
 assert.equal(result[1].metric,"correct");
 assert.equal(m.totals(result).attempts,4);
});
test("Repeated attempts with different UUIDs are not collapsed",()=>{
 const m=load();const result=m.merge([
  {submission_id:A,category:"reading",exercise_slug:"reading/ex",correct_answers:3,total_questions:14,created_at:"2026-10-20T08:00:00Z"},
  {submission_id:B,category:"reading",exercise_slug:"reading/ex",correct_answers:3,total_questions:14,created_at:"2026-10-20T08:00:10Z"}],[],[]);
 assert.equal(result.length,2,"Two submissions are two real attempts even if their score and time match");
});
test("Older UUID-less results are retained rather than guessed as duplicates",()=>{
 const m=load();const result=m.merge([
  {submission_id:A,category:"vocabulary",exercise_slug:"grade-12/unit-1/set-1",correct_answers:5,total_questions:10,created_at:"2026-10-20T08:00:00Z"}],
 [{id:1,grade:12,unit_no:1,set_no:1,first_try_correct:5,total_questions:10,created_at:"2026-10-20T08:00:00Z"}],[]);
 assert.equal(result.length,2,"Do not hide unlinked old attempts based only on same timestamp");
});
