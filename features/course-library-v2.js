/* Shared, manifest-driven course catalogue. No changes to learning routes or grading. */
(function(global){
 "use strict";
 const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 const normalize=v=>String(v??"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/đ/gi,"d").toLowerCase().trim();
 const art={
  person:['blue','<rect x="13" y="7" width="38" height="50" rx="5"/><circle cx="32" cy="24" r="8"/><path d="M20 45c2-12 22-12 24 0M23 51h18"/>'],
  globe:['violet','<circle cx="32" cy="32" r="23"/><ellipse cx="32" cy="32" rx="10" ry="23"/><path d="M9 32h46M14 19h36M14 45h36"/>'],
  leaf:['green','<path d="M13 51C2 20 27 8 55 7c2 29-13 56-42 44ZM13 51L46 17M28 35l-5-15M38 25l13 2"/>'],
  city:['amber','<rect x="8" y="26" width="15" height="29" rx="2"/><rect x="23" y="8" width="20" height="47" rx="2"/><rect x="43" y="33" width="13" height="22" rx="2"/><path d="M13 33h5m-5 8h5m10-25h10m-10 9h10m-10 9h10m-10 9h10m10-3h4m-4 7h4"/>'],
  case:['slate','<rect x="8" y="21" width="48" height="33" rx="5"/><path d="M23 21v-9h18v9M8 34h48"/><rect x="27" y="30" width="10" height="10" rx="2" fill="var(--cl-art-bg)"/>'],
  chip:['indigo','<rect x="13" y="13" width="38" height="38" rx="6"/><rect x="24" y="24" width="16" height="16" rx="2"/><path d="M23 5v8m9-8v8m9-8v8M23 51v8m9-8v8m9-8v8M5 23h8m-8 9h8m-8 9h8m38-18h8m-8 9h8m-8 9h8"/>'],
  media:['rose','<rect x="7" y="10" width="50" height="36" rx="5"/><path d="m27 19 15 9-15 9zM21 55h22M32 46v9"/>'],
  wild:['forest','<ellipse cx="15" cy="22" rx="6" ry="9" transform="rotate(-25 15 22)"/><ellipse cx="27" cy="14" rx="6" ry="9"/><ellipse cx="41" cy="15" rx="6" ry="9"/><ellipse cx="52" cy="25" rx="6" ry="9" transform="rotate(25 52 25)"/><path d="M14 43c3-6 10-8 14-15 3-5 8-5 11 0 4 7 11 10 13 16 4 12-8 14-19 9-10 5-24 2-19-10z"/>'],
  school:['blue','<path d="M7 27 32 9l25 18M13 24v31h38V24M26 55V40h12v15M19 30h5m16 0h5"/><circle cx="32" cy="25" r="4"/>'],
  home:['amber','<path d="m7 30 25-21 25 21M13 27v28h38V27M26 55V38h12v17"/><path d="M19 34h5m16 0h5"/>'],
  friends:['violet','<circle cx="24" cy="22" r="9"/><circle cx="44" cy="25" r="7"/><path d="M7 53v-7c0-17 34-17 34 0v7M43 38c11-1 16 4 16 12v3"/>'],
  community:['green','<path d="m5 29 14-12 14 12M9 27v22h20V27m6-5 12-10 13 11M39 20v29h17V20M16 49V36h6v13M44 31h6"/>'],
  health:['rose','<path d="M32 54 11 33C-3 17 17 4 32 21 47 4 67 17 53 33Z"/><path d="M9 32h13l5-9 7 18 6-9h15"/>'],
  memory:['amber','<circle cx="32" cy="32" r="23"/><path d="M32 17v16l10 7M32 9v5M55 32h-5M32 55v-5M9 32h5"/>'],
  experience:['indigo','<rect x="7" y="20" width="50" height="35" rx="5"/><path d="m18 20 5-9h18l5 9"/><circle cx="32" cy="37" r="11"/><path d="M48 27h3"/>'],
  music:['violet','<path d="M24 47V17l29-8v32M24 22l29-8"/><ellipse cx="16" cy="48" rx="8" ry="6"/><ellipse cx="45" cy="42" rx="8" ry="6"/>'],
  review:['blue','<path d="M52 24a22 22 0 0 0-38-7L8 24m0-12v12h12M12 40a22 22 0 0 0 38 7l6-7m0 12V40H44"/><path d="m24 33 6 6 12-14"/>'],
  exam:['slate','<rect x="13" y="8" width="38" height="49" rx="5"/><path d="M24 8v6h16V8M21 25l3 3 5-6m5 4h9M21 38l3 3 5-6m5 4h9M21 50h22"/>'],
  book:['blue','<path d="M32 16C24 9 14 8 6 12v39c10-4 18-3 26 4 8-7 16-8 26-4V12c-8-4-18-3-26 4Zm0 0v39M13 23l12 4m-12 8 12 4m14-12 12-4m-12 16 12-4"/>']
 };
 const themes={6:{1:"school",2:"home",3:"friends"},9:{1:"community",2:"city",3:"health",4:"memory",5:"experience"},10:{3:"music"},12:{1:"person",2:"globe",3:"leaf",4:"city",5:"case",6:"chip",7:"media",8:"wild"}};
 const svg=name=>'<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(art[name]||art.book)[1]+'</svg>';
 const arrow='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';
 const searchIcon='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/></svg>';
 function number(u){return u.displayUnitNumber||u.id}
 function title(u){return u.subtitle?String(u.subtitle).split(" · ")[0]:u.title}
 function details(u){const extra=String(u.subtitle||"").split(" · ").slice(1).join(" · ");return extra||(u.type==="lesson-practice"?"Kiến thức & bài tập":"Vocabulary & Practice")}
 function theme(grade,u){return u.review?"review":u.midterm?"exam":themes[grade.id]?.[number(u)]||"book"}
 function wrapper(u,cls,content,query){
  const attrs=' class="'+cls+'" data-cl-item data-cl-search="'+esc(normalize(query))+'"';
  return u.live?'<a'+attrs+' href="#'+esc(u.route)+'">'+content+'</a>':'<div'+attrs+' aria-disabled="true">'+content+'</div>';
 }
 function unitCard(grade,u,index){
  const key=theme(grade,u),tone=art[key][0],n=String(number(u)).padStart(2,"0");
  const label="UNIT "+n;
  return wrapper(u,"cl-card cl-tone-"+tone,
   '<div class="cl-art"><span class="cl-unit-label">'+esc(label)+'</span><span class="cl-art-circle"></span><span class="cl-art-icon">'+svg(key)+'</span></div>'+
   '<div class="cl-card-body"><h3>'+esc(title(u))+'</h3><p>'+esc(details(u))+'</p>'+
   '<div class="cl-card-footer"><span>'+(u.live?"Vào bài học":"Sắp ra mắt")+'</span>'+(u.live?arrow:"")+'</div></div>',
   u.title+" "+label+" "+u.subtitle+" "+details(u));
 }
 function extraCard(grade,u){
  const key=theme(grade,u),tone=art[key][0];
  return wrapper(u,"cl-extra cl-tone-"+tone,
   '<span class="cl-extra-icon">'+svg(key)+'</span><div class="cl-extra-copy"><h3>'+esc(u.title)+'</h3><p>'+esc(u.subtitle||"")+'</p></div><span class="cl-extra-action">'+(u.live?"Vào bài "+(u.midterm?"kiểm tra":"ôn tập"):"Sắp ra mắt")+'</span>'+(u.live?arrow:""),
   u.title+" "+u.subtitle+" "+(u.midterm?"kiểm tra đề thi midterm":"ôn tập review"));
 }
 function render(mount,grade,units){
  const normal=units.filter(u=>!u.review&&!u.midterm);
  const review=units.filter(u=>u.review),tests=units.filter(u=>u.midterm);
  const desc=grade.id===6?"Học kiến thức và luyện tập theo từng chủ đề.":"Phát triển vốn từ vựng qua từng chủ đề.";
  const count=(n,label)=>'<span class="cl-pill">'+n+' '+label+'</span>';
  const unitSection=normal.length?'<section class="cl-section" data-cl-section><div class="cl-section-head"><h2>Chương trình học</h2><span data-cl-count>'+normal.length+' Unit</span></div><div class="cl-grid">'+normal.map((u,i)=>unitCard(grade,u,i)).join("")+'</div></section>':"";
  const extraSection=(arr,label)=>arr.length?'<section class="cl-section cl-extras" data-cl-section><div class="cl-section-head"><h2>'+label+'</h2><span data-cl-count>'+arr.length+' bài</span></div><div class="cl-extra-grid">'+arr.map(u=>extraCard(grade,u)).join("")+'</div></section>':"";
  mount.innerHTML='<div class="cl-library">'+
   '<nav class="cl-breadcrumb" aria-label="Điều hướng"><a href="#tutoring">Học thêm</a><span aria-hidden="true">›</span><span aria-current="page">'+esc(grade.title)+'</span></nav>'+
   '<header class="cl-hero"><div class="cl-hero-copy"><span class="cl-eyebrow">ENGLISH COURSE · GRADE '+esc(grade.id)+'</span><h1>Tiếng Anh lớp '+esc(grade.id)+'</h1><p>'+esc(desc)+'</p><div class="cl-pills">'+count(normal.length,"Unit")+(review.length?count(review.length,"bài ôn tập"):"")+(tests.length?count(tests.length,"bộ đề kiểm tra"):"")+'</div></div><div class="cl-hero-art cl-tone-blue" aria-hidden="true"><svg viewBox="0 0 180 130" fill="none"><circle cx="91" cy="64" r="56" fill="#dce9ff"/><circle cx="91" cy="64" r="41" fill="#d1e2ff"/><g transform="rotate(-13 72 65)"><rect x="39" y="24" width="62" height="83" rx="8" fill="#fff" stroke="#9ebdf2" stroke-width="2"/><path d="M51 43h37M51 55h27M51 67h32M51 79h22" stroke="#b2caf6" stroke-width="4" stroke-linecap="round"/></g><g transform="rotate(12 110 67)"><rect x="82" y="29" width="55" height="76" rx="7" fill="#f9fbff" stroke="#86abec" stroke-width="2"/><path d="M93 46h33M93 57h24M93 68h29" stroke="#b2caf6" stroke-width="4" stroke-linecap="round"/><circle cx="121" cy="87" r="9" fill="#477ee0"/><path d="m117 87 3 3 5-6" stroke="#fff" stroke-width="2" stroke-linecap="round"/></g><path d="M154 22v12m-6-6h12M22 92v10m-5-5h10" stroke="#8aaef0" stroke-width="2" stroke-linecap="round"/></svg></div></header>'+
   (units.length?'<div class="cl-toolbar"><label class="cl-search">'+searchIcon+'<span class="cl-sr-only">Tìm kiếm Unit</span><input type="search" placeholder="Tìm kiếm Unit, chủ đề…" autocomplete="off"><button type="button" class="cl-clear" aria-label="Xóa tìm kiếm" hidden>×</button></label></div>':"")+
   unitSection+extraSection(review,"Ôn tập")+extraSection(tests,"Kiểm tra & luyện đề")+
   '<p class="cl-empty" role="status"'+(units.length?" hidden":"")+'>'+(units.length?"Không tìm thấy Unit hoặc bài tập phù hợp.":"Nội dung cho lớp này sẽ được bổ sung sau.")+'</p><p class="cl-sr-only" data-cl-status aria-live="polite"></p></div>';
  const root=mount.querySelector(".cl-library"),input=root.querySelector("input[type=search]");
  if(!input)return;
  const clear=root.querySelector(".cl-clear"),sections=[...root.querySelectorAll("[data-cl-section]")],empty=root.querySelector(".cl-empty"),status=root.querySelector("[data-cl-status]");
  function filter(){
   const q=normalize(input.value);let total=0;
   sections.forEach(section=>{
    const items=[...section.querySelectorAll("[data-cl-item]")];let n=0;
    items.forEach(item=>{const show=q.split(/\s+/).every(term=>item.dataset.clSearch.includes(term));item.hidden=!show;if(show)n++});
    section.hidden=n===0;total+=n;
    const c=section.querySelector("[data-cl-count]");c.textContent=n+(section.classList.contains("cl-extras")?" bài":" Unit");
   });
   empty.hidden=total>0;clear.hidden=!input.value;status.textContent=total+" kết quả";
  }
  input.addEventListener("input",filter);clear.addEventListener("click",()=>{input.value="";filter();input.focus()});
 }
 global.CourseLibrary=Object.freeze({render});
})(window);
