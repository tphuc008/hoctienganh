/* Topic 5 / 19 / 22: focused exercise explanations (Exercise Explanation V2).
 * Never changes stems, options, answer keys, question IDs, stages, or saved work.
 * Rules distinguish grammar errors from grammatical forms with different meanings.
 */
(function(g){
"use strict";
const topics=[5,19,22];
const say=(s)=>String(s).trim();
const lead=(q)=>say(q.stem.split("___")[0]).replace(/[,.]$/,"");
function evidence(n,q){
 const b=lead(q),a=q.options[q.correct],skill=q.skill;
 if(n===5){
   if(skill==="heads")return "Chủ ngữ cần kiểm tra: “"+b+"”; chọn dạng động từ hòa hợp với số/ngôi của chủ ngữ.";
   if(skill==="modifiers")return "Trong “"+b+"”, hãy tìm danh từ trung tâm trước cụm of/in/on; danh từ đứng trong cụm bổ nghĩa không quyết định số của động từ.";
   if(skill==="indefinite")return "Kiểm tra each, every, everyone, nobody, either hoặc neither và số của chủ ngữ thực.";
   if(skill==="coordination")return "Kiểm tra liên từ trong “"+b+"”: and/both…and thường kết hợp số nhiều; or/nor/not only…but also xét chủ ngữ gần động từ.";
   if(skill==="amounts")return "Xác định “"+b+"” là tổng tiền/thời gian/khoảng cách, tên môn học hay danh từ có -s đặc biệt.";
   if(skill==="collectives")return "Xem câu nói về từng thành viên (members) hay cả nhóm như một đơn vị; tránh quy tắc tuyệt đối với danh từ tập hợp.";
   if(skill==="fractions")return "Xác định a number of / the number of, hoặc danh từ đứng sau of đối với phân số, phần trăm.";
   return "Trong cấu trúc there, chủ ngữ thật đứng sau động từ; với pair/scissors/trousers, xác định danh từ trung tâm.";
 }
 if(n===19){
   if(skill==="zero")return "Đây là sự thật/quy luật chung, không phải giả định không thật hoặc dự báo một lần.";
   if(skill==="first")return "Đọc mệnh đề if và kết quả will/can/may/mệnh lệnh; tìm dấu hiệu điều kiện tương lai có thể xảy ra.";
   if(skill==="second")return "Kết quả would/could/might + V báo giả định hiện tại/tương lai; mệnh đề if dùng dạng quá khứ hình thức.";
   if(skill==="third")return "Mệnh đề if đã có had + V3; kết quả là giả định quá khứ với would/could/might have + V3.";
   if(skill==="mixed")return "Đối chiếu mốc ở mệnh đề if với từ chỉ thời gian của kết quả (now/today/yesterday/last month).";
   if(skill==="unless")return "Giữ quan hệ 'trừ khi / nếu không'; lựa chọn khác có thể đúng ngữ pháp nhưng đảo ngược điều kiện.";
   if(skill==="provided")return "Phân biệt điều kiện cần hoặc điều kiện duy trì với nguyên nhân (because), nhượng bộ (although/even though) hay ước muốn (if only).";
   return "Bỏ if: Had đi với V3, Were đi với to V/not for/bổ ngữ, Should đi với V nguyên mẫu.";
 }
 if(skill==="persons")return "Xác định tiền ngữ là người: cần chủ ngữ who, quan hệ sở hữu whose + N, hay tân ngữ sau giới từ whom.";
 if(skill==="things")return "Tiền ngữ là vật/sự việc; xét đại từ làm chủ ngữ/tân ngữ và có dấu phẩy hay không.";
 if(skill==="object")return "Mệnh đề phụ đã có chủ ngữ riêng; đại từ quan hệ ở đây làm tân ngữ, có thể lược trong mệnh đề xác định.";
 if(skill==="commas")return "Dấu phẩy mở mệnh đề không xác định: không dùng that, phải chọn đúng vai trò chủ ngữ/tân ngữ/sở hữu.";
 if(skill==="adverbs")return "Thiếu trạng ngữ chỉ nơi (where), thời gian (when) hoặc lý do (why), không phải chủ ngữ/tân ngữ.";
 if(skill==="prepositions")return "Giới từ đứng ngay trước chỗ trống; chọn whom cho người, which cho vật. That/who/where không theo trực tiếp giới từ kiểu này.";
 if(skill==="quantifiers")return "Mẫu “lượng từ + of + đại từ quan hệ”; xét nhóm trước đó là người (whom) hay vật (which).";
 return a==="which"?"Dấu phẩy trước which: đại từ này nói về cả sự việc ở mệnh đề trước.":"Kiểm tra động từ chủ động hay bị động của tiền ngữ: V-ing cho chủ động, V3 cho bị động.";
}
function sva(q,opt){
 const a=q.options[0],s=q.skill,o=say(opt),word=lead(q);
 const decision={
  heads:"chủ ngữ chính",modifiers:"danh từ trung tâm trước cụm bổ nghĩa",indefinite:"đại từ/từ hạn định bất định",
  coordination:"kiểu kết hợp and/or/nor",amounts:"cách hiểu lượng đo/tên môn học",
  collectives:"số của member(s)/group",fractions:"a/the number of hoặc danh từ sau of",existential:"chủ ngữ thực/pair"
 }[s];
 if(o==="be")return "“be” là nguyên mẫu; chỗ trống cần động từ be đã chia theo "+decision+".";
 if(["sleeping","playing","needing","belonging","speaking","explaining","looking","working","having","knowing","seeming","deciding","living","forming"].includes(o))return "“"+o+"” là V-ing; một mình nó không tạo vị ngữ hữu hạn theo thì của câu.";
 if(o==="is belong")return "“is belong” không hợp lệ: belong là động từ trạng thái, không đặt nguyên mẫu ngay sau is.";
 if(o==="are having" && /a window|a car|a workbook|own|have/.test(q.stem))return "“are having” diễn tả hoạt động đang diễn ra; ở đây have chỉ quan hệ sở hữu/đặc điểm nên không dùng tiếp diễn.";
 if(o==="has shown"||o==="has looked"||o==="has spoken"||o==="has worked"||o==="has played"||o==="has decided"||o==="has lived")return "“has” cần chủ ngữ số ít; câu có chủ ngữ số nhiều. Nếu dùng hiện tại hoàn thành phải là have + V3 và còn cần xét nghĩa.";
 if(o==="have slept"||o==="have spoken"||o==="have known"||o==="have worked"||o==="have improved"||o==="have wanted"||o==="have needed"||o==="have seemed")return "“have” đòi chủ ngữ số nhiều/I/you ở hiện tại hoàn thành; chủ ngữ đang xét là số ít hoặc câu đang diễn đạt thói quen.";
 if(o==="has"||o==="have")return "“"+o+"” không hòa hợp với "+decision+"; đối chiếu dạng đúng “"+a+"”.";
 if(o==="knows" && /Does anybody/.test(q.stem))return "Sau trợ động từ does, động từ chính phải ở nguyên mẫu know, không thêm -s.";
 if(o==="knew"&&/Does anybody/.test(q.stem))return "Does đã đánh dấu hiện tại đơn, nên theo sau bằng nguyên mẫu know, không phải quá khứ knew.";
 if(o==="are"||o==="is"||o==="was"||o==="were"){
  if(s==="amounts"||s==="fractions"){
   if(o==="were" && a==="is")return "“were” vừa là quá khứ vừa là số nhiều; bài này xem "+decision+" như số ít ở hiện tại: “is”.";
   if(o==="was" && (a==="are"||a==="were"))return "“was” là quá khứ số ít; chủ ngữ cần động từ số nhiều"+(a==="were"?" ở quá khứ":" ở hiện tại")+".";
   if(o==="are"&&a==="is")return "“are” xem chủ ngữ như số nhiều; ở đây "+decision+" được hiểu là một đơn vị/số ít nên dùng is.";
   if(o==="is"&&a==="are")return "“is” số ít; "+decision+" trong câu đòi hỏi are số nhiều.";
  }
  if(o==="is"&&a==="were")return "“is” không phù hợp: câu nhắc rõ sự kiện quá khứ và chủ ngữ số nhiều, nên là were.";
  if(o==="were"&&a==="are")return "“were” chỉ quá khứ; câu đang trình bày trạng thái hiện tại với chủ ngữ số nhiều, nên dùng are. Nếu muốn quá khứ cần thay đổi ngữ cảnh.";
  if(o==="was"&&a==="is")return "“was” có thể đúng nếu kể chuyện quá khứ, nhưng câu này đang hỏi sự hòa hợp ở hiện tại với "+decision+": chọn is.";
  if(o==="were"&&a==="is")return "“were” không phù hợp với chủ ngữ số ít theo nghĩa xác định của câu; chọn is (không phải giả định).";
  if(o==="was"&&a==="are")return "“was” không hòa hợp với chủ ngữ số nhiều, đồng thời chuyển sang quá khứ.";
  if(o==="are"&&a==="were")return "“are” là hiện tại; mốc thời gian quá khứ trong câu yêu cầu were.";
  if(o==="is"&&a==="are")return "“is” số ít không hòa hợp với "+decision+" số nhiều.";
  if(o==="are"&&a==="is")return "“are” số nhiều không hòa hợp với "+decision+" số ít.";
 }
 if(o==="does"||o==="do")return "“"+o+"” cần hòa hợp với "+decision+" và đúng vị trí trợ động từ; dạng cần điền là “"+a+"”.";
 if(o.endsWith("ing"))return "“"+o+"” là V-ing chưa có trợ động từ để tạo vị ngữ hữu hạn tại vị trí này.";
 if(o.startsWith("has ")||o.startsWith("have "))return "Dạng hoàn thành “"+o+"” cần đúng trợ động từ và cách hiểu chủ ngữ; câu đang kiểm tra hòa hợp “"+a+"”.";
 if(o==="grows"||o==="darken"||o==="stops"||o==="stop")return "Đuôi -s của “"+o+"” không hòa hợp với chủ ngữ; cần “"+a+"”.";
 return "“"+o+"” và “"+a+"” khác nhau ở hình thức hòa hợp. Với "+decision+" trong “"+word+"”, động từ phải có dạng “"+a+"”.";
}
function conditional(q,opt){
 const a=q.options[0],o=say(opt),s=q.skill,stem=q.stem;
 if(s==="zero"){
   if(o.endsWith("ing"))return "“"+o+"” là V-ing không có trợ động từ, không làm vị ngữ hoàn chỉnh.";
   if(/^would/.test(o))return "“"+o+"” đưa câu sang giả định; ở đây chỉ nói quy luật chung bằng hiện tại đơn.";
   if(o.startsWith("had ")||o==="froze"||o==="broke")return "“"+o+"” diễn tả quá khứ; câu mô tả quy luật chung nên dùng hiện tại đơn “"+a+"”.";
   if(o.startsWith("will "))return "“"+o+"” dự báo một lần trong tương lai; ngữ cảnh đang mô tả quy luật thường xuyên, không phải dự báo.";
   if(o==="have expanded")return "“have” không hòa hợp với metal số ít; còn câu đang nêu quy luật ở hiện tại đơn.";
   return "“"+o+"” không đúng dạng hiện tại đơn của chủ ngữ trong quy luật chung; cần “"+a+"”.";
 }
 if(s==="first"){
   if(o.startsWith("will") && /if\b/i.test(stem))return "“"+o+"” đặt will để dự báo tương lai ngay trong mệnh đề if. Điều kiện tương lai thông thường dùng hiện tại đơn; will có các cách dùng riêng như sự sẵn lòng, không phải ý đang xét.";
   if(o.startsWith("would")||o==="were"||o==="rained"||o==="studied"||o==="called"||o==="left"||o==="improved"||o==="saw"||o==="fell"||o==="finished")return "“"+o+"” làm điều kiện/kết quả mang sắc thái giả định hoặc quá khứ, không giữ khả năng tương lai được nêu trong câu.";
   if(o.endsWith("ing"))return "“"+o+"” là V-ing nhưng thiếu trợ động từ; điều kiện cần động từ hữu hạn ở hiện tại đơn.";
   if(o.startsWith("had "))return "“"+o+"” là quá khứ hoàn thành, không phù hợp kết quả dự báo tương lai đang xét.";
   return "“"+o+"” không hợp thì hoặc cách diễn đạt điều kiện tương lai; trong câu này dùng “"+a+"”.";
 }
 if(s==="second"){
   if(o.endsWith("ing"))return "“"+o+"” không có động từ hữu hạn ở mệnh đề if, nên không hoàn chỉnh.";
   if(o.startsWith("will"))return "“"+o+"” diễn đạt dự báo tương lai, trong khi kết quả would/could/might + V chỉ một tình huống giả định.";
   if(o==="is"||o==="are"||o==="am"||o==="have"||o==="own"||o==="speak"||o==="live"||o==="knows")return "“"+o+"” là dạng hiện tại thực, không tương ứng với kết quả giả định would/could/might + V. Hình thức quá khứ trong if không có nghĩa sự việc đã xảy ra.";
   return "“"+o+"” không giữ dạng quá khứ giả định của mệnh đề if; cần “"+a+"”.";
 }
 if(s==="third"){
   if(/^would(?!.*have)/.test(o)||/^will/.test(o)||o==="would catch"||o==="would go")return "“"+o+"” nói về hệ quả hiện tại/tương lai giả định, không phải kết quả quá khứ; cần would have + V3.";
   if(o.startsWith("had ")||o==="called"||o.startsWith("didn't "))return "“"+o+"” kể một sự kiện quá khứ, không biểu thị hệ quả giả định 'đã ... nhưng thực tế không xảy ra'.";
   if(o.startsWith("wouldn't ")&&!o.startsWith("wouldn't have"))return "“"+o+"” chỉ hệ quả giả định hiện tại/tương lai; mệnh đề if trái quá khứ yêu cầu wouldn't have + V3.";
   if(o.startsWith("won't")||o.startsWith("don't"))return "“"+o+"” là kết quả hiện tại/tương lai thực, không phải kết quả trái thực tế quá khứ.";
   return "“"+o+"” không đúng cấu trúc would/could/might have + V3 dành cho kết quả giả định quá khứ.";
 }
 if(s==="mixed"){
   const futureOrPresent=/now|today/i.test(stem);
   const pastResult=/yesterday|last month/i.test(stem);
   if(/^(?:would|could|might)(?:n't)? have(?:\s|$)/.test(o)){
     if(futureOrPresent)return "“"+o+"” diễn tả hệ quả quá khứ; cụm "+(stem.includes("today")?"today":"now")+" cho biết kết quả đang xét là hiện tại.";
   }
   if(o==="would have had")return "“would have had” giả định đã sở hữu trong quá khứ; now cần “would have” cho trạng thái sở hữu hiện tại.";
   if(o==="would be"||o==="would climb"||o==="wouldn't make"||o==="could rent"||o==="might apply"){
     if(pastResult)return "“"+o+"” nói về hệ quả hiện tại/tương lai; mốc quá khứ trong câu đòi modal + have + V3.";
   }
   if(o.startsWith("will")||o.startsWith("won't"))return "“"+o+"” là dự báo kết quả thực; điều kiện trái thực tế đòi would/could/might (có have + V3 nếu kết quả ở quá khứ).";
   if(o.startsWith("had ")||o==="were"||o==="isn't"||o==="applied"||o==="didn't make")return "“"+o+"” biến hệ quả giả định thành lời kể sự việc thực tế; không còn đúng quan hệ nguyên nhân–kết quả giả định.";
   return "“"+o+"” không giữ đúng mốc thời gian: điều kiện quá khứ đang dẫn đến một kết quả ở hiện tại/quá khứ khác. Cần “"+a+"” theo mốc thời gian trong câu.";
 }
 if(s==="unless"){
   if(o==="if")return "“if” + điều kiện khẳng định làm kết quả xảy ra khi điều kiện được thỏa, đảo ngược ý 'trừ khi / nếu không' của câu gốc. Đây là lỗi nghĩa, không phải lỗi ngữ pháp.";
   if(o==="when")return "“when” chỉ thời điểm; câu cần ngoại lệ điều kiện, không phải khẳng định việc đó sẽ xảy ra.";
   if(o==="even if")return "“even if” nghĩa là 'ngay cả nếu', cho rằng kết quả vẫn xảy ra dù điều kiện thay đổi; khác 'trừ khi'.";
   if(o==="although"||o==="though")return "“"+o+"” chỉ nhượng bộ 'mặc dù', không biểu thị điều kiện ngoại lệ như unless.";
   if(o==="because"||o==="since")return "“"+o+"” nêu nguyên nhân, làm thay đổi quan hệ logic so với 'nếu không'.";
   if(o==="while")return "“while” chỉ đồng thời/tương phản; không đặt ra điều kiện ngoại lệ.";
   if(o==="so")return "“so” chỉ kết quả và không dùng để mở mệnh đề điều kiện như chỗ trống này.";
 }
 if(s==="provided"){
   if(o==="if only")return "“if only” diễn tả ước muốn/tiếc nuối ('giá mà'), khác điều kiện cần của provided that.";
   if(o==="even if")return "“even if” nghĩa là kết quả vẫn xảy ra dù điều kiện không được thỏa; ngược ý chỉ-khi/mễn-là.";
   if(o==="unless")return "“unless” nghĩa là 'trừ khi/nếu không', đảo cực tính của điều kiện khẳng định cần có.";
   if(o==="although"||o==="even though"||o==="whereas")return "“"+o+"” diễn đạt nhượng bộ/đối lập, không đặt ra điều kiện cần.";
   if(o==="because"||o==="since")return "“"+o+"” giải thích nguyên nhân, không phải điều kiện tiên quyết.";
   if(o==="despite"||o==="in spite of")return "“"+o+"” cần danh ngữ hoặc V-ing, không đứng trực tiếp trước mệnh đề hữu hạn như câu này.";
 }
 if(s==="inversion"){
   if(o==="Did")return "“Did + S + V” là mẫu nghi vấn/đảo nhấn mạnh khác, không thể thay if trong mẫu điều kiện đang xét.";
   if(o==="Had")return "“Had” chỉ đúng khi đảo mệnh đề If + had + V3; phần sau chỗ trống ở đây không theo mẫu đó.";
   if(o==="Were")return "“Were” cần cấu trúc giả định phù hợp (Were + S + to V/not for/bổ ngữ), không ghép tùy ý với dạng trong câu.";
   if(o==="Should")return "“Should” thường đi với động từ nguyên mẫu để diễn tả điều kiện dự phòng, không thay cho had + V3 hoặc were + to V.";
 }
 return "“"+o+"” thay đổi loại điều kiện hoặc mốc thời gian so với cấu trúc đang kiểm tra; dạng “"+a+"” giữ đúng mối quan hệ giữa hai mệnh đề.";
}
function relative(q,opt){
 const a=q.options[0],o=say(opt),s=q.skill,stem=q.stem;
 if(s==="reduction"){
   if(a==="which"){
     if(o==="that")return "“that” không dùng sau dấu phẩy để chỉ toàn bộ mệnh đề phía trước; dùng which.";
     if(o==="who")return "“who” chỉ người, không thể thay cho toàn bộ sự việc 'the data was lost'.";
     if(o==="where")return "“where” chỉ nơi chốn, không thay cho cả sự việc phía trước.";
   }
   if(o.endsWith("ing")){
     return "“"+o+"” là dạng chủ động, nhưng tiền ngữ trong câu là đối tượng chịu tác động; cần V3 (“"+a+"”).";
   }
   if(o.endsWith("ed")||o==="sat"){
     if(a.endsWith("ing"))return "“"+o+"” không diễn đạt quan hệ chủ động đang tiếp diễn/thường xuyên của tiền ngữ; phải dùng V-ing (“"+a+"”).";
     return "“"+o+"” không phải hình thức rút gọn thích hợp trong mệnh đề này.";
   }
   if(o.startsWith("to "))return "“"+o+"” thường gợi mục đích, nhiệm vụ hoặc dự định; câu gốc đang mô tả người/vật thực hiện hoặc chịu tác động nên không tương đương nghĩa.";
   if(o.endsWith("s"))return "“"+o+"” là động từ hữu hạn nhưng thiếu đại từ quan hệ/chủ ngữ riêng, không thể đặt như một cụm bổ nghĩa rút gọn.";
 }
 if(s==="prepositions"){
   if(o==="that")return "“that” không đứng ngay sau giới từ được chuyển lên trước đại từ quan hệ; chỉ có thể dùng that khi giới từ ở cuối mệnh đề phù hợp.";
   if(o==="who")return "Trong cấu trúc trang trọng có giới từ ngay trước đại từ, dùng whom (chỉ người) chứ không dùng who.";
   if(o==="whom")return "“whom” là tân ngữ chỉ người; tiền ngữ của câu này là vật/tổ chức nên dùng which.";
   if(o==="which")return "“which” chỉ vật/sự việc; tiền ngữ của câu này là người sau giới từ nên dùng whom.";
   if(o==="where")return "“where” tự mang quan hệ nơi chốn, không đặt sau giới từ đã được đưa lên trước như “in where / to where” trong câu này.";
   if(o==="whose")return "“whose” phải đi kèm danh từ chỉ sự sở hữu, không làm đại từ tân ngữ đơn lẻ sau giới từ.";
 }
 if(s==="quantifiers"){
   if(o==="that")return "Sau “some/many/one/two/all of” trong mệnh đề quan hệ không xác định phải dùng whom/which, không dùng that.";
   if(o==="which"&&a==="whom")return "“which” chỉ vật; tập hợp trước đó là người (students, guests, teachers, applicants hoặc scientists), nên dùng whom.";
   if(o==="whom"&&a==="which")return "“whom” là đại từ tân ngữ chỉ người, nhưng nhóm được nhắc đến là vật/động vật, nên dùng which.";
   if(o==="who")return "Sau giới từ of trong cấu trúc “lượng từ + of + đại từ”, dùng whom cho người, không dùng who.";
   if(o==="whose")return "“whose” diễn tả sở hữu và cần danh từ theo sau; không dùng sau “many of” để thay nhóm người.";
   if(o==="where"||o==="when")return "“"+o+"” là trạng từ quan hệ nơi chốn/thời gian; ở đây cần đại từ sau of để chỉ một phần của nhóm.";
 }
 if(s==="adverbs"){
   if(o==="which" && a==="where")return "“which” là đại từ chỉ vật; trong câu này động từ đã có đủ thành phần và cần trạng ngữ nơi chốn (where = at/in which).";
   if(o==="which" && a==="when")return "“which” không tự mang nghĩa 'vào ngày/khi' ở vị trí này; cần when hoặc giới từ + which.";
   if(o==="where" && a==="when")return "“where” chỉ địa điểm, trong khi tiền ngữ là ngày/năm/mùa/khoảnh khắc.";
   if(o==="when" && a==="where")return "“when” chỉ thời gian, nhưng câu đang nói nơi diễn ra hành động.";
   if(o==="which" && a==="why")return "“which” không tự mang nghĩa 'vì lý do ấy' trong mệnh đề này; dùng why hoặc for which.";
   if(o==="when" && a==="why")return "“when” chỉ thời gian, không diễn đạt lý do hành động.";
   if(o==="where" && a==="why")return "“where” chỉ nơi chốn, không diễn đạt lý do.";
   if(o==="who"||o==="whom")return "“"+o+"” chỉ người, không nối mối quan hệ "+(a==="where"?"nơi chốn":a==="when"?"thời gian":"nguyên nhân")+" trong câu này.";
   if(o==="whose")return "“whose” thể hiện sở hữu và đòi hỏi danh từ theo sau; chỗ trống cần trạng từ quan hệ.";
 }
 if(s==="commas"){
   if(o==="that")return "“that” chỉ dùng trong mệnh đề quan hệ xác định; mệnh đề giữa các dấu phẩy ở đây là không xác định.";
   if(o==="whose" && a!=="whose")return "“whose” phải đi với danh từ sở hữu ngay sau nó; ở đây cần đại từ làm chủ ngữ/tân ngữ.";
   if(o==="who" && a==="whose")return "“who” không diễn đạt quan hệ sở hữu với danh từ brother; cần whose brother.";
   if(o==="whom")return "“whom” làm tân ngữ (văn phong trang trọng), trong khi vị trí này cần chủ ngữ who.";
   if(o==="which"&&a==="who")return "“which” chỉ vật/sự việc; tiền ngữ là người nên dùng who.";
   if(o==="who"&&a==="which")return "“who” chỉ người; tiền ngữ là vật/địa danh/tổ chức nên dùng which.";
   if(o==="where"||o==="when")return "“"+o+"” diễn đạt nơi chốn/thời gian; vị trí này cần đại từ quan hệ làm chủ ngữ hoặc tân ngữ.";
   if(o==="which"&&a==="whose")return "“which” không biểu thị sở hữu trước brother; cần whose + danh từ.";
 }
 if(s==="persons"){
   if(a==="whose"){
     if(o==="who"||o==="whom")return "“"+o+"” không biểu thị quan hệ sở hữu trước danh từ (daughter/son/brother/restaurant); dùng whose + N.";
     if(o==="which")return "“which” không biểu thị quan hệ sở hữu và thường chỉ vật, không đặt trực tiếp trước danh từ sở hữu.";
     if(o==="where")return "“where” chỉ nơi chốn, không diễn tả sở hữu trước danh từ.";
   }
   if(a==="whom"){
     if(o==="who")return "Sau giới từ to đặt ngay trước đại từ, văn phong trang trọng cần whom; who chỉ có thể đi với giới từ để cuối mệnh đề.";
     if(o==="whose")return "“whose” phải đi với danh từ sở hữu ngay sau; không thay tân ngữ của to.";
     if(o==="where")return "“where” chỉ địa điểm, không đứng thay người sau giới từ to.";
   }
   if(o==="whom")return "“whom” làm tân ngữ; ở đây đại từ làm chủ ngữ của động từ theo sau nên dùng who.";
   if(o==="whose")return "“whose” phải đi kèm danh từ chỉ sở hữu; sau chỗ trống là động từ nên cần who.";
   if(o==="which")return "“which” chỉ vật/sự việc; tiền ngữ là người cần who.";
   if(o==="where")return "“where” chỉ nơi chốn; không làm chủ ngữ thay một người.";
 }
 if(s==="things"||s==="object"){
   if(o==="who"||o==="whom")return "“"+o+"” thường chỉ người; tiền ngữ là vật/sự việc nên dùng which (hoặc that trong mệnh đề xác định).";
   if(o==="whose")return "“whose” cần danh từ theo sau để chỉ sở hữu; ở vị trí này đại từ quan hệ làm chủ ngữ/tân ngữ.";
   if(o==="where"||o==="when")return "“"+o+"” chỉ quan hệ nơi chốn/thời gian, nhưng câu cần đại từ quan hệ thay chủ ngữ/tân ngữ của mệnh đề phụ.";
   if(o==="that")return "“that” không dùng trong mệnh đề không xác định được ngăn bằng dấu phẩy; dùng which.";
 }
 return "“"+o+"” không phù hợp vai trò của đại từ quan hệ tại đây; chọn “"+a+"” theo tiền ngữ và chức năng trong mệnh đề.";
}
function build(){
 let audited=0;
 for(const n of topics){
  const d=g["GrammarTopic"+n+"Data"];
  if(!d||!Array.isArray(d.sections))throw Error("Topic "+n+" not loaded before focused explanations.");
  const all=[...d.sections.flatMap(s=>s.checks),...d.practice,...d.mastery,...d.reviewSets.set1,...d.reviewSets.set2,...d.repairs];
  const unique=new Map(all.map(q=>[q.id,q]));
  if(unique.size!==80)throw Error("Unexpected question count for Topic "+n+": "+unique.size);
  for(const q of unique.values()){
   const rules={5:sva,19:conditional,22:relative};
   const why=q.why;
   if(!why||!q.vi||q.options.length!==4||q.correct!==0)throw Error("Malformed question "+q.id);
   q.explain=q.explain||{};
   q.explain.clue=evidence(n,q);
   q.explain.rule=why;
   q.explain.wrong={};
   for(const i of [1,2,3]){
    const msg=rules[n](q,q.options[i]);
    if(!msg||msg.length<30||/không thỏa điều kiện ngữ pháp|Dấu hiệu cần kiểm tra|Quy tắc cần dùng/.test(msg))throw Error("Insufficient diagnosis "+q.id+" choice "+i);
    q.explain.wrong[i]=msg;
   }
   if(n===5 && q.skill==="collectives")q.pitfall="Family/team/committee có thể dùng số nhiều trong một số ngữ cảnh Anh-Anh; chú ý đề đang hỏi về members hay cả nhóm.";
   if(n===19 && q.skill==="unless")q.pitfall="Một lựa chọn có thể đúng về cấu trúc nhưng trái nghĩa với câu gốc; không gọi đó là lỗi ngữ pháp.";
   if(n===22 && q.skill==="object")q.pitfall="Trong mệnh đề quan hệ xác định, đại từ làm tân ngữ có thể được lược; không lược đại từ làm chủ ngữ.";
   audited++;
  }
  const lessons=d.sections;
  for(const s of lessons){
   for(const check of s.checks){
    const clue=check.explain.clue;
    check.discovery={
      prompt:"Trước khi chọn đáp án, cần xác định điều gì trong câu?",
      options:[clue,"Chỉ dựa vào từ đứng sát ô trống mà không xét cấu trúc toàn câu."],
      correct:0,
      why:clue
    };
   }
  }
 }
 if(audited!==240)throw Error("Expected to audit 240 unique questions, got "+audited);
 return audited;
}
g.GrammarFocusedExplanationAudit=build();
})(window);