let schoolSession=null;

function schoolReviewData(){
  return window.SCHOOL_G10_MIDTERM1||null;
}
const SCHOOL_MIDTERM1_SETS={
  1:{start:0,end:12,title:"Phát âm & Trọng âm"},
  2:{start:12,end:27,title:"Grammar"},
  3:{start:27,end:39,title:"Communication & Vocabulary"},
  4:{start:39,end:51,title:"Advertisement Cloze"},
  5:{start:51,end:66,title:"Reading Cloze"},
  6:{start:66,end:81,title:"Word Form"},
  7:{start:81,end:96,title:"Sentence Transformation"}
};
function schoolSetItems(setNo){
  const data=schoolReviewData();
  const config=SCHOOL_MIDTERM1_SETS[Number(setNo)];
  if(!data||!config)return [];
  return data.items.slice(config.start,config.end);
}
function schoolSetTopic(setNo){
  return SCHOOL_MIDTERM1_SETS[Number(setNo)]?.title||"Ôn tập";
}
function schoolText(value){
  return esc(value??"").replace(/\n/g,"<br>");
}
function schoolPlain(value){
  return String(value??"").replace(/<[^>]*>/g,"");
}
function schoolExpected(item){
  if(item.kind==="mcq")return `${"ABCD"[item.a]}. ${schoolPlain(item.o[item.a])}`;
  return item.answers?.[0]||"";
}
function normalizeSchoolAnswer(value){
  return String(value??"")
    .toLowerCase()
    .replace(/[’‘]/g,"'")
    .replace(/[“”]/g,'"')
    .replace(/[.,!?;:]+$/g,"")
    .replace(/\s+/g," ")
    .trim();
}
function renderSchoolHome(){
  const data=schoolReviewData();
  pageMount.style.display="block";
  pageMount.innerHTML=`
    <div class="hero">
      <div class="eyebrow">Học trên trường · School</div>
      <h1><span class="gradient">Chọn lớp học.</span></h1>
    </div>
    <div class="section-title"><h2>Lớp học</h2><span><button class="crumb-btn" onclick="forgetAreaAccess('school')">Quên quyền trên máy này</button></span></div>
    <div class="units">
      <button class="unit-card" onclick="location.hash='school/grade-10'">
        <div class="unit-top"><span class="unit-no">GRADE 10</span><span class="status live">Available</span></div>
        <h3>Lớp 10</h3>
        <p>${data?esc(data.title):"Ôn tập trên trường"}</p>
        <span class="unit-arrow">→</span>
      </button>
    </div>`;
  window.scrollTo({top:0,behavior:"smooth"});
}
function renderSchoolGrade10(){
  const data=schoolReviewData();
  if(!data){location.hash="school";return}
  pageMount.style.display="block";
  pageMount.innerHTML=`
    <div class="breadcrumbs"><button class="crumb-btn" onclick="location.hash='school'">Home</button><span>›</span><span>Lớp 10</span></div>
    <div class="unit-hero">
      <div class="eyebrow">School · Grade 10</div>
      <h1>Lớp 10</h1>
    </div>
    <div class="section-title"><h2>Ôn tập</h2><span>1 mục</span></div>
    <div class="exercise-grid">
      <button class="exercise-card" onclick="location.hash='school/grade-10/midterm-1'">
        <div class="exercise-icon">1</div>
        <h3>${esc(data.title)}</h3>
        <div class="meta">
          <span class="chip">${data.items.length} questions</span>
          <span class="chip">7 sets</span>
          <span class="chip">${esc(data.subtitle)}</span>
          <span class="chip">Immediate feedback</span>
        </div>
      </button>
    </div>`;
  window.scrollTo({top:0,behavior:"smooth"});
}
function renderSchoolMidterm1(){
  const data=schoolReviewData();
  if(!data){location.hash="school/grade-10";return}
  pageMount.style.display="block";
  const cards=Array.from({length:7},(_,i)=>{
    const setNo=i+1,items=schoolSetItems(setNo);
    return `
      <button class="exercise-card" onclick="location.hash='school/grade-10/midterm-1/set-${setNo}'">
        <div class="exercise-icon">${setNo}</div>
        <h3>Set ${setNo}</h3>
        <div class="meta">
          <span class="chip">${items.length} questions</span>
          <span class="chip">${esc(schoolSetTopic(setNo))}</span>
          <span class="chip">Immediate feedback</span>
        </div>
      </button>`;
  }).join("");
  pageMount.innerHTML=`
    <div class="breadcrumbs">
      <button class="crumb-btn" onclick="location.hash='school'">Home</button><span>›</span>
      <button class="crumb-btn" onclick="location.hash='school/grade-10'">Lớp 10</button><span>›</span>
      <span>${esc(data.title)}</span>
    </div>
    <div class="unit-hero">
      <div class="eyebrow">Lớp 10 · ${esc(data.schoolYear)}</div>
      <h1>${esc(data.title)}</h1>
      <div class="meta">
        <span class="chip">${data.items.length} questions</span>
        <span class="chip">${esc(data.subtitle)}</span>
      </div>
    </div>
    <div class="section-title"><h2>Sets</h2><span>7 sets · chia theo dạng bài</span></div>
    <div class="exercise-grid">${cards}</div>`;
  window.scrollTo({top:0,behavior:"smooth"});
}
function renderSchoolSetIntro(setNo){
  const data=schoolReviewData();
  const items=schoolSetItems(setNo);
  if(!data||!items.length){location.hash="school/grade-10/midterm-1";return}
  schoolSession=null;
  pageMount.style.display="block";
  pageMount.innerHTML=`
    <div class="breadcrumbs">
      <button class="crumb-btn" onclick="location.hash='school'">Home</button><span>›</span>
      <button class="crumb-btn" onclick="location.hash='school/grade-10'">Lớp 10</button><span>›</span>
      <button class="crumb-btn" onclick="location.hash='school/grade-10/midterm-1'">${esc(data.title)}</button><span>›</span>
      <span>Set ${setNo}</span>
    </div>
    <div class="exercise-intro">
      <div class="eyebrow">Lớp 10 · ${esc(data.title)} · Set ${setNo}</div>
      <h1><span class="gradient">Set ${setNo}</span></h1>
      <div class="pills">
        <span class="pill">${items.length} questions</span>
        <span class="pill">${esc(schoolSetTopic(setNo))}</span>
        <span class="pill">Immediate feedback</span>
        <span class="pill">First-try accuracy</span>
      </div>
      <button class="primary" onclick="startSchoolQuiz(${setNo})">Start exercise →</button>
    </div>`;
  window.scrollTo({top:0,behavior:"smooth"});
}
function startSchoolQuiz(setNo){
  const items=schoolSetItems(setNo);
  if(!items.length)return;
  schoolSession={
    setNo:Number(setNo),
    items,
    current:0,
    solved:Array(items.length).fill(false),
    mistakes:Array(items.length).fill(0),
    wrongChoices:Array.from({length:items.length},()=>new Set()),
    drafts:Array(items.length).fill(""),
    lastWrong:Array(items.length).fill(false)
  };
  renderSchoolQuestion();
}
function renderSchoolQuestion(){
  if(!schoolSession)return;
  const s=schoolSession,q=s.items[s.current],solved=s.solved[s.current];
  const progressPct=((s.current+1)/s.items.length*100);
  const context=q.ctx?schoolReviewData()?.contexts?.[q.ctx]:"";
  const feedback=solved
    ? `<div class="feedback correct standard-feedback">
        <div class="feedback-title">✓ Đúng — ${esc(schoolExpected(q))}</div>
        <div class="deep-grid">
          <div class="deep-box"><b>Đáp án</b><span>${esc(schoolExpected(q))}</span></div>
          <div class="deep-box wide"><b>Giải thích</b><span>${esc(q.note||"")}</span></div>
        </div>
      </div>`
    : s.lastWrong[s.current]
      ? `<div class="feedback wrong"><div class="feedback-title">✕ Sai — hãy thử lại</div></div>`
      : "";

  let answerHTML="";
  if(q.kind==="mcq"){
    answerHTML=`<div class="answers">${
      q.o.map((opt,i)=>{
        const correct=solved&&i===q.a;
        const wrong=s.wrongChoices[s.current].has(i);
        const optionText=q.rich?opt:esc(opt);
        return `<button class="answer ${correct?"correct":wrong?"wrong-choice":""}" onclick="checkSchoolMcq(${i})" ${solved||wrong?"disabled":""}>
          <span class="letter">${"ABCD"[i]}</span><span>${optionText}</span>
        </button>`;
      }).join("")
    }</div>`;
  }else{
    const value=solved?schoolExpected(q):s.drafts[s.current];
    const border=s.lastWrong[s.current]&&!solved?"border-color:rgba(251,113,133,.78);":"";
    answerHTML=`
      <div class="nickname-box" style="max-width:none;margin:0">
        <label for="schoolAnswerInput">Nhập đáp án</label>
        <input id="schoolAnswerInput" autocomplete="off" value="${esc(value)}" ${solved?"disabled":""} style="${border}">
      </div>
      ${solved?"":'<button class="primary" style="margin-top:12px" onclick="checkSchoolInput()">Kiểm tra</button>'}`;
  }

  pageMount.style.display="block";
  pageMount.innerHTML=`
    <div data-school-quiz="1">
      <div class="breadcrumbs">
        <button class="crumb-btn" onclick="location.hash='school'">Home</button><span>›</span>
        <button class="crumb-btn" onclick="location.hash='school/grade-10'">Lớp 10</button><span>›</span>
        <button class="crumb-btn" onclick="location.hash='school/grade-10/midterm-1'">Ôn tập giữa kì 1</button><span>›</span>
        <button class="crumb-btn" onclick="location.hash='school/grade-10/midterm-1/set-${s.setNo}'">Set ${s.setNo}</button>
      </div>
      <div class="quiz-top" style="padding:0 0 20px;border:0">
        <div class="progress-track"><div class="progress" style="width:${progressPct}%"></div></div>
        <div class="counter">${s.current+1} / ${s.items.length}</div>
      </div>
      <div class="question-card">
        <div class="kicker"><span class="qnum">CÂU ${esc(q.sourceNo)}</span><span>${esc(q.section)}</span></div>
        ${context?`<div class="deep-box wide" style="margin-bottom:18px"><b>Đoạn văn / ngữ cảnh</b><span style="white-space:normal">${schoolText(context)}</span></div>`:""}
        <h2 class="question">${schoolText(q.q)}</h2>
        ${answerHTML}
        <div id="feedbackMount">${feedback}</div>
        <div class="nav">
          <button class="secondary" onclick="moveSchoolQuestion(-1)" ${s.current===0?"disabled":""}>← Previous</button>
          ${solved
            ? (s.current===s.items.length-1
                ? '<button class="primary" onclick="finishSchoolQuiz()">Finish ✓</button>'
                : '<button class="primary" onclick="moveSchoolQuestion(1)">Next →</button>')
            : '<span class="next-lock">Trả lời đúng để tiếp tục →</span>'}
        </div>
      </div>
    </div>`;

  if(q.kind==="input"&&!solved){
    const inp=document.getElementById("schoolAnswerInput");
    inp?.focus();
    inp?.addEventListener("input",()=>{if(schoolSession)schoolSession.drafts[schoolSession.current]=inp.value});
    inp?.addEventListener("keydown",e=>{if(e.key==="Enter")checkSchoolInput()});
  }
  window.scrollTo({top:0,behavior:"smooth"});
}
function checkSchoolMcq(i){
  const s=schoolSession;
  if(!s)return;
  const q=s.items[s.current];
  if(q.kind!=="mcq"||s.solved[s.current])return;
  if(i===q.a){
    s.solved[s.current]=true;
    s.lastWrong[s.current]=false;
  }else{
    s.mistakes[s.current]++;
    s.wrongChoices[s.current].add(i);
    s.lastWrong[s.current]=true;
  }
  renderSchoolQuestion();
  if(s.solved[s.current])document.querySelector(".feedback.correct")?.scrollIntoView({behavior:"smooth",block:"nearest"});
}
function checkSchoolInput(){
  const s=schoolSession;
  if(!s)return;
  const q=s.items[s.current];
  if(q.kind!=="input"||s.solved[s.current])return;
  const inp=document.getElementById("schoolAnswerInput");
  const value=(inp?.value||"").trim();
  s.drafts[s.current]=value;
  const normalized=normalizeSchoolAnswer(value);
  const ok=(q.answers||[]).some(ans=>normalizeSchoolAnswer(ans)===normalized);
  if(ok){
    s.solved[s.current]=true;
    s.lastWrong[s.current]=false;
  }else{
    s.mistakes[s.current]++;
    s.lastWrong[s.current]=true;
  }
  renderSchoolQuestion();
  if(s.solved[s.current])document.querySelector(".feedback.correct")?.scrollIntoView({behavior:"smooth",block:"nearest"});
}
function moveSchoolQuestion(step){
  const s=schoolSession;
  if(!s)return;
  if(step>0&&!s.solved[s.current])return;
  const next=s.current+step;
  if(next<0||next>=s.items.length)return;
  s.current=next;
  renderSchoolQuestion();
}
function finishSchoolQuiz(){
  const s=schoolSession;
  if(!s||s.solved.some(x=>!x))return;
  const firstTry=s.mistakes.filter(x=>x===0).length;
  const totalMistakes=s.mistakes.reduce((a,b)=>a+b,0);
  const pct=Math.round(firstTry/s.items.length*100);
  const review=s.items.map((q,i)=>`
    <div class="review-item correct">
      <div class="review-q">${esc(q.sourceNo)}. ${schoolText(q.q)}</div>
      <div class="review-meta">
        <span class="tag good">Đáp án: ${esc(schoolExpected(q))}</span>
        <span class="tag">${s.mistakes[i]===0?"Đúng ngay lần đầu":`${s.mistakes[i]} lần sai trước khi đúng`}</span>
      </div>
      <div class="explain">${esc(q.note||"")}</div>
    </div>`).join("");

  pageMount.style.display="block";
  pageMount.innerHTML=`
    <div class="breadcrumbs">
      <button class="crumb-btn" onclick="location.hash='school'">Home</button><span>›</span>
      <button class="crumb-btn" onclick="location.hash='school/grade-10'">Lớp 10</button><span>›</span>
      <button class="crumb-btn" onclick="location.hash='school/grade-10/midterm-1'">Ôn tập giữa kì 1</button><span>›</span>
      <span>Set ${s.setNo} Result</span>
    </div>
    <div class="score-wrap">
      <div class="score-ring" style="background:conic-gradient(var(--accent2) ${pct*3.6}deg,rgba(255,255,255,.08) 0deg)">
        <div class="score-inner"><div class="score-big">${pct}%</div><div class="score-label">first-try accuracy</div></div>
      </div>
      <div>
        <div class="eyebrow">Hoàn thành Set ${s.setNo}</div>
        <h2 style="font-size:36px;margin:10px 0 8px">Đã hoàn thành toàn bộ câu hỏi.</h2>
        <div class="stats">
          <div class="stat"><b>${s.items.length}</b><span>Mastered</span></div>
          <div class="stat"><b>${totalMistakes}</b><span>Total mistakes</span></div>
          <div class="stat"><b>${firstTry}</b><span>First-try correct</span></div>
        </div>
        <button class="primary" onclick="startSchoolQuiz(${s.setNo})">Làm lại set</button>
        <button class="secondary" style="margin-left:8px" onclick="location.hash='school/grade-10/midterm-1'">Về Ôn tập giữa kì 1</button>
      </div>
    </div>
    <div class="review"><h3>Answer review</h3><div class="review-list">${review}</div></div>`;
  if(pct>=75)confetti();
  window.scrollTo({top:0,behavior:"smooth"});
}
