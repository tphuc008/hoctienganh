/* Topic 21: teacher-only interactive inversion studio.
 * Access control is enforced by index.html before loading this renderer.
 * All progress in this preview is local to the browser AND scoped by auth user ID.
 */
(function(g){
"use strict";
const d=g.GrammarTopic21Data;
if(!d||!Array.isArray(d.sections))throw new Error("Topic 21 content is unavailable");
const mount=document.getElementById("pageMount");
const answersById={};
[...d.sections.flatMap(s=>s.checks),...d.practice,...d.mastery,...d.repairs,...d.review].forEach(q=>answersById[q.id]=q);
const tabNames=[["learn","01 · Learn"],["practice","02 · Practice"],["clinic","03 · Error Clinic"],["mastery","04 · Mastery"],["review","05 · Review"]];
let userId="",state=null;
const fresh=()=>({tab:"learn",lesson:0,guided:{},practice:{},practiceSubmitted:false,mastery:{},masterySubmitted:false,masteryAt:null,repairs:{},review:{},reviewSubmitted:false,writes:{},writeReveals:{}});
function esc(v){return String(v==null?"":v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function key(){return "hoctienganh_topic21_preview_v1_"+userId}
function save(){if(userId&&state)localStorage.setItem(key(),JSON.stringify(state));}
function load(uid){
  userId=String(uid||"");
  if(!userId)throw new Error("Teacher account is required");
  const initial=fresh();
  try{
    const raw=JSON.parse(localStorage.getItem(key())||"null");
    state=raw&&typeof raw==="object"?Object.assign(initial,raw):initial;
    if(!Array.isArray(d.sections)||!d.sections[state.lesson])state.lesson=0;
    if(!tabNames.some(t=>t[0]===state.tab))state.tab="learn";
  }catch(_){state=initial;}
}
function getScores(items,values){
  let correct=0,answered=0;
  items.forEach(q=>{if(Number.isInteger(values?.[q.id])){answered++;if(values[q.id]===q.correct)correct++;}});
  return {correct:correct,answered:answered,total:items.length};
}
function completeCount(){
  return d.sections.filter(s=>s.checks.every(q=>state.guided[q.id]?.correct===true)).length;
}
function scoreBySkill(){
  const source=[];
  if(state.practiceSubmitted)d.practice.forEach(q=>source.push({q:q,pick:state.practice[q.id],where:"Practice"}));
  if(state.masterySubmitted)d.mastery.forEach(q=>source.push({q:q,pick:state.mastery[q.id],where:"Mastery"}));
  return d.skills.map(skill=>{
    const items=source.filter(x=>x.q.skill===skill.id);
    return {skill:skill,items:items,total:items.length,correct:items.filter(x=>x.pick===x.q.correct).length,
      wrong:items.filter(x=>x.pick!==x.q.correct)};
  });
}
function isMastered(){
  if(!state.masterySubmitted)return false;
  const sc=getScores(d.mastery,state.mastery);
  const must=["mechanics","only","time","conditional"];
  return sc.correct>=8&&must.every(id=>d.mastery.filter(q=>q.skill===id).some(q=>state.mastery[q.id]===q.correct));
}
function progressHTML(){
  const done=completeCount(),percent=Math.round(done/d.sections.length*100);
  return '<div class="g21-progress" aria-label="Tiến độ học lý thuyết '+percent+'%"><span style="width:'+percent+'%"></span></div><div class="g21-progress-label"><span>Hoàn thành bài học</span><strong>'+done+'/'+d.sections.length+'</strong></div>';
}
function topbar(){
  return '<div class="g21-header"><button type="button" class="g21-back" data-g21="home">← Grammar / 25 chuyên đề</button>'+
  '<span class="g21-chip">Giáo viên · Bản thử nghiệm</span></div>';
}
function hero(){
  const p=getScores(d.practice,state.practice),m=getScores(d.mastery,state.mastery);
  return '<div class="g21-hero"><div class="g21-label">Topic 21 / Advanced Grammar</div><h1>Đảo ngữ <span style="color:#2563eb">Inversions</span></h1>'+
  '<p>Học theo từng điểm ngữ pháp, đối chiếu câu thường và đảo ngữ, giải bài ngay sau mỗi phần, rồi tự làm bài vận dụng để tìm ra những lỗi cần sửa.</p>'+
  '<div class="g21-statrow"><div class="g21-stat"><b>7</b>Micro-lessons</div>'+
  '<div class="g21-stat"><b>14</b>Guided questions</div>'+
  '<div class="g21-stat"><b>'+ (state.practiceSubmitted?p.correct+"/"+p.total:"16") +'</b>'+(state.practiceSubmitted?"Practice đúng":"Practice questions")+'</div>'+
  '<div class="g21-stat"><b>'+ (state.masterySubmitted?m.correct+"/"+m.total:"10") +'</b>'+(state.masterySubmitted?"Mastery đúng":"Mastery questions")+'</div></div></div>';
}
function tabs(){
  return '<nav class="g21-tabs" aria-label="Các giai đoạn tự học">'+tabNames.map(t=>
   '<button type="button" class="g21-tab'+(state.tab===t[0]?" active":"")+'" data-g21="tab" data-tab="'+t[0]+'" aria-current="'+(state.tab===t[0]?"step":"false")+'">'+esc(t[1])+'</button>').join("")+'</nav>';
}
function side(){
  return '<aside class="g21-side"><h3>Lộ trình kiến thức</h3>'+progressHTML()+'<div class="g21-side-list">'+d.sections.map((s,i)=>{
    const done=s.checks.every(q=>state.guided[q.id]?.correct===true);
    return '<button type="button" class="g21-lesson-btn'+(state.lesson===i?" active":"")+(done?" done":"")+'" data-g21="lesson" data-index="'+i+'">'+
    '<span class="g21-step">'+(done?"✓":i+1)+'</span><span>'+esc(s.title)+'</span></button>';
  }).join("")+'</div><p class="g21-foot">Chọn lại bất cứ bài nào để ôn tập. Tiến độ chỉ lưu trên trình duyệt này.</p></aside>';
}
function examples(s){
  return s.examples.map((x,i)=>'<div class="g21-example"><div class="g21-small">Example '+String(i+1).padStart(2,"0")+'</div>'+
    '<div class="g21-before"><b>Normal:</b> '+esc(x.normal)+'</div>'+
    '<div class="g21-after">↳ '+esc(x.inverted)+'</div>'+
    '<div class="g21-why">'+esc(x.why)+'</div></div>').join("");
}
function feedback(q,pick,wasCorrect,kind){
  const good=pick===q.correct;
  const selected=q.options[pick]||"";
  const specific=!good?q.wrong?.[pick]:"";
  return '<div class="g21-feedback '+(good?"good":"bad")+'" role="status"><strong>'+(good?"✓ Chính xác":"✦ Cần kiểm tra lại")+'</strong>'+
    (!good?'<p><b>Bạn chọn:</b> '+esc(selected)+'</p>':'')+
    (specific?'<p><b>Vì sao chưa đúng:</b> '+esc(specific)+'</p>':'')+
    '<p><b>Quy tắc cần nhớ:</b> '+esc(q.why)+'</p>'+
    (good?'<p><b>Đáp án:</b> '+esc(q.options[q.correct])+'</p>':kind==="guided"?"<p>Đọc lại phân tích trên rồi thử chọn đáp án khác.</p>":'<p><b>Đáp án đúng:</b> '+esc(q.options[q.correct])+'</p>')+'</div>';
}
/* Stable per-account option shuffling prevents answer-letter patterns while retaining
 * canonical correctness and feedback indices in the source question bank. */
function optionOrder(q){
  let seed=2166136261;
  const input=String(q.id)+":"+userId;
  for(let i=0;i<input.length;i++){seed=Math.imul(seed^input.charCodeAt(i),16777619)>>>0;}
  const order=[0,1,2,3];
  for(let i=3;i>0;i--){seed=(Math.imul(seed,1664525)+1013904223)>>>0;const j=seed%(i+1);const t=order[i];order[i]=order[j];order[j]=t;}
  return order;
}
function question(q,num,kind){
  const guided=kind==="guided",repair=kind==="repair",independent=kind==="practice",mastery=kind==="mastery",review=kind==="review";
  const val=guided?state.guided[q.id]?.pick:repair?state.repairs[q.id]?.pick:state[kind]?.[q.id];
  const submitted=guided?Boolean(state.guided[q.id]?.correct):repair?Boolean(state.repairs[q.id]?.correct):independent?state.practiceSubmitted:mastery?state.masterySubmitted:state.reviewSubmitted;
  const selected=Number.isInteger(val)?val:-1;
  const field=guided?"guided":repair?"repairs":kind;
  const reveal=guided||repair?(Number.isInteger(val)):(submitted);
  const complete=guided?state.guided[q.id]?.correct:repair?state.repairs[q.id]?.correct:false;
  return '<article class="g21-question" id="g21-'+esc(q.id)+'">'+
    '<div class="g21-qmeta"><span>QUESTION '+String(num).padStart(2,"0")+'</span><span>'+esc(d.skills.find(s=>s.id===q.skill)?.title||q.skill)+'</span></div>'+
    '<p class="g21-prompt">'+esc(q.stem)+'</p>'+
    '<div class="g21-options" role="group" aria-label="Đáp án câu '+num+'">'+optionOrder(q).map((originalIndex,displayIndex)=>{
      const opt=q.options[originalIndex];
      const mark=selected===originalIndex;
      return '<button type="button" class="g21-option'+(mark?" selected":"")+'" data-g21="answer" data-kind="'+field+'" data-id="'+esc(q.id)+'" data-index="'+originalIndex+'" aria-pressed="'+mark+'"'+(submitted?' disabled aria-disabled="true"':"")+'>'+
      '<span class="g21-letter">'+String.fromCharCode(65+displayIndex)+'</span><span>'+esc(opt)+'</span></button>';
    }).join("")+'</div>'+
    (reveal?feedback(q,selected,complete,kind):"")+
    (guided&&complete?'<div class="g21-foot">Đã hiểu và trả lời đúng. Tiếp tục câu tiếp theo.</div>':"")+'</article>';
}
function learn(){
  const s=d.sections[state.lesson],done=completeCount();
  return '<div class="g21-layout">'+side()+'<div class="g21-main"><span class="g21-label">LESSON '+String(state.lesson+1).padStart(2,"0")+' / 07 · '+esc(s.tag)+'</span>'+
    '<h2>'+esc(s.title)+'</h2><p class="g21-lead">'+esc(s.outcome)+' · Khoảng '+s.minutes+' phút</p>'+
    '<div class="g21-grid2">'+
    '<div class="g21-note"><b>1 · CONCEPT — Ý nghĩa</b>'+esc(s.concept)+'</div>'+
    '<div class="g21-note form"><b>2 · FORM — Công thức</b>'+esc(s.form)+'</div></div>'+
    '<div class="g21-note"><b>3 · CONTRAST — Điểm cần phân biệt</b>'+esc(s.contrast)+'</div>'+
    '<div class="g21-sectionhead"><h3>Worked Examples</h3><span class="g21-chip">Compare & Notice</span></div>'+
    examples(s)+
    '<div class="g21-note" style="margin-top:12px"><b>HƯỚNG DẪN SUY LUẬN</b><ol class="g21-rulelist">'+s.steps.map(x=>'<li>'+esc(x)+'</li>').join("")+'</ol></div>'+
    '<div class="g21-note warning" style="margin-top:11px"><b>COMMON MISTAKE</b>'+esc(s.misconception)+'</div>'+
    '<div class="g21-sectionhead"><h3>Quick Checks</h3><span class="g21-chip">Phản hồi tức thì</span></div>'+
    '<p class="g21-lead">Chọn đáp án rồi đọc lời giải. Nếu sai, bạn có thể suy nghĩ và chọn lại; hệ thống chỉ đánh dấu hoàn thành sau khi trả lời đúng.</p>'+
    s.checks.map((q,i)=>question(q,i+1,"guided")).join("")+
    '<div class="g21-actions">'+
    '<button class="g21-btn" data-g21="prev"'+(state.lesson===0?" disabled":"")+'>← Bài trước</button>'+
    (state.lesson<d.sections.length-1?
      '<button class="g21-btn primary" data-g21="next">Bài kế tiếp →</button>':
      '<button class="g21-btn primary" data-g21="tab" data-tab="practice">Bắt đầu vận dụng →</button>')+
    '</div><p class="g21-foot">'+done+'/'+d.sections.length+' bài học đã hoàn thành. Có thể học lại hoặc tiếp tục phần kế tiếp mà không mất kết quả.</p>'+
    '</div></div>';
}
function scoreHeader(items,values,kind){
  const s=getScores(items,values),grade=Math.round(s.correct/s.total*100);
  return '<div class="g21-note form"><b>KẾT QUẢ '+(kind==="mastery"?"MASTERY":"PRACTICE")+'</b>'+
    '<span class="g21-score">'+s.correct+'/'+s.total+'</span><p>Đúng '+grade+'% · '+
    (grade>=80?"Kết quả tốt; hãy xem lại các lỗi còn sót.":"Hãy kiểm tra nhóm lỗi và ôn lại đúng phần kiến thức liên quan.")+'</p>'+
    '</div>';
}
const writing=[
  {id:"w1",task:"Rewrite beginning with 'Not until': We did not understand the problem until we checked the original data.",
    model:"Not until we checked the original data did we understand the problem.",
    checks:["Not until + mệnh đề phụ trật tự thường","did + we + understand ở mệnh đề chính","Giữ nguyên ý nghĩa thời gian"]},
  {id:"w2",task:"Rewrite without 'if': If I had received the invitation, I would have attended the event.",
    model:"Had I received the invitation, I would have attended the event.",
    checks:["Bỏ if nhưng giữ tính điều kiện","Had + I + received","Giữ would have attended"]}
];
function transfer(){
  return '<hr class="g21-divider"><div class="g21-sectionhead"><h3>Writing Transfer</h3><span class="g21-chip">Tự viết · Không chấm tự động</span></div>'+
   '<p class="g21-lead">Hai câu sản sinh ngôn ngữ. Viết trước rồi đối chiếu với đáp án gợi ý; câu diễn đạt tương đương có thể đúng dù khác từng chữ.</p>'+
   writing.map((w,i)=>'<div class="g21-question"><div class="g21-qmeta">WRITING CHALLENGE '+(i+1)+'</div>'+
    '<p class="g21-prompt">'+esc(w.task)+'</p>'+
    '<textarea class="g21-fill" rows="3" style="min-height:86px;max-width:100%" data-g21-write="'+w.id+'" placeholder="Viết câu hoàn chỉnh bằng tiếng Anh...">'+esc(state.writes[w.id]||"")+'</textarea>'+
    '<div class="g21-actions"><button type="button" class="g21-btn" data-g21="write-reveal" data-id="'+w.id+'"'+(!(state.writes[w.id]||"").trim()?" disabled":"")+'>Đối chiếu bài làm</button></div>'+
    (state.writeReveals[w.id]?'<div class="g21-feedback"><strong>Model answer (không chấm máy)</strong><p>'+esc(w.model)+'</p><p><b>Checklist:</b></p><ul>'+w.checks.map(x=>'<li>'+esc(x)+'</li>').join("")+'</ul></div>':"")+
   '</div>').join("");
}
function exam(kind){
  const master=kind==="mastery",items=master?d.mastery:d.practice;
  const picks=master?state.mastery:state.practice;
  const submitted=master?state.masterySubmitted:state.practiceSubmitted;
  const summary=getScores(items,picks);
  return '<div class="g21-main" style="width:100%">'+
   '<span class="g21-label">'+(master?"MASTERY CHECK":"INDEPENDENT PRACTICE")+'</span>'+
   '<h2>'+(master?"Kiểm tra vận dụng độc lập":"Vận dụng hỗn hợp sau khi học")+'</h2>'+
   '<p class="g21-lead">'+(master?
     "10 câu chưa xuất hiện trong phần Learn. Mục tiêu thử nghiệm: đúng ít nhất 8/10 và làm đúng ít nhất một câu ở từng nhóm cơ chế, only/not until, trình tự thời gian, điều kiện.":
     "16 câu trộn 7 nhóm kiến thức. Gồm nhận diện công thức, phân biệt lỗi và chọn câu viết lại tương đương. Chưa hiển thị lời giải trước khi nộp.")+'</p>'+
   (!submitted?'<div class="g21-note form"><b>YOUR PROGRESS</b>Đã chọn '+summary.answered+'/'+summary.total+' câu. Bạn có thể quay lại và đổi đáp án trước khi nộp.</div>':
    scoreHeader(items,picks,kind))+
   (master&&submitted?'<div class="g21-note '+(isMastered()?"form":"warning")+'" style="margin:12px 0"><b>MASTERY STATUS</b>'+
     (isMastered()?"Đạt chuẩn thử nghiệm. Lộ trình ôn tập 1–3–7 ngày đã được tạo.":"Chưa đạt chuẩn thử nghiệm. Hãy vào Error Clinic, học lại nhóm còn yếu và làm bài kiểm tra mới khi có bộ câu hỏi thay thế.")+'</div>':"")+
   '<div class="g21-sectionhead"><h3>'+(master?"Final Assessment":"Mixed Practice")+'</h3><span class="g21-chip">'+items.length+' Questions</span></div>'+
   items.map((q,i)=>question(q,i+1,kind)).join("")+
   '<div class="g21-actions">'+
     (!submitted?'<button class="g21-btn primary" data-g21="submit" data-kind="'+kind+'"'+(summary.answered!==items.length?' disabled title="Trả lời đủ câu trước khi nộp"':"")+'>Nộp bài & xem phân tích →</button>':
      '<button class="g21-btn primary" data-g21="tab" data-tab="clinic">Xem phân tích lỗi →</button>')+
     (master&&submitted?'<button class="g21-btn" data-g21="tab" data-tab="review">Lộ trình ôn tập →</button>':"")+
   '</div>'+
   (!master?transfer():"")+
   '</div>';
}
function clinic(){
  const groups=scoreBySkill();
  if(!state.practiceSubmitted&&!state.masterySubmitted){
    return '<div class="g21-main"><div class="g21-label">ERROR CLINIC</div><h2>Chữa đúng điểm yếu</h2>'+
    '<div class="g21-empty">Chưa có dữ liệu để nhận diện lỗi. Hãy làm và nộp phần Practice hoặc Mastery. Hệ thống sẽ phân loại lỗi theo 7 nhóm kiến thức.</div>'+
    '<div class="g21-actions"><button class="g21-btn primary" data-g21="tab" data-tab="practice">Đến Practice →</button></div></div>';
  }
  const weak=groups.filter(x=>x.wrong.length>0).sort((a,b)=>a.correct/(a.total||1)-b.correct/(b.total||1));
  return '<div class="g21-main"><span class="g21-label">ERROR CLINIC · SKILL MAP</span><h2>Không chỉ biết sai bao nhiêu — phải biết sai ở đâu</h2>'+
   '<p class="g21-lead">Phân tích dựa trên câu đã nộp (không tính Quick Checks có trợ giúp). Mỗi nhóm sai có hướng học lại và một câu luyện bù riêng.</p>'+
   '<div class="g21-sectionhead"><h3>Bản đồ năng lực</h3><span class="g21-chip">'+groups.reduce((x,g)=>x+g.total,0)+' câu đã chấm</span></div>'+
   groups.map(gr=>{
     const pct=gr.total?Math.round(100*gr.correct/gr.total):0;
     return '<div class="g21-skill"><div class="g21-skill-head"><h3>'+esc(gr.skill.title)+'</h3><span class="g21-pill">'+(gr.total?gr.correct+"/"+gr.total:"Chưa đủ dữ liệu")+'</span></div>'+
       '<div class="g21-meter" aria-label="'+pct+' phần trăm đúng"><span style="width:'+pct+'%"></span></div>'+
       '<p style="font-size:12px;color:#64748b;margin:8px 0">'+esc(gr.skill.outcome)+'</p></div>';
   }).join("")+
   '<div class="g21-sectionhead"><h3>Targeted Repair</h3><span class="g21-chip">'+weak.length+' nhóm cần ôn lại</span></div>'+
   (weak.length?weak.map(gr=>{
     const lesson=d.sections.findIndex(s=>s.id===gr.skill.id);
     const repair=d.repairs.find(q=>q.skill===gr.skill.id);
     return '<section class="g21-skill"><div class="g21-skill-head"><h3>'+esc(gr.skill.title)+'</h3><span class="g21-pill">Sai '+gr.wrong.length+' câu</span></div>'+
     '<p class="g21-lead">Bạn còn nhầm ở những câu: '+gr.wrong.map(x=>esc(x.q.id.toUpperCase())).join(", ")+'.</p>'+
     '<div class="g21-note"><b>ÔN LẠI ĐÚNG KIẾN THỨC</b>'+esc(d.sections[lesson].misconception)+'</div>'+
     '<div class="g21-actions"><button class="g21-btn" data-g21="lesson" data-index="'+lesson+'">Ôn lại bài '+(lesson+1)+' →</button></div>'+
     (repair?'<div class="g21-sectionhead"><h3>Repair question</h3></div>'+question(repair,1,"repair"):"")+
     '</section>';
   }).join(""):'<div class="g21-empty">Chưa phát hiện lỗi trong các câu đã nộp. Bạn có thể chuyển sang Mastery để kiểm tra khả năng vận dụng ở ngữ cảnh mới.</div>')+
   '</div>';
}
function dateText(timestamp){
  try{return new Intl.DateTimeFormat("vi-VN",{dateStyle:"medium"}).format(new Date(timestamp))}catch(_){return "—"}
}
function review(){
  const base=state.masteryAt?Date.parse(state.masteryAt):Date.now();
  const offsets=[1,3,7];
  const due=offsets.map(day=>({day:day,time:base+day*86400000}));
  const passed=isMastered();
  const sc=getScores(d.review,state.review);
  return '<div class="g21-main"><span class="g21-label">SPACED REVIEW</span><h2>Ôn lại để không quên</h2>'+
   '<p class="g21-lead">Một lần đạt điểm tốt chưa đồng nghĩa với ghi nhớ lâu dài. Sau khi đạt Mastery, học sinh ôn lại theo mốc 1, 3 và 7 ngày. Đây là các mốc đề xuất để thử nghiệm, không phải lịch tối ưu cho mọi học sinh.</p>'+
   '<div class="g21-dategrid">'+due.map((x,i)=>'<div class="g21-date"><b>Review '+(i+1)+' · +'+x.day+' ngày</b><span>'+(passed?dateText(x.time):"Chưa kích hoạt")+'</span></div>').join("")+'</div>'+
   '<div class="g21-note '+(passed?"form":"warning")+'" style="margin:16px 0"><b>TRẠNG THÁI</b>'+
   (passed?"Đã đạt chuẩn thử nghiệm. Lịch nhắc phía trên dựa trên thời điểm đạt Mastery và được tính tại trình duyệt.":"Chưa đạt Mastery nên lịch ôn tập chưa được kích hoạt. Giáo viên vẫn có thể xem trước bộ câu hỏi ôn tập.")+'</div>'+
   '<div class="g21-sectionhead"><h3>Mini Retrieval Quiz</h3><span class="g21-chip">5 câu · Bộ riêng</span></div>'+
   '<p class="g21-lead">Làm 5 câu không xem lại lý thuyết, sau đó kiểm tra các điểm còn sai. Đây là một vòng ôn tập mẫu, chưa tự tạo bộ câu hỏi khác nhau cho mỗi ngày.</p>'+
   (state.reviewSubmitted?'<div class="g21-note form"><b>REVIEW RESULT</b>'+sc.correct+'/'+sc.total+' câu đúng</div>':"")+
   d.review.map((q,i)=>question(q,i+1,"review")).join("")+
   '<div class="g21-actions">'+(!state.reviewSubmitted?
     '<button class="g21-btn primary" data-g21="submit" data-kind="review"'+(sc.answered!==sc.total?" disabled":"")+'>Nộp mini review →</button>':
     '<button class="g21-btn" data-g21="restart-review">Làm lại bộ ôn tập</button>')+'</div>'+
   '</div>';
}
function home(){
  const done=completeCount();
  const sc=getScores(d.mastery,state.mastery);
  return topbar()+'<div class="g21-hero"><div class="g21-label">TEACHER PREVIEW / GRAMMAR LIBRARY</div>'+
    '<h1>25 chuyên đề ngữ pháp</h1>'+
    '<p>Chuyên đề 21 là bài mẫu hoàn chỉnh cho hành trình tự học. Các chuyên đề khác sẽ được xuất bản sau khi kiểm thử trải nghiệm này.</p>'+
    '<div class="g21-statrow"><div class="g21-stat"><b>01/25</b>Chuyên đề mẫu</div><div class="g21-stat"><b>07</b>Bài học nhỏ</div></div></div>'+
    '<div class="g21-card" style="padding:24px"><div class="g21-header"><span class="g21-label">TOPIC 21 · C1/C2 PRACTICE</span><span class="g21-chip">Pilot</span></div>'+
    '<h2 style="font-size:clamp(26px,4vw,36px);margin-bottom:8px">CHUYÊN ĐỀ 21. ĐẢO NGỮ – INVERSIONS</h2>'+
    '<p class="g21-lead">Từ cơ chế đảo trợ động từ đến điều kiện giả định, not until, hardly/no sooner, so/such và full inversion.</p>'+
    progressHTML()+
    '<div class="g21-statrow" style="margin-bottom:17px"><span class="g21-pill">7 lessons</span><span class="g21-pill">14 Quick Checks</span><span class="g21-pill">16 Practice</span><span class="g21-pill">10 Mastery</span></div>'+
    '<div class="g21-actions"><button class="g21-btn primary" data-g21="open">Bắt đầu từ Learn →</button>'+
    (state.masterySubmitted?'<span class="g21-pill">Mastery '+sc.correct+'/10</span>':"")+'</div></div>'+
    '<p class="g21-foot">Không có Diagnostic Test. Nội dung đang ở khu vực giáo viên và chưa được xuất bản cho học sinh.</p>';
}
function render(preserveScroll){
  if(!state)return;
  const y=preserveScroll?window.scrollY:0;
  mount.style.display="block";
  mount.innerHTML='<div class="g21">'+(location.hash.replace(/^#/,"")==="teacher/grammar"?
    home():topbar()+hero()+tabs()+
    (state.tab==="learn"?learn():state.tab==="practice"?exam("practice"):state.tab==="clinic"?clinic():state.tab==="mastery"?exam("mastery"):review())+
    '<p class="g21-foot">Sources: <a href="https://dictionary.cambridge.org/grammar/british-grammar/inversion" target="_blank" rel="noopener noreferrer">Cambridge Grammar · Inversion</a> · <a href="https://learnenglish.britishcouncil.org/free-resources/grammar/c1/inversion-after-negative-adverbials" target="_blank" rel="noopener noreferrer">British Council · Negative adverbials</a>. Điểm và tiến độ bản thử nghiệm lưu cục bộ theo tài khoản, chưa đồng bộ trên các thiết bị.</p>')+'</div>';
  if(preserveScroll)window.scrollTo(0,y);else window.scrollTo(0,0);
}
function openRoute(hash,session){
  if(!session?.user?.id){mount.style.display="block";mount.innerHTML='<div class="empty">Không thể xác thực tài khoản giáo viên.</div>';return;}
  const uid=session.user.id;
  if(!state||userId!==uid)load(uid);
  if(hash==="teacher/grammar/topic-21")render(false);
  else render(false);
}
function updateAnswer(kind,id,pick){
  const q=answersById[id];
  if(!q||!Number.isInteger(pick)||pick<0||pick>3)return;
  if(kind==="guided"){
    const old=state.guided[id];
    if(old?.correct)return;
    state.guided[id]={pick:pick,correct:pick===q.correct,attempts:(old?.attempts||0)+1,firstCorrect:old?old.firstCorrect:pick===q.correct};
  }else if(kind==="repairs"){
    const old=state.repairs[id];
    if(old?.correct)return;
    state.repairs[id]={pick:pick,correct:pick===q.correct,attempts:(old?.attempts||0)+1};
  }else if(kind==="practice"&&!state.practiceSubmitted){
    if(!d.practice.some(x=>x.id===id))return;
    state.practice[id]=pick;
  }else if(kind==="mastery"&&!state.masterySubmitted){
    if(!d.mastery.some(x=>x.id===id))return;
    state.mastery[id]=pick;
  }else if(kind==="review"&&!state.reviewSubmitted){
    if(!d.review.some(x=>x.id===id))return;
    state.review[id]=pick;
  }else return;
  save();render(true);
}
mount.addEventListener("click",function(e){
  const btn=e.target.closest("[data-g21]");
  if(!btn||!mount.contains(btn))return;
  const a=btn.dataset.g21;
  if(a==="home"){location.hash="teacher/grammar";return;}
  if(a==="open"){state.tab="learn";save();location.hash="teacher/grammar/topic-21";return;}
  if(a==="tab"){state.tab=btn.dataset.tab;save();render(false);return;}
  if(a==="lesson"){
    state.lesson=Number(btn.dataset.index)||0;state.tab="learn";save();
    if(location.hash!="#teacher/grammar/topic-21"){location.hash="teacher/grammar/topic-21";return;}
    render(false);return;
  }
  if(a==="prev"||a==="next"){state.lesson=Math.min(d.sections.length-1,Math.max(0,state.lesson+(a==="next"?1:-1)));save();render(false);return;}
  if(a==="answer"){updateAnswer(btn.dataset.kind,btn.dataset.id,Number(btn.dataset.index));return;}
  if(a==="submit"){
    const kind=btn.dataset.kind;
    const items=kind==="mastery"?d.mastery:kind==="practice"?d.practice:kind==="review"?d.review:null;
    if(!items)return;
    const picks=state[kind];
    if(items.some(q=>!Number.isInteger(picks[q.id])))return;
    if(kind==="mastery"){state.masterySubmitted=true;if(isMastered()&&!state.masteryAt)state.masteryAt=new Date().toISOString();}
    if(kind==="practice")state.practiceSubmitted=true;
    if(kind==="review")state.reviewSubmitted=true;
    save();render(false);return;
  }
  if(a==="write-reveal"){
    const id=btn.dataset.id;
    if(!(state.writes[id]||"").trim())return;
    state.writeReveals[id]=true;save();render(true);return;
  }
  if(a==="restart-review"){state.review={};state.reviewSubmitted=false;save();render(false);return;}
});
mount.addEventListener("input",function(e){
  const id=e.target.dataset?.g21Write;
  if(!id||!writing.some(x=>x.id===id))return;
  state.writes[id]=e.target.value;
  state.writeReveals[id]=false;
  save();
  const b=e.target.closest(".g21-question")?.querySelector('[data-g21="write-reveal"]');
  if(b)b.disabled=!e.target.value.trim();
});
g.TeacherGrammar21={open:openRoute};
})(window);
