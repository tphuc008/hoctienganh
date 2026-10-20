/* HSG tỉnh: document-based exam practice. No answer keys or Listening materials. */
(function(global){
"use strict";
const CONFIGS=[
 {id:"hai-phong",title:"Hải Phòng",subtitle:"Đề Tiếng Anh chuyên",year:"2026–2027",start:21,end:100},
 {id:"dh-vinh",title:"Đại học Vinh",subtitle:"Trường THPT chuyên · Vòng 2",year:"2026–2027",
  groups:[{id:"b",name:"Vocabulary & Grammar",start:1,end:40},{id:"c",name:"Reading",start:1,end:40},{id:"d",name:"Writing",start:1,end:10}]},
 {id:"phu-tho",title:"Phú Thọ",subtitle:"Đề Tiếng Anh chuyên",year:"2026–2027",start:21,end:100},
 {id:"son-la",title:"Sơn La",subtitle:"Đề Tiếng Anh chuyên",year:"2026–2027",start:26,end:85},
 {id:"tay-ninh",title:"Tây Ninh",subtitle:"Đề Tiếng Anh chuyên",year:"2026–2027",start:21,end:85},
 {id:"thanh-hoa",title:"Thanh Hóa",subtitle:"Đề Tiếng Anh chuyên",year:"2026–2027",start:21,end:100},
 {id:"phan-boi-chau",title:"Chuyên Phan Bội Châu",subtitle:"Nghệ An · Tiếng Anh chuyên",year:"2026–2027",
  groups:[{id:"b",name:"Lexico-Grammar",start:1,end:30},{id:"c",name:"Reading",start:1,end:40},{id:"d",name:"Writing",start:1,end:30}]},
 {id:"ptnk",title:"Phổ thông Năng khiếu",subtitle:"ĐHQG TP.HCM · Tiếng Anh chuyên",year:"2026–2027",
  groups:[{id:"139",name:"Mã đề 139",start:1,end:130},{id:"240",name:"Mã đề 240",start:1,end:130},{id:"306",name:"Mã đề 306",start:1,end:130},{id:"4",name:"Mã đề thứ tư",start:1,end:130}]}
];
const BASE="teacher/hsg-tinh";
const CACHE=new Map();
const state={exam:null,data:null,page:0,group:"main",question:21,tab:"all",mode:"mcq",answers:{},review:{},saveTimer:null};
const $=id=>document.getElementById(id);
const esc=value=>String(value==null?"":value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
const groups=exam=>exam.groups||[{id:"main",name:"Toàn bộ đề",start:exam.start,end:exam.end}];
const range=g=>Array.from({length:g.end-g.start+1},(_,i)=>g.start+i);
const key=q=>state.group+":"+q;
const draftSlug=exam=>"hsg-tinh/"+exam.id;
function readDraft(exam){
 try{return global.LearningCore?.readDraft("exam",draftSlug(exam))||{}}catch(_){return {}}
}
function save(){
 if(!state.exam)return;
 try{global.LearningCore?.writeDraft("exam",draftSlug(state.exam),
  {answers:state.answers,review:state.review,group:state.group,page:state.page,question:state.question,updatedAt:new Date().toISOString()});
  const status=$("hsg-save-status");if(status)status.textContent="Đã lưu trên thiết bị theo tài khoản";
 }catch(e){const status=$("hsg-save-status");if(status)status.textContent="Chưa lưu được: "+e.message}
}
function queueSave(){const s=$("hsg-save-status");if(s)s.textContent="Đang lưu…";clearTimeout(state.saveTimer);state.saveTimer=setTimeout(save,250)}
function meta(exam){return '<span class="hsg-chip">'+esc(exam.year)+'</span><span class="hsg-chip hsg-chip-subtle">Không có Listening</span>'}
function progressFor(exam){
 const draft=readDraft(exam), a=draft.answers||{};
 const max=groups(exam).reduce((t,g)=>t+(g.end-g.start+1),0);
 const done=Object.keys(a).filter(k=>String(a[k]?.value||"").trim()).length;
 return {done,max,pct:Math.round(100*done/Math.max(max,1))};
}
function opening(){
 const root=$("pageMount"); if(!root)return;
 root.style.display="block";
 root.innerHTML='<div class="hsg-root"><div class="breadcrumbs"><button class="crumb-btn" type="button" onclick="location.hash=\'\'">Home</button><span>›</span><span>HSG tỉnh</span></div>'+
 '<div class="hsg-hero"><div class="hsg-kicker">TEACHER PREVIEW · EXAM LIBRARY</div><h1>Đề thi <span>Tiếng Anh chuyên</span></h1>'+
 '<p>Luyện đề trực tiếp, đánh dấu câu cần xem lại và lưu tiến độ. Đã loại bỏ toàn bộ phần Listening.</p>'+
 '<div class="hsg-hero-facts"><span>8 bộ đề</span><span>Năm học 2026–2027</span><span>Chưa có đáp án và lời giải</span></div></div>'+
 '<div class="hsg-catalogue-title"><div><h2>Thư viện đề thi</h2><p>Chọn một đề để bắt đầu hoặc tiếp tục bài đang làm.</p></div><span class="hsg-hint">Tự động lưu câu trả lời</span></div>'+
 '<div class="hsg-grid">'+CONFIGS.map((e,i)=>{
 const p=progressFor(e);
 return '<button class="hsg-exam-card" type="button" data-exam="'+esc(e.id)+'">'+
 '<div class="hsg-card-upper"><span class="hsg-card-number">'+String(i+1).padStart(2,"0")+'</span><span class="hsg-card-arrow">↗</span></div>'+
 '<h3>'+esc(e.title)+'</h3><p>'+esc(e.subtitle)+'</p><div class="hsg-card-chips">'+meta(e)+'</div>'+
 '<div class="hsg-card-bottom"><span>'+p.done+' câu đã làm</span><strong>'+p.pct+'%</strong></div><div class="hsg-mini-track"><i style="width:'+p.pct+'%"></i></div></button>'}).join("")+'</div>'+
 '<div class="hsg-info"><b>Giai đoạn thử nghiệm</b><span>Có thể chọn A–D hoặc nhập câu trả lời tự luận, lưu nháp và in phiếu trả lời. Chưa chấm điểm, chưa tiết lộ đáp án.</span></div></div>';
 root.querySelectorAll("[data-exam]").forEach(el=>el.addEventListener("click",()=>{location.hash=BASE+"/"+el.dataset.exam}));
}
async function getExamData(id){
 if(CACHE.has(id))return CACHE.get(id);
 const resp=await fetch("content/hsg-tinh/"+id+".txt?v=20261021-v1",{cache:"no-store"});
 if(!resp.ok)throw new Error("Chưa thể tải dữ liệu đề "+id+" ("+resp.status+")");
 const b64=(await resp.text()).trim();
 if(!b64)throw new Error("Đề chưa có nội dung");
 if(typeof DecompressionStream==="undefined")throw new Error("Trình duyệt chưa hỗ trợ định dạng đề. Vui lòng cập nhật trình duyệt.");
 const bytes=Uint8Array.from(atob(b64),c=>c.charCodeAt(0));
 const stream=new Blob([bytes]).stream().pipeThrough(new DecompressionStream("gzip"));
 const result=JSON.parse(await new Response(stream).text());
 if(!Array.isArray(result.pages)||!result.pages.length)throw new Error("Dữ liệu đề chưa hợp lệ");
 if(result.id!==id)throw new Error("Mã đề không khớp");
 CACHE.set(id,result);
 return result;
}
function answerCount(){
 const a=state.answers;
 return Object.entries(a).filter(([k,v])=>String(v?.value||"").trim()&&k.startsWith(state.group+":")).length;
}
function renderExam(){
 const e=state.exam, data=state.data, g=groups(e).find(x=>x.id===state.group)||groups(e)[0];
 const max=g.end-g.start+1;
 const done=answerCount();
 const pct=Math.round(done*100/max);
 const pageCount=data.pages.length;
 if(state.page>=pageCount)state.page=pageCount-1;
 const text=data.pages[state.page]?.text||"";
 const root=$("pageMount");
 root.style.display="block";
 root.innerHTML='<div class="hsg-root hsg-exam-root">'+
 '<div class="breadcrumbs"><button class="crumb-btn" type="button" onclick="location.hash=\''+BASE+'\'">HSG tỉnh</button><span>›</span><span>'+esc(e.title)+'</span></div>'+
 '<div class="hsg-exam-head"><div><div class="hsg-kicker">BÀI LUYỆN TẬP · '+esc(e.year)+'</div><h1>'+esc(e.title)+'</h1>'+
 '<p>'+esc(e.subtitle)+' · Không bao gồm Listening · Chưa có đáp án và giải thích</p></div>'+
 '<div class="hsg-exam-head-actions"><button id="hsg-print" type="button" class="hsg-light-btn">In phiếu trả lời</button>'+
 '<button id="hsg-export" type="button" class="hsg-main-btn">Xuất câu trả lời</button></div></div>'+
 '<div class="hsg-exam-progress"><div><b>'+done+'/'+max+'</b> câu đã trả lời <span id="hsg-save-status">Tự động lưu câu trả lời</span></div>'+
 '<div class="hsg-progress-track"><i style="width:'+pct+'%"></i></div><strong>'+pct+'%</strong></div>'+
 (groups(e).length>1?'<div class="hsg-group-tabs">'+groups(e).map(x=>'<button type="button" data-group="'+esc(x.id)+'" class="'+(x.id===state.group?'active':'')+'">'+esc(x.name)+'</button>').join("")+'</div>':"")+
 '<div class="hsg-layout"><section class="hsg-paper-panel" aria-label="Nội dung đề thi">'+
 '<div class="hsg-paper-toolbar"><div><b>Đề gốc · Trang '+(state.page+1)+'/'+pageCount+'</b><small>Trang '+esc(data.pages[state.page].sourcePage)+' trong tài liệu</small></div>'+
 '<div class="hsg-page-actions"><button type="button" id="hsg-prev" '+(state.page===0?'disabled':'')+' aria-label="Trang trước">←</button>'+
 '<select id="hsg-page" aria-label="Chọn trang">'+data.pages.map((p,i)=>'<option value="'+i+'" '+(state.page===i?'selected':'')+'>Trang '+(i+1)+'</option>').join("")+'</select>'+
 '<button type="button" id="hsg-next" '+(state.page>=pageCount-1?'disabled':'')+' aria-label="Trang tiếp">→</button></div></div>'+
 '<div class="hsg-paper" id="hsg-paper" tabindex="0"><div class="hsg-paper-eyebrow">ENGLISH SPECIALIZED ENTRANCE EXAM</div>'+
 '<pre>'+esc(text)+'</pre></div>'+
 '<div class="hsg-paper-footer">Nội dung được chuyển từ tài liệu đề gốc. Đối chiếu kỹ công thức, dấu câu và sơ đồ trong bản gốc trước khi sử dụng chính thức.</div>'+
 '</section>'+
 '<aside class="hsg-answer-panel" aria-label="Phiếu trả lời"><div class="hsg-answer-title"><div><b>Phiếu trả lời</b><p>Chọn số câu bên dưới</p></div><span class="hsg-answer-count">'+done+'/'+max+'</span></div>'+
 '<div class="hsg-legend"><span><i></i>Chưa làm</span><span><i class="answered"></i>Đã trả lời</span><span><i class="flagged"></i>Xem lại</span></div>'+
 '<div class="hsg-number-grid">'+range(g).map(n=>{const q=key(n),v=state.answers[q];return '<button class="hsg-number '+(v?.value?'has-answer ':'')+(state.review[q]?'flagged ':'')+(state.question===n?'selected':'')+'" type="button" data-question="'+n+'" aria-label="Câu '+n+'">'+n+'</button>'}).join("")+'</div>'+
 '<div class="hsg-answer-editor" id="hsg-answer-editor"></div></aside></div></div>';
 root.querySelectorAll("[data-group]").forEach(b=>b.addEventListener("click",()=>{state.group=b.dataset.group;const ng=groups(e).find(x=>x.id===state.group);state.question=ng.start;renderExam();queueSave()}));
 root.querySelectorAll("[data-question]").forEach(b=>b.addEventListener("click",()=>{state.question=Number(b.dataset.question);renderEditor();root.querySelectorAll("[data-question]").forEach(el=>el.classList.toggle("selected",Number(el.dataset.question)===state.question))}));
 $("hsg-prev").onclick=()=>pageTo(state.page-1);
 $("hsg-next").onclick=()=>pageTo(state.page+1);
 $("hsg-page").onchange=ev=>pageTo(Number(ev.target.value));
 $("hsg-export").onclick=exportAnswers;
 $("hsg-print").onclick=()=>window.print();
 renderEditor();
}
function pageTo(page){if(page<0||page>=state.data.pages.length)return;state.page=page;renderExam();queueSave()}
function renderEditor(){
 const num=state.question,k=key(num),r=state.answers[k]||{type:"mcq",value:""};
 const editor=$("hsg-answer-editor");if(!editor)return;
 editor.innerHTML='<div class="hsg-editor-top"><b>Câu '+num+'</b><button type="button" id="hsg-flag" class="'+(state.review[k]?'active':'')+'">'+(state.review[k]?'★ Đã đánh dấu':'☆ Đánh dấu')+'</button></div>'+
 '<div class="hsg-mode-choice"><button id="hsg-mcq" type="button" class="'+(r.type==="mcq"?'active':'')+'">Trắc nghiệm</button>'+
 '<button id="hsg-text" type="button" class="'+(r.type==="text"?'active':'')+'">Tự luận / điền từ</button></div>'+
 (r.type==="text"?'<textarea id="hsg-written" rows="4" placeholder="Nhập câu trả lời..." aria-label="Câu trả lời câu '+num+'">'+esc(r.value)+'</textarea>':
 '<div class="hsg-letter-grid">'+["A","B","C","D"].map(v=>'<button type="button" data-choice="'+v+'" class="'+(r.value===v?'selected':'')+'">'+v+'</button>').join("")+'</div>')+
 '<div class="hsg-editor-foot"><button type="button" id="hsg-clear">Xóa câu trả lời</button><button type="button" id="hsg-forward">Câu tiếp theo →</button></div>';
 $("hsg-flag").onclick=()=>{state.review[k]=!state.review[k];queueSave();renderExam()};
 ["mcq","text"].forEach(type=>{$("hsg-"+type).onclick=()=>{state.answers[k]={type,value:""};renderEditor();queueSave()}});
 editor.querySelectorAll("[data-choice]").forEach(b=>b.addEventListener("click",()=>{state.answers[k]={type:"mcq",value:b.dataset.choice};queueSave();renderExam()}));
 const input=$("hsg-written");
 if(input)input.oninput=ev=>{state.answers[k]={type:"text",value:ev.target.value};queueSave();const b=document.querySelector('[data-question="'+num+'"]');b?.classList.toggle("has-answer",!!ev.target.value.trim());const g=groups(state.exam).find(x=>x.id===state.group);const done=answerCount();const counter=document.querySelector(".hsg-answer-count");if(counter)counter.textContent=done+"/"+(g.end-g.start+1)};
 $("hsg-clear").onclick=()=>{delete state.answers[k];queueSave();renderExam()};
 $("hsg-forward").onclick=()=>{const g=groups(state.exam).find(x=>x.id===state.group);state.question=num>=g.end?g.start:num+1;queueSave();renderExam()};
}
function exportAnswers(){
 const e=state.exam, lines=["ENGLISH PRACTICE HUB","HSG tỉnh · "+e.title,e.year,"Không bao gồm Listening",""];
 groups(e).forEach(g=>{lines.push("=== "+g.name+" ===");for(const n of range(g)){const r=state.answers[g.id+":"+n];if(r?.value)lines.push(n+". "+r.value+(state.review[g.id+":"+n]?" [Xem lại]":""))}lines.push("")});
 const blob=new Blob([lines.join("\n")],{type:"text/plain;charset=utf-8"});
 const url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download="hsg-"+e.id+"-cau-tra-loi.txt";a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
async function open(hash){
 const route=String(hash||"").replace(/^#/,"");
 const match=route.match(/^teacher\/hsg-tinh(?:\/([a-z0-9-]+))?$/);
 if(!match){location.hash=BASE;return}
 if(!match[1]){opening();return}
 const e=CONFIGS.find(x=>x.id===match[1]);if(!e){location.hash=BASE;return}
 const root=$("pageMount");root.style.display="block";
 root.innerHTML='<div class="hsg-root"><div class="breadcrumbs"><button class="crumb-btn" type="button" onclick="location.hash=\''+BASE+'\'">HSG tỉnh</button><span>›</span><span>'+esc(e.title)+'</span></div><div class="hsg-loading">Đang mở bộ đề '+esc(e.title)+'…</div></div>';
 try{
  const data=await getExamData(e.id);if(location.hash.slice(1)!==route)return;
  state.exam=e;state.data=data;
  const draft=readDraft(e);
  state.answers=draft.answers||{};state.review=draft.review||{};
  state.group=groups(e).some(x=>x.id===draft.group)?draft.group:groups(e)[0].id;
  state.page=Math.min(Math.max(0,draft.page||0),data.pages.length-1);
  const g=groups(e).find(x=>x.id===state.group);
  state.question=Number.isInteger(draft.question)&&draft.question>=g.start&&draft.question<=g.end?draft.question:g.start;
  renderExam();
 }catch(error){
  root.innerHTML='<div class="hsg-root"><div class="breadcrumbs"><button class="crumb-btn" type="button" onclick="location.hash=\''+BASE+'\'">HSG tỉnh</button></div><div class="empty"><b>Không tải được đề thi</b>'+esc(error.message)+'</div></div>';
 }
}
global.TeacherHSG={open,catalogue:CONFIGS};
})(window);
