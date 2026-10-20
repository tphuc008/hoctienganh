/* Account-wide result history; registered as an independent feature module. */
(function(){
  "use strict";
  function esc(value){return String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
  function stamp(iso){
    try{return new Intl.DateTimeFormat("vi-VN",{dateStyle:"medium",timeStyle:"short",timeZone:"Asia/Ho_Chi_Minh"}).format(new Date(iso))}
    catch(_){return ""}
  }
  const names={exam:"Đề thi",school:"Học trên trường",listening:"Listening",grammar:"Grammar",vocabulary:"Vocabulary",reading:"Reading"};
  function row(title,subtitle,value,date){
    return '<div class="review-item" style="margin-bottom:10px">'+
      '<div class="review-q">'+esc(title)+'</div>'+
      '<div class="review-meta"><span class="tag">'+esc(subtitle)+'</span>'+
        '<span class="tag good">'+esc(value)+'</span><span class="tag">'+esc(stamp(date))+'</span></div>'+
    '</div>';
  }
  async function renderHistory(){
    const mount=document.getElementById("pageMount");
    if(!mount)return;
    mount.style.display="block";
    mount.innerHTML='<div class="breadcrumbs"><button class="crumb-btn" onclick="location.hash=\'\'">Home</button><span>›</span><span>Lịch sử học tập</span></div>'+
      '<div class="unit-hero"><div class="eyebrow">Learning history</div><h1>Lịch sử học tập</h1><p>Kết quả được lưu theo tài khoản học viên.</p></div>'+
      '<div id="learningHistoryList" role="status">Đang tải kết quả…</div>';
    const list=document.getElementById("learningHistoryList");
    try{
      const session=await window.ensureLearnerSession();
      if(!session?.user?.id)throw new Error("Vui lòng đăng nhập lại");
      const hdr={apikey:window.SUPABASE_KEY,Authorization:"Bearer "+session.access_token};
      const root=window.SUPABASE_URL+"/rest/v1/";
      const uid=encodeURIComponent(session.user.id);
      const resources=[
        "practice_submissions?select=category,exercise_slug,correct_answers,total_questions,created_at&user_id=eq."+uid+"&order=created_at.desc&limit=100",
        "scores?select=grade,unit_no,set_no,first_try_correct,total_questions,created_at&user_id=eq."+uid+"&order=created_at.desc&limit=50",
        "reading_submissions?select=exercise_title,score,total_questions,created_at&user_id=eq."+uid+"&order=created_at.desc&limit=50"
      ];
      const replies=await Promise.all(resources.map(path=>fetch(root+path,{headers:hdr})));
      const [generic,vocab,reading]=await Promise.all(replies.map(async(res,i)=>{
        if(!res.ok){console.warn("History data source unavailable",i,res.status);return []}
        return res.json();
      }));
      if(!list.isConnected)return;
      const primary=generic.map(x=>row(x.exercise_slug,names[x.category]||x.category,
        x.correct_answers+"/"+x.total_questions,x.created_at)).join("");
      const legacyVocab=vocab.map(x=>row("Lớp "+x.grade+" · Unit "+x.unit_no+" · Set "+x.set_no,
        "Vocabulary · kết quả cũ",x.first_try_correct+"/"+x.total_questions,x.created_at)).join("");
      const legacyReading=reading.map(x=>row(x.exercise_title,"Reading · kết quả cũ",
        x.score+"/"+x.total_questions,x.created_at)).join("");
      list.removeAttribute("role");
      list.innerHTML=(primary?'<div class="section-title"><h2>Kết quả mới</h2><span>'+generic.length+' lượt gần đây</span></div>'+primary:"")+
        (legacyVocab||legacyReading?'<div class="section-title"><h2>Lịch sử từ hệ thống riêng (có thể trùng kết quả mới)</h2></div>'+legacyVocab+legacyReading:"")+
        (!primary&&!legacyVocab&&!legacyReading?'<div class="empty"><b>Chưa có bài hoàn thành</b>Kết quả sẽ xuất hiện sau khi bạn nộp bài.</div>':"");
    }catch(err){
      console.error(err);
      if(list.isConnected)list.textContent="Chưa tải được lịch sử. Kiểm tra kết nối và thử mở lại trang.";
    }
  }
  LearningCore.register({id:"learning-history",route:"history",title:"Lịch sử học tập",category:"history",render:renderHistory});
  window.renderLearningHistory=renderHistory;
})();
