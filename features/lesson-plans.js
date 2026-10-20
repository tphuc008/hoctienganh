/* Grade 12 Lesson Plans & Practice — live lesson pages (no sample content or answers).
 * Published lessons/MCQs are loaded from the public lesson catalog.
 * Answer keys must never be stored in this repository. Supabase RLS enforces teacher/unlock access.
 */
(function(global){
  "use strict";
  const HOME="grade-12/lesson-plans";
  const mount=document.getElementById("pageMount");
  let unitId=7,page="lesson",accessRequestId=0,access={loading:false,teacher:false,unlocked:false,solutions:null,error:""},
    mcqCount=0,readingCount=0,quiz=null,printMode="key",
    printParts={context:true,closest:true,opposite:true},
    originalAnswers={},printOpenedPreview=false;
  const catalog=global.LessonPlanCatalog;
  const partDefs=[
    {id:"context",number:"I",title:"Vocabulary in Context",range:"1–28"},
    {id:"closest",number:"II",title:"Closest in Meaning",range:"29–34"},
    {id:"opposite",number:"III",title:"Opposite in Meaning",range:"35–40"}
  ];
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

  function semanticExplanation(q,k,forPrint=false){
    if(!k)return "";
    const idx=k.correctIndex,correct=q.options[idx]||"";
    const first=Array.isArray(k.step1)&&k.step1.length?k.step1:
      [k.correctMeaning||"",k.why||""].filter(Boolean);
    const choiceItems=Array.isArray(k.options)&&k.options.length===4?k.options:
      (Array.isArray(k.choices)?k.choices:[]);
    const exampleItems=Array.isArray(k.examples)?k.examples:
      (Array.isArray(k.choices)?k.choices.map((ch,j)=>({
        label:String.fromCharCode(65+j),word:q.options[j],en:ch.example||"",vi:ch.exampleVi||""
      })):[]);
    const remember=k.remember||(k.targetVocabulary?
      "Ghi nhớ cách dùng “"+k.targetVocabulary+"” trong đúng ngữ cảnh của câu hỏi; phân biệt nghĩa và collocation với những lựa chọn còn lại.":"Khi các đáp án gần nghĩa, hãy xét collocation và dấu hiệu ngữ cảnh thay vì chỉ dịch từng từ riêng lẻ.");
    const comparisons=choiceItems.map((ch,j)=>{
      const word=ch.word||ch.label||q.options[j]||"";
      const letter=String.fromCharCode(65+j);
      return '<div class="semantic-option '+(j===idx?"correct-analysis":"")+'"><div class="semantic-option-head">'+
        '<span>'+letter+'</span><b>'+esc(word)+'</b>'+
        (ch.meaning?'<em>'+esc(ch.meaning)+'</em>':"")+'</div>'+
        '<p>'+esc(ch.analysis||ch.explanation||"")+'</p></div>';
    }).join("");
    const examples=exampleItems.map((ex,j)=>{
      const letter=String.fromCharCode(65+j);
      return '<div class="semantic-example"><div class="semantic-example-title"><span>'+letter+
        '</span><b>'+esc(ex.word||q.options[j]||"")+'</b></div>'+
        '<p class="example-en">'+esc(ex.en||ex.example||"")+'</p>'+
        (ex.vi?'<p class="example-vi">→ '+esc(ex.vi)+'</p>':"")+'</div>';
    }).join("");
    return '<div class="feedback correct semantic-feedback lp-semantic-feedback'+(forPrint?" lp-semantic-print":"")+'">'+
      '<div class="feedback-title">✓ Đáp án '+String.fromCharCode(65+idx)+' — '+esc(correct)+'</div>'+
      '<section class="semantic-step"><div class="semantic-step-label"><span>1</span><div>'+
      '<b>Dịch nghĩa + giải thích ngữ cảnh</b><small>Meaning · context · collocation · why this answer</small>'+
      '</div></div><div class="semantic-prose">'+first.map(t=>'<p>'+esc(t)+'</p>').join("")+'</div></section>'+
      '<section class="semantic-step"><div class="semantic-step-label"><span>2</span><div>'+
      '<b>So sánh A, B, C, D</b><small>Nuance · collocation · phạm vi nghĩa</small>'+
      '</div></div><div class="semantic-options-grid">'+comparisons+'</div></section>'+
      '<section class="semantic-step"><div class="semantic-step-label"><span>3</span><div>'+
      '<b>Ví dụ thực tế cho từng đáp án</b><small>1 ví dụ cho mỗi phương án A–D</small>'+
      '</div></div><div class="semantic-examples-grid">'+examples+'</div></section>'+
      '<div class="semantic-remember"><b>Điểm cần nhớ</b><span>'+esc(remember)+'</span></div></div>';
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
      explanation=k?'<details class="lp-inline-answer"><summary>📖 Xem lời giải Semantic Precision · Câu '+n+'</summary>'+
        '<div class="lp-inline-answer-body">'+semanticExplanation(q,k)+'</div></details>':
        '<div class="lp-inline-locked-note">Chưa có lời giải khớp với ID câu hỏi này.</div>';
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
    const all=Array.isArray(u.originalExercises)?u.originalExercises.filter(validQ):[];
    return all.filter(q=>printParts[q.part]===true);
  }
  function getKey(id){
    const item=Array.isArray(access.solutions)?access.solutions.find(x=>x&&x.questionId===id):null;
    return item&&Number.isInteger(item.correctIndex)&&item.correctIndex>=0&&item.correctIndex<=3?item:null;
  }
  function printQuestionNumber(q){
    const match=String(q.id).match(/-(\d{2})$/);
    return match?Number(match[1]):0;
  }
  function printSheet(u){
    const selected=selectedForPrint(u);
    const parts=partDefs.map(part=>({
      ...part,items:selected.filter(q=>q.part===part.id)
    })).filter(part=>part.items.length);
    const content=parts.map(part=>'<section class="lp-print-part"><h4>PART '+part.number+'. '+part.title+'</h4>'+
      part.items.map(q=>{
        const n=printQuestionNumber(q),key=getKey(q.id);
        return '<div class="lp-print-question">'+questionBlock(q,n,true)+
          (printMode==="detailed"?semanticExplanation(q,key,true):"")+'</div>';
      }).join("")+'</section>').join("");
    const answerKey=printMode==="key"?'<section class="lp-print-answer-key">'+
      '<h4>ANSWER KEY · ĐÁP ÁN NGẮN</h4>'+
      '<div class="lp-print-key-grid">'+selected.map(q=>{
        const n=printQuestionNumber(q),key=getKey(q.id);
        return '<span><strong>'+n+'.</strong> '+(key?String.fromCharCode(65+key.correctIndex):"—")+'</span>';
      }).join("")+'</div></section>':"";
    return '<div class="lp-print-sheet"><div class="lp-print-sheet-top"><span>ENGLISH PRACTICE HUB</span><span>UNIT '+u.id+'</span></div>'+
      '<h3>'+esc(u.title||"VOCABULARY PRACTICE")+'</h3>'+
      '<p class="lp-print-subtitle">'+(printMode==="key"?"Đề bài + đáp án ngắn ở cuối":"Đề bài + giải thích Semantic Precision cho từng câu")+'</p>'+
      content+answerKey+
      '<div class="lp-print-foot">English Practice Hub · Unit '+u.id+'</div></div>';
  }
  function printing(u){
    const all=Array.isArray(u.originalExercises)?u.originalExercises.filter(validQ):[];
    if(!all.length)return section("03 / PRINT","In đề kèm đáp án","Bài tập sẽ có thể in khi được xuất bản.")+
      '<div class="lp-note">Chưa có bài tập gốc để in.</div>';
    const selected=selectedForPrint(u),total=selected.length;
    const allowed=accessAllowed();
    const complete=allowed&&total>0&&selected.every(q=>Boolean(getKey(q.id)));
    return section("03 / PRINT","In đề kèm đáp án","Chọn Part cần in, sau đó chọn đáp án ngắn ở cuối đề hoặc lời giải Semantic Precision ngay dưới từng câu.")+
      '<fieldset class="lp-print-parts"><legend>Chọn phần muốn in</legend>'+
      '<div class="lp-print-part-options">'+partDefs.map(part=>{
        const count=all.filter(q=>q.part===part.id).length;
        return '<label class="lp-print-part-option"><input type="checkbox" data-lp-print-part="'+part.id+
          '" '+(printParts[part.id]?"checked":"")+'/><span><strong>Part '+part.number+' — '+part.title+'</strong>'+
          '<small>'+part.range+' · '+count+' câu</small></span></label>';
      }).join("")+'</div></fieldset>'+
      '<div class="lp-switches lp-print-modes" aria-label="Chọn định dạng in">'+
      [["key","In đề + đáp án ngắn"],["detailed","In đề + giải chi tiết"]].map(([id,label])=>
        '<button type="button" data-lp-print-mode="'+id+'" class="'+(id===printMode?"is-active":"")+'" aria-pressed="'+(id===printMode)+'">'+label+'</button>').join("")+'</div>'+
      '<p class="lp-print-count">Đã chọn <b>'+total+' / '+all.length+' câu</b> từ '+partDefs.filter(p=>printParts[p.id]).length+' Part.</p>'+
      (!total?'<div class="lp-note" role="status">Hãy chọn ít nhất một Part để in.</div>':
        !allowed?'<div class="lp-note" role="status">🔒 Cần được giáo viên mở khóa lời giải trước khi in đáp án hoặc giải chi tiết.</div>':
        !complete?'<div class="lp-note" role="status">Có câu chưa có lời giải tương ứng, chưa thể in bản đáp án.</div>':
        '<details class="lp-print-preview"><summary>📄 Xem trước nội dung bản in</summary>'+printSheet(u)+'</details>')+
      '<div class="lp-print-actions"><button type="button" data-lp-print-now="1" '+(!complete?"disabled":"")+
      '>🖨 In '+(printMode==="key"?"đề + đáp án ngắn":"đề + lời giải chi tiết")+'</button></div>';
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
    if(n!==unitId){originalAnswers={};quiz=null;mcqCount=0;readingCount=0;printMode="key";printParts={context:true,closest:true,opposite:true};}
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
        if(wanted!=="key"&&wanted!=="detailed")return;
        printMode=wanted;renderUnit(unitId,true);
      }else if(button.hasAttribute("data-lp-print-now")){
        const currentUnit=getUnit(unitId),selected=currentUnit?selectedForPrint(currentUnit):[];
        if(page!=="print"||!accessAllowed()||!selected.length||!selected.every(q=>Boolean(getKey(q.id))))return;
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
      if(node.matches("[data-lp-print-part]")){
        const key=node.getAttribute("data-lp-print-part");
        if(!partDefs.some(x=>x.id===key))return;
        printParts[key]=Boolean(node.checked);
        renderUnit(unitId,true);
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
