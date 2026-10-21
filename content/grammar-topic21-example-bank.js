/* Topic 21 · progressive contrastive example bank.
 * Each section starts with 2 original examples; add 8 distinct examples
 * to reach 10. The reader shows the first 3 and reveals the remaining 7.
 * Each ordinary/inverted pair shares exactly one Vietnamese translation.
 */
(function(g){
"use strict";
const d=g.GrammarTopic21Data;
if(!d?.sections?.length)throw Error("Load GrammarTopic21Data and its upgrade first.");
const E=(normal,inverted,vi,why)=>({normal,inverted,vi,why});
const bank={
 mechanics:[
  E("She has seldom seen such dedication.","Seldom has she seen such dedication.","Cô ấy hiếm khi thấy sự tận tâm đến vậy.","Hiện tại hoàn thành đã có has nên đảo has lên trước she; seen vẫn là V3."),
  E("They rarely travel during winter.","Rarely do they travel during winter.","Họ hiếm khi đi du lịch vào mùa đông.","Động từ thường travel ở hiện tại đơn cần trợ động từ do khi đảo."),
  E("He never forgot that advice.","Never did he forget that advice.","Anh ấy chưa bao giờ quên lời khuyên đó.","Quá khứ đơn dùng did + he + forget; không giữ forgot sau did."),
  E("I had never been so nervous before.","Never had I been so nervous before.","Trước đó, tôi chưa bao giờ lo lắng đến thế.","Quá khứ hoàn thành có had nên đảo had; been giữ nguyên."),
  E("Our manager is rarely late.","Rarely is our manager late.","Quản lý của chúng tôi hiếm khi đến muộn.","Is là động từ be, có thể đưa trực tiếp lên trước chủ ngữ."),
  E("They have never discussed the issue publicly.","Never have they discussed the issue publicly.","Họ chưa bao giờ thảo luận công khai vấn đề ấy.","Have là trợ động từ của hiện tại hoàn thành; không thêm do."),
  E("I could never have imagined this outcome.","Never could I have imagined this outcome.","Tôi không thể nào ngờ đến kết quả này.","Modal could đứng trước I; phần have imagined không thay đổi."),
  E("She hardly ever complains about her workload.","Hardly ever does she complain about her workload.","Cô ấy hầu như chẳng bao giờ phàn nàn về khối lượng công việc.","Hardly ever mang nghĩa gần phủ định; hiện tại đơn dùng does + she + complain.")
 ],
 negative:[
  E("Employees must not share these passwords under any circumstances.","Under no circumstances must employees share these passwords.","Nhân viên tuyệt đối không được chia sẻ những mật khẩu này.","Under no circumstances đầu câu kéo theo đảo modal must trước employees."),
  E("The witness did not change her story at any point.","At no point did the witness change her story.","Nhân chứng không hề thay đổi lời khai vào bất kỳ thời điểm nào.","At no point có nghĩa phủ định; quá khứ đơn dùng did + S + V nguyên mẫu."),
  E("He did not once mention the budget.","Not once did he mention the budget.","Anh ấy không hề nhắc tới ngân sách dù chỉ một lần.","Not once được đưa lên đầu, kéo theo did he mention."),
  E("We should not treat this issue lightly in any way.","In no way should we treat this issue lightly.","Chúng ta tuyệt đối không nên xem nhẹ vấn đề này.","In no way đứng đầu làm should đảo lên trước we."),
  E("The results are by no means conclusive.","By no means are the results conclusive.","Các kết quả hoàn toàn chưa mang tính kết luận.","By no means nhấn mạnh phủ định; đảo are lên trước the results."),
  E("You should not open the door to strangers under any circumstances.","On no account should you open the door to strangers.","Bạn tuyệt đối không được mở cửa cho người lạ.","On no account diễn tả cấm đoán mạnh; should đứng trước you."),
  E("I had little idea that the plan would fail.","Little did I know that the plan would fail.","Tôi nào ngờ kế hoạch sẽ thất bại.","Little did I know là mẫu nhấn mạnh sự thiếu nhận thức, không phải little = nhỏ."),
  E("The team did not just reduce costs; it also improved quality.","Not only did the team reduce costs, but it also improved quality.","Nhóm không chỉ cắt giảm chi phí mà còn cải thiện chất lượng.","Not only mở đầu cả mệnh đề nên đảo did the team reduce; vế but also không đảo.")
 ],
 only:[
  E("We began only when everyone had arrived.","Only when everyone had arrived did we begin.","Chỉ khi mọi người đến đông đủ, chúng tôi mới bắt đầu.","Mệnh đề when everyone had arrived không đảo; did we begin mới đảo."),
  E("She understood the error only after rereading the email.","Only after rereading the email did she understand the error.","Chỉ sau khi đọc lại email, cô ấy mới hiểu sai sót.","Only after + V-ing đứng đầu; đảo did she understand ở mệnh đề chính."),
  E("The researchers confirmed the result only by repeating the experiment.","Only by repeating the experiment did the researchers confirm the result.","Chỉ bằng cách lặp lại thí nghiệm, các nhà nghiên cứu mới xác nhận kết quả.","Only by chỉ phương thức cần thiết; đảo did trước the researchers."),
  E("We can finish on time only with enough volunteers.","Only with enough volunteers can we finish on time.","Chỉ khi có đủ tình nguyện viên, chúng ta mới có thể hoàn thành đúng hạn.","Only with + danh ngữ đứng đầu kéo theo đảo can we ở mệnh đề chính."),
  E("She learned the truth only later.","Only later did she learn the truth.","Mãi về sau cô ấy mới biết sự thật.","Only later đứng đầu để nhấn mạnh thời điểm; quá khứ đơn đảo did."),
  E("They could enter only then.","Only then could they enter.","Chỉ đến lúc đó họ mới có thể vào.","Could là modal đã có sẵn, chỉ cần chuyển lên trước chủ ngữ."),
  E("You will receive the certificate only if you pass the final test.","Only if you pass the final test will you receive the certificate.","Chỉ khi vượt qua bài kiểm tra cuối khóa, bạn mới nhận được chứng chỉ.","Only if chỉ điều kiện cần; mệnh đề if giữ nguyên, mệnh đề chính đảo will."),
  E("He didn't notice the typo until he printed the report.","Not until he printed the report did he notice the typo.","Mãi đến khi in báo cáo, anh ấy mới phát hiện lỗi đánh máy.","Cụm Not until không đảo bên trong; mệnh đề chính dùng did he notice.")
 ],
 time:[
  E("The lights had barely gone out when the audience began to cheer.","Barely had the lights gone out when the audience began to cheer.","Đèn vừa tắt thì khán giả bắt đầu reo hò.","Barely had + S + V3 nối với when; gone out là sự việc trước."),
  E("The guests had scarcely arrived when it started to rain.","Scarcely had the guests arrived when it started to rain.","Khách vừa đến thì trời bắt đầu mưa.","Scarcely had + S + V3 ... when diễn tả hai sự kiện sát nhau."),
  E("She had hardly opened the book when her phone rang.","Hardly had she opened the book when her phone rang.","Cô ấy vừa mở sách thì điện thoại reo.","Hardly đi với when; đảo had trước she, không đảo ở vế when."),
  E("The meeting had barely begun when the fire alarm sounded.","Barely had the meeting begun when the fire alarm sounded.","Cuộc họp vừa bắt đầu thì chuông báo cháy vang lên.","Sau Barely đầu câu, đảo had trước the meeting; begun là V3."),
  E("I had no sooner finished my coffee than the train arrived.","No sooner had I finished my coffee than the train arrived.","Tôi vừa uống xong cà phê thì tàu đến.","No sooner đi với than, không phải when trong cặp cấu trúc này."),
  E("The children had scarcely fallen asleep when the dog barked.","Scarcely had the children fallen asleep when the dog barked.","Lũ trẻ vừa ngủ thiếp đi thì con chó sủa.","Fallen là V3 của fall; scarcely ... when diễn tả sự nối tiếp gần như ngay lập tức."),
  E("The door had no sooner opened than people rushed inside.","No sooner had the door opened than people rushed inside.","Cửa vừa mở thì mọi người ùa vào.","Chuyển no sooner lên đầu rồi đảo had trước the door; dùng than cho sự việc sau."),
  E("The shop was no sooner open than customers started queuing.","No sooner was the shop open than customers started queuing.","Cửa hàng vừa mở cửa thì khách đã bắt đầu xếp hàng.","Đảo trực tiếp was với chủ ngữ the shop; No sooner không phải lúc nào cũng dùng had.")
 ],
 conditional:[
  E("If she had checked the address, she would not have missed the delivery.","Had she checked the address, she would not have missed the delivery.","Nếu cô ấy kiểm tra địa chỉ từ trước, cô ấy đã không bỏ lỡ chuyến giao hàng.","Bỏ if của điều kiện quá khứ; đảo had lên trước she, giữ V3 checked."),
  E("If we had not left early, we would have missed the train.","Had we not left early, we would have missed the train.","Nếu chúng tôi không đi sớm, chúng tôi đã lỡ tàu.","Đảo had trước we và giữ not sau chủ ngữ: Had we not left..."),
  E("If I were in your position, I would ask for clarification.","Were I in your position, I would ask for clarification.","Nếu ở vị trí của bạn, tôi sẽ yêu cầu giải thích rõ hơn.","Đảo were trước I để diễn tả giả định ở hiện tại."),
  E("If the plan were to change, we would notify everyone.","Were the plan to change, we would notify everyone.","Nếu kế hoạch thay đổi, chúng tôi sẽ thông báo cho mọi người.","Were + S + to V dùng khi giả định một tình huống có thể phát sinh."),
  E("If you should encounter any difficulties, call this number.","Should you encounter any difficulties, call this number.","Nếu gặp khó khăn, hãy gọi số này.","Should + S + V thay cho If + S + should + V; sắc thái lịch sự/trang trọng."),
  E("If there should be a delay, we will send an update.","Should there be a delay, we will send an update.","Nếu có chậm trễ, chúng tôi sẽ gửi thông báo cập nhật.","Với there be, mẫu đảo là Should there be, không đảo động từ chính."),
  E("If it were not for her support, I would give up.","Were it not for her support, I would give up.","Nếu không có sự ủng hộ của cô ấy, tôi sẽ bỏ cuộc.","Were it not for = If it were not for, nói về điều kiện giả định hiện tại."),
  E("If it had not been for the seat belt, he might have been seriously injured.","Had it not been for the seat belt, he might have been seriously injured.","Nếu không có dây an toàn, có lẽ anh ấy đã bị thương nặng.","Had it not been for = If it had not been for, giả định trái với quá khứ.")
 ],
 "so-such":[
  E("The instructions were so clear that nobody asked a question.","So clear were the instructions that nobody asked a question.","Hướng dẫn rõ ràng đến mức không ai đặt câu hỏi.","Đưa So clear lên đầu, rồi đảo were trước the instructions."),
  E("He spoke so softly that nobody could hear him.","So softly did he speak that nobody could hear him.","Anh ấy nói nhỏ đến mức không ai nghe thấy.","Softly là trạng từ nên dùng So softly + did + S + speak."),
  E("The demand was so high that tickets sold out in minutes.","So high was the demand that tickets sold out in minutes.","Nhu cầu cao đến mức vé bán hết chỉ trong vài phút.","So + tính từ high + was + danh ngữ the demand."),
  E("The confusion was so great that nobody knew what to do.","Such was the confusion that nobody knew what to do.","Sự hỗn loạn lớn đến mức không ai biết phải làm gì.","Such was + cụm danh từ the confusion; khác mẫu So great was..."),
  E("The weather was so severe that flights were cancelled.","So severe was the weather that flights were cancelled.","Thời tiết khắc nghiệt đến mức các chuyến bay bị hủy.","Đưa tính từ severe cùng so lên đầu, đảo was trước the weather."),
  E("She answered so confidently that the panel was impressed.","So confidently did she answer that the panel was impressed.","Cô ấy trả lời tự tin đến mức hội đồng rất ấn tượng.","Confidently là trạng từ, nên cần did + S + V nguyên mẫu khi đảo."),
  E("The pressure was so intense that several players made mistakes.","Such was the pressure that several players made mistakes.","Áp lực lớn đến mức một số cầu thủ đã mắc lỗi.","Such was the pressure nêu mức độ bằng cụm danh từ; that giới thiệu kết quả."),
  E("The view was so breathtaking that we stopped to take photos.","So breathtaking was the view that we stopped to take photos.","Khung cảnh đẹp đến ngỡ ngàng khiến chúng tôi dừng lại chụp ảnh.","So breathtaking đứng đầu nhằm nhấn mạnh tính từ; was đảo trước the view.")
 ],
 full:[
  E("An ancient temple stands at the top of the hill.","At the top of the hill stands an ancient temple.","Trên đỉnh đồi có một ngôi đền cổ.","Cụm nơi chốn đứng đầu; động từ stands đứng trước chủ ngữ danh từ an ancient temple."),
  E("A narrow path runs between the two buildings.","Between the two buildings runs a narrow path.","Giữa hai tòa nhà có một lối đi hẹp.","Đây là đảo hoàn toàn với động từ chính runs, không dùng do."),
  E("Several old photographs hung on the wall.","On the wall hung several old photographs.","Trên tường treo vài bức ảnh cũ.","Đảo hung lên trước chủ ngữ là cụm danh từ several old photographs."),
  E("A small boat came around the bend.","Around the bend came a small boat.","Một chiếc thuyền nhỏ xuất hiện từ khúc quanh.","Cụm chỉ hướng mở đầu, động từ chuyển động came đứng trước chủ ngữ danh từ."),
  E("A stray cat sat under the bench.","Under the bench sat a stray cat.","Dưới ghế dài có một con mèo đi lạc đang ngồi.","Under the bench đưa lên đầu, sat đảo trước a stray cat."),
  E("The children rushed out of the classroom.","Out of the classroom rushed the children.","Bọn trẻ ùa ra khỏi lớp học.","Đảo động từ chuyển động rushed trước chủ ngữ danh từ the children."),
  E("The results are here.","Here are the results.","Kết quả đây rồi.","Đảo are lên trước cụm danh từ the results; với đại từ sẽ là Here they are."),
  E("A strange sound came from the attic.","From the attic came a strange sound.","Một âm thanh lạ phát ra từ gác mái.","From the attic đứng đầu, came đứng trước chủ ngữ danh từ a strange sound.")
 ],
 agreement:[
  E("Annie enjoys documentaries. I enjoy them too.","Annie enjoys documentaries. So do I.","Annie thích phim tài liệu và tôi cũng vậy.","Hiện tại đơn với enjoys → dùng So do I khi chủ ngữ đáp lại là I."),
  E("David was tired, and I was tired too.","David was tired, and so was I.","David mệt và tôi cũng mệt.","Câu trước có be ở quá khứ, nên dùng so was I."),
  E("Leo has completed the form. I have completed it too.","Leo has completed the form. So have I.","Leo đã điền xong mẫu đơn và tôi cũng đã xong.","Hiện tại hoàn thành dùng have; không thay bằng do."),
  E("They will attend the workshop. We will attend it too.","They will attend the workshop. So will we.","Họ sẽ tham gia buổi hội thảo và chúng tôi cũng vậy.","Giữ modal will và đảo trước chủ ngữ we."),
  E("The neighbors don't eat meat. We don't eat meat either.","The neighbors don't eat meat. Neither do we.","Những người hàng xóm không ăn thịt và chúng tôi cũng không.","Câu đầu phủ định hiện tại đơn, dùng Neither + do + we."),
  E("Lucy didn't receive the invitation. I didn't receive it either.","Lucy didn't receive the invitation. Neither did I.","Lucy không nhận được lời mời và tôi cũng không.","Quá khứ đơn phủ định → Neither did I."),
  E("My sister isn't ready. I'm not ready either.","My sister isn't ready. Nor am I.","Chị tôi chưa sẵn sàng và tôi cũng vậy.","Nor am I mang nghĩa phủ định: tôi cũng chưa sẵn sàng."),
  E("The students weren't given enough time. I wasn't given enough time either.","The students weren't given enough time. Neither was I.","Những học sinh ấy không được cho đủ thời gian và tôi cũng không.","Với bị động quá khứ wasn't given, dùng Neither was I.")
 ]
};
for(const section of d.sections){
 const additions=bank[section.id];
 if(!additions||!section.vi||section.examples.length!==2||section.vi.examples.length!==2||additions.length!==8){
  throw Error("Invalid original bank or examples: "+section.id);
 }
 const seen=new Set(section.examples.map(x=>x.inverted));
 for(const example of additions){
  if(!example.normal||!example.inverted||!example.vi||!example.why||seen.has(example.inverted)){
   throw Error("Incomplete or repeated example: "+section.id);
  }
  seen.add(example.inverted);
  section.examples.push({normal:example.normal,inverted:example.inverted,why:example.why});
  section.vi.examples.push(example.vi);
 }
 if(section.examples.length!==10||section.vi.examples.length!==10)throw Error("Incorrect example count: "+section.id);
}
})(window);
