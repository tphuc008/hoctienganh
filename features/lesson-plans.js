/* Grade 12 Lesson Plans & Practice — live lesson pages (no sample content or answers).
 * Published lessons/MCQs are loaded from the public lesson catalog.
 * Answer keys must never be stored in this repository. Supabase RLS enforces teacher/unlock access.
 */
(function(global){
  "use strict";
  const HOME="grade-12/lesson-plans";
  const mount=document.getElementById("pageMount");
  const tabs=[["lesson","Google Docs"],["solutions","Detailed Solutions"],["practice","After-class Practice"],["print","In đề"]];
  let tab="lesson", unitId=7,access={loading:false,teacher:false,unlocked:false,solutions:null,error:""},
    mcqCount=0,readingCount=0,quiz=null,printMode="questions";
  const catalog=global.LessonPlanCatalog;
  const sessionPrefix="lesson-practice:";
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
  function head(u){
    return '<div class="breadcrumbs">'+nav("grade-12","Lớp 12")+'<span>›</span>'+nav(HOME,"Lesson Plans & Practice")+
      '<span>›</span><span>'+esc(u.title||"Unit "+u.id)+'</span></div>'+
      '<div class="lp-preview-hero"><div class="lp-preview-headline"><div><div class="lp-eyebrow">LESSON PLAN · UNIT '+String(u.id).padStart(2,"0")+'</div>'+
      '<h1>'+esc(u.title||"Unit "+u.id)+'</h1>'+
      '<p>'+(u.description?esc(u.description):"Tài liệu bài giảng, lời giải và luyện tập sau buổi học.")+'</p></div></div></div>'+
      '<div class="lp-preview-tabs" role="tablist" aria-label="Nội dung Unit">'+tabs.map((t,i)=>
      '<button type="button" role="tab" aria-selected="'+(tab===t[0])+'" class="'+(tab===t[0]?"is-active":"")+
      '" data-lp-tab="'+t[0]+'"><span>0'+(i+1)+'</span>'+t[1]+'</button>').join("")+'</div>';
  }
  function section(tag,title,detail){
    return '<div class="lp-preview-section-head"><div><div class="lp-eyebrow">'+tag+'</div><h2>'+title+
      '</h2><p>'+detail+'</p></div></div>';
  }
  function lesson(u){
    const url=docLink(u.docUrl),ready=Boolean(u.lessonPublished&&url);
    return section("01 / LESSON PLAN","Google Docs Lesson Plan","Tài liệu dùng để học trong buổi học hoặc xem lại nếu vắng mặt.")+
      (ready?'<div class="lp-solution-open"><h3>'+esc(u.title||"Unit "+u.id)+'</h3>'+
       '<p>Mở tài liệu Google Docs của bài học. Nội dung có thể được giáo viên cập nhật và thêm comments trong giờ học.</p>'+
       '<a class="lp-action" target="_blank" rel="noopener noreferrer" href="'+esc(url)+'">📄 Mở Google Docs ↗</a></div>':
       '<div class="lp-solution-locked"><div class="lp-lock-icon">📄</div><h3>Chưa có Google Docs</h3>'+
       '<p>Khi giáo viên cung cấp file Word và tạo Google Docs, đường dẫn sẽ xuất hiện tại đây.</p></div>')+
       '<div class="lp-preview-note">Google Docs chỉ chứa phần tài liệu phù hợp cho học sinh. Lời giải chưa mở khóa không được công khai tại đây.</div>';
  }
  function solutionRows(){
    if(!Array.isArray(access.solutions)||!access.solutions.length)
      return '<div class="lp-note">Lời giải chi tiết chưa được tải lên hệ thống bảo mật.</div>';
    return access.solutions.filter(o=>o&&typeof o==="object").map((o,i)=>
      '<article class="lp-solution-open lp-answer-article"><h3>'+esc(o.title||"Question "+(i+1))+'</h3>'+
      (o.correctMeaning?'<p><b>Đáp án & nghĩa:</b> '+esc(o.correctMeaning)+'</p>':"")+
      (o.why?'<p><b>Lý do:</b> '+esc(o.why)+'</p>':"")+
      (Array.isArray(o.choices)?o.choices.map((choice,j)=>
        '<div class="lp-explain-row"><strong>'+String.fromCharCode(65+j)+'. '+esc(choice.label||"")+'</strong><span>'+esc(choice.explanation||"")+'</span></div>').join(""):"")+
      (o.examples?'<p class="lp-examples">'+esc(o.examples)+'</p>':"")+'</article>').join("");
  }
  function solutions(u){
    const status=access.loading?"Đang kiểm tra quyền truy cập…":access.error?"Không thể kiểm tra quyền. "+esc(access.error):
      access.unlocked?"Đã mở lời giải":"Lời giải đang bị khóa";
    const allowed=!access.loading&&!access.error&&(access.teacher||access.unlocked);
    return section("02 / DETAILED SOLUTIONS","Đáp án và lời giải","Giáo viên mở khóa riêng cho từng Unit. Quyền xem được xác thực ở Supabase.")+
      '<div class="lp-solution-locked"><div class="lp-lock-icon">'+(allowed?"🔓":"🔒")+'</div>'+
      '<h3>'+status+'</h3><p>'+(access.unlocked?"Học sinh được phép xem lời giải của Unit này.":
        "Học sinh không thể xem lời giải cho đến khi giáo viên cho phép.")+'</p>'+
      (access.teacher?'<button type="button" class="lp-action lp-teacher-toggle" data-lp-unlock="'+(!access.unlocked)+'">'+
      (access.unlocked?"🔒 Lock solutions":"🔓 Unlock solutions")+'</button>':"")+
      (!access.loading?'<button class="lp-refresh" type="button" data-lp-refresh="1">Kiểm tra lại trạng thái</button>':"")+
      '</div>'+
      (allowed?'<div class="lp-answers">'+solutionRows()+'</div>':"")+
      '<div class="lp-preview-note">Lời giải được tải qua Supabase và chỉ trả về cho giáo viên hoặc học sinh sau khi Unlock. Repository GitHub công khai không chứa đáp án.</div>';
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
    return section("03 / AFTER-CLASS PRACTICE","Luyện tập sau buổi học",
      "Ngân hàng câu hỏi được tạo một lần từ nội dung và comments của Google Docs. Học sinh chọn số lượng muốn làm.")+
      (quiz?quizView():choices(u))+
      (b.mcqs.length||b.passages.length?'<div class="lp-preview-note">Bộ câu hỏi hiện có: '+b.mcqs.length+
        ' MCQ và '+b.passages.length+' Reading passages. Đáp án chưa công khai sẽ không xuất hiện trong mã nguồn.</div>':"");
  }
  function selectedForPrint(u){
    const b=bank(u);
    return {mcqs:quiz?.mcqs||b.mcqs.slice(0,mcqCount),passages:quiz?.passages||b.passages.slice(0,readingCount)};
  }
  function getKey(id){
    const item=Array.isArray(access.solutions)?access.solutions.find(x=>x&&x.questionId===id):null;
    return item&&Number.isInteger(item.correctIndex)&&item.correctIndex>=0&&item.correctIndex<=3?item:null;
  }
  function printSheet(u){
    const p=selectedForPrint(u);let no=0;
    const all=[...p.mcqs,...p.passages.flatMap(x=>x.questions)];
    return '<div class="lp-print-sheet"><div class="lp-print-sheet-top"><span>ENGLISH PRACTICE HUB</span><span>UNIT '+u.id+'</span></div>'+
      '<h3>'+(printMode==="detailed"?"DETAILED SOLUTIONS":esc(u.title||"VOCABULARY PRACTICE"))+'</h3>'+
      p.mcqs.map(q=>questionBlock(q,++no,true)).join("")+
      p.passages.map(x=>'<section class="lp-passage"><h4>'+esc(x.title||"Reading")+'</h4><p class="lp-passage-text">'+
        esc(x.passage).replace(/\n/g,"<br>")+'</p>'+x.questions.map(q=>questionBlock(q,++no,true)).join("")+'</section>').join("")+
      (printMode!=="questions"?'<div class="lp-print-extra"><h4>'+(printMode==="key"?"ANSWER KEY":"DETAILED SOLUTIONS")+'</h4>'+
       all.map((q,i)=>{const k=getKey(q.id);return '<p><b>'+(i+1)+'. '+(k?String.fromCharCode(65+k.correctIndex):"—")+
         '</b>'+(printMode==="detailed"&&k?.why?" — "+esc(k.why):"")+'</p>'}).join("")+'</div>':"")+
      '<div class="lp-print-foot">English Practice Hub · Unit '+u.id+'</div></div>';
  }
  function printing(u){
    const b=bank(u),picked=selectedForPrint(u),total=picked.mcqs.length+picked.passages.length*5;
    const hasKeys=access.unlocked&&Array.isArray(access.solutions)&&access.solutions.length>0;
    if(!b.mcqs.length&&!b.passages.length)return section("04 / PRINT","In đề bài","Bài tập sẽ có thể in sau khi được xuất bản.")+
      '<div class="lp-solution-locked"><h3>Chưa có bài tập để in</h3><p>Hãy thêm dữ liệu từ file Vocabulary và comments trước.</p></div>';
    if(printMode!=="questions"&&!hasKeys)printMode="questions";
    return section("04 / PRINT","In đề bài","Đề bài, đáp án ngắn hoặc lời giải chi tiết được in riêng để tiết kiệm giấy.")+
      '<div class="lp-switches">'+[["questions","Đề bài"],["key","Đáp án ngắn"],["detailed","Lời giải chi tiết"]].map(([id,label])=>
        '<button type="button" data-lp-print-mode="'+id+'" class="'+(id===printMode?"is-active":"")+
        '" '+(id!=="questions"&&!hasKeys?"disabled title=\"Chỉ có thể in đáp án khi đã Unlock\"":"")+ '>'+label+'</button>').join("")+'</div>'+
      '<p class="lp-print-count">Đang chọn '+total+' câu. Để thay đổi số lượng, vào tab After-class Practice.</p>'+
      printSheet(u)+'<div class="lp-print-actions"><button type="button" data-lp-print-now="1">🖨 In đề</button></div>';
  }
  function renderUnit(n,preserve){
    const u=getUnit(n);
    if(!u){location.hash=HOME;return}
    unitId=Number(n);
    const oldY=global.scrollY||0;
    mount.style.display="block";
    const screens={lesson,solutions,practice,print:printing};
    mount.innerHTML=head(u)+'<div class="lp-preview-body" role="tabpanel">'+screens[tab](u)+'</div>';
    if(preserve)global.scrollTo(0,oldY);else global.scrollTo(0,0);
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
    const key="grade12-unit"+n;
    access={loading:true,teacher:false,unlocked:false,solutions:null,error:""};
    if(tab==="solutions"&&unitId===n)renderUnit(n,true);
    try{
      const [roles,status]=await Promise.all([
        callRest("lesson_teacher_roles?select=user_id&limit=1"),
        callRest("lesson_unlocks?select=unlocked&unit_key=eq."+encodeURIComponent(key)+"&limit=1")
      ]);
      if(unitId!==n)return;
      access.teacher=Array.isArray(roles)&&roles.length>0;
      access.unlocked=Boolean(Array.isArray(status)&&status[0]?.unlocked);
      if(access.teacher||access.unlocked){
        const rows=await callRest("lesson_solutions?select=payload&unit_key=eq."+encodeURIComponent(key)+"&limit=1");
        if(unitId!==n)return;
        access.solutions=Array.isArray(rows)&&Array.isArray(rows[0]?.payload)?rows[0].payload:[];
      }
    }catch(e){if(unitId===n)access.error=e.message||"Không thể kiểm tra quyền"}
    finally{if(unitId===n){access.loading=false;if(tab==="solutions"||tab==="print")renderUnit(n,true)}}
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
      if(button.hasAttribute("data-lp-tab")){
        tab=get("data-lp-tab");
        if(tab==="practice"&&!quiz){const b=bank(getUnit(unitId));mcqCount=Math.min(b.mcqs.length,10);readingCount=Math.min(b.passages.length,1)}
        renderUnit(unitId,true);
        if(tab==="solutions"||tab==="print")loadAccess(unitId);
      }else if(button.hasAttribute("data-lp-refresh"))loadAccess(unitId);
      else if(button.hasAttribute("data-lp-unlock"))changeUnlock(get("data-lp-unlock")==="true");
      else if(button.hasAttribute("data-lp-start"))startQuiz();
      else if(button.hasAttribute("data-lp-exit")){quiz=null;renderUnit(unitId,true)}
      else if(button.hasAttribute("data-lp-submit")){if(quiz){quiz.submitted=true;rememberQuiz();renderUnit(unitId,true)}}
      else if(button.hasAttribute("data-lp-print-mode")){
        const wanted=get("data-lp-print-mode");
        if(wanted!=="questions"&&!(access.unlocked&&Array.isArray(access.solutions)&&access.solutions.length))return;
        printMode=wanted;renderUnit(unitId,true);
      }else if(button.hasAttribute("data-lp-print-now")){
        if(!global.document.body.classList.contains("lp-printing"))global.document.body.classList.add("lp-printing");
        global.print();
      }
    });
    mount.addEventListener("change",e=>{
      const node=e.target;
      if(!location.hash.includes(HOME+"/unit-"))return;
      if(node.matches('[data-lp-input="mcq"]'))mcqCount=Number(node.value)||0;
      else if(node.matches('[data-lp-input="reading"]'))readingCount=Number(node.value)||0;
      else if(node.matches("[data-lp-answer]")){
        if(quiz&&!quiz.submitted){quiz.answers[node.getAttribute("data-lp-answer")]=Number(node.value);rememberQuiz()}
        return;
      }else return;
      renderUnit(unitId,true);
    });
    global.addEventListener("afterprint",()=>global.document.body.classList.remove("lp-printing"));
  }
  bind();
  global.renderLessonPlansHome=home;
  global.renderLessonPlansUnit=function(id){tab="lesson";quiz=null;access={loading:false,teacher:false,unlocked:false,solutions:null,error:""};renderUnit(id,false)};
})(window);
