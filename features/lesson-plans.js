/* Separate Grade 12 Lesson Plans & Practice hub; does not alter legacy units. */
(function(global){
  "use strict";
  const HOME="grade-12/lesson-plans";
  const catalog=global.LessonPlanCatalog;
  if(!catalog||!Array.isArray(catalog.units))throw new Error("Lesson Plan catalog is missing");
  const mount=document.getElementById("pageMount");
  function esc(value){
    return String(value==null?"":value).replace(/[&<>"']/g,function(ch){
      return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch];
    });
  }
  function validDocUrl(value){
    try{
      const url=new URL(value);
      return url.protocol==="https:"&&url.hostname==="docs.google.com"&&/^\/document\/d\//.test(url.pathname)?url.href:"";
    }catch(_){return ""}
  }
  function unitRoute(id){return HOME+"/unit-"+id}
  function selectUnit(id){return catalog.units.find(function(u){return Number(u.id)===Number(id)})}
  function counts(unit){
    const practice=unit.practice||{};
    return {mcq:Array.isArray(practice.mcqs)?practice.mcqs.length:0,
      readings:Array.isArray(practice.passages)?practice.passages.length:0};
  }
  function nav(){
    const buttons=mount.querySelectorAll("[data-lp-to]");
    buttons.forEach(function(btn){btn.addEventListener("click",function(){location.hash=btn.getAttribute("data-lp-to")})});
  }
  function renderHome(){
    mount.style.display="block";
    mount.innerHTML=
      '<div class="breadcrumbs"><button type="button" class="crumb-btn" data-lp-to="grade-12">Lớp 12</button><span>›</span><span>Lesson Plans &amp; Practice</span></div>'+
      '<div class="unit-hero lp-hero"><div class="eyebrow">Grade 12 · New learning area</div>'+
      '<h1>Lesson Plans <span class="gradient">&amp; Practice</span></h1>'+
      '<p>Google Docs bài giảng, lời giải được kiểm soát và luyện tập từ kiến thức trong buổi học.</p></div>'+
      '<div class="section-title"><h2>Lesson Units</h2><span>'+catalog.units.length+' units</span></div>'+
      '<div class="units lp-units">'+catalog.units.map(function(unit){
        const doc=validDocUrl(unit.docUrl);
        const c=counts(unit);
        const ready=Boolean(doc&&unit.lessonPublished);
        const practice=Boolean(unit.practicePublished&&(c.mcq||c.readings));
        return '<button type="button" class="unit-card lp-unit-card" data-lp-to="'+esc(unitRoute(unit.id))+'">'+
          '<div class="unit-top"><span class="unit-no">UNIT '+String(unit.id).padStart(2,"0")+'</span>'+
          '<span class="status '+(ready?"live":"")+'">'+(ready?"Lesson available":"Chờ bài giảng")+'</span></div>'+
          '<h3>'+esc(unit.title)+'</h3>'+
          '<p>'+(unit.description?esc(unit.description):'Lesson Plan · Detailed Solutions · After-class Practice')+'</p>'+
          '<div class="lp-unit-meta"><span>'+ (ready?"Google Docs đã có":"Chưa có Google Docs")+'</span>'+
          '<span>'+(practice?(c.mcq+' MCQs · '+c.readings+' readings'):'Bài tập chưa xuất bản')+'</span></div>'+
          '<span class="unit-arrow" aria-hidden="true">→</span></button>';
      }).join("")+'</div>';
    nav();
    window.scrollTo(0,0);
  }
  function renderUnit(id){
    const unit=selectUnit(id);
    if(!unit){location.hash=HOME;return}
    const doc=validDocUrl(unit.docUrl);
    const published=Boolean(unit.lessonPublished&&doc);
    const c=counts(unit);
    const practice=Boolean(unit.practicePublished&&(c.mcq||c.readings));
    mount.style.display="block";
    mount.innerHTML=
      '<div class="breadcrumbs"><button type="button" class="crumb-btn" data-lp-to="grade-12">Lớp 12</button><span>›</span>'+
      '<button type="button" class="crumb-btn" data-lp-to="'+HOME+'">Lesson Plans</button><span>›</span><span>'+esc(unit.title)+'</span></div>'+
      '<div class="unit-hero lp-hero"><div class="eyebrow">LESSON PLAN · UNIT '+String(unit.id).padStart(2,"0")+'</div>'+
      '<h1>'+esc(unit.title)+'</h1>'+
      '<p>'+(unit.description?esc(unit.description):'Bài học mới, độc lập với Vocabulary Units hiện tại.')+'</p></div>'+
      '<div class="lp-detail-grid">'+
      '<section class="lp-panel"><div class="lp-panel-icon" aria-hidden="true">📄</div><h2>Google Docs Lesson Plan</h2>'+
      '<p>Tài liệu dành cho học sinh học lại hoặc xem lại nội dung buổi học.</p>'+
      (published?'<a class="lp-action" href="'+esc(doc)+'" target="_blank" rel="noopener noreferrer">Mở Google Docs ↗</a>':
      '<div class="lp-note">Chưa có Lesson Plan. Tài liệu sẽ được liên kết khi giáo viên xuất bản.</div>')+
      '</section>'+
      '<section class="lp-panel"><div class="lp-panel-icon" aria-hidden="true">🔒</div><h2>Detailed Solutions</h2>'+
      '<p>Lời giải chi tiết chỉ được xem sau khi giáo viên cho phép mở khóa.</p>'+
      '<div class="lp-note lp-locked">Đang khóa · Chưa cấp quyền truy cập lời giải</div>'+
      '<small>Khóa lời giải phải được xác thực ở máy chủ. Không lưu đáp án chưa unlock trong GitHub public.</small></section>'+
      '<section class="lp-panel lp-panel-wide"><div class="lp-panel-icon" aria-hidden="true">📝</div><h2>After-class Practice</h2>'+
      '<p>Ngân hàng bài tập tạo sau khi ChatGPT đọc lại Google Docs và comments của buổi học.</p>'+
      '<div class="lp-counts"><span>'+c.mcq+' câu ABCD</span><span>'+c.readings+' reading passages</span>'+
      '<span>5 câu / passage (khi xuất bản)</span></div>'+
      (practice?'<div class="lp-note">Đã đăng dữ liệu bài tập. Giao diện chọn số lượng câu, làm bài và in đề sẽ được hoàn thiện khi chốt structure.</div>':
      '<div class="lp-note">Chưa có bài tập được xuất bản cho Unit này.</div>')+
      '<small>Học sinh sẽ được chọn số lượng câu và passage từ ngân hàng chung. Chế độ in đáp án dài chưa chốt.</small>'+
      '</section></div>';
    nav();
    window.scrollTo(0,0);
  }
  global.renderLessonPlansHome=renderHome;
  global.renderLessonPlansUnit=renderUnit;
})(window);
