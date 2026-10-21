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
 "hai-phong":[["g1","Grammar & Vocabulary",21,40,"mcq",[2,3]],["g2a","Guided Cloze · Advertisement",41,45,"mcq",[3]],["g2b","Guided Cloze · Letter",46,50,"mcq",[3,4]],["e","Error Correction",51,55,"error",[4]],["wf","Word Formation",56,60,"word",[4]],["oc","Reading · Open Cloze",61,75,"fill",[5]],["rc","Reading · Cloze",76,80,"mcq",[5]],["r","Reading Comprehension",81,90,"mcq",[6,7]],["w","Sentence Transformation",91,100,"rewrite",[7]],["essay","Paragraph Writing",1,1,"essay",[7]]],
 "dh-vinh":[["b1","Lexico-Grammar",1,20,"mcq",[3,5]],["b2","Error Correction",21,30,"error",[5]],["b3","Word Formation",31,40,"word",[4,5]],["c1","Reading · Freelancing",1,10,"mcq",[4,6]],["c2","Reading · YES / NO / NOT GIVEN",11,15,"ynng",[6,7]],["c3","Reading · Sentence Completion",16,18,"fill",[7]],["c4","Reading · Matching",19,23,"match",[7,8]],["c5","Reading · Telemedicine",24,33,"fill",[8]],["c6","Reading · Missing Sentences",34,40,"match",[8,9]],["d","Sentence Transformation",1,10,"rewrite",[9]],["essay","Essay Writing",1,1,"essay",[9]]],
 "phu-tho":[["g","Lexico-Grammar",21,35,"mcq",[3]],["wf","Word Formation",36,45,"word",[4]],["e","Error Correction",46,50,"error",[4]],["r1","Reading · Cloze",51,60,"mcq",[5]],["r2","Reading · Open Cloze",61,70,"fill",[5]],["r3","Reading Comprehension",71,80,"mcq",[6,7]],["w","Sentence Transformation",81,90,"rewrite",[7,8]],["essay","Paragraph Writing",1,1,"essay",[8]]],
 "son-la":[["g1","Green Transportation",26,30,"mcq",[3,4]],["g2","Paperless Exams",31,40,"mcq",[4,5]],["wf","Word Formation",41,45,"word",[5]],["pr","Prepositions & Articles",46,50,"fill",[5]],["oc","Open Cloze",51,55,"fill",[5,6]],["m","Matching Sections",56,60,"match",[6]],["r","Reading · AI in English Learning",61,67,"mcq",[6,7,8]],["h","Matching Headings",68,71,"match",[8,9]],["tf","TRUE / FALSE / NOT GIVEN",72,75,"tfng",[9]],["w","Sentence Transformation",76,80,"rewrite",[9]],["email","Email Writing",1,1,"essay",[9]],["essay","Paragraph Writing",1,1,"essay",[9]]],
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
 '<p>Luyện đề · Đánh dấu câu · Tự lưu · Không Listening.</p>'+
 '<div class="hsg-hero-facts"><span>8 bộ đề</span><span>Năm học 2026–2027</span><span>Chưa có đáp án và lời giải</span></div></div>'+
 '<div class="hsg-catalogue-title"><div><h2>Thư viện đề thi</h2><p>Chọn đề để bắt đầu hoặc tiếp tục.</p></div><span class="hsg-hint">Tự lưu</span></div>'+
 '<div class="hsg-grid">'+CONFIGS.map((e,i)=>{
 const p=progressFor(e);
 return '<button class="hsg-exam-card" type="button" data-exam="'+esc(e.id)+'">'+
 '<div class="hsg-card-upper"><span class="hsg-card-number">'+String(i+1).padStart(2,"0")+'</span><span class="hsg-card-arrow">↗</span></div>'+
 '<h3>'+esc(e.title)+'</h3><p>'+esc(e.subtitle)+'</p><div class="hsg-card-chips">'+meta(e)+'</div>'+
 '<div class="hsg-card-bottom"><span>'+p.done+' câu đã làm</span><strong>'+p.pct+'%</strong></div><div class="hsg-mini-track"><i style="width:'+p.pct+'%"></i></div></button>'}).join("")+'</div>'+
 '<div class="hsg-info"><b>Giai đoạn thử nghiệm</b><span>Chọn A–D hoặc nhập tự luận · Lưu nháp, in phiếu · Chưa chấm điểm.</span></div></div>';
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
 if(!match)return "Xem yêu cầu viết trong đề gốc bên dưới.";
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

/* Shared-passage activities follow the Grade 12 Reading split-workspace pattern. */

/* PTNK contains several passage-based subtasks within each 130-item paper. */
const PTNK_PASSAGE_BLOCKS=[
 {start:41,end:50,title:"Guided Cloze 1",pages:[3,4]},
 {start:51,end:60,title:"Guided Cloze 2",pages:[4]},
 {start:61,end:70,title:"Open Cloze 1",pages:[5]},
 {start:71,end:80,title:"Open Cloze 2",pages:[5]},
 {start:81,end:88,title:"Reading Passage 1",pages:[5,6]},
 {start:89,end:95,title:"Reading Passage 2",pages:[7,8]},
 {start:96,end:100,title:"Reading Passage 3",pages:[8,9]},
 {start:101,end:105,title:"Summary Completion",pages:[9]},
 {start:116,end:120,title:"Error Correction",pages:[10]}
];
function activePassageBlock(g,n=state.question){
 if(state.exam?.id!=="ptnk"||g?.kind!=="mixed")return null;
 return PTNK_PASSAGE_BLOCKS.find(b=>n>=b.start&&n<=b.end)||null;
}
function visibleQuestionNumbers(g){
 const block=activePassageBlock(g);
 return block?Array.from({length:block.end-block.start+1},(_,i)=>block.start+i):range(g);
}

function passageBased(g){
 if(!g)return false;
 if(g.kind==="mixed")return !!activePassageBlock(g);
 return ["error","fill","match","tfng","ynng"].includes(g.kind)
   || /\b(cloze|reading|passage|headings|matching)\b/i.test(g.name);
}
/* Isolate ONE exercise passage, never dump the whole PDF page into the left pane. */
function passageOnly(g,n=state.question){
 const blocks=sourcePages(g);
 const all=blocks.map(p=>String(p.text||"")).join("\n").replace(/[\u200b\ufeff]/g,"");
 const id=(state.exam?.id||"")+":"+g.id;
 const fixed={
   "hai-phong:g2a":{from:"Zero Carbon, Infinite Possibilities: Reserve Your Smart Home",to:/Question\s+41\./i},
   "hai-phong:g2b":{from:"CHANGES IN OFFICE WORKING HOURS",to:/Question\s+46\./i},
   "hai-phong:e":{from:"Peer pressure is a psychological force",to:/Question\s+51\./i}
 };
 if(fixed[id]){
  const cfg=fixed[id],start=all.indexOf(cfg.from);
  if(start>=0){const end=all.slice(start).search(cfg.to);if(end>=0)return all.slice(start,start+end).trim()}
 }
 const active=activePassageBlock(g,n),startQ=active?.start??g.start;
 const marker=new RegExp("(?:^|\\n)\\s*(?:Question\\s*)?"+startQ+"[.\\)]\\s+(?:A[.\\)]|\\w)","i");
 const match=marker.exec(all);
 const before=match?all.slice(0,match.index):all;
 const patterns=[
  /(?:Read the following|Read the passage|Complete the following|Identify the FIVE errors|Identify \d+ errors|Guided cloze [12]:?)[^\n]{0,220}/gi,
  /(?:^|\n)(?:PART|Part|SECTION|Section)\s*[1-6IVX]+[.:\s][^\n]{0,80}/gm
 ];
 let begin=-1;
 for(const re of patterns){for(const m of before.matchAll(re)){if(m.index>begin)begin=m.index}}
 let section=(begin>=0?before.slice(begin):before.slice(-3400)).trim();
 // Do not include preceding answer tables; the passage is text BEFORE the first answer choices.
 section=section.replace(/\n(?:Question|QUESTION)\s+\d{1,3}\.\s*A[.)][\s\S]*$/,"").trim();
 if(section.length>5000)section=section.slice(-5000);
 return section||"Ngữ liệu của phần này đang được rà soát để tách đúng từ đề gốc.";
}
function originalPages(g){
 const passage=passageOnly(g);
 const escaped=esc(passage);
 const n=state.question;
 // Highlight the relevant blank without modifying the underlying text.
 const highlighted=escaped.replace(new RegExp("(\\("+n+"\\)|_{1,3}"+n+"_{1,5})","g"),'<mark class="hsg-passage-current">$1</mark>');
 return '<section class="hsg-passage-page"><pre>'+highlighted+'</pre></section>';
}

function passageQuestionLabels(g,q){
 if(q.type==="tfng")return [["TRUE","TRUE"],["FALSE","FALSE"],["NOT GIVEN","NOT GIVEN"]];
 if(q.type==="ynng")return [["YES","YES"],["NO","NO"],["NOT GIVEN","NOT GIVEN"]];
 if(q.type==="match")return matchingLabels(g);
 return (q.options||["A","B","C","D"]).map((text,i)=>[String.fromCharCode(65+i),text]);
}
function passageInput(g,n,q,r){
 const k=g.id+":"+n;
 if(["mcq","match","tfng","ynng"].includes(q.type)){
  const labels=passageQuestionLabels(g,q);
  return '<div class="answers hsg-inline-options hsg-split-options" role="group" aria-label="Đáp án câu '+n+'">'+labels.map(([value,label])=>
   '<button type="button" class="answer'+(r.value===value?' selected':'')+'" data-hsg-choice="'+esc(value)+'" aria-pressed="'+(r.value===value)+'"><span class="letter">'+esc(value)+'</span><span>'+esc(label)+'</span></button>'
  ).join("")+'</div>'+(q.type==="mcq"&&!q.options?'<p class="hsg-source-warning">Thiếu phương án · Xem đề gốc bên trái.</p>':"");
 }
 if(q.type==="error")return '<div class="hsg-error-form hsg-split-error">'+
  '<label>Vị trí / dòng<input data-hsg-field="line" placeholder="Dòng số..." value="'+esc(r.line||"")+'"></label>'+
  '<label>Từ hoặc cụm sai<input data-hsg-field="error" placeholder="Từ/cụm cần sửa" value="'+esc(r.error||"")+'"></label>'+
  '<label>Sửa thành<input data-hsg-field="correction" placeholder="Đáp án của bạn" value="'+esc(r.correction||"")+'"></label></div>';
 if(q.type==="essay"||q.type==="rewrite")return '<label class="hsg-input-label">Bài làm<textarea rows="'+(q.type==="essay"?10:4)+'" data-hsg-field="value" placeholder="Nhập bài làm...">'+esc(r.value||"")+'</textarea></label>';
 return '<label class="hsg-input-label">Câu trả lời<input type="text" data-hsg-field="value" placeholder="Nhập từ hoặc cụm từ..." value="'+esc(r.value||"")+'" autocomplete="off"></label>';
}
function renderPassageForms(g){
 const mount=$("hsg-answer-list");if(!mount)return;
 const n=state.question,k=g.id+":"+n,q=getQuestion(g,n),r=state.answers[k]||{};
 // The passage stays on the LEFT. The RIGHT contains the current question's choices only.
 const concisePrompt=q.type==="error"?"Tìm một lỗi trong đoạn văn và nhập cách sửa.":q.type==="rewrite"?"Viết lại câu theo yêu cầu.":"";
 mount.innerHTML='<div class="hsg-current-heading"><span>CÂU '+n+'</span><small>'+esc(activePassageBlock(g)?.title||g.name)+'</small></div>'+
 (concisePrompt?'<p class="hsg-current-instruction">'+esc(concisePrompt)+'</p>':"")+
 '<article class="hsg-current-form" id="hsg-question-'+n+'" data-hsg-question="'+n+'">'+passageInput(g,n,q,r)+'</article>'+
 '<div class="hsg-current-foot"><button type="button" data-hsg-flag aria-pressed="'+!!state.review[k]+'">'+(state.review[k]?'★ Đã đánh dấu':'☆ Đánh dấu để xem lại')+'</button><button type="button" data-hsg-clear>Xóa lựa chọn</button></div>';
 const card=mount.querySelector(".hsg-current-form");
 card.querySelectorAll("[data-hsg-choice]").forEach(btn=>btn.onclick=()=>{
  state.answers[k]={type:q.type,value:btn.dataset.hsgChoice};
  card.querySelectorAll("[data-hsg-choice]").forEach(b=>{const selected=b===btn;b.classList.toggle("selected",selected);b.setAttribute("aria-pressed",String(selected))});
  updateIndicators();queueSave();
 });
 card.querySelectorAll("[data-hsg-field]").forEach(input=>input.oninput=()=>{
  state.answers[k]={...state.answers[k],type:q.type,[input.dataset.hsgField]:input.value};
  updateIndicators();queueSave();
 });
 mount.querySelector("[data-hsg-flag]").onclick=()=>{
  state.review[k]=!state.review[k];renderPassageForms(g);updateIndicators();queueSave();
 };
 mount.querySelector("[data-hsg-clear]").onclick=()=>{
  delete state.answers[k];renderPassageForms(g);updateIndicators();queueSave();
 };
 const nav=document.getElementById("hsg-passage-nav");
 if(nav){
  const rangeData=visibleQuestionNumbers(g),first=rangeData[0],last=rangeData[rangeData.length-1];
  nav.innerHTML='<button type="button" id="hsg-passage-prev"'+(n<=first?' disabled':'')+'>← Câu trước</button>'+
    '<span>Câu '+n+' / '+last+'</span><button type="button" id="hsg-passage-next"'+(n>=last?' disabled':'')+'>Câu tiếp →</button>';
  const navigate=next=>{
   if(next<first||next>last)return;
   state.question=next;
   renderPassageForms(g);
   const text=$("hsg-passage-left-body");if(text)text.innerHTML=originalPages(g);
   updateIndicators();queueSave();
  };
  nav.querySelector("#hsg-passage-prev").onclick=()=>navigate(n-1);
  nav.querySelector("#hsg-passage-next").onclick=()=>navigate(n+1);
 }
}

function updatePassageStatus(card,k){
 const node=card.querySelector(".hsg-split-answer-status");
 if(node)node.textContent=meaningfulAnswer(state.answers[k])?"Đã trả lời":"Chưa trả lời";
}
function focusPassageQuestion(n){
 const g=groups(state.exam).find(x=>x.id===state.group);
 const before=activePassageBlock(g);
 state.question=n;
 const after=activePassageBlock(g);
 if((before?.start??-1)!==(after?.start??-1)){renderExam();return}
 renderPassageForms(g);
 const body=$("hsg-passage-left-body");if(body)body.innerHTML=originalPages(g);
}

/* Same adjustable divider convention as the published Grade 12 Reading workspace. */
function setupPassageDivider(){
 const grid=document.querySelector(".hsg-passage-workspace"),divider=document.querySelector(".hsg-passage-divider");
 if(!grid||!divider)return;
 let dragging=false;
 const resize=event=>{
  if(!dragging||grid.getBoundingClientRect().width<650)return;
  const bounds=grid.getBoundingClientRect();
  const value=Math.max(30,Math.min(70,((event.clientX-bounds.left)/bounds.width)*100));
  grid.style.gridTemplateColumns="minmax(0,"+value+"fr) 7px minmax(0,"+(100-value)+"fr)";
 };
 divider.addEventListener("pointerdown",event=>{
  if(grid.getBoundingClientRect().width<650)return;
  dragging=true;divider.setPointerCapture?.(event.pointerId);event.preventDefault();
 });
 divider.addEventListener("pointermove",resize);
 const stop=()=>{dragging=false};
 divider.addEventListener("pointerup",stop);
 divider.addEventListener("pointercancel",stop);
}

function switchPassageTab(tab){
 const split=$("hsg-passage-split");if(!split)return;
 split.dataset.mobileTab=tab;
 split.querySelectorAll("[data-hsg-mobile-tab]").forEach(btn=>btn.setAttribute("aria-pressed",String(btn.dataset.hsgMobileTab===tab)));
}

function meaningfulAnswer(v){return !!(v&&(String(v.value||"").trim()||String(v.error||"").trim()||String(v.correction||"").trim()))}
function answerCount(){return range(groups(state.exam).find(x=>x.id===state.group)).filter(n=>meaningfulAnswer(state.answers[key(n)])).length}
function renderExam(){
 const e=state.exam,g=groups(e).find(x=>x.id===state.group)||groups(e)[0];
 const total=g.end-g.start+1,done=answerCount(),pct=Math.round(done/total*100);
 const passage=passageBased(g);
 const splitMarkup=passage?'<div class="hsg-passage-split" id="hsg-passage-split" data-mobile-tab="questions">'+
 '<div class="hsg-passage-mobile-tabs"><button type="button" data-hsg-mobile-tab="passage" aria-pressed="false">Đoạn văn</button><button type="button" data-hsg-mobile-tab="questions" aria-pressed="true">Câu hỏi & trả lời</button></div>'+
 '<div class="hsg-passage-workspace"><section class="hsg-passage-left" aria-label="Đoạn văn"><div class="hsg-passage-column-head"><strong>PASSAGE / SOURCE TEXT</strong><span>Cuộn độc lập</span></div><div class="hsg-passage-content" id="hsg-passage-left-body">'+originalPages(g)+'</div></section>'+
 '<div class="hsg-passage-divider" aria-hidden="true"></div><section class="hsg-passage-right" aria-label="Câu hỏi và phiếu trả lời"><div class="hsg-passage-column-head"><strong>QUESTIONS & ANSWERS</strong><span>Tự động lưu</span></div><div class="hsg-passage-questions" id="hsg-answer-list"></div><nav class="hsg-passage-nav" id="hsg-passage-nav" aria-label="Chuyển câu"></nav></section></div></div>':"";
 const root=$("pageMount");root.style.display="block";
 root.innerHTML='<div class="hsg-root hsg-modern"><div class="breadcrumbs"><button class="crumb-btn" type="button" onclick="location.hash=\''+BASE+'\'">HSG tỉnh</button><span>›</span><span>'+esc(e.title)+'</span></div>'+
 '<div class="hsg-exam-head"><div><div class="hsg-kicker">INTERACTIVE EXAM · '+esc(e.year)+'</div><h1>'+esc(e.title)+'</h1><p>Trả lời trực tiếp · Không Listening · Chưa có lời giải</p></div><div class="hsg-exam-head-actions"><button type="button" class="hsg-light-btn" id="hsg-print">In</button><button type="button" class="hsg-main-btn" id="hsg-export">Xuất bài làm</button></div></div>'+
 '<div class="hsg-exam-progress"><div><b id="hsg-progress-num">'+done+'/'+total+'</b> câu đã làm <span id="hsg-save-status">Tự động lưu theo tài khoản</span></div><div class="hsg-progress-track"><i id="hsg-progress-fill" style="width:'+pct+'%"></i></div><strong id="hsg-progress-pct">'+pct+'%</strong></div>'+
 '<div class="hsg-group-tabs">'+groups(e).map(x=>'<button type="button" data-group="'+esc(x.id)+'" class="'+(x.id===g.id?'active':'')+'">'+esc(x.name)+'</button>').join("")+'</div>'+
 '<div class="hsg-study-layout'+(passage?' has-shared-passage':'')+'"><main class="hsg-study-main">'+
 (passage?splitMarkup:'<section class="hsg-study-question" id="hsg-answer-editor" aria-label="Câu hỏi"></section>'+
 '<details class="hsg-source-details"><summary>Xem nguyên văn đề gốc</summary><div class="hsg-original-pages">'+originalPages(g)+'</div></details>')+'</main><aside class="hsg-study-rail"><div class="hsg-study-rail-head"><strong>QUESTION MAP</strong><p>'+esc(g.name)+'</p></div><div class="hsg-number-grid">'+range(g).map(n=>'<button type="button" class="hsg-number'+(meaningfulAnswer(state.answers[key(n)])?' has-answer':'')+(state.review[key(n)]?' flagged':'')+(state.question===n?' selected':'')+'" data-question="'+n+'">'+n+'</button>').join("")+'</div><p class="hsg-study-rail-foot">Chọn số để chuyển câu. Màu xanh: đã trả lời; dấu vàng: cần xem lại.</p></aside></div></div>';
 root.querySelectorAll("[data-group]").forEach(b=>b.onclick=()=>{const next=groups(e).find(x=>x.id===b.dataset.group);state.group=next.id;state.question=next.start;renderExam();queueSave()});
 root.querySelectorAll("[data-question]").forEach(b=>b.onclick=()=>{
  const old=activePassageBlock(g);state.question=Number(b.dataset.question);const now=activePassageBlock(g);
  if(g.kind==="mixed"&&(old?.start!==now?.start))renderExam();
  else if(passage)focusPassageQuestion(state.question);
  else renderEditor();
  updateIndicators();queueSave();
 });
 root.querySelectorAll("[data-hsg-mobile-tab]").forEach(b=>b.onclick=()=>switchPassageTab(b.dataset.hsgMobileTab));
 $("hsg-export").onclick=exportAnswers;$("hsg-print").onclick=openPrintDialog;renderEditor();if(passage)setupPassageDivider();
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

const MATCH_LABELS={
 "dh-vinh:c4":[["A","Colin Campbell"],["B","M. King Hubbert"],["C","Kenneth Deffeyes"],["D","René Dahan"],["E","Michael Lynch"]],
 "tay-ninh:m":[["A","Finn"],["B","Giovanni"],["C","Lauren"],["D","Tara"]],
 "son-la:m":[["A","Section A"],["B","Section B"],["C","Section C"],["D","Section D"]],
 "son-la:h":[["i","The role of chemical and physical signals"],["ii","Why individual sacrifice ensures group survival"],["iii","The evolution of different ant species"],["iv","A decentralized approach to task management"],["v","Collective intelligence versus individual limitations"],["vi","The impact of diet on colony hierarchy"]],
 "phan-boi-chau:c4":[["i","Commercialising neurochemical vulnerability through attention capture"],["ii","Critical agency as an alternative to protective prohibition"],["iii","Selfhood made accountable to an enduring digital audience"],["iv","Evolved belonging translated into visible, revisable metrics"],["v","The authenticity paradox of curated self-presentation"],["vi","Autonomy restored by limiting dependence on digital platforms"],["vii","Abundant contact as a substitute for mutual vulnerability"],["viii","Neurochemical reinforcement as a sufficient account of compulsion"]]
};
function matchingLabels(g){
 const id=state.exam.id+":"+g.id,known=MATCH_LABELS[id];if(known)return known;
 const n={"dh-vinh:c6":8,"thanh-hoa:m":7,"ptnk:139":9,"ptnk:240":9,"ptnk:306":9,"ptnk:4":9}[id]||8;
 return Array.from({length:n},(_,i)=>[String.fromCharCode(65+i),String.fromCharCode(65+i)]);
}

function renderEditor(){
 const g=groups(state.exam).find(x=>x.id===state.group);
 if(passageBased(g)){renderPassageForms(g);return}
 const n=state.question,k=key(n),q=getQuestion(g,n),saved=state.answers[k]||{value:""};
 const editor=$("hsg-answer-editor");if(!editor)return;
 const stem=q.stem||"Câu hỏi chưa được nhận dạng đầy đủ từ tài liệu quét. Xem nội dung đề gốc phía dưới.";
 const labels=q.type==="tfng"?["TRUE","FALSE","NOT GIVEN"]:q.type==="ynng"?["YES","NO","NOT GIVEN"]:q.type==="match"?matchingLabels(g):q.options||["A","B","C","D"];
 let inputs="";
 if(["mcq","match","tfng","ynng"].includes(q.type)){
  inputs='<div class="answers hsg-inline-options">'+labels.map((item,i)=>{
   const value=q.type==="tfng"||q.type==="ynng"?item:q.type==="match"?item[0]:String.fromCharCode(65+i);
   const chosen=saved.value===value;
   return '<button type="button" class="answer'+(chosen?' selected':'')+'" data-hsg-value="'+esc(value)+'" aria-pressed="'+chosen+'"><span class="letter">'+esc(q.type==="match"?value:q.type==="mcq"?value:String.fromCharCode(65+i))+'</span><span>'+esc(q.type==="match"?item[1]:item)+'</span></button>';
  }).join("")+'</div>'+(q.type==="mcq"&&!q.options?'<p class="hsg-source-warning">Thiếu phương án từ bản scan · Xem đề gốc bên dưới.</p>':"");
 }else if(q.type==="error"){
  inputs='<div class="hsg-error-form"><label>Dòng / vị trí<input data-hsg-field="line" placeholder="Số dòng" value="'+esc(saved.line||"")+'"></label><label>Từ/cụm sai<input data-hsg-field="error" placeholder="Nhập lỗi" value="'+esc(saved.error||"")+'"></label><label>Sửa thành<input data-hsg-field="correction" placeholder="Nhập cách sửa" value="'+esc(saved.correction||"")+'"></label></div>';
 }else if(q.type==="rewrite"||q.type==="essay"){
  inputs='<label class="hsg-input-label">Bài làm<textarea data-hsg-field="value" rows="'+(q.type==="essay"?12:4)+'" placeholder="Nhập câu trả lời...">'+esc(saved.value||"")+'</textarea></label>'+(q.type==="essay"?'<span class="hsg-word-count" id="hsg-word-count">Số từ: '+(saved.value||"").trim().split(/\s+/).filter(Boolean).length+'</span>':"");
 }else{
  inputs='<label class="hsg-input-label">Điền đáp án<input type="text" data-hsg-field="value" autocomplete="off" placeholder="Nhập từ / cụm từ..." value="'+esc(saved.value||"")+'"></label>';
 }
 editor.innerHTML='<div class="hsg-question-kicker"><span>QUESTION '+String(n).padStart(2,"0")+'</span><span>'+esc(q.type.toUpperCase().replace("MCQ","MULTIPLE CHOICE"))+'</span></div>'+
 '<div class="hsg-question-stem">'+esc(stem)+'</div><p class="hsg-form-note">Trả lời bên dưới · Tự lưu · Chưa chấm điểm.</p>'+inputs+
 '<div class="hsg-question-actions"><button type="button" id="hsg-clear">Xóa câu trả lời</button><button type="button" id="hsg-flag">'+(state.review[k]?'★ Đã đánh dấu':'☆ Đánh dấu xem lại')+'</button></div>'+
 '<div class="hsg-question-nav"><button class="secondary" id="hsg-prev-question" type="button"'+(n===g.start?' disabled':'')+'>← Câu trước</button><span>'+ (n-g.start+1)+' / '+(g.end-g.start+1)+'</span><button class="primary" id="hsg-next-question" type="button"'+(n===g.end?' disabled':'')+'>Câu tiếp theo →</button></div>';
 editor.querySelectorAll("[data-hsg-value]").forEach(b=>b.onclick=()=>{state.answers[k]={type:q.type,value:b.dataset.hsgValue};queueSave();renderEditor();updateIndicators()});
 editor.querySelectorAll("[data-hsg-field]").forEach(el=>el.oninput=()=>{
  state.answers[k]={...state.answers[k],type:q.type,[el.dataset.hsgField]:el.value};queueSave();updateIndicators();
  const wc=$("hsg-word-count");if(wc&&el.dataset.hsgField==="value")wc.textContent="Số từ: "+el.value.trim().split(/\s+/).filter(Boolean).length;
 });
 $("hsg-flag").onclick=()=>{state.review[k]=!state.review[k];queueSave();renderEditor();updateIndicators()};
 $("hsg-clear").onclick=()=>{delete state.answers[k];queueSave();renderEditor();updateIndicators()};
 $("hsg-prev-question").onclick=()=>{state.question--;if(g.kind==="mixed")renderExam();else renderEditor();updateIndicators();queueSave()};
 $("hsg-next-question").onclick=()=>{state.question++;if(g.kind==="mixed")renderExam();else renderEditor();updateIndicators();queueSave()};
 updateIndicators();
}


/* Print the whole paper or a selected part — never only the visible question. */
function printParts(){
 const exam=state.exam;
 if(exam?.id==="ptnk"){
  // A PTNK code is a separate exam. The checklist contains only sections of the active code.
  const g=groups(exam).find(item=>item.id===state.group)||groups(exam)[0];
  const sections=[
   {start:1,end:40,title:"Grammar & Vocabulary"},
   ...PTNK_PASSAGE_BLOCKS,
   {start:106,end:115,title:"Word Formation"},
   {start:121,end:130,title:"Sentence Transformation"}
  ].sort((a,b)=>a.start-b.start);
  return sections.map(block=>({
   value:g.id+"@"+block.start,
   label:block.title,
   group:g,
   block,
   start:block.start,end:block.end
  }));
 }
 return groups(exam).map(g=>({
  value:g.id,label:g.name,group:g,block:null,start:g.start,end:g.end
 }));
}


function printNormalize(t){return String(t||"").replace(/[\u200b-\u200d\ufeff]/g,"").replace(/\u00a0/g," ").replace(/\r\n?/g,"\n").replace(/[ \t]{2,}/g," ").replace(/[ \t]+\n/g,"\n").replace(/\n[ \t]+/g,"\n")}
function printInline(t){return esc(t).replace(/(^|[^\w])(_{3,}|\.{4,})(?=$|[^\w])/g,'$1<span class="hsg-print-blank">$2</span>')}
function printOptionSequence(input){
 const text=printNormalize(input).replace(/\s*\n\s*/g," ").trim();
 const matches=[...text.matchAll(/(?:^|(?<=\s))([A-D])[.)](?=\s+\S)/g)];
 for(let i=0;i<=matches.length-4;i++){
  const four=matches.slice(i,i+4);
  if(four.map(m=>m[1]).join("")!=="ABCD")continue;
  const options=four.map((m,j)=>text.slice(m.index+m[0].length,j<3?four[j+1].index:text.length).trim());
  if(options.some(x=>!x||x.length>900))continue;
  return {stem:text.slice(0,four[0].index).trim(),options};
 }
 return {stem:text,options:null};
}
function printChoiceGrid(options){
 const long=options.some(x=>x.length>78);
 return '<div class="hsg-print-choices '+(long?'is-long':'is-compact')+'">'+
  options.map((o,i)=>'<div class="hsg-print-choice"><b>'+String.fromCharCode(65+i)+'.</b><span>'+printInline(o)+'</span></div>').join("")+'</div>';
}
function printSourceQuestion(n,lines){
 const parsed=printOptionSequence(lines.join(" "));
 return '<article class="hsg-print-source-question"><div class="hsg-print-source-num">'+esc(n)+'.</div>'+
 '<div class="hsg-print-source-q-body">'+
 (parsed.stem?'<p class="hsg-print-source-stem">'+printInline(parsed.stem)+'</p>':"")+
 (parsed.options?printChoiceGrid(parsed.options):"")+'</div></article>';
}
function printTypesetText(text){
 const lines=printNormalize(text).split("\n"),out=[];
 let para=[],question=null,numbered=false,pendingLine=null;
 const flushPara=()=>{if(!para.length)return;const v=para.join(" ").replace(/\s+/g," ").trim();if(v)out.push('<p class="hsg-print-prose">'+printInline(v)+'</p>');para=[]};
 const flushQuestion=()=>{if(question){out.push(printSourceQuestion(question.n,question.lines));question=null}};
 const flushLine=()=>{if(pendingLine){out.push('<div class="hsg-print-error-line"><b>'+esc(pendingLine.n)+'</b><span>'+printInline(pendingLine.text||"")+'</span></div>');pendingLine=null}};
 for(const raw of lines){
  const line=raw.trim();
  if(!line){if(!question)flushPara();continue}
  if(/^Page\s+\d+\s+(?:of|\/)\s+\d+$/i.test(line)||/^Trang\s+\d+\s*\/\s*\d+$/i.test(line))continue;
  const section=/^(?:SECTION\s+[A-ZIVXLCDM0-9]+[.:]|PART\s+[A-D][:.]|(?:[IVX]+)\.\s+(?:LEXICO|READING|WRITING|PHONETICS|LANGUAGE))\s*(.*)$/i.exec(line);
  const part=/^(?:PART|Part)\s+(\d+|[IVX]+)[.:]\s*(.*)$/i.exec(line);
  const q=/^(?:Question\s+)?(\d{1,3})[.)]\s*(.*)$/i.exec(line);
  if(section){flushLine();flushQuestion();flushPara();numbered=false;out.push('<h2 class="hsg-print-source-section">'+printInline(line)+'</h2>');continue}
  if(part){flushLine();flushQuestion();flushPara();numbered=false;out.push('<h3 class="hsg-print-source-part">'+printInline(line)+'</h3>');continue}
  if(/^Line$/i.test(line)){flushLine();flushQuestion();flushPara();numbered=true;continue}
  if(numbered){
   const m=/^(\d{1,2})(?:\s+(.+))?$/.exec(line);
   if(m){flushLine();pendingLine={n:m[1],text:m[2]||""};continue}
   if(pendingLine){pendingLine.text+=(pendingLine.text?" ":"")+line;continue}
   numbered=false;
  }
  if(q){flushLine();flushQuestion();flushPara();question={n:q[1],lines:[q[2]||""]};continue}
  if(question){question.lines.push(line);continue}
  if(/^[•●▪]\s+/.test(line)||/^[–-]\s+\S/.test(line)){
   flushLine();flushPara();out.push('<p class="hsg-print-bullet">'+printInline(line.replace(/^[•●▪–-]\s*/,""))+'</p>');continue;
  }
  if(line.length<=105&&/[A-ZÀ-Ỹ]/.test(line)&&line===line.toLocaleUpperCase("en-US")&&
     !/^(?:YOUR ANSWERS|STATEMENTS|ANSWER SHEET|TRUE|FALSE)$/i.test(line)&&/[A-Z]{5}/.test(line)){
   flushLine();flushPara();out.push('<h4 class="hsg-print-source-subhead">'+printInline(line)+'</h4>');continue;
  }
  para.push(line);
 }
 flushLine();flushQuestion();flushPara();return out.join("");
}
function printSourcePages(pages){
 // Reflow across original PDF page boundaries, so physical pages have balanced text.
 return '<div class="hsg-print-typeset-source">'+printTypesetText(pages.map(p=>p.text||"").join("\n"))+'</div>';
}


function printQuestions(g,first,last){
 let countMissing=0;const cards=[];
 for(let n=first;n<=last;n++){
  const q=getQuestion(g,n),type=q.type;
  const opts=type==="mcq"?q.options:type==="match"?matchingLabels(g).map(([l,v])=>l+". "+v):
    type==="tfng"?["TRUE","FALSE","NOT GIVEN"]:type==="ynng"?["YES","NO","NOT GIVEN"]:null;
  if(type==="mcq"&&(!opts||opts.length!==4))countMissing++;
  let stem=printNormalize(q.stem||"").trim();
  if((passageBased(g)||!!activePassageBlock(g,n))&&["mcq","fill","error"].includes(type)&&stem.length>280)stem="";
  if(!stem&&!["mcq","match","tfng","ynng","error"].includes(type)&&type==="fill")stem="Complete blank ("+n+") in the text above.";
  let detail="";
  if(type==="mcq")detail=opts?.length===4?printChoiceGrid(opts):
    '<span class="hsg-print-unavailable">Phương án trong bản nguồn chưa được nhận dạng đầy đủ.</span>';
  else if(type==="match")detail='<div class="hsg-print-listed-choices">'+(opts||[]).map(o=>'<span>'+printInline(o)+'</span>').join("")+'</div>';
  else if(type==="tfng"||type==="ynng")detail='<div class="hsg-print-pick-options">'+opts.map(o=>'<span>□ '+esc(o)+'</span>').join("")+'</div>';
  else if(type==="error")detail='<p class="hsg-print-answer-line">Line: ______ &nbsp; Error: __________________ &nbsp; Correction: __________________</p>';
  else if(type==="essay"||type==="rewrite")detail='<div class="hsg-print-writing-lines">'+Array.from({length:type==="essay"?9:3},()=>'<div></div>').join("")+'</div>';
  else detail='<p class="hsg-print-answer-line">Answer: ______________________________________________</p>';
  cards.push('<article class="hsg-print-source-question hsg-print-generated-question"><div class="hsg-print-source-num">'+n+'.</div>'+
   '<div class="hsg-print-source-q-body">'+(stem?'<p class="hsg-print-source-stem">'+printInline(stem)+'</p>':"")+detail+'</div></article>');
 }
 return {html:cards.join(""),missing:countMissing};
}

function printOnePart(part,index){
 const g=part.group,block=part.block,first=block?.start??g.start,last=block?.end??g.end;
 // The paragraph for a PTNK block is separate from the rest of that code.
 const hasPassage=g.kind==="mixed"?!!activePassageBlock(g,first):passageBased(g);
 const source=hasPassage?passageOnly(g,first):"";
 const result=printQuestions(g,first,last);
 const sourceHtml=source?
  '<div class="hsg-print-passage"><div class="hsg-print-passage-label">READ THE TEXT AND ANSWER THE QUESTIONS</div>'+printTypesetText(source)+'</div>':"";
 const warning=result.missing?
  '<p class="hsg-print-unavailable">'+result.missing+' câu chưa trích xuất đầy đủ phương án từ nguồn. Cần đối chiếu bản gốc trước khi sử dụng.</p>':"";
 const title=block?.title||g.name;
 return '<section class="hsg-print-part" aria-label="'+esc(title)+'">'+
  '<header class="hsg-print-part-head"><div class="hsg-print-part-number">PART '+String(index).padStart(2,"0")+'</div>'+
  '<div><h2>'+esc(title)+'</h2><p>'+first+'–'+last+' · '+(last-first+1)+' câu</p></div></header>'+
  warning+sourceHtml+'<div class="hsg-print-question-list">'+result.html+'</div></section>';
}
function printDocumentHTML(scope,selectedParts){
 const exam=state.exam,ptnk=exam.id==="ptnk",full=scope==="all";
 const chosen=Array.isArray(selectedParts)?selectedParts:[selectedParts].filter(Boolean);
 const currentCode=ptnk?(groups(exam).find(g=>g.id===state.group)||groups(exam)[0]):null;
 const label=full?(ptnk?currentCode.name:"Toàn bộ đề"):
  chosen.length+" phần đã chọn";
 let doc="";
 if(full){
  // Original extracted pages are retained in full to avoid dropping source questions
  // when scanned pages are not reliably machine-readable.
  const pages=ptnk?sourcePages(currentCode):state.data.pages;
  doc=printSourcePages(pages);
 }else{
  // The printed sequence always follows the original exam sequence, not click order.
  const rank=new Map(printParts().map((p,i)=>[p.value,i]));
  const ordered=chosen.slice().sort((a,b)=>(rank.get(a.value)??Infinity)-(rank.get(b.value)??Infinity));
  doc=ordered.map((part,i)=>printOnePart(part,i+1)).join("");
 }
 return '<div class="hsg-print-document" id="hsg-print-sheet">'+
  '<header class="hsg-print-cover">'+
   '<div class="hsg-print-header-top"><span>ENGLISH PRACTICE HUB</span><span>HSG TỈNH · EXAM PRACTICE</span></div>'+
   '<div class="hsg-print-eyebrow">ĐỀ LUYỆN TẬP TIẾNG ANH</div>'+
   '<h1>'+esc(exam.title)+'</h1>'+
   '<p class="hsg-print-subtitle">'+esc(exam.subtitle)+' <span>·</span> '+esc(exam.year)+'</p>'+
   '<div class="hsg-print-info-row"><span class="hsg-print-info-scope">'+esc(label)+'</span>'+
    '<span>'+ (full?"Bản đề đầy đủ":chosen.length+" phần · "+chosen.reduce((sum,p)=>sum+p.end-p.start+1,0)+" câu")+'</span></div>'+
   '<div class="hsg-print-student"><span>Họ và tên: <i></i></span><span>Lớp: <i></i></span></div>'+
  '</header>'+
  '<main class="hsg-print-paper-main">'+doc+'</main>'+
  '<footer class="hsg-print-final"><span>ENGLISH PRACTICE HUB</span><span>Hết · Không có Listening · Không kèm lời giải</span></footer>'+
 '</div>';
}

function closePrintDialog(){
 const dialog=$("hsg-print-dialog");
 if(!dialog)return;
 if(dialog.open&&dialog.close)dialog.close();
 dialog.remove();
}
function openPrintDialog(){
 if(!state.exam||!state.data)return;
 closePrintDialog();
 const parts=printParts();
 const preferred=state.exam.id==="ptnk"?
   parts.find(p=>state.question>=p.start&&state.question<=p.end)?.value:
   state.group;
 const defaultPart=parts.find(p=>p.value===preferred)||parts[0];
 const dialog=document.createElement("dialog");
 dialog.id="hsg-print-dialog";dialog.className="hsg-print-dialog";
 dialog.setAttribute("aria-label","Tùy chọn in đề HSG tỉnh");
 dialog.innerHTML='<div class="hsg-print-dialog-head"><div><p>PRINT SETTINGS · A4</p><h2>In đề HSG tỉnh</h2></div>'+
  '<button type="button" data-hsg-print-close aria-label="Đóng">×</button></div>'+
  '<div class="hsg-print-dialog-body"><p>Chọn toàn bộ đề hoặc tích nhiều phần để in chung trong một tài liệu A4.</p>'+
   '<label class="hsg-print-option"><input type="radio" name="hsg-print-scope" value="all" checked>'+
    '<span><strong>In toàn bộ '+(state.exam.id==="ptnk"?"mã đề đang mở":"đề")+'</strong>'+
    '<small>Đầy đủ nội dung đề gốc, không có phần Listening</small></span></label>'+
   '<label class="hsg-print-option"><input type="radio" name="hsg-print-scope" value="parts">'+
    '<span><strong>Chọn nhiều Part</strong><small>Tích một hoặc nhiều phần, ghép theo đúng thứ tự đề thi</small></span></label>'+
   '<div class="hsg-print-part-picker" id="hsg-print-part-picker">'+
    '<div class="hsg-print-parts-toolbar"><strong>Chọn phần muốn in</strong>'+
      '<div><button type="button" id="hsg-print-select-all">Chọn tất cả</button>'+
      '<button type="button" id="hsg-print-select-none">Bỏ chọn</button></div></div>'+
    '<div class="hsg-print-parts-list" role="group" aria-label="Danh sách các phần của đề">'+
    parts.map(p=>'<label class="hsg-print-part-option">'+
     '<input type="checkbox" data-hsg-print-part="'+esc(p.value)+'"'+(p.value===defaultPart?.value?' checked':'')+'>'+
     '<span class="hsg-print-part-name">'+esc(p.label)+'</span>'+
     '<span class="hsg-print-part-range">'+p.start+'–'+p.end+'</span></label>').join("")+'</div>'+
   '</div>'+
   '<p class="hsg-print-dialog-note" id="hsg-print-preview-note" role="status"></p></div>'+
  '<div class="hsg-print-dialog-actions"><button type="button" class="hsg-print-cancel" data-hsg-print-close>Hủy</button>'+
   '<button type="button" class="hsg-print-go" id="hsg-print-go">Xem bản in / In đề →</button></div>';
 document.body.appendChild(dialog);
 dialog.querySelectorAll("[data-hsg-print-close]").forEach(b=>b.onclick=closePrintDialog);
 const picker=dialog.querySelector("#hsg-print-part-picker");
 const checkboxes=[...picker.querySelectorAll("[data-hsg-print-part]")];
 const note=dialog.querySelector("#hsg-print-preview-note");
 const go=dialog.querySelector("#hsg-print-go");
 const selected=()=>parts.filter(part=>checkboxes.some(box=>box.dataset.hsgPrintPart===part.value&&box.checked));
 const refresh=()=>{
  const scope=dialog.querySelector('input[name="hsg-print-scope"]:checked')?.value||"all";
  const multiple=scope==="parts",chosen=selected();
  picker.classList.toggle("is-disabled",!multiple);
  picker.querySelectorAll("button,input").forEach(control=>control.disabled=!multiple);
  go.disabled=multiple&&!chosen.length;
  const count=chosen.reduce((sum,part)=>sum+(part.end-part.start+1),0);
  note.textContent=!multiple?
   (state.exam.id==="ptnk"?"In toàn bộ "+(groups(state.exam).find(g=>g.id===state.group)?.name||"mã đề đang mở")+", không in các mã đề khác.":"In toàn bộ nội dung của đề, không chỉ câu đang xem."):
   chosen.length?chosen.length+" Part · "+count+" câu · Sắp xếp đúng thứ tự đề.":"Hãy chọn ít nhất một Part để in.";
 };
 dialog.querySelectorAll('input[name="hsg-print-scope"]').forEach(input=>input.onchange=refresh);
 checkboxes.forEach(box=>box.onchange=refresh);
 dialog.querySelector("#hsg-print-select-all").onclick=()=>{checkboxes.forEach(x=>x.checked=true);refresh()};
 dialog.querySelector("#hsg-print-select-none").onclick=()=>{checkboxes.forEach(x=>x.checked=false);refresh()};
 go.onclick=()=>{
  const scope=dialog.querySelector('input[name="hsg-print-scope"]:checked')?.value||"all";
  const chosen=selected();
  if(scope==="parts"&&!chosen.length)return;
  document.getElementById("hsg-print-sheet")?.remove();
  const holder=document.createElement("div");
  holder.innerHTML=printDocumentHTML(scope,chosen);
  const sheet=holder.firstElementChild;
  if(!sheet)return;
  document.body.appendChild(sheet);
  closePrintDialog();
  const cleanup=()=>{window.removeEventListener("afterprint",cleanup);sheet.remove()};
  window.addEventListener("afterprint",cleanup,{once:true});
  try{window.print()}catch(error){cleanup();alert("Không mở được cửa sổ in: "+error.message)}
 };
 if(typeof dialog.showModal==="function")dialog.showModal();
 else dialog.setAttribute("open","");
 refresh();
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
