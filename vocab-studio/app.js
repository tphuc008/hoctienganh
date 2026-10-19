
(function(){
"use strict";
var KEY="vocab_studio_preview_v1";
function emptyLesson(id){return {id:id,title:"Unit "+String(id).padStart(2,"0"),topic:"Chưa có nội dung",overview:"",notes:[],sections:[],originalQuestions:[],newQuestions:[],published:false};}
function defaults(){return {lessons:[emptyLesson(1),emptyLesson(2),emptyLesson(3)],selectedId:1,drafts:{}};}
function load(){try{var saved=JSON.parse(localStorage.getItem(KEY));if(saved&&Array.isArray(saved.lessons)&&saved.lessons.length)return Object.assign(defaults(),saved);}catch(e){}return defaults();}
var store=load();
var ui={view:"home",tab:"lecture",quizSet:"new",quizIndex:0,quizAnswers:{},quizSubmitted:false,print:{lesson:true,notes:true,original:false,new:true,answers:true,count:20},isPrintEditing:false,draftText:"",importFeedback:"",importError:false,adminText:"",adminTitle:"",adminImport:false};
function save(){try{localStorage.setItem(KEY,JSON.stringify(store));}catch(e){console.warn("Cannot save preview",e);}}
function safe(value){return String(value==null?"":value).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}
function format(value){return safe(value).replace(/\r?\n/g,"<br>");}
function lesson(){return store.lessons.find(function(x){return x.id===store.selectedId;})||store.lessons[0];}
function ready(l){return !!(l.published&&(l.overview||l.notes.length||l.originalQuestions.length||l.newQuestions.length));}
function counts(l){return l.originalQuestions.length+l.newQuestions.length;}
function badge(ok){return ok?'<span class="chip live">Đã lưu</span>':'<span class="chip empty">Khung trống</span>';}
function sectionTitle(kicker,title,side){return '<div class="section-title"><h2>'+safe(title)+'</h2><span class="muted">'+safe(side||"")+'</span></div>';}
function skeleton(){return '<div class="slot" aria-label="Khung nội dung chưa có dữ liệu"><div class="skeleton skel-90"></div><div class="skeleton"></div><div class="skeleton skel-65"></div><div class="skeleton skel-45"></div></div>';}
function nav(){return '<header class="site-header"><div class="brand"><span class="logo">✦</span><div><div>English Practice Hub</div><div class="brand-sub">VOCABULARY STUDIO</div></div></div><nav class="nav" aria-label="Điều hướng">'+[
 ["home","Trang chủ"],["lesson","Bài giảng"],["practice","Luyện tập"],["print","In tài liệu"],["admin","Quản lý"]
].map(function(it){return '<button class="nav-item '+(ui.view===it[0]?"active":"")+'" data-action="nav" data-page="'+it[0]+'">'+it[1]+'</button>';}).join("")+'</nav></header>';}
function wrap(page){return '<main class="panel"><section class="page">'+page+'</section></main><div class="footer">English Practice Hub · Structure Preview</div>';}
function home(){var l=lesson();return '<div class="hero"><div><span class="eyebrow">VOCABULARY LEARNING</span><h1>Học theo từng <span class="gradient">Unit.</span></h1><p> Bài giảng · Notes · Luyện tập · Bản in</p><button class="primary" data-action="nav" data-page="lesson">Xem bài giảng →</button></div><div class="hero-art">Aa</div></div>'+
'<div class="statrow"><div class="stat"><small>Units</small><strong>'+store.lessons.length+'</strong></div><div class="stat"><small>Bài tập gốc</small><strong>'+l.originalQuestions.length+'</strong></div><div class="stat"><small>Bài tập mới</small><strong>'+l.newQuestions.length+'</strong></div></div>'+
sectionTitle("","Danh sách bài học","")+'<div class="cards">'+store.lessons.map(function(x){return '<button class="unit-card" data-action="open-lesson" data-id="'+x.id+'"><div class="row between"><span class="unit-number">UNIT '+String(x.id).padStart(2,"0")+'</span>'+badge(ready(x))+'</div><h3>'+safe(x.title)+'</h3><p>'+safe(x.topic||"Vocabulary")+'</p></button>';}).join("")+'</div>';}
function noteMarkup(l){if(!l.notes.length)return skeleton();return l.notes.map(function(n,i){return '<div class="note-card"><div style="color:#cebaff;font-size:11px;font-weight:900;margin-bottom:4px">NOTE '+String(i+1).padStart(2,"0")+'</div>'+format(typeof n==="string"?n:(n.text||n.content||JSON.stringify(n)))+'</div>';}).join("");}
function lessonPage(){var l=lesson();var current=ui.tab;var blocks="";
if(current==="lecture"){
blocks='<div class="block"><div class="block-header"><h3 style="margin:0">Nội dung bài giảng</h3>'+badge(ready(l))+'</div>'+(l.overview?'<p style="white-space:pre-wrap">'+safe(l.overview)+'</p>':skeleton())+'</div>';
blocks+='<div class="block"><h3>Kiến thức Vocabulary</h3>'+(l.sections.length?l.sections.map(function(s,i){return '<div class="slot" style="margin:12px 0"><strong style="color:#ded5ff">'+safe(s.title||s.heading||"Mục "+(i+1))+'</strong><p style="margin:8px 0 0;white-space:pre-wrap">'+safe(s.content||s.body||"")+'</p></div>';}).join(""):skeleton())+'</div>';
}
if(current==="notes")blocks='<div class="block"><div class="block-header"><h3 style="margin:0">Teacher Notes</h3><span class="chip">'+l.notes.length+' notes</span></div>'+noteMarkup(l)+'</div>';
if(current==="questions")blocks='<div class="block"><h3>Bài tập</h3><div class="row" style="margin-top:15px"><button class="secondary" data-action="practice-set" data-set="original">Câu gốc · '+l.originalQuestions.length+'</button><button class="primary" data-action="practice-set" data-set="new">Câu mới · '+l.newQuestions.length+'</button></div></div>';
return '<div class="crumb"><button data-action="nav" data-page="home">Trang chủ</button> › Bài giảng</div>'+
'<div class="lesson-head"><div class="row between top"><div><span class="eyebrow">VOCABULARY LESSON</span><h1>'+safe(l.title)+'</h1><div class="muted">'+safe(l.topic||"")+'</div></div>'+badge(ready(l))+'</div></div>'+
'<div class="lesson-grid"><div><div class="block"><div class="tabs">'+[
 ["lecture","Bài giảng"],["notes","Notes"],["questions","Bài tập"]
].map(function(x){return '<button class="tab '+(current===x[0]?"active":"")+'" data-action="lesson-tab" data-tab="'+x[0]+'">'+x[1]+'</button>';}).join("")+'</div><div class="row between" style="margin-bottom:5px"><span class="muted" style="font-size:12px">'+(current==="lecture"?"Nội dung học":current==="notes"?"Ghi chú từ bài học":"Luyện tập")+'</span><span class="chip">Unit '+l.id+'</span></div></div>'+blocks+'</div>'+
'<aside><div class="tool-card"><h3>Học tập</h3><button class="primary" data-action="nav" data-page="practice">Làm bài →</button><button class="secondary" data-action="nav" data-page="print">In tài liệu ↓</button></div>'+
'<div class="tool-card"><h3>Trong Unit này</h3><p class="muted" style="font-size:13px;line-height:2">Notes · '+l.notes.length+'<br>Câu gốc · '+l.originalQuestions.length+'<br>Câu mới · '+l.newQuestions.length+'</p></div></aside></div>';}
function quizQuestions(){var l=lesson();return ui.quizSet==="original"?l.originalQuestions:l.newQuestions;}
function normalized(q){var opts=q.options||q.choices||[];if(!Array.isArray(opts))opts=["A","B","C","D"].map(function(k){return opts[k]||opts[k.toLowerCase()]||"";});return {text:q.question||q.prompt||q.text||"",options:opts,answer:String(q.answer||q.correct||q.correctAnswer||"").trim().toUpperCase(),explanation:q.explanation||q.rationale||""};}
function quizPage(){var l=lesson(),q=quizQuestions(),n=q.length;var tabs='<div class="tabs">'+[["original","Câu gốc · "+l.originalQuestions.length],["new","Câu mới · "+l.newQuestions.length]].map(function(x){return '<button class="tab '+(ui.quizSet===x[0]?"active":"")+'" data-action="practice-set" data-set="'+x[0]+'">'+x[1]+'</button>';}).join("")+'</div>';var body="";
if(!n){body='<div class="block"><div class="row between"><span class="chip">QUESTION 01</span><span class="muted">A · B · C · D</span></div><div class="question-blank" style="color:#d1d8e8">[Nội dung câu hỏi]</div><div class="answers">'+["A","B","C","D"].map(function(a){return '<div class="answer"><span class="letter">'+a+'</span><span class="muted">[Lựa chọn '+a+']</span></div>';}).join("")+'</div><div class="notice" style="margin-top:22px">Chưa có dữ liệu bài tập.</div></div>';}
else{var idx=Math.max(0,Math.min(n-1,ui.quizIndex));ui.quizIndex=idx;var item=normalized(q[idx]);var sel=ui.quizAnswers[ui.quizSet+"-"+idx]||"";var aKey=item.answer;var correctIdx=["A","B","C","D"].indexOf(aKey);if(correctIdx<0&&/^[0-3]$/.test(aKey))correctIdx=Number(aKey);var isRight=correctIdx>=0&&sel===String.fromCharCode(65+correctIdx);var choices=item.options.slice(0,4);while(choices.length<4)choices.push("");
body='<div class="block"><div class="quiz-top"><span class="chip">QUESTION '+String(idx+1).padStart(2,"0")+' / '+n+'</span><span class="quiz-count">'+Object.keys(ui.quizAnswers).filter(function(k){return k.startsWith(ui.quizSet+"-");}).length+' câu đã chọn</span></div><div class="progress-track"><span style="width:'+(((idx+1)/n)*100)+'%"></span></div><div class="question-blank">'+safe(item.text)+'</div><div class="answers">'+choices.map(function(c,i){var k="ABCD"[i];return '<button class="answer '+(sel===k?"selected ":"")+(ui.quizSubmitted&&aKey===k?"correct":"")+(ui.quizSubmitted&&sel===k&&aKey!==k?" incorrect":"")+'" data-action="choose-answer" data-value="'+k+'" '+(ui.quizSubmitted?"disabled":"")+'><span class="letter">'+k+'</span>'+safe(c)+'</button>';}).join("")+'</div>';
if(ui.quizSubmitted)body+='<div class="notice" style="margin-top:15px"><strong>'+(!aKey?"Chưa có đáp án":isRight?"Chính xác":"Đáp án: "+safe(aKey))+'</strong>'+(item.explanation?'<p style="white-space:pre-wrap;margin:9px 0 0">'+safe(typeof item.explanation==="string"?item.explanation:JSON.stringify(item.explanation))+'</p>':"")+'</div>';
body+='<div class="row between" style="margin-top:20px"><button class="secondary" data-action="quiz-prev" '+(idx===0?"disabled":"")+'>← Trước</button><div class="row"><button class="secondary" data-action="quiz-submit">'+(ui.quizSubmitted?"Xem lại":"Nộp bài")+'</button><button class="primary" data-action="quiz-next" '+(idx===n-1?"disabled":"")+'>Tiếp theo →</button></div></div></div>';}
return '<div class="quiz-shell"><div class="crumb"><button data-action="nav" data-page="home">Trang chủ</button> › Luyện tập</div><div class="row between top" style="margin-bottom:18px"><div><span class="eyebrow">PRACTICE</span><h2 style="margin:11px 0 4px">'+safe(l.title)+'</h2></div><span class="chip">'+counts(l)+' câu</span></div>'+tabs+body+'</div>';}
function printText(){var l=lesson(),o=ui.print,lines=[l.title,l.topic,""];
if(o.lesson){lines.push("BÀI GIẢNG");lines.push(l.overview||"[Nội dung bài giảng]");if(l.sections.length)l.sections.forEach(function(s){lines.push("");lines.push(s.title||s.heading||"Mục kiến thức");lines.push(s.content||s.body||"");});lines.push("");}
if(o.notes){lines.push("TEACHER NOTES");if(l.notes.length)l.notes.forEach(function(n,i){lines.push((i+1)+". "+(typeof n==="string"?n:(n.text||n.content||JSON.stringify(n))));});else lines.push("[Nội dung notes]");lines.push("");}
var picked=[];if(o.original)picked=picked.concat(l.originalQuestions.map(function(q){return {q:q,source:"Gốc"};}));if(o.new)picked=picked.concat(l.newQuestions.slice(0,o.count).map(function(q){return {q:q,source:"Mới"};}));
if(o.original||o.new){lines.push("BÀI TẬP");if(!picked.length)lines.push("[Chưa có câu hỏi]");picked.forEach(function(entry,i){var q=normalized(entry.q);lines.push("");lines.push((i+1)+". "+q.text);q.options.forEach(function(option,j){if(j<4)lines.push("   "+"ABCD"[j]+". "+option);});});}
if(o.answers&&(o.original||o.new)){lines.push("");lines.push("ĐÁP ÁN & GIẢI THÍCH");if(!picked.length)lines.push("[Chưa có đáp án]");picked.forEach(function(entry,i){var q=normalized(entry.q);lines.push((i+1)+". "+q.answer);if(q.explanation)lines.push(typeof q.explanation==="string"?q.explanation:JSON.stringify(q.explanation));});}
return lines.join("\n");}
function printPage(){var o=ui.print,l=lesson();var text=ui.isPrintEditing?ui.draftText:printText();var toggles=[["lesson","In giải thích chi tiết"],["notes","Kèm notes"],["original","Bài tập gốc"],["new","Bài tập mới"],["answers","Đáp án cuối file"]];return '<div class="crumb"><button data-action="nav" data-page="home">Trang chủ</button> › In tài liệu</div><div class="row between" style="margin-bottom:20px"><div><span class="eyebrow">DOCUMENT BUILDER</span><h2 style="margin:12px 0 5px">In & Xuất PDF</h2></div><span class="chip">'+safe(l.title)+'</span></div>'+
'<div class="print-grid"><div class="block print-panel"><h3>Tùy chọn bản in</h3>'+toggles.map(function(t){return '<label class="toggle-row"><span>'+t[1]+'</span><input type="checkbox" data-print-opt="'+t[0]+'" '+(o[t[0]]?"checked":"")+'></label>';}).join("")+
'<div class="form-row" style="margin-top:20px"><span class="form-label">Số câu bài tập mới</span><div class="segmented"><button data-action="print-count" data-count="10" class="'+(o.count===10?"active":"")+'">10 câu</button><button data-action="print-count" data-count="20" class="'+(o.count===20?"active":"")+'">20 câu</button></div></div>'+
'<button class="secondary" data-action="print-edit" style="width:100%;margin-bottom:9px">'+(ui.isPrintEditing?"✓ Xong chỉnh sửa":"✎ Chỉnh sửa bản in")+'</button>'+
(ui.isPrintEditing?'<div class="form-row"><textarea id="print-editor" class="field" style="min-height:220px" aria-label="Nội dung bản in cá nhân">'+safe(ui.draftText)+'</textarea><button class="quiet smallbtn" data-action="reset-draft">Khôi phục bản in</button></div>':'')+
'<button class="primary" data-action="do-print" style="width:100%">↓ In / Lưu PDF</button></div>'+
'<div class="paper-wrap"><div class="preview-status row between"><strong>Xem trước</strong><span>A4 · Bản cá nhân</span></div><div class="paper" id="print-preview"><span class="paper-label">✦ ENGLISH PRACTICE HUB</span><div class="paper-section"><h2>'+safe(l.title)+'</h2><p>'+safe(l.topic)+'</p></div><div class="paper-section"><p style="white-space:pre-wrap;line-height:1.8">'+safe(text)+'</p></div></div></div></div>';}
function adminPage(){var l=lesson();return '<div class="crumb"><button data-action="nav" data-page="home">Trang chủ</button> › Quản lý</div><div class="row between top" style="margin-bottom:22px"><div><span class="eyebrow">TEACHER SPACE</span><h2 style="margin:12px 0 6px">Nhập bài giảng</h2><p class="muted">Paste nội dung từ ChatGPT</p></div><span class="chip empty">Bản cấu trúc</span></div>'+
'<div class="lesson-grid"><div class="block"><div class="form-row"><label class="form-label" for="admin-title">Tên bài học</label><input class="field" id="admin-title" value="'+safe(ui.adminTitle||l.title)+'" placeholder="Unit 01"></div>'+
'<div class="form-row"><label class="form-label" for="admin-content">Nội dung đã tổng hợp</label><textarea id="admin-content" class="field" style="min-height:300px" placeholder="Dán nội dung từ ChatGPT vào đây...">'+safe(ui.adminText)+'</textarea></div>'+
'<div class="row"><button class="primary" data-action="save-import">Lưu bản demo</button><button class="secondary" data-action="clear-import">Xóa ô nhập</button></div>'+
(ui.importFeedback?'<p role="status" class="validation '+(ui.importError?"error":"")+'">'+safe(ui.importFeedback)+'</p>':"")+'</div>'+
'<aside><div class="tool-card"><h3>Unit hiện tại</h3><label class="form-label" for="admin-unit">Chọn Unit</label><select id="admin-unit" class="field">'+store.lessons.map(function(x){return '<option value="'+x.id+'" '+(x.id===l.id?"selected":"")+'>'+safe(x.title)+'</option>';}).join("")+'</select><button class="secondary" data-action="new-unit" style="margin-top:12px">+ Thêm Unit</button></div>'+
'<div class="tool-card"><h3>Dữ liệu đã lưu</h3><p class="muted" style="line-height:2;font-size:12px">Bài giảng · '+(l.overview?"Có":"Trống")+'<br>Notes · '+l.notes.length+'<br>Câu gốc · '+l.originalQuestions.length+'<br>Câu mới · '+l.newQuestions.length+'</p><button class="secondary" data-action="nav" data-page="lesson">Xem bài giảng</button></div></aside></div>'+
'<div class="notice">Bản demo lưu dữ liệu trong trình duyệt hiện tại. Chức năng xuất bản chung cho nhiều tài khoản sẽ được kết nối sau khi bạn duyệt cấu trúc.</div>';}
function appHTML(){var page=ui.view==="lesson"?lessonPage():ui.view==="practice"?quizPage():ui.view==="print"?printPage():ui.view==="admin"?adminPage():home();return nav()+wrap(page)+(ui.view==="print"?'<div class="print-sheet-only hide"><div class="paper-wrap"><div class="paper" id="print-only"><span class="paper-label">✦ ENGLISH PRACTICE HUB</span><div class="paper-section"><h2>'+safe(lesson().title)+'</h2><p>'+safe(lesson().topic)+'</p></div><div class="paper-section"><p style="white-space:pre-wrap">'+safe(ui.isPrintEditing?ui.draftText:printText())+'</p></div></div></div></div>':'');}
function render(){var app=document.getElementById("app");if(!app)return;app.innerHTML=appHTML();document.title="English Practice Hub · Vocabulary Studio";if(ui.view==="print"&&ui.isPrintEditing){var area=document.getElementById("print-editor");if(area){area.selectionStart=area.selectionEnd=area.value.length;}}}
function navigate(page){ui.view=page;ui.importFeedback="";if(page==="print"){ui.isPrintEditing=false;}location.hash=page;window.scrollTo({top:0,behavior:"instant"});render();}
function addNew(){var max=store.lessons.reduce(function(n,x){return Math.max(n,x.id);},0);var l=emptyLesson(max+1);store.lessons.push(l);store.selectedId=l.id;ui.adminTitle=l.title;ui.adminText="";save();render();}
function stripNotes(arr){if(!Array.isArray(arr))return [];return arr.map(function(x){return typeof x==="string"?x:(x&&typeof x==="object"?(x.text||x.content||x.note||JSON.stringify(x)):String(x));});}
function normalArray(val){return Array.isArray(val)?val:[];}
function importData(){
var area=document.getElementById("admin-content");var titleBox=document.getElementById("admin-title");var raw=area?area.value.trim():"";var l=lesson();ui.adminText=raw;ui.adminTitle=titleBox?titleBox.value.trim():l.title;
if(!raw){ui.importError=true;ui.importFeedback="Chưa có nội dung để lưu.";render();return;}
var parsed=null;try{parsed=JSON.parse(raw);}catch(e){}
if(parsed&&typeof parsed==="object"&&!Array.isArray(parsed)){
 l.title=ui.adminTitle||String(parsed.title||parsed.lessonTitle||l.title);
 l.topic=String(parsed.topic||parsed.subtitle||l.topic);
 l.overview=String(parsed.overview||parsed.lessonContent||parsed.content||parsed.lecture||parsed.lesson_text||"");
 l.sections=normalArray(parsed.sections||parsed.knowledge||parsed.vocabularySections).map(function(s){return typeof s==="string"?{title:"",body:s}:s;});
 l.notes=stripNotes(parsed.notes||parsed.expandedNotes||parsed.teacherNotes);
 l.originalQuestions=normalArray(parsed.originalQuestions||parsed.original_questions||parsed.questionsOriginal);
 l.newQuestions=normalArray(parsed.newQuestions||parsed.new_questions||parsed.practiceQuestions);
 ui.importFeedback="Đã lưu · "+l.notes.length+" notes · "+l.originalQuestions.length+" câu gốc · "+l.newQuestions.length+" câu mới.";
}else{
 l.title=ui.adminTitle||l.title;l.overview=raw;ui.importFeedback="Đã lưu văn bản bài giảng.";
}
l.published=true;ui.importError=false;save();render();
}
function handleClick(e){var el=e.target.closest("[data-action]");if(!el)return;var action=el.getAttribute("data-action");
if(action==="nav"){navigate(el.dataset.page);return;}
if(action==="open-lesson"){store.selectedId=Number(el.dataset.id);save();ui.tab="lecture";navigate("lesson");return;}
if(action==="lesson-tab"){ui.tab=el.dataset.tab;render();return;}
if(action==="practice-set"){ui.quizSet=el.dataset.set;ui.quizIndex=0;ui.quizAnswers={};ui.quizSubmitted=false;navigate("practice");return;}
if(action==="choose-answer"){ui.quizAnswers[ui.quizSet+"-"+ui.quizIndex]=el.dataset.value;render();return;}
if(action==="quiz-prev"){ui.quizIndex=Math.max(0,ui.quizIndex-1);render();return;}
if(action==="quiz-next"){ui.quizIndex=Math.min(quizQuestions().length-1,ui.quizIndex+1);render();return;}
if(action==="quiz-submit"){ui.quizSubmitted=!ui.quizSubmitted;render();return;}
if(action==="print-count"){ui.print.count=Number(el.dataset.count);ui.isPrintEditing=false;render();return;}
if(action==="print-edit"){if(!ui.isPrintEditing){ui.draftText=printText();ui.isPrintEditing=true;}else{ui.isPrintEditing=false;ui.draftText="";}render();return;}
if(action==="reset-draft"){ui.draftText=printText();render();return;}
if(action==="do-print"){window.print();return;}
if(action==="new-unit"){addNew();return;}
if(action==="save-import"){importData();return;}
if(action==="clear-import"){ui.adminText="";ui.importFeedback="";ui.adminTitle=lesson().title;render();return;}
}
document.addEventListener("click",handleClick);
document.addEventListener("change",function(e){var el=e.target;if(el.matches("[data-print-opt]")){ui.print[el.dataset.printOpt]=el.checked;ui.isPrintEditing=false;render();}if(el.id==="admin-unit"){store.selectedId=Number(el.value);save();ui.adminTitle=lesson().title;ui.adminText="";ui.importFeedback="";render();}});
document.addEventListener("input",function(e){if(e.target.id==="print-editor"){ui.draftText=e.target.value;var preview=document.getElementById("print-preview");var el=preview&&preview.querySelector(".paper-section:last-child p");if(el)el.textContent=ui.draftText;var only=document.querySelector("#print-only .paper-section:last-child p");if(only)only.textContent=ui.draftText;}if(e.target.id==="admin-content")ui.adminText=e.target.value;if(e.target.id==="admin-title")ui.adminTitle=e.target.value;});
window.addEventListener("hashchange",function(){var page=location.hash.replace("#","");if(["home","lesson","practice","print","admin"].includes(page)){ui.view=page;render();}});
var h=location.hash.slice(1);if(["home","lesson","practice","print","admin"].includes(h))ui.view=h;render();
})();
