/* Topic 11 — Comparison, full Grammar V1.1 + two-tier Vietnamese exercise rationales. */
(function(g){
"use strict";
const steps=["Xác định số đối tượng: hai đối tượng, cả nhóm hay mức độ bằng nhau.","Chọn dạng so sánh theo số âm tiết, kiểu tính từ và danh từ theo sau.","Kiểm tra than/as…as/the, mạo từ và phạm vi ý nghĩa của câu."];
const L=(id,title,meaning,form,clue,cases,pitfalls,rows)=>({
 id,title,meaning,form,core:clue,clue,steps,cases,pitfalls,
 rows:rows.map(v=>{const a=v.split(" ~ ");if(a.length!==7)throw Error("Invalid "+id+" row "+a.length);return [a[0].replace("___",a[2]),...a].join(" ~ ");})
});
const lessons=[
L("short-er","So sánh hơn với tính từ ngắn","Đối chiếu hai người/vật bằng tính từ ngắn thường dùng -er + than. Tính từ kết thúc -e thêm -r; CVC có thể gấp đôi phụ âm; -y đổi thành -ier.","S + be + adjective-er + than + N/pronoun","Thấy than và hai đối tượng; cần phân biệt tính từ ngắn và các biến đổi chính tả.",
[["Tall → taller","taller than","Tall một âm tiết thêm -er."],["Big → bigger","bigger than","Big dạng CVC gấp đôi g."],["Easy → easier","easier than","Easy đổi y thành i trước -er."]],
[["Không kết hợp more với -er","Taller là dạng so sánh hơn, không dùng more taller.","She is taller than me.","Cô ấy cao hơn tôi."],["Tính từ hai âm tiết có ngoại lệ","Một số từ như clever, narrow có thể dùng -er; không kết luận mọi tính từ hai âm tiết chỉ dùng more.","This road is narrower.","Con đường này hẹp hơn."]],
[
"Mai is ___ than Lan. ~ taller ~ more tall ~ tallest ~ tall ~ Mai cao hơn Lan. ~ Tall ngắn → taller than.",
"This suitcase is ___ than mine. ~ bigger ~ more big ~ biggest ~ big ~ Va-li này lớn hơn của tôi. ~ Big gấp đôi g + er.",
"The exam was ___ than expected. ~ easier ~ more easy ~ easiest ~ easy ~ Bài thi dễ hơn dự kiến. ~ Easy → easier.",
"Today is ___ than yesterday. ~ colder ~ more cold ~ coldest ~ cold ~ Hôm nay lạnh hơn hôm qua. ~ Cold → colder.",
"This road is ___ than that one. ~ longer ~ most long ~ longest ~ long ~ Con đường này dài hơn đường kia. ~ Long → longer.",
"My room is ___ than yours. ~ smaller ~ more small ~ smallest ~ small ~ Phòng tôi nhỏ hơn phòng bạn. ~ Small → smaller.",
"He is ___ than his brother. ~ younger ~ most young ~ youngest ~ young ~ Cậu ấy trẻ hơn anh trai. ~ Young → younger.",
"The water is ___ today than yesterday. ~ hotter ~ more hot ~ hottest ~ hot ~ Hôm nay nước nóng hơn hôm qua. ~ Hot → hotter.",
"Your bag is ___ than mine. ~ lighter ~ most light ~ lightest ~ light ~ Túi bạn nhẹ hơn túi tôi. ~ Light → lighter.",
"The journey is ___ than last time. ~ shorter ~ most short ~ shortest ~ short ~ Hành trình này ngắn hơn lần trước. ~ Short → shorter."
]),
L("long-more","So sánh hơn với tính từ dài","Phần lớn tính từ từ ba âm tiết trở lên và nhiều tính từ hai âm tiết dùng more + tính từ + than. Không thêm -er đồng thời với more.","more / less + long adjective + than","Tính từ nhiều âm tiết hoặc -ful, -ous, -ive thường dùng more/less.",
[["Interesting","more interesting than","Interesting dài nên dùng more."],["Expensive","more expensive than","Expensive dài nên dùng more."],["Careful","more careful than","Careful dùng more, không thêm -er."]],
[["Không dùng more + -er","More beautifuller là chồng hai dấu so sánh.","This film is more interesting.","Phim này thú vị hơn."],["Một số tính từ hai âm tiết linh hoạt","Quiet, simple, clever có thể thêm -er; bài nên tránh cho cả hai dạng cạnh tranh.","This path is narrower.","Đường này hẹp hơn."]],
[
"This book is ___ than the last one. ~ more interesting ~ interestinger ~ most interesting ~ interesting ~ Sách này thú vị hơn cuốn trước. ~ Interesting → more interesting.",
"The new phone is ___ than mine. ~ more expensive ~ expensiver ~ most expensive ~ expensive ~ Điện thoại mới đắt hơn của tôi. ~ Expensive → more expensive.",
"Please be ___ next time. ~ more careful ~ carefuler ~ most careful ~ carefulest ~ Lần sau hãy cẩn thận hơn. ~ Careful → more careful.",
"This task is ___ than we expected. ~ more complicated ~ complicateder ~ most complicated ~ complicatedest ~ Nhiệm vụ phức tạp hơn dự kiến. ~ Complicated → more complicated.",
"Her explanation was ___ than mine. ~ more useful ~ usefuler ~ most useful ~ usefulest ~ Lời giải thích của cô ấy hữu ích hơn của tôi. ~ Useful → more useful.",
"The weather is ___ than last week. ~ more unpredictable ~ unpredictabler ~ most unpredictable ~ unpredictable ~ Thời tiết khó đoán hơn tuần trước. ~ Unpredictable → more unpredictable.",
"This hotel is ___ than that one. ~ more comfortable ~ comfortabler ~ most comfortable ~ comfortablest ~ Khách sạn này thoải mái hơn khách sạn kia. ~ Comfortable → more comfortable.",
"Her second answer was ___ than her first. ~ more accurate ~ accurater ~ most accurate ~ accuratest ~ Đáp án thứ hai chính xác hơn đáp án đầu. ~ Accurate → more accurate.",
"This route is ___ than the old route. ~ more convenient ~ convenienter ~ most convenient ~ convenientest ~ Tuyến đường này thuận tiện hơn tuyến cũ. ~ Convenient → more convenient.",
"The new system is ___ than before. ~ more reliable ~ reliabler ~ most reliable ~ reliablest ~ Hệ thống mới đáng tin cậy hơn trước. ~ Reliable → more reliable."
]),
L("irregular","So sánh hơn bất quy tắc","Good/well → better, bad/badly → worse, much/many → more, little → less. Far có farther và further trong nhiều ngữ cảnh nên tránh biến thể gây tranh cãi thành một câu trắc nghiệm một đáp án.","good → better\nbad → worse\nmany/much → more\nlittle → less","Dạng bất quy tắc không tạo bằng more + good hoặc badder.",
[["Good → better","better than","Better thay cho good trong so sánh hơn."],["Bad → worse","worse than","Worse thay cho bad."],["Little → less","less than","Less mô tả số lượng/mức độ ít hơn."]],
[["Farther/further","Farther thường nói khoảng cách; further có thể dùng cho khoảng cách hoặc nghĩa thêm. Không đưa cả hai vào một đề thiếu ngữ cảnh.","We need further details.","Chúng tôi cần thêm chi tiết."],["Than và tính từ bất quy tắc","Better than chứ không dùng more better than.","This is better than that.","Cái này tốt hơn cái kia."]],
[
"This plan is ___ than the old one. ~ better ~ more good ~ best ~ gooder ~ Kế hoạch này tốt hơn kế hoạch cũ. ~ Good → better.",
"His second result was ___ than his first. ~ worse ~ more bad ~ worst ~ badder ~ Kết quả thứ hai tệ hơn kết quả đầu. ~ Bad → worse.",
"We have ___ time than yesterday. ~ less ~ little ~ least ~ littler ~ Chúng tôi có ít thời gian hơn hôm qua. ~ Little → less.",
"She has ___ experience than before. ~ more ~ much ~ most ~ many ~ Cô ấy có nhiều kinh nghiệm hơn trước. ~ Much → more.",
"They made ___ mistakes than last time. ~ fewer ~ few ~ fewest ~ little ~ Họ mắc ít lỗi hơn lần trước. ~ Few → fewer (danh từ đếm được).",
"This method works ___ than the earlier one. ~ better ~ gooder ~ best ~ more good ~ Phương pháp này hoạt động tốt hơn phương pháp trước. ~ Well → better.",
"The situation is ___ now than yesterday. ~ worse ~ worst ~ more bad ~ badder ~ Tình hình bây giờ tệ hơn hôm qua. ~ Bad → worse.",
"We need ___ information than we have. ~ more ~ much ~ many ~ most ~ Chúng ta cần thêm thông tin hơn hiện có. ~ Much → more trước information.",
"The ticket costs ___ today than last week. ~ less ~ least ~ little ~ littlest ~ Hôm nay vé có giá thấp hơn tuần trước. ~ Less biểu thị mức giá nhỏ hơn.",
"Her English is ___ than mine. ~ better ~ best ~ more good ~ gooder ~ Tiếng Anh cô ấy tốt hơn tôi. ~ Good → better."
]),
L("short-est","So sánh nhất với tính từ ngắn","So sánh một người/vật với cả nhóm (thường từ ba đối tượng trở lên) bằng the + adjective-est. Biến đổi -e/-y và gấp đôi phụ âm tương tự so sánh hơn.","the + adjective-est + in/of + group","Câu có in the class, of all, trong nhóm nhiều đối tượng → dạng nhất.",
[["Tall → tallest","the tallest in","Một người cao nhất trong nhóm."],["Big → biggest","the biggest of","Big gấp đôi g + est."],["Easy → easiest","the easiest of","Easy đổi y thành i + est."]],
[["The thường bắt buộc trước danh từ","The tallest boy, không chỉ tallest boy khi xác định một người duy nhất.","He is the tallest boy.","Cậu ấy là người cao nhất."],["So sánh giữa hai đối tượng","Với hai đối tượng, so sánh hơn thường được ưu tiên; đôi khi superlative xuất hiện trong khẩu ngữ.","She is taller than her sister.","Cô ấy cao hơn chị."]],
[
"Of the five students, Mai is ___. ~ the tallest ~ taller ~ the taller ~ tallest than ~ Trong năm học sinh, Mai cao nhất. ~ Tall + est với cả nhóm.",
"This is ___ room in the house. ~ the biggest ~ bigger ~ the bigger ~ biggest than ~ Đây là phòng lớn nhất nhà. ~ Big → biggest.",
"This was ___ question on the test. ~ the easiest ~ easier ~ the easier ~ easiest than ~ Đây là câu dễ nhất đề. ~ Easy → easiest.",
"January was ___ month of the year. ~ the coldest ~ colder ~ the colder ~ coldest than ~ Tháng Một là tháng lạnh nhất năm. ~ Cold → coldest.",
"That is ___ road in the town. ~ the longest ~ longer ~ the longer ~ longest than ~ Đó là con đường dài nhất thị trấn. ~ Long → longest.",
"She chose ___ box of all. ~ the smallest ~ smaller ~ the smaller ~ smallest than ~ Cô ấy chọn hộp nhỏ nhất. ~ Small → smallest.",
"He is ___ member of the club. ~ the youngest ~ younger ~ the younger ~ youngest than ~ Anh ấy là thành viên trẻ nhất câu lạc bộ. ~ Young → youngest.",
"July was ___ day of the summer. ~ the hottest ~ hotter ~ the hotter ~ hottest than ~ Tháng Bảy có ngày nóng nhất mùa hè. ~ Hot → hottest.",
"This is ___ bag in the store. ~ the lightest ~ lighter ~ the lighter ~ lightest than ~ Đây là túi nhẹ nhất cửa hàng. ~ Light → lightest.",
"She picked ___ route of the three. ~ the shortest ~ shorter ~ the shorter ~ shortest than ~ Cô ấy chọn đường ngắn nhất trong ba đường. ~ Short → shortest."
]),
L("long-most","So sánh nhất với tính từ dài","Tính từ dài thường dùng the most + adjective khi so một đối tượng với cả nhóm. The least + adjective diễn tả mức độ thấp nhất; tránh thêm -est sau most.","the most / the least + long adjective + in/of + group","So sánh toàn nhóm với tính từ dài; cần most/least và phạm vi.",
[["Interesting","the most interesting","Nổi bật nhất về sự thú vị."],["Expensive","the most expensive","Đắt nhất trong nhóm."],["Difficult","the most difficult","Khó nhất trong nhóm."]],
[["Most không phải more","More đối chiếu hai đối tượng; most chỉ mức tối đa trong nhóm.","This is the most useful method.","Đây là phương pháp hữu ích nhất."],["The least","The least useful = kém hữu ích nhất, không phải most useful.","It was the least useful option.","Đó là phương án kém hữu ích nhất."]],
[
"This is ___ book in the series. ~ the most interesting ~ the more interesting ~ the interestingest ~ most interestinger ~ Đây là cuốn thú vị nhất bộ truyện. ~ The most + interesting.",
"It is ___ phone in the shop. ~ the most expensive ~ the more expensive ~ the expensivest ~ most expensiver ~ Đây là điện thoại đắt nhất cửa hàng. ~ The most expensive.",
"Of all tasks, this is ___. ~ the most difficult ~ the more difficult ~ the difficultest ~ most difficult than ~ Trong các nhiệm vụ, đây là cái khó nhất. ~ The most difficult.",
"She gave ___ explanation of the three. ~ the most useful ~ the more useful ~ the usefulest ~ most useful than ~ Cô ấy đưa ra lời giải thích hữu ích nhất trong ba lời. ~ The most useful.",
"This was ___ journey of my life. ~ the most memorable ~ the more memorable ~ the memorablest ~ more memorable than ~ Đây là hành trình đáng nhớ nhất đời tôi. ~ The most memorable.",
"That is ___ hotel in this district. ~ the most comfortable ~ the more comfortable ~ the comfortablest ~ more comfortable than ~ Đó là khách sạn thoải mái nhất khu này. ~ The most comfortable.",
"Which is ___ solution available? ~ the most reliable ~ the more reliable ~ the reliablest ~ more reliable than ~ Giải pháp nào đáng tin cậy nhất? ~ The most reliable.",
"Of these reports, this is ___. ~ the most detailed ~ the more detailed ~ the detailedest ~ more detailed than ~ Trong các báo cáo, đây là bản chi tiết nhất. ~ The most detailed.",
"She selected ___ candidate of all. ~ the most experienced ~ the more experienced ~ the experiencedest ~ more experienced than ~ Cô ấy chọn ứng viên nhiều kinh nghiệm nhất. ~ The most experienced.",
"This is ___ chapter in the textbook. ~ the most complicated ~ the more complicated ~ the complicatedest ~ more complicated than ~ Đây là chương phức tạp nhất sách. ~ The most complicated."
]),
L("equal-as","So sánh bằng: as…as, not as…as","As + adjective/adverb + as biểu thị cùng mức độ; not as + adjective/adverb + as biểu thị mức độ thấp hơn. Phải xem cả câu để biết đang khẳng định sự bằng nhau hay phủ định.","as + adjective/adverb + as\nnot as + adjective/adverb + as","Dấu hiệu 'same', 'equally', 'not equal' giúp phân biệt câu bằng và không bằng.",
[["As tall as","as + adj + as","Bằng nhau về chiều cao."],["Not as fast as","not as + adj + as","Không nhanh bằng."],["As carefully as","as + adv + as","Bằng nhau về mức độ cẩn thận."]],
[["So có thể thay as trong phủ định","Not so…as đôi khi dùng được; không nên cho cả hai cùng lựa chọn đúng.","This isn't as easy as it looks.","Việc này không dễ như vẻ ngoài."],["Không nói as taller as","Giữa hai as dùng dạng nguyên cấp, không dùng so sánh hơn.","She is as tall as me.","Cô ấy cao bằng tôi."]],
[
"They have exactly the same height: Mai is ___ Lan. ~ as tall as ~ taller than ~ the tallest ~ as taller as ~ Họ cao bằng nhau: Mai cao bằng Lan. ~ As + tall + as.",
"Her car is not equally fast: it is ___ mine. ~ not as fast as ~ as fast as ~ faster than ~ fastest than ~ Xe cô ấy không nhanh bằng xe tôi. ~ Not as fast as.",
"He speaks with equal clarity: he speaks ___ his teacher. ~ as clearly as ~ as clearer as ~ more clearly than ~ the clearest ~ Anh ấy nói rõ như giáo viên. ~ As + adverb + as.",
"The two bags weigh the same: this is ___ that one. ~ as heavy as ~ heavier than ~ the heaviest ~ as heavier as ~ Hai túi nặng bằng nhau. ~ As + heavy + as.",
"My room isn't equally large: it is ___ yours. ~ not as large as ~ larger than ~ as large as ~ largest than ~ Phòng tôi không rộng bằng phòng bạn. ~ Not as large as.",
"She runs at exactly his speed: she runs ___ he does. ~ as quickly as ~ more quickly than ~ the most quickly ~ as quicker as ~ Cô ấy chạy nhanh bằng anh ấy. ~ As + adverb + as.",
"Both answers are equally accurate: hers is ___ mine. ~ as accurate as ~ more accurate than ~ the most accurate ~ as accurater as ~ Đáp án cô ấy chính xác bằng của tôi. ~ As accurate as.",
"The first box isn't equally light: it's ___ the second. ~ not as light as ~ as light as ~ lighter than ~ lightest than ~ Hộp thứ nhất không nhẹ bằng hộp thứ hai. ~ Not as light as.",
"His writing is equally neat: it's ___ hers. ~ as neat as ~ neater than ~ the neatest ~ as neater as ~ Chữ anh ấy đẹp bằng chữ cô ấy. ~ As neat as.",
"The second film was less exciting: it was ___ the first. ~ not as exciting as ~ as exciting as ~ more exciting than ~ the most exciting ~ Phim thứ hai không hấp dẫn bằng phim đầu. ~ Not as exciting as."
]),
L("less-fewer","Less, fewer và more theo danh từ","Fewer thường đi với danh từ đếm được số nhiều; less đi với danh từ không đếm được hoặc lượng/mức độ. More dùng được với cả hai khi so sánh lượng tăng.","fewer + plural countable noun\nless + uncountable noun\nmore + noun","Xem danh từ phía sau đếm được hay không và quan hệ ít/nhiều hơn.",
[["Fewer mistakes","fewer + N số nhiều","Mistakes đếm được."],["Less water","less + N không đếm được","Water không đếm được."],["More time","more + N không đếm được","More biểu thị lượng thời gian lớn hơn."]],
[["Less với plural trong giao tiếp","Trong khẩu ngữ có less + danh từ đếm được số nhiều, nhưng văn viết học thuật truyền thống ưu tiên fewer.","We made fewer mistakes.","Chúng tôi mắc ít lỗi hơn."],["Money/amounts","Less money hoặc less time dùng với lượng, không dùng fewer money.","We need less time.","Chúng ta cần ít thời gian hơn."]],
[
"She made ___ mistakes than before. ~ fewer ~ less ~ fewest ~ little ~ Cô ấy mắc ít lỗi hơn trước. ~ Fewer + mistakes đếm được.",
"We need ___ water than yesterday. ~ less ~ fewer ~ fewest ~ many ~ Chúng ta cần ít nước hơn hôm qua. ~ Less + water.",
"He has ___ books than I do. ~ fewer ~ less ~ little ~ least ~ Anh ấy có ít sách hơn tôi. ~ Fewer + books.",
"She spends ___ money now than before. ~ less ~ fewer ~ fewest ~ many ~ Bây giờ cô ấy tiêu ít tiền hơn. ~ Less + money.",
"The new road has ___ cars at night. ~ fewer ~ less ~ little ~ least ~ Ban đêm đường mới có ít ô tô hơn. ~ Fewer + cars.",
"I have ___ free time than last year. ~ less ~ fewer ~ fewest ~ many ~ Tôi có ít thời gian rảnh hơn năm ngoái. ~ Less + time.",
"More students joined, so we need ___ chairs. ~ more ~ much ~ many ~ most ~ Nhiều học sinh tham gia hơn nên cần thêm ghế. ~ More + chairs chỉ lượng tăng.",
"We have ___ information now than before. ~ more ~ many ~ much ~ most ~ Giờ chúng tôi có nhiều thông tin hơn trước. ~ More + information.",
"The team had ___ problems this week. ~ fewer ~ less ~ little ~ least ~ Tuần này đội ít gặp vấn đề hơn. ~ Fewer + problems.",
"She used ___ sugar than last time. ~ less ~ fewer ~ fewest ~ many ~ Cô ấy dùng ít đường hơn lần trước. ~ Less + sugar không đếm được."
]),
L("double","So sánh kép và thay đổi tăng dần","The + comparative…, the + comparative… diễn tả hai biến số cùng thay đổi; comparative + and + comparative diễn tả một đặc tính ngày càng tăng/giảm. Không dùng than sau more and more… nếu chỉ nói xu hướng.","The + comparative + S+V, the + comparative + S+V\nadj-er and adj-er\nmore and more + long adjective","Phải phân biệt xu hướng tăng dần của một đặc tính với quan hệ hai biến số.",
[["The harder…, the better…","The + comparative, the + comparative","Càng chăm thì kết quả càng tốt."],["Hotter and hotter","comparative and comparative","Một đặc tính tăng dần."],["More and more interesting","more and more + adjective","Tính từ dài tăng mức độ."]],
[["Cần the ở cả hai vế","The more you practise, the better you become: thiếu the làm sai cấu trúc.","The earlier we leave, the better.","Đi càng sớm càng tốt."],["Không chồng more với -er","Không dùng more hotter and hotter.","It is getting hotter and hotter.","Trời ngày càng nóng."]],
[
"___ you study, the better you perform. ~ The harder ~ Harder ~ The hardest ~ More harder ~ Bạn càng học chăm thì càng làm tốt. ~ The harder…, the better…. ",
"The more you practise, ___ you become. ~ the better ~ better ~ the best ~ more good ~ Càng luyện tập càng tiến bộ. ~ The more…, the better…. ",
"The weather is getting ___. ~ hotter and hotter ~ more hotter ~ the hottest ~ hot and hot ~ Trời ngày càng nóng. ~ Hotter and hotter.",
"The story becomes ___. ~ more and more interesting ~ interestinger and interestinger ~ the most interesting ~ more interestinger ~ Câu chuyện ngày càng thú vị. ~ More and more + adjective dài.",
"___ you start, the sooner you finish. ~ The earlier ~ Earlier ~ The earliest ~ More earlier ~ Càng bắt đầu sớm càng kết thúc sớm. ~ The earlier…, the sooner…. ",
"With every hour, the task became ___. ~ harder and harder ~ more harder ~ the hardest ~ hard and hard ~ Nhiệm vụ ngày càng khó. ~ Harder and harder.",
"The more carefully you read, ___ mistakes you make. ~ the fewer ~ fewer ~ the fewest ~ the less ~ Càng đọc kỹ càng mắc ít lỗi. ~ The fewer + mistakes đếm được.",
"She feels ___ about the exam each day. ~ more and more confident ~ confidenter and confidenter ~ the most confident ~ more confidenter ~ Mỗi ngày cô ấy tự tin hơn về kỳ thi. ~ More and more confident.",
"___ the journey, the more tired we became. ~ The longer ~ Longer ~ The longest ~ More longer ~ Chuyến đi càng dài chúng tôi càng mệt. ~ The longer…, the more…. ",
"The more you save, ___ you can invest later. ~ the more ~ more ~ the most ~ many ~ Càng tiết kiệm, sau này càng có thể đầu tư nhiều. ~ The more…, the more…."
])
];
g.GrammarTopics9to11Factory.make(11,"CHUYÊN ĐỀ 11. SO SÁNH – COMPARISON",lessons,[
["Rewrite: This road is long. That road is short.","This road is longer than that road.",["comparative"]],
["Complete: This is ___ book of all (interesting).","This is the most interesting book of all.",["superlative"]],
["Correct: She is more taller than me.","She is taller than me.",["no double comparative"]],
["Rewrite: As you practise more, you improve.","The more you practise, the better you become.",["double comparative"]]
]);
})(window);