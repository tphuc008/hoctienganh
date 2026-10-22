/* Topic 22 — Relative Clauses. Original bilingual mini-lessons and graded exercises. */
(function(g){
"use strict";
const L=(id,title,meaning,form,core,mistake,faults,rows,extras=[])=>({
 id,title,meaning,form,core,mistake,faults,extras,outcome:"Nhận diện và sử dụng "+title.toLowerCase()+".",
 entries:rows.map(s=>{const v=s.split(" ~ ").map(x=>x.trim());if(v.length!==8)throw Error(id+": invalid "+v.length+" fields");return v;})
});
const lessons=[
L("persons","Who, whom, whose – người và sở hữu",
"Who thay cho người làm chủ ngữ; whom dùng khi người là tân ngữ (đặc biệt sau giới từ); whose thể hiện sở hữu.",
"Người + who + V…\nNgười + (whom / who) + S + V…\nNgười + whose + N + V…",
"Xác định vai trò của đại từ quan hệ trong mệnh đề phụ, không chỉ nhìn danh từ đứng trước.",
"Whose đứng trước danh từ sở hữu; không dùng who thay whose.",
["không diễn đạt quan hệ người làm chủ ngữ","không thể hiện sở hữu trước danh từ","chỉ nơi chốn/vật hoặc sai chức năng"],
[
"The nurse works here. She helped my father. ~ The nurse ___ helped my father works here. ~ who ~ where ~ whose ~ which ~ Y tá đã giúp bố tôi làm việc ở đây. ~ Who là chủ ngữ người của mệnh đề quan hệ.",
"The teacher is kind. She teaches us. ~ The teacher ___ teaches us is kind. ~ who ~ which ~ where ~ whose ~ Giáo viên dạy chúng tôi rất tốt bụng. ~ Who thay chủ ngữ người.",
"The engineer designed the bridge. He lives next door. ~ The engineer ___ designed the bridge lives next door. ~ who ~ whose ~ which ~ where ~ Kỹ sư thiết kế cầu sống cạnh nhà tôi. ~ Người làm chủ ngữ: who.",
"I met a woman. Her daughter is a pilot. ~ The woman ___ daughter is a pilot lives nearby. ~ whose ~ who ~ which ~ where ~ Người phụ nữ có con gái là phi công sống gần đây. ~ Whose + danh từ daughter biểu thị sở hữu.",
"That writer has a son. His son won a prize. ~ The writer ___ son won a prize is famous. ~ whose ~ whom ~ where ~ which ~ Nhà văn có con trai đoạt giải rất nổi tiếng. ~ Whose giới thiệu danh từ thuộc về người trước.",
"I spoke to a manager. He solved the issue. ~ The manager to ___ I spoke solved the issue. ~ whom ~ who ~ whose ~ where ~ Người quản lý mà tôi nói chuyện cùng đã giải quyết vấn đề. ~ Sau giới từ to trong văn phong trang trọng dùng whom.",
"We thanked a volunteer. She stayed late. ~ The volunteer ___ stayed late received our thanks. ~ who ~ whom ~ whose ~ where ~ Tình nguyện viên ở lại muộn được chúng tôi cảm ơn. ~ Chủ ngữ của stayed phải là who.",
"I know a chef. His restaurant opened recently. ~ The chef ___ restaurant opened recently is my cousin. ~ whose ~ whom ~ where ~ which ~ Đầu bếp có nhà hàng vừa mở là anh họ tôi. ~ Whose nối quan hệ sở hữu.",
"I interviewed a candidate. He had worked abroad. ~ The candidate ___ had worked abroad impressed us. ~ who ~ whom ~ where ~ which ~ Ứng viên từng làm việc ở nước ngoài gây ấn tượng với chúng tôi. ~ Who làm chủ ngữ của had worked.",
"That actor has a brother. His brother is a doctor. ~ The actor ___ brother is a doctor is visiting. ~ whose ~ whom ~ where ~ which ~ Diễn viên có anh trai là bác sĩ đang đến thăm. ~ Whose + brother diễn tả quan hệ sở hữu."
]),
L("things","Which, that và vật được bổ nghĩa",
"Which và that thường thay vật trong mệnh đề xác định; which còn xuất hiện trong mệnh đề không xác định.",
"Vật + which / that + V…\nVật + which / that + S + V…",
"Danh từ được bổ nghĩa là đồ vật hay sự việc. Không dùng what thay which/that khi đã có tiền ngữ.",
"Trong mệnh đề không xác định có dấu phẩy, không dùng that.",
["dùng đại từ dành cho người hoặc nơi chốn","sai cấu trúc sở hữu cần danh từ sau whose","dùng quan hệ sai với danh từ vật"],
[
"The phone broke. It was expensive. ~ The phone ___ broke was expensive. ~ which ~ who ~ whose ~ where ~ Chiếc điện thoại bị hỏng rất đắt tiền. ~ Which làm chủ ngữ thay vật.",
"The book is missing. It has a blue cover. ~ The book ___ has a blue cover is missing. ~ which ~ who ~ where ~ whom ~ Cuốn sách bìa xanh đã mất. ~ Which thay thế book là vật.",
"I bought a camera. It takes clear pictures. ~ The camera ___ takes clear pictures is new. ~ which ~ whom ~ who ~ where ~ Chiếc máy ảnh chụp rõ nét là máy mới. ~ Which làm chủ ngữ của takes.",
"The report contains errors. It was submitted yesterday. ~ The report ___ was submitted yesterday contains errors. ~ which ~ who ~ whom ~ where ~ Bản báo cáo nộp hôm qua có lỗi. ~ Which phù hợp tiền ngữ report.",
"The road is closed. It leads to the museum. ~ The road ___ leads to the museum is closed. ~ which ~ where ~ whose ~ whom ~ Con đường dẫn đến bảo tàng bị đóng. ~ Which đóng vai trò chủ ngữ của leads.",
"Her car, which is old, needs repairs. ~ Her car, ___ is over ten years old, needs repairs. ~ which ~ that ~ where ~ who ~ Xe cô ấy đã hơn mười năm tuổi và cần sửa. ~ Mệnh đề không xác định với dấu phẩy dùng which, không dùng that.",
"The laptop, which I bought recently, is faulty. ~ My laptop, ___ I bought last week, is faulty. ~ which ~ that ~ where ~ whose ~ Máy tính xách tay tôi mua tuần trước bị lỗi. ~ Mệnh đề bổ sung giữa hai dấu phẩy dùng which.",
"The package is heavy. It arrived today. ~ The package ___ arrived this morning is heavy. ~ which ~ who ~ whose ~ when ~ Gói hàng đến sáng nay khá nặng. ~ Which nối mệnh đề về vật.",
"The painting is valuable. It hangs upstairs. ~ The painting ___ hangs upstairs is valuable. ~ which ~ whose ~ whom ~ where ~ Bức tranh treo trên tầng có giá trị. ~ Which làm chủ ngữ cho hangs.",
"The film was exciting. It ended late. ~ The film ___ ended after midnight was exciting. ~ which ~ who ~ whose ~ when ~ Bộ phim kết thúc sau nửa đêm rất hấp dẫn. ~ Which thay film làm chủ ngữ."
]),
L("object","Đại từ quan hệ làm tân ngữ và lược bỏ",
"Trong mệnh đề quan hệ xác định, có thể bỏ đại từ quan hệ khi nó làm tân ngữ; không bỏ khi làm chủ ngữ.",
"N + (who/whom/which/that) + S + V\nN + Ø + S + V (lược đại từ tân ngữ)",
"Kiểm tra phía sau chỗ trống: nếu đã có chủ ngữ của động từ, đại từ có thể làm tân ngữ. Không lược đại từ chủ ngữ.",
"Không xóa who trong 'the person who called me' vì who là chủ ngữ của called.",
["biến tân ngữ thành chủ ngữ sai","dùng quan hệ sở hữu thay cho tân ngữ","dùng trạng từ quan hệ khi cần đại từ tân ngữ"],
[
"This is the book. I recommended it yesterday. ~ This is the book ___ I recommended yesterday. ~ which ~ whose ~ where ~ who ~ Đây là cuốn sách tôi giới thiệu hôm qua. ~ Which làm tân ngữ và có thể lược ở mệnh đề xác định.",
"The colleague works nearby. I know him. ~ The colleague ___ I know works nearby. ~ whom ~ whose ~ where ~ which ~ Đồng nghiệp mà tôi quen làm việc gần đây. ~ Whom là tân ngữ người, có thể lược trong mệnh đề xác định.",
"I lost the key. You gave it to me. ~ The key ___ you gave me is missing. ~ which ~ who ~ where ~ whose ~ Chìa khóa bạn đưa tôi đã mất. ~ You là chủ ngữ, which đóng vai trò tân ngữ.",
"We watched a film. You recommended it. ~ The film ___ you recommended was brilliant. ~ which ~ who ~ whose ~ where ~ Bộ phim bạn giới thiệu rất hay. ~ Which là tân ngữ của recommended.",
"That is the woman. We invited her. ~ The woman ___ we invited arrived early. ~ whom ~ whose ~ when ~ which ~ Người phụ nữ chúng tôi mời đã đến sớm. ~ Whom là tân ngữ chỉ người.",
"He wore the jacket. I bought it for him. ~ The jacket ___ I bought for him is blue. ~ which ~ whose ~ whom ~ when ~ Áo khoác tôi mua cho anh ấy màu xanh. ~ Which là tân ngữ của bought.",
"The advice was useful. She offered it. ~ The advice ___ she offered was useful. ~ which ~ who ~ where ~ whose ~ Lời khuyên cô ấy đưa ra rất hữu ích. ~ Which làm tân ngữ, có thể lược.",
"The student is absent. I tutored her. ~ The student ___ I tutored is absent. ~ whom ~ whose ~ where ~ which ~ Học sinh tôi kèm hôm nay vắng. ~ Whom dùng như tân ngữ người.",
"I found the letter. You were looking for it. ~ The letter ___ you were looking for has been found. ~ which ~ who ~ where ~ whose ~ Lá thư bạn tìm đã được thấy. ~ Which là tân ngữ của giới từ for ở cuối.",
"The song is popular. We listened to it. ~ The song ___ we listened to is popular. ~ which ~ when ~ who ~ whose ~ Bài hát chúng tôi nghe rất nổi tiếng. ~ Which làm tân ngữ của to."
]),
L("commas","Mệnh đề xác định và không xác định",
"Mệnh đề xác định giúp nhận diện đối tượng; mệnh đề không xác định chỉ thêm thông tin và được ngăn bằng dấu phẩy.",
"Defining: N + who/which/that + …\nNon-defining: N, who/which/whose + …, …",
"Trong mệnh đề không xác định không dùng that và không bỏ đại từ quan hệ; dấu phẩy có thể đổi ý nghĩa.",
"Đừng coi dấu phẩy chỉ là trang trí: chúng xác định thông tin thiết yếu hay bổ sung.",
["dùng that trong mệnh đề bổ sung","thiếu đại từ quan hệ bắt buộc","không tương thích với tiền ngữ người/vật"],
[
"My sister, who lives in Hue, is a nurse. ~ My sister, ___ lives in Hue, is a nurse. ~ who ~ that ~ which ~ where ~ Chị tôi sống ở Huế là y tá. ~ Dấu phẩy báo mệnh đề không xác định, dùng who.",
"Hanoi, which is the capital, is busy. ~ Hanoi, ___ is the capital of Vietnam, is busy. ~ which ~ that ~ who ~ where ~ Hà Nội, thủ đô của Việt Nam, rất nhộn nhịp. ~ Which đưa thông tin bổ sung về địa danh.",
"My uncle, who teaches maths, is visiting. ~ My uncle, ___ teaches maths, is visiting us. ~ who ~ that ~ which ~ where ~ Chú tôi, người dạy toán, đang đến thăm. ~ Mệnh đề không xác định chỉ người, dùng who.",
"This laptop, which I bought in May, is slow. ~ My laptop, ___ I bought in May, is slow. ~ which ~ that ~ who ~ whose ~ Máy tính xách tay tôi mua tháng Năm chạy chậm. ~ Dấu phẩy loại trừ that.",
"The village, which lies by the river, is small. ~ The village, ___ lies by the river, is small. ~ which ~ that ~ who ~ when ~ Ngôi làng nằm bên sông khá nhỏ. ~ Which bổ nghĩa cho village trong mệnh đề phụ.",
"Mai, whose brother is an actor, lives here. ~ Mai, ___ brother is an actor, lives here. ~ whose ~ that ~ who ~ which ~ Mai có anh trai là diễn viên sống ở đây. ~ Whose + brother mang nghĩa sở hữu dù là mệnh đề không xác định.",
"The museum, which opened last year, is popular. ~ The museum, ___ opened last year, is popular. ~ which ~ that ~ who ~ where ~ Bảo tàng khai trương năm ngoái rất nổi tiếng. ~ Which là chủ ngữ vật trong mệnh đề có dấu phẩy.",
"My father, who loves gardening, is retired. ~ My father, ___ loves gardening, is retired. ~ who ~ that ~ which ~ where ~ Bố tôi rất thích làm vườn và đã nghỉ hưu. ~ Who thay người trong mệnh đề bổ sung.",
"Her bicycle, which is red, was stolen. ~ Her bicycle, ___ is red, was stolen. ~ which ~ that ~ where ~ whose ~ Chiếc xe đạp màu đỏ của cô ấy đã bị trộm. ~ Non-defining dùng which.",
"Mr Long, who managed the project, has retired. ~ Mr Long, ___ managed the project, has retired. ~ who ~ that ~ whom ~ whose ~ Ông Long, người quản lý dự án, đã nghỉ hưu. ~ Who là chủ ngữ người trong mệnh đề có dấu phẩy."
]),
L("adverbs","Where, when, why và danh từ chỉ nơi/thời gian/lý do",
"Where bổ nghĩa nơi chốn, when bổ nghĩa thời gian, why bổ nghĩa cho reason trong mệnh đề xác định.",
"Place + where + S + V\nTime + when + S + V\nReason + why + S + V",
"Phân biệt where = in/at which, when = on/in which, why = for which trong ngữ cảnh phù hợp.",
"Không dùng where chỉ vì danh từ nói về một địa điểm nếu vị trí thiếu là chủ ngữ/tân ngữ.",
["không nối quan hệ nơi chốn đúng chức năng","không diễn đạt được mối liên hệ thời gian","không diễn đạt quan hệ lý do đúng"],
[
"This is the café. We met there. ~ This is the café ___ we met. ~ where ~ which ~ who ~ whose ~ Đây là quán cà phê chúng tôi gặp nhau. ~ Where chỉ địa điểm xảy ra việc gặp.",
"That was the day. I moved then. ~ That was the day ___ I moved abroad. ~ when ~ where ~ which ~ who ~ Đó là ngày tôi chuyển ra nước ngoài. ~ When biểu thị thời điểm.",
"I know the reason. She left because of it. ~ I understand the reason ___ she left. ~ why ~ when ~ where ~ who ~ Tôi hiểu lý do cô ấy rời đi. ~ Why nối với reason chỉ nguyên nhân.",
"The city is lively. She was born there. ~ The city ___ she was born is lively. ~ where ~ when ~ whose ~ who ~ Thành phố nơi cô ấy sinh ra rất sôi động. ~ Where chỉ nơi sinh ra.",
"Summer is the season. We travel then. ~ Summer is the season ___ we travel most. ~ when ~ where ~ who ~ whose ~ Mùa hè là lúc chúng tôi đi du lịch nhiều nhất. ~ When nối với mốc thời gian.",
"That is the school. I used to study there. ~ This is the school ___ I studied. ~ where ~ whom ~ whose ~ when ~ Đây là ngôi trường tôi từng học. ~ Where = at which ở đây.",
"The year was memorable. We met that year. ~ The year ___ we first met was memorable. ~ when ~ where ~ why ~ who ~ Năm đầu tiên chúng tôi gặp nhau rất đáng nhớ. ~ When cho mốc năm.",
"I can't explain the reason. The plan failed because of it. ~ I cannot explain the reason ___ the plan failed. ~ why ~ where ~ when ~ whom ~ Tôi không giải thích được tại sao kế hoạch thất bại. ~ Why chỉ lý do.",
"That was the moment. Everything changed then. ~ That was the moment ___ everything changed. ~ when ~ which ~ where ~ who ~ Đó là khoảnh khắc mọi thứ thay đổi. ~ When dùng với moment.",
"The park is nearby. Children play there. ~ The park ___ children play is nearby. ~ where ~ which ~ whose ~ whom ~ Công viên nơi trẻ em vui chơi ở gần đây. ~ Where thay at/in which."
]),
L("prepositions","Giới từ + whom/which",
"Trong văn viết trang trọng, giới từ có thể đặt trước whom (người) hoặc which (vật); không đặt ngay trước that.",
"Person + preposition + whom + S + V\nThing + preposition + which + S + V",
"Chọn đại từ theo tiền ngữ và giới từ theo động từ/cụm động từ tương ứng.",
"Văn nói có thể để giới từ cuối mệnh đề; nhưng không nói 'to that' trong cấu trúc đại từ quan hệ.",
["dùng đại từ không phù hợp với người","dùng đại từ không phù hợp với vật","sai trật tự của giới từ và đại từ quan hệ"],
[
"I spoke to the director. ~ The director to ___ I spoke was helpful. ~ whom ~ which ~ that ~ where ~ Giám đốc mà tôi trao đổi cùng rất nhiệt tình. ~ To whom là cấu trúc trang trọng cho người.",
"She worked with a professor. ~ The professor with ___ she worked was famous. ~ whom ~ that ~ where ~ which ~ Giáo sư mà cô ấy làm việc cùng rất nổi tiếng. ~ With whom chỉ người sau giới từ.",
"We rely on this method. ~ The method on ___ we rely is reliable. ~ which ~ whom ~ that ~ where ~ Phương pháp chúng tôi dựa vào đáng tin cậy. ~ On which với tiền ngữ vật.",
"The house has a garden. I live in it. ~ The house in ___ I live has a garden. ~ which ~ whom ~ where ~ that ~ Ngôi nhà tôi sống có vườn. ~ In which = where về nơi chốn.",
"He referred to a document. ~ The document to ___ he referred is confidential. ~ which ~ whom ~ that ~ where ~ Tài liệu anh ấy đề cập là tài liệu mật. ~ Refer to + which khi giới từ đi trước.",
"I borrowed a tool. I worked with it. ~ The tool with ___ I worked is broken. ~ which ~ whom ~ that ~ where ~ Công cụ tôi dùng đã hỏng. ~ With which theo sau danh từ vật.",
"We spoke to a lawyer. ~ The lawyer to ___ we spoke gave advice. ~ whom ~ who ~ that ~ where ~ Luật sư mà chúng tôi nói chuyện cùng đã cho lời khuyên. ~ To whom trang trọng sau giới từ.",
"The shelf holds books. They stand on it. ~ The shelf on ___ the books stand is wooden. ~ which ~ whom ~ that ~ who ~ Chiếc kệ sách đứng trên đó làm bằng gỗ. ~ On which chỉ nơi với giới từ cụ thể.",
"The company is one I work for. ~ The company for ___ I work is growing. ~ which ~ whom ~ that ~ where ~ Công ty tôi làm việc đang phát triển. ~ For which nói về tổ chức như một đơn vị, sau giới từ.",
"The person sits next to me. ~ The person next to ___ I sit is friendly. ~ whom ~ who ~ that ~ which ~ Người ngồi cạnh tôi rất thân thiện. ~ Next to whom là cụm giới từ với người."
]),
L("quantifiers","All/some/many of whom/which",
"Mẫu lượng từ + of whom/which bổ sung thông tin về một tập hợp người hoặc vật, thường trong mệnh đề không xác định.",
"N, some/many/all of whom/which + V…\nN, one of whom/which + V…",
"Dùng whom cho người, which cho vật; giữ dấu phẩy và chú ý số ít/số nhiều ở chủ ngữ lượng từ.",
"Không dùng that ngay sau of trong mẫu quan hệ bổ sung.",
["dùng which khi tiền ngữ là người","dùng whom khi tiền ngữ là vật","dùng that trong cấu trúc sau giới từ"],
[
"Ten students joined; three won prizes. ~ Ten students joined, three of ___ won prizes. ~ whom ~ which ~ that ~ where ~ Mười học sinh tham gia, trong đó ba em đoạt giải. ~ Of whom với tiền ngữ chỉ người.",
"I bought five books; two are novels. ~ I bought five books, two of ___ are novels. ~ which ~ whom ~ that ~ who ~ Tôi mua năm cuốn sách, trong đó hai cuốn là tiểu thuyết. ~ Of which với tiền ngữ là vật.",
"Several guests arrived; some were late. ~ Several guests arrived, some of ___ were late. ~ whom ~ which ~ that ~ where ~ Một số khách đến, trong đó có người đến muộn. ~ Some of whom nói về người.",
"The folders are missing; all contained records. ~ The folders, all of ___ contained records, are missing. ~ which ~ whom ~ that ~ who ~ Các thư mục đều có tài liệu hiện bị thất lạc. ~ All of which cho vật.",
"Five applicants applied; one withdrew. ~ Five applicants applied, one of ___ withdrew. ~ whom ~ which ~ that ~ where ~ Năm ứng viên nộp đơn, một người rút lui. ~ One of whom chỉ một người trong nhóm.",
"Three bridges were built; two need repairs. ~ Three bridges were built, two of ___ need repairs. ~ which ~ whom ~ that ~ where ~ Ba cây cầu được xây, hai cây cần sửa. ~ Two of which chỉ vật.",
"The teachers attended; many stayed. ~ The teachers attended, many of ___ stayed late. ~ whom ~ which ~ that ~ whose ~ Các giáo viên tham dự, nhiều người ở lại muộn. ~ Many of whom sau danh từ người.",
"She has four dogs; one is old. ~ She has four dogs, one of ___ is old. ~ which ~ whom ~ that ~ where ~ Cô ấy có bốn con chó, một con đã già. ~ One of which thay cho nhóm vật/con vật.",
"The scientists met; all agreed. ~ The scientists, all of ___ agreed, left later. ~ whom ~ which ~ that ~ when ~ Các nhà khoa học đều nhất trí rồi sau đó rời đi. ~ All of whom nhắc đến người.",
"The proposals were submitted; some were rejected. ~ The proposals, some of ___ were rejected, will be reviewed. ~ which ~ whom ~ that ~ where ~ Các đề xuất, một số bị từ chối, sẽ được xem xét lại. ~ Some of which với proposals."
]),
L("reduction","Rút gọn mệnh đề quan hệ và which chỉ cả mệnh đề",
"Mệnh đề quan hệ chủ động/bị động có thể rút thành V-ing/V3; which còn có thể bổ sung ý cho toàn bộ mệnh đề trước.",
"N + V-ing… (chủ động)\nN + V3… (bị động)\nMệnh đề, which + V… (nhận xét cả mệnh đề)",
"Chỉ rút khi quan hệ chủ ngữ và thời gian cho phép; chọn V-ing cho hành động chủ động, V3 cho bị động.",
"Không rút mệnh đề tân ngữ một cách máy móc và không dùng that thay which để chỉ cả mệnh đề có dấu phẩy.",
["dùng dạng bị động khi chủ ngữ làm hành động","dùng dạng chủ động khi danh từ chịu tác động","làm mất cấu trúc mệnh đề quan hệ hoặc nghĩa"],
[
"The woman who is waiting outside is my aunt. ~ The woman ___ outside is my aunt. ~ waiting ~ waited ~ waits ~ to wait ~ Người phụ nữ đang đợi bên ngoài là dì tôi. ~ Rút who is waiting thành waiting.",
"The report which was published yesterday is online. ~ The report ___ yesterday is online. ~ published ~ publishing ~ publishes ~ to publish ~ Báo cáo được xuất bản hôm qua đã lên mạng. ~ Bị động rút thành V3 published.",
"Students who live nearby can walk. ~ Students ___ nearby can walk to school. ~ living ~ lived ~ lives ~ to live ~ Học sinh sống gần có thể đi bộ đến trường. ~ Rút mệnh đề chủ động thành living.",
"The files which were deleted cannot be recovered. ~ The files ___ accidentally cannot be recovered. ~ deleted ~ deleting ~ deletes ~ to delete ~ Những tệp bị xóa nhầm không thể khôi phục. ~ Bị động: deleted.",
"The boy who is playing chess is my brother. ~ The boy ___ chess is my brother. ~ playing ~ played ~ plays ~ to play ~ Cậu bé đang chơi cờ là em trai tôi. ~ Chủ động tiếp diễn: playing.",
"The parcels which were delivered this morning are here. ~ The parcels ___ this morning are here. ~ delivered ~ delivering ~ delivers ~ to deliver ~ Những bưu kiện được giao sáng nay đã tới. ~ Phân từ quá khứ mang nghĩa bị động.",
"People who work at night need sufficient rest. ~ People ___ at night need sufficient rest. ~ working ~ worked ~ works ~ to work ~ Người làm ban đêm cần nghỉ ngơi đủ. ~ Chủ động rút thành working.",
"The houses which were damaged in the storm are empty. ~ The houses ___ in the storm are empty. ~ damaged ~ damaging ~ damages ~ to damage ~ Những ngôi nhà bị hỏng trong bão đang bỏ trống. ~ Damaged là V3 bị động.",
"The child who is sitting near the door is mine. ~ The child ___ near the door is my son. ~ sitting ~ sat ~ sits ~ to sit ~ Đứa trẻ ngồi gần cửa là con trai tôi. ~ Sitting thay who is sitting.",
"The data was lost, which upset everyone. ~ The data was lost, ___ upset the whole team. ~ which ~ that ~ who ~ where ~ Dữ liệu bị mất, điều này khiến cả nhóm buồn. ~ Which chỉ toàn bộ sự việc mất dữ liệu, không dùng that."
])
];
g.GrammarTopic22Data=g.GrammarTopicCompiler.build({
 number:22,title:"CHUYÊN ĐỀ 22. MỆNH ĐỀ QUAN HỆ – RELATIVE CLAUSES",lessons,
 writing:[
 ["Combine: The woman is my aunt. She lives upstairs.","The woman who lives upstairs is my aunt.",["who là chủ ngữ người","không lặp she"]],
 ["Combine with whose: I met a student. Her project won.","I met a student whose project won.",["whose + noun","giữ sở hữu"]],
 ["Combine as non-defining: My father is a doctor. He lives in Hanoi.","My father, who lives in Hanoi, is a doctor.",["dấu phẩy","không dùng that"]],
 ["Reduce: The books which were printed last year are sold out.","The books printed last year are sold out.",["V3 bị động","không bỏ nghĩa thời gian"]]
 ]});
const relative=g.GrammarTopic22Data;
relative.sections.find(s=>s.id==="object").extras.push({title:"Khi nào lược đại từ quan hệ?",rule:"Chỉ thường lược khi đại từ là tân ngữ của mệnh đề quan hệ xác định, không lược chủ ngữ và không lược trong mệnh đề không xác định.",example:"The report (which) I read was useful. / The report which changed my mind was useful.",vi:"Báo cáo tôi đọc rất hữu ích. / Báo cáo khiến tôi đổi ý rất hữu ích."});
relative.sections.find(s=>s.id==="persons").extras.push({title:"Whose không chỉ dùng cho người",rule:"Whose cũng có thể thể hiện sở hữu hoặc mối liên hệ với vật/tổ chức; of which là lựa chọn trang trọng khác.",example:"A company whose products are reliable can earn trust.",vi:"Một công ty có sản phẩm đáng tin cậy có thể tạo dựng lòng tin."});
relative.sections.find(s=>s.id==="reduction").extras.push({title:"Không rút mọi mệnh đề quan hệ",rule:"Hãy kiểm tra chủ ngữ và quan hệ chủ động/bị động trước khi rút. Với mệnh đề không xác định, việc rút còn phụ thuộc cấu trúc và ý nghĩa; không máy móc bỏ which.",example:"The students waiting outside are nervous.",vi:"Những học sinh đang chờ bên ngoài cảm thấy lo lắng."});
})(window);