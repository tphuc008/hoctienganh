/* Grade 12 Lesson Plans & Practice. Unit 7 is blank for a future Word lesson. */
(function(global){
  "use strict";
  const HOME="grade-12/lesson-plans";
  const mount=document.getElementById("pageMount");
  function navigate(){
    mount.querySelectorAll("[data-lp-route]").forEach(function(element){
      element.addEventListener("click",function(){location.hash=element.dataset.lpRoute});
    });
  }
  function renderHome(){
    mount.style.display="block";
    mount.innerHTML=
      '<div class="breadcrumbs"><button type="button" class="crumb-btn" data-lp-route="grade-12">Lớp 12</button><span>›</span><span>Lesson Plans &amp; Practice</span></div>'+
      '<div class="unit-hero lp-hero"><div class="eyebrow">Grade 12</div>'+
      '<h1>Lesson Plans <span class="gradient">&amp; Practice</span></h1>'+
      '<p>Khu vực dành cho các bài học và bài luyện tập mới.</p></div>'+
      '<div class="section-title"><h2>Nội dung bài học</h2><span>1 Unit</span></div>'+
      '<div class="units lp-units"><button type="button" class="unit-card lp-unit-card" data-lp-route="'+HOME+'/unit-7">'+
      '<div class="unit-top"><span class="unit-no">UNIT 07</span><span class="status">Chưa có nội dung</span></div>'+
      '<h3>Unit 7</h3><p>Trống · Chờ file Word và format bài học</p>'+
      '<span class="unit-arrow" aria-hidden="true">→</span></button></div>';
    navigate();
    window.scrollTo(0,0);
  }
  function renderUnit(unitId){
    const unit=global.LessonPlanCatalog?.units?.find(function(u){return Number(u.id)===Number(unitId)});
    if(!unit){location.hash=HOME;return}
    mount.style.display="block";
    mount.innerHTML=
      '<div class="breadcrumbs"><button type="button" class="crumb-btn" data-lp-route="grade-12">Lớp 12</button><span>›</span>'+
      '<button type="button" class="crumb-btn" data-lp-route="'+HOME+'">Lesson Plans &amp; Practice</button><span>›</span><span>Unit 7</span></div>'+
      '<div class="unit-hero lp-hero"><div class="eyebrow">LESSON PLAN</div><h1>Unit 7</h1></div>'+
      '<div class="empty"><b>Chưa có nội dung</b>Đang chờ file Word và format bài học.</div>';
    navigate();
    window.scrollTo(0,0);
  }
  global.renderLessonPlansHome=renderHome;
  global.renderLessonPlansUnit=renderUnit;
})(window);
