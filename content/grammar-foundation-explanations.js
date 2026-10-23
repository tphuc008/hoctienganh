/* Precise evidence-first feedback for foundation Grammar Topic 03 and 06.
 * Reuses the exact Topic 05 / 19 / 22 Grammar Studio renderer and five tabs.
 */
(function(g){
"use strict";
const schemas={
 3:{
  "present-simple":"thói quen/lịch trình/sự thật ở hiện tại",
  "present-continuous":"hành động đang diễn ra hoặc tình huống tạm thời",
  "past-simple":"một thời điểm quá khứ đã kết thúc",
  "past-continuous":"hành động nền đang kéo dài ở mốc quá khứ",
  "present-perfect":"kết quả/kinh nghiệm/khoảng thời gian còn nối đến hiện tại",
  "past-perfect":"hành động hoàn thành trước một mốc quá khứ khác",
  "future-forms":"quyết định, dự định hoặc mốc tương lai theo cấu trúc phù hợp",
  "tense-contrast":"mốc thời gian quy chiếu cùng quan hệ hoàn tất/đang diễn ra"
 },
 6:{
  "ability":"khả năng chung hoặc thành công cụ thể đúng với mốc thời gian",
  "permission":"việc xin phép/được phép và cấu trúc allowed to",
  "advice":"lời khuyên và mức độ cảnh báo đúng tình huống",
  "obligation":"nghĩa vụ cùng đúng cấu trúc và thời điểm",
  "prohibition":"sự phân biệt bị cấm với không bắt buộc",
  "present-deduction":"mức độ chắc chắn của suy luận ở hiện tại",
  "past-deduction":"suy luận quá khứ với modal + have + V3",
  "modal-perfect":"đánh giá, cơ hội bị bỏ lỡ hoặc sự dư thừa của hành động đã làm"
 }
};
const tenseGroups=[
 [/^(?:have|has|have lost|has lived|have known|has worked|have done|have seen|has completed|have visited|has called|has written|has gone|has bought|have met|have got|has finished)$/i,"gợi cấu trúc hiện tại hoàn thành; phải đối chiếu V3, chủ ngữ và thời điểm quy chiếu"],
 [/^(?:is|are|am|is moving|are running|are playing|am preparing|is knocking|is sleeping|is staying|are developing|are getting|is flying|am meeting|is working|is studying|are watching|are travelling)$/i,"gợi cấu trúc với be/tiếp diễn; chỉ thích hợp khi ngữ cảnh nêu hành động đang xảy ra hoặc cấu trúc yêu cầu be"],
 [/^(?:was|were|was cooking|was sleeping|was walking|were playing|were studying|were watching|was raining|was cleaning|were talking)$/i,"gợi quá khứ của be hoặc quá khứ tiếp diễn; kiểm tra chủ ngữ và hành động đang kéo dài"],
 [/^(?:will|will call|will get|will have|will do|will be)$/i,"gợi will + nguyên mẫu trong mệnh đề chính tương lai; không áp dụng máy móc cho if/when hoặc vị trí cần thì khác"],
 [/^(?:do|does|do not|does not|does can|does must|doesn't)$/i,"là thành phần của hiện tại đơn; do/does phải đi đúng chủ ngữ và dạng động từ sau nó"],
 [/^(?:did|didn't)$/i,"đặt câu ở quá khứ đơn; không thể hiện một hành động đã hoàn tất trước một mốc quá khứ khác"],
 [/^(?:has|have|was|were|do|does|is|are)$/i,"là trợ động từ/động từ be cần khớp cả chủ ngữ lẫn cấu trúc sau chỗ trống"],
 [/^(?:visited|bought|moved|went|started|wrote|ate|met|worked|completed|called|knew|lost|lived|played|slept|studied|finished|rained|cleaned|talked|cooked|walked|watched|got|flew)$/i,"diễn tả hành động đơn hoặc quá khứ; cần so với mốc thời gian và ý đang tiếp diễn/hoàn tất"],
 [/^(?:go|drive|play|open|boil|study|move|take|visit|buy|eat|finish|work|know|call|leave|pay|follow|have)$/i,"là nguyên mẫu; chỉ thành vị ngữ đúng khi chủ ngữ, thời và trợ động từ cho phép"],
 [/^(?:drives|plays|opens|boils|studies|moves|goes|writes|eats|speaks|gets|starts|visits|buys|lives|works|knows|completes|calls)$/i,"là dạng hiện tại đơn ngôi thứ ba số ít; không dùng cho mọi chủ ngữ/thời điểm"],
 [/^(?:visiting|buying|moving|going|starting|writing|eating|driving|playing|opening|boiling|studying|sleeping|watching|cooking|flying)$/i,"là V-ing; không thể tự tạo vị ngữ hữu hạn khi thiếu trợ động từ be"],
];
function tenseIssue(q,opt){
 const x=String(opt).trim(),s=q.skill;
 const group=tenseGroups.find(([rx])=>rx.test(x));
 const detail=group?group[1]:"không biểu đạt đúng thì, thể, mốc quy chiếu hoặc dạng động từ trong câu";
 const cue=schemas[3][s];
 return "“"+x+"”: "+detail+". Trong câu này cần "+cue+"; bằng chứng cụ thể: "+q.why;
}
function modalIssue(q,opt){
 const x=String(opt).trim(),lower=x.toLowerCase(),s=q.skill,base=schemas[6][s];
 let detail="";
 if(/(?:can to|could to|must to|should to|might to|needn't to|oughts|oughting|am can|are can|is can|does can|does must|doesn't must)/i.test(x))
  detail="cấu trúc sai: modal can/could/must/should/might không theo sau trực tiếp bằng to; ought to là một cụm cố định và modal không chia -s";
 else if(lower==="mustn't")
  detail="nghĩa là 'không được phép/bị cấm', không phải 'không bắt buộc'";
 else if(lower==="don't have to"||lower==="doesn't have to"||lower==="needn't")
  detail="diễn tả không có nghĩa vụ phải làm, khác hoàn toàn với lệnh cấm";
 else if(lower==="can't"||lower==="cannot")
  detail="phủ nhận khả năng hoặc sự hợp lý của hành động, thay vì khẳng định mạnh";
 else if(lower==="must")
  detail="biểu thị nghĩa vụ hoặc suy luận gần như chắc chắn; phải xem chứng cứ và ngữ cảnh cho phép suy luận mạnh đến đâu";
 else if(lower==="might")
  detail="chỉ một khả năng chưa chắc; khác với kết luận dựa trên chứng cứ gần như chắc chắn";
 else if(lower==="can")
  detail="biểu thị khả năng/cho phép hiện tại; không thay thế những mốc quá khứ hoặc cấu trúc be allowed to";
 else if(lower==="could"||lower==="couldn't")
  detail="gợi khả năng/quá khứ hoặc giả định; không tự tạo dạng 'could to' và phải phân biệt một lần thành công thực tế";
 else if(lower==="should"||lower==="shouldn't")
  detail="đưa ra lời khuyên nên/không nên; không phải yêu cầu xin phép hoặc mô tả một sự kiện đã kết thúc";
 else if(lower==="have"||lower==="has"||lower==="had")
  detail="là trợ động từ cần kiểm tra thì và cấu trúc theo sau; sau modal suy luận quá khứ phải là have (không phải has)";
 else if(lower==="was"||lower==="are"||lower==="is"||lower==="were"||lower==="am")
  detail="là dạng của be phải hòa hợp chủ ngữ và đúng mốc thời gian trong mẫu be allowed to / be able to";
 else if(lower==="must not"||lower==="cannot"||lower==="may")
  detail="diễn đạt sự cấm đoán, suy đoán hoặc khả năng nhưng không đúng chức năng giao tiếp được mô tả";
 else if(/^(?:to |.*ing$|.*ed$|.*s$)/i.test(lower))
  detail="không phải dạng V nguyên mẫu cần đứng sau modal hoặc không đúng vị trí trong mẫu have + V3";
 else
  detail="không đúng hình thức hoặc sắc thái modal trong mạch thông tin; phải kiểm tra câu hoàn chỉnh chứ không chọn theo một từ riêng lẻ";
 if(s==="past-deduction"||s==="modal-perfect")
  detail+=". Với sự việc quá khứ, kiểm tra mẫu modal + have + V3 và việc hành động có thực sự xảy ra hay không";
 if(s==="prohibition")
  detail+=". 'Forbidden' là cấm, trong khi 'optional' hoặc 'you may if you wish' chỉ không bắt buộc";
 return "“"+x+"”: "+detail+". Câu hỏi đang kiểm tra "+base+"; dấu hiệu quyết định: "+q.why;
}
function apply(number){
 const data=g["GrammarTopic"+number+"Data"];
 if(!data?.sections?.length||!data.reviewSets?.set1||!data.reviewSets?.set2)
  throw Error("Missing foundation topic data "+number);
 const all=[...data.sections.flatMap(s=>s.checks),...data.practice,...data.mastery,...data.repairs,...data.reviewSets.set1,...data.reviewSets.set2];
 const unique=new Map(all.map(q=>[q.id,q]));
 if(unique.size!==80)throw Error("Expected 80 unique grammar questions for topic "+number+", got "+unique.size);
 for(const q of unique.values()){
  if(!schemas[number][q.skill]||!q.why||!q.vi||!Array.isArray(q.options)||q.options.length!==4)
   throw Error("Malformed authored Grammar question "+q.id);
  q.explain=q.explain||{};
  q.explain.clue="Đọc ngữ cảnh trong câu “"+q.stem+"”. "+q.why;
  q.explain.rule=q.why;
  q.explain.wrong={};
  for(const i of [1,2,3]){
   const msg=number===3?tenseIssue(q,q.options[i]):modalIssue(q,q.options[i]);
   if(msg.length<65||!msg.includes("“"+q.options[i]+"”"))
    throw Error("Insufficient option explanation "+q.id+" / "+i);
   q.explain.wrong[i]=msg;
  }
 }
 for(const s of data.sections){
  for(const q of s.checks){
   q.discovery={
    prompt:number===3?"Trước khi chọn thì, em phải xác định yếu tố nào?":"Trước khi chọn modal, em phải xác định yếu tố nào?",
    options:[
     number===3?"Mốc thời gian, diễn tiến và quan hệ hoàn tất của hành động.":"Ý nghĩa người nói (khả năng, cấm, nghĩa vụ, suy đoán) và cấu trúc sau modal.",
     "Chỉ nhìn từ đứng ngay cạnh ô trống và đoán theo hình thức quen thuộc."
    ],
    correct:0,why:"Dấu hiệu trong câu: "+q.why
   };
  }
 }
 return unique.size;
}
const count=apply(3)+apply(6);
if(count!==160)throw Error("Expected 160 unique authored questions");
g.GrammarFoundationExplanationAudit=count;
})(window);
