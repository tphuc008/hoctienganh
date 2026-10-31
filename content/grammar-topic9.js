/* Topic 9: Gerunds and Infinitives — eight full bilingual V1.1 lessons. */
(function(g){
"use strict";
const L=(id,title,meaning,form,clue,steps,cases,pitfalls,rows)=>({
 id,title,meaning,form,core:clue,clue,steps,cases,pitfalls,
 rows:rows.map(v=>{let a=v.split(" ~ ");if(a.length!==7)throw Error(id+" needs 7 row fields");return [a[0].replace("___",a[2]),...a].join(" ~ ");})
});
const p=(a,b,c)=>[[a,b,c],["Phân biệt dạng đúng","V-ing / to V / V nguyên mẫu","Xác định loại bổ ngữ và ý nghĩa chứ không chỉ nhìn chữ cuối."],["Kiểm tra ngữ cảnh","Đọc toàn bộ câu","Lựa chọn hình thức động từ phải bảo toàn nghĩa của câu."]];
const steps=["Xác định động từ/cụm từ quyết định dạng của động từ tiếp theo.","Đối chiếu quy tắc V-ing, to V hoặc nguyên mẫu không to.","Kiểm tra nghĩa câu hoàn chỉnh; không chọn một dạng chỉ vì nó có thể xuất hiện ở câu khác."];
const lessons=[
L("gerund-verbs","Động từ + V-ing","Enjoy, avoid, finish, mind, consider, suggest, risk và practise thường nhận bổ ngữ V-ing.","enjoy / avoid / finish / mind / consider / suggest + V-ing","Động từ chính đứng ngay trước ô trống yêu cầu V-ing.",steps,p("Enjoy + V-ing","enjoy + V-ing","Enjoy reading chỉ hoạt động người nói thích."),[["Không thêm to","Enjoy không trực tiếp theo sau bởi to V trong cấu trúc này.","She enjoys reading.","Cô ấy thích đọc."],["Suggest có mẫu khác","Suggest doing hoặc suggest that S do; không tự suy thành suggest us to do.","She suggested leaving early.","Cô ấy đề nghị đi sớm."]],
[
"She enjoys ___ after dinner. ~ reading ~ to read ~ read ~ reads ~ Cô ấy thích đọc sách sau bữa tối. ~ Enjoy + reading.",
"He avoids ___ mistakes. ~ making ~ to make ~ make ~ made ~ Anh ấy tránh mắc lỗi. ~ Avoid + making.",
"They finished ___ the report. ~ writing ~ to write ~ write ~ wrote ~ Họ đã viết xong báo cáo. ~ Finish + writing.",
"Do you mind ___ here? ~ waiting ~ to wait ~ wait ~ waited ~ Bạn có phiền đợi ở đây không? ~ Mind + waiting.",
"We are considering ___ abroad. ~ moving ~ to move ~ move ~ moved ~ Chúng tôi đang cân nhắc chuyển ra nước ngoài. ~ Consider + moving.",
"He denied ___ the vase. ~ breaking ~ to break ~ break ~ broken ~ Anh ấy phủ nhận đã làm vỡ bình. ~ Deny + breaking.",
"She risked ___ her phone. ~ losing ~ to lose ~ lose ~ lost ~ Cô ấy mạo hiểm làm mất điện thoại. ~ Risk + losing.",
"We practise ___ English daily. ~ speaking ~ to speak ~ speak ~ spoke ~ Chúng tôi luyện nói tiếng Anh mỗi ngày. ~ Practise + speaking.",
"He suggested ___ a break. ~ taking ~ to take ~ take ~ took ~ Anh ấy đề nghị nghỉ một lúc. ~ Suggest + taking.",
"He gave up ___ last year. ~ smoking ~ to smoke ~ smoke ~ smoked ~ Năm ngoái anh ấy bỏ hút thuốc. ~ Give up + smoking."
]),
L("to-inf-verbs","Động từ + to-infinitive","Decide, hope, plan, refuse, agree, promise, manage, offer, want và learn thường kết hợp với to + động từ nguyên mẫu.","decide / hope / plan / refuse / promise / manage + to V","Nhận diện động từ nêu quyết định, kế hoạch, lời hứa hoặc cố gắng.",steps,p("Decide + to V","decide + to V","Decide to stay biểu thị quyết định ở lại."),[["To + nguyên mẫu","Không thêm -s/-ed vào động từ theo sau to-infinitive.","She plans to study.","Cô ấy định học."],["Không gán cùng quy tắc cho mọi động từ","Enjoy cần V-ing, nhưng decide cần to V.","They decided to leave.","Họ quyết định rời đi."]],
[
"She decided ___ home. ~ to stay ~ staying ~ stay ~ stayed ~ Cô ấy quyết định ở nhà. ~ Decide + to stay.",
"He hopes ___ a scholarship. ~ to win ~ winning ~ win ~ won ~ Anh ấy hy vọng có học bổng. ~ Hope + to win.",
"They plan ___ the kitchen. ~ to renovate ~ renovating ~ renovate ~ renovated ~ Họ dự định sửa nhà bếp. ~ Plan + to renovate.",
"She refused ___ the contract. ~ to sign ~ signing ~ sign ~ signed ~ Cô ấy từ chối ký hợp đồng. ~ Refuse + to sign.",
"He agreed ___ us. ~ to join ~ joining ~ join ~ joined ~ Anh ấy đồng ý tham gia cùng chúng tôi. ~ Agree + to join.",
"She promised ___ early. ~ to return ~ returning ~ return ~ returned ~ Cô ấy hứa sẽ trở về sớm. ~ Promise + to return.",
"He managed ___ safely. ~ to escape ~ escaping ~ escape ~ escaped ~ Anh ấy xoay xở thoát ra an toàn. ~ Manage + to escape.",
"They offered ___ us. ~ to help ~ helping ~ help ~ helped ~ Họ đề nghị giúp chúng tôi. ~ Offer + to help.",
"She wants ___ a pilot. ~ to become ~ becoming ~ become ~ became ~ Cô ấy muốn thành phi công. ~ Want + to become.",
"He is learning ___ this summer. ~ to swim ~ swimming ~ swim ~ swam ~ Mùa hè này anh ấy đang học bơi. ~ Learn + to swim là học một kỹ năng."
]),
L("prepositions","Giới từ + V-ing","Khi động từ theo sau giới từ, nó thường có dạng V-ing. To trong look forward to và be used to là giới từ.","preposition + V-ing\nlook forward to / object to / be used to + V-ing","Chữ to có thể là giới từ, không nhất thiết giới thiệu to-infinitive.",steps,p("Interested in","be interested in + V-ing","Sau in cần taking."),[["To là giới từ","Look forward to meeting, không phải look forward to meet.","I look forward to meeting you.","Tôi mong được gặp bạn."],["Tân ngữ có thể là danh từ","Sau giới từ cũng có thể là danh từ, không phải lúc nào cũng có động từ.","She is good at maths.","Cô ấy giỏi toán."]],
[
"She is interested in ___ pictures. ~ taking ~ to take ~ take ~ took ~ Cô ấy thích chụp ảnh. ~ In + taking.",
"I look forward to ___ you. ~ meeting ~ to meet ~ meet ~ met ~ Tôi mong được gặp bạn. ~ Look forward to + meeting.",
"He is good at ___ in public. ~ speaking ~ to speak ~ speak ~ spoke ~ Anh ấy giỏi nói trước đám đông. ~ At + speaking.",
"She insisted on ___ the bill. ~ paying ~ to pay ~ pay ~ paid ~ Cô ấy khăng khăng trả tiền. ~ Insist on + paying.",
"He left without ___ goodbye. ~ saying ~ to say ~ say ~ said ~ Anh ấy đi mà không chào. ~ Without + saying.",
"She learns by ___ podcasts. ~ listening to ~ to listen to ~ listen to ~ listened to ~ Cô ấy học bằng cách nghe podcast. ~ By + listening to.",
"He walked instead of ___ a taxi. ~ taking ~ to take ~ take ~ took ~ Anh ấy đi bộ thay vì đi taxi. ~ Instead of + taking.",
"They objected to ___ a road there. ~ building ~ to build ~ build ~ built ~ Họ phản đối xây đường tại đó. ~ Object to + building.",
"He succeeded in ___ the problem. ~ solving ~ to solve ~ solve ~ solved ~ Anh ấy giải quyết thành công vấn đề. ~ Succeed in + solving.",
"She is used to ___ early. ~ getting up ~ to get up ~ get up ~ got up ~ Cô ấy quen dậy sớm. ~ Be used to + getting up."
]),
L("object-to-v","Động từ + tân ngữ + to V","Ask, tell, advise, remind, persuade, invite, encourage, allow và expect thường yêu cầu O + to V.","ask / tell / advise / remind / persuade + O + to V","Tân ngữ chỉ người đã xuất hiện trước ô trống.",steps,p("Tell + O + to V","tell someone to V","Told them to wait, tân ngữ them thực hiện hành động."),[["Advise cũng có thể + V-ing","Advise doing chung và advise somebody to do là hai mẫu khác nhau.","She advised me to rest.","Cô ấy khuyên tôi nghỉ."],["Not to V","Khi phủ định hành động được yêu cầu, not đứng trước to.","She warned him not to touch it.","Cô ấy cảnh báo anh ấy đừng chạm vào nó."]],
[
"She asked me ___ the dishes. ~ to wash ~ washing ~ wash ~ washed ~ Cô ấy nhờ tôi rửa bát. ~ Ask + O + to V.",
"The manager told them ___ outside. ~ to wait ~ waiting ~ wait ~ waited ~ Quản lý bảo họ đợi ở ngoài. ~ Tell + O + to V.",
"The doctor advised him ___ more. ~ to rest ~ resting ~ rest ~ rested ~ Bác sĩ khuyên anh ấy nghỉ nhiều hơn. ~ Advise + O + to V.",
"She reminded him ___ home. ~ to call ~ calling ~ call ~ called ~ Cô ấy nhắc anh ấy gọi về nhà. ~ Remind + O + to V.",
"She persuaded me ___ again. ~ to try ~ trying ~ try ~ tried ~ Cô ấy thuyết phục tôi thử lại. ~ Persuade + O + to V.",
"They invited him ___ at the conference. ~ to speak ~ speaking ~ speak ~ spoke ~ Họ mời anh ấy phát biểu tại hội nghị. ~ Invite + O + to V.",
"The tutor encouraged us ___ harder. ~ to study ~ studying ~ study ~ studied ~ Gia sư khuyến khích chúng tôi học chăm hơn. ~ Encourage + O + to V.",
"The teacher allowed us ___ early. ~ to leave ~ leaving ~ leave ~ left ~ Giáo viên cho chúng tôi về sớm. ~ Allow + O + to V.",
"She warned him not ___ the wire. ~ to touch ~ touching ~ touch ~ touched ~ Cô ấy cảnh báo anh ấy đừng chạm vào dây. ~ Warn + O + not to V.",
"They expected her ___ on time. ~ to arrive ~ arriving ~ arrive ~ arrived ~ Họ mong cô ấy đến đúng giờ. ~ Expect + O + to V."
]),
L("bare-inf","Nguyên mẫu không to","Sau modal, let, make ở chủ động, had better và would rather, động từ thường ở nguyên mẫu không to.","can / must / should / let + O / make + O / had better / would rather + V","Sau modal và các cấu trúc này không đặt to hay V-ing.",steps,p("Modal + V","can + bare infinitive","Can swim không có to."),[["Make bị động","Chủ động make O V nhưng bị động be made to V.","They were made to wait.","Họ bị buộc phải đợi."],["Help có hai dạng","Help O V và help O to V đều có thể đúng.","She helped us carry the bags.","Cô ấy giúp chúng tôi xách túi."]],
[
"I can ___ across the pool. ~ swim ~ to swim ~ swimming ~ swam ~ Tôi có thể bơi qua hồ. ~ Can + nguyên mẫu.",
"We must ___ before seven. ~ leave ~ to leave ~ leaving ~ left ~ Chúng ta phải rời đi trước bảy giờ. ~ Must + nguyên mẫu.",
"You should ___ a break. ~ take ~ to take ~ taking ~ took ~ Bạn nên nghỉ một lúc. ~ Should + nguyên mẫu.",
"Let the children ___ outside. ~ play ~ to play ~ playing ~ played ~ Hãy cho bọn trẻ chơi ngoài trời. ~ Let + O + nguyên mẫu.",
"The coach made us ___ the drill. ~ repeat ~ to repeat ~ repeating ~ repeated ~ Huấn luyện viên bắt chúng tôi lặp lại bài tập. ~ Make + O + nguyên mẫu chủ động.",
"You had better ___ now. ~ go ~ to go ~ going ~ went ~ Bạn nên đi ngay. ~ Had better + nguyên mẫu.",
"I would rather ___ than drive. ~ walk ~ to walk ~ walking ~ walked ~ Tôi thà đi bộ hơn lái xe. ~ Would rather + nguyên mẫu.",
"He might ___ tonight. ~ finish ~ to finish ~ finishing ~ finished ~ Có thể tối nay anh ấy hoàn thành. ~ Might + nguyên mẫu.",
"You must not ___ the switch. ~ touch ~ to touch ~ touching ~ touched ~ Bạn không được chạm vào công tắc. ~ Must not + nguyên mẫu.",
"She can ___ the puzzle. ~ solve ~ to solve ~ solving ~ solved ~ Cô ấy có thể giải câu đố. ~ Can + nguyên mẫu."
]),
L("meaning-shifts","Stop / remember / forget đổi nghĩa","Cả V-ing và to V có thể đúng ngữ pháp nhưng diễn đạt khác nhau: stop smoking = bỏ hút, stop to smoke = dừng việc khác để hút.","stop V-ing = dừng việc\nstop to V = dừng để làm việc\nremember V-ing = nhớ đã làm\nremember to V = nhớ phải làm","Ngữ cảnh quyết định người nói muốn nói việc đã làm, chưa làm hay mục đích.",steps,p("Stop + V-ing","stop V-ing","Stop smoking diễn tả chấm dứt hút thuốc."),[["Hai dạng đều có thể đúng ngữ pháp","Chọn theo nghĩa, không coi stop to smoke sai cấu trúc.","He stopped smoking.","Anh ấy ngừng hút thuốc."],["Remember doing/to do","Remember meeting = có ký ức, remember to meet = nhớ nhiệm vụ.","I remember meeting her.","Tôi nhớ đã gặp cô ấy."]],
[
"He quit smoking last year: he stopped ___. ~ smoking ~ to smoke ~ smoke ~ smoked ~ Năm ngoái anh ấy bỏ hút thuốc. ~ Stop smoking = bỏ hút thuốc.",
"We paused our walk; we stopped ___ water. ~ to buy ~ buying ~ buy ~ bought ~ Chúng tôi dừng đi bộ để mua nước. ~ Stop to buy chỉ mục đích.",
"I have a vivid memory: I remember ___ him years ago. ~ meeting ~ to meet ~ meet ~ met ~ Tôi nhớ đã gặp anh ấy nhiều năm trước. ~ Remember + V-ing.",
"Please don't forget: remember ___ the door. ~ to lock ~ locking ~ lock ~ locked ~ Nhớ khóa cửa. ~ Remember + to V là việc cần làm.",
"The door was unlocked because he forgot ___ it. ~ to lock ~ locking ~ lock ~ locked ~ Anh ấy quên khóa cửa nên cửa không khóa. ~ Forget + to V = quên nhiệm vụ.",
"I still recall it: I'll never forget ___ that concert. ~ attending ~ to attend ~ attend ~ attended ~ Tôi không bao giờ quên đã dự hòa nhạc. ~ Forget + V-ing chỉ ký ức.",
"She quit the company: she stopped ___ there. ~ working ~ to work ~ work ~ worked ~ Cô ấy thôi làm ở đó. ~ Stop + V-ing.",
"He paused reading: he stopped ___ the phone. ~ to answer ~ answering ~ answer ~ answered ~ Anh ấy dừng đọc để nghe điện thoại. ~ Stop + to V.",
"Tomorrow, I must remember ___ my notes. ~ to bring ~ bringing ~ bring ~ brought ~ Ngày mai tôi phải nhớ mang ghi chú. ~ Remember + to V.",
"I recall the first visit: I remember ___ that room. ~ entering ~ to enter ~ enter ~ entered ~ Tôi nhớ đã bước vào căn phòng đó. ~ Remember + V-ing."
]),
L("try-regret","Try, regret, go on và thay đổi nghĩa","Try V-ing nghĩa là thử một phương án; try to V là nỗ lực thực hiện. Regret V-ing là hối tiếc đã làm; regret to V dùng khi thông báo điều đáng tiếc.","try V-ing / try to V\nregret V-ing / regret to V\ngo on V-ing / go on to V","Đọc dấu hiệu thử nghiệm, cố gắng chưa thành công, hối tiếc hay chuyển việc.",steps,p("Try to V","try to V","Nỗ lực đạt mục tiêu khó."),[["Go on to V","Sau một việc, chuyển sang việc khác: go on to V.","She went on to explain the results.","Cô ấy chuyển sang giải thích kết quả."],["Regret to inform","Tiếc phải thông báo, không phải hối tiếc đã thông báo.","We regret to inform you.","Chúng tôi rất tiếc phải thông báo."]],
[
"He made a great effort but failed: he tried ___ the door. ~ to open ~ opening ~ open ~ opened ~ Anh ấy cố mở cửa nhưng không thành. ~ Try to V = nỗ lực.",
"As a possible solution, try ___ the computer. ~ restarting ~ to restart ~ restart ~ restarted ~ Hãy thử khởi động lại máy tính. ~ Try V-ing = thử cách làm.",
"I wish I hadn't said it; I regret ___ those words. ~ saying ~ to say ~ say ~ said ~ Tôi hối tiếc đã nói lời đó. ~ Regret V-ing.",
"We are sorry to announce it: we regret ___ the cancellation. ~ to announce ~ announcing ~ announce ~ announced ~ Chúng tôi tiếc phải thông báo việc hủy. ~ Regret to V là lời thông báo.",
"She continued the same talk and went on ___ for an hour. ~ talking ~ to talk ~ talk ~ talked ~ Cô ấy tiếp tục nói thêm một giờ. ~ Go on V-ing tiếp tục cùng việc.",
"After her introduction, she went on ___ the results. ~ to explain ~ explaining ~ explain ~ explained ~ Sau phần giới thiệu, cô ấy chuyển sang giải thích kết quả. ~ Go on to V chuyển việc.",
"He tried hard but failed ___ before six. ~ to finish ~ finishing ~ finish ~ finished ~ Anh ấy cố hoàn thành trước sáu giờ nhưng thất bại. ~ Try to V.",
"As an experiment, try ___ with a partner. ~ studying ~ to study ~ study ~ studied ~ Hãy thử học cùng một bạn. ~ Try V-ing.",
"He wishes he had not done it: he regrets ___ the warning. ~ ignoring ~ to ignore ~ ignore ~ ignored ~ Anh ấy hối tiếc đã bỏ qua cảnh báo. ~ Regret V-ing.",
"After the poem, he went on ___ a song. ~ to sing ~ singing ~ sing ~ sang ~ Sau khi đọc thơ, anh ấy chuyển sang hát một bài. ~ Go on to V."
]),
L("structures","Các cấu trúc worth / enough / used to","Worth/no use/can't help nhận V-ing; too/enough theo sau bởi to V; used to V (thói quen xưa) khác be used to V-ing (quen làm).","be worth + V-ing\nIt's no use + V-ing\ntoo + adj + to V\nadj + enough + to V\nused to V / be used to V-ing","Nhận diện mẫu đầy đủ, đặc biệt chức năng chữ to.",steps,p("Be worth V-ing","be worth + V-ing","Worth reading nghĩa là đáng đọc."),[["Used to / be used to khác nhau","Used to walk = từng đi bộ; be used to walking = quen đi bộ.","I used to walk to school.","Tôi từng đi bộ đến trường."],["Enough sau tính từ","Adj + enough + to V, còn enough + N.","She is tall enough to reach it.","Cô ấy đủ cao để với tới."]],
[
"This book is worth ___. ~ reading ~ to read ~ read ~ reads ~ Sách này đáng đọc. ~ Worth + V-ing.",
"It is no use ___ now. ~ arguing ~ to argue ~ argue ~ argued ~ Tranh cãi bây giờ vô ích. ~ No use + V-ing.",
"The box is too heavy ___. ~ to lift ~ lifting ~ lift ~ lifted ~ Hộp quá nặng để nhấc. ~ Too + adj + to V.",
"She is tall enough ___ the shelf. ~ to reach ~ reaching ~ reach ~ reached ~ Cô ấy đủ cao để với tới kệ. ~ Adj + enough + to V.",
"As a child, he used ___ to school. ~ to walk ~ walking ~ walk ~ walked ~ Hồi nhỏ anh ấy thường đi bộ đến trường. ~ Used to + V.",
"She has become accustomed to ___ early. ~ getting up ~ to get up ~ get up ~ got up ~ Cô ấy đã quen dậy sớm. ~ Become accustomed to + V-ing.",
"She couldn't help ___ at the joke. ~ laughing ~ to laugh ~ laugh ~ laughed ~ Cô ấy không nhịn được cười. ~ Can't help + V-ing.",
"He is busy ___ the documents. ~ checking ~ to check ~ check ~ checked ~ Anh ấy bận kiểm tra tài liệu. ~ Busy + V-ing.",
"The puzzle is easy enough ___ quickly. ~ to solve ~ solving ~ solve ~ solved ~ Câu đố đủ dễ để giải nhanh. ~ Adj + enough + to V.",
"The article is worth ___ carefully. ~ studying ~ to study ~ study ~ studied ~ Bài viết đáng nghiên cứu kỹ. ~ Worth + V-ing."
])
];
g.GrammarTopics9to11Factory.make(9,"CHUYÊN ĐỀ 9. DANH ĐỘNG TỪ VÀ ĐỘNG TỪ NGUYÊN MẪU – GERUNDS & INFINITIVES",lessons,[
["Rewrite: She likes reading.","She enjoys reading.",["enjoy + V-ing"]],
["Rewrite: He walked to school in the past.","He used to walk to school.",["used to V"]],
["Rewrite: He paused to buy water.","He stopped to buy water.",["stop to V"]],
["Correct: I look forward to meet her.","I look forward to meeting her.",["to is a preposition"]]
]);
})(window);