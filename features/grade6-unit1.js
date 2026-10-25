/* Grade 6 Unit 1 · Lesson & Practice. Reuses the website's cards, quiz, and concise explanation styling. */
(function (global) {
"use strict";
const A=global.G6_U1_PART_A, B=global.G6_U1_PART_B;
if(!A||!B)throw Error("Missing Grade 6 Unit 1 source data");
const all=[...A.groups,...B.groups];
const original=all.filter(g=>g.id!=="extra");
const extra=B.extra;
extra.items.forEach((q,i)=>{q.id=q.id||("extra-"+(i+1));q.no=i+1;});
const originalTotal=original.reduce((n,g)=>n+g.items.length,0);
const VERSION=global.LearningCore?.fingerprint?.([A.groups,B.groups,extra.items])||"g6-1";
const BASE="grade-6/unit-1";
const STORE="grade6-unit-1";
const IPA={
"boarding school":"/ˈbɔːr.dɪŋ ˌskuːl/","greenhouse":"/ˈɡriːn.haʊs/","swimming pool":"/ˈswɪm.ɪŋ ˌpuːl/","equipment":"/ɪˈkwɪp.mənt/","art":"/ɑːt/",
"school bag":"/ˈskuːl.bæɡ/","pencil case":"/ˈpen.səl ˌkeɪs/","notebook":"/ˈnoʊtˌbʊk/","textbook":"/ˈtekstˌbʊk/","pencil sharpener":"/ˈpen.səl ˌʃɑːr.pə.nər/","ruler":"/ˈruː.lər/","rubber":"/ˈrʌb.ər/","calculator":"/ˈkæl.kjə.leɪ.tər/","compass":"/ˈkʌm.pəs/",
"classmate":"/ˈklæs.meɪt/","international":"/ˌɪn.tərˈnæʃ.ə.nəl/","overseas":"/ˈoʊ.vərˈsiːz/",
"activity":"/ækˈtɪv.ə.ti/","judo":"/ˈdʒuː.doʊ/","interview":"/ˈɪn.tər.vjuː/","help":"/help/","share":"/ʃer/",
"creative":"/kriˈeɪ.tɪv/","excited":"/ɪkˈsaɪ.tɪd/","smart":"/smɑːrt/","friendly":"/ˈfrend.li/","hardworking":"/ˌhɑːdˈwɜː.kɪŋ/","confident":"/ˈkɒn.fɪ.dənt/",
"bicycle":"/ˈbaɪ.sɪ.kəl/","pocket money":"/ˈpɑː.kɪt ˌmʌn.i/","poem":"/ˈpoʊ.əm/","remember":"/rɪˈmem.bər/","knock":"/nɑːk/","surround":"/səˈraʊnd/"
};
let state=null,owner=null,activeTab="knowledge";
function esc(v){return String(v==null?"":v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function rich(v){return esc(v).replace(/&lt;u&gt;/g,"<u>").replace(/&lt;\/u&gt;/g,"</u>").replace(/\n/g,"<br>");}
function normalized(v){return String(v||"").toLowerCase().trim().replace(/[’‘]/g,"'").replace(/\s*\|\s*/g,"|").replace(/[.!?]+$/g,"").replace(/\s+/g," ");}
function findItem(id){for(const g of all){const q=g.items.find(x=>x.id===id);if(q)return {q,g};}return null;}
function fresh(){return {version:VERSION,answers:{},checked:{},group:original[0].id,practiceLimit:10,practiceStarted:false};}
function hydrate(){
 const who=global.LearningCore?.userId?.()||"guest";
 if(state&&owner===who)return;
 owner=who;
 const stored=global.LearningCore?.readDraft?.("grade6",STORE);
 state=stored&&stored.version===VERSION&&stored.answers&&stored.checked?{...fresh(),...stored}:fresh();
 if(!original.some(g=>g.id===state.group))state.group=original[0].id;
}
function save(){global.LearningCore?.writeDraft?.("grade6",STORE,state);}
function answer(id){return state.answers[id]||"";}
function scored(q,g){if(q.kind==="essay")return null;
 if(q.kind==="mcq")return q.a===null?null:String(q.a)===String(answer(q.id));
 if(!q.answers?.length)return null;
 if(g.id==="transformation"||g.id==="rearrangement")return null;
 if(q.kind==="mcq")return String(q.a)===String(answer(q.id));
 return q.answers.some(x=>normalized(x)===normalized(answer(q.id)));
}
function countDone(g){return g.items.filter(q=>state.checked[q.id]).length;}
function styles(){
 if(document.getElementById("g6unit1Styles"))return;
 const el=document.createElement("style");el.id="g6unit1Styles";
 el.textContent=".g6-root{max-width:1120px;margin:auto}.g6-tabs{display:flex;gap:9px;flex-wrap:wrap;margin:19px 0 24px;border-bottom:1px solid var(--line);padding-bottom:12px}.g6-tabs a{padding:11px 16px;border-radius:12px;color:inherit;text-decoration:none;border:1px solid var(--line);font-weight:700;font-size:14px}.g6-tabs a.current{background:#eaf2ff;border-color:#8daedf;color:#144c83}.g6-lead{color:var(--muted);line-height:1.75}.g6-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:13px}.g6-tile{background:var(--card);border:1px solid var(--line);border-radius:17px;padding:20px}.g6-tile h3{margin:4px 0 9px;font-size:18px}.g6-table{width:100%;border-collapse:collapse;font-size:14px}.g6-table th,.g6-table td{padding:11px 13px;border-bottom:1px solid var(--line);text-align:left;vertical-align:top}.g6-table th{font-size:12px;color:var(--muted);text-transform:uppercase}.g6-table td:first-child{font-weight:700}.g6-vocab-group{border:1px solid var(--line);border-radius:17px;margin:12px 0;overflow:hidden;background:var(--card)}.g6-vocab-group h3{font-size:15px;margin:0;padding:13px 16px;background:rgba(125,147,192,.08)}.g6-word-search{width:100%;padding:13px 15px;border-radius:12px;border:1px solid var(--line);background:var(--card);color:inherit;font:inherit}.g6-lesson{border:1px solid var(--line);border-radius:18px;background:var(--card);padding:19px;margin:13px 0;line-height:1.75}.g6-lesson summary{cursor:pointer;font-weight:800;font-size:17px}.g6-formula{background:rgba(126,145,186,.09);padding:11px 14px;border-radius:10px;display:block;margin:8px 0;font-weight:650}.g6-groups{display:grid;grid-template-columns:repeat(auto-fill,minmax(185px,1fr));gap:10px;margin:15px 0 21px}.g6-group{padding:12px 13px;border:1px solid var(--line);border-radius:12px;background:var(--card);color:inherit;text-align:left;cursor:pointer}.g6-group.selected{border-color:#729aca;background:rgba(116,162,217,.12)}.g6-group b{display:block;font-size:13px}.g6-group small{display:block;color:var(--muted);margin-top:5px}.g6-block{padding:19px;border:1px solid var(--line);border-radius:18px;background:var(--card);margin:15px 0}.g6-block h3{margin:0 0 9px}.g6-bank{display:flex;flex-wrap:wrap;gap:8px;margin:14px 0}.g6-bank span{background:rgba(118,152,206,.13);border-radius:9px;padding:6px 10px;font-size:13px}.g6-item{border:1px solid var(--line);border-radius:15px;padding:18px;margin:13px 0;background:var(--card)}.g6-item h4{font-size:15px;line-height:1.65;font-weight:650;white-space:normal;margin:5px 0 13px}.g6-no{color:var(--muted);font-weight:700;font-size:12px}.g6-opts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.g6-option{display:flex;align-items:flex-start;gap:8px;border:1px solid var(--line);border-radius:11px;padding:10px;cursor:pointer;font-size:14px;line-height:1.5;min-width:0}.g6-option:has(input:checked){border-color:#638ac3;background:rgba(107,159,222,.10)}.g6-option input{accent-color:#3469a8;margin-top:4px}.g6-option span{overflow-wrap:anywhere}.g6-input,.g6-essay{box-sizing:border-box;display:block;width:100%;max-width:700px;border:1px solid var(--line);border-radius:11px;background:var(--card);color:inherit;font:inherit;line-height:1.5;padding:12px}.g6-essay{min-height:190px;max-width:none}.g6-small{font-size:12px;color:var(--muted);margin:7px 0}.g6-check{margin-top:12px;padding:9px 15px;border-radius:10px;border:1px solid #729aca;background:#eaf2ff;color:#214d7a;font-weight:700;cursor:pointer}.g6-check[disabled]{opacity:.48;cursor:not-allowed}.g6-result{margin-top:13px;border:1px solid var(--line);border-radius:12px;padding:12px 14px;background:rgba(96,137,187,.08);line-height:1.65}.g6-result strong{display:block;margin-bottom:5px}.g6-result p{margin:0}.g6-issue{border-left:3px solid #a77b32;padding-left:10px;margin-top:8px!important;color:var(--muted);font-size:13px}.g6-note{background:rgba(119,150,186,.08);border-radius:11px;padding:12px 14px;line-height:1.7}.g6-passage{white-space:pre-wrap;line-height:1.85;border:1px solid var(--line);border-radius:13px;padding:17px;margin:14px 0;background:rgba(132,164,202,.06)}.g6-setup{display:flex;align-items:center;gap:13px;flex-wrap:wrap}.g6-setup select{padding:9px;border:1px solid var(--line);border-radius:10px;background:var(--card);color:inherit}.g6-section-title{margin:26px 0 12px}.g6-progress{font-size:13px;color:var(--muted)}@media(max-width:620px){.g6-opts{grid-template-columns:1fr}.g6-table th,.g6-table td{padding:9px 6px;font-size:12px}.g6-item{padding:13px}.g6-tabs a{flex:1 1 30%;text-align:center;padding:10px 7px;font-size:12px}.g6-groups{grid-template-columns:repeat(2,minmax(0,1fr))}.g6-group{padding:10px}}";
 document.head.appendChild(el);
}
function header(tab){
 const tabs=[["knowledge","01 · Kiến thức"],["original","02 · Bài tập gốc"],["practice","03 · Luyện tập thêm"]];
 return '<div class="breadcrumbs"><button class="crumb-btn" onclick="goAreaHome()">Home</button><span>›</span><button class="crumb-btn" onclick="goGrade(6)">Lớp 6</button><span>›</span><span>Unit 1</span></div>'+
 '<div class="unit-hero"><div class="eyebrow">GRADE 6 · UNIT 01</div><h1>My New School</h1><p>Vocabulary · Present Simple · Present Continuous</p><div class="meta"><span class="chip">34 từ vựng</span><span class="chip">'+originalTotal+' bài tập gốc</span><span class="chip">15 câu luyện thêm</span></div></div>'+
 '<nav class="g6-tabs" aria-label="Phần học trong Unit 1">'+tabs.map(x=>'<a href="#'+BASE+(x[0]==="knowledge"?"":"/"+x[0])+'" class="'+(x[0]===tab?"current":"")+'" '+(x[0]===tab?'aria-current="page"':'')+'>'+x[1]+'</a>').join("")+'</nav>';
}
function lesson(){
 const listing=A.words.map(category=>'<section class="g6-vocab-group"><h3>'+esc(category.group)+' · '+category.items.length+' words</h3>'+
 '<table class="g6-table"><thead><tr><th>Word</th><th>Pronunciation</th><th>Nghĩa</th></tr></thead><tbody>'+
 category.items.map(w=>'<tr data-g6-word-row="'+esc((w.word+" "+w.meaning).toLowerCase())+'"><td>'+esc(w.word)+'</td><td>'+esc(IPA[w.word]||"—")+'</td><td>'+esc(w.meaning)+'</td></tr>').join("")+'</tbody></table></section>').join("");
 const grammar=A.grammar.map((g,i)=>'<details class="g6-lesson" '+(i===0?'open':'')+'><summary>'+esc(g.title)+'</summary><p>'+esc(g.usage)+'</p>'+
 '<div class="g6-formula">(+)&nbsp; '+esc(g.positive)+'</div><div class="g6-formula">(−)&nbsp; '+esc(g.negative)+'</div><div class="g6-formula">(?)&nbsp; '+esc(g.question)+'</div>'+
 '<p><b>Dấu hiệu:</b> '+esc(g.signals)+'</p><p><b>Ví dụ:</b><br>'+g.examples.map(esc).join("<br>")+'</p><p><b>Chú ý:</b> '+g.rules.map(esc).join(" ")+'</p></details>').join("");
 return '<div class="g6-root"><h2 class="g6-section-title">01 · Vocabulary</h2><p class="g6-lead">34 từ gốc trong PDF · Chọn nhóm từ hoặc tìm nhanh từ cần học.</p>'+
 '<input class="g6-word-search" data-g6-search type="search" placeholder="Tìm từ hoặc nghĩa tiếng Việt…" aria-label="Tìm từ vựng"/>'+listing+
 '<h2 class="g6-section-title">02 · Grammar</h2><p class="g6-lead">Hai thì trọng tâm của Unit 1. Mở từng mục để ôn cấu trúc, cách dùng và ví dụ.</p>'+
 grammar+'<div class="g6-lesson"><h3>So sánh nhanh · Quick Review</h3><div class="g6-grid"><div class="g6-tile"><b>Present Simple</b><p>Thói quen / sự thật</p><span class="g6-formula">She goes to school every day.</span></div><div class="g6-tile"><b>Present Continuous</b><p>Việc đang diễn ra</p><span class="g6-formula">She is going to school now.</span></div></div>'+
 '<p class="g6-note">Dấu hiệu nhận biết giúp định hướng nhưng quyết định cuối cùng dựa vào nghĩa của câu. Có thể chuyển sang <a href="#'+BASE+'/original">Bài tập gốc</a> để làm ba nhóm chia thì.</p></div></div>';
}
function groupSelector(){return '<div class="g6-groups">'+original.map(g=>'<button type="button" class="g6-group '+(state.group===g.id?"selected":"")+'" data-g6-group="'+esc(g.id)+'"><b>'+esc(g.title)+'</b><small>'+countDone(g)+' / '+g.items.length+' câu · trang '+esc(g.page)+'</small></button>').join("")+'</div>';}
function sectionProgress(g){const checked=g.items.filter(x=>state.checked[x.id]).length;const valid=g.items.filter(x=>x.kind!=="essay"&&(x.kind!=="mcq"||x.a!==null)&&x.answers?.length!==0);return '<div class="g6-progress">Đã kiểm tra '+checked+' / '+g.items.length+' mục · '+valid.length+' câu có đáp án tham khảo/chấm được</div>';}
function mcqLabels(q,g){
 if(g.id!=="pronunciation")return q.o.map(esc);
 const decorated=q.q.split(": ").slice(1).join(": ").split(" / ");
 return decorated.length===4?decorated.map(rich):q.o.map(esc);
}
function feedback(q,g){
 if(!state.checked[q.id])return "";
 if(q.kind==="essay")return '<div class="g6-result"><strong>Đã lưu bản nháp</strong><p>Đoạn văn được lưu trên thiết bị theo tài khoản. Bài mở cần giáo viên xem và nhận xét.</p></div>';
 const ungraded=q.kind==="mcq"?(q.a===null):(!q.answers?.length||g.id==="transformation"||g.id==="rearrangement");
 const correct=scored(q,g);
 const expected=q.kind==="mcq"&&q.a!==null?("ABCD"[q.a]+". "+q.o[q.a]):q.answers?.[0]||"";
 const label=ungraded?"Đối chiếu đáp án / Không chấm tự động":correct?"✓ Chính xác":"✕ Chưa khớp đáp án tham khảo";
 return '<div class="g6-result feedback semantic-feedback" role="status"><strong>'+label+'</strong>'+
 (expected?'<p><b>Đáp án'+(ungraded?" tham khảo":"")+':</b> '+esc(expected)+'</p>':"")+
 (q.note?'<p class="ev1-short"><b>Giải thích nhanh:</b> '+esc(q.note)+'</p>':"")+
 (q.flag?'<p class="g6-issue">Lưu ý đề gốc: '+esc(q.flag)+'</p>':"")+'</div>';
}
function questionBlock(q,g){
 const checked=!!state.checked[q.id],val=answer(q.id);
 let answerHTML="";
 if(q.kind==="mcq"){
 const labels=mcqLabels(q,g);
 answerHTML='<div class="g6-opts">'+labels.map((opt,i)=>'<label class="g6-option"><input type="radio" name="g6-'+esc(q.id)+'" data-g6-answer="'+esc(q.id)+'" value="'+i+'" '+(val===String(i)?"checked":"")+'><span><b>'+("ABCD"[i])+'.</b> '+opt+'</span></label>').join("")+'</div>';
 }else if(q.kind==="essay"){
 const count=val.trim()?val.trim().split(/\s+/).length:0;
 answerHTML='<textarea class="g6-essay" data-g6-answer="'+esc(q.id)+'" rows="8" placeholder="Write your paragraph here...">'+esc(val)+'</textarea><p class="g6-small" data-g6-word-count="'+esc(q.id)+'">'+count+' words · Mục tiêu 80–100 từ</p>';
 }else{
 const multi=q.q.split("______").length>2;
 answerHTML='<input type="text" class="g6-input" data-g6-answer="'+esc(q.id)+'" value="'+esc(val)+'" autocomplete="off" spellcheck="false" placeholder="'+(multi?"Đáp án 1 | Đáp án 2":"Nhập đáp án…")+'"/>'+
 (multi?'<p class="g6-small">Điền các chỗ trống theo thứ tự, ngăn cách bằng dấu |.</p>':"");
 }
 return '<article class="g6-item" id="g6-q-'+esc(q.id)+'"><div class="g6-no">QUESTION '+String(q.no).padStart(2,"0")+'</div><h4>'+rich(q.q)+'</h4>'+answerHTML+
 (q.kind==="essay"?'<button class="g6-check" type="button" data-g6-check="'+esc(q.id)+'">Lưu bài viết</button>':
 '<button class="g6-check" type="button" data-g6-check="'+esc(q.id)+'" '+(val===""?"disabled":"")+'>Kiểm tra / Đối chiếu</button>')+
 feedback(q,g)+'</article>';
}
function renderOriginal(){const g=original.find(x=>x.id===state.group)||original[0];
 return '<div class="g6-root"><h2>Bài tập gốc · Original Worksheet</h2><p class="g6-lead">Giữ các dạng bài theo PDF, chia thành '+original.length+' nhóm để dễ học. Đáp án và giải thích ngắn hiện sau khi bấm Kiểm tra. Câu gốc thiếu đáp án duy nhất được đánh dấu và không chấm tự động.</p>'+
 '<p class="g6-small">Nguồn: Worksheet Unit 1 G6 · GV Nguyễn Bích Vân. Những câu chưa rõ đáp án được giữ lại để giáo viên rà soát.</p>'+groupSelector()+'<section class="g6-block"><h3>'+esc(g.title)+'</h3>'+sectionProgress(g)+
 (g.wordBank?'<div class="g6-bank">'+g.wordBank.map(x=>'<span>'+esc(x)+'</span>').join("")+'</div>':"")+
 (g.passage?'<div class="g6-passage">'+esc(g.passage)+'</div>':"")+
 g.items.map(q=>questionBlock(q,g)).join("")+'</section></div>';
}
function renderPractice(){
 return '<div class="g6-root"><h2>Luyện tập thêm · After-class Practice</h2><p class="g6-lead">15 câu mới bám sát từ vựng và hai thì trong Unit 1. Câu mới tách biệt với worksheet gốc.</p>'+
 '<section class="g6-block"><div class="g6-setup"><label for="g6PracticeCount"><b>Chọn số câu:</b></label><select id="g6PracticeCount" data-g6-practice-count>'+
 [5,10,15].map(n=>'<option value="'+n+'" '+(state.practiceLimit===n?"selected":"")+'>'+n+' câu</option>').join("")+'</select><button class="g6-check" type="button" data-g6-start="1">'+(state.practiceStarted?"Làm lại bộ luyện tập":"Bắt đầu luyện")+'</button></div></section>'+
 (state.practiceStarted?'<div class="g6-block"><h3>Practice Set · '+state.practiceLimit+' câu</h3><p class="g6-progress">Đã kiểm tra '+extra.items.slice(0,state.practiceLimit).filter(x=>state.checked[x.id]).length+' / '+state.practiceLimit+' câu</p>'+extra.items.slice(0,state.practiceLimit).map(q=>questionBlock(q,extra)).join("")+'</div>':"")+'</div>';
}
function render(tab,keepScroll){
 hydrate();styles();
 activeTab=["original","practice"].includes(tab)?tab:"knowledge";
 const mount=document.getElementById("pageMount");if(!mount)return;
 const scroll=keepScroll?global.scrollY:0;
 mount.style.display="block";
 const quiz=document.getElementById("quizShell"),result=document.getElementById("resultScreen");if(quiz)quiz.style.display="none";if(result)result.style.display="none";
 mount.innerHTML=header(activeTab)+(activeTab==="knowledge"?lesson():activeTab==="original"?renderOriginal():renderPractice());
 if(keepScroll)global.scrollTo(0,scroll);else global.scrollTo(0,0);
}
function onChange(ev){
 const t=ev.target;
 if(!t.closest?.(".g6-root"))return;
 if(t.matches("[data-g6-answer]")){hydrate();state.answers[t.dataset.g6Answer]=t.value;delete state.checked[t.dataset.g6Answer];save();
 const block=t.closest(".g6-item");block?.querySelector(".g6-result")?.remove();const check=block?.querySelector("[data-g6-check]");if(check)check.disabled=!t.value.trim();
 }
 if(t.matches("[data-g6-practice-count]")){state.practiceLimit=Number(t.value)||10;state.practiceStarted=false;save();render("practice",true);}
}
function onInput(ev){
 const t=ev.target;
 if(t.matches?.("[data-g6-search]")){
 const query=t.value.toLocaleLowerCase("vi").trim();document.querySelectorAll("[data-g6-word-row]").forEach(row=>{row.hidden=!row.dataset.g6WordRow.includes(query)});return;
 }
 if(!t.matches?.("[data-g6-answer]"))return;
 hydrate();state.answers[t.dataset.g6Answer]=t.value;delete state.checked[t.dataset.g6Answer];save();
 const block=t.closest(".g6-item"),check=block?.querySelector("[data-g6-check]");block?.querySelector(".g6-result")?.remove();if(check)check.disabled=!t.value.trim();
 const counter=document.querySelector('[data-g6-word-count="'+t.dataset.g6Answer+'"]');if(counter)counter.textContent=(t.value.trim()?t.value.trim().split(/\s+/).length:0)+" words · Mục tiêu 80–100 từ";
}
function onClick(ev){
 const g=ev.target.closest?.("[data-g6-group]");if(g){hydrate();state.group=g.dataset.g6Group;save();render("original",true);return;}
 const start=ev.target.closest?.("[data-g6-start]");if(start){hydrate();extra.items.forEach(q=>{delete state.answers[q.id];delete state.checked[q.id];});state.practiceStarted=true;save();render("practice",true);return;}
 const t=ev.target.closest?.("[data-g6-check]");if(!t)return;
 hydrate();const x=findItem(t.dataset.g6Check);if(!x)return;
 state.checked[x.q.id]=true;save();render(activeTab,true);
 const result=document.getElementById("g6-q-"+x.q.id)?.querySelector(".g6-result");if(result)result.scrollIntoView({block:"nearest"});
}
document.addEventListener("change",onChange);
document.addEventListener("input",onInput);
document.addEventListener("click",onClick);
global.renderGrade6Unit1=function(tab){render(tab||"knowledge",false);};
})(window);
