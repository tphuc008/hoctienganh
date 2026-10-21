"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");
const root=path.resolve(__dirname,"..");
const js=fs.readFileSync(path.join(root,"features/hsg-tinh.js"),"utf8");
const css=fs.readFileSync(path.join(root,"features/hsg-tinh.css"),"utf8");
const rules=css.split("HSG Reading V5")[1];

test("script parses and all exam groups mount in #pageMount rather than a detached portal",()=>{
 assert.doesNotThrow(()=>new vm.Script(js));
 assert.ok(rules);
 assert.match(js,/const root=\$\("pageMount"\);\s*root\.style\.display="block"/);
 assert.doesNotMatch(js,/document\.body\.appendChild\(portal\)/);
 assert.doesNotMatch(js,/if\(passage\)page\.style\.display="none"/);
 assert.match(js,/root\.innerHTML='<div class="hsg-root hsg-modern'/);
});
test("the reading workspace has an explicit nonzero height independent of flex expansion",()=>{
 assert.match(rules,/\.hsg-reading-mode\s*\{[^}]*position:relative;/s);
 assert.match(rules,/\.hsg-reading-mode \.hsg-passage-workspace\s*\{[^}]*height:clamp\(510px,calc\(100dvh - 260px\),880px\);/s);
 assert.match(rules,/grid-template-rows:minmax\(0,1fr\)/);
 assert.doesNotMatch(rules,/(?:^|[;{}\s])height:0\s*;/);
});
test("both direct pane elements scroll while their inner passage/question bodies are non-scrolling",()=>{
 assert.match(js,/id="hsg-passage-left" aria-label="Đoạn văn"/);
 assert.match(js,/id="hsg-passage-right" aria-label="Câu hỏi và phiếu trả lời"/);
 assert.match(rules,/\.hsg-reading-mode \.hsg-passage-left,\s*\.hsg-reading-mode \.hsg-passage-right\s*\{[^}]*height:100%;[^}]*overflow-y:auto;/s);
 assert.match(rules,/\.hsg-reading-mode \.hsg-passage-content,\s*\.hsg-reading-mode \.hsg-passage-questions\s*\{[^}]*height:auto;[^}]*overflow:visible;/s);
 assert.match(rules,/scrollbar-gutter:stable/);
});
test("changing question does not move the passage or the outer document",()=>{
 assert.match(js,/const pane=\$\("hsg-passage-right"\)/);
 assert.match(js,/pane\.scrollBy\(\{top:displacement,behavior:"smooth"\}\)/);
 assert.match(js,/const pane=\$\("hsg-passage-left"\),scroll=pane\?\.scrollTop\|\|0/);
 assert.doesNotMatch(js,/card\.scrollIntoView/);
});
test("mobile uses the same scrollers with separate tab scroll positions",()=>{
 assert.match(rules,/@media screen and \(max-width:880px\)/);
 assert.match(rules,/height:clamp\(440px,67dvh,720px\)/);
 assert.match(js,/state\.readingScroll\[previous\]=prior\.scrollTop/);
 assert.match(js,/active\.scrollTop=state\.readingScroll\[tab\]\|\|0/);
});
test("printing keeps its own layout and source font controls remain intact",()=>{
 assert.match(rules,/@media print/);
 assert.match(rules,/max-width:66ch/);
 assert.match(rules,/font-size:var\(--hsg-reading-font-size,17px\)/);
 assert.match(js,/data-hsg-text-size="smaller"/);
 assert.match(js,/data-hsg-text-size="larger"/);
});
