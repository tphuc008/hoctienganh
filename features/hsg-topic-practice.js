/* HSG tỉnh · luyện tập theo từng dạng. Empty set data lives in practice-bank.js. */
(function(global){
"use strict";
const BASE="teacher/hsg-tinh/practice";
// Catalogue reset; previously imported question banks are retained for future reuse.
const GROUPS=[{id:"vocabulary",title:"Vocabulary & Idioms"}];
const TOPICS=[{id:"mcq-vocabulary",group:"vocabulary",title:"Vocabulary MCQs",description:"50 MCQs · Lời giải đầy đủ, ví dụ và mini practice"}];
const BANK=global.HSGTopicPracticeBank||{};
const esc=value=>String(value==null?"":value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
const root=()=>document.getElementById("pageMount");
const routeFor=(topic,set)=>BASE+(topic?"/"+topic.id:"")+(set?"/"+set.id:"");
const blankSets=()=>Array.from({length:3},(_,i)=>({id:"set-"+String(i+1).padStart(2,"0"),title:"Set "+String(i+1).padStart(2,"0"),questions:[]}));
function setsFor(topic){
 const supplied=BANK[topic.id];
 const values=Array.isArray(supplied)&&supplied.length?supplied:blankSets();
 return values.map((item,i)=>{
  const n=String(i+1).padStart(2,"0");
  return {id:item.id||"set-"+n,title:item.title||"Set "+n,passage:item.passage||"",
   questions:Array.isArray(item.questions)?item.questions.filter(q=>q&&typeof q.stem==="string"&&q.stem.trim()):[]};
 });
}
function fingerprint(set){
 return global.LearningCore?.fingerprint?.(set.questions)||JSON.stringify(set.questions);
}
function draft(topic,set){
 const raw=global.LearningCore?.readDraft?.("hsg-topic-practice",topic.id+"/"+set.id)||{};
 return raw.fingerprint===fingerprint(set)?raw:{answers:{},index:0,submitted:false,fingerprint:fingerprint(set)};
}
function persist(topic,set,record){
 global.LearningCore?.writeDraft?.("hsg-topic-practice",topic.id+"/"+set.id,{...record,fingerprint:fingerprint(set)});
}
function completeCount(answers){return Object.values(answers||{}).filter(x=>String(x??"").trim()).length}
function crumbs(segments){
 return '<nav class="hsg-p-crumbs" aria-label="Đường dẫn">'+
  '<button type="button" data-hsgp-route="teacher/hsg-tinh">HSG tỉnh</button><span>›</span>'+
  segments.map((s,i)=>s.route?
    '<button type="button" data-hsgp-route="'+esc(s.route)+'">'+esc(s.title)+'</button><span>›</span>':
    '<span aria-current="page">'+esc(s.title)+'</span>').join("")+'</nav>';
}
function mount(html){
 const el=root();if(!el)return;
 el.style.display="block";
 el.innerHTML='<div class="hsg-root hsg-p-root">'+html+'</div>';
 el.querySelectorAll("[data-hsgp-route]").forEach(button=>button.addEventListener("click",()=>{global.location.hash=button.dataset.hsgpRoute}));
 global.scrollTo?.({top:0,behavior:"auto"});
}
function intro(title,description,kicker="PRACTICE BY TYPE"){
 return '<header class="hsg-p-intro"><div class="hsg-p-kicker">'+esc(kicker)+'</div>'+
  '<h1>'+esc(title)+'</h1><p>'+esc(description)+'</p></header>';
}
function catalogue(){
 if(!TOPICS.length){
  mount(crumbs([{title:"Luyện tập theo dạng"}])+
   intro("Luyện tập theo dạng","Chưa có dạng bài nào.")+
   '<div class="empty"><b>Chưa có dạng bài</b></div>');
  return;
 }
 const sections=GROUPS.map(group=>{
  const topics=TOPICS.filter(t=>t.group===group.id);
  return '<section class="hsg-p-group"><div class="hsg-p-group-head"><h2>'+esc(group.title)+'</h2>'+
   '<small>'+topics.length+' dạng bài</small></div><div class="hsg-p-grid">'+
   topics.map((topic,i)=>{
    const sets=setsFor(topic),ready=sets.filter(s=>s.questions.length).length;
    return '<button class="hsg-p-card" type="button" data-hsgp-route="'+esc(routeFor(topic))+'">'+
     '<div class="hsg-p-card-top"><span class="hsg-p-number">'+String(i+1).padStart(2,"0")+'</span><span class="hsg-p-arrow" aria-hidden="true">↗</span></div>'+
     '<h3>'+esc(topic.title)+'</h3><p>'+esc(topic.description)+'</p>'+
     '<div class="hsg-p-card-foot"><span>'+sets.length+' set</span><span class="hsg-p-status'+(ready?' ready':'')+'">'+
     (ready?ready+' set có nội dung':'Chờ nội dung')+'</span></div></button>';
   }).join("")+'</div></section>';
 }).join("");
 mount(crumbs([{title:"Luyện tập theo dạng"}])+
  intro("Luyện tập theo dạng","Chọn một dạng bài để luyện theo từng set.")+sections);
}

/* Display the Google Docs author's grammar analyses verbatim, without generating answers. */
function transformationTarget(q){return String(q.target||"").includes("[Viết lại với từ khóa ở đề]")?"→ …":String(q.target||"")}
function transformationExplanation(q){
 const a=q.analysis||{};
 const detail=(title,value)=>value?'<section class="hsg-st-step"><h4>'+esc(title)+'</h4><p>'+esc(value)+'</p></section>':"";
 const note=(title,value)=>value?'<div class="hsg-st-note"><strong>'+esc(title)+'</strong><p>'+esc(value)+'</p></div>':"";
 return '<section class="hsg-st-explanation" aria-label="Đáp án và phân tích ngữ pháp">'+
  '<div class="hsg-st-answer"><strong>6. Final Answer · Đáp án tham khảo</strong><p>'+esc(q.answer||"")+'</p></div>'+
  '<div class="hsg-st-pattern"><strong>2. General Grammar Pattern · Công thức tổng quát</strong><p>'+esc(a.pattern||"")+'</p></div>'+
  '<details class="hsg-st-details"><summary>Phân tích ngữ pháp chi tiết <span aria-hidden="true">⌄</span></summary>'+
  detail("1. Identify the Structure · Xác định cấu trúc",a.structure)+
  detail("3. Grammatical Breakdown · Phân tích thành phần",a.breakdown)+
  detail("4. Transformation Mechanism · Cơ chế biến đổi",a.transformation)+
  detail("5. Common Pitfalls · Lỗi dễ mắc",a.pitfalls)+
  note("Lưu ý đáp án gốc (Google Docs)",q.sourceNote)+
  note("Ghi chú phụ lục (Google Docs)",q.appendixNote)+
  '</details></section>';
}

function topicPage(topic){
 const sets=setsFor(topic);
 if(topic.id==="sentence-transformation"){
  const rows=sets.map((set,i)=>{
   const progress=draft(topic,set),total=set.questions.length,answered=Math.min(total,completeCount(progress.answers));
   const status=progress.submitted?"Đã hoàn thành":answered?answered+"/"+total+" câu":"Bắt đầu";
   return '<li class="hsg-st-set-item"><button type="button" data-hsgp-route="'+esc(routeFor(topic,set))+'">'+
     '<span class="hsg-st-set-index">'+String(i+1).padStart(2,"0")+'</span>'+
     '<span class="hsg-st-set-info"><strong>'+esc(set.title)+'</strong><small>'+total+' câu · PDF trang '+set.questions[0].sourcePage+'</small></span>'+
     '<span class="hsg-st-set-status">'+esc(status)+'</span><span aria-hidden="true" class="hsg-st-set-arrow">›</span></button></li>';
  }).join("");
  mount(crumbs([{title:"Luyện tập theo dạng",route:BASE},{title:topic.title}])+
   '<header class="hsg-st-heading"><h1>'+esc(topic.title)+'</h1><p>'+sets.length+' set · 131 câu · Đáp án và phân tích từ Google Docs</p></header>'+
   '<ul class="hsg-st-set-list">'+rows+'</ul>');
  return;
 }
 const cards=sets.map((set,i)=>{
  const total=set.questions.length,progress=draft(topic,set);
  const answered=Math.min(total,completeCount(progress.answers));
  const done=total>0&&progress.submitted;
  const pct=total?Math.round(answered/total*100):0;
  return '<button class="hsg-p-card hsg-p-set-card" type="button" data-hsgp-route="'+esc(routeFor(topic,set))+'">'+
   '<div class="hsg-p-card-top"><span class="hsg-p-number">'+String(i+1).padStart(2,"0")+'</span><span class="hsg-p-arrow" aria-hidden="true">↗</span></div>'+
   '<h3>'+esc(set.title)+'</h3><p>'+(total?total+' câu hỏi':'Dự kiến 10 câu / set')+'</p>'+
   '<div class="hsg-p-card-foot"><span>'+ (total?answered+'/'+total+' câu đã làm':'Chưa có câu hỏi')+'</span>'+
   '<span class="hsg-p-status'+(done?' done':total?' ready':'')+'">'+(done?'Đã nộp':total?'Bắt đầu':'Chờ nội dung')+'</span></div>'+
   '<div class="hsg-p-set-bar"><i style="width:'+pct+'%"></i></div></button>';
 }).join("");
 mount(crumbs([{title:"Luyện tập theo dạng",route:BASE},{title:topic.title}])+
  intro(topic.title,topic.description+(topic.id==="mcq-vocabulary"?" · Bản thử 3 câu":" · Mỗi set khoảng 10 câu"),"QUESTION SETS")+
  '<section class="hsg-p-group"><div class="hsg-p-group-head"><h2>Danh sách Set</h2><small>'+sets.length+' set</small></div>'+
  '<div class="hsg-p-grid">'+cards+'</div></section>');
}
function normalize(v){return String(v??"").trim().replace(/\s+/g," ").toLocaleLowerCase()}
function correct(q,value){
 if(q.answer===undefined||q.answer===null)return false;
 const accepted=Array.isArray(q.answer)?q.answer:[q.answer];
 const options=Array.isArray(q.options)?q.options:[];
 return accepted.some(expected=>{
  const text=String(expected);
  const index=options.findIndex(x=>normalize(x)===normalize(text));
  const asLetter=index>=0?String.fromCharCode(65+index):text;
  return normalize(value)===normalize(asLetter);
 });
}
function answerLabel(q,value){
 if(!value)return "Chưa trả lời";
 const opts=Array.isArray(q.options)?q.options:[];
 const idx=/^[A-Z]$/.test(String(value))?String(value).charCodeAt(0)-65:-1;
 return idx>=0&&idx<opts.length?String(value)+". "+opts[idx]:String(value);
}
function correctLabel(q){
 if(q.answer===undefined||q.answer===null)return "Chưa có đáp án";
 return (Array.isArray(q.answer)?q.answer:[q.answer]).map(x=>answerLabel(q,String(x))).join(" / ");
}
function resultPage(topic,set,record){
 const qs=set.questions;
 if(topic.id==="sentence-transformation"){
  const answered=completeCount(record.answers);
  return '<div class="hsg-p-result hsg-st-finish"><h2>Hoàn thành · '+esc(set.title)+'</h2>'+
   '<p>Đã viết '+answered+'/'+qs.length+' câu. Không tự chấm câu viết bằng so khớp ký tự; hãy đối chiếu đáp án tham khảo.</p></div>'+
   '<div class="hsg-st-results">'+qs.map((q,i)=>{
    const userAnswer=String(record.answers?.[i]||"");
    return '<details class="hsg-st-result-item"><summary><span>Câu '+String(q.sourceNumber||i+1).padStart(2,"0")+'</span>'+
      '<span class="hsg-st-result-preview">'+esc(q.stem)+'</span><span aria-hidden="true">⌄</span></summary>'+
      '<div class="hsg-st-result-body"><p class="hsg-st-original">'+esc(q.stem)+'</p>'+
      '<p class="hsg-st-target">'+esc(transformationTarget(q))+'</p>'+
      '<div class="hsg-st-user-answer"><strong>Bài làm của bạn</strong><p>'+esc(userAnswer||"Chưa trả lời")+'</p></div>'+
      transformationExplanation(q)+'</div></details>';
   }).join("")+'</div>';
 }

 const keyed=qs.filter(q=>q.answer!==undefined&&q.answer!==null);
 const score=qs.reduce((sum,q,i)=>sum+(correct(q,record.answers?.[i])?1:0),0);
 const summary=keyed.length===qs.length?score+"/"+qs.length+" câu đúng":
  "Đã nộp bài · Chưa đủ đáp án để chấm";
 return '<div class="hsg-p-result"><h2>Kết quả · '+esc(set.title)+'</h2><p>'+esc(summary)+'</p></div>'+
  qs.map((q,i)=>{
   const a=record.answers?.[i]||"";
   return '<article class="hsg-p-review"><h3>Câu '+(i+1)+'</h3>'+
    '<p>'+esc(q.stem)+'</p><p>Đã trả lời: '+esc(answerLabel(q,a))+'</p>'+
    '<p class="hsg-p-review-answer">Đáp án: '+esc(correctLabel(q))+'</p>'+
    (q.explanation?'<p class="hsg-p-review-explain">'+esc(q.explanation)+'</p>':"")+'</article>';
  }).join("");
}

/* Format 1 — Full Explanation. All four sections stay in a continuous reading flow. */
function fullExplanationPage(topic,set){
 const current=draft(topic,set),qs=set.questions,total=qs.length;
 current.answers=current.answers||{};current.revealed=current.revealed||{};
 current.miniAnswers=current.miniAnswers||{};current.miniChecked=current.miniChecked||{};
 let index=Math.max(0,Math.min(total-1,Number(current.index)||0));
 const letter=i=>String.fromCharCode(65+i);
 const searchLink=(term,vi=false)=>"https://www.google.com/search?q="+encodeURIComponent(vi?"nguồn gốc thành ngữ "+term:term+" idiom origin")+"&hl="+(vi?"vi":"en");
 const anchor=(url,label)=>'<a href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+esc(label)+'</a>';
 const line=t=>{const i=t.indexOf(":");return i>=0&&i<35?'<p><strong>'+esc(t.slice(0,i+1))+'</strong> '+esc(t.slice(i+1).trim())+'</p>':'<p>'+esc(t)+'</p>'};
 function choiceGrid(q,chosen,revealed,mini=null){
  return '<div class="hsg-p-options hsg-full-options">'+q.options.map((option,i)=>{
   const l=letter(i),active=chosen===l,good=revealed&&q.answer===l,bad=revealed&&active&&!good;
   const data=mini===null?'data-full-choice="'+l+'"':'data-full-mini-choice="'+mini+'" data-letter="'+l+'"';
   return '<button type="button" '+data+' aria-pressed="'+active+'" class="hsg-p-option'+(active?' selected':'')+(good?' full-correct':'')+(bad?' full-incorrect':'')+'"'+(revealed?' disabled':'')+'><b>'+l+'</b><span>'+esc(option)+'</span>'+(good?'<small>Đúng ✓</small>':bad?'<small>Sai ✕</small>':'')+'</button>';
  }).join("")+'</div>';
 }
 function fullBody(q){
  const a=q.fullExplanation;
  const chosen=current.answers[index]||"";
  return '<section class="hsg-full-explanation" aria-label="Lời giải đầy đủ">'+
   '<div class="hsg-full-feedback '+(correct(q,chosen)?'good':'bad')+'" role="status"><strong>'+(correct(q,chosen)?"Chính xác!":"Chưa chính xác.")+'</strong><span>Đáp án đúng: '+esc(correctLabel(q))+'</span></div>'+
   '<section class="hsg-full-section"><h2>1. Dịch câu</h2><p>'+esc(a.translation)+'</p></section>'+
   '<section class="hsg-full-section"><h2>2. Phân tích các cụm hay</h2><dl class="hsg-full-expressions">'+a.expressions.map(e=>
    '<div><dt>'+(e.origin?anchor(searchLink(e.term),e.term):esc(e.term))+(e.origin?' <span class="hsg-full-links">'+anchor(searchLink(e.term),"EN")+' | '+anchor(searchLink(e.term,true),"VI")+'</span>':'')+'</dt><dd>'+esc(e.meaning)+'</dd></div>').join("")+'</dl></section>'+
   '<section class="hsg-full-section"><h2>3. Phân tích A–D</h2>'+a.analysis.map((item,i)=>
    '<article class="hsg-full-word'+(letter(i)===q.answer?' is-correct':'')+'"><h3>'+letter(i)+'. '+esc(item.label)+(letter(i)===q.answer?' <small>Đáp án đúng ✓</small>':'')+'</h3>'+item.lines.map(line).join("")+'</article>').join("")+'</section>'+
   '<section class="hsg-full-section"><h2>4. Mini practice</h2>'+a.minis.map((m,j)=>{
    const key=index+":"+j,selected=current.miniAnswers[key]||"",done=!!current.miniChecked[key];
    return '<article class="hsg-full-mini"><h3>Mini '+(index+1)+'.'+(j+1)+'</h3><p class="hsg-full-mini-stem">'+esc(m.stem)+'</p>'+
     choiceGrid(m,selected,done,j)+
     (!done?'<button type="button" class="hsg-p-action primary hsg-full-check" data-full-mini-check="'+j+'"'+(!selected?' disabled':'')+'>Kiểm tra đáp án</button>':
      '<div class="hsg-full-mini-solution" role="status"><h4>Lời giải mini '+(index+1)+'.'+(j+1)+' · '+esc(correctLabel(m))+'</h4><p><strong>'+(correct(m,selected)?'Chính xác!':'Chưa chính xác.')+'</strong></p>'+m.solution.map(line).join("")+'</div>')+
     '</article>';
   }).join("")+'</section></section>';
 }
 function save(){current.index=index;persist(topic,set,current)}
 function render(keepScroll=false){
  const y=keepScroll?global.scrollY:0;
  const q=qs[index],checked=!!current.revealed[index],chosen=current.answers[index]||"";
  const done=qs.filter((_,i)=>current.revealed[i]).length;
  const score=qs.reduce((n,x,i)=>n+(current.revealed[i]&&correct(x,current.answers[i])?1:0),0);
  const miniTotal=qs.reduce((n,x)=>n+x.fullExplanation.minis.length,0);
  const miniDone=qs.reduce((n,x,i)=>n+x.fullExplanation.minis.filter((_,j)=>current.miniChecked[i+":"+j]).length,0);
  const header=crumbs([{title:"Luyện tập theo dạng",route:BASE},{title:topic.title,route:routeFor(topic)},{title:set.title}]);
  const summary=current.submitted?'<div class="hsg-p-result"><h2>Hoàn thành bài thử</h2><p>'+score+'/'+total+' câu chính đúng · '+miniDone+'/'+miniTotal+' mini practice đã kiểm tra. Chọn câu bên dưới để xem lại lời giải.</p></div>':'';
  const body=summary+'<div class="hsg-p-q-meta"><span>CÂU '+(index+1)+' / '+total+'</span><span>Format 1 · Full Explanation</span></div>'+
   '<div class="hsg-p-stem">'+esc(q.stem)+'</div>'+choiceGrid(q,chosen,checked)+
   (!checked?'<button type="button" class="hsg-p-action primary hsg-full-check" data-full-check'+(!chosen?' disabled':'')+'>Kiểm tra đáp án & xem lời giải</button>':fullBody(q))+
   '<div class="hsg-p-actions"><button type="button" class="hsg-p-action" data-full-prev'+(!index?' disabled':'')+'>← Câu trước</button>'+
   (index<total-1?'<button type="button" class="hsg-p-action primary" data-full-next>Câu tiếp →</button>':
    (!current.submitted?'<button type="button" class="hsg-p-action primary" data-full-submit'+(done!==total?' disabled':'')+'>Hoàn thành Set →</button>':'<button type="button" class="hsg-p-action" data-full-reset>Làm lại Set</button>'))+'</div>'+
   (index===total-1&&!current.submitted&&done!==total?'<p class="hsg-full-hint">Kiểm tra cả '+total+' câu chính để hoàn thành Set. Mini practice không bắt buộc.</p>':'');
  const side='<aside class="hsg-p-side"><h2>Điều hướng câu hỏi</h2><p>'+done+'/'+total+' câu đã kiểm tra</p><div class="hsg-p-dot-grid">'+qs.map((x,i)=>
   '<button type="button" data-full-go="'+i+'" class="hsg-p-dot'+(i===index?' is-active':'')+(current.revealed[i]?' is-done':'')+'" aria-label="Câu '+(i+1)+'">'+(i+1)+'</button>').join("")+
   '</div><div class="hsg-p-progress"><i style="width:'+Math.round(done/total*100)+'%"></i></div><p class="hsg-full-mini-progress">Mini practice: '+miniDone+'/'+miniTotal+'</p>'+
   (current.submitted?'<button type="button" class="hsg-p-action" data-full-reset>Làm lại Set</button>':'')+'</aside>';
  mount(header+intro(set.title,total+' câu chính · '+miniTotal+' mini practice · Lời giải chi tiết theo chiều dọc',"FULL EXPLANATION")+
   '<div class="hsg-p-exercise hsg-full-layout"><section class="hsg-p-main">'+body+'</section>'+side+'</div>');
  const el=root();const refresh=()=>{save();render(true)};const go=i=>{index=i;save();render()};
  el.querySelectorAll("[data-full-choice]").forEach(b=>b.addEventListener("click",()=>{if(checked)return;current.answers[index]=b.dataset.fullChoice;refresh()}));
  el.querySelector("[data-full-check]")?.addEventListener("click",()=>{if(!current.answers[index])return;current.revealed[index]=true;refresh()});
  el.querySelectorAll("[data-full-mini-choice]").forEach(b=>b.addEventListener("click",()=>{const k=index+":"+b.dataset.fullMiniChoice;if(current.miniChecked[k])return;current.miniAnswers[k]=b.dataset.letter;refresh()}));
  el.querySelectorAll("[data-full-mini-check]").forEach(b=>b.addEventListener("click",()=>{const k=index+":"+b.dataset.fullMiniCheck;if(!current.miniAnswers[k])return;current.miniChecked[k]=true;refresh()}));
  el.querySelectorAll("[data-full-go]").forEach(b=>b.addEventListener("click",()=>go(Number(b.dataset.fullGo))));
  el.querySelector("[data-full-prev]")?.addEventListener("click",()=>go(Math.max(0,index-1)));
  el.querySelector("[data-full-next]")?.addEventListener("click",()=>go(Math.min(total-1,index+1)));
  el.querySelector("[data-full-submit]")?.addEventListener("click",()=>{if(done!==total)return;current.submitted=true;save();render()});
  el.querySelectorAll("[data-full-reset]").forEach(b=>b.addEventListener("click",()=>{if(!global.confirm("Làm lại Set và xóa các lựa chọn hiện tại?"))return;current.answers={};current.revealed={};current.miniAnswers={};current.miniChecked={};current.submitted=false;go(0)}));
  if(keepScroll)global.scrollTo?.({top:y,behavior:"auto"});
 }
 render();
}

function setPage(topic,set){
 if(set.questions.length&&set.questions.every(q=>q.fullExplanation))return fullExplanationPage(topic,set);
 const current=draft(topic,set);
 const isSentenceTransformation=topic.id==="sentence-transformation";
 const qs=set.questions;
 let index=Math.max(0,Math.min(qs.length-1,Number(current.index)||0));
 const render=()=>{
  const answered=completeCount(current.answers);
  const total=qs.length;
  const header=crumbs([{title:"Luyện tập theo dạng",route:BASE},{title:topic.title,route:routeFor(topic)},{title:set.title}])+
   '<div class="hsg-p-backline"><span class="hsg-p-label">'+esc(topic.title)+' · '+esc(set.title)+'</span>'+
   '<button class="hsg-p-back" type="button" data-hsgp-route="'+esc(routeFor(topic))+'">← Tất cả Set</button></div>';
  if(!total){
   mount(header+intro(set.title,"Giao diện đã sẵn sàng; nội dung của set này chưa được nhập.","PRACTICE SET")+
    '<div class="hsg-p-exercise"><section class="hsg-p-main"><div class="hsg-p-empty">'+
    '<div class="hsg-p-empty-mark" aria-hidden="true">＋</div><h2>Chưa có câu hỏi</h2>'+
    '<p>Set này đang để trống. Sau khi thêm dữ liệu, câu hỏi và lời giải sẽ xuất hiện tại đây.</p>'+
    '<button class="hsg-p-action primary" type="button" data-hsgp-route="'+esc(routeFor(topic))+'">Trở về danh sách Set</button>'+
    '</div></section><aside class="hsg-p-side"><h2>Điều hướng câu hỏi</h2><p>10 vị trí dự kiến</p>'+
    '<div class="hsg-p-dot-grid">'+Array.from({length:10},(_,i)=>'<button type="button" class="hsg-p-dot" disabled aria-label="Câu '+(i+1)+' chưa có nội dung">'+(i+1)+'</button>').join("")+
    '</div><div class="hsg-p-progress"><i style="width:0%"></i></div></aside></div>');
   return;
  }
  const item=qs[index],answeredNow=current.answers?.[index]||"";
  const body=current.submitted?resultPage(topic,set,current):
   '<div class="hsg-p-q-meta"><span>CÂU '+(index+1)+' / '+total+'</span><span>'+answered+' câu đã làm</span></div>'+
   (item.passage||set.passage?'<div class="hsg-p-passage">'+esc(item.passage||set.passage)+'</div>':"")+
   '<div class="hsg-p-stem">'+esc(item.stem)+'</div>'+
   (isSentenceTransformation?'<div class="hsg-st-target"><span>VIẾT LẠI CÂU</span><strong>'+esc(transformationTarget(item))+'</strong></div>':"")+
   (Array.isArray(item.options)&&item.options.length?
     '<div class="hsg-p-options">'+item.options.map((choice,i)=>{
      const letter=String.fromCharCode(65+i);
      return '<button class="hsg-p-option'+(answeredNow===letter?' selected':'')+'" type="button" data-hsgp-choice="'+letter+'" aria-pressed="'+(answeredNow===letter)+'">'+
       '<b>'+letter+'</b><span>'+esc(choice)+'</span></button>';
     }).join("")+'</div>':
     (topic.id.includes("transformation")?
      '<textarea class="hsg-p-input" rows="4" data-hsgp-answer placeholder="Nhập câu trả lời…">'+esc(answeredNow)+'</textarea>':
      '<input class="hsg-p-input" type="text" data-hsgp-answer placeholder="Nhập đáp án…" value="'+esc(answeredNow)+'">'))+
   (isSentenceTransformation?
    '<div class="hsg-st-reveal-area"><button class="hsg-st-reveal" type="button" data-hsgp-reveal aria-expanded="'+!!current.revealed?.[index]+'">'+
    (current.revealed?.[index]?"Ẩn đáp án & giải thích":"Xem đáp án & giải thích")+'</button></div>'+
    (current.revealed?.[index]?transformationExplanation(item):""):"")+
   '<div class="hsg-p-actions"><button class="hsg-p-action" type="button" data-hsgp-prev'+(!index?' disabled':'')+'>← Câu trước</button>'+
   (index===total-1?
    '<button class="hsg-p-action primary" type="button" data-hsgp-submit>Nộp bài →</button>':
    '<button class="hsg-p-action primary" type="button" data-hsgp-next>Câu tiếp →</button>')+'</div>';
  const side='<aside class="hsg-p-side"><h2>Điều hướng câu hỏi</h2><p>'+answered+'/'+total+' câu đã làm</p>'+
   '<div class="hsg-p-dot-grid">'+qs.map((q,i)=>'<button type="button" data-hsgp-go="'+i+'" class="hsg-p-dot'+(i===index?' is-active':'')+(String(current.answers?.[i]||"").trim()?' is-done':'')+'">'+(i+1)+'</button>').join("")+
   '</div><div class="hsg-p-progress"><i style="width:'+Math.round(answered/total*100)+'%"></i></div>'+
   (current.submitted?'<button class="hsg-p-action" type="button" data-hsgp-reset style="margin-top:15px;width:100%">Làm lại Set</button>':"")+
   '</aside>';
  mount(header+intro(set.title,total+" câu · "+(current.submitted?"Đã nộp bài":"Bài làm được lưu tự động"),"PRACTICE SET")+
   '<div class="hsg-p-exercise"><section class="hsg-p-main">'+body+'</section>'+side+'</div>');
  const el=root();
  const update=()=>{current.index=index;persist(topic,set,current)};
  el.querySelectorAll("[data-hsgp-go]").forEach(b=>b.addEventListener("click",()=>{index=Number(b.dataset.hsgpGo);update();render()}));
  el.querySelectorAll("[data-hsgp-choice]").forEach(b=>b.addEventListener("click",()=>{current.answers[index]=b.dataset.hsgpChoice;update();render()}));
  const input=el.querySelector("[data-hsgp-answer]");
  if(input)input.addEventListener("input",()=>{current.answers[index]=input.value;update();
   const all=completeCount(current.answers);
   el.querySelector(".hsg-p-q-meta span:last-child").textContent=all+" câu đã làm";
   el.querySelector(".hsg-p-side p").textContent=all+"/"+total+" câu đã làm";
   el.querySelector(".hsg-p-progress i").style.width=Math.round(all/total*100)+"%";
   el.querySelector('[data-hsgp-go="'+index+'"]')?.classList.toggle("is-done",!!input.value.trim());
  });
  el.querySelector("[data-hsgp-reveal]")?.addEventListener("click",()=>{
   current.revealed=current.revealed||{};
   current.revealed[index]=!current.revealed[index];
   update();render();
  });
  el.querySelector("[data-hsgp-prev]")?.addEventListener("click",()=>{index=Math.max(0,index-1);update();render()});
  el.querySelector("[data-hsgp-next]")?.addEventListener("click",()=>{index=Math.min(total-1,index+1);update();render()});
  el.querySelector("[data-hsgp-submit]")?.addEventListener("click",()=>{
   const missing=total-completeCount(current.answers);
   if(missing&&!global.confirm("Bạn còn "+missing+" câu chưa trả lời. Vẫn nộp bài?"))return;
   current.submitted=true;update();render();
  });
  el.querySelector("[data-hsgp-reset]")?.addEventListener("click",()=>{
   current.answers={};current.revealed={};current.submitted=false;index=0;update();render();
  });
 };
 render();
}
function open(route){
 const match=String(route||"").replace(/^#/,"").match(/^teacher\/hsg-tinh\/practice(?:\/([a-z0-9-]+))?(?:\/(set-[0-9]+))?$/);
 if(!match){global.location.hash=BASE;return}
 if(!match[1]){catalogue();return}
 const topic=TOPICS.find(x=>x.id===match[1]);
 if(!topic){global.location.hash=BASE;return}
 if(!match[2]){topicPage(topic);return}
 const set=setsFor(topic).find(x=>x.id===match[2]);
 if(!set){global.location.hash=routeFor(topic);return}
 setPage(topic,set);
}
global.TeacherHSGTopics={open,topics:TOPICS};
})(window);
