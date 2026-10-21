/* Regression guard for the site-wide paper design V1.2.
 * No account, browser or protected solution data is required.
 */
const test=require("node:test"),assert=require("node:assert/strict");
const fs=require("node:fs"),vm=require("node:vm"),path=require("node:path");
const read=file=>fs.readFileSync(path.join(__dirname,"..",file),"utf8");
const context={window:{}};
vm.runInNewContext(read("features/print-design-system.js"),context);
const P=context.window.PrintDesignSystem;
test("one canonical A4 paper standard with HSG-compatible tokens",()=>{
 assert.equal(P.version,"exam-print-v1.2");
 assert.equal(P.tokens.burgundy,"#800040");
 assert.match(P.css(),/@page\{size:A4 portrait;margin:16mm 17mm 17mm\}/);
 assert.equal((P.css().match(/@page\{/g)||[]).length,1);
 assert.ok(P.css().includes(".ep-paper,.lp-print-sheet"));
});
test("short MCQ uses two columns, long MCQ uses one",()=>{
 assert.equal(P.compact(["short","short","short","short"]),true);
 assert.equal(P.compact(["a".repeat(51),"B","C","D"]),false);
 assert.equal(P.compact(["a".repeat(40),"b".repeat(40),"c".repeat(40),"d".repeat(40)]),false);
 assert.match(P.choices(["short","short","short","short"]),/ep-options compact/);
 assert.match(P.choices(["a".repeat(60),"short","short","short"]),/ep-options long/);
 assert.equal((P.choices(["A","B","C","D"]).match(/class="ep-option"/g)||[]).length,4);
});
test("shared passages retain paragraph and bullet blocks once",()=>{
 const html=P.passage("The first paragraph is a complete introduction to a reading passage, with enough detail to make the sentence meaningful.\nHowever, the next paragraph offers a contrasting view and gives the reader a fresh point of departure.\n\n• A listed feature\n• Another feature\n\nBest regards,");
 assert.ok((html.match(/class="ep-prose"/g)||[]).length>=2);
 assert.equal((html.match(/class="ep-bullet"/g)||[]).length,2);
 assert.equal((html.match(/class="ep-salutation"/g)||[]).length,1);
 assert.ok(!html.includes("undefined"));
 assert.ok(P.passage("<script>foo()</script>").includes("&lt;script&gt;"));
});
test("public exercise and protected Lesson Plans adopt shared renderer without changing access gates",()=>{
 const universal=read("features/universal-print.js");
 const lesson=read("features/lesson-plans.js");
 const index=read("index.html");
 assert.ok(universal.includes("global.PrintDesignSystem.css()"));
 assert.ok(universal.includes("design.passage(sharedContext)"));
 assert.ok(universal.includes('class="ep-answer-line"'));
 assert.ok(universal.includes('class="ep-listening-note"'));
 assert.ok(lesson.includes("global.PrintDesignSystem.css()"));
 assert.ok(lesson.includes("global.PrintDesignSystem.compact(q.options)"));
 assert.ok(lesson.includes("!accessAllowed()||!chosen.length"));
 assert.ok(lesson.includes("semanticExplanation(q,key,true)"));
 assert.ok(index.indexOf("features/print-design-system.js")<index.indexOf("features/universal-print.js"));
 assert.ok(read("features/hsg-print.css").includes("A4 portrait"));
});
