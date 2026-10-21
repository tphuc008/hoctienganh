const test=require("node:test"),assert=require("node:assert/strict");
const fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const root=path.resolve(__dirname,"..");
const read=file=>fs.readFileSync(path.join(root,file),"utf8");
const ctx={window:{}};
vm.runInNewContext(read("features/hsg-error-lines.js"),ctx);
const M=ctx.window.HSGErrorLines;
const TH="III. The passage below contains 5 mistakes. Find out the mistakes and write the correct answers on your answer sheet.\nExample: line 1: frequent → frequently\nlines\n\n1.\nAdolescent risk-taking behaviors frequent occur in peer-group settings, yet gender\n2.\ndifferences in susceptibility to deviant peer pressure remains unclear. A review of 26 studies\n3.\nidentifying two major trends: adolescent males were often found to be more vulnerable\n4.\nthan peer influences encouraging risky behaviors, or no consistent gender difference was\n5.\nobserved. Only two studies suggested that females were more susceptible than males.\n6.\nResearchers propose that gender socialization may explain why boys are more likely\n7.\nto conform to risky peer expectations, as if such behaviors are often associated with\n8.\ntraditionally masculine ideals. Additionally, methodological limitations, including the use of\n9.\nmale-oriented risk-taking assessments, may obscure actual gender differences. The review\n10.\nrecommends further research to develop more effective interventions for adolescents.\nIV. Choose the best answer.";
const TN="PART 2 (0.5 M)\nThe passage below contains 5 mistakes. UNDERLINE the mistakes from 31 to 35 and WRITE their correct forms in\nthe provided answer box. (0) has been done as an example.\n\nArtificial intelligence is becoming an increasing important part of modern society. It is used in many sectors such as\nhealthcare, education, finance, and transportation to improve efficiency and reduce human errors. In hospitals, AI\nsystems can analyze patients’ data more faster than human doctors, helping them to make accurate diagnosis and\ntreatment decisions.\nYOUR ANSWERS (0.1 each correct answer)\n31 32 33 34 35";
const HP="Part 3. Identify 5 errors in the text below and correct them. (5.0 points)\nLine\n1\nPeer pressure is a psychological force that influence many teenagers, especially during middle\n2\nand high school years. It can appear in several shapes, including being pushed to wear\n3\ncertain clothes, copying unhealthy habits such as smoking or drinking, or even engaging in\n4\nonline challenges that might put their lives in risk.\n5\nTheir classmates often encourage such behaviour and affect their choices.\n6\nOthers worry about their grades and their future decisions.\nQuestion 51. Line ___ mistake ___ correction ___";
test("Thanh Hoa keeps original numbered lines 1–10",()=>{
 const source=M.extract("thanh-hoa",TH);assert.equal(source.verified,true);
 const model=M.parse(source.text);
 assert.equal(model.hasOriginalLines,true);assert.equal(model.lines.length,10);
 assert.equal(model.lines[0].number,1);assert.match(model.lines[0].text,/risk-taking/);
 assert.equal(model.lines[9].number,10);
 assert.ok(!model.lines[9].text.includes("IV. Choose"));
 const html=M.screen(model,{line:"6"});
 assert.equal((html.match(/data-hsg-line=/g)||[]).length,10);
 assert.match(html,/data-hsg-line="6"/);
 assert.match(html,/is-selected/);
 assert.match(M.print(model),/>10<\/b>/);
});
test("Tay Ninh has no original line numbering",()=>{
 const source=M.extract("tay-ninh",TN);assert.equal(source.verified,true);
 assert.ok(!source.text.includes("YOUR ANSWERS"));
 const model=M.parse(source.text);assert.equal(model.hasOriginalLines,false);
 assert.equal(M.screen(model,{}).includes("data-hsg-line="),false);
 assert.ok(model.paragraphs.join(" ").includes("Artificial intelligence"));
 assert.equal(M.print(model).includes("hsg-print-error-line"),false);
});
test("Hai Phong extraction does not include neighboring MCQ",()=>{
 const source=M.extract("hai-phong",HP);assert.equal(source.verified,true);
 assert.ok(source.text.startsWith("Part 3."));
 const p=M.parse(source.text);
 assert.equal(p.hasOriginalLines,true);
 assert.equal(p.lines[0].number,1);
 assert.equal(p.lines.length,6);
 assert.equal(source.text.includes("Peer pressure"),true);
 assert.equal(source.text.includes("Question 51"),false);
});
test("OCR wraps and blank answer grids never make invented lines",()=>{
 const model=M.parse("An ordinary source line.\nA PDF-wrapped next line.");
 assert.equal(model.hasOriginalLines,false);
 assert.equal(M.screen(model,{}).includes("data-hsg-line"),false);
 assert.equal(M.numbered("1.\n____\n2.\n____\n3.\n____\n4.\n____"),null);
});
test("screen and print share Error Correction source parser",()=>{
 const js=read("features/hsg-tinh.js"),index=read("index.html");
 assert.match(js,/function errorSourceModel\(/);
 assert.match(js,/global\.HSGErrorLines\.screen/);
 assert.match(js,/global\.HSGErrorLines\.print/);
 assert.ok(js.includes('if(actualKind(g,first)==="error")'));
 assert.ok(index.indexOf("features/hsg-error-lines.js")<index.indexOf("features/hsg-tinh.js"));
});

test("PDF with detached line-number column must be marked uncertain if row counts differ",()=>{
 const src="Part 3. For questions 46-50, identify 5 mistakes in the following passage and correct them.\n"+
  "Line\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n"+
  "First original sentence here.\nSecond original sentence here.\n"+
  "The remaining paragraph continues across the physical PDF page.\n";
 const result=M.extract("phu-tho",src);
 assert.equal(result.verified,true);
 const model=M.parse(result.text);
 assert.equal(model.hasOriginalLines,false);
 assert.equal(model.numberingUncertain,true);
 assert.ok(model.note.includes("PDF"));
 assert.equal(M.screen(model,{}).includes("data-hsg-line"),false);
});
test("OCR labels in Vinh 5 and 11 are restored by neighbouring sequence",()=>{
 const src="PART 2. For questions 21-30, identify ten errors in the following passage and correct them.\n"+
 "Line\n"+
 "1 The true story is based on a mathematician working in England.\n"+
 "2 Some researchers consider the project a remarkable achievement.\n"+
 "3 The screenplay follows the mathematician through his youth.\n"+
 "4 Scholars of mathematics continued to work at the institute.\n"+
 "=) Benedict Cumberbatch plays Alan Turing in the famous movie.\n"+
 "6 The Enigma machine used a formidable encryption system.\n"+
 "7 Researchers worked long hours to crack the code.\n"+
 "8 The team eventually solved the problem of the puzzle.\n"+
 "9 Although familiar to many viewers the story remains compelling.\n"+
 "10 The film engages the audience throughout the story.\n"+
 "81 outstanding performance resulted in several notable nominations.\n"+
 "12 The drama remains an important history film today.\n";
 const model=M.parse(M.extract("dh-vinh",src).text);
 assert.equal(model.hasOriginalLines,true);
 assert.equal(model.lines.length,12);
 assert.equal(model.lines[4].number,5);
 assert.equal(model.lines[10].number,11);
});
