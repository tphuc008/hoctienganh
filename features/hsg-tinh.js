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

/* Part-level exam map: a question's format is determined by the source task, never by a manual MCQ/text toggle. */
const HSG_PARTS={
 "hai-phong":[["g1","Grammar & Vocabulary",21,40,"mcq",[2,3]],["g2","Guided Cloze",41,50,"mcq",[3,4]],["e","Error Correction",51,55,"error",[4]],["wf","Word Formation",56,60,"word",[4]],["oc","Reading · Open Cloze",61,75,"fill",[5]],["rc","Reading · Cloze",76,80,"mcq",[5]],["r","Reading Comprehension",81,90,"mcq",[6,7]],["w","Sentence Transformation",91,100,"rewrite",[7]],["essay","Paragraph Writing",1,1,"essay",[7]]],
 "dh-vinh":[["b1","Lexico-Grammar",1,20,"mcq",[3,5]],["b2","Error Correction",21,30,"error",[5]],["b3","Word Formation",31,40,"word",[4,5]],["c1","Reading · Freelancing",1,10,"mcq",[4,6]],["c2","Reading · YES / NO / NOT GIVEN",11,15,"ynng",[6,7]],["c3","Reading · Sentence Completion",16,18,"fill",[7]],["c4","Reading · Matching",19,23,"match",[7,8]],["c5","Reading · Telemedicine",24,33,"fill",[8]],["c6","Reading · Missing Sentences",34,40,"match",[8,9]],["d","Sentence Transformation",1,10,"rewrite",[9]],["essay","Essay Writing",1,1,"essay",[9]]],
 "phu-tho":[["g","Lexico-Grammar",21,35,"mcq",[3]],["wf","Word Formation",36,45,"word",[4]],["e","Error Correction",46,50,"error",[4]],["r1","Reading · Cloze",51,60,"mcq",[5]],["r2","Reading · Open Cloze",61,70,"fill",[5]],["r3","Reading Comprehension",71,80,"mcq",[6,7]],["w","Sentence Transformation",81,90,"rewrite",[7,8]],["essay","Paragraph Writing",1,1,"essay",[8]]],
 "son-la":[["g1","Green Transportation",26,30,"mcq",[3,4]],["g2","Paperless Exams",31,40,"mcq",[4,5]],["wf","Word Formation",41,45,"word",[5]],["pr","Prepositions & Articles",46,50,"fill",[5]],["oc","Open Cloze",51,55,"fill",[5,6]],["m","Matching Sections",56,60,"match",[6]],["r","Reading · AI in English Learning",61,67,"mcq",[6,7,8]],["h","Matching Headings",68,75,"match",[8,9]],["w","Sentence Transformation",76,80,"rewrite",[9]],["email","Email Writing",1,1,"essay",[9]],["essay","Paragraph Writing",1,1,"essay",[9]]],
 "tay-ninh":[["g","Grammar & Vocabulary",21,30,"mcq",[2,3]],["e","Error Correction",31,35,"error",[3]],["wf","Word Formation",36,45,"word",[3]],["c","Reading · Cloze",46,53,"mcq",[3,4]],["oc","Reading · Open Cloze",54,61,"fill",[4]],["r","Reading Comprehension",62,67,"mcq",[4,5]],["m","Reading · Matching",68,75,"match",[6]],["w","Sentence Transformation",76,85,"rewrite",[6,7]],["essay","Essay Writing",1,1,"essay",[7]]],
 "thanh-hoa":[["p","Phonetics & Stress",21,25,"mcq",[2]],["v","Verb Forms",26,30,"word",[3]],["wf","Word Formation",31,35,"word",[3]],["e","Error Correction",36,40,"error",[3]],["g","Grammar & Vocabulary",41,50,"mcq",[4]],["oc","Reading · Open Cloze",51,58,"fill",[4,5]],["c","Reading · Cloze",59,66,"mcq",[5]],["r","Reading · Digital Amnesia",67,74,"mcq",[5,6]],["m","Reading · Missing Sentences",75,80,"match",[7]],["w","Sentence Transformation",81,90,"rewrite",[7,8]],["essay","Essay Writing",1,1,"essay",[8]]],
 "phan-boi-chau":[["b1","Lexico-Grammar · MCQ",1,10,"mcq",[3]],["b2","Lexico-Grammar · Error Correction",1,10,"error",[4]],["b3","Lexico-Grammar · Word Formation",1,10,"word",[4,5]],["c1","Reading · Urban Living",1,10,"mcq",[5]],["c2","Reading · Human Memory",1,10,"fill",[6]],["c3","Reading · Chronotypes",1,8,"mcq",[6,7]],["c4","Reading · Matching Headings",1,6,"match",[8,9]],["c5","Reading · TRUE / FALSE / NOT GIVEN",7,12,"tfng",[8,9]],["d1","Sentence Transformation",1,5,"rewrite",[10]],["d2","Editorial Response",1,1,"essay",[10,11]],["d3","Essay Writing",1,1,"essay",[11,12]]],
 "ptnk":[["139","Mã đề 139",1,130,"mixed",[1,2,3,4,5,6,7,8,9,10]],["240","Mã đề 240",1,130,"mixed",[11,12,13,14,15,16,17,18,19,20]],["306","Mã đề 306",1,130,"mixed",[21,22,23,24,25,26,27,28,29,30]],["4","Mã đề thứ tư",1,130,"mixed",[31,32,33,34,35,36,37,38,39,40]]]
};
function mappedGroups(exam){
 return (HSG_PARTS[exam.id]||[]).map(([id,name,start,end,kind,pages])=>({id,name,start,end,kind,pages}));
}

const groups=exam=>mappedGroups(exam);
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
 const done=Object.keys(a).filter(k=>meaningfulAnswer(a[k])&&groups(exam).some(g=>k.startsWith(g.id+":"))).length;
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

function actualKind(g,n){
 if(g.kind!=="mixed")return g.kind;
 if(n<=60)return "mcq";
 if(n<=80)return "fill";
 if(n<=88)return "mcq";
 if(n<=95)return "match";
 if(n<=100)return "tfng";
 if(n<=105)return "fill";
 if(n<=115)return "word";
 if(n<=120)return "error";
 return "rewrite";
}
const HSG_HEADER=/(?:^|\n)[ \t]*(?:Question\s+|QUESTION\s+)?(\d{1,3})[.,)]\s*(?=\S)/g;
function sourcePages(g){return state.data.pages.filter(p=>g.pages.includes(Number(p.sourcePage)))}
function parseOptions(fragment){
 const hits=[],re=/(?:^|\s)([A-D])[.)]\s+(?=\S)/g;let m;
 while((m=re.exec(fragment)))hits.push({l:m[1],s:m.index,e:re.lastIndex});
 for(let i=0;i<hits.length-3;i++){
  const h=hits.slice(i,i+4);
  if(h.map(x=>x.l).join("")!=="ABCD")continue;
  const options=h.map((x,j)=>fragment.slice(x.e,j===3?Math.min(fragment.length,x.e+500):h[j+1].s).trim());
  options[3]=options[3].split(/\n(?:Your answers|YOUR ANSWERS|Part \d|SECTION [A-E]|Question\s+\d+|\d+\.\s)/i)[0].trim();
  if(options.every(x=>x.length&&x.length<=400))return {first:h[0].s,options};
 }
 return null;
}
function sourceSnippet(corpus,n){
 for(const p of corpus){const re=new RegExp("\\(\\s*"+n+"\\s*\\)\\s*[_–—]{2,}");const m=re.exec(p.t);
  if(m)return p.t.slice(Math.max(0,m.index-160),Math.min(p.t.length,m.index+170)).replace(/\s+/g," ").trim();
 }
 return "";
}
function essayStem(g){
 const txt=sourcePages(g).map(p=>p.text).join("\n");
 const special={d2:/PART 2\.\s*A popular national/i,d3:/PART 3\.\s*Write an essay/i,email:/PART 2\.\s*EMAIL WRITING/i};
 const match=(special[g.id]&&special[g.id].exec(txt))||/(?:Part \d+\.\s*Paragraph writing|Part \d+\.?\s*Write an essay|III\. Essay writing|PART 3\. PARAGRAPH WRITING|Some parents believe|Write an essay)/i.exec(txt);
 if(!match)return "Viết bài theo hướng dẫn trong đề gốc ở phần bên dưới.";
 return txt.slice(match.index,match.index+950).split(/(?:_{12,}|[-—]{7,}\s*HẾT)/i)[0].trim();
}
function getQuestion(g,n){
 const type=actualKind(g,n);
 if(type==="essay")return {type,stem:essayStem(g)};
 const pages=sourcePages(g).map(p=>({p:p.sourcePage,t:String(p.text||"").replace(/[\u200b\ufeff]/g,"")}));
 const choices=[];
 for(const p of pages){
  const re=new RegExp(HSG_HEADER.source,"g"),matches=[...p.t.matchAll(re)];
  for(let i=0;i<matches.length;i++){const match=matches[i];if(Number(match[1])!==n)continue;
   const fragment=p.t.slice(match.index+match[0].length,matches[i+1]?.index??p.t.length).trim();
   const op=parseOptions(fragment),stem=(op?fragment.slice(0,op.first):fragment).split(/\n(?:YOUR ANSWERS|Your answers)/)[0].trim();
   const score=(op?30:0)+Math.min(stem.length/20,30)-(fragment.length>1500?15:0);
   if(stem||op)choices.push({type,stem:stem.slice(0,900),options:op?.options||null,score});
  }
 }
 choices.sort((a,b)=>b.score-a.score);
 if(choices[0]){
  const q=choices[0];if(!q.stem&&q.options)q.stem=sourceSnippet(pages,n)||"Choose the correct option for gap ("+n+").";
  return q;
 }
 for(const p of pages){
  const m=new RegExp("\\(\\s*"+n+"\\s*(?:\\.\\s*[A-Z]+)?\\s*\\)\\s*[_–—]{2,}").exec(p.t);
  if(m)return {type,stem:p.t.slice(Math.max(0,m.index-140),Math.min(p.t.length,m.index+190)).replace(/\s+/g," ").trim()};
 }
 return {type,stem:""};
}
function meaningfulAnswer(v){return !!(v&&(String(v.value||"").trim()||String(v.error||"").trim()||String(v.correction||"").trim()))}
function answerCount(){return range(groups(state.exam).find(x=>x.id===state.group)).filter(n=>meaningfulAnswer(state.answers[key(n)])).length}
function renderExam(){
 const e=state.exam,g=groups(e).find(x=>x.id===state.group)||groups(e)[0];
 const total=g.end-g.start+1,done=answerCount(),pct=Math.round(done/total*100);
 const reading=/reading|cloze|matching|telemedicine|freelancing|memory|chronotypes|amnesia/i.test(g.name);
 const root=$("pageMount");root.style.display="block";
 root.innerHTML='<div class="hsg-root hsg-modern"><div class="breadcrumbs"><button class="crumb-btn" type="button" onclick="location.hash=\''+BASE+'\'">HSG tỉnh</button><span>›</span><span>'+esc(e.title)+'</span></div>'+
 '<div class="hsg-exam-head"><div><div class="hsg-kicker">INTERACTIVE EXAM · '+esc(e.year)+'</div><h1>'+esc(e.title)+'</h1><p>Chọn trực tiếp trên câu hỏi · Không có Listening · Chưa có đáp án hoặc giải thích</p></div><div class="hsg-exam-head-actions"><button type="button" class="hsg-light-btn" id="hsg-print">In</button><button type="button" class="hsg-main-btn" id="hsg-export">Xuất bài làm</button></div></div>'+
 '<div class="hsg-exam-progress"><div><b id="hsg-progress-num">'+done+'/'+total+'</b> câu đã làm <span id="hsg-save-status">Tự động lưu theo tài khoản</span></div><div class="hsg-progress-track"><i id="hsg-progress-fill" style="width:'+pct+'%"></i></div><strong id="hsg-progress-pct">'+pct+'%</strong></div>'+
 '<div class="hsg-group-tabs">'+groups(e).map(x=>'<button type="button" data-group="'+esc(x.id)+'" class="'+(x.id===g.id?'active':'')+'">'+esc(x.name)+'</button>').join("")+'</div>'+
 '<div class="hsg-study-layout'+(reading?' is-reading':'')+'"><main class="hsg-study-main">'+
 '<section class="hsg-study-question" id="hsg-answer-editor" aria-label="Câu hỏi"></section>'+
 '<details class="hsg-source-details"'+(reading?' open':'')+'><summary>Đọc đoạn văn / xem nguyên văn đề gốc</summary><div class="hsg-original-pages">'+sourcePages(g).map(p=>'<section><small>Trang '+esc(p.sourcePage)+'</small><pre>'+esc(p.text)+'</pre></section>').join("")+'</div></details>'+
 '</main><aside class="hsg-study-rail"><div class="hsg-study-rail-head"><strong>QUESTION MAP</strong><p>'+esc(g.name)+'</p></div><div class="hsg-number-grid">'+range(g).map(n=>'<button type="button" class="hsg-number'+(meaningfulAnswer(state.answers[key(n)])?' has-answer':'')+(state.review[key(n)]?' flagged':'')+(state.question===n?' selected':'')+'" data-question="'+n+'">'+n+'</button>').join("")+'</div><p class="hsg-study-rail-foot">Chọn số để chuyển câu. Màu xanh: đã trả lời; dấu vàng: cần xem lại.</p></aside></div></div>';
 root.querySelectorAll("[data-group]").forEach(b=>b.onclick=()=>{const next=groups(e).find(x=>x.id===b.dataset.group);state.group=next.id;state.question=next.start;renderExam();queueSave()});
 root.querySelectorAll("[data-question]").forEach(b=>b.onclick=()=>{state.question=Number(b.dataset.question);renderEditor();updateIndicators()});
 $("hsg-export").onclick=exportAnswers;$("hsg-print").onclick=()=>window.print();renderEditor();
}
function updateIndicators(){
 const g=groups(state.exam).find(x=>x.id===state.group),done=answerCount(),size=g.end-g.start+1,pct=Math.round(done/size*100);
 const num=$("hsg-progress-num");if(num)num.textContent=done+"/"+size;
 const p=$("hsg-progress-pct");if(p)p.textContent=pct+"%";
 const f=$("hsg-progress-fill");if(f)f.style.width=pct+"%";
 document.querySelectorAll(".hsg-study-rail [data-question]").forEach(b=>{
  const n=Number(b.dataset.question);b.classList.toggle("selected",n===state.question);
  b.classList.toggle("has-answer",meaningfulAnswer(state.answers[key(n)]));
  b.classList.toggle("flagged",!!state.review[key(n)]);
 });
}
function renderEditor(){
 const g=groups(state.exam).find(x=>x.id===state.group),n=state.question,k=key(n),q=getQuestion(g,n),saved=state.answers[k]||{value:""};
 const editor=$("hsg-answer-editor");if(!editor)return;
 const stem=q.stem||"Câu hỏi chưa được nhận dạng đầy đủ từ tài liệu quét. Xem nội dung đề gốc phía dưới.";
 const labels=q.type==="tfng"?["TRUE","FALSE","NOT GIVEN"]:q.type==="ynng"?["YES","NO","NOT GIVEN"]:q.type==="match"?["A","B","C","D","E","F","G","H","I"]:q.options||["A","B","C","D"];
 let inputs="";
 if(["mcq","match","tfng","ynng"].includes(q.type)){
  inputs='<div class="answers hsg-inline-options">'+labels.map((item,i)=>{
   const value=q.type==="tfng"||q.type==="ynng"?item:String.fromCharCode(65+i);
   const chosen=saved.value===value;
   return '<button type="button" class="answer'+(chosen?' selected':'')+'" data-hsg-value="'+esc(value)+'" aria-pressed="'+chosen+'"><span class="letter">'+esc(q.type==="mcq"||q.type==="match"?value:String.fromCharCode(65+i))+'</span><span>'+esc(item)+'</span></button>';
  }).join("")+'</div>'+(q.type==="mcq"&&!q.options?'<p class="hsg-source-warning">Chưa trích xuất đủ 4 phương án từ bản scan. Vui lòng đối chiếu mục nguyên văn bên dưới trước khi chọn.</p>':"");
 }else if(q.type==="error"){
  inputs='<div class="hsg-error-form"><label>Dòng / vị trí<input data-hsg-field="line" placeholder="Số dòng" value="'+esc(saved.line||"")+'"></label><label>Từ/cụm sai<input data-hsg-field="error" placeholder="Nhập lỗi" value="'+esc(saved.error||"")+'"></label><label>Sửa thành<input data-hsg-field="correction" placeholder="Nhập cách sửa" value="'+esc(saved.correction||"")+'"></label></div>';
 }else if(q.type==="rewrite"||q.type==="essay"){
  inputs='<label class="hsg-input-label">Bài làm<textarea data-hsg-field="value" rows="'+(q.type==="essay"?12:4)+'" placeholder="Nhập câu trả lời...">'+esc(saved.value||"")+'</textarea></label>'+(q.type==="essay"?'<span class="hsg-word-count" id="hsg-word-count">Số từ: '+(saved.value||"").trim().split(/\s+/).filter(Boolean).length+'</span>':"");
 }else{
  inputs='<label class="hsg-input-label">Điền đáp án<input type="text" data-hsg-field="value" autocomplete="off" placeholder="Nhập từ / cụm từ..." value="'+esc(saved.value||"")+'"></label>';
 }
 editor.innerHTML='<div class="hsg-question-kicker"><span>QUESTION '+String(n).padStart(2,"0")+'</span><span>'+esc(q.type.toUpperCase().replace("MCQ","MULTIPLE CHOICE"))+'</span></div>'+
 '<div class="hsg-question-stem">'+esc(stem)+'</div><p class="hsg-form-note">Trả lời trực tiếp bên dưới. Bài làm được lưu; chưa có tính năng chấm điểm.</p>'+inputs+
 '<div class="hsg-question-actions"><button type="button" id="hsg-clear">Xóa câu trả lời</button><button type="button" id="hsg-flag">'+(state.review[k]?'★ Đã đánh dấu':'☆ Đánh dấu xem lại')+'</button></div>'+
 '<div class="hsg-question-nav"><button class="secondary" id="hsg-prev-question" type="button"'+(n===g.start?' disabled':'')+'>← Câu trước</button><span>'+ (n-g.start+1)+' / '+(g.end-g.start+1)+'</span><button class="primary" id="hsg-next-question" type="button"'+(n===g.end?' disabled':'')+'>Câu tiếp theo →</button></div>';
 editor.querySelectorAll("[data-hsg-value]").forEach(b=>b.onclick=()=>{state.answers[k]={type:q.type,value:b.dataset.hsgValue};queueSave();renderEditor();updateIndicators()});
 editor.querySelectorAll("[data-hsg-field]").forEach(el=>el.oninput=()=>{
  state.answers[k]={...state.answers[k],type:q.type,[el.dataset.hsgField]:el.value};queueSave();updateIndicators();
  const wc=$("hsg-word-count");if(wc&&el.dataset.hsgField==="value")wc.textContent="Số từ: "+el.value.trim().split(/\s+/).filter(Boolean).length;
 });
 $("hsg-flag").onclick=()=>{state.review[k]=!state.review[k];queueSave();renderEditor();updateIndicators()};
 $("hsg-clear").onclick=()=>{delete state.answers[k];queueSave();renderEditor();updateIndicators()};
 $("hsg-prev-question").onclick=()=>{state.question--;renderEditor();updateIndicators();queueSave()};
 $("hsg-next-question").onclick=()=>{state.question++;renderEditor();updateIndicators();queueSave()};
 updateIndicators();
}

function exportAnswers(){
 const e=state.exam, lines=["ENGLISH PRACTICE HUB","HSG tỉnh · "+e.title,e.year,"Không bao gồm Listening",""];
 groups(e).forEach(g=>{lines.push("=== "+g.name+" ===");for(const n of range(g)){const r=state.answers[g.id+":"+n];if(meaningfulAnswer(r))lines.push(n+". "+(r.type==="error"?[r.line,r.error,"→",r.correction].filter(Boolean).join(" "):(r.value||""))+(state.review[g.id+":"+n]?" [Xem lại]":""))}lines.push("")});
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
