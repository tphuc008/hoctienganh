
/* Robots and Us — Grade 12 IELTS Reading (14 items, 25 minutes).
   Standalone, framework-free module. All correct answers/reviews are revealed only on submit. */
(function(){
"use strict";
const PATH="grade-12/reading/robots-and-us";
const STORE="grade12-robots-reading-v1";
const LIMIT=25*60;
const PASSAGE=[
"Robots are increasingly being sent into places where people cannot easily work. Deep-sea vehicles map the ocean floor, while wheeled machines inspect damaged buildings after earthquakes. These systems do not need to replace people entirely; their value often lies in collecting evidence from locations that are dangerous, remote or simply too expensive for humans to visit regularly.",
"Space exploration offers another example. A robotic probe can travel for years, operate with limited instructions and transmit measurements across enormous distances. Sending people would provide direct observation and the ability to respond creatively, but it would also require life-support systems and a safe return journey. Engineers therefore choose between human and robotic missions according to the purpose, risks and cost of each project.",
"Some researchers argue that the next major challenge is not making machines stronger, but helping them interpret unfamiliar situations. A robot may follow a route perfectly in a laboratory yet struggle when a corridor is crowded or a floor is covered with unexpected debris. Human beings use context and experience to adapt quickly; machines generally depend on training data, sensors and rules that may not cover every possible event.",
"Progress in machine learning has nevertheless changed what automated systems can accomplish. Software can identify patterns in huge collections of images, and robotic arms can sort objects at high speed. These abilities are useful in factories and hospitals, where repetitive work can be physically demanding. However, success in one controlled task does not automatically mean a system can make reliable decisions in a different setting.",
"Public concern about robots often reflects more than their technical capabilities. People may imagine a machine as having intentions because it speaks, moves or resembles a human. This tendency can make a device seem more independent than it really is. At the same time, concerns should not be dismissed: poorly tested systems can cause harm, especially when people rely on their output without checking it.",
"Responsibility is therefore shared across several groups. Designers must test machines under realistic conditions and make their limits clear. Organisations that buy automated equipment need procedures for supervision and maintenance, while public authorities may have to establish standards for high-risk uses. Blaming a machine alone can hide the human choices that shaped its behaviour and the environment in which it was deployed.",
"Automation can also raise questions about work. Machines may reduce the time needed for dangerous or monotonous tasks, but workers can be displaced if employers introduce new systems without training or consultation. The overall effect depends on how technology is introduced: some roles disappear, others change, and new jobs may emerge in maintenance, data analysis and system oversight.",
"Stories about intelligent machines can help society explore these possibilities, but fiction is not a reliable forecast. A dramatic story may focus on a machine acting alone, whereas real outcomes usually depend on institutions, incentives and human decisions. A more useful debate asks not simply whether robots will become powerful, but which tasks should be delegated to them, who remains accountable and how benefits can be shared fairly."
];
const Q=[
{id:27,type:"match",question:"An example of machines gathering information from places hazardous to people",answer:"A",p:0,quote:"inspect damaged buildings after earthquakes",why:"Đoạn A nêu các robot được đưa vào những nơi nguy hiểm hoặc khó tiếp cận, chẳng hạn kiểm tra các tòa nhà bị hư hại sau động đất.",paraphrase:"hazardous places ↔ dangerous locations; gathering information ↔ collecting evidence",trap:"Đoạn B nói về thám hiểm không gian, nhưng ví dụ về tòa nhà sau động đất nằm ở A."},
{id:28,type:"match",question:"Why a robotic mission may be selected instead of sending people",answer:"B",p:1,quote:"according to the purpose, risks and cost of each project",why:"Đoạn B cho biết lựa chọn phụ thuộc vào mục tiêu, rủi ro và chi phí của nhiệm vụ.",paraphrase:"may be selected ↔ engineers choose between; purpose, risks and cost ↔ project considerations",trap:"Bài không khẳng định robot luôn tốt hơn con người trong mọi nhiệm vụ."},
{id:29,type:"match",question:"A limitation that appears when a machine faces an unfamiliar environment",answer:"C",p:2,quote:"struggle when a corridor is crowded or a floor is covered with unexpected debris",why:"Đoạn C đối chiếu việc robot hoạt động tốt trong phòng thí nghiệm với khó khăn khi môi trường thay đổi bất ngờ.",paraphrase:"unfamiliar environment ↔ unexpected debris or a crowded corridor",trap:"Đoạn D nói về thành tựu của machine learning, không phải hạn chế trong môi trường lạ."},
{id:30,type:"match",question:"The need for people to remain responsible for automated systems",answer:"F",p:5,quote:"Responsibility is therefore shared across several groups.",why:"Đoạn F phân chia trách nhiệm cho nhà thiết kế, tổ chức sử dụng và cơ quan quản lý.",paraphrase:"people remain responsible ↔ responsibility is shared across groups",trap:"Đừng hiểu rằng tác giả chỉ muốn đổ lỗi cho nhà sản xuất."},
{id:31,type:"match",question:"A warning that technological change can affect employment in different ways",answer:"G",p:6,quote:"some roles disappear, others change, and new jobs may emerge",why:"Đoạn G nhấn mạnh tác động đến việc làm không chỉ theo một chiều: một số công việc mất đi, một số thay đổi và công việc mới có thể xuất hiện.",paraphrase:"affect employment in different ways ↔ roles disappear, change or emerge",trap:"Đoạn này không khẳng định tổng số việc làm chắc chắn tăng hoặc giảm."},
{id:32,type:"ynng",question:"Robotic probes can operate for long periods without a person travelling with them.",answer:"YES",p:1,quote:"A robotic probe can travel for years",why:"Bài đọc trực tiếp cho biết một thiết bị thăm dò robot có thể di chuyển trong nhiều năm và truyền dữ liệu từ xa.",paraphrase:"long periods ↔ for years",trap:"Không nhầm với khả năng con người quan sát trực tiếp."},
{id:33,type:"ynng",question:"A robot that succeeds in a laboratory will perform equally well in every real-world setting.",answer:"NO",p:2,quote:"may follow a route perfectly in a laboratory yet struggle when a corridor is crowded",why:"Đoạn C đưa ra đối lập trực tiếp: robot có thể làm tốt trong phòng thí nghiệm nhưng gặp khó khăn khi điều kiện thay đổi.",paraphrase:"equally well in every setting ↔ contrast between laboratory and unfamiliar conditions",trap:"Đây là NO vì bài đọc phủ định rõ, không phải NOT GIVEN."},
{id:34,type:"ynng",question:"The passage says that concerns about robot safety should always be ignored.",answer:"NO",p:4,quote:"concerns should not be dismissed",why:"Đoạn E nói rõ không nên gạt bỏ lo ngại, bởi hệ thống chưa được kiểm thử đầy đủ có thể gây hại.",paraphrase:"should always be ignored ↔ concerns should not be dismissed",trap:"Từ “always” khiến phát biểu trái với quan điểm trong bài."},
{id:35,type:"ynng",question:"The passage provides evidence that automation has already created more jobs than it has removed.",answer:"NOT GIVEN",p:6,quote:"some roles disappear, others change, and new jobs may emerge",why:"Đoạn G nêu nhiều khả năng nhưng không so sánh số lượng việc làm mới với việc làm bị mất. Vì vậy không thể kết luận bên nào nhiều hơn.",paraphrase:"more jobs than it has removed ↔ no numerical comparison is provided",trap:"Không chọn YES chỉ vì bài nhắc đến việc làm mới."},
{id:36,type:"ynng",question:"The writer suggests that human-like behaviour can influence how people judge robots, although real safety risks also exist.",answer:"YES",p:4,quote:"people may imagine a machine as having intentions ... concerns should not be dismissed",why:"Đoạn E vừa giải thích xu hướng gán ý định của con người cho máy móc, vừa thừa nhận rủi ro thực tế từ các hệ thống chưa được kiểm thử tốt.",paraphrase:"human-like behaviour affects perception; concerns should not be dismissed",trap:"Tác giả không nói mọi nỗi lo đều vô căn cứ."},
{id:37,type:"ynng",question:"Blaming a robot alone may hide the decisions made by people who designed and deployed it.",answer:"YES",p:5,quote:"can hide the human choices that shaped its behaviour",why:"Đoạn F cho rằng đổ lỗi cho máy móc có thể che giấu lựa chọn của con người đã định hình hành vi và môi trường triển khai hệ thống.",paraphrase:"blaming a robot alone ↔ hide the human choices",trap:"Trách nhiệm được chia sẻ giữa nhiều nhóm, không chỉ máy móc."},
{id:38,type:"ynng",question:"The writer considers science fiction a dependable way to predict when new technologies will appear.",answer:"NO",p:7,quote:"fiction is not a reliable forecast",why:"Đoạn H nói rõ hư cấu không phải là dự báo đáng tin cậy, nên nhận định trong câu hỏi trái với bài đọc.",paraphrase:"dependable prediction ↔ reliable forecast",trap:"Khoa học viễn tưởng vẫn có thể kích thích thảo luận dù không dự báo chính xác."},
{id:39,type:"input",question:"Designers must test machines under ... conditions.",answer:"realistic",p:5,quote:"test machines under realistic conditions",why:"Câu hỏi yêu cầu một từ. Đoạn F nêu trực tiếp rằng nhà thiết kế phải kiểm thử máy móc trong điều kiện thực tế.",paraphrase:"under ... conditions ↔ under realistic conditions",trap:"Không điền “high-risk”: cụm đó mô tả các ứng dụng cần tiêu chuẩn, không phải điều kiện kiểm thử."},
{id:40,type:"input",question:"New roles may include maintenance, data analysis and system ...",answer:"oversight",p:6,quote:"maintenance, data analysis and system oversight",why:"Đoạn G liệt kê ba lĩnh vực việc làm có thể phát triển; từ cuối cùng là “oversight”, nghĩa là giám sát.",paraphrase:"new roles may include ↔ new jobs may emerge in",trap:"Đáp án phải là một từ theo giới hạn câu hỏi."}
];
let state=null;
let timer=null;
let selection=null;
function el(id){return document.getElementById(id)}
function html(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function read(){try{return JSON.parse(sessionStorage.getItem(STORE)||"null")}catch(e){return null}}
function save(){try{sessionStorage.setItem(STORE,JSON.stringify(state))}catch(e){}}
function cleaned(s){return String(s||"").trim().replace(/\s+/g," ").toLowerCase()}
function correct(q){return cleaned(state.answers[q.id])===cleaned(q.answer)}
function answered(q){return !!cleaned(state.answers[q.id])}
function mmss(sec){sec=Math.max(0,Math.floor(sec));return String(Math.floor(sec/60)).padStart(2,"0")+":"+String(sec%60).padStart(2,"0")}
function remaining(){return Math.max(0,Math.ceil((state.startedAt+LIMIT*1000-Date.now())/1000))}
function completed(){return Q.filter(answered).length}
function score(){return Q.filter(correct).length}
function stopTimer(){if(timer!==null){clearInterval(timer);timer=null}}
function tick(){
 if(!state||!el("mis-clock"))return;
 const seconds=remaining();
 el("mis-clock").textContent=state.submitted?mmss((state.submittedAt-state.startedAt)/1000):mmss(seconds);
 el("mis-clock").classList.toggle("warning",!state.submitted&&seconds<=120);
 if(seconds<=0&&!state.submitted)submit(true);
}
function newSubmissionId(){
 if(window.crypto&&typeof window.crypto.randomUUID==="function")return window.crypto.randomUUID();
 return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(ch){
  const r=Math.floor(Math.random()*16);
  return (ch==="x"?r:(r&3|8)).toString(16);
 });
}
function fresh(){
 return {startedAt:Date.now(),submitted:false,submittedAt:null,answers:{},focus:27,highlights:[],mobileTab:"reading",split:52,submissionId:newSubmissionId()};
}
function exitPage(){
 if(state&&!state.submitted&&!window.confirm("Bạn muốn thoát bài đang làm? Tiến độ và thời gian sẽ vẫn được lưu trong tab này."))return;
 location.hash="grade-12/reading";
}
function start(reset){
 const old=read();
 if(reset&&old&&!old.submitted&&!window.confirm("Làm lại từ đầu? Câu trả lời đã nhập và thời gian hiện tại sẽ bị xóa."))return;
 state=reset||!old?fresh():old;
 // A previous page may have closed while the network request was in flight.
 // Re-enable the idempotent save attempt when reopening an unsaved submission.
 if(state.submitted&&!state.savedToSupabase)state.savingToSupabase=false;
 save();renderReader();
}
function continueReading(){start(false)}
function resetReading(){start(true)}
function switchTab(tab){
 if(!el("mis-app"))return;
 state.mobileTab=tab==="reading"?"reading":"questions";
 el("mis-app").dataset.tab=state.mobileTab;
 document.querySelectorAll(".mis-mobile-switch button").forEach(function(btn){btn.classList.toggle("active",btn.dataset.tab===state.mobileTab)});
 save();
}
function markText(text,p){
 const marks=[];
 (state.highlights||[]).filter(function(x){return x.p===p}).forEach(function(x){
  let pos=text.indexOf(x.text);
  if(pos>=0)marks.push({start:pos,end:pos+x.text.length,kind:"user"});
 });
 if(state.submitted){
  const q=Q.find(function(x){return x.id===Number(state.focus)});
  if(q&&q.p===p){let pos=text.indexOf(q.quote);if(pos>=0)marks.push({start:pos,end:pos+q.quote.length,kind:"evidence"})}
 }
 marks.sort(function(a,b){return a.start-b.start||(a.kind==="evidence"?-1:1)});
 let result="",pos=0;
 marks.forEach(function(m){
  if(m.start<pos)return;
  result+=html(text.slice(pos,m.start));
  result+='<mark class="'+(m.kind==="evidence"?"mis-evidence":"")+'">'+html(text.slice(m.start,m.end))+"</mark>";
  pos=m.end;
 });
 return result+html(text.slice(pos));
}
function passageHTML(){
 return '<div class="mis-kicker">IELTS Academic Reading · Passage 3</div><h1 class="mis-passage-title">Robots and Us</h1>'+
 '<div class="mis-passage-sub">Reading Passage · Paragraphs A–H</div>'+
 '<div class="mis-reading-tools"><button type="button" onclick="robotsHighlight()">✎ Highlight</button><button type="button" onclick="robotsDictionary()">⚑ Tra từ (Cambridge)</button></div>'+
 '<div class="mis-selection-status" id="mis-selection-status">Chọn một đoạn chữ, sau đó nhấn Highlight hoặc Tra từ.</div>'+
 PASSAGE.map(function(p,i){return '<p class="mis-paragraph'+(state.submitted&&Q.some(function(q){return q.id===Number(state.focus)&&q.p===i})?" mis-current-para":"")+'" id="mis-p-'+i+'" data-p="'+i+'"><strong>'+String.fromCharCode(65+i)+'.</strong> '+markText(p,i)+'</p>'}).join("");
}
function optionsHTML(q){
 const opts=q.type==="match"?["A","B","C","D","E","F","G","H"]:["YES","NO","NOT GIVEN"];
 return '<div class="mis-options" role="group" aria-label="Câu '+q.id+'">'+opts.map(function(o){
  const picked=cleaned(state.answers[q.id])===cleaned(o);
  const solution=state.submitted&&o===q.answer;
  const wrong=state.submitted&&picked&&!solution;
  return '<button type="button" class="mis-option'+(solution?" mis-answer-correct":"")+(wrong?" mis-answer-wrong":"")+'" data-option="'+html(o)+'" aria-pressed="'+picked+'" '+(state.submitted?'disabled ':'')+'onclick="robotsSetChoice('+q.id+',\''+o+'\')">'+html(o)+'</button>';
 }).join("")+"</div>";
}
function reviewHTML(q){
 if(!state.submitted)return "";
 return '<div class="mis-review'+(correct(q)?"":" wrong")+'"><h3>'+(correct(q)?"✓ Chính xác":"✕ Chưa chính xác")+' · Đáp án: '+html(q.answer)+'</h3>'+
 '<div><strong>Bạn chọn:</strong> '+html(answered(q)?state.answers[q.id]:"(chưa trả lời)")+'</div>'+
 '<blockquote>Đoạn '+String.fromCharCode(65+q.p)+': “'+html(q.quote)+'”</blockquote>'+
 '<div><strong>Giải thích:</strong> '+html(q.why)+'</div>'+
 '<div class="mis-paraphrase"><strong>Paraphrase / Logic:</strong> '+html(q.paraphrase)+'</div>'+
 '<div><strong>Điểm dễ nhầm:</strong> '+html(q.trap)+'</div>'+
 '<button type="button" class="mis-tool" style="margin-top:9px" onclick="robotsGoQuestion('+q.id+')">↖ Tô sáng dẫn chứng trong bài đọc</button></div>';
}
function questionHTML(q){
 return '<article class="mis-q-card'+(Number(state.focus)===q.id?" mis-focus":"")+'" id="mis-q-'+q.id+'">'+
 '<p class="mis-question-text"><span class="mis-num">'+q.id+'</span> '+html(q.question)+'</p>'+
 optionsHTML(q)+reviewHTML(q)+'</article>';
}
function inputHTML(q){
 let v=state.answers[q.id]||"";
 return '<div class="mis-q-card'+(Number(state.focus)===q.id?" mis-focus":"")+'" id="mis-q-'+q.id+'">'+
 '<p class="mis-question-text"><span class="mis-num">'+q.id+'</span> '+html(q.question)+'</p>'+
 '<div class="mis-flow-row"><label for="mis-in-'+q.id+'">Answer</label><input id="mis-in-'+q.id+'" class="mis-input" maxlength="60" autocomplete="off" spellcheck="false" placeholder="NO MORE THAN TWO WORDS" value="'+html(v)+'" '+(state.submitted?"disabled":"")+' oninput="robotsSetInput('+q.id+',this.value)" /></div>'+
 reviewHTML(q)+'</div>';
}
function diagramHTML(){
 return '<div class="mis-q-instruction">Complete each sentence below using NO MORE THAN TWO WORDS from the passage.</div>';
}
function questionsHTML(){
 const resultHead=state.submitted?
 '<div class="mis-results-banner"><strong>'+score()+'/14 câu đúng</strong><div>Thời gian làm bài: '+mmss((state.submittedAt-state.startedAt)/1000)+' · Nhấn vào số câu ở thanh dưới để xem bằng chứng và lời giải.</div></div>':"";
 const matching=Q.filter(function(q){return q.type==="match"}).map(questionHTML).join("");
 const ynng=Q.filter(function(q){return q.type==="ynng"}).map(questionHTML).join("");
 const blanks=Q.filter(function(q){return q.type==="input"}).map(inputHTML).join("");
 return resultHead+
 '<section class="mis-q-section"><h2>Questions 27–31</h2><p class="mis-q-instruction"><strong>Matching Information.</strong> Which paragraph A–H contains each piece of information? Choose the correct letter.</p>'+matching+'</section>'+
 '<section class="mis-q-section"><h2>Questions 32–38</h2><p class="mis-q-instruction"><strong>YES / NO / NOT GIVEN.</strong> YES: agrees with the passage; NO: contradicts it; NOT GIVEN: no information.</p>'+ynng+'</section>'+
 '<section class="mis-q-section"><h2>Questions 39–40</h2><p class="mis-q-instruction"><strong>Sentence Completion.</strong> Complete each sentence using <strong>NO MORE THAN TWO WORDS</strong> from the passage.</p>'<div class="mis-flow-fields">'+blanks+'</div></section>';
}
function navHTML(){
 return Q.map(function(q){return '<button id="mis-nav-'+q.id+'" type="button" class="mis-jump" onclick="robotsGoQuestion('+q.id+')" aria-label="Đến câu '+q.id+'">'+q.id+'</button>'}).join("");
}
function ensureMISRoot(){
 let root=el("mis-reading-root");
 if(!root){
  root=document.createElement("div");
  root.id="mis-reading-root";
  document.body.appendChild(root);
 }
 return root;
}
function renderReader(){
 stopTimer();selection=null;document.body.classList.add("mis-reading-mode");
 const page=el("pageMount");if(page)page.style.display="none";
 const mount=ensureMISRoot();
 mount.innerHTML='<div id="mis-app" class="mis-app" data-tab="'+html(state.mobileTab||"questions")+'">'+
 '<header class="mis-topbar"><div class="mis-top-left"><button class="mis-exit" aria-label="Thoát bài Reading" onclick="robotsExit()">×</button><div><div class="mis-title">Robots and Us</div><div class="mis-subtitle">IELTS Academic Reading · Passage 3 · Questions 27–40</div></div></div>'+
 '<div class="mis-top-mid"><span class="mis-clock" id="mis-clock">25:00</span><span class="mis-score-mini" id="mis-status"></span><span class="mis-save-status" id="mis-save-status" role="status"></span></div>'+
 '<div class="mis-top-actions">'+
 (state.submitted?'<button type="button" class="mis-submit" onclick="robotsReset()">Làm bài khác ↻</button><button type="button" class="mis-save-retry" id="mis-save-retry" onclick="robotsSaveSubmission()" hidden>Lưu lại</button>':'<button type="button" class="mis-submit" onclick="robotsSubmit(false)">Nộp bài →</button>')+
 '</div></header>'+
 '<div class="mis-mobile-switch"><button type="button" data-tab="reading" class="'+((state.mobileTab||"questions")==="reading"?"active":"")+'" onclick="robotsSwitchTab(\'reading\')">Bài đọc</button><button type="button" data-tab="questions" class="'+((state.mobileTab||"questions")==="questions"?"active":"")+'" onclick="robotsSwitchTab(\'questions\')">Câu hỏi</button></div>'+
 '<div class="mis-workspace" id="mis-layout" style="grid-template-columns:minmax(320px,'+Number(state.split||52)+'fr) 8px minmax(320px,'+(100-Number(state.split||52))+'fr)">'+
 '<div class="mis-left" id="mis-passage-pane">'+passageHTML()+'</div><div class="mis-divider" id="mis-divider" title="Kéo để điều chỉnh độ rộng hai cột" role="separator" aria-orientation="vertical"></div>'+
 '<div class="mis-right" id="mis-question-pane">'+questionsHTML()+'</div></div>'+
 '<footer class="mis-bottom"><div class="mis-progress-grid" aria-label="Điều hướng câu hỏi">'+navHTML()+'</div><div class="mis-bottom-actions">'+
 (state.submitted?'<button type="button" class="mis-footer-btn" onclick="robotsReset()">Làm lại bài</button>':'<button type="button" class="mis-footer-btn" onclick="robotsSubmit(false)">Nộp bài</button>')+
 '</div></footer></div>';
 const passage=el("mis-passage-pane");
 passage.addEventListener("mouseup",captureSelection);
 passage.addEventListener("keyup",captureSelection);
 setupDivider();
 updateProgress();
 tick();
 if(state.submitted){
  if(state.savedToSupabase)setSaveStatus("Đã lưu lên Supabase ✓",false);
  else if(state.saveError)setSaveStatus("Chưa lưu kết quả. Hãy bấm Lưu lại.",true);
  else if(!state.savingToSupabase)persistSubmission();
 }
 if(!state.submitted)timer=setInterval(tick,600);
}
function updateProgress(){
 if(!el("mis-app"))return;
 Q.forEach(function(q){
  const n=el("mis-nav-"+q.id);if(!n)return;
  n.className="mis-jump"+(state.submitted?(correct(q)?" right":" wrong"):(answered(q)?" done":""))+(q.id===Number(state.focus)?" focused":"");
 });
 if(el("mis-status"))el("mis-status").innerHTML=state.submitted?'<strong>'+score()+'/14</strong> câu đúng':'<strong>'+completed()+'/14</strong> đã làm';
}
function setChoice(id,value){
 if(!state||state.submitted)return;
 state.answers[id]=value;state.focus=id;save();
 const card=el("mis-q-"+id);
 if(card){card.querySelectorAll(".mis-option").forEach(function(btn){const on=btn.dataset.option===value;btn.setAttribute("aria-pressed",String(on))});}
 updateProgress();
}
function setInput(id,value){
 if(!state||state.submitted)return;
 const input=el("mis-in-"+id);
 if(cleaned(value).split(" ").filter(Boolean).length>2){if(input)input.classList.add("error")}else if(input)input.classList.remove("error");
 state.answers[id]=value;state.focus=id;save();updateProgress();
}
function submit(automatic){
 if(!state||state.submitted)return;
 const invalid=Q.filter(function(q){return q.type==="input"&&answered(q)&&cleaned(state.answers[q.id]).split(" ").length>2});
 if(invalid.length&&!automatic){window.alert("Câu "+invalid.map(function(q){return q.id}).join(", ")+" vượt quá TWO WORDS. Vui lòng sửa đáp án trước khi nộp.");return}
 const missing=14-completed();
 if(!automatic&&!window.confirm("Nộp bài ngay? "+(missing?"Bạn còn "+missing+" câu chưa trả lời. ":"")+"Đáp án và giải thích sẽ hiện sau khi nộp."))return;
 state.submitted=true;state.submittedAt=automatic?state.startedAt+LIMIT*1000:Date.now();state.focus=27;state.submissionType=automatic?"timeout":"manual";save();
 renderReader();
 const qp=el("mis-question-pane");if(qp)qp.scrollTop=0;
 persistSubmission();
}
const ROBOTS_SUPABASE_URL="https://ouicitkpfukterkilqzu.supabase.co";
const ROBOTS_SUPABASE_KEY="sb_publishable_JI7CbbcaNM_3NJOr81qODg_yemK8QJ2";
const ROBOTS_LEARNER_AUTH_KEY="hoctienganh_learner_auth_v1";
function learnerAuthForReading(){
 try{return JSON.parse(localStorage.getItem(ROBOTS_LEARNER_AUTH_KEY)||"null")}catch(_){return null}
}
function setSaveStatus(message,isError){
 const status=el("mis-save-status"),retry=el("mis-save-retry");
 if(status){status.textContent=message;status.classList.toggle("error",!!isError);status.classList.toggle("success",!isError&&!!message)}
 if(retry)retry.hidden=!isError;
}
async function persistSubmission(){
 if(!state||!state.submitted||state.savedToSupabase||state.savingToSupabase)return;
 state.savingToSupabase=true;save();
 setSaveStatus("Đang lưu kết quả…",false);
 const session=learnerAuthForReading();
 if(!session?.access_token||!session?.user?.id){
  state.savingToSupabase=false;state.saveError="Không tìm thấy phiên đăng nhập.";
  save();setSaveStatus("Chưa lưu: vui lòng đăng nhập lại rồi bấm Lưu lại.",true);return;
 }
 const meta=session.user.user_metadata||{};
 const duration=Math.max(1,Math.min(LIMIT,Math.round(((state.submittedAt||Date.now())-state.startedAt)/1000)));
 const answers={};
 Q.forEach(function(q){
  answers[String(q.id)]={answer:state.answers[q.id]??"",correct_answer:q.answer,is_correct:correct(q),question_type:q.type};
 });
 const payload={
  submission_id:state.submissionId||(state.submissionId=newSubmissionId()),
  user_id:session.user.id,
  username:String(meta.username||"").slice(0,24),
  display_name:String(meta.display_name||meta.username||"Học viên").slice(0,40),
  exercise_slug:PATH,
  exercise_title:"Robots and Us",
  score:score(),
  total_questions:Q.length,
  answers,
  duration_seconds:duration,
  submission_type:state.submissionType==="timeout"?"timeout":"manual",
  started_at:new Date(state.startedAt).toISOString(),
  submitted_at:new Date(state.submittedAt||Date.now()).toISOString()
 };
 try{
  const response=await fetch(ROBOTS_SUPABASE_URL+"/rest/v1/reading_submissions?on_conflict=submission_id",{
   method:"POST",
   headers:{
    "apikey":ROBOTS_SUPABASE_KEY,
    "Authorization":"Bearer "+session.access_token,
    "Content-Type":"application/json",
    "Prefer":"resolution=ignore-duplicates,return=minimal"
   },
   body:JSON.stringify(payload)
  });
  if(!response.ok){
   const details=await response.text().catch(()=> "");
   throw new Error("HTTP "+response.status+(details?" · "+details.slice(0,180):""));
  }
  state.savedToSupabase=true;state.savingToSupabase=false;state.saveError="";
  save();setSaveStatus("Đã lưu lên Supabase ✓",false);
 }catch(error){
  state.savingToSupabase=false;state.saveError=String(error?.message||"Lỗi kết nối");
  save();setSaveStatus("Chưa lưu kết quả. Hãy bấm Lưu lại.",true);
  console.error("[Reading] Supabase save failed:",error);
 }
}

function goQuestion(id){
 if(!state||!Q.some(function(q){return q.id===Number(id)}))return;
 state.focus=Number(id);save();
 if(el("mis-app")&&window.innerWidth<=730)switchTab("questions");
 document.querySelectorAll(".mis-q-card").forEach(function(card){card.classList.toggle("mis-focus",card.id==="mis-q-"+id)});
 const card=el("mis-q-"+id);if(card)card.scrollIntoView({behavior:"smooth",block:"start"});
 updateProgress();
 if(state.submitted){
  const left=el("mis-passage-pane");const top=left?left.scrollTop:0;
  if(left)left.innerHTML=passageHTML();
  const next=el("mis-p-"+Q.find(function(q){return q.id===Number(id)}).p);
  if(next)next.scrollIntoView({behavior:"smooth",block:"center"});
  if(left){left.addEventListener("mouseup",captureSelection);left.addEventListener("keyup",captureSelection)}
 }
}
function captureSelection(){
 const sel=window.getSelection();
 const txt=sel&&String(sel.toString()).trim();
 const node=sel&&sel.anchorNode;
 const para=node&&(node.nodeType===1?node:node.parentElement)?.closest?.(".mis-paragraph");
 if(txt&&txt.length<=500&&para){
  selection={p:Number(para.dataset.p),text:txt};
  if(el("mis-selection-status"))el("mis-selection-status").textContent="Đã chọn: “"+txt.slice(0,75)+(txt.length>75?"…":"")+"”";
 }
}
function highlight(){
 if(!selection){window.alert("Hãy bôi đen một cụm trong passage trước khi nhấn Highlight.");return}
 const p=PASSAGE[selection.p];if(!p||!p.includes(selection.text)){window.alert("Hãy chọn chữ nằm trong một đoạn văn.");return}
 if(!(state.highlights||[]).some(function(x){return x.p===selection.p&&x.text===selection.text})){
  state.highlights.push(selection);save();
 }
 const left=el("mis-passage-pane");const scroll=left.scrollTop;
 left.innerHTML=passageHTML();left.scrollTop=scroll;
 left.addEventListener("mouseup",captureSelection);left.addEventListener("keyup",captureSelection);
}
function dictionary(){
 if(!selection||!selection.text){window.alert("Hãy chọn một từ hoặc cụm từ tiếng Anh trong passage.");return}
 const term=selection.text.trim().split(/\s+/).slice(0,5).join(" ");
 window.open("https://dictionary.cambridge.org/dictionary/english/"+encodeURIComponent(term),"_blank","noopener,noreferrer");
}
function setupDivider(){
 const handle=el("mis-divider"),layout=el("mis-layout");
 if(!handle||!layout)return;
 handle.addEventListener("pointerdown",function(e){
  if(window.innerWidth<=730)return;
  e.preventDefault();handle.setPointerCapture(e.pointerId);
  const onMove=function(ev){
   if(!handle.hasPointerCapture(ev.pointerId))return;
   const rect=layout.getBoundingClientRect();
   const ratio=Math.max(32,Math.min(68,Math.round((ev.clientX-rect.left)/rect.width*100)));
   state.split=ratio;
   layout.style.gridTemplateColumns="minmax(320px,"+ratio+"fr) 8px minmax(320px,"+(100-ratio)+"fr)";
  };
  const onUp=function(ev){save();handle.removeEventListener("pointermove",onMove);handle.removeEventListener("pointerup",onUp);handle.removeEventListener("pointercancel",onUp)};
  handle.addEventListener("pointermove",onMove);handle.addEventListener("pointerup",onUp);handle.addEventListener("pointercancel",onUp);
 });
}
function landing(){
 stopTimer();document.body.classList.remove("mis-reading-mode");
 const old=read();
 const mount=el("pageMount");mount.style.display="block";
 mount.innerHTML='<div class="breadcrumbs"><button class="crumb-btn" onclick="goAreaHome()">Home</button><span>›</span><button class="crumb-btn" onclick="goGrade(12)">Lớp 12</button><span>›</span><span>Reading</span></div>'+
 '<div class="unit-hero"><div class="eyebrow">Grade 12 · IELTS Reading</div><h1>Reading</h1><p>Luyện tập Reading theo dạng bài IELTS Academic, chấm điểm và giải thích tiếng Việt sau khi nộp.</p></div>'+
 '<div class="section-title"><h2>Reading Passages</h2><span>2 bài đọc</span></div>'+
 '<div class="exercise-grid"><button class="exercise-card" onclick="location.hash=\'grade-12/reading/marketing-and-the-information-age\'"><div class="exercise-icon">📖</div><h3>Marketing and the Information Age</h3><p>Passage 3 · Matching Information · YES/NO/NOT GIVEN · Flow-chart Completion</p><div class="meta"><span class="chip">25 phút</span><span class="chip">14 câu (27–40)</span></div></button>'+
 '<button class="exercise-card" onclick="location.hash=\''+PATH+'\'"><div class="exercise-icon">🤖</div><h3>Robots and Us</h3><p>Passage 3 · Matching Information · YES/NO/NOT GIVEN · Multiple Choice · Completion</p><div class="meta"><span class="chip">25 phút</span><span class="chip">14 câu (27–40)</span>'+(old?.startedAt?'<span class="chip">'+(old.submitted?"Đã làm · "+Q.filter(function(q){return cleaned(old.answers?.[q.id])===cleaned(q.answer)}).length+"/14":"Đang làm dở")+'</span>':"")+'</div></button></div>';
 window.scrollTo({top:0,behavior:"smooth"});
}
function exercise(){
 const old=read();
 if(old&&old.startedAt){state=old;renderReader();return}
 const mount=el("pageMount");mount.style.display="block";
 mount.innerHTML='<div class="breadcrumbs"><button class="crumb-btn" onclick="goGrade(12)">Lớp 12</button><span>›</span><button class="crumb-btn" onclick="location.hash=\'grade-12/reading\'">Reading</button><span>›</span><span>Robots and Us</span></div>'+
 '<div class="exercise-intro"><div class="eyebrow">IELTS Academic Reading · Passage 3</div><h1><span class="gradient">Robots and Us</span></h1>'+
 '<p>8 đoạn (A–H) · 14 câu hỏi (27–40) · Thời gian giới hạn 25 phút. Hai cột bài đọc và câu hỏi cuộn độc lập; có highlight, tra từ và điều hướng nhanh.</p>'+
 '<div class="pills"><span class="pill">Matching Information</span><span class="pill">YES / NO / NOT GIVEN</span><span class="pill">Flow-chart Completion</span><span class="pill">Chỉ hiện đáp án sau khi nộp</span></div>'+
 '<p><strong>Quy định:</strong> Đồng hồ bắt đầu khi nhấn nút dưới đây. Hết 25 phút sẽ tự động nộp bài; câu chưa trả lời được tính sai.</p>'+
 '<button class="primary" onclick="robotsContinue()">Bắt đầu làm bài →</button></div>';
 window.scrollTo({top:0,behavior:"smooth"});
}
window.renderRobotsReadingHome=landing;
window.renderRobotsReadingExercise=exercise;
window.destroyRobotsReading=function(){
 stopTimer();document.body.classList.remove("mis-reading-mode");
 const root=el("mis-reading-root");if(root)root.remove();
};
window.robotsExit=exitPage;
window.robotsContinue=continueReading;
window.robotsReset=resetReading;
window.robotsSetChoice=setChoice;
window.robotsSetInput=setInput;
window.robotsSubmit=submit;
window.robotsSaveSubmission=persistSubmission;
window.robotsGoQuestion=goQuestion;
window.robotsHighlight=highlight;
window.robotsDictionary=dictionary;
window.robotsSwitchTab=switchTab;
})();