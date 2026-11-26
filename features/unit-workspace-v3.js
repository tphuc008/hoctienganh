/* Compact mini-icon unit workspace. Content and answer instructions stay in the existing engines. */
(function(global){
 "use strict";
 const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 const shapes={
  book:'<path d="M12 6c-3-3-7-3-10-1v15c3-2 7-2 10 1 3-3 7-3 10-1V5c-3-2-7-2-10 1Zm0 0v15"/>',
  file:'<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6m-6 4h6m-6 4h4"/>',
  level:'<path d="M4 20v-5m5 5V11m5 9V7m5 13V3"/>',
  layers:'<path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5"/>',
  brain:'<path d="M12 18V6a4 4 0 0 0-8-.5A4 4 0 0 0 3 13a4 4 0 0 0 3 6 3 3 0 0 0 6-1Zm0 0V6a4 4 0 0 1 8-.5A4 4 0 0 1 21 13a4 4 0 0 1-3 6 3 3 0 0 1-6-1ZM8 9c0 2-1 3-3 3m11-3c0 2 1 3 3 3"/>',
  check:'<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
  play:'<circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4z"/>',
  spark:'<path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z"/>',
  arrow:'<path d="M6 18 18 6M7 6h11v11"/>',
  review:'<path d="M20 8a8 8 0 0 0-14-2L3 9m0-6v6h6m-5 7a8 8 0 0 0 14 2l3-3m0 6v-6h-6"/>',
  search:'<circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/>',
  list:'<path d="M10 6h11M10 12h11M10 18h11M3 6l1 1 3-3M3 12l1 1 3-3M3 18l1 1 3-3"/>',
  school:'<path d="m2 10 10-7 10 7M5 9v12h14V9M10 21v-6h4v6"/>',
  home:'<path d="m3 10 9-7 9 7M5 9v12h14V9M10 21v-6h4v6"/>',
  friends:'<circle cx="9" cy="8" r="4"/><path d="M2 21v-3a7 7 0 0 1 14 0v3m1-17a4 4 0 0 1 0 8m1 3a6 6 0 0 1 4 6"/>',
  globe:'<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',
  leaf:'<path d="M5 20C-1 8 10 3 21 3c0 12-7 20-16 17Zm0 0L17 7"/>',
  city:'<path d="M3 21V9h6v12m0 0V3h8v18m0 0V12h4v9M2 21h20M12 7h2m-2 4h2m-2 4h2"/>',
  case:'<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V3h8v4M3 12h18m-11 0v3h4v-3"/>',
  chip:'<rect x="5" y="5" width="14" height="14" rx="3"/><rect x="9" y="9" width="6" height="6" rx="1"/><path d="M9 2v3m6-3v3M9 19v3m6-3v3M2 9h3m-3 6h3m14-6h3m-3 6h3"/>',
  media:'<rect x="3" y="4" width="18" height="13" rx="2"/><path d="m10 8 5 3-5 3zM8 21h8m-4-4v4"/>',
  wild:'<ellipse cx="5" cy="8" rx="2" ry="3"/><ellipse cx="10" cy="5" rx="2" ry="3"/><ellipse cx="15" cy="5" rx="2" ry="3"/><ellipse cx="20" cy="9" rx="2" ry="3"/><path d="M5 18c1-3 4-3 5-6 1-2 3-2 4 0 1 3 4 3 5 6 1 4-4 4-7 2-3 2-8 2-7-2Z"/>',
  health:'<path d="M12 21 3 12C-3 4 7-1 12 7c5-8 15-3 9 5Z"/><path d="M4 12h5l2-4 3 8 2-4h4"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 3"/>',
  camera:'<rect x="3" y="7" width="18" height="14" rx="2"/><path d="m7 7 2-4h6l2 4"/><circle cx="12" cy="14" r="4"/>',
  music:'<path d="M9 18V6l12-3v12M9 9l12-3"/><ellipse cx="6" cy="18" rx="3" ry="2"/><ellipse cx="18" cy="15" rx="3" ry="2"/>'
 };
 const icon=name=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(shapes[name]||shapes.book)+'</svg>';
 const topics={6:{1:["school","blue"],2:["home","amber"],3:["friends","violet"]},9:{1:["friends","green"],2:["city","amber"],3:["health","rose"],4:["clock","amber"],5:["camera","indigo"]},10:{3:["music","violet"]},12:{1:["file","blue"],2:["globe","violet"],3:["leaf","green"],4:["city","amber"],5:["case","slate"],6:["chip","indigo"],7:["media","rose"],8:["wild","green"]}};
 const meta=(name,label)=>'<span class="uw-meta-item">'+icon(name)+'<span>'+esc(label)+'</span></span>';
 const metaGroup=items=>'<div class="uw-meta">'+items.map(x=>meta(x[0],x[1])).join("")+'</div>';
 function introMeta(count,level,extra){return '<div class="uw-intro-meta">'+metaGroup([["file",count],["level",level],...(extra?[["book",extra]]:[])].filter(x=>x[1]))+'</div>'}
 function crumb(grade,label){return '<nav class="uw-breadcrumb" aria-label="Điều hướng"><a href="#tutoring">Học thêm</a><span aria-hidden="true">›</span><a href="#grade-'+grade+'">Lớp '+grade+'</a><span aria-hidden="true">›</span><span aria-current="page">'+esc(label)+'</span></nav>'}
 function hero(grade,id,title,eyebrow,items,review=false){
  const [symbol,tone]=review?["review","blue"]:topics[grade]?.[id]||["book","blue"];
  return '<header class="uw-hero uw-tone-'+tone+'"><div class="uw-hero-copy"><div class="uw-eyebrow">GRADE '+grade+' · '+esc(eyebrow)+'</div><h1>'+esc(title)+'</h1>'+metaGroup(items)+'</div><span class="uw-hero-icon">'+icon(symbol)+'</span></header>';
 }
 function card(o,set){
  const latest=/bài mới nhất/i.test(set.title),standard=/^Vocabulary Practice \d+$/i.test(set.title);
  const title=standard?"Practice "+String(set.setNo).padStart(2,"0"):set.title;
  let glyph=set.pending?"clock":latest?"spark":set.context?"search":set.review?"review":o.test?"list":o.semantic?"brain":"file";
  let tone=set.pending?"slate":latest?"violet":set.context?"green":set.review?"amber":o.semantic?"indigo":"blue";
  // Preserve published difficulty labels; color only known distinct easy/intermediate/hard tiers.
  if(!o.semantic&&!o.review&&!set.context&&!latest&&!set.pending){
   const n=String(set.name||"").toLowerCase();
   if(/^(easy|dễ)$/.test(n)){glyph="level";tone="green"}
   else if(/^(intermediate|medium|trung bình)$/.test(n)){glyph="level";tone="blue"}
   else if(/^(hard|khó|advanced)$/.test(n)){glyph="level";tone="violet"}
  }
  const status=set.pending?["clock","Chờ đề"]:set.inProgress?["play","Đang làm"]:set.completed?["check","Đã làm"]:null;
  const count=set.pending?"Chờ đề":set.context?"10 từ / Set":set.count+" câu";
  const heading='<div class="uw-card-top"><span class="uw-symbol">'+icon(glyph)+'</span><span class="uw-set-no">SET '+String(set.setNo).padStart(2,"0")+'</span><span class="uw-arrow">'+icon("arrow")+'</span></div><h3>'+esc(title)+'</h3>'+metaGroup([["file",count],...(set.level?[["level",set.level]]:[])])+(status&&!set.pending?'<div class="uw-status '+(set.inProgress?"is-progress":"is-done")+'">'+icon(status[0])+esc(status[1])+'</div>':"");
  return '<a class="uw-card uw-tone-'+tone+'" href="#'+esc(set.route)+'">'+heading+'</a>';
 }
 function render(mount,o){
  const active=o.sets.filter(x=>!x.pending),levels=[...new Set(active.map(x=>x.level).filter(Boolean))];
  const displayId=o.id===88?8:o.id,items=[["layers",o.sets.length+" Sets"]];
  if(levels.length===1)items.push(["level",levels[0]]);
  mount.innerHTML='<div class="uw-workspace">'+crumb(o.grade,o.unitLabel)+hero(o.grade,displayId,o.title,o.eyebrow,items,o.review)+
   '<section class="uw-section"><div class="uw-section-head"><h2>'+(o.review?"Ôn tập":"Practice Sets")+'</h2><span>'+o.sets.length+' bài</span></div><div class="uw-grid">'+o.sets.map(x=>card(o,x)).join("")+'</div></section></div>';
 }
 function grade6Header(o){
  const tabs=[["knowledge","book","Kiến thức"],["original","list","Bài tập gốc"],["practice","file","Luyện tập thêm"]];
  return '<div class="uw-g6-head">'+crumb(6,"Unit "+o.unit)+hero(6,o.unit,o.title,"UNIT "+String(o.unit).padStart(2,"0"),[["book",o.words+" từ vựng"],["list",o.original+" bài tập gốc"],["file",o.practice+" câu luyện thêm"]])+
   '<nav class="uw-g6-tabs" aria-label="Phần học trong Unit '+o.unit+'">'+tabs.map(x=>'<a href="#'+esc(o.base+(x[0]==="knowledge"?"":"/"+x[0]))+'"'+(x[0]===o.tab?' aria-current="page"':'')+'>'+icon(x[1])+'<span>'+x[2]+'</span></a>').join("")+'</nav></div>';
 }
 global.UnitWorkspace=Object.freeze({render,grade6Header,introMeta});
})(window);
