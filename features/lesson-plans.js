/* Grade 12 Lesson Plans & Practice: reserved for the teacher's future format.
 * This section deliberately contains NO placeholder lesson units.
 */
(function(global){
  "use strict";
  const mount=document.getElementById("pageMount");
  function renderHome(){
    mount.style.display="block";
    mount.innerHTML=
      '<div class="breadcrumbs"><button type="button" class="crumb-btn" id="lpBackGrade">Lớp 12</button><span>›</span><span>Lesson Plans &amp; Practice</span></div>'+
      '<div class="unit-hero lp-hero"><div class="eyebrow">Grade 12</div>'+
      '<h1>Lesson Plans <span class="gradient">&amp; Practice</span></h1>'+
      '<p>Khu vực dành cho các bài học và bài luyện tập mới.</p></div>'+
      '<div class="section-title"><h2>Nội dung bài học</h2><span>Chưa có Unit</span></div>'+
      '<div class="empty"><b>Chưa có bài học nào</b>Đang chờ giáo viên quyết định format. Các Unit mới sẽ được thêm sau.</div>';
    document.getElementById("lpBackGrade").addEventListener("click",function(){location.hash="grade-12"});
    window.scrollTo(0,0);
  }
  global.renderLessonPlansHome=renderHome;
})(window);
