(function(){
  const previousExpand=window.expandGrade12Banks;

  const LEX={
    "cultural diversity":{meaning:"đa dạng văn hóa",nuance:"Chỉ sự cùng tồn tại của nhiều nền văn hóa, tập quán và cách sống khác nhau trong một cộng đồng hoặc xã hội.",usage:"cultural diversity; promote cultural diversity; celebrate cultural diversity",contrast:"Diversity nhấn mạnh sự đa dạng cùng tồn tại; multiculturalism thường nói rộng hơn về một xã hội có nhiều nhóm văn hóa.",family:"diverse (adj) → diversity (n)"},
    "cuisine":{meaning:"ẩm thực; phong cách nấu ăn đặc trưng",nuance:"Trang trọng và cụ thể hơn food; thường nói về phong cách nấu ăn của một quốc gia hoặc vùng.",usage:"local cuisine; Vietnamese cuisine; traditional cuisine",contrast:"Cuisine = phong cách ẩm thực; food = thức ăn nói chung; dish = một món ăn cụ thể.",family:""},
    "suitable":{meaning:"phù hợp, thích hợp",nuance:"Diễn tả mức độ đáp ứng đúng nhu cầu, mục đích hoặc hoàn cảnh.",usage:"be suitable for somebody/something; suitable choice",contrast:"Suitable gần appropriate, nhưng suitable thiên về mức độ phù hợp với mục đích/đối tượng; appropriate nhấn mạnh sự đúng đắn trong hoàn cảnh.",family:"suit (v/n) → suitable (adj) → suitably (adv)"},
    "belief":{meaning:"niềm tin",nuance:"Một điều một người hoặc cộng đồng tin là đúng; có thể mang tính cá nhân, văn hóa hoặc tôn giáo.",usage:"religious beliefs; personal beliefs; hold a belief",contrast:"Belief = điều được tin là đúng; opinion = ý kiến/đánh giá; value = nguyên tắc được coi là quan trọng.",family:"believe (v) → belief (n) → believable (adj)"},
    "traditional":{meaning:"truyền thống",nuance:"Gắn với tập quán, cách làm hoặc giá trị được truyền qua nhiều thế hệ.",usage:"traditional food; traditional customs; traditional values",contrast:"Traditional nói về sự kế thừa lâu đời; conventional nói về cách làm phổ biến hoặc được xã hội chấp nhận.",family:"tradition (n) → traditional (adj) → traditionally (adv)"},
    "captivated":{meaning:"bị cuốn hút, bị hấp dẫn mạnh",nuance:"Mạnh hơn interested: sự chú ý bị giữ lại rõ rệt bởi một người, ý tưởng hay màn trình diễn.",usage:"be captivated by somebody/something; captivate an audience",contrast:"Interested in = quan tâm; fascinated by = cực kỳ hứng thú; captivated by = bị cuốn hút mạnh và khó rời sự chú ý.",family:"captivate (v) → captivated / captivating (adj)"},
    "worldwide":{meaning:"trên toàn thế giới",nuance:"Dùng khi một hiện tượng, sản phẩm hoặc xu hướng có phạm vi toàn cầu.",usage:"known worldwide; gain popularity worldwide; worldwide audience",contrast:"Worldwide có thể là adverb hoặc adjective; global thường là adjective và nhấn mạnh quy mô toàn cầu.",family:""},
    "bring":{meaning:"mang đến; đưa lại; làm cho đến gần nhau",nuance:"Trong collocation bring people together, bring mang nghĩa kết nối mọi người.",usage:"bring people together; bring cultures together; bring benefits",contrast:"Bring hướng sự vật/người về phía điểm nói hoặc kết quả; take thường mang ra xa điểm nói.",family:"bring (v) → brought (past/p.p.)"},
    "blend":{meaning:"kết hợp, pha trộn",nuance:"Hai hay nhiều yếu tố hòa vào nhau để tạo thành một tổng thể mới.",usage:"blend A with B; blend traditional and modern elements; a blend of",contrast:"Blend nhấn mạnh các yếu tố hòa vào nhau; combine chỉ nói chung là kết hợp, không nhất thiết tạo cảm giác hòa quyện.",family:"blend (v/n) → blended (adj)"},
    "popular":{meaning:"phổ biến, được nhiều người yêu thích",nuance:"Có thể nói về mức độ được ưa chuộng hoặc được nhiều người biết và lựa chọn.",usage:"popular with/among; popular event; popular dish",contrast:"Popular = được nhiều người ưa chuộng; famous = nổi tiếng; common = thường gặp.",family:"popularity (n) → popular (adj) → popularly (adv)"},
    "amazing":{meaning:"rất ấn tượng, tuyệt vời",nuance:"Diễn tả điều gây ngạc nhiên tích cực hoặc tạo ấn tượng mạnh.",usage:"amazing performance; amazing experience",contrast:"Amazing mạnh hơn good; excellent nhấn mạnh chất lượng rất cao, còn amazing nhấn mạnh cảm giác ấn tượng/ngạc nhiên.",family:"amaze (v) → amazed / amazing (adj) → amazement (n)"},
    "unique":{meaning:"độc đáo; khác biệt rõ rệt",nuance:"Nhấn mạnh đặc điểm riêng khiến một thứ không giống những thứ khác.",usage:"unique feature; unique identity; unique blend",contrast:"Unique = có tính riêng biệt; distinctive = dễ nhận ra vì đặc điểm khác biệt; unusual = không thường gặp.",family:"uniquely (adv) → uniqueness (n)"},
    "diversity":{meaning:"sự đa dạng",nuance:"Sự hiện diện của nhiều loại, nhóm hoặc đặc điểm khác nhau.",usage:"cultural diversity; diversity of opinions; promote diversity",contrast:"Diversity = sự đa dạng; variety thường nhấn mạnh nhiều lựa chọn/loại khác nhau, ít mang sắc thái xã hội hơn.",family:"diverse (adj) → diversity (n)"},
    "cultural":{meaning:"thuộc về văn hóa",nuance:"Liên quan đến tập quán, nghệ thuật, lối sống và giá trị của một cộng đồng.",usage:"cultural exchange; cultural identity; cultural festival",contrast:"Cultural nói về văn hóa; social nói về quan hệ và tổ chức xã hội.",family:"culture (n) → cultural (adj) → culturally (adv)"},
    "globalisation":{meaning:"toàn cầu hóa",nuance:"Quá trình các nền kinh tế, xã hội và nền văn hóa ngày càng kết nối và ảnh hưởng lẫn nhau.",usage:"effects of globalisation; economic globalisation; as a result of globalisation",contrast:"Globalisation là quá trình; global chỉ phạm vi toàn cầu.",family:"globe (n) → global (adj) → globalise/globalize (v) → globalisation/globalization (n)"},
    "custom":{meaning:"phong tục",nuance:"Cách hành xử hoặc thực hành đã được một cộng đồng duy trì qua thời gian.",usage:"local customs; follow a custom; traditional customs",contrast:"Custom = phong tục cụ thể; tradition rộng hơn và có thể bao gồm nhiều phong tục, niềm tin và thực hành.",family:"custom (n) → customary (adj)"},
    "ingredient":{meaning:"nguyên liệu",nuance:"Một thành phần được dùng để tạo ra món ăn, sản phẩm hoặc hỗn hợp.",usage:"local ingredients; fresh ingredients; key ingredient",contrast:"Ingredient = thành phần tạo nên sản phẩm/món ăn; material thường nói về vật liệu vật chất nói chung.",family:""},
    "cross-cultural":{meaning:"xuyên văn hóa; liên quan nhiều nền văn hóa",nuance:"Dùng khi có sự tương tác hoặc so sánh giữa các nền văn hóa khác nhau.",usage:"cross-cultural communication; cross-cultural study; cross-cultural experience",contrast:"Cross-cultural nhấn mạnh sự tương tác/so sánh giữa các nền văn hóa; multicultural nhấn mạnh nhiều nền văn hóa cùng hiện diện.",family:""},
    "opportunity":{meaning:"cơ hội",nuance:"Một hoàn cảnh thuận lợi để làm hoặc đạt được điều gì.",usage:"an opportunity to do something; create opportunities; learning opportunity",contrast:"Opportunity = cơ hội thuận lợi; chance có thể chỉ khả năng xảy ra hoặc cơ hội ít trang trọng hơn.",family:"opportune (adj) → opportunity (n)"},
    "connected":{meaning:"được kết nối; có liên hệ",nuance:"Diễn tả mối liên hệ trực tiếp hoặc gián tiếp giữa người, nơi, ý tưởng hay hệ thống.",usage:"be connected to/with; closely connected",contrast:"Connected = có liên hệ; related = có quan hệ về chủ đề/nguồn gốc; linked thường nhấn mạnh một mối nối cụ thể.",family:"connect (v) → connection (n) → connected (adj)"},
    "influence":{meaning:"ảnh hưởng; tác động",nuance:"Khả năng làm thay đổi suy nghĩ, hành vi hoặc sự phát triển của người hay sự việc khác.",usage:"influence somebody/something; have an influence on",contrast:"Influence thường là tác động dần dần; affect là động từ rộng hơn chỉ việc gây ra thay đổi.",family:"influence (n/v) → influential (adj)"},
    "reflect":{meaning:"phản ánh",nuance:"Thể hiện hoặc cho thấy một đặc điểm, giá trị hay thực tế nào đó.",usage:"reflect cultural identity; reflect values; reflect changes",contrast:"Reflect = phản ánh/thể hiện; represent = đại diện hoặc tượng trưng cho.",family:"reflect (v) → reflection (n) → reflective (adj)"},
    "influential":{meaning:"có ảnh hưởng lớn",nuance:"Có khả năng tác động đáng kể đến suy nghĩ, hành vi hoặc xu hướng của người khác.",usage:"an influential figure; highly influential",contrast:"Influential = có sức ảnh hưởng; famous = nổi tiếng nhưng chưa chắc tạo tác động.",family:"influence (n/v) → influential (adj)"},
    "identity":{meaning:"bản sắc; đặc điểm nhận diện",nuance:"Tập hợp đặc điểm khiến một cá nhân hoặc cộng đồng nhận biết mình là ai.",usage:"cultural identity; national identity; sense of identity",contrast:"Identity = bản sắc/nhận diện; image = hình ảnh người khác nhìn thấy; reputation = danh tiếng.",family:"identify (v) → identity (n) → identifiable (adj)"},
    "ethnocentrism":{meaning:"xu hướng đánh giá văn hóa khác bằng chuẩn của văn hóa mình",nuance:"Thường dẫn đến việc xem chuẩn mực của nhóm mình là trung tâm hoặc vượt trội.",usage:"cultural ethnocentrism; ethnocentric attitudes",contrast:"Ethnocentrism áp chuẩn văn hóa mình lên văn hóa khác; cultural relativism cố hiểu tập quán trong chính bối cảnh của nó.",family:"ethnocentric (adj) → ethnocentrism (n)"},
    "cultural relativism":{meaning:"quan điểm xem tập quán trong chính bối cảnh văn hóa của nó",nuance:"Mục tiêu là tránh đánh giá một nền văn hóa chỉ bằng chuẩn mực của nền văn hóa khác.",usage:"apply cultural relativism; cultural-relativist perspective",contrast:"Cultural relativism đối lập với ethnocentrism về cách đánh giá khác biệt văn hóa.",family:""},
    "cultural appropriation":{meaning:"việc sử dụng yếu tố của văn hóa khác mà thiếu bối cảnh hoặc sự tôn trọng phù hợp",nuance:"Thường gây tranh luận khi có chênh lệch quyền lực hoặc yếu tố văn hóa bị tách khỏi ý nghĩa gốc.",usage:"debate cultural appropriation; accuse somebody of cultural appropriation",contrast:"Appropriation có thể hàm ý sử dụng thiếu tôn trọng; appreciation là tìm hiểu và trân trọng văn hóa khác.",family:"appropriate (v) → appropriation (n)"},
    "pluralism":{meaning:"mô hình xã hội chấp nhận nhiều nhóm và hệ giá trị cùng tồn tại",nuance:"Các nhóm khác nhau vẫn giữ bản sắc riêng trong khi cùng tham gia xã hội.",usage:"cultural pluralism; political pluralism",contrast:"Pluralism không đòi hỏi mất bản sắc riêng; assimilation thường kéo nhóm thiểu số về phía văn hóa chi phối.",family:"plural (adj) → plurality (n) → pluralism (n)"},
    "cultural assimilation":{meaning:"quá trình một nhóm dần hòa vào văn hóa chi phối và mất bớt nét riêng",nuance:"Mạnh hơn integration vì có thể làm suy giảm bản sắc hoặc thực hành văn hóa gốc.",usage:"cultural assimilation into mainstream society; pressure to assimilate",contrast:"Assimilation có thể làm mờ bản sắc gốc; integration cho phép tham gia xã hội mà vẫn giữ nhiều đặc điểm riêng.",family:"assimilate (v) → assimilation (n)"},
    "intercultural competence":{meaning:"năng lực giao tiếp và ứng xử hiệu quả giữa các nền văn hóa",nuance:"Bao gồm kiến thức, thái độ và kỹ năng chứ không chỉ biết thông tin văn hóa.",usage:"develop intercultural competence; intercultural competence training",contrast:"Sensitivity là nhận biết/tôn trọng khác biệt; competence còn bao gồm khả năng hành động hiệu quả.",family:"competent (adj) → competence (n)"},
    "cultural diffusion":{meaning:"quá trình ý tưởng và tập quán lan từ nền văn hóa này sang nền khác",nuance:"Nhấn mạnh sự lan truyền qua tiếp xúc, truyền thông, thương mại hoặc di cư.",usage:"cultural diffusion across borders; process of cultural diffusion",contrast:"Diffusion = lan truyền; hybridity = hình thành một dạng mới do nhiều ảnh hưởng pha trộn.",family:"diffuse (v) → diffusion (n)"},
    "cultural preservation":{meaning:"việc bảo tồn thực hành, ngôn ngữ và di sản văn hóa",nuance:"Nhấn mạnh duy trì hoặc truyền lại những yếu tố có nguy cơ mai một.",usage:"cultural preservation efforts; support cultural preservation",contrast:"Preservation cố giữ và truyền lại; conservation thường dùng nhiều hơn cho tài nguyên, công trình hoặc môi trường.",family:"preserve (v) → preservation (n)"},
    "cross-cultural communication":{meaning:"giao tiếp giữa người thuộc các nền văn hóa khác nhau",nuance:"Đòi hỏi chú ý khác biệt về trực tiếp/gián tiếp, cử chỉ, phép lịch sự và kỳ vọng xã hội.",usage:"cross-cultural communication skills; improve cross-cultural communication",contrast:"Communication nói về quá trình trao đổi; intercultural competence là năng lực rộng hơn để thực hiện quá trình đó hiệu quả.",family:"communicate (v) → communication (n)"},
    "perpetuate":{meaning:"duy trì, làm cho tiếp tục tồn tại qua thời gian",nuance:"Trang trọng hơn keep; thường dùng với tradition, belief, stereotype hoặc cycle.",usage:"perpetuate a tradition; perpetuate a stereotype; perpetuate a bloodline",contrast:"Perpetuate = khiến tiếp tục tồn tại; preserve = bảo tồn khỏi mất mát hoặc hư hại.",family:"perpetuate (v) → perpetuation (n)"},
    "compulsory":{meaning:"bắt buộc",nuance:"Được yêu cầu bởi luật, quy định hoặc hệ thống; người tham gia không có quyền lựa chọn bỏ qua.",usage:"compulsory education; compulsory requirement",contrast:"Compulsory và mandatory gần nghĩa; compulsory thường gặp trong giáo dục/quy định, mandatory rất phổ biến trong văn bản quy tắc.",family:"compel (v) → compulsory (adj)"},
    "obligation":{meaning:"nghĩa vụ",nuance:"Điều một người buộc phải làm vì luật, cam kết, đạo đức hoặc trách nhiệm xã hội.",usage:"have an obligation to do something; legal obligation",contrast:"Obligation trang trọng hơn duty trong nhiều ngữ cảnh pháp lý; responsibility rộng hơn và không phải lúc nào cũng mang tính bắt buộc.",family:"oblige (v) → obligation (n) → obligatory (adj)"},
    "discrimination":{meaning:"sự đối xử bất công dựa trên đặc điểm của một nhóm",nuance:"Là hành vi hoặc chính sách, khác prejudice vốn là thái độ hoặc định kiến.",usage:"racial discrimination; face discrimination; prevent discrimination",contrast:"Prejudice = định kiến/thái độ; discrimination = hành vi đối xử bất công.",family:"discriminate (v) → discrimination (n) → discriminatory (adj)"},
    "inclusion":{meaning:"sự hòa nhập; việc bảo đảm mọi người được tham gia",nuance:"Nhấn mạnh tạo điều kiện để những nhóm khác nhau cùng có cơ hội tham gia đầy đủ.",usage:"social inclusion; promote inclusion; inclusion policy",contrast:"Inclusion = sự tham gia đầy đủ; integration nói về quá trình hòa nhập vào một hệ thống rộng hơn.",family:"include (v) → inclusion (n) → inclusive (adj) → inclusivity (n)"},
    "assimilate":{meaning:"đồng hóa; hòa vào nhóm hoặc văn hóa chi phối",nuance:"Trong ngữ cảnh văn hóa, có thể hàm ý người mới dần từ bỏ một phần đặc điểm văn hóa gốc.",usage:"assimilate into a culture/society; pressure to assimilate",contrast:"Assimilate thường mạnh hơn integrate vì có thể kéo theo mất bớt bản sắc gốc.",family:"assimilate (v) → assimilation (n)"},
    "exchange":{meaning:"sự trao đổi",nuance:"Trong cultural exchange, hai bên tiếp xúc và chia sẻ ý tưởng, thực hành hoặc trải nghiệm văn hóa.",usage:"cultural exchange; exchange ideas; exchange programme",contrast:"Exchange có tính hai chiều; diffusion có thể chỉ sự lan truyền theo một hướng.",family:"exchange (n/v)"},
    "reach":{meaning:"tiếp cận; đến được với",nuance:"Trong reach an audience, từ này nói về việc nội dung đến được với một nhóm người.",usage:"reach an audience; reach millions of people; reach a market",contrast:"Reach = tiếp cận/đến được; attract = thu hút khiến người khác chủ động chú ý hoặc đến gần.",family:"reach (v/n)"},
    "preserving":{meaning:"đang bảo tồn, gìn giữ",nuance:"Dạng V-ing của preserve, dùng khi nói việc tiếp tục duy trì một giá trị hoặc truyền thống.",usage:"preserve traditions; preserve cultural heritage",contrast:"Preserve = gìn giữ để tránh mai một; maintain = duy trì trạng thái hoặc mức độ hiện tại.",family:"preserve (v) → preservation (n)"},
    "accessible":{meaning:"dễ tiếp cận; có thể sử dụng hoặc tiếp cận được",nuance:"Trong giáo dục và thông tin, nghĩa là nhiều người có thể dễ dàng tìm, hiểu hoặc sử dụng.",usage:"make information accessible; easily accessible",contrast:"Accessible = dễ tiếp cận; available = có sẵn, nhưng chưa chắc dễ tiếp cận.",family:"access (n/v) → accessible (adj) → accessibility (n)"},
    "balance":{meaning:"sự cân bằng",nuance:"Trạng thái hai yêu cầu hoặc lực lượng khác nhau được duy trì ở mức hợp lý.",usage:"strike/achieve a balance between A and B",contrast:"Balance = trạng thái cân bằng; compromise = thỏa hiệp bằng cách mỗi bên nhượng bộ một phần.",family:"balance (n/v) → balanced (adj)"},
    "exclusive":{meaning:"loại trừ lẫn nhau; chỉ dành riêng",nuance:"Trong mutually exclusive, hai khả năng không thể đồng thời đúng hoặc cùng tồn tại.",usage:"mutually exclusive; exclusive access",contrast:"Exclusive = loại trừ/độc quyền; inclusive = bao trùm và mở cho nhiều nhóm.",family:"exclude (v) → exclusion (n) → exclusive (adj)"}
  };

  function explain(term,why,translation){
    const m=LEX[term]||{meaning:term,nuance:"",usage:"",contrast:"",family:""};
    return {
      meaning:"“"+term+"” = "+m.meaning+"."+(m.nuance?" "+m.nuance:""),
      why:why||"",
      usage:m.usage||"",
      contrast:m.contrast||"",
      family:m.family||"",
      translation:translation||"",
      preserve:true,
      standard:true
    };
  }

  function buildPilot(){
    const questions=[],explanations=[];
    const sets={1:[],2:[],3:[]};
    function addMCQ(set,type,q,o,a,term,why,translation,context){
      const idx=questions.length;
      questions.push({id:"g12-u2-pilot-"+set+"-"+(sets[set].length+1),targetId:"g12-u2-pilot-"+set+"-"+(sets[set].length+1),kind:"mcq",type:type,q:q,o:o,a:a,context:context||""});
      explanations.push(explain(term,why,translation));
      sets[set].push(idx);
    }
    function addInput(set,q,answers,term,why,translation){
      const idx=questions.length;
      questions.push({id:"g12-u2-pilot-"+set+"-"+(sets[set].length+1),targetId:"g12-u2-pilot-"+set+"-"+(sets[set].length+1),kind:"input",type:"wordform",q:q,answers:answers});
      explanations.push(explain(term,why,translation));
      sets[set].push(idx);
    }

    // SET 1 — EASY (A2–B1): 15 mixed questions.
    addMCQ(1,"meaning","Từ/cụm từ nào có nghĩa “đa dạng văn hóa”?",
      ["cultural diversity","traditional cuisine","cultural identity","local custom"],0,"cultural diversity",
      "“Cultural diversity” gọi đúng khái niệm nhiều nền văn hóa và tập quán khác nhau cùng tồn tại; các lựa chọn còn lại chỉ nói về một phần cụ thể của văn hóa.","");
    addMCQ(1,"context","The festival serves ______ dishes from several regions.",
      ["traditional","connected","worldwide","suitable"],0,"traditional",
      "“Traditional dishes” là collocation tự nhiên khi nói các món ăn gắn với công thức và tập quán lâu đời của một vùng.",
      "Lễ hội phục vụ các món ăn truyền thống từ nhiều vùng.");
    addMCQ(1,"synonym","The word “popular” is closest in meaning to ______.",
      ["well-liked","illegal","spicy","binding"],0,"popular",
      "Ở đây popular nói một thứ được nhiều người yêu thích hoặc lựa chọn, nên well-liked giữ gần nhất nét nghĩa đó.","");
    addInput(1,"The city is proud of its cultural ______. (DIVERSE)",["diversity"],"diversity",
      "Sau tính từ sở hữu “its” và tính từ “cultural” cần một danh từ; “diversity” là danh từ của “diverse”.",
      "Thành phố tự hào về sự đa dạng văn hóa của mình.");
    addMCQ(1,"meaning","Từ nào có nghĩa “ẩm thực; phong cách nấu ăn”?",
      ["cuisine","festival","ingredient","booth"],0,"cuisine",
      "Cuisine chỉ phong cách ẩm thực của một quốc gia hoặc vùng, không phải một món ăn hay nguyên liệu riêng lẻ.","");
    addMCQ(1,"context","American teens are ______ by K-pop music and dance.",
      ["captivated","offered","reflected","arrived"],0,"captivated",
      "Cấu trúc “be captivated by + noun” diễn tả một người bị điều gì đó cuốn hút mạnh; K-pop music and dance là tác nhân tạo sức hút.",
      "Thanh thiếu niên Mỹ bị cuốn hút bởi âm nhạc và vũ đạo K-pop.");
    addMCQ(1,"synonym","The word “amazing” is closest in meaning to ______.",
      ["excellent","ordinary","illegal","compulsory"],0,"amazing",
      "Amazing mang sắc thái rất ấn tượng/tuyệt vời; trong nhóm lựa chọn, excellent giữ gần nhất đánh giá tích cực mạnh này.","");
    addInput(1,"The school organises a ______ festival every year. (CULTURE)",["cultural"],"cultural",
      "Chỗ trống đứng trước danh từ “festival”, vì vậy cần tính từ “cultural”, không phải danh từ “culture”.",
      "Trường tổ chức một lễ hội văn hóa mỗi năm.");
    addMCQ(1,"meaning","Từ nào có nghĩa “phù hợp, thích hợp”?",
      ["suitable","unique","healthy","spicy"],0,"suitable",
      "Suitable diễn tả một thứ đáp ứng đúng mục đích hoặc đối tượng; đây là nghĩa trực tiếp cần nhận diện.","");
    addMCQ(1,"context","Vietnamese dishes such as pho are becoming popular ______.",
      ["worldwide","particularly","traditionally","locally"],0,"worldwide",
      "Worldwide bổ nghĩa cho “becoming popular” và cho biết mức độ phổ biến lan ra trên toàn thế giới.",
      "Các món Việt như phở đang ngày càng phổ biến trên toàn thế giới.");
    addMCQ(1,"synonym","The word “unique” is closest in meaning to ______.",
      ["distinctive","common","ordinary","similar"],0,"unique",
      "Unique nhấn mạnh đặc điểm riêng và khác biệt; distinctive là lựa chọn gần nhất vì cũng nói một đặc điểm khiến thứ gì đó nổi bật so với phần còn lại.","");
    addInput(1,"Because of ______, people can experience food and music from many countries. (GLOBAL)",["globalisation","globalization"],"globalisation",
      "Sau “because of” cần một danh từ. “Globalisation/globalization” là danh từ chỉ quá trình thế giới ngày càng kết nối.",
      "Nhờ toàn cầu hóa, mọi người có thể trải nghiệm đồ ăn và âm nhạc từ nhiều quốc gia.");
    addMCQ(1,"meaning","Từ nào có nghĩa “niềm tin”?",
      ["belief","custom","identity","opportunity"],0,"belief",
      "Belief là một điều được một người hoặc cộng đồng tin là đúng; custom là phong tục, còn identity là bản sắc.","");
    addMCQ(1,"context","Music festivals can ______ people from different backgrounds together.",
      ["bring","ban","taste","afford"],0,"bring",
      "“Bring people together” là collocation rất thông dụng, nghĩa là kết nối mọi người và tạo cơ hội để họ cùng tham gia.",
      "Các lễ hội âm nhạc có thể kết nối những người có xuất thân khác nhau.");
    addMCQ(1,"context","Many modern dishes ______ local and international flavours.",
      ["blend","ban","arrive","reflect"],0,"blend",
      "Blend phù hợp vì câu nói các hương vị địa phương và quốc tế hòa vào nhau trong cùng một món ăn.",
      "Nhiều món ăn hiện đại kết hợp hương vị địa phương và quốc tế.");

    const easyReading="K-pop has become popular in many countries. Young people are often (16) ______ by its catchy songs and impressive dance performances. Social media also helps artists (17) ______ a much wider audience. K-pop is one example of cultural (18) ______: music from one country becomes part of the daily lives of people in another. Fans can enjoy foreign music while still (19) ______ their own local traditions. In this way, globalisation can increase cultural (20) ______ rather than make every culture the same.";
    addMCQ(1,"reading","Choose the best option for blank (16).",["captivated","ignored","banned","compulsory"],0,"captivated",
      "“Be captivated by” khớp với ý các bài hát và màn trình diễn giữ sự chú ý của người trẻ.", "Người trẻ thường bị cuốn hút bởi những ca khúc bắt tai và màn trình diễn vũ đạo ấn tượng.",easyReading);
    addMCQ(1,"reading","Choose the best option for blank (17).",["reach","ban","taste","reflect"],0,"reach",
      "“Reach an audience” là collocation tự nhiên khi nói nội dung hoặc nghệ sĩ tiếp cận được nhiều người hơn.", "Mạng xã hội cũng giúp nghệ sĩ tiếp cận lượng khán giả rộng hơn nhiều.",easyReading);
    addMCQ(1,"reading","Choose the best option for blank (18).",["exchange","obligation","location","puberty"],0,"exchange",
      "“Cultural exchange” phù hợp vì đoạn văn mô tả âm nhạc từ một quốc gia được tiếp nhận ở quốc gia khác.", "K-pop là một ví dụ về sự trao đổi văn hóa.",easyReading);
    addMCQ(1,"reading","Choose the best option for blank (19).",["preserving","destroying","banning","avoiding"],0,"preserving",
      "Sau “while still” dùng V-ing song song với ý tiếp tục gìn giữ truyền thống địa phương.", "Người hâm mộ có thể thưởng thức âm nhạc nước ngoài trong khi vẫn gìn giữ truyền thống địa phương.",easyReading);
    addMCQ(1,"reading","Choose the best option for blank (20).",["diversity","divorce","dowry","location"],0,"diversity",
      "Ý cuối đối lập với “make every culture the same”, vì vậy “cultural diversity” là kết luận logic.", "Theo cách này, toàn cầu hóa có thể làm tăng sự đa dạng văn hóa thay vì khiến mọi nền văn hóa giống nhau.",easyReading);

    // SET 2 — INTERMEDIATE (B1–B2): same forms, harder vocabulary/context.
    addMCQ(2,"meaning","Từ nào có nghĩa “phong tục”?",
      ["custom","belief","identity","ingredient"],0,"custom",
      "Custom là một cách hành xử/thực hành được cộng đồng duy trì qua thời gian; tradition rộng hơn và có thể bao gồm nhiều customs.","");
    addMCQ(2,"context","Globalisation has made communities around the world more closely ______.",
      ["connected","captivated","compulsory","binding"],0,"connected",
      "“Closely connected” là kết hợp tự nhiên để nói các cộng đồng ngày càng có liên hệ chặt chẽ do toàn cầu hóa.",
      "Toàn cầu hóa đã khiến các cộng đồng trên thế giới được kết nối chặt chẽ hơn.");
    addMCQ(2,"synonym","In this context, “captivated” is closest in meaning to ______.",
      ["fascinated","confused","restricted","separated"],0,"captivated",
      "Fascinated giữ được mức độ hứng thú mạnh của captivated; interested sẽ nhẹ hơn, còn attracted có phạm vi nghĩa rộng hơn.","");
    addInput(2,"Traditional festivals are an important part of a community's cultural ______. (IDENTIFY)",["identity"],"identity",
      "Sau tính từ “cultural” cần danh từ. “Identity” là danh từ chỉ bản sắc của cộng đồng.",
      "Các lễ hội truyền thống là một phần quan trọng trong bản sắc văn hóa của một cộng đồng.");
    addMCQ(2,"meaning","Từ nào có nghĩa “nguyên liệu”?",
      ["ingredient","cuisine","specialty","booth"],0,"ingredient",
      "Ingredient là thành phần dùng để tạo nên món ăn; cuisine là phong cách ẩm thực, specialty là đặc sản.","");
    addMCQ(2,"context","The restaurant ______ a wide range of dishes from different cultures.",
      ["offers","reflects","perpetuates","bans"],0,"opportunity",
      "Cấu trúc đúng là “offer a wide range of + plural noun”, nghĩa là cung cấp nhiều lựa chọn khác nhau.",
      "Nhà hàng cung cấp nhiều món ăn từ các nền văn hóa khác nhau.");
    addMCQ(2,"synonym","The word “suitable” is closest in meaning to ______.",
      ["appropriate","famous","binding","spicy"],0,"suitable",
      "Appropriate là từ gần nghĩa nhất khi nói một thứ phù hợp với mục đích hoặc hoàn cảnh; hai từ khác nhau nhẹ về sắc thái nhưng cùng lõi nghĩa.","");
    addInput(2,"K-pop has become highly ______ among teenagers around the world. (INFLUENCE)",["influential"],"influential",
      "Sau “become highly” cần tính từ mô tả K-pop; “influential” nghĩa là có sức ảnh hưởng lớn.",
      "K-pop đã trở nên có sức ảnh hưởng lớn đối với thanh thiếu niên trên khắp thế giới.");
    addMCQ(2,"meaning","Từ nào có nghĩa “xuyên văn hóa”?",
      ["cross-cultural","world-famous","international","traditional"],0,"cross-cultural",
      "Cross-cultural dùng cho sự tương tác hoặc so sánh giữa các nền văn hóa khác nhau, không chỉ đơn giản là có phạm vi quốc tế.","");
    addMCQ(2,"context","International media can strongly ______ local fashion and music trends.",
      ["influence","reflect","arrive","afford"],0,"influence",
      "Influence là động từ phù hợp vì truyền thông quốc tế có thể làm thay đổi dần xu hướng thời trang và âm nhạc địa phương.",
      "Truyền thông quốc tế có thể ảnh hưởng mạnh đến xu hướng thời trang và âm nhạc địa phương.");
    addMCQ(2,"synonym","The word “worldwide” is closest in meaning to ______.",
      ["global","local","regional","domestic"],0,"worldwide",
      "Worldwide và global đều chỉ phạm vi trên toàn thế giới; worldwide linh hoạt hơn vì có thể dùng như trạng từ.","");
    addInput(2,"The ceremony combines ______ customs with modern music. (TRADITION)",["traditional"],"traditional",
      "Chỗ trống đứng trước danh từ “customs”, nên cần tính từ “traditional”.",
      "Nghi lễ kết hợp các phong tục truyền thống với âm nhạc hiện đại.");
    addMCQ(2,"meaning","Từ nào có nghĩa “cơ hội”?",
      ["opportunity","obligation","variation","location"],0,"opportunity",
      "Opportunity chỉ một hoàn cảnh thuận lợi để làm hoặc đạt điều gì; obligation trái lại là điều bắt buộc phải làm.","");
    addMCQ(2,"context","Traditional clothing often ______ a community's history and values.",
      ["reflects","bans","affords","arrives"],0,"reflect",
      "Reflect phù hợp vì trang phục có thể thể hiện lịch sử và giá trị của một cộng đồng.",
      "Trang phục truyền thống thường phản ánh lịch sử và các giá trị của một cộng đồng.");
    addMCQ(2,"context","Student exchange programmes create opportunities for cultural ______.",
      ["exchange","divorce","sacrifice","ban"],0,"exchange",
      "“Cultural exchange” là collocation tự nhiên vì chương trình trao đổi tạo điều kiện để người học chia sẻ trải nghiệm và thực hành văn hóa.",
      "Các chương trình trao đổi học sinh tạo cơ hội cho sự giao lưu văn hóa.");

    const midReading="Globalisation has increased contact between cultures. People are now more closely (16) ______ through travel, trade and digital media. This contact can introduce new foods, music and customs, but successful exchange requires cultural (17) ______ so that people do not treat unfamiliar behaviour as inferior. Communities may adopt outside influences while still trying to (18) ______ important traditions. In some cases, local and foreign elements (19) ______ to create new styles. The result can be a more complex cultural (20) ______ rather than the disappearance of every local difference.";
    addMCQ(2,"reading","Choose the best option for blank (16).",["connected","compulsory","captivated","illegal"],0,"connected",
      "“Closely connected through travel, trade and digital media” mô tả trực tiếp mức độ liên hệ ngày càng mạnh giữa các nền văn hóa.", "Con người hiện được kết nối chặt chẽ hơn thông qua du lịch, thương mại và truyền thông số.",midReading);
    addMCQ(2,"reading","Choose the best option for blank (17).",["sensitivity","dowry","puberty","location"],0,"cross-cultural",
      "Ngữ cảnh yêu cầu một phẩm chất giúp con người tôn trọng hành vi khác biệt; “cultural sensitivity” là khái niệm phù hợp.", "Sự trao đổi thành công đòi hỏi độ nhạy cảm văn hóa để con người không coi hành vi xa lạ là thấp kém.",midReading);
    addMCQ(2,"reading","Choose the best option for blank (18).",["preserve","ban","afford","taste"],0,"cultural preservation",
      "Sau “try to” cần động từ nguyên mẫu; preserve phù hợp với ý tiếp tục gìn giữ các truyền thống quan trọng.", "Các cộng đồng có thể tiếp nhận ảnh hưởng bên ngoài trong khi vẫn cố gắng bảo tồn những truyền thống quan trọng.",midReading);
    addMCQ(2,"reading","Choose the best option for blank (19).",["blend","divorce","arrive","ban"],0,"blend",
      "Blend diễn tả các yếu tố địa phương và nước ngoài hòa vào nhau để tạo phong cách mới.", "Trong một số trường hợp, các yếu tố địa phương và nước ngoài hòa trộn để tạo nên phong cách mới.",midReading);
    addMCQ(2,"reading","Choose the best option for blank (20).",["identity","ingredient","booth","groom"],0,"identity",
      "Đoạn văn nói về cách một cộng đồng thay đổi nhưng vẫn duy trì sự khác biệt, nên “cultural identity” hoàn chỉnh ý logic.", "Kết quả có thể là một bản sắc văn hóa phức tạp hơn thay vì mọi khác biệt địa phương biến mất.",midReading);

    // SET 3 — HARD (B2–C1): advanced concepts, same exercise forms.
    addMCQ(3,"meaning","Thuật ngữ nào chỉ “xu hướng đánh giá văn hóa khác bằng chuẩn của văn hóa mình”?",
      ["ethnocentrism","pluralism","bilingualism","acculturation"],0,"ethnocentrism",
      "Ethnocentrism chính xác vì trọng tâm là lấy chuẩn văn hóa của chính mình làm thước đo để phán xét các nhóm khác.","");
    addMCQ(3,"context","Newcomers may face pressure toward cultural ______ when they are expected to abandon their original customs.",
      ["assimilation","diffusion","pluralism","immersion"],0,"cultural assimilation",
      "Clue “expected to abandon their original customs” cho thấy quá trình hòa vào văn hóa chi phối kèm mất bớt bản sắc, đúng với assimilation.",
      "Người mới đến có thể chịu áp lực đồng hóa văn hóa khi họ được kỳ vọng từ bỏ các phong tục gốc.");
    addMCQ(3,"synonym","In this context, “perpetuate” is closest in meaning to ______.",
      ["preserve","question","interrupt","reject"],0,"perpetuate",
      "Perpetuate ở đây mang nghĩa làm cho một truyền thống tiếp tục tồn tại; preserve là lựa chọn gần nhất nhưng thiên hơn về bảo tồn khỏi mai một.","");
    addInput(3,"The policy aims to prevent racial ______ in schools. (DISCRIMINATE)",["discrimination"],"discrimination",
      "Sau tính từ “racial” cần danh từ; “discrimination” là danh từ chỉ hành vi đối xử bất công dựa trên đặc điểm nhóm.",
      "Chính sách nhằm ngăn chặn sự phân biệt đối xử về chủng tộc trong trường học.");
    addMCQ(3,"meaning","Thuật ngữ nào chỉ “quan điểm xem tập quán trong chính bối cảnh văn hóa của nó”?",
      ["cultural relativism","ethnocentrism","cultural assimilation","xenophobia"],0,"cultural relativism",
      "Cultural relativism yêu cầu hiểu thực hành văn hóa trong hệ chuẩn của chính cộng đồng đó thay vì áp chuẩn bên ngoài.","");
    addMCQ(3,"context","Diplomats need strong intercultural ______ to communicate effectively across different cultural norms.",
      ["competence","appropriation","assimilation","ethnocentrism"],0,"intercultural competence",
      "Competence phù hợp vì câu nói đến khả năng giao tiếp hiệu quả qua các chuẩn mực văn hóa khác nhau, không chỉ nhận biết sự khác biệt.",
      "Các nhà ngoại giao cần năng lực liên văn hóa tốt để giao tiếp hiệu quả giữa các chuẩn mực văn hóa khác nhau.");
    addMCQ(3,"synonym","The word “compulsory” is closest in meaning to ______.",
      ["mandatory","optional","informal","flexible"],0,"compulsory",
      "Mandatory và compulsory đều chỉ điều bắt buộc theo quy tắc hoặc yêu cầu; optional mang nghĩa ngược lại.","");
    addInput(3,"The programme promotes social ______ by giving minority groups equal access to public services. (INCLUDE)",["inclusion"],"inclusion",
      "Sau “social” cần danh từ chỉ quá trình/kết quả; “inclusion” diễn tả việc bảo đảm các nhóm được tham gia đầy đủ.",
      "Chương trình thúc đẩy hòa nhập xã hội bằng cách cho các nhóm thiểu số quyền tiếp cận bình đẳng với dịch vụ công.");
    addMCQ(3,"meaning","Thuật ngữ nào chỉ “việc sử dụng yếu tố văn hóa khác mà thiếu bối cảnh hoặc sự tôn trọng phù hợp”?",
      ["cultural appropriation","cultural preservation","cultural diffusion","cultural immersion"],0,"cultural appropriation",
      "Cultural appropriation phù hợp vì mô tả việc lấy yếu tố văn hóa ra khỏi bối cảnh hoặc sử dụng thiếu tôn trọng, thường trong quan hệ quyền lực không cân bằng.","");
    addMCQ(3,"context","Music, clothing and food can spread across borders through cultural ______.",
      ["diffusion","assimilation","discrimination","ethnocentrism"],0,"cultural diffusion",
      "Diffusion diễn tả chính quá trình ý tưởng và tập quán lan từ nền văn hóa này sang nền văn hóa khác.",
      "Âm nhạc, trang phục và thực phẩm có thể lan qua biên giới thông qua quá trình khuếch tán văn hóa.");
    addMCQ(3,"synonym","In this context, “obligation” is closest in meaning to ______.",
      ["duty","preference","opportunity","custom"],0,"obligation",
      "Duty giữ gần nhất ý một điều phải thực hiện do trách nhiệm hoặc quy tắc; opportunity và preference không có tính bắt buộc.","");
    addInput(3,"Some immigrants feel pressure to ______ into the majority culture. (ASSIMILATION)",["assimilate"],"assimilate",
      "Sau “to” cần động từ nguyên mẫu; dạng động từ của assimilation là “assimilate”.",
      "Một số người nhập cư cảm thấy áp lực phải đồng hóa vào nền văn hóa đa số.");
    addMCQ(3,"meaning","Thuật ngữ nào chỉ “mô hình xã hội chấp nhận nhiều nhóm và hệ giá trị cùng tồn tại”?",
      ["pluralism","ethnocentrism","xenophobia","assimilation"],0,"pluralism",
      "Pluralism cho phép nhiều nhóm và hệ giá trị cùng tồn tại mà không buộc tất cả phải hòa vào một khuôn văn hóa duy nhất.","");
    addMCQ(3,"context","Museums can support cultural ______ by documenting endangered languages and rituals.",
      ["preservation","appropriation","assimilation","discrimination"],0,"cultural preservation",
      "Documenting endangered languages and rituals là hành động nhằm giữ lại kiến thức và thực hành có nguy cơ mai một, đúng với cultural preservation.",
      "Bảo tàng có thể hỗ trợ việc bảo tồn văn hóa bằng cách ghi lại các ngôn ngữ và nghi lễ đang có nguy cơ biến mất.");
    addMCQ(3,"context","Effective ______ communication requires awareness of differences in politeness, gesture and directness.",
      ["cross-cultural","compulsory","world-famous","binding"],0,"cross-cultural communication",
      "Cross-cultural communication chính xác vì câu nói về giao tiếp giữa người thuộc các nền văn hóa có quy tắc lịch sự, cử chỉ và mức độ trực tiếp khác nhau.",
      "Giao tiếp xuyên văn hóa hiệu quả đòi hỏi nhận thức về khác biệt trong phép lịch sự, cử chỉ và mức độ trực tiếp.");

    const hardReading="Globalisation does not simply cause cultures to become identical. Increased contact can create exchange, adaptation and hybrid forms. Nevertheless, smaller communities may struggle to (16) ______ distinctive customs when global media and consumer culture become dominant. This is especially serious when cultural knowledge is transmitted orally, because the death of older speakers may lead to its gradual (17) ______. Digital technology can help by making recordings and learning materials more widely (18) ______. However, preservation should not mean freezing a culture in time. A living culture naturally evolves, so communities need to achieve a (19) ______ between continuity and innovation rather than treating them as mutually (20) ______.";
    addMCQ(3,"reading","Choose the best option for blank (16).",["preserve","appropriate","assimilate","exclude"],0,"cultural preservation",
      "Động từ preserve phù hợp vì cộng đồng đang cố giữ các phong tục riêng trước sức ép của truyền thông và văn hóa tiêu dùng toàn cầu.", "Các cộng đồng nhỏ hơn có thể gặp khó khăn trong việc gìn giữ những phong tục đặc trưng.",hardReading);
    addMCQ(3,"reading","Choose the best option for blank (17).",["erosion","pluralism","inclusion","diffusion"],0,"identity",
      "“Gradual erosion” diễn tả sự mai một từ từ của tri thức văn hóa khi người truyền lại kiến thức qua đời.", "Cái chết của những người nói lớn tuổi có thể dẫn đến sự mai một dần của tri thức ấy.",hardReading);
    addMCQ(3,"reading","Choose the best option for blank (18).",["accessible","compulsory","ethnocentric","binding"],0,"accessible",
      "“Make materials accessible” là collocation tự nhiên, nghĩa là làm cho tài liệu dễ tiếp cận với nhiều người hơn.", "Công nghệ số có thể giúp bằng cách làm cho các bản ghi và tài liệu học tập dễ tiếp cận rộng rãi hơn.",hardReading);
    addMCQ(3,"reading","Choose the best option for blank (19).",["balance","stereotype","dowry","obligation"],0,"balance",
      "Cấu trúc “achieve a balance between A and B” khớp trực tiếp với hai yêu cầu continuity và innovation.", "Các cộng đồng cần đạt được sự cân bằng giữa tính tiếp nối và đổi mới.",hardReading);
    addMCQ(3,"reading","Choose the best option for blank (20).",["exclusive","connected","suitable","traditional"],0,"exclusive",
      "“Mutually exclusive” là cụm cố định nghĩa là hai điều không thể cùng tồn tại; câu phủ định ý rằng continuity và innovation bắt buộc loại trừ nhau.", "Không nên coi tính tiếp nối và đổi mới là hai điều loại trừ lẫn nhau.",hardReading);

    return {
      grade:12,unit:2,title:"A Multicultural World",source:"VOCAB WEEK 2.pdf",version:3,pilotMixedFormat:true,
      questions:questions,explanations:explanations,
      levelConfig:{
        1:{label:"A2–B1",name:"Easy",note:"Easy",sessionSize:20,readingTail:true,pool:sets[1]},
        2:{label:"B1–B2",name:"Intermediate",note:"Intermediate",sessionSize:20,readingTail:true,pool:sets[2]},
        3:{label:"B2–C1",name:"Hard",note:"Hard",sessionSize:20,readingTail:true,pool:sets[3]}
      }
    };
  }

  window.expandGrade12Banks=function(BANKS){
    if(previousExpand)previousExpand(BANKS);
    BANKS["12-2"]=buildPilot();
    window.G12_UNIT2_PILOT_READY=true;
  };
})();
