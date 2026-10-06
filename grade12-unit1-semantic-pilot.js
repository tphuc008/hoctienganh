(()=>{
const passage = `Dr. An devoted most of her career to improving healthcare in remote communities. Rather than building a single large hospital, she (6) ______ a network of small mobile clinics that could reach isolated villages. The programme helped (7) ______ the gap between urban and rural healthcare without requiring enormous infrastructure projects.

As the project gained national attention, Dr. An deliberately (8) ______ public attention from herself towards the local nurses and volunteers who kept the clinics running. When false rumours about the programme began circulating, her transparent response helped the organisation (9) ______ public trust. By the time she retired, the influence of her work had (10) ______ far beyond the communities she originally served.`;

const questions = [
  {
    id:"u1-sem-01", lockOptions:true,
    promptType:"SYNONYM", target:"formative", q:"Her formative years working alongside disadvantaged children strongly influenced the kind of leader she later became.",
    o:["educational","influential","memorable","preliminary"], a:1,
    e:"formative = có ảnh hưởng mạnh đến sự hình thành/phát triển."
  },
  {
    id:"u1-sem-02", lockOptions:true,
    promptType:"SYNONYM", target:"tenacity", q:"Despite repeated rejection from publishers, the young writer showed remarkable tenacity and continued revising her manuscript for years.",
    o:["resilience","perseverance","endurance","confidence"], a:1,
    e:"tenacity = sự kiên trì, bền bỉ không dễ bỏ cuộc."
  },
  {
    id:"u1-sem-03", lockOptions:true,
    promptType:"SYNONYM", target:"pivotal", q:"Winning the scholarship proved to be a pivotal moment in his life, allowing him to study abroad and completely change the direction of his career.",
    o:["prominent","decisive","beneficial","exceptional"], a:1,
    e:"pivotal = có tính quyết định, tạo bước ngoặt."
  },
  {
    id:"u1-sem-04", lockOptions:true,
    promptType:"SYNONYM", target:"acclaim", q:"Her first major scientific paper received widespread acclaim from researchers around the world.",
    o:["recognition","approval","praise","prestige"], a:2,
    e:"acclaim = sự ca ngợi nhiệt liệt, rộng rãi."
  },
  {
    id:"u1-sem-05", lockOptions:true,
    promptType:"SYNONYM", target:"legacy", q:"Although the reformer died decades ago, her ideas about equal access to education remain an important part of her legacy.",
    o:["reputation","inheritance","contribution","lasting influence"], a:3,
    e:"legacy = ảnh hưởng hoặc giá trị còn tồn tại sau một người."
  },
  {
    id:"u1-sem-06", lockOptions:true, type:"reading", context:passage,
    q:"Which option best fits blank (6)?",
    o:["founded","established","formed","launched"], a:1,
    e:"establish a network = thiết lập một mạng lưới có tổ chức."
  },
  {
    id:"u1-sem-07", lockOptions:true, type:"reading", context:passage,
    q:"Which option best fits blank (7)?",
    o:["narrow","reduce","bridge","ease"], a:2,
    e:"bridge the gap = thu hẹp/kết nối khoảng cách giữa hai bên."
  },
  {
    id:"u1-sem-08", lockOptions:true, type:"reading", context:passage,
    q:"Which option best fits blank (8)?",
    o:["transferred","shifted","diverted","redirected"], a:3,
    e:"redirect attention from A towards B = chủ động chuyển hướng chú ý từ A sang B."
  },
  {
    id:"u1-sem-09", lockOptions:true, type:"reading", context:passage,
    q:"Which option best fits blank (9)?",
    o:["preserve","maintain","sustain","retain"], a:3,
    e:"retain public trust = giữ được niềm tin vốn đã có khi nó có nguy cơ bị mất."
  },
  {
    id:"u1-sem-10", lockOptions:true, type:"reading", context:passage,
    q:"Which option best fits blank (10)?",
    o:["extended","spread","reached","rippled"], a:3,
    e:"influence rippled beyond = ảnh hưởng lan dần ra ngoài phạm vi ban đầu."
  }
];

const explanationById = {
"u1-sem-01":{
  mode:"semantic_precision",
  step1:[
    "formative = có tác động mạnh đến quá trình hình thành tính cách, tư duy hoặc năng lực của một người. Câu có thể hiểu: “Những năm tháng định hình khi cô làm việc cùng trẻ em có hoàn cảnh khó khăn đã ảnh hưởng mạnh đến kiểu lãnh đạo mà cô trở thành sau này.”",
    "Clue quyết định là “strongly influenced the kind of leader she later became”. Formative không chỉ nói một giai đoạn xảy ra sớm; nó nói rằng trải nghiệm trong giai đoạn đó góp phần tạo nên con người về sau. Vì vậy influential là gần nhất về nghĩa trong chính ngữ cảnh này.",
    "Collocation đáng nhớ: formative years, formative experience, formative influence. Trong các cụm này, formative luôn mang ý “định hình sự phát triển”, không đơn thuần là “đầu tiên” hay “đáng nhớ”."
  ],
  options:[
    {label:"A",word:"educational",meaning:"mang tính giáo dục",analysis:"Educational nhấn mạnh việc cung cấp kiến thức hoặc giá trị học tập. Một trải nghiệm có thể educational nhưng không nhất thiết thay đổi cách một người phát triển về lâu dài, nên phạm vi nghĩa hẹp và khác trọng tâm của formative."},
    {label:"B",word:"influential",meaning:"có ảnh hưởng mạnh",analysis:"Đây là đáp án sát nhất vì câu nhấn mạnh tác động lâu dài lên con người mà cô trở thành. Influential bao quát đúng cơ chế “tạo ảnh hưởng”, dù formative còn cụ thể hơn ở chỗ ảnh hưởng đó xảy ra trong giai đoạn phát triển."},
    {label:"C",word:"memorable",meaning:"đáng nhớ",analysis:"Memorable nói trải nghiệm dễ được nhớ lại, không nói trải nghiệm đó đã thay đổi hay định hình con người. Một kỷ niệm có thể rất memorable nhưng gần như không có formative effect."},
    {label:"D",word:"preliminary",meaning:"sơ bộ, ban đầu",analysis:"Preliminary nói về thứ xảy ra trước giai đoạn chính, như preliminary research hoặc preliminary results. Nó mang quan hệ thời gian/quy trình, không mang nghĩa ảnh hưởng đến sự phát triển cá nhân."}
  ],
  examples:[
    {label:"A",word:"educational",en:"The museum offers an educational programme for primary-school students.",vi:"Bảo tàng cung cấp một chương trình mang tính giáo dục cho học sinh tiểu học."},
    {label:"B",word:"influential",en:"Her first mentor was highly influential in shaping her approach to leadership.",vi:"Người cố vấn đầu tiên có ảnh hưởng rất lớn đến cách cô hình thành phong cách lãnh đạo."},
    {label:"C",word:"memorable",en:"Graduation day was one of the most memorable moments of his university life.",vi:"Ngày tốt nghiệp là một trong những khoảnh khắc đáng nhớ nhất thời đại học của anh ấy."},
    {label:"D",word:"preliminary",en:"The researchers released preliminary findings before the full report was completed.",vi:"Các nhà nghiên cứu công bố những phát hiện sơ bộ trước khi báo cáo đầy đủ hoàn thành."}
  ],
  remember:"formative experience/years = trải nghiệm hoặc giai đoạn có tác dụng định hình con người về sau; không đồng nghĩa với merely early, educational hay memorable."
},
"u1-sem-02":{
  mode:"semantic_precision",
  step1:[
    "tenacity = sự kiên trì, bền bỉ, đặc biệt là không chịu từ bỏ mục tiêu dù liên tục gặp trở ngại. Câu có thể hiểu: “Mặc dù liên tục bị các nhà xuất bản từ chối, nhà văn trẻ vẫn thể hiện sự kiên trì đáng kể và tiếp tục chỉnh sửa bản thảo trong nhiều năm.”",
    "Hai clue quan trọng là “repeated rejection” và “continued revising ... for years”. Trọng tâm không phải cô ấy phục hồi sau một cú sốc, cũng không chỉ chịu đựng khó khăn; cô ấy tiếp tục thực hiện cùng một hành động hướng tới cùng một mục tiêu. Vì vậy perseverance là lựa chọn gần nhất.",
    "Tenacity thường mạnh hơn sự chăm chỉ thông thường: nó gợi cảm giác bám chặt mục tiêu và rất khó bị khiến cho bỏ cuộc."
  ],
  options:[
    {label:"A",word:"resilience",meaning:"khả năng phục hồi sau khó khăn",analysis:"Resilience tập trung vào khả năng recover hoặc bounce back sau thất bại, khủng hoảng hay cú sốc. Câu này nhấn mạnh continued effort hơn là quá trình phục hồi, nên resilience gần nhưng chưa chính xác bằng perseverance."},
    {label:"B",word:"perseverance",meaning:"sự kiên trì theo đuổi mục tiêu dù gặp khó khăn",analysis:"Đây là đáp án tốt nhất vì nó khớp trực tiếp với repeated rejection + continued revising for years: hành động vẫn tiếp diễn hướng tới cùng một mục tiêu bất chấp thất bại."},
    {label:"C",word:"endurance",meaning:"sức chịu đựng lâu dài",analysis:"Endurance thường nhấn mạnh khả năng chịu đựng pain, fatigue hoặc hardship trong thời gian dài. Nhà văn không chỉ chịu sự từ chối; cô còn chủ động tiếp tục sửa bản thảo, nên perseverance chính xác hơn."},
    {label:"D",word:"confidence",meaning:"sự tự tin",analysis:"Confidence liên quan niềm tin vào năng lực bản thân. Một người có thể thiếu tự tin nhưng vẫn kiên trì, hoặc rất tự tin nhưng nhanh chóng bỏ cuộc; vì thế đây không phải nghĩa trung tâm của tenacity."}
  ],
  examples:[
    {label:"A",word:"resilience",en:"The community showed remarkable resilience after the devastating flood.",vi:"Cộng đồng thể hiện khả năng phục hồi đáng kể sau trận lũ tàn phá."},
    {label:"B",word:"perseverance",en:"Her perseverance eventually paid off after dozens of unsuccessful job applications.",vi:"Sự kiên trì của cô cuối cùng đã được đền đáp sau hàng chục lần xin việc không thành công."},
    {label:"C",word:"endurance",en:"Long-distance runners need exceptional physical endurance.",vi:"Người chạy đường dài cần sức bền thể chất rất cao."},
    {label:"D",word:"confidence",en:"His confidence grew after he successfully delivered several public presentations.",vi:"Sự tự tin của anh ấy tăng lên sau khi thực hiện thành công một số bài thuyết trình trước công chúng."}
  ],
  remember:"perseverance = tiếp tục cố gắng; resilience = phục hồi sau cú sốc; endurance = chịu đựng lâu dài. Tenacity gần nhất với perseverance trong câu này."
},
"u1-sem-03":{
  mode:"semantic_precision",
  step1:[
    "pivotal = có tính then chốt, quyết định đối với hướng phát triển sau đó. Câu nói học bổng không chỉ là một điều tốt xảy ra trong đời anh ấy; nó mở cơ hội du học và “completely change the direction of his career”, tức làm thay đổi quỹ đạo sự nghiệp.",
    "Vì vậy decisive là gần nhất. Decisive có thể mô tả một factor, moment hoặc action có ảnh hưởng quyết định đến kết quả hoặc hướng đi. Pivotal còn gợi hình ảnh một điểm xoay: trước và sau thời điểm đó, hướng phát triển đã khác.",
    "Collocation đáng nhớ: pivotal moment, pivotal role, pivotal decision. Khi gặp pivotal, hãy tìm xem câu có mô tả một điểm làm thay đổi hoặc quyết định diễn biến sau đó hay không."
  ],
  options:[
    {label:"A",word:"prominent",meaning:"nổi bật, quan trọng hoặc dễ được chú ý",analysis:"Prominent nói vị trí nổi bật hoặc mức độ được chú ý, như a prominent scientist. Một moment có thể prominent trong một câu chuyện, nhưng từ này không tự mang nghĩa “làm thay đổi hướng đi”."},
    {label:"B",word:"decisive",meaning:"mang tính quyết định",analysis:"Đáp án sát nhất vì scholarship trực tiếp tạo điều kiện cho việc du học và thay đổi sự nghiệp. Decisive diễn đạt đúng chức năng quyết định của pivotal trong ngữ cảnh."},
    {label:"C",word:"beneficial",meaning:"có lợi",analysis:"Beneficial chỉ cho biết kết quả tích cực. Học bổng rõ ràng có lợi, nhưng pivotal mạnh hơn: nó là bước ngoặt làm thay đổi trajectory, chứ không chỉ đem lại lợi ích."},
    {label:"D",word:"exceptional",meaning:"xuất sắc, khác thường",analysis:"Exceptional đánh giá mức độ đặc biệt hoặc chất lượng vượt trội. Nó không diễn đạt quan hệ nhân quả giữa moment này và hướng đi sau đó."}
  ],
  examples:[
    {label:"A",word:"prominent",en:"She became a prominent voice in the campaign for educational reform.",vi:"Cô trở thành một tiếng nói nổi bật trong chiến dịch cải cách giáo dục."},
    {label:"B",word:"decisive",en:"The final interview was decisive in determining who received the scholarship.",vi:"Buổi phỏng vấn cuối cùng có tính quyết định trong việc xác định ai nhận học bổng."},
    {label:"C",word:"beneficial",en:"Regular feedback can be beneficial to young researchers.",vi:"Phản hồi thường xuyên có thể có lợi cho các nhà nghiên cứu trẻ."},
    {label:"D",word:"exceptional",en:"The committee recognised her exceptional contribution to public health.",vi:"Ủy ban ghi nhận đóng góp xuất sắc của cô đối với y tế công cộng."}
  ],
  remember:"pivotal = không chỉ important; nó chỉ một người, quyết định hoặc thời điểm có vai trò làm thay đổi/định đoạt hướng phát triển."
},
"u1-sem-04":{
  mode:"semantic_precision",
  step1:[
    "acclaim = sự ca ngợi nhiệt liệt và công khai, thường từ công chúng hoặc giới chuyên môn. Câu có thể hiểu: “Bài báo khoa học lớn đầu tiên của cô nhận được sự ca ngợi rộng rãi từ các nhà nghiên cứu trên khắp thế giới.”",
    "Widespread là clue quan trọng: acclaim thường đi với public/critical/international acclaim và hàm ý đánh giá tích cực mạnh. Praise là từ gần nhất vì cùng chỉ lời hoặc sự đánh giá tích cực trực tiếp dành cho thành tựu.",
    "Recognition có thể là được thừa nhận mà không nhất thiết được ca ngợi; approval là sự đồng ý/chấp thuận; prestige là địa vị uy tín tích lũy theo thời gian. Những khác biệt này khiến praise chính xác nhất."
  ],
  options:[
    {label:"A",word:"recognition",meaning:"sự công nhận",analysis:"Recognition nhấn mạnh việc thành tựu được nhận biết và thừa nhận. Nó có thể tích cực nhưng không bắt buộc có mức độ khen ngợi mạnh như acclaim."},
    {label:"B",word:"approval",meaning:"sự tán thành hoặc chấp thuận",analysis:"Approval thường trả lời câu hỏi một người/cơ quan có đồng ý với kế hoạch, hành động hay quyết định hay không. Một paper có thể be approved for publication, nhưng receive acclaim là được ca ngợi."},
    {label:"C",word:"praise",meaning:"sự ca ngợi",analysis:"Đây là đáp án gần nhất vì acclaim về bản chất là strong public praise. Widespread praise from researchers giữ đúng cả thái độ tích cực lẫn phạm vi công khai."},
    {label:"D",word:"prestige",meaning:"uy tín, thanh thế",analysis:"Prestige là địa vị hoặc sự kính trọng mà người/tổ chức có được, thường tích lũy qua thành tích. Ta gain prestige, nhưng một paper thường receives acclaim rather than receives prestige."}
  ],
  examples:[
    {label:"A",word:"recognition",en:"The discovery brought the young scientist international recognition.",vi:"Phát hiện đó mang lại cho nhà khoa học trẻ sự công nhận quốc tế."},
    {label:"B",word:"approval",en:"The research team received official approval to begin the clinical trial.",vi:"Nhóm nghiên cứu nhận được sự chấp thuận chính thức để bắt đầu thử nghiệm lâm sàng."},
    {label:"C",word:"praise",en:"Her clear explanation of the complex issue won praise from senior researchers.",vi:"Cách cô giải thích rõ ràng vấn đề phức tạp nhận được lời khen từ các nhà nghiên cứu kỳ cựu."},
    {label:"D",word:"prestige",en:"The award increased the university's international prestige.",vi:"Giải thưởng làm tăng uy tín quốc tế của trường đại học."}
  ],
  remember:"receive/win acclaim = nhận được sự ca ngợi rộng rãi; gain recognition = được công nhận; gain prestige = tăng uy tín."
},
"u1-sem-05":{
  mode:"semantic_precision",
  step1:[
    "legacy = điều một người để lại và tiếp tục có ảnh hưởng sau khi họ rời vị trí hoặc qua đời. Trong câu, reformer đã mất từ nhiều thập kỷ trước nhưng các ý tưởng về bình đẳng giáo dục vẫn còn quan trọng; chính sự tiếp tục tác động này là legacy.",
    "Vì vậy lasting influence là cách diễn đạt sát nhất. Legacy có thể bao gồm achievements, institutions, ideas hoặc values, nhưng đặc điểm cốt lõi ở đây là chúng tiếp tục định hình người khác hoặc xã hội theo thời gian.",
    "Không nên chọn inheritance chỉ vì legacy đôi khi có nghĩa tài sản thừa kế. Trong chủ đề life stories, legacy thường mang nghĩa phi vật chất: ảnh hưởng, giá trị hoặc thành tựu còn lại."
  ],
  options:[
    {label:"A",word:"reputation",meaning:"danh tiếng, cách người khác nhìn nhận một người",analysis:"Reputation mô tả perception về một người khi họ còn sống hoặc sau đó. Legacy rộng hơn và nhấn mạnh thứ tiếp tục tồn tại/ảnh hưởng, không chỉ hình ảnh trong mắt công chúng."},
    {label:"B",word:"inheritance",meaning:"tài sản hoặc thứ được thừa kế",analysis:"Inheritance phù hợp khi nói tài sản, tiền hoặc đặc điểm được truyền lại. Ở đây ideas vẫn ảnh hưởng giáo dục, nên nghĩa vật chất của inheritance không phù hợp."},
    {label:"C",word:"contribution",meaning:"đóng góp",analysis:"Contribution là một hành động hoặc phần đóng góp trong lúc người đó hoạt động. Một contribution có thể trở thành một phần của legacy, nhưng hai khái niệm không đồng nhất."},
    {label:"D",word:"lasting influence",meaning:"ảnh hưởng lâu dài",analysis:"Đây là đáp án chính xác nhất vì câu nhấn mạnh rằng dù người đó đã mất, ideas vẫn còn ảnh hưởng đến hiện tại."}
  ],
  examples:[
    {label:"A",word:"reputation",en:"The doctor built a reputation for treating every patient with respect.",vi:"Bác sĩ xây dựng danh tiếng vì luôn đối xử với mọi bệnh nhân bằng sự tôn trọng."},
    {label:"B",word:"inheritance",en:"She used part of her inheritance to fund a community library.",vi:"Cô dùng một phần tài sản thừa kế để tài trợ một thư viện cộng đồng."},
    {label:"C",word:"contribution",en:"His greatest contribution was developing a low-cost medical device.",vi:"Đóng góp lớn nhất của ông là phát triển một thiết bị y tế giá rẻ."},
    {label:"D",word:"lasting influence",en:"Her teaching had a lasting influence on generations of young doctors.",vi:"Việc giảng dạy của bà có ảnh hưởng lâu dài đến nhiều thế hệ bác sĩ trẻ."}
  ],
  remember:"legacy trong life stories thường = what remains influential after someone is gone, không đơn giản là reputation hay một contribution đơn lẻ."
},
"u1-sem-06":{
  mode:"semantic_precision",
  step1:[
    "establish = thiết lập, xây dựng một hệ thống hoặc tổ chức để nó bắt đầu tồn tại và hoạt động ổn định. Câu: “Thay vì xây một bệnh viện lớn duy nhất, bà đã thiết lập một mạng lưới các phòng khám lưu động nhỏ có thể đến những ngôi làng biệt lập.”",
    "Object là “a network of small mobile clinics”. Với network, establish nhấn mạnh việc tạo ra một cấu trúc hoạt động có tổ chức và tương đối bền vững. Đây chính xác là điều đoạn văn mô tả.",
    "Founded thường thiên về tổ chức/institution; formed nhấn mạnh việc các thành phần kết hợp thành một nhóm; launched nhấn mạnh thời điểm khởi động một initiative. Cả ba gần nghĩa nhưng establish khớp tốt nhất với network như một hệ thống vận hành."
  ],
  options:[
    {label:"A",word:"founded",meaning:"sáng lập",analysis:"Found thường đi với company, organisation, school, institution. “Found a network” có thể gặp nhưng dễ khiến network được hiểu như một tổ chức độc lập; câu này tập trung vào việc thiết lập hệ thống clinics."},
    {label:"B",word:"established",meaning:"thiết lập, xây dựng",analysis:"Đáp án tốt nhất với a network vì nhấn mạnh tạo ra một cấu trúc có tổ chức và đưa nó vào hoạt động ổn định."},
    {label:"C",word:"formed",meaning:"hình thành, thành lập từ các thành phần",analysis:"Form a group/team/coalition rất tự nhiên khi nhiều người hoặc bộ phận hợp lại. Với network of clinics, formed có thể hiểu được nhưng yếu hơn về sắc thái xây dựng một system có chủ đích."},
    {label:"D",word:"launched",meaning:"khởi động, ra mắt",analysis:"Launch nhấn mạnh thời điểm bắt đầu programme, campaign, product hoặc initiative. Ta có thể launch a mobile-clinic programme, nhưng “launch a network” tập trung vào sự khởi đầu hơn là cấu trúc được thiết lập."}
  ],
  examples:[
    {label:"A",word:"founded",en:"She founded a charity that provides scholarships to rural students.",vi:"Bà sáng lập một tổ chức từ thiện cung cấp học bổng cho học sinh nông thôn."},
    {label:"B",word:"established",en:"The doctors established a referral network linking village clinics with regional hospitals.",vi:"Các bác sĩ thiết lập một mạng lưới chuyển tuyến kết nối phòng khám làng với bệnh viện khu vực."},
    {label:"C",word:"formed",en:"Local volunteers formed a committee to coordinate emergency supplies.",vi:"Các tình nguyện viên địa phương thành lập một ủy ban để điều phối hàng cứu trợ."},
    {label:"D",word:"launched",en:"The organisation launched a vaccination campaign in five remote districts.",vi:"Tổ chức khởi động một chiến dịch tiêm chủng tại năm huyện vùng xa."}
  ],
  remember:"establish a network/system = thiết lập một cấu trúc vận hành; found an organisation; form a group; launch a programme/campaign."
},
"u1-sem-07":{
  mode:"semantic_precision",
  step1:[
    "bridge the gap = thu hẹp hoặc tạo sự kết nối qua một khoảng cách/chênh lệch giữa hai bên. Câu: “Chương trình giúp thu hẹp khoảng cách giữa dịch vụ y tế thành thị và nông thôn mà không cần các dự án hạ tầng khổng lồ.”",
    "Đây là collocation mạnh: bridge the gap between A and B. Bridge không chỉ nói con số gap nhỏ đi; nó gợi việc tạo ra một kết nối giúp hai phía trở nên gần nhau hơn về access, opportunity hoặc understanding.",
    "Narrow/reduce the gap đều có thể đúng về nghĩa chung, nên đây là distractor có chủ đích. Nhưng cấu trúc “bridge the gap between urban and rural healthcare” tự nhiên và giàu sắc thái kết nối hơn trong ngữ cảnh access to services."
  ],
  options:[
    {label:"A",word:"narrow",meaning:"thu hẹp",analysis:"Narrow the gap là collocation chuẩn và nhấn mạnh độ lớn của chênh lệch giảm xuống. Nó rất gần nghĩa, nhưng không nhấn mạnh chức năng kết nối hai phía như bridge."},
    {label:"B",word:"reduce",meaning:"giảm",analysis:"Reduce the gap hiểu được và trung tính, tập trung vào lượng chênh lệch. Nó ít idiomatic và ít diễn đạt ý connecting access between two groups hơn bridge the gap."},
    {label:"C",word:"bridge",meaning:"bắc cầu, thu hẹp bằng cách kết nối",analysis:"Đáp án tốt nhất vì collocation bridge the gap between A and B chính xác với việc mobile clinics tạo cầu nối thực tế giữa rural residents và healthcare access."},
    {label:"D",word:"ease",meaning:"làm dịu, làm bớt nghiêm trọng",analysis:"Ease thường đi với pressure, pain, tension, burden, shortage. “Ease the gap” không phải collocation chuẩn trong nghĩa chênh lệch xã hội/dịch vụ này."}
  ],
  examples:[
    {label:"A",word:"narrow",en:"The scholarship programme aims to narrow the achievement gap between schools.",vi:"Chương trình học bổng nhằm thu hẹp khoảng cách thành tích giữa các trường."},
    {label:"B",word:"reduce",en:"Better transport can reduce the difference in access between central and remote areas.",vi:"Giao thông tốt hơn có thể giảm sự khác biệt về khả năng tiếp cận giữa khu trung tâm và vùng xa."},
    {label:"C",word:"bridge",en:"Online consultations can help bridge the gap between specialists and rural patients.",vi:"Tư vấn trực tuyến có thể giúp thu hẹp khoảng cách giữa bác sĩ chuyên khoa và bệnh nhân nông thôn."},
    {label:"D",word:"ease",en:"Additional staff were hired to ease the pressure on the emergency department.",vi:"Nhân sự bổ sung được tuyển để giảm áp lực cho khoa cấp cứu."}
  ],
  remember:"bridge the gap between A and B nhấn mạnh kết nối hai phía; narrow the gap nhấn mạnh làm chênh lệch nhỏ lại."
},
"u1-sem-08":{
  mode:"semantic_precision",
  step1:[
    "redirect = chuyển hướng một thứ đang hướng về A sang một hướng hoặc đối tượng khác. Câu hoàn chỉnh: “Bác sĩ An chủ động chuyển sự chú ý của công chúng khỏi bản thân sang các y tá và tình nguyện viên địa phương.”",
    "Cấu trúc from herself towards the local nurses and volunteers cho ta cả điểm xuất phát lẫn hướng mới. Từ deliberately còn cho thấy đây là hành động có chủ ý. Redirect diễn đạt đầy đủ ba yếu tố đó: hướng cũ, tác nhân chủ động và đích mới.",
    "Shift và divert đều là distractor mạnh. Shift attention là collocation đúng nhưng trung tính hơn; divert attention thường dễ mang sắc thái đánh lạc hướng khỏi một vấn đề. Redirect phù hợp nhất với hành động phân bổ lại sự chú ý một cách minh bạch."
  ],
  options:[
    {label:"A",word:"transferred",meaning:"chuyển giao/chuyển từ nơi này sang nơi khác",analysis:"Transfer thường dùng với money, ownership, data, patient, responsibility. Nó nhấn mạnh việc chuyển giao một thứ, không đặc biệt mã hóa ý “đổi hướng attention”."},
    {label:"B",word:"shifted",meaning:"dịch chuyển, thay đổi trọng tâm",analysis:"Shift attention from A to B là collocation hợp lệ và rất gần. Tuy nhiên shift chỉ nói focus thay đổi; redirect làm rõ hơn hành động có chủ ý hướng attention tới một target mới, hợp với deliberately."},
    {label:"C",word:"diverted",meaning:"chuyển hướng, thường kéo khỏi hướng ban đầu",analysis:"Divert attention thường mang hàm ý kéo sự chú ý khỏi một vấn đề, đôi khi để tránh scrutiny: divert attention from a scandal. Ở đây mục tiêu là trao recognition cho người khác, không phải đánh lạc hướng."},
    {label:"D",word:"redirected",meaning:"chuyển hướng sang mục tiêu khác",analysis:"Đáp án tốt nhất vì cấu trúc redirect attention from X towards Y khớp chính xác cả ngữ nghĩa và collocation của câu."}
  ],
  examples:[
    {label:"A",word:"transferred",en:"The hospital transferred the patient to a specialist unit.",vi:"Bệnh viện chuyển bệnh nhân sang một khoa chuyên môn."},
    {label:"B",word:"shifted",en:"The discussion gradually shifted from costs to long-term benefits.",vi:"Cuộc thảo luận dần chuyển từ chi phí sang lợi ích dài hạn."},
    {label:"C",word:"diverted",en:"The spokesperson tried to divert attention from the company's financial problems.",vi:"Người phát ngôn cố đánh lạc hướng sự chú ý khỏi các vấn đề tài chính của công ty."},
    {label:"D",word:"redirected",en:"The charity redirected its resources towards emergency relief.",vi:"Tổ chức từ thiện chuyển nguồn lực sang công tác cứu trợ khẩn cấp."}
  ],
  remember:"redirect attention from A to/towards B = chủ động chuyển sự chú ý từ A sang B; divert attention from A thường dễ mang sắc thái đánh lạc hướng khỏi A."
},
"u1-sem-09":{
  mode:"semantic_precision",
  step1:[
    "retain = giữ lại thứ mình đã có, đặc biệt khi có nguy cơ mất nó. Câu: “Khi những tin đồn sai lệch về chương trình bắt đầu lan truyền, phản hồi minh bạch của bà giúp tổ chức giữ được niềm tin của công chúng.”",
    "Clue quan trọng nhất là false rumours: trust đã tồn tại trước đó nhưng giờ bị đe dọa. Retain public trust diễn đạt chính xác việc không để niềm tin vốn có bị mất đi dưới áp lực.",
    "Maintain và sustain đều có thể đi với trust trong một số ngữ cảnh, nhưng maintain nhấn mạnh giữ ở trạng thái ổn định nói chung, sustain nhấn mạnh kéo dài/duy trì qua thời gian hoặc áp lực. Retain sắc nét nhất khi câu đặt rõ nguy cơ mất một thứ đang sở hữu."
  ],
  options:[
    {label:"A",word:"preserve",meaning:"bảo tồn, giữ khỏi bị hư hại/thay đổi",analysis:"Preserve thường mạnh với heritage, evidence, environment, traditions, quality. Với trust có thể hiểu, nhưng sắc thái “bảo tồn nguyên trạng” không tự nhiên bằng retain khi nói niềm tin có nguy cơ bị mất."},
    {label:"B",word:"maintain",meaning:"duy trì ở mức hoặc trạng thái ổn định",analysis:"Maintain public trust là collocation rất tự nhiên và là distractor mạnh. Tuy nhiên nó không nhấn mạnh rõ nguy cơ mất trust do rumours như retain."},
    {label:"C",word:"sustain",meaning:"duy trì để tiếp tục tồn tại, thường qua thời gian/áp lực",analysis:"Sustain trust có thể dùng khi nói giữ niềm tin tiếp tục trong dài hạn. Câu này đặt một threat cụ thể làm trust có thể bị mất, nên retain chính xác hơn."},
    {label:"D",word:"retain",meaning:"giữ được, không để mất",analysis:"Đáp án tốt nhất: organisation đã có public trust, rumours đe dọa nó, và transparent response giúp organisation keep possession of that trust."}
  ],
  examples:[
    {label:"A",word:"preserve",en:"The archive was created to preserve letters written by the country's early reformers.",vi:"Kho lưu trữ được lập để bảo tồn những lá thư do các nhà cải cách thời kỳ đầu viết."},
    {label:"B",word:"maintain",en:"Leaders must communicate consistently to maintain public confidence.",vi:"Các nhà lãnh đạo phải giao tiếp nhất quán để duy trì lòng tin của công chúng."},
    {label:"C",word:"sustain",en:"Long-term funding is needed to sustain the programme after its pilot phase.",vi:"Cần nguồn tài trợ dài hạn để duy trì chương trình sau giai đoạn thí điểm."},
    {label:"D",word:"retain",en:"The organisation changed its policy to retain the trust of local residents.",vi:"Tổ chức thay đổi chính sách để giữ được niềm tin của cư dân địa phương."}
  ],
  remember:"retain = keep something you already have when loss is possible; maintain = keep at a stable level; sustain = keep something going over time."
},
"u1-sem-10":{
  mode:"semantic_precision",
  step1:[
    "ripple = lan ra dần dần từ một điểm ban đầu, giống những gợn sóng lan trên mặt nước. Câu: “Đến khi bà nghỉ hưu, ảnh hưởng từ công việc của bà đã lan xa vượt khỏi những cộng đồng mà ban đầu bà phục vụ.”",
    "Object ở đây là influence và adverbial là far beyond. Rippled tạo một hình ảnh ẩn dụ rất phù hợp: tác động ban đầu ở một nhóm nhỏ sau đó truyền sang các nơi hoặc nhóm khác theo nhiều lớp.",
    "Spread cũng có thể nói influence spread, nhưng trung tính hơn. Ripple đặc biệt hữu ích khi muốn nhấn mạnh indirect, outward-moving consequences từ một hành động hoặc sự kiện ban đầu."
  ],
  options:[
    {label:"A",word:"extended",meaning:"kéo dài/mở rộng đến một phạm vi",analysis:"Extend thường cần object hoặc cấu trúc extend to/beyond: the programme extended to three provinces. “Influence extended far beyond” có thể dùng nhưng nhấn phạm vi hơn là cơ chế tác động lan truyền."},
    {label:"B",word:"spread",meaning:"lan rộng",analysis:"Spread là lựa chọn rất hợp về nghĩa chung. Tuy nhiên nó trung tính; ripple biểu đạt tinh tế hơn ý ảnh hưởng lan ra từng lớp từ điểm khởi đầu, phù hợp giọng kể về legacy."},
    {label:"C",word:"reached",meaning:"vươn tới/đạt tới",analysis:"Reach thường tập trung vào endpoint: the message reached millions. Với influence, reached beyond nghe kém hoàn chỉnh hơn vì reach thường cần một object hoặc destination rõ."},
    {label:"D",word:"rippled",meaning:"lan truyền dần như gợn sóng",analysis:"Đáp án tốt nhất vì collocation/metaphor “effects/influence ripple through/beyond” mô tả chính xác tác động thứ cấp lan rộng từ các cộng đồng ban đầu."}
  ],
  examples:[
    {label:"A",word:"extended",en:"The scholarship scheme was extended to students in neighbouring provinces.",vi:"Chương trình học bổng được mở rộng tới học sinh ở các tỉnh lân cận."},
    {label:"B",word:"spread",en:"News of the doctor's work quickly spread across the region.",vi:"Tin về công việc của vị bác sĩ nhanh chóng lan khắp khu vực."},
    {label:"C",word:"reached",en:"The campaign eventually reached more than one million families.",vi:"Chiến dịch cuối cùng đã tiếp cận hơn một triệu gia đình."},
    {label:"D",word:"rippled",en:"The effects of her reforms rippled through the education system for decades.",vi:"Tác động của các cải cách của bà lan truyền khắp hệ thống giáo dục trong nhiều thập kỷ."}
  ],
  remember:"ripple through/beyond = ảnh hưởng hoặc hệ quả lan ra theo nhiều lớp; spread = lan rộng nói chung; extend = mở rộng phạm vi."
}
};

window.G12_U1_SEMANTIC_PILOT_BANK={
  grade:12,
  unit:1,
  title:"Life Stories We Admire",
  subtitle:"Semantic Precision Pilot",
  pilotFixedFormat:true,
  semanticPrecisionPilot:true,
  trackSetCompletion:true,
  questions,
  explanations:questions.map(q=>explanationById[q.id]),
  explanationById,
  levelConfig:{
    1:{
      label:"B2–C2",
      name:"Semantic Precision",
      note:"5 Closest meaning + 5 Semantic cloze",
      fixedOrder:true,
      pool:Array.from({length:10},(_,i)=>i)
    }
  }
};
})();