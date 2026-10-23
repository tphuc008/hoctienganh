/* Shared Exam Solution & Review Standard V1.
 * No fabricated answer key. Without verified references show attempted/blank
 * and the source question; do NOT classify as right or wrong.
 */
(function(global) {
"use strict";
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const meaningful=r=>!!r&&(r.type==="error"
 ?!!(String(r.line||"").trim()||String(r.error||"").trim()||String(r.correction||"").trim())
 :!!String(r.value||"").trim());
const makeAnswer=r=>{
 if(!r)return "";
 if(r.type==="error")return [r.line&&"Line "+r.line,r.error,r.correction&&"→ "+r.correction].filter(Boolean).join(" · ");
 return String(r.value||"");
};
function build(exam,sections,answers,getQuestion){
 const all=[],parts=[];let attempted=0,total=0;
 for(const part of sections){
  const items=[];let answered=0;
  for(let n=part.start;n<=part.end;n++){
   const response=answers[part.id+":"+n]||{};
   const isAnswered=meaningful(response);
   const q=getQuestion(part,n);
   const item={key:part.id+":"+n,group:part.id,number:n,part:part.name,
    stem:String(q?.stem||""),answer:makeAnswer(response),
    status:isAnswered?"answered":"unanswered",kind:part.kind};
   items.push(item);all.push(item);total++;
   if(isAnswered){answered++;attempted++}
  }
  parts.push({id:part.id,name:part.name,start:part.start,end:part.end,
   answered,total:items.length,items});
 }
 return {exam:{id:exam.id,title:exam.title,year:exam.year},parts,all,
  totals:{answered:attempted,unanswered:total-attempted,total},
  solutions:{status:"unverified",answerKey:null,explanations:null}};
}
function render(root,report,handlers){
 const total=report.totals.total,done=report.totals.answered;
 const pct=total?Math.round(done/total*100):0;
 root.style.display="block";
 root.innerHTML='<div class="hsg-root hsg-hp-v2 hsg-hp-results hsg-exam-review-results">'+
  '<div class="breadcrumbs"><button class="crumb-btn" type="button" data-exam-review-library>HSG tỉnh</button><span>›</span><span>'+esc(report.exam.title)+'</span><span>›</span><span>Ôn tập & lời giải</span></div>'+
  '<header class="hsg-rs-header"><div class="hsg-rs-eyebrow">EXAM WORKSPACE · ANSWER REVIEW</div>'+
  '<h1>Tổng kết bài làm</h1><p>'+esc(report.exam.title)+' · '+esc(report.exam.year)+'</p>'+
  '<div class="hsg-rs-header-actions">'+
  '<button type="button" class="hsg-rs-button hsg-rs-button-primary" data-exam-review-all>Xem lại các câu →</button>'+
  '<button type="button" class="hsg-rs-button hsg-rs-button-light" data-exam-review-resume>Tiếp tục làm bài</button></div></header>'+
  '<main class="hsg-rs-content"><section class="hsg-rs-overview">'+
  '<div class="hsg-rs-overview-top"><div><div class="hsg-rs-label">TIẾN ĐỘ LÀM BÀI</div>'+
  '<h2>'+done+' <span>/ '+total+' câu đã làm</span></h2>'+
  '<p>Đã làm '+done+' câu; còn '+(total-done)+' câu chưa trả lời.</p></div>'+
  '<div class="hsg-rs-rate"><strong>'+pct+'%</strong><span>Mức độ hoàn thành</span></div></div>'+
  '<div class="hsg-rs-bars"><span class="hsg-rs-bar-correct" style="width:'+pct+'%"></span>'+
  '<span class="hsg-rs-bar-unanswered" style="width:'+(100-pct)+'%"></span></div>'+
  '<p class="hsg-rs-disclaimer">Chưa có bộ đáp án và lời giải được xác minh cho đề này. Đây là thống kê tiến độ, KHÔNG phải điểm số hoặc chấm đúng/sai. Bài làm của bạn vẫn được lưu để đối chiếu khi có lời giải.</p></section>'+
  '<section class="hsg-rs-section"><div class="hsg-rs-section-heading"><h2>Tiến độ theo từng Part</h2>'+
  '<span>'+report.parts.length+' phần</span></div><div class="hsg-rs-part-card">'+
  report.parts.map(part=>'<div class="hsg-rs-part"><div class="hsg-rs-part-top"><div><h3>'+esc(part.name)+
  '</h3><span>Câu '+part.start+'–'+part.end+'</span></div>'+
  '<span class="hsg-rs-part-stats">'+part.answered+'/'+part.total+' đã làm</span></div>'+
  '<div class="hsg-rs-bars"><span class="hsg-rs-bar-correct" style="width:'+
  Math.round(100*part.answered/Math.max(part.total,1))+'%"></span></div></div>').join("")+'</div></section>'+
  '<section class="hsg-rs-section"><div class="hsg-rs-section-heading"><h2>Câu hỏi & câu trả lời đã lưu</h2>'+
  '<label class="hsg-rs-filter-label">Lọc trạng thái <select id="hsg-rs-filter">'+
  '<option value="all">Tất cả</option><option value="answered">Đã làm</option>'+
  '<option value="unanswered">Chưa làm</option></select></label></div>'+
  '<div class="hsg-rs-questions" id="hsg-rs-questions"></div></section>'+
  '<div class="hsg-rs-footer"><button type="button" class="hsg-rs-button hsg-rs-button-primary" data-exam-review-all>Xem lại bài làm →</button>'+
  '<button type="button" class="hsg-rs-button hsg-rs-button-light" data-exam-review-resume>Tiếp tục làm bài</button></div></main></div>';
 const list=root.querySelector("#hsg-rs-questions"),filter=root.querySelector("#hsg-rs-filter");
 const draw=()=>{
  const selected=filter.value,items=report.all.filter(q=>selected==="all"||q.status===selected);
  list.innerHTML=items.length?items.map(q=>
   '<button type="button" class="hsg-rs-question" data-exam-review-question="'+esc(q.key)+'">'+
   '<span class="hsg-rs-question-num">'+(q.kind==="essay"?"W":q.number)+'</span>'+
   '<span class="hsg-rs-question-details"><strong>'+(q.kind==="essay"?"Bài viết":"Câu "+q.number)+'</strong>'+
   '<small>'+esc(q.part)+'</small>'+
   (q.stem?'<span class="hsg-rs-question-stem">'+esc(q.stem.replace(/\s+/g," ").slice(0,150))+'</span>':"")+
   (q.answer?'<span class="hsg-rs-question-stem">Bài làm: '+esc(q.answer.slice(0,180))+'</span>':"")+
   '</span><span class="hsg-rs-question-status">'+(q.status==="answered"?"Đã làm":"Bỏ trống")+'</span>'+
   '<span class="hsg-rs-question-arrow" aria-hidden="true">›</span></button>').join(""):
   '<div class="hsg-rs-empty">Không có câu hỏi trong nhóm này.</div>';
  list.querySelectorAll("[data-exam-review-question]").forEach(b=>
   b.onclick=()=>handlers.reviewQuestion(b.dataset.examReviewQuestion));
 };
 filter.onchange=draw;draw();
 root.querySelectorAll("[data-exam-review-all]").forEach(b=>b.onclick=handlers.reviewAll);
 root.querySelectorAll("[data-exam-review-resume]").forEach(b=>b.onclick=handlers.resume);
 root.querySelector("[data-exam-review-library]").onclick=handlers.library;
}
global.HSGExamSolutions=Object.freeze({version:"1.0",build,render});
})(window);
