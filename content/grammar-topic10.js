/* Topic 10 — Tag Questions, eight original bilingual Grammar V1.1 lesson groups. */
(function(g){
"use strict";
const L=(id,title,meaning,form,core,steps,cases,pitfalls,rows)=>({
 id,title,meaning,form,core,clue:core,steps,cases,pitfalls,
 rows:rows.map(t=>{const x=t.split(" ~ ");if(x.length!==7)throw Error(id+" invalid row "+x.length);
 const [statement,yes,no,other,extra,vi,why]=x;return [statement+", "+no+"?",statement+", ___?",yes,no,other,extra,vi,why].join(" ~ ");})
});
const basic=["Xác định mệnh đề chính khẳng định hay phủ định (kể cả từ phủ định ngầm).","Chọn đúng be, trợ động từ, hoặc modal và dạng đối cực thông thường.","Thay chủ ngữ bằng đại từ tương ứng rồi đọc câu hỏi đuôi hoàn chỉnh."];
const lessons=[
L("be-present","Be ở hiện tại: is / are / am","Với mệnh đề dùng is/are, câu hỏi đuôi thường lặp lại be ở cực tính ngược và đổi chủ ngữ thành đại từ.","S + is/are …, isn't/aren't + pronoun?\nS + isn't/aren't …, is/are + pronoun?","Xác định be hiện tại, cực tính và chủ ngữ quy chiếu.",basic,
[["She is …","She is…, isn't she?","Be is khẳng định → isn't she."],["They are …","They are…, aren't they?","Be are khẳng định → aren't they."],["You are …","You are…, aren't you?","You đi với are, tag dùng aren't you."]],
[["Dùng đại từ phù hợp","My brother dùng he, this bag dùng it, the students dùng they.","Your sister is here, isn't she?","Chị bạn ở đây, đúng không?"],["Đổi cực tính thông thường","Mệnh đề khẳng định hỏi đuôi phủ định khi xin xác nhận.","It is cold, isn't it?","Trời lạnh, đúng không?"]],
[
"She is ready ~ isn't she ~ is she ~ aren't she ~ doesn't she ~ Cô ấy sẵn sàng, đúng không? ~ Is khẳng định nên isn't; she là đại từ của chủ ngữ.",
"They are students ~ aren't they ~ are they ~ isn't they ~ don't they ~ Họ là học sinh, đúng không? ~ Are khẳng định nên aren't they.",
"You are tired ~ aren't you ~ are you ~ isn't you ~ don't you ~ Bạn mệt, đúng không? ~ Are kết hợp you, tag aren't you.",
"The room is clean ~ isn't it ~ is it ~ aren't it ~ doesn't it ~ Căn phòng sạch, đúng không? ~ Room số ít thay it; is → isn't.",
"These books are useful ~ aren't they ~ are they ~ isn't they ~ don't they ~ Những sách này hữu ích, đúng không? ~ Books → they; are → aren't.",
"Mr Long is a teacher ~ isn't he ~ is he ~ aren't he ~ doesn't he ~ Ông Long là giáo viên, đúng không? ~ Chủ ngữ nam số ít dùng he; is → isn't.",
"My parents are at home ~ aren't they ~ are they ~ isn't they ~ didn't they ~ Bố mẹ tôi ở nhà, đúng không? ~ Parents số nhiều → they và aren't.",
"The weather is pleasant ~ isn't it ~ is it ~ aren't it ~ doesn't it ~ Thời tiết dễ chịu, đúng không? ~ Weather dùng it; is → isn't.",
"Those chairs are new ~ aren't they ~ are they ~ isn't they ~ didn't they ~ Những ghế đó mới, đúng không? ~ Chairs số nhiều cần they; are → aren't.",
"Her sister is a doctor ~ isn't she ~ is she ~ aren't she ~ doesn't she ~ Chị cô ấy là bác sĩ, đúng không? ~ Is → isn't, sister → she."
]),
L("be-past","Be ở quá khứ và mệnh đề phủ định","Was/were trong mệnh đề chính quyết định trợ động từ tag. Nếu mệnh đề chính đã phủ định với wasn't/weren't, tag thường khẳng định.","S was …, wasn't S?\nS weren't …, were S?","Nhận diện was/were và phủ định đã có trước khi quyết định cực tính.",basic,
[["Was …","He was…, wasn't he?","Was khẳng định → wasn't."],["Were …","They were…, weren't they?","Were khẳng định → weren't."],["Wasn't …","It wasn't…, was it?","Wasn't đã phủ định nên tag khẳng định."]],
[["Không đổi quá khứ thành hiện tại","The film was interesting đòi wasn't it, không phải isn't it.","The film was long, wasn't it?","Bộ phim dài, đúng không?"],["Phủ định ở mệnh đề chính","She wasn't there cần was she, không thêm phủ định hai lần.","She wasn't there, was she?","Cô ấy không ở đó, phải không?"]],
[
"He was late ~ wasn't he ~ was he ~ weren't he ~ isn't he ~ Anh ấy đến muộn, đúng không? ~ Was khẳng định, tag wasn't he.",
"They were happy ~ weren't they ~ were they ~ wasn't they ~ aren't they ~ Họ vui vẻ, đúng không? ~ Were khẳng định → weren't they.",
"The shop was closed ~ wasn't it ~ was it ~ weren't it ~ isn't it ~ Cửa hàng đã đóng, đúng không? ~ Was với shop → wasn't it.",
"She wasn't angry ~ was she ~ wasn't she ~ were she ~ did she ~ Cô ấy không giận, phải không? ~ Wasn't phủ định → was she.",
"We weren't alone ~ were we ~ weren't we ~ was we ~ did we ~ Chúng ta không ở một mình, phải không? ~ Weren't → were we.",
"The children were quiet ~ weren't they ~ were they ~ wasn't they ~ didn't they ~ Bọn trẻ đã yên lặng, đúng không? ~ Children → they; were → weren't.",
"Yesterday was Sunday ~ wasn't it ~ was it ~ weren't it ~ didn't it ~ Hôm qua là Chủ nhật, đúng không? ~ Yesterday/it số ít, was → wasn't.",
"The keys weren't on the table ~ were they ~ weren't they ~ was they ~ did they ~ Chìa khóa không ở trên bàn, phải không? ~ Weren't phủ định → were they.",
"The concert was excellent ~ wasn't it ~ was it ~ weren't it ~ isn't it ~ Buổi hòa nhạc rất hay, đúng không? ~ Was → wasn't it.",
"Your friends weren't ready ~ were they ~ weren't they ~ was they ~ do they ~ Bạn bạn chưa sẵn sàng, phải không? ~ Weren't phủ định → were they."
]),
L("simple-present","Hiện tại đơn: do / does","Khi mệnh đề chính ở hiện tại đơn với động từ thường và không có trợ động từ, tag dùng do/does. Chọn does cho ngôi ba số ít, do cho các ngôi còn lại.","He plays…, doesn't he?\nThey work…, don't they?\nShe doesn't sing…, does she?","Động từ thường hiện tại đơn không có be/modal, nên thêm do/does trong tag.",basic,
[["He works","He works…, doesn't he?","Ngôi ba số ít dùng doesn't."],["They play","They play…, don't they?","Chủ ngữ số nhiều dùng don't."],["She doesn't","She doesn't…, does she?","Đã phủ định bằng doesn't nên tag does she."]],
[["Does không đi với they","Hòa hợp theo đại từ tag, không theo tên người/vật gần nhất.","The boys play, don't they?","Các cậu bé chơi, đúng không?"],["Have là động từ sở hữu","Với has/have mang nghĩa sở hữu trong một số cách dùng, do/does có thể là lựa chọn tag phổ biến.","She has a car, doesn't she?","Cô ấy có ô tô, đúng không?"]],
[
"She speaks French ~ doesn't she ~ does she ~ don't she ~ isn't she ~ Cô ấy nói tiếng Pháp, đúng không? ~ Speaks hiện tại ngôi ba số ít → doesn't she.",
"They play football ~ don't they ~ do they ~ doesn't they ~ aren't they ~ Họ chơi bóng đá, đúng không? ~ Play hiện tại số nhiều → don't they.",
"He studies hard ~ doesn't he ~ does he ~ don't he ~ isn't he ~ Anh ấy học chăm, đúng không? ~ Studies → doesn't he.",
"You like tea ~ don't you ~ do you ~ doesn't you ~ aren't you ~ Bạn thích trà, đúng không? ~ Like hiện tại với you → don't you.",
"Mai lives nearby ~ doesn't she ~ does she ~ don't she ~ isn't she ~ Mai sống gần đây, đúng không? ~ Lives → doesn't she.",
"The dogs bark loudly ~ don't they ~ do they ~ doesn't they ~ aren't they ~ Những con chó sủa to, đúng không? ~ Dogs số nhiều → don't they.",
"Lan doesn't drive ~ does she ~ doesn't she ~ do she ~ is she ~ Lan không lái xe, phải không? ~ Doesn't phủ định → does she.",
"We don't agree ~ do we ~ don't we ~ does we ~ are we ~ Chúng tôi không đồng ý, phải không? ~ Don't phủ định → do we.",
"His father works here ~ doesn't he ~ does he ~ don't he ~ isn't he ~ Bố anh ấy làm việc ở đây, đúng không? ~ Father số ít → doesn't he.",
"These children learn quickly ~ don't they ~ do they ~ doesn't they ~ aren't they ~ Trẻ em này học nhanh, đúng không? ~ Children số nhiều → don't they."
]),
L("simple-past","Quá khứ đơn: did","Với động từ thường ở quá khứ đơn, tag dùng did/didn't bất kể chủ ngữ số ít hay số nhiều. Nếu mệnh đề chính didn't, tag dùng did.","S + V2…, didn't + pronoun?\nS + didn't + V…, did + pronoun?","Không dùng dạng quá khứ của động từ chính trong tag; dùng did/didn't.",basic,
[["Past positive","He arrived…, didn't he?","Arrived quá khứ → didn't."],["Past plural","They left…, didn't they?","Left bất quy tắc nhưng tag vẫn didn't."],["Past negative","She didn't go…, did she?","Didn't phủ định → did she."]],
[["Did không thay bằng do/does","Mốc yesterday/last week cùng V2 buộc dùng did trong câu hỏi đuôi.","He called, didn't he?","Anh ấy gọi rồi, đúng không?"],["Không lặp động từ chính","Tag luôn gồm trợ động từ và đại từ, không lặp lại went/wrote.","They went home, didn't they?","Họ về nhà rồi, đúng không?"]],
[
"He arrived early ~ didn't he ~ did he ~ doesn't he ~ wasn't he ~ Anh ấy đến sớm, đúng không? ~ Arrived quá khứ → didn't he.",
"They left yesterday ~ didn't they ~ did they ~ don't they ~ weren't they ~ Họ rời đi hôm qua, đúng không? ~ Left là quá khứ → didn't they.",
"She didn't call ~ did she ~ didn't she ~ does she ~ was she ~ Cô ấy không gọi, phải không? ~ Didn't phủ định → did she.",
"We visited Hue last year ~ didn't we ~ did we ~ don't we ~ weren't we ~ Chúng tôi thăm Huế năm ngoái, đúng không? ~ Visited → didn't we.",
"Mai bought a book ~ didn't she ~ did she ~ doesn't she ~ wasn't she ~ Mai mua sách, đúng không? ~ Bought là V2, tag didn't she.",
"The boys played outside ~ didn't they ~ did they ~ don't they ~ weren't they ~ Các cậu bé đã chơi ngoài trời, đúng không? ~ Played → didn't they.",
"You didn't forget ~ did you ~ didn't you ~ do you ~ were you ~ Bạn không quên, phải không? ~ Didn't → did you.",
"He wrote the letter ~ didn't he ~ did he ~ doesn't he ~ wasn't he ~ Anh ấy viết thư rồi, đúng không? ~ Wrote quá khứ → didn't he.",
"They didn't answer ~ did they ~ didn't they ~ do they ~ were they ~ Họ đã không trả lời, phải không? ~ Didn't phủ định → did they.",
"My sister cooked dinner ~ didn't she ~ did she ~ doesn't she ~ wasn't she ~ Chị tôi nấu bữa tối rồi, đúng không? ~ Cooked → didn't she."
]),
L("perfect-modals","Hiện tại hoàn thành, tương lai và modal","Nếu mệnh đề chính đã có have/has, will, can, should, would hoặc modal khác, tag thường dùng chính trợ động từ/modal ấy (đổi cực tính).","S has V3…, hasn't S?\nS will V…, won't S?\nS can V…, can't S?","Không đưa do/does/did vào tag khi mệnh đề chính đã có trợ động từ/modal rõ ràng.",basic,
[["Have + V3","They have arrived…, haven't they?","Tag lặp have."],["Will + V","She will leave…, won't she?","Tag lặp will."],["Can + V","He can swim…, can't he?","Tag lặp can."]],
[["Have trong hiện tại hoàn thành khác have sở hữu","They have finished → haven't they; she has a car có các biến thể theo cách dùng.","They have finished, haven't they?","Họ xong rồi, đúng không?"],["Modal giữ nguyên trong tag","Should → shouldn't, would → wouldn't, can → can't.","We should leave, shouldn't we?","Chúng ta nên đi, đúng không?"]],
[
"She has finished the task ~ hasn't she ~ has she ~ doesn't she ~ isn't she ~ Cô ấy đã hoàn thành nhiệm vụ, đúng không? ~ Has + V3 → hasn't she.",
"They have arrived ~ haven't they ~ have they ~ don't they ~ aren't they ~ Họ đã đến, đúng không? ~ Have + V3 → haven't they.",
"He will call tomorrow ~ won't he ~ will he ~ doesn't he ~ didn't he ~ Anh ấy sẽ gọi ngày mai, đúng không? ~ Will → won't he.",
"You can swim ~ can't you ~ can you ~ don't you ~ aren't you ~ Bạn biết bơi, đúng không? ~ Can → can't you.",
"We should leave now ~ shouldn't we ~ should we ~ don't we ~ weren't we ~ Chúng ta nên đi ngay, đúng không? ~ Should → shouldn't we.",
"She would agree ~ wouldn't she ~ would she ~ doesn't she ~ isn't she ~ Cô ấy sẽ đồng ý, đúng không? ~ Would → wouldn't she.",
"They haven't finished ~ have they ~ haven't they ~ do they ~ are they ~ Họ chưa xong, phải không? ~ Haven't phủ định → have they.",
"He can't drive ~ can he ~ can't he ~ does he ~ is he ~ Anh ấy không thể lái xe, phải không? ~ Can't phủ định → can he.",
"She won't come ~ will she ~ won't she ~ does she ~ is she ~ Cô ấy sẽ không đến, phải không? ~ Won't phủ định → will she.",
"You have seen this film ~ haven't you ~ have you ~ don't you ~ didn't you ~ Bạn đã xem bộ phim này, đúng không? ~ Have + V3 → haven't you."
]),
L("negative-words","Từ phủ định ngầm: never, nobody, hardly, few…","Never, hardly, seldom, nobody, nothing, few/little (nghĩa hầu như không) làm mệnh đề mang nghĩa phủ định, vì vậy tag xác nhận thường ở dạng khẳng định.","negative word + S + V…, auxiliary + pronoun?","Không chỉ tìm n't; xác định nghĩa phủ định của từ/cụm trong mệnh đề.",basic,
[["Never","She never lies, does she?","Never mang nghĩa phủ định."],["Hardly","He hardly speaks, does he?","Hardly = hầu như không."],["Nobody","Nobody came, did they?","Nobody phủ định; tag khẳng định, dùng they cho người."]],
[["Few khác a few","Few people came = rất ít, sắc thái phủ định; a few people came = có vài người, khẳng định.","Few people knew, did they?","Ít người biết, phải không?"],["Nothing/anything dùng it","Nothing happened, did it?; nobody thường dùng they.","Nothing happened, did it?","Không có gì xảy ra, phải không?"]],
[
"She never lies ~ does she ~ doesn't she ~ is she ~ did she ~ Cô ấy không bao giờ nói dối, phải không? ~ Never phủ định → does she.",
"He hardly speaks ~ does he ~ doesn't he ~ is he ~ did he ~ Anh ấy hầu như không nói, phải không? ~ Hardly phủ định → does he.",
"Nobody came ~ did they ~ didn't they ~ did he ~ were they ~ Không ai đến, phải không? ~ Nobody → tag dương did they.",
"Nothing happened ~ did it ~ didn't it ~ did they ~ was it ~ Không có gì xảy ra, phải không? ~ Nothing phủ định → did it.",
"They seldom travel ~ do they ~ don't they ~ are they ~ did they ~ Họ hiếm khi đi du lịch, phải không? ~ Seldom phủ định → do they.",
"Few students passed ~ did they ~ didn't they ~ did he ~ were they ~ Rất ít học sinh đỗ, phải không? ~ Few mang sắc thái phủ định → did they.",
"She rarely smiles ~ does she ~ doesn't she ~ is she ~ did she ~ Cô ấy hiếm khi cười, phải không? ~ Rarely phủ định → does she.",
"He scarcely eats breakfast ~ does he ~ doesn't he ~ is he ~ did he ~ Anh ấy hầu như không ăn sáng, phải không? ~ Scarcely phủ định → does he.",
"No one answered ~ did they ~ didn't they ~ did he ~ were they ~ Không ai trả lời, phải không? ~ No one phủ định → did they.",
"Little progress was made ~ was it ~ wasn't it ~ did it ~ were they ~ Hầu như không có tiến bộ nào, phải không? ~ Little mang nghĩa gần như không; progress số ít → was it."
]),
L("special","Các trường hợp đặc biệt: aren't I, shall we, will you","I am → aren't I trong tag phủ định chuẩn; Let's … → shall we; mệnh lệnh dùng will you phổ biến. There is → isn't there; this/that → it.","I am…, aren't I?\nLet's V…, shall we?\nImperative, will you?\nThere is…, isn't there?","Không lắp ghép máy móc; phải nhận diện cấu trúc mở đầu.",basic,
[["I am","I'm late, aren't I?","Dùng aren't I ở tag phủ định."],["Let's","Let's go, shall we?","Lời rủ Let's → shall we."],["Imperative","Open the door, will you?","Mệnh lệnh có thể kèm will you để làm mềm yêu cầu."]],
[["Mệnh lệnh có nhiều tag khả dụng","Will you là lựa chọn phổ biến, không thiết kế bài có can you và will you cùng cạnh tranh nếu thiếu ngữ cảnh.","Open the window, will you?","Làm ơn mở cửa sổ nhé."],["There làm chủ ngữ trong tag","There is …, isn't there?; không thay there bằng it.","There is a problem, isn't there?","Có vấn đề, đúng không?"]],
[
"I'm early ~ aren't I ~ am I ~ isn't I ~ don't I ~ Tôi đến sớm, đúng không? ~ I'm khẳng định → aren't I.",
"Let's start now ~ shall we ~ will we ~ shall you ~ don't we ~ Bắt đầu ngay nhé? ~ Let's → shall we.",
"Let's have lunch ~ shall we ~ will we ~ do we ~ aren't we ~ Chúng ta ăn trưa nhé? ~ Let's → shall we.",
"Close the door ~ will you ~ won't he ~ do they ~ shall we ~ Làm ơn đóng cửa nhé? ~ Mệnh lệnh dùng will you.",
"Don't be late ~ will you ~ will he ~ don't you ~ shall we ~ Đừng đến muộn nhé? ~ Mệnh lệnh phủ định dùng will you.",
"There is a problem ~ isn't there ~ isn't it ~ doesn't there ~ is it ~ Có một vấn đề, đúng không? ~ There is → isn't there.",
"There are two seats ~ aren't there ~ aren't they ~ isn't there ~ don't there ~ Có hai chỗ ngồi, đúng không? ~ There are → aren't there.",
"This is your book ~ isn't it ~ isn't this ~ doesn't it ~ is this ~ Đây là sách của bạn, đúng không? ~ This dùng it trong tag.",
"That was surprising ~ wasn't it ~ wasn't that ~ didn't it ~ isn't that ~ Điều đó thật bất ngờ, đúng không? ~ That → it; was → wasn't.",
"Everyone is ready ~ aren't they ~ isn't everyone ~ isn't he ~ are they ~ Mọi người đã sẵn sàng, đúng không? ~ Everyone thường dùng they trong tag hiện đại; are → aren't."
]),
L("advanced","Have to, used to, ought to và những trường hợp khác","Have to diễn tả nghĩa vụ với động từ thường (tag do/does); used to thường đi với did. Ought to có thể theo tag shouldn't hoặc oughtn't, nên đề chỉ chọn phương án không có đối thủ hợp lệ.","have to V…, don't/doesn't + pronoun?\nused to V…, didn't + pronoun?\nought to V…, shouldn't + pronoun?","Kiểm tra have là trợ động từ hay động từ chính của have to; nhận diện used to và ought to.",basic,
[["Have to","You have to go, don't you?","Have to nghĩa vụ dùng do trong tag."],["Used to","He used to live here, didn't he?","Used to thường đi với did trong tag."],["Ought to","We ought to leave, shouldn't we?","Shouldn't là cách hỏi đuôi thông dụng sau ought to."]],
[["Oughtn't cũng tồn tại","Với ought to, oughtn't we cũng có thể xuất hiện nhưng ít gặp; không cho làm nhiễu cạnh shouldn't we.","We ought to go, shouldn't we?","Chúng ta nên đi, đúng không?"],["Have got to không giống have to","You've got to go, haven't you? có have là trợ động từ; you have to go, don't you? dùng do.","You have to go, don't you?","Bạn phải đi, đúng không?"]],
[
"You have to leave ~ don't you ~ haven't you ~ doesn't you ~ aren't you ~ Bạn phải rời đi, đúng không? ~ Have to dùng trợ động từ do trong tag.",
"She has to study ~ doesn't she ~ hasn't she ~ don't she ~ isn't she ~ Cô ấy phải học, đúng không? ~ Has to ngôi ba số ít → doesn't she.",
"He used to live here ~ didn't he ~ usedn't he ~ doesn't he ~ wasn't he ~ Anh ấy từng sống ở đây, đúng không? ~ Used to thường dùng didn't trong tag.",
"They used to work together ~ didn't they ~ usedn't they ~ don't they ~ weren't they ~ Họ từng làm việc cùng nhau, đúng không? ~ Used to → didn't they.",
"We ought to leave ~ shouldn't we ~ don't we ~ aren't we ~ didn't we ~ Chúng ta nên rời đi, đúng không? ~ Ought to thường có tag shouldn't we; oughtn't we không nằm trong lựa chọn.",
"You needn't hurry ~ need you ~ don't you ~ needn't you ~ do you ~ Bạn không cần vội, phải không? ~ Needn't là modal phủ định, tag need you.",
"She doesn't have to pay ~ does she ~ doesn't she ~ has she ~ is she ~ Cô ấy không phải trả tiền, phải không? ~ Doesn't have to phủ định → does she.",
"They have to report daily ~ don't they ~ haven't they ~ doesn't they ~ aren't they ~ Họ phải báo cáo hằng ngày, đúng không? ~ Have to dùng do/does, không lặp have như hiện tại hoàn thành.",
"He should apologise ~ shouldn't he ~ doesn't he ~ is he ~ did he ~ Anh ấy nên xin lỗi, đúng không? ~ Should → shouldn't he.",
"We must finish now ~ mustn't we ~ don't we ~ are we ~ didn't we ~ Chúng ta phải hoàn thành ngay, đúng không? ~ Must diễn tả nghĩa vụ, tag thường mustn't we."
])
];
g.GrammarTopics9to11Factory.make(10,"CHUYÊN ĐỀ 10. CÂU HỎI ĐUÔI – TAG QUESTIONS",lessons,[
["Complete: She is ready, ___?","She is ready, isn't she?",["is/isn't","she"]],
["Complete: He works here, ___?","He works here, doesn't he?",["doesn't he"]],
["Complete: Let's begin, ___?","Let's begin, shall we?",["shall we"]],
["Complete: Nobody called, ___?","Nobody called, did they?",["negative word","did they"]]
]);
})(window);