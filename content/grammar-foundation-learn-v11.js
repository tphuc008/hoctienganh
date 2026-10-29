/* Foundation Grammar Learn V1.1 — Topics 1–4 and 6–8.
 * Topic 5 uses its previously approved, separately curated V1.1 source.
 * Adapt sound/stress lessons rather than imposing syntax formulas.
 * All original lessons, 3+7 examples, questions, solutions, and storage are immutable.
 */
(function(g){
"use strict";
const M=(items,contrast,focus)=>({items:items.map(x=>{const a=x.split(" || ");if(a.length!==2)throw Error("Case spec invalid: "+x);return{name:a[0],formula:a[1]}}),contrast,focus});
const plans={
1:{
 "vowels-i":M(["/ɪ/ trong ship || ship /ʃɪp/ → /ɪ/","/iː/ trong sheep || sheep /ʃiːp/ → /iː/","/ɪ/ trong sit || sit /sɪt/ → /ɪ/"],"Ship /ʃɪp/ và sheep /ʃiːp/ khác cả chất lượng lẫn độ dài nguyên âm, không chỉ khác cách viết.","độ dài và chất lượng nguyên âm /ɪ/ – /iː/"),
 "vowels-front":M(["Âm /e/ || bed /bed/","Âm /æ/ || bad /bæd/","Âm /ʌ/ || cut /kʌt/"],"Bed /bed/ và bad /bæd/ là một cặp tối thiểu: thay nguyên âm sẽ làm thay đổi từ.","độ mở miệng và vị trí lưỡi của /e/, /æ/, /ʌ/, /ɑː/"),
 "vowels-back":M(["Âm /ɒ/ (BrE) || lot /lɒt/","Âm /ɔː/ || law /lɔː/","Âm /ʊ/ || book /bʊk/"],"Lot /lɒt/ và law /lɔː/ không có cùng nguyên âm; tương tự book /bʊk/ khác food /fuːd/.","nguyên âm sau, độ dài /ɒ/ – /ɔː/ và /ʊ/ – /uː/"),
 "diphthongs":M(["Nguyên âm đôi /eɪ/ || day /deɪ/","Nguyên âm đôi /aɪ/ || time /taɪm/","Nguyên âm đôi /ɔɪ/ || boy /bɔɪ/"],"Dù đều là nguyên âm đôi, /eɪ/ trong day và /aɪ/ trong time bắt đầu ở vị trí miệng khác nhau.","hướng chuyển động âm trong /eɪ/, /aɪ/, /ɔɪ/, /aʊ/, /əʊ/"),
 "consonants":M(["Âm /θ/ vô thanh || thin /θɪn/","Âm /ð/ hữu thanh || this /ðɪs/","Âm /ʃ/ xát || ship /ʃɪp/"],"Thin bắt đầu bằng /θ/ vô thanh; this bắt đầu bằng /ð/ hữu thanh. Chữ th không cho cùng một âm trong mọi từ.","vị trí cấu âm và sự rung dây thanh của phụ âm"),
 "ed-endings":M(["Sau âm vô thanh (trừ /t/) || /t/: worked /wɜːkt/","Sau âm hữu thanh (trừ /d/) || /d/: played /pleɪd/","Sau /t/ hoặc /d/ || /ɪd/: wanted /ˈwɒntɪd/"],"Work kết thúc bằng /k/ nên -ed là /t/; play kết thúc bằng nguyên âm hữu thanh nên -ed là /d/. Wanted thêm một âm tiết /ɪd/ vì want kết thúc /t/.","âm cuối được phát ra của động từ gốc, không phải chữ cuối"),
 "s-endings":M(["Sau âm vô thanh không xì || /s/: books /bʊks/","Sau âm hữu thanh không xì || /z/: dogs /dɒɡz/","Sau các âm xì || /ɪz/: buses /ˈbʌsɪz/"],"Books kết thúc bằng /s/, dogs bằng /z/, buses thêm một âm tiết /ɪz/. Dựa vào âm cuối của dạng gốc để nhận diện quy tắc.","âm cuối của từ gốc và nhóm phụ âm xì /s z ʃ ʒ tʃ dʒ/"),
 "letter-combinations":M(["Ph trong phone || ph → /f/: phone /fəʊn/","Ph trong graph || ph → /f/: graph /ɡrɑːf/","Ch trong chemistry || ch → /k/: chemistry /ˈkemɪstri/"],"Phone và graph đều có ph đọc /f/, nhưng ch trong chemistry đọc /k/ chứ không giống ch /tʃ/ trong chair.","cách chữ ghép biểu thị âm theo từ cụ thể, không có quy tắc một–một tuyệt đối")
},
2:{
 "noun-two":M(["Hotel – trọng âm sau || ho-TEL (âm tiết 2)","Machine – trọng âm sau || ma-CHINE (âm tiết 2)","Balloon – trọng âm sau || ba-LOON (âm tiết 2)"],"Table và teacher có xu hướng nhấn âm đầu, trong khi hotel và machine nhấn âm thứ hai; từ loại chỉ là một dấu hiệu tham khảo.","trọng âm thực của danh từ hai âm tiết và ngoại lệ"),
 "verb-two":M(["Answer – trọng âm đầu || AN-swer (âm tiết 1)","Listen – trọng âm đầu || LIS-ten (âm tiết 1)","Open – trọng âm đầu || O-pen (âm tiết 1)"],"Answer nhấn âm đầu, nhưng begin nhấn âm sau. Không thể dựa duy nhất vào việc một từ là động từ hai âm tiết.","trọng âm của từng động từ và ngoại lệ của khuynh hướng chung"),
 "adjective-two":M(["Polite – trọng âm sau || po-LITE (âm tiết 2)","Alone – trọng âm sau || a-LONE (âm tiết 2)","Afraid – trọng âm sau || a-FRAID (âm tiết 2)"],"Happy và simple thường nhấn âm đầu; polite và alone nhấn âm thứ hai. Từ loại không quyết định trọng âm tuyệt đối.","trọng âm thực của tính từ hai âm tiết"),
 "noun-verb-shift":M(["Record – đổi theo từ loại || RE-cord (N) / re-CORD (V)","Present – đổi theo từ loại || PRE-sent (N) / pre-SENT (V)","Object – đổi theo từ loại || OB-ject (N) / ob-JECT (V)"],"Cùng cách viết record nhưng danh từ REcord nhấn âm đầu, động từ reCORD nhấn âm sau; xác định từ loại trước khi đọc.","từ loại của cùng một từ có hai cách nhấn"),
 "tion-sion":M(["Education – âm trước -tion || ed-u-CA-tion","Information – âm trước -tion || in-for-MA-tion","Celebration – âm trước -tion || cel-e-BRA-tion"],"Trong education và information, trọng âm chính rơi vào âm tiết ngay trước -tion, không nhấn âm -tion.","vị trí âm tiết đứng trước hậu tố -tion/-sion"),
 "ic-suffix":M(["Economic – trước -ic || e-co-NOM-ic","Scientific – trước -ic || sci-en-TIF-ic","Geographic – trước -ic || ge-o-GRAPH-ic"],"Economic và scientific đều có trọng âm chính ở âm tiết ngay trước -ic; số thứ tự của âm nhấn cần đếm theo từng từ.","âm tiết ngay trước -ic, không phải -ic"),
 "ee-eer-ese":M(["Nominee – trọng âm cuối || nom-i-NEE","Engineer – trọng âm cuối || en-gi-NEER","Volunteer – trọng âm cuối || vol-un-TEER"],"Nominee và engineer đều có trọng âm chính ở âm tiết mang hậu tố -ee/-eer, khác nhiều hậu tố trung tính.","những hậu tố thường tự mang trọng âm chính"),
 "third-from-end":M(["Photography – thứ ba từ cuối || pho-TOG-ra-phy","Geography – thứ ba từ cuối || ge-OG-ra-phy","Democracy – thứ ba từ cuối || de-MOC-ra-cy"],"Photography nhấn TOG, khác photograph nhấn PHO; cần đếm từ cuối lên chứ không lấy nguyên trọng âm của từ gốc.","vị trí trọng âm đếm từ cuối và sự chuyển trọng âm ở từ dẫn xuất")
},
3:{
 "present-simple":M(["Thói quen hằng ngày || S + V(s/es)","Thói quen vào thứ Sáu || S số nhiều + V nguyên mẫu","Lịch trình cố định || S số ít + V(s/es)"],"Drives và play đều diễn đạt thói quen; khác biệt -s là do father số ít còn classmates số nhiều.","thói quen, sự thật hay lịch cố định"),
 "present-continuous":M(["Việc đang xảy ra || S + am/is/are + V-ing","Chủ ngữ số nhiều || They/children + are + V-ing","Tình huống tạm thời || I + am + V-ing"],"Someone is knocking và I am preparing đều dùng hiện tại tiếp diễn; một việc đang xảy ra ngay bây giờ, một việc tạm thời trong tuần.","việc đang diễn ra hoặc thay đổi tạm thời"),
 "past-simple":M(["Mốc last Saturday || S + V2/ed","Mốc yesterday || S + V2 bất quy tắc","Mốc in 2018 || S + V2/ed"],"Visited và bought đều ở quá khứ đơn; buy có dạng quá khứ bất quy tắc bought, không phải buyed.","mốc thời gian quá khứ đã khép lại"),
 "past-continuous":M(["Hành động nền || was/were + V-ing when + V2","Sự kiện chen ngang || was/were + V-ing when + V2","Quá trình bị gián đoạn || was/were + V-ing when + V2"],"Was cooking diễn ra trước và trong lúc she called; was walking đang diễn ra khi the storm began. Quá khứ tiếp diễn nhấn quá trình nền.","hành động nền kéo dài và sự kiện chen vào"),
 "present-perfect":M(["Kéo dài đến hiện tại || has/have + V3 + since","Kết quả hiện tại || have/has + V3","Sự việc vừa hoàn tất || have/has + already + V3"],"Has lived chỉ khoảng từ 2021 đến nay; have lost nhấn kết quả hiện tại. Cả hai nối quá khứ với hiện tại theo hai cơ chế khác nhau.","mối liên hệ giữa quá khứ và thời điểm hiện tại"),
 "past-perfect":M(["Trước by the time || had + V3 trước V2","Đã rời đi trước || had + already + V3","Hoàn tất trước sự kiện khác || had + V3 before + V2"],"Had left xảy ra trước I arrived; hai mốc đều thuộc quá khứ nên không dùng hiện tại hoàn thành.","thứ tự hai mốc quá khứ, việc nào trước"),
 "future-forms":M(["Quyết định ngay lúc nói || will + V","Dự đoán có bằng chứng || am/is/are going to + V","Dự định đã có sẵn || am/is/are going to + V"],"I will carry là lời đề nghị ngay lúc nói; is going to rain dựa trên mây đen nhìn thấy. Không chọn theo tomorrow đơn thuần.","quyết định mới, kế hoạch sẵn có và bằng chứng hiện tại"),
 "tense-contrast":M(["Quá khứ đã khép lại || Yesterday + V2","Kéo dài đến nay || have/has + V3 + since","Hành động nền quá khứ || was/were + V-ing when + V2"],"Yesterday đóng thời điểm quá khứ; since 2020 cùng trạng thái vẫn tiếp diễn nối với hiện tại. Đây là hai mốc tham chiếu khác nhau.","mốc đã kết thúc, mốc kéo dài hoặc quan hệ trước–sau")
},
4:{
 "reported-present":M(["Trạng thái quá khứ || said + that + S + was","Nơi ở trước đây || said + that + S + V2","Khả năng trong bối cảnh quá khứ || said + that + S + V2"],"Said thiết lập góc nhìn quá khứ; nếu tình trạng đã đổi, was/lived thể hiện mốc lúc phát ngôn cũ.","điểm nhìn quá khứ và sự việc còn đúng ở hiện tại hay không"),
 "reported-progressive":M(["Đang học lúc được thuật lại || said + S + was + V-ing","Chủ ngữ số nhiều || said + S + were + V-ing","Tình trạng tạm thời đã qua || explained + S + was + V-ing"],"Was studying và were waiting đều giữ nghĩa một hành động đang diễn ra tại thời điểm phát ngôn gốc.","hành động đang diễn ra tại mốc nói gốc"),
 "reported-past":M(["Việc hoàn tất sớm hơn || said + S + had + V3","Sự kiện tối hôm trước || said + S + had + V3","Đã làm trước kỳ thi || recalled + S + had + V3"],"Had finished và had lost đều có trước thời điểm tường thuật; past perfect làm rõ thứ tự, không chỉ lùi thì vì thấy said.","thứ tự trước–sau giữa sự việc và hành động tường thuật"),
 "reported-perfect":M(["Kết quả trước lúc kể || said + S + had + V3","Khoảng thời gian tính đến lúc kể || explained + S + had + V3","Trải nghiệm trước chuyến đi || told + S + had + V3"],"Had submitted và had lived đều được nhìn từ thời điểm said/explained trong quá khứ, không nhất thiết đến hiện tại của người thuật lại.","mốc mà kết quả/trải nghiệm được tính đến"),
 "future-in-past":M(["Lời hứa từ hôm qua || promised + S + would + V","Dự định nhìn từ quá khứ || said + S + would + V","Dự đoán từ năm 2010 || predicted + S + would + V"],"Would phone và would grow đều là tương lai so với một mốc quá khứ, dù người thuật lại biết kết quả sau đó.","tương lai tính từ lúc người nói phát ngôn trong quá khứ"),
 "reported-questions":M(["Câu hỏi Yes/No || asked + if/whether + S + V","Câu hỏi Wh- || asked + Wh-word + S + V","Câu hỏi hoàn thành || asked + whether + S + had + V3"],"She asked if I was ready và he asked where I lived đều dùng trật tự S–V, khác câu hỏi trực tiếp.","từ hỏi, tính Yes/No và trật tự câu trần thuật"),
 "reported-requests":M(["Mệnh lệnh khẳng định || told + O + to V","Yêu cầu phủ định || asked + O + not to V","Lời khuyên || advised + O + to V"],"Told us to wait yêu cầu hành động; asked ... not to talk cấm một hành động, not phải đứng trước to V.","loại hành vi lời nói: yêu cầu, cấm đoán hay lời khuyên"),
 "tense-exceptions":M(["Sự thật khoa học || said + that + S + V hiện tại","Động từ kể ở hiện tại || says + that + S + V hiện tại","Tình trạng hiện đang đúng || says + that + S + V hiện tại"],"Said không bắt buộc mọi động từ sau that đều về quá khứ; sự thật khoa học vẫn có thể giữ hiện tại đơn.","thời điểm thuật lại và sự thật có còn đúng không")
},
6:{
 ability:M(["Khả năng hiện tại || can + V","Khả năng chung quá khứ || could + V","Khả năng tương lai || will be able to + V"],"Can swim là khả năng hiện tại; could speak French là năng lực đã có lúc nhỏ. Will be able to diễn đạt khả năng tương lai.","mốc thời gian và khả năng chung hay thành công một lần"),
 permission:M(["Xin phép lịch sự || May + S + V?","Đã được cho phép || was/were allowed to + V","Hỏi về quy định || be allowed to + V"],"May I... xin phép; were allowed to... kể sự cho phép ở quá khứ. Không nhầm permission với ability.","người nói đang xin phép hay mô tả quy định"),
 advice:M(["Khuyên nên làm || should + V","Lời khuyên với ought to || ought to + V","Cảnh báo cấp bách || had better + V"],"Should drink là lời khuyên thông thường; had better leave hàm ý nguy cơ lỡ chuyến xe.","mức độ khuyên nhủ và hậu quả nếu không thực hiện"),
 obligation:M(["Quy định bắt buộc || must + V","Nghĩa vụ theo quy định || has/have to + V","Bắt buộc đã qua || had to + V"],"Must wear và has to submit đều diễn tả nghĩa vụ; had to đặt nghĩa vụ ấy ở mốc quá khứ.","nghĩa vụ hiện tại hay đã xảy ra, nguồn bắt buộc"),
 prohibition:M(["Hành động bị cấm || mustn't + V","Không cần thiết || don't/doesn't have to + V","Việc tùy chọn || don't/doesn't have to + V"],"Mustn't smoke cấm làm; don't have to buy cho phép không mua nhưng không cấm mua.","phân biệt cấm làm và không bắt buộc làm"),
 "present-deduction":M(["Suy luận rất chắc || must + be/V","Dựa trên dấu hiệu rõ || must + be/V","Loại trừ bằng chứng || can't + be/V"],"Must be at home là kết luận từ bằng chứng; can't be in Paris loại trừ khả năng trái bằng chứng.","độ chắc chắn của kết luận và bằng chứng đi kèm"),
 "past-deduction":M(["Chắc hẳn đã || must have + V3","Có thể đã || might have + V3","Không thể đã || can't have + V3"],"Must have forgotten mang mức chắc cao; might have left chỉ khả năng và không khẳng định.","suy luận về sự kiện quá khứ và độ chắc chắn"),
 "modal-perfect":M(["Lẽ ra nên làm || should have + V3","Lẽ ra không nên || shouldn't have + V3","Đã có cơ hội || could have + V3"],"Should have studied phê bình việc không ôn; shouldn't have spoken phê bình hành động đã thực hiện.","điều thực sự đã xảy ra và thái độ đánh giá lại")
},
7:{
 "daily-life":M(["Tỉnh giấc || wake up","Rời khỏi giường || get up","Tắt thiết bị || turn off + N/pronoun"],"Wake up khác get up: người đã thức vẫn có thể chưa rời giường. Turn off lại là hành động tắt thiết bị.","việc thực sự diễn ra: tỉnh giấc, rời giường hay tắt"),
 "study-work":M(["Nộp bài || hand in + assignment","Tra từ || look up + word","Ôn lại || go over + notes"],"Hand in là nộp, look up là tra cứu, go over là ôn tập; động từ giống nhưng mục đích hành động khác nhau.","hành động mà tân ngữ và ngữ cảnh học tập yêu cầu"),
 relationships:M(["Hòa thuận || get along with + person","Bất hòa || fall out with + person","Làm lành || make up with + person"],"Get along with khác fall out with về quan hệ; make up with đòi tình huống hai người đã có mâu thuẫn.","quan hệ đang tốt, đổ vỡ hay được hàn gắn"),
 travel:M(["Khởi hành || set off","Nhận phòng || check in at + place","Trả phòng || check out of + hotel"],"Check in nhận phòng khác check out trả phòng. Dấu hiệu room key và thời điểm đến/rời đi quyết định.","thời điểm di chuyển và thủ tục ở điểm đến"),
 problems:M(["Hỏng máy || break down","Giải ra đáp án || work out + answer","Xử lý rắc rối || sort out + problem"],"Break down nói về máy móc hỏng; work out tìm lời giải, sort out xử lý vấn đề hành chính.","loại sự cố hoặc vấn đề cần xử lý"),
 "money-shopping":M(["Tiết kiệm trước khi mua || save up for + item","Trả lại tiền đã vay || pay back + amount","Cắt giảm chi phí || cut back on + expense"],"Save up là dành dụm trước khi mua; pay back hoàn tiền đã vay; cut back on là giảm khoản chi.","tiền đang được tích lũy, hoàn trả hay giảm chi"),
 "word-order":M(["Tân ngữ it đứng giữa || turn + it + off","Tân ngữ her đứng giữa || pick + her + up","Tân ngữ it đứng giữa || put + it + away"],"Turn it off đúng vì đây là phrasal verb tách được; look after her không tách vì after là giới từ của cụm.","cụm động từ tách được hay không tách được và vị trí đại từ"),
 "advanced-idioms":M(["Ôn lại kỹ năng || brush up on + skill","Chịu đựng || put up with + nuisance","Coi thường || look down on + person"],"Brush up on là ôn lại điều đã biết; put up with là chịu đựng, còn look down on là coi thường người khác.","nghĩa thành ngữ của toàn cụm, không dịch từng từ")
},
8:{
 "mandative-verbs":M(["Recommend that || recommend + that + S + V nguyên mẫu","Suggest that || suggest + that + S + V nguyên mẫu","Demand that || demand + that + S + V nguyên mẫu"],"He get và the chair reconsider đều không thêm -s hay lùi thì vì đây là yêu cầu/đề xuất trong mệnh đề subjunctive.","động từ yêu cầu/đề xuất và dạng nguyên mẫu trong that-clause"),
 "mandative-be":M(["Be không đổi theo ngôi || that + S + be","Bị động subjunctive || that + S + be + V3","Yêu cầu bảo quản || that + S + be + V3"],"Every candidate be present và document be signed cùng dùng be nguyên mẫu; câu sau là bị động be + V3.","câu chủ động hay bị động trong mandative subjunctive"),
 "negative-subjunctive":M(["Phủ định động từ thường || that + S + not + V","Phủ định một hành động || that + S + not + V","Phủ định be || that + S + not be"],"Not talk và not be đều đặt not ngay trước động từ nguyên mẫu, không dùng doesn't trong kiểu mandative đang xét.","phủ định not đứng trước nguyên mẫu trong mệnh đề yêu cầu"),
 "adjective-subjunctive":M(["Essential that || It is essential that + S + V","Crucial that || It is crucial that + S + V","Important that || It is important that + S + V"],"Important that she make là khuyến nghị; không phải tất cả tính từ + that đều kích hoạt thức giả định.","tính từ diễn tả yêu cầu/sự cần thiết, không phải nhận định sự thật"),
 "were-unreal":M(["If I were || If + S + were, would + V","If she were || If + S + were, would + V","If he were || If + S + were, could + V"],"Were không đánh dấu quá khứ thời gian trong If I were you; nó đánh dấu tình huống trái thực tế.","giả định hiện tại và ngữ cảnh trang trọng"),
 "wish-present":M(["Không biết → ước biết || wish + S + V2","Không đủ cao → ước khác đi || wish + S + were","Không đủ thời gian → ước có || If only + S + V2"],"I wish I knew nói về điều không đúng ở hiện tại, không có nghĩa trước đây tôi đã biết.","hiện trạng không như mong muốn và quá khứ mang nghĩa giả định"),
 "wish-past":M(["Ước đã đi sớm || wish + S + had + V3","Hối tiếc không ôn tập || wish + S + had + V3","Ước đã không tiêu || If only + S + had not + V3"],"Wish I had left và wishes she had studied đều hối tiếc về sự việc quá khứ đã không xảy ra theo mong muốn.","việc thực tế đã qua và điều người nói muốn thay đổi"),
 "would-rather-high-time":M(["Mong người khác làm khác || would rather + S + V2","Đã đến lúc || It's high time + S + V2","Mong người khác nói thật || would rather + S + V2"],"I'd rather you stayed dùng V2 cho mong muốn hiện tại/tương lai; It's high time we ended hàm ý đã đến lúc hành động.","would rather cùng/khác chủ ngữ và nghĩa đã đến lúc")
}
};
const custom={
 "1/ed-endings":[
 ["worked /wɜːkt/","Trong worked, đuôi -ed được phát âm /t/.","Work kết thúc bằng /k/ vô thanh (không phải /t/), nên thêm -ed phát âm /t/."],
 ["played /pleɪd/","Trong played, đuôi -ed được phát âm /d/.","Play kết thúc bằng nguyên âm hữu thanh /eɪ/, nên đuôi -ed phát âm /d/."],
 ["wanted /ˈwɒntɪd/","Trong wanted, đuôi -ed được phát âm /ɪd/.","Want kết thúc bằng /t/, vì thế đuôi -ed tạo thêm một âm tiết /ɪd/."]
 ],
 "1/s-endings":[
 ["books /bʊks/","Trong books, đuôi -s được phát âm /s/.","Book kết thúc bằng /k/ vô thanh, nên đuôi -s phát âm /s/."],
 ["dogs /dɒɡz/","Trong dogs, đuôi -s được phát âm /z/.","Dog kết thúc bằng /ɡ/ hữu thanh, nên đuôi -s phát âm /z/."],
 ["buses /ˈbʌsɪz/","Trong buses, đuôi -es được phát âm /ɪz/.","Bus kết thúc bằng /s/, một âm xì, nên thêm -es tạo âm tiết /ɪz/."]
 ],
 "1/letter-combinations":[
 ["phone /fəʊn/","Trong phone, ph biểu thị âm /f/.","Ph trong phone đọc /f/, không phải /p/ hay /h/."],
 ["graph /ɡrɑːf/","Trong graph, ph biểu thị âm /f/.","Ph trong graph cũng đọc /f/; không nên phát âm cả hai chữ ph như hai phụ âm riêng."],
 ["chemistry /ˈkemɪstri/","Trong chemistry, ch biểu thị âm /k/.","Ch trong chemistry đọc /k/, khác ch /tʃ/ trong chair; cần kiểm tra theo từ cụ thể."]
 ]
};
function method(topic,s,plan){
 const focus=plan.focus;
 if(topic===1){
  if(s.id==="ed-endings"||s.id==="s-endings")return ["Đọc từ gốc và tìm âm cuối được phát ra trước hậu tố.","Xem âm đó thuộc nhóm vô thanh, hữu thanh hay âm cần thêm một âm tiết.","Đối chiếu đúng quy tắc với âm "+(s.id==="ed-endings"?"/t/, /d/, /ɪd/.":"/s/, /z/, /ɪz/.")];
  return ["Xác định từ hoặc phần chữ cần phát âm; đọc theo giọng Anh-Anh (BrE) của bài.","Tra hoặc nhận diện phiên âm IPA; tập trung vào "+focus+".","So sánh âm thực tế với những âm dễ nhầm, không suy từ cách viết đơn thuần."];
 }
 if(topic===2)return ["Xác định từ loại/hậu tố và tách đúng các âm tiết của từ.","Tìm trọng âm chính trong phiên âm hoặc từ chuẩn; chú ý "+focus+".","Đếm vị trí nhấn âm và kiểm tra ngoại lệ thay vì áp dụng quy tắc tuyệt đối."];
 if(topic===3)return ["Xác định mốc thời gian và tình huống đang được diễn tả: "+focus+".","Chọn thì/thể theo quan hệ thời gian và ý nghĩa, không chỉ dựa vào một từ dấu hiệu.","Chia trợ động từ và động từ chính theo chủ ngữ, rồi đọc lại cả câu."];
 if(topic===4)return ["Xác định động từ tường thuật và thời điểm phát ngôn gốc.","Kiểm tra "+focus+" để chọn cách lùi/giữ thì và đổi mốc tham chiếu.","Giữ trật tự câu gián tiếp, đại từ và ý nghĩa khi hoàn chỉnh câu."];
 if(topic===6)return ["Xác định tình huống giao tiếp: "+focus+".","Chọn đúng sắc thái modal và mốc thời gian, không chỉ dịch 'phải/có thể' máy móc.","Kiểm tra dạng động từ sau modal: V nguyên mẫu hoặc have + V3 khi suy đoán quá khứ."];
 if(topic===7)return ["Xác định tình huống và tân ngữ để hiểu hành động thực sự.","Đối chiếu nghĩa toàn cụm với mục đích ngữ cảnh: "+focus+".","Kiểm tra giới từ/hạt từ, vị trí tân ngữ và sắc thái của cụm."];
 return ["Tìm tín hiệu yêu cầu, giả định, ước muốn hoặc hối tiếc: "+focus+".","Chọn mẫu subjunctive hoặc dạng quá khứ giả định đúng quan hệ thời gian.","Kiểm tra động từ nguyên mẫu, were, V2 hay had + V3; tránh đổi nghĩa."];
}
function correctedSoundLine(topic,s,i,ex,pattern){
 if(topic===1){
  const m=ex.inverted.match(/“([^”]+)”[^.]*?(?:is\s+|represent\s+|pronounced\s+)(\/[^\/]+\/)/);
  if(m)return m[1]+" → "+m[2];
  return ex.inverted.replace(/\s+\./g,".");
 }
 if(topic===2){
  if(s.id==="noun-verb-shift")return pattern.formula;
  const m=ex.why.match(/“([^”]+)”(?:\s+\([^)]*\))?\s+đọc\s+([^\s:,.]+)/);
  if(m)return m[1]+" → "+m[2];
  return pattern.formula;
 }
 return ex.inverted;
}
function build(topic,section){
 const spec=plans[topic]?.[section.id];
 if(!spec||spec.items.length!==3||!spec.contrast||!spec.focus)throw Error("Missing foundation V1.1 plan: "+topic+"/"+section.id);
 if(section.examples.length!==10||section.vi.examples.length!==10||section.checks.length!==2)throw Error("Original lesson bank is incomplete "+topic+"/"+section.id);
 const overrides=custom[topic+"/"+section.id];
 const cases=spec.items.map((c,i)=>{
  const ex=section.examples[i],extra=overrides?.[i];
  const sentence=extra?.[0]||correctedSoundLine(topic,section,i,ex,c);
  const vi=extra?.[1]||ex.vi;
  const why=extra?.[2]||ex.why;
  return {name:c.name,formula:c.formula,sentence,vi,why};
 });
 const mistakes=[{
  title:"Lỗi thường gặp",rule:section.misconception,
  example:cases[0].sentence,vi:cases[0].vi
 },...(section.extras||[]).map(x=>({title:x.title,rule:x.rule,example:x.example,vi:x.vi}))];
 const compare=[cases[0].sentence,cases[1].sentence,spec.contrast];
 return {
   intro:section.learnV1?.meaning||section.concept,
   cases,
   steps:method(topic,section,spec),
   contrast:compare,
   pitfalls:mistakes,
   fullFormula:section.form||section.learnV1?.formula||"",
   formulaLabel:topic===1?"Mẫu âm và phiên âm IPA":topic===2?"Quy luật trọng âm và từ minh họa":topic===7?"Các cụm động từ trọng tâm":"Công thức tổng hợp",
   specialKind:topic===1?"pronunciation":topic===2?"stress":"grammar",
   introHeading:topic===1?"1. Nhận diện âm & cách phát âm":topic===2?"1. Nhận diện & cách đánh trọng âm":"1. Nhận diện & hiểu ý nghĩa",
   ruleHeading:topic===1?"2. Quy tắc âm & ví dụ":topic===2?"2. Quy tắc trọng âm & ví dụ":topic===7?"2. Cụm từ & ví dụ":"2. Công thức & ví dụ",
   methodTitle:({
     1:"3. Cách nhận diện âm đúng",
     2:"3. Cách xác định trọng âm",
     3:"3. Cách chọn thì phù hợp",
     4:"3. Cách phối hợp thì",
     6:"3. Cách chọn động từ khuyết thiếu",
     7:"3. Cách chọn phrasal verb",
     8:"3. Cách nhận diện thức giả định"
   })[topic]
 };
}
const report={};
for(const topic of [1,2,3,4,6,7,8]){
 const d=g["GrammarTopic"+topic+"Data"];
 if(!d?.sections||d.sections.length!==8)throw Error("Topic "+topic+" must load before Foundation V1.1");
 for(const s of d.sections){
  const v=build(topic,s);
  for(const c of v.cases)if(!c.name||!c.formula||!c.sentence||!c.vi||!c.why)throw Error("Missing bilingual worked example "+topic+"/"+s.id);
  for(const p of v.pitfalls)if(!p.rule||!p.example||!p.vi)throw Error("Incomplete pitfall "+topic+"/"+s.id);
  s.learnV11=v;
 }
 report[topic]=d.sections.length;
}
g.GrammarFoundationV11Applied=report;
})(window);