/* Topic 03 — Verb tenses; original authored bilingual Grammar Studio content. */
(function(g){
"use strict";
const raw=[
  {
    "id": "present-simple",
    "title": "Hiện tại đơn – thói quen và sự thật",
    "meaning": "Dùng hiện tại đơn cho thói quen, lịch trình cố định và sự thật khái quát. Với he/she/it ở câu khẳng định, động từ thường thêm -s/-es; câu hỏi và phủ định dùng do/does + V nguyên mẫu.",
    "form": "S + V(s/es)\nS + do/does not + V\nDo/Does + S + V?",
    "core": "Tìm dấu hiệu lặp lại như every day, usually, on Fridays; phân biệt số ít và số nhiều của chủ ngữ trước khi chia động từ.",
    "mistake": "Không dùng hiện tại tiếp diễn chỉ vì hành động liên quan đến hiện tại; thói quen thường cần hiện tại đơn.",
    "faults": [
      "sai hòa hợp chủ ngữ–động từ",
      "sai mốc thời gian/thể tiếp diễn",
      "không đúng dạng động từ trong hiện tại đơn"
    ],
    "extras": [
      [
        "Stative verbs (động từ trạng thái)",
        "Know, believe, own, need thường không dùng ở tiếp diễn khi diễn tả trạng thái.",
        "I know the answer.",
        "Tôi biết câu trả lời."
      ]
    ],
    "rows": [
      "My father drive to work every day. | My father ___ to work every morning. | drives | drive | is driving | has driven | Bố tôi lái xe đi làm mỗi sáng. | Every morning chỉ thói quen; father số ít dùng drives.",
      "They plays football on Fridays. | My classmates ___ football after school on Fridays. | play | plays | are playing | have played | Các bạn cùng lớp chơi bóng vào thứ Sáu. | On Fridays chỉ thói quen; classmates số nhiều dùng play.",
      "The museum open at nine. | The museum ___ at 9 a.m. every day. | opens | open | is opening | has opened | Bảo tàng mở cửa lúc chín giờ hằng ngày. | Every day diễn tả lịch cố định; museum số ít dùng opens.",
      "Water boil at sea level. | Water ___ at 100°C at sea level. | boils | boil | is boiling | has boiled | Nước sôi ở 100°C tại mực nước biển. | Sự thật khoa học dùng hiện tại đơn; water không đếm được, dùng boils.",
      "She do not like coffee. | Linh ___ not like coffee. | does | do | is | has | Linh không thích cà phê. | Linh số ít: does not + like nguyên mẫu.",
      "My uncle have two daughters. | My uncle ___ two daughters now. | has | have | is having | had | Chú tôi hiện có hai con gái. | Have chỉ quan hệ gia đình ở hiện tại; uncle số ít dùng has.",
      "These machines does not need batteries. | These machines ___ need batteries. | do not | does not | are not | have not | Những máy này không cần pin. | Machines số nhiều, phủ định hiện tại đơn dùng do not + need.",
      "Do your sister walk to school? | ___ your sister usually walk to school? | Does | Do | Is | Has | Chị của bạn thường đi bộ đến trường à? | Usually là thói quen; sister số ít cần Does + V nguyên mẫu.",
      "Anna study English every evening. | Anna ___ English every evening. | studies | study | is studying | has studied | Anna học tiếng Anh mỗi tối. | Every evening yêu cầu hiện tại đơn; study chuyển thành studies.",
      "The Earth move around the Sun. | The Earth ___ around the Sun. | moves | move | is moving | has moved | Trái Đất quay quanh Mặt Trời. | Một sự thật khoa học ổn định được diễn đạt bằng moves."
    ]
  },
  {
    "id": "present-continuous",
    "title": "Hiện tại tiếp diễn – hành động đang diễn ra",
    "meaning": "Dùng am/is/are + V-ing cho hành động xảy ra tại thời điểm nói, tình huống tạm thời hoặc xu hướng thay đổi. Không đồng nhất với thói quen hằng ngày.",
    "form": "S + am/is/are + V-ing\nS + am/is/are not + V-ing\nAm/Is/Are + S + V-ing?",
    "core": "Đọc các dấu hiệu now, right now, at the moment, this week, temporarily; kiểm tra động từ be tương ứng với chủ ngữ.",
    "mistake": "Không dùng hiện tại đơn thay tiếp diễn khi câu nhấn mạnh đang xảy ra ngay lúc nói, nhưng cũng không áp dụng tiếp diễn máy móc cho động từ trạng thái.",
    "faults": [
      "chỉ thói quen, không mô tả quá trình hiện tại",
      "dùng sai thể hoàn thành",
      "không tạo được cấu trúc am/is/are + V-ing"
    ],
    "extras": [
      [
        "Tình huống tạm thời",
        "This semester hoặc temporarily có thể báo hiệu sự sắp xếp tạm thời khác thói quen lâu dài.",
        "She is staying with her aunt this month.",
        "Tháng này cô ấy đang ở nhà dì."
      ]
    ],
    "rows": [
      "Someone knock now. | Listen! Someone ___ at the door. | is knocking | knocks | has knocked | knock | Nghe kìa! Ai đó đang gõ cửa. | Listen! cho biết tiếng gõ đang diễn ra ngay lúc nói.",
      "The children runs right now. | Look! The children ___ in the garden right now. | are running | run | have run | runs | Nhìn kìa! Bọn trẻ đang chạy trong vườn. | Right now và Look! nhấn mạnh hành động đang xảy ra; children số nhiều.",
      "I prepare for exams this week. | I ___ for my final exams this week. | am preparing | prepare | have prepared | prepared | Tuần này tôi đang ôn thi cuối kỳ. | This week nói đến hoạt động tạm thời đang diễn ra.",
      "The traffic move slowly now. | The traffic ___ very slowly at the moment. | is moving | moves | has moved | move | Giao thông lúc này đang di chuyển rất chậm. | At the moment yêu cầu tiếp diễn; traffic là chủ ngữ số ít.",
      "The baby sleep; be quiet. | Please be quiet; the baby ___ right now. | is sleeping | sleeps | has slept | sleep | Hãy giữ yên lặng, em bé đang ngủ. | Right now là trạng thái hoạt động đang tiếp diễn ngay lúc nói.",
      "We develop a website this month. | We ___ a new website this month. | are developing | develop | developed | have developed | Tháng này chúng tôi đang phát triển website mới. | This month chỉ dự án đang triển khai, chưa phải thói quen.",
      "The days gets shorter these weeks. | The days ___ shorter as winter approaches. | are getting | get | have got | gets | Những ngày đang ngắn dần khi mùa đông tới. | Xu hướng đang thay đổi dùng are getting với chủ ngữ days số nhiều.",
      "Where do you going? | Where ___ you going right now? | are | is | do | have | Bạn đang đi đâu ngay lúc này? | Going cần trợ động từ are để tạo hiện tại tiếp diễn với you.",
      "I do not using this laptop now. | I ___ my laptop at the moment; you can borrow it. | am not using | do not use | have not used | not use | Hiện tại tôi không dùng máy tính, bạn có thể mượn. | At the moment nhấn mạnh hành động không diễn ra ngay bây giờ.",
      "My cousin stays temporarily at our home. | My cousin ___ with us temporarily while her flat is repaired. | is staying | stays | stayed | has stayed | Anh họ tôi đang ở tạm với chúng tôi khi căn hộ sửa chữa. | Temporarily xác định tình huống tạm thời, dùng is staying."
    ]
  },
  {
    "id": "past-simple",
    "title": "Quá khứ đơn – sự việc đã kết thúc",
    "meaning": "Diễn đạt sự việc xảy ra và kết thúc ở một mốc quá khứ xác định. Dùng V2/ed trong câu khẳng định; did + V nguyên mẫu trong câu hỏi và phủ định.",
    "form": "S + V2/ed\nS + did not + V\nDid + S + V?",
    "core": "Nhận diện yesterday, last week, in 2018, two days ago. Sau did/didn't, không dùng động từ quá khứ.",
    "mistake": "Không sử dụng hiện tại hoàn thành với mốc quá khứ đã đóng như yesterday hoặc in 2019.",
    "faults": [
      "dạng hiện tại không phù hợp quá khứ đã kết thúc",
      "hiện tại hoàn thành xung đột mốc quá khứ xác định",
      "dạng không hữu hạn hoặc sai cấu trúc quá khứ"
    ],
    "extras": [],
    "rows": [
      "We visit the exhibition last week. | We ___ the exhibition last Saturday. | visited | visit | have visited | visiting | Thứ Bảy trước chúng tôi đã tham quan triển lãm. | Last Saturday là mốc quá khứ đã kết thúc, dùng visited.",
      "She buys a laptop yesterday. | Mai ___ a new laptop yesterday. | bought | buys | has bought | buying | Hôm qua Mai đã mua máy tính mới. | Yesterday buộc chia bought (quá khứ của buy).",
      "They move to Hanoi in 2018. | They ___ to Hanoi in 2018. | moved | move | have moved | moving | Họ đã chuyển đến Hà Nội năm 2018. | In 2018 là mốc quá khứ xác định, dùng moved.",
      "I do not see him last night. | I ___ not see him last night. | did | do | have | was | Tối qua tôi đã không gặp anh ấy. | Last night: did not + see nguyên mẫu.",
      "Do you call her yesterday? | ___ you call her yesterday? | Did | Do | Have | Are | Hôm qua bạn đã gọi cho cô ấy à? | Yesterday yêu cầu Did đứng đầu câu hỏi quá khứ đơn.",
      "He go home early on Monday. | He ___ home early last Monday. | went | goes | has gone | going | Thứ Hai trước anh ấy về nhà sớm. | Last Monday là mốc quá khứ, go đổi thành went.",
      "The meeting start two hours ago. | The meeting ___ two hours ago. | started | starts | has started | starting | Cuộc họp đã bắt đầu hai giờ trước. | Ago báo một thời điểm quá khứ đã qua, dùng started.",
      "We are happy after the show yesterday. | We ___ very happy after the show yesterday. | were | are | have been | was | Hôm qua sau buổi biểu diễn chúng tôi rất vui. | Yesterday: chủ ngữ we số nhiều, be quá khứ là were.",
      "She writes a letter in 2020. | She ___ her first novel in 2020. | wrote | writes | has written | writing | Cô ấy đã viết tiểu thuyết đầu tay năm 2020. | In 2020 xác định hành động hoàn tất trong quá khứ, dùng wrote.",
      "The children eat lunch an hour ago. | The children ___ lunch an hour ago. | ate | eat | have eaten | eating | Bọn trẻ đã ăn trưa một giờ trước. | An hour ago yêu cầu ate là quá khứ của eat."
    ]
  },
  {
    "id": "past-continuous",
    "title": "Quá khứ tiếp diễn – hành động tại một thời điểm đã qua",
    "meaning": "Dùng was/were + V-ing cho hành động đang diễn ra ở mốc quá khứ; thường mô tả bối cảnh hoặc một hành động dài bị sự kiện ngắn xen vào.",
    "form": "S + was/were + V-ing\nWhile + S + was/were + V-ing, S + V2\nS + was/were + V-ing when + S + V2",
    "core": "Xác định hành động nền đang kéo dài và biến cố xen vào; chủ ngữ số ít dùng was, số nhiều dùng were.",
    "mistake": "Không chia cả hai hành động ở quá khứ tiếp diễn nếu một hành động ngắn đột ngột chen vào.",
    "faults": [
      "quá khứ đơn bỏ mất ý đang diễn tiến ở mốc nói tới",
      "thì hiện tại không tương thích mốc quá khứ",
      "sai dạng trợ động từ hoặc thành phần V-ing"
    ],
    "extras": [],
    "rows": [
      "I cooked when she called. | I ___ dinner when she called last night. | was cooking | cooked | am cooking | cook | Tôi đang nấu bữa tối thì cô ấy gọi tối qua. | When she called là biến cố xen vào hành động đang diễn ra.",
      "They played at eight yesterday. | At 8 p.m. yesterday, they ___ chess. | were playing | played | are playing | play | Lúc 8 giờ tối qua họ đang chơi cờ. | At 8 p.m. yesterday chỉ lát cắt của hành động đang diễn ra trong quá khứ.",
      "She walked home when it started raining. | She ___ home when the storm began. | was walking | walked | is walking | walks | Cô ấy đang đi bộ về nhà thì cơn bão bắt đầu. | Storm began chen ngang quá trình was walking.",
      "We were watched a film. | We ___ a film when the power went out. | were watching | watched | are watching | watching | Chúng tôi đang xem phim thì mất điện. | Power went out là sự kiện ngắn giữa quá trình xem phim.",
      "He slept at ten last night. | At 10 last night, Tom ___ soundly. | was sleeping | slept | is sleeping | sleeps | Lúc 10 giờ đêm qua Tom đang ngủ say. | At 10 last night nhấn mạnh một hành động đang diễn ra đúng thời điểm đó.",
      "The students studied when the alarm rang. | The students ___ quietly when the alarm rang. | were studying | studied | are studying | studies | Các học sinh đang học thì chuông báo vang lên. | Ringing alarm xen vào hành động were studying.",
      "It rained when we left the café. | It ___ heavily when we left the café. | was raining | rained | is raining | rains | Trời đang mưa to khi chúng tôi rời quán. | When we left đánh dấu thời điểm giữa cơn mưa.",
      "My mother cleaned while I read. | My mother ___ the kitchen while I was doing homework. | was cleaning | cleaned | is cleaning | cleans | Mẹ tôi đang dọn bếp khi tôi đang làm bài. | Hai hành động nền song song trong quá khứ: was cleaning / was doing.",
      "You talked during the entire meeting yesterday. | While the manager was speaking, you ___ to your friend. | were talking | talked | are talking | talks | Trong lúc quản lý đang nói, bạn lại đang trò chuyện với bạn. | While ... was speaking nhấn mạnh hai hành động diễn ra đồng thời.",
      "The children played when I arrived. | When I arrived, the children ___ in the yard. | were playing | played | are playing | plays | Khi tôi đến, bọn trẻ đang chơi ngoài sân. | I arrived là mốc chen vào hành động đang diễn ra."
    ]
  },
  {
    "id": "present-perfect",
    "title": "Hiện tại hoàn thành – quá khứ liên hệ hiện tại",
    "meaning": "Dùng have/has + V3 khi sự việc đã xảy ra nhưng liên quan đến hiện tại: kết quả còn hiệu lực, trải nghiệm không nêu thời gian cụ thể hoặc khoảng thời gian kéo dài đến nay.",
    "form": "S + have/has + V3\nS + have/has not + V3\nHave/Has + S + V3?",
    "core": "Xem sự việc có kéo dài đến nay hay không; chú ý since, for, already, just, yet, ever, never và chủ ngữ của have/has.",
    "mistake": "Không ghép hiện tại hoàn thành với thời điểm quá khứ xác định như yesterday; không nhầm V2 với V3 của động từ bất quy tắc.",
    "faults": [
      "dạng quá khứ đơn không biểu thị đúng kết nối đến hiện tại",
      "dạng hiện tại đơn không diễn tả quá trình/kinh nghiệm đã có",
      "sai cấu trúc have/has + V3"
    ],
    "extras": [
      [
        "Since và for",
        "Since + thời điểm bắt đầu; for + độ dài thời gian. Hai dấu hiệu này không tự động quyết định thì nếu ngữ cảnh không kéo dài đến hiện tại.",
        "She has lived here since 2021.",
        "Cô ấy sống ở đây từ năm 2021 đến nay."
      ]
    ],
    "rows": [
      "She lives here since 2021. | She ___ in this village since 2021 and still lives here. | has lived | lived | lives | have lived | Cô ấy đã sống ở ngôi làng này từ 2021 và hiện vẫn sống ở đó. | Since 2021 và still lives here nối quá khứ với hiện tại; she dùng has lived.",
      "I lose my keys; now I cannot enter. | I ___ my keys, so I cannot open the door now. | have lost | lost | lose | has lost | Tôi đã làm mất chìa khóa nên giờ không thể mở cửa. | Hệ quả còn hiện hữu now, chủ ngữ I dùng have lost.",
      "They finish the work already. | They ___ already finished the project. | have | has | did | are | Họ đã hoàn thành dự án rồi. | Already finished: hiện tại hoàn thành với they cần have + V3.",
      "He did not finish his lunch yet. | He ___ not finished his lunch yet. | has | have | does | was | Anh ấy vẫn chưa ăn trưa xong. | Yet và finished làm rõ cấu trúc has not + V3 với he.",
      "Have she visited Japan? | ___ she ever visited Japan? | Has | Did | Does | Is | Cô ấy đã từng đến Nhật chưa? | Ever hỏi trải nghiệm không nêu mốc quá khứ; has + V3.",
      "We know each other for ten years. | We ___ each other for ten years and are still friends. | have known | knew | know | has known | Chúng tôi quen nhau mười năm và vẫn là bạn. | For ten years kéo dài đến hiện tại; know là động từ trạng thái, dùng have known.",
      "This is the first time I see snow. | This is the first time I ___ snow. | have seen | saw | see | has seen | Đây là lần đầu tôi nhìn thấy tuyết. | This is the first time đi với present perfect để nói trải nghiệm tính đến nay.",
      "The train just arrives. | The train ___ just arrived; passengers are getting off now. | has | have | did | is | Tàu vừa đến, hành khách đang xuống. | Just arrived và hệ quả hiện tại đòi has + V3 với train số ít.",
      "The students have did this exercise. | The students ___ this exercise three times so far. | have done | did | do | has done | Các học sinh đã làm bài này ba lần tính đến giờ. | So far chỉ tổng kinh nghiệm đến hiện tại; students số nhiều, done là V3.",
      "I never eat sushi before. | I ___ never tried sushi before. | have | has | did | am | Trước đây tôi chưa từng thử sushi. | Never + tried trước hiện tại, chủ ngữ I dùng have."
    ]
  },
  {
    "id": "past-perfect",
    "title": "Quá khứ hoàn thành – trước một mốc quá khứ",
    "meaning": "Dùng had + V3 để đặt một sự việc ở thời điểm trước một sự việc/mốc quá khứ khác. Hai mốc được xác lập trong quá khứ, không nhất thiết liên quan đến hiện tại.",
    "form": "S + had + V3\nS + had not + V3\nHad + S + V3?",
    "core": "Xếp timeline: hành động sớm hơn thường là had + V3; hành động/mốc đến sau thường là quá khứ đơn.",
    "mistake": "Không dùng quá khứ hoàn thành chỉ vì câu có hai động từ quá khứ; phải có quan hệ trước–sau có ý nghĩa.",
    "faults": [
      "quá khứ đơn không thể hiện rõ quan hệ hoàn tất trước mốc sau",
      "hiện tại hoàn thành sai điểm nhìn quá khứ",
      "sai dạng had + quá khứ phân từ"
    ],
    "extras": [],
    "rows": [
      "The film already began when we arrived. | By the time we reached the cinema, the film ___ already started. | had | has | was | did | Khi chúng tôi đến rạp, phim đã bắt đầu trước đó. | By the time ... reached đặt mốc quá khứ sau; đã started trước thì dùng had.",
      "She left before I got there. | When I arrived, Linh ___ already left. | had | has | did | was | Khi tôi đến, Linh đã đi mất rồi. | Khi I arrived ở quá khứ thì left đã diễn ra trước, dùng had.",
      "They ate before the guests arrived. | They ___ finished dinner before the guests arrived. | had | have | were | did | Họ ăn tối xong trước khi khách đến. | Hành động finished có trước arrived; dùng had + V3.",
      "The train left when we reached the station. | The train ___ already departed when we reached the station. | had | has | was | did | Tàu đã rời đi trước khi chúng tôi tới ga. | Already departed trước reached, điểm nhìn là quá khứ.",
      "He didn't read the book before class. | He ___ not read the book before the class began. | had | has | did | was | Anh ấy đã chưa đọc sách khi buổi học bắt đầu. | Before class began là mốc sau; phủ định quá khứ hoàn thành had not read.",
      "I forgot the password I create earlier. | I forgot the password that I ___ created the previous day. | had | have | was | did | Tôi quên mật khẩu đã tạo từ ngày trước. | Created the previous day có trước forgot, dùng had.",
      "She was tired because she works all night. | She was exhausted because she ___ worked all night. | had | has | was | did | Cô ấy kiệt sức vì trước đó đã làm việc suốt đêm. | Worked all night dẫn đến tình trạng was exhausted trong quá khứ.",
      "We had not seen the message when he called. | We ___ not seen his message when he called us. | had | have | did | were | Khi anh ấy gọi, chúng tôi vẫn chưa xem tin nhắn. | Not seen xảy ra trước called, phải có had not + V3.",
      "After she finishes her work, she went home. | After she ___ completed the report, she went home. | had | has | did | was | Sau khi hoàn thành báo cáo, cô ấy về nhà. | Completed trước went, dùng had để nhấn mạnh thứ tự.",
      "No one explained the rule before the test began. | No one ___ explained the rules before the test began. | had | has | did | was | Chưa ai giải thích quy tắc trước lúc bài kiểm tra bắt đầu. | Trạng thái chưa giải thích kéo dài đến trước mốc began trong quá khứ."
    ]
  },
  {
    "id": "future-forms",
    "title": "Tương lai – will, be going to và các hình thức tiếp diễn",
    "meaning": "Will thường dùng cho quyết định ngay lúc nói hoặc dự đoán; be going to thể hiện dự định có trước hay dự đoán dựa vào dấu hiệu; future continuous chỉ hành động đang diễn ra ở mốc tương lai; future perfect chỉ hoàn thành trước mốc tương lai.",
    "form": "S + will + V\nS + am/is/are going to + V\nS + will be + V-ing\nS + will have + V3",
    "core": "Đừng dựa duy nhất vào từ tomorrow; xem người nói quyết định ngay lúc đó, đã lên kế hoạch, đang làm ở mốc tương lai hay đã hoàn thành trước mốc.",
    "mistake": "Không dùng will ngay sau if/when trong mệnh đề thời gian–điều kiện tương lai thông thường.",
    "faults": [
      "không phù hợp thời điểm quyết định hoặc dự đoán",
      "sai dạng trợ động từ/thì cho ý tương lai",
      "không đúng cấu trúc modal + V nguyên mẫu"
    ],
    "extras": [
      [
        "Lịch trình tương lai",
        "Hiện tại đơn cũng diễn tả lịch cố định (The train leaves at six); hiện tại tiếp diễn thường dùng cho cuộc hẹn đã sắp xếp (We are meeting tomorrow).",
        "The train leaves at six tomorrow.",
        "Tàu chạy lúc sáu giờ ngày mai."
      ]
    ],
    "rows": [
      "I am going to carry that bag now. | A: This box is heavy. B: I ___ carry it for you. | will | am | have | was | A: Hộp nặng quá. B: Để tôi mang giúp. | Lời đề nghị/quyết định phát sinh ngay trong hội thoại dùng will + V.",
      "It will rain; look at the black clouds. | Look at those dark clouds! It ___ going to rain. | is | will | has | does | Nhìn mây đen kìa! Trời sắp mưa. | Dấu hiệu nhìn thấy ngay khiến be going to phù hợp; it cần is.",
      "She will start tomorrow; she planned last month. | Mai ___ going to start a new course next week; she enrolled last month. | is | will | has | does | Mai dự định học khóa mới tuần tới, cô ấy đã đăng ký tháng trước. | Kế hoạch đã quyết định trước, is going to.",
      "We will studying at eight tomorrow. | At 8 p.m. tomorrow, we ___ be studying for the exam. | will | are | have | did | Lúc 8 giờ tối mai chúng tôi sẽ đang ôn thi. | At 8 p.m. tomorrow nhấn mạnh hành động đang diễn ra tại một thời điểm tương lai: will be studying.",
      "By June, she will completed the course. | By the end of June, she ___ have completed the course. | will | is | has | did | Trước cuối tháng Sáu, cô ấy sẽ hoàn thành khóa học. | By the end of June là hạn trước tương lai, future perfect will have + V3.",
      "If he will call, I'll answer. | If he ___ tomorrow, I will answer immediately. | calls | will call | is calling | has called | Nếu ngày mai anh ấy gọi, tôi sẽ trả lời ngay. | Mệnh đề if chỉ điều kiện tương lai thường dùng hiện tại đơn, không dùng will.",
      "When she will arrive, we'll eat. | We will eat when she ___ home tomorrow. | gets | will get | got | has got | Chúng ta sẽ ăn khi cô ấy về nhà ngày mai. | Sau when chỉ mốc tương lai dùng hiện tại đơn gets.",
      "They are planning a trip; they will leave Sunday. | They ___ going to visit Da Nang; their tickets are already booked. | are | will | have | did | Họ dự định đi Đà Nẵng; vé đã đặt. | Vé đã đặt chứng minh kế hoạch có sẵn: are going to.",
      "Please give me a second, I'm going to check now. | A: Who can check the figures? B: I ___ do it now. | will | am | have | was | A: Ai kiểm tra số liệu? B: Tôi sẽ làm ngay. | Quyết định tự nguyện ngay khi được hỏi: will + do.",
      "This time next Friday, we will travel on a train. | This time next Friday, we ___ be travelling through the mountains. | will | are | have | did | Giờ này thứ Sáu tới, chúng tôi sẽ đang đi qua miền núi. | This time next Friday nhấn mạnh quá trình tại thời điểm tương lai: will be travelling."
    ]
  },
  {
    "id": "tense-contrast",
    "title": "Đối chiếu các thì – đọc đúng trục thời gian",
    "meaning": "Một dấu hiệu thời gian riêng lẻ chưa đủ; lựa chọn thì theo việc mốc đã khép lại, đang diễn ra, có kết quả hiện tại hay hoàn tất trước một mốc khác.",
    "form": "Yesterday/last year → V2\nSince/so far + kéo dài đến nay → have/has + V3\nWhen + quá khứ → was/were + V-ing (hành động nền)\nBy the time + mốc quá khứ → had + V3",
    "core": "Luôn xác định thời điểm quy chiếu, độ dài hành động và trạng thái hoàn tất; không học mẹo một từ khóa = một thì.",
    "mistake": "Không lạm dụng so far/yesterday như mẹo tuyệt đối nếu cấu trúc và nghĩa của cả câu mâu thuẫn.",
    "faults": [
      "dùng thì ở mốc thời gian khác",
      "không thể hiện quan hệ quá trình/hoàn tất",
      "sai hòa hợp hay hình thức động từ"
    ],
    "extras": [],
    "rows": [
      "I have met her yesterday. | I ___ my new teacher yesterday. | met | have met | meet | am meeting | Hôm qua tôi đã gặp giáo viên mới. | Yesterday đóng mốc quá khứ, nên dùng met chứ không dùng have met.",
      "She worked here since 2020. | She ___ at this company since 2020 and is still here. | has worked | worked | works | is working | Cô ấy làm ở công ty từ 2020 đến nay. | Since 2020 và is still here cho biết khoảng kéo dài đến hiện tại; has worked.",
      "I was sleeping when the alarm is ringing. | I ___ when the fire alarm went off last night. | was sleeping | slept | am sleeping | sleep | Tối qua tôi đang ngủ khi chuông báo cháy vang lên. | Went off là biến cố trong quá khứ chen ngang hành động đang ngủ.",
      "By the time he came, I already finished. | By the time he arrived, I ___ already finished the task. | had | have | was | did | Đến lúc anh ấy đến, tôi đã hoàn thành bài. | Finished diễn ra trước arrived; had + V3.",
      "Look! A bird flies towards us. | Look! A bird ___ towards our window right now. | is flying | flies | flew | has flown | Nhìn kìa! Một con chim đang bay về phía cửa sổ. | Look và right now chỉ quá trình đang xảy ra.",
      "We have visited Hue last summer. | We ___ Hue last summer. | visited | have visited | visit | are visiting | Mùa hè trước chúng tôi đã đến Huế. | Last summer là khoảng quá khứ đã kết thúc; visited.",
      "He has not sent the file yesterday. | He ___ not send the file yesterday. | did | has | does | is | Hôm qua anh ấy đã không gửi tập tin. | Yesterday buộc dùng did not + V nguyên mẫu.",
      "She finished the project so far. | She ___ three projects so far this year. | has completed | completed | completes | is completing | Năm nay tính đến giờ cô ấy đã hoàn thành ba dự án. | So far this year là số lần hoàn tất tính đến hiện tại; has completed.",
      "At 9 last night they watch TV. | At 9 p.m. last night, they ___ a documentary. | were watching | watched | are watching | watch | Lúc 9 giờ tối qua họ đang xem phim tài liệu. | At 9 p.m. last night xác định hành động đang tiến triển trong quá khứ.",
      "She has just called an hour ago. | She ___ me an hour ago. | called | has called | calls | is calling | Cô ấy gọi tôi một giờ trước. | An hour ago là mốc quá khứ đã kết thúc, dùng called."
    ]
  }
];
const lessons=raw.map(l=>({
  id:l.id,title:l.title,meaning:l.meaning,form:l.form,core:l.core,
  mistake:l.mistake,faults:l.faults,extras:l.extras,
  outcome:"Phân tích mốc thời gian và chọn đúng thì trong "+l.title.toLowerCase()+".",
  entries:l.rows.map(row=>row.split(" | "))
}));
const data=g.GrammarTopicCompiler.build({
 number:3,
 title:"CHUYÊN ĐỀ 3. THÌ ĐỘNG TỪ – VERB TENSES",
 lessons,
 writing:[
  ["Correct: I have met her yesterday.","I met her yesterday.",["yesterday đóng mốc quá khứ","dùng V2 thay have + V3"]],
  ["Correct: She works here since 2020 and still works here.","She has worked here since 2020.",["since + thời điểm bắt đầu","kéo dài đến hiện tại"]],
  ["Correct: I cooked when the phone rang last night.","I was cooking when the phone rang last night.",["phân biệt hành động nền và biến cố","was + V-ing"]],
  ["Correct: When we arrived, the concert already started.","When we arrived, the concert had already started.",["hành động bắt đầu trước arrived","had + V3"]]
 ]
});
g.GrammarTopic3Data=data;
})(window);
