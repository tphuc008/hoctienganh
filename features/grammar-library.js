/* Teacher Grammar Library: 25 topics in numerical order; fourteen available. */
(function(g){
"use strict";
const catalog=[
["Phát âm","Pronunciation"],["Trọng âm","Stress"],["Thì động từ","Verb tenses"],
["Sự phối hợp thì","Sequence of tenses"],["Sự hòa hợp giữa chủ ngữ và động từ","Subject–verb agreement"],
["Động từ khuyết thiếu","Modal verbs"],["Cụm động từ","Phrasal verbs"],
["Thức giả định","Subjunctive mood"],["Danh động từ và động từ nguyên mẫu","Gerunds & infinitives"],
["Câu hỏi đuôi","Tag questions"],["So sánh","Comparison"],["Trật tự tính từ","Adjective order"],
["Mạo từ","Articles"],["Cấu tạo từ","Word forms"],["Từ chỉ số lượng","Expressions of quantity"],
["Giới từ","Prepositions"],["Liên từ","Conjunctions"],["Câu bị động","Passive voice"],
["Câu điều kiện","Conditional sentences"],["Phát âm","Pronunciation"],
["Đảo ngữ","Inversions"],["Mệnh đề quan hệ","Relative clauses"],
["Thành ngữ","Idioms"],["Cụm từ cố định","Collocations"],["Một số cấu trúc thông dụng","Useful grammar structures"]
].map(([vi,en],i)=>({number:i+1,vi,en,available:[1,2,3,4,5,6,7,8,9,10,11,19,21,22].includes(i+1),new:[1,2,3,4,5,6,7,8,9,10,11,19,22].includes(i+1)}));
if(catalog.length!==25)throw Error("Expected 25 grammar topics");
const safe=(v)=>String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function card(item){
 const label="Chuyên đề "+String(item.number).padStart(2,"0");
 return '<article class="g-lib-card'+(item.available?" available":" disabled")+'">'+
   '<div class="g-lib-card-top"><span class="g-lib-index">'+label+'</span>'+
     (item.available?'<span class="g-lib-status">Đã có bài</span>':'<span class="g-lib-status muted">Đang chuẩn bị</span>')+'</div>'+
   '<h3>'+safe(item.vi)+'</h3><p class="g-lib-en">'+safe(item.en)+'</p>'+
   (item.available?'<div class="g-lib-card-footer"><span>Learn · Practice · Clinic · Mastery · Review</span>'+
      '<button class="g-lib-open" type="button" data-open-topic="'+item.number+'" aria-label="Mở '+safe(label)+'">Học ngay <span aria-hidden="true">↗</span></button></div>':
      '<div class="g-lib-card-footer"><span>Chưa xuất bản</span></div>')+'</article>';
}
function render(){
 const mount=document.getElementById("pageMount");
 if(!mount)return;
 const groups=[[0,8,"Nền tảng","Chuyên đề 1–8"],[8,16,"Cấu trúc và từ loại","Chuyên đề 9–16"],[16,25,"Ứng dụng và nâng cao","Chuyên đề 17–25"]];
 mount.style.display="block";
 mount.innerHTML='<main class="g21 grammar-library">'+
   '<div class="g-lib-breadcrumb"><button type="button" data-lib-home>← Trang chủ</button><span>/</span><span>Grammar</span></div>'+
   '<header class="g-lib-hero"><div><span class="g-lib-eyebrow">GRAMMAR · LEARNING LIBRARY</span>'+
      '<h1>25 chuyên đề <em>ngữ pháp</em></h1>'+
      '<p>Học lý thuyết ngắn gọn, luyện từng câu và xem giải thích chi tiết. Sắp xếp theo thứ tự 1–25 để dễ tìm và tiếp tục.</p></div>'+
     '<div class="g-lib-stats"><div><b>25</b><span>Chuyên đề</span></div><div><b>14</b><span>Đã mở</span></div><div><b>05</b><span>Giai đoạn học</span></div></div></header>'+
   '<section class="g-lib-status-strip"><div><span class="g-lib-dot"></span><b>Có thể học ngay:</b> Chuyên đề 1–11, 19, 21 và 22</div>'+
     '<span>Những chuyên đề còn lại hiển thị để bạn theo dõi lộ trình</span></section>'+
   groups.map(([start,end,title,sub])=>
     '<section class="g-lib-section"><div class="g-lib-section-heading"><div><span>'+sub+'</span><h2>'+title+'</h2></div>'+
     '<strong>'+String(end-start).padStart(2,"0")+' chuyên đề</strong></div>'+
     '<div class="g-lib-grid">'+catalog.slice(start,end).map(card).join("")+'</div></section>'
   ).join("")+
   '<footer class="g-lib-foot">Bản học thử dành cho giáo viên · Mỗi chuyên đề lưu tiến độ riêng trên trình duyệt.</footer>'+
 '</main>';
 if(!mount.dataset.grammarLibraryBound){
   mount.addEventListener("click",e=>{
    if(location.hash.replace(/^#/,"")!=="teacher/grammar")return;
    const open=e.target.closest("[data-open-topic]");
    if(open){location.hash="teacher/grammar/topic-"+open.dataset.openTopic;return;}
    if(e.target.closest("[data-lib-home]"))location.hash="";
   });
   mount.dataset.grammarLibraryBound="1";
 }
}
g.TeacherGrammarLibrary={render,catalog};
})(window);