/* Five IELTS Reading studies: independent, source-linked, original study notes and
 * rewritten questions. No third-party passage or question text is republished. */
(function(global){
"use strict";
var root=null, state=null, lesson=null, tickTimer=null, selection=null, pendingSync=false;
var STORAGE="five-reading-v1-";
var CSS='<style>'+
'.five-source{font-size:12px;margin:9px 0;padding:9px;border:1px solid #bcd5eb;background:#f5faff;border-radius:9px;line-height:1.65}'+
'.five-source a{color:#174ea6;font-weight:800}'+
'.five-tabbar{display:flex;gap:6px;margin:9px 0}.five-tab{border:1px solid #bdd5ee;background:white;color:#1d4ed8;border-radius:7px;padding:6px 9px;font-size:12px;font-weight:800}.five-tab.on{background:#2563eb;color:white}'+
'.five-original{width:100%;height:calc(100% - 175px);min-height:420px;border:1px solid #cbd5e1;border-radius:8px}'+
'.five-bank{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:5px;padding:9px;background:#eef6ff;border-radius:9px;margin-bottom:12px}'+
'.five-bank div{font-size:12px;padding:5px;background:white;border:1px solid #d9e7f5;border-radius:6px}'+
'.five-lab-explanation{border:1px solid #bfdfcc;background:#f6fbf7;border-radius:9px;margin-top:10px;padding:10px;font-size:13px;line-height:1.7}'+
'.five-lab-explanation details{margin-top:8px}.five-lab-explanation summary{cursor:pointer;color:#155e75;font-weight:800}'+
'.five-step{border-top:1px solid #d5e5de;padding-top:8px;margin-top:9px}'+
'.five-step h4{margin:0 0 6px;color:#173b53;font-size:13px}.five-step p{margin:6px 0}'+
'.five-step ul{margin:6px 0;padding-left:18px}.five-step li{margin-bottom:7px}'+
'.five-sample{font-size:12px;border-left:3px solid #f1c45f;padding:6px 9px;background:#fffdf2}'+
'.five-multi{display:flex;gap:5px;flex-wrap:wrap}.five-multi .mis-option[aria-pressed=true]{background:#2563eb;color:white}'+
'.five-app .mis-q-section .mis-q-card{scroll-margin-top:14px}'+
'.five-result-note{font-size:12px;color:#536478;margin:5px 0}'+
'.five-navigator{gap:5px}.five-error{font-size:12px;color:#b91c1c;margin-top:5px}'+
'@media(max-width:730px){.five-original{height:calc(100% - 160px);min-height:300px}.five-source{font-size:11px}}'+
'</style>';
function byId(id){return document.getElementById(id)}
function safe(x){return String(x==null?"":x).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function array(x){return Array.isArray(x)?x:[]}
function learner(){try{return typeof global.readLearnerSession==="function"?global.readLearnerSession()?.user?.id:null}catch(e){return null}}
function key(){return STORAGE+lesson.slug+"_"+(learner()||"guest")}
function getSaved(){try{return JSON.parse(localStorage.getItem(key())||"null")}catch(e){return null}}
function save(){try{localStorage.setItem(key(),JSON.stringify(state))}catch(e){};if(global.LearningFlow&&global.LearningCore&&global.LearningCore.userId&&global.LearningCore.userId()){try{global.LearningFlow.track({category:"reading",slug:lesson.path,started:true,startedAt:state.startedAt,done:filled(),total:lesson.total,completed:!!state.submitted,mode:"submit"})}catch(e){}}}
function now(){return Date.now()}
function fresh(){return {startedAt:now(),submitted:false,submittedAt:null,answers:{},focus:lesson.questions[0].id,mobileTab:"reading",leftView:"study",highlights:[],split:52,submissionId:global.crypto&&global.crypto.randomUUID?global.crypto.randomUUID():"five-"+now()+"-"+Math.random().toString(36).slice(2),synced:false}}
function canon(v){return String(v==null?"":v).normalize("NFKC").trim().replace(/\s+/g," ").toLowerCase()}
function options(q){return q.options||lesson.sections.find(function(s){return s.ids.includes(q.id)})?.options||[]}
function answer(q){return state.answers[q.id]}
function selected(q){var v=answer(q);return q.type==="multi"?array(v):canon(v)}
function isAnswered(q){return q.type==="multi"?selected(q).length>0:!!selected(q)}
function valueValid(q){if(q.type!=="input"||!isAnswered(q))return true;var v=canon(answer(q));return v.split(/\s+/).length<=(q.maxWords||1)&&(!q.numericOnly||/^\d+$/.test(v))}
function itemScore(q){if(q.type==="multi"){var chosen=selected(q);return chosen.length===(q.choose||2)?chosen.filter(function(v){return q.answer.includes(v)}).length:0}return canon(answer(q))===canon(q.answer)?1:0}
function totalScore(){return lesson.questions.reduce(function(n,q){return n+itemScore(q)},0)}
function filled(){return lesson.questions.reduce(function(n,q){return n+(q.type==="multi"?Math.min(selected(q).length,q.choose||2):isAnswered(q)?1:0)},0)}
function elapsed(){return Math.max(0,Math.floor(((state.submittedAt||now())-state.startedAt)/1000))}
function remaining(){return Math.max(0,lesson.minutes*60-elapsed())}
function timefmt(sec){return String(Math.floor(sec/60)).padStart(2,"0")+":"+String(sec%60).padStart(2,"0")}
function stop(){if(tickTimer!==null){clearInterval(tickTimer);tickTimer=null}}
function tick(){if(!state||!byId("mis-clock"))return;byId("mis-clock").textContent=timefmt(state.submitted?elapsed():remaining());byId("mis-clock").classList.toggle("warning",!state.submitted&&remaining()<=120);if(!state.submitted&&remaining()===0)submit(true)}
function validate(data){if(!data||!Array.isArray(data.questions)||!Array.isArray(data.paragraphs)||!Array.isArray(data.sections))throw Error("Missing reading data");
 var ids=new Set(),count=0;
 data.questions.forEach(function(q){if(ids.has(q.id)||q.id<1||!q.reason||!q.evidence||!q.trap)throw Error("Incomplete or duplicate question "+q.id);ids.add(q.id);count+=q.type==="multi"?(q.choose||2):1;
 if(q.p<0||q.p>=data.paragraphs.length)throw Error("Invalid evidence paragraph "+q.id);
 if(q.type==="multi"&&(!Array.isArray(q.answer)||q.answer.length!==q.choose))throw Error("Invalid multi-answer "+q.id);
 if(q.type==="input"&&!q.maxWords)throw Error("Missing word limit "+q.id);
 if(q.type!=="input"){var keys=optionsFor(data,q).map(function(o){return o[0]});var a=q.type==="multi"?q.answer:[q.answer];if(a.some(function(x){return !keys.includes(x)}))throw Error("Unlisted correct option "+q.id);}
 });
 if(count!==data.total)throw Error("Question total mismatch "+data.slug);
 data.sections.forEach(function(sec){sec.ids.forEach(function(id){if(!ids.has(id))throw Error("Section references missing question "+id)})});
}
function optionsFor(data,q){return q.options||data.sections.find(function(s){return s.ids.includes(q.id)})?.options||[]}
function markText(txt,p){var marks=[],s=String(txt);
 array(state.highlights).filter(function(x){return x.p===p}).forEach(function(x){var at=Number.isInteger(x.start)&&s.slice(x.start,x.start+x.text.length)===x.text?x.start:s.indexOf(x.text);if(at>=0)marks.push({a:at,b:at+x.text.length,cls:""})});
 if(state.submitted){var q=lesson.questions.find(function(x){return x.id===Number(state.focus)});if(q&&q.p===p&&q.anchor){var at=s.indexOf(q.anchor);if(at>=0)marks.push({a:at,b:at+q.anchor.length,cls:"mis-evidence"})}}
 marks.sort(function(a,b){return a.a-b.a||(a.cls?-1:1)});var out="",last=0;marks.forEach(function(m){if(m.a<last)return;out+=safe(s.slice(last,m.a))+'<mark class="'+m.cls+'">'+safe(s.slice(m.a,m.b))+'</mark>';last=m.b});return out+safe(s.slice(last))}
function readingHTML(){var source='<div class="five-source"><b>Bản luyện tập biên soạn lại</b> — đoạn đọc và câu hỏi được viết mới theo các ý học thuật của nguồn, không phải bản sao đề gốc. <a href="'+safe(lesson.source)+'" target="_blank" rel="noopener noreferrer">Mở PDF gốc trên Mini-IELTS</a>. Để làm chính xác đề gốc, hãy đối chiếu trực tiếp PDF nguồn.</div>';
 var tabs='<div class="five-tabbar"><button class="five-tab'+(state.leftView==="study"?" on":"")+'" type="button" data-five-view="study">Bản đọc biên soạn</button><button class="five-tab'+(state.leftView==="original"?" on":"")+'" type="button" data-five-view="original">PDF nguồn</button></div>';
 var body=state.leftView==="original"?'<iframe class="five-original" title="PDF bài Reading tại Mini-IELTS" loading="lazy" referrerpolicy="no-referrer" src="'+safe(lesson.source)+'"></iframe><p><a href="'+safe(lesson.source)+'" target="_blank" rel="noopener noreferrer">Nếu PDF không hiển thị, mở tại trang nguồn</a>.</p>':lesson.paragraphs.map(function(p,i){return '<p id="five-p-'+i+'" data-p="'+i+'" class="mis-paragraph'+(state.submitted&&lesson.questions.find(function(q){return q.id===Number(state.focus)})?.p===i?" mis-current-para":"")+'"><strong>'+String.fromCharCode(65+i)+'.</strong> '+markText(p,i)+'</p>'}).join("");
 return '<div class="mis-kicker">IELTS Academic Reading · Original Study Adaptation</div><h1 class="mis-passage-title">'+safe(lesson.title)+'</h1>'+source+tabs+'<div class="mis-reading-tools"><button type="button" data-five-highlight="1">✎ Highlight</button><button type="button" data-five-dict="1">⚑ Tra Cambridge</button></div><div class="mis-selection-status" id="five-selection-status">Bôi đen trong bản đọc biên soạn để đánh dấu hoặc tra từ.</div>'+body}
function optionHTML(q){var chosen=selected(q);return '<div class="'+(q.type==="multi"?"five-multi":"mis-options")+'">'+options(q).map(function(o){var pick=q.type==="multi"?chosen.includes(o[0]):canon(chosen)===canon(o[0]);var correct=state.submitted&&(q.type==="multi"?q.answer.includes(o[0]):q.answer===o[0]);var wrong=state.submitted&&pick&&!correct;return '<button type="button" class="mis-option'+(correct?" mis-answer-correct":"")+(wrong?" mis-answer-wrong":"")+'" aria-pressed="'+pick+'" data-five-id="'+q.id+'" data-five-value="'+safe(o[0])+'" '+(state.submitted?"disabled":"")+'>'+safe(o[0])+' <span class="mis-option-text">'+safe(o[1])+'</span></button>'}).join("")+'</div>'}
function explain(q){if(!state.submitted)return "";var correct=itemScore(q),max=q.type==="multi"?q.choose||2:1;
 var a=Array.isArray(q.answer)?q.answer.join(", "):q.answer;var mine=Array.isArray(answer(q))?answer(q).join(", "):answer(q)||"(chưa trả lời)";
 var section2="";
 if(q.type==="input"){section2='<p>'+safe(q.reason)+'</p><p><b>Kiểm tra hình thức:</b> giới hạn '+q.maxWords+' từ; viết hoa và khoảng trắng không làm thay đổi đáp án. '+safe(q.formNote||"Chỉ điền nội dung đúng loại từ và đúng đơn vị được hỏi.")+'</p>'}
 else if(q.type==="multi"){section2='<p>'+safe(q.reason)+'</p><ul>'+options(q).map(function(o){return '<li><b>'+safe(o[0])+'. '+safe(o[1])+'</b> — '+safe(q.analysis?.[o[0]]||"Cần đối chiếu phạm vi khẳng định với đoạn văn.")+'</li>'}).join("")+'</ul><p>Hai vị trí 7–8 là một nhóm: C rồi D hoặc D rồi C đều tương đương; mỗi lựa chọn đúng được 1 điểm khi đã chọn đủ hai.</p>'}
 else {section2='<p>'+safe(q.reason)+'</p>'+ (q.analysis?'<ul>'+options(q).map(function(o){return '<li><b>'+safe(o[0])+'. '+safe(o[1])+'</b> — '+safe(q.analysis[o[0]]||"Chưa có nhận xét cho lựa chọn này.")+'</li>'}).join("")+'</ul>':"<p>Loại suy các lựa chọn khác bằng điều kiện của câu hỏi, không chỉ bằng sự xuất hiện của từ khóa.</p>");}
 var transfer=q.paraphrase?'<p><b>Paraphrase:</b> '+safe(q.paraphrase)+'</p>':"";
 return '<div class="five-lab-explanation"><b>Đáp án '+safe(a)+'</b> · '+correct+'/'+max+' điểm. <span class="five-result-note">Bạn chọn: '+safe(mine)+'</span><p>'+safe(q.quick||q.reason)+'</p>'+
 '<details><summary>Xem giải thích chi tiết theo 3 bước</summary>'+
 '<section class="five-step"><h4>01 · BẰNG CHỨNG — Hiểu yêu cầu và định vị thông tin</h4><p><b>Đoạn '+String.fromCharCode(65+q.p)+':</b> '+safe(q.evidence)+'</p><p>'+safe(q.bridge||q.reason)+'</p></section>'+
 '<section class="five-step"><h4>02 · PHÂN TÍCH — Vì sao đúng và bẫy nằm ở đâu</h4>'+section2+'</section>'+
 '<section class="five-step"><h4>03 · VẬN DỤNG — Paraphrase và chiến lược tái sử dụng</h4>'+transfer+'<p class="five-sample"><b>Bẫy cụ thể:</b> '+safe(q.trap)+'</p></section></details>'+
 '<button class="mis-tool" type="button" data-five-proof="'+q.id+'">↖ Xem bằng chứng ở đoạn '+String.fromCharCode(65+q.p)+'</button></div>'}
function questionsHTML(){var head=state.submitted?'<div class="mis-results-banner"><strong>'+totalScore()+'/'+lesson.total+' câu đúng</strong><div>Đã nộp · '+timefmt(elapsed())+' · Chọn câu và mở lời giải để đọc phân tích chi tiết.</div></div>':"";
 return head+lesson.sections.map(function(sec){var bank=sec.showBank&&sec.options?'<div class="five-bank">'+sec.options.map(function(o){return '<div><b>'+safe(o[0])+'</b> '+safe(o[1])+'</div>'}).join("")+'</div>':"";
 return '<section class="mis-q-section"><h2>'+safe(sec.label)+'</h2><p class="mis-q-instruction">'+safe(sec.instructions)+'</p>'+bank+
 lesson.questions.filter(function(q){return sec.ids.includes(q.id)}).map(function(q){var id=q.id;return '<article class="mis-q-card'+(id===state.focus?" mis-focus":"")+'" id="five-q-'+id+'"><p class="mis-question-text"><span class="mis-num">'+id+(q.type==="multi"?"–"+(id+1):"")+'</span> '+safe(q.prompt)+'</p>'+
 (q.type==="input"?'<input class="mis-input" data-five-input="'+id+'" value="'+safe(answer(q)||"")+'" placeholder="NO MORE THAN '+(q.maxWords===1?"ONE WORD":"TWO WORDS")+'" autocomplete="off" spellcheck="false" '+(state.submitted?"disabled":"")+'><div class="five-error" id="five-error-'+id+'" '+(valueValid(q)?"hidden":"")+' >Vượt quá giới hạn hoặc sai định dạng.</div>':optionHTML(q))+
 explain(q)+'</article>'}).join("")+'</section>'}).join("")}
function navigator(){return lesson.questions.map(function(q){var status=state.submitted?(itemScore(q)===(q.type==="multi"?q.choose:1)?" right":" wrong"):(isAnswered(q)?" done":"");return '<button type="button" id="five-nav-'+q.id+'" class="mis-jump'+status+(q.id===state.focus?" focused":"")+'" data-five-jump="'+q.id+'">'+q.id+(q.type==="multi"?"–"+(q.id+1):"")+'</button>'}).join("")}
function progress(){var el=byId("mis-status");if(el)el.innerHTML=state.submitted?'<strong>'+totalScore()+'/'+lesson.total+'</strong> đúng':'<strong>'+filled()+'/'+lesson.total+'</strong> đã làm';lesson.questions.forEach(function(q){var n=byId("five-nav-"+q.id);if(n)n.className="mis-jump"+(state.submitted?(itemScore(q)===(q.type==="multi"?q.choose:1)?" right":" wrong"):(isAnswered(q)?" done":""))+(state.focus===q.id?" focused":"")})}
function refreshRight(){var area=byId("mis-question-pane");if(!area)return;var scroll=area.scrollTop;area.innerHTML=questionsHTML();area.scrollTop=scroll;progress()}
function mobile(tab){state.mobileTab=tab==="reading"?"reading":"questions";var app=byId("mis-app");if(app)app.dataset.tab=state.mobileTab;document.querySelectorAll(".mis-mobile-switch button").forEach(function(b){b.classList.toggle("active",b.dataset.tab===state.mobileTab)});save()}
function focusQuestion(id){var q=lesson.questions.find(function(q){return q.id===Number(id)});if(!q)return;state.focus=q.id;save();if(innerWidth<=730)mobile("questions");document.querySelectorAll(".mis-q-card").forEach(function(el){el.classList.toggle("mis-focus",el.id==="five-q-"+q.id)});byId("five-q-"+q.id)?.scrollIntoView({block:"start",behavior:"smooth"});progress()}
function proof(id){var q=lesson.questions.find(function(x){return x.id===Number(id)});if(!q)return;state.focus=q.id;state.leftView="study";save();var left=byId("mis-passage-pane");if(left){left.innerHTML=readingHTML();bindLeft();if(innerWidth<=730)mobile("reading");var p=byId("five-p-"+q.p);if(p)p.scrollIntoView({block:"center",behavior:"smooth"})}progress()}
function currentSelection(){var sel=getSelection();if(!sel||sel.rangeCount===0||sel.isCollapsed)return null;var range=sel.getRangeAt(0);var element=range.startContainer.nodeType===1?range.startContainer:range.startContainer.parentElement;var para=element?.closest?.(".mis-paragraph");if(!para||!para.contains(range.endContainer))return null;var text=String(range.toString()).trim();if(!text||text.length>400)return null;var before=range.cloneRange();before.selectNodeContents(para);before.setEnd(range.startContainer,range.startOffset);var prefix=before.toString();var label=para.querySelector("strong")?.textContent||"";var offset=prefix.length-label.length-1;if(offset<0)return null;var p=Number(para.dataset.p);var raw=lesson.paragraphs[p];if(raw.slice(offset,offset+text.length)!==text){offset=raw.indexOf(text);if(offset<0)return null}return {p:p,start:offset,text:text}}
function capture(){selection=currentSelection();var el=byId("five-selection-status");if(el&&selection)el.textContent="Đã chọn: "+selection.text.slice(0,90)}
function highlight(){if(!selection){alert("Bôi đen đoạn trong bản đọc trước.");return}if(!state.highlights.some(function(m){return m.p===selection.p&&m.start===selection.start&&m.text===selection.text}))state.highlights.push(selection);save();var left=byId("mis-passage-pane"),scroll=left.scrollTop;left.innerHTML=readingHTML();bindLeft();left.scrollTop=scroll;selection=null}
function dictionary(){if(!selection){alert("Chọn từ/cụm từ cần tra.");return}global.open("https://dictionary.cambridge.org/dictionary/english/"+encodeURIComponent(selection.text.trim().split(/\s+/).slice(0,5).join(" ")),"_blank","noopener,noreferrer")}
function bindLeft(){var left=byId("mis-passage-pane");if(!left)return;left.addEventListener("mouseup",capture);left.addEventListener("keyup",capture);left.querySelectorAll("[data-five-view]").forEach(function(btn){btn.addEventListener("click",function(){state.leftView=btn.dataset.fiveView;save();left.innerHTML=readingHTML();bindLeft()})});left.querySelector("[data-five-highlight]")?.addEventListener("click",highlight);left.querySelector("[data-five-dict]")?.addEventListener("click",dictionary)}
function setupDivider(){var handle=byId("mis-divider"),layout=byId("mis-layout");if(!handle||!layout)return;handle.addEventListener("pointerdown",function(e){if(innerWidth<=730)return;e.preventDefault();handle.setPointerCapture(e.pointerId);function move(ev){if(!handle.hasPointerCapture(ev.pointerId))return;var rect=layout.getBoundingClientRect();var ratio=Math.max(32,Math.min(68,Math.round((ev.clientX-rect.left)/rect.width*100)));state.split=ratio;layout.style.gridTemplateColumns="minmax(320px,"+ratio+"fr) 8px minmax(320px,"+(100-ratio)+"fr)"}function up(){handle.removeEventListener("pointermove",move);handle.removeEventListener("pointerup",up);handle.removeEventListener("pointercancel",up);save()}handle.addEventListener("pointermove",move);handle.addEventListener("pointerup",up);handle.addEventListener("pointercancel",up)})}
function bindEvents(){byId("five-exit")?.addEventListener("click",function(){if(!state.submitted&&!confirm("Thoát bài? Tiến độ và thời gian vẫn được lưu."))return;location.hash="grade-12/reading"});document.querySelectorAll("[data-five-submit]").forEach(function(el){el.addEventListener("click",function(){submit(false)})});document.querySelectorAll("[data-five-reset]").forEach(function(el){el.addEventListener("click",reset)});
 document.querySelectorAll("[data-five-mobile]").forEach(function(el){el.addEventListener("click",function(){mobile(el.dataset.fiveMobile)})});
 byId("mis-question-pane")?.addEventListener("click",function(e){var target=e.target.closest("[data-five-id],[data-five-proof]");if(!target)return;if(target.dataset.fiveProof){proof(Number(target.dataset.fiveProof));return}if(state.submitted)return;var q=lesson.questions.find(function(x){return x.id===Number(target.dataset.fiveId)});if(!q)return;var val=target.dataset.fiveValue;if(q.type==="multi"){var prev=array(answer(q)).slice();if(prev.includes(val))prev=prev.filter(function(x){return x!==val});else if(prev.length<(q.choose||2))prev.push(val);state.answers[q.id]=prev}else state.answers[q.id]=val;state.focus=q.id;save();refreshRight()});
 byId("mis-question-pane")?.addEventListener("input",function(e){var id=e.target.dataset.fiveInput;if(!id||state.submitted)return;var q=lesson.questions.find(function(q){return q.id===Number(id)});if(!q)return;state.answers[q.id]=e.target.value;state.focus=q.id;save();byId("five-error-"+id).hidden=valueValid(q);progress()});
 document.querySelectorAll("[data-five-jump]").forEach(function(el){el.addEventListener("click",function(){focusQuestion(el.dataset.fiveJump)})});bindLeft();setupDivider()}
function render(){stop();selection=null;document.body.classList.add("mis-reading-mode");var mount=byId("pageMount");if(mount)mount.style.display="none";if(!root){root=document.createElement("div");root.id="reading-lab-root";document.body.appendChild(root)}
 var action=state.submitted?'<button class="mis-submit" data-five-reset>↻ Làm lại</button>':'<button class="mis-submit" data-five-submit>Nộp bài →</button>';
 root.innerHTML=CSS+'<div class="mis-app five-app" id="mis-app" data-tab="'+safe(state.mobileTab)+'">'+
 '<header class="mis-topbar"><div class="mis-top-left"><button id="five-exit" class="mis-exit" aria-label="Thoát bài">×</button><div><div class="mis-title">'+safe(lesson.title)+'</div><div class="mis-subtitle">IELTS Reading · '+lesson.total+' câu · '+lesson.minutes+' phút</div></div></div>'+
 '<div class="mis-top-mid"><span class="mis-clock" id="mis-clock"></span><span class="mis-score-mini" id="mis-status"></span></div><div class="mis-top-actions">'+action+'</div></header>'+
 '<div class="mis-mobile-switch"><button type="button" data-five-mobile="reading" data-tab="reading" class="'+(state.mobileTab==="reading"?"active":"")+'">Bài đọc</button><button type="button" data-five-mobile="questions" data-tab="questions" class="'+(state.mobileTab==="questions"?"active":"")+'">Câu hỏi</button></div>'+
 '<div class="mis-workspace" id="mis-layout" style="grid-template-columns:minmax(320px,'+(state.split||52)+'fr) 8px minmax(320px,'+(100-(state.split||52))+'fr)">'+
 '<div class="mis-left" id="mis-passage-pane">'+readingHTML()+'</div><div class="mis-divider" id="mis-divider" role="separator" aria-orientation="vertical" title="Kéo để thay đổi độ rộng"></div>'+
 '<div class="mis-right" id="mis-question-pane">'+questionsHTML()+'</div></div>'+
 '<footer class="mis-bottom"><div class="mis-progress-grid five-navigator">'+navigator()+'</div><div class="mis-bottom-actions">'+(state.submitted?'<button class="mis-footer-btn" data-five-reset>Làm lại</button>':'<button class="mis-footer-btn" data-five-submit>Nộp bài</button>')+'</div></footer></div>';
 bindEvents();progress();tick();if(!state.submitted)tickTimer=setInterval(tick,600);else sync()}
function sync(){if(!state.submitted||state.synced||pendingSync||!global.LearningCore||!global.LearningCore.submitPractice)return;pendingSync=true;
 global.LearningCore.submitPractice({category:"reading",slug:lesson.path,correct:totalScore(),total:lesson.total,duration:Math.max(1,Math.min(lesson.minutes*60,elapsed())),submissionId:state.submissionId,details:{submissionType:state.submissionType||"manual",origin:"original-study-adaptation",sourceUrl:lesson.source}}).then(function(){pendingSync=false;state.synced=true;save()}).catch(function(err){pendingSync=false;console.warn("Reading score queued or retry required",err)})}
function submit(automatic){if(!state||state.submitted)return;var invalid=lesson.questions.filter(function(q){return !valueValid(q)});if(invalid.length&&!automatic){alert("Câu "+invalid.map(function(q){return q.id}).join(", ")+" vượt giới hạn từ hoặc sai định dạng.");return}
 var missing=lesson.total-filled();if(!automatic&&!confirm("Nộp bài? "+(missing?"Còn "+missing+" vị trí chưa trả lời. ":"")+"Đáp án và lời giải sẽ hiển thị sau khi nộp."))return;
 state.submitted=true;state.submittedAt=automatic?state.startedAt+lesson.minutes*60000:now();state.submissionType=automatic?"timeout":"manual";state.focus=lesson.questions[0].id;save();render();byId("mis-question-pane").scrollTop=0}
function reset(){if(!confirm("Làm bài mới từ đầu? Kết quả cũ đã nộp vẫn giữ trong lịch sử."))return;if(global.LearningFlow)try{global.LearningFlow.reset("reading",lesson.path)}catch(e){}state=fresh();save();render()}
function intro(){stop();document.body.classList.remove("mis-reading-mode");if(root){root.remove();root=null}var mount=byId("pageMount");if(!mount)return;mount.style.display="block";var existing=getSaved();mount.innerHTML='<div class="breadcrumbs"><button class="crumb-btn" onclick="location.hash=\'grade-12/reading\'">Reading</button><span>›</span><span>'+safe(lesson.title)+'</span></div>'+
 '<div class="exercise-intro"><div class="eyebrow">IELTS Academic Reading · Guided Practice</div><h1><span class="gradient">'+safe(lesson.title)+'</span></h1><p>'+lesson.total+' câu · '+lesson.minutes+' phút · Lời giải ba bước theo chuẩn Robots and Us.</p>'+
 '<p class="five-source">Phiên bản luyện tập mới dựa trên chủ đề và thông tin trong <a target="_blank" rel="noopener noreferrer" href="'+safe(lesson.source)+'">đề Mini-IELTS gốc</a>. Bài đọc và câu hỏi ở đây được diễn đạt lại, không phải bản chép nguyên văn.</p>'+
 '<button class="primary" id="five-start">'+(existing?.startedAt?(existing.submitted?"Xem lại bài đã nộp":"Tiếp tục làm bài"):"Bắt đầu làm bài")+' →</button></div>';
 byId("five-start")?.addEventListener("click",function(){state=existing?.startedAt?existing:fresh();save();render()})}
function destroy(){stop();document.body.classList.remove("mis-reading-mode");if(root){root.remove();root=null};state=null;lesson=null;selection=null}
global.renderFiveReading=function(slug){var bank=global.FIVE_READING_BANK||{};lesson=bank[slug];if(!lesson)throw Error("Bài Reading chưa có dữ liệu: "+slug);validate(lesson);intro()};
global.destroyFiveReading=destroy;
global.FiveReadingTest=Object.freeze({validate:validate,canon:canon,score:function(q,v){if(q.type==="multi")return Array.isArray(v)&&v.length===q.choose?v.filter(function(x){return q.answer.includes(x)}).length:0;return canon(v)===canon(q.answer)?1:0}});
})(window);
