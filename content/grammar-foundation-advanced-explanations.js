/* Contextual A-D learning feedback for Topic 04 and 08.
 * Uses the same evidence/reasoning, mini-lesson, practice, clinic, mastery and review renderer as Topic 05.
 */
(function(g){"use strict";
const skills={
 4:{
  "reported-present":"sự kiện/trạng thái còn đúng ở thời điểm phát ngôn quá khứ, không khẳng định ở hiện tại",
  "reported-progressive":"hành động đang diễn ra tại thời điểm phát ngôn trước đây",
  "reported-past":"sự kiện đã xảy ra trước một mốc quá khứ khác",
  "reported-perfect":"kết quả hoàn thành hoặc trải nghiệm đến thời điểm người nói gốc thuật lại",
  "future-in-past":"tương lai tính từ một lời hứa, dự báo hoặc dự định đã được phát biểu trong quá khứ",
  "reported-questions":"cấu trúc câu hỏi gián tiếp với trật tự chủ ngữ trước động từ",
  "reported-requests":"ask/tell/advise/warn/remind + tân ngữ + (not) to V",
  "tense-exceptions":"sự thật khách quan, tình huống vẫn còn đúng hoặc lời nói được thuật lại bằng says"
 },
 8:{
  "mandative-verbs":"that + chủ ngữ + động từ nguyên mẫu trong lời yêu cầu hoặc đề xuất",
  "mandative-be":"that + chủ ngữ + be (+ V3 khi bị động) ở dạng mandative subjunctive",
  "negative-subjunctive":"that + chủ ngữ + not + động từ nguyên mẫu, không dùng trợ động từ do/does",
  "adjective-subjunctive":"it is essential/necessary/important + that + chủ ngữ + động từ nguyên mẫu",
  "were-unreal":"were trong tình huống giả định trái hiện tại hoặc cấu trúc đảo Were + S",
  "wish-present":"wish/if only + quá khứ đơn hoặc were để mong hiện tại khác đi",
  "wish-past":"wish/if only + had + V3 để hối tiếc việc đã xảy ra trong quá khứ",
  "would-rather-high-time":"would rather + người khác + V2; it's time + S + V2; as if + dạng giả định"
 }
};
function topic4Wrong(q,opt){
 const s=q.skill,x=String(opt).trim(),t=x.toLowerCase();
 let diagnostic="";
 if(s==="reported-questions"){
  if(/\b(?:did|does|do)\b/.test(t))diagnostic="đưa trợ động từ của câu hỏi trực tiếp vào mệnh đề phụ; câu hỏi gián tiếp có trật tự chủ ngữ rồi vị ngữ";
  else if(["what","that","because"].includes(t))diagnostic="từ nối này không giới thiệu được một câu hỏi Có/Không theo nghĩa đang được tường thuật (cần if/whether)";
  else diagnostic="không giữ đúng dạng động từ hoặc trật tự của câu hỏi gián tiếp theo mốc thời gian";
 }else if(s==="reported-requests"){
  if(/ing$/.test(t))diagnostic="sử dụng V-ing sau tân ngữ, không phải cấu trúc tell/ask/advise + O + to V";
  else if(/^(?:don't|not\s+talk|not\s+to\s+.*ing)/.test(t))diagnostic="dùng dạng phủ định của câu trực tiếp hoặc đặt sai not/to, thay vì not to + nguyên mẫu";
  else if(/ed$/.test(t))diagnostic="dùng động từ quá khứ sau tân ngữ trong khi mệnh lệnh gián tiếp cần to + nguyên mẫu";
  else diagnostic="thiếu hoặc đặt sai to/not to sau tân ngữ trong lời yêu cầu";
 }else if(s==="tense-exceptions"){
  if(/(?:yesterday|last year|before|last night)/.test(t))diagnostic="thêm mốc quá khứ khép kín vào một phát biểu nêu chân lý/lịch trình đang đúng, làm thay đổi phạm vi thời gian";
  else if(/ing$/.test(t))diagnostic="chỉ đưa V-ing, không có trợ động từ để tạo một câu miêu tả sự thật hoàn chỉnh";
  else diagnostic="không diễn tả được sự thật hoặc thói quen còn đúng ở hiện tại với đúng dạng vị ngữ";
 }else if(s==="future-in-past"){
  if(t==="will")diagnostic="là tương lai tính từ hiện tại, trong khi next day/following week được đặt từ góc nhìn quá khứ của said/promised/expected";
  else if(t==="is"||t==="are")diagnostic="là hình thức be ở hiện tại, không khớp kế hoạch đang được thuật lại ở thời điểm quá khứ";
  else if(t==="was"||t==="were")diagnostic="cần đối chiếu chủ ngữ và mẫu was/were going to, không dùng be để thay would + V";
  else diagnostic="không tạo cấu trúc tương lai nhìn từ quá khứ mà mệnh đề chính đòi hỏi";
 }else if(s==="reported-perfect"){
  if(t==="has"||t==="have")diagnostic="đặt mốc hoàn thành đến hiện tại; bài đang thuật lại kết quả tính đến điểm nhìn quá khứ nên dùng had + V3";
  else if(t==="was"||t==="were"||t==="is")diagnostic="không tạo mẫu had + quá khứ phân từ; thiếu thành phần biểu thị sự hoàn tất trước điểm nhìn quá khứ";
  else diagnostic="không duy trì quan hệ hoàn tất đã có tại thời điểm phát ngôn gốc";
 }else if(s==="reported-past"){
  if(/(?:has|have)/.test(t))diagnostic="hướng sự hoàn tất đến hiện tại thay vì mốc quá khứ đã nêu";
  else if(/ing$/.test(t))diagnostic="V-ing không tạo vị ngữ đã hoàn thành trước mốc quá khứ";
  else if(/s$/.test(t))diagnostic="thường là hiện tại đơn ngôi thứ ba, không nêu quan hệ trước–sau trong câu";
  else diagnostic="không thể hiện rõ sự kiện sớm hơn trước một mốc quá khứ khác";
 }else if(s==="reported-progressive"){
  if(/\b(?:is|are|am)\b/.test(t)||/^(is|are)/.test(t))diagnostic="dùng hiện tại tiếp diễn, trái với at that time/then ở điểm nhìn quá khứ";
  else if(/(?:ed|s)$/.test(t))diagnostic="dùng quá khứ/hiện tại đơn, làm mất nét đang diễn ra tại thời điểm thuật lại";
  else diagnostic="không tạo được was/were + V-ing phù hợp với chủ ngữ và thời điểm quá khứ";
 }else{
  if(/^(?:is|are|has|have)$/.test(t)||/s$/.test(t))diagnostic="đưa câu về thời hiện tại trong khi ngữ cảnh xác định tình trạng đã qua";
  else if(/ing$/.test(t))diagnostic="dùng V-ing thiếu trợ động từ để thành vị ngữ có thì";
  else diagnostic="không hòa hợp dạng động từ và mốc quá khứ của lời kể";
 }
 return "“"+x+"”: "+diagnostic+". Mấu chốt trong câu này: "+q.why;
}
function topic8Wrong(q,opt){
 const s=q.skill,x=String(opt).trim(),t=x.toLowerCase();
 let d="";
 if(["mandative-verbs","mandative-be","adjective-subjunctive","negative-subjunctive"].includes(s)){
  if(/^(?:is|was|were|are|does not|do not|did not)/.test(t))d="đây là hình thức chia thì trần thuật hoặc phủ định với do; mẫu đang kiểm tra là subjunctive không chia thì sau that";
  else if(/^(?:not to|to not)/.test(t))d="đặt to trước/giữa phủ định, trong khi that + S + not + V là mẫu mandative negative";
  else if(/ing$/.test(t))d="V-ing không đóng vai trò bare infinitive của mệnh đề mandative và cũng không tạo được be + V3 khi bị động";
  else if(/ed$/.test(t))d="quá khứ đơn không được chọn chỉ vì động từ yêu cầu đứng quá khứ; bare subjunctive giữ nguyên động từ";
  else if(/s$/.test(t))d="thêm -s theo ngôi thứ ba, trái với dạng nguyên mẫu không chia của mandative subjunctive";
  else if(t==="be"||t==="being")d="cần phân biệt bare subjunctive be với V-ing: chỉ be bất biến mới tạo đúng cấu trúc này";
  else d="không giữ nguyên dạng cần thiết trong mệnh đề diễn đạt yêu cầu, khác với câu trần thuật";
 }else if(s==="were-unreal"){
  if(/^(?:is|am|are)$/.test(t))d="mô tả tình trạng hiện tại như sự thật, trái với hệ quả giả định would/could và cấu trúc trang trọng";
  else if(t==="be")d="be nguyên mẫu không tự tạo vị ngữ có thức trong if-clause hoặc đảo Were + chủ ngữ";
  else if(/have|has/.test(t))d="diễn đạt kết quả hoàn thành thay vì giả định trái thực tế tại hiện tại";
  else if(t==="did")d="không phải trợ động từ cho mẫu đảo giả định Were + chủ ngữ";
  else d="không phù hợp với mẫu were quy phạm dùng cho giả định hiện tại";
 }else if(s==="wish-present"){
  if(/^(?:am|is|are|has|have|can|will)$/.test(t)||/s$/.test(t))d="diễn đạt hiện tại trực tiếp hoặc tương lai, trong khi wish/if only yêu cầu dạng quá khứ mang nghĩa không thực ở hiện tại";
  else if(/ing$/.test(t))d="V-ing thiếu trợ động từ và không thể thay quá khứ đơn sau wish";
  else if(/(?:known|been|had)/.test(t))d="gợi perfect/resultative, dễ chuyển sang tiếc nuối quá khứ dù câu nói về điều thiếu ở hiện tại";
  else d="không diễn đạt điều trái thực tế ở hiện tại bằng dạng V2/were/could";
 }else if(s==="wish-past"){
  if(/^(?:have|has)/.test(t))d="đưa sự việc về hiện tại hoàn thành, không phải had + V3 cho hối tiếc một chuyện quá khứ đã xong";
  else if(/ing$/.test(t))d="V-ing không tạo được past perfect had + quá khứ phân từ";
  else d="không biểu đạt hành động xảy ra (hoặc chưa xảy ra) trước kết quả đã có; cần had + V3";
 }else{
  if(/ing$/.test(t))d="V-ing không đúng vị trí sau chủ ngữ trong các mẫu would rather/it's time/as if này";
  else if(/^(?:is|are|have|has)/.test(t)||/s$/.test(t))d="hình thức hiện tại xác nhận tình trạng thay vì dùng quá khứ giả định cho mong muốn hoặc so sánh trái thực tế";
  else d="không dùng đúng dạng V2/were theo chủ ngữ và mẫu giả định đang được kiểm tra";
 }
 return "“"+x+"”: "+d+". Đối chiếu bằng chứng: "+q.why;
}
for(const n of [4,8]){
 const data=g["GrammarTopic"+n+"Data"];
 if(!data?.sections||data.sections.length!==8)throw Error("Missing Topic "+n+" data");
 const questions=[...data.sections.flatMap(s=>s.checks),...data.practice,...data.mastery,...data.repairs,...data.reviewSets.set1,...data.reviewSets.set2];
 const unique=new Map(questions.map(q=>[q.id,q]));
 if(unique.size!==80)throw Error("Topic "+n+" expected 80 unique questions, got "+unique.size);
 for(const q of unique.values()){
  if(!skills[n][q.skill]||q.options.length!==4||!q.why||!q.vi)throw Error("Invalid question "+q.id);
  q.explain=q.explain||{};
  q.explain.clue="Đọc toàn câu “"+q.stem+"”. Kiểm tra "+skills[n][q.skill]+". "+q.why;
  q.explain.rule=q.why;
  q.explain.wrong={};
  for(const k of [1,2,3]){
   const msg=n===4?topic4Wrong(q,q.options[k]):topic8Wrong(q,q.options[k]);
   if(!msg.includes("“"+q.options[k]+"”")||msg.length<80)throw Error("Missing distractor feedback "+q.id+"/"+k);
   q.explain.wrong[k]=msg;
  }
 }
 for(const s of data.sections){
  for(const q of s.checks){
   q.discovery={
    prompt:n===4?"Lời nói/hành động xảy ra ở mốc nào, và người kể đang nhìn từ thời điểm nào?":"Đây là yêu cầu, giả định hiện tại hay hối tiếc về quá khứ?",
    options:[skills[n][s.id]+" — cần đọc toàn câu để quyết định dạng động từ.",
      "Chọn dạng động từ giống ngôi của chủ ngữ mà không cần xét thời điểm hay sắc thái."],
    correct:0,
    why:"Xác định dựa vào ngữ cảnh: "+q.why
   };
  }
 }
}
g.GrammarFoundationAdvancedExplanationAudit=160;
})(window);
