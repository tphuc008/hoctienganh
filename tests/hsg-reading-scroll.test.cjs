"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");
const root=path.resolve(__dirname,"..");
const js=fs.readFileSync(path.join(root,"features/hsg-tinh.js"),"utf8");
const css=fs.readFileSync(path.join(root,"features/hsg-tinh.css"),"utf8");
const fix=css.split("Reading Workspace V3.2")[1];
test("the reading application script parses and has two keyboard-accessible reading regions",()=>{
 assert.doesNotThrow(()=>new vm.Script(js));
 assert.match(js,/id="hsg-passage-left-body" role="region" tabindex="0"/);
 assert.match(js,/id="hsg-answer-list" role="region" tabindex="0"/);
});
test("reading passage and questions are not collapsed by zero-height scrollports",()=>{
 assert.ok(fix);
 assert.match(fix,/\.hsg-reading-mode \.hsg-passage-workspace\s*\{[^}]*height:auto;/s);
 assert.match(fix,/\.hsg-reading-mode \.hsg-passage-content,\s*\.hsg-reading-mode \.hsg-passage-questions\s*\{[^}]*height:auto;[^}]*overflow-y:auto;/s);
 assert.doesNotMatch(fix,/(?:^|[;{} \t\n])height:0\s*;/);
 assert.match(fix,/\.hsg-reading-mode \.hsg-passage-left,\s*\.hsg-reading-mode \.hsg-passage-right\s*\{[^}]*display:flex/s);
});
test("navigating question map scrolls only the question pane",()=>{
 assert.match(js,/mount\.scrollBy\(\{top:displacement,behavior:"smooth"\}\)/);
 assert.doesNotMatch(js,/card\.scrollIntoView/);
});
test("text resizing preserves source content and stays within a readable range",()=>{
 assert.match(fix,/max-width:67ch/);
 assert.match(fix,/font-size:var\(--hsg-reading-font-size,17px\)/);
 assert.match(js,/state\.passageTextSize=Math\.max\(15,Math\.min\(21,/);
 assert.match(js,/data-hsg-text-size="smaller"/);
 assert.match(js,/data-hsg-text-size="larger"/);
});
test("mobile tabs and printed version use their separate layouts",()=>{
 assert.match(fix,/@media screen and \(max-width:880px\)/);
 assert.match(fix,/@media print\{/);
 assert.match(js,/switchPassageTab\(b\.dataset\.hsgMobileTab\)/);
 assert.match(css,/@media print\s*\{/);
});
