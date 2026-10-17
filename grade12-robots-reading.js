
/* Robots and us — Grade 12 IELTS Reading (14 items, 20 minutes).
   Standalone, framework-free module. All correct answers/reviews are revealed only on submit. */
(function(){
"use strict";
const PATH="grade-12/reading/robots-and-us";
const STORE="grade12-robots-reading-v1";
const LIMIT=20*60;
const PASSAGE=["When asked ‘Should robots be used to colonise other planets?’, cosmology and astrophysics Professor Martin Rees said he believed the solar system would be mapped by robotic craft by the end of the century. ‘The next step would be mining of asteroids, enabling fabrication of large structures in space without having to bring all the raw materials from Earth. ... I think this is more realistic and benign than the ... “terraforming” of planets.’ He maintains that colonised planets ‘should be preserved with a status that is analogous to Antarctica here on Earth.’","On the question of using robots to colonise other planets and exploit mineral resources, engineering Professor Daniel Wolpert replied, ‘I don’t see a pressing need to colonise other planets unless we can bring these resources back to Earth. The vast majority of Earth is currently inaccessible to us. Using robots to gather resources nearer to home would seem to be a better use of our robotic tools.’ Meanwhile, for anthropology Professor Kathleen Richardson, the idea of ‘colonisation’ of other planets seemed morally dubious: ‘I think whether we do something on Earth or on Mars we should always do it in the spirit of a genuine interest in “the Other”, not to impose a particular model, but to meet “the Other”.’","In response to the second question, ‘How soon will machine intelligence outstrip human intelligence?’, Rees mentions robots that are advanced enough to beat humans at chess, but then goes on to say, ‘Robots are still limited in their ability to sense their environment: they can’t yet recognise and move the pieces on a real chessboard as cleverly as a child can. Later this century, however, their more advanced successors may relate to their surroundings, and to people, as adeptly as we do. Moral questions then arise. ... Should we feel guilty about exploiting sophisticated robots? Should we fret if they are underemployed, frustrated, or bored?’","Wolpert’s response to the question about machine intelligence outstripping human intelligence was this: ‘In a limited sense it already has. Machines can already navigate, remember and search for items with an ability that far outstrips humans. However, there is no machine that can identify visual objects or speech with the reliability and flexibility of humans.... Expecting a machine close to the creative intelligence of a human within the next 50 years would be highly ambitious.’","Richardson believes that our fear of machines becoming too advanced has more to do with human nature than anything intrinsic to the machines themselves. In her view, it stems from humans’ tendency to personify inanimate objects: we create machines based on representations of ourselves, imagine that machines think and behave as we do, and therefore see them as an autonomous threat. ‘One of the consequences of thinking that the problem lies with machines is that ... we tend to imagine they are greater and more powerful than they really are and subsequently they become so.’","This led on to the third question, ‘Should we be scared by advances in artificial intelligence?’ To this question, Rees replied, ‘Those who should be worried are the futurologists who believe in the so-called “singularity”. ... And another worry is that we are increasingly dependent on computer networks, and that these could behave like a single “brain” with a mind of its own, and with goals that may be contrary to human welfare. I think we should ensure that robots remain as no more than “idiot savants” lacking the capacity to outwit us, even though they may greatly surpass us in the ability to calculate and process information.’ Wolpert’s response was to say that we have already seen the damaging effects of artificial intelligence in the form of computer viruses. ‘But in this case,’ he says, ‘the real intelligence is the malicious designer. Critically, the benefits of computers outweigh the damage that computer viruses cause. Similarly, while there may be misuses of robotics in the near future, the benefits that they will bring are likely to outweigh these negative aspects.’","Richardson’s response to this question was this: ‘We need to ask why fears of artificial intelligence and robots persist; none have in fact risen up and challenged human supremacy.’ She believes that as robots have never shown themselves to be a threat to humans, it seems unlikely that they ever will. In fact, she went on, ‘Not all fear robots; many people welcome machine intelligence.’ In answer to the fourth question, ‘What can science fiction tell us about robotics?’, Rees replied, ‘I sometimes advise students that it’s better to read first-rate science fiction than second-rate science – more stimulating, and perhaps no more likely to be wrong.’","As his response, Wolpert commented, ‘Science fiction has often been remarkable at predicting the future. ... Science fiction has painted a vivid spectrum of possible futures, from cute and helpful robots to dystopian robotic societies. Interestingly, almost no science fiction envisages a future without robots.’ Finally, on the question of science fiction, Richardson pointed out that in modern society, people tend to think there is reality on the one hand, and fiction and fantasy on the other. She then explained that the division did not always exist, and that scientists and technologists made this separation because they wanted to carve out the sphere of their work. ‘But the divide is not so clear cut, and that is why the worlds seem to collide at times,’ she said. ‘In some cases, we need to bring these different understandings together to get a whole perspective. Perhaps then, we won’t be so frightened that something we create as a copy of ourselves will be a threat to us.’"];
const Q=[{"id":27,"type":"match","question":"For our own safety, humans will need to restrict the abilities of robots.","answer":"A","p":5,"quote":"we should ensure that robots remain as no more than “idiot savants”","why":"Rees argues that robots should not be allowed to outwit humans, even if they surpass us in calculating and processing information.","paraphrase":"restrict abilities ↔ remain as no more than “idiot savants”","trap":"The question asks about limiting robots for human safety."},{"id":28,"type":"match","question":"The risk of robots harming us is less serious than humans believe it to be.","answer":"C","p":6,"quote":"as robots have never shown themselves to be a threat to humans, it seems unlikely that they ever will","why":"Richardson argues that fear is exaggerated because robots have not demonstrated that they threaten human supremacy.","paraphrase":"less serious than believed ↔ fear is greater than the evidence warrants","trap":"Rees identifies specific potential risks from autonomous computer networks."},{"id":29,"type":"match","question":"It will take many decades for robot intelligence to be as imaginative as human intelligence.","answer":"B","p":3,"quote":"Expecting a machine close to the creative intelligence of a human within the next 50 years would be highly ambitious","why":"Wolpert considers human-level creative intelligence within 50 years an overly ambitious expectation.","paraphrase":"many decades ↔ within the next 50 years would be highly ambitious; imaginative ↔ creative","trap":"Machines already outperform humans in some limited tasks, but not creativity."},{"id":30,"type":"match","question":"We may have to start considering whether we are treating robots fairly.","answer":"A","p":2,"quote":"Should we feel guilty about exploiting sophisticated robots?","why":"Rees raises ethical questions about exploiting sophisticated robots and whether they could be frustrated or bored.","paraphrase":"fair treatment ↔ ethical concerns about exploiting robots and their welfare","trap":"This is about how robots might be treated, not using robots to exploit resources."},{"id":31,"type":"match","question":"Robots are probably of more help to us on Earth than in space.","answer":"B","p":1,"quote":"Using robots to gather resources nearer to home would seem to be a better use of our robotic tools","why":"Wolpert believes robots would be better used to access resources on Earth, much of which remains inaccessible to us.","paraphrase":"more help on Earth ↔ gather resources nearer to home would be a better use","trap":"Rees is more positive about mapping the solar system and mining asteroids."},{"id":32,"type":"match","question":"The ideas in high-quality science fiction may prove to be just as accurate as those found in the work of mediocre scientists.","answer":"A","p":6,"quote":"better to read first-rate science fiction than second-rate science ... perhaps no more likely to be wrong","why":"Rees says first-rate science fiction may be no more likely to be wrong than second-rate science.","paraphrase":"high-quality ↔ first-rate; mediocre ↔ second-rate; as accurate ↔ no more likely to be wrong","trap":"This does not mean science fiction is always accurate."},{"id":33,"type":"match","question":"There are those who look forward to robots developing greater intelligence.","answer":"C","p":6,"quote":"many people welcome machine intelligence","why":"Richardson notes that many people welcome machine intelligence rather than fear robots.","paraphrase":"look forward to ↔ welcome machine intelligence","trap":"The claim is about some people, not everyone."},{"id":34,"type":"ending","question":"Richardson and Rees express similar views regarding the ethical aspect of ...","answer":"C","p":0,"quote":"colonised planets ‘should be preserved’","why":"Both raise ethical concerns about human colonisation and changing other planets for our own benefit.","paraphrase":"preserving planets; colonisation is morally dubious","trap":"The shared theme is the ethics of altering other planets."},{"id":35,"type":"ending","question":"Rees and Wolpert share an opinion about the extent of ...","answer":"B","p":3,"quote":"Machines can already navigate, remember and search for items","why":"Both describe machine intelligence as advanced in some areas but still limited compared with human abilities.","paraphrase":"extent of advances ↔ current capabilities and remaining limitations","trap":"They do not make the same point about the harms caused by AI."},{"id":36,"type":"ending","question":"Wolpert disagrees with Richardson on the question of ...","answer":"D","p":5,"quote":"the benefits that they will bring are likely to outweigh these negative aspects","why":"Wolpert acknowledges possible misuse but argues that robotics’ benefits are likely to outweigh negative effects; Richardson is more dismissive of the threat itself.","paraphrase":"contrasting assessments of harmful effects and risks","trap":"The disagreement concerns the seriousness and implications of harm, not space exploration."},{"id":37,"type":"mcq","question":"What point does Richardson make about fear of machines?","answer":"B","p":4,"quote":"it stems from humans’ tendency to personify inanimate objects","why":"Richardson attributes fear to people projecting human characteristics onto non-human things.","paraphrase":"attribute human characteristics ↔ personify inanimate objects","trap":"The passage explains this as a feature of human nature, not a result of technological progress alone."},{"id":38,"type":"mcq","question":"What potential advance does Rees see as a cause for concern?","answer":"C","p":5,"quote":"these could behave like a single “brain” with a mind of its own","why":"Rees worries that networks may act like a unified brain with its own mind and goals contrary to human welfare.","paraphrase":"independent thought ↔ a single brain with a mind of its own","trap":"The concern is not simply that AI will be widespread or have abilities humans lack."},{"id":39,"type":"mcq","question":"What does Wolpert emphasise in his response to the question about science fiction?","answer":"B","p":7,"quote":"almost no science fiction envisages a future without robots","why":"Wolpert emphasises how central robots are to science fiction, which imagines many futures but rarely one without robots.","paraphrase":"fundamental to the genre ↔ almost no science fiction envisages a future without robots","trap":"He focuses on robots’ near-universal presence in the genre."},{"id":40,"type":"mcq","question":"What is Richardson doing in her comment about reality and fantasy?","answer":"C","p":7,"quote":"we need to bring these different understandings together to get a whole perspective","why":"Richardson recommends combining views of reality and fiction rather than treating them as entirely separate.","paraphrase":"change of approach ↔ bring different understandings together","trap":"Her final point is a recommendation, not merely a warning against confusion."}];
const CHOICES={"37":{"A":"It has grown alongside the development of ever more advanced robots.","B":"It is the result of our inclination to attribute human characteristics to non-human entities.","C":"It has its origins in basic misunderstandings about how inanimate objects function.","D":"It demonstrates a key difference between human and machine intelligence."},"38":{"A":"robots outnumbering people","B":"robots having abilities which humans do not","C":"artificial intelligence developing independent thought","D":"artificial intelligence taking over every aspect of our lives"},"39":{"A":"how science fiction influences our attitudes to robots","B":"how fundamental robots are to the science fiction genre","C":"how the image of robots in science fiction has changed over time","D":"how reactions to similar portrayals of robots in science fiction may vary"},"40":{"A":"warning people not to confuse one with the other","B":"outlining ways in which one has impacted on the other","C":"recommending a change of approach in how people view them","D":"explaining why scientists have a different perspective on them from other people"}};
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
 return '<div class="mis-kicker">IELTS Academic Reading · Passage 3</div><h1 class="mis-passage-title">Robots and us</h1>'+
 '<div class="mis-passage-sub">Reading Passage · Paragraphs A–H</div>'+
 '<div class="mis-reading-tools"><button type="button" onclick="robotsHighlight()">✎ Highlight</button><button type="button" onclick="robotsDictionary()">⚑ Tra từ (Cambridge)</button></div>'+
 '<div class="mis-selection-status" id="mis-selection-status">Chọn một đoạn chữ, sau đó nhấn Highlight hoặc Tra từ.</div>'+
 PASSAGE.map(function(p,i){return '<p class="mis-paragraph'+(state.submitted&&Q.some(function(q){return q.id===Number(state.focus)&&q.p===i})?" mis-current-para":"")+'" id="mis-p-'+i+'" data-p="'+i+'"><strong>'+String.fromCharCode(65+i)+'.</strong> '+markText(p,i)+'</p>'}).join("")+'<p class="mis-footnotes"><em>* terraforming: modifying a planet’s atmosphere to suit human needs. ** singularity: the point when robots will be able to start creating ever more sophisticated versions of themselves.</em></p>';
}
function optionsHTML(q){
 const opts=q.type==="match"?["A","B","C"]:q.type==="ending"?["A","B","C","D"]:q.type==="mcq"?["A","B","C","D"]:["YES","NO","NOT GIVEN"];
 return '<div class="mis-options" role="group" aria-label="Câu '+q.id+'">'+opts.map(function(o){
  const picked=cleaned(state.answers[q.id])===cleaned(o);
  const solution=state.submitted&&o===q.answer;
  const wrong=state.submitted&&picked&&!solution;
  return '<button type="button" class="mis-option'+(solution?" mis-answer-correct":"")+(wrong?" mis-answer-wrong":"")+'" data-option="'+html(o)+'" aria-pressed="'+picked+'" '+(state.submitted?'disabled ':'')+'onclick="robotsSetChoice('+q.id+',\''+o+'\')">'+html(o)+(CHOICES[q.id]&&CHOICES[q.id][o]?' <span class="mis-option-text">'+html(CHOICES[q.id][o])+'</span>':'')+'</button>';
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
 return '<div class="mis-diagram-scroll" aria-label="Sơ đồ Marketing Information System có 4 ô trống 37 đến 40">'+
 '<svg class="mis-diagram" viewBox="0 0 920 420" role="img" aria-label="Sơ đồ quy trình MIS với bốn chỗ trống đánh số 37, 38, 39 và 40." xmlns="http://www.w3.org/2000/svg">'+
 '<defs><marker id="mis-arr" markerWidth="12" markerHeight="12" refX="9" refY="6" orient="auto"><path d="M1 1L11 6L1 11Z" fill="#171717"/></marker></defs>'+
 '<text x="460" y="33" text-anchor="middle" font-size="23" font-weight="700" fill="#171717">The Marketing Information System (MIS)</text>'+
 '<g fill="white" stroke="#262626" stroke-width="2"><rect x="25" y="90" width="136" height="285"/><rect x="245" y="90" width="184" height="165"/><rect x="521" y="90" width="375" height="165"/><rect x="245" y="290" width="184" height="86"/><rect x="521" y="290" width="375" height="86"/></g>'+
 '<g fill="none" stroke="#181818" stroke-width="8" marker-end="url(#mis-arr)"><path d="M176 173H219"/><path d="M439 173H493"/><path d="M709 263V280"/><path d="M512 338H450"/><path d="M234 338H178"/></g>'+
 '<g fill="#151515" font-family="Arial, sans-serif" font-size="21"><text x="45" y="250" font-weight="700">37 _____</text>'+
 '<text x="261" y="154">Find out their</text><text x="261" y="191" font-weight="700">38 _____</text>'+
 '<text x="538" y="126">Developed through:</text><text x="550" y="162" font-weight="700">•   39 _____</text>'+
 '<text x="550" y="194" font-size="19">•   marketing intelligence activities</text>'+
 '<text x="550" y="228">•   research process</text>'+
 '<text x="260" y="322" font-size="18">Timely and</text><text x="260" y="342" font-size="18">accurate data</text><text x="260" y="362" font-size="18">distribution</text>'+
 '<text x="540" y="340">Processed by the  <tspan font-weight="700">40 _____</tspan></text></g></svg></div>';
}
function questionsHTML(){
 const resultHead=state.submitted?
 '<div class="mis-results-banner"><strong>'+score()+'/14 câu đúng</strong><div>Thời gian làm bài: '+mmss((state.submittedAt-state.startedAt)/1000)+' · Nhấn vào số câu ở thanh dưới để xem bằng chứng và lời giải.</div></div>':"";
 const matching=Q.filter(function(q){return q.type==="match"}).map(questionHTML).join("");
 const endings=Q.filter(function(q){return q.type==="ending"}).map(questionHTML).join("");
 const mcq=Q.filter(function(q){return q.type==="mcq"}).map(questionHTML).join("");
 const blanks=Q.filter(function(q){return q.type==="input"}).map(inputHTML).join("");
 return resultHead+
 '<section class="mis-q-section"><h2>Questions 27–33</h2><p class="mis-q-instruction"><strong>Matching Features.</strong> Match each statement with A Martin Rees, B Daniel Wolpert or C Kathleen Richardson. You may use each letter more than once.</p>'+matching+'</section>'+
 '<section class="mis-q-section"><h2>Questions 34–36</h2><p class="mis-q-instruction"><strong>Matching Sentence Endings.</strong> Choose A–D.</p><div class="mis-answer-bank"><p><strong>A</strong> robots to explore outer space.</p><p><strong>B</strong> advances made in machine intelligence so far.</p><p><strong>C</strong> changes made to other planets for our own benefit.</p><p><strong>D</strong> the harm already done by artificial intelligence.</p></div>'+endings+'</section>'+
 '<section class="mis-q-section"><h2>Questions 37–40</h2><p class="mis-q-instruction"><strong>Multiple Choice.</strong> Choose A, B, C or D.</p>'+mcq+'</section>';
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
 '<header class="mis-topbar"><div class="mis-top-left"><button class="mis-exit" aria-label="Thoát bài Reading" onclick="robotsExit()">×</button><div><div class="mis-title">Marketing and the Information Age</div><div class="mis-subtitle">IELTS Academic Reading · Passage 3 · Questions 27–40</div></div></div>'+
 '<div class="mis-top-mid"><span class="mis-clock" id="mis-clock">20:00</span><span class="mis-score-mini" id="mis-status"></span><span class="mis-save-status" id="mis-save-status" role="status"></span></div>'+
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
const MIS_SUPABASE_URL="https://ouicitkpfukterkilqzu.supabase.co";
const MIS_SUPABASE_KEY="sb_publishable_JI7CbbcaNM_3NJOr81qODg_yemK8QJ2";
const MIS_LEARNER_AUTH_KEY="hoctienganh_learner_auth_v1";
function learnerAuthForReading(){
 try{return JSON.parse(localStorage.getItem(MIS_LEARNER_AUTH_KEY)||"null")}catch(_){return null}
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
  exercise_title:"Robots and us",
  score:score(),
  total_questions:Q.length,
  answers,
  duration_seconds:duration,
  submission_type:state.submissionType==="timeout"?"timeout":"manual",
  started_at:new Date(state.startedAt).toISOString(),
  submitted_at:new Date(state.submittedAt||Date.now()).toISOString()
 };
 try{
  const response=await fetch(MIS_SUPABASE_URL+"/rest/v1/reading_submissions?on_conflict=submission_id",{
   method:"POST",
   headers:{
    "apikey":MIS_SUPABASE_KEY,
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
 '<div class="exercise-grid"><button class="exercise-card" onclick="location.hash=\''+PATH+'\'"><div class="exercise-icon">📖</div><h3>Marketing and the Information Age</h3><p>Passage 3 · Matching Features · Matching Sentence Endings · Multiple Choice</p><div class="meta"><span class="chip">20 phút</span><span class="chip">14 câu (27–40)</span><span class="chip">Giải thích chi tiết tiếng Việt</span>'+(old?.startedAt?'<span class="chip">'+(old.submitted?"Đã làm · "+Q.filter(function(q){return cleaned(old.answers?.[q.id])===cleaned(q.answer)}).length+"/14":"Đang làm dở")+'</span>':"")+'</div></button></div>';
 window.scrollTo({top:0,behavior:"smooth"});
}
function exercise(){
 const old=read();
 if(old&&old.startedAt){state=old;renderReader();return}
 const mount=el("pageMount");mount.style.display="block";
 mount.innerHTML='<div class="breadcrumbs"><button class="crumb-btn" onclick="goGrade(12)">Lớp 12</button><span>›</span><button class="crumb-btn" onclick="location.hash=\'grade-12/reading\'">Reading</button><span>›</span><span>Marketing and the Information Age</span></div>'+
 '<div class="exercise-intro"><div class="eyebrow">IELTS Academic Reading · Passage 3</div><h1><span class="gradient">Marketing and the Information Age</span></h1>'+
 '<p>8 đoạn (A–H) · 14 câu hỏi (27–40) · Thời gian giới hạn 25 phút. Hai cột bài đọc và câu hỏi cuộn độc lập; có highlight, tra từ và điều hướng nhanh.</p>'+
 '<div class="pills"><span class="pill">Matching Features</span><span class="pill">Matching Sentence Endings</span><span class="pill">Multiple Choice</span><span class="pill">Chỉ hiện đáp án sau khi nộp</span></div>'+
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