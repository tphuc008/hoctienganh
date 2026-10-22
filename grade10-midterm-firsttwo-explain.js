/* Authored, source-aware Grade 12-standard midterm explanations for Tests 1 and 2.
 * Test 3–6 explanations remain untouched.
 */
(function(g){
"use strict";
const previous=g.G10_MIDTERM_EXPLAIN;
const usage=(w)=>g.G10_FIRSTTWO_USAGE?.[String(w||"").replace(/\s+/g," ").trim().toLowerCase()]||null;
function parts(stem){
 const map={};
 for(const line of String(stem||"").split("\n")){
  const m=line.trim().match(/^([a-g])\.\s*(.+)$/i);
  if(m)map[m[1].toLowerCase()]=(map[m[1].toLowerCase()]||"")+m[2]+" ";
  else if(Object.keys(map).length){const k=Object.keys(map).at(-1);map[k]+=line.trim()+" ";}
 }
 return map;
}
function sequences(q,base){
 const map=parts(q.stem);
 return q.options.map((choice,i)=>{
  const letters=String(choice).toLowerCase().match(/[a-g](?=\s*(?:[-–—]|$))/g)||[];
  const first=letters[0],second=letters[1],last=letters.at(-1);
  const a=(map[first]||"").trim().slice(0,170),b=(map[second]||"").trim().slice(0,170);
  return {label:"ABCD"[i],word:choice,
   en:(a&&b)?a+" → "+b:(base?.[i]?.en||""),
   vi:"Thử nối "+first+" → "+second+" và kiểm tra câu cuối "+last+". "+g.G10_FIRSTTWO_NOTES[q.id].notes[i]};
 });
}
const written={
"1-41":{why:"Thư gửi Win thường có lời chào, lời hỏi thăm, lý do viết thư, các minh họa về gia đình và kết thư. Một cách ghép hợp lý: d–e–b–a–c. Tuy nhiên thân thư có một số câu có thể đổi vị trí mà không phá nghĩa hoàn toàn.",steps:"d: lời chào hỏi sau Dear Win; e: giới thiệu chủ đề family; b: đưa trải nghiệm sinh hoạt chung; a: nhấn lòng biết ơn; c: kết luận rằng gia đình là chỗ dựa. Cần chú ý they phải có tiền ngữ family members và không đặt Warmly ở giữa thân thư.",example:"Dear Lan, I hope you are well. I am writing to thank you for your support. Your kindness meant a lot to me. Best wishes, Minh.",vi:"Lan thân mến, mong bạn khỏe. Mình viết để cảm ơn bạn đã giúp đỡ. Sự tử tế của bạn rất có ý nghĩa với mình. Chúc tốt lành, Minh.",remember:"Với thư: greeting → opening → main points/examples → closing → sign-off. Thứ tự thân đoạn không đơn trị nếu thiếu liên kết bắt buộc."},
"1-42":{why:"Đoạn văn nói về đi lại xanh. Phương án gợi ý a–c–e–b–d theo mạch: tưởng tượng một ngày không xe máy → hệ quả không khí sạch và đường yên tĩnh → mở rộng sang đi bộ/đạp xe → lợi ích sức khỏe và môi trường → kết luận hành động nhỏ.",steps:"a đưa giả định Imagine if; c dùng The air ... như kết quả của a; e đề nghị hành động mới; b bắt đầu Not only would we..., trả lời hệ quả e; d khái quát These small actions. Không đặt d đầu vì These chưa có tiền ngữ.",example:"If more students cycled to school, traffic would fall. The streets would be quieter, and the air could improve. Small changes can make a difference.",vi:"Nếu nhiều học sinh đạp xe tới trường, giao thông sẽ giảm. Đường phố sẽ yên tĩnh hơn và không khí có thể tốt hơn. Thay đổi nhỏ có thể tạo khác biệt.",remember:"Đoạn vận động: đề xuất/giả định → hệ quả → biện pháp mở rộng → lợi ích → tổng kết."},
"1-43":{why:"Các câu lập luận vì sao nghe nhạc buồn có thể đem lại sự an ủi. Thứ tự tham khảo e–c–b–a–d: nêu nghịch lý → mô tả nhịp điệu như người bạn → nói cảm giác bớt cô đơn → giải thích mối liên hệ tâm lý → kết luận.",steps:"e là câu chủ đề; c cụ thể hóa đặc điểm gentle rhythms; b có these melodies hồi chỉ âm thanh trong c; a có This psychological connection hồi chỉ cảm giác được đồng cảm ở b; d dùng Ultimately để chốt luận điểm.",example:"Listening to familiar songs may comfort us. Their melodies can remind us that others have similar feelings. This connection helps us feel less alone.",vi:"Nghe những bài hát quen thuộc có thể an ủi ta. Giai điệu nhắc rằng người khác cũng có cảm xúc tương tự. Sự kết nối này giúp ta bớt cô đơn.",remember:"Kiểm tra từ hồi chỉ this/these và tín hiệu kết luận Ultimately; tránh xếp câu dựa đơn thuần vào trật tự từ nối."},
"1-44":{why:"Chủ động hiện tại đơn: My mother does the laundry every day. Chuyển tân ngữ the laundry thành chủ ngữ, dùng is done, có thể giữ by my mother và every day.",steps:"Bước 1 chọn the laundry làm chủ ngữ mới; bước 2 laundry là không đếm được → is; bước 3 động từ does có V3 là done; bước 4 giữ tác nhân by my mother. Không dùng is doing vì đó là chủ động tiếp diễn.",example:"My father washes the car every Sunday. → The car is washed by my father every Sunday.",vi:"Bố tôi rửa xe mỗi Chủ Nhật. → Chiếc xe được bố tôi rửa mỗi Chủ Nhật.",remember:"Bị động hiện tại đơn: am/is/are + V3. Đổi tân ngữ sang chủ ngữ và hòa hợp số."},
"1-45":{why:"The dishes chịu hành động đang diễn ra at the moment. Chuyển is washing thành are being washed vì the dishes là số nhiều.",steps:"Bước 1 new subject The dishes (plural); bước 2 present continuous passive are being + V3; bước 3 wash → washed; bước 4 giữ by my father, at the moment. Đừng viết are washing vì sẽ thành chủ động.",example:"The staff are cleaning the rooms now. → The rooms are being cleaned by the staff now.",vi:"Nhân viên đang dọn phòng. → Các phòng đang được nhân viên dọn.",remember:"Bị động tiếp diễn: am/is/are + being + V3, với chủ ngữ số nhiều dùng are."},
"1-46":{why:"People plant more trees in the park every spring mô tả hành động lặp lại. More trees là số nhiều → are planted.",steps:"Đưa More trees lên làm chủ ngữ; chọn are ở hiện tại đơn; plant → planted; giữ in the park every spring. 'By people' không cần thiết vì tác nhân chung chung.",example:"Volunteers plant flowers each year. → Flowers are planted by volunteers each year.",vi:"Tình nguyện viên trồng hoa mỗi năm. → Hoa được tình nguyện viên trồng mỗi năm.",remember:"Với tác nhân chung chung people, có thể bỏ by people trong bị động."},
"1-47":{why:"They are cleaning up the dirty beach right now là hành động đang diễn ra. Chuyển phrasal verb clean up thành is being cleaned up.",steps:"The dirty beach số ít → is; giữ being để thể hiện tiếp diễn; V3 của clean là cleaned; tiểu từ up đi cùng động từ: cleaned up; có thể giữ by them, right now.",example:"They are picking up the rubbish. → The rubbish is being picked up.",vi:"Họ đang nhặt rác. → Rác đang được nhặt lên.",remember:"Bị động với phrasal verb: be + V3 + particle (cleaned up, picked up)."},
"1-48":{why:"The band plays a famous song every weekend là thói quen hiện tại. A famous song số ít → is played.",steps:"Tân ngữ a famous song lên đầu; is + played để tạo bị động hiện tại đơn; by the band làm rõ tác nhân; every weekend giữ mốc lặp lại.",example:"The choir sings a traditional song every Friday. → A traditional song is sung by the choir every Friday.",vi:"Dàn hợp xướng hát một bài truyền thống mỗi thứ Sáu. → Một bài hát truyền thống được dàn hợp xướng hát mỗi thứ Sáu.",remember:"is + V3 khi chủ ngữ mới là một bài hát, cho dù tác nhân band gồm nhiều người."},
"1-49":{why:"Many fans are watching the live music concert right now. Bị động hiện tại tiếp diễn: is being watched.",steps:"The live music concert là chủ ngữ số ít nên is; watch → watched; hiện tại tiếp diễn cần being; thêm by many fans và right now để bảo toàn nghĩa.",example:"Many students are watching the performance. → The performance is being watched by many students.",vi:"Nhiều học sinh đang xem tiết mục. → Tiết mục đang được nhiều học sinh xem.",remember:"Phân biệt is watched (lặp lại) và is being watched (đang diễn ra)."},
"1-50":{why:"The children practice the piano every afternoon. 'The piano' là đối tượng được luyện tập nên bị động hiện tại đơn is practiced.",steps:"Đổi the piano thành chủ ngữ, dùng is + practiced; by the children giữ tác nhân; every afternoon giữ tần suất. 'Practice the piano' có thể chuyển bị động đúng ngữ pháp, dù trong nhiều văn cảnh câu chủ động tự nhiên hơn.",example:"The students practise scales every morning. → Scales are practised by the students every morning.",vi:"Học sinh tập các âm giai mỗi sáng. → Các âm giai được học sinh luyện mỗi sáng.",remember:"Không đổi thì khi chuyển bị động; thực hiện hòa hợp với chủ ngữ mới, không phải chủ ngữ cũ."}
};
function writtenSpec(q,ExplanationV1){
 const d=written[q.id];if(!d)return null;
 const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 return ExplanationV1.render({type:"written",answer:q.answer,quickReason:d.why,
  evidence:[d.why],reasoning:d.steps,remember:d.remember,needsReview:false,
  applicationHtml:'<p><strong>Ví dụ vận dụng:</strong> '+esc(d.example)+'</p><p>→ '+esc(d.vi)+'</p>'});
}
function explain(q,context){
 if(!/^[12]-/.test(q.id))return previous(q,context);
 const meta=g.G10_FIRSTTWO_NOTES?.[q.id];
 if(!meta)return {mode:"semantic_precision",step1:["Chưa có phân tích được xác minh","Chưa đủ bằng chứng","Chưa đủ dữ liệu"],options:[],examples:[],remember:"",needsReview:true};
 const correct="ABCD".indexOf(q.answer);
 const first=["Dịch nghĩa: "+meta.translation];
 if(meta.evidence)first.push("Dẫn chứng: “"+meta.evidence+"”.");
 const options=(q.options||[]).map((value,i)=>({
  label:"ABCD"[i],word:value,meaning:meta.notes[i].split(/[;,.:]/)[0].slice(0,95),analysis:meta.notes[i]
 }));
 const reorder=q.number>=36,pre=previous(q,context);
 const examples=reorder?sequences(q,pre?.examples):
 options.map((o,i)=>{
  const en=g.G10_FIRSTTWO_CONTEXT_EXAMPLES?.[q.id+"-"+"ABCD"[i]]
   ||usage(o.word)||((pre?.examples?.[i]?.en&&pre?.examples?.[i]?.vi)?{en:pre.examples[i].en,vi:pre.examples[i].vi}:null);
  return {...o,en:en?.en||"",vi:en?.vi||""};
 });
 return {mode:"semantic_precision",step1:first,options,examples,
   remember:meta.remember,needsReview:examples.some(x=>!x.en||!x.vi)};
}
g.G10_MIDTERM_EXPLAIN=explain;
g.G10_MIDTERM_FIRST_TWO_WRITTEN=writtenSpec;
})(window);