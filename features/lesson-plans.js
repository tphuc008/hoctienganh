/* Grade 12 Lesson Plans & Practice — live lesson pages (no sample content or answers).
 * Published lessons/MCQs are loaded from the public lesson catalog.
 * Answer keys must never be stored in this repository. Supabase RLS enforces teacher/unlock access.
 */
(function(global){
  "use strict";
  const HOME="grade-12/lesson-plans";
  const mount=document.getElementById("pageMount");
  let unitId=7,page="lesson",accessRequestId=0,access={loading:false,teacher:false,unlocked:false,solutions:null,error:""},
    mcqCount=0,readingCount=0,quiz=null,printMode="questions",
    originalAnswers={},printOpenedPreview=false;
  const catalog=global.LessonPlanCatalog;
  function esc(v){return String(v==null?"":v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
  function docLink(input){
    try{const u=new URL(input);return u.protocol==="https:"&&u.hostname==="docs.google.com"&&/^\/document\/d\/[^/]+/.test(u.pathname)?u.href:"";}
    catch(_){return ""}
  }
  function getUnit(n){return (catalog?.units||[]).find(u=>Number(u.id)===Number(n))||null}
  function bank(u){
    const p=u.practicePublished?u.practice||{}:{};
    const mcqs=Array.isArray(p.mcqs)?p.mcqs.filter(validQ):[];
    const passages=Array.isArray(p.passages)?p.passages.filter(v=>v&&typeof v.passage==="string"&&Array.isArray(v.questions)&&v.questions.length===5&&v.questions.every(validQ)):[];
    return {mcqs,passages};
  }
  function validQ(q){return q&&typeof q.id==="string"&&typeof q.text==="string"&&Array.isArray(q.options)&&q.options.length===4&&q.options.every(v=>typeof v==="string")}
  function nav(path,label){return '<button class="crumb-btn" type="button" data-lp-route="'+esc(path)+'">'+esc(label)+'</button>'}
  function home(){
    mount.style.display="block";
    const units=catalog?.units||[];
    mount.innerHTML='<div class="breadcrumbs">'+nav("grade-12","Lớp 12")+'<span>›</span><span>Lesson Plans &amp; Practice</span></div>'+
      '<div class="unit-hero lp-hero"><div class="eyebrow">Grade 12</div><h1>Lesson Plans <span class="gradient">&amp; Practice</span></h1>'+
      '<p>Google Docs bài học, lời giải được kiểm soát và ngân hàng luyện tập sau buổi học.</p></div>'+
      '<div class="section-title"><h2>Lesson Units</h2><span>'+units.length+' Unit</span></div>'+
      (units.length?'<div class="units lp-units">'+units.map(u=>{
        const b=bank(u),ready=Boolean(u.lessonPublished&&docLink(u.docUrl));
        return '<button type="button" class="unit-card lp-unit-card" data-lp-route="'+HOME+'/unit-'+Number(u.id)+'">'+
          '<div class="unit-top"><span class="unit-no">UNIT '+String(u.id).padStart(2,"0")+'</span>'+
          '<span class="status '+(ready?"live":"")+'">'+(ready?"Lesson available":"Đang chuẩn bị")+'</span></div>'+
          '<h3>'+esc(u.title||"Unit "+u.id)+'</h3>'+
          '<p>'+(u.description?esc(u.description):"Google Docs · Lời giải · After-class Practice")+'</p>'+
          '<div class="lp-unit-meta"><span>'+b.mcqs.length+' MCQs</span><span>'+b.passages.length+' readings</span></div>'+
          '<span class="unit-arrow" aria-hidden="true">→</span></button>';
      }).join("")+'</div>':'<div class="empty"><b>Chưa có Unit</b>Nội dung sẽ được thêm khi giáo viên xuất bản.</div>');
    global.scrollTo(0,0);
  }
  function unitRoute(u,sectionId){
    const base=HOME+"/unit-"+Number(u.id);
    return sectionId==="lesson"?base:base+"/"+sectionId;
  }
  function pageLink(u,sectionId,label){
    const active=page===sectionId;
    return '<a class="'+(active?"is-active":"")+'" href="#'+esc(unitRoute(u,sectionId))+'"'+
      (active?' aria-current="page"':"")+'>'+label+'</a>';
  }
  function head(u){
    const url=docLink(u.docUrl),original=Array.isArray(u.originalExercises)?u.originalExercises.length:0;
    const sectionName={lesson:"Bài học & câu hỏi",practice:"Luyện tập thêm",print:"In đề"}[page]||"Bài học";
    return '<div class="breadcrumbs">'+nav("grade-12","Lớp 12")+'<span>›</span>'+
      nav(HOME,"Lesson Plans & Practice")+'<span>›</span>'+
      nav(unitRoute(u,"lesson"),u.title||"Unit "+u.id)+'<span>›</span><span>'+sectionName+'</span></div>'+
      '<div class="lp-preview-hero lp-inline-hero"><div class="lp-preview-headline"><div>'+
      '<div class="lp-eyebrow">GRADE 12 / UNIT '+String(u.id).padStart(2,"0")+'</div>'+
      '<h1>'+esc(u.title||"Unit "+u.id)+'</h1>'+
      '<p>'+sectionName+' · '+original+' câu hỏi gốc · Lời giải có kiểm soát</p></div>'+
      (url?'<a class="lp-inline-doc-link" target="_blank" rel="noopener noreferrer" href="'+esc(url)+'" aria-label="Mở tài liệu gốc Google Docs">📄 Google Docs ↗</a>':"")+
      '</div></div>'+
      '<nav class="lp-page-nav" aria-label="Ba trang của bài học">'+
      pageLink(u,"lesson","01 · Bài học & câu hỏi")+
      pageLink(u,"practice","02 · Luyện tập thêm")+
      pageLink(u,"print","03 · In đề")+'</nav>';
  }
  function pageFooter(u){
    const ids=["lesson","practice","print"],index=ids.indexOf(page);
    const previous=index>0?ids[index-1]:null,next=index<ids.length-1?ids[index+1]:null;
    const labels={lesson:"Bài học & câu hỏi",practice:"Luyện tập thêm",print:"In đề"};
    return '<div class="lp-page-footer">'+
      (previous?'<a href="#'+esc(unitRoute(u,previous))+'">← '+labels[previous]+'</a>':'<span></span>')+
      (next?'<a href="#'+esc(unitRoute(u,next))+'">'+labels[next]+' →</a>':'<span></span>')+'</div>';
  }
  function section(tag,title,detail){
    return '<div class="lp-preview-section-head"><div><div class="lp-eyebrow">'+tag+'</div><h2>'+title+
      '</h2><p>'+detail+'</p></div></div>';
  }
  function accessAllowed(){
    return !access.loading&&!access.error&&(access.teacher||access.unlocked)&&Array.isArray(access.solutions);
  }
  function solutionStatus(){
    const allowed=accessAllowed();
    const status=access.loading?"Đang kiểm tra quyền xem lời giải…":
      access.error?"Không thể kiểm tra quyền: "+esc(access.error):
      allowed?"Lời giải đã sẵn sàng":"Lời giải hiện đang khóa";
    return '<aside class="lp-inline-access" aria-label="Trạng thái lời giải">'+
      '<div><strong>'+(allowed?"🔓 ":"🔒 ")+status+'</strong><p>'+
      (allowed?"Nhấn “Xem lời giải” ngay dưới từng câu để đọc phân tích A–D.":
        "Vẫn có thể đọc và làm toàn bộ câu hỏi. Giáo viên sẽ mở khóa lời giải khi phù hợp.")+
      '</p></div><div class="lp-inline-access-actions">'+
      (access.teacher?'<button type="button" class="lp-action lp-teacher-toggle" data-lp-unlock="'+(!access.unlocked)+'">'+
        (access.unlocked?"🔒 Khóa lời giải":"🔓 Mở lời giải cho học sinh")+'</button>':"")+
      (!access.loading?'<button class="lp-refresh" type="button" data-lp-refresh="1">Kiểm tra quyền</button>':"")+
      '</div></aside>';
  }
  function originalQuestion(q,n){
    let prompt=esc(q.text);
    if(q.target){const at=prompt.indexOf(esc(q.target));if(at>=0)prompt=prompt.slice(0,at)+'<u>'+esc(q.target)+'</u>'+prompt.slice(at+esc(q.target).length);}
    const opts=q.options.map((opt,j)=>
      '<label class="lp-inline-option"><input type="radio" name="lp-original-'+esc(q.id)+'" data-lp-original-answer="'+esc(q.id)+'" value="'+j+'" '+
      (originalAnswers[q.id]===j?"checked":"")+'/><span><b>'+String.fromCharCode(65+j)+'.</b> '+esc(opt)+'</span></label>').join("");
    const k=accessAllowed()?getKey(q.id):null;
    let explanation='<div class="lp-inline-locked-note">🔒 Lời giải sẽ xuất hiện tại đây khi giáo viên mở khóa.</div>';
    if(accessAllowed()){
      explanation=k?'<details class="lp-inline-answer"><summary>📖 Xem lời giải chi tiết · Câu '+n+'</summary>'+
        '<div class="lp-inline-answer-body"><p><b>Đáp án: '+String.fromCharCode(65+k.correctIndex)+
        (k.choices?.[k.correctIndex]?.label?" — "+esc(k.choices[k.correctIndex].label):"")+'</b></p>'+
        (k.correctMeaning?'<p><b>Nghĩa:</b> '+esc(k.correctMeaning)+'</p>':"")+
        (k.why?'<p><b>Vì sao chọn đáp án này?</b> '+esc(k.why)+'</p>':"")+
        (Array.isArray(k.choices)?k.choices.map((choice,j)=>
          '<div class="lp-explain-row"><strong>'+String.fromCharCode(65+j)+'. '+esc(choice.label||q.options[j]||"")+
          '</strong><span>'+esc(choice.explanation||"")+'</span></div>').join(""):"")+
        (k.examples?'<p class="lp-examples">'+esc(k.examples)+'</p>':"")+
        '</div></details>':'<div class="lp-inline-locked-note">Chưa có lời giải khớp với ID câu hỏi này.</div>';
    }
    return '<article class="lp-inline-question" id="lp-question-'+n+'"><div class="lp-inline-question-number">QUESTION '+String(n).padStart(2,"0")+'</div>'+
      '<p class="lp-inline-prompt"><b>'+n+'.</b> '+prompt+'</p><div class="lp-inline-options">'+opts+'</div>'+explanation+'</article>';
  }
  function lesson(u){
    const items=u.lessonPublished&&Array.isArray(u.originalExercises)?u.originalExercises.filter(validQ):[];
    const groups=[
      ["context","PART I · Vocabulary in Context","Chọn đáp án A, B, C hoặc D phù hợp nhất với ngữ cảnh."],
      ["closest","PART II · Closest in Meaning","Chọn từ hoặc cụm từ gần nghĩa nhất với phần được gạch chân."],
      ["opposite","PART III · Opposite in Meaning","Chọn từ hoặc cụm từ trái nghĩa với phần được gạch chân."]
    ];
    return section("01 / ORIGINAL STUDENT HANDOUT","Bài học & bài tập gốc",
      "Nội dung được đưa trực tiếp từ tài liệu Unit 7 lên website. Chọn đáp án và mở lời giải ngay tại từng câu khi có quyền truy cập.")+
      solutionStatus()+
      (items.length?'<div class="lp-inline-groups">'+groups.map(([id,title,note])=>{
        const subset=items.filter(q=>q.part===id);
        return subset.length?'<section class="lp-inline-group"><div class="lp-inline-group-heading"><h3>'+title+'</h3><p>'+note+'</p></div>'+
          subset.map(q=>originalQuestion(q,Number(q.id.slice(-2)))).join("")+'</section>':"";
      }).join("")+'</div>':
        '<div class="lp-note">Nội dung bài học trực tiếp chưa được xuất bản cho Unit này. Giáo viên đang chuẩn bị tài liệu.</div>');
  }
  function choices(u){
    const b=bank(u),m=b.mcqs.length,p=b.passages.length;
    if(!m&&!p)return '<div class="lp-solution-locked"><div class="lp-lock-icon">📝</div>'+
      '<h3>Chưa có bài tập sau buổi học</h3><p>Khi giáo viên yêu cầu đọc lại Google Docs và comments, bài tập được tạo và xuất bản tại đây.</p></div>';
    mcqCount=Math.min(Math.max(0,mcqCount),m);
    readingCount=Math.min(Math.max(0,readingCount),p);
    return '<div class="lp-practice-settings"><div><h3>Chọn số lượng bài tập</h3>'+
      '<label for="lpMcqCount">Multiple Choice ('+m+' câu có sẵn)</label>'+
      '<select id="lpMcqCount" class="lp-count-select" data-lp-input="mcq">'+
      Array.from({length:m+1},(_,i)=>'<option value="'+i+'" '+(i===mcqCount?"selected":"")+'>'+i+' câu</option>').join("")+'</select>'+
      '<label for="lpReadingCount">Reading ('+p+' passages có sẵn)</label>'+
      '<select id="lpReadingCount" class="lp-count-select" data-lp-input="reading">'+
      Array.from({length:p+1},(_,i)=>'<option value="'+i+'" '+(i===readingCount?"selected":"")+'>'+i+' passages</option>').join("")+'</select>'+
      '<div style="margin-top:15px"><button class="lp-action lp-start" type="button" data-lp-start="1" '+
      (!(mcqCount+readingCount)?"disabled":"") +'>Bắt đầu làm bài →</button></div></div>'+
      '<div class="lp-practice-total"><span>TỔNG SỐ CÂU ĐƯỢC CHỌN</span><strong>'+ (mcqCount+readingCount*5) +
      '</strong><span>'+mcqCount+' ABCD + '+readingCount+' passages × 5 câu</span></div></div>';
  }
  function questionBlock(q,index,print){
    const choices=q.options.map((opt,j)=>{
      const code=String.fromCharCode(65+j);
      const checked=quiz?.answers?.[q.id]===j;
      return print?'<span>'+code+'. '+esc(opt)+'</span>':
        '<label class="lp-choice-option"><input type="radio" name="lp-q-'+esc(q.id)+'" data-lp-answer="'+esc(q.id)+
        '" value="'+j+'" '+(checked?"checked":"")+' '+(quiz?.submitted?"disabled":"")+'/><span>'+code+'. '+esc(opt)+'</span></label>';
    }).join("");
    let prompt=esc(q.text);
    if(typeof q.target==="string"&&q.target){
      const pattern=esc(q.target),at=prompt.indexOf(pattern);
      if(at>=0)prompt=prompt.slice(0,at)+'<u>'+pattern+'</u>'+prompt.slice(at+pattern.length);
    }
    return '<div class="lp-quiz-question"><p><b>'+index+'.</b> '+prompt+'</p><div class="'+(print?"lp-print-options":"lp-question-choices")+'">'+choices+'</div></div>';
  }
  function questions(){
    if(!quiz)return "";
    let no=0;
    return quiz.mcqs.map(q=>questionBlock(q,++no,false)).join("")+
      quiz.passages.map(p=>'<section class="lp-passage"><h3>'+esc(p.title||"Reading")+'</h3>'+
        '<div class="lp-passage-text">'+esc(p.passage).replace(/\n/g,"<br>")+'</div>'+
        p.questions.map(q=>questionBlock(q,++no,false)).join("")+'</section>').join("");
  }
  function quizView(){
    const total=quiz.mcqs.length+quiz.passages.reduce((a,p)=>a+p.questions.length,0);
    const answered=Object.keys(quiz.answers).length;
    return '<div class="lp-quiz-head"><span>'+answered+' / '+total+' câu đã chọn</span>'+
      '<button type="button" class="lp-refresh" data-lp-exit="1">← Chọn lại bài tập</button></div>'+
      '<div class="lp-quiz-sheet">'+questions()+'</div>'+
      (quiz.submitted?'<div class="lp-preview-note"><b>Đã hoàn thành lượt làm.</b> Các lựa chọn đã được lưu trong trình duyệt. '+
        'Để xem hoặc chấm theo lời giải, giáo viên cần mở khóa và xuất bản đáp án.</div>':
        '<button type="button" class="lp-action lp-finish" data-lp-submit="1">Hoàn thành bài làm</button>');
  }
  function practice(u){
    const b=bank(u);
    return section("02 / AFTER-CLASS PRACTICE","Luyện tập sau buổi học",
      "Ngân hàng câu hỏi được tạo một lần từ nội dung và comments của Google Docs. Học sinh chọn số lượng muốn làm.")+
      (quiz?quizView():choices(u))+
      (b.mcqs.length||b.passages.length?'<div class="lp-preview-note">Bộ câu hỏi hiện có: '+b.mcqs.length+
        ' MCQ và '+b.passages.length+' Reading passages. Đáp án chưa công khai sẽ không xuất hiện trong mã nguồn.</div>':"");
  }
  function selectedForPrint(u){
    const b=bank(u);
    if(!b.mcqs.length&&!b.passages.length&&Array.isArray(u.originalExercises))
      return {mcqs:u.originalExercises.filter(validQ),passages:[]};
    return {mcqs:quiz?.mcqs||b.mcqs.slice(0,mcqCount),passages:quiz?.passages||b.passages.slice(0,readingCount)};
  }
  function getKey(id){
    const item=Array.isArray(access.solutions)?access.solutions.find(x=>x&&x.questionId===id):null;
    return item&&Number.isInteger(item.correctIndex)&&item.correctIndex>=0&&item.correctIndex<=3?item:null;
  }
  function printAnswer(q,n){
    if(printMode==="questions")return "";
    const k=getKey(q.id);
    if(!k)return '<div class="lp-print-answer">'+n+'. — Chưa có lời giải</div>';
    const letter=String.fromCharCode(65+k.correctIndex);
    return '<div class="lp-print-answer"><b>Đáp án '+n+': '+letter+'</b>'+
      (printMode==="detailed"?
        (k.correctMeaning?'<p><b>Nghĩa:</b> '+esc(k.correctMeaning)+'</p>':"")+
        (k.why?'<p><b>Giải thích:</b> '+esc(k.why)+'</p>':"")+
        (Array.isArray(k.choices)?k.choices.map((x,j)=>'<p>'+String.fromCharCode(65+j)+'. '+esc(x.label||q.options[j]||"")+': '+esc(x.explanation||"")+'</p>').join(""):"")+
        (k.examples?'<p>'+esc(k.examples)+'</p>':""):"")+'</div>';
  }
  function printSheet(u){
    const p=selectedForPrint(u);let no=0;
    return '<div class="lp-print-sheet"><div class="lp-print-sheet-top"><span>ENGLISH PRACTICE HUB</span><span>UNIT '+u.id+'</span></div>'+
      '<h3>'+(printMode==="detailed"?"DETAILED SOLUTIONS":esc(u.title||"VOCABULARY PRACTICE"))+'</h3>'+
      p.mcqs.map(q=>{const n=++no;return questionBlock(q,n,true)+printAnswer(q,n)}).join("")+
      p.passages.map(x=>'<section class="lp-passage"><h4>'+esc(x.title||"Reading")+'</h4><p class="lp-passage-text">'+
        esc(x.passage).replace(/\\n/g,"<br>")+'</p>'+x.questions.map(q=>{const n=++no;return questionBlock(q,n,true)+printAnswer(q,n)}).join("")+'</section>').join("")+
      '<div class="lp-print-foot">English Practice Hub · Unit '+u.id+'</div></div>';
  }
  function printing(u){
    const b=bank(u),picked=selectedForPrint(u),total=picked.mcqs.length+picked.passages.reduce((s,p)=>s+p.questions.length,0);
    const hasKeys=accessAllowed()&&access.solutions.length>0;
    if(!total)return section("03 / PRINT","In đề bài","Bài tập sẽ có thể in khi được xuất bản.")+
      '<div class="lp-note">Chưa có bài tập để in.</div>';
    if(printMode!=="questions"&&!hasKeys)printMode="questions";
    return section("03 / PRINT","In đề bài","Chọn in đề, đáp án ngắn hoặc lời giải chi tiết. Đáp án chỉ có khi đã được mở khóa.")+
      '<div class="lp-switches">'+[["questions","Đề bài"],["key","Đáp án ngắn"],["detailed","Lời giải chi tiết"]].map(([id,label])=>
        '<button type="button" data-lp-print-mode="'+id+'" class="'+(id===printMode?"is-active":"")+
        '" '+(id!=="questions"&&!hasKeys?'disabled title="Chỉ in được đáp án khi đã mở khóa"':"")+'>'+label+'</button>').join("")+'</div>'+
      '<p class="lp-print-count">'+total+' câu · '+(b.mcqs.length||b.passages.length?"Ngân hàng luyện tập":"Bài tập gốc từ Google Docs")+'</p>'+
      '<details class="lp-print-preview"><summary>📄 Xem trước nội dung bản in</summary>'+printSheet(u)+'</details>'+
      '<div class="lp-print-actions"><button type="button" data-lp-print-now="1">🖨 In nội dung đang chọn</button></div>';
  }
  function renderUnit(n,preserve){
    const u=getUnit(n);
    if(!u){location.hash=HOME;return}
    unitId=Number(n);
    const oldY=global.scrollY||0;
    mount.style.display="block";
    const screens={lesson,practice,print:printing};
    const ids={lesson:"lp-section-study",practice:"lp-section-practice",print:"lp-section-print"};
    mount.innerHTML=head(u)+'<div class="lp-inline-page">'+
      '<section class="lp-inline-section" id="'+ids[page]+'">'+screens[page](u)+'</section>'+
      pageFooter(u)+'</div>';
    if(preserve)global.scrollTo(0,oldY);else global.scrollTo(0,0);
  }
  function openUnitPage(id,chosenPage){
    const n=Number(id);
    if(!getUnit(n)){location.hash=HOME;return}
    if(n!==unitId){originalAnswers={};quiz=null;mcqCount=0;readingCount=0;printMode="questions";}
    unitId=n;
    page=["lesson","practice","print"].includes(chosenPage)?chosenPage:"lesson";
    access={loading:true,teacher:false,unlocked:false,solutions:null,error:""};
    renderUnit(n,false);
    loadAccess(n);
  }
  async function callRest(path,opts){
    if(typeof global.ensureLearnerSession!=="function")throw Error("Cần đăng nhập tài khoản học sinh.");
    const session=await global.ensureLearnerSession();
    if(!session?.access_token)throw Error("Phiên đăng nhập không còn hiệu lực.");
    const response=await fetch(global.SUPABASE_URL+"/rest/v1/"+path,{
      ...opts,
      headers:{"apikey":global.SUPABASE_KEY,"Authorization":"Bearer "+session.access_token,
        "Content-Type":"application/json",...(opts?.headers||{})}
    });
    if(!response.ok)throw Error("Supabase "+response.status);
    return response.status===204?null:response.json();
  }
  async function loadAccess(n){
    const u=getUnit(n);if(!u)return;
    const requestId=++accessRequestId;
    const key="grade12-unit"+n;
    access={loading:true,teacher:false,unlocked:false,solutions:null,error:""};
    if(unitId===n)renderUnit(n,true);
    try{
      const [roles,status]=await Promise.all([
        callRest("lesson_teacher_roles?select=user_id&limit=1"),
        callRest("lesson_unlocks?select=unlocked&unit_key=eq."+encodeURIComponent(key)+"&limit=1")
      ]);
      if(unitId!==n||requestId!==accessRequestId)return;
      access.teacher=Array.isArray(roles)&&roles.length>0;
      access.unlocked=Boolean(Array.isArray(status)&&status[0]?.unlocked);
      if(access.teacher||access.unlocked){
        const rows=await callRest("lesson_solutions?select=payload&unit_key=eq."+encodeURIComponent(key)+"&limit=1");
        if(unitId!==n||requestId!==accessRequestId)return;
        access.solutions=Array.isArray(rows)&&Array.isArray(rows[0]?.payload)?rows[0].payload:[];
      }
    }catch(e){if(unitId===n&&requestId===accessRequestId)access.error=e.message||"Không thể kiểm tra quyền";}
    finally{if(unitId===n&&requestId===accessRequestId){access.loading=false;renderUnit(n,true);}}
  }
  async function changeUnlock(value){
    if(!access.teacher||access.loading)return;
    const n=unitId,prev=access.unlocked;
    access.loading=true;renderUnit(n,true);
    try{
      const out=await callRest("lesson_unlocks?unit_key=eq.grade12-unit"+n,{
        method:"PATCH",headers:{"Prefer":"return=representation"},body:JSON.stringify({unlocked:value})
      });
      if(!Array.isArray(out)||out.length!==1)throw Error("Không có quyền thay đổi trạng thái Unlock");
      if(unitId===n){access.unlocked=Boolean(out[0].unlocked);access.error=""}
    }catch(e){if(unitId===n){access.unlocked=prev;access.error=e.message||"Cập nhật thất bại"}}
    finally{if(unitId===n){access.loading=false;renderUnit(n,true)}}
  }
  function rememberQuiz(){
    if(quiz&&global.LearningCore?.writeDraft)
      global.LearningCore.writeDraft("lesson-plans","unit-"+unitId,{
        ids:quiz.mcqs.map(x=>x.id).concat(quiz.passages.map(x=>x.id)),answers:quiz.answers,submitted:quiz.submitted
      });
  }
  function startQuiz(){
    const u=getUnit(unitId);if(!u)return;
    const b=bank(u);
    if(!mcqCount&&!readingCount)return;
    const mcqs=b.mcqs.slice(0,mcqCount),passages=b.passages.slice(0,readingCount);
    const ids=mcqs.map(x=>x.id).concat(passages.map(x=>x.id));
    const prior=global.LearningCore?.readDraft?.("lesson-plans","unit-"+unitId);
    const same=prior&&JSON.stringify(prior.ids)===JSON.stringify(ids);
    quiz={mcqs,passages,answers:same&&prior.answers?prior.answers:{},submitted:!!(same&&prior.submitted)};
    renderUnit(unitId,true);
  }
  function bind(){
    mount.addEventListener("click",async e=>{
      const button=e.target.closest("button");if(!button||!mount.contains(button))return;
      const get=attr=>button.getAttribute(attr);
      if(button.hasAttribute("data-lp-route")){location.hash=get("data-lp-route");return}
      if(!location.hash.includes(HOME+"/unit-"))return;
      if(button.hasAttribute("data-lp-refresh"))loadAccess(unitId);
      else if(button.hasAttribute("data-lp-unlock"))changeUnlock(get("data-lp-unlock")==="true");
      else if(button.hasAttribute("data-lp-start"))startQuiz();
      else if(button.hasAttribute("data-lp-exit")){quiz=null;renderUnit(unitId,true)}
      else if(button.hasAttribute("data-lp-submit")){if(quiz){quiz.submitted=true;rememberQuiz();renderUnit(unitId,true)}}
      else if(button.hasAttribute("data-lp-print-mode")){
        const wanted=get("data-lp-print-mode");
        if(wanted!=="questions"&&!accessAllowed())return;
        printMode=wanted;renderUnit(unitId,true);
      }else if(button.hasAttribute("data-lp-print-now")){
        const preview=mount.querySelector(".lp-print-preview");
        printOpenedPreview=Boolean(preview&&!preview.open);
        if(preview)preview.open=true;
        global.document.body.classList.add("lp-printing");
        global.print();
      }
    });
    mount.addEventListener("change",e=>{
      const node=e.target;
      if(!location.hash.includes(HOME+"/unit-"))return;
      if(node.matches("[data-lp-original-answer]")){
        originalAnswers[node.getAttribute("data-lp-original-answer")]=Number(node.value);
        return;
      }
      if(node.matches('[data-lp-input="mcq"]'))mcqCount=Number(node.value)||0;
      else if(node.matches('[data-lp-input="reading"]'))readingCount=Number(node.value)||0;
      else if(node.matches("[data-lp-answer]")){
        if(quiz&&!quiz.submitted){quiz.answers[node.getAttribute("data-lp-answer")]=Number(node.value);rememberQuiz()}
        return;
      }else return;
      renderUnit(unitId,true);
    });
    global.addEventListener("afterprint",()=>{
      global.document.body.classList.remove("lp-printing");
      if(printOpenedPreview){const preview=mount.querySelector(".lp-print-preview");if(preview)preview.open=false;}
      printOpenedPreview=false;
    });
  }
  bind();
  global.renderLessonPlansHome=home;
  global.renderLessonPlansUnit=function(id){openUnitPage(id,"lesson")};
  global.renderLessonPlansPractice=function(id){openUnitPage(id,"practice")};
  global.renderLessonPlansPrint=function(id){openUnitPage(id,"print")};
})(window);
