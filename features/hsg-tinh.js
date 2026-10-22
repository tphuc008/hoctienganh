/* HSG tỉnh: document-based exam practice. No answer keys or Listening materials. */
(function(global){
"use strict";
const CONFIGS=[
 {id:"hai-phong",title:"Hải Phòng",subtitle:"Đề Tiếng Anh chuyên",year:"2026–2027",start:21,end:100,structuredRequired:true},
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
const state={exam:null,data:null,page:0,group:"main",question:21,tab:"all",mode:"mcq",answers:{},review:{},saveTimer:null,passageTextSize:17,passageSplitRatio:54,answerReviewUnlocked:false,resultVisible:false,readingScroll:{passage:0,questions:0}};
const $=id=>document.getElementById(id);
/* Compatibility cleanup for portal created by older versions. Exam UI stays in #pageMount. */
function removeReadingPortal(){document.getElementById("hsg-reading-portal")?.remove()}
const esc=value=>String(value==null?"":value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));

/* Part-level exam map: a question's format is determined by the source task, never by a manual MCQ/text toggle. */
const HSG_PARTS={
 "hai-phong":[["g1","Grammar & Vocabulary",21,40,"mcq",[2,3]],["g2a","Guided Cloze · Advertisement",41,45,"mcq",[3]],["g2b","Guided Cloze · Letter",46,50,"mcq",[3,4]],["e","Error Correction",51,55,"error",[4]],["wf","Word Formation",56,60,"word",[4]],["wp","Word Formation · Tourism",61,65,"word",[4,5]],["oc","Reading · Open Cloze",66,75,"fill",[5]],["rc","Reading · Cloze",76,80,"mcq",[5]],["r","Reading Comprehension",81,90,"mcq",[6,7]],["w","Sentence Transformation",91,100,"rewrite",[7]],["essay","Paragraph Writing",1,1,"essay",[7]]],
 "dh-vinh":[["b1","Lexico-Grammar",1,20,"mcq",[3,5]],["b2","Error Correction",21,30,"error",[5]],["b3","Word Formation",31,40,"word",[4,5]],["c1","Reading · Freelancing",1,10,"mcq",[4,6]],["c2","Reading · YES / NO / NOT GIVEN",11,15,"ynng",[6,7]],["c3","Reading · Sentence Completion",16,18,"fill",[7]],["c4","Reading · Matching",19,23,"match",[7,8]],["c5","Reading · Telemedicine",24,33,"fill",[8]],["c6","Reading · Missing Sentences",34,40,"match",[8,9]],["d","Sentence Transformation",1,10,"rewrite",[9]],["essay","Essay Writing",1,1,"essay",[9]]],
 "phu-tho":[["g","Lexico-Grammar",21,35,"mcq",[3]],["wf","Word Formation",36,45,"word",[4]],["e","Error Correction",46,50,"error",[4]],["r1","Reading · Cloze",51,60,"mcq",[5]],["r2","Reading · Open Cloze",61,70,"fill",[5]],["r3","Reading Comprehension",71,80,"mcq",[6,7]],["w","Sentence Transformation",81,90,"rewrite",[7,8]],["essay","Paragraph Writing",1,1,"essay",[8]]],
 "son-la":[["g1","Green Transportation",26,30,"mcq",[3,4]],["g2","Paperless Exams",31,40,"mcq",[4,5]],["wf","Word Formation",41,45,"word",[5]],["pr","Prepositions & Articles",46,50,"fill",[5]],["oc","Open Cloze",51,55,"fill",[5,6]],["m","Matching Sections",56,60,"match",[6]],["r","Reading · AI in English Learning",61,67,"mcq",[6,7,8]],["h","Matching Headings",68,71,"match",[8,9]],["tf","TRUE / FALSE / NOT GIVEN",72,75,"tfng",[8,9]],["w","Sentence Transformation",76,80,"rewrite",[9]],["email","Email Writing",1,1,"essay",[9]],["essay","Paragraph Writing",1,1,"essay",[9]]],
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
  {answers:state.answers,review:state.review,group:state.group,page:state.page,question:state.question,
   ...(state.exam.id==="hai-phong"?{answerReviewUnlocked:state.answerReviewUnlocked,resultVisible:state.resultVisible}:{}),
   updatedAt:new Date().toISOString()});
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
 removeReadingPortal();
 const root=$("pageMount"); if(!root)return;
 root.style.display="block";
 root.innerHTML='<div class="hsg-root"><div class="breadcrumbs"><button class="crumb-btn" type="button" onclick="location.hash=\'\'">Home</button><span>›</span><span>HSG tỉnh</span></div>'+
 '<div class="hsg-hero"><div class="hsg-kicker">TEACHER PREVIEW · EXAM LIBRARY</div><h1>Đề thi <span>Tiếng Anh chuyên</span></h1>'+
 '<p>Luyện đề · Đánh dấu câu · Tự lưu · Không Listening.</p>'+
 '<div class="hsg-hero-facts"><span>8 bộ đề</span><span>Năm học 2026–2027</span><span>Chưa có đáp án chính thức toàn đề</span></div></div>'+
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
 // New exam data files automatically use the shared renderer; legacy exams remain unchanged.
 const extra=await fetch("content/hsg-tinh/"+id+".structured.json?v=20261021-pilot-v3",{cache:"no-store"});
 if(extra.ok){
  if(!global.HSGPartSystem)throw new Error("Chưa tải được bộ renderer HSG.");
  result.structured=global.HSGPartSystem.validate(await extra.json(),id);
 }else if(extra.status!==404||CONFIGS.find(e=>e.id===id)?.structuredRequired){
  throw new Error("Không tải được dữ liệu chuẩn hóa đề "+id+" ("+extra.status+")");
 }
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
function structuredPart(g){return global.HSGPartSystem?.getPart(state.data?.structured,g?.id)||null}
function getQuestion(g,n){
 const typed=global.HSGPartSystem?.question(structuredPart(g),n);
 if(typed)return typed;
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
 if(structuredPart(g))return true;
 if(g.kind==="mixed")return !!activePassageBlock(g);
 return ["error","fill","match","tfng","ynng"].includes(g.kind)
   || /\b(cloze|reading|passage|headings|matching)\b/i.test(g.name);
}
/* Source-aware passage boundaries: never truncate a passage at arbitrary length. */
function passageOnly(g,n=state.question){
 const active=activePassageBlock(g,n),shift=state.exam?.id==="ptnk"?(Math.min(...g.pages)-1):0;
 const pages=active?sourcePages(g).filter(p=>active.pages.includes(Number(p.sourcePage)-shift)):sourcePages(g);
 const all=pages.map(p=>String(p.text||"")).join("\n").replace(/[\u200b\ufeff]/g,"").replace(/\r\n?/g,"\n");
 if(!all.trim())return "Chưa tìm thấy đoạn văn tương ứng trong dữ liệu đề.";
 const id=(state.exam?.id||"")+":"+g.id;
 const fixed={
  "hai-phong:g2a":{from:"Zero Carbon, Infinite Possibilities: Reserve Your Smart Home",to:/Question\s+41\./i},
  "hai-phong:g2b":{from:"CHANGES IN OFFICE WORKING HOURS",to:/Question\s+46\./i},
  "hai-phong:e":{from:"Peer pressure is a psychological force",to:/Question\s+51\./i}
 };
 const special=fixed[id];
 if(special){
  const start=all.indexOf(special.from);
  if(start>=0){const text=all.slice(start),end=text.search(special.to);if(end>0)return text.slice(0,end).trim()}
 }
 const startN=active?.start??g.start;
 const marker=new RegExp("(?:^|\\n)[ \\t]*(?:Question\\s+)?"+startN+"[.)]\\s+(?=\\S)","i");
 const first=marker.exec(all),before=first?all.slice(0,first.index):all;
 // The latest part instruction before the questions is the most relevant boundary.
 const cues=/(?:^|\n)\s*(?:Read the following|Read the passage|Read the text|Complete the following|Identify (?:the )?\w+ errors|Find (?:and correct )?\w* errors|Guided [Cc]loze\s*\d*|(?:PART|Part|SECTION|Section)\s*[1-6IVX]+[.:)]\s*[^\n]{0,95})/g;
 let begin=-1,m;while((m=cues.exec(before))!==null)begin=m.index;
 const source=(begin>=0?before.slice(begin):before).replace(/\n[ \t]*(?:YOUR ANSWERS|Your answers)\s*[:\n][\s\S]*$/i,"").trim();
 return source||before.trim()||"Không thể tách passage một cách chắc chắn từ đề gốc.";
}
function formattedPassage(passage,n){
 const chunks=[];
 for(const block of String(passage||"").replace(/[ \t]+\n/g,"\n").trim().split(/\n\s*\n+/)){
  let paragraph=[];
  const flush=()=>{if(paragraph.length){chunks.push(paragraph.join(" "));paragraph=[]}};
  for(const line of block.split("\n").map(x=>x.trim()).filter(Boolean)){
   if(/^(?:[A-H][.)]\s|(?:PART|SECTION)\s+[IVX\d]|(?:Questions?|Instructions?)\b|(?:Read|Complete|Identify|Find)\s+(?:the|a|each|following)\b)/i.test(line))flush();
   paragraph.push(line);
  }
  flush();
 }
 const highlight=new RegExp("(\\("+n+"\\)|_{1,3}"+n+"_{1,5})","g");
 return chunks.map(c=>'<p class="hsg-passage-paragraph">'+esc(c).replace(highlight,'<mark class="hsg-passage-current">$1</mark>')+'</p>').join("");
}
function errorSourceModel(g,n=state.question){
 const active=activePassageBlock(g,n);
 const shift=state.exam?.id==="ptnk"?(Math.min(...g.pages)-1):0;
 const pages=active?sourcePages(g).filter(p=>active.pages.includes(Number(p.sourcePage)-shift)):sourcePages(g);
 const source=pages.map(p=>String(p.text||"")).join("\n");
 const extracted=global.HSGErrorLines.extract(state.exam.id,source);
 const fallback=extracted.verified?extracted.text:passageOnly(g,n);
 const model=global.HSGErrorLines.parse(fallback);
 if(!extracted.verified)model.note=(model.note?model.note+" ":"")+extracted.reason;
 return {model,verified:extracted.verified};
}

function originalPages(g){
 const typed=structuredPart(g);
 if(typed)return global.HSGPartSystem.renderPassage(typed,state.answers,g.id,state.question,esc);
 if(actualKind(g,state.question)==="error"){
  const {model,verified}=errorSourceModel(g),r=state.answers[key(state.question)]||{};
  const text=global.HSGErrorLines.screen(model,r);
  return verified&&!model.numberingUncertain?text:text.replace('<section class="hsg-passage-page',
   '<section data-hsg-source-unverified="true" class="hsg-passage-page');
 }
 return '<section class="hsg-passage-page hsg-readable-passage">'+
  formattedPassage(passageOnly(g),state.question)+'</section>';
}

function passageQuestionLabels(g,q){
 if(q.type==="tfng")return [["TRUE","TRUE"],["FALSE","FALSE"],["NOT GIVEN","NOT GIVEN"]];
 if(q.type==="ynng")return [["YES","YES"],["NO","NO"],["NOT GIVEN","NOT GIVEN"]];
 if(q.type==="match")return matchingLabels(g);
 if(q.structured&&q.type==="mcq"&&!q.options)return [];
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
 if(q.type==="error"){
  const model=errorSourceModel(g,n).model,numbered=model.hasOriginalLines,needsLine=numbered||model.numberingUncertain;
  return '<p class="hsg-error-help">'+(numbered?
    'Chọn số dòng của đề gốc rồi bôi đen từ/cụm sai.':
    model.numberingUncertain?'Dữ liệu PDF chưa xác định chắc chắn vị trí dòng. Bôi đen cụm sai và đối chiếu số dòng với đề gốc.':
    'Đề gốc không đánh số dòng: bôi đen cụm sai trong đoạn văn bên trái.')+'</p><div class="hsg-error-form hsg-split-error">'+
   (needsLine?'<label>'+(model.numberingUncertain?'Dòng (theo PDF gốc)':'Dòng gốc')+'<input data-hsg-field="line" inputmode="numeric" placeholder="Số dòng trong đề…" value="'+esc(r.line||"")+'"></label>':"")+
   '<label>Từ / cụm sai<input data-hsg-field="error" placeholder="Cụm sai trong bài" value="'+esc(r.error||"")+'"></label>'+
   '<label>Sửa thành<input data-hsg-field="correction" placeholder="Cách sửa của bạn" value="'+esc(r.correction||"")+'"></label></div>';
 }
 if(q.type==="essay"||q.type==="rewrite")return '<label class="hsg-input-label">Bài làm<textarea rows="'+(q.type==="essay"?10:4)+'" data-hsg-field="value" placeholder="Nhập bài làm...">'+esc(r.value||"")+'</textarea></label>';
 return (q.structured&&q.word?'<div class="hsg-schema-word-prompt">ROOT WORD <strong>'+esc(q.word)+'</strong></div>':"")+
  '<label class="hsg-input-label">'+(q.structured?(q.type==="word"?"Word formation":"Your answer"):"Câu trả lời")+
  '<input type="text" data-hsg-field="value" placeholder="'+(q.structured?"Type your answer":"Nhập từ hoặc cụm từ...")+'" value="'+esc(r.value||"")+'" autocomplete="off"></label>';
}
/* Render all questions in the reading pane, as in the Grade 12 Reading workspace. */
/* Explanation Standard V1.1 — Hải Phòng reference analyses.
 * On-demand, non-scoring, all editorial states remain needs_review.
 */
function hsgExplanationSource(g,n){
 const typed=structuredPart(g);
 return typed?typed.passage.map(block=>block.text).join("\n"):
  passageOnly(g,n)+"\n"+(getQuestion(g,n)?.stem||"");
}
function hsgExplanationControl(g,n,q){
 // Do not include any answer UI in a practice-phase question card.
 if(state.exam?.id==="hai-phong"&&!state.answerReviewUnlocked)return "";
 if(!global.HSGHaiPhongExplanations?.available(
   state.exam?.id,g.id,n,q,hsgExplanationSource(g,n)))return "";
 return '<section class="hsg-hp-explanation" data-hsg-explanation-question="'+n+'">'+
  '<button type="button" class="hsg-hp-explanation-toggle" data-hsg-explain-toggle aria-expanded="false">'+
  'Xem đáp án / giải thích <span aria-hidden="true">⌄</span></button>'+
  '<div class="hsg-hp-explanation-panel" data-hsg-explain-panel hidden></div></section>';
}
function attachHSGExplanationControls(root,g){
 if(!root)return;
 root.querySelectorAll("[data-hsg-explain-toggle]").forEach(button=>{
  button.onclick=()=>{
   const parent=button.closest("[data-hsg-explanation-question]"),panel=parent?.querySelector("[data-hsg-explain-panel]");
   if(!panel)return;
   const open=panel.hidden;
   if(open&&!panel.dataset.rendered){
    const n=Number(parent.dataset.hsgExplanationQuestion),q=getQuestion(g,n);
    const spec=global.HSGHaiPhongExplanations?.spec(
      state.exam?.id,g.id,n,q,hsgExplanationSource(g,n));
    if(!spec||!global.ExplanationV1){
     panel.textContent="Không thể tải lời giải cho câu này. Vui lòng thử tải lại trang.";
     return;
    }
    // Only display material requested by the user. Do not evaluate or change any
    // saved answers, scores, unlocks or answer keys.
    panel.innerHTML=
      global.ExplanationV1.render(spec,{className:"hsg-hp-reference"});
    // One click reveals both the suggested answer and all three V1.1
    // explanation stages. The shared renderer remains unchanged.
    panel.querySelectorAll(".ev1-details").forEach(details=>{details.open=true});
    panel.dataset.rendered="true";
   }
   panel.hidden=!open;button.setAttribute("aria-expanded",String(open));
  };
 });
}

function freezeHaiPhongAnswers(root){
 if(state.exam?.id!=="hai-phong"||!state.answerReviewUnlocked||!root)return;
 root.querySelectorAll(".answer,[data-hsg-choice],[data-hsg-field],[data-hsg-clear],"+
  "[data-hsg-flag],#hsg-clear,#hsg-flag").forEach(el=>{
   el.disabled=true;el.setAttribute("aria-disabled","true");
  });
}
function renderPassageForms(g){
 const mount=$("hsg-answer-list");if(!mount)return;
 const nums=visibleQuestionNumbers(g),first=nums[0],last=nums[nums.length-1],typed=structuredPart(g);
 const instruction=typed?(typed.kind==="word_formation"?"Complete the gaps using the correct form of the word in brackets.":typed.kind==="open_cloze"?"Fill each gap with ONE suitable word.":typed.kind==="reading_comprehension"?"Read the passage and choose the best answer A, B, C or D.":"Choose the best option A, B, C or D for each numbered gap."):actualKind(g,first)==="error"?
  "Find and correct the errors in the passage. Each correction is saved separately.":
  "Read the passage on the left and answer the questions below.";
 mount.innerHTML='<div class="hsg-reading-section-head"><span class="hsg-reading-eyebrow">'+esc(activePassageBlock(g)?.title||g.name)+'</span>'+
  '<h2>Questions '+first+'–'+last+'</h2><p>'+esc(instruction)+'</p></div>'+
  nums.map(n=>{
   const k=g.id+":"+n,q=getQuestion(g,n),r=state.answers[k]||{};
   const stem=String(q.stem||"").replace(/\s+/g," ").trim(),short=stem.length>450?stem.slice(0,450).replace(/\s+\S*$/,"")+"…":stem;
   const fallback=q.type==="error"?"Identify one error and write its correction.":/cloze|gap|completion/i.test(g.name)?"Complete gap "+n+" using the passage.":"Use the source passage to answer question "+n+".";
   return '<article class="hsg-reading-q-card'+(state.question===n?' is-active':'')+'" id="hsg-question-'+n+'" data-hsg-question="'+n+'">'+
    '<div class="hsg-reading-question-head"><span class="hsg-reading-num">'+n+'</span><p>'+esc(short||fallback)+'</p></div>'+
    (stem.length>450?'<details class="hsg-question-full"><summary>Xem toàn bộ câu hỏi</summary><p>'+esc(stem)+'</p></details>':"")+
    '<div class="hsg-current-form">'+passageInput(g,n,q,r)+'</div>'+
    (state.exam?.id==="hai-phong"&&state.answerReviewUnlocked?'<div class="hsg-hp-answer-evaluation">'+haiPhongGradeBadge(g,n)+'</div>':"")+
    hsgExplanationControl(g,n,q)+
    '<div class="hsg-current-foot"><button type="button" data-hsg-flag aria-pressed="'+!!state.review[k]+'">'+(state.review[k]?'★ Đã đánh dấu':'☆ Đánh dấu để xem lại')+'</button>'+
    '<span data-hsg-completion>'+(meaningfulAnswer(r)?'Đã trả lời':'Chưa hoàn thành')+'</span>'+
    '<button type="button" data-hsg-clear>Xóa</button></div></article>';
  }).join("");
 attachHSGExplanationControls(mount,g);
 const focus=card=>{state.question=Number(card.dataset.hsgQuestion);mount.querySelectorAll(".hsg-reading-q-card").forEach(el=>el.classList.toggle("is-active",el===card));updateIndicators()};
 mount.querySelectorAll(".hsg-reading-q-card").forEach(card=>{
  const n=Number(card.dataset.hsgQuestion),k=g.id+":"+n,q=getQuestion(g,n);
  card.addEventListener("focusin",()=>focus(card));
  card.querySelectorAll("[data-hsg-choice]").forEach(btn=>btn.onclick=()=>{
   focus(card);state.answers[k]={type:q.type,value:btn.dataset.hsgChoice};
   card.querySelectorAll("[data-hsg-choice]").forEach(b=>{const yes=b===btn;b.classList.toggle("selected",yes);b.setAttribute("aria-pressed",String(yes))});
   card.querySelector("[data-hsg-completion]").textContent="Đã trả lời";refreshStructuredPassage(g);updateIndicators();queueSave();
  });
  card.querySelectorAll("[data-hsg-field]").forEach(input=>input.oninput=()=>{
   focus(card);state.answers[k]={...state.answers[k],type:q.type,[input.dataset.hsgField]:input.value};
   card.querySelector("[data-hsg-completion]").textContent=meaningfulAnswer(state.answers[k])?"Đã trả lời":"Chưa hoàn thành";
   if(input.dataset.hsgField==="line"&&q.type==="error")highlightErrorLine(input.value);
   refreshStructuredPassage(g);updateIndicators();queueSave();
  });
  card.querySelector("[data-hsg-flag]").onclick=()=>{
   focus(card);state.review[k]=!state.review[k];const flag=card.querySelector("[data-hsg-flag]");
   flag.textContent=state.review[k]?"★ Đã đánh dấu":"☆ Đánh dấu để xem lại";
   flag.setAttribute("aria-pressed",String(!!state.review[k]));updateIndicators();queueSave();
  };
  card.querySelector("[data-hsg-clear]").onclick=()=>{
   focus(card);delete state.answers[k];
   card.querySelectorAll("[data-hsg-field]").forEach(el=>el.value="");
   card.querySelectorAll("[data-hsg-choice]").forEach(btn=>{btn.classList.remove("selected");btn.setAttribute("aria-pressed","false")});
   card.querySelector("[data-hsg-completion]").textContent="Chưa hoàn thành";
   highlightErrorLine("");refreshStructuredPassage(g);updateIndicators();queueSave();
  };
 });
 freezeHaiPhongAnswers(mount);
}
function attachStructuredGapActions(g){
 const source=$("hsg-passage-left-body");if(!source||!structuredPart(g))return;
 source.querySelectorAll("[data-hsg-gap]").forEach(btn=>btn.onclick=()=>{
  const n=Number(btn.dataset.hsgGap);if(!Number.isInteger(n))return;
  focusPassageQuestion(n);
  const tabs=$("hsg-passage-split")?.querySelector(".hsg-passage-mobile-tabs");
  if(tabs&&tabs.offsetParent!==null)switchPassageTab("questions");
 });
}
function refreshStructuredPassage(g){
 if(!structuredPart(g))return;
 const source=$("hsg-passage-left-body");if(!source)return;
 const pane=$("hsg-passage-left"),scroll=pane?.scrollTop||0;source.innerHTML=originalPages(g);if(pane)pane.scrollTop=scroll;attachStructuredGapActions(g);
}
function highlightErrorLine(line){
 const source=$("hsg-passage-left-body");if(!source)return;
 source.querySelectorAll("[data-hsg-line]").forEach(row=>row.classList.toggle("is-selected",!!line&&String(row.dataset.hsgLine)===String(line)));
}
function attachErrorPassageActions(g){
 const source=$("hsg-passage-left-body");
 if(!source||actualKind(g,state.question)!=="error")return;
 const choose=(row,selection)=>{
  if(!row||(state.exam?.id==="hai-phong"&&state.answerReviewUnlocked))return;
  const n=state.question,k=g.id+":"+n;
  const sourceUncertain=errorSourceModel(g,n).model.numberingUncertain;
  const originalLine=row.dataset.hsgLine??(sourceUncertain?(state.answers[k]?.line||""):"");
  state.answers[k]={...state.answers[k],type:"error",line:originalLine};
  if(selection)state.answers[k].error=selection;
  const card=$("hsg-question-"+n);
  if(card){
   const line=card.querySelector('[data-hsg-field="line"]'),wrong=card.querySelector('[data-hsg-field="error"]');
   if(line)line.value=originalLine;
   if(wrong&&selection)wrong.value=selection;
   const status=card.querySelector("[data-hsg-completion]");
   if(status)status.textContent=meaningfulAnswer(state.answers[k])?"Đã trả lời":"Chưa hoàn thành";
  }
  highlightErrorLine(originalLine);updateIndicators();queueSave();
 };
 source.querySelectorAll("[data-hsg-line]").forEach(row=>{
  row.onclick=()=>{if(!String(window.getSelection?.()?.toString()||"").trim())choose(row,"")};
  row.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();choose(row,"")}};
 });
 source.onmouseup=()=>{
  const sel=window.getSelection?.(),phrase=String(sel?.toString()||"").trim().replace(/\s+/g," ");
  if(!phrase||phrase.length>180)return;
  const a=sel.anchorNode?.nodeType===1?sel.anchorNode:sel.anchorNode?.parentElement;
  const b=sel.focusNode?.nodeType===1?sel.focusNode:sel.focusNode?.parentElement;
  const row=a?.closest?.("[data-hsg-line],[data-hsg-error-paragraph]");
  if(row&&row===b?.closest?.("[data-hsg-line],[data-hsg-error-paragraph]"))choose(row,phrase);
 };
}

function focusPassageQuestion(n){
 const g=groups(state.exam).find(x=>x.id===state.group),prior=activePassageBlock(g),previous=state.question;
 state.question=n;
 const current=activePassageBlock(g);
 if((prior?.start??-1)!==(current?.start??-1)){renderExam();return}
 const mount=$("hsg-answer-list"),card=$("hsg-question-"+n);
 if(!card){renderExam();return}
 mount.querySelectorAll(".hsg-reading-q-card").forEach(el=>el.classList.toggle("is-active",el===card));
 // Scroll only the question scrollport, not the document or the passage pane.
 const pane=$("hsg-passage-right");
 if(pane){
  const frame=pane.getBoundingClientRect(),bounds=card.getBoundingClientRect();
  const sticky=pane.querySelector(".hsg-passage-column-head")?.getBoundingClientRect().height||0;
  const above=bounds.top-frame.top-sticky-16,below=bounds.bottom-frame.bottom+16;
  const displacement=above<0?above:below>0?below:0;
  if(displacement)pane.scrollBy({top:displacement,behavior:"smooth"});
 }
 if(previous!==n){
  const source=$("hsg-passage-left-body");
  if(source){const pane=$("hsg-passage-left"),scroll=pane?.scrollTop||0;source.innerHTML=originalPages(g);if(pane)pane.scrollTop=scroll;attachErrorPassageActions(g);attachStructuredGapActions(g)}
 }
 updateIndicators();
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
  if(state.exam?.id==="hai-phong"){
   state.passageSplitRatio=Math.round(value);
   document.querySelectorAll(".hsg-hp-v2 [data-hsg-ratio]").forEach(button=>{
    button.setAttribute("aria-pressed",String(Number(button.dataset.hsgRatio)===state.passageSplitRatio));
   });
  }
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
 const previous=split.dataset.mobileTab;
 const paneFor=t=>$(t==="passage"?"hsg-passage-left":"hsg-passage-right");
 if(previous==="passage"||previous==="questions"){
  const prior=paneFor(previous);
  if(prior&&prior.getClientRects().length)state.readingScroll[previous]=prior.scrollTop;
 }
 split.dataset.mobileTab=tab;
 split.querySelectorAll("[data-hsg-mobile-tab]").forEach(btn=>btn.setAttribute("aria-pressed",String(btn.dataset.hsgMobileTab===tab)));
 const active=paneFor(tab);if(active)active.scrollTop=state.readingScroll[tab]||0;
}

function meaningfulAnswer(v){if(!v)return false;if(v.type==="error")return !!(String(v.error||"").trim()&&String(v.correction||"").trim());return !!(String(v.value||"").trim()||String(v.error||"").trim()||String(v.correction||"").trim())}
function answerCount(){return range(groups(state.exam).find(x=>x.id===state.group)).filter(n=>meaningfulAnswer(state.answers[key(n)])).length}
/* Results keep the current exam route; no changes to the paper print pipeline. */
function haiPhongReport(){
 const mod=global.HSGHaiPhongResults;
 if(!mod)throw new Error("Chưa tải được trang kết quả Hải Phòng.");
 return mod.build(groups(state.exam),state.answers,(g,n)=>{
  const question=getQuestion(g,n),source=hsgExplanationSource(g,n);
  const verified=!!global.HSGHaiPhongExplanations?.available("hai-phong",g.id,n,question,source);
  return {question,verified,reference:verified?global.HSGHaiPhongExplanations.spec("hai-phong",g.id,n,question,source):null};
 });
}
function renderHaiPhongResults(){
 const root=$("pageMount"),report=haiPhongReport();
 global.HSGHaiPhongResults.render(root,report,{
  library:()=>{location.hash=BASE},
  reviewQuestion:identity=>{
   const item=report.all.find(q=>q.key===identity);if(!item)return;
   state.group=item.group;state.question=item.number;
   state.resultVisible=false;state.answerReviewUnlocked=true;
   renderExam();
   const g=groups(state.exam).find(x=>x.id===item.group);
   if(passageBased(g))focusPassageQuestion(item.number);
   queueSave();
  },
  reviewAll:()=>{
   state.resultVisible=false;state.answerReviewUnlocked=true;
   renderExam();
   const g=groups(state.exam).find(x=>x.id===state.group);
   if(passageBased(g))focusPassageQuestion(state.question);
   queueSave();
  },
  resume:()=>{
   state.resultVisible=false;state.answerReviewUnlocked=false;
   renderExam();queueSave();
  }
 });
}
function haiPhongGrade(g,n){
 if(state.exam?.id!=="hai-phong"||!state.answerReviewUnlocked)return null;
 const question=getQuestion(g,n),source=hsgExplanationSource(g,n);
 const available=!!global.HSGHaiPhongExplanations?.available("hai-phong",g.id,n,question,source);
 const reference=available?global.HSGHaiPhongExplanations.spec("hai-phong",g.id,n,question,source):null;
 return global.HSGHaiPhongResults?.evaluate(question,state.answers[g.id+":"+n]||{},reference,available)||null;
}
function haiPhongGradeBadge(g,n){
 const grade=haiPhongGrade(g,n);if(!grade)return "";
 const info=global.HSGHaiPhongResults.STATUS[grade.status];
 return '<span class="hsg-hp-result-status '+grade.status+'" aria-label="Kết quả câu: '+info.label+'">'+
   info.icon+' '+info.label+'</span>';
}
function renderExam(){
 const e=state.exam;
 if(e?.id==="hai-phong"&&state.resultVisible){renderHaiPhongResults();return}
 const g=groups(e).find(x=>x.id===state.group)||groups(e)[0];
 const total=g.end-g.start+1,done=answerCount(),pct=Math.round(done/total*100),passage=passageBased(g);
 const nums=visibleQuestionNumbers(g);
 const blocks=g.kind==="mixed"?[{start:1,end:40,title:"Grammar & Vocabulary"},...PTNK_PASSAGE_BLOCKS,{start:106,end:115,title:"Word Formation"},{start:121,end:130,title:"Sentence Transformation"}].sort((a,b)=>a.start-b.start):[];
 const jump=passage&&blocks.length?'<label class="hsg-reading-jump-label">Chuyển phần <select id="hsg-reading-jump" aria-label="Chuyển phần trong mã đề">'+
  blocks.map(p=>'<option value="'+p.start+'"'+(state.question>=p.start&&state.question<=p.end?' selected':'')+'>'+esc(p.title)+' ('+p.start+'–'+p.end+')</option>').join("")+'</select></label>':"";
 const nav=passage?'<nav class="hsg-reading-map" aria-label="Danh sách câu hỏi"><span class="hsg-reading-map-label">Câu hỏi</span>'+
  '<div class="hsg-reading-map-buttons">'+nums.map(n=>'<button type="button" class="hsg-number'+(meaningfulAnswer(state.answers[key(n)])?' has-answer':'')+(state.review[key(n)]?' flagged':'')+(state.question===n?' selected':'')+'" data-question="'+n+'" aria-label="Câu '+n+'">'+n+'</button>').join("")+'</div>'+
  '<span class="hsg-reading-map-legend">Xanh: đã trả lời · Vàng: xem lại</span></nav>':"";
 const fontTools=structuredPart(g)?'<div class="hsg-reading-type-controls" role="group" aria-label="Điều chỉnh cỡ chữ bài đọc">'+
   '<button type="button" data-hsg-text-size="smaller" aria-label="Giảm cỡ chữ bài đọc" title="Giảm cỡ chữ">A−</button>'+
   '<span data-hsg-text-size-label aria-live="polite">'+state.passageTextSize+'px</span>'+
   '<button type="button" data-hsg-text-size="larger" aria-label="Tăng cỡ chữ bài đọc" title="Tăng cỡ chữ">A+</button></div>':
   '<span class="hsg-scroll-help">Cuộn độc lập</span>';
  const splitTools=passage&&e.id==="hai-phong"?'<div class="hsg-hp-workspace-tools" role="group" aria-label="Điều chỉnh độ rộng phần đọc">'+
  '<span>Không gian đọc</span><button type="button" data-hsg-ratio="62">Văn bản rộng</button>'+
  '<button type="button" data-hsg-ratio="54">Cân bằng</button>'+
  '<button type="button" data-hsg-ratio="42">Câu hỏi rộng</button></div>':"";
  const split=passage?'<div class="hsg-passage-split" id="hsg-passage-split" data-mobile-tab="questions">'+
  '<div class="hsg-passage-mobile-tabs"><button type="button" data-hsg-mobile-tab="passage" aria-pressed="false">Đoạn văn</button><button type="button" data-hsg-mobile-tab="questions" aria-pressed="true">Câu hỏi & trả lời</button></div>'+
  splitTools+'<div class="hsg-passage-workspace"><section class="hsg-passage-left" id="hsg-passage-left" aria-label="Đoạn văn" role="region" tabindex="0"><div class="hsg-passage-column-head"><strong>PASSAGE · SOURCE TEXT</strong>'+fontTools+'</div><div class="hsg-passage-content" id="hsg-passage-left-body">'+originalPages(g)+'</div></section>'+
  '<div class="hsg-passage-divider" aria-hidden="true"></div><section class="hsg-passage-right" id="hsg-passage-right" aria-label="Câu hỏi và phiếu trả lời" role="region" tabindex="0"><div class="hsg-passage-column-head"><strong>QUESTIONS · ANSWERS</strong><span>Tự động lưu</span></div><div class="hsg-passage-questions" id="hsg-answer-list"></div></section></div>'+nav+'</div>':"";
 // One route-owned rendering container for ALL HSG sections.
 removeReadingPortal();
 const root=$("pageMount");
 root.style.display="block";
 root.innerHTML='<div class="hsg-root hsg-modern'+(e.id==="hai-phong"?' hsg-hp-v2 hsg-hp-compact':'')+(passage?' hsg-reading-mode'+(structuredPart(g)?' hsg-pilot hsg-pilot-'+structuredPart(g).kind+(structuredPart(g).optionsLayout?' hsg-layout-'+structuredPart(g).optionsLayout:''):''):'')+'"><div class="breadcrumbs"><button class="crumb-btn" type="button" onclick="location.hash=\''+BASE+'\'">HSG tỉnh</button><span>›</span><span>'+esc(e.title)+'</span></div>'+
 '<div class="hsg-exam-head"><div><div class="hsg-kicker">'+(e.id==="hai-phong"?"ĐỀ THI TIẾNG ANH CHUYÊN · ":"INTERACTIVE EXAM · ")+esc(e.year)+'</div><h1>'+esc(e.title)+'</h1>'+
 (e.id==="hai-phong"?"":'<p>Trả lời trực tiếp · Không Listening · Chưa có lời giải</p>')+'</div><div class="hsg-exam-head-actions"><button type="button" class="hsg-light-btn" id="hsg-print">In</button>'+(e.id==="hai-phong"?"":'<button type="button" class="hsg-main-btn" id="hsg-export">Xuất bài làm</button>')+
 (e.id==="hai-phong"?'<button type="button" id="hsg-toggle-answer-review" class="hsg-hp-review-switch" aria-pressed="'+(state.answerReviewUnlocked?'true':'false')+'">'+
   (state.answerReviewUnlocked?'← Về trang kết quả':'Kết thúc bài làm')+'</button>':"")+'</div></div>'+
 (e.id==="hai-phong"?'<div class="hsg-hp-compact-nav" aria-label="Điều hướng phần thi và tiến độ">'+
  '<div class="hsg-hp-part-picker"><label for="hsg-hp-part-select">'+
  (state.answerReviewUnlocked?'ĐANG XEM LẠI':'PHẦN ĐANG LÀM')+' · '+(groups(e).findIndex(x=>x.id===g.id)+1)+'/'+groups(e).length+'</label>'+
  '<select id="hsg-hp-part-select" aria-label="Chọn phần của đề Hải Phòng">'+
  groups(e).map(x=>'<option value="'+esc(x.id)+'"'+(x.id===g.id?' selected':'')+'>'+esc(x.name)+'</option>').join("")+'</select>'+
  '<span id="hsg-save-status" class="hsg-hp-save-status" role="status">Tự động lưu theo tài khoản</span></div>'+
  '<div class="hsg-hp-compact-progress"><div class="hsg-hp-compact-progress-top">'+
  '<strong id="hsg-progress-num">'+done+'/'+total+'</strong><span>câu đã làm</span></div>'+
  '<div class="hsg-progress-track"><i id="hsg-progress-fill" style="width:'+pct+'%"></i></div>'+
  '<div class="hsg-hp-compact-progress-bottom"><span>Phạm vi: '+(g.id==="essay"?"Bài viết":g.start+'–'+g.end)+'</span>'+
  '<span id="hsg-progress-pct">'+pct+'%</span></div></div></div>':
 '<div class="hsg-exam-progress"><div><b id="hsg-progress-num">'+done+'/'+total+'</b> câu đã làm <span id="hsg-save-status">Tự động lưu theo tài khoản</span></div><div class="hsg-progress-track"><i id="hsg-progress-fill" style="width:'+pct+'%"></i></div><strong id="hsg-progress-pct">'+pct+'%</strong></div>'+
 '<div class="hsg-group-tabs">'+groups(e).map(x=>'<button type="button" data-group="'+esc(x.id)+'" class="'+(x.id===g.id?'active':'')+'">'+esc(x.name)+'</button>').join("")+jump+'</div>')+
 '<div class="hsg-study-layout'+(passage?' has-shared-passage':'')+'"><main class="hsg-study-main">'+
 (passage?split:'<section class="hsg-study-question" id="hsg-answer-editor" aria-label="Câu hỏi"></section><details class="hsg-source-details"><summary>Xem nguyên văn đề gốc</summary><div class="hsg-original-pages">'+originalPages(g)+'</div></details>')+
 '</main>'+(passage?'':'<aside class="hsg-study-rail"><div class="hsg-study-rail-head"><strong>QUESTION MAP</strong><p>'+esc(g.name)+'</p></div><div class="hsg-number-grid">'+range(g).map(n=>'<button type="button" class="hsg-number'+(meaningfulAnswer(state.answers[key(n)])?' has-answer':'')+(state.review[key(n)]?' flagged':'')+(state.question===n?' selected':'')+'" data-question="'+n+'">'+n+'</button>').join("")+'</div><p class="hsg-study-rail-foot">Chọn số để chuyển câu. Màu xanh: đã trả lời; dấu vàng: cần xem lại.</p></aside>')+'</div></div>';
 const reviewSwitch=root.querySelector("#hsg-toggle-answer-review");
 if(reviewSwitch)reviewSwitch.onclick=()=>{
  // Review stays read-only; after finishing show an independent dashboard.
  state.answerReviewUnlocked=true;state.resultVisible=true;
  renderExam();queueSave();
 };
 const continueSwitch=root.querySelector("#hsg-continue-practice");
 if(continueSwitch)continueSwitch.onclick=()=>{
  state.answerReviewUnlocked=false;state.resultVisible=false;
  renderExam();queueSave();
 };
 const hpPartSelect=root.querySelector("#hsg-hp-part-select");
 if(hpPartSelect)hpPartSelect.onchange=()=>{
  const next=groups(e).find(x=>x.id===hpPartSelect.value);if(!next)return;
  state.group=next.id;state.question=next.start;renderExam();queueSave();
 };
 root.querySelectorAll("[data-group]").forEach(b=>b.onclick=()=>{
  const next=groups(e).find(x=>x.id===b.dataset.group);if(!next)return;
  state.group=next.id;state.question=next.start;renderExam();queueSave();
 });
 root.querySelectorAll("[data-question]").forEach(b=>b.onclick=()=>{
  const old=activePassageBlock(g),next=Number(b.dataset.question),now=activePassageBlock(g,next);
  if(g.kind==="mixed"&&old?.start!==now?.start){state.question=next;renderExam()}
  else if(passage){
    if(e.id==="hai-phong"&&window.matchMedia("(max-width:880px)").matches)switchPassageTab("questions");
    focusPassageQuestion(next);
  }
  else{state.question=next;renderEditor()}
  updateIndicators();queueSave();
 });
 const dropdown=$("hsg-reading-jump");
 if(dropdown)dropdown.onchange=()=>{state.question=Number(dropdown.value);renderExam();queueSave()};
 root.querySelectorAll("[data-hsg-mobile-tab]").forEach(b=>b.onclick=()=>switchPassageTab(b.dataset.hsgMobileTab));
 const left=root.querySelector(".hsg-passage-left");
 if(left)left.style.setProperty("--hsg-reading-font-size",state.passageTextSize+"px");
 const textSizeButtons=[...root.querySelectorAll("[data-hsg-text-size]")];
 const syncTextSize=()=>{
  left?.style.setProperty("--hsg-reading-font-size",state.passageTextSize+"px");
  const label=root.querySelector("[data-hsg-text-size-label]");
  if(label)label.textContent=state.passageTextSize+"px";
  textSizeButtons.forEach(button=>{
   button.disabled=(button.dataset.hsgTextSize==="smaller"&&state.passageTextSize<=15)||
    (button.dataset.hsgTextSize==="larger"&&state.passageTextSize>=21);
  });
 };
 textSizeButtons.forEach(button=>button.onclick=()=>{
  state.passageTextSize=Math.max(15,Math.min(21,state.passageTextSize+
   (button.dataset.hsgTextSize==="larger"?1:-1)));
  syncTextSize();
 });
 syncTextSize();
 if(e.id==="hai-phong"&&passage){
  const grid=root.querySelector(".hsg-passage-workspace");
  const presets=[...root.querySelectorAll("[data-hsg-ratio]")];
  const setRatio=value=>{
   const ratio=Math.max(30,Math.min(70,Number(value)||54));
   state.passageSplitRatio=ratio;
   if(grid)grid.style.gridTemplateColumns="minmax(0,"+ratio+"fr) 7px minmax(0,"+(100-ratio)+"fr)";
   presets.forEach(btn=>{
    const chosen=Number(btn.dataset.hsgRatio)===ratio;
    btn.setAttribute("aria-pressed",String(chosen));
   });
  };
  presets.forEach(btn=>btn.onclick=()=>setRatio(btn.dataset.hsgRatio));
  setRatio(state.passageSplitRatio);
 }
 const exportButton=$("hsg-export");if(exportButton)exportButton.onclick=exportAnswers;
 $("hsg-print").onclick=openPrintDialog;
 renderEditor();if(passage){setupPassageDivider();attachErrorPassageActions(g);attachStructuredGapActions(g)}
}
function updateIndicators(){
 const g=groups(state.exam).find(x=>x.id===state.group),done=answerCount(),size=g.end-g.start+1,pct=Math.round(done/size*100);
 const num=$("hsg-progress-num");if(num)num.textContent=done+"/"+size;
 const p=$("hsg-progress-pct");if(p)p.textContent=pct+"%";
 const f=$("hsg-progress-fill");if(f)f.style.width=pct+"%";
 document.querySelectorAll(".hsg-study-rail [data-question],.hsg-reading-map [data-question]").forEach(b=>{
  const n=Number(b.dataset.question);b.classList.toggle("selected",n===state.question);
  b.classList.toggle("has-answer",meaningfulAnswer(state.answers[key(n)]));
  b.classList.toggle("flagged",!!state.review[key(n)]);b.setAttribute("aria-current",n===state.question?"true":"false");
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
 '<div class="hsg-question-stem">'+esc(stem)+'</div><p class="hsg-form-note">'+(state.exam?.id==="hai-phong"&&state.answerReviewUnlocked?"Câu trả lời đã được giữ nguyên để xem lại.":"Trả lời bên dưới · Tự lưu · Chưa chấm điểm.")+'</p>'+inputs+
 (state.exam?.id==="hai-phong"&&state.answerReviewUnlocked?'<div class="hsg-hp-answer-evaluation">'+haiPhongGradeBadge(g,n)+'</div>':"")+
 hsgExplanationControl(g,n,q)+
 '<div class="hsg-question-actions"><button type="button" id="hsg-clear">Xóa câu trả lời</button><button type="button" id="hsg-flag">'+(state.review[k]?'★ Đã đánh dấu':'☆ Đánh dấu xem lại')+'</button></div>'+
 '<div class="hsg-question-nav"><button class="secondary" id="hsg-prev-question" type="button"'+(n===g.start?' disabled':'')+'>← Câu trước</button><span>'+ (n-g.start+1)+' / '+(g.end-g.start+1)+'</span><button class="primary" id="hsg-next-question" type="button"'+(n===g.end?' disabled':'')+'>Câu tiếp theo →</button></div>';
 attachHSGExplanationControls(editor,g);
 editor.querySelectorAll("[data-hsg-value]").forEach(b=>b.onclick=()=>{state.answers[k]={type:q.type,value:b.dataset.hsgValue};queueSave();renderEditor();updateIndicators()});
 editor.querySelectorAll("[data-hsg-field]").forEach(el=>el.oninput=()=>{
  state.answers[k]={...state.answers[k],type:q.type,[el.dataset.hsgField]:el.value};queueSave();updateIndicators();
  const wc=$("hsg-word-count");if(wc&&el.dataset.hsgField==="value")wc.textContent="Số từ: "+el.value.trim().split(/\s+/).filter(Boolean).length;
 });
 $("hsg-flag").onclick=()=>{state.review[k]=!state.review[k];queueSave();renderEditor();updateIndicators()};
 $("hsg-clear").onclick=()=>{delete state.answers[k];queueSave();renderEditor();updateIndicators()};
 $("hsg-prev-question").onclick=()=>{state.question--;if(g.kind==="mixed")renderExam();else renderEditor();updateIndicators();queueSave()};
 $("hsg-next-question").onclick=()=>{state.question++;if(g.kind==="mixed")renderExam();else renderEditor();updateIndicators();queueSave()};
 freezeHaiPhongAnswers(editor);
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



/* HSG paper typesetter.
   Layout inspiration: Cambridge English paper-based specimen booklets.
   Keep the source wording verbatim; only infer paragraph/section boundaries. */
function printNormalize(value){
 return String(value||"")
  .replace(/[\u200b-\u200d\ufeff]/g,"")
  .replace(/\u00a0/g," ")
  .replace(/\r\n?/g,"\n")
  .replace(/[ \t]{2,}/g," ")
  .replace(/[ \t]+\n/g,"\n")
  .replace(/\n[ \t]+/g,"\n");
}
function printInline(value){
 return esc(value).replace(/(^|[^\w])(_{3,}|\.{4,})(?=$|[^\w])/g,
  '$1<span class="hsg-print-blank">$2</span>');
}
function printOptionSequence(value){
 const text=printNormalize(value).replace(/\s*\n\s*/g," ").trim();
 // Require A,B,C,D consecutively, so prose with just A/B is not mistaken for options.
 const marks=[...text.matchAll(/(?:^|\s)([A-D])[.)](?=\s+\S)/g)];
 for(let i=0;i<=marks.length-4;i++){
  const set=marks.slice(i,i+4);
  if(set.map(m=>m[1]).join("")!=="ABCD")continue;
  const options=set.map((m,k)=>text.slice(m.index+m[0].length,
   k<3?set[k+1].index:text.length).trim());
  if(options.some(x=>!x||x.length>600))continue;
  return {stem:text.slice(0,set[0].index).trim(),options};
 }
 return {stem:text,options:null};
}
function printChoiceGrid(options){
 return global.HSGPrintEngine.choiceGrid(options);
}
function printParagraphPieces(value){
 const text=printNormalize(value).trim();
 if(!text)return [];
 const paragraphs=[];
 // A blank source line is an actual paragraph break; never discard it.
 for(const block of text.split(/\n\s*\n+/)){
  const lines=block.split("\n").map(s=>s.trim()).filter(Boolean);
  let paragraph="";
  const flush=()=>{if(paragraph.trim())paragraphs.push(paragraph.trim());paragraph=""};
  for(let i=0;i<lines.length;i++){
   const line=lines[i];
   const separate=/^(?:Dear\b|To all\b|Best regards\b|Kind regards\b|Yours sincerely\b|Sincerely\b|Subject:|From:|Read the following\b|Read the passage\b|Read the text\b|Complete the following\b|Choose the best\b|Identify\b|Find and correct\b)/i.test(line);
   const transition=/^(?:However|Nevertheless|Furthermore|Moreover|Consequently|In addition|On the other hand|As a result|Meanwhile|Therefore|To conclude|In contrast|Finally)[,.\s]/i.test(line);
   const ended=/[.!?]["'’”)]?$/.test(paragraph);
   // Only split a PDF hard wrap into a new paragraph on clear semantic cues.
   if(paragraph&&(separate||(transition&&ended&&paragraph.length>95)))flush();
   paragraph+=(paragraph?" ":"")+line;
   if(separate)flush();
  }
  flush();
 }
 // Some OCR passages contain no blank lines at all. Avoid a page-long paragraph,
 // but split only at sentence boundaries, never mid-sentence or mid-gap.
 const out=[];
 for(const paragraph of paragraphs){
  if(paragraph.length<=850){out.push(paragraph);continue}
  const sentences=paragraph.split(/(?<=[.!?])\s+(?=[“"‘']?[A-ZÀ-Ỹ])/);
  let current="";
  for(const sentence of sentences){
   if(current&&current.length+sentence.length>650){out.push(current);current=sentence}
   else current+=(current?" ":"")+sentence;
  }
  if(current)out.push(current);
 }
 return out;
}
function printProse(value,kind="passage"){
 const cls=kind==="prompt"?"hsg-print-prompt-prose":"hsg-print-prose";
 return printParagraphPieces(value).map(line=>'<p class="'+cls+'">'+printInline(line)+'</p>').join("");
}
function printSourceQuestion(n,lines){
 const parsed=printOptionSequence(lines.join("\n"));
 const isLong=parsed.stem.length>300;
 return '<article class="hsg-print-source-question'+(isLong?' has-passage':'')+'">'+
  '<div class="hsg-print-source-num">'+esc(n)+'.</div>'+
  '<div class="hsg-print-source-q-body">'+
  (parsed.stem?'<div class="hsg-print-source-stem">'+printProse(parsed.stem,"prompt")+'</div>':"")+
  (parsed.options?printChoiceGrid(parsed.options):"")+
  '</div></article>';
}
function printTypesetText(value){
 const text=printNormalize(value);
 // Examine the original line order: source paragraphs, question options and headings
 // must be separate elements rather than one long HTML text node.
 const lines=text.split("\n"),out=[];
 let prose=[],question=null,numbered=false,lineBuffer=null,skipAnswerGrid=false;
 const flushProse=()=>{if(prose.length){out.push(printProse(prose.join("\n")));prose=[]}};
 const flushQuestion=()=>{if(question){out.push(printSourceQuestion(question.n,question.lines));question=null}};
 const flushError=()=>{if(lineBuffer){out.push('<div class="hsg-print-error-line"><b>'+esc(lineBuffer.n)+'</b><span>'+printInline(lineBuffer.text)+'</span></div>');lineBuffer=null}};
 for(const raw of lines){
  const line=raw.trim();
  if(/^Page\s+\d+\s+(?:of|\/)\s+\d+$/i.test(line)||/^Trang\s+\d+\s*\/\s*\d+$/i.test(line))continue;
  const section=/^(?:SECTION\s+[A-ZIVXLCDM0-9]+[.:]|PART\s+[A-D][:.]|[IVX]+\.\s+(?:LEXICO|READING|WRITING|PHONETICS|LANGUAGE))/i.test(line);
  const part=/^(?:PART|Part)\s+(?:\d+|[IVX]+)[.:)]\s*/.test(line);
  const bareSection=/^(?:READING|WRITING|LEXICO-GRAMMAR|GRAMMAR AND VOCABULARY)\s*(?:\([^)]*\))?$/i.test(line);
  const instruction=/^(?:Read (?:the following|the passage|the text|an extract)|Choose (?:the|a|one)|Complete (?:the|each)|For questions|Fill in (?:the|each)|Identify (?:the|\d+)|Find and correct|Write (?:an|a) essay)/i.test(line);
  const questionMatch=/^(?:Question\s+)?(\d{1,3})[.)]\s*(.*)$/i.exec(line);
  const answerTable=/^(?:YOUR ANSWERS?|ANSWER SHEET|KEY TO ANSWERS?|ANSWERS?)(?:\s*[:(]|\s*$)/i.test(line);
  if(!line){
   if(question){
    // An option grid followed by a blank line is a finished question.
    if(printOptionSequence(question.lines.join("\n")).options)flushQuestion();
    else question.lines.push("");
   }else flushProse();
   continue;
  }
  if(section||part||bareSection){
   flushError();flushQuestion();flushProse();skipAnswerGrid=false;numbered=false;
   out.push('<h2 class="'+(part?'hsg-print-source-part':'hsg-print-source-section')+'">'+printInline(line)+'</h2>');
   continue;
  }
  if(answerTable){
   flushError();flushQuestion();flushProse();skipAnswerGrid=true;numbered=false;
   continue;
  }
  if(skipAnswerGrid){
   // Many source PDFs add an empty answer grid after each task. Do not print it.
   if(instruction||line.length<100&&line===line.toLocaleUpperCase("en-US")&&/[A-Z]{5}/.test(line)){skipAnswerGrid=false}
   else if(/^Question\s+\d{1,3}[.)]/i.test(line)){skipAnswerGrid=false}
   else continue;
  }
  if(/^Line$/i.test(line)){
   flushQuestion();flushProse();numbered=true;continue;
  }
  if(numbered){
   const m=/^(\d{1,2})(?:\s+(.+))?$/.exec(line);
   if(m){flushError();lineBuffer={n:m[1],text:m[2]||""};continue}
   if(lineBuffer&&!instruction&&!questionMatch){lineBuffer.text+=(lineBuffer.text?" ":"")+line;continue}
   flushError();numbered=false;
  }
  if(questionMatch){
   flushQuestion();flushProse();
   question={n:questionMatch[1],lines:[questionMatch[2]||""]};
   continue;
  }
  if(question){
   const parsed=printOptionSequence(question.lines.join("\n"));
   if(parsed.options&&(instruction||/^(?:Dear\b|To all\b|PART-TIME JOBS|GUIDED CLOZE|OPEN CLOZE)/i.test(line))){
    flushQuestion();flushProse();
   }else{
    question.lines.push(line);
    continue;
   }
  }
  if(/^[•●▪]\s+/.test(line)||/^[–-]\s+\S/.test(line)){
   flushProse();out.push('<p class="hsg-print-bullet">'+printInline(line.replace(/^[•●▪–-]\s*/,""))+'</p>');
   continue;
  }
  const heading=line.length<125&&/^[A-ZÀ-Ỹ]/.test(line)&&
    line===line.toLocaleUpperCase("en-US")&&/[A-Z]{5}/.test(line)&&
    !/^(?:TRUE|FALSE|NOT GIVEN|YES|NO|STATEMENTS)$/i.test(line);
  if(heading){flushProse();out.push('<h3 class="hsg-print-source-subhead">'+printInline(line)+'</h3>');continue}
  if(instruction){flushProse();out.push('<p class="hsg-print-instruction">'+printInline(line)+'</p>');continue}
  prose.push(line);
 }
 flushError();flushQuestion();flushProse();
 return out.join("");
}
function printSourcePages(pages){
 return '<div class="hsg-print-typeset-source">'+
  printTypesetText(pages.map(p=>p.text||"").join("\n\n"))+'</div>';
}

function printQuestions(g,first,last,contextSource=""){
 let countMissing=0;const cards=[];
 for(let n=first;n<=last;n++){
  const q=getQuestion(g,n),type=q.type;
  const opts=type==="mcq"?q.options:type==="match"?matchingLabels(g).map(([l,v])=>l+". "+v):
    type==="tfng"?["TRUE","FALSE","NOT GIVEN"]:type==="ynng"?["YES","NO","NOT GIVEN"]:null;
  if(type==="mcq"&&(!opts||opts.length!==4))countMissing++;
  let stem=printNormalize(q.stem||"").trim();
  if((passageBased(g)||!!activePassageBlock(g,n))&&["mcq","fill","error"].includes(type)&&stem.length>280){
   const normalized=printNormalize(contextSource).replace(/\s+/g," ").trim().toLowerCase();
   const fragment=stem.replace(/\s+/g," ").slice(0,160).toLowerCase();
   // Only suppress a repeated passage, never truncate a genuine long question.
   if(fragment.length>=80&&normalized.includes(fragment))stem="";
  }
  if(!stem&&!["mcq","match","tfng","ynng","error"].includes(type)&&type==="fill")stem="Complete blank ("+n+") in the text above.";
  let detail="";
  if(type==="mcq")detail=opts?.length===4?printChoiceGrid(opts):
    '<span class="hsg-print-unavailable">Phương án trong bản nguồn chưa được nhận dạng đầy đủ.</span>';
  else if(type==="match")detail='<div class="hsg-print-listed-choices">'+(opts||[]).map(o=>'<span>'+printInline(o)+'</span>').join("")+'</div>';
  else if(type==="tfng"||type==="ynng")detail='<div class="hsg-print-pick-options">'+opts.map(o=>'<span>□ '+esc(o)+'</span>').join("")+'</div>';
  else if(type==="error")detail='<p class="hsg-print-answer-line">Line: ______ &nbsp; Error: __________________ &nbsp; Correction: __________________</p>';
  else if(type==="essay"||type==="rewrite")detail='<div class="hsg-print-writing-lines">'+Array.from({length:type==="essay"?20:3},()=>'<div></div>').join("")+'</div>';
  else detail='<p class="hsg-print-answer-line">Answer: ______________________________________________</p>';
  cards.push('<article class="hsg-print-source-question hsg-print-generated-question"><div class="hsg-print-source-num">'+n+'.</div>'+
   '<div class="hsg-print-source-q-body">'+(stem?'<p class="hsg-print-source-stem">'+printInline(stem)+'</p>':"")+detail+'</div></article>');
 }
 return {html:cards.join(""),missing:countMissing};
}


/* For uniquely numbered papers, print the actual source task instead of
   reconstructing every question from guesses. Use strict coverage checks;
   keep the previous renderer as a fallback for repeated numbering/OCR. */
function printVerifiedPartSource(part){
 const g=part.group,first=part.block?.start??g.start,last=part.block?.end??g.end;
 if(["ptnk","phan-boi-chau","dh-vinh"].includes(state.exam?.id))return null;
 const source=printNormalize(sourcePages(g).map(p=>p.text||"").join("\n"));
 if(!source.trim())return null;
 const hits=n=>[...source.matchAll(new RegExp("(?:^|\\n)[ \\t]*(?:Question\\s+)?"+n+"[.)][ \\t]*(?=\\S)","gi"))];
 const starts=hits(first),ends=hits(last);
 if(!starts.length||!ends.length)return null;
 // A question's first match can be a numbered answer grid. Match the nearest
 // valid last question AFTER the first question.
 const firstHit=starts.find(m=>ends.some(e=>e.index>m.index));
 if(!firstHit)return null;
 const endHit=ends.find(m=>m.index>firstHit.index);
 if(!endHit)return null;
 const cues=/(?:^|\n)[ \t]*(?:SECTION\s+[A-DIVX]+[.:]|PART\s+[A-Z0-9IVX]+(?:[.:)]|\s*\()|[IVX]+[.]\s*(?:Read|Choose|Complete|Supply|Fill|Rewrite)|You are going to read|Read the following|Read the text|Read the passage|Complete the following|Identify \d+|Find and correct|Choose the best|For questions?\s+\d+)/gim;
 let startPos=0;
 for(const match of source.matchAll(cues)){
  if(match.index>firstHit.index)break;
  startPos=match.index;
 }
 // Avoid carrying a whole preceding question into a selected source block.
 const prev=hits(first-1).filter(m=>m.index<firstHit.index);
 const prevHit=prev[prev.length-1];
 if(prevHit&&startPos<prevHit.index){
  const tail=source.slice(prevHit.index,firstHit.index);
  const lastCue=[...tail.matchAll(cues)].pop();
  startPos=lastCue?prevHit.index+lastCue.index:firstHit.index;
 }
 let endPos=source.length;
 const suffix=source.slice(endHit.index+endHit[0].length);
 const stop=/(?:^|\n)[ \t]*(?:SECTION\s+[A-DIVX]+[.:]|PART\s+[A-Z0-9IVX]+(?:[.:)]|\s*\()|[IVX]+[.]\s*(?:Read|Choose|Complete|Supply|Fill|Rewrite)|You are going to read|Read the following|Read the text|Read the passage|Complete the following|Identify \d+|Find and correct|For questions?\s+\d+|(?:Question\s+)?\d{1,3}[.)][ \t]+(?=\S))/gim;
 for(const m of suffix.matchAll(stop)){
  const raw=suffix.slice(m.index+m[0].length).trim();
  const numbered=/(?:^|\n)[ \t]*(?:Question\s+)?(\d{1,3})[.)]/i.exec(m[0]);
  if(numbered&&Number(numbered[1])<=last)continue;
  endPos=endHit.index+endHit[0].length+m.index;
  break;
 }
 const content=source.slice(startPos,endPos).trim();
 const prefix=source.slice(startPos,firstHit.index);
 const passageLike=/reading|cloze|matching|error|headings|true|false|yes|no/i.test(g.name);
 // When a source segment begins at the first question, the passage was not
 // reliably isolated; do not print a passage-less "verified" Reading part.
 if(passageLike&&prefix.trim().length<110)return null;
 if(/^(?:YOUR ANSWERS?|ANSWER SHEET)/i.test(content))return null;
 const expected=last-first+1;
 const seen=new Set();
 for(const m of content.matchAll(/(?:^|\n)[ \t]*(?:Question\s+)?(\d{1,3})[.)][ \t]*(?=\S)/gi)){
  const n=Number(m[1]);if(n>=first&&n<=last)seen.add(n);
 }
 if(seen.size<Math.max(2,Math.ceil(expected*.82)))return null;
 // Reject implausibly large text ranges that include unrelated test sections.
 if(content.length>expected*1700+5000)return null;
 return content;
}


/* Print validated structured data directly. No OCR inference, repeated
   passage or source question extraction can override these blocks. */
function printStructuredPart(part,index){
 return global.HSGPrintEngine.renderStructuredPart(part,index);
}
function printOnePart(part,index){
 const g=part.group,block=part.block,first=block?.start??g.start,last=block?.end??g.end;
 if(actualKind(g,first)==="error"){
  const {model,verified}=errorSourceModel(g,first);
  const title=block?.title||g.name;
  const answers=Array.from({length:last-first+1},(_,i)=>{
   const number=first+i;
   return '<div class="hsg-print-error-answer"><b>'+number+'.</b>'+
    (model.hasOriginalLines?'<span>Line: __________</span>':"")+
    '<span>Mistake: __________________</span><span>Correction: __________________</span></div>';
  }).join("");
  const warning=(!verified||model.numberingUncertain)?'<p class="hsg-print-unavailable">Dòng trong bản PDF chưa được xác minh đầy đủ. Cần đối chiếu vị trí số dòng với đề gốc trước khi phát.</p>':"";
  return '<section class="hsg-print-part" aria-label="'+esc(title)+'">'+
   '<header class="hsg-print-part-head"><div class="hsg-print-part-number">PART '+String(index).padStart(2,"0")+'</div>'+
   '<div><h2>'+esc(title)+'</h2><p>'+first+'–'+last+' · '+(last-first+1)+' câu</p></div></header>'+
   warning+global.HSGErrorLines.print(model)+
   '<div class="hsg-print-answer-section-title">ERROR CORRECTION · ANSWERS</div>'+
   '<div class="hsg-print-error-answer-grid">'+answers+'</div></section>';
 }
 // The paragraph for a PTNK block is separate from the rest of that code.
 const hasPassage=g.kind==="mixed"?!!activePassageBlock(g,first):passageBased(g);
 const typed=structuredPart(g);
 if(typed)return printStructuredPart(typed,index);
 const source=hasPassage?passageOnly(g,first):"";
 const result=printQuestions(g,first,last,source);
 const verified=printVerifiedPartSource(part);
 if(verified){
  const title=block?.title||g.name;
  return '<section class="hsg-print-part" aria-label="'+esc(title)+'">'+
    '<header class="hsg-print-part-head"><div class="hsg-print-part-number">PART '+String(index).padStart(2,"0")+'</div>'+
    '<div><h2>'+esc(title)+'</h2><p>'+first+'–'+last+' · '+(last-first+1)+' câu</p></div></header>'+
    '<div class="hsg-print-original-part">'+printTypesetText(verified.replace(/^(?:PART|Part)\s+[A-Z0-9IVX]+[.:)]\s*/i,"").trim())+'</div></section>';
 }
 const sourceHtml=source?
  '<div class="hsg-print-passage"><div class="hsg-print-passage-label">READ THE TEXT AND ANSWER THE QUESTIONS</div>'+printTypesetText(source)+'</div>':"";
 const kind=actualKind(g,first);
 const partTitle=block?.title||g.name;
 const compactGap=!!source&&kind==="fill"&&/cloze|summary|sentence completion|telemedicine/i.test(partTitle);
 const compactMatching=!!source&&kind==="match";
 const answerBoxes=()=>'<div class="hsg-print-short-answer-grid">'+
  Array.from({length:last-first+1},(_,i)=>'<div><strong>'+(first+i)+'.</strong><span>____________________</span></div>').join("")+'</div>';
 let questionHtml=result.html;
 if(compactGap){
  questionHtml='<div class="hsg-print-answer-section-title">ANSWERS · '+first+'–'+last+'</div>'+answerBoxes();
 }else if(compactMatching){
  const choices=matchingLabels(g);
  const legend='<div class="hsg-print-matching-legend">'+
   choices.map(([letter,label])=>'<div><b>'+esc(letter)+'.</b><span>'+esc(label)+'</span></div>').join("")+'</div>';
  const statements=Array.from({length:last-first+1},(_,i)=>{
   const n=first+i,q=getQuestion(g,n);
   const text=printNormalize(q.stem||"").replace(/\s+/g," ").trim();
   return '<div class="hsg-print-matching-statement"><b>'+n+'.</b>'+
     '<span>'+printInline(text)+'</span>'+
     '<em>________</em></div>';
  }).join("");
  questionHtml='<div class="hsg-print-answer-section-title">MATCHING OPTIONS</div>'+legend+
   '<div class="hsg-print-answer-section-title">QUESTIONS</div><div class="hsg-print-matching-statements">'+statements+'</div>';
 }
 const warning=result.missing?
  '<p class="hsg-print-unavailable">'+result.missing+' câu chưa trích xuất đầy đủ phương án từ nguồn. Cần đối chiếu bản gốc trước khi sử dụng.</p>':"";
 const title=block?.title||g.name;
 return '<section class="hsg-print-part" aria-label="'+esc(title)+'">'+
  '<header class="hsg-print-part-head"><div class="hsg-print-part-number">PART '+String(index).padStart(2,"0")+'</div>'+
  '<div><h2>'+esc(title)+'</h2><p>'+first+'–'+last+' · '+(last-first+1)+' câu</p></div></header>'+
  warning+sourceHtml+'<div class="hsg-print-question-list">'+questionHtml+'</div></section>';
}
function printDocumentHTML(scope,selectedParts){
 const exam=state.exam,ptnk=exam.id==="ptnk",full=scope==="all";
 const chosen=Array.isArray(selectedParts)?selectedParts:[selectedParts].filter(Boolean);
 const rank=new Map(printParts().map((part,i)=>[part.value,i]));
 const parts=(full?printParts():chosen).slice().sort((a,b)=>
  (rank.get(a.value)??Infinity)-(rank.get(b.value)??Infinity));
 const currentCode=ptnk?(groups(exam).find(g=>g.id===state.group)||groups(exam)[0]):null;
 const label=full?(ptnk?currentCode.name:"Toàn bộ đề"):parts.length+" phần đã chọn";
 const content=parts.map((part,i)=>printOnePart(part,i+1)).join("");
 const items=parts.reduce((sum,part)=>sum+part.end-part.start+1,0);
 return global.HSGPrintEngine.renderPaper({
  title:exam.title,subtitle:exam.subtitle,year:exam.year,
  label,countLabel:parts.length+" Part · "+items+" câu",
  content
 });
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
 if(["ptnk","dh-vinh","tay-ninh"].includes(state.exam.id)){
  const warning=document.createElement("p");
  warning.className="hsg-print-ocr-warning";
  warning.textContent="Lưu ý: Một số trang của đề gốc được nhận dạng từ bản scan. Vui lòng kiểm tra bản xem trước khi phát cho học sinh.";
  dialog.querySelector(".hsg-print-dialog-body")?.appendChild(warning);
 }
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
 removeReadingPortal();
 const root=$("pageMount");root.style.display="block";
 root.innerHTML='<div class="hsg-root"><div class="breadcrumbs"><button class="crumb-btn" type="button" onclick="location.hash=\''+BASE+'\'">HSG tỉnh</button><span>›</span><span>'+esc(e.title)+'</span></div><div class="hsg-loading">Đang mở bộ đề '+esc(e.title)+'…</div></div>';
 try{
  const data=await getExamData(e.id);if(location.hash.slice(1)!==route)return;
  state.exam=e;state.data=data;
  const draft=readDraft(e);
  state.answers=draft.answers||{};state.review=draft.review||{};
  state.answerReviewUnlocked=e.id==="hai-phong"&&draft.answerReviewUnlocked===true;
  state.resultVisible=e.id==="hai-phong"&&draft.resultVisible===true;
   if(e.id==="hai-phong"){
    for(let n=61;n<=65;n++){
     const oldKey="oc:"+n,newKey="wp:"+n;
     if(state.answers[oldKey]&&!state.answers[newKey])state.answers[newKey]={...state.answers[oldKey],type:"word"};
     if(state.review[oldKey]&&!state.review[newKey])state.review[newKey]=true;
    }
    if(draft.group==="oc"&&draft.question>=61&&draft.question<=65)draft.group="wp";
   }
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
