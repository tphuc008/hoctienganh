/* Website Vocab · UI Standard V1
 * Keep adaptive quiz answer layout only. The added left navigation sidebar
 * has been removed; existing site header and navigation remain in place.
 * No print routines, scoring, authentication or answers are modified.
 */
(function(){
  "use strict";
  document.getElementById("uiStandardSidebar")?.remove();
  document.body.classList.remove("ui-standard-ready", "ui-standard-no-sidebar");

  function adaptQuizChoices(){
    const answers=document.querySelector("#questionMount .question-card .answers");
    if(!answers)return;
    const options=Array.from(answers.querySelectorAll(".answer"));
    const short=options.length===4 && options.every(opt=>
      (opt.textContent||"").replace(/\s+/g," ").trim().length<=84
    );
    answers.classList.toggle("ui-standard-short-choices",short);
  }

  const questions=document.getElementById("questionMount");
  if(questions){
    new MutationObserver(adaptQuizChoices).observe(questions,{childList:true,subtree:true});
  }
  adaptQuizChoices();
})();
