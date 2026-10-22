/* Hải Phòng 2026–2027 · Explanation Standard V1.1 editorial edition.
 * Preserve the six original handcrafted references; add the other 75 question-
 * specific records from hsg-hai-phong-v11-full.js. All 81 items are editorial
 * proposals requiring verification, NOT an official key and NOT scoring.
 * The existing student drafts and print routines are never modified here.
 */
(function(global){
"use strict";
const make=(group,n,type,correct,anchor,quick,location,quote,note,reasoning,optionNotes,application,remember,examples)=>({
 group,n,type,correct,anchor,quickReason:quick,
 evidence:[{locator:location,quote,note}],reasoning,optionNotes,application,remember,examples
});
const ITEMS=[
 make("g2b",46,"grammar",3,"We would like to (46)",
 'Sau “would like to”, động từ ở dạng nguyên mẫu không “to”. Câu đã có “to” nên chỉ điền “inform”: would like to inform someone about something.',
 "Letter · câu mở đầu","We would like to (46) _____ you about an important update regarding our office working hours.",
 "“Would like to” diễn tả mong muốn lịch sự; sau “to” cần động từ nguyên mẫu. “Inform somebody about something” là collocation đúng.",
 'Phải xác định “to” đã ở ngoài ô trống. Kiểm tra toàn bộ cấu trúc “would like to + V”, không xét đáp án riêng lẻ.',
 [
 ["to + V","Điền vào sẽ tạo “would like to to inform”, lặp “to” và sai cấu trúc."],
 ["V-ing","“Would like to informing” sai vì “to” trong cấu trúc này đi với động từ nguyên mẫu."],
 ["to + V-ing","Thêm “to” không cần thiết và đặt “informing” sai sau “would like to”."],
 ["V nguyên mẫu","“Would like to inform you about ...” đúng cả cấu trúc lẫn cách kết hợp từ."]
 ],
 '“We would like to inform all applicants about the revised interview schedule.” → Chúng tôi muốn thông báo cho các ứng viên về lịch phỏng vấn mới.',
 "would like to + V; inform somebody about/of something."),
 make("g2b",47,"vocabulary",2,"(47) _____ recent feedback",
 "“Recent feedback” là căn cứ để công ty quyết định điều chỉnh giờ làm. “In light of” biểu thị việc xem xét thông tin mới rồi ra quyết định.",
 "Letter · đoạn mở đầu","(47) _____ recent feedback from several employees, we have decided to implement the following changes",
 "Phản hồi của nhân viên được sử dụng làm cơ sở cho sự thay đổi chính sách. Cần một cụm giới từ diễn đạt căn cứ, không phải nhượng bộ hay đại diện.",
 "Bốn cụm đều có thể đứng trước cụm danh từ, nhưng chỉ “in light of” nối một tình hình/thông tin mới với quyết định được đưa ra.",
 [
 ["bằng cách, nhờ phương tiện","“By means of” giới thiệu công cụ/phương pháp; feedback ở đây là căn cứ khiến công ty quyết định, không phải công cụ triển khai."],
 ["mặc dù, bất chấp","“In spite of” diễn đạt nhượng bộ, đòi hỏi sự đối lập; câu không nói công ty làm ngược lại phản hồi."],
 ["xét đến, dựa trên","“In light of recent feedback” diễn đạt chính xác việc cân nhắc ý kiến nhân viên trước khi thay đổi lịch làm việc."],
 ["thay mặt, đại diện cho","“On behalf of” cần đối tượng được đại diện; công ty không hành động “thay mặt phản hồi”."]
 ],
 "",
 "in light of + noun phrase = xét đến tình hình/thông tin khi đưa ra quyết định; khác in spite of.",
 [
 ["The survey was conducted by means of an online questionnaire.","Cuộc khảo sát được thực hiện bằng bảng hỏi trực tuyến."],
 ["In spite of the heavy rain, the match went ahead.","Dù mưa lớn, trận đấu vẫn diễn ra."],
 ["In light of the safety concerns, the event was postponed.","Trước những lo ngại về an toàn, sự kiện đã được hoãn lại."],
 ["I am speaking on behalf of the entire team.","Tôi đang phát biểu thay mặt toàn đội."]
 ]),
 make("g2b",48,"vocabulary",1,"(48) _____ sure",
 "“As long as” đặt điều kiện; “make sure (that) + clause” có nghĩa bảo đảm rằng. Nhân viên được làm việc ở nhà miễn là họ bảo đảm luôn trực tuyến.",
 "Letter · bullet Flexible working days",
 "Employees can work from home on Wednesdays, as long as they (48) _____ sure they are online during working hours.",
 "Ngay sau ô trống là “sure”, tiếp theo là mệnh đề “they are online”. Cụm cố định là “make sure”.",
 "Đây là câu kiểm tra collocation và điều kiện: không chọn một động từ có nghĩa chung chung gần “bảo đảm” nếu nó không kết hợp với “sure”.",
 [
 ["nhận, đạt được","“Get sure” không phải cụm thông dụng dùng để yêu cầu bảo đảm điều kiện; “get ready” là kết hợp khác."],
 ["bảo đảm (trong make sure)","“Make sure they are online” khớp cả collocation lẫn điều kiện làm việc từ xa."],
 ["lấy, thực hiện","“Take sure” không phải collocation; có thể dùng “take care” hoặc “take steps” trong cấu trúc khác."],
 ["duy trì, ở lại","“Stay online” đúng khi không có “sure”; “stay sure” không mang nghĩa chủ động bảo đảm việc trực tuyến trong câu."]
 ],
 "",
 "as long as + clause = miễn là; make sure (that) + clause = bảo đảm rằng.",
 [
 ["Students can get help from the librarian.","Học sinh có thể nhận sự trợ giúp từ thủ thư."],
 ["Make sure everyone receives the updated schedule.","Hãy bảo đảm mọi người nhận được lịch trình đã cập nhật."],
 ["Take care when crossing this busy road.","Hãy cẩn thận khi băng qua con đường đông đúc này."],
 ["Please stay online until the meeting ends.","Vui lòng tiếp tục trực tuyến đến khi cuộc họp kết thúc."]
 ]),
 make("e",51,"error",null,"Peer pressure is a psychological force",
 "Trong mệnh đề quan hệ “a psychological force that influence...”, “that” thay thế danh từ số ít “a psychological force”, nên động từ hiện tại đơn phải là “influences”.",
 "Error Correction · dòng 1 trong PDF gốc",
 "Peer pressure is a psychological force that influence many teenagers",
 "Chủ ngữ của động từ trong mệnh đề quan hệ là “that” (= a psychological force), không phải tân ngữ “teenagers”.",
 "Cách giải: xác định antecedent “a psychological force” → đại từ quan hệ “that” → chủ ngữ ngôi ba số ít → “influences”. Không được chia theo “teenagers” vì đây là tân ngữ.",
 [],
 "“An online course that helps beginners build confidence can be very effective.” → Một khóa học trực tuyến giúp người mới bắt đầu xây dựng sự tự tin có thể rất hiệu quả.",
 "Động từ trong mệnh đề quan hệ hòa hợp với danh từ mà who/which/that thay thế."),
 make("wp",61,"wordform",null,"(61. promote) _____ campaigns",
 "“Campaigns” là danh từ, ô trống đứng trước để bổ nghĩa nên phải dùng tính từ “promotional”: promotional campaigns.",
 "Tourism passage · đoạn 1",
 "While (61. promote) _____ campaigns often rely on highly persuasive images",
 "Trước danh từ “campaigns” cần tính từ mô tả mục đích quảng bá. “Promotional campaigns” là cách kết hợp từ chuẩn.",
 "Chuyển đổi: promote (V: quảng bá) → promotion (N: hoạt động quảng bá) → promotional (Adj: thuộc hoạt động quảng bá). Không dùng “promote” vì vị trí cần tính từ.",
 [],
 "“The museum launched a promotional campaign to attract local visitors.” → Bảo tàng triển khai chiến dịch quảng bá nhằm thu hút khách tham quan địa phương.",
 "promotional campaign / promotional material; phân biệt promote (V), promotion (N), promotional (Adj)."),
 make("r",81,"reading",3,"Until recently, most American entrepreneurs were men",
 "Bài đọc lần lượt trình bày sự phát triển của doanh nghiệp do phụ nữ sở hữu, một ví dụ cụ thể và triển vọng tiếp diễn. Phương án D bao quát nội dung cả ba đoạn.",
 "Reading · mở bài và kết bài",
 "there are likely to be many more Sandra Kurtzigs in the years ahead",
 "Đoạn kết dự báo số nữ doanh nhân sẽ tiếp tục tăng; kết nối với xu hướng trong mở bài và trường hợp minh họa ở đoạn 2.",
 "Với câu main idea, đáp án phải bao quát mạch bài, không chỉ nhắc một dữ kiện hoặc bổ sung một so sánh mà bài không chứng minh. Chữ “today” trong đề được hiểu theo thời điểm văn bản gốc, không phải dữ liệu kinh tế năm nay.",
 [
 ["phụ nữ học vấn tốt hơn và hấp dẫn giới kinh doanh","Bài có nhắc trình độ học vấn nhưng đồng thời nêu rào cản nghề nghiệp; nhận định “more attractive” không phải luận điểm xuyên suốt."],
 ["máy tính đặc biệt sinh lợi cho phụ nữ","ASK Computer Systems chỉ là một ví dụ ở đoạn 2, không phải kết luận về cả ngành."],
 ["phụ nữ kinh doanh nhỏ giỏi hơn nam giới","Bài không đưa bằng chứng so sánh năng lực hai giới; cả nam và nữ đều có thể thất bại."],
 ["phụ nữ ngày càng mở doanh nghiệp riêng","Bao quát phần mở, trường hợp minh họa ở đoạn 2 và dự báo ở đoạn kết."]
 ],
 "Khi xác định main idea, đối chiếu lựa chọn với cả mở bài, thân bài và kết luận; loại những lựa chọn chỉ mô tả một ví dụ đơn lẻ.",
 "Một chi tiết có mặt trong passage không tự động trở thành main idea: đáp án phải bao quát lập luận chung.")
];
// This main-idea question needs evidence spanning the article, not the answer option.
const reading=ITEMS.find(x=>x.n===81);
reading.evidence=[
 {locator:"Paragraph 1",quote:"businesses owned by women account for more than $40 billion in annual revenues",
  note:"Đoạn đầu giới thiệu vai trò ngày càng tăng của các doanh nghiệp do phụ nữ sở hữu (theo mốc thời gian của bài đọc)."},
 {locator:"Paragraph 2",quote:"It was founded in 1973 by Sandra Kurtzig",
  note:"ASK Computer Systems là một ví dụ điển hình, không phải chủ đề duy nhất của cả bài."},
 {locator:"Paragraph 3",quote:"there are likely to be many more Sandra Kurtzigs in the years ahead",
  note:"Đoạn kết trở lại triển vọng xuất hiện thêm nhiều nữ doanh nhân."}
];
const EXPECTED={
 46:["to inform","informing","to informing","inform"],
 47:["By means of","In spite of","In light of","On behalf of"],
 48:["get","make","take","stay"],
 81:["Women are better educated, more attractive to the business world.","The computer is especially lucrative for women today.","Women are better at small businesses than men are.","Women today are opening more businesses of their own."]
};
const index=new Map(ITEMS.map(item=>[item.n,item]));
function expanded(n){
 return global.HSGHaiPhongExpandedV11?.entries?.find(x=>x.n===Number(n))||null;
}
function normalize(s){return String(s||"").replace(/\s+/g," ").toLowerCase().trim()}
function available(examId,groupId,n,question,passage){
 if(examId!=="hai-phong")return false;
 const original=index.get(Number(n));
 if(original){
  if(original.group!==groupId||!String(passage||"").includes(original.anchor))return false;
  const required=EXPECTED[n];
  if(required&&(!Array.isArray(question?.options)||question.options.length!==4||
   required.some((opt,i)=>question.options[i]!==opt)))return false;
  if(n===61&&String(question?.word||"").toLowerCase()!=="promote")return false;
  return true;
 }
 const item=expanded(n);
 if(!item||item.g!==groupId||!question?.stem)return false;
 if(!normalize(String(passage||"")+" "+question.stem).includes(normalize(item.anchor)))return false;
 if(/^[A-D]$/.test(item.answer)&&(!Array.isArray(question.options)||question.options.length!==4))return false;
 return true;
}
function spec(examId,groupId,n,question,passage){
 if(!available(examId,groupId,n,question,passage))return null;
 const item=index.get(Number(n));
 if(!item){
  const record=expanded(n);
  const indexOfAnswer=/^[A-D]$/.test(record.answer)?record.answer.charCodeAt(0)-65:-1;
  const options=indexOfAnswer>=0?question.options.map((word,i)=>({
   word,correct:i===indexOfAnswer,
   analysis:i===indexOfAnswer?record.why:(record.wrong[i]||"Phương án này không phù hợp bằng đáp án được đề xuất; cần rà soát thêm đối chiếu nguồn.")
  })):[];
  const value=indexOfAnswer>=0?record.answer+". "+question.options[indexOfAnswer]:record.answer;
  return {
   type:indexOfAnswer>=0?(record.g==="r"||record.g==="rc"?"reading":"grammar"):record.g==="essay"?"essay":"written",
   answer:value||"Không có một đáp án duy nhất",quickReason:record.why,
   evidence:[{locator:"Câu "+n+" · "+groupId,quote:record.anchor,note:record.rule}],
   reasoning:record.rule,options,
   application:record.use,remember:record.rule,
   needsReview:true
  };
 }
 const options=(question?.options||[]).map((word,i)=>({
  word,meaning:item.optionNotes[i]?.[0]||"",analysis:item.optionNotes[i]?.[1]||"",
  correct:i===item.correct
 }));
 const examples=(item.examples||[]).map((x,i)=>({word:question.options[i],en:x[0],vi:x[1]}));
 const answer=n===51?"Dòng 1: influence → influences":n===61?"promotional":
  String.fromCharCode(65+item.correct)+". "+question.options[item.correct];
 return {
  type:item.type,answer,quickReason:item.quickReason,evidence:item.evidence,
  reasoning:item.reasoning,options,examples,application:item.application,
  remember:item.remember,needsReview:true
 };
}
global.HSGHaiPhongExplanations=Object.freeze({
 version:"editorial-v1.1-full",numbers:Object.freeze(Array.from({length:80},(_,i)=>i+21).concat([1])),available,spec
});
})(window);
