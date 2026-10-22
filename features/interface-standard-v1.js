/* Website Vocab · UI Standard V1
 * Screen-only navigation and adaptive short option layout.
 * No print routines, scoring, authentication or answers are modified.
 */
(function(){
  "use strict";
  const items=[
    {id:"home",label:"Trang chủ",icon:"⌂",href:"#"},
    {id:"school",label:"Học trên trường",icon:"▤",href:"#school"},
    {id:"tutoring",label:"Học thêm",icon:"◫",href:"#tutoring"},
    {id:"vocab",label:"Vocabulary / Units",icon:"Aa",href:"#grade-12"},
    {id:"grammar",label:"Grammar",icon:"◇",href:"#grammar"},
    {id:"context",label:"Context Guessing",icon:"⊞",href:"#grade-12"},
    {id:"reading",label:"IELTS Reading",icon:"▣",href:"#grade-12/reading"},
    {id:"listening",label:"Listening",icon:"▶",href:"#listening"},
    {id:"exam",label:"Đề kiểm tra",icon:"☷",href:"#grade-10/mid-term-test"},
    {id:"lesson",label:"Bài giảng",icon:"≡",href:"#grade-12/lesson-plans"},
    {id:"history",label:"Lịch sử học tập",icon:"↺",href:"#history"}
  ];
  const wrap=document.querySelector(".wrap");
  const page=document.getElementById("pageMount");
  if(!wrap||!page)return;
  const aside=document.createElement("aside");
  aside.className="ui-standard-sidebar";
  aside.id="uiStandardSidebar";
  aside.setAttribute("aria-label","Điều hướng học tập");
  const navItems=items.map(x=>
    '<a class="ui-standard-link" href="'+x.href+'" data-ui-standard-link="'+x.id+'">'+
    '<span class="ui-standard-symbol" aria-hidden="true">'+x.icon+'</span>'+
    '<span>'+x.label+'</span></a>'
  ).join("");
  aside.innerHTML=
    '<div class="ui-standard-brand"><span class="ui-standard-logo" aria-hidden="true">✦</span>'+
    '<span>English Practice Hub</span></div>'+
    '<div class="ui-standard-label">Không gian học tập</div>'+
    '<nav class="ui-standard-nav" aria-label="Các khu vực học tập">'+navItems+'</nav>'+
    '<div class="ui-standard-sidebar-foot">Một giao diện thống nhất cho từng dạng bài.'+
    ' Nội dung, tiến độ và cơ chế chấm điểm hiện tại vẫn được giữ nguyên.</div>';
  wrap.before(aside);
  document.body.classList.add("ui-standard-ready");

  function activeSection(hash){
    if(!hash)return "home";
    if(hash==="history")return "history";
    if(hash==="school"||hash.startsWith("school/"))return "school";
    if(hash==="tutoring")return "tutoring";
    if(hash.startsWith("listening"))return "listening";
    if(hash.includes("lesson-plans"))return "lesson";
    if(hash.includes("/reading")||hash==="grade-12/reading")return "reading";
    if(hash.startsWith("grammar")||hash.startsWith("teacher/grammar"))return "grammar";
    if(hash.startsWith("teacher/hsg")||hash.includes("mid-term-test"))return "exam";
    if(hash.startsWith("grade-"))return "vocab";
    return "home";
  }
  function renderState(){
    const hash=location.hash.replace(/^#/,"");
    const session=typeof window.readLearnerSession==="function" ? window.readLearnerSession() : null;
    const signedIn=!!session;
    const isLogin=!!page.querySelector(".account-shell");
    const isQuiz=document.getElementById("quizShell")?.style.display==="block";
    const isResult=document.getElementById("resultScreen")?.style.display==="block";
    const kind=isResult?"result":isQuiz?"quiz":activeSection(hash);
    document.body.dataset.standardView=kind;
    document.body.classList.toggle("ui-standard-no-sidebar",!signedIn||isLogin);
    const selected=isQuiz && activeSection(hash)==="vocab"?"vocab":activeSection(hash);
    aside.querySelectorAll("[data-ui-standard-link]").forEach(link=>{
      const current=link.dataset.uiStandardLink===selected;
      link.classList.toggle("is-active",current);
      if(current)link.setAttribute("aria-current","page");
      else link.removeAttribute("aria-current");
    });
  }
  function adaptQuizChoices(){
    const answers=document.querySelector("#questionMount .question-card .answers");
    if(!answers)return;
    const options=Array.from(answers.querySelectorAll(".answer"));
    const short=options.length===4 && options.every(opt=>
      (opt.textContent||"").replace(/\s+/g," ").trim().length<=84
    );
    answers.classList.toggle("ui-standard-short-choices",short);
  }
  function sync(){
    renderState();
    adaptQuizChoices();
  }
  window.addEventListener("hashchange",sync);
  new MutationObserver(sync).observe(page,{childList:true});
  const quiz=document.getElementById("quizShell");
  const result=document.getElementById("resultScreen");
  if(quiz)new MutationObserver(renderState).observe(quiz,{attributes:true,attributeFilter:["style"]});
  if(result)new MutationObserver(renderState).observe(result,{attributes:true,attributeFilter:["style"]});
  const questions=document.getElementById("questionMount");
  if(questions)new MutationObserver(adaptQuizChoices).observe(questions,{childList:true,subtree:true});
  sync();
})();
