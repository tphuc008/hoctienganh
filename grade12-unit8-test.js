(()=>{
"use strict";
// Grade 12 · Unit 8 — original 40-item Wildlife Conservation tests with bilingual explanations.
// Each set preserves source numbering 1–20 and one shared 10-gap cloze passage.
// Internal unit 88 keeps the existing published Basic Review unit 8 intact.

const questions=[];
const explanations=[];
const explanationById={};
const setPools={1:[],2:[]};

function add(set,q,info){
  const letter="ABCD";
  if(!Array.isArray(q.o)||q.o.length!==4||!Number.isInteger(q.a)||q.a<0||q.a>3)
    throw new Error("Invalid Unit 8 preview MCQ: "+q.id);
  if(info.choices.length!==4||info.choices.some((c,i)=>c.word!==q.o[i]||!c.analysis||!c.en||!c.vi))
    throw new Error("Incomplete Unit 8 explanation: "+q.id);
  const d={
    mode:"semantic_precision",
    preserve:true,
    step1:[info.evidence,info.reasoning,info.phrases],
    translation:info.translation,
    options:info.choices.map((c,i)=>({
      label:letter[i],word:c.word,meaning:c.meaning,analysis:c.analysis
    })),
    examples:info.choices.map((c,i)=>({
      label:letter[i],word:c.word,en:c.en,vi:c.vi
    })),
    remember:info.remember||"",
    requiresReview:false
  };
  setPools[set].push(questions.length);
  questions.push(q);
  explanations.push(d);
  explanationById[q.id]=d;
}

// SET 1 — DỄ (A2–B1). Original Question 1: synonym.
add(1,{
  id:"u8-easy-q01",sourceQuestionNo:1,lockOptions:true,
  promptType:"SYNONYM · CLOSEST IN MEANING",target:"protected",
  q:"Park workers protected the baby birds from heavy rain by moving them to a safe place.",
  o:["kept safe","scared","counted","watched"],a:0,
  e:"protected → kept safe"
},{
  translation:"Các nhân viên công viên đã bảo vệ những chú chim non khỏi cơn mưa lớn bằng cách đưa chúng đến một nơi an toàn.",
  evidence:"Chi tiết “moving them to a safe place” cho thấy nhân viên đưa chim non ra khỏi nguy cơ do mưa lớn.",
  reasoning:"Protected ở đây là giúp chim tránh bị tổn hại; kept safe diễn đạt chính hành động giữ chúng an toàn, còn các phương án khác là gây sợ, đếm hoặc quan sát.",
  phrases:"Cụm dùng được: protect somebody from something = bảo vệ ai khỏi điều gì; heavy rain = mưa lớn; move something to a safe place = đưa vật đến nơi an toàn; baby birds = chim non.",
  choices:[
    {word:"kept safe",meaning:"giữ an toàn",analysis:"Đúng. Keep safe diễn tả giúp đối tượng tránh nguy hiểm, trùng với hành động đưa chim đến nơi trú an toàn.",
     en:"Parents should keep young children safe near busy roads.",vi:"Cha mẹ nên giữ an toàn cho trẻ nhỏ khi ở gần những con đường đông xe cộ."},
    {word:"scared",meaning:"làm sợ hãi",analysis:"Sai. Scare gây cảm giác sợ; tình huống mô tả nhân viên bảo vệ chim khỏi mưa chứ không khiến chúng sợ.",
     en:"The loud noise scared the dog.",vi:"Tiếng động lớn khiến con chó sợ hãi."},
    {word:"counted",meaning:"đã đếm",analysis:"Sai. Count xác định số lượng chim, không diễn tả hành động đưa chúng tránh mưa.",
     en:"The teacher counted the students before leaving the museum.",vi:"Giáo viên đếm số học sinh trước khi rời bảo tàng."},
    {word:"watched",meaning:"đã quan sát",analysis:"Sai. Watch chỉ việc theo dõi bằng mắt; quan sát chim không đồng nghĩa với việc chủ động bảo vệ chúng.",
     en:"We watched the dolphins swimming near the boat.",vi:"Chúng tôi quan sát những con cá heo đang bơi gần chiếc thuyền."}
  ],
  remember:"protect somebody from something; keep somebody safe = giữ ai đó an toàn."
});

// SET 1 — DỄ. Original Question 11: one-blank preview of the full 10-blank passage.
const easyPassage=[
  "A Day at a Wildlife Rescue Centre",
  "Last Saturday, our class visited a wildlife rescue centre on the southern (11) ______ of the island. The centre (12) ______ injured birds and sea turtles until they are strong enough to live in the wild again. Many animals had been hurt by plastic (13) ______ left on beaches or floating in the sea.",
  "When a new animal arrives, workers (14) ______ it carefully to find out what is wrong. They then (15) ______ its injuries and give it suitable food. Once the animals (16) ______, they can be released back into the wild.",
  "Visitors can (17) ______ the centre by donating money or helping with cleaning. The staff also teach children to (18) ______ water and energy at home. During our visit, we helped (19) ______ signs asking people not to leave rubbish on the beach. By the end of the day, we understood that small actions can (20) ______ a real difference."
].join("\n\n");
add(1,{
  id:"u8-easy-q11",sourceQuestionNo:11,lockOptions:true,type:"reading",focus:"(11) ______",
  context:easyPassage,
  q:"Which option best fits blank (11)?",
  o:["forest","valley","desert","coast"],a:3,
  e:"coast = bờ biển"
},{
  translation:"Thứ Bảy tuần trước, lớp chúng tôi đã đến thăm một trung tâm cứu hộ động vật hoang dã ở bờ biển phía nam của hòn đảo.",
  evidence:"Cụm “on the southern ... of the island” kết hợp với thông tin về rùa biển, bãi biển ở các câu sau cho biết địa điểm nằm ven biển.",
  reasoning:"Coast là danh từ tạo thành cụm địa điểm on the southern coast of the island. Valley, desert và forest không kết hợp tự nhiên với on the southern ... theo cách câu đang dùng.",
  phrases:"Cụm dùng được: on the southern coast of the island = trên bờ biển phía nam hòn đảo; wildlife rescue centre = trung tâm cứu hộ động vật hoang dã; visit a rescue centre = đến thăm trung tâm cứu hộ.",
  choices:[
    {word:"forest",meaning:"rừng",analysis:"Sai. Forest chỉ khu vực có cây cối; ta thường nói in a forest, không phải on the southern forest of the island trong câu này.",
     en:"Many wild animals live in tropical forests.",vi:"Nhiều loài động vật hoang dã sống trong các khu rừng nhiệt đới."},
    {word:"valley",meaning:"thung lũng",analysis:"Sai. Valley là vùng đất thấp giữa núi hoặc đồi; cách nói thông thường là in a valley, không phải on the southern valley.",
     en:"A small river runs through the valley.",vi:"Một con sông nhỏ chảy qua thung lũng."},
    {word:"desert",meaning:"sa mạc",analysis:"Sai. Desert là vùng đất rất khô; người ta nói in the desert, trong khi đoạn văn dùng giới từ on để chỉ vị trí ven bờ đảo.",
     en:"Camels can travel long distances across the desert.",vi:"Lạc đà có thể di chuyển quãng đường dài qua sa mạc."},
    {word:"coast",meaning:"bờ biển",analysis:"Đúng. On the southern coast of the island là collocation xác định vị trí bờ biển phía nam; ngữ cảnh rùa biển và bãi biển củng cố cách hiểu này.",
     en:"My grandparents live in a small village on the east coast.",vi:"Ông bà tôi sống trong một ngôi làng nhỏ ở bờ biển phía đông."}
  ],
  remember:"on the coast / on the southern coast of an island; in a forest / in a valley / in a desert."
});

// SET 2 — KHÓ (B2–C2). Original Question 1: synonym.
add(2,{
  id:"u8-hard-q01",sourceQuestionNo:1,lockOptions:true,
  promptType:"SYNONYM · CLOSEST IN MEANING",target:"devastated",
  q:"The volunteers were devastated when they learned that the wildlife sanctuary would be permanently closed due to a lack of funding.",
  o:["indifferent","distraught","intrigued","reassured"],a:1,
  e:"devastated → distraught"
},{
  translation:"Các tình nguyện viên vô cùng suy sụp khi biết rằng khu bảo tồn động vật hoang dã sẽ phải đóng cửa vĩnh viễn do thiếu kinh phí.",
  evidence:"Tin khu bảo tồn sẽ “permanently closed due to a lack of funding” là nguyên nhân gây một phản ứng đau khổ nghiêm trọng của những tình nguyện viên.",
  reasoning:"Devastated và distraught đều nói nỗi đau khổ rất mạnh. Distraught còn gợi sự kích động hoặc mất bình tĩnh; indifferent, intrigued và reassured chỉ các phản ứng cảm xúc khác.",
  phrases:"Cụm dùng được: be devastated by something = suy sụp vì việc gì; wildlife sanctuary = khu bảo tồn động vật hoang dã; permanently closed = đóng vĩnh viễn; lack of funding = thiếu kinh phí.",
  choices:[
    {word:"indifferent",meaning:"thờ ơ, không quan tâm",analysis:"Sai. Indifferent chỉ không có phản ứng quan tâm rõ rệt, trái với cảm xúc suy sụp dữ dội của những tình nguyện viên.",
     en:"Many consumers remain indifferent to environmental campaigns unless the issues directly affect their lives.",vi:"Nhiều người tiêu dùng vẫn thờ ơ với các chiến dịch môi trường trừ khi những vấn đề đó ảnh hưởng trực tiếp đến cuộc sống của họ."},
    {word:"distraught",meaning:"vô cùng đau khổ, mất bình tĩnh",analysis:"Đúng. Distraught gần nghĩa nhất với devastated về mức độ đau khổ; khác ở chỗ distraught thường nhấn mạnh sự kích động, còn devastated gợi sự suy sụp sau biến cố.",
     en:"The parents were distraught after discovering that their child had gone missing.",vi:"Cha mẹ vô cùng hoảng loạn và đau khổ sau khi phát hiện con mình mất tích."},
    {word:"intrigued",meaning:"bị thu hút, tò mò",analysis:"Sai. Intrigued diễn tả sự tò mò trước điều đáng chú ý; việc khu bảo tồn đóng cửa gây đau khổ, không phải sự tò mò.",
     en:"Scientists were intrigued by the unexpected behaviour of the animals.",vi:"Các nhà khoa học cảm thấy tò mò trước hành vi bất ngờ của những con vật."},
    {word:"reassured",meaning:"được trấn an, yên tâm hơn",analysis:"Sai. Reassured chỉ cảm giác lo lắng được xoa dịu, đối lập với tác động đau buồn của thông báo đóng cửa vĩnh viễn.",
     en:"Residents felt reassured after the authorities confirmed that the drinking water was safe.",vi:"Người dân cảm thấy yên tâm hơn sau khi chính quyền xác nhận rằng nước uống an toàn."}
  ],
  remember:"devastated = suy sụp sau biến cố; distraught = đau khổ tới mức mất bình tĩnh."
});

// SET 2 — KHÓ. Original Question 11: one-blank preview of the full passage.
const hardPassage=[
  "A Conservation Programme at Risk",
  "Along the coast of a small island, conservationists discovered that an (11) ______ vine, originally imported for ornamental purposes, was beginning to (12) ______ native marsh plants. Because field inspections were infrequent, its spread had gone largely (13) ______, allowing it to cover wide stretches of wetland. At the same time, the (14) ______ of wild sturgeon for their valuable roe had driven fish populations to the verge of collapse.",
  "After reviewing the evidence, every member of the regional council endorsed the proposed measures, and the council voted (15) ______ to impose tougher restrictions. Substantial fines were designed to act as a (16) ______ to illegal harvesting, while park (17) ______ received drones to patrol remote habitats.",
  "Injured animals were transported to a coastal (18) ______, where specialists worked to (19) ______ them before their eventual return to the wild. However, the planned expansion of the programme could still (20) ______ if the promised funding failed to materialise."
].join("\n\n");
add(2,{
  id:"u8-hard-q11",sourceQuestionNo:11,lockOptions:true,type:"reading",focus:"(11) ______",
  context:hardPassage,
  q:"Which option best fits blank (11)?",
  o:["endemic","invasive","terrestrial","restorative"],a:1,
  e:"invasive = có tính xâm lấn"
},{
  translation:"Dọc bờ biển một hòn đảo nhỏ, các nhà bảo tồn phát hiện một loài dây leo xâm lấn vốn được nhập khẩu để làm cảnh đang bắt đầu lấn át các loài thực vật đầm lầy bản địa.",
  evidence:"Hai manh mối “originally imported for ornamental purposes” và “crowd out native marsh plants” cho thấy loài dây leo từ nơi khác xâm nhập và lấn át cây bản địa.",
  reasoning:"Invasive mô tả loài ngoại lai lan rộng và có hại. Endemic là đặc hữu, terrestrial chỉ sống trên cạn, còn restorative mang tác dụng phục hồi, không phù hợp cơ chế gây hại trong câu.",
  phrases:"Cụm dùng được: invasive species = loài xâm lấn; import for ornamental purposes = nhập để làm cảnh; crowd out native plants = lấn át thực vật bản địa; native marsh plants = thực vật đầm lầy bản địa.",
  choices:[
    {word:"endemic",meaning:"đặc hữu, có phân bố tự nhiên giới hạn ở một vùng",analysis:"Sai. Endemic mô tả loài đặc hữu tại khu vực; loài dây leo lại được nhập khẩu từ nơi khác nên không thể là loài đặc hữu theo thông tin đã cho.",
     en:"The loss of a single habitat can threaten species endemic to small islands.",vi:"Việc mất đi một môi trường sống duy nhất có thể đe dọa những loài đặc hữu của các hòn đảo nhỏ."},
    {word:"invasive",meaning:"có tính xâm lấn, gây hại cho hệ sinh thái bản địa",analysis:"Đúng. Cây được đưa từ bên ngoài vào rồi lấn át thảm thực vật bản địa, đúng đặc tính của một loài xâm lấn.",
     en:"Invasive insects can cause severe damage to crops by spreading rapidly across agricultural regions.",vi:"Các loài côn trùng xâm lấn có thể gây thiệt hại nghiêm trọng cho mùa màng bằng cách lan rộng nhanh chóng khắp các vùng nông nghiệp."},
    {word:"terrestrial",meaning:"thuộc về đất liền, sống trên cạn",analysis:"Sai. Terrestrial chỉ môi trường sống trên cạn; nó không xác định nguồn gốc ngoại lai hoặc tác động lấn át cây bản địa.",
     en:"Terrestrial ecosystems are increasingly affected by deforestation and urban expansion.",vi:"Các hệ sinh thái trên cạn đang ngày càng chịu ảnh hưởng từ nạn phá rừng và sự mở rộng đô thị."},
    {word:"restorative",meaning:"có tác dụng phục hồi",analysis:"Sai. Restorative chỉ tác động giúp phục hồi, trong khi loài dây leo đang cạnh tranh và lấn át thực vật bản địa.",
     en:"Adequate sleep has restorative effects on both physical health and cognitive performance.",vi:"Ngủ đủ giấc có tác dụng phục hồi đối với cả sức khỏe thể chất lẫn khả năng nhận thức."}
  ],
  remember:"invasive = loài xâm lấn (ngoại lai và gây hại); endemic = loài đặc hữu của một khu vực."
});


// Full-release items use the same verified explanation schema as the four pilot questions.
function addItem(set,n,kind,source,options,correct,detail){
  const isCloze=kind==="cloze";
  if(detail.meanings?.length!==4||detail.analyses?.length!==4||detail.examples?.length!==4)
    throw new Error("Unit 8 missing four explanations: Set "+set+", Q"+n);
  add(set,{
    id:"u8-"+(set===1?"easy":"hard")+"-q"+String(n).padStart(2,"0"),
    sourceQuestionNo:n,lockOptions:true,
    ...(isCloze
      ?{type:"reading",context:set===1?easyPassage:hardPassage,focus:"("+n+") ______"}
      :{promptType:kind==="syn"?"SYNONYM · CLOSEST IN MEANING":"ANTONYM · OPPOSITE IN MEANING",target:detail.target}),
    q:isCloze?"Which option best fits blank ("+n+")?":source,
    o:options,a:correct,
    e:options[correct]
  },{
    translation:detail.translation,
    evidence:detail.evidence,
    reasoning:detail.reasoning,
    phrases:detail.phrases,
    choices:options.map((word,i)=>({
      word,meaning:detail.meanings[i],analysis:detail.analyses[i],
      en:detail.examples[i][0],vi:detail.examples[i][1]
    })),
    remember:detail.remember||""
  });
}


/* SET 1 — DỄ · Part I: five synonyms and five antonyms. */
addItem(1,2,"syn",
"During the dry season, villagers are encouraged to conserve water by taking shorter showers.",
["boil","heat","save","waste"],2,{
 target:"conserve",translation:"Trong mùa khô, người dân trong làng được khuyến khích tiết kiệm nước bằng cách tắm trong thời gian ngắn hơn.",
 evidence:"“taking shorter showers” cho biết mục đích là giảm lượng nước dùng trong mùa khô.",
 reasoning:"Conserve water nghĩa là sử dụng nước tiết kiệm, tương đương save water; ba động từ còn lại nói về nhiệt độ hoặc sự lãng phí.",
 phrases:"during the dry season = trong mùa khô; be encouraged to do something = được khuyến khích; conserve water = tiết kiệm nước; take shorter showers = tắm ít thời gian hơn.",
 meanings:["đun sôi","làm nóng","tiết kiệm, tránh lãng phí","lãng phí"],
 analyses:["Sai. Boil làm nước đạt nhiệt độ sôi; không nói đến giảm lượng nước sử dụng.","Sai. Heat tăng nhiệt độ của một thứ; không diễn đạt bảo vệ tài nguyên nước.","Đúng. Save water chỉ dùng ít nước hơn, tránh lãng phí; conserve nhấn mạnh thêm khía cạnh gìn giữ nguồn tài nguyên.","Sai. Waste là dùng quá mức cần thiết, mang nghĩa trái ngược với conserve."],
 examples:[
  ["You should boil the water before drinking it.","Bạn nên đun sôi nước trước khi uống."],
  ["She heated the soup before dinner.","Cô ấy hâm nóng súp trước bữa tối."],
  ["Turning off the lights when leaving a room can save electricity.","Tắt đèn khi rời khỏi phòng có thể giúp tiết kiệm điện."],
  ["Don't waste food when many people do not have enough to eat.","Đừng lãng phí thức ăn khi nhiều người vẫn không có đủ đồ ăn."]
 ]});
addItem(1,3,"syn",
"After three weeks of care, the injured turtle finally recovered and could swim again.",
["disappeared","got better","stayed still","grew older"],1,{
 target:"recovered",translation:"Sau ba tuần được chăm sóc, con rùa bị thương cuối cùng đã hồi phục và có thể bơi trở lại.",
 evidence:"“After three weeks of care” và “could swim again” cho biết sức khỏe con rùa đã được cải thiện sau chấn thương.",
 reasoning:"Recover và get better đều mô tả sự bình phục; biến mất, bất động hay già thêm không diễn đạt cải thiện sức khỏe.",
 phrases:"after three weeks of care = sau ba tuần chăm sóc; injured turtle = rùa bị thương; recover = hồi phục; be able to swim again = bơi lại được.",
 meanings:["biến mất","khỏe hơn, bình phục","giữ yên, không di chuyển","già đi, lớn tuổi hơn"],
 analyses:["Sai. Disappear nghĩa là không còn được nhìn thấy, không phải khỏi chấn thương.","Đúng. Got better mô tả sức khỏe tốt trở lại sau điều trị, phù hợp với recovered.","Sai. Stay still chỉ việc không cử động, trái với bằng chứng rùa đã bơi trở lại.","Sai. Grow older mô tả thời gian làm tuổi tăng lên, không phải sức khỏe được phục hồi."],
 examples:[
  ["The cat disappeared from the garden yesterday.","Con mèo đã biến mất khỏi khu vườn hôm qua."],
  ["My brother got better after resting at home for a few days.","Anh trai tôi khỏe hơn sau khi nghỉ ngơi ở nhà vài ngày."],
  ["The child stayed still while the doctor checked his arm.","Đứa trẻ giữ yên trong khi bác sĩ kiểm tra cánh tay của em."],
  ["As people grow older, their interests may change.","Khi con người lớn tuổi hơn, sở thích của họ có thể thay đổi."]
 ]});
addItem(1,4,"syn",
"Local volunteers set up a small centre to help injured animals in the area.",
["cleaned","visited","closed","started"],3,{
 target:"set up",translation:"Các tình nguyện viên địa phương đã thành lập một trung tâm nhỏ để giúp đỡ những động vật bị thương trong khu vực.",
 evidence:"Tân ngữ “a small centre” và mục đích “to help injured animals” cho thấy tình nguyện viên thành lập một cơ sở mới.",
 reasoning:"Set up a centre có nghĩa thành lập hoặc bắt đầu hoạt động trung tâm, tương đương started a centre.",
 phrases:"local volunteers = tình nguyện viên địa phương; set up a centre = thành lập trung tâm; injured animals = động vật bị thương; in the area = trong khu vực.",
 meanings:["làm sạch","ghé thăm","đóng cửa","bắt đầu, thành lập"],
 analyses:["Sai. Clean chỉ vệ sinh trung tâm, không tạo ra một trung tâm mới.","Sai. Visit là đến một cơ sở đã có sẵn, không phải lập ra cơ sở đó.","Sai. Close a centre là đóng trung tâm hoặc chấm dứt hoạt động, trái với set up.","Đúng. Start a centre diễn tả việc bắt đầu hoặc thành lập một cơ sở mới."],
 examples:[
  ["The students cleaned the classroom after the lesson.","Các học sinh dọn dẹp lớp học sau giờ học."],
  ["We visited a national park during our holiday.","Chúng tôi đã đến thăm một vườn quốc gia trong kỳ nghỉ."],
  ["The shop closed early because of the storm.","Cửa hàng đóng cửa sớm vì cơn bão."],
  ["Two friends started a small business selling handmade bags.","Hai người bạn đã thành lập một doanh nghiệp nhỏ bán túi thủ công."]
 ]});
addItem(1,5,"syn",
"Grandparents often pass down stories and traditions to younger family members.",
["pass on","make up","look for","throw away"],0,{
 target:"pass down",translation:"Ông bà thường truyền lại những câu chuyện và truyền thống cho các thành viên trẻ tuổi hơn trong gia đình.",
 evidence:"“stories and traditions” được chuyển “to younger family members”, tức từ thế hệ trước sang thế hệ sau.",
 reasoning:"Pass down và pass on đều diễn tả việc truyền lại cho người khác; pass down nhấn mạnh tính liên thế hệ.",
 phrases:"pass down stories and traditions = truyền chuyện và truyền thống cho thế hệ sau; younger family members = thành viên nhỏ tuổi hơn; family traditions = truyền thống gia đình.",
 meanings:["truyền lại, chuyển tiếp","bịa ra, sáng tác","tìm kiếm","vứt bỏ"],
 analyses:["Đúng. Pass on stories/traditions có nghĩa chuyển những câu chuyện và truyền thống cho người khác, gần nghĩa với pass down.","Sai. Make up stories là nghĩ ra hoặc bịa chuyện mới, không phải lưu truyền chuyện đã có.","Sai. Look for diễn tả tìm kiếm một thứ, không truyền kiến thức.","Sai. Throw away là loại bỏ, trái với hành động lưu giữ và truyền lại."],
 examples:[
  ["Parents can pass on useful life skills to their children.","Cha mẹ có thể truyền lại những kỹ năng sống hữu ích cho con cái."],
  ["The children made up a funny story about a talking dog.","Những đứa trẻ đã sáng tác một câu chuyện hài hước về chú chó biết nói."],
  ["She is looking for her lost keys.","Cô ấy đang tìm chùm chìa khóa bị mất."],
  ["You should not throw away clothes that can still be used.","Bạn không nên vứt bỏ quần áo vẫn còn có thể sử dụng."]
 ]});
addItem(1,6,"ant",
"Joining the wildlife tour is optional, so students can choose whether to take part.",
["interesting","required","helpful","cheap"],1,{
 target:"optional",translation:"Việc tham gia chuyến tham quan động vật hoang dã là không bắt buộc, vì vậy học sinh có thể lựa chọn có tham gia hay không.",
 evidence:"“students can choose whether to take part” xác nhận việc tham gia là tự nguyện.",
 reasoning:"Optional nghĩa không bắt buộc; required nghĩa bắt buộc theo yêu cầu, là từ trái nghĩa trực tiếp.",
 phrases:"join a wildlife tour = tham gia chuyến tham quan; be optional = không bắt buộc; choose whether to do something = chọn có làm hay không; take part = tham gia.",
 meanings:["thú vị","bắt buộc","hữu ích","rẻ, giá thấp"],
 analyses:["Sai. Interesting nói về độ hấp dẫn, không về nghĩa vụ tham gia.","Đúng. Required chỉ việc phải làm, trái với optional — được tự lựa chọn.","Sai. Helpful đánh giá ích lợi; một chuyến tham quan có thể vừa hữu ích vừa không bắt buộc.","Sai. Cheap nói đến giá tiền, không phải có phải tham gia hay không."],
 examples:[
  ["The documentary about ocean animals was very interesting.","Bộ phim tài liệu về động vật đại dương rất thú vị."],
  ["All students are required to wear uniforms at school.","Tất cả học sinh đều được yêu cầu phải mặc đồng phục ở trường."],
  ["The teacher gave us some helpful advice before the exam.","Giáo viên đã cho chúng tôi một số lời khuyên hữu ích trước kỳ thi."],
  ["Taking the bus is usually cheaper than taking a taxi.","Đi xe buýt thường rẻ hơn đi taxi."]
 ]});
addItem(1,7,"ant",
"The school turned down a proposal to build a car park near the lake.",
["discussed","delayed","changed","accepted"],3,{
 target:"turned down",translation:"Nhà trường đã từ chối một đề xuất xây dựng bãi đỗ xe gần hồ.",
 evidence:"Tân ngữ “a proposal” giúp xác định turn down là từ chối đề xuất, không phải giảm âm lượng.",
 reasoning:"Turn down a proposal nghĩa bác bỏ; accept a proposal nghĩa chấp thuận — hai quyết định trái ngược.",
 phrases:"turn down a proposal = từ chối đề xuất; a proposal to build something = đề xuất xây dựng; car park = bãi đỗ xe.",
 meanings:["thảo luận","trì hoãn","thay đổi","chấp nhận, đồng ý"],
 analyses:["Sai. Discussed chỉ trao đổi về đề xuất, chưa nói quyết định chấp thuận hay không.","Sai. Delayed nghĩa hoãn quyết định hoặc thực hiện; vẫn có thể chấp thuận sau.","Sai. Changed là sửa đổi nội dung, không nhất thiết chấp nhận đề xuất.","Đúng. Accepted là chấp thuận đề xuất, trái nghĩa với turned down."],
 examples:[
  ["The students discussed ways to reduce plastic waste.","Các học sinh đã thảo luận những cách giảm rác thải nhựa."],
  ["Heavy rain delayed the football match.","Mưa lớn đã khiến trận bóng đá bị trì hoãn."],
  ["The company changed its plans after receiving customer feedback.","Công ty đã thay đổi kế hoạch sau khi nhận được phản hồi từ khách hàng."],
  ["She accepted the job offer after considering it carefully.","Cô ấy đã chấp nhận lời mời làm việc sau khi cân nhắc kỹ lưỡng."]
 ]});
addItem(1,8,"ant",
"The young birds were protected from cold winds by a wooden shelter.",
["saved","sheltered","left unprotected","kept warm"],2,{
 target:"protected",translation:"Những chú chim non được bảo vệ khỏi gió lạnh nhờ một nơi trú ẩn bằng gỗ.",
 evidence:"“by a wooden shelter” cho thấy chim có nơi che chở khỏi gió lạnh.",
 reasoning:"Protected là được che chở khỏi nguy hiểm; left unprotected nghĩa bị bỏ mặc không có bảo vệ, trái nghĩa trực tiếp.",
 phrases:"young birds = chim non; be protected from something = được bảo vệ khỏi; cold winds = gió lạnh; wooden shelter = nơi trú ẩn bằng gỗ.",
 meanings:["được cứu","được che chở","bị bỏ mặc, không được bảo vệ","được giữ ấm"],
 analyses:["Sai. Saved mô tả giải cứu khỏi nguy hiểm, gần nghĩa với protected trong câu.","Sai. Sheltered là có nơi trú ẩn hoặc che chở, cùng hướng nghĩa với protected.","Đúng. Left unprotected chỉ tình trạng không có che chở, đối lập việc được nơi trú ẩn bảo vệ.","Sai. Kept warm có thể là tác dụng của việc che gió cho chim, không phải điều đối lập."],
 examples:[
  ["The firefighters saved a family from the burning house.","Những người lính cứu hỏa đã cứu một gia đình khỏi ngôi nhà đang cháy."],
  ["The large tree sheltered the children from the hot sun.","Cây lớn che nắng cho những đứa trẻ."],
  ["Many animals are left unprotected when forests are destroyed.","Nhiều loài động vật bị bỏ mặc mà không được bảo vệ khi rừng bị phá hủy."],
  ["The thick blanket kept the baby warm during the night.","Chiếc chăn dày giữ ấm cho em bé suốt đêm."]
 ]});
addItem(1,9,"ant",
"Without conservation efforts, some rare animal species may die out in the future.",
["survive","decline","disappear","vanish"],0,{
 target:"die out",translation:"Nếu không có những nỗ lực bảo tồn, một số loài động vật quý hiếm có thể bị tuyệt chủng trong tương lai.",
 evidence:"“rare animal species” và “without conservation efforts” đặt die out trong nghĩa một loài không còn tồn tại.",
 reasoning:"Die out là tuyệt chủng, còn survive là tiếp tục sống hoặc tồn tại.",
 phrases:"conservation efforts = nỗ lực bảo tồn; rare animal species = loài động vật quý hiếm; die out = tuyệt chủng; in the future = trong tương lai.",
 meanings:["sống sót, tiếp tục tồn tại","suy giảm","biến mất","biến mất, tan biến"],
 analyses:["Đúng. Survive cho biết loài tiếp tục tồn tại, trái với die out là tuyệt chủng.","Sai. Decline là giảm số lượng; quần thể có thể suy giảm trước khi tuyệt chủng.","Sai. Disappear là biến mất, có thể gần nghĩa với die out khi nói về sự hiện diện của loài.","Sai. Vanish cũng diễn tả việc biến mất, không phải sống sót."],
 examples:[
  ["Some desert animals can survive for long periods without drinking water.","Một số động vật sa mạc có thể sống sót trong thời gian dài mà không uống nước."],
  ["The number of wild elephants has declined in some areas.","Số lượng voi hoang dã đã suy giảm ở một số khu vực."],
  ["Many birds disappeared from the area after the forest was cut down.","Nhiều loài chim đã biến mất khỏi khu vực sau khi khu rừng bị chặt phá."],
  ["The rainbow vanished as the dark clouds covered the sky.","Cầu vồng biến mất khi những đám mây đen che phủ bầu trời."]
 ]});
addItem(1,10,"ant",
"The problem seemed trivial at first, but it later caused serious damage to the forest.",
["small","simple","serious","minor"],2,{
 target:"trivial",translation:"Ban đầu, vấn đề có vẻ nhỏ nhặt và không nghiêm trọng, nhưng sau đó nó đã gây ra thiệt hại nghiêm trọng cho khu rừng.",
 evidence:"Sự tương phản “trivial at first, but ... serious damage” đối chiếu đánh giá ban đầu với hậu quả nghiêm trọng.",
 reasoning:"Trivial nghĩa không đáng kể; serious nghĩa nghiêm trọng hoặc đáng quan tâm, trái nghĩa theo mức độ quan trọng.",
 phrases:"seem trivial = có vẻ nhỏ nhặt; at first = ban đầu; cause serious damage to something = gây thiệt hại nghiêm trọng cho điều gì.",
 meanings:["nhỏ","đơn giản","nghiêm trọng, đáng quan tâm","nhỏ, không đáng kể"],
 analyses:["Sai. Small nói về kích thước hoặc mức độ nhỏ, đôi khi gần trivial về mức độ.","Sai. Simple nói đến độ phức tạp; một vấn đề đơn giản vẫn có thể nghiêm trọng.","Đúng. Serious nói đến vấn đề quan trọng, có thể có hậu quả lớn, trái với trivial.","Sai. Minor nghĩa ít quan trọng hoặc không nghiêm trọng, gần nghĩa với trivial."],
 examples:[
  ["The company made a small change to its website.","Công ty đã thực hiện một thay đổi nhỏ trên trang web."],
  ["The teacher gave us a simple explanation of the problem.","Giáo viên đã đưa ra một lời giải thích đơn giản về vấn đề."],
  ["Air pollution is a serious problem in many large cities.","Ô nhiễm không khí là một vấn đề nghiêm trọng ở nhiều thành phố lớn."],
  ["The driver suffered only minor injuries in the accident.","Người lái xe chỉ bị thương nhẹ trong vụ tai nạn."]
 ]});


/* SET 1 — DỄ · Part II: original ten-blank Guided Cloze (Q11–20). */
addItem(1,12,"cloze","",["ignores","looks after","sells","hunts"],1,{
 translation:"Trung tâm chăm sóc những con chim và rùa biển bị thương cho đến khi chúng đủ khỏe để sống trong môi trường hoang dã trở lại.",
 evidence:"“injured birds and sea turtles until they are strong enough to live in the wild again” cho thấy trung tâm giúp động vật hồi phục.",
 reasoning:"Look after injured animals là chăm sóc động vật bị thương; trung tâm cứu hộ không phớt lờ, buôn bán hay săn bắt chúng.",
 phrases:"look after injured animals = chăm sóc thú bị thương; sea turtles = rùa biển; strong enough to do something = đủ khỏe để làm; live in the wild = sống trong tự nhiên.",
 meanings:["phớt lờ","chăm sóc, trông nom","bán","săn bắt"],
 analyses:["Sai. Ignore là phớt lờ, trái với nhiệm vụ chăm sóc các con vật bị thương.","Đúng. Looks after chỉ chăm sóc trong thời gian chúng ở trung tâm để bình phục.","Sai. Sell là bán lấy tiền; đoạn văn nói đến việc thả động vật trở lại tự nhiên.","Sai. Hunt là săn bắt, không phải cứu hộ động vật bị thương."],
 examples:[
  ["He often ignores messages when he is busy studying.","Anh ấy thường phớt lờ tin nhắn khi bận học."],
  ["My grandmother looks after my little brother when my parents are at work.","Bà tôi chăm sóc em trai tôi khi bố mẹ đi làm."],
  ["The farmer sells fresh vegetables at the local market.","Người nông dân bán rau tươi tại chợ địa phương."],
  ["Some wild animals hunt at night.","Một số động vật hoang dã săn mồi vào ban đêm."]
 ]});
addItem(1,13,"cloze","",["waste","food","flowers","sand"],0,{
 translation:"Nhiều con vật đã bị thương do rác thải nhựa bị bỏ lại trên bãi biển hoặc trôi nổi trên biển.",
 evidence:"“plastic ... left on beaches or floating in the sea” và “animals had been hurt” cho thấy vật liệu nhựa bị thải bỏ gây hại.",
 reasoning:"Plastic waste là rác thải nhựa — loại đồ bỏ đi có thể làm động vật biển mắc kẹt hoặc nuốt phải.",
 phrases:"plastic waste = rác thải nhựa; be hurt by something = bị tổn hại bởi; left on beaches = bị bỏ lại ở bãi biển; float in the sea = trôi nổi trên biển.",
 meanings:["rác thải, chất thải","thức ăn","những bông hoa","cát"],
 analyses:["Đúng. Plastic waste gọi đúng rác nhựa nằm trên bờ hoặc nổi trong nước gây thương tích.","Sai. Plastic food không phải tên thông thường cho rác nhựa gây thương tích.","Sai. Plastic flowers là hoa nhựa; dù cũng có thể thành rác, câu đang nói đến rác nhựa nói chung.","Sai. Plastic sand không phải cụm thường dùng để chỉ vật liệu nhựa bị vứt xuống biển."],
 examples:[
  ["Plastic waste can harm fish and other marine animals.","Rác thải nhựa có thể gây hại cho cá và các động vật biển khác."],
  ["The rescue centre provides food for injured birds.","Trung tâm cứu hộ cung cấp thức ăn cho những con chim bị thương."],
  ["She bought some plastic flowers to decorate her room.","Cô ấy mua một vài bông hoa nhựa để trang trí phòng."],
  ["The children built a castle with sand on the beach.","Những đứa trẻ xây một lâu đài bằng cát trên bãi biển."]
 ]});
addItem(1,14,"cloze","",["leave","follow","examine","release"],2,{
 translation:"Khi một con vật mới được đưa đến, các nhân viên kiểm tra nó cẩn thận để tìm hiểu xem có vấn đề gì.",
 evidence:"“carefully to find out what is wrong” chỉ mục đích chẩn đoán tình trạng con vật mới đến.",
 reasoning:"Examine an animal carefully = kiểm tra kỹ để biết nó đang gặp vấn đề sức khỏe gì, là bước trước điều trị.",
 phrases:"when a new animal arrives = khi con vật mới đến; examine carefully = kiểm tra kỹ; find out what is wrong = tìm hiểu vấn đề ở đâu; rescue centre workers = nhân viên cứu hộ.",
 meanings:["rời đi, bỏ lại","đi theo","kiểm tra, khám kỹ","thả, trả tự do"],
 analyses:["Sai. Leave không giúp xác định tình trạng sức khỏe của con vật.","Sai. Follow là đi theo hoặc theo dõi, không mô tả việc khám để phát hiện thương tích.","Đúng. Examine là kiểm tra kỹ nhằm xác định tình trạng, phù hợp cụm to find out what is wrong.","Sai. Release là thả về tự nhiên, chỉ thực hiện khi con vật đã khỏe, không phải ngay lúc đến."],
 examples:[
  ["Please leave your shoes outside the room.","Vui lòng để giày bên ngoài phòng."],
  ["The little dog followed its owner into the garden.","Chú chó nhỏ đi theo chủ vào khu vườn."],
  ["The doctor examined the patient's injured leg.","Bác sĩ đã kiểm tra chân bị thương của bệnh nhân."],
  ["The workers released the healthy birds back into the forest.","Các nhân viên đã thả những con chim khỏe mạnh trở lại khu rừng."]
 ]});
addItem(1,15,"cloze","",["lose","carry","count","treat"],3,{
 translation:"Sau đó, họ điều trị những vết thương của con vật và cung cấp thức ăn phù hợp cho nó.",
 evidence:"Sau khi “examine” để tìm thương tích, nhân viên phải xử lý “its injuries” và cho thức ăn phù hợp.",
 reasoning:"Treat injuries là điều trị thương tích; carry hay count injuries không giải quyết thương tích, còn lose không kết hợp với injuries theo nghĩa này.",
 phrases:"treat injuries = điều trị vết thương; give suitable food = cho thức ăn phù hợp; after examining an animal = sau khi khám động vật.",
 meanings:["làm mất","mang, vận chuyển","đếm","điều trị"],
 analyses:["Sai. Lose injuries không phải collocation cho việc cứu chữa con vật.","Sai. Carry an animal là vận chuyển con vật, nhưng carry its injuries không có nghĩa điều trị.","Sai. Count injuries nghĩa đếm số vết thương, không phải chữa chúng.","Đúng. Treat injuries là collocation diễn tả bước điều trị sau khi khám."],
 examples:[
  ["He lost his phone on the way to school.","Anh ấy làm mất điện thoại trên đường đến trường."],
  ["The volunteers carried the injured dog to the car.","Các tình nguyện viên bế con chó bị thương lên xe."],
  ["The nurse counted the number of patients waiting outside.","Y tá đếm số bệnh nhân đang chờ bên ngoài."],
  ["The vet treated the injured cat and gave it some medicine.","Bác sĩ thú y đã điều trị cho con mèo bị thương và cho nó uống thuốc."]
 ]});
addItem(1,16,"cloze","",["escape","recover","arrive","hide"],1,{
 translation:"Khi những con vật hồi phục, chúng có thể được thả trở lại môi trường hoang dã.",
 evidence:"“Once the animals ..., they can be released back into the wild” nêu điều kiện trước khi thả động vật.",
 reasoning:"Recover nghĩa lấy lại sức khỏe; đây là điều kiện để con vật có thể sinh tồn khi được thả.",
 phrases:"recover from an injury = hồi phục sau chấn thương; once something happens = một khi việc gì xảy ra; released back into the wild = được thả về tự nhiên.",
 meanings:["trốn thoát","hồi phục sức khỏe","đến nơi","trốn, ẩn nấp"],
 analyses:["Sai. Escape nói con vật tự trốn thoát, không phải đã đủ khỏe để được chủ động thả.","Đúng. Recover mô tả việc lấy lại sức khỏe sau chăm sóc, là điều kiện trước khi thả.","Sai. Arrive là đến trung tâm; diễn ra lúc bắt đầu cứu hộ chứ không phải cuối giai đoạn điều trị.","Sai. Hide là trốn tránh, không chứng minh con vật đã hồi phục."],
 examples:[
  ["The bird escaped from its cage through an open door.","Con chim đã trốn khỏi lồng qua một cánh cửa mở."],
  ["It took him several weeks to recover from the accident.","Anh ấy mất vài tuần để hồi phục sau vụ tai nạn."],
  ["The train arrived at the station ten minutes late.","Tàu đến nhà ga muộn mười phút."],
  ["The rabbit hid behind a large tree when it saw the fox.","Con thỏ trốn sau một cái cây lớn khi nhìn thấy con cáo."]
 ]});
addItem(1,17,"cloze","",["support","damage","forget","stop"],0,{
 translation:"Khách tham quan có thể hỗ trợ trung tâm bằng cách quyên góp tiền hoặc giúp dọn dẹp.",
 evidence:"“by donating money or helping with cleaning” mô tả việc đóng góp tiền và công sức cho trung tâm.",
 reasoning:"Support a centre là giúp cơ sở có thêm nguồn lực; damage, forget và stop đều không diễn tả tác dụng của quyên góp.",
 phrases:"support a rescue centre = hỗ trợ trung tâm cứu hộ; donate money = quyên góp; help with cleaning = giúp dọn dẹp; by doing something = bằng cách làm gì.",
 meanings:["hỗ trợ, ủng hộ","gây hư hại","quên","dừng, ngăn chặn"],
 analyses:["Đúng. Donate money và giúp dọn dẹp là hai cách hỗ trợ hoạt động của trung tâm.","Sai. Damage là gây thiệt hại, trái với hành vi đóng góp.","Sai. Forget là không nhớ, không có quan hệ nhân quả với quyên góp hoặc dọn dẹp.","Sai. Stop the centre nghĩa khiến trung tâm ngừng hoạt động, không phải giúp nó tiếp tục hoạt động."],
 examples:[
  ["Many people support local charities by donating clothes and food.","Nhiều người hỗ trợ các tổ chức từ thiện địa phương bằng cách quyên góp quần áo và thức ăn."],
  ["The storm damaged several houses near the river.","Cơn bão đã làm hư hại một số ngôi nhà gần con sông."],
  ["I forgot to bring my notebook to school yesterday.","Hôm qua tôi quên mang vở đến trường."],
  ["The police stopped the cars because the road was unsafe.","Cảnh sát đã chặn các phương tiện vì con đường không an toàn."]
 ]});
addItem(1,18,"cloze","",["waste","heat","conserve","collect"],2,{
 translation:"Các nhân viên cũng dạy trẻ em cách tiết kiệm nước và năng lượng tại nhà.",
 evidence:"Đoạn văn nói đến giáo dục bảo vệ động vật và môi trường; “water and energy at home” là các nguồn tài nguyên cần tránh lãng phí.",
 reasoning:"Conserve water and energy là collocation chỉ sử dụng tiết kiệm hai loại tài nguyên, phù hợp nhiệm vụ giáo dục của trung tâm.",
 phrases:"teach somebody to do something = dạy ai làm gì; conserve water and energy = tiết kiệm nước và năng lượng; at home = tại nhà.",
 meanings:["lãng phí","làm nóng","tiết kiệm, bảo tồn","thu thập, gom lại"],
 analyses:["Sai. Waste làm hao phí tài nguyên, ngược mục tiêu bảo tồn của trung tâm.","Sai. Heat water là làm nóng nước; heat energy không có nghĩa tiết kiệm điện.","Đúng. Conserve water and energy diễn tả giảm sử dụng không cần thiết và bảo vệ nguồn lực.","Sai. Collect water có thể nghĩa hứng nước mưa; collect energy không diễn đạt ý dùng tài nguyên tiết kiệm trong gia đình."],
 examples:[
  ["Leaving the tap running while brushing your teeth wastes water.","Để vòi nước chảy khi đánh răng gây lãng phí nước."],
  ["We use electricity to heat our home in winter.","Chúng tôi sử dụng điện để sưởi ấm nhà vào mùa đông."],
  ["Families can conserve energy by turning off unused electrical appliances.","Các gia đình có thể tiết kiệm năng lượng bằng cách tắt những thiết bị điện không sử dụng."],
  ["Some families collect rainwater to water their gardens.","Một số gia đình thu gom nước mưa để tưới vườn."]
 ]});
addItem(1,19,"cloze","",["take off","turn down","go off","put up"],3,{
 translation:"Trong chuyến tham quan, chúng tôi đã giúp dựng và treo những tấm biển nhắc nhở mọi người không xả rác trên bãi biển.",
 evidence:"“signs asking people not to leave rubbish on the beach” là biển thông báo cần dựng/treo ở nơi dễ nhìn.",
 reasoning:"Put up signs là cụm động từ cố định nghĩa dựng hoặc treo biển; các phrasal verb còn lại không có nghĩa này.",
 phrases:"during our visit = trong chuyến tham quan; put up signs = dựng/treo biển; ask somebody not to do something = yêu cầu ai không làm gì; leave rubbish on the beach = xả rác ở bãi biển.",
 meanings:["cởi ra, cất cánh, phát triển mạnh","từ chối hoặc giảm âm lượng","chuông reo, nổ, thực phẩm bị hỏng","dựng, treo lên"],
 analyses:["Sai. Take off có thể là tháo/cởi ra, không phải dựng biển thông báo.","Sai. Turn down đi với offer, invitation hoặc volume; không diễn tả treo bảng hiệu.","Sai. Go off thường không có tân ngữ signs theo cấu trúc câu này và không có nghĩa dựng biển.","Đúng. Put up signs là cách nói thông dụng để lắp hoặc treo biển nhắc nhở."],
 examples:[
  ["Please take off your shoes before entering the house.","Vui lòng cởi giày trước khi vào nhà."],
  ["Could you turn down the music? I'm trying to study.","Bạn có thể giảm âm lượng nhạc xuống không? Tôi đang cố gắng học bài."],
  ["My alarm goes off at six o'clock every morning.","Chuông báo thức của tôi reo lúc sáu giờ mỗi sáng."],
  ["The students put up posters about recycling around the school.","Các học sinh treo những tấm áp phích về tái chế quanh trường."]
 ]});
addItem(1,20,"cloze","",["do","make","take","put"],1,{
 translation:"Đến cuối ngày, chúng tôi hiểu rằng ngay cả những hành động nhỏ cũng có thể tạo ra sự thay đổi thực sự.",
 evidence:"“small actions can ... a real difference” cần đúng collocation mô tả việc tạo ra thay đổi hoặc tác động.",
 reasoning:"Make a difference là thành ngữ/collocation cố định; do, take và put không thay thế make trong cụm này.",
 phrases:"by the end of the day = đến cuối ngày; small actions = những hành động nhỏ; make a real difference = tạo tác động thực sự.",
 meanings:["làm, thực hiện","tạo ra, gây nên","lấy, nhận, thực hiện","đặt, để"],
 analyses:["Sai. Do đi với homework, chores, work; không có cụm do a difference.","Đúng. Make a difference là kết hợp từ cố định để nói việc tạo ra tác động.","Sai. Take có trong take action / take responsibility, nhưng không dùng take a difference.","Sai. Put dùng cho việc đặt một thứ vào vị trí, không có cụm put a difference theo nghĩa này."],
 examples:[
  ["I usually do my homework after dinner.","Tôi thường làm bài tập về nhà sau bữa tối."],
  ["Even a small donation can make a difference to someone's life.","Ngay cả một khoản quyên góp nhỏ cũng có thể tạo ra sự khác biệt trong cuộc sống của ai đó."],
  ["We should take action to protect endangered animals.","Chúng ta nên hành động để bảo vệ các loài động vật có nguy cơ tuyệt chủng."],
  ["Please put the books on the shelf.","Vui lòng đặt những cuốn sách lên kệ."]
 ]});

//__UNIT8_FULL_ITEMS__

setPools[1].sort((a,b)=>questions[a].sourceQuestionNo-questions[b].sourceQuestionNo);
setPools[2].sort((a,b)=>questions[a].sourceQuestionNo-questions[b].sourceQuestionNo);

window.G12_U8_TEST_BANK={
  grade:12,
  unit:88,
  displayUnitNumber:8,
  displayUnitLabel:"Unit 8",
  title:"Wildlife Conservation",
  subtitle:"2 Set · 40 câu · Wildlife Conservation",
  version:3,
  testOnly:true,
  pilotFixedFormat:true,
  trackSetCompletion:true,
  questions,
  explanations,
  explanationById,
  levelConfig:{
    1:{label:"A2–B1",name:"Dễ",title:"Set 1 – Dễ",note:"20 câu · Synonym/Antonym + Guided Cloze",fixedOrder:true,pool:setPools[1]},
    2:{label:"B2–C2",name:"Khó",title:"Set 2 – Khó",note:"20 câu · Synonym/Antonym + Guided Cloze",fixedOrder:true,pool:setPools[2]}
  }
};
})();
