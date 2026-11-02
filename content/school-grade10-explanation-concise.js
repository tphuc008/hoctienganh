/* Concision pass for School Grade 10 explanations.
 * Runs after original source-grounded banks load. Keeps keys, answer flags,
 * evidence quotes, bilingual examples, source warnings and review status.
 * Editorial text only; does not change grading. */
(function(g){
'use strict';
const bank=g.SCHOOL_G10_DETAILED_EXPLANATIONS;
if(!bank)return;
const simple=s=>String(s||'').replace(/\s+/g,' ').trim();
const clip=(s,n)=>{
 s=simple(s);if(s.length<=n)return s;
 const pos=s.lastIndexOf(' ',n);
 return s.slice(0,pos>n*.7?pos:n).replace(/[,;:\s]+$/,'')+'…';
};
for(const [id,d] of Object.entries(bank)){
 const group=id.split(':')[1],cat=group[0];
 if(cat==='D'){
   let q=d.quickReason||'';
   q=q.replace(/\.\s*Kiểm tra cặp lời hỏi–đáp[\s\S]*$/,'.');
   const m=q.match(/^Thứ tự ([a-e-]+) mở đầu bằng “([^”]+)” và kết bằng “([^”]+)”\./i);
   if(m)q='Thứ tự '+m[1].toUpperCase()+': “'+clip(m[2],50)+'” → … → “'+clip(m[3],50)+'”.';
   d.quickReason=q;
 }
 if(cat==='A')d.quickReason=(d.quickReason||'').replace(/\s*(?:Sự khác biệt nằm ở âm đang được gạch chân, không phải toàn bộ từ|Đối chiếu trọng âm chính chứ không đếm số âm tiết)\./g,'.').replace(/\.\.$/,'.');
 if(id==='3:C-2:7'){
   d.quickReason='Sau “saw + tân ngữ”, dùng “cross” ở dạng nguyên mẫu không “to”.';
   d.reasoning='See/saw + tân ngữ + bare infinitive mô tả hành động được chứng kiến; trong câu là “saw her cross”.';
 }
 for(const ev of d.evidence||[]){
  if(!ev||typeof ev!=='object')continue;
  if(simple(ev.note)===simple(d.quickReason)||simple(ev.note)===simple(d.reasoning)||
    /Mối liên kết giữa các lời thoại\/ý/.test(ev.note||''))ev.note='';
  if(id==='3:C-2:7')ev.note='';
 }
 if(d.options?.length===4 && d.options.some(o=>simple(o.analysis)))d.reasoning='';
 if(cat==='B'&&d.examples?.length===4&&/Bốn ví dụ Anh–Việt/.test(d.application||''))d.application='';
 if(cat==='E'&&/^Khi tự luyện, gạch chân/.test(d.application||''))d.application='So sánh ý và phạm vi nghĩa, không chỉ từ khóa.';
 if(group==='A-1'&&/Luyện đọc riêng âm/.test(d.application||''))d.application='So sánh âm được gạch chân.';
 if(group==='A-2'&&/Khi học từ nhiều âm/.test(d.application||''))d.application='Chú ý trọng âm chính và từ loại.';
 if(cat==='D'&&/Cách thử:/.test(d.application||''))d.application='Đối chiếu cặp hỏi–đáp và đại từ tham chiếu.';
 if(id.startsWith('4:C-')&&/^Đối chiếu: “I was reading/.test(d.application||''))d.application='Ví dụ: I was reading when the phone rang.';
 if(id.startsWith('3:C-3:')&&/^Ví dụ mới:/.test(d.application||''))d.application=d.application.split('; ')[0].replace(/^Ví dụ mới:/,'Ví dụ:');
 for(let i=0;i<(d.options||[]).length;i++){
  const o=d.options[i];let s=o.analysis||'';
  if(group==='A-1'){
   const m=s.match(/Phần gạch chân của “([^”]+)” đọc (\/[^/]+\/)/);
   if(m)s='“'+m[1]+'”: '+m[2]+(o.correct?' (khác nhóm)':'')+'.';
  }else if(group==='A-2'){
   const m=s.match(/“([^”]+)” nhấn (?:trọng âm chính ở )?âm tiết (\d+)/);
   if(m)s='“'+m[1]+'”: trọng âm âm tiết '+m[2]+(o.correct?' (khác nhóm)':'')+'.';
  }else if(cat==='B'){
   s=s.replace(' là phương án được chọn vì: ',': ');
   const ex=s.match(/^(“[^”]+”) có cách dùng khác, ví dụ “([^”]+)”/);
   if(ex)s=ex[1]+': ví dụ “'+ex[2]+'”.';
   s=s.replace(/\. (?:Chỗ trống giữa|Bài yêu cầu)[\s\S]*$/,'.');
  }else if(cat==='D'){
   if(/ giữ đúng chuỗi lượt lời và móc nối: /.test(s))
    s=s.split(' giữ đúng chuỗi lượt lời và móc nối: ')[0]+': đáp án theo mạch câu ở bước 01.';
   else if(/ lệch ngay ở vị trí /.test(s))
    s=s.split(';')[0].replace(/\)\.$/,').');
  }else if(cat==='C'){
   s=s.replace(' không tạo đúng cấu trúc động từ cần sau từ chi phối trong câu: ',': sai dạng động từ; ')
       .replace(' tạo phối hợp thì/hình thức động từ khác với quan hệ nền–sự kiện: ',': sai phối hợp thì; ');
  }else if(cat==='E'){
   s=s.replace(' được hỗ trợ bằng dữ kiện sau: ',': ');
   if(/ thay đổi ý hoặc chức năng của thông tin tại vị trí hỏi/.test(s)){
    const t=(s.match(/^(“[^”]+”)/)||[])[1];
    if(t){
     if(/không đề cập|không nhắc đến/i.test(d.quickReason||''))
      s=t+': ý này đã được bài nhắc đến, nên không phải đáp án NOT mentioned.';
     else if(/danh từ đếm được số nhiều|types of music/i.test(d.quickReason||'')&&/“(?:much|each|every)”/i.test(t))
      s=t+': không đứng trực tiếp trước danh từ đếm được số nhiều “types”.';
     else if(/liệt kê|pop, rock/i.test(d.quickReason||'')&&/“(?:or|so|but)”/i.test(t))
      s=t+': không nối các mục trong phép liệt kê này như “and”.';
     else s=t+': khác ý hoặc cấu trúc được chứng minh ở bước 01.';
    }
   }
  }
  if(s.length>205){if(s.includes('. Đối chiếu'))s=s.split('. Đối chiếu')[0]+'.';if(s.length>205)s=clip(s,200);}
  o.analysis=s.replace(/([.!?])”\.$/,'$1”').replace(/\.\.$/,'.');
 }
}
g.SCHOOL_G10_EXPLANATIONS_CONCISE_VERSION=1;
})(window);
