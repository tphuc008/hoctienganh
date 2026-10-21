/* Exact Test 1–2 question keys from the user's 24-page midterm booklet.
 * Key and warnings are reviewed references, not an official publisher answer sheet.
 * Original question text remains in content/grade10-midterm-six-tests.txt.
 */
(function(g){
"use strict";
const A={
 1:"B B B D B B A B D B A C A A B A B D A B A A C A B D D A B C B B D C B B C D A C".split(" "),
 2:"B A A A A A B B B B A A A A A A A A D C C D D B A B C B D A A A C D D A A B D D B B C".split(" ")
};
const WRITTEN={
 "1-41":"d-e-b-a-c",
 "1-42":"a-c-e-b-d",
 "1-43":"e-c-b-a-d",
 "1-44":"The laundry is done by my mother every day.",
 "1-45":"The dishes are being washed by my father at the moment.",
 "1-46":"More trees are planted in the park every spring.",
 "1-47":"The dirty beach is being cleaned up by them right now.",
 "1-48":"A famous song is played by the band every weekend.",
 "1-49":"The live music concert is being watched by many fans right now.",
 "1-50":"The piano is practiced by the children every afternoon."
};
const FLAGS={
 "1-17":"Câu dự đoán từ dấu hiệu nhìn thấy gợi 'is going to cause' (B). Tuy nhiên 'will cause' (A) vẫn có thể dùng để dự đoán tương lai; A/B đều được chấp nhận.",
 "1-27":"Đáp án D tạo liên kết ý đúng nhất. Một số đáp án khác trong đề có lỗi về chủ thể và cấu trúc, không chỉ sai từ vựng.",
 "1-33":"Đại từ 'their' trong bài thay cho 'artists'; đáp án dùng từ tương đương 'performers' (D).",
 "1-37":"Chủ đề nói về cha mẹ đồng giới và quyền chăm sóc con trong các hệ thống pháp luật khác nhau; đoạn hội thoại là tình huống giả định của đề, không nên suy diễn thành quy tắc chung cho mọi nước.",
 "1-41":"Có thể có hơn một thứ tự hợp mạch của các câu b, a, c trong thân thư; đáp án d-e-b-a-c được dùng làm gợi ý tham khảo, không tính điểm cứng.",
 "1-42":"Sắp xếp đoạn văn có thể có cách triển khai khác nhau miễn liên kết nguyên nhân–hệ quả rõ ràng; đáp án a-c-e-b-d dùng tham khảo.",
 "1-43":"Thứ tự e-c-b-a-d diễn đạt từ hiện tượng, giải thích, kết nối cảm xúc đến kết luận; các phương án tự luận chưa có tiêu chí đơn trị nên dùng làm đáp án tham khảo.",
 "2-18":"Hình thức 'is announced' diễn tả thông lệ trao giải trong một chương trình; nếu tình huống là một sự kiện đã xảy ra, cần chỉ rõ mốc thời gian khác.",
 "2-31":"Từ 'oversea' trong phương án A của đề gốc chưa chuẩn thông dụng ở vai trò tính từ ('overseas' hoặc 'foreign' tự nhiên hơn), nhưng là lựa chọn trái nghĩa dự kiến với indigenous.",
 "2-39":"Phương án A in đề lặp chữ cái c hai lần; D là thứ tự hoàn chỉnh, logic hơn."
};
const ALT={"1-17":["A","B"]};
const NOGRADE=new Set(["1-41","1-42","1-43"]);
function fromParsed(number,parsed){
 const arr=parsed.questions;
 const items=arr.map((x,i)=>{
  const id=number+"-"+x.id;
  const answers=A[number];
  const answer=x.kind==="choice"?answers[i]:WRITTEN[id];
  const section=(number===1&&x.number>=44)?"Passive Voice":(number===1&&x.number>=41)?"Sentence Rearrangement":x.number>=36?"Sentence Rearrangement":x.number>=31?"Reading Comprehension":x.number>=23?"Text Completion":"Vocabulary & Grammar";
  return {id,number:x.number,section,stem:x.prompt||("Choose the correct option for blank ("+x.number+") in the passage."),options:x.choices||null,context:x.intro||"",answer,hint:"",warning:FLAGS[id]||""};
 });
 if(items.length!==(number===1?50:43)||items.some(q=>!q.answer||q.options&&q.options.length!==4)){
    throw Error("Dữ liệu Test "+number+" chưa đủ hoặc đáp án chưa khớp");
 }
 return {id:number,title:"Test "+number,questions:items};
}
g.G10_MIDTERM_FIRST_TWO={fromParsed,ALT,NOGRADE,FLAGS};
})(window);