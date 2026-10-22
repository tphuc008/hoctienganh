/* Hải Phòng · Exam Results V1
 * Results are a reference-based formative review, not an official score.
 * MCQs are compared only when four source options and a matching editorial
 * key are available. Written/open items are not automatically marked wrong.
 * No print, authorisation or answer-reveal logic is owned by this module.
 */
(function(global){
"use strict";
const e=s=>String(s??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
const STATUS=Object.freeze({
 correct:{label:"Đúng",icon:"✓"},
 wrong:{label:"Sai",icon:"×"},
 pending:{label:"Chờ chấm",icon:"◷"},
 unanswered:{label:"Bỏ trống",icon:"–"}
});
const stat=()=>({correct:0,wrong:0,pending:0,unanswered:0,total:0,answered:0,graded:0});
function meaningful(r){
 if(!r)return false;
 // Even a partial correction is an attempted answer, not an empty response.
 if(r.type==="error")return !!(String(r.line||"").trim()||String(r.error||"").trim()||String(r.correction||"").trim());
 return !!(String(r.value||"").trim()||String(r.error||"").trim()||String(r.correction||"").trim());
}
function evaluate(question,response,reference,sourceVerified){
 if(!meaningful(response))return {status:"unanswered",reference:""};
 if(question?.type!=="mcq"||!Array.isArray(question.options)||question.options.length!==4||
    !sourceVerified||!reference)return {status:"pending",reference:""};
 const match=/^([A-D])\.\s/.exec(String(reference.answer||""));
 if(!match||reference.options?.length!==4)return {status:"pending",reference:""};
 const correct=match[1];
 if(reference.options.some((option,i)=>
    String(option?.word||"").trim()!==String(question.options[i]||"").trim()))
   return {status:"pending",reference:""};
 const picked=String(response.value||"").trim();
 if(!/^[A-D]$/.test(picked))return {status:"pending",reference:""};
 return {status:picked===correct?"correct":"wrong",reference:correct};
}
function accumulate(target,entry){
 target[entry.status]++;target.total++;
 if(entry.status!=="unanswered")target.answered++;
 if(entry.status==="correct"||entry.status==="wrong")target.graded++;
}
function build(sections,answers,resolve){
 const all=[],parts=[],totals=stat();
 for(const g of sections){
  const metrics=stat(),items=[];
  for(let n=g.start;n<=g.end;n++){
   const q=resolve(g,n),answer=answers[g.id+":"+n]||{};
   const outcome=evaluate(q.question,answer,q.reference,q.verified);
   const entry={key:g.id+":"+n,group:g.id,number:n,part:g.name,
    stem:String(q.question?.stem||""),chosen:answer.type==="error"?
     [answer.line,answer.error,"→",answer.correction].filter(Boolean).join(" "):
     String(answer.value||""),...outcome};
   accumulate(metrics,entry);accumulate(totals,entry);
   items.push(entry);all.push(entry);
  }
  parts.push({id:g.id,name:g.name,start:g.start,end:g.end,metrics,items});
 }
 return {all,parts,totals};
}
function fraction(n,total){return total?Math.round(n/total*1000)/10:0}
function metricCards(s){
 return [["correct","Đúng"],["wrong","Sai"],["pending","Chờ chấm"],["unanswered","Bỏ trống"]].map(([id,label])=>
  '<div class="hsg-rs-stat hsg-rs-stat-'+id+'"><span class="hsg-rs-stat-title"><span class="hsg-rs-stat-symbol">'+
  STATUS[id].icon+'</span>'+label+'</span><strong>'+s[id]+'</strong></div>').join("");
}
function progressBar(s){
 const total=s.total||1;
 return '<div class="hsg-rs-bars" role="img" aria-label="'+e(s.correct+' đúng, '+s.wrong+' sai, '+s.pending+' chờ chấm, '+s.unanswered+' bỏ trống')+'">'+
  ["correct","wrong","pending","unanswered"].map(k=>
   '<span class="hsg-rs-bar-'+k+'" style="width:'+fraction(s[k],total)+'%"></span>').join("")+'</div>';
}
function partRow(p){
 const s=p.metrics;
 return '<section class="hsg-rs-part"><div class="hsg-rs-part-top"><div><h3>'+e(p.name)+'</h3><span>Câu '+p.start+'–'+p.end+(p.id==="essay"?" · Bài viết":"")+'</span></div>'+
  '<span class="hsg-rs-part-stats">'+s.correct+' đúng · '+s.wrong+' sai · '+s.pending+' chờ chấm</span></div>'+
  progressBar(s)+'</section>';
}
function answerCard(q){
 const st=STATUS[q.status];
 const title=q.group==="essay"?"Paragraph Writing":"Câu "+q.number;
 const short=q.stem.replace(/\s+/g," ").slice(0,110);
 return '<button type="button" class="hsg-rs-question" data-hsg-result-jump="'+e(q.key)+'" aria-label="Xem lại '+e(title)+', '+st.label+'">'+
  '<span class="hsg-rs-question-num">'+e(q.group==="essay"?"W":q.number)+'</span>'+
  '<span class="hsg-rs-question-details"><strong>'+e(title)+'</strong><small>'+e(q.part)+'</small>'+
  (short?'<span class="hsg-rs-question-stem">'+e(short)+(q.stem.length>110?"…":"")+'</span>':"")+'</span>'+
  '<span class="hsg-rs-question-status hsg-rs-'+q.status+'">'+st.icon+' '+st.label+'</span>'+
  '<span class="hsg-rs-question-arrow" aria-hidden="true">›</span></button>';
}
function render(root,report,handlers){
 if(!root)throw Error("Missing Hai Phong result mount");
 const t=report.totals,denominator=t.graded;
 root.style.display="block";
 root.innerHTML='<div class="hsg-root hsg-hp-v2 hsg-hp-results">'+
  '<div class="breadcrumbs"><button type="button" class="crumb-btn" data-hsg-results-library>HSG tỉnh</button><span>›</span><span>Hải Phòng</span><span>›</span><span>Kết quả</span></div>'+
  '<header class="hsg-rs-header"><div class="hsg-rs-eyebrow">ENGLISH PRACTICE HUB · EXAM RESULTS</div>'+
  '<h1>Kết quả bài làm</h1><p>HSG Hải Phòng · Đề Tiếng Anh chuyên 2026–2027</p>'+
  '<div class="hsg-rs-header-actions"><button type="button" class="hsg-rs-button hsg-rs-button-primary" data-hsg-results-review>'+
  'Xem lại toàn bộ bài làm ↗</button><button type="button" class="hsg-rs-button hsg-rs-button-light" data-hsg-results-resume>Tiếp tục làm bài</button></div></header>'+
  '<main class="hsg-rs-content"><section class="hsg-rs-overview" aria-label="Tổng kết bài làm">'+
  '<div class="hsg-rs-overview-top"><div><div class="hsg-rs-label">TỔNG QUAN</div><h2>'+t.answered+' <span>/ '+t.total+' mục đã làm</span></h2>'+
  '<p>Đối chiếu tạm thời với bộ đáp án tham khảo cho các câu ABCD đủ dữ liệu.</p></div>'+
  '<div class="hsg-rs-rate"><strong>'+(denominator?fraction(t.correct,denominator)+'%':"—")+'</strong>'+
  '<span>Tỷ lệ đúng trong '+denominator+' câu đã đối chiếu</span></div></div>'+
  '<div class="hsg-rs-stat-grid">'+metricCards(t)+'</div>'+progressBar(t)+
  '<p class="hsg-rs-disclaimer">Kết quả này nhằm hỗ trợ ôn tập, không phải điểm thi chính thức. Chỉ các câu trắc nghiệm có đủ phương án và đáp án tham khảo phù hợp mới được đánh dấu đúng/sai. Bài viết, trả lời mở và câu thiếu dữ liệu được giữ ở trạng thái chờ chấm.</p>'+
  '</section><section class="hsg-rs-section"><div class="hsg-rs-section-heading"><h2>Kết quả theo từng phần</h2><span>'+report.parts.length+' phần</span></div>'+
  '<div class="hsg-rs-part-card">'+report.parts.map(partRow).join("")+
  '<div class="hsg-rs-legend">'+Object.keys(STATUS).map(k=>'<span><i class="hsg-rs-legend-'+k+'"></i>'+STATUS[k].label+'</span>').join("")+'</div></div></section>'+
  '<section class="hsg-rs-section"><div class="hsg-rs-section-heading"><h2>Đi tới câu hỏi</h2><label class="hsg-rs-filter-label">Lọc trạng thái <select id="hsg-rs-filter">'+
  '<option value="all">Tất cả câu hỏi</option><option value="wrong">Câu sai</option><option value="correct">Câu đúng</option>'+
  '<option value="pending">Chờ chấm</option><option value="unanswered">Bỏ trống</option></select></label></div>'+
  '<div class="hsg-rs-questions" id="hsg-rs-questions"></div></section>'+
  '<div class="hsg-rs-footer"><button type="button" class="hsg-rs-button hsg-rs-button-primary" data-hsg-results-review>'+
  'Xem lại bài làm →</button><button type="button" class="hsg-rs-button hsg-rs-button-light" data-hsg-results-resume>Tiếp tục làm bài</button></div>'+
  '</main></div>';
 const list=root.querySelector("#hsg-rs-questions"),filter=root.querySelector("#hsg-rs-filter");
 const fill=()=>{
  const active=filter.value;
  const shown=report.all.filter(q=>active==="all"||q.status===active);
  list.innerHTML=shown.length?shown.map(answerCard).join(""):
   '<div class="hsg-rs-empty">Không có câu hỏi ở trạng thái này.</div>';
  list.querySelectorAll("[data-hsg-result-jump]").forEach(btn=>{
   btn.onclick=()=>handlers.reviewQuestion(btn.dataset.hsgResultJump);
  });
 };
 filter.onchange=fill;fill();
 root.querySelectorAll("[data-hsg-results-review]").forEach(b=>b.onclick=handlers.reviewAll);
 root.querySelectorAll("[data-hsg-results-resume]").forEach(b=>b.onclick=handlers.resume);
 const lib=root.querySelector("[data-hsg-results-library]");
 if(lib)lib.onclick=handlers.library;
}
global.HSGHaiPhongResults=Object.freeze({version:"1.0",evaluate,build,render,STATUS});
})(window);
