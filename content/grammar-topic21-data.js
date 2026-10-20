/* Topic 21 — Inversions. Teacher preview content, v1.
 * All content here is public static data. Do not put private answer keys in this file.
 */
(function(g){
"use strict";
function Q(id,skill,stem,options,correct,why,wrong){
  return {id:id,skill:skill,stem:stem,options:options,correct:correct,why:why,wrong:wrong||{}};
}
const sections=[
{
  id:"mechanics",tag:"FOUNDATION",title:"Cơ chế đảo trợ động từ",minutes:8,
  outcome:"Phân biệt đảo trợ động từ với đảo động từ chính và chọn do/does/did khi cần.",
  concept:"Đảo ngữ nhấn mạnh thường xuất hiện khi một trạng ngữ phủ định hoặc hạn định đứng đầu mệnh đề. Trợ động từ (hoặc modal) chuyển lên trước chủ ngữ. Thì và ý nghĩa gốc không thay đổi.",
  form:"Negative / restrictive opener + auxiliary / modal + subject + main verb …",
  contrast:"Câu khẳng định dùng thì đơn không có trợ động từ? Thêm do/does/did; động từ chính trở về dạng nguyên mẫu. Nếu đã có have, be hoặc modal thích hợp, đảo chính trợ động từ đó.",
  steps:["Tìm cụm mở đầu tạo điều kiện đảo ngữ.","Xác định thì và trợ động từ; nếu thì đơn, thêm do/does/did.","Đưa trợ động từ lên trước chủ ngữ và giữ nguyên phần còn lại phù hợp với thì."],
  examples:[
    {normal:"I have never encountered a problem like this.",inverted:"Never have I encountered a problem like this.",why:"Đảo have lên trước I, không đổi hiện tại hoàn thành."},
    {normal:"She rarely makes such mistakes.",inverted:"Rarely does she make such mistakes.",why:"Hiện tại đơn: thêm does và đổi makes thành make."}
  ],
  misconception:"Sai thường gặp: Rarely makes she mistakes. Đây không phải mẫu đảo động từ chính như trong câu có trạng ngữ chỉ nơi chốn.",
  checks:[
    Q("l1q1","mechanics","Never ___ I witnessed such a convincing performance.",["did","have","was","do"],1,"Never + present perfect: have I witnessed. Không dùng did nếu đang giữ hiện tại hoàn thành.",{0:"Did I witness sẽ chuyển sang quá khứ đơn, không bảo toàn thì của ví dụ này.",2:"Was không kết hợp trực tiếp với witnessed ở đây.",3:"Do không phù hợp với witnessed và ý nghĩa hiện tại hoàn thành."}),
    Q("l1q2","mechanics","Rarely ___ the committee change its decision after a final vote.",["does","is","has","do"],0,"Chủ ngữ the committee được dùng như một tập thể số ít trong câu này; dùng does + change.",{1:"Is không tạo câu chủ động change như ở đây.",2:"Has change sai cấu trúc; cần has changed ở hiện tại hoàn thành.",3:"Do không hòa hợp với chủ ngữ số ít trong cách dùng này."})
  ]
},
{
  id:"negative",tag:"NEGATIVE OPENERS",title:"Never, Little, Not only và các cụm phủ định",minutes:9,
  outcome:"Nhận ra phạm vi phủ định, cấu trúc not only và chọn đúng trợ động từ.",
  concept:"Never, seldom, rarely, little (nghĩa ‘hầu như không’), under no circumstances, at no time, on no account… ở đầu mệnh đề có thể tạo đảo trợ động từ nhằm nhấn mạnh hoặc tăng tính trang trọng.",
  form:"Little / Under no circumstances / Not only + auxiliary + subject + verb …",
  contrast:"Little ở đây không có nghĩa ‘nhỏ’ mà là ‘hầu như không’; Not only ... but also liên kết hai ý, nhưng phần đảo ngữ thường nằm ở vế mở đầu bằng Not only.",
  steps:["Kiểm tra cụm đầu câu có mang ý phủ định hoặc hạn định không.","Nếu câu có modal, đảo modal: Under no circumstances should you …","Với not only, giữ cấu trúc của mệnh đề còn lại đúng về ngữ nghĩa và tính song song."],
  examples:[
    {normal:"I did not realise how serious the issue was.",inverted:"Little did I realise how serious the issue was.",why:"Little mang nghĩa gần như hoàn toàn không nhận ra, tạo hiệu ứng nhấn mạnh."},
    {normal:"She explained the plan and offered to help.",inverted:"Not only did she explain the plan, but she also offered to help.",why:"Đảo did she explain chỉ trong mệnh đề được mở bằng not only."}
  ],
  misconception:"Không phải mọi từ mang nghĩa phủ định đều đảo ngữ. Ví dụ ‘I never leave early’ vẫn là trật tự bình thường khi never đứng sau chủ ngữ.",
  checks:[
    Q("l2q1","negative","Under no circumstances ___ exam candidates share their answers.",["do","should","are","have"],1,"Under no circumstances đứng đầu + should + subject + bare infinitive; nghĩa là tuyệt đối không được.",{0:"Do không diễn tả quy định/cấm đoán bằng should như ý câu.",2:"Are share không đúng mẫu động từ.",3:"Have share không đúng dạng động từ."}),
    Q("l2q2","negative","Not only ___ the research team identify the problem, but it also proposed a solution.",["was","had","did","does"],2,"Đảo did the research team identify cho hành động quá khứ.",{0:"Was identify sai cấu trúc.",1:"Had identify phải là had identified và đổi thì.",3:"Does không phù hợp mốc quá khứ proposed."})
  ]
},
{
  id:"only",tag:"SCOPE & MAIN CLAUSE",title:"Only when/after và Not until",minutes:10,
  outcome:"Đảo đúng ở mệnh đề chính, không đảo bên trong mệnh đề bắt đầu bằng only when/not until.",
  concept:"Khi Only when/after/if + mệnh đề hoặc Not until + mốc thời gian/mệnh đề được đưa lên đầu, sự đảo trợ động từ thường diễn ra ở mệnh đề chính phía sau, KHÔNG phải trong mệnh đề phụ.",
  form:"Only when + subject + verb …, + auxiliary + subject + verb …",
  contrast:"Only when she arrived DID we begin (đúng); Only when DID she arrive we began (sai). Riêng only + chủ ngữ như Only Anna knew the truth thường KHÔNG tạo đảo ngữ.",
  steps:["Xác định ranh giới của cụm only/not until mở đầu.","Giữ trật tự S–V trong mệnh đề phụ (if/when/after...).","Chỉ đảo trợ động từ trong mệnh đề chính bắt đầu sau phần mở đầu."],
  examples:[
    {normal:"We understood the consequences only after we had read the report.",inverted:"Only after we had read the report did we understand the consequences.",why:"We had read giữ nguyên S–V; did we understand nằm ở mệnh đề chính."},
    {normal:"She did not admit the mistake until the evidence appeared.",inverted:"Not until the evidence appeared did she admit the mistake.",why:"Not until + mệnh đề thường; mệnh đề chính đảo did she admit."}
  ],
  misconception:"Không được đảo hai lần. Câu ‘Only when had we finished could we leave’ sai vì had we finished nằm trong mệnh đề phụ.",
  checks:[
    Q("l3q1","only","Only when the results were published ___ the researchers realise the scale of the problem.",["did","had","were","do"],0,"Mệnh đề when the results were published không đảo; mệnh đề chính đảo did the researchers realise.",{1:"Had realise không đúng dạng; had realised cũng thay đổi thì.",2:"Were the researchers realise sai cấu trúc.",3:"Do không phù hợp bối cảnh quá khứ were published."}),
    Q("l3q2","only","Choose the correct sentence.",["Only after did she leave we started the meeting.","Not until had he called did we know.","Only when she returned did we open the letter.","Only my brother did know the answer."],2,"C: mệnh đề phụ she returned giữ trật tự thường, mệnh đề chính did we open đảo.",{0:"Đảo nhầm trong mệnh đề mở đầu với only after.",1:"Had he called sai vì mệnh đề not until không đảo.",3:"Only bổ nghĩa cho chủ ngữ my brother, nên thông thường nói Only my brother knew the answer."})
  ]
},
{
  id:"time",tag:"SEQUENCING",title:"Hardly/Scarcely/Barely và No sooner",minutes:9,
  outcome:"Phân biệt cấu trúc chuỗi sự kiện và cặp liên từ when/than.",
  concept:"Các cấu trúc này nhấn mạnh sự kiện thứ hai xảy ra gần như ngay sau sự kiện thứ nhất. Past perfect + past simple là một mẫu rất thường gặp, nhưng thì cụ thể phụ thuộc ngữ cảnh và ý nghĩa.",
  form:"Hardly / Scarcely / Barely + had + S + V3 + when + S + V2. No sooner + had + S + V3 + than + S + V2.",
  contrast:"Hardly ... when; No sooner ... than. Không hoán đổi liên từ trong các bài tập kiểm tra cấu trúc chuẩn.",
  steps:["Xác định sự kiện đến trước và đến sau.","Sự kiện trước thường dùng had + V3 và đảo had lên trước chủ ngữ.","Chọn đúng liên từ: when sau hardly; than sau no sooner."],
  examples:[
    {normal:"I had barely sat down when the phone rang.",inverted:"Barely had I sat down when the phone rang.",why:"Barely chuyển lên đầu, had đảo; when nối sự kiện xảy ra ngay sau."},
    {normal:"The train had just departed when the storm began.",inverted:"No sooner had the train departed than the storm began.",why:"No sooner đi với than trong mẫu hai sự kiện nối tiếp."}
  ],
  misconception:"No sooner ... when là bẫy thường gặp. Lưu ý no sooner cũng có thể dùng với was/were trong một số trường hợp; không nên khẳng định nó LUÔN đi với had.",
  checks:[
    Q("l4q1","time","No sooner had the conference begun ___ the fire alarm went off.",["when","that","than","then"],2,"No sooner đi với than trong cấu trúc chuẩn.",{0:"When thường đi với hardly/scarcely/barely.",1:"That không kết nối được cặp này.",3:"Then là trạng từ thời gian, không phải liên từ trong cấu trúc cố định."}),
    Q("l4q2","time","Hardly ___ the guests arrived when the ceremony was interrupted.",["have","did","had","were"],2,"Hardly had the guests arrived when ... sử dụng past perfect cho sự kiện xảy ra trước.",{0:"Have không phù hợp chuỗi sự kiện quá khứ.",1:"Did ... arrived sai dạng; sau did phải arrive, và không phải mẫu tiêu biểu ở đây.",3:"Were arrived không diễn đạt hành động chủ động arrive."})
  ]
},
{
  id:"conditional",tag:"HYPOTHETICAL",title:"Đảo ngữ trong câu điều kiện",minutes:11,
  outcome:"Chuyển đúng If ... thành Had/Were/Should mà vẫn bảo toàn ý nghĩa và thời gian.",
  concept:"Trong văn phong trang trọng, một số mệnh đề điều kiện bỏ if và đưa had, were hoặc should lên đầu. Không phải mọi câu điều kiện đều có thể chuyển cơ học theo cách này.",
  form:"Had + S + V3 …, would have + V3. Were + S + (to V / complement) …, would + V. Should + S + V …, main clause.",
  contrast:"Had I known = If I had known. Were I to be selected = If I were to be selected. Should you need help = If you should need help. Không dùng Did I know để thay cho If I knew theo kiểu chung.",
  steps:["Xác định loại điều kiện và khung thời gian.","Kiểm tra mệnh đề if có had / were / should hoặc có thể viết lại đúng với các cấu trúc này.","Bỏ if, đảo had/were/should lên trước chủ ngữ; giữ mệnh đề kết quả phù hợp."],
  examples:[
    {normal:"If I had received the message, I would have replied.",inverted:"Had I received the message, I would have replied.",why:"Điều kiện không có thật trong quá khứ: đảo had."},
    {normal:"If you should require assistance, please contact us.",inverted:"Should you require assistance, please contact us.",why:"Should ở đầu diễn đạt điều kiện có khả năng xảy ra, sắc thái trang trọng."}
  ],
  misconception:"Cẩn thận với ‘Were I you’ (có thể dùng) và ‘Were I to ...’ (khả năng giả định): không thể đơn giản bỏ if rồi đảo tất cả động từ chính trong câu điều kiện.",
  checks:[
    Q("l5q1","conditional","___ the manager known about the risk, she would have acted sooner.",["Were","Should","Had","Did"],2,"Had the manager known = If the manager had known; kết quả would have acted xác nhận quá khứ không có thật.",{0:"Were ... known không diễn đạt đúng điều kiện quá khứ này.",1:"Should the manager known sai; should + bare infinitive.",3:"Did the manager known sai hình thái và không phải mẫu thay thế if trong câu này."}),
    Q("l5q2","conditional","___ you need any further information, please email the office.",["Should","Had","Were","Did"],0,"Should you need ... là câu điều kiện đảo ngữ trang trọng.",{1:"Had you need sai dạng và không phải điều kiện tương lai.",2:"Were you need sai mẫu, có thể là Were you to need.",3:"Did you need không phải cấu trúc đảo ngữ điều kiện chuẩn ở đây."})
  ]
},
{
  id:"so-such",tag:"EMPHASIS",title:"So ... that và Such ... that",minutes:10,
  outcome:"Nhận diện cấu trúc nhấn mạnh với tính từ/trạng từ hoặc danh từ, không nhầm so và such.",
  concept:"So + adjective/adverb có thể đưa lên đầu và đảo trợ động từ hoặc be trong cấu trúc nhấn mạnh. Such + be + subject + that thường mô tả một sự vật hoặc mức độ đáng chú ý.",
  form:"So + adjective + be + S + that ... / So + adverb + auxiliary + S + V + that ... / Such + be + noun phrase + that ...",
  contrast:"So difficult was the exam that ... nhấn mạnh tính chất khó. Such was the difficulty of the exam that ... nhấn mạnh mức độ khó như một danh ngữ.",
  steps:["Xem thành phần đưa lên đầu là tính từ/trạng từ (so) hay cấu trúc danh từ (such).","Nếu có be, đảo be; nếu là động từ thường với trạng từ, dùng trợ động từ phù hợp.","Giữ that-clause để thể hiện hệ quả."],
  examples:[
    {normal:"The problem was so complex that nobody could solve it.",inverted:"So complex was the problem that nobody could solve it.",why:"Tính từ complex được đưa lên sau so; was đứng trước the problem."},
    {normal:"The impact was so great that the law was changed.",inverted:"Such was the impact that the law was changed.",why:"Such + was + cụm danh từ the impact, không phải so + danh từ."}
  ],
  misconception:"‘So was the problem complex’ không phải cách diễn đạt mục tiêu này. Phải đưa tính từ lên đầu: So complex was the problem ...",
  checks:[
    Q("l6q1","so-such","___ strong was the evidence that the jury reached a unanimous verdict.",["Such","Too","So","Very"],2,"So + strong + was + subject + that ... là mẫu nhấn mạnh tính từ.",{0:"Such thường mở Such was the strength of the evidence ...",1:"Too không tạo cấu trúc này với that.",3:"Very không tạo đảo ngữ nhấn mạnh với that như ở đây."}),
    Q("l6q2","so-such","___ was her determination that the team refused to give up.",["So","Such","Too","Very"],1,"Such was her determination that ... phù hợp với danh ngữ her determination.",{0:"So cần tính từ/trạng từ: So determined was she that ...",2:"Too was her determination là sai mẫu.",3:"Very không được sử dụng theo cấu trúc này."})
  ]
},
{
  id:"full",tag:"ADVANCED DISTINCTIONS",title:"Đảo hoàn toàn và những trường hợp không đảo",minutes:9,
  outcome:"Phân biệt trợ động từ đảo ngữ với full inversion; tránh đảo khi only bổ nghĩa cho chủ ngữ hoặc khi sau here là đại từ.",
  concept:"Trong một số cấu trúc trình bày địa điểm hoặc xuất hiện, động từ chính đứng trước chủ ngữ danh từ: Here comes the bus; On the hill stood a castle. Đây là full inversion, khác với negative inversion. Khi chủ ngữ là đại từ, thường không đảo ở mẫu here/there.",
  form:"Here / There + main verb + noun subject. / Here + pronoun subject + main verb.",
  contrast:"Here comes the bus (danh từ) nhưng Here it comes (đại từ). ‘Only Sarah understood’ không đảo vì only bổ nghĩa trực tiếp cho chủ ngữ.",
  steps:["Tìm xem thành phần đầu câu là chỉ địa điểm/xuất hiện hay phủ định/hạn định.","Nếu là full inversion, thường dùng động từ mô tả vị trí/chuyển động trước chủ ngữ danh từ.","Nếu sau here/there là đại từ, thường giữ trật tự pronoun + verb; với only + chủ ngữ, không ép đảo."],
  examples:[
    {normal:"An old cottage stood beside the river.",inverted:"Beside the river stood an old cottage.",why:"Cụm chỉ địa điểm lên trước và động từ stood đứng trước chủ ngữ danh từ."},
    {normal:"The bus is coming here.",inverted:"Here comes the bus. / Here it comes.",why:"Danh từ the bus cho phép here comes the bus; với it dùng here it comes."}
  ],
  misconception:"Không coi mọi trạng ngữ lên đầu là tín hiệu bắt buộc đảo ngữ. ‘Yesterday I met her’ vẫn có thể giữ S–V hoàn toàn bình thường.",
  checks:[
    Q("l7q1","full","Choose the grammatical sentence.",["Here comes it.","Here it comes.","Here does it come.","Here did it comes."],1,"Here it comes: với đại từ it, giữ trật tự chủ ngữ + động từ.",{0:"Here comes it sai kiểu trật tự thông thường với đại từ.",2:"Không có do-support trong câu trần thuật này.",3:"Did it comes vừa sai trật tự vừa sai dạng động từ."}),
    Q("l7q2","full","Only the head teacher ___ the complete details of the incident.",["did know","has knew","knew","knowing"],2,"Only bổ nghĩa cho chủ ngữ the head teacher nên không bắt buộc đảo ngữ; knew là quá khứ đơn thông thường.",{0:"Did know có thể là dạng nhấn mạnh đặc biệt, nhưng không phải đảo ngữ bắt buộc; trong ngữ cảnh trung tính chọn knew.",1:"Has knew sai vì sau has cần known.",3:"Knowing không tạo vị ngữ hữu hạn."})
  ]
}
];
const practice=[
 Q("p01","mechanics","Rarely ___ we encounter a case with so little evidence.",["are","do","have","did"],1,"Trạng ngữ phủ định ở đầu với hiện tại đơn: Rarely do we encounter."),
 Q("p02","mechanics","Choose the correctly inverted form of 'I had never heard that explanation before.'",["Never had I heard that explanation before.","Never I had heard that explanation before.","Never did I had heard that explanation before.","Never had heard I that explanation before."],0,"Đảo had trước chủ ngữ và giữ past participle heard."),
 Q("p03","negative","On no account ___ the confidential files be copied.",["has","did","must","does"],2,"On no account + must + S + V nguyên mẫu thể hiện cấm đoán."),
 Q("p04","negative","Choose a grammatically correct sentence.",["Not only she solved the problem but she explained it.","Not only did she solve the problem, but she also explained it.","Not only did she solved the problem, but she explained it.","Not only had she solve the problem, but she explained it."],1,"Not only did she solve ...; sau did là solve, và mệnh đề thứ hai giữ cấu trúc thường."),
 Q("p05","only","Only after everyone had signed the agreement ___ the project begin.",["was","did","had","does"],1,"Only after + mệnh đề S–V, sau đó did the project begin."),
 Q("p06","only","Which part is inverted in 'Not until the lights went out did we notice the warning'?",["the lights went out","until the lights","did we notice","the warning"],2,"Cụm not until đứng đầu; đảo did we notice ở mệnh đề chính."),
 Q("p07","time","Hardly had the speaker begun ___ the microphone stopped working.",["than","then","that","when"],3,"Hardly ... when là cặp điển hình."),
 Q("p08","time","No sooner ___ the doors closed than the crowd started cheering.",["did","were","had","have"],2,"No sooner had the doors closed than ... cho chuỗi sự kiện quá khứ."),
 Q("p09","conditional","If she had taken the warning seriously, she might have avoided the accident. Choose the equivalent.",["Should she take the warning seriously, she might have avoided the accident.","Had she taken the warning seriously, she might have avoided the accident.","Were she taking the warning seriously, she might have avoided the accident.","Did she take the warning seriously, she might have avoided the accident."],1,"Had she taken ... thay If she had taken ... mà không đổi thời gian."),
 Q("p10","conditional","___ the situation to deteriorate, immediate action would be necessary.",["Had","Should","Were","Did"],2,"Were the situation to deteriorate ... là dạng đảo điều kiện giả định."),
 Q("p11","so-such","So persuasive ___ her argument that the committee changed its position.",["was","were","did","had"],0,"So + adj + was + subject + that-clause."),
 Q("p12","so-such","Choose the correct sentence.",["Such remarkable was his patience that ...","Such was his patience that everyone admired him.","So was his patience that everyone admired him.","Such did his patience that everyone admired him."],1,"Such was his patience ... theo cấu trúc danh ngữ."),
 Q("p13","full","Near the entrance ___ a tall stone statue.",["was standing it","did stand","stood","standing"],2,"Near the entrance stood a tall stone statue là full inversion với danh từ làm chủ ngữ."),
 Q("p14","full","Choose the sentence that does NOT require subject–auxiliary inversion.",["Never she had seen this before.","Only Jenny knew the password.","On no account you must leave early.","Not until Monday we received the result."],1,"Only + chủ ngữ không yêu cầu đảo; những câu còn lại cần đảo trợ động từ trong mẫu này."),
 Q("p15","only","Not until the final witness spoke ___ the truth emerge.",["do","had","did","was"],2,"Not until + clause, did the truth emerge."),
 Q("p16","time","Choose the valid pairing.",["Hardly ... than","No sooner ... than","Scarcely ... than","No sooner ... when"],1,"No sooner ... than; hardly/scarcely thường đi với when.")
];
const mastery=[
 Q("m01","mechanics","Seldom ___ anyone challenge the chairperson so openly.",["do","does","is","has"],1,"Chủ ngữ anyone là số ít; đảo does anyone challenge."),
 Q("m02","negative","Little ___ the organisers realise how much trouble lay ahead.",["had","did","were","do"],1,"Little did the organisers realise ...; little = hầu như không."),
 Q("m03","only","Only when the data had been independently checked ___ the conclusion accepted.",["the team was","was the conclusion","did the conclusion","had the conclusion"],1,"Only when + mệnh đề thường, sau đó was the conclusion accepted (bị động)."),
 Q("m04","time","No sooner had the results been announced ___ objections began to emerge.",["when","that","than","then"],2,"No sooner ... than."),
 Q("m05","conditional","___ the application been submitted earlier, it might have been considered.",["Were","Should","Had","Did"],2,"Had the application been submitted ... = If it had been submitted ..."),
 Q("m06","so-such","___ severe was the shortage that several hospitals reduced their services.",["Such","So","Very","Too"],1,"So + severe + was ... + that."),
 Q("m07","full","Choose the correct form.",["Here comes she.","Here she comes.","Here does she come.","Here comes her."],1,"Here she comes: chủ ngữ đại từ không đảo theo mẫu full inversion."),
 Q("m08","only","Choose the correct version.",["Only after the experiment had ended did the researchers review their notes.","Only after had the experiment ended did the researchers review their notes.","Only after the experiment ended the researchers did review their notes.","Only after did the experiment end the researchers reviewed their notes."],0,"Mệnh đề after giữ S–V; did the researchers review nằm ở mệnh đề chính."),
 Q("m09","conditional","___ you require clarification, the instructions are available online.",["Had","Did","Should","Were"],2,"Should you require ... là một dạng điều kiện trang trọng."),
 Q("m10","negative","Select the most appropriate completion: 'At no time ___ the witness claim to have seen the suspect.'",["was","has","did","does"],2,"Trong câu tường thuật quá khứ, At no time did the witness claim ...")
];
const repairs=[
 Q("r01","mechanics","Never ___ I considered the possibility of a second attempt.",["did","had","was","do"],1,"Never had I considered... giữ quá khứ hoàn thành."),
 Q("r02","negative","In no way ___ the results justify that conclusion.",["do","are","is","has"],0,"In no way do the results justify... kết hợp hiện tại đơn và chủ ngữ số nhiều."),
 Q("r03","only","Only when the rain stopped ___ the children go outside.",["had","were","did","do"],2,"Mệnh đề when giữ S–V; mệnh đề chính đảo did the children go."),
 Q("r04","time","Scarcely had the concert started ___ the power failed.",["than","when","then","that"],1,"Scarcely ... when."),
 Q("r05","conditional","___ I been given more time, I would have checked the calculations.",["Should","Were","Had","Did"],2,"Had I been given = If I had been given."),
 Q("r06","so-such","___ was the extent of the damage that repairs took months.",["So","Such","Very","Too"],1,"Such was the extent ... với danh ngữ the extent."),
 Q("r07","full","Choose the correct word order.",["Along the river an old path ran.","Along the river ran an old path.","Along ran an old path the river.","An old path along the river ran."],1,"Full inversion có thể dùng: Along the river ran an old path. (A cũng đúng về ngữ pháp, nhưng không phải đảo ngữ).")
];
// The full-inversion remediation requires an unequivocal prompt, not just grammaticality.
repairs[6].stem="Which option demonstrates full inversion after a fronted place expression?";
const review=[
 Q("v01","mechanics","Never ___ we experienced such a sudden shift in demand.",["has","have","did","are"],1,"Never have we experienced... dùng present perfect."),
 Q("v02","only","Only once the contract was signed ___ construction commence.",["does","had","did","was"],2,"Only once + S–V, did construction commence."),
 Q("v03","time","Hardly had the first film finished ___ the audience asked for another.",["than","when","then","that"],1,"Hardly ... when."),
 Q("v04","conditional","___ we to postpone the launch, costs would rise.",["Had","Should","Were","Did"],2,"Were we to postpone ... diễn tả điều kiện giả định."),
 Q("v05","so-such","___ impressive was the turnaround that investors returned.",["Such","Very","So","Too"],2,"So impressive was ... that ...")
];
const skills=sections.map(x=>({id:x.id,title:x.title,outcome:x.outcome}));
const questions=[...sections.flatMap(x=>x.checks),...practice,...mastery,...repairs,...review];
const ids=new Set();
for(const x of questions){
  if(ids.has(x.id)||!Array.isArray(x.options)||x.options.length!==4||x.correct<0||x.correct>3||!x.why)throw new Error("Invalid topic 21 question "+x.id);
  ids.add(x.id);
}
g.GrammarTopic21Data={title:"CHUYÊN ĐỀ 21. ĐẢO NGỮ – INVERSIONS",sections:sections,skills:skills,practice:practice,mastery:mastery,repairs:repairs,review:review};
})(window);
