/* Tutoring-only dashboard. Existing route, grading and auth stay authoritative. */
(function(global){
 "use strict";
 const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 const icon=(name)=>'<svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">'+({
 book:'<path d="M4 19V5a2 2 0 0 1 2-2h14v16H6a2 2 0 0 0 0 4h14M8 7h8M8 11h5"/>',
 arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',
 flame:'<path d="M12 22c-4 0-7-3-7-7 0-3 2-5 4-7 0 3 2 3 2 3s3-4 3-9c4 4 5 8 5 12 0 5-3 8-7 8z"/>',
 headphones:'<path d="M3 14v-3a9 9 0 0 1 18 0v3M3 13h3a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zm18 0h-3a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2z"/>',
 history:'<path d="M3 12a9 9 0 1 0 3-6L3 9m0-5v5h5m4-3v6l4 2"/>',
 check:'<path d="m5 12 4 4L19 6"/>',target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
 calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>'
 }[name]||"")+'</svg>';
 const tutoringSlug=s=>/^(grade-(6|9|10|12)(\/|$)|listening(\/|$)|grammar(\/|$))/.test(String(s||""));
 function routeFor(slug){
  if(!tutoringSlug(slug))return "";
  let route=String(slug).replace(/\/set-(\d+)(?:\/context)?$/,(_,n)=>"/vocabulary-practice-"+n);
  if(slug.startsWith("grammar/"))route=slug;
  if(global.LearningCore.resolve(route)||global.ContentManifest.matchSetRoute(route))return route;
  const grade=String(slug).match(/^grade-(6|9|10|12)(?:\/unit-(\d+))?/);
  if(grade){
   const unit=grade[2]?"grade-"+grade[1]+"/unit-"+grade[2]:"";
   if(unit&&global.LearningCore.resolve(unit))return unit;
   return "grade-"+grade[1];
  }
  return slug.startsWith("listening")?"listening":slug.startsWith("grammar")?"grammar":"";
 }
 function label(slug,fallback,units){
  const match=String(slug||"").match(/^grade-(\d+)\/unit-(\d+)(?:\/(?:set-|vocabulary-practice-)(\d+))?/);
  if(match){
   const u=units.find(x=>Number(x.grade)===Number(match[1])&&Number(x.id)===Number(match[2]));
   return "Lớp "+match[1]+" · "+(u?.title||"Unit "+match[2])+(match[3]?" · Set "+match[3]:"");
  }
  const entry=global.LearningCore.resolve(slug)||global.ContentManifest.entries.find(x=>x.route===slug);
  return entry?.title||fallback||"Bài luyện tập";
 }
 // Only show drafts belonging to the current learner, and only exact standard quiz routes.
 // The quiz engine revalidates the stored content signature before restoring answers.
 function findDraft(owner){
  if(!owner)return null;
  const prefix="hoctienganh:attempt:v1:"+owner+":quiz:";
  const candidates=[];
  try{
   for(let i=0;i<localStorage.length;i++){
    const key=localStorage.key(i);
    if(!key||!key.startsWith(prefix))continue;
    let slug;try{slug=decodeURIComponent(key.slice(prefix.length))}catch(_){continue}
    if(!/^grade-(9|10|12)\/unit-\d+\/set-\d+$/.test(slug))continue;
    try{
     const saved=JSON.parse(localStorage.getItem(key)||"null"),d=saved?.data;
     if(saved?.version!==1||!Array.isArray(d?.questions)||!d.questions.length||!Array.isArray(d.solved)||d.solved.length!==d.questions.length)continue;
     const done=d.solved.filter(Boolean).length,total=d.questions.length;
     if(done>=total)continue;
     const route=routeFor(slug);
     if(!route||!route.includes("/vocabulary-practice-"))continue;
     candidates.push({slug,route,done,total,updated:Number(saved.updatedAt)||0});
    }catch(_){}
   }
  }catch(_){}
  return candidates.sort((a,b)=>b.updated-a.updated)[0]||null;
 }
 function render(mount,opt){
  const owner=global.LearningCore.userId();
  const gradeCards=opt.grades.filter(g=>g.live).map(g=>{
   const units=opt.units.filter(u=>u.grade===g.id&&u.live&&!u.review&&!u.midterm);
   const desc={6:"Kiến thức & bài tập",9:"Từ vựng theo Unit",10:"Từ vựng & đề kiểm tra",12:"Từ vựng & đọc hiểu"}[g.id]||"Bài học & luyện tập";
   return '<a class="td-grade td-card" href="#grade-'+g.id+'"><div class="td-grade-top"><span class="td-grade-icon td-grade-'+g.id+'">'+String(g.id).padStart(2,"0")+'</span><span class="td-grade-count">'+units.length+' Unit</span></div><h3>'+esc(g.title)+'</h3><p>'+esc(desc)+'</p><div class="td-grade-bottom"><span>Vào lớp học</span>'+icon("arrow")+'</div></a>';
  }).join("");
  mount.innerHTML='<div class="td-dashboard" id="tutoringDashboard">'+
   '<nav class="td-breadcrumb" aria-label="Điều hướng"><a href="#">Trang chủ</a><span>›</span><span>Học thêm</span></nav>'+
   '<header class="td-heading"><div><span class="td-eyebrow">LEARNING WORKSPACE</span><h1>Chào mừng trở lại, '+esc(opt.name)+'!</h1><p>Hôm nay bạn muốn học gì?</p></div><a class="td-history-link" href="#history">'+icon("history")+' Lịch sử học tập '+icon("arrow")+'</a></header>'+
   '<div class="td-top"><section class="td-card td-continue" aria-labelledby="td-continue-title"><div class="td-continue-inner"><span class="td-eyebrow">CONTINUE LEARNING</span><div id="td-resume"><h2 id="td-continue-title">Bắt đầu học</h2><p>Chọn lớp học hoặc luyện tập Listening.</p><a class="td-primary" href="#td-classes" data-scroll-classes>Chọn lớp học '+icon("arrow")+'</a></div></div><div class="td-illustration" aria-hidden="true"><svg viewBox="0 0 160 130" fill="none"><circle cx="85" cy="65" r="59" fill="#dceafe"/><circle cx="85" cy="65" r="44" fill="#cbdfff"/><g transform="rotate(-11 81 65)"><rect x="40" y="20" width="78" height="94" rx="10" fill="#fff" stroke="#9bbcf6" stroke-width="2"/><rect x="51" y="34" width="32" height="8" rx="4" fill="#81aaf1"/><path d="M52 54h53M52 66h43M52 78h49" stroke="#c9dcfc" stroke-width="5" stroke-linecap="round"/><circle cx="98" cy="94" r="14" fill="#2563eb"/><path d="m92 94 4 4 7-8" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></g><path d="M129 14v15m-7-7h14M20 91v12m-6-6h12" stroke="#83a9ef" stroke-width="2" stroke-linecap="round"/></svg></div></section>'+
   '<section class="td-card td-activity" id="tutoringStreakCard" aria-label="Hoạt động học tập"><div class="td-card-head"><div><h2>Hoạt động học tập</h2><p>27 tuần gần nhất</p></div><div class="td-streak">'+icon("flame")+'<strong id="tutoringStreakNumber">—</strong><span>ngày streak</span></div></div><div class="streak-heatmap-pane"><div class="streak-months" id="tutoringStreakMonths"></div><div class="streak-chart-row"><div class="streak-weekdays" aria-hidden="true"><span></span><span></span><span>Tue</span><span></span><span>Thu</span><span></span><span>Sat</span></div><div class="streak-heatmap" id="tutoringStreakHeatmap" aria-label="Hoạt động theo ngày"></div></div><div class="streak-legend"><span>Ít</span><span class="streak-legend-cells" aria-hidden="true">'+[0,1,2,3,4].map(n=>'<i class="streak-cell level-'+n+'"></i>').join("")+'</span><span>Nhiều</span></div></div><div class="td-activity-foot" id="td-activity-foot" role="status">Đang tải hoạt động…</div></section></div>'+
   '<section class="td-stats" aria-label="Thống kê học tập">'+[['book','Bài đã nộp gần đây','td-stat-attempts'],['target','Điểm TB gần đây','td-stat-score'],['calendar','Ngày học tháng này','td-stat-days'],['flame','Streak cao nhất','td-stat-best']].map(x=>'<div class="td-card td-stat"><span class="td-stat-icon">'+icon(x[0])+'</span><div><strong id="'+x[2]+'">—</strong><span>'+x[1]+'</span></div></div>').join("")+'</section>'+
   '<div class="td-bottom"><section id="td-classes"><div class="td-section-head"><h2>Chọn lớp học</h2><span>'+opt.grades.filter(g=>g.live).length+' lớp</span></div><div class="td-grade-grid">'+gradeCards+'</div></section><aside class="td-side"><section class="td-skills"><div class="td-section-head"><h2>Luyện tập kỹ năng</h2><span>2 kỹ năng</span></div><div class="td-skill-grid"><a class="td-card td-listening td-skill" href="#listening"><span class="td-listen-icon">'+icon("headphones")+'</span><div><h3>IELTS Listening</h3><p>Luyện nghe qua video</p><span class="td-skill-action">Bắt đầu luyện nghe</span></div>'+icon("arrow")+'</a><a class="td-card td-listening td-skill" href="#grade-12/reading"><span class="td-listen-icon td-reading-icon">'+icon("book")+'</span><div><h3>IELTS Reading</h3><p>IELTS Academic · '+global.LearningCore.list({category:"reading",grade:12,listing:true}).length+' bài đọc</p><span class="td-skill-action">Bắt đầu luyện đọc</span></div>'+icon("arrow")+'</a></div></section></aside></div></div>';
  const root=mount.querySelector("#tutoringDashboard");
  root.querySelector("[data-scroll-classes]").addEventListener("click",e=>{e.preventDefault();root.querySelector("#td-classes").scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"})});
  const draft=findDraft(owner);
  if(draft)paintResume(root,draft,opt.units,true);
  // Draw calendar grid immediately but never imply zero activity before a successful read.
  opt.paintStreak([]);
  root.querySelector("#tutoringStreakNumber").textContent="—";
  load(root,owner,opt,draft);
 }
 function paintResume(root,item,units,isDraft){
  const el=root.querySelector("#td-resume"),route=item.route||routeFor(item.slug);
  if(!route)return;
  const pct=isDraft?Math.round(item.done/item.total*100):null;
  el.innerHTML='<h2 id="td-continue-title">'+(isDraft?"Tiếp tục học":"Ôn lại bài gần nhất")+'</h2><p>'+esc(label(item.slug,item.title,units))+'</p>'+
    (isDraft?'<div class="td-progress-label"><span>'+item.done+'/'+item.total+' câu đã hoàn thành</span><b>'+pct+'%</b></div><div class="td-progress" role="progressbar" aria-label="Tiến độ bài đang làm" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+pct+'"><span style="width:'+pct+'%"></span></div>':'<p class="td-resume-note">Mở lại nội dung đã học để luyện tập thêm.</p>')+
    '<a class="td-primary" href="#'+esc(route)+'">'+(isDraft?"Tiếp tục học":"Mở bài học")+' '+icon("arrow")+'</a>';
 }
 async function load(root,owner,opt,draft){
  const active=()=>root.isConnected&&location.hash==="#tutoring"&&global.LearningCore.userId()===owner;
  const set=(id,value)=>{const el=root.querySelector("#"+id);if(el)el.textContent=value};
  const fail=()=>{if(!active())return;set("td-activity-foot","Chưa tải được hoạt động. Mở lại trang để thử lại.");};
  try{
   const s=await opt.session();
   if(!owner||s?.user?.id!==owner||!s.access_token)throw Error("No learner session");
   const uid=encodeURIComponent(owner),hdr={apikey:global.SUPABASE_KEY,Authorization:"Bearer "+s.access_token},url=global.SUPABASE_URL+"/rest/v1/";
   const queries=[
    "learner_daily_activity?select=activity_date,activity_count&user_id=eq."+uid+"&order=activity_date.asc",
    "practice_submissions?select=submission_id,category,exercise_slug,correct_answers,total_questions,created_at&user_id=eq."+uid+"&order=created_at.desc&limit=150",
    "scores?select=id,practice_submission_id,grade,unit_no,set_no,first_try_correct,total_questions,created_at&user_id=eq."+uid+"&order=created_at.desc&limit=150",
    "reading_submissions?select=id,submission_id,exercise_slug,exercise_title,score,total_questions,created_at&user_id=eq."+uid+"&order=created_at.desc&limit=150"
   ];
   const results=await Promise.all(queries.map(async q=>{try{const res=await fetch(url+q,{headers:hdr});if(!res.ok)throw Error("HTTP "+res.status);const data=await res.json();if(!Array.isArray(data))throw Error("Invalid response");return data}catch(e){console.warn("Dashboard source unavailable",e);return null}}));
   if(!active())return;
   if(results[0]){
    const today=opt.today(),rows=results[0].filter(x=>String(x.activity_date)<=today);
    opt.paintStreak(rows);
    const days=[...new Set(rows.filter(x=>Number(x.activity_count)>0).map(x=>String(x.activity_date)))].sort();
    let run=0,best=0,prev="";
    for(const day of days){run=opt.previousDay(day)===prev?run+1:1;best=Math.max(best,run);prev=day}
    const month=days.filter(d=>d.startsWith(today.slice(0,7))).length;
    set("td-stat-days",month);set("td-stat-best",best);
    set("td-activity-foot",month+" ngày hoạt động trong tháng này · Giờ Việt Nam");
   }else set("td-activity-foot","Chưa tải được hoạt động học tập.");
   const history=results.slice(1),partial=history.some(x=>x===null);
   if(history.every(x=>x===null))return;
   const records=global.LearningHistoryCore.merge(history[0]||[],history[1]||[],history[2]||[]).filter(x=>tutoringSlug(x.slug));
   const valid=records.filter(x=>x.total>0&&x.correct>=0&&x.correct<=x.total);
   set("td-stat-attempts",(partial?"≥":"")+records.length);
   set("td-stat-score",partial||!valid.length?"—":Math.round(valid.reduce((sum,x)=>sum+x.correct/x.total,0)/valid.length*100)+"%");
   if(!draft&&records.length)paintResume(root,records.find(x=>routeFor(x.slug))||records[0],opt.units,false);
  }catch(e){console.warn("Tutoring dashboard load failed",e);fail()}
 }
 global.TutoringDashboard=Object.freeze({render});
})(window);
