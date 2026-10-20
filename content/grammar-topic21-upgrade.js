/* Topic 21 content upgrade (v2).
 * Non-destructive: preserves existing question IDs and teacher progress.
 * Load after explanations + interactions, before the lesson renderer.
 */
(function(g){
"use strict";
const d=g.GrammarTopic21Data;
if(!d||!Array.isArray(d.sections)||!Array.isArray(d.detectives))throw Error("Topic 21 base content must load first");
if(d.sections.some(s=>s.id==="agreement"))return;
function enrich(id,items){
  const section=d.sections.find(s=>s.id===id);
  if(!section)throw Error("Missing Topic 21 section: "+id);
  section.extras=items.map(x=>({title:x[0],rule:x[1],example:x[2]}));
}
function Q(id,skill,stem,options,correct,clue,rule,wrong){
  if(options.length!==4||!Number.isInteger(correct)||correct<0||correct>3)throw Error("Invalid "+id);
  return {id,skill,stem,options,correct,why:rule,explain:{clue,rule,wrong:wrong||{}}};
}
enrich("mechanics",[
 ["Đảo trợ động từ, không đổi thì","Nếu câu có be, have (trợ động từ) hoặc modal, đảo từ đang làm trợ động từ; không tự ý thêm did vào câu hiện tại hoàn thành.","Never have I felt so relieved. / Rarely does he complain."]
]);
enrich("negative",[
 ["Not only + mệnh đề","Khi Not only đứng đầu cả mệnh đề, đảo trợ động từ ở vế đó; vế sau but also giữ trật tự phù hợp.","Not only did Anna sing, but she also danced."],
 ["Not only + cụm danh từ","Khi Not only chỉ giới hạn hai danh từ/chủ ngữ, không ép đảo trợ động từ.","Not only Anna but also Ben attended the meeting."],
 ["Thêm cụm phủ định thường gặp","Not for a moment, in no way, on no account, at no time... có thể kéo theo đảo ngữ nếu đứng đầu mệnh đề.","Not for a moment did I doubt her explanation."]
]);
enrich("only",[
 ["Only by / Only with","Khi cụm phương thức mở đầu bằng Only, đảo trợ động từ trong mệnh đề chính; sau by thường dùng V-ing.","Only by checking the data did we find the error."],
 ["Only then / Only later","Các cụm chỉ thời điểm này ở đầu câu thường đòi hỏi đảo trợ động từ.","Only later did she realise what had happened."],
 ["Only if khác If only","Only if nêu điều kiện cần và có thể kéo theo đảo ngữ; If only bày tỏ điều ước, không theo cùng mẫu.","Only if you practise will you improve. / If only I had more time!"],
 ["Not until khác It was not until","Sau Not until đứng đầu, đảo mệnh đề chính. Trong câu chẻ nhấn mạnh It was not until..., dùng that và KHÔNG đảo mệnh đề theo sau.","Not until noon did he arrive. / It was not until noon that he arrived."]
]);
enrich("time",[
 ["No sooner không phải lúc nào cũng có had","Past perfect là mẫu rất phổ biến, nhưng với be có thể dùng No sooner was...than; ngữ cảnh quyết định thì.","No sooner was the park open than it started raining."]
]);
enrich("conditional",[
 ["Were it not for (hiện tại/giả định)","Tương đương If it were not for: nói một yếu tố đang giúp ngăn tình huống giả định xảy ra.","Were it not for your help, I would be lost."],
 ["Had it not been for (quá khứ giả định)","Tương đương If it had not been for, thường dùng với kết quả would have + V3.","Had it not been for your help, we would have failed."]
]);
enrich("so-such",[
 ["So + trạng từ + trợ động từ","Nếu đưa So + adverb lên đầu để nhấn mạnh mức độ của hành động, dùng trợ động từ phù hợp trước chủ ngữ.","So clearly did she explain it that everyone understood."]
]);
enrich("full",[
 ["Giới hạn của đảo hoàn toàn","Thường gặp với chủ ngữ là cụm danh từ và động từ chỉ vị trí, xuất hiện hoặc chuyển động; nhiều mẫu mang sắc thái miêu tả/văn chương.","Down the hill rolled a large stone. / Down the hill it rolled."],
 ["Đừng nhầm với nhượng bộ as/though","Tired as she was, she continued working là cách đưa tính từ lên đầu của mệnh đề nhượng bộ; không phải mẫu đảo trợ động từ thông thường.","Tired as she was, she kept working."]
]);

const agreement={
 id:"agreement",tag:"AGREEMENT INVERSION",title:"So / Neither / Nor: đồng tình bằng đảo ngữ",minutes:8,
 outcome:"Diễn đạt 'tôi cũng vậy / tôi cũng không' bằng trợ động từ đúng thì và đúng ý phủ định.",
 concept:"Khi đồng tình với một phát biểu, dùng So + trợ động từ + chủ ngữ cho câu khẳng định; Neither/Nor + trợ động từ + chủ ngữ cho câu phủ định. Trợ động từ phải phù hợp với thì, modal và chủ ngữ của người đồng tình.",
 form:"Positive: So + auxiliary / modal / be + S. Negative: Neither / Nor + auxiliary / modal / be + S.",
 contrast:"She likes music. So do I (tôi cũng thích). She doesn't like horror films. Neither do I (tôi cũng không). So I do thường xác nhận chính lời nói về bản thân, không thay thế So do I.",
 steps:["Xác định câu trước là khẳng định hay phủ định.","Lấy trợ động từ, be hoặc modal tương ứng: likes → do/does; has finished → have/has; can't → can.","Đặt So/Neither/Nor + trợ động từ + chủ ngữ của người đồng tình; không thêm not sau Neither/Nor."],
 examples:[
  {normal:"Mai likes science. I like science too.",inverted:"Mai likes science. So do I.",why:"Likes là hiện tại đơn; người đồng tình là I nên dùng do I."},
  {normal:"Tom can't swim. I can't swim either.",inverted:"Tom can't swim. Neither can I.",why:"Câu đầu phủ định với modal can't, nên dùng Neither + can + I."}
 ],
 misconception:"Không viết Neither don't I: Neither/Nor đã mang nghĩa phủ định, nên không thêm not. Đừng nhầm So do I (tôi cũng vậy) với So I do (đúng là tôi có làm như vậy).",
 extras:[{title:"So do I khác So I do",rule:"So do I = đồng tình với thông tin về người khác; So I do = xác nhận một điều vừa được nói về chính mình.",example:"A: She loves poetry. B: So do I. / A: You really love poetry. B: So I do."},{title:"Nor như Neither",rule:"Nor + trợ động từ + chủ ngữ cũng diễn tả đồng tình với câu phủ định; trong câu trả lời riêng, Nor thường trang trọng hơn Neither.",example:"A: I can’t attend the meeting. B: Nor can I."}],
 checks:[
  Object.assign(Q("l8q1","agreement","Mai studies at night. So ___ I.",["do","am","can","have"],0,"Studies là động từ hiện tại đơn; I cũng có thói quen như Mai.","Dùng So do I để đồng tình với một phát biểu khẳng định ở hiện tại đơn.",{1:"Am không thay cho trợ động từ do của studies.",2:"Can diễn tả khả năng, không khớp nội dung studies.",3:"Have không đứng một mình thay cho studies trong mẫu này."}),{
   discovery:{prompt:"Trong 'Mai studies at night', studies thuộc thì nào? ",options:["Hiện tại đơn","Hiện tại hoàn thành"],correct:0,why:"Studies là hiện tại đơn; khi đồng tình với chủ ngữ I, chọn do."}
  }),
  Object.assign(Q("l8q2","agreement","My brother can't swim. Neither ___ I.",["can","do","am","have"],0,"Can't cho biết modal can đang bị phủ định.","Dùng Neither can I: tôi cũng không biết bơi.",{1:"Do không thay thế modal can trong câu gốc.",2:"Am không phù hợp với can swim.",3:"Have không phù hợp với can swim."}),{
   discovery:{prompt:"Câu 'My brother can't swim' mang nghĩa khẳng định hay phủ định?",options:["Phủ định","Khẳng định"],correct:0,why:"Can't là dạng phủ định; dùng Neither/Nor và giữ modal can."}
  })
 ]
};
// Existing renderer requires two guided questions with a discovery prompt each.
d.sections.push(agreement);
d.skills.push({id:agreement.id,title:agreement.title,outcome:agreement.outcome});
d.practice.push(
 Q("p17","agreement","Mina works remotely, and ___.",["so do I","so I do","neither do I","so am I"],0,"Works là hiện tại đơn và ý đồng tình là khẳng định.","So do I = tôi cũng làm việc từ xa.",{1:"So I do dùng để xác nhận lời nói về chính mình, không phải cách đồng tình với Mina.",2:"Neither diễn tả đồng tình với phát biểu phủ định.",3:"Am không thay thế works trong hiện tại đơn."}),
 Q("p18","agreement","They haven't received the update, and ___.",["neither have we","so have we","neither do we","nor we have"],0,"Haven't received là hiện tại hoàn thành phủ định.","Neither have we giữ have của hiện tại hoàn thành và diễn tả 'chúng tôi cũng chưa'.",{1:"So dùng cho đồng tình khẳng định, trái nghĩa câu đầu.",2:"Do không thay cho have của hiện tại hoàn thành.",3:"Nor phải đứng trước trợ động từ: nor have we."}),
 Q("p19","only","Only by checking the original source ___ the mistake.",["did we identify","we identified","did we identified","have we identify"],0,"Only by + V-ing được đưa lên đầu để nhấn mạnh phương thức.","Mệnh đề chính ở quá khứ đơn: did we identify.",{1:"Thiếu đảo trợ động từ sau Only by mở đầu.",2:"Sau did phải dùng nguyên mẫu identify.",3:"Have + identify sai; sau have cần V3 và thay đổi thì."}),
 Q("p20","negative","Which sentence keeps ordinary subject–verb order because 'not only' modifies a noun phrase?",["Not only the students but also the teacher attended.","Not only did the students attended.","Not only the students attended but also the teacher.","Not only did the students but also the teacher attended."],0,"Not only the students but also the teacher là cụm chủ ngữ.","Khi Not only bổ nghĩa cho cụm chủ ngữ, giữ trật tự S–V bình thường.",{1:"Did + attended sai dạng (phải attend), và không cần đảo trong cách dùng này.",2:"But also the teacher bị đặt sau vị ngữ, làm mất tính song song của cụm chủ ngữ.",3:"Did + attended sai dạng và không cần đảo trong cụm chủ ngữ."}),
 Q("p21","only","It was not until the meeting ended ___ we could ask questions.",["that","did","when","than"],0,"It was not until là mẫu câu chẻ nhấn mạnh thời điểm.","Dùng It was not until ... that + mệnh đề S–V, không đảo sau that.",{1:"Did sẽ tạo dạng đảo không phù hợp với mẫu câu chẻ.",2:"When không thay cho that trong mẫu nhấn mạnh này.",3:"Than thuộc cấu trúc so sánh hoặc No sooner ... than."}),
 Q("p22","conditional","Which is the direct inverted equivalent of 'If it were not for your help, I would be lost'?",["Were it not for your help, I would be lost.","Had it not been for your help, I would be lost.","Should it not for your help, I would be lost.","Were not it for your help, I would be lost."],0,"Câu gốc dùng If it were not for để đặt giả định ở hiện tại.","Bỏ if và đảo were: Were it not for your help, I would be lost.",{1:"Had it not been for đổi điều kiện sang quá khứ; không phải phép chuyển trực tiếp của were not.",2:"Should it not for thiếu động từ và sai mẫu.",3:"Phải là Were it not for, không viết Were not it for."}),
 Q("p23","so-such","So clearly ___ the instructions that nobody needed clarification.",["did the teacher explain","the teacher explained","was the teacher explain","did the teacher explained"],0,"Clearly là trạng từ được nhấn mạnh ở đầu; needed cho thấy quá khứ đơn.","So clearly did the teacher explain ... that ... là mẫu So + adverb + did + S + V.",{1:"Sau So clearly đầu câu cần đảo trợ động từ trong mẫu này.",2:"Was ... explain sai kết hợp động từ.",3:"Sau did phải là explain, không phải explained."}),
 Q("p24","time","No sooner ___ than customers started queuing.",["was the shop open","did the shop opened","the shop was open","has the shop been open"],0,"Started queuing là sự kiện xảy ra ngay sau lúc cửa hàng mở.","No sooner was the shop open than ... là biến thể đúng với be, không nhất thiết dùng had.",{1:"Sau did phải là open, không phải opened.",2:"No sooner mở đầu mệnh đề yêu cầu đảo chủ ngữ và động từ.",3:"Present perfect không phù hợp với chuỗi sự kiện quá khứ trong câu này."})
);
d.mastery.push(
 Q("m11","only","Only later ___ that the apparently simple rule had an exception.",["did the learners discover","the learners discovered","have the learners discover","were the learners discover"],0,"Only later mở đầu một mệnh đề ở quá khứ đơn.","Dùng did the learners discover vì đảo trợ động từ sau Only later.",{1:"Thiếu đảo trợ động từ.",2:"Have + discover sai dạng và không giữ thì quá khứ.",3:"Were + discover không đúng cấu trúc."}),
 Q("m12","agreement","Lara isn't going to apply this year. Choose the natural negative agreement.",["Neither am I.","So am I.","Neither do I.","Nor I am."],0,"Isn't going to apply dùng be (am/is/are) ở dạng phủ định.","Neither am I = tôi cũng sẽ không nộp đơn năm nay.",{1:"So đồng tình với khẳng định, không phù hợp với isn't.",2:"Do không thay thế am/is/are going to ở đây.",3:"Nor phải theo thứ tự Nor + auxiliary + subject: Nor am I."})
);
d.repairs.push(
 Q("r08","agreement","The chairperson doesn't support the proposal, and neither ___.",["do I","I do","I don't","am I"],0,"Doesn't support là phủ định hiện tại đơn.","Neither do I diễn tả tôi cũng không ủng hộ.",{1:"Sau Neither phải đảo do lên trước I.",2:"Neither đã phủ định, không thêm don't.",3:"Am không thay động từ support."})
);
d.review.push(
 Q("v06","agreement","They didn't understand the instructions, and ___.",["neither did I","so did I","neither do I","nor I did"],0,"Didn't understand là quá khứ đơn phủ định.","Neither did I giữ quá khứ đơn và nêu sự đồng tình phủ định.",{1:"So là mẫu đồng tình khẳng định.",2:"Do không cùng thì với didn't.",3:"Nor yêu cầu did I, không phải I did."})
);
d.detectives.push({
 id:"e08",skill:"agreement",wrongSentence:"She hasn't seen the film. Neither I have.",
 choices:["She hasn't seen the film. Neither have I.","She hasn't seen the film. Neither do I."],
 correct:0,why:"Neither + have + I đúng với hiện tại hoàn thành phủ định.",
 clues:["Hasn't seen là hiện tại hoàn thành, cần have.", "Sau Neither đảo trợ động từ lên trước chủ ngữ: Neither have I."]
});
// One-line Vietnamese meaning aids; English stays the primary learning text.
const quickMeanings={
 mechanics:{
  terms:"Never = chưa từng · Rarely = hiếm khi",
  examples:["Tôi chưa từng gặp vấn đề nào như thế này.","Cô ấy hiếm khi mắc những lỗi như vậy."]
 },
 negative:{
  terms:"Little did I know = tôi nào ngờ · Not only ... but also = không chỉ ... mà còn",
  examples:["Tôi đâu ngờ vấn đề lại nghiêm trọng đến thế.","Cô ấy không chỉ giải thích kế hoạch mà còn đề nghị giúp đỡ."]
 },
 only:{
  terms:"Only after = chỉ sau khi ... mới · Not until = mãi đến khi ... mới",
  examples:["Chỉ sau khi đọc báo cáo, chúng tôi mới hiểu những hậu quả.","Mãi đến khi bằng chứng xuất hiện, cô ấy mới thừa nhận sai lầm."]
 },
 time:{
  terms:"Hardly/Barely ... when = vừa ... thì · No sooner ... than = vừa ... thì",
  examples:["Tôi vừa mới ngồi xuống thì điện thoại reo.","Tàu vừa rời ga thì cơn bão bắt đầu."]
 },
 conditional:{
  terms:"Had I known = giá như tôi đã biết · Should you need = nếu bạn cần",
  examples:["Nếu lúc đó nhận được tin nhắn, tôi đã trả lời.","Nếu cần hỗ trợ, vui lòng liên hệ với chúng tôi."]
 },
 "so-such":{
  terms:"So + tính từ/trạng từ ... that = ... đến mức · Such ... that = đến mức mà",
  examples:["Vấn đề phức tạp đến mức không ai giải quyết được.","Tác động lớn đến mức luật đã được thay đổi."]
 },
 full:{
  terms:"Here comes ... = ... đến rồi · Beside the river = bên dòng sông",
  examples:["Bên dòng sông có một ngôi nhà nhỏ cũ.","Xe buýt đến rồi! / Nó đến rồi!"]
 },
 agreement:{
  terms:"So do I = tôi cũng vậy · Neither/Nor can I = tôi cũng không",
  examples:["Mai thích khoa học. Tôi cũng thích.","Tom không biết bơi. Tôi cũng không."]
 }
};
for(const section of d.sections){
 const vi=quickMeanings[section.id];
 if(!vi||vi.examples.length!==section.examples.length||!vi.examples.every(Boolean))throw Error("Missing Vietnamese micro-meaning: "+section.id);
 section.vi=vi;
}
const ids=new Set();
for(const item of [...d.sections.flatMap(s=>s.checks),...d.practice,...d.mastery,...d.repairs,...d.review]){
 if(ids.has(item.id)||item.options.length!==4||item.correct<0||item.correct>=4)throw Error("Invalid/duplicate Topic 21 question "+item.id);
 ids.add(item.id);
}
if(d.skills.length!==d.sections.length||d.detectives.length!==d.skills.length)throw Error("Topic 21 skills out of sync");
})(window);
