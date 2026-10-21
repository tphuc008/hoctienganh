/* Topic 21 · extra pedagogical distinctions following the approved review audit.
 * Keep the eight lessons; append compact optional notes with one Vietnamese meaning each.
 */
(function(g){
"use strict";
const d=g.GrammarTopic21Data;
if(!d?.sections?.length)throw Error("Topic 21 lessons missing");
const add=(id,title,rule,example,vi)=>{
 const s=d.sections.find(x=>x.id===id);
 if(!s||!s.extras||!example||!vi)throw Error("Invalid refinement: "+id);
 if(s.extras.some(e=>e.title===title))return;
 s.extras.push({title,rule,example,vi});
};
add("mechanics","Have là trợ động từ hay động từ chính?",
 "Have trong have finished là trợ động từ, có thể đảo trực tiếp: Never have I finished so early. Have trong have breakfast là động từ chính; ở hiện tại đơn, ta dùng do/does khi đảo.",
 "I seldom have breakfast before six. → Seldom do I have breakfast before six.",
 "Tôi hiếm khi ăn sáng trước sáu giờ.");
add("mechanics","Đảo ngữ mang sắc thái nhấn mạnh",
 "Never/Rarely/Seldom đứng đầu thường tạo sắc thái nhấn mạnh, nhất là trong văn viết hay diễn đạt trang trọng. Trong hội thoại thông thường, trật tự I rarely ... vẫn hoàn toàn đúng.",
 "I rarely see him. → Rarely do I see him.",
 "Tôi hiếm khi gặp anh ấy.");
add("negative","Chủ ngữ phủ định không tự động gây đảo",
 "Nếu No/Nobody/Neither trực tiếp là chủ ngữ, vẫn thường dùng S + V. Chỉ khi cụm phủ định đóng vai trò trạng ngữ được đưa lên đầu mới thường kéo theo đảo trợ động từ.",
 "No applicant has complained. / Never has an applicant complained.",
 "Không có ứng viên nào phàn nàn / Chưa từng có ứng viên nào phàn nàn.");
add("only","Only bổ nghĩa cho chủ ngữ khác Only mở đầu trạng ngữ",
 "Only + chủ ngữ như Only Mai knew ... không gây đảo; Only after/only by/only when được đưa lên đầu để hạn định thời điểm, phương thức hoặc điều kiện thì mệnh đề chính thường đảo.",
 "Only Mai knew the answer. / Only later did Mai reveal the answer.",
 "Chỉ Mai biết đáp án / Mãi sau đó Mai mới tiết lộ đáp án.");
add("conditional","Vị trí not khi bỏ if",
 "Trong mẫu điều kiện phủ định, để not sau chủ ngữ đã đảo: Had she not checked ...; Were I not ...; Should you not ... . Không thêm didn't vào mệnh đề đã có had/were/should.",
 "Had we not left early, we would have missed the train.",
 "Nếu chúng tôi không đi sớm, chúng tôi đã lỡ tàu.");
add("so-such","Phân biệt kết quả so ... that và mục đích so that",
 "So + tính từ/trạng từ ... that diễn tả mức độ dẫn đến kết quả. So that + mệnh đề chỉ mục đích ('để mà'), không phải mẫu đảo ngữ chỉ mức độ.",
 "So loud was the music that we left. / We lowered the music so that we could talk.",
 "Nhạc quá to nên chúng tôi rời đi / Chúng tôi giảm âm lượng để có thể trò chuyện.");
add("full","Hòa hợp với chủ ngữ thực sự trong đảo hoàn toàn",
 "Dù chủ ngữ đứng sau động từ, động từ vẫn hòa hợp với chủ ngữ ấy. Đảo hoàn toàn thường xuất hiện với động từ chỉ vị trí, tồn tại, xuất hiện hoặc chuyển động, không áp dụng tùy tiện cho mọi động từ.",
 "On the wall hangs a painting. / On the wall hang three paintings.",
 "Trên tường treo một bức tranh / Trên tường treo ba bức tranh.");
add("agreement","Giữ đúng thì và tránh phủ định hai lần",
 "So/Neither/Nor mượn trợ động từ phù hợp với câu gốc và chủ ngữ người đồng tình: Neither have I, Neither was I, Neither can I. Neither/Nor đã mang nghĩa phủ định nên không thêm not.",
 "She hasn't finished. Neither have I.",
 "Cô ấy chưa làm xong và tôi cũng chưa.");
})(window);