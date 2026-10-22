/* Topic 5 — Subject and Verb Agreement. Original Vietnamese/English teaching set. */
(function(g){
"use strict";
const L=(id,title,meaning,form,core,mistake,faults,rows,extras=[])=>({
 id,title,meaning,form,core,mistake,faults,extras,outcome:"Xác định chủ ngữ và chọn đúng động từ trong "+title.toLowerCase()+".",
 entries:rows.map(s=>{const v=s.split(" ~ ").map(x=>x.trim());if(v.length!==8)throw Error(id+" fields "+v.length);return v;})
});
const lessons=[
L("heads","Chủ ngữ số ít/số nhiều và động từ",
"Động từ hữu hạn phải hòa hợp với chủ ngữ về số và ngôi, không phải với danh từ đứng gần động từ nhất.",
"S số ít + V số ít (he works / it is)\nS số nhiều + V số nhiều (they work / they are)",
"Xác định danh từ trung tâm của chủ ngữ rồi kiểm tra dạng động từ và thời của câu.",
"Không dựa vào đuôi -s của mọi danh từ; information và furniture không đếm được.",
["động từ dạng số nhiều không đi với chủ ngữ trung tâm số ít","động từ dạng số ít không hòa hợp với chủ ngữ số nhiều","không phù hợp với thì hoặc hình thức động từ cần dùng"],
[
"The cat sleep on the sofa. ~ The cat ___ on the sofa every afternoon. ~ sleeps ~ sleep ~ sleeping ~ have slept ~ Con mèo ngủ trên ghế sofa mỗi chiều. ~ The cat là chủ ngữ số ít, hiện tại đơn dùng sleeps.",
"The children plays outside. ~ The children ___ outside after class. ~ play ~ plays ~ playing ~ has played ~ Lũ trẻ chơi bên ngoài sau giờ học. ~ Children là số nhiều bất quy tắc.",
"The information are useful. ~ The information ___ useful. ~ is ~ are ~ be ~ were ~ Thông tin này hữu ích. ~ Information không đếm được nên dùng is.",
"These books belongs to Mai. ~ These books ___ to Mai. ~ belong ~ belongs ~ belonging ~ is belong ~ Các cuốn sách này thuộc về Mai. ~ Books số nhiều dùng belong.",
"Every phone need charging. ~ Every phone ___ charging occasionally. ~ needs ~ need ~ needing ~ have needed ~ Mọi chiếc điện thoại đều cần sạc đôi khi. ~ Every + danh từ số ít, dùng needs.",
"The results shows progress. ~ The results ___ steady progress. ~ show ~ shows ~ showing ~ has shown ~ Những kết quả cho thấy tiến bộ đều đặn. ~ Results số nhiều dùng show.",
"That student speak clearly. ~ That student ___ clearly in class. ~ speaks ~ speak ~ speaking ~ have spoken ~ Học sinh đó phát biểu rõ ràng trong lớp. ~ That student số ít cần speaks.",
"Our teachers explains patiently. ~ Our teachers ___ concepts patiently. ~ explain ~ explains ~ explaining ~ is explaining ~ Giáo viên của chúng tôi giải thích khái niệm kiên nhẫn. ~ Teachers số nhiều cần explain.",
"The furniture are new. ~ The furniture ___ brand new. ~ is ~ are ~ be ~ were ~ Đồ nội thất hoàn toàn mới. ~ Furniture không đếm được, dùng is.",
"The woman have a car. ~ The woman ___ a small car. ~ has ~ have ~ having ~ are having ~ Người phụ nữ có một chiếc ô tô nhỏ. ~ Woman số ít có dạng has."
]),
L("modifiers","Danh từ xen giữa và cụm of",
"Cụm giới từ hoặc mệnh đề bổ nghĩa không thay đổi danh từ trung tâm chi phối động từ.",
"The + N trung tâm + of + N bổ nghĩa + V\nS, cùng các cụm chen giữa, + V theo S",
"Loại tạm cụm bổ nghĩa để tìm chủ ngữ thực: the list of names is, the names on the list are.",
"Không hòa hợp động từ với danh từ ở sau of chỉ vì nó đứng gần hơn.",
["hòa hợp nhầm với danh từ bổ nghĩa số nhiều","hòa hợp nhầm với danh từ bổ nghĩa số ít","dùng sai thì/ngữ pháp sau chủ ngữ trung tâm"],
[
"The list of names are long. ~ The list of candidates ___ on my desk. ~ is ~ are ~ be ~ were ~ Danh sách ứng viên nằm trên bàn tôi. ~ Danh từ trung tâm list số ít.",
"The results of the test is clear. ~ The results of the experiment ___ clear. ~ are ~ is ~ be ~ was ~ Kết quả thí nghiệm rõ ràng. ~ Results số nhiều, of the experiment không quyết định hòa hợp.",
"The cost of tickets are rising. ~ The cost of new tickets ___ increasing. ~ is ~ are ~ be ~ were ~ Giá vé mới đang tăng. ~ Cost số ít mới là chủ ngữ trung tâm.",
"The students in this class speaks English. ~ The students in this class ___ English well. ~ speak ~ speaks ~ speaking ~ has spoken ~ Học sinh lớp này nói tiếng Anh tốt. ~ Students số nhiều; in this class là cụm bổ nghĩa.",
"The quality of the products have improved. ~ The quality of these products ___ improved. ~ has ~ have ~ are ~ were ~ Chất lượng các sản phẩm này đã cải thiện. ~ Quality số ít nên hiện tại hoàn thành dùng has.",
"The pages of the book is torn. ~ The pages of this book ___ torn. ~ are ~ is ~ be ~ was ~ Các trang của cuốn sách này bị rách. ~ Pages là trung tâm số nhiều.",
"The owner of the shops are abroad. ~ The owner of these shops ___ abroad. ~ is ~ are ~ be ~ were ~ Chủ các cửa hàng này đang ở nước ngoài. ~ Owner số ít.",
"The pictures on the wall looks old. ~ The pictures on that wall ___ old. ~ look ~ looks ~ looking ~ has looked ~ Các bức tranh trên tường có vẻ cũ. ~ Pictures số nhiều, on that wall không thay đổi số.",
"The price of vegetables have fallen. ~ The price of vegetables ___ fallen. ~ has ~ have ~ is ~ were ~ Giá rau đã giảm. ~ Price số ít, hiện tại hoàn thành has fallen.",
"The members of the team works hard. ~ The members of the team ___ hard. ~ work ~ works ~ working ~ has worked ~ Các thành viên của đội làm việc chăm chỉ. ~ Members số nhiều, không phải team."
]),
L("indefinite","Each, every, everyone, either và neither",
"Each, every, everyone, anybody, nobody thường đi với động từ số ít; either/neither dùng số ít trong văn phong trang trọng.",
"Each / Every + N số ít + V số ít\nEveryone / Nobody + V số ít\nEither / Neither of + plural N + V số ít (trang trọng)",
"Chú ý phân biệt chủ ngữ tổng thể và danh từ số nhiều ở sau of.",
"Trong hội thoại, neither of ... are và either of ... are có thể gặp; không nên gọi mọi biến thể là sai tuyệt đối.",
["động từ số nhiều không hợp chủ ngữ bất định số ít trong dạng trang trọng","nhầm hình thức số nhiều của từ đứng sau of","không đúng cấu trúc hiện tại đơn"],
[
"Each student have a book. ~ Each student ___ a workbook. ~ has ~ have ~ having ~ are having ~ Mỗi học sinh có một quyển bài tập. ~ Each student làm chủ ngữ số ít.",
"Every room have a window. ~ Every room ___ a window. ~ has ~ have ~ having ~ are having ~ Mỗi phòng có một cửa sổ. ~ Every room số ít.",
"Everyone know the rule. ~ Everyone ___ the rule. ~ knows ~ know ~ knowing ~ have known ~ Mọi người đều biết quy tắc. ~ Everyone là đại từ bất định số ít.",
"Nobody want to be late. ~ Nobody ___ to be late. ~ wants ~ want ~ wanting ~ have wanted ~ Không ai muốn đến muộn. ~ Nobody số ít theo quy tắc.",
"Each of the answers are correct. ~ Each of the responses ___ correct. ~ is ~ are ~ be ~ were ~ Mỗi câu trả lời đều đúng. ~ Each of + plural noun đi với is theo chuẩn trang trọng.",
"Every student and teacher are invited. ~ Every student and every teacher ___ invited. ~ is ~ are ~ be ~ were ~ Mỗi học sinh và mỗi giáo viên đều được mời. ~ Every lặp trước các danh từ, động từ thường số ít.",
"Either option work for me. ~ Either option ___ for this task. ~ works ~ work ~ working ~ have worked ~ Phương án nào cũng phù hợp cho nhiệm vụ này. ~ Either option số ít.",
"Neither answer seem correct. ~ Neither answer ___ correct. ~ seems ~ seem ~ seeming ~ have seemed ~ Không câu trả lời nào có vẻ đúng. ~ Neither answer là số ít.",
"Someone have taken my bag. ~ Someone ___ taken my bag. ~ has ~ have ~ are ~ were ~ Ai đó đã lấy túi của tôi. ~ Someone số ít: has taken.",
"Anybody know what happened? ~ Does anybody ___ what happened? ~ know ~ knows ~ knowing ~ knew ~ Có ai biết chuyện gì đã xảy ra không? ~ Sau does dùng nguyên mẫu know."
]),
L("coordination","And, or, nor và hòa hợp gần nhất",
"Chủ ngữ nối bằng and thường số nhiều; với either…or/neither…nor, động từ thường hòa hợp thành phần gần nhất.",
"A and B + V số nhiều\nEither A or B + V theo B\nNeither A nor B + V theo B",
"Nhìn liên từ và chủ ngữ nằm gần động từ hơn. Nếu có hai số khác nhau, đôi khi nên viết lại để tránh câu gượng.",
"Bread and butter là cụm chỉ một món có thể dùng số ít; không áp dụng and = số nhiều máy móc.",
["không theo chủ ngữ kết hợp số nhiều","không hòa hợp thành phần gần nhất","dùng sai thì hoặc dạng động từ"],
[
"Mai and Lan is here. ~ Mai and Lan ___ in the library. ~ are ~ is ~ be ~ was ~ Mai và Lan đang ở thư viện. ~ Hai người nối and → số nhiều.",
"Tea and coffee is available. ~ Tea and coffee ___ available at the counter. ~ are ~ is ~ be ~ was ~ Trà và cà phê có sẵn ở quầy. ~ Hai đồ uống riêng biệt dùng are.",
"Either the teacher or students is responsible. ~ Either the teacher or the students ___ responsible. ~ are ~ is ~ be ~ was ~ Hoặc giáo viên hoặc học sinh chịu trách nhiệm. ~ Students gần động từ nhất, dùng are.",
"Either the students or the teacher are responsible. ~ Either the students or the teacher ___ responsible. ~ is ~ are ~ be ~ were ~ Hoặc học sinh hoặc giáo viên chịu trách nhiệm. ~ Teacher gần động từ nhất, dùng is.",
"Neither the parents nor the child are ready. ~ Neither the parents nor the child ___ ready. ~ is ~ are ~ be ~ were ~ Cả phụ huynh lẫn đứa trẻ đều chưa sẵn sàng. ~ Child là thành phần gần nhất số ít.",
"Neither the boy nor his sisters is here. ~ Neither the boy nor his sisters ___ here. ~ are ~ is ~ be ~ was ~ Cả cậu bé lẫn các chị em đều không ở đây. ~ Sisters là phần gần nhất số nhiều.",
"Both the doctor and nurse is coming. ~ Both the doctor and the nurse ___ coming. ~ are ~ is ~ be ~ was ~ Cả bác sĩ và y tá đều đang đến. ~ Both ... and kết hợp hai người dùng are.",
"Tom and his brother plays chess. ~ Tom and his brother ___ chess every evening. ~ play ~ plays ~ playing ~ has played ~ Tom và anh trai chơi cờ mỗi tối. ~ Chủ ngữ phối hợp số nhiều dùng play.",
"Not only the manager but also assistants is working. ~ Not only the manager but also the assistants ___ working. ~ are ~ is ~ be ~ was ~ Không chỉ quản lý mà cả trợ lý đang làm việc. ~ Assistants đứng sát động từ: are.",
"Either the books or this folder are missing. ~ Either the books or this folder ___ missing. ~ is ~ are ~ be ~ were ~ Hoặc những cuốn sách hoặc thư mục này bị thất lạc. ~ This folder số ít đứng gần động từ."
]),
L("amounts","Khoảng tiền, thời gian, khoảng cách và tên gọi",
"Các lượng đo được xem như một đơn vị thường dùng số ít; tên sách và tên môn học có hình thức số nhiều cũng có thể dùng số ít.",
"Khoản tiền/thời gian/khoảng cách như một đơn vị + V số ít\nTên tác phẩm/môn học + V số ít",
"Hãy xác định người nói xem con số là một tổng thể hay nhiều phần độc lập.",
"Nhiều từ có -s như news, mathematics không nhất thiết là chủ ngữ số nhiều.",
["coi một lượng đo thống nhất thành số nhiều","không nhận ra tên riêng/tên môn học như đơn vị số ít","sai dạng động từ hữu hạn"],
[
"Ten dollars are enough for lunch. ~ Ten dollars ___ enough for lunch. ~ is ~ are ~ be ~ were ~ Mười đô la là đủ cho bữa trưa. ~ Khoản tiền là một tổng.",
"Three hours are a long wait. ~ Three hours ___ a long time to wait. ~ is ~ are ~ be ~ were ~ Ba tiếng là thời gian chờ lâu. ~ Khoảng thời gian xét như một đơn vị.",
"Five kilometres are a long distance to walk. ~ Five kilometres ___ a long way to walk. ~ is ~ are ~ be ~ were ~ Năm kilômét là quãng đường dài để đi bộ. ~ Khoảng cách là một đơn vị.",
"Mathematics are challenging. ~ Mathematics ___ challenging for some learners. ~ is ~ are ~ be ~ were ~ Toán học gây khó cho một số người học. ~ Mathematics là tên môn học số ít.",
"The news are surprising. ~ The news ___ surprising. ~ is ~ are ~ be ~ were ~ Tin tức rất bất ngờ. ~ News mang dạng -s nhưng là danh từ không đếm được.",
"Physics are taught here. ~ Physics ___ taught at this school. ~ is ~ are ~ be ~ were ~ Vật lý được giảng dạy ở trường này. ~ Physics là tên môn học.",
"Twenty minutes are enough. ~ Twenty minutes ___ enough to prepare. ~ is ~ are ~ be ~ were ~ Hai mươi phút đủ để chuẩn bị. ~ Khoảng thời gian xem như một tổng.",
"One hundred dollars are the total fee. ~ One hundred dollars ___ the total fee. ~ is ~ are ~ be ~ were ~ Một trăm đô la là tổng phí. ~ Số tiền xét là một lượng thống nhất.",
"Economics are an important field. ~ Economics ___ an important field of study. ~ is ~ are ~ be ~ were ~ Kinh tế học là lĩnh vực học quan trọng. ~ Economics là tên ngành học khi xét như môn học.",
"Two months are not enough time. ~ Two months ___ not enough time to finish. ~ is ~ are ~ be ~ were ~ Hai tháng không đủ để hoàn thành. ~ Một khoảng thời gian tổng thể: is."
]),
L("collectives","Danh từ tập hợp và khác biệt văn phong",
"Family, team, committee có thể được xem là một tập thể (động từ số ít) hoặc các thành viên (có thể số nhiều trong một số biến thể Anh-Anh).",
"Group là một đơn vị: The team is…\nCác thành viên: The team members are…",
"Trong bài trắc nghiệm, dựa vào cách câu diễn đạt 'cả nhóm là một đơn vị' hay từng thành viên; khi cả hai cách đều hợp lý, không nên đặt chúng thành hai đáp án cạnh tranh.",
"Không mặc định family/team/committee luôn chỉ dùng số ít ở mọi biến thể tiếng Anh.",
["không hòa hợp khi chủ ngữ là một đơn vị số ít","không hòa hợp chủ ngữ members số nhiều","đặt sai dạng động từ so với ngữ cảnh"],
[
"The team members is arriving. ~ The team members ___ arriving separately. ~ are ~ is ~ be ~ was ~ Các thành viên đội đang đến riêng lẻ. ~ Members số nhiều rõ ràng dùng are.",
"The committee members decides individually. ~ The committee members ___ individually. ~ decide ~ decides ~ deciding ~ has decided ~ Các thành viên ủy ban quyết định riêng lẻ. ~ Members số nhiều dùng decide.",
"Her family members lives in different cities. ~ Her family members ___ in different cities. ~ live ~ lives ~ living ~ has lived ~ Người nhà cô ấy sống ở các thành phố khác nhau. ~ Members là số nhiều.",
"Every member of the team are present. ~ Every member of the team ___ present. ~ is ~ are ~ be ~ were ~ Mỗi thành viên đội đều có mặt. ~ Every member số ít, không phải team.",
"Every group of students are gathering as a unit. ~ Every group of students ___ forming outside the hall. ~ is ~ are ~ be ~ were ~ Mỗi nhóm học sinh đang tập hợp bên ngoài hội trường. ~ Every group buộc danh từ trung tâm ở số ít.",
"The two teams is competing. ~ The two teams ___ competing today. ~ are ~ is ~ be ~ was ~ Hai đội đang thi đấu hôm nay. ~ Teams là danh từ số nhiều rõ ràng.",
"Each family have its own room. ~ Each family ___ its own room. ~ has ~ have ~ having ~ are having ~ Mỗi gia đình có phòng riêng. ~ Each family số ít.",
"All committee members was invited. ~ All committee members ___ invited. ~ were ~ was ~ be ~ is ~ Tất cả thành viên ủy ban đã được mời. ~ Members số nhiều và bối cảnh quá khứ: were.",
"The audience members is clapping. ~ The audience members ___ clapping loudly. ~ are ~ is ~ be ~ was ~ Các khán giả đang vỗ tay lớn. ~ Audience members số nhiều.",
"The jury members has reached a decision. ~ The jury members ___ reached a decision. ~ have ~ has ~ is ~ was ~ Các thành viên bồi thẩm đoàn đã đưa ra quyết định. ~ Members số nhiều dùng have."
]),
L("fractions","A number of, the number of, phần trăm",
"A number of thường đi với danh từ số nhiều và động từ số nhiều; the number of là một con số nên dùng số ít. Phần trăm/phân số tùy danh từ sau of.",
"A number of + N số nhiều + V số nhiều\nThe number of + N số nhiều + V số ít\n% / fraction + of + N → V theo N",
"Cụm the number nhấn mạnh con số, trong khi a number of nghĩa 'một số'. Phân số đi với danh từ không đếm được thường số ít.",
"Không đánh đồng a number of và the number of chỉ vì đều có number.",
["nhầm a number of và the number of","không hòa hợp với danh từ sau of","dùng dạng động từ không phù hợp"],
[
"A number of students is absent. ~ A number of students ___ absent today. ~ are ~ is ~ be ~ was ~ Một số học sinh vắng mặt hôm nay. ~ A number of + N số nhiều → are.",
"The number of students are increasing. ~ The number of students ___ increasing. ~ is ~ are ~ be ~ were ~ Số lượng học sinh đang tăng. ~ The number là chủ ngữ số ít.",
"Half of the cake are gone. ~ Half of the cake ___ gone. ~ is ~ are ~ be ~ were ~ Một nửa chiếc bánh đã hết. ~ Cake số ít, half of + cake → is.",
"Half of the cookies is gone. ~ Half of the cookies ___ gone. ~ are ~ is ~ be ~ was ~ Một nửa số bánh quy đã hết. ~ Cookies số nhiều → are.",
"Most of the water are clean. ~ Most of the water ___ clean. ~ is ~ are ~ be ~ were ~ Phần lớn nước sạch. ~ Water không đếm được → is.",
"Most of the players is ready. ~ Most of the players ___ ready. ~ are ~ is ~ be ~ was ~ Đa số cầu thủ sẵn sàng. ~ Players số nhiều → are.",
"Thirty percent of the land are protected. ~ Thirty percent of the land ___ protected. ~ is ~ are ~ be ~ were ~ Ba mươi phần trăm diện tích đất được bảo vệ. ~ Land không đếm được → is.",
"Thirty percent of students is absent. ~ Thirty percent of the students ___ absent. ~ are ~ is ~ be ~ was ~ Ba mươi phần trăm học sinh vắng mặt. ~ Students số nhiều → are.",
"One third of the money are missing. ~ One third of the money ___ missing. ~ is ~ are ~ be ~ were ~ Một phần ba số tiền bị thất lạc. ~ Money không đếm được → is.",
"Two thirds of the votes was counted. ~ Two thirds of the votes ___ counted last night. ~ were ~ was ~ be ~ is ~ Hai phần ba phiếu bầu đã được kiểm. ~ Votes số nhiều và quá khứ: were."
]),
L("existential","There is/are, here và danh từ đặc biệt",
"Trong cấu trúc tồn tại there is/are, động từ phụ thuộc vào danh ngữ đứng sau; scissors, trousers thường số nhiều, a pair of là số ít.",
"There + is/are + chủ ngữ thật\nA pair of + N số nhiều + V số ít\nScissors / trousers + V số nhiều",
"Đừng xem there là chủ ngữ thực. Ở văn nói có there’s + plural, nhưng trong bài viết cẩn thận ưu tiên there are.",
"Không nhầm there chỉ nơi chốn với there giả chủ ngữ; news không giống trousers.",
["động từ không phù hợp danh từ thực sự đứng sau","coi vật số nhiều là một vật đếm được số ít","không phù hợp cấu trúc câu tồn tại"],
[
"There is two books on the shelf. ~ There ___ two books on the shelf. ~ are ~ is ~ be ~ was ~ Có hai cuốn sách trên kệ. ~ Books số nhiều → there are.",
"There are a letter on the desk. ~ There ___ a letter on the desk. ~ is ~ are ~ be ~ were ~ Có một lá thư trên bàn. ~ Letter số ít → there is.",
"These scissors is sharp. ~ These scissors ___ sharp. ~ are ~ is ~ be ~ was ~ Chiếc kéo này sắc. ~ Scissors là danh từ hình thức số nhiều.",
"My trousers is wet. ~ My trousers ___ wet. ~ are ~ is ~ be ~ was ~ Quần dài của tôi ướt. ~ Trousers luôn ở hình thức số nhiều khi không có a pair.",
"A pair of shoes are missing. ~ A pair of shoes ___ missing. ~ is ~ are ~ be ~ were ~ Một đôi giày bị thất lạc. ~ A pair là chủ ngữ trung tâm số ít.",
"There are a problem with the plan. ~ There ___ a problem with the plan. ~ is ~ are ~ be ~ were ~ Có một vấn đề với kế hoạch. ~ Problem số ít → there is.",
"There is several reasons to wait. ~ There ___ several reasons to wait. ~ are ~ is ~ be ~ was ~ Có vài lý do để chờ. ~ Reasons số nhiều → there are.",
"The glasses on the table is mine. ~ The glasses on the table ___ mine. ~ are ~ is ~ be ~ was ~ Cặp kính trên bàn là của tôi. ~ Glasses theo nghĩa kính đeo là số nhiều.",
"A pair of scissors are on the shelf. ~ A pair of scissors ___ on the shelf. ~ is ~ are ~ be ~ were ~ Một chiếc kéo ở trên kệ. ~ A pair of scissors có chủ ngữ pair số ít.",
"There are an error in the text. ~ There ___ an error in the text. ~ is ~ are ~ be ~ were ~ Có một lỗi trong văn bản. ~ Error số ít → there is."
])
];
g.GrammarTopic5Data=g.GrammarTopicCompiler.build({
 number:5,title:"CHUYÊN ĐỀ 5. SỰ HÒA HỢP GIỮA CHỦ NGỮ VÀ ĐỘNG TỪ – SUBJECT–VERB AGREEMENT",lessons,
 writing:[
 ["Correct: The list of names are on the desk.","The list of names is on the desk.",["Xác định list","số ít is"]],
 ["Correct: Neither the teachers nor the student are ready.","Neither the teachers nor the student is ready.",["Hòa hợp với student gần nhất","is số ít"]],
 ["Correct: The number of students are increasing.","The number of students is increasing.",["The number là trung tâm","is"]],
 ["Correct: There is several reasons to disagree.","There are several reasons to disagree.",["There không phải chủ ngữ thật","reasons số nhiều"]]
 ]});
const sva=g.GrammarTopic5Data;
sva.sections.find(s=>s.id==="collectives").extras.push({title:"Danh từ tập hợp: Anh-Anh và Anh-Mỹ",rule:"The committee is có thể nhấn mạnh ủy ban như một đơn vị; the committee are có thể chấp nhận trong tiếng Anh-Anh khi nhấn mạnh các thành viên. Tránh đề trắc nghiệm đặt hai lựa chọn này cạnh nhau nếu không có ngữ cảnh rõ.",example:"The team is ready. / The team members are ready.",vi:"Đội đã sẵn sàng. / Các thành viên đội đã sẵn sàng."});
sva.sections.find(s=>s.id==="indefinite").extras.push({title:"Either/Neither of + danh từ số nhiều",rule:"Động từ số ít thường được ưu tiên trong văn viết trang trọng; số nhiều cũng xuất hiện trong lời nói. Hãy xét biến thể và ngữ cảnh trước khi kết luận một câu sai.",example:"Neither of the proposals is convincing.",vi:"Không đề xuất nào thuyết phục."});
})(window);