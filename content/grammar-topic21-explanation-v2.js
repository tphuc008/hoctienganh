/* Topic 21 · Exercise Explanation V2.
 * Author-curated Vietnamese meanings corresponding to each ORIGINAL answer.
 * Adds explanatory metadata only; no question, option, key or stored result changes.
 */
(function(g){
"use strict";
const d=g.GrammarTopic21Data;
if(!d?.reviewSets?.set1||!d?.reviewSets?.set2)throw Error("Load all Topic 21 question banks before Exercise Explanation V2.");
const meanings={
// Guided checks
l1q1:"Tôi chưa từng chứng kiến một màn trình diễn thuyết phục đến vậy.",
l1q2:"Học sinh này hiếm khi thay đổi câu trả lời sau khi nhận được góp ý.",
l2q1:"Trong bất kỳ trường hợp nào, thí sinh cũng không được chia sẻ đáp án.",
l2q2:"Nhóm nghiên cứu không chỉ xác định vấn đề mà còn đề xuất giải pháp.",
l3q1:"Chỉ khi các kết quả được công bố, các nhà nghiên cứu mới nhận ra quy mô của vấn đề.",
l3q2:"Chỉ khi cô ấy trở về, chúng tôi mới mở lá thư.",
l4q1:"Hội nghị vừa bắt đầu thì chuông báo cháy vang lên.",
l4q2:"Khách vừa đến thì buổi lễ bị gián đoạn.",
l5q1:"Nếu người quản lý biết về rủi ro từ trước, cô ấy đã hành động sớm hơn.",
l5q2:"Nếu cần thêm thông tin, vui lòng gửi email đến văn phòng.",
l6q1:"Bằng chứng thuyết phục đến mức bồi thẩm đoàn đưa ra phán quyết nhất trí.",
l6q2:"Quyết tâm của cô ấy lớn đến mức cả nhóm không chịu bỏ cuộc.",
l7q1:"Nó đến rồi.",
l7q2:"Chỉ có hiệu trưởng biết đầy đủ chi tiết vụ việc.",
l8q1:"Mai học vào ban đêm và tôi cũng vậy.",
l8q2:"Anh trai tôi không biết bơi và tôi cũng không.",
// Practice
p01:"Chúng tôi hiếm khi gặp trường hợp có ít bằng chứng đến vậy.",
p02:"Trước đó, tôi chưa từng nghe lời giải thích ấy.",
p03:"Tuyệt đối không được sao chép các tệp tin mật.",
p04:"Cô ấy không chỉ giải quyết vấn đề mà còn giải thích vấn đề đó.",
p05:"Chỉ sau khi mọi người ký thỏa thuận, dự án mới bắt đầu.",
p06:"Mãi đến khi đèn tắt, chúng tôi mới nhận thấy lời cảnh báo.",
p07:"Diễn giả vừa bắt đầu thì micro ngừng hoạt động.",
p08:"Các cửa vừa đóng thì đám đông bắt đầu reo hò.",
p09:"Nếu cô ấy nghiêm túc xem xét lời cảnh báo, có lẽ cô ấy đã tránh được tai nạn.",
p10:"Nếu tình hình trở nên xấu đi, cần phải hành động ngay lập tức.",
p11:"Lập luận của cô ấy thuyết phục đến mức ủy ban thay đổi quan điểm.",
p12:"Anh ấy kiên nhẫn đến mức mọi người đều ngưỡng mộ.",
p13:"Gần lối vào có một bức tượng đá cao.",
p14:"Chỉ Jenny biết mật khẩu.",
p15:"Mãi đến khi nhân chứng cuối cùng lên tiếng, sự thật mới lộ ra.",
p16:"Một sự việc vừa xảy ra thì sự việc khác xảy ra ngay sau đó.",
p17:"Mina làm việc từ xa và tôi cũng vậy.",
p18:"Họ chưa nhận được thông tin cập nhật và chúng tôi cũng chưa.",
p19:"Chỉ nhờ kiểm tra nguồn gốc, chúng tôi mới xác định được sai sót.",
p20:"Không chỉ học sinh mà cả giáo viên cũng tham dự.",
p21:"Mãi đến khi cuộc họp kết thúc, chúng tôi mới có thể đặt câu hỏi.",
p22:"Nếu không có sự giúp đỡ của bạn, tôi sẽ chẳng biết phải làm sao.",
p23:"Giáo viên giải thích hướng dẫn rõ đến mức không ai cần hỏi thêm.",
p24:"Cửa hàng vừa mở cửa thì khách hàng bắt đầu xếp hàng.",
// Mastery
m01:"Hiếm ai công khai chất vấn chủ tọa đến vậy.",
m02:"Ban tổ chức nào ngờ phía trước còn nhiều rắc rối đến vậy.",
m03:"Chỉ khi dữ liệu được kiểm tra độc lập, kết luận đó mới được chấp nhận.",
m04:"Kết quả vừa được công bố thì các ý kiến phản đối bắt đầu xuất hiện.",
m05:"Nếu đơn được nộp sớm hơn, nó có thể đã được xem xét.",
m06:"Tình trạng thiếu hụt nghiêm trọng đến mức một số bệnh viện phải giảm dịch vụ.",
m07:"Cô ấy đến rồi.",
m08:"Chỉ sau khi thí nghiệm kết thúc, các nhà nghiên cứu mới xem lại ghi chép.",
m09:"Nếu cần làm rõ, bạn có thể xem hướng dẫn trên mạng.",
m10:"Trong suốt phiên điều trần hôm qua, nhân chứng không hề khẳng định đã thấy nghi phạm.",
m11:"Mãi về sau người học mới phát hiện quy tắc tưởng đơn giản ấy có một ngoại lệ.",
m12:"Lara sẽ không nộp đơn năm nay và tôi cũng không.",
// Review set 1
s1m01:"Ủy ban hiếm khi thông qua thay đổi mà không thảo luận.",
s1m02:"Tôi chưa bao giờ chắc chắn đến vậy về một quyết định.",
s1m03:"Cô ấy hiếm khi phàn nàn về những sự chậm trễ.",
s1m04:"Người hướng dẫn chưa từng đề cập đến khoản phí bổ sung.",
s1n01:"Khách tham quan tuyệt đối không được chạm vào hiện vật.",
s1n02:"Tôi nào ngờ tuyến đường đã thay đổi từ trước.",
s1n03:"Không chỉ đạo diễn mà các diễn viên cũng bất ngờ.",
s1n04:"Nhân chứng không hề thay đổi lời khai vào bất kỳ thời điểm nào.",
s1o01:"Chỉ sau khi đèn tắt, chúng tôi mới nhận thấy những ngôi sao.",
s1o02:"Chỉ khi có giấy phép, các nhà nghiên cứu mới được phép vào hôm qua.",
s1o03:"Mãi đến khi chuông báo động vang lên, chúng tôi mới hiểu lời cảnh báo.",
s1o04:"Chỉ khi tàu dừng lại, hành khách mới có thể rời đi.",
s1t01:"Chúng tôi vừa ngồi xuống thì buổi biểu diễn bắt đầu.",
s1t02:"Cổng vừa mở thì đám đông tiến về phía trước.",
s1t03:"Bọn trẻ vừa ngủ thiếp đi thì sấm bắt đầu nổi.",
s1t04:"Bộ phim vừa bắt đầu thì đèn bị hỏng.",
s1c01:"Nếu biết việc hủy bỏ từ trước, tôi đã ở nhà.",
s1c02:"Nếu là người phụ trách, tôi sẽ hoãn cuộc họp.",
s1c03:"Nếu cô ấy không nói cho chúng tôi biết, chúng tôi đã lỡ hạn chót.",
s1c04:"Nếu bạn cần hỗ trợ, hãy liên hệ quầy lễ tân.",
s1s01:"Cô ấy giải thích quy trình rõ ràng đến mức không ai bị nhầm lẫn.",
s1s02:"Tác động lớn đến mức các quy định mới đã được ban hành.",
s1s03:"Nhiệm vụ khó đến mức không ai hoàn thành được.",
s1s04:"Âm nhạc quá to đến mức chúng tôi không thể nói chuyện.",
s1f01:"Trên sườn đồi có ba căn nhà nhỏ bị bỏ hoang.",
s1f02:"Phía trên khung cửa treo một chiếc đèn lồng.",
s1f03:"Nó đến rồi!",
s1f04:"Nó lăn xuống đồi.",
s1a01:"Họ chưa trả lời và tôi cũng chưa.",
s1a02:"Tôi kiệt sức và Tim cũng vậy.",
s1a03:"Nora không biết lái xe và tôi cũng không.",
s1a04:"A: Bạn đúng là lo lắng quá nhiều. B: Đúng vậy.",
// Review set 2
s2m01:"Nhóm an toàn hiếm khi bỏ sót những lỗi nhỏ.",
s2m02:"Bản báo cáo chưa bao giờ phù hợp với cuộc tranh luận đến thế.",
s2m03:"Anh ấy hầu như không bao giờ đến thăm thành phố.",
s2m04:"Cô ấy hiếm khi phải làm việc dưới áp lực lớn đến thế.",
s2n01:"Trong bất kỳ hoàn cảnh nào, nhân viên cũng không được tiết lộ hồ sơ mật.",
s2n02:"Khán giả không ngắt lời diễn giả dù chỉ một lần trong ngày hôm qua.",
s2n03:"Công ty không chỉ mở rộng khả năng tiếp cận mà còn giảm phí.",
s2n04:"Tôi nào ngờ cuộc hẹn đã bị hủy.",
s2o01:"Chỉ sau khi kiểm tra an ninh xong, khách mới được phép vào.",
s2o02:"Mãi đến tuần tiếp theo, cô ấy mới nhận được kết quả.",
s2o03:"Chỉ khi có tài khoản hợp lệ, người ta mới có thể truy cập dữ liệu.",
s2o04:"Chỉ khi đăng ký sớm, bạn mới có chỗ.",
s2t01:"Cuộc họp vừa kết thúc thì các tin nhắn bắt đầu gửi đến.",
s2t02:"Màn hình vừa tối đen thì chuông báo động vang lên.",
s2t03:"Khách vừa cởi áo khoác thì bữa tối được dọn lên.",
s2t04:"Diễn giả vừa đến thì khán giả đứng dậy.",
s2c01:"Nếu có bất kỳ thay đổi nào, chúng tôi sẽ gửi email cho bạn.",
s2c02:"Nếu không có bản sao lưu, chúng tôi đã mất các tệp tin.",
s2c03:"Nếu tôi là người quản lý, tôi sẽ thay đổi thời gian biểu.",
s2c04:"Nếu không có các đồng nghiệp, tôi sẽ gặp khó khăn.",
s2s01:"Tình trạng hỗn loạn nghiêm trọng đến mức ngay cả người giám sát cũng phải nhờ giúp đỡ.",
s2s02:"Cơn bão mạnh đến mức tàu thuyền phải ở lại cảng.",
s2s03:"Tình trạng thiếu hụt nghiêm trọng đến mức giá tăng gấp đôi.",
s2s04:"Chúng tôi giảm độ sáng đèn để khách có thể ngủ.",
s2f01:"Gần cây cầu cũ có một dãy nhà.",
s2f02:"Phía trên lối vào treo vài lá cờ.",
s2f03:"Đây rồi, kết quả bạn muốn có đây.",
s2f04:"Bên dòng sông có một nhà máy xay cũ.",
s2a01:"Sam không được mời và tôi cũng không được mời.",
s2a02:"Lina sẽ tham gia buổi hội thảo và tôi cũng vậy.",
s2a03:"Tôi không xem phim kinh dị và chị tôi cũng không.",
s2a04:"A: Tôi chưa đọc báo cáo. B: Tôi cũng chưa."
};
const explanations={
 l1q1:{solution:"Never have I witnessed such a convincing performance."},
 m10:{solution:"At no time during yesterday\'s hearing did the witness claim to have seen the suspect."},
 p06:{solution:"Not until the lights went out did we notice the warning."},
 p16:{solution:"No sooner + had + S + V3 + than + S + V2."},
 l7q2:{solution:"Only the head teacher knew the complete details of the incident."},
 s1a04:{solution:"A: You do worry too much. B: So I do."},
 s2a04:{solution:"A: I haven't read the report. B: Neither have I."}
};
const items=[
 ...d.sections.flatMap(s=>s.checks),...d.practice,...d.mastery,...d.reviewSets.set1,...d.reviewSets.set2
];
const ids=new Set(items.map(q=>q.id));
if(items.length!==116)throw Error("Unexpected question count: "+items.length);
for(const q of items){
 const value=meanings[q.id];
 if(!value||typeof value!=="string")throw Error("Vietnamese meaning missing: "+q.id);
 q.vi=value;
 if(explanations[q.id])Object.assign(q,explanations[q.id]);
}
for(const id of Object.keys(meanings))if(!ids.has(id))throw Error("Stale translation: "+id);
})(window);