/* Grade 10 midterm interactive quizzes, Grade 12-style semantic explanations. */
const mtState={"tests":null,"chosenTest":null,"index":0,"answers":{},"checked":{},"revealed":{},"loading":null,"results":false,"startedAt":0,"submissionId":null,"recorded":false,"owner":null};
const MT_ALTERNATIVES={"3-26":["C","D"],"3-27":["A","B"],"3-35":["A","C"],"4-11":["B","C"],"4-16":["A","B","C","D"],"5-13":["B","C"],"5-14":["B","C"],"5-29":["A","B"],"6-22":["C","D"]};
const MT_NO_SCORE=new Set(["4-16","6-26","6-29"]);
function mtKey(id){return "grade-10/mid-term-test/test-"+id}
function mtSave(){
 if(!mtState.chosenTest||!LearningCore.userId()||mtState.owner!==LearningCore.userId())return;
 LearningCore.writeDraft("exam",mtKey(mtState.chosenTest),{index:mtState.index,answers:mtState.answers,checked:mtState.checked,revealed:mtState.revealed,startedAt:mtState.startedAt,submissionId:mtState.submissionId,recorded:mtState.recorded,sourceVersion:LearningCore.fingerprint(mtCurrent().questions)});
 const test=mtCurrent(),done=test.questions.filter(q=>mtState.checked[q.id]).length;
 LearningFlow.track({category:"exam",slug:mtKey(test.id),ownerId:mtState.owner,
   started:true,startedAt:mtState.startedAt,done,total:test.questions.length,
   completed:done===test.questions.length,mode:"submit"});
}
function mtRestore(test){
 const saved=LearningCore.readDraft("exam",mtKey(test.id));
 mtState.chosenTest=test.id;mtState.owner=LearningCore.userId();
 mtState.index=0;mtState.answers={};mtState.checked={};mtState.revealed={};
 mtState.startedAt=Date.now();mtState.submissionId=LearningCore.uuid();mtState.results=false;mtState.recorded=false;
 if(saved&&typeof saved==="object"&&saved.sourceVersion===LearningCore.fingerprint(test.questions)){
  const ids=new Set(test.questions.map(q=>q.id));
  const valid=obj=>Object.fromEntries(Object.entries(obj||{}).filter(([k])=>ids.has(k)));
  mtState.answers=valid(saved.answers);mtState.checked=valid(saved.checked);mtState.revealed=valid(saved.revealed);
  mtState.index=Math.max(0,Math.min(test.questions.length-1,Number(saved.index)||0));
  mtState.startedAt=Number(saved.startedAt)||Date.now();
  mtState.submissionId=saved.submissionId||LearningCore.uuid();mtState.recorded=!!saved.recorded;
 }
 mtSave();
}
function mtRestart(){
 const test=mtCurrent();if(!test)return;
 LearningCore.clearDraft("exam",mtKey(test.id));
 LearningFlow.reset("exam",mtKey(test.id));
 mtState.chosenTest=null;mtOpenTest(test.id);
}
function mtEsc(s){return String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}
function mtNormal(s){return String(s??"").toLowerCase().replace(/[–—−]/g,"-").replace(/[’‘]/g,"'").replace(/[^a-z0-9áàạảãâăđêếệểễíìịỉĩóòọỏõôơúùụủũưýỳỷỹ\s'-]/gi," ").replace(/\s+/g," ").trim()}
function mtSection(q){
 if(q.section!=="Main")return q.section;
 const n=q.number,t=Number(q.id[0]);
 if((t===3&&n>=44)||(t===4&&n>=36)||(t===5&&n>=44)||(t===6&&n>=44))return "Passive Voice";
 if((t===3&&n>=36)||(t===4&&n>=26)||(t===5&&n>=36)||(t===6&&n>=36))return "Sentence Rearrangement";
 if((t===3&&n>=31)||(t===4&&n>=21)||(t===5&&n>=31)||(t===6&&n>=31))return "Reading Comprehension";
 if((t===3&&n>=23)||(t===4&&n>=13)||(t===5&&n>=23)||(t===6&&n>=23))return "Text Completion";
 return "Vocabulary & Grammar";
}
function mtBase(){
 const mount=document.getElementById("pageMount");
 mount.style.display="block";
 const quiz=document.getElementById("quizShell");if(quiz)quiz.style.display="none";
 return mount;
}
function mtStyles(){
 if(document.getElementById("midterm-css"))return;
 const st=document.createElement("style");st.id="midterm-css";
 st.textContent=".mt-subtle{color:var(--muted);font-size:13px;line-height:1.7}.mt-question{margin:18px 0 22px;padding:22px;border:1px solid var(--line);border-radius:20px;background:var(--card,rgba(255,255,255,.5))}.mt-stem{font-size:16px;line-height:1.9;white-space:pre-wrap;overflow-wrap:anywhere;margin:15px 0 22px}.mt-option{display:flex;align-items:flex-start;gap:13px;padding:15px;margin:9px 0;border:1px solid var(--line);border-radius:14px;cursor:pointer;transition:.12s background}.mt-option input{margin-top:5px;accent-color:#c02675}.mt-option b{width:20px;flex:none}.mt-option:hover{background:rgba(227,97,150,.07)}.mt-option.selected{border-color:#d94691;background:rgba(236,72,153,.075)}.mt-option:has(input:disabled){cursor:default}.mt-passage{margin:16px 0;padding:16px 18px;border-radius:16px;background:rgba(125,110,160,.07);border:1px solid var(--line)}.mt-passage summary{font-weight:800;cursor:pointer}.mt-passage-text{white-space:pre-wrap;line-height:1.8;font-size:14px;margin-top:14px;overflow-wrap:anywhere}.mt-controls{display:flex;align-items:center;flex-wrap:wrap;gap:10px;margin:16px 0}.mt-controls button{max-width:100%}.mt-count{font-size:13px;color:var(--muted);font-weight:700}.mt-written{min-height:92px;width:100%;background:var(--bg);border:1px solid var(--line);border-radius:13px;padding:12px;color:inherit;font:inherit;line-height:1.6}.mt-score{font-size:18px;font-weight:800}.mt-feedback-header{font-weight:800;margin-bottom:14px}.mt-badge{display:inline-block;background:rgba(108,105,170,.1);padding:6px 10px;border-radius:20px;font-size:12px;font-weight:700}.mt-note{border:1px solid #d97706;background:rgba(245,158,11,.08);padding:13px 15px;border-radius:14px;line-height:1.7;margin:12px 0}.mt-progress{display:flex;gap:3px;margin:12px 0}.mt-progress i{height:6px;flex:1;min-width:3px;border-radius:12px;background:var(--line)}.mt-progress i.done{background:#16a34a}.mt-progress i.current{background:#d94691}.mt-question .semantic-feedback{margin-top:18px}.mt-writing-step{padding:12px 0;border-bottom:1px solid var(--line);line-height:1.8}.mt-writing-step b{display:block}.mt-quiz-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:14px}.mt-quiz-grid .exercise-card{text-align:left;cursor:pointer}.mt-review-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(58px,1fr));gap:8px;margin:20px 0}.mt-review-grid button{padding:10px 3px;border:1px solid var(--line);border-radius:10px;background:var(--card);color:inherit;cursor:pointer}.mt-review-grid .completed{border-color:#16a34a}.mt-review-grid .missed{border-color:#dc2626}.mt-question input:disabled{opacity:.85}@media(max-width:640px){.mt-question{padding:15px;margin:12px 0}.mt-option{padding:11px}.mt-stem{font-size:15px}.mt-controls button{flex:1}}";
 document.head.appendChild(st);
}
async function mtLoad(){
 if(mtState.tests)return mtState.tests;
 if(mtState.loading)return mtState.loading;
 mtState.loading=(async()=>{
  const res=await fetch("./grade10-midterm-source.txt?v=20261019-r1",{cache:"no-store"});
  if(!res.ok)throw new Error("Không tải được dữ liệu đề thi ("+res.status+").");
  const text=await res.text();
  const data=window.G10_MIDTERM_PARSE(text);
  if(data.length!==4||data.map(x=>x.questions.length).join(",")!=="45,50,45,46")throw new Error("Số lượng câu hỏi không khớp với dữ liệu nguồn.");
  for(const t of data)for(const q of t.questions)if(!q.answer||(!!q.options&&q.options.length!==4))throw new Error("Lỗi dữ liệu tại câu "+q.id);
  mtState.tests=data;return data;
 })();
 try{return await mtState.loading}finally{mtState.loading=null}
}
function mtShowLoading(){mtStyles();mtBase().innerHTML='<div class="breadcrumbs"><button class="crumb-btn" onclick="goGrade(10)">Lớp 10</button><span>›</span><span>Mid Term Test</span></div><div class="unit-hero"><div class="eyebrow">Grade 10 · Mid Term Test</div><h1>Đang tải đề thi…</h1></div>'}
function mtShowError(err){mtBase().innerHTML='<div class="unit-hero"><h1>Chưa tải được bài thi</h1><p>'+mtEsc(err?.message||err)+'</p><button class="secondary" onclick="location.hash=\'grade-10\'">Quay lại Lớp 10</button></div>'}
async function mtHome(){
 mtShowLoading();try{const tests=await mtLoad();if(location.hash!="#grade-10/mid-term-test")return;
 const extraCards=[1,2].map(n=>'<button class="exercise-card" onclick="location.hash=\'grade-10/mid-term-test/source-test-'+n+'\'"><div class="exercise-icon">'+n+'</div><h3>Test '+n+'</h3><div class="meta"><span class="chip">'+(n===1?50:43)+' câu</span><span class="chip">Chọn đáp án · Lưu nháp</span><span class="chip">Chưa có đáp án kiểm chứng</span></div></button>').join("");
 const m=mtBase();m.innerHTML='<div class="breadcrumbs"><button class="crumb-btn" onclick="goGrade(10)">Lớp 10</button><span>›</span><span>Mid Term Test</span></div><div class="unit-hero"><div class="eyebrow">Grade 10 · Mid Term Test</div><h1>Mid Term Test</h1><p>6 TEST · 279 câu</p></div><div class="section-title"><h2>Exercises</h2><span>6 tests</span></div><div class="mt-quiz-grid">'+extraCards+tests.map(t=>'<button class="exercise-card" onclick="location.hash=\'grade-10/mid-term-test/source-test-'+t.id+'\'"><div class="exercise-icon">'+t.id+'</div><h3>'+mtEsc(t.title)+'</h3><div class="meta"><span class="chip">'+t.questions.length+' questions</span></div></button>').join("")+'</div>';

 window.scrollTo({top:0,behavior:"smooth"});
 }catch(err){mtShowError(err)}
}
async function mtOpenTest(id){
 mtShowLoading();try{const tests=await mtLoad();if(location.hash!="#grade-10/mid-term-test/test-"+id)return;const test=tests.find(t=>t.id===+id);if(!test)throw new Error("Không tìm thấy bài kiểm tra.");
 if(mtState.chosenTest!==test.id||mtState.owner!==LearningCore.userId())mtRestore(test);
 mtRender();
 }catch(err){mtShowError(err)}
}
function mtCurrent(){return mtState.tests.find(t=>t.id===mtState.chosenTest)}
function mtContext(test,q){
 const positions=test.questions;const ix=positions.indexOf(q);
 let context="";
 for(let i=ix;i>=0;i--){
  if(positions[i].context&&positions[i].context.length>350){context=positions[i].context;break}
  if(positions[i].section!==q.section)break;
  if(q.number-positions[i].number>6)break;
 }
 if(!context)return "";
 const m=mtSection(q);
 if(m==="Reading Comprehension"||m==="Text Completion")return context;
 return "";
}
function mtProgress(test){
 const checked=test.questions.filter(q=>mtState.checked[q.id]).length;
 return '<div class="mt-count">'+checked+'/'+test.questions.length+' câu đã kiểm tra</div><div class="mt-progress">'+test.questions.map((q,i)=>'<i class="'+(mtState.checked[q.id]?'done':i===mtState.index?'current':'')+'"></i>').join("")+'</div>';
}
function mtAnswerLabel(q){
 if(!q.options)return String(q.answer);
 const i="ABCD".indexOf(q.answer);return q.answer+". "+q.options[i];
}
function mtReorderParts(q){
 return q.stem.split("\n").map(line=>line.trim()).filter(line=>/^[a-g]\.\s/.test(line)).reduce((out,line)=>{out[line.charAt(0)]=line.slice(3);return out},{});
}
function mtWrittenFeedback(q){
 const answer=mtAnswerLabel(q);const reorder=mtSection(q)==="Sentence Rearrangement";
 const parts=mtReorderParts(q);const letters=String(answer).split("-").map(x=>x.trim());
 if(reorder){
  const explanation=letters.map((k,i)=>{
   const val=parts[k]||"";
   const clue=/^(Dear|Firstly|First|To begin|There are|I think|In conclusion)/i.test(val)?"Cụm mở đoạn/kết bài xác định rõ chức năng trong toàn văn.":/^(However|But|Therefore|Finally|Secondly|In addition|As a result)/i.test(val)?"Từ nối biểu thị logic bổ sung, tương phản, trình tự hoặc kết luận.":"Xét người nói, đại từ hồi chỉ và việc câu này có trả lời/mở rộng đúng câu trước hay không.";
   return '<div class="mt-writing-step"><b>'+mtEsc((i+1)+". Câu "+k)+ '</b>'+mtEsc(val)+'<div class="mt-subtle">'+mtEsc(clue)+'</div></div>';
  }).join("");
  const full=letters.map(k=>parts[k]).filter(Boolean).join("\n");
  return '<div class="feedback correct semantic-feedback"><div class="feedback-title">✓ Thứ tự tham khảo: '+mtEsc(answer)+'</div><section class="semantic-step"><div class="semantic-step-label"><span>1</span><div><b>Ý chính & logic toàn đoạn</b><small>Meaning · context · coherence</small></div></div><div class="semantic-prose"><p>Cần xác định chức năng mở đầu, diễn biến lập luận hoặc lượt lời của các nhân vật trước khi sắp xếp.</p><p>Thứ tự đề xuất: '+mtEsc(answer)+'. Nếu là hội thoại, ưu tiên cặp hỏi–đáp và người nói luân phiên; nếu là đoạn văn, ưu tiên câu chủ đề, câu triển khai và kết luận.</p></div></section><section class="semantic-step"><div class="semantic-step-label"><span>2</span><div><b>Giải thích từng bước sắp xếp</b><small>Discourse clues · references · sequence</small></div></div>'+explanation+'</section><section class="semantic-step"><div class="semantic-step-label"><span>3</span><div><b>Đoạn hoàn chỉnh để đối chiếu</b><small>Reconstructed English passage</small></div></div><p style="white-space:pre-wrap;line-height:1.9">'+mtEsc(full)+'</p><p class="mt-subtle">Hãy kiểm tra xem từng câu có trả lời hoặc mở rộng câu trước và đại từ có tiền ngữ rõ ràng hay không.</p></section><div class="semantic-remember"><b>Điểm cần nhớ</b><span>Không sắp xếp chỉ theo từ nối. Hãy kiểm tra chủ thể, thông tin mới/cũ, quan hệ nhân–quả, thời gian và mục đích giao tiếp.</span></div></div>';
 }
 const t=/\bshould be\b/i.test(answer)?"bị động với động từ khuyết thiếu":/being/i.test(answer)?"hiện tại tiếp diễn":/will be/i.test(answer)?"tương lai đơn":/has been/i.test(answer)?"hiện tại hoàn thành":/was |were /i.test(answer)?"quá khứ đơn":"hiện tại đơn";
 const formula=/khuyết thiếu/.test(t)?"should + be + V3":/hiện tại tiếp diễn/.test(t)?"am/is/are + being + V3":/tương lai/.test(t)?"will be + V3":/hiện tại hoàn thành/.test(t)?"have/has been + V3":/quá khứ/.test(t)?"was/were + V3":"am/is/are + V3";
 const passiveNotes={"3-44":"Tân ngữ plastic waste là danh từ không đếm được nên dùng is; collect ở hiện tại đơn thành is collected. Trạng ngữ every Saturday phải được giữ.","3-45":"A green campaign là tân ngữ số ít; is organizing ở chủ động thành is being organized, giữ at the moment để không biến hành động đang diễn ra thành thói quen.","4-36":"Hundreds of trees là số nhiều nên dùng were; planted chuyển sang V3 (vẫn là planted) trong bị động quá khứ đơn.","4-37":"Động từ khuyết thiếu should không đổi; mẫu bắt buộc là should + be + turned off. Không viết should be turning off hay should turned off.","4-38":"People have used this song là hiện tại hoàn thành; chủ ngữ mới this song số ít nên dùng has been used.","4-39":"Dinner là chủ ngữ số ít nên dùng is prepared; every evening chỉ sự lặp lại, không dùng is being prepared.","4-40":"Will organize mang nghĩa tương lai; bị động là will be organized, giữ next month.","5-44":"Tân ngữ me chuyển thành chủ ngữ I (không viết Me); takes ở hiện tại đơn chuyển thành am taken, vì chủ ngữ mới là I.","5-45":"A lot of homework là cụm không đếm được; đang thực hiện nên dùng is being done, không dùng are being done. We chuyển thành by us nếu giữ tác nhân.","6-44":"Millions of plastic bottles là số nhiều; are recycled giữ every year để mô tả hoạt động định kỳ.","6-45":"Rubbish là danh từ không đếm được nên dùng is; are collecting thành is being collected theo chủ ngữ mới, có thể giữ by the students.","6-46":"A music festival là số ít; organized chuyển thành was organized, giữ last month cho quá khứ đơn."};
  const examples=[["Plastic bottles are recycled every week.","Chai nhựa được tái chế mỗi tuần."],["The classroom is being cleaned now.","Lớp học đang được dọn ngay lúc này."],["The trees were planted last year.","Những cây này đã được trồng năm ngoái."],["The event will be organized next month.","Sự kiện sẽ được tổ chức tháng sau."]];
 return '<div class="feedback correct semantic-feedback"><div class="feedback-title">✓ Đáp án tham khảo: '+mtEsc(answer)+'</div><section class="semantic-step"><div class="semantic-step-label"><span>1</span><div><b>Dịch nghĩa + giải thích ngữ cảnh</b></div></div><div class="semantic-prose"><p>Câu chủ động gốc: '+mtEsc(q.stem.split("\n")[0])+'</p><p>Cần chuyển sang bị động '+mtEsc(t)+' mà không đổi thời điểm, số lượng hoặc quan hệ ai thực hiện – ai nhận hành động.</p><p><b>Phân tích riêng câu này:</b> '+mtEsc(passiveNotes[q.id]||"Kiểm tra chính xác chủ ngữ mới, thì của động từ và tác nhân trong câu chủ động.")+'</p></div></section><section class="semantic-step"><div class="semantic-step-label"><span>2</span><div><b>Phân tích cấu trúc & các bước chuyển</b></div></div><p><b>Công thức:</b> '+mtEsc(formula)+'.</p><p>1. Xác định tân ngữ trong câu chủ động và đưa lên làm chủ ngữ bị động.<br>2. Giữ nguyên thời và điều chỉnh be theo chủ ngữ mới.<br>3. Đưa động từ chính về phân từ hai (V3).<br>4. Giữ trạng ngữ thời gian, thêm by + tác nhân nếu cần.</p></section><section class="semantic-step"><div class="semantic-step-label"><span>3</span><div><b>Ví dụ thực tế theo từng cấu trúc</b></div></div><div class="semantic-examples-grid">'+examples.map((ex,i)=>'<div class="semantic-example"><div class="semantic-example-title"><span>'+(i+1)+'</span><b>'+["Present Simple","Present Continuous","Past Simple","Future Simple"][i]+'</b></div><p class="example-en">'+mtEsc(ex[0])+'</p><p class="example-vi">→ '+mtEsc(ex[1])+'</p></div>').join("")+'</div></section><div class="semantic-remember"><b>Điểm cần nhớ</b><span>Thì được thể hiện bằng động từ be; hành động chính luôn dùng V3. Không bỏ dấu hiệu thời gian của câu gốc và không tự động thêm by nếu tác nhân không quan trọng.</span></div></div>';
}
function mtDeepExplanation(q,context){
 if(!window.ExplanationV1)return "";
 if(!q.options){
   // Reuse the three authored stages of the original written solution.
   // DOM extraction moves trusted, already-escaped material; it does not
   // synthesize reasons, alter scoring, or duplicate nested step numbering.
   const holder=document.createElement("div");
   holder.innerHTML=mtWrittenFeedback(q);
   const stages=[...holder.querySelectorAll(".semantic-step")];
   const stageBody=section=>{
     if(!section)return "";
     const copy=section.cloneNode(true);
     copy.querySelector(".semantic-step-label")?.remove();
     return copy.innerHTML;
   };
   const reason=stages[0]?.querySelector("p")?.textContent||"";
   return window.ExplanationV1.render({
     type:"written",answer:mtAnswerLabel(q),quickReason:reason,
     evidence:reason?[reason]:[],evidenceHtml:stageBody(stages[0]),
     analysisHtml:stageBody(stages[1]),applicationHtml:stageBody(stages[2]),
     remember:holder.querySelector(".semantic-remember span")?.textContent||"",
     needsReview:stages.length!==3,
     application:q.warning?"Lưu ý đề gốc: "+q.warning:""
   });
 }
 const detail=window.G10_MIDTERM_EXPLAIN(q,context);
 return window.ExplanationV1.render(window.ExplanationV1.midterm(q,detail))+
   (q.warning?'<div class="mt-note"><b>⚠ Lưu ý về đề gốc:</b> '+mtEsc(q.warning)+'</div>':"");
}

function mtWrittenCorrect(q,input){
 const typed=String(input||"").trim(),answer=String(q.answer||"").trim();
 if(!typed)return false;
 if(mtNormal(typed)===mtNormal(answer))return true;
 if(mtSection(q)==="Sentence Rearrangement"){
  const letters=answer.split("-").map(x=>x.trim()),parts=mtReorderParts(q);
  if(typed.length<=32&&typed.toLowerCase().replace(/[^a-g]/g,"")===letters.join(""))return true;
  const composed=letters.map(k=>parts[k]||"").join(" ");
  const normalizedTyped=mtNormal(typed),normalizedComposed=mtNormal(composed);
  return normalizedComposed.length>30&&normalizedTyped.includes(normalizedComposed);
 }
 const norm=mtNormal(typed),required=mtNormal(answer);
 return required.length>=8&&norm.includes(required);
}
function mtRender(){
 mtStyles();
 const test=mtCurrent(),q=test.questions[mtState.index],total=test.questions.length;
 const context=mtContext(test,q),checked=!!mtState.checked[q.id],input=mtState.answers[q.id]||"",section=mtSection(q);
 const answerChoices=q.options?q.options.map((v,i)=>{
  const key="ABCD"[i];return '<label class="mt-option '+(input===key?'selected':'')+'"><input type="radio" name="mtChoice" value="'+key+'" '+(input===key?'checked':'')+' '+(checked?'disabled':'')+' onchange="mtChoose(\''+key+'\')"><b>'+key+'.</b><span>'+mtEsc(v)+'</span></label>';
 }).join(""):'<label class="mt-subtle" for="mtWrittenInput">Nhập thứ tự chữ cái hoặc phần câu:</label><textarea id="mtWrittenInput" class="mt-written" '+(checked?'disabled':'')+' placeholder="Nhập đáp án của bạn…" oninput="mtType(this.value)">'+mtEsc(input)+'</textarea>';
 const result=checked?(()=>{const alt=MT_ALTERNATIVES;const acceptable=alt[q.id]||[q.answer];const invalid=MT_NO_SCORE.has(q.id);const pass=!invalid&&(q.options?acceptable.includes(input):mtWrittenCorrect(q,input));return '<div class="mt-note" style="border-color:'+(pass?'#16a34a':'#dc2626')+'"><b>'+(invalid?'⚠ Câu gốc không tính điểm':mtState.revealed[q.id]?'Đã mở lời giải':pass?'✓ Chính xác':'✕ Chưa chính xác')+'</b>'+(q.options?' · Bạn chọn '+mtEsc(input)+'.':"")+' '+(pass&&q.warning?'Có lưu ý về tính không duy nhất của đáp án.':'')+'</div>'})():"";
 const buttons='<div class="mt-controls"><button class="secondary" onclick="mtPrev()" '+(mtState.index===0?'disabled':'')+'>← Câu trước</button>'+
 (!checked?'<button class="primary" onclick="mtCheck()">Kiểm tra đáp án</button><button class="secondary" onclick="mtReveal()">Xem đáp án & lời giải</button>':'<button class="primary" onclick="'+(mtState.index+1===total?'mtResults()':'mtNext()')+'">'+(mtState.index+1===total?'Xem kết quả':'Câu tiếp theo →')+'</button>')+
 '<span class="mt-count">Câu '+(mtState.index+1)+' / '+total+'</span></div>';
 const m=mtBase();m.innerHTML='<div class="breadcrumbs"><button class="crumb-btn" onclick="goGrade(10)">Lớp 10</button><span>›</span><button class="crumb-btn" onclick="location.hash=\'grade-10/mid-term-test\'">Mid Term Test</button><span>›</span><span>'+mtEsc(test.title)+'</span></div>'+
 '<div class="unit-hero"><div class="eyebrow">Grade 10 · Mid Term Test · '+mtEsc(test.title)+'</div><h1>'+mtEsc(test.title)+'</h1>'+LearningFlow.markup({started:true,done:test.questions.filter(x=>mtState.checked[x.id]).length,total,completed:test.questions.every(x=>mtState.checked[x.id]),mode:"submit"})+'<p>Trả lời từng câu · Kiểm tra để xem lời giải.</p></div>'+mtProgress(test)+
 '<section class="mt-question"><div class="mt-badge">'+mtEsc(section)+'</div><div class="mt-stem"><b>Question '+mtEsc(q.section==="Main"?q.number:q.section+" · "+q.number)+'.</b> '+mtEsc(q.stem)+'</div>'+
 (context?'<details class="mt-passage" open><summary>Đoạn văn / ngữ cảnh gốc</summary><div class="mt-passage-text">'+mtEsc(context)+'</div></details>':"")+
 '<div class="mt-answers">'+answerChoices+'</div>'+buttons+result+(checked?mtDeepExplanation(q,context):"")+'</section>'+
 '<div class="mt-controls"><button class="secondary" onclick="mtResults()">Xem tiến độ & chọn câu</button><button class="secondary" onclick="location.hash=\'grade-10/mid-term-test\'">← Tất cả đề thi</button></div>';
 window.scrollTo({top:0,behavior:"smooth"});
}
function mtChoose(val){const q=mtCurrent().questions[mtState.index];if(mtState.checked[q.id])return;mtState.answers[q.id]=val;mtSave();document.querySelectorAll(".mt-option").forEach(x=>x.classList.toggle("selected",!!x.querySelector("input:checked")))}
function mtType(s){const q=mtCurrent().questions[mtState.index];if(!mtState.checked[q.id]){mtState.answers[q.id]=s;mtSave()}}
function mtCheck(){const q=mtCurrent().questions[mtState.index];if(!String(mtState.answers[q.id]||"").trim()){alert("Chọn hoặc nhập đáp án trước khi kiểm tra.");return}mtState.checked[q.id]=true;mtSave();mtRender();document.querySelector(".mt-note")?.scrollIntoView({behavior:"smooth",block:"center"})}
function mtReveal(){const q=mtCurrent().questions[mtState.index];mtState.revealed[q.id]=true;mtState.checked[q.id]=true;mtSave();mtRender();document.querySelector(".semantic-feedback")?.scrollIntoView({behavior:"smooth",block:"start"})}
function mtPrev(){if(mtState.index>0){mtState.index--;mtSave();mtRender()}}
function mtNext(){if(mtState.index+1<mtCurrent().questions.length){mtState.index++;mtSave();mtRender()}else mtResults()}
function mtJump(i){mtState.index=Math.max(0,Math.min(mtCurrent().questions.length-1,Number(i)||0));mtSave();mtRender()}
function mtResults(){
 const test=mtCurrent();if(!test)return;
 const done=test.questions.filter(q=>mtState.checked[q.id]).length;const alt=MT_ALTERNATIVES;
 const scored=test.questions.map(q=>{const input=mtState.answers[q.id]||"";return {q,checked:!!mtState.checked[q.id],right:!MT_NO_SCORE.has(q.id)&&!mtState.revealed[q.id]&&!!mtState.checked[q.id]&&(q.options?(alt[q.id]||[q.answer]).includes(input):mtWrittenCorrect(q,input))}}),right=scored.filter(x=>x.right).length;
 if(done===test.questions.length&&!mtState.recorded){
   mtState.recorded=true;mtSave();
   const eligible=test.questions.filter(q=>!MT_NO_SCORE.has(q.id)).length;
   LearningCore.submitPractice({
     category:"exam",slug:mtKey(test.id),correct:right,total:eligible,
     duration:Math.max(0,Math.round((Date.now()-mtState.startedAt)/1000)),
     submissionId:mtState.submissionId,details:{checked:done,sourceQuestions:test.questions.length}
   }).catch(e=>console.warn("Mid-term exam result queued for retry",e));
 }
 const m=mtBase();m.innerHTML='<div class="breadcrumbs"><button class="crumb-btn" onclick="goGrade(10)">Lớp 10</button><span>›</span><button class="crumb-btn" onclick="location.hash=\'grade-10/mid-term-test\'">Mid Term Test</button><span>›</span><span>'+mtEsc(test.title)+'</span></div><div class="unit-hero"><div class="eyebrow">Mid Term Test · '+mtEsc(test.title)+'</div><h1>Tiến độ làm bài</h1>'+LearningFlow.markup({started:true,done,total:test.questions.length,completed:done===test.questions.length,mode:"submit"})+'<p class="mt-score">'+right+'/'+(test.questions.length-test.questions.filter(q=>MT_NO_SCORE.has(q.id)).length)+' câu khớp đáp án tham khảo · Đã kiểm tra '+done+'/'+test.questions.length+'</p><p class="mt-subtle">Có ghi chú đáp án thay thế · Kết quả chỉ để tự đánh giá.</p></div><div class="mt-review-grid">'+scored.map((x,i)=>'<button class="'+(x.checked?(x.right?'completed':'missed'):'')+'" onclick="mtJump('+i+')">'+(x.q.section==="Main"?x.q.number:x.q.section.slice(-1)+"-"+x.q.number)+'</button>').join("")+'</div><div class="mt-controls"><button class="primary" onclick="mtJump('+Math.min(mtState.index,test.questions.length-1)+')">Tiếp tục xem lời giải</button><button class="secondary" onclick="location.hash=\'grade-10/mid-term-test\'">Quay lại các đề</button></div>';
 window.scrollTo({top:0,behavior:"smooth"});
}

window.getUniversalMidtermPrintData=function(){
 const route=location.hash.replace(/^#/,""),m=route.match(/^grade-10\/mid-term-test\/test-([3-6])$/);
 if(!m||!Array.isArray(mtState.tests))return null;
 const test=mtState.tests.find(t=>t.id===Number(m[1]));if(!test)return null;
 const groups=[],sections=new Map();
 for(const q of test.questions){
  const key=String(q.section||"Main");
  if(!sections.has(key)){const group={label:key,questions:[]};sections.set(key,group);groups.push(group);}
  const context=mtContext(test,q);
  const possible=MT_ALTERNATIVES[q.id];
  const warnings=[q.warning||"",possible?.length>1?"Đề gốc có nhiều phương án chấp nhận được: "+possible.join(", "):"",
    MT_NO_SCORE.has(q.id)?"Câu này không tính điểm do lỗi/độ mơ hồ của đề gốc.":""].filter(Boolean);
  const detailHtml=mtDeepExplanation(q,context)+warnings.map(w=>'<div class="mt-note">'+mtEsc(w)+'</div>').join("");
  const label=q.section==="Main"?String(q.number):q.section+" · "+q.number;
  sections.get(key).questions.push({number:label,prompt:q.stem,
   context,options:q.options||[],answer:mtAnswerLabel(q),
   shortAnswer:MT_NO_SCORE.has(q.id)?"Không chấm":possible?.length>1?possible.join("/"):q.answer,
   detailHtml});
 }
 return {title:"Lớp 10 · "+test.title,groups};
};

window.renderG10MidTermHome=mtHome;
window.renderG10MidTermTest=mtOpenTest;
