
/* Robots and us — Grade 12 IELTS Reading (14 items, 20 minutes).
   Standalone, framework-free module. All correct answers/reviews are revealed only on submit. */
(function(){
"use strict";
const PATH="grade-12/reading/robots-and-us";
const STORE_BASE="grade12-robots-reading-v1";
function storeKey(){
 const uid=(typeof readLearnerSession==="function"?readLearnerSession()?.user?.id:null);
 return uid?STORE_BASE+"_"+uid:null;
}
const LIMIT=20*60;
const PASSAGE=["When asked ‘Should robots be used to colonise other planets?’, cosmology and astrophysics Professor Martin Rees said he believed the solar system would be mapped by robotic craft by the end of the century. ‘The next step would be mining of asteroids, enabling fabrication of large structures in space without having to bring all the raw materials from Earth. ... I think this is more realistic and benign than the ... “terraforming” of planets.’ He maintains that colonised planets ‘should be preserved with a status that is analogous to Antarctica here on Earth.’","On the question of using robots to colonise other planets and exploit mineral resources, engineering Professor Daniel Wolpert replied, ‘I don’t see a pressing need to colonise other planets unless we can bring these resources back to Earth. The vast majority of Earth is currently inaccessible to us. Using robots to gather resources nearer to home would seem to be a better use of our robotic tools.’ Meanwhile, for anthropology Professor Kathleen Richardson, the idea of ‘colonisation’ of other planets seemed morally dubious: ‘I think whether we do something on Earth or on Mars we should always do it in the spirit of a genuine interest in “the Other”, not to impose a particular model, but to meet “the Other”.’","In response to the second question, ‘How soon will machine intelligence outstrip human intelligence?’, Rees mentions robots that are advanced enough to beat humans at chess, but then goes on to say, ‘Robots are still limited in their ability to sense their environment: they can’t yet recognise and move the pieces on a real chessboard as cleverly as a child can. Later this century, however, their more advanced successors may relate to their surroundings, and to people, as adeptly as we do. Moral questions then arise. ... Should we feel guilty about exploiting sophisticated robots? Should we fret if they are underemployed, frustrated, or bored?’","Wolpert’s response to the question about machine intelligence outstripping human intelligence was this: ‘In a limited sense it already has. Machines can already navigate, remember and search for items with an ability that far outstrips humans. However, there is no machine that can identify visual objects or speech with the reliability and flexibility of humans.... Expecting a machine close to the creative intelligence of a human within the next 50 years would be highly ambitious.’","Richardson believes that our fear of machines becoming too advanced has more to do with human nature than anything intrinsic to the machines themselves. In her view, it stems from humans’ tendency to personify inanimate objects: we create machines based on representations of ourselves, imagine that machines think and behave as we do, and therefore see them as an autonomous threat. ‘One of the consequences of thinking that the problem lies with machines is that ... we tend to imagine they are greater and more powerful than they really are and subsequently they become so.’","This led on to the third question, ‘Should we be scared by advances in artificial intelligence?’ To this question, Rees replied, ‘Those who should be worried are the futurologists who believe in the so-called “singularity”. ... And another worry is that we are increasingly dependent on computer networks, and that these could behave like a single “brain” with a mind of its own, and with goals that may be contrary to human welfare. I think we should ensure that robots remain as no more than “idiot savants” lacking the capacity to outwit us, even though they may greatly surpass us in the ability to calculate and process information.’ Wolpert’s response was to say that we have already seen the damaging effects of artificial intelligence in the form of computer viruses. ‘But in this case,’ he says, ‘the real intelligence is the malicious designer. Critically, the benefits of computers outweigh the damage that computer viruses cause. Similarly, while there may be misuses of robotics in the near future, the benefits that they will bring are likely to outweigh these negative aspects.’","Richardson’s response to this question was this: ‘We need to ask why fears of artificial intelligence and robots persist; none have in fact risen up and challenged human supremacy.’ She believes that as robots have never shown themselves to be a threat to humans, it seems unlikely that they ever will. In fact, she went on, ‘Not all fear robots; many people welcome machine intelligence.’ In answer to the fourth question, ‘What can science fiction tell us about robotics?’, Rees replied, ‘I sometimes advise students that it’s better to read first-rate science fiction than second-rate science – more stimulating, and perhaps no more likely to be wrong.’","As his response, Wolpert commented, ‘Science fiction has often been remarkable at predicting the future. ... Science fiction has painted a vivid spectrum of possible futures, from cute and helpful robots to dystopian robotic societies. Interestingly, almost no science fiction envisages a future without robots.’ Finally, on the question of science fiction, Richardson pointed out that in modern society, people tend to think there is reality on the one hand, and fiction and fantasy on the other. She then explained that the division did not always exist, and that scientists and technologists made this separation because they wanted to carve out the sphere of their work. ‘But the divide is not so clear cut, and that is why the worlds seem to collide at times,’ she said. ‘In some cases, we need to bring these different understandings together to get a whole perspective. Perhaps then, we won’t be so frightened that something we create as a copy of ourselves will be a threat to us.’"];
const Q=[{"id":27,"type":"match","question":"For our own safety, humans will need to restrict the abilities of robots.","answer":"A","p":5,"quote":"we should ensure that robots remain as no more than “idiot savants”"},{"id":28,"type":"match","question":"The risk of robots harming us is less serious than humans believe it to be.","answer":"C","p":6,"quote":"as robots have never shown themselves to be a threat to humans, it seems unlikely that they ever will"},{"id":29,"type":"match","question":"It will take many decades for robot intelligence to be as imaginative as human intelligence.","answer":"B","p":3,"quote":"Expecting a machine close to the creative intelligence of a human within the next 50 years would be highly ambitious"},{"id":30,"type":"match","question":"We may have to start considering whether we are treating robots fairly.","answer":"A","p":2,"quote":"Should we feel guilty about exploiting sophisticated robots?"},{"id":31,"type":"match","question":"Robots are probably of more help to us on Earth than in space.","answer":"B","p":1,"quote":"Using robots to gather resources nearer to home would seem to be a better use of our robotic tools"},{"id":32,"type":"match","question":"The ideas in high-quality science fiction may prove to be just as accurate as those found in the work of mediocre scientists.","answer":"A","p":6,"quote":"better to read first-rate science fiction than second-rate science – more stimulating, and perhaps no more likely to be wrong."},{"id":33,"type":"match","question":"There are those who look forward to robots developing greater intelligence.","answer":"C","p":6,"quote":"many people welcome machine intelligence"},{"id":34,"type":"ending","question":"Richardson and Rees express similar views regarding the ethical aspect of ...","answer":"C","p":0,"quote":"should be preserved with a status that is analogous to Antarctica here on Earth."},{"id":35,"type":"ending","question":"Rees and Wolpert share an opinion about the extent of ...","answer":"B","p":3,"quote":"Machines can already navigate, remember and search for items"},{"id":36,"type":"ending","question":"Wolpert disagrees with Richardson on the question of ...","answer":"D","p":5,"quote":"the benefits that they will bring are likely to outweigh these negative aspects"},{"id":37,"type":"mcq","question":"What point does Richardson make about fear of machines?","answer":"B","p":4,"quote":"it stems from humans’ tendency to personify inanimate objects"},{"id":38,"type":"mcq","question":"What potential advance does Rees see as a cause for concern?","answer":"C","p":5,"quote":"these could behave like a single “brain” with a mind of its own"},{"id":39,"type":"mcq","question":"What does Wolpert emphasise in his response to the question about science fiction?","answer":"B","p":7,"quote":"almost no science fiction envisages a future without robots"},{"id":40,"type":"mcq","question":"What is Richardson doing in her comment about reality and fantasy?","answer":"C","p":7,"quote":"we need to bring these different understandings together to get a whole perspective"}];
const REVIEWS={"27":{"translation":"Vì sự an toàn của chính mình, con người sẽ cần giới hạn khả năng của robot.","evidence":[["F","these could behave like a single “brain” with a mind of its own, and with goals that may be contrary to human welfare","Rees lo mạng máy tính có thể hình thành mục tiêu riêng, đi ngược lợi ích con người."],["F","we should ensure that robots remain as no more than “idiot savants” lacking the capacity to outwit us","Ông đề nghị giữ robot ở mức không đủ khả năng qua mặt con người."]],"steps":["Từ khóa quyết định là ‘for our own safety’ và ‘restrict the abilities’: cần tìm người đề xuất giới hạn năng lực robot nhằm phòng ngừa rủi ro.","Rees nêu nguy cơ hệ thống máy tính có thể có mục tiêu bất lợi cho con người, rồi dùng ‘should ensure’ để đưa ra biện pháp phòng ngừa.","Giữ robot không thể ‘outwit us’ chính là một dạng hạn chế năng lực để bảo vệ lợi ích con người. Vì vậy chọn A – Martin Rees."],"options":[["A. Martin Rees",true,"Có khuyến nghị rõ ràng ‘should ensure’ và giới hạn robot không thể qua mặt con người."],["B. Daniel Wolpert",false,"Nhìn nhận nguy cơ bị lạm dụng nhưng kết luận lợi ích robot có khả năng lớn hơn tác hại; không yêu cầu chủ động giới hạn trí tuệ của chúng."],["C. Kathleen Richardson",false,"Cho rằng nỗi sợ robot thường vượt quá bằng chứng; không đề xuất áp đặt giới hạn năng lực để phòng vệ."]],"pairs":[["restrict the abilities of robots","remain as no more than ‘idiot savants’; lacking the capacity to outwit us"],["for our own safety","goals that may be contrary to human welfare"],["will need to","we should ensure"]],"caution":"‘Idiot savants’ ở đây mô tả máy có thể rất giỏi tính toán nhưng không được phép có khả năng vượt mặt con người; Rees không yêu cầu robot kém con người trong mọi kỹ năng."},"28":{"translation":"Nguy cơ robot gây hại cho chúng ta ít nghiêm trọng hơn mức con người vẫn nghĩ.","evidence":[["E","we tend to imagine they are greater and more powerful than they really are","Richardson chỉ ra xu hướng con người phóng đại sức mạnh của máy móc."],["G","as robots have never shown themselves to be a threat to humans, it seems unlikely that they ever will","Bà nhấn mạnh robot chưa chứng tỏ là mối đe dọa và xem khả năng đó là thấp."]],"steps":["Câu hỏi so sánh rủi ro robot thực sự gây hại với mức độ con người tin hoặc sợ rủi ro ấy.","Richardson lý giải nỗi sợ bằng sự nhân cách hóa máy móc và cho rằng ta thường tưởng tượng chúng mạnh hơn thực tế.","Nhận định robot chưa từng chứng minh là mối đe dọa củng cố ý rằng nỗi sợ lớn hơn bằng chứng hiện có. Chọn C – Kathleen Richardson."],"options":[["A. Martin Rees",false,"Đề cập nguy cơ mạng máy tính hình thành mục tiêu trái lợi ích con người và khuyên phòng ngừa; không nói nỗi sợ đã bị phóng đại."],["B. Daniel Wolpert",false,"Thừa nhận virus máy tính có thể gây hại rồi cân nhắc với lợi ích; không lập luận rằng con người đang đánh giá quá cao mối nguy robot."],["C. Kathleen Richardson",true,"Trực tiếp cho rằng con người tưởng tượng máy móc mạnh hơn thực tế và chưa có bằng chứng robot đe dọa con người."]],"pairs":[["less serious than humans believe","imagine they are greater and more powerful than they really are"],["risk of robots harming us","a threat to humans"],["probably less serious","it seems unlikely that they ever will"]],"caution":"Không suy ra Richardson chứng minh robot sẽ không bao giờ gây hại. ‘It seems unlikely’ là phán đoán có giới hạn, không phải sự bảo đảm tuyệt đối."},"29":{"translation":"Sẽ cần nhiều thập kỷ để trí tuệ robot có khả năng sáng tạo tương đương trí tuệ con người.","evidence":[["D","Machines can already navigate, remember and search for items with an ability that far outstrips humans","Wolpert thừa nhận máy vượt người ở một số tác vụ riêng lẻ."],["D","Expecting a machine close to the creative intelligence of a human within the next 50 years would be highly ambitious","Ông cho rằng kỳ vọng máy đạt gần trí tuệ sáng tạo con người trong 50 năm tới là rất khó."]],"steps":["Trọng tâm là ‘as imaginative as human intelligence’, không phải tốc độ xử lý hoặc trí nhớ.","Wolpert phân biệt năng lực vượt trội trong nhiệm vụ cụ thể với ‘creative intelligence’ và nêu mốc 50 năm để nhấn mạnh độ khó.","Ý ‘highly ambitious’ cho thấy năng lực sáng tạo ngang hoặc gần con người sẽ chưa dễ đạt được trong nhiều thập kỷ. Chọn B – Daniel Wolpert."],"options":[["A. Martin Rees",false,"Dự đoán robot cuối thế kỷ có thể tương tác linh hoạt với môi trường; không đưa ra nhận định tương ứng về trí tuệ sáng tạo trong 50 năm tới."],["B. Daniel Wolpert",true,"Nêu trực tiếp ‘creative intelligence’ và cho rằng tiến tới mức gần con người trong 50 năm là tham vọng rất lớn."],["C. Kathleen Richardson",false,"Bàn về xu hướng con người gán trí tuệ cho vật vô tri, không dự báo thời gian đạt năng lực sáng tạo tương đương người."]],"pairs":[["imaginative","creative"],["many decades","within the next 50 years"],["as imaginative as human intelligence","close to the creative intelligence of a human"]],"caution":"‘Highly ambitious’ không có nghĩa Wolpert khẳng định điều đó chắc chắn không thể xảy ra trong 50 năm. Đáp án tóm tắt quan điểm thận trọng về tiến độ phát triển."},"30":{"translation":"Chúng ta có thể sẽ phải bắt đầu cân nhắc liệu mình có đang đối xử công bằng với robot hay không.","evidence":[["C","Moral questions then arise.","Rees báo trước những vấn đề đạo đức mới khi robot trở nên tinh vi hơn."],["C","Should we feel guilty about exploiting sophisticated robots? Should we fret if they are underemployed, frustrated, or bored?","Ông đặt vấn đề liệu con người có nên áy náy khi khai thác robot và có nên quan tâm đến trạng thái của chúng."]],"steps":["‘Treating robots fairly’ yêu cầu tìm suy nghĩ về cách con người đối xử với robot, không phải hiệu quả công nghệ.","Rees đặt các câu hỏi ‘Should we feel guilty...?’ và ‘Should we fret...?’ sau khi dự báo robot tương tác tinh vi hơn.","Những câu hỏi đó chính là việc bắt đầu xem xét trách nhiệm đạo đức đối với robot. Chọn A – Martin Rees."],"options":[["A. Martin Rees",true,"Trực tiếp hỏi con người có nên cảm thấy có lỗi khi khai thác robot tinh vi hay không."],["B. Daniel Wolpert",false,"Đánh giá robot có lợi hay có hại cho con người; ông không bàn liệu chính robot có được đối xử công bằng."],["C. Kathleen Richardson",false,"Có lập luận đạo đức về việc con người áp đặt mô hình lên hành tinh khác, nhưng không phải sự công bằng đối với robot."]],"pairs":[["start considering","Moral questions then arise"],["treating robots fairly","feel guilty about exploiting sophisticated robots"],["we may have to","những câu hỏi ‘Should we...?’ về khả năng trong tương lai"]],"caution":"Đây là câu hỏi đạo đức mang tính giả định: Rees không kết luận robot đã có cảm xúc hay quyền lợi giống con người. Đừng nhầm ‘exploiting robots’ với việc robot đi khai thác tài nguyên."},"31":{"translation":"Robot có lẽ hữu ích cho chúng ta trên Trái Đất hơn là ngoài không gian.","evidence":[["B","The vast majority of Earth is currently inaccessible to us.","Wolpert nói con người còn nhiều nơi trên Trái Đất chưa tiếp cận được."],["B","Using robots to gather resources nearer to home would seem to be a better use of our robotic tools.","Theo ông, dùng robot thu thập tài nguyên gần Trái Đất là lựa chọn tốt hơn."]],"steps":["Cần tìm sự so sánh nơi sử dụng robot: trên Trái Đất và trong không gian.","Wolpert cho rằng khai thác các hành tinh khác không cấp thiết nếu tài nguyên không thể đưa về Trái Đất; trong khi Trái Đất vẫn còn nhiều vùng khó tiếp cận.","Vì thế ‘better use ... nearer to home’ tương đương quan điểm robot hiện có ích hơn khi phục vụ nhu cầu gần Trái Đất. Chọn B – Daniel Wolpert."],"options":[["A. Martin Rees",false,"Nghiêng về lập bản đồ hệ Mặt Trời và khai thác tiểu hành tinh; không ưu tiên việc dùng robot trên Trái Đất."],["B. Daniel Wolpert",true,"Nêu trực tiếp sự so sánh ‘a better use’ giữa khai thác gần nhà và thuộc địa hóa các hành tinh."],["C. Kathleen Richardson",false,"Phê phán tính đạo đức của tư duy ‘thuộc địa hóa’, không đưa ra đánh giá robot hữu ích hơn trên Trái Đất."]],"pairs":[["more help to us","a better use of our robotic tools"],["on Earth","nearer to home"],["probably","would seem to be"]],"caution":"Không diễn giải thành Wolpert phản đối hoàn toàn thám hiểm vũ trụ. Ông chỉ nói mục đích sử dụng robot nào thiết thực hơn trong điều kiện đang xét."},"32":{"translation":"Ý tưởng trong khoa học viễn tưởng chất lượng cao có thể chính xác ngang ý tưởng trong công trình của các nhà khoa học tầm thường.","evidence":[["G","better to read first-rate science fiction than second-rate science – more stimulating, and perhaps no more likely to be wrong.","Rees cho rằng khoa học viễn tưởng xuất sắc có thể không dễ sai hơn khoa học kém chất lượng."]],"steps":["Câu hỏi đối chiếu hai loại nội dung: ‘high-quality science fiction’ và nghiên cứu khoa học ở mức ‘mediocre’.","Rees trực tiếp so sánh ‘first-rate science fiction’ với ‘second-rate science’ và nói loại thứ nhất ‘perhaps no more likely to be wrong’.","‘Không có khả năng sai cao hơn’ có nghĩa trong phép so sánh này nó có thể chính xác ít nhất tương đương. Chọn A – Martin Rees."],"options":[["A. Martin Rees",true,"Phát biểu nguyên phép so sánh giữa khoa học viễn tưởng hạng nhất và khoa học hạng hai."],["B. Daniel Wolpert",false,"Khen khả năng dự báo của khoa học viễn tưởng, nhưng không so sánh độ chính xác với công trình của nhà khoa học trung bình/kém."],["C. Kathleen Richardson",false,"Bàn về ranh giới thực tế và hư cấu trong cách nhận thức, không đưa ra phép so sánh chất lượng này."]],"pairs":[["high-quality","first-rate"],["mediocre","second-rate"],["just as accurate","no more likely to be wrong"],["may prove to be","perhaps"]],"caution":"Rees chỉ nói ‘perhaps’: không khẳng định khoa học viễn tưởng luôn đúng hoặc mọi nghiên cứu khoa học hạng hai đều sai."},"33":{"translation":"Có những người mong đợi việc robot phát triển trí tuệ cao hơn.","evidence":[["G","Not all fear robots; many people welcome machine intelligence.","Richardson nhận xét không phải tất cả đều sợ robot; nhiều người chào đón trí tuệ máy."]],"steps":["Trọng tâm là thái độ tích cực của một số người đối với trí tuệ robot, không phải dự báo mức thông minh.","Richardson dùng ‘many people welcome’ để nêu sự đón nhận tích cực với machine intelligence.","‘There are those’ chỉ một bộ phận người, nên khớp với ‘many people’; ‘look forward to’ diễn đạt thái độ chào đón. Chọn C – Kathleen Richardson."],"options":[["A. Martin Rees",false,"Nói về khả năng robot tiến bộ nhưng chủ yếu đặt ra băn khoăn đạo đức hoặc biện pháp kiểm soát; không nói có nhiều người háo hức đón nhận."],["B. Daniel Wolpert",false,"Mô tả điểm mạnh của máy và triển vọng lợi ích, không nêu trực tiếp thái độ chào đón trí tuệ robot của một nhóm người."],["C. Kathleen Richardson",true,"Có câu ‘many people welcome machine intelligence’ đối ứng gần như trực tiếp với câu hỏi."]],"pairs":[["there are those","many people"],["look forward to","welcome"],["robots developing greater intelligence","machine intelligence"]],"caution":"Không đổi ‘many people’ thành ‘everyone’. Câu hỏi và dẫn chứng đều giới hạn nhận định ở một bộ phận người."},"34":{"translation":"Richardson và Rees có quan điểm tương đồng về khía cạnh đạo đức của ...","evidence":[["A","colonised planets ‘should be preserved with a status that is analogous to Antarctica here on Earth.’","Rees muốn các hành tinh được định cư vẫn được bảo tồn, không tùy tiện cải tạo theo mục đích con người."],["B","the idea of ‘colonisation’ of other planets seemed morally dubious","Richardson nghi ngại tính đúng đắn về đạo đức của việc thuộc địa hóa hành tinh."],["B","not to impose a particular model, but to meet “the Other”","Bà phản đối việc áp đặt mô hình của chúng ta lên một thế giới khác."]],"steps":["‘Express similar views’ đòi hỏi tìm điểm chung ở hai người, không phải một câu chỉ xuất hiện ở một người.","Rees chủ trương bảo tồn hành tinh; Richardson phản đối việc áp đặt mô hình con người khi tiếp cận hành tinh khác.","Điểm gặp nhau là lo ngại mặt đạo đức của việc biến đổi/khai thác hành tinh cho lợi ích của chúng ta. Chọn C – ‘changes made to other planets for our own benefit’."],"options":[["A. robots to explore outer space",false,"Rees đề cập tàu robot lập bản đồ hệ Mặt Trời, nhưng Richardson không cùng bàn về tính đạo đức của việc dùng robot thám hiểm không gian."],["B. advances made in machine intelligence so far",false,"Thuộc câu hỏi thứ hai về tiến bộ AI, không phải quan điểm đạo đức về hành tinh của hai người ở A–B."],["C. changes made to other planets for our own benefit",true,"Bao quát việc ‘terraforming’ và ‘colonisation’ theo nhu cầu con người mà cả Rees và Richardson đều thận trọng."],["D. the harm already done by artificial intelligence",false,"Thuộc tranh luận về tác hại AI ở các đoạn F–G, không phải hoạt động cải tạo hành tinh."]],"pairs":[["ethical aspect","morally dubious; should be preserved"],["changes made to other planets","terraforming; colonisation"],["for our own benefit","impose a particular model"]],"caution":"Không gán cho hai người cùng một lý do tuyệt đối. Rees nhấn mạnh bảo tồn, Richardson nhấn mạnh tôn trọng ‘the Other’; điểm chung nằm ở sự dè dặt với việc áp đặt lợi ích con người."},"35":{"translation":"Rees và Wolpert có cùng quan điểm về mức độ ...","evidence":[["C","Robots are still limited in their ability to sense their environment","Rees thừa nhận robot giỏi cờ vua nhưng chưa linh hoạt trong việc nhận biết thế giới thực."],["D","there is no machine that can identify visual objects or speech with the reliability and flexibility of humans","Wolpert cũng thấy rõ giới hạn trong nhận diện hình ảnh và lời nói."],["D","Machines can already navigate, remember and search for items with an ability that far outstrips humans","Tuy vậy, Wolpert ghi nhận tiến bộ ở các tác vụ riêng."]],"steps":["‘Share an opinion’ yêu cầu đối chiếu hai người; ‘extent of’ hỏi mức tiến bộ đã đạt được đến đâu.","Cả Rees và Wolpert đều nêu ví dụ máy vượt người ở một số nhiệm vụ rồi chỉ ra hạn chế khi tương tác hoặc nhận biết môi trường thực.","Họ cùng thừa nhận AI đã tiến bộ nhưng chưa có năng lực linh hoạt như người ở mọi mặt. Chọn B – ‘advances made in machine intelligence so far’."],"options":[["A. robots to explore outer space",false,"Rees và Wolpert có nói đến khai thác không gian nhưng quan điểm không giống nhau: Rees lạc quan hơn, Wolpert muốn ưu tiên tài nguyên gần nhà."],["B. advances made in machine intelligence so far",true,"Cùng đối chiếu khả năng hiện có của máy với các giới hạn còn tồn tại ở đoạn C–D."],["C. changes made to other planets for our own benefit",false,"Là điểm chung về đạo đức của Rees và Richardson, không phải điểm chung về trình độ máy giữa Rees và Wolpert."],["D. the harm already done by artificial intelligence",false,"Wolpert nói đến virus máy tính gây hại; Rees ở đoạn C–D không bàn tác hại đã xảy ra như điểm hai người cùng chia sẻ."]],"pairs":[["extent of","mức độ/giới hạn đạt được"],["advances made ... so far","can already ...; are still limited ..."],["share an opinion","cả hai cùng thừa nhận thế mạnh lẫn hạn chế"]],"caution":"‘Cùng quan điểm’ không đồng nghĩa dự đoán của họ giống hệt nhau. Điểm chung chỉ là AI đã tiến bộ đáng kể ở một số mặt nhưng còn hạn chế trong nhận thức linh hoạt."},"36":{"translation":"Wolpert bất đồng với Richardson về vấn đề ...","evidence":[["F","we have already seen the damaging effects of artificial intelligence in the form of computer viruses","Wolpert nêu virus máy tính như bằng chứng về tác hại đã xuất hiện của AI."],["F","the benefits of computers outweigh the damage that computer viruses cause","Ông thừa nhận tổn hại song cho rằng lợi ích lớn hơn tác hại."],["G","none have in fact risen up and challenged human supremacy","Richardson nhấn mạnh robot chưa nổi dậy thách thức vị thế thống trị của con người."]],"steps":["Đề hỏi điểm khác biệt trong cách hai người đánh giá ‘the harm already done’ — tác hại đã xảy ra — chứ không hỏi robot có thể nguy hiểm trong tương lai hay không.","Wolpert viện dẫn virus máy tính như ví dụ về thiệt hại thực tế. Richardson hoài nghi những nỗi sợ xoay quanh robot vì chưa có robot nào thách thức quyền kiểm soát của con người.","Hai người khác nhau ở trọng tâm và mức độ công nhận bằng chứng nguy hại hiện hữu: Wolpert nêu thiệt hại do hệ thống máy tính, Richardson phủ nhận bằng chứng robot nổi dậy. Trong các lựa chọn, D là phù hợp nhất."],"options":[["A. robots to explore outer space",false,"Quan điểm hai người về thuộc địa hóa ngoài không gian xuất hiện ở đoạn B, nhưng câu hỏi này đối chiếu phần họ nói về nỗi sợ và tác hại AI ở F–G."],["B. advances made in machine intelligence so far",false,"Phần về trình độ AI ở C–E không có đối lập rõ ràng bằng đối chiếu Wolpert/Richardson trong câu hỏi về tác hại."],["C. changes made to other planets for our own benefit",false,"Richardson bàn về đạo đức thuộc địa hóa; Wolpert nói tính thực dụng của thu thập tài nguyên, không phải điểm đối chiếu được nêu ở phần tác hại AI."],["D. the harm already done by artificial intelligence",true,"Wolpert nêu ví dụ AI đã gây thiệt hại; Richardson phản bác bức tranh robot như mối đe dọa đối với con người."]],"pairs":[["harm already done","have already seen the damaging effects"],["artificial intelligence","computer viruses (ví dụ được Wolpert sử dụng)"],["disagrees with","khác nhau trong đánh giá bằng chứng rủi ro đã xuất hiện"]],"caution":"Đây là sự đối lập về cách nhìn nhận và nhấn mạnh, không phải mâu thuẫn trực tiếp rằng Richardson phủ nhận virus máy tính gây hại. Bà nói robot chưa nổi dậy đe dọa quyền thống trị của loài người; hai phát biểu khác phạm vi nên phải đọc có chừng mực."},"37":{"translation":"Richardson đưa ra quan điểm gì về nỗi sợ máy móc?","evidence":[["E","it stems from humans’ tendency to personify inanimate objects","Bà truy nguyên nỗi sợ đến xu hướng nhân cách hóa những vật không có sự sống."],["E","imagine that machines think and behave as we do, and therefore see them as an autonomous threat","Con người tưởng máy nghĩ/hành động như mình nên xem chúng là đe dọa tự chủ."]],"steps":["Từ khóa ‘fear of machines’ yêu cầu nguyên nhân của nỗi sợ theo Richardson.","Bà giải thích chuỗi nhân quả: tạo máy dựa trên hình ảnh con người → gán suy nghĩ/hành vi con người cho máy → tưởng máy có ý chí riêng → cảm thấy bị đe dọa.","Đó chính là ‘attribute human characteristics to non-human entities’. Chọn B."],"options":[["A. It has grown alongside the development of ever more advanced robots.",false,"Bài không nói nỗi sợ tăng tỷ lệ với tốc độ robot tiến bộ; nguyên nhân bà nhấn mạnh nằm ở cách con người hình dung."],["B. It is the result of our inclination to attribute human characteristics to non-human entities.",true,"‘Attribute human characteristics’ diễn đạt trực tiếp ‘personify inanimate objects’."],["C. It has its origins in basic misunderstandings about how inanimate objects function.",false,"Có nét gần với việc nhận thức sai, nhưng chuyển trọng tâm thành thiếu hiểu biết cơ chế vận hành; Richardson nói về nhân cách hóa, không giải thích sai cấu tạo máy."],["D. It demonstrates a key difference between human and machine intelligence.",false,"Là nhận định về sự khác biệt trí tuệ, không phải lời giải thích nguồn gốc nỗi sợ."]],"pairs":[["attribute human characteristics","personify"],["non-human entities","inanimate objects"],["fear is the result of","it stems from"]],"caution":"C dễ gây nhiễu vì cùng nói đến ‘hiểu sai’. Hãy xác định đúng cơ chế: gán đặc tính của con người cho máy, không đơn thuần là không biết máy hoạt động thế nào."},"38":{"translation":"Rees cho rằng bước tiến nào có thể gây lo ngại?","evidence":[["F","these could behave like a single “brain” with a mind of its own, and with goals that may be contrary to human welfare","Rees lo các mạng máy tính kết hợp như một bộ não có ý chí/mục tiêu riêng, có thể trái lợi ích con người."]],"steps":["Đề hỏi ‘potential advance’ làm Rees lo ngại: tìm nguy cơ mới cụ thể, không chỉ năng lực máy hiện nay.","Ở đoạn F, ông không sợ máy tính toán giỏi hơn; ông sợ mạng lưới có thể hành động như một bộ não có ‘mind of its own’.","Đây là hình ảnh về năng lực tư duy hay mục tiêu độc lập của AI. Chọn C."],"options":[["A. robots outnumbering people",false,"Không có nhận định số lượng robot sẽ vượt số người trong lời Rees."],["B. robots having abilities which humans do not",false,"Rees chấp nhận máy vượt người trong tính toán; điều ông lo là tự chủ mục tiêu, không phải đơn thuần khác biệt kỹ năng."],["C. artificial intelligence developing independent thought",true,"Tương ứng với ‘a single brain with a mind of its own’."],["D. artificial intelligence taking over every aspect of our lives",false,"Phóng đại từ nguy cơ lệ thuộc mạng máy tính thành kiểm soát mọi mặt đời sống; tác giả không đưa ra khẳng định ấy."]],"pairs":[["independent thought","a mind of its own"],["cause for concern","goals that may be contrary to human welfare"],["potential advance","these could behave like a single ‘brain’"]],"caution":"Rees nêu kịch bản khả dĩ qua ‘could’ và ‘may’; không nói AI đã có tư duy độc lập hoặc chắc chắn chiếm quyền kiểm soát toàn bộ xã hội."},"39":{"translation":"Wolpert nhấn mạnh điểm nào khi trả lời về khoa học viễn tưởng?","evidence":[["H","Science fiction has painted a vivid spectrum of possible futures, from cute and helpful robots to dystopian robotic societies.","Ông nói hình tượng robot đa dạng: có thể hữu ích hoặc dẫn đến viễn cảnh đen tối."],["H","almost no science fiction envisages a future without robots","Gần như không tác phẩm khoa học viễn tưởng nào hình dung một tương lai vắng bóng robot."]],"steps":["Câu hỏi hỏi điều Wolpert ‘emphasise’, tức ý được rút ra từ ví dụ chứ không phải chọn một chi tiết đúng bất kỳ.","Ông kể hàng loạt tương lai rất khác nhau, nhưng chốt lại rằng gần như không có viễn cảnh nào không xuất hiện robot.","Sự hiện diện xuyên suốt bất kể hình tượng chính là vai trò trung tâm của robot đối với thể loại khoa học viễn tưởng. Chọn B."],"options":[["A. how science fiction influences our attitudes to robots",false,"Đoạn này không phân tích tác động của truyện/phim lên thái độ độc giả, dù có các hình tượng tích cực và tiêu cực."],["B. how fundamental robots are to the science fiction genre",true,"Rút ra chính xác từ ‘almost no science fiction envisages a future without robots’."],["C. how the image of robots in science fiction has changed over time",false,"Wolpert liệt kê các kiểu viễn cảnh khác nhau, không mô tả hình tượng robot đã biến đổi theo từng thời kỳ."],["D. how reactions to similar portrayals of robots in science fiction may vary",false,"Không có đối chiếu phản ứng của các nhóm khán giả đối với cùng hình tượng robot."]],"pairs":[["fundamental to the genre","almost no science fiction envisages a future without robots"],["variety of portrayals","a vivid spectrum of possible futures"],["emphasise","ý kết luận rút ra từ các ví dụ"]],"caution":"Chi tiết ‘remarkable at predicting the future’ cũng có trong đoạn, nhưng không tương ứng với các lựa chọn khác. Đừng nhầm ‘đa dạng viễn cảnh’ với ‘thay đổi theo thời gian’."},"40":{"translation":"Richardson đang làm gì trong nhận xét về thực tế và thế giới tưởng tượng?","evidence":[["H","But the divide is not so clear cut","Bà nói ranh giới thực tế và hư cấu không sắc nét như ta tưởng."],["H","we need to bring these different understandings together to get a whole perspective","Bà đề nghị kết hợp các cách hiểu để có cái nhìn toàn diện hơn."]],"steps":["Câu hỏi ‘What is Richardson doing...?’ yêu cầu xác định chức năng lập luận của lời nói: mô tả, cảnh báo hay đề xuất.","Richardson trước hết chỉ ra sự phân tách thực tế và hư cấu do con người hình thành, rồi dùng ‘we need to’ để đề xuất kết hợp hai cách hiểu.","Động từ khuyến nghị và mục tiêu ‘a whole perspective’ chứng minh bà đang đề xuất thay đổi cách tiếp cận. Chọn C."],"options":[["A. warning people not to confuse one with the other",false,"Ngược ý: bà không muốn giữ ranh giới thật–ảo tách biệt cứng nhắc mà muốn xem chúng trong quan hệ với nhau."],["B. outlining ways in which one has impacted on the other",false,"Bà không đưa các cách thực tế tác động lên hư cấu hay ngược lại; bà đề xuất nối kết hai cách hiểu."],["C. recommending a change of approach in how people view them",true,"Khớp trực tiếp với ‘we need to bring these different understandings together’."],["D. explaining why scientists have a different perspective on them from other people",false,"Bà có nhắc nhà khoa học từng tạo ra sự phân chia, nhưng đó là bối cảnh, không phải mục đích chính trong lời kết."]],"pairs":[["recommending","we need to"],["a change of approach","bring these different understandings together"],["a broader view","a whole perspective"]],"caution":"Câu D chứa chi tiết có thật về nhà khoa học, nên là bẫy ‘đúng chi tiết, sai trọng tâm’. Hãy tìm hành động tác giả muốn người nghe thực hiện, không chỉ thông tin nền."}};
const CHOICES={"37":{"A":"It has grown alongside the development of ever more advanced robots.","B":"It is the result of our inclination to attribute human characteristics to non-human entities.","C":"It has its origins in basic misunderstandings about how inanimate objects function.","D":"It demonstrates a key difference between human and machine intelligence."},"38":{"A":"robots outnumbering people","B":"robots having abilities which humans do not","C":"artificial intelligence developing independent thought","D":"artificial intelligence taking over every aspect of our lives"},"39":{"A":"how science fiction influences our attitudes to robots","B":"how fundamental robots are to the science fiction genre","C":"how the image of robots in science fiction has changed over time","D":"how reactions to similar portrayals of robots in science fiction may vary"},"40":{"A":"warning people not to confuse one with the other","B":"outlining ways in which one has impacted on the other","C":"recommending a change of approach in how people view them","D":"explaining why scientists have a different perspective on them from other people"}};
let state=null;
let timer=null;
let selection=null;
function el(id){return document.getElementById(id)}
function html(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function read(){try{const key=storeKey();return key?JSON.parse(localStorage.getItem(key)||"null"):null}catch(e){return null}}
function save(){
 try{const key=storeKey();if(key)localStorage.setItem(key,JSON.stringify(state))}catch(e){}
 if(state&&LearningCore.userId())LearningFlow.track({
   category:"reading",slug:PATH,started:true,startedAt:state.startedAt,
   done:Q.filter(answered).length,total:Q.length,completed:!!state.submitted,mode:"submit"
 });
}
function cleaned(s){return String(s||"").trim().replace(/\s+/g," ").toLowerCase()}
function correct(q){return cleaned(state.answers[q.id])===cleaned(q.answer)}
function answered(q){return !!cleaned(state.answers[q.id])}
function mmss(sec){sec=Math.max(0,Math.floor(sec));return String(Math.floor(sec/60)).padStart(2,"0")+":"+String(sec%60).padStart(2,"0")}
function remaining(){return Math.max(0,Math.ceil((state.startedAt+LIMIT*1000-Date.now())/1000))}
function completed(){return Q.filter(answered).length}
function score(){return Q.filter(correct).length}
function stopTimer(){if(timer!==null){clearInterval(timer);timer=null}}
function tick(){
 if(!state||!el("mis-clock"))return;
 const seconds=remaining();
 el("mis-clock").textContent=state.submitted?mmss((state.submittedAt-state.startedAt)/1000):mmss(seconds);
 el("mis-clock").classList.toggle("warning",!state.submitted&&seconds<=120);
 if(seconds<=0&&!state.submitted)submit(true);
}
function newSubmissionId(){
 if(window.crypto&&typeof window.crypto.randomUUID==="function")return window.crypto.randomUUID();
 return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(ch){
  const r=Math.floor(Math.random()*16);
  return (ch==="x"?r:(r&3|8)).toString(16);
 });
}
function fresh(){
 return {startedAt:Date.now(),submitted:false,submittedAt:null,answers:{},focus:27,highlights:[],mobileTab:"reading",split:52,submissionId:newSubmissionId()};
}
function exitPage(){
 if(state&&!state.submitted&&!window.confirm("Bạn muốn thoát bài đang làm? Tiến độ và thời gian sẽ vẫn được lưu trong tab này."))return;
 location.hash="grade-12/reading";
}
function start(reset){
 const old=read();
 if(reset&&old&&!old.submitted&&!window.confirm("Làm lại từ đầu? Câu trả lời đã nhập và thời gian hiện tại sẽ bị xóa."))return;
 if(reset)LearningFlow.reset("reading",PATH);
 state=reset||!old?fresh():old;
 // A previous page may have closed while the network request was in flight.
 // Re-enable the idempotent save attempt when reopening an unsaved submission.
 if(state.submitted&&!state.savedToSupabase)state.savingToSupabase=false;
 save();renderReader();
}
function continueReading(){start(false)}
function resetReading(){start(true)}
function switchTab(tab){
 if(!el("mis-app"))return;
 state.mobileTab=tab==="reading"?"reading":"questions";
 el("mis-app").dataset.tab=state.mobileTab;
 document.querySelectorAll(".mis-mobile-switch button").forEach(function(btn){btn.classList.toggle("active",btn.dataset.tab===state.mobileTab)});
 save();
}
function markText(text,p){
 const marks=[];
 (state.highlights||[]).filter(function(x){return x.p===p}).forEach(function(x){
  let pos=text.indexOf(x.text);
  if(pos>=0)marks.push({start:pos,end:pos+x.text.length,kind:"user"});
 });
 if(state.submitted){
  const q=Q.find(function(x){return x.id===Number(state.focus)});
  if(q&&q.p===p){let pos=text.indexOf(q.quote);if(pos>=0)marks.push({start:pos,end:pos+q.quote.length,kind:"evidence"})}
 }
 marks.sort(function(a,b){return a.start-b.start||(a.kind==="evidence"?-1:1)});
 let result="",pos=0;
 marks.forEach(function(m){
  if(m.start<pos)return;
  result+=html(text.slice(pos,m.start));
  result+='<mark class="'+(m.kind==="evidence"?"mis-evidence":"")+'">'+html(text.slice(m.start,m.end))+"</mark>";
  pos=m.end;
 });
 return result+html(text.slice(pos));
}
function passageHTML(){
 return '<div class="mis-kicker">IELTS Academic Reading · Passage 3</div><h1 class="mis-passage-title">Robots and us</h1>'+
 '<div class="mis-passage-sub">Reading Passage · Paragraphs A–H</div>'+
 '<div class="mis-reading-tools"><button type="button" onclick="robotsHighlight()">✎ Highlight</button><button type="button" onclick="robotsDictionary()">⚑ Tra từ (Cambridge)</button></div>'+
 '<div class="mis-selection-status" id="mis-selection-status">Chọn một đoạn chữ, sau đó nhấn Highlight hoặc Tra từ.</div>'+
 PASSAGE.map(function(p,i){return '<p class="mis-paragraph'+(state.submitted&&Q.some(function(q){return q.id===Number(state.focus)&&q.p===i})?" mis-current-para":"")+'" id="mis-p-'+i+'" data-p="'+i+'"><strong>'+String.fromCharCode(65+i)+'.</strong> '+markText(p,i)+'</p>'}).join("")+'<p class="mis-footnotes"><em>* terraforming: modifying a planet’s atmosphere to suit human needs. ** singularity: the point when robots will be able to start creating ever more sophisticated versions of themselves.</em></p>';
}
function optionsHTML(q){
 const opts=q.type==="match"?["A","B","C"]:q.type==="ending"?["A","B","C","D"]:q.type==="mcq"?["A","B","C","D"]:["YES","NO","NOT GIVEN"];
 return '<div class="mis-options" role="group" aria-label="Câu '+q.id+'">'+opts.map(function(o){
  const picked=cleaned(state.answers[q.id])===cleaned(o);
  const solution=state.submitted&&o===q.answer;
  const wrong=state.submitted&&picked&&!solution;
  return '<button type="button" class="mis-option'+(solution?" mis-answer-correct":"")+(wrong?" mis-answer-wrong":"")+'" data-option="'+html(o)+'" aria-pressed="'+picked+'" '+(state.submitted?'disabled ':'')+'onclick="robotsSetChoice('+q.id+',\''+o+'\')">'+html(o)+(CHOICES[q.id]&&CHOICES[q.id][o]?' <span class="mis-option-text">'+html(CHOICES[q.id][o])+'</span>':'')+'</button>';
 }).join("")+"</div>";
}
function reviewHTML(q){
 if(!state.submitted)return "";
 const r=REVIEWS[q.id];
 const evidence=r.evidence.map(function(e){return '<div class="mis-review-evidence"><strong>Đoạn '+html(e[0])+'</strong><blockquote>“'+html(e[1])+'”</blockquote><p>'+html(e[2])+'</p></div>';}).join("");
 const steps=r.steps.map(function(step,i){return '<li><strong>Bước '+(i+1)+':</strong> '+html(step)+'</li>';}).join("");
 const options=r.options.map(function(o){return '<li class="'+(o[1]?'mis-review-option-correct':'mis-review-option-wrong')+'"><strong>'+(o[1]?'✓ ':'✕ ')+html(o[0])+'</strong><div>'+html(o[2])+'</div></li>';}).join("");
 const pairs=r.pairs.map(function(pair){return '<li><strong>'+html(pair[0])+'</strong> ↔ '+html(pair[1])+'</li>';}).join("");
 return '<div class="mis-review'+(correct(q)?"":" wrong")+'">'+
 '<h3>'+(correct(q)?"✓ Chính xác":"✕ Chưa chính xác")+' · Đáp án: '+html(q.answer)+'</h3>'+
 '<p class="mis-review-student"><strong>Bạn chọn:</strong> '+html(answered(q)?state.answers[q.id]:"(chưa trả lời)")+'</p>'+
 '<p class="mis-review-translation"><strong>Dịch câu hỏi:</strong> '+html(r.translation)+'</p>'+
 '<section class="mis-review-section"><h4>1. Dẫn chứng trong bài đọc</h4>'+evidence+'</section>'+
 '<section class="mis-review-section"><h4>2. Phân tích logic để chọn đáp án</h4><ol>'+steps+'</ol></section>'+
 '<section class="mis-review-section"><h4>3. Phân tích từng đáp án</h4><ul class="mis-review-options">'+options+'</ul></section>'+
 '<section class="mis-review-section"><h4>4. Paraphrase cần ghi nhớ</h4><ul class="mis-review-pairs">'+pairs+'</ul></section>'+
 '<section class="mis-review-section"><h4>5. Bẫy tư duy / giới hạn suy luận</h4><p>'+html(r.caution)+'</p></section>'+
 '<button type="button" class="mis-tool" style="margin-top:9px" onclick="robotsGoQuestion('+q.id+')">↖ Tô sáng dẫn chứng chính trong bài đọc</button></div>';
}
function questionHTML(q){
 return '<article class="mis-q-card'+(Number(state.focus)===q.id?" mis-focus":"")+'" id="mis-q-'+q.id+'">'+
 '<p class="mis-question-text"><span class="mis-num">'+q.id+'</span> '+html(q.question)+'</p>'+
 optionsHTML(q)+reviewHTML(q)+'</article>';
}
function inputHTML(q){
 let v=state.answers[q.id]||"";
 return '<div class="mis-q-card'+(Number(state.focus)===q.id?" mis-focus":"")+'" id="mis-q-'+q.id+'">'+
 '<p class="mis-question-text"><span class="mis-num">'+q.id+'</span> '+html(q.question)+'</p>'+
 '<div class="mis-flow-row"><label for="mis-in-'+q.id+'">Answer</label><input id="mis-in-'+q.id+'" class="mis-input" maxlength="60" autocomplete="off" spellcheck="false" placeholder="NO MORE THAN TWO WORDS" value="'+html(v)+'" '+(state.submitted?"disabled":"")+' oninput="robotsSetInput('+q.id+',this.value)" /></div>'+
 reviewHTML(q)+'</div>';
}
function diagramHTML(){
 return '<div class="mis-diagram-scroll" aria-label="Sơ đồ Marketing Information System có 4 ô trống 37 đến 40">'+
 '<svg class="mis-diagram" viewBox="0 0 920 420" role="img" aria-label="Sơ đồ quy trình MIS với bốn chỗ trống đánh số 37, 38, 39 và 40." xmlns="http://www.w3.org/2000/svg">'+
 '<defs><marker id="mis-arr" markerWidth="12" markerHeight="12" refX="9" refY="6" orient="auto"><path d="M1 1L11 6L1 11Z" fill="#171717"/></marker></defs>'+
 '<text x="460" y="33" text-anchor="middle" font-size="23" font-weight="700" fill="#171717">The Marketing Information System (MIS)</text>'+
 '<g fill="white" stroke="#262626" stroke-width="2"><rect x="25" y="90" width="136" height="285"/><rect x="245" y="90" width="184" height="165"/><rect x="521" y="90" width="375" height="165"/><rect x="245" y="290" width="184" height="86"/><rect x="521" y="290" width="375" height="86"/></g>'+
 '<g fill="none" stroke="#181818" stroke-width="8" marker-end="url(#mis-arr)"><path d="M176 173H219"/><path d="M439 173H493"/><path d="M709 263V280"/><path d="M512 338H450"/><path d="M234 338H178"/></g>'+
 '<g fill="#151515" font-family="Arial, sans-serif" font-size="21"><text x="45" y="250" font-weight="700">37 _____</text>'+
 '<text x="261" y="154">Find out their</text><text x="261" y="191" font-weight="700">38 _____</text>'+
 '<text x="538" y="126">Developed through:</text><text x="550" y="162" font-weight="700">•   39 _____</text>'+
 '<text x="550" y="194" font-size="19">•   marketing intelligence activities</text>'+
 '<text x="550" y="228">•   research process</text>'+
 '<text x="260" y="322" font-size="18">Timely and</text><text x="260" y="342" font-size="18">accurate data</text><text x="260" y="362" font-size="18">distribution</text>'+
 '<text x="540" y="340">Processed by the  <tspan font-weight="700">40 _____</tspan></text></g></svg></div>';
}
function questionsHTML(){
 const resultHead=state.submitted?
 '<div class="mis-results-banner"><strong>'+score()+'/14 câu đúng</strong><div>Thời gian làm bài: '+mmss((state.submittedAt-state.startedAt)/1000)+' · Nhấn vào số câu ở thanh dưới để xem bằng chứng và lời giải.</div></div>':"";
 const matching=Q.filter(function(q){return q.type==="match"}).map(questionHTML).join("");
 const endings=Q.filter(function(q){return q.type==="ending"}).map(questionHTML).join("");
 const mcq=Q.filter(function(q){return q.type==="mcq"}).map(questionHTML).join("");
 const blanks=Q.filter(function(q){return q.type==="input"}).map(inputHTML).join("");
 return resultHead+
 '<section class="mis-q-section"><h2>Questions 27–33</h2><p class="mis-q-instruction"><strong>Matching Features.</strong> Match each statement with A Martin Rees, B Daniel Wolpert or C Kathleen Richardson. You may use each letter more than once.</p>'+matching+'</section>'+
 '<section class="mis-q-section"><h2>Questions 34–36</h2><p class="mis-q-instruction"><strong>Matching Sentence Endings.</strong> Choose A–D.</p><div class="mis-answer-bank"><p><strong>A</strong> robots to explore outer space.</p><p><strong>B</strong> advances made in machine intelligence so far.</p><p><strong>C</strong> changes made to other planets for our own benefit.</p><p><strong>D</strong> the harm already done by artificial intelligence.</p></div>'+endings+'</section>'+
 '<section class="mis-q-section"><h2>Questions 37–40</h2><p class="mis-q-instruction"><strong>Multiple Choice.</strong> Choose A, B, C or D.</p>'+mcq+'</section>';
}
function navHTML(){
 return Q.map(function(q){return '<button id="mis-nav-'+q.id+'" type="button" class="mis-jump" onclick="robotsGoQuestion('+q.id+')" aria-label="Đến câu '+q.id+'">'+q.id+'</button>'}).join("");
}
function ensureMISRoot(){
 let root=el("mis-reading-root");
 if(!root){
  root=document.createElement("div");
  root.id="mis-reading-root";
  document.body.appendChild(root);
 }
 return root;
}
function renderReader(){
 stopTimer();selection=null;document.body.classList.add("mis-reading-mode");
 const page=el("pageMount");if(page)page.style.display="none";
 const mount=ensureMISRoot();
 mount.innerHTML='<div id="mis-app" class="mis-app" data-tab="'+html(state.mobileTab||"questions")+'">'+
 '<header class="mis-topbar"><div class="mis-top-left"><button class="mis-exit" aria-label="Thoát bài Reading" onclick="robotsExit()">×</button><div><div class="mis-title">Robots and us</div><div class="mis-subtitle">IELTS Academic Reading · Passage 3 · Questions 27–40</div></div></div>'+
 '<div class="mis-top-mid"><span class="mis-clock" id="mis-clock">20:00</span><span class="mis-score-mini" id="mis-status"></span><span id="readingFlowStatus"></span><span class="mis-save-status" id="mis-save-status" role="status"></span></div>'+
 '<div class="mis-top-actions">'+
 (state.submitted?'<button type="button" class="mis-submit" onclick="robotsReset()">Làm lại bài ↻</button><button type="button" class="mis-save-retry" id="mis-save-retry" onclick="robotsSaveSubmission()" hidden>Lưu lại</button>':'<button type="button" class="mis-submit" onclick="robotsSubmit(false)">Nộp bài →</button>')+
 '</div></header>'+
 '<div class="mis-mobile-switch"><button type="button" data-tab="reading" class="'+((state.mobileTab||"questions")==="reading"?"active":"")+'" onclick="robotsSwitchTab(\'reading\')">Bài đọc</button><button type="button" data-tab="questions" class="'+((state.mobileTab||"questions")==="questions"?"active":"")+'" onclick="robotsSwitchTab(\'questions\')">Câu hỏi</button></div>'+
 '<div class="mis-workspace" id="mis-layout" style="grid-template-columns:minmax(320px,'+Number(state.split||52)+'fr) 8px minmax(320px,'+(100-Number(state.split||52))+'fr)">'+
 '<div class="mis-left" id="mis-passage-pane">'+passageHTML()+'</div><div class="mis-divider" id="mis-divider" title="Kéo để điều chỉnh độ rộng hai cột" role="separator" aria-orientation="vertical"></div>'+
 '<div class="mis-right" id="mis-question-pane">'+questionsHTML()+'</div></div>'+
 '<footer class="mis-bottom"><div class="mis-progress-grid" aria-label="Điều hướng câu hỏi">'+navHTML()+'</div><div class="mis-bottom-actions">'+
 (state.submitted?'<button type="button" class="mis-footer-btn" onclick="robotsReset()">Làm lại bài</button>':'<button type="button" class="mis-footer-btn" onclick="robotsSubmit(false)">Nộp bài</button>')+
 '</div></footer></div>';
 const passage=el("mis-passage-pane");
 passage.addEventListener("mouseup",captureSelection);
 passage.addEventListener("keyup",captureSelection);
 setupDivider();
 updateProgress();
 tick();
 if(state.submitted){
  if(state.savedToSupabase)setSaveStatus("Đã lưu lên Supabase ✓",false);
  else if(state.saveError)setSaveStatus("Chưa lưu kết quả. Hãy bấm Lưu lại.",true);
  else if(!state.savingToSupabase)persistSubmission();
 }
 if(!state.submitted)timer=setInterval(tick,600);
}
function updateProgress(){
 if(!el("mis-app"))return;
 Q.forEach(function(q){
  const n=el("mis-nav-"+q.id);if(!n)return;
  n.className="mis-jump"+(state.submitted?(correct(q)?" right":" wrong"):(answered(q)?" done":""))+(q.id===Number(state.focus)?" focused":"");
 });
 if(el("mis-status"))el("mis-status").innerHTML=state.submitted?'<strong>'+score()+'/14</strong> câu đúng':'<strong>'+completed()+'/14</strong> đã làm';
 LearningFlow.paint(el("readingFlowStatus"),{started:true,done:completed(),total:Q.length,completed:!!state.submitted,mode:"submit"});
}
function setChoice(id,value){
 if(!state||state.submitted)return;
 state.answers[id]=value;state.focus=id;save();
 const card=el("mis-q-"+id);
 if(card){card.querySelectorAll(".mis-option").forEach(function(btn){const on=btn.dataset.option===value;btn.setAttribute("aria-pressed",String(on))});}
 updateProgress();
}
function setInput(id,value){
 if(!state||state.submitted)return;
 const input=el("mis-in-"+id);
 if(cleaned(value).split(" ").filter(Boolean).length>2){if(input)input.classList.add("error")}else if(input)input.classList.remove("error");
 state.answers[id]=value;state.focus=id;save();updateProgress();
}
function submit(automatic){
 if(!state||state.submitted)return;
 const invalid=Q.filter(function(q){return q.type==="input"&&answered(q)&&cleaned(state.answers[q.id]).split(" ").length>2});
 if(invalid.length&&!automatic){window.alert("Câu "+invalid.map(function(q){return q.id}).join(", ")+" vượt quá TWO WORDS. Vui lòng sửa đáp án trước khi nộp.");return}
 const missing=14-completed();
 if(!automatic&&!window.confirm("Nộp bài ngay? "+(missing?"Bạn còn "+missing+" câu chưa trả lời. ":"")+"Đáp án và giải thích sẽ hiện sau khi nộp."))return;
 state.submitted=true;state.submittedAt=automatic?state.startedAt+LIMIT*1000:Date.now();state.focus=27;state.submissionType=automatic?"timeout":"manual";save();
 renderReader();
 const qp=el("mis-question-pane");if(qp)qp.scrollTop=0;
 persistSubmission();
 const submissionId=state.submissionId||(state.submissionId=newSubmissionId());
 save();
 LearningCore.submitPractice({category:"reading",slug:PATH,correct:score(),total:Q.length,
   duration:Math.max(1,Math.min(LIMIT,Math.round(((state.submittedAt||Date.now())-state.startedAt)/1000))),
   submissionId,details:{submissionType:state.submissionType||"manual"}
 }).catch(e=>console.warn("Reading history sync is queued for retry",e));
 if(typeof window.recordTutoringActivity==="function")window.recordTutoringActivity("reading_submission");
}
const MIS_SUPABASE_URL="https://ouicitkpfukterkilqzu.supabase.co";
const MIS_SUPABASE_KEY="sb_publishable_JI7CbbcaNM_3NJOr81qODg_yemK8QJ2";
const MIS_LEARNER_AUTH_KEY="hoctienganh_learner_auth_v1";
function learnerAuthForReading(){
 try{return JSON.parse(localStorage.getItem(MIS_LEARNER_AUTH_KEY)||"null")}catch(_){return null}
}
function setSaveStatus(message,isError){
 const status=el("mis-save-status"),retry=el("mis-save-retry");
 if(status){status.textContent=message;status.classList.toggle("error",!!isError);status.classList.toggle("success",!isError&&!!message)}
 if(retry)retry.hidden=!isError;
}
async function persistSubmission(){
 if(!state||!state.submitted||state.savedToSupabase||state.savingToSupabase)return;
 state.savingToSupabase=true;save();
 setSaveStatus("Đang lưu kết quả…",false);
 const session=learnerAuthForReading();
 if(!session?.access_token||!session?.user?.id){
  state.savingToSupabase=false;state.saveError="Không tìm thấy phiên đăng nhập.";
  save();setSaveStatus("Chưa lưu: vui lòng đăng nhập lại rồi bấm Lưu lại.",true);return;
 }
 const meta=session.user.user_metadata||{};
 const duration=Math.max(1,Math.min(LIMIT,Math.round(((state.submittedAt||Date.now())-state.startedAt)/1000)));
 const answers={};
 Q.forEach(function(q){
  answers[String(q.id)]={answer:state.answers[q.id]??"",correct_answer:q.answer,is_correct:correct(q),question_type:q.type};
 });
 const payload={
  submission_id:state.submissionId||(state.submissionId=newSubmissionId()),
  user_id:session.user.id,
  username:String(meta.username||"").slice(0,24),
  display_name:String(meta.display_name||meta.username||"Học viên").slice(0,40),
  exercise_slug:PATH,
  exercise_title:"Robots and us",
  score:score(),
  total_questions:Q.length,
  answers,
  duration_seconds:duration,
  submission_type:state.submissionType==="timeout"?"timeout":"manual",
  started_at:new Date(state.startedAt).toISOString(),
  submitted_at:new Date(state.submittedAt||Date.now()).toISOString()
 };
 try{
  const response=await fetch(MIS_SUPABASE_URL+"/rest/v1/reading_submissions?on_conflict=submission_id",{
   method:"POST",
   headers:{
    "apikey":MIS_SUPABASE_KEY,
    "Authorization":"Bearer "+session.access_token,
    "Content-Type":"application/json",
    "Prefer":"resolution=ignore-duplicates,return=minimal"
   },
   body:JSON.stringify(payload)
  });
  if(!response.ok){
   const details=await response.text().catch(()=> "");
   throw new Error("HTTP "+response.status+(details?" · "+details.slice(0,180):""));
  }
  state.savedToSupabase=true;state.savingToSupabase=false;state.saveError="";
  save();setSaveStatus("Đã lưu lên Supabase ✓",false);
 }catch(error){
  state.savingToSupabase=false;state.saveError=String(error?.message||"Lỗi kết nối");
  save();setSaveStatus("Chưa lưu kết quả. Hãy bấm Lưu lại.",true);
  console.error("[Reading] Supabase save failed:",error);
 }
}

function goQuestion(id){
 if(!state||!Q.some(function(q){return q.id===Number(id)}))return;
 state.focus=Number(id);save();
 if(el("mis-app")&&window.innerWidth<=730)switchTab("questions");
 document.querySelectorAll(".mis-q-card").forEach(function(card){card.classList.toggle("mis-focus",card.id==="mis-q-"+id)});
 const card=el("mis-q-"+id);if(card)card.scrollIntoView({behavior:"smooth",block:"start"});
 updateProgress();
 if(state.submitted){
  const left=el("mis-passage-pane");const top=left?left.scrollTop:0;
  if(left)left.innerHTML=passageHTML();
  const next=el("mis-p-"+Q.find(function(q){return q.id===Number(id)}).p);
  if(next)next.scrollIntoView({behavior:"smooth",block:"center"});
  if(left){left.addEventListener("mouseup",captureSelection);left.addEventListener("keyup",captureSelection)}
 }
}
function captureSelection(){
 const sel=window.getSelection();
 const txt=sel&&String(sel.toString()).trim();
 const node=sel&&sel.anchorNode;
 const para=node&&(node.nodeType===1?node:node.parentElement)?.closest?.(".mis-paragraph");
 if(txt&&txt.length<=500&&para){
  selection={p:Number(para.dataset.p),text:txt};
  if(el("mis-selection-status"))el("mis-selection-status").textContent="Đã chọn: “"+txt.slice(0,75)+(txt.length>75?"…":"")+"”";
 }
}
function highlight(){
 if(!selection){window.alert("Hãy bôi đen một cụm trong passage trước khi nhấn Highlight.");return}
 const p=PASSAGE[selection.p];if(!p||!p.includes(selection.text)){window.alert("Hãy chọn chữ nằm trong một đoạn văn.");return}
 if(!(state.highlights||[]).some(function(x){return x.p===selection.p&&x.text===selection.text})){
  state.highlights.push(selection);save();
 }
 const left=el("mis-passage-pane");const scroll=left.scrollTop;
 left.innerHTML=passageHTML();left.scrollTop=scroll;
 left.addEventListener("mouseup",captureSelection);left.addEventListener("keyup",captureSelection);
}
function dictionary(){
 if(!selection||!selection.text){window.alert("Hãy chọn một từ hoặc cụm từ tiếng Anh trong passage.");return}
 const term=selection.text.trim().split(/\s+/).slice(0,5).join(" ");
 window.open("https://dictionary.cambridge.org/dictionary/english/"+encodeURIComponent(term),"_blank","noopener,noreferrer");
}
function setupDivider(){
 const handle=el("mis-divider"),layout=el("mis-layout");
 if(!handle||!layout)return;
 handle.addEventListener("pointerdown",function(e){
  if(window.innerWidth<=730)return;
  e.preventDefault();handle.setPointerCapture(e.pointerId);
  const onMove=function(ev){
   if(!handle.hasPointerCapture(ev.pointerId))return;
   const rect=layout.getBoundingClientRect();
   const ratio=Math.max(32,Math.min(68,Math.round((ev.clientX-rect.left)/rect.width*100)));
   state.split=ratio;
   layout.style.gridTemplateColumns="minmax(320px,"+ratio+"fr) 8px minmax(320px,"+(100-ratio)+"fr)";
  };
  const onUp=function(ev){save();handle.removeEventListener("pointermove",onMove);handle.removeEventListener("pointerup",onUp);handle.removeEventListener("pointercancel",onUp)};
  handle.addEventListener("pointermove",onMove);handle.addEventListener("pointerup",onUp);handle.addEventListener("pointercancel",onUp);
 });
}
function landing(){
 stopTimer();document.body.classList.remove("mis-reading-mode");
 const old=read();
 const mount=el("pageMount");mount.style.display="block";
 mount.innerHTML='<div class="breadcrumbs"><button class="crumb-btn" onclick="goAreaHome()">Home</button><span>›</span><button class="crumb-btn" onclick="goGrade(12)">Lớp 12</button><span>›</span><span>Reading</span></div>'+
 '<div class="unit-hero"><div class="eyebrow">Grade 12 · IELTS Reading</div><h1>Reading</h1><p>IELTS Academic Reading · Chấm điểm và giải thích sau khi nộp.</p></div>'+
 '<div class="section-title"><h2>Reading Passages</h2><span>2 bài đọc</span></div>'+
 '<div class="exercise-grid"><button class="exercise-card" onclick="location.hash=\''+PATH+'\'"><div class="exercise-icon">📖</div><h3>Robots and us</h3><p>Passage 3 · Matching Features · Sentence Endings · Multiple Choice</p><div class="meta"><span class="chip">20 phút</span><span class="chip">14 câu (27–40)</span><span class="chip">Giải thích sau khi nộp</span>'+(old?.startedAt?'<span class="chip">'+(old.submitted?"Đã làm · "+Q.filter(function(q){return cleaned(old.answers?.[q.id])===cleaned(q.answer)}).length+"/14":"Đang làm dở")+'</span>':"")+'</div></button></div>';
 window.scrollTo({top:0,behavior:"smooth"});
}
function exercise(){
 const old=read();
 if(old&&old.startedAt){state=old;renderReader();return}
 const mount=el("pageMount");mount.style.display="block";
 mount.innerHTML='<div class="breadcrumbs"><button class="crumb-btn" onclick="goGrade(12)">Lớp 12</button><span>›</span><button class="crumb-btn" onclick="location.hash=\'grade-12/reading\'">Reading</button><span>›</span><span>Robots and us</span></div>'+
 '<div class="exercise-intro"><div class="eyebrow">IELTS Academic Reading · Passage 3</div><h1><span class="gradient">Robots and us</span></h1>'+
 '<p>14 câu hỏi (27–40) · 20 phút.</p>'+
 '<div class="pills"><span class="pill">Matching Features</span><span class="pill">Sentence Endings</span><span class="pill">Multiple Choice</span></div>'+
 '<p><strong>Lưu ý:</strong> Bấm bắt đầu để chạy giờ. Hết giờ, bài tự nộp.</p>'+
 '<button class="primary" onclick="robotsContinue()">Bắt đầu làm bài →</button></div>';
 window.scrollTo({top:0,behavior:"smooth"});
}
window.renderRobotsReadingHome=landing;
window.renderRobotsReadingExercise=exercise;
window.destroyRobotsReading=function(){
 stopTimer();document.body.classList.remove("mis-reading-mode");
 const root=el("mis-reading-root");if(root)root.remove();
};
window.robotsExit=exitPage;
window.robotsContinue=continueReading;
window.robotsReset=resetReading;
window.robotsSetChoice=setChoice;
window.robotsSetInput=setInput;
window.robotsSubmit=submit;
window.robotsSaveSubmission=persistSubmission;
window.robotsGoQuestion=goQuestion;
window.robotsHighlight=highlight;
window.robotsDictionary=dictionary;
window.robotsSwitchTab=switchTab;
})();