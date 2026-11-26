/* Direct entry portal: existing access checks remain in enterArea and route. */
(function(global){
 "use strict";
 const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 const paths={
  school:'<path d="m3 10 9-7 9 7M5 9v12h14V9M10 21v-6h4v6M8 11h1m6 0h1"/><circle cx="12" cy="9" r="1.4"/>',
  book:'<path d="M12 6C9 3 5 3 2 5v15c3-2 7-2 10 1 3-3 7-3 10-1V5c-3-2-7-2-10 1Zm0 0v15M5 9l4 1M5 13l4 1m6-4 4-1m-4 5 4-1"/>',
  list:'<path d="M10 6h11M10 12h11M10 18h11M3 6l1 1 3-3M3 12l1 1 3-3M3 18l1 1 3-3"/>',
  reading:'<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6m-6 4h6m-6 4h4"/>',
  headphones:'<path d="M3 14v-3a9 9 0 0 1 18 0v3M3 13h3a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zm18 0h-3a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2z"/>',
  language:'<path d="m2 19 6-14 6 14M4 14h8m3-4h7m-5 0v5a3 3 0 0 0 5 2m0-7v9"/>',
  trophy:'<path d="M8 3h8v8a4 4 0 0 1-8 0ZM8 5H3v3a4 4 0 0 0 5 4m8-7h5v3a4 4 0 0 1-5 4m-4 3v5m-5 1h10"/>',
  arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',
  lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 5v2"/>'
 };
 const icon=k=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(paths[k]||paths.book)+'</svg>';
 const cards=[
  {id:"school",name:"Học trên trường",tag:"SCHOOL",icon:"school",desc:"Chương trình tiếng Anh lớp 10",items:[["book","Vocabulary"],["reading","Ôn tập"],["list","Kiểm tra"]]},
  {id:"tutoring",name:"Học thêm",tag:"TUTORING",icon:"book",desc:"Phát triển năng lực tiếng Anh",items:[["language","Vocabulary"],["reading","Reading"],["headphones","Listening"]]}
 ];
 function areaCard(c,access){
  return '<button type="button" class="pw-card pw-'+c.id+'" data-portal-enter="'+c.id+'" aria-label="Vào khu vực '+esc(c.name)+'">'+
   '<span class="pw-banner"><span class="pw-kicker">'+c.tag+'</span><span class="pw-title">'+c.name+'</span><span class="pw-art">'+icon(c.icon)+'</span></span>'+
   '<span class="pw-body"><span class="pw-desc">'+esc(c.desc)+'</span><span class="pw-modules">'+c.items.map(x=>'<span>'+icon(x[0])+esc(x[1])+'</span>').join("")+'</span>'+
   '<span class="pw-access">'+icon("lock")+esc(access)+'</span><span class="pw-footer"><span>Vào khu vực học</span>'+icon("arrow")+'</span></span></button>';
 }
 function teacher(){
  return '<section class="pw-teacher" aria-label="Dành cho giáo viên"><h2>Dành cho giáo viên</h2><div class="pw-teacher-grid">'+
   [["grammar","language","Grammar"],["hsg-tinh","trophy","HSG tỉnh"]].map(x=>'<a class="pw-teacher-card" href="#teacher/'+x[0]+'"><span class="pw-mini">'+icon(x[1])+'</span><span>'+x[2]+'</span>'+icon("arrow")+'</a>').join("")+'</div></section>';
 }
 function render(mount,opt){
  mount.innerHTML='<div class="pw-portal" id="portalWorkspace"><header class="pw-heading"><span class="pw-eyebrow">LEARNING WORKSPACE</span><h1>Chào mừng trở lại'+(opt.name&&opt.name!=="Học viên"?", "+esc(opt.name):"")+'!</h1><p>Chọn không gian học tập của bạn.</p></header><div class="pw-grid" aria-label="Khu vực học tập">'+cards.map(c=>areaCard(c,opt.accessLabel(c.id))).join("")+'</div>'+(opt.teacherPreview?teacher():"")+'</div>';
  mount.querySelectorAll("[data-portal-enter]").forEach(b=>b.addEventListener("click",()=>opt.enter(b.dataset.portalEnter)));
 }
 global.PortalWorkspace=Object.freeze({render});
})(window);
