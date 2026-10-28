/* Subject–Verb Agreement — Learn V1.1, curated lesson explanations.
 * Loaded after Topic 5 data and depth-v3. Changes Learn only; no quiz/storage mutations.
 * Rule → worked sentence → Vietnamese meaning → why; 3+7 originals untouched.
 */
(function(g){
"use strict";
const D=g.GrammarTopic5Data;
if(!D?.sections||D.sections.length!==8)throw Error("Topic 5 data must load before Learn V1.1");
const C=(name,formula,sentence,vi,why)=>({name,formula,sentence,vi,why});
const E=(title,rule,example,vi)=>({title,rule,example,vi});
const guide={
heads:{
 intro:"Động từ phải phù hợp với số và ngôi của chủ ngữ. Điều quan trọng không phải là từ đứng gần động từ nhất, mà là chủ ngữ thực sự đang nói đến ai hoặc điều gì.",
 cases:[
 C("Chủ ngữ số ít","S số ít + V số ít","The cat sleeps on the sofa.","Con mèo ngủ trên ghế sofa.","Cat là danh từ số ít; ở hiện tại đơn với ngôi ba số ít, sleep thêm -s."),
 C("Chủ ngữ số nhiều","S số nhiều + V số nhiều","The children play outside.","Những đứa trẻ chơi bên ngoài.","Children là danh từ số nhiều bất quy tắc, nên động từ thường giữ dạng nguyên mẫu play."),
 C("Danh từ không đếm được","S không đếm được + V số ít","The information is useful.","Thông tin này hữu ích.","Information không đếm được, vì vậy dùng is; không căn cứ vào ý nghĩa có nhiều mẩu thông tin.")],
 steps:["Tìm chủ ngữ chính của động từ cần chia.","Xác định chủ ngữ là số ít, số nhiều hay không đếm được.","Chọn dạng động từ tương ứng và đối chiếu thì của câu."],
 contrast:["The student works carefully.","The students work carefully.","Chỉ đổi student từ số ít sang số nhiều; vì thế works chuyển thành work."],
 pitfalls:[
 E("Đừng nhìn đuôi -s một cách máy móc","News, mathematics hoặc physics có -s nhưng khi mang nghĩa tin tức hay tên môn học, chúng dùng động từ số ít.","The news is surprising.","Tin tức rất bất ngờ."),
 E("Một số danh từ số nhiều bất quy tắc","Children, people, men, women không cần -s để biểu thị số nhiều.","The children are outside.","Những đứa trẻ đang ở ngoài.")
 ]
},
modifiers:{
 intro:"Một chủ ngữ có thể chứa nhiều danh từ, nhưng không phải danh từ nào cũng quyết định động từ. Với cụm of, in, on..., hãy xác định danh từ trung tâm trước khi chia.",
 cases:[
 C("Danh từ trung tâm số ít","N số ít + of + N số nhiều + V số ít","The list of candidates is on my desk.","Danh sách ứng viên nằm trên bàn tôi.","List mới là danh từ trung tâm; candidates chỉ cho biết danh sách gồm những ai."),
 C("Danh từ trung tâm số nhiều","N số nhiều + of + N số ít + V số nhiều","The results of the experiment are clear.","Kết quả thí nghiệm rất rõ ràng.","Results là trung tâm số nhiều; of the experiment không làm chủ ngữ chuyển sang số ít."),
 C("Cụm nơi chốn bổ nghĩa","N + in/on/with + cụm bổ nghĩa + V theo N","The pictures on the wall look old.","Những bức tranh trên tường trông có vẻ cũ.","The pictures là chủ ngữ số nhiều; on the wall chỉ vị trí, không quyết định dạng động từ.")],
 steps:["Tìm danh từ chính ở đầu cụm chủ ngữ.","Tạm bỏ phần bổ nghĩa mở đầu bằng of/in/on/with để kiểm tra số của danh từ chính.","Chia động từ theo danh từ chính; kiểm tra lại ý nghĩa toàn câu."],
 contrast:["The list of names is long.","The names on the list are long.","Câu đầu lấy list làm chủ ngữ số ít; câu sau lấy names làm chủ ngữ số nhiều, dù đều chứa hai danh từ ấy."],
 pitfalls:[
 E("Không chọn theo danh từ sát động từ","Trong the cost of tickets, tickets đứng gần động từ hơn nhưng cost mới là danh từ trung tâm.","The cost of the tickets is high.","Chi phí của các vé rất cao."),
 E("Đổi danh từ trung tâm thì động từ cũng đổi","Of không mặc nhiên làm động từ số ít; số của danh từ đứng trước mới quyết định.","The members of the team are ready.","Các thành viên trong đội đã sẵn sàng.")
 ]
},
indefinite:{
 intro:"Each, every và một số đại từ bất định hướng sự chú ý đến từng cá thể, nên thường đi với động từ số ít. Đặc biệt chú ý cụm of vì danh từ số nhiều nằm sau đó có thể gây nhầm.",
 cases:[
 C("Each / Every + danh từ số ít","Each / Every + N số ít + V số ít","Each student has a workbook.","Mỗi học sinh có một quyển bài tập.","Each student chỉ từng học sinh riêng lẻ; have đổi thành has."),
 C("Đại từ bất định số ít","Everyone / Nobody / Someone + V số ít","Everyone knows the rule.","Mọi người đều biết quy tắc.","Everyone có nghĩa nói đến nhiều người nhưng được xem là chủ ngữ số ít về mặt ngữ pháp."),
 C("Each / Either / Neither of","Each / Either / Neither of + N số nhiều + V số ít (trang trọng)","Each of the answers is correct.","Mỗi câu trả lời đều đúng.","Chính each, không phải answers, chi phối dạng số ít trong cách viết trang trọng này.")],
 steps:["Tìm từ đứng đầu chủ ngữ: each, every, everyone, nobody, either hay neither.","Kiểm tra phần sau of có chỉ là nhóm được nhắc đến hay không.","Ưu tiên động từ số ít cho các mẫu đã học, đồng thời xét ngữ cảnh và biến thể tiếng Anh."],
 contrast:["Every student is ready.","All students are ready.","Every student hướng đến từng người nên dùng is; all students là cụm số nhiều nên dùng are."],
 pitfalls:[
 E("Either/Neither of + danh từ số nhiều","Either/neither of thường kết hợp với số ít trong văn viết trang trọng; số nhiều vẫn xuất hiện trong lời nói, nên không kết luận tuyệt đối rằng mọi trường hợp are đều sai.","Neither of the proposals is convincing.","Không đề xuất nào thuyết phục."),
 E("Sau Does dùng nguyên mẫu","Trong câu hỏi, does đã mang dấu hiệu ngôi ba số ít nên động từ chính không thêm -s.","Does anybody know the answer?","Có ai biết đáp án không?")
 ]
},
coordination:{
 intro:"Khi chủ ngữ gồm hai thành phần nối với nhau, dạng động từ phụ thuộc vào từ nối và số của các thành phần đó. And thường ghép hai người/vật thành chủ ngữ số nhiều; với either…or và neither…nor, động từ thường hòa hợp với thành phần gần nó nhất.",
 cases:[
 C("Trường hợp A — And","A and B + V số nhiều","Mai and Lan are ready.","Mai và Lan đã sẵn sàng.","Mai và Lan là hai người riêng biệt nên dùng are, không phải is."),
 C("Trường hợp B — Either…or","Either A or B + V theo B","Either the teacher or the students are responsible.","Hoặc giáo viên hoặc các học sinh phải chịu trách nhiệm.","Students nằm gần động từ nhất và là số nhiều, nên chọn are."),
 C("Trường hợp C — Neither…nor","Neither A nor B + V theo B","Neither the students nor the teacher is ready.","Cả các học sinh lẫn giáo viên đều chưa sẵn sàng.","Teacher đứng gần động từ hơn và là số ít, nên chọn is.")],
 steps:["Tìm từ nối: and, either…or hay neither…nor?","Xác định chủ ngữ chi phối: hai đối tượng riêng biệt với and, hay thành phần gần động từ nhất với or/nor?","Kiểm tra số và ngôi của chủ ngữ chi phối để chọn động từ số ít hoặc số nhiều."],
 contrast:["Either the teacher or the students are responsible.","Either the students or the teacher is responsible.","Chỉ đổi vị trí teacher và students. Thành phần đứng gần động từ chuyển từ số nhiều sang số ít nên are chuyển thành is."],
 pitfalls:[
 E("And không phải lúc nào cũng tạo chủ ngữ số nhiều","Khi hai danh từ chỉ một món ăn hoặc một đơn vị ý nghĩa, người nói có thể xem đó là một chủ ngữ số ít.","Bread and butter is my usual breakfast.","Bánh mì phết bơ là bữa sáng thường ngày của tôi."),
 E("Not only…but also cũng có hòa hợp gần nhất","Nếu not only…but also nối hai thành phần chủ ngữ, động từ thường theo thành phần gần nhất; đừng nhầm với Not only đứng đầu một mệnh đề và gây đảo ngữ.","Not only the teacher but also the students are present.","Không chỉ giáo viên mà cả học sinh đều có mặt."),
 E("Hai thành phần khác số hoặc ngôi","Either…or và neither…nor có thể tạo câu gượng khi hai thành phần có số/ngôi khác nhau; trong văn viết, nên sắp xếp hoặc viết lại cho rõ nghĩa.","Either the teacher or the students are responsible.","Hoặc giáo viên hoặc các học sinh phải chịu trách nhiệm.")
 ]
},
amounts:{
 intro:"Những từ nhìn giống số nhiều không phải lúc nào cũng cần động từ số nhiều. Hãy xem người nói đang coi một khoản tiền, khoảng thời gian hay quãng đường là một tổng thể hay đang nói đến từng đơn vị riêng.",
 cases:[
 C("Một khoản tiền như một tổng","Amount of money as one total + V số ít","Ten dollars is enough for lunch.","Mười đô la là đủ cho bữa trưa.","Ten dollars biểu thị một số tiền thống nhất; câu nhận xét cả khoản tiền ấy là đủ."),
 C("Thời gian/khoảng cách như một tổng","Time / distance as one amount + V số ít","Three hours is a long time to wait.","Ba tiếng là khoảng thời gian chờ rất lâu.","Three hours được xem như một khoảng thời gian duy nhất."),
 C("Môn học và news","Mathematics / Physics / News + V số ít","Mathematics is challenging.","Toán học khá thử thách.","Mathematics là tên môn học; đuôi -s không khiến nó thành chủ ngữ số nhiều.")],
 steps:["Xác định chủ ngữ là một lượng đo, tên môn học, hay một tập hợp nhiều phần riêng.","Xem câu đang đánh giá toàn bộ số lượng như một đơn vị hay từng phần độc lập.","Chọn động từ theo cách hiểu thực tế của cụm chủ ngữ và thì trong câu."],
 contrast:["Ten dollars is enough for the ticket.","The ten one-dollar coins are on the table.","Câu đầu nói về tổng giá trị 10 đô la nên dùng is; câu sau nói đến mười đồng xu riêng biệt nên dùng are."],
 pitfalls:[
 E("Một lượng đo có thể được hiểu theo nhiều cách","Quy tắc số ít mạnh nhất khi nói về một tổng số tiền, thời gian hoặc khoảng cách. Nếu thực sự nói đến nhiều vật riêng biệt, động từ số nhiều có thể phù hợp.","The coins are scattered across the floor.","Các đồng xu nằm rải rác trên sàn."),
 E("Tên môn học không phải danh từ số nhiều thông thường","Mathematics, physics, economics (khi nói về lĩnh vực học) thường dùng số ít; news cũng dùng số ít.","The news is unexpected.","Tin tức thật bất ngờ.")
 ]
},
collectives:{
 intro:"Team, family, committee có thể chỉ cả tập thể như một đơn vị hoặc các thành viên trong tập thể. Khi gặp members, chính members mới là chủ ngữ số nhiều; với every member, từ trung tâm member lại là số ít.",
 cases:[
 C("Tập thể như một đơn vị","A team / family / committee + V số ít (khi là một đơn vị)","The team is ready.","Cả đội đã sẵn sàng.","Team được hiểu như một tập thể thống nhất; cách dùng số ít phổ biến trong tiếng Anh-Mỹ."),
 C("Nhấn mạnh các thành viên","Team / committee / family members + V số nhiều","The team members are arriving separately.","Các thành viên đội đang đến riêng lẻ.","Members là trung tâm số nhiều, không phải team."),
 C("Every member","Every member of + N + V số ít","Every member of the team is present.","Mỗi thành viên của đội đều có mặt.","Every member nói về từng thành viên nên dùng is, dù team có nhiều người.")],
 steps:["Tìm danh từ trung tâm: team, members hay member?","Nếu là một danh từ tập hợp, xem câu nhấn mạnh cả đơn vị hay từng thành viên.","Chọn dạng động từ phù hợp với danh từ trung tâm, rồi kiểm tra biến thể Anh-Anh/Anh-Mỹ khi cần."],
 contrast:["The team is ready.","The team members are ready.","Câu đầu xem đội như một đơn vị nên dùng is; câu sau chủ ngữ là members số nhiều nên dùng are."],
 pitfalls:[
 E("Biến thể Anh–Anh và Anh–Mỹ","Trong tiếng Anh-Anh, team/committee/family đôi khi dùng số nhiều để nhấn mạnh từng thành viên; tiếng Anh-Mỹ thường ưu tiên số ít khi nói về tập thể. Không tạo bài trắc nghiệm chỉ có một đáp án nếu cả hai biến thể đều hợp lý.","The committee is meeting. / The committee are arguing among themselves.","Ủy ban đang họp. / Các thành viên ủy ban đang tranh luận với nhau."),
 E("A group of students","Group là danh từ trung tâm số ít khi xét cả nhóm như một đơn vị; riêng các cách dùng danh từ tập hợp có thể phụ thuộc biến thể hoặc ý nghĩa.","A group of students is waiting outside.","Một nhóm học sinh đang đợi bên ngoài.")
 ]
},
fractions:{
 intro:"A number of và the number of chỉ khác một mạo từ nhưng ý nghĩa và cách hòa hợp rất khác. Với phần trăm và phân số, cần xem danh từ sau of thuộc số nhiều hay không đếm được.",
 cases:[
 C("A number of","A number of + N số nhiều + V số nhiều","A number of students are absent.","Một số học sinh vắng mặt.","A number of nghĩa là 'một số'; nói đến nhiều học sinh nên dùng are."),
 C("The number of","The number of + N số nhiều + V số ít","The number of students is increasing.","Số lượng học sinh đang tăng.","The number là danh từ trung tâm số ít; students chỉ bổ nghĩa sau of."),
 C("Phần trăm và phân số","% / fraction + of + N → V theo N","Half of the cookies are gone.","Một nửa số bánh quy đã hết.","Cookies là danh từ số nhiều. So sánh Half of the cake is gone với cake số ít.")],
 steps:["Nhận diện a number of, the number of hay cụm phần trăm/phân số.","Nếu là the number of, xác định number là trung tâm; nếu là a number of, hiểu nghĩa 'một số'.","Nếu là phần trăm/phân số, xét danh từ được đo sau of rồi chọn số của động từ."],
 contrast:["A number of students are absent.","The number of students is increasing.","A number of nêu nhiều học sinh, dùng are. The number of nói về một con số, dùng is."],
 pitfalls:[
 E("Half of + danh từ không đếm được","Động từ phụ thuộc vào phần được nói đến: water không đếm được đi với is, nhưng students số nhiều đi với are.","Half of the water is clean.","Một nửa lượng nước là sạch."),
 E("Đừng chọn động từ theo students khi có the number","Students chỉ đứng trong cụm of students; chủ ngữ trung tâm the number là số ít.","The number of applications has risen.","Số lượng đơn đăng ký đã tăng.")
 ]
},
existential:{
 intro:"Trong There is/are, there chỉ giúp giới thiệu sự tồn tại, không phải chủ ngữ thực để chia động từ. Hãy nhìn danh ngữ đứng sau is/are; những từ như scissors và trousers lại có đặc điểm số nhiều riêng.",
 cases:[
 C("There + chủ ngữ số ít","There is + N số ít / N không đếm được","There is a letter on the desk.","Có một lá thư trên bàn.","A letter là chủ ngữ thực số ít, nên chọn is."),
 C("There + chủ ngữ số nhiều","There are + N số nhiều","There are two books on the shelf.","Có hai cuốn sách trên kệ.","Two books là cụm số nhiều, nên chọn are."),
 C("Scissors và a pair of","Scissors + V số nhiều; a pair of scissors + V số ít","A pair of scissors is on the shelf.","Có một chiếc kéo trên kệ.","Danh từ trung tâm là a pair số ít; nếu chỉ dùng scissors thì thường kết hợp are.")],
 steps:["Nếu thấy There is/are, đọc tiếp danh ngữ theo sau thay vì coi there là chủ ngữ.","Xác định danh ngữ ấy là số ít, số nhiều, không đếm được hay a pair of.","Chọn be đúng số và thì; kiểm tra ngoại lệ với scissors, trousers, glasses."],
 contrast:["The scissors are sharp.","A pair of scissors is on the shelf.","Scissors đứng một mình dùng động từ số nhiều; khi có a pair of, danh từ trung tâm pair là số ít."],
 pitfalls:[
 E("There’s + danh từ số nhiều trong hội thoại","Trong lời nói có thể gặp there’s + số nhiều, nhưng văn viết chuẩn nên dùng there are khi danh ngữ theo sau là số nhiều.","There are two options.","Có hai phương án."),
 E("Here không giống there giả chủ ngữ","Trong Here are your keys, here là trạng ngữ nơi chốn; keys vẫn là chủ ngữ. Không áp dụng máy móc mọi quy tắc về there cho here.","Here are your keys.","Chìa khóa của bạn đây.")
 ]
}
};
for(const s of D.sections){
 const spec=guide[s.id];if(!spec||spec.cases.length!==3||spec.steps.length!==3||spec.contrast.length!==3)throw Error("Invalid V1.1 spec: "+s.id);
 for(const c of spec.cases)if(!c.sentence||!c.vi||!c.why||!c.formula)throw Error("Incomplete case "+s.id);
 for(const p of spec.pitfalls)if(!p.rule||!p.vi||!p.example)throw Error("Incomplete pitfall "+s.id);
 s.learnV11=spec;
}
g.GrammarTopic5LearnV11Applied=D.sections.length;
})(window);