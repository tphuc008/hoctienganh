/* Hải Phòng · Exam Results V2: automatic formative assessment with a limited transparent essay rubric, not official grading. */
(function(global){
"use strict";
const e=s=>String(s??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
const STATUS=Object.freeze({
 correct:{label:"Đúng",icon:"✓"},
 wrong:{label:"Sai",icon:"×"},
 unanswered:{label:"Bỏ trống",icon:"–"}
});
const stat=()=>({correct:0,wrong:0,unanswered:0,total:0,answered:0,graded:0});
function meaningful(r){
 if(!r)return false;
 // Even a partial correction is an attempted answer, not an empty response.
 if(r.type==="error")return !!(String(r.line||"").trim()||String(r.error||"").trim()||String(r.correction||"").trim());
 return !!(String(r.value||"").trim()||String(r.error||"").trim()||String(r.correction||"").trim());
}
/* Accepted alternatives are scoped to individual questions. */
const ACCEPTED=Object.freeze({
 "wf:58":["demoralised","demoralized"],
 "oc:67":["until","till"],"oc:70":["speak","talk"],
 "oc:74":["hardly","scarcely","barely"],
 "w:91":["though they have had arguments","though they have often argued","though they have argued often"],
 "w:92":["kept in the dark about","kept in the dark over"],
 "w:93":["has a down-to-earth","has a down to earth"],
 "w:94":["keep a straight face when"],
 "w:95":["i got cold feet","got cold feet"],
 "w:96":["time my brother has the better he works","time my brother has the better he performs"],
 "w:97":["my mind back to what had happened all those years before","my mind back to what happened all those years ago"],
 "w:98":["the blame for the plans failure on tom","the blame on tom for the plans failure"],
 "w:99":["the presidents personal diaries were published did the truth come out","the presidents diaries were published did the truth emerge"],
 "w:100":["the factory last week is said to have been caused by an electrical fault"]
});
function norm(value){
 return String(value??"").normalize("NFKC").toLowerCase()
  .replace(/['’‘]/g,"").replace(/[‐‑–—]/g,"-")
  .replace(/[.,;:!?"“”()[\]{}]/g," ").replace(/\s+/g," ").trim();
}
function correction(value){
 const m=String(value||"").match(/(?:dòng\s*\d+\s*:\s*)?(.+?)\s*(?:→|->|=>)\s*(.+)$/i);
 return m?{error:m[1].trim(),correction:m[2].trim()}:null;
}
function matches(provided,alternatives){
 const v=norm(provided);return !!v&&alternatives.some(a=>norm(a)===v);
}
function scoreEssay(raw){
 const text=String(raw||"").trim();
 const words=text.split(/\s+/).filter(Boolean).length;
 const checks={
  length:words>=110&&words<=200,
  topic:/\b(parents?|famil(?:y|ies))\b/i.test(text)&&
   /\b(child(?:ren)?|teenagers?|kids?|youngsters?)\b/i.test(text)&&
   /\b(decisions?|choices?|choose|involve|involved|consult|participate|listen)\b/i.test(text),
  stance:/\b(should|must|ought|believe|think|agree|disagree|support|important|essential|argue|opinion|favor|favour)\b/i.test(text),
  reasoning:/\b(because|since|therefore|for example|for instance|such as|as a result|however|although)\b/i.test(text)
 };
 const score=Object.values(checks).filter(Boolean).length;
 return {status:score===4?"correct":"wrong",reference:"",
  assessment:"Đoạn văn: "+words+" từ; "+score+"/4 tiêu chí cơ bản (110–200 từ, bám chủ đề, có quan điểm, có lý do/ví dụ).",
  advisory:true};
}
function matchesRewrite(key,actual,answer){
 if(matches(actual,[answer,...(ACCEPTED[key]||[])]))return true;
 const v=norm(actual);
 switch(key){
  case "w:91":return /^though they have (?:often )?(?:argued|had (?:many )?arguments)(?: frequently)?$/.test(v);
  case "w:92":return /^kept in the dark (?:about|over)$/.test(v);
  case "w:93":return /^has a down-to-earth$/.test(v);
  case "w:94":return /^keep a straight face when$/.test(v);
  case "w:95":return /^(?:i )?(?:got|developed) cold feet$/.test(v);
  case "w:96":return /^time my brother has the (?:better|more efficiently) he (?:works|performs)$/.test(v);
  case "w:97":return /^my mind back to what (?:had )?happened all those years (?:before|ago)$/.test(v);
  case "w:98":return /^the blame (?:for the plans failure on tom|on tom for the plans failure)$/.test(v);
  case "w:99":return /^the presidents (?:personal )?diaries were published did the truth (?:come out|emerge)$/.test(v);
  case "w:100":return /^the factory last week is (?:said|believed|thought) to have been caused by an electrical fault$/.test(v);
  default:return false;
 }
}
function evaluate(question,response,reference,sourceVerified,context={}){
 if(!meaningful(response))return {status:"unanswered",reference:""};
 const id=context.group+":"+context.number,raw=String(reference?.answer||"").trim();
 const answer=raw.replace(/^[A-D]\.\s+/,"").trim();
 const actual=String(response.value||"").trim();
 const type=question?.type||context.kind||"";
 if(context.group==="essay"||type==="essay")return scoreEssay(actual);
 if(type==="mcq"||/^[A-D]\.\s/.test(raw)){
  const expected=/^([A-D])\.\s/.exec(raw)?.[1]||(/^[A-D]$/.test(raw)?raw:"");
  return {status:expected&&actual.toUpperCase()===expected?"correct":"wrong",reference:expected,
   assessment:"Đối chiếu với đáp án trắc nghiệm tham khảo.",advisory:!sourceVerified};
 }
 if(context.group==="e"||type==="error"){
  const fix=correction(raw);
  const good=!!fix&&matches(response.error,[fix.error])&&matches(response.correction,[fix.correction]);
  return {status:good?"correct":"wrong",reference:raw,
   assessment:"Đối chiếu cả từ/cụm sai và cách sửa; số dòng là thông tin hỗ trợ."};
 }
 if(context.group==="w"||type==="rewrite"){
  return {status:matchesRewrite(id,actual,answer)?"correct":"wrong",reference:answer,
   assessment:"Đối chiếu đáp án mẫu và biến thể cấu trúc; một số câu đồng nghĩa khác có thể chưa được nhận diện.",advisory:true};
 }
 return {status:matches(actual,[answer,...(ACCEPTED[id]||[])])?"correct":"wrong",reference:answer,
  assessment:"Đối chiếu từ/cụm từ (không phân biệt chữ hoa, thường và dấu câu)."};
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
   const outcome=evaluate(q.question,answer,q.reference,q.verified,{group:g.id,number:n,kind:g.kind});
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
 return [["correct","Đúng"],["wrong","Sai"],["unanswered","Bỏ trống"]].map(([id,label])=>
  '<div class="hsg-rs-stat hsg-rs-stat-'+id+'"><span class="hsg-rs-stat-title"><span class="hsg-rs-stat-symbol">'+
  STATUS[id].icon+'</span>'+label+'</span><strong>'+s[id]+'</strong></div>').join("");
}
function progressBar(s){
 const total=s.total||1;
 return '<div class="hsg-rs-bars" role="img" aria-label="'+e(s.correct+' đúng, '+s.wrong+' sai, '+s.unanswered+' bỏ trống')+'">'+
  ["correct","wrong","unanswered"].map(k=>
   '<span class="hsg-rs-bar-'+k+'" style="width:'+fraction(s[k],total)+'%"></span>').join("")+'</div>';
}
function partRow(p){
 const s=p.metrics;
 return '<section class="hsg-rs-part"><div class="hsg-rs-part-top"><div><h3>'+e(p.name)+'</h3><span>Câu '+p.start+'–'+p.end+(p.id==="essay"?" · Bài viết":"")+'</span></div>'+
  '<span class="hsg-rs-part-stats">'+s.correct+' đúng · '+s.wrong+' sai · '+s.unanswered+' bỏ trống</span></div>'+
  progressBar(s)+'</section>';
}
function answerCard(q){
 const st=STATUS[q.status];
 const title=q.group==="essay"?"Paragraph Writing":"Câu "+q.number;
 const short=q.stem.replace(/\s+/g," ").slice(0,110);
 return '<button type="button" class="hsg-rs-question" data-hsg-result-jump="'+e(q.key)+'" aria-label="Xem lại '+e(title)+', '+st.label+'">'+
  '<span class="hsg-rs-question-num">'+e(q.group==="essay"?"W":q.number)+'</span>'+
  '<span class="hsg-rs-question-details"><strong>'+e(title)+'</strong><small>'+e(q.part)+'</small>'+
  (short?'<span class="hsg-rs-question-stem">'+e(short)+(q.stem.length>110?"…":"")+'</span>':"")+
  (q.group==="essay"?'<span class="hsg-rs-question-stem">'+e(q.assessment||"")+'</span>':"")+'</span>'+
  '<span class="hsg-rs-question-status hsg-rs-'+q.status+'">'+st.icon+' '+st.label+'</span>'+
  '<span class="hsg-rs-question-arrow" aria-hidden="true">›</span></button>';
}
function render(root,report,handlers){
 if(!root)throw Error("Missing Hai Phong result mount");
 const t=report.totals,denominator=t.total;
 root.style.display="block";
 root.innerHTML='<div class="hsg-root hsg-hp-v2 hsg-hp-results">'+
  '<div class="breadcrumbs"><button type="button" class="crumb-btn" data-hsg-results-library>HSG tỉnh</button><span>›</span><span>Hải Phòng</span><span>›</span><span>Kết quả</span></div>'+
  '<header class="hsg-rs-header"><div class="hsg-rs-eyebrow">ENGLISH PRACTICE HUB · EXAM RESULTS</div>'+
  '<h1>Kết quả bài làm</h1><p>HSG Hải Phòng · Đề Tiếng Anh chuyên 2026–2027</p>'+
  '<div class="hsg-rs-header-actions"><button type="button" class="hsg-rs-button hsg-rs-button-primary" data-hsg-results-review>'+
  'Xem lại toàn bộ bài làm ↗</button><button type="button" class="hsg-rs-button hsg-rs-button-light" data-hsg-results-resume>Tiếp tục làm bài</button></div></header>'+
  '<main class="hsg-rs-content"><section class="hsg-rs-overview" aria-label="Tổng kết bài làm">'+
  '<div class="hsg-rs-overview-top"><div><div class="hsg-rs-label">TỔNG QUAN</div><h2>'+t.answered+' <span>/ '+t.total+' mục đã làm</span></h2>'+
  '<p>Tự động đánh giá toàn bộ câu trả lời theo đáp án tham khảo và tiêu chí riêng từng dạng bài.</p></div>'+
  '<div class="hsg-rs-rate"><strong>'+(denominator?fraction(t.correct,denominator)+'%':"—")+'</strong>'+
  '<span>Tỷ lệ đạt trên '+denominator+' mục của đề</span></div></div>'+
  '<div class="hsg-rs-stat-grid">'+metricCards(t)+'</div>'+progressBar(t)+
  '<p class="hsg-rs-disclaimer">Đây là đánh giá tự động để luyện tập, không phải điểm thi chính thức. Sentence Transformation có thể có câu đồng nghĩa khác chưa được nhận diện. Paragraph Writing chỉ được đánh giá theo 4 tiêu chí cơ bản: độ dài, đúng chủ đề, quan điểm, lý do/ví dụ; không thay thế đánh giá ngôn ngữ hay lập luận của giáo viên.</p>'+
  '</section><section class="hsg-rs-section"><div class="hsg-rs-section-heading"><h2>Kết quả theo từng phần</h2><span>'+report.parts.length+' phần</span></div>'+
  '<div class="hsg-rs-part-card">'+report.parts.map(partRow).join("")+
  '<div class="hsg-rs-legend">'+Object.keys(STATUS).map(k=>'<span><i class="hsg-rs-legend-'+k+'"></i>'+STATUS[k].label+'</span>').join("")+'</div></div></section>'+
  '<section class="hsg-rs-section"><div class="hsg-rs-section-heading"><h2>Đi tới câu hỏi</h2><label class="hsg-rs-filter-label">Lọc trạng thái <select id="hsg-rs-filter">'+
  '<option value="all">Tất cả câu hỏi</option><option value="wrong">Câu sai</option><option value="correct">Câu đúng</option>'+
  '<option value="unanswered">Bỏ trống</option></select></label></div>'+
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
global.HSGHaiPhongResults=Object.freeze({version:"2.0",evaluate,build,render,STATUS,normalize:norm});
})(window);
