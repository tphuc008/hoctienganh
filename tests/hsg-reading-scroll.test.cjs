"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");
const root=path.resolve(__dirname,"..");
const js=fs.readFileSync(path.join(root,"features/hsg-tinh.js"),"utf8");
const css=fs.readFileSync(path.join(root,"features/hsg-tinh.css"),"utf8");
const head=css.split("Reading Workspace V3.1")[1];
test("script parses and both independent scroll regions are keyboard reachable",()=>{
 assert.doesNotThrow(()=>new vm.Script(js));
 assert.match(js,/hsg-passage-left-body" role="region" tabindex="0"/);
 assert.match(js,/hsg-answer-list" role="region" tabindex="0"/);
});
test("fixed-height pane hierarchy prevents flex/grid auto-minimums from swallowing scrolling",()=>{
 assert.ok(head);
 assert.match(head,/height:100dvh/);
 assert.match(head,/grid-template-rows:minmax\(0,1fr\)/);
 assert.match(head,/\.hsg-reading-mode \.hsg-passage-workspace\s*\{[^}]*height:0;/s);
 assert.match(head,/\.hsg-reading-mode \.hsg-passage-content,\s*\.hsg-reading-mode \.hsg-passage-questions\s*\{[^}]*flex:1 1 0;[^}]*height:0;[^}]*overflow-y:auto;/s);
 assert.match(head,/touch-action:pan-y/);
});
test("question navigation only scrolls the questions pane",()=>{
 assert.match(js,/mount\.scrollBy\(\{top:displacement,behavior:"smooth"\}\)/);
 assert.doesNotMatch(js,/card\.scrollIntoView/);
});
test("reading typography is restricted to the pilot and scalable",()=>{
 assert.match(head,/\.hsg-reading-mode\.hsg-pilot \.hsg-schema-passage\s*\{[^}]*max-width:66ch/s);
 assert.match(head,/font-size:var\(--hsg-reading-font-size,17px\)/);
 assert.match(js,/state\.passageTextSize=Math\.max\(15,Math\.min\(21,/);
 assert.match(js,/data-hsg-text-size="smaller"/);
 assert.match(js,/data-hsg-text-size="larger"/);
 assert.match(head,/\.hsg-pilot-reading_comprehension/);
});
test("mobile tabs and print output retain their own scroll and layout rules",()=>{
 assert.match(head,/@media screen and \(max-width:880px\)/);
 assert.match(head,/@media print\{/);
 assert.match(head,/height:auto!important;max-height:none!important;overflow:visible!important/);
 assert.match(js,/switchPassageTab\(b\.dataset\.hsgMobileTab\)/);
});
