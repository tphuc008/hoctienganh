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
const tabNames=[["learn","Lý thuyết"],["practice","Luyện tập"],["clinic","Chữa lỗi"],["mastery","Kiểm tra"],["review","Ôn tập"]];
let userId="",state=null;
const fresh=()=>({tab:"learn",lesson:0,guided:{},practice:{},practiceSubmitted:false,mastery:{},masterySubmitted:false,masteryAt:null,repairs:{},review:{},reviewSubmitted:false,writes:{},writeReveals:{},pages:{practice:0,mastery:0,review:0},guidedDiscovery:{},guidedStages:{},guidedFocus:{},detective:{}});
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
    state.pages=Object.assign({practice:0,mastery:0,review:0},state.pages||{});
    if(state.exerciseLayoutVersion!==2){
      for(const kind of ["practice","mastery"])state.pages[kind]=Math.max(0,Number(state.pages[kind])||0)*4;
      state.exerciseLayoutVersion=2;
    }
    for(const item of ["guidedDiscovery","guidedStages","guidedFocus","detective"]){if(!state[item]||typeof state[item]!=="object")state[item]={};}
    // Keep old answers; reopen already-submitted sets when v2 adds questions.
    if(state.lessonContentVersion!==2){
      for(const kind of ["practice","mastery","review"]){
        if(state[kind+"Submitted"])state[kind+"Submitted"]=false;
      }
      state.masteryAt=null;
      state.lessonContentVersion=2;
    }
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
  const must=["mechanics","only","time","conditional","agreement"];
  return sc.correct>=Math.ceil(d.mastery.length*0.8)&&must.every(id=>d.mastery.filter(q=>q.skill===id).some(q=>state.mastery[q.id]===q.correct));
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
  const done=completeCount();
  return '<header class="g21-hero"><div class="g21-hero-copy"><span class="g21-label">GRAMMAR STUDIO <span aria-hidden="true">/</span> CHUYÊN ĐỀ 21</span>'+
    '<h1>Đảo ngữ <span>Inversions</span></h1>'+
    '<p>Học rõ từng cấu trúc. Luyện một câu mỗi lần. Xem lời giải khi cần.</p></div>'+
    '<div class="g21-hero-progress"><strong>'+done+' / '+d.sections.length+'</strong><span>bài đã hoàn thành</span></div></header>';
}
function tabs(){
  return '<nav class="g21-tabs" aria-label="Các giai đoạn tự học">'+tabNames.map(t=>
   '<button type="button" class="g21-tab'+(state.tab===t[0]?" active":"")+'" data-g21="tab" data-tab="'+t[0]+'" aria-current="'+(state.tab===t[0]?"step":"false")+'">'+esc(t[1])+'</button>').join("")+'</nav>';
}
function desktopOutlineOpen(){
  return typeof window.matchMedia==="function"&&window.matchMedia("(min-width: 1040px)").matches;
}
function side(){
  const selected=d.sections[state.lesson];
  return '<aside class="g21-course-outline g21-reader-rail">'+
    '<details class="g21-outline" aria-label="Danh sách bài học"'+(desktopOutlineOpen()?' open':'')+'>'+
    '<summary><span class="g21-outline-icon" aria-hidden="true">☰</span><span><strong>Lộ trình bài học</strong>'+
      '<small>Bài '+(state.lesson+1)+'/'+d.sections.length+' · '+esc(selected.title)+'</small></span><span class="g21-outline-chevron">⌄</span></summary>'+
    '<div class="g21-outline-body">'+progressHTML()+
    '<div class="g21-side-list">'+d.sections.map((sec,i)=>{
      const done=sec.checks.every(q=>state.guided[q.id]?.correct===true);
      return '<button type="button" class="g21-lesson-btn'+(state.lesson===i?' active':'')+(done?' done':'')+'" data-g21="lesson" data-index="'+i+'"'+(state.lesson===i?' aria-current="step"':'')+'>'+
      '<span class="g21-step">'+(done?'✓':i+1)+'</span><span>'+esc(sec.title)+'</span></button>';
    }).join('')+'</div></div></details>'+
    '<p class="g21-rail-foot">Học theo nhịp riêng. Kết quả của bạn được lưu trên thiết bị này.</p>'+
    '</aside>';
}
function stageRail(kind){
  if(kind==='practice'||kind==='mastery'){
    const items=kind==='practice'?d.practice:d.mastery,picks=state[kind],submitted=state[kind+'Submitted'];
    const answered=items.filter(q=>Number.isInteger(picks[q.id])).length;
    const current=Math.max(0,Math.min(items.length-1,Number(state.pages[kind])||0));
    const label=kind==='practice'?'Luyện tập':'Kiểm tra';
    return '<aside class="g21-course-outline g21-stage-rail">'+
      '<div class="g21-rail-heading"><span class="g21-label">QUESTION MAP</span><strong>'+label+'</strong>'+
      '<p>'+answered+'/'+items.length+' câu đã trả lời</p></div>'+
      '<div class="g21-progress" aria-label="Đã chọn '+answered+' trên '+items.length+' câu"><span style="width:'+Math.round(answered/items.length*100)+'%"></span></div>'+
      '<nav class="g21-number-grid" aria-label="Chọn câu hỏi đã làm">'+items.map((q,i)=>{
        const visited=Number.isInteger(picks[q.id]);
        const canGo=submitted||i===current||visited;
        return '<button type="button" class="g21-number-btn'+(visited?' answered':'')+(i===current?' active':'')+
          '" data-g21="jump" data-kind="'+kind+'" data-page="'+i+'"'+(canGo?'':' disabled')+
          (i===current?' aria-current="step"':'')+' aria-label="Câu '+(i+1)+(visited?', đã trả lời':'')+'">'+(i+1)+'</button>';
      }).join('')+'</nav>'+
      '<p class="g21-rail-foot">Chọn số câu đã làm để xem lại. Đáp án và giải thích chỉ hiện sau khi nộp.</p>'+
      '</aside>';
  }
  const groups=scoreBySkill();
  return '<aside class="g21-course-outline g21-stage-rail g21-clinic-rail">'+
    '<div class="g21-rail-heading"><span class="g21-label">SKILL MAP</span><strong>'+d.skills.length+' nhóm kiến thức</strong>'+
      '<p>Điểm số từ các bài đã nộp</p></div>'+
    '<div class="g21-rail-skills">'+groups.map(gr=>'<div class="g21-rail-skill"><span>'+esc(gr.skill.title)+'</span><strong>'+
       (gr.total?gr.correct+'/'+gr.total:'—')+'</strong></div>').join('')+'</div>'+
    '<p class="g21-rail-foot">Mở từng nhóm lỗi trong phần chính để luyện sửa câu.</p></aside>';
}
function stageFrame(kind,content){
  return '<div class="g21-layout g21-stage-layout">'+stageRail(kind)+content+'</div>';
}
function exampleItem(s,x,i){
  return '<div class="g21-example"><span class="g21-example-index">Ví dụ '+(i+1)+'</span>'+
    '<p class="g21-before"><span>Câu thường</span>'+esc(x.normal)+'</p>'+
    '<p class="g21-after"><span>Đảo ngữ</span>'+esc(x.inverted)+'</p>'+
    (s.vi?.examples?.[i]?'<p class="g21-example-meaning"><span>Nghĩa</span>'+esc(s.vi.examples[i])+'</p>':"")+
    '<p class="g21-why">'+esc(x.why)+'</p></div>';
}
function examples(s){
  const visible=Math.min(3,s.examples.length),rest=s.examples.length-visible;
  return '<div class="g21-example-list">'+s.examples.slice(0,visible).map((x,i)=>exampleItem(s,x,i)).join("")+
    (rest?'<details class="g21-extra-examples">'+
      '<summary><span class="g21-show-label">Xem thêm '+rest+' ví dụ</span>'+
      '<span class="g21-hide-label">Thu gọn · Chỉ xem '+visible+' ví dụ</span>'+
      '<span class="g21-expand-symbol" aria-hidden="true">⌄</span></summary>'+
      '<div class="g21-extra-example-items">'+
      s.examples.slice(visible).map((x,i)=>exampleItem(s,x,i+visible)).join("")+
      '</div></details>':"")+'</div>';
}
function filledExample(q){
  const original=q.stem;
  const answer=q.options[q.correct];
  const blank=original.indexOf("___");
  return blank>=0?
    esc(original.slice(0,blank))+'<strong class="g21-answer-word">'+esc(answer)+'</strong>'+esc(original.slice(blank+3)):
    esc(answer);
}
function feedback(q,pick,wasCorrect,kind){
  const good=pick===q.correct;
  const note=q.explain||{},selected=q.options[pick]||"";
  const specific=note.wrong?.[pick]||(!good?q.wrong?.[pick]:"");
  const retry=(kind==="guided"||kind==="repair")&&!good;
  const reasons=optionOrder(q).filter(i=>i!==q.correct);
  return '<div class="g21-feedback '+(good?"good":"bad")+'" role="status">'+
    '<strong>'+(good?"✓ Chính xác":retry?"Chưa đúng, thử lại nhé":"Chưa đúng. Xem lời giải bên dưới")+'</strong>'+
    (retry?
      '<p>'+esc(specific||"Kiểm tra lại dấu hiệu đảo ngữ trong câu.")+'</p>'+
      '<p class="g21-feedback-hint">'+esc(note.clue||"Hãy tìm cụm đứng đầu và thì của mệnh đề.")+'</p>':
      '<p class="g21-feedback-short">'+(good?"":'<b>Bạn chọn:</b> '+esc(selected)+'. ')+esc(note.rule||q.why)+'</p>'+
      '<details class="g21-more g21-explain-more"><summary>Xem lời giải chi tiết <span aria-hidden="true">⌄</span></summary>'+
      '<div class="g21-more-body">'+
      '<div class="g21-explanation-steps">'+
        '<div class="g21-reason-step"><b>1. Nhìn dấu hiệu trong câu</b><p>'+esc(note.clue||"Xác định từ đầu câu và thì cần dùng.")+'</p></div>'+
        '<div class="g21-reason-step"><b>2. Suy ra cách viết đúng</b><p>'+esc(note.rule||q.why)+'</p></div>'+
        '<div class="g21-reason-step"><b>3. Câu hoàn chỉnh / Đáp án đúng</b><p class="g21-solution-sentence">'+filledExample(q)+'</p></div>'+
      '</div><p class="g21-rule-reminder"><b>Quy tắc cần nhớ:</b> '+esc(q.why)+'</p>'+
      '<h4 class="g21-wrong-heading">Vì sao các đáp án khác sai?</h4>'+
      reasons.map(i=>'<div class="g21-choice-reason"><b>'+String.fromCharCode(65+optionOrder(q).indexOf(i))+'. '+esc(q.options[i])+'</b><p>'+esc(note.wrong?.[i]||q.wrong?.[i]||"Không đáp ứng cấu trúc cần dùng.")+'</p></div>').join("")+
      '</div></details>')+
  '</div>';
}
/* Balance correct positions within each quiz bank. Correct answers are fixed in
 * canonical data; only display positions move. This reduces letter-based guessing. */
function topic21Hash(value){
  let x=2166136261;
  const s=String(value);
  for(let i=0;i<s.length;i++)x=Math.imul(x^s.charCodeAt(i),16777619)>>>0;
  return x;
}
function optionOrder(q){
  const all=[...d.sections.flatMap(s=>s.checks),...d.practice,...d.mastery,...d.repairs,...d.review];
  const bank=q.id.charAt(0);
  const related=all.filter(x=>x.id.charAt(0)===bank)
    .sort((a,b)=>topic21Hash(userId+":"+a.id)-topic21Hash(userId+":"+b.id));
  const rank=related.findIndex(x=>x.id===q.id);
  const target=(rank+topic21Hash(userId+":"+bank)%4)%4;
  const distractors=[0,1,2,3].filter(x=>x!==q.correct);
  let seed=topic21Hash(q.id+":"+userId+":distractors");
  for(let i=distractors.length-1;i>0;i--){
    seed=(Math.imul(seed,1664525)+1013904223)>>>0;
    const j=seed%(i+1);
    const t=distractors[i];distractors[i]=distractors[j];distractors[j]=t;
  }
  const result=Array(4).fill(-1);
  result[target]=q.correct;
  let pos=0;
  for(let i=0;i<4;i++){if(i!==target)result[i]=distractors[pos++];}
  return result;
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
function guidedWizard(section){
  const questions=section.checks;
  const current=Math.max(0,Math.min(1,Number(state.guidedFocus[section.id])||0));
  const q=questions[current],done=Boolean(state.guided[q.id]?.correct),phase=state.guidedStages[q.id]===2||done?2:1;
  const clue=q.discovery;
  if(!clue)throw new Error("Missing reasoning prompt: "+q.id);
  const pick=state.guidedDiscovery[q.id];
  return '<section class="g21-teaching g21-quickchecks"><div class="g21-sectionhead"><h3>3. Luyện theo từng bước</h3><span>Câu '+(current+1)+' / '+questions.length+'</span></div>'+
    '<p class="g21-lead">Đầu tiên, tìm dấu hiệu ngữ pháp. Sau đó mới chọn đáp án. Mỗi lần chỉ làm một câu.</p>'+
    '<div class="g21-focus-progress"><span class="g21-focus-step'+(phase===1?" active":" done")+'">1 · Nhận diện</span><span class="g21-focus-step'+(phase===2?" active":"")+'">2 · Chọn đáp án</span></div>'+
    (phase===1?
      '<article class="g21-question g21-discovery" id="g21-discovery-'+esc(q.id)+'">'+
        '<div class="g21-qmeta"><span>STEP 1 · THINK FIRST</span></div>'+
        '<p class="g21-prompt">'+esc(clue.prompt)+'</p>'+
        '<div class="g21-options">'+clue.options.map((opt,i)=>
          '<button type="button" class="g21-option'+(pick===i?" selected":"")+'" data-g21="detect" data-id="'+q.id+'" data-index="'+i+'" aria-pressed="'+(pick===i)+'">'+
          '<span class="g21-letter">'+String.fromCharCode(65+i)+'</span><span>'+esc(opt)+'</span></button>'
        ).join("")+'</div>'+
        (Number.isInteger(pick)?'<p class="g21-discovery-note">'+
          (pick===clue.correct?"✓ Đúng. "+esc(clue.why):"Chưa đúng. "+esc(clue.why))+'</p>':"")+
        '<div class="g21-actions"><button type="button" class="g21-btn primary" data-g21="discovery-next" data-id="'+q.id+'"'+(pick!==clue.correct?" disabled":"")+'>Chọn đáp án →</button></div>'+
      '</article>':
      '<div class="g21-guided-final">'+question(q,current+1,"guided")+
      (done?'<div class="g21-actions">'+(current<questions.length-1?
         '<button class="g21-btn primary" data-g21="guided-next" data-section="'+esc(section.id)+'">Câu tiếp theo →</button>':
         '<span class="g21-done-inline">✓ Bạn đã hoàn thành '+questions.length+' câu của bài này.</span>')+'</div>':"")+
      '</div>')+
    (current>0?'<div class="g21-actions"><button class="g21-btn" data-g21="guided-prev" data-section="'+esc(section.id)+'">← Câu trước</button></div>':"")+
  '</section>';
}
function learn(){
  const s=d.sections[state.lesson],done=completeCount();
  return '<div class="g21-layout">'+side()+
    '<article class="g21-main g21-lesson">'+
      '<div class="g21-lesson-top"><span class="g21-label">BÀI '+String(state.lesson+1).padStart(2,"0")+' / '+String(d.sections.length).padStart(2,"0")+'</span>'+
        '<span class="g21-time">◷ '+s.minutes+' phút</span></div>'+
      '<h2>'+esc(s.title)+'</h2><p class="g21-lead">'+esc(s.outcome)+'</p>'+
      '<div class="g21-progress-track">'+progressHTML()+'</div>'+
      '<section class="g21-teaching"><div class="g21-sectionhead"><h3>1. Hiểu quy tắc</h3></div>'+
        '<div class="g21-note g21-concept"><b>HIỂU ĐƠN GIẢN</b><p>'+esc(s.concept)+'</p></div>'+
        '<div class="g21-note form"><b>CÔNG THỨC</b><p>'+esc(s.form)+'</p><small class="g21-form-legend">S = chủ ngữ · V = động từ · V3 = quá khứ phân từ</small></div>'+
        (s.vi?.meaning?'<p class="g21-quick-vi"><span>Ý NGHĨA CẤU TRÚC</span>'+esc(s.vi.meaning)+'</p>':"")+
        '<div class="g21-contrast"><b>CẦN PHÂN BIỆT</b><p>'+esc(s.contrast)+'</p></div>'+
      '</section>'+
      '<section class="g21-teaching"><div class="g21-sectionhead"><h3>2. Xem ví dụ đối chiếu</h3><span>3 ví dụ đầu · '+s.examples.length+' ví dụ tất cả</span></div>'+examples(s)+'</section>'+
       (s.extras?.length?'<details class="g21-more g21-supplement"><summary>Kiến thức bổ sung & trường hợp dễ nhầm ('+s.extras.length+') <span aria-hidden="true">⌄</span></summary>'+
       '<div class="g21-more-body">'+s.extras.map(x=>'<div class="g21-note g21-concept" style="margin-bottom:12px"><b>'+esc(x.title)+'</b><p>'+esc(x.rule)+'</p><p class="g21-solution-sentence" style="margin-top:7px">'+esc(x.example)+'</p>'+(x.vi?'<p class="g21-extra-meaning"><span>Nghĩa:</span> '+esc(x.vi)+'</p>':"")+'</div>').join("")+'</div></details>':"")+
      '<details class="g21-more"><summary>Xem cách suy luận và lỗi thường gặp <span aria-hidden="true">⌄</span></summary>'+
        '<div class="g21-more-body"><h3>Cách làm từng bước</h3><ol class="g21-rulelist">'+s.steps.map(x=>'<li>'+esc(x)+'</li>').join("")+'</ol>'+
          '<div class="g21-note warning"><b>Lỗi cần tránh</b><p>'+esc(s.misconception)+'</p></div></div></details>'+
      guidedWizard(s)+
      '<div class="g21-actions g21-lesson-actions"><button class="g21-btn" data-g21="prev"'+(state.lesson===0?" disabled":"")+'>← Bài trước</button>'+
        (state.lesson<d.sections.length-1?
          '<button class="g21-btn primary" data-g21="next">Bài tiếp theo →</button>':
          '<button class="g21-btn primary" data-g21="tab" data-tab="practice">Sang phần luyện tập →</button>')+
      '</div><p class="g21-foot">Đã hoàn thành '+done+'/'+d.sections.length+' bài. Tiến độ câu hỏi vẫn được giữ khi quay lại.</p>'+
    '</article></div>';
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
    checks:["Bỏ if nhưng giữ tính điều kiện","Had + I + received","Giữ would have attended"]},
  {id:"w3",task:"Rewrite using negative agreement: Lan has not finished her report. I have not finished mine either.",
    model:"Lan has not finished her report. Neither have I.",
    checks:["Câu đầu phủ định","Neither + have + I","Dùng trợ động từ của hiện tại hoàn thành"]},
  {id:"w4",task:"Begin with 'Only by': We discovered the mistake only by comparing the two versions.",
    model:"Only by comparing the two versions did we discover the mistake.",
    checks:["Only by + V-ing","did + we + discover","Giữ nghĩa 'chỉ bằng cách so sánh'"]}
];
function transfer(){
  return '<hr class="g21-divider"><div class="g21-sectionhead"><h3>Writing Transfer</h3><span class="g21-chip">Tự viết · Không chấm tự động</span></div>'+
   '<p class="g21-lead">Viết '+writing.length+' câu. Viết trước rồi đối chiếu với đáp án gợi ý; câu diễn đạt tương đương có thể đúng dù khác từng chữ.</p>'+
   writing.map((w,i)=>'<div class="g21-question"><div class="g21-qmeta">WRITING CHALLENGE '+(i+1)+'</div>'+
    '<p class="g21-prompt">'+esc(w.task)+'</p>'+
    '<textarea class="g21-fill" rows="3" style="min-height:86px;max-width:100%" data-g21-write="'+w.id+'" placeholder="Viết câu hoàn chỉnh bằng tiếng Anh...">'+esc(state.writes[w.id]||"")+'</textarea>'+
    '<div class="g21-actions"><button type="button" class="g21-btn" data-g21="write-reveal" data-id="'+w.id+'"'+(!(state.writes[w.id]||"").trim()?" disabled":"")+'>Đối chiếu bài làm</button></div>'+
    (state.writeReveals[w.id]?'<div class="g21-feedback"><strong>Model answer (không chấm máy)</strong><p>'+esc(w.model)+'</p><p><b>Checklist:</b></p><ul>'+w.checks.map(x=>'<li>'+esc(x)+'</li>').join("")+'</ul></div>':"")+
   '</div>').join("");
}
const EXAM_PAGE_SIZE=1;
function pageNav(kind,total){
  const count=Math.ceil(total/EXAM_PAGE_SIZE);
  const current=Math.max(0,Math.min(count-1,Number(state.pages?.[kind])||0));
  const question=(kind==="practice"?d.practice:kind==="mastery"?d.mastery:d.review)[current];
  const selected=Number.isInteger(state[kind]?.[question?.id]);
  const submitted=Boolean(state[kind+"Submitted"]);
  return '<nav class="g21-page-nav" aria-label="Điều hướng câu hỏi"><span>Câu '+(current+1)+' / '+count+'</span>'+
    '<div class="g21-page-controls">'+
      '<button class="g21-btn" data-g21="page" data-kind="'+kind+'" data-page="'+(current-1)+'"'+(current===0?" disabled":"")+'>← Trước</button>'+
      '<button class="g21-btn primary" data-g21="page" data-kind="'+kind+'" data-page="'+(current+1)+'"'+(current===count-1||(!selected&&!submitted)?" disabled":"")+'>Câu tiếp →</button>'+
    '</div></nav>';
}
function exam(kind){
  const master=kind==="mastery",items=master?d.mastery:d.practice;
  const picks=master?state.mastery:state.practice;
  const submitted=master?state.masterySubmitted:state.practiceSubmitted;
  const summary=getScores(items,picks);
  const page=Math.max(0,Math.min(Math.ceil(items.length/EXAM_PAGE_SIZE)-1,Number(state.pages?.[kind])||0));
  const start=page*EXAM_PAGE_SIZE;
  return '<article class="g21-main g21-assessment">'+
    '<span class="g21-label">'+(master?"KIỂM TRA CUỐI":"LUYỆN TẬP ĐỘC LẬP")+'</span>'+
    '<h2>'+(master?"Kiểm tra mức độ thành thạo":"Luyện tập vận dụng")+'</h2>'+
    '<p class="g21-lead">'+(master?
       items.length+" câu vận dụng chưa xuất hiện trong phần học. Chuẩn thử nghiệm: đúng từ "+Math.ceil(items.length*0.8)+"/"+items.length+" và đúng các kỹ năng cốt lõi (gồm So/Neither/Nor).":
       items.length+" câu hỏi trộn các nhóm kiến thức. Bạn tự làm trước; đáp án và giải thích chỉ hiện sau khi nộp.")+'</p>'+
    (!submitted?'<div class="g21-assessment-progress"><span>Đã trả lời <strong>'+summary.answered+'/'+summary.total+'</strong> câu</span>'+
      '<div class="g21-progress" aria-label="Đã trả lời '+summary.answered+' trên '+summary.total+' câu"><span style="width:'+Math.round(summary.answered/summary.total*100)+'%"></span></div></div>':
      scoreHeader(items,picks,kind))+
    (master&&submitted?'<div class="g21-note '+(isMastered()?"form":"warning")+'"><b>MASTERY STATUS</b>'+
       '<p>'+(isMastered()?"Đạt chuẩn thử nghiệm. Có thể chuyển sang phần ôn tập.":"Chưa đạt chuẩn thử nghiệm. Hãy vào Chữa lỗi để học lại các kỹ năng còn yếu.")+'</p></div>':"")+
    '<div class="g21-sectionhead g21-assessment-heading"><h3>Câu '+(start+1)+' / '+items.length+'</h3><span>Một câu mỗi lần</span></div>'+
    items.slice(start,start+EXAM_PAGE_SIZE).map((q,i)=>question(q,start+i+1,kind)).join("")+
    pageNav(kind,items.length)+
    '<div class="g21-actions g21-submit-actions">'+
      (!submitted?'<button class="g21-btn primary" data-g21="submit" data-kind="'+kind+'"'+(summary.answered!==items.length?' disabled title="Trả lời đủ câu trước khi nộp"':"")+'>Nộp bài và xem giải thích →</button>':
         '<button class="g21-btn primary" data-g21="tab" data-tab="clinic">Xem phân tích lỗi →</button>')+
      (master&&submitted?'<button class="g21-btn" data-g21="tab" data-tab="review">Lộ trình ôn tập →</button>':"")+
    '</div>'+
    (!master&&submitted?'<details class="g21-more g21-transfer"><summary>Thử thêm '+writing.length+' câu viết lại câu <span aria-hidden="true">⌄</span></summary><div class="g21-more-body">'+transfer()+'</div></details>':"")+
    '</article>';
}
function detectiveChallenge(q){
  const record=state.detective[q.id];
  const pick=record?.pick,solved=record?.solved===true;
  return '<article class="g21-question g21-detective" id="g21-'+q.id+'">'+
   '<div class="g21-qmeta"><span>ERROR DETECTIVE · FIND & FIX</span></div>'+
   '<p class="g21-prompt">Câu dưới đây có lỗi đảo ngữ. Hãy chọn cách viết đúng.</p>'+
   '<div class="g21-broken"><span>CÂU CÓ LỖI</span><p>'+esc(q.wrongSentence)+'</p></div>'+
   '<div class="g21-options g21-fix-options">'+q.choices.map((choice,i)=>
      '<button class="g21-option'+(pick===i?" selected":"")+'" type="button" data-g21="detective-answer" data-id="'+q.id+'" data-index="'+i+'" aria-pressed="'+(pick===i)+'"'+(solved?" disabled":"")+'>'+
      '<span class="g21-letter">'+String.fromCharCode(65+i)+'</span><span>'+esc(choice)+'</span></button>'
   ).join("")+'</div>'+
   (Number.isInteger(pick)?'<div class="g21-feedback '+(solved?"good":"bad")+'" role="status"><strong>'+
     (solved?"✓ Bạn đã sửa đúng lỗi!":"Chưa đúng — hãy thử cách sửa còn lại.")+'</strong>'+
     '<p>'+(solved?esc(q.why):esc(q.clues[0]))+'</p>'+
     (solved?'<details class="g21-more g21-explain-more"><summary>Xem cách phát hiện lỗi <span aria-hidden="true">⌄</span></summary><div class="g21-more-body"><ol class="g21-rulelist">'+q.clues.map(v=>'<li>'+esc(v)+'</li>').join("")+'</ol></div></details>':"")+
     '</div>':"")+
   '</article>';
}
function clinic(){
  const groups=scoreBySkill();
  if(!state.practiceSubmitted&&!state.masterySubmitted){
    return '<article class="g21-main"><span class="g21-label">CHỮA LỖI</span><h2>Tìm và sửa lỗi đảo ngữ</h2>'+
     '<p class="g21-lead">Hoàn thành Practice hoặc Mastery để hệ thống xác định nhóm lỗi và mở bài sửa lỗi tương ứng.</p>'+
     '<div class="g21-empty">Chưa có bài đã nộp để phân tích.</div>'+
     '<div class="g21-actions"><button class="g21-btn primary" data-g21="tab" data-tab="practice">Đến phần luyện tập →</button></div></article>';
  }
  const weak=groups.filter(x=>x.wrong.length>0).sort((a,b)=>a.correct/(a.total||1)-b.correct/(b.total||1));
  return '<article class="g21-main g21-clinic"><span class="g21-label">ERROR CLINIC · FIND & FIX</span>'+
    '<h2>Tìm lỗi, rồi tự sửa</h2>'+
    '<p class="g21-lead">Chỉ những nhóm kiến thức bạn trả lời sai mới được đưa ra luyện lại. Mở một nhóm để làm một câu sửa lỗi ngắn.</p>'+
    '<div class="g21-sectionhead"><h3>Tổng quan '+d.skills.length+' kỹ năng</h3></div>'+
    '<div class="g21-skill-list">'+groups.map(gr=>{
      const pct=gr.total?Math.round(100*gr.correct/gr.total):0;
      return '<div class="g21-skill"><div class="g21-skill-head"><h3>'+esc(gr.skill.title)+'</h3><span class="g21-pill">'+(gr.total?gr.correct+"/"+gr.total:"Chưa kiểm tra")+'</span></div>'+
       '<div class="g21-meter" aria-label="'+pct+' phần trăm đúng"><span style="width:'+pct+'%"></span></div></div>';
    }).join("")+'</div>'+
    '<div class="g21-sectionhead"><h3>Bài tập sửa lỗi</h3><span>'+weak.length+' nhóm cần ôn</span></div>'+
    (weak.length?weak.map(gr=>{
      const lesson=d.sections.findIndex(s=>s.id===gr.skill.id);
      const detective=d.detectives.find(x=>x.skill===gr.skill.id);
      return '<details class="g21-more g21-repair" data-g21-skill="'+esc(gr.skill.id)+'">'+
       '<summary><strong>'+esc(gr.skill.title)+'</strong><small>'+gr.wrong.length+' câu sai</small><span aria-hidden="true">⌄</span></summary>'+
       '<div class="g21-more-body"><p>'+esc(d.sections[lesson].misconception)+'</p>'+
       '<div class="g21-actions"><button class="g21-btn" data-g21="lesson" data-index="'+lesson+'">Xem lại bài '+(lesson+1)+' →</button></div>'+
       '<div class="g21-sectionhead"><h3>Repair question · Tìm và sửa lỗi</h3></div>'+
       (detective?detectiveChallenge(detective):"")+'</div></details>';
    }).join(""):'<div class="g21-empty">Chưa phát hiện lỗi trong những câu bạn đã nộp. Có thể tiếp tục sang Kiểm tra để thử sức với tình huống mới.</div>')+
   '</article>';
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
   '<div class="g21-sectionhead"><h3>Mini Retrieval Quiz</h3><span class="g21-chip">'+d.review.length+' câu · Bộ riêng</span></div>'+
   '<p class="g21-lead">Làm '+d.review.length+' câu không xem lại lý thuyết, sau đó kiểm tra các điểm còn sai. Đây là một vòng ôn tập mẫu, chưa tự tạo bộ câu hỏi khác nhau cho mỗi ngày.</p>'+
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
    '<div class="g21-statrow"><div class="g21-stat"><b>01/25</b>Chuyên đề mẫu</div><div class="g21-stat"><b>'+String(d.sections.length).padStart(2,"0")+'</b>Bài học nhỏ</div></div></div>'+
    '<div class="g21-card" style="padding:24px"><div class="g21-header"><span class="g21-label">TOPIC 21 · C1/C2 PRACTICE</span><span class="g21-chip">Pilot</span></div>'+
    '<h2 style="font-size:clamp(26px,4vw,36px);margin-bottom:8px">CHUYÊN ĐỀ 21. ĐẢO NGỮ – INVERSIONS</h2>'+
    '<p class="g21-lead">Từ cơ chế đảo trợ động từ đến điều kiện giả định, not until, hardly/no sooner, so/such và full inversion.</p>'+
    progressHTML()+
    '<div class="g21-statrow" style="margin-bottom:17px"><span class="g21-pill">'+d.sections.length+' lessons</span><span class="g21-pill">'+d.sections.flatMap(s=>s.checks).length+' Quick Checks</span><span class="g21-pill">'+d.practice.length+' Practice</span><span class="g21-pill">'+d.mastery.length+' Mastery</span></div>'+
    '<div class="g21-actions"><button class="g21-btn primary" data-g21="open">Bắt đầu từ Learn →</button>'+
    (state.masterySubmitted?'<span class="g21-pill">Mastery '+sc.correct+'/'+d.mastery.length+'</span>':"")+'</div></div>'+
    '<p class="g21-foot">Không có Diagnostic Test. Nội dung đang ở khu vực giáo viên và chưa được xuất bản cho học sinh.</p>';
}
function render(preserveScroll){
  if(!state)return;
  const y=preserveScroll?window.scrollY:0;
  const opened=preserveScroll&&state.tab==="clinic"&&mount.querySelectorAll?
    [...mount.querySelectorAll(".g21-repair[open]")].map(node=>node.getAttribute("data-g21-skill")):[];
  mount.style.display="block";
  mount.innerHTML='<div class="g21">'+(location.hash.replace(/^#/,"")==="teacher/grammar"?
    home():topbar()+hero()+tabs()+
    (state.tab==="learn"?learn():state.tab==="practice"?stageFrame("practice",exam("practice")):state.tab==="clinic"?stageFrame("clinic",clinic()):state.tab==="mastery"?stageFrame("mastery",exam("mastery")):stageFrame("review",review()))+
    '<p class="g21-foot">Sources: <a href="https://dictionary.cambridge.org/grammar/british-grammar/inversion" target="_blank" rel="noopener noreferrer">Cambridge Grammar · Inversion</a> · <a href="https://learnenglish.britishcouncil.org/free-resources/grammar/c1/inversion-after-negative-adverbials" target="_blank" rel="noopener noreferrer">British Council · Negative adverbials</a>. Điểm và tiến độ bản thử nghiệm lưu cục bộ theo tài khoản, chưa đồng bộ trên các thiết bị.</p>')+'</div>';
  if(opened.length&&mount.querySelectorAll){
    mount.querySelectorAll(".g21-repair").forEach(node=>{if(opened.includes(node.getAttribute("data-g21-skill")))node.open=true;});
  }
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
  if(a==="detect"){
    const q=answersById[btn.dataset.id],pick=Number(btn.dataset.index);
    if(!q?.discovery||![0,1].includes(pick)||state.guidedStages[q.id]===2||state.guided[q.id]?.correct)return;
    state.guidedDiscovery[q.id]=pick;save();render(true);return;
  }
  if(a==="discovery-next"){
    const q=answersById[btn.dataset.id];
    if(!q?.discovery||state.guidedDiscovery[q.id]!==q.discovery.correct)return;
    state.guidedStages[q.id]=2;save();render(true);return;
  }
  if(a==="guided-next"||a==="guided-prev"){
    const sid=btn.dataset.section,section=d.sections.find(x=>x.id===sid);
    if(!section)return;
    const oldIndex=Math.max(0,Math.min(1,Number(state.guidedFocus[sid])||0));
    if(a==="guided-next"&&!section.checks[oldIndex]?.id)return;
    if(a==="guided-next"&&!state.guided[section.checks[oldIndex].id]?.correct)return;
    state.guidedFocus[sid]=a==="guided-next"?1:0;
    save();render(true);
    mount.querySelector?.(".g21-quickchecks")?.scrollIntoView?.({block:"start"});
    return;
  }
  if(a==="detective-answer"){
    const q=d.detectives.find(x=>x.id===btn.dataset.id),pick=Number(btn.dataset.index);
    if(!q||![0,1].includes(pick)||state.detective[q.id]?.solved)return;
    const old=state.detective[q.id];
    state.detective[q.id]={pick:pick,solved:pick===q.correct,attempts:(old?.attempts||0)+1};
    save();render(true);return;
  }
  if(a==="prev"||a==="next"){state.lesson=Math.min(d.sections.length-1,Math.max(0,state.lesson+(a==="next"?1:-1)));save();render(false);return;}
  if(a==="jump"){
    const kind=btn.dataset.kind,items=kind==="practice"?d.practice:kind==="mastery"?d.mastery:null;
    if(!items)return;
    const n=Number(btn.dataset.page);
    if(!Number.isInteger(n)||n<0||n>=items.length)return;
    if(!state[kind+"Submitted"]&&!Number.isInteger(state[kind]?.[items[n].id])&&n!==(Number(state.pages[kind])||0))return;
    state.pages[kind]=n;save();render(false);return;
  }
  if(a==="page"){
    const kind=btn.dataset.kind;
    const allowed={practice:d.practice.length,mastery:d.mastery.length,review:d.review.length};
    if(!Object.prototype.hasOwnProperty.call(allowed,kind))return;
    const next=Number(btn.dataset.page),count=Math.ceil(allowed[kind]/EXAM_PAGE_SIZE);
    if(!Number.isInteger(next)||next<0||next>=count)return;
    const current=Math.max(0,Math.min(count-1,Number(state.pages[kind])||0));
    const question=(kind==="practice"?d.practice:kind==="mastery"?d.mastery:d.review)[current];
    if(next>current&&!state[kind+"Submitted"]&&!Number.isInteger(state[kind]?.[question?.id]))return;
    state.pages[kind]=next;save();render(false);return;
  }
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
