const test=require("node:test"),assert=require("node:assert/strict");
const fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const root=path.resolve(__dirname,"..");
const read=file=>fs.readFileSync(path.join(root,file),"utf8");
const ctx={window:{}};
vm.runInNewContext(read("features/hsg-error-lines.js"),ctx);
const M=ctx.window.HSGErrorLines;
const TH="III. The passage below contains 5 mistakes. Find out the mistakes and write the correct answers on your answer sheet.\nExample: line 1: frequent → frequently\nlines\n\n1.\nAdolescent risk-taking behaviors frequent occur in peer-group settings, yet gender\n2.\ndifferences in susceptibility to deviant peer pressure remains unclear. A review of 26 studies\n3.\nidentifying two major trends: adolescent males were often found to be more vulnerable\n4.\nthan peer influences encouraging risky behaviors, or no consistent gender difference was\n5.\nobserved. Only two studies suggested that females were more susceptible than males.\n6.\nResearchers propose that gender socialization may explain why boys are more likely\n7.\nto conform to risky peer expectations, as if such behaviors are often associated with\n8.\ntraditionally masculine ideals. Additionally, methodological limitations, including the use of\n9.\nmale-oriented risk-taking assessments, may obscure actual gender differences. The review\n10.\nrecommends further research to develop more effective interventions for adolescents.\nIV. Choose the best answer.";
const TN="PART 2 (0.5 M)\nThe passage below contains 5 mistakes. UNDERLINE the mistakes from 31 to 35 and WRITE their correct forms in\nthe provided answer box. (0) has been done as an example.\n\nArtificial intelligence is becoming an increasing important part of modern society. It is used in many sectors such as\nhealthcare, education, finance, and transportation to improve efficiency and reduce human errors. In hospitals, AI\nsystems can analyze patients’ data more faster than human doctors, helping them to make accurate diagnosis and\ntreatment decisions.\nYOUR ANSWERS (0.1 each correct answer)\n31 32 33 34 35";
const HP="Question 50. Choose the appropriate option.\nPeer pressure is a psychological force that influence teenagers.\nTheir classmates often encourage such behaviour.\nQuestion 51. Line ___ mistake ___ correction ___";
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
 assert.ok(source.text.startsWith("Peer pressure"));
 assert.equal(source.text.includes("Question 50"),false);
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
