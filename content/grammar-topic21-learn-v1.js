/* Topic 21 — Grammar Explanation V1. Learn-only presentation metadata.
 * Eight focused meanings, three-line-max formulas, and core rules.
 * Existing explanations, 10 contrastive examples, translations, and question banks are unchanged.
 */
(function(g){
"use strict";
const d=g.GrammarTopic21Data;
if(!Array.isArray(d?.sections)||d.sections.length!==8)throw Error("Load all eight Topic 21 lessons first.");
const lessonGuide={
 mechanics:{
  meaning:"Nhấn mạnh sự phủ định hoặc tính hiếm gặp: Never = chưa bao giờ; Rarely/Seldom = hiếm khi. Nội dung sự việc không đổi.",
  formula:"Never / Rarely / Seldom + trợ động từ / modal + S + V…\nThì đơn: do / does / did + S + V nguyên mẫu",
  core:"Đảo trợ động từ đã có (have, be, can…). Nếu câu chỉ có động từ thường ở thì đơn, thêm do/does/did và đưa động từ chính về nguyên mẫu."
 },
 negative:{
  meaning:"Nhấn mạnh ý phủ định hoặc giới hạn: Little = nào ngờ; Not only… but also = không chỉ… mà còn…; Under no circumstances = tuyệt đối không.",
  formula:"Cụm phủ định + trợ động từ / modal + S + V…\nNot only + trợ động từ + S + V…, but + S + also + V…",
  core:"Đảo khi cụm phủ định đứng trước cả mệnh đề. Nếu Not only chỉ nối hai cụm chủ ngữ, không cần đảo; vế sau but also thường không đảo."
 },
 only:{
  meaning:"Nhấn mạnh thời điểm, điều kiện hoặc cách thức: chỉ khi/sau/bằng cách… mới…; Not until = mãi đến khi… mới…",
  formula:"Only when/after/if + mệnh đề phụ, + trợ động từ + S + V…\nOnly by/with + cụm từ + trợ động từ + S + V…\nNot until + mốc thời gian / mệnh đề + trợ động từ + S + V…",
  core:"Chỉ đảo trợ động từ trong mệnh đề chính; mệnh đề phụ sau Only when/after/if hoặc Not until giữ trật tự thường. Only bổ nghĩa trực tiếp cho chủ ngữ thì không đảo."
 },
 time:{
  meaning:"Diễn tả một việc vừa xảy ra thì việc khác xảy ra gần như ngay lập tức.",
  formula:"Hardly / Scarcely / Barely + had + S + V3 + when + S + V2…\nNo sooner + had + S + V3 + than + S + V2…",
  core:"Trong mẫu quá khứ hoàn thành, đảo had trước chủ ngữ. Ghi nhớ Hardly/Scarcely/Barely… when và No sooner… than; một số cách dùng với be không cần had."
 },
 conditional:{
  meaning:"Diễn đạt điều kiện mà không cần if: Had thường nói về giả định quá khứ; Were về giả định; Should về tình huống dự phòng.",
  formula:"Had + S + V3, + mệnh đề kết quả…\nWere + S + (to V / cụm bổ ngữ), + mệnh đề kết quả…\nShould + S + V, + mệnh đề kết quả…",
  core:"Bỏ if và đưa Had/Were/Should lên trước chủ ngữ. Nếu phủ định, đặt not sau chủ ngữ (Had I not…); không dùng Did để thay if."
 },
 "so-such":{
  meaning:"Nhấn mạnh mức độ dẫn đến một kết quả: … đến mức/đến nỗi …",
  formula:"So + tính từ + be + S + that…\nSo + trạng từ + trợ động từ + S + V + that…\nSuch + be + cụm danh từ + that…",
  core:"Đưa cả So + tính từ/trạng từ lên đầu rồi mới đảo be hoặc trợ động từ. Với Such, phần được nhấn mạnh là một danh ngữ; đừng nhầm so that chỉ mục đích."
 },
 full:{
  meaning:"Nhấn mạnh sự xuất hiện hoặc vị trí của người, vật trong câu miêu tả.",
  formula:"Here / There + động từ xuất hiện, chuyển động + chủ ngữ danh từ\nCụm nơi chốn + động từ chính + chủ ngữ danh từ\nHere / There + đại từ + động từ (không đảo)",
  core:"Đưa động từ chính trước chủ ngữ danh từ, không thêm do/does. Với đại từ như it/she, thường giữ đại từ trước động từ; động từ luôn hòa hợp với chủ ngữ."
 },
 agreement:{
  meaning:"Đồng tình với câu trước: So = … cũng vậy; Neither/Nor = … cũng không.",
  formula:"Khẳng định: So + trợ động từ / modal / be + S\nPhủ định: Neither / Nor + trợ động từ / modal / be + S",
  core:"Giữ đúng thì và trợ động từ của ý đang được đồng tình; thay bằng chủ ngữ mới. Neither/Nor đã phủ định nên không thêm not; So do I khác So I do."
 }
};
for(const section of d.sections){
 const guide=lessonGuide[section.id];
 if(!guide||!guide.meaning||!guide.formula||!guide.core)throw Error("Missing V1 Learn guide: "+section.id);
 if(guide.formula.split("\n").length>3)throw Error("Too many formula lines for "+section.id);
 section.learnV1=guide;
}
})(window);