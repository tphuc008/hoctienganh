/* Unified, account-scoped history with exact-ID legacy reconciliation. */
(function(){
 "use strict";
 function esc(v){return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
 function stamp(iso){
  try{return new Intl.DateTimeFormat("vi-VN",{dateStyle:"medium",timeStyle:"short",timeZone:"Asia/Ho_Chi_Minh"}).format(new Date(iso))}
  catch(_){return ""}
 }
 const metric=x=>x.metric==="first_try"?"Đúng lần đầu":"Trả lời đúng";
 function itemHTML(x){
  const value=x.correct+"/"+x.total;
  const label=LearningHistoryCore.names[x.category]||x.category;
  const link=x.slug&&!x.slug.includes("/set-")?"#"+encodeURI(x.slug):"";
  return '<article class="review-item" style="margin-bottom:10px" data-category="'+esc(x.category)+'">'+
   '<div class="review-q">'+esc(x.title)+'</div>'+
   '<div class="review-meta"><span class="tag">'+esc(label)+'</span>'+
    '<span class="tag good">'+esc(metric(x))+': '+esc(value)+'</span>'+
    '<span class="tag">'+esc(stamp(x.date))+'</span>'+
    (x.source==="legacy"?'<span class="tag">Kết quả trước đây</span>':"")+'</div></article>';
 }
 async function renderHistory(){
  const mount=document.getElementById("pageMount");
  if(!mount)return;
  mount.style.display="block";
  mount.innerHTML='<div class="breadcrumbs"><button class="crumb-btn" onclick="location.hash=\'\'">Home</button><span>›</span><span>Lịch sử học tập</span></div>'+
   '<div class="unit-hero"><div class="eyebrow">Learning history</div><h1>Lịch sử học tập</h1>'+
   '<p>Mỗi lượt làm bài chỉ hiển thị một lần khi các nguồn cùng ghi nhận một mã nộp bài. Điểm Vocabulary/School là số câu đúng lần đầu.</p></div>'+
   '<div id="learningHistoryList" role="status">Đang tải kết quả…</div>';
  const list=document.getElementById("learningHistoryList");
  const route=location.hash;
  const owner=LearningCore.userId();
  try{
   const session=await window.ensureLearnerSession();
   if(!owner||session?.user?.id!==owner||!session.access_token)throw new Error("Vui lòng đăng nhập lại");
   const hdr={apikey:window.SUPABASE_KEY,Authorization:"Bearer "+session.access_token};
   const root=window.SUPABASE_URL+"/rest/v1/";
   const uid=encodeURIComponent(owner);
   const resources=[
    "practice_submissions?select=submission_id,category,exercise_slug,correct_answers,total_questions,created_at&user_id=eq."+uid+"&order=created_at.desc&limit=150",
    "scores?select=id,practice_submission_id,grade,unit_no,set_no,first_try_correct,total_questions,created_at&user_id=eq."+uid+"&order=created_at.desc&limit=150",
    "reading_submissions?select=id,submission_id,exercise_slug,exercise_title,score,total_questions,created_at&user_id=eq."+uid+"&order=created_at.desc&limit=150"
   ];
   const results=await Promise.all(resources.map(async(resource,i)=>{
    try{
     const res=await fetch(root+resource,{headers:hdr});
     if(!res.ok)throw new Error("HTTP "+res.status);
     const data=await res.json();
     if(!Array.isArray(data))throw new Error("Unexpected history response");
     return {data,failed:false};
    }catch(err){console.warn("History source unavailable",i,err);return {data:[],failed:true}}
   }));
   if(!list.isConnected||LearningCore.userId()!==owner||location.hash!==route)return;
   if(results.every(x=>x.failed))throw new Error("All history sources unavailable");
   const records=LearningHistoryCore.merge(results[0].data,results[1].data,results[2].data);
   const categories=[...new Set(records.map(x=>x.category))];
   const warning=results.some(x=>x.failed)
    ?'<p role="status" style="margin:10px 0;color:var(--muted)">Một nguồn lịch sử tạm thời chưa truy cập được; danh sách có thể chưa đầy đủ.</p>':"";
   const header='<div class="section-title"><h2>Kết quả học tập</h2><span>'+records.length+' lượt trong phạm vi dữ liệu đã tải</span></div>';
   const controls='<div id="historyFilters" role="group" aria-label="Lọc lịch sử" style="display:flex;flex-wrap:wrap;gap:8px;margin:12px 0">'+
    [{id:"all",label:"Tất cả"},...categories.map(c=>({id:c,label:LearningHistoryCore.names[c]||c}))].map(x=>
     '<button type="button" class="secondary" data-history-filter="'+esc(x.id)+'">'+esc(x.label)+'</button>').join("")+'</div>';
   list.removeAttribute("role");
   list.innerHTML=warning+header+(records.length?controls+'<div id="historyEntries"></div>':
    '<div class="empty"><b>Chưa có bài hoàn thành</b>Nộp bài để xem kết quả.</div>');
   const entries=document.getElementById("historyEntries"),buttons=list.querySelectorAll("[data-history-filter]");
   const paint=category=>{
    if(!entries)return;
    const shown=category==="all"?records:records.filter(x=>x.category===category);
    entries.innerHTML=shown.map(itemHTML).join("")||'<div class="empty">Không có kết quả trong danh mục này.</div>';
    buttons.forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.historyFilter===category)));
   };
   buttons.forEach(b=>b.addEventListener("click",()=>paint(b.dataset.historyFilter)));
   paint("all");
  }catch(err){
   console.error("History load failed",err);
   if(list.isConnected&&LearningCore.userId()===owner)list.textContent="Chưa tải được lịch sử. Kiểm tra kết nối và thử mở lại trang.";
  }
 }
 LearningCore.register({id:"learning-history",route:"history",title:"Lịch sử học tập",category:"history",render:renderHistory});
 window.renderLearningHistory=renderHistory;
})();
