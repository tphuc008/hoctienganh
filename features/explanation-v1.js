/* Explanation Standard V1 — presentation-only, no grading or authorization.
   Call only AFTER each feature's existing answer-release permission check.
   Missing evidence must never be silently converted into an approved explanation. */
(function(global){
"use strict";
const h=value=>String(value==null?"":value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const plain=value=>String(value==null?"":value).trim();
const paragraphs=value=>(Array.isArray(value)?value:[value]).filter(Boolean).map(x=>'<p>'+h(x)+'</p>').join("");
const anchor=(value,label)=>plain(value)?'<p><strong>'+h(label)+':</strong> '+h(value)+'</p>':"";
const optionWord=(o)=>plain(o?.word||o?.label||"");
/* Presentation guardrail: strip only identified tautological filler.
   Do not replace it with a newly invented explanation. Keep source-specific
   facts intact; incomplete items are visibly marked for editorial review. */
const boilerplate=[
 /Đây là lý do lựa chọn này khác nghĩa hoặc khác chức năng với “[^”]*” trong chính ngữ cảnh của câu\.?/gi,
 /Khi làm câu tương tự, nhận diện clue trước, sau đó kiểm tra từ loại, cấu trúc, collocation và phạm vi nghĩa; không chọn đáp án chỉ vì có từ xuất hiện trong đoạn\.?/gi,
 /Ở đây không chỉ có đúng từ loại, mà còn đúng quan hệ nghĩa và cách kết hợp trong câu\.?/gi,
 /Không chỉ xét một từ riêng lẻ: cần kiểm tra quan hệ nghĩa hoặc cấu trúc với toàn bộ câu\.?/gi,
 /Từ này có vẻ hợp vì nằm gần cùng semantic field, nhưng ngữ cảnh đang yêu cầu “[^”]*”; trọng tâm của [^.]* không trùng hoàn toàn với yêu cầu đó, nên kém chính xác hơn [^.]*\.?/gi,
 /Đây là cách diễn đạt khớp yêu cầu hơn các phương án không mang đúng chức năng hoặc không được đoạn văn hỗ trợ\.?/gi
];
const hasFiller=v=>boilerplate.some(re=>{re.lastIndex=0;return re.test(plain(v))});
const clean=v=>{let x=plain(v);for(const re of boilerplate){re.lastIndex=0;x=x.replace(re,"")}return x.replace(/\s+\./g,".").replace(/\.{2,}/g,".").replace(/\s{2,}/g," ").trim()};

function validated(s){
 const options=Array.isArray(s.options)?s.options:[];
 const hasOptions=options.length===4&&options.every(x=>clean(x.analysis));
 const hasExamples=Array.isArray(s.examples)&&s.examples.length===4&&
   s.examples.every((x,i)=>plain(x.en)&&plain(x.vi)&&(!options[i]||plain(x.word)===plain(options[i].word)));
 const evidence=Array.isArray(s.evidence)?s.evidence.filter(Boolean):[s.evidence].filter(Boolean);
 const requirements=plain(s.quickReason)&&evidence.length>0&&plain(s.reasoning||s.analysisHtml||s.legacyHtml);
 const vocabulary=s.type==="vocabulary";
 return {options,hasOptions,hasExamples,evidence,
  status:requirements&&(!options.length||hasOptions)&&(!vocabulary||hasExamples)&&!s.needsReview&&!([s.quickReason,s.reasoning,s.remember,...options.map(x=>x.analysis)].some(hasFiller))?"ready":"needs_review"};
}
function render(spec,opts){
 const raw=spec||{},s={...raw,quickReason:clean(raw.quickReason),reasoning:clean(raw.reasoning),remember:clean(raw.remember),application:clean(raw.application),options:(raw.options||[]).map(x=>({...x,analysis:clean(x.analysis)}))},o=opts||{},v=validated(raw),answer=plain(s.answer);
 const print=!!o.print;
 const warn=v.status==="needs_review"?'<p class="ev1-review-label">Một phần lời giải đang cần rà soát hoặc bổ sung bằng chứng. Nội dung hiện có được giữ nguyên, không tự tạo phần còn thiếu.</p>':"";
 const evidence=v.evidence.length?v.evidence.map(x=>typeof x==="string"?paragraphs(x):
    '<div class="ev1-evidence-item">'+anchor(x.locator,"Vị trí")+anchor(x.quote,"Dẫn chứng")+anchor(x.note,"Giải thích")+'</div>').join(""):
    '<p class="ev1-muted">Chưa có bằng chứng đã được xác minh cho câu này.</p>';
 const choices=v.options.length?v.options.map((x,i)=>'<div class="ev1-choice semantic-option'+(x.correct?" correct-analysis":"")+'"><div class="semantic-option-head"><span>'+String.fromCharCode(65+i)+'</span><b>'+h(optionWord(x))+'</b>'+(x.meaning?'<em>'+h(x.meaning)+'</em>':"")+'</div><p>'+h(x.analysis||"Chưa có phân tích riêng được xác minh.")+'</p></div>').join(""):
   '<p class="ev1-muted">Chưa có phân tích từng phương án đã được xác minh.</p>';
 const examples=(s.examples||[]).map((x,i)=>'<div class="ev1-example semantic-example"><div class="semantic-example-title"><span>'+String.fromCharCode(65+i)+'</span><b>'+h(x.word||v.options[i]?.word||"")+'</b></div><p class="example-en">'+h(x.en||"")+'</p>'+(x.vi?'<p class="example-vi">→ '+h(x.vi)+'</p>':"")+'</div>').join("");
 const app=(examples?'<div class="semantic-examples-grid">'+examples+'</div>':"")+
    (plain(s.application)?'<p>'+h(s.application)+'</p>':"")+
    (plain(s.remember)?'<div class="semantic-remember"><b>Điểm cần nhớ</b><span>'+h(s.remember)+'</span></div>':"");
 const body='<section class="semantic-step ev1-step"><div class="semantic-step-label"><span>1</span><div><b>Bằng chứng</b></div></div><div class="semantic-prose">'+ (s.evidenceHtml||evidence)+anchor(s.translation,"Dịch / diễn giải")+'</div></section>'+
    '<section class="semantic-step ev1-step"><div class="semantic-step-label"><span>2</span><div><b>Phân tích'+(v.options.length===4?" A–D":" cách giải")+'</b></div></div>'+
      '<div class="semantic-prose">'+ (s.analysisHtml||paragraphs(s.reasoning))+
      (v.options.length?'<div class="semantic-options-grid">'+choices+'</div>':"")+
      (s.legacyHtml?'<div class="ev1-legacy">'+s.legacyHtml+'</div>':"")+
      (!v.options.length&&!s.legacyHtml&&!plain(s.reasoning)?'<p class="ev1-muted">Chưa có phân tích đủ bằng chứng để công bố.</p>':"")+
      '</div></section>'+
    '<section class="semantic-step ev1-step"><div class="semantic-step-label"><span>3</span><div><b>Vận dụng</b></div></div><div class="semantic-prose">'+
      (s.applicationHtml||app||'<p class="ev1-muted">Ví dụ hoặc quy tắc vận dụng đang chờ kiểm duyệt.</p>')+'</div></section>';
 return '<div class="ev1 feedback semantic-feedback'+(o.className?" "+h(o.className):"")+'" data-explanation-v1="1" data-review-status="'+v.status+'">'+
   '<div class="feedback-title ev1-answer">Đáp án: '+h(answer||"Đang kiểm tra đáp án")+'</div>'+
   (s.quickReason?'<p class="ev1-short">'+h(s.quickReason)+'</p>':'<p class="ev1-short ev1-muted">Chưa có lý do ngắn đã được đối chiếu nguồn.</p>')+
   warn+'<details class="ev1-details"'+(print?' open':"")+'><summary class="ev1-toggle">'+(print?'Giải thích chi tiết':'Xem giải thích chi tiết')+'</summary><div class="ev1-full">'+body+'</div></details></div>';
}
function vocab(q,d){
 d=d||{};const answer=q?.o?.[q.a]||q?.answers?.[0]||"";
 const opts=(d.options||[]).map((x,i)=>({word:q.o[i],meaning:x.meaning||"",analysis:x.analysis||"",correct:i===q.a}));
 const examples=(d.examples||[]).map((x,i)=>({word:q.o[i],en:x.en,vi:x.vi}));
 const isVocabulary=!!q?.o&&q.o.length===4;
 return {type:isVocabulary?"vocabulary":"wordform",answer,quickReason:(d.mode==="semantic_precision"?d.step1?.[1]||d.step1?.[0]:d.why)||"",
  evidence:d.mode==="semantic_precision"?(d.step1||[]):(d.why?[d.why]:[]),
  reasoning:d.mode==="semantic_precision"?(d.step1?.[2]||""):(d.contrast||""),
  options:opts,examples,translation:d.translation||"",application:d.usage||d.family||"",
  remember:d.remember||"",needsReview:isVocabulary&&(!opts.length||examples.length!==4)||
    !!d.requiresReview||!!(d.options||[]).find(x=>hasFiller(x.analysis))};
}
function lesson(q,k){
 const opts=(k.choices||k.options||[]).map((x,i)=>({word:q.options[i],meaning:x.meaning||"",analysis:x.analysis||x.explanation||"",correct:i===k.correctIndex}));
 const ex=(k.examples||k.choices||[]).map((x,i)=>({word:q.options[i],en:x.en||x.example||"",vi:x.vi||x.exampleVi||""}));
 return {type:"vocabulary",answer:String.fromCharCode(65+k.correctIndex)+". "+q.options[k.correctIndex],
  quickReason:k.why||k.step1?.[0]||"",evidence:k.step1||[k.why||""],
  reasoning:k.correctMeaning||"",options:opts,examples:ex,remember:k.remember||"",
  needsReview:!k.why&&!k.step1?.length};
}
function school(item,d){
 d=d||{};const mc=item.kind==="mcq",options=mc?(item.o||[]).map((x,i)=>({word:typeof x==="string"?x:String(x),correct:i===item.a,analysis:""})):[];
 return {type:mc?"school-mcq":"school-written",answer:mc?String.fromCharCode(65+item.a)+". "+(item.o?.[item.a]||""):(item.answers?.[0]||""),
  quickReason:d.why||item.note||"",evidence:d.why?[d.concept||d.why]:[],
  reasoning:d.contrast||d.why||"",options,application:d.usage||d.family||"",
  translation:d.translation||"",needsReview:mc||!d.why};
}
function midterm(q,d){
 const opts=(d?.options||[]).map((x,i)=>({word:q.options?.[i]||x.word||"",meaning:x.meaning||"",analysis:x.analysis||"",correct:String.fromCharCode(65+i)===q.answer}));
 const ex=(d?.examples||[]).map((x,i)=>({word:q.options?.[i]||x.word||"",en:x.en,vi:x.vi}));
 return {type:"midterm",answer:q.answer+(q.options?" — "+(q.options["ABCD".indexOf(q.answer)]||""):""),
  quickReason:d?.step1?.[1]||d?.step1?.[0]||"",evidence:d?.step1?.length?[d.step1[0]]:[],
  reasoning:(d?.step1||[]).slice(1).join(" "),options:opts,examples:ex,remember:d?.remember||"",application:q.warning?"Lưu ý đề gốc: "+q.warning:"",needsReview:!!d?.needsReview};
}
function marketing(q){
 return {type:"reading",answer:q.answer,quickReason:q.why||"",
  evidence:q.quote?[{locator:"Đoạn "+String.fromCharCode(65+q.p),quote:q.quote,note:q.why||""}]:[],
  reasoning:q.paraphrase||"",application:q.trap||"",needsReview:!q.why};
}
function robots(q,r){
 const ev=(r?.evidence||[]).map(x=>({locator:"Đoạn "+x[0],quote:x[1],note:x[2]}));
 return {type:"reading",answer:q.answer,quickReason:r?.steps?.[0]||"",evidence:ev,
  reasoning:(r?.steps||[]).join(" "),options:(r?.options||[]).map((x,i)=>({word:x[0],correct:!!x[1],analysis:x[2]})),
  translation:r?.translation||"",application:(r?.pairs||[]).map(x=>x.join(" ↔ ")).join("; "),
  remember:r?.caution||""};
}
function listening(q){
 const secs=Number.isFinite(q.time)?Math.floor(q.time/60)+":"+String(q.time%60).padStart(2,"0"):"";
 const answer=q.type==="mc"?q.answer+". "+(q.options?.["ABCD".indexOf(q.answer)]||""):(q.answerText||"");
 return {type:"listening",answer,quickReason:"",evidence:secs?[{locator:"Mốc nghe "+secs,note:"Mốc tham chiếu trong bài; chưa phải transcript hoặc bằng chứng ngôn ngữ đã xác minh."}]:[],
  reasoning:"",application:"Nghe lại câu tại mốc tham chiếu để đối chiếu thông tin.",needsReview:true};
}
global.ExplanationV1=Object.freeze({version:"1.0",render,vocab,lesson,school,midterm,marketing,robots,listening,validated});
})(window);
