/* Grade 12 Lesson Plans & Practice — Unit 7 format previews.
 * This is MOCK content only. No Google Doc, locked key, or exercise bank is published.
 * Real locked solutions must be fetched from a protected backend after authorisation.
 */
(function(global){
  "use strict";
  const HOME="grade-12/lesson-plans";
  const mount=document.getElementById("pageMount");
  const catalog=global.LessonPlanCatalog;
  let currentTab="lesson";
  let currentStyle="classic";
  let solutionView="student";
  let mcqCount=20;
  let passageCount=1;
  let printMode="questions";
  const tabs=[
    ["lesson","01","Google Docs"],
    ["solutions","02","Lời giải & Unlock"],
    ["practice","03","After-class Practice"],
    ["print","04","In đề"]
  ];
  const styles=[
    ["classic","A","Classic Pink","Inter · 11.5pt · giãn dòng 1.45"],
    ["editorial","B","Rose Editorial","Tiêu đề nổi bật · nhiều khoảng thở"],
    ["workbook","C","Pink Workbook","Gọn, chia khối rõ · tiện ôn tập"]
  ];
  const sampleQuestions=[
    ["Q1 · PART I","Researchers proposed safeguards to ______ the harmful effects of the chemical before it reached nearby rivers.",
      ["mitigate","estimate","attribute","observe"]],
    ["Q29 · PART II","The spokesperson gave a <u>candid</u> account of the investigation.",
      ["ambiguous","frank","incomplete","cautious"]],
    ["Q35 · PART III","The organisation adopted a <u>transparent</u> approach to reporting its expenditure.",
      ["systematic","accessible","secretive","meticulous"]]
  ];
  function navHtml(path,text){return '<button type="button" class="crumb-btn" data-lp-route="'+path+'">'+text+'</button>'}
  function sampleQuestion(item,numberOnly){
    return '<div class="lp-doc-question"><span class="lp-doc-label">'+item[0]+'</span>'+
      '<p>'+item[1]+'</p>'+
      '<div class="lp-doc-choices">'+item[2].map(function(o,i){return '<span>'+String.fromCharCode(65+i)+'. '+o+'</span>'}).join("")+'</div></div>';
  }
  function renderHome(){
    mount.style.display="block";
    mount.innerHTML=
      '<div class="breadcrumbs">'+navHtml("grade-12","Lớp 12")+'<span>›</span><span>Lesson Plans &amp; Practice</span></div>'+
      '<div class="unit-hero lp-hero"><div class="eyebrow">Grade 12</div>'+
      '<h1>Lesson Plans <span class="gradient">&amp; Practice</span></h1>'+
      '<p>Trang học từ vựng và bài tập sau buổi học.</p></div>'+
      '<div class="section-title"><h2>Lesson Units</h2><span>1 Unit thử nghiệm</span></div>'+
      '<div class="units lp-units"><button type="button" class="unit-card lp-unit-card" data-lp-route="'+HOME+'/unit-7">'+
      '<div class="unit-top"><span class="unit-no">UNIT 07</span><span class="status">Format preview</span></div>'+
      '<h3>Unit 7</h3><p>Xem và duyệt mẫu Google Docs, lời giải, bài tập và trang in trước khi triển khai.</p>'+
      '<span class="unit-arrow" aria-hidden="true">→</span></button></div>';
    global.scrollTo(0,0);
  }
  function header(){
    return '<div class="breadcrumbs">'+navHtml("grade-12","Lớp 12")+'<span>›</span>'+
      navHtml(HOME,"Lesson Plans &amp; Practice")+'<span>›</span><span>Unit 7</span></div>'+
      '<div class="lp-preview-hero"><div class="lp-preview-headline">'+
      '<div><div class="lp-eyebrow">UNIT 07 / FORMAT LAB</div><h1>Thiết kế Unit 7</h1>'+
      '<p>Xem trước cách hiển thị cho học sinh và giáo viên. Các câu hỏi bên dưới chỉ là ví dụ minh họa.</p></div>'+
      '<span class="lp-preview-tag">BẢN MẪU · CHƯA XUẤT BẢN</span></div>'+
      '<div class="lp-flow"><span><b>01</b> Upload file Word</span><span class="lp-flow-arrow">→</span>'+
      '<span><b>02</b> Tạo Google Docs + lời giải</span><span class="lp-flow-arrow">→</span>'+
      '<span><b>03</b> Đọc comments sau buổi học</span><span class="lp-flow-arrow">→</span>'+
      '<span><b>04</b> Đăng bài tập lên website</span></div></div>';
  }
  function navTabs(){
    return '<div class="lp-preview-tabs" role="tablist" aria-label="Các phần xem trước">'+tabs.map(function(tab){
      const active=tab[0]===currentTab;
      return '<button type="button" role="tab" aria-selected="'+active+'" class="'+(active?"is-active":"")+
        '" data-lp-tab="'+tab[0]+'"><span>'+tab[1]+'</span>'+tab[2]+'</button>';
    }).join("")+'</div>';
  }
  function panelHead(eyebrow,title,detail){
    return '<div class="lp-preview-section-head"><div><div class="lp-eyebrow">'+eyebrow+
      '</div><h2>'+title+'</h2><p>'+detail+'</p></div></div>';
  }
  function lessonBody(){
    const docSamples='<div class="lp-paper lp-paper--'+currentStyle+'">'+
      '<div class="lp-paper-head"><div class="lp-paper-kicker">ENGLISH VOCABULARY · UNIT 7</div>'+
      '<h2>VOCABULARY PRACTICE</h2><p>Master Structure V1.0 · sample layout only</p></div>'+
      '<div class="lp-paper-section"><div class="lp-paper-section-title">PART I. Vocabulary in Context <small>28 questions</small></div>'+
      '<p class="lp-paper-instructions"><i>Mark the letter A, B, C, or D on your answer sheet to indicate the correct answer to each of the following questions.</i></p>'+
      sampleQuestion(sampleQuestions[0])+'</div>'+
      '<div class="lp-paper-section"><div class="lp-paper-section-title">PART II. Closest in Meaning <small>6 questions</small></div>'+
      '<p class="lp-paper-instructions"><i>Mark the letter A, B, C, or D to indicate the word or phrase that is CLOSEST in meaning to the underlined word or phrase in each question.</i></p>'+
      sampleQuestion(sampleQuestions[1])+'</div>'+
      '<div class="lp-paper-section"><div class="lp-paper-section-title">PART III. Opposite in Meaning <small>6 questions</small></div>'+
      '<p class="lp-paper-instructions"><i>Mark the letter A, B, C, or D to indicate the word or phrase that is OPPOSITE in meaning to the underlined word or phrase in each question.</i></p>'+
      sampleQuestion(sampleQuestions[2])+'</div>'+
      '<div class="lp-paper-footer">INTER · 11.5 PT · PAGELESS · EXAMPLE ONLY</div></div>';
    return panelHead("01 / LESSON PLAN","Google Docs — các mẫu trình bày",
        "Mẫu A bám sát tông hồng bạn hay dùng. Mẫu B và C là phương án để so sánh, chưa được chọn.")+
      '<div class="lp-style-grid">'+styles.map(function(style){
        const selected=style[0]===currentStyle;
        return '<button type="button" class="lp-style-option '+(selected?"is-selected":"")+
          '" aria-pressed="'+selected+'" data-lp-style="'+style[0]+'"><span class="lp-style-id">'+style[1]+'</span>'+
          '<strong>'+style[2]+'</strong><small>'+style[3]+'</small></button>';
      }).join("")+'</div>'+
      '<div class="lp-paper-wrap">'+docSamples+'</div>'+
      '<div class="lp-preview-note"><strong>Nguyên tắc nội dung:</strong> 40 câu (28 + 6 + 6), nguồn 24/16, CEFR 12 B1 · 12 B2 · 12 C1 · 4 C2. '+
      'Trong bản thật, ChatGPT chỉ đưa Google Docs link vào Unit 7 sau khi tạo và xác minh tài liệu.</div>';
  }
  function solutionBody(){
    const locked=solutionView==="student";
    return panelHead("02 / DETAILED SOLUTIONS","Lời giải & Teacher Unlock",
        "Hai trạng thái minh họa để bạn duyệt bố cục. Chưa có nút mở khóa thật hoặc dữ liệu đáp án thật.")+
      '<div class="lp-switches">'+
      '<button type="button" data-lp-view="student" class="'+(locked?"is-active":"")+'">🔒 Student · Locked</button>'+
      '<button type="button" data-lp-view="teacher" class="'+(!locked?"is-active":"")+'">🔓 Unlocked preview</button></div>'+
      (locked?
        '<div class="lp-solution-locked"><div class="lp-lock-icon">🔒</div><h3>Detailed Solutions are locked</h3>'+
        '<p>Lời giải của Unit 7 chưa được giáo viên mở. Học sinh vẫn có thể xem Lesson Plan khi đã xuất bản.</p>'+
        '<div class="lp-lock-status">Chờ Teacher Unlock</div></div>':
        '<div class="lp-solution-open"><span class="lp-demo-pill">MINH HỌA — KHÔNG PHẢI ĐÁP ÁN THẬT</span>'+
        '<h3>Question 1 — A. mitigate</h3>'+
        '<p><b>Đáp án đúng:</b> <i>mitigate</i> = giảm nhẹ mức độ nghiêm trọng. “Mitigate the harmful effects” diễn tả việc giảm tác động tiêu cực; “safeguards” là biện pháp được đề xuất nhằm đạt kết quả này.</p>'+
        '<div class="lp-explain-row"><strong>A. mitigate</strong><span>Giảm nhẹ tác hại; phù hợp với mục đích của các biện pháp phòng ngừa.</span></div>'+
        '<div class="lp-explain-row"><strong>B. estimate</strong><span>Ước tính quy mô tác động, không nhất thiết làm giảm tác động đó.</span></div>'+
        '<div class="lp-explain-row"><strong>C. attribute</strong><span>Quy một kết quả cho nguyên nhân; thường dùng “attribute something to something”.</span></div>'+
        '<div class="lp-explain-row"><strong>D. observe</strong><span>Quan sát hoặc ghi nhận; không biểu đạt chức năng làm giảm tác hại.</span></div>'+
        '<p class="lp-examples"><b>Ví dụ ứng dụng:</b> Future policies could mitigate air pollution. / Engineers estimate the repair costs. / She attributed the failure to poor planning. / Scientists observed changes in the water.</p>'+
        '</div>')+
      '<div class="lp-preview-note"><strong>Bảo mật khi làm thật:</strong> đáp án chưa Unlock không được đưa vào GitHub public hoặc mã JavaScript gửi cho học sinh. '+
      'Trạng thái trong mẫu này chỉ để so sánh giao diện.</div>';
  }
  function practiceBody(){
    const total=mcqCount+passageCount*5;
    return panelHead("03 / AFTER-CLASS PRACTICE","Bài tập tạo từ Google Docs comments",
      "Cuối buổi, ChatGPT đọc lại Docs theo yêu cầu của bạn để tạo một ngân hàng dùng chung (10–30 MCQ, 1–3 passages × 5 câu).")+
      '<div class="lp-practice-settings"><div><h3>Choose your practice</h3>'+
      '<label>Số câu Multiple Choice</label><div class="lp-choice-line">'+[10,20,30].map(function(n){
        return '<button type="button" class="'+(mcqCount===n?"is-active":"")+'" data-lp-mcq="'+n+'">'+n+' câu</button>';
      }).join("")+'</div>'+
      '<label>Số Reading Passages</label><div class="lp-choice-line">'+[0,1,2,3].map(function(n){
        return '<button type="button" class="'+(passageCount===n?"is-active":"")+'" data-lp-passages="'+n+'">'+n+' passage'+(n>1?"s":"")+'</button>';
      }).join("")+'</div></div>'+
      '<div class="lp-practice-total"><span>BÀI LUYỆN TẬP ĐƯỢC CHỌN</span><strong>'+total+'</strong><span>'+
      mcqCount+' câu ABCD + '+passageCount+' × 5 câu Reading</span></div></div>'+
      '<div class="lp-sample-grid"><article class="lp-preview-card"><span class="lp-demo-pill">MCQ SAMPLE</span>'+
      '<h3>Vocabulary in Context</h3>'+
      '<p>The committee decided to ______ its decision after receiving new evidence.</p>'+
      '<div class="lp-demo-options"><div>A. postpone</div><div>B. reconsider</div><div>C. resist</div><div>D. anticipate</div></div>'+
      '<small>Mỗi câu có 4 phương án; đáp án không hiện trước khi làm bài.</small></article>'+
      '<article class="lp-preview-card"><span class="lp-demo-pill">READING SAMPLE</span>'+
      '<h3>When Communities Share Information</h3>'+
      '<p>In a coastal town, local volunteers created a simple information network before the storm season. Rather than sending warnings only once, they updated residents as conditions changed. This helped people decide when to protect their property and where to find reliable information.</p>'+
      '<div class="lp-reading-questions"><strong>5 questions per passage</strong>'+
      '<p>1. Why did the volunteers update the warnings?</p>'+
      '<p>2. What does the passage suggest about reliable information?</p>'+
      '<p>3–5. Additional comprehension questions in the full lesson.</p></div>'+
      '<small>Passage và câu hỏi này chỉ để duyệt cách trình bày, không phải ngân hàng đã xuất bản.</small></article></div>'+
      '<div class="lp-preview-note">Các con số lựa chọn phía trên chỉ là mô phỏng khi ngân hàng đã có đủ dữ liệu. '+
      'Hiện Unit 7 chưa có câu hỏi thật và không có bài nào được ghi nhận.</div>';
  }
  function printBody(){
    const modes=[
      ["questions","A","Question Paper","Chỉ in đề để học sinh làm bài."],
      ["key","B","Compact Answer Key","Đáp án chữ cái gọn ở cuối đề."],
      ["detailed","C","Detailed Solutions","Lời giải dài trong tài liệu riêng."]
    ];
    const answer=printMode==="key"?'<div class="lp-print-extra"><h4>ANSWER KEY · SAMPLE</h4><p>1. A &nbsp; 2. B &nbsp; 3. C</p></div>':
      printMode==="detailed"?'<div class="lp-print-extra"><h4>DETAILED SOLUTIONS · SAMPLE</h4>'+
        '<p><b>1. A — mitigate:</b> Giảm mức độ nghiêm trọng của tác động. B, C và D khác chức năng nghĩa hoặc cấu trúc.</p>'+
        '<p>Khi hoàn thiện, phần này sẽ phân tích từng lựa chọn và đưa ví dụ ứng dụng.</p></div>':"";
    return panelHead("04 / PRINT","Mẫu in — chưa chốt format đáp án",
      "So sánh ba phương án. Bạn có thể in thử đúng một trang demo, chưa phải đề Unit 7 thật.")+
      '<div class="lp-style-grid">'+modes.map(function(mode){
        const active=mode[0]===printMode;
        return '<button type="button" class="lp-style-option '+(active?"is-selected":"")+
          '" aria-pressed="'+active+'" data-lp-print="'+mode[0]+'"><span class="lp-style-id">'+mode[1]+'</span>'+
          '<strong>'+mode[2]+'</strong><small>'+mode[3]+'</small></button>';
      }).join("")+'</div>'+
      '<div class="lp-print-sheet"><div class="lp-print-sheet-top"><span>ENGLISH PRACTICE HUB</span><span>UNIT 7 · DEMO</span></div>'+
      '<h3>'+ (printMode==="detailed"?"DETAILED SOLUTIONS":"VOCABULARY PRACTICE") +'</h3>'+
      '<p>1. Researchers proposed safeguards to ______ the harmful effects of the chemical before it reached nearby rivers.</p>'+
      '<div class="lp-print-options"><span>A. mitigate</span><span>B. estimate</span><span>C. attribute</span><span>D. observe</span></div>'+
      answer+'<div class="lp-print-foot">Preview only · chưa có đề học sinh thật</div></div>'+
      '<div class="lp-print-actions"><button type="button" data-lp-print-now="yes">🖨 In thử trang demo</button>'+
      '<span>Mẫu dài sẽ được in ra trang riêng để tránh chiếm chỗ của đề.</span></div>'+
      '<div class="lp-preview-note">In đáp án/lời giải sẽ cần tuân thủ quyền Unlock khi triển khai thật. Hiện chỉ in nội dung ví dụ.</div>';
  }
  function renderUnit(unitId,keepScroll){
    if(!catalog?.units?.some(function(u){return Number(u.id)===Number(unitId)})){
      location.hash=HOME;return;
    }
    const originalScroll=global.scrollY||0;
    mount.style.display="block";
    const bodies={lesson:lessonBody,solutions:solutionBody,practice:practiceBody,print:printBody};
    mount.innerHTML=header()+navTabs()+'<div class="lp-preview-body" role="tabpanel">'+
      (bodies[currentTab]||lessonBody)()+'</div>';
    if(keepScroll)global.scrollTo(0,originalScroll);
    else global.scrollTo(0,0);
  }
  mount.addEventListener("click",function(event){
    const btn=event.target.closest("button");
    if(!btn||!mount.contains(btn))return;
    if(btn.hasAttribute("data-lp-route")){location.hash=btn.getAttribute("data-lp-route");return}
    if(!location.hash.includes(HOME+"/unit-7"))return;
    const handlers={
      "data-lp-tab":function(v){currentTab=v},
      "data-lp-style":function(v){currentStyle=v},
      "data-lp-view":function(v){solutionView=v},
      "data-lp-mcq":function(v){mcqCount=Number(v)},
      "data-lp-passages":function(v){passageCount=Number(v)},
      "data-lp-print":function(v){printMode=v}
    };
    for(const attr in handlers){
      if(btn.hasAttribute(attr)){handlers[attr](btn.getAttribute(attr));renderUnit(7,true);return}
    }
    if(btn.hasAttribute("data-lp-print-now"))global.print();
  });
  global.renderLessonPlansHome=renderHome;
  global.renderLessonPlansUnit=renderUnit;
})(window);
