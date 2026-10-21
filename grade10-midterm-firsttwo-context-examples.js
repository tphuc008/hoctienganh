/* Additional original bilingual examples for Test 1–2 cloze and reading questions.
 * Examples of malformed choices demonstrate the corrected construction.
 */
(function(g){
const rows=String.raw`
1-23|A|The choir sounded wonderful tonight.|Dàn hợp xướng nghe rất tuyệt tối nay.
1-23|B|The bells chimed at midnight.|Chuông ngân vào lúc nửa đêm.
1-23|C|Her name rings a bell, but I cannot remember where we met.|Tên cô ấy nghe rất quen nhưng tôi không nhớ gặp ở đâu.
1-23|D|The clock struck twelve.|Đồng hồ điểm mười hai giờ.
1-24|A|You can make great progress with regular practice.|Bạn có thể tiến bộ nhiều nếu luyện tập đều.
1-24|B|We do our homework after school.|Chúng tôi làm bài tập về nhà sau giờ học.
1-24|C|Take a short break after every hour of study.|Hãy nghỉ ngắn sau mỗi giờ học.
1-24|D|She got excellent results in the exam.|Cô ấy đạt kết quả xuất sắc trong kỳ thi.
1-25|A|Our school arranged a special live concert for parents.|Trường tổ chức buổi hòa nhạc trực tiếp đặc biệt cho phụ huynh.
1-25|B|The town is hosting a special live concert tonight.|Thị trấn tổ chức buổi hòa nhạc trực tiếp đặc biệt tối nay.
1-25|C|The singers performed live at a special concert.|Các ca sĩ biểu diễn trực tiếp trong buổi hòa nhạc đặc biệt.
1-25|D|A live concert special will be broadcast on television.|Một chương trình đặc biệt về hòa nhạc trực tiếp sẽ được phát sóng.
1-26|A|The company dumps waste into the river illegally.|Công ty xả rác trái phép xuống sông.
1-26|B|Workers are dumping waste into trucks now.|Công nhân đang đổ rác lên xe tải.
1-26|C|Some factories dump chemicals into waterways.|Một số nhà máy xả hóa chất xuống đường nước.
1-26|D|Large amounts of waste are dumped into the ocean each year.|Lượng lớn rác bị đổ ra biển mỗi năm.
1-27|A|Thankfully, everyone escaped the storm safely.|May mắn là mọi người thoát khỏi cơn bão an toàn.
1-27|B|Plastic is not destroyed quickly in the environment.|Nhựa không bị phân hủy nhanh trong môi trường.
1-27|C|Hundreds of years after disposal, some plastics still remain.|Hàng trăm năm sau khi bị bỏ đi, một số loại nhựa vẫn còn.
1-27|D|Instead, plastic can persist in the ocean for decades.|Thay vào đó, nhựa có thể tồn tại trong biển hàng thập kỷ.
1-28|A|When sea animals eat plastic, they may become ill.|Khi động vật biển ăn nhựa, chúng có thể bị bệnh.
1-28|B|When sea animals are eating, they may swallow plastic.|Khi động vật biển đang ăn, chúng có thể nuốt nhựa.
1-28|C|When a turtle eats plastic, it may become ill.|Khi một con rùa ăn nhựa, nó có thể bị bệnh.
1-28|D|When sea animals are eaten by predators, energy passes through the food chain.|Khi động vật biển bị kẻ săn mồi ăn thịt, năng lượng truyền qua chuỗi thức ăn.
1-29|A|Scientists discovered microplastics in seawater.|Các nhà khoa học phát hiện vi nhựa trong nước biển.
1-29|B|Microplastics, which are tiny plastic fragments, can enter the food chain.|Vi nhựa, vốn là mảnh nhựa nhỏ, có thể vào chuỗi thức ăn.
1-29|C|Researchers found microplastics in deep ocean water.|Các nhà nghiên cứu tìm được vi nhựa ở nước biển sâu.
1-29|D|Microplastics are tiny pieces of broken-down plastic.|Vi nhựa là những mảnh nhựa nhỏ đã phân rã.
1-30|A|The beach is popular, but the local shops are struggling.|Bãi biển nổi tiếng nhưng cửa hàng địa phương đang khó khăn.
1-30|B|You can recycle these bottles or reuse them.|Bạn có thể tái chế hoặc tái sử dụng chai này.
1-30|C|Plastic pollution harms marine animals and damages tourism.|Ô nhiễm nhựa hại động vật biển và du lịch.
1-30|D|The sea was polluted, so local businesses lost customers.|Biển bị ô nhiễm nên doanh nghiệp địa phương mất khách.
2-23|A|The organiser is holding a concert this weekend.|Ban tổ chức đang chuẩn bị hòa nhạc cuối tuần.
2-23|B|The club holds a singing contest every summer.|Câu lạc bộ tổ chức cuộc thi hát mỗi hè.
2-23|C|Our teachers hold a meeting every Monday.|Giáo viên họp mỗi thứ Hai.
2-23|D|The singing contest is held every year.|Cuộc thi hát được tổ chức hằng năm.
2-24|A|The audience gave the singer loud applause.|Khán giả dành tràng pháo tay lớn cho ca sĩ.
2-24|B|Professional musicians will judge the finalists.|Các nhạc sĩ chuyên nghiệp sẽ chấm thí sinh chung kết.
2-24|C|The crowd cheered for the winner.|Đám đông reo hò cổ vũ người thắng.
2-24|D|The band will perform on Friday.|Ban nhạc sẽ biểu diễn thứ Sáu.
2-25|A|The runner-up will receive a special prize.|Người về nhì nhận giải đặc biệt.
2-25|B|The audience enjoyed the performance.|Khán giả thích màn biểu diễn.
2-25|C|The judge asked for another song.|Giám khảo yêu cầu bài hát khác.
2-25|D|The organiser announced the results.|Ban tổ chức công bố kết quả.
2-26|A|Although the shoes are old, I still use them.|Dù giày đã cũ, tôi vẫn dùng.
2-26|B|Instead of buying a new phone, she repaired the old one.|Thay vì mua điện thoại mới, cô ấy sửa chiếc cũ.
2-26|C|In contrast, my brother prefers new clothes.|Ngược lại, em tôi thích quần áo mới.
2-26|D|I want to recycle, but the bins are full.|Tôi muốn tái chế nhưng thùng đã đầy.
2-27|A|These materials can be reused several times.|Những vật liệu này có thể được dùng lại nhiều lần.
2-27|B|Some materials can be used again and again.|Một số vật liệu có thể được dùng đi dùng lại.
2-27|C|We repair products so that materials can be used again and again.|Chúng tôi sửa đồ để vật liệu có thể dùng lại nhiều lần.
2-27|D|The materials used again and again eventually wear out.|Vật liệu được dùng nhiều lần cuối cùng cũng hỏng.
2-28|A|The manual explains how customers can fix their devices.|Sách hướng dẫn giải thích cách khách sửa thiết bị.
2-28|B|The centre is a place where people can repair phones.|Trung tâm là nơi người dân có thể sửa điện thoại.
2-28|C|Sunday is when most customers visit the centre.|Chủ Nhật là lúc nhiều khách tới trung tâm.
2-28|D|The reason why she repairs things is to reduce waste.|Lý do cô sửa đồ là để giảm rác.
2-29|A|They protected the river during last year's project.|Họ bảo vệ dòng sông trong dự án năm ngoái.
2-29|B|This policy protects natural habitats.|Chính sách này bảo vệ môi trường sống tự nhiên.
2-29|C|Protecting forests helps reduce emissions.|Bảo vệ rừng giúp giảm phát thải.
2-29|D|Small daily changes help protect our planet.|Thay đổi nhỏ hằng ngày giúp bảo vệ hành tinh.
2-30|A|If we all join in, our neighbourhood will be cleaner.|Nếu tất cả cùng tham gia, khu phố sẽ sạch hơn.
2-30|B|Despite the rain, we continued cleaning the park.|Bất chấp mưa, chúng tôi tiếp tục dọn công viên.
2-30|C|However, some people still waste water.|Tuy nhiên, một số người vẫn lãng phí nước.
2-30|D|We all join in, and we can improve our environment.|Tất cả cùng tham gia và chúng ta có thể cải thiện môi trường.
1-31|A|Music creates a cheerful atmosphere at a family celebration.|Âm nhạc tạo bầu không khí vui vẻ tại lễ gia đình.
1-31|B|Our school sometimes uses songs to teach pronunciation.|Trường đôi khi dùng bài hát để dạy phát âm.
1-31|C|Traditional songs help preserve cultural identity.|Bài hát truyền thống giúp giữ bản sắc văn hóa.
1-31|D|Charity concerts raise money for people in need.|Hòa nhạc từ thiện quyên tiền giúp người khó khăn.
1-32|A|New laws limit the number of cars in this area.|Luật mới hạn chế số ô tô trong khu vực.
1-32|B|Her performance surpassed everyone's expectations.|Màn trình diễn của cô vượt mọi kỳ vọng.
1-32|C|The river divides the city into two parts.|Dòng sông chia thành phố làm hai.
1-32|D|The course includes traditional music.|Khóa học bao gồm nhạc truyền thống.
1-33|A|Online platforms help musicians share their music.|Nền tảng trực tuyến giúp nghệ sĩ chia sẻ nhạc.
1-33|B|Many people enjoy live concerts.|Nhiều người thích hòa nhạc trực tiếp.
1-33|C|Young stars often attract fans online.|Ngôi sao trẻ thường thu hút fan trực tuyến.
1-33|D|Performers use their songs to connect with fans.|Nghệ sĩ biểu diễn dùng bài hát của mình để kết nối fan.
1-34|A|Music is important for entertainment and education.|Âm nhạc quan trọng với giải trí và giáo dục.
1-34|B|Traditional melodies are still performed today.|Các giai điệu truyền thống vẫn được biểu diễn ngày nay.
1-34|C|Music connects people from different backgrounds.|Âm nhạc kết nối người thuộc nhiều hoàn cảnh.
1-34|D|Live performances still attract large audiences.|Biểu diễn trực tiếp vẫn thu hút khán giả đông.
1-35|A|Online platforms help talented artists reach new listeners.|Nền tảng trực tuyến giúp nghệ sĩ tài năng tiếp cận người nghe mới.
1-35|B|Digital channels can turn unknown musicians into stars.|Kênh số có thể biến nghệ sĩ ít tên tuổi thành ngôi sao.
1-35|C|Famous musicians sometimes mentor young performers.|Nghệ sĩ nổi tiếng đôi khi cố vấn cho người trẻ.
1-35|D|Young performers use online platforms to find an audience.|Nghệ sĩ trẻ dùng nền tảng online tìm khán giả.
2-31|A|The festival included performers from overseas.|Lễ hội có nghệ sĩ từ nước ngoài.
2-31|B|Local musicians played traditional songs.|Nhạc sĩ địa phương chơi nhạc truyền thống.
2-31|C|Native plants grow naturally in this region.|Cây bản địa mọc tự nhiên vùng này.
2-31|D|The original recording was made decades ago.|Bản thu âm gốc được làm nhiều thập kỷ trước.
2-32|A|Indigenous communities had close ties with the land and wildlife.|Cộng đồng bản địa gắn bó với đất đai và động vật hoang dã.
2-32|B|Music can express people's connection to their homeland.|Âm nhạc có thể thể hiện sự gắn bó với quê hương.
2-32|C|Wildlife conservation benefits the whole community.|Bảo tồn động vật hoang dã mang lợi ích cho cộng đồng.
2-32|D|Music plays an important role in social life.|Âm nhạc có vai trò quan trọng trong đời sống xã hội.
2-33|A|Early people imitated sounds from nature in their music.|Con người thời xưa bắt chước âm thanh tự nhiên vào nhạc.
2-33|B|Some communities still perform indigenous music.|Một số cộng đồng vẫn chơi nhạc bản địa.
2-33|C|Some modern tracks feel less bouncy than songs from the 1980s.|Một số bản nhạc hiện đại ít sôi động hơn nhạc thập niên 1980.
2-33|D|Collaboration can make contemporary music more diverse.|Hợp tác có thể khiến nhạc đương đại đa dạng hơn.
2-34|A|Researchers verified the facts in the report.|Nhà nghiên cứu kiểm chứng dữ kiện trong báo cáo.
2-34|B|The band uses several traditional instruments.|Ban nhạc dùng nhiều nhạc cụ truyền thống.
2-34|C|Different cultures influence modern music.|Các nền văn hóa khác nhau ảnh hưởng nhạc hiện đại.
2-34|D|Modern music combines elements from several regions.|Nhạc hiện đại kết hợp yếu tố từ nhiều vùng.
2-35|A|Paragraph 1 introduces the history of music.|Đoạn 1 giới thiệu lịch sử âm nhạc.
2-35|B|Paragraph 2 describes indigenous musical traditions.|Đoạn 2 mô tả truyền thống nhạc bản địa.
2-35|C|Paragraph 3 compares today's rhythms with the 1980s.|Đoạn 3 so sánh nhịp điệu nay với thập niên 1980.
2-35|D|Paragraph 4 explains why music has become more complex.|Đoạn 4 giải thích tại sao âm nhạc phức tạp hơn.
`;
const examples={};
for(const row of rows.trim().split("\n")){
 const p=row.split("|");
 if(p.length===4)examples[p[0]+"-"+p[1]]={en:p[2],vi:p[3]};
}
g.G10_FIRSTTWO_CONTEXT_EXAMPLES=examples;
})(window);