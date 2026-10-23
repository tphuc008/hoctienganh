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
function validate(doc,examId,sections){
 if(!doc||doc.version!==1||doc.examId!==examId||
   !["pending-verification","partially-verified","verified"].includes(doc.status)||!Array.isArray(doc.records)||
   !Array.isArray(doc.format))throw Error("Invalid solution structure for "+examId);
 const required=["correctAnswer","explanation","evidence","distractorAnalysis","transferablePattern"];
 if(required.some(key=>!doc.format.includes(key)))throw Error("Missing explanation structure");
 const used=new Set();
 for(const r of doc.records){
  const g=sections.find(p=>p.id===r.partId);
  if(!g||!Number.isInteger(r.number)||r.number<g.start||r.number>g.end)throw Error("Unknown solution question");
  const identity=r.partId+":"+r.number;
  if(used.has(identity))throw Error("Duplicate solution record");
  used.add(identity);
  if(r.verified!==true||typeof r.correctAnswer!=="string"||!r.correctAnswer.trim()||
     typeof r.explanation!=="string"||!r.explanation.trim()||
     !Array.isArray(r.evidence)||r.evidence.length===0||
     r.evidence.some(ref=>!ref||typeof ref.location!=="string"||!ref.location.trim()||
       typeof ref.quote!=="string"||!ref.quote.trim())||
     !Array.isArray(r.distractorAnalysis)||typeof r.transferablePattern!=="string")
   throw Error("Solution record lacks verified evidence: "+identity);
 }
 const total=sections.reduce((count,part)=>count+part.end-part.start+1,0);
 if(doc.status==="pending-verification"&&doc.records.length)throw Error("Pending solutions cannot contain published answers");
 if(doc.status==="partially-verified"&&(!doc.records.length||doc.records.length>=total))
  throw Error("Partially verified solution status does not match record coverage");
 if(doc.status==="verified"&&doc.records.length!==total)
  throw Error("Fully verified status requires complete source-backed answer coverage");
 return doc;
}
function findSolution(doc,id){return doc?.records?.find(p=>p.partId+":"+p.number===id)||null}
/* Transparent, conservative marking: objective responses can be compared;
 * an unmatched constructed response is REVIEW, never automatically "wrong".
 */
const normalize=v=>String(v??"").normalize("NFKC").toLowerCase()
 .replace(/[’‘]/g,"'").replace(/[.,;:!?“”"()\[\]{}]/g," ")
 .replace(/\s+/g," ").trim();
function acceptedChoices(reference){
 return [reference.correctAnswer,...(reference.acceptedAnswers||[])].flatMap(value=>
  String(value).split(/\s+\/\s+/).map(s=>s.trim()).filter(Boolean));
}
function assess(kind,response,reference){
 if(!meaningful(response))return "unanswered";
 if(!reference?.verified)return "review";
 if(kind==="essay"||kind==="rewrite"||kind==="error"){
  if(kind==="rewrite"&&acceptedChoices(reference).some(v=>normalize(v)===normalize(response.value)))return "correct";
  return "review";
 }
 const answer=normalize(response.value);
 if(!answer)return "review";
 const approved=acceptedChoices(reference).map(normalize);
 if(approved.includes(answer))return "correct";
 if((reference.reviewChoices||[]).some(v=>normalize(v)===answer))return "review";
 if(["mcq","match","ynng","tfng"].includes(kind))return "wrong";
 // Word formation/open cloze may allow additional legitimate inflections.
 return "review";
}
function build(exam,sections,answers,getQuestion,solutions){
 const all=[],parts=[];let attempted=0,total=0,correct=0,wrong=0,review=0;
 for(const part of sections){
  const items=[];let answered=0;
  for(let n=part.start;n<=part.end;n++){
   const response=answers[part.id+":"+n]||{};
   const isAnswered=meaningful(response);
   const q=getQuestion(part,n);
   const key=part.id+":"+n,reference=findSolution(solutions,key);
   const status=assess(part.kind,response,reference);
   const item={key,group:part.id,number:n,part:part.name,
    stem:String(q?.stem||""),answer:makeAnswer(response),
    status,kind:part.kind,reference};
   items.push(item);all.push(item);total++;
   if(isAnswered){answered++;attempted++}
   if(status==="correct")correct++;
   else if(status==="wrong")wrong++;
   else if(status==="review")review++;
  }
  parts.push({id:part.id,name:part.name,start:part.start,end:part.end,
   answered,total:items.length,items});
 }
 return {exam:{id:exam.id,title:exam.title,year:exam.year},parts,all,
  totals:{answered:attempted,unanswered:total-attempted,total,correct,wrong,review,compared:correct+wrong},
  solutions:{status:solutions?.status||"unverified",verifiedCount:solutions?.records?.length||0,essayGuidance:solutions?.essayGuidance||null}};
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
  '<div class="hsg-rs-overview-top"><div><div class="hsg-rs-label">KẾT QUẢ THAM KHẢO</div>'+
  '<h2>'+done+' <span>/ '+total+' câu đã làm</span></h2>'+
  '<p>'+report.totals.correct+' đúng · '+report.totals.wrong+' sai (đối chiếu khách quan) · '+
  report.totals.review+' cần kiểm tra · '+report.totals.unanswered+' bỏ trống</p></div>'+
  '<div class="hsg-rs-rate"><strong>'+pct+'%</strong><span>Mức độ hoàn thành</span></div></div>'+
  '<div class="hsg-rs-stat-grid">'+
  [['correct','Đúng'],['wrong','Sai'],['review','Cần kiểm tra'],['unanswered','Bỏ trống']].map(([type,label])=>
   '<div class="hsg-rs-stat hsg-rs-stat-'+type+'"><span class="hsg-rs-stat-title">'+esc(label)+
   '</span><strong>'+report.totals[type]+'</strong></div>').join('')+
   '</div>'+
  '<div class="hsg-rs-bars"><span class="hsg-rs-bar-correct" style="width:'+pct+'%"></span>'+
  '<span class="hsg-rs-bar-unanswered" style="width:'+(100-pct)+'%"></span></div>'+
  '<p class="hsg-rs-disclaimer">'+
   (report.solutions.verifiedCount
    ?'Bài được đối chiếu bằng đáp án tham khảo, KHÔNG phải kết quả chấm chính thức. Chỉ trắc nghiệm/ghép đáp án khách quan được tự xác định đúng-sai. Đáp án mở, viết lại câu, sửa lỗi và bài viết có thể có biến thể hợp lệ nên cần đối chiếu lời giải hoặc giáo viên.'
    :'Chưa có bộ đáp án và lời giải được xác minh cho đề này. Đây là thống kê tiến độ, KHÔNG phải điểm số hoặc chấm đúng/sai. Bài làm của bạn vẫn được lưu để đối chiếu khi có lời giải.')+
   '</p></section>'+
  '<section class="hsg-rs-section"><div class="hsg-rs-section-heading"><h2>Tiến độ theo từng Part</h2>'+
  '<span>'+report.parts.length+' phần</span></div><div class="hsg-rs-part-card">'+
  report.parts.map(part=>'<div class="hsg-rs-part"><div class="hsg-rs-part-top"><div><h3>'+esc(part.name)+
  '</h3><span>Câu '+part.start+'–'+part.end+'</span></div>'+
  '<span class="hsg-rs-part-stats">'+part.answered+'/'+part.total+' đã làm</span></div>'+
  '<div class="hsg-rs-bars"><span class="hsg-rs-bar-correct" style="width:'+
  Math.round(100*part.answered/Math.max(part.total,1))+'%"></span></div></div>').join("")+'</div></section>'+
  '<section class="hsg-rs-section"><div class="hsg-rs-section-heading"><h2>Câu hỏi & câu trả lời đã lưu</h2>'+
  '<label class="hsg-rs-filter-label">Lọc trạng thái <select id="hsg-rs-filter">'+
  '<option value="all">Tất cả</option><option value="correct">Đúng</option>'+
  '<option value="wrong">Sai</option><option value="review">Cần kiểm tra</option>'+
  '<option value="unanswered">Bỏ trống</option></select></label></div>'+
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
   (q.reference?'<span class="hsg-rs-question-stem">Đáp án tham khảo: '+esc(q.reference.correctAnswer)+'</span>'+
    '<span class="hsg-rs-question-stem">Giải thích: '+esc(q.reference.explanation.slice(0,250))+'</span>':
    q.kind==="essay"&&report.solutions.essayGuidance?
    '<span class="hsg-rs-question-stem">Bài mẫu tham khảo (AI soạn, không chấm điểm): '+
       esc(report.solutions.essayGuidance.sample.slice(0,220))+'…</span>':
    '<span class="hsg-rs-question-stem">Đáp án/lời giải đang chờ xác minh</span>')+
   '</span><span class="hsg-rs-question-status">'+({correct:"✓ Đúng",wrong:"× Sai",review:"Cần đối chiếu",unanswered:"Bỏ trống"}[q.status]||"Đã làm")+'</span>'+
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
global.HSGExamSolutions=Object.freeze({version:"2.0",validate,findSolution,assess,build,render});
})(window);
