"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");
const root=path.resolve(__dirname,"..");
const js=fs.readFileSync(path.join(root,"features/hsg-tinh.js"),"utf8");
const css=fs.readFileSync(path.join(root,"features/hsg-tinh.css"),"utf8");
const v4=css.split("HSG Reading V4")[1];
test("HSG script parses; fullscreen reader is mounted directly under body like Grade 12",()=>{
 assert.doesNotThrow(()=>new vm.Script(js));
 assert.match(js,/function ensureReadingPortal\(\)/);
 assert.match(js,/document\.body\.appendChild\(portal\)/);
 assert.match(js,/const root=passage\?ensureReadingPortal\(\):page/);
 assert.match(js,/removeReadingPortal\(\)/);
});
test("the TWO grid columns are the scrollports, not their inner content",()=>{
 assert.ok(v4);
 assert.match(v4,/\.hsg-reading-mode \.hsg-passage-workspace\s*\{[^}]*grid-template-rows:minmax\(0,1fr\)/s);
 assert.match(v4,/\.hsg-reading-mode \.hsg-passage-left,\s*\.hsg-reading-mode \.hsg-passage-right\s*\{[^}]*height:100%;[^}]*overflow-y:auto;/s);
 assert.match(v4,/\.hsg-reading-mode \.hsg-passage-content,\s*\.hsg-reading-mode \.hsg-passage-questions\s*\{[^}]*height:auto;[^}]*overflow:visible;/s);
 assert.doesNotMatch(v4,/height:0\s*;/);
 assert.match(v4,/scrollbar-gutter:stable/);
});
test("question navigation scrolls right column; passage updates preserve left column position",()=>{
 assert.match(js,/const pane=\$\("hsg-passage-right"\)/);
 assert.match(js,/pane\.scrollBy\(\{top:displacement,behavior:"smooth"\}\)/);
 assert.match(js,/const pane=\$\("hsg-passage-left"\),scroll=pane\?\.scrollTop\|\|0/);
 assert.doesNotMatch(js,/card\.scrollIntoView/);
});
test("both columns have IDs, region semantics, and mobile tab switching",()=>{
 assert.match(js,/id="hsg-passage-left" aria-label="Đoạn văn" role="region" tabindex="0"/);
 assert.match(js,/id="hsg-passage-right" aria-label="Câu hỏi và phiếu trả lời" role="region" tabindex="0"/);
 assert.match(v4,/@media screen and \(max-width:880px\)/);
 assert.match(v4,/display:block;\s*position:relative/);
 assert.match(js,/switchPassageTab\(b\.dataset\.hsgMobileTab\)/);
});
test("typography and font controls remain without changing source exam content",()=>{
 assert.match(v4,/max-width:66ch/);
 assert.match(v4,/font-size:var\(--hsg-reading-font-size,17px\)/);
 assert.match(js,/state\.passageTextSize=Math\.max\(15,Math\.min\(21,/);
 assert.match(js,/data-hsg-text-size="smaller"/);
 assert.match(js,/data-hsg-text-size="larger"/);
});
