/* Marie Curie High School Grade 10 Mid-term 1. Faithful to user-supplied PDF; original numbering preserved. */
(function(global){
"use strict";
const PASSAGE_AI="Today, anyone with a laptop can produce an \"AI cover\" in minutes. Supporters say the technology gives ordinary people a chance to be creative. A teenager who cannot afford a recording studio can now write a melody and hear it performed by a \"professional\" voice. Some musicians even use AI to test their ideas before they record a song themselves.\n\nHowever, many artists are worried. A singer's voice is part of his or her identity, and they argue that copying it without permission is a kind of theft. They also fear that record companies will one day prefer cheap digital voices to real performers. In 2024, more than 200 musicians signed an open letter asking technology companies to respect artists' rights.\n\nTalent shows are facing new questions, too. Should a contestant be eliminated if the judges discover that part of a performance was created by a computer? Organisers may soon have to ask every participant to promise that each note they sing is truly their own.\n\nWhatever the future holds, one thing seems certain: audiences still want to feel a real human connection when they listen to music.";
const PASSAGE_NOTE="STUDY NOTE: Giving useful feedback – the \"sandwich\" method\nJudges on talent shows often use a simple pattern when they comment on a performance:\n1. Top slice – Start with something specific the performer did well. (\"Your high notes were very clear.\")\n2. Filling – Give one suggestion for improvement and explain how to do it. Avoid words like \"bad\" or \"terrible\". (\"Try to move around the stage more so the audience feels involved.\")\n3. Bottom slice – End with encouragement about the future. (\"Keep practising and you'll go far!\")\nX Avoid general praise such as \"That was nice.\" – it does not help the performer improve.";
const ROWS=[
 [
  1,
  "Phonetics · Pronunciation",
  "Choose the word whose underlined part differs from the other three in pronunciation.",
  [
   "voter",
   "concert",
   "grocer",
   "solo"
  ],
  "B",
  "Voter, grocer và solo đều có âm /əʊ/ hoặc /oʊ/ trong âm tiết được so sánh; concert có âm /ɒ/ hoặc /ɑː/ tùy giọng.",
  "Bản PDF không hiển thị rõ phần gạch chân của từng từ; đáp án dựa trên nguyên âm thông thường."
 ],
 [
  2,
  "Phonetics · Pronunciation",
  "Choose the word whose underlined part differs from the other three in pronunciation.",
  [
   "talented",
   "atmosphere",
   "family",
   "award"
  ],
  "D",
  "Trong âm tiết đầu của talented, atmosphere và family có /æ/, còn award bắt đầu bằng /ə/.",
  "Bản PDF không hiển thị rõ phần gạch chân."
 ],
 [
  3,
  "Phonetics · Pronunciation",
  "Choose the word whose underlined part differs from the other three in pronunciation.",
  [
   "childhood",
   "chorus",
   "echo",
   "Christmas"
  ],
  "A",
  "Ch trong childhood phát âm /tʃ/; chorus, echo và Christmas sử dụng /k/ ở phần được đối chiếu.",
  "Bản PDF không hiển thị rõ phần gạch chân."
 ],
 [
  4,
  "Phonetics · Pronunciation",
  "Choose the word whose underlined part differs from the other three in pronunciation.",
  [
   "supported",
   "protected",
   "performed",
   "recorded"
  ],
  "C",
  "Đuôi -ed của supported, protected và recorded là /ɪd/; performed là /d/.",
  ""
 ],
 [
  5,
  "Phonetics · Pronunciation",
  "Choose the word whose underlined part differs from the other three in pronunciation.",
  [
   "habits",
   "idols",
   "singers",
   "albums"
  ],
  "A",
  "Đuôi -s của habits là /s/; idols, singers và albums có /z/.",
  ""
 ],
 [
  6,
  "Phonetics · Stress",
  "Choose the word with a different primary stress pattern.",
  [
   "perform",
   "support",
   "practise",
   "reduce"
  ],
  "C",
  "Practise nhấn âm tiết đầu; perform, support, reduce nhấn âm tiết thứ hai.",
  ""
 ],
 [
  7,
  "Phonetics · Stress",
  "Choose the word with a different primary stress pattern.",
  [
   "single",
   "award",
   "idol",
   "talent"
  ],
  "B",
  "Award nhấn âm tiết thứ hai; single, idol, talent nhấn âm tiết đầu.",
  ""
 ],
 [
  8,
  "Phonetics · Stress",
  "Choose the word with a different primary stress pattern.",
  [
   "audience",
   "character",
   "festival",
   "musician"
  ],
  "D",
  "Musician nhấn âm tiết thứ hai; audience, character, festival nhấn âm tiết đầu.",
  ""
 ],
 [
  9,
  "Phonetics · Stress",
  "Choose the word with a different primary stress pattern.",
  [
   "competition",
   "environment",
   "participant",
   "competitor"
  ],
  "A",
  "Competition nhấn âm tiết thứ ba, ba từ còn lại nhấn âm tiết thứ hai.",
  ""
 ],
 [
  10,
  "Phonetics · Stress",
  "Choose the word with a different primary stress pattern.",
  [
   "appliance",
   "energy",
   "performance",
   "pollution"
  ],
  "B",
  "Energy nhấn âm tiết đầu; appliance, performance, pollution nhấn âm tiết thứ hai.",
  ""
 ],
 [
  11,
  "Vocabulary & Grammar",
  "Thanks to the new dishwasher and robot vacuum, our ____________ chores now take half the time they used to.",
  [
   "housework",
   "homework",
   "housewife",
   "household"
  ],
  "D",
  "Cụm danh từ cố định là household chores (việc nhà); housework là danh từ không đếm được, không dùng như tính từ trong cụm này.",
  ""
 ],
 [
  12,
  "Vocabulary & Grammar",
  "Anyone caught dropping ____________ in the city park will have to pay a fine of 500,000 VND.",
  [
   "litter",
   "pollution",
   "emission",
   "resource"
  ],
  "A",
  "Drop litter là vứt rác bừa bãi; cụm nói trực tiếp hành vi bị phạt.",
  ""
 ],
 [
  13,
  "Vocabulary & Grammar",
  "The young rapper thanked his fans for every ____________ they had sent during the live final.",
  [
   "judge",
   "award",
   "vote",
   "single"
  ],
  "C",
  "Người hâm mộ gửi vote (phiếu bình chọn), không gửi giám khảo, giải thưởng hay đĩa đơn.",
  ""
 ],
 [
  14,
  "Vocabulary & Grammar",
  "Only ten ____________ will make it to the semi-final round of this year's singing contest.",
  [
   "audiences",
   "participants",
   "judges",
   "festivals"
  ],
  "B",
  "Participants là thí sinh tham gia cuộc thi và có thể đi tiếp vào bán kết.",
  ""
 ],
 [
  15,
  "Vocabulary & Grammar",
  "My aunt only buys ____________ vegetables from a farm that never sprays pesticides on its crops.",
  [
   "recyclable",
   "renewable",
   "sustainable",
   "organic"
  ],
  "D",
  "Organic vegetables là rau hữu cơ; tình tiết không dùng thuốc trừ sâu phù hợp với organic.",
  ""
 ],
 [
  16,
  "Vocabulary & Grammar",
  "Mai: \"Guess what? Our band won first prize in the school music contest!\"\nNam: \"____________! You've all practised so hard for it.\"",
  [
   "Break a leg",
   "Hats off to you",
   "Hang in there",
   "Mind your own business"
  ],
  "B",
  "Hats off to you thể hiện sự khâm phục/chúc mừng thành tích đã đạt được; Break a leg chúc may mắn trước khi biểu diễn.",
  ""
 ],
 [
  17,
  "Vocabulary & Grammar",
  "Tom: \"Is she a professional singer? Her voice is amazing.\"\nAnna: \"No, she's never had a single lesson. She's just naturally ____________.\"",
  [
   "gifted",
   "trained",
   "qualified",
   "experienced"
  ],
  "A",
  "Naturally gifted chỉ tài năng bẩm sinh; chi tiết never had a single lesson loại trained/qualified.",
  ""
 ],
 [
  18,
  "Vocabulary & Grammar",
  "Son: \"Mum, can I go to the K-pop concert with my friends tonight?\"\nMum: \"Only if you ____________ the washing-up and take out the rubbish first.\"",
  [
   "make",
   "take",
   "do",
   "clean"
  ],
  "C",
  "Do the washing-up là collocation cố định nghĩa là rửa bát.",
  ""
 ],
 [
  19,
  "Vocabulary & Grammar",
  "Linh: \"I always leave my phone charger plugged in. It's not a big deal, is it?\"\nHuy: \"Actually, it is. Even when it isn't charging anything, it still ____________ energy.\"",
  [
   "saves",
   "produces",
   "reduces",
   "wastes"
  ],
  "D",
  "Leaving a charger plugged in can waste energy (lãng phí điện), trái với saves.",
  ""
 ],
 [
  20,
  "Vocabulary & Grammar",
  "The school canteen ____________ at 6:30 every morning, so students can have breakfast before class.",
  [
   "opens",
   "is opening",
   "open",
   "opened"
  ],
  "A",
  "Every morning biểu thị lịch hoạt động thường xuyên; chủ ngữ số ít canteen → opens.",
  ""
 ],
 [
  21,
  "Vocabulary & Grammar",
  "Please keep quiet! The judges ____________ the final scores right now.",
  [
   "announce",
   "announced",
   "are announcing",
   "will announce"
  ],
  "C",
  "Right now và lời nhắc Please keep quiet cho thấy hành động đang diễn ra → are announcing.",
  ""
 ],
 [
  22,
  "Vocabulary & Grammar",
  "Over 2,000 trees ____________ along the riverbank by student volunteers last spring.",
  [
   "planted",
   "are planted",
   "have planted",
   "were planted"
  ],
  "D",
  "Last spring là quá khứ; trees nhận hành động trồng → bị động quá khứ were planted.",
  ""
 ],
 [
  23,
  "Vocabulary & Grammar",
  "The winner of the talent show ____________ on national television next Sunday evening.",
  [
   "will announce",
   "will be announced",
   "is announcing",
   "will be announcing"
  ],
  "B",
  "The winner là đối tượng được công bố, next Sunday là tương lai → will be announced.",
  ""
 ],
 [
  24,
  "Vocabulary & Grammar",
  "The concert tickets sold out in just five minutes, ____________ thousands of fans were left disappointed.",
  [
   "so",
   "but",
   "or",
   "for"
  ],
  "A",
  "Mệnh đề sau là hệ quả của sold out → so.",
  ""
 ],
 [
  25,
  "Vocabulary & Grammar",
  "You can take the shuttle bus to the festival, ____________ you can ride your bike along the river path.",
  [
   "so",
   "or",
   "but",
   "for"
  ],
  "B",
  "Hai phương án di chuyển thay thế nhau → or.",
  ""
 ],
 [
  26,
  "Vocabulary & Grammar",
  "The vocal coach made every contestant ____________ the chorus ten times before the live show.",
  [
   "sing",
   "to sing",
   "singing",
   "sang"
  ],
  "A",
  "Make + somebody + bare infinitive: made every contestant sing.",
  ""
 ],
 [
  27,
  "Vocabulary & Grammar",
  "Our class has decided ____________ all the money from the charity concert to a local animal shelter.",
  [
   "donate",
   "donating",
   "to donate",
   "donated"
  ],
  "C",
  "Decide + to-infinitive: decided to donate.",
  ""
 ],
 [
  39,
  "Reading Comprehension",
  "Which of the following is the best title for the passage?",
  [
   "AI Voices: Exciting Tool or Serious Threat?",
   "How Teenagers Can Record a Hit Song at Home Cheaply",
   "The Life and Long Career of the World's Biggest Pop Stars",
   "Why Talent Shows Are Quickly Disappearing from Our TV Screens"
  ],
  "A",
  "Bài đặt lợi ích sáng tạo của AI đối lập với nguy cơ xâm phạm quyền nghệ sĩ, nên nhan đề A bao quát cả hai mặt.",
  ""
 ],
 [
  40,
  "Reading Comprehension",
  "According to paragraph 2, supporters believe that AI ____________.",
  [
   "will soon replace all professional singers",
   "helps judges choose talent show winners",
   "makes concert tickets much cheaper for fans",
   "lets people with little money make music"
  ],
  "D",
  "Đoạn 1 nêu teenager cannot afford a recording studio nhưng có thể tạo giai điệu và giọng hát nhờ AI.",
  "Đề ghi paragraph 2, nhưng chi tiết về supporters thực tế nằm ở đoạn 1."
 ],
 [
  41,
  "Reading Comprehension",
  "The word \"they\" in paragraph 3 refers to ____________.",
  [
   "record companies",
   "many artists",
   "technology companies",
   "digital voices"
  ],
  "B",
  "They also fear... quy chiếu về many artists ở đoạn liền trước.",
  "Đại từ “they” cần hỏi nằm ở đoạn 2 của bài PDF, không phải đoạn 3."
 ],
 [
  42,
  "Reading Comprehension",
  "What can be inferred about the song mentioned in paragraph 1?",
  [
   "The two stars recorded it together in a famous studio in LA.",
   "It was removed because nobody wanted to listen to it.",
   "Many listeners could not tell the voices were fake.",
   "It was written and performed by a talented teenager."
  ],
  "N/A",
  "Đoạn 1 nói chung về AI covers và khả năng sáng tác, không kể một bài hát cụ thể hoặc hai ngôi sao; không đủ bằng chứng suy ra đáp án nào.",
  "Câu gốc không khớp đoạn văn; không tính điểm, không suy đoán đáp án."
 ],
 [
  43,
  "Reading Comprehension",
  "The last paragraph suggests that ____________.",
  [
   "human feelings will still matter in music",
   "AI songs will be banned in every country",
   "audiences now prefer voices made by computers",
   "talent shows will soon stop using judges"
  ],
  "A",
  "Dòng cuối: audiences still want to feel a real human connection; do đó cảm xúc/gắn kết thật vẫn quan trọng.",
  ""
 ],
 [
  44,
  "Reading Comprehension",
  "According to the note, the \"filling\" of the feedback should ____________.",
  [
   "list everything the performer did wrong",
   "praise the performer in general terms",
   "compare the performer with other contestants",
   "suggest one specific way to improve"
  ],
  "D",
  "Filling: Give one suggestion for improvement and explain how to do it, nên đáp án D sát nhất.",
  ""
 ],
 [
  45,
  "Reading Comprehension",
  "Which judge's comment follows the note best?",
  [
   "\"That was nice. Well done – everyone in the studio loved it, and your whole family must be so proud!\"",
   "\"Your opening high notes were great! Next time, slow the chorus down so every word is clear. Keep it up!\"",
   "\"Your voice sounded terrible in the second verse, but just keep going and never give up on your big dream!\"",
   "\"Slow the chorus down so every word is clear, and move around the stage more. Nice opening, by the way.\""
  ],
  "B",
  "B gồm khen cụ thể → một đề xuất cải thiện → kết bằng khích lệ, đúng 3 phần sandwich.",
  ""
 ],
 [
  46,
  "Word Forms",
  "(ENVIRONMENT) Plastic straws cause serious ________________________ problems for sea turtles all over the world.",
  null,
  "environmental",
  "Cần tính từ environmental bổ nghĩa cho danh từ problems (environment → environmental).",
  ""
 ],
 [
  47,
  "Word Forms",
  "(PERFORM) The violinist's emotional ________________________ moved the whole audience to tears.",
  null,
  "performance",
  "Tính từ emotional đứng trước danh từ performance (màn trình diễn).",
  ""
 ],
 [
  48,
  "Word Forms",
  "(BENEFIT) Learning to cook simple meals is ________________________ for teenagers who will one day live on their own.",
  null,
  "beneficial",
  "Sau is cần tính từ; beneficial for = có ích cho.",
  ""
 ],
 [
  49,
  "Word Forms",
  "(AWARE) Thanks to the campaign, local residents' ________________________ of the dangers of single-use plastic has grown.",
  null,
  "awareness",
  "Residents' là sở hữu cách nên cần danh từ awareness.",
  ""
 ],
 [
  50,
  "Word Forms",
  "(GRATITUDE) My grandmother is always ________________________ for any small help we give her around the house.",
  null,
  "grateful",
  "Be grateful for = biết ơn vì.",
  ""
 ],
 [
  51,
  "Word Forms",
  "(POLLUTE) Factories along the river have been fined for releasing harmful ________________ into the water.",
  null,
  "pollutants",
  "Harmful bổ nghĩa danh từ; pollutants = chất gây ô nhiễm, mang nghĩa các chất được xả vào nước.",
  ""
 ],
 [
  52,
  "Word Forms",
  "(RESPONSIBLE) It was really ________________________ of you to leave the air conditioner on all night while we were away.",
  null,
  "irresponsible",
  "Lãng phí điện khi đi vắng được đánh giá là irresponsible, tính từ trái nghĩa responsible.",
  ""
 ],
 [
  53,
  "Word Forms",
  "(EQUAL) Gender ________________________ still exists in many homes, where women do most of the unpaid housework.",
  null,
  "inequality",
  "Phân chia công việc nhà mất cân bằng là gender inequality.",
  ""
 ],
 [
  54,
  "Word Forms",
  "(RECYCLE) Make sure you only put ________________________ items such as cans and glass jars into the blue bin.",
  null,
  "recyclable",
  "Recyclable items là những vật có thể tái chế, không phải động từ recycle.",
  ""
 ],
 [
  55,
  "Word Forms",
  "(SUPPORT) My parents have always been very ________________________ of my dream of becoming a drummer.",
  null,
  "supportive",
  "Be supportive of = ủng hộ một nguyện vọng.",
  ""
 ],
 [
  56,
  "Word Forms",
  "(ELIMINATE) After receiving the fewest votes, the young rapper was ____________________ in the second round.",
  null,
  "eliminated",
  "Was + past participle eliminated: bị loại ở vòng hai.",
  ""
 ],
 [
  57,
  "Word Forms",
  "(IDENTITY) Many teenagers easily ________________________ with songs that describe the pressure of school life.",
  null,
  "identify",
  "Identify with = đồng cảm/cảm thấy mình giống với; chủ ngữ plural teenagers.",
  ""
 ],
 [
  58,
  "Word Forms",
  "(JUDGE) Some music critics are far too ________________________ – they criticise every new singer before even listening to a full song.",
  null,
  "judgemental",
  "Judgemental/judgmental là tính từ 'hay phán xét', hợp với 'criticise every new singer'.",
  ""
 ],
 [
  59,
  "Word Forms",
  "(SUSTAIN) Cutting down old forests to make paper is ________________________ because the trees cannot grow back fast enough.",
  null,
  "unsustainable",
  "Không thể duy trì lâu dài nếu rừng không mọc lại kịp → unsustainable.",
  ""
 ],
 [
  60,
  "Word Forms",
  "(FESTIVAL) Thousands of ________________________ camped near the main stage the night before the music festival opened.",
  null,
  "festivalgoers",
  "Festivalgoers là những người tham dự lễ hội, dạng số nhiều; từ ghép dựa trên festival.",
  "Đây là từ ghép festivalgoers/festival-goers, không phải biến đổi hậu tố thông thường của festival."
 ],
 [
  61,
  "Sentence Transformation",
  "They will hold this year's school music festival in the new sports hall. (held)\n→ This year's school music festival ...",
  null,
  "This year's school music festival will be held in the new sports hall.",
  "Will hold → will be held (bị động tương lai), giữ nguyên nơi chốn.",
  ""
 ],
 [
  62,
  "Sentence Transformation",
  "My plan is to start a small vegetable garden on our balcony next month. (going)\n→ I ...",
  null,
  "I am going to start a small vegetable garden on our balcony next month.",
  "Be going to + V biểu đạt kế hoạch, giữ next month.",
  ""
 ],
 [
  63,
  "Sentence Transformation",
  "Volunteers clean the beach in front of our school every Sunday morning. (is)\n→ The beach ...",
  null,
  "The beach in front of our school is cleaned by volunteers every Sunday morning.",
  "Is cleaned là bị động hiện tại đơn vì every Sunday morning.",
  ""
 ],
 [
  64,
  "Sentence Transformation",
  "Her parents didn't allow her to stay up late on the night before the audition. (let)\n→ Her parents ...",
  null,
  "Her parents didn't let her stay up late on the night before the audition.",
  "Didn't let + somebody + bare infinitive; không dùng to stay sau let.",
  ""
 ],
 [
  65,
  "Sentence Transformation",
  "Recording a single in a professional studio is very expensive. (to)\n→ It ...",
  null,
  "It is very expensive to record a single in a professional studio.",
  "Chuyển V-ing chủ ngữ thành It + be + adjective + to-infinitive.",
  ""
 ],
 [
  66,
  "Sentence Transformation",
  "It's my brother's habit to do the laundry on Saturday mornings. (usually)\n→ My brother ...",
  null,
  "My brother usually does the laundry on Saturday mornings.",
  "Usually đứng trước động từ thường ở hiện tại đơn; does khớp he.",
  ""
 ],
 [
  67,
  "Sentence Transformation",
  "The judges asked the band to play their song once more, and the band had no choice. (made)\n→ The judges ...",
  null,
  "The judges made the band play their song once more.",
  "Made somebody + bare infinitive; diễn đạt sự bắt buộc.",
  ""
 ],
 [
  68,
  "Sentence Transformation",
  "I predict that more teenagers will choose electric scooters in the near future. (probably)\n→ More teenagers ...",
  null,
  "More teenagers will probably choose electric scooters in the near future.",
  "Probably thường đứng sau will và trước động từ chính.",
  ""
 ],
 [
  69,
  "Sentence Transformation",
  "The audience gave the band a warm welcome when they walked on stage. (welcomed)\n→ The band ...",
  null,
  "The band was warmly welcomed by the audience when they walked on stage.",
  "Was warmly welcomed là bị động; warm chuyển thành trạng từ warmly.",
  ""
 ],
 [
  70,
  "Sentence Transformation",
  "Many families are very wasteful with electricity in summer. (wasted)\n→ A lot of electricity ...",
  null,
  "A lot of electricity is wasted by many families in summer.",
  "Electricity không đếm được → is wasted; mang nghĩa bị lãng phí.",
  ""
 ],
 [
  71,
  "Sentence Transformation",
  "This home-made soup has a delicious taste. (tastes)\n→ This home-made soup ...",
  null,
  "This home-made soup tastes delicious.",
  "Taste dùng như linking verb + adjective (delicious).",
  ""
 ],
 [
  72,
  "Sentence Transformation",
  "We intend to try harder to save electricity at home this year. (effort)\n→ We ...",
  null,
  "We intend to make a greater effort to save electricity at home this year.",
  "Make a greater effort to V: cố gắng nhiều hơn, giữ intend và this year.",
  ""
 ],
 [
  73,
  "Sentence Transformation",
  "Mum allowed me to decide which musical instrument I wanted to learn. (choice)\n→ Mum ...",
  null,
  "Mum gave me the choice of which musical instrument to learn.",
  "Give somebody the choice of + wh-clause / wh-to-infinitive.",
  ""
 ],
 [
  74,
  "Sentence Transformation",
  "There was a big improvement in the city's air quality after the motorbike ban. (improved)\n→ The city's air quality ...",
  null,
  "The city's air quality improved considerably after the motorbike ban.",
  "Danh từ improvement → động từ improved, thêm considerably phản ánh big.",
  ""
 ],
 [
  75,
  "Sentence Transformation",
  "Our family plans to reduce the amount of single-use plastic we use. (cut)\n→ Our family ...",
  null,
  "Our family plans to cut down on the amount of single-use plastic we use.",
  "Cut down on + danh từ = giảm mức tiêu thụ.",
  ""
 ],
 [
  76,
  "Sentence Transformation",
  "We must continue the clean-up; otherwise, the beach will soon be dirty again. (carry)\n→ We ...",
  null,
  "We must carry on with the clean-up; otherwise, the beach will soon be dirty again.",
  "Carry on with + noun = tiếp tục một hoạt động.",
  ""
 ],
 [
  77,
  "Sentence Transformation",
  "Bacteria decompose food waste in the compost bin quite quickly. (broken)\n→ Food waste ...",
  null,
  "Food waste is broken down by bacteria in the compost bin quite quickly.",
  "Break down = phân hủy; bị động is broken down.",
  ""
 ],
 [
  78,
  "Sentence Transformation",
  "My dad and I always disagree about which music to play in the car. (eye)\n→ My dad and I ...",
  null,
  "My dad and I never see eye to eye about which music to play in the car.",
  "See eye to eye (on/about something) = đồng quan điểm; never = thường bất đồng.",
  ""
 ],
 [
  79,
  "Sentence Transformation",
  "It is easy for teenagers to feel connected to the songs on her new album. (identify)\n→ Teenagers ...",
  null,
  "Teenagers can easily identify with the songs on her new album.",
  "Identify with = đồng cảm/gắn mình với nội dung bài hát.",
  ""
 ],
 [
  80,
  "Sentence Transformation",
  "Grandma is taking care of us this week because Mum and Dad are away. (looked)\n→ We ...",
  null,
  "We are being looked after by Grandma this week because Mum and Dad are away.",
  "Look after = chăm sóc; hiện tại tiếp diễn bị động are being looked after.",
  ""
 ]
];
const questions=ROWS.map(([number,section,stem,options,answer,hint,warning])=>({
 id:"7-"+number,number,section,stem,options,answer,hint,warning,
 context:number>=39&&number<=43?PASSAGE_AI:number>=44&&number<=45?PASSAGE_NOTE:""
}));
const intro={39:"III. READING COMPREHENSION\nRead the following passage and answer the questions.\n"+PASSAGE_AI,44:"Read the following study note and answer the questions.\n"+PASSAGE_NOTE};
const paperQuestions=questions.map(q=>({
 id:String(q.number),number:q.number,knowledge:null,prompt:q.stem,choices:q.options,kind:q.options?"choice":"written",
 intro:q.context,canonicalId:q.id
}));
let lines=["MARIE CURIE HIGH SCHOOL - HO CHI MINH CITY","PRACTICE TEST - GRADE 10 - MID-TERM 1"];
let prev="";
for(const q of questions){
 if(q.section!==prev){
  if(q.number===1)lines.push("I. PHONETICS");
  else if(q.number===11)lines.push("II. VOCABULARY AND GRAMMAR");
  else if(q.number===39)lines.push("III. READING COMPREHENSION");
  else if(q.number===46)lines.push("IV. WORD FORMS");
  else if(q.number===61)lines.push("V. SENTENCE TRANSFORMATION");
  prev=q.section;
 }
 if(intro[q.number])lines.push(intro[q.number]);
 lines.push("Question "+q.number+". "+q.stem);
 if(q.options)q.options.forEach((v,i)=>lines.push("ABCD"[i]+". "+v));
}
const test={id:7,title:"Test 7 · Marie Curie",questions};
const paper={raw:lines.join("\n\n"),questions:paperQuestions,paperIntro:"PRACTICE TEST - GRADE 10 - MID-TERM 1"};
const ACCEPT_WRITTEN={"7-58":["judgmental"],"7-60":["festival-goers","festival goers"]};
global.G10_MIDTERM_MARIE={test,paper,ACCEPT_WRITTEN,PASSAGE_AI,PASSAGE_NOTE};
})(window);
