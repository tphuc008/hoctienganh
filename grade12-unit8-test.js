(()=>{
"use strict";
// Grade 12 · Unit 8 — limited live preview, not the full 40-question release.
// Each set currently has the original questions 1 (synonym) and 11 (guided cloze).
// The other nine cloze blanks are temporarily filled with their source answers to
// keep the passage coherent during this two-question interface test.
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
  "Last Saturday, our class visited a wildlife rescue centre on the southern (11) ______ of the island. The centre looks after injured birds and sea turtles until they are strong enough to live in the wild again. Many animals had been hurt by plastic waste left on beaches or floating in the sea.",
  "When a new animal arrives, workers examine it carefully to find out what is wrong. They then treat its injuries and give it suitable food. Once the animals recover, they can be released back into the wild.",
  "Visitors can support the centre by donating money or helping with cleaning. The staff also teach children to conserve water and energy at home. During our visit, we helped put up signs asking people not to leave rubbish on the beach. By the end of the day, we understood that small actions can make a real difference."
].join("\n\n");
add(1,{
  id:"u8-easy-q11",sourceQuestionNo:11,lockOptions:true,type:"reading",
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
  "Along the coast of a small island, conservationists discovered that an (11) ______ vine, originally imported for ornamental purposes, was beginning to crowd out native marsh plants. Because field inspections were infrequent, its spread had gone largely unchecked, allowing it to cover wide stretches of wetland. At the same time, the overexploitation of wild sturgeon for their valuable roe had driven fish populations to the verge of collapse.",
  "After reviewing the evidence, every member of the regional council endorsed the proposed measures, and the council voted unanimously to impose tougher restrictions. Substantial fines were designed to act as a deterrent to illegal harvesting, while park rangers received drones to patrol remote habitats.",
  "Injured animals were transported to a coastal sanctuary, where specialists worked to rehabilitate them before their eventual return to the wild. However, the planned expansion of the programme could still fall through if the promised funding failed to materialise."
].join("\n\n");
add(2,{
  id:"u8-hard-q11",sourceQuestionNo:11,lockOptions:true,type:"reading",
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

window.G12_U8_TEST_BANK={
  grade:12,
  unit:88,
  displayUnitNumber:8,
  displayUnitLabel:"Unit 8",
  title:"Wildlife Conservation",
  subtitle:"2 Set · Bản xem thử (2/20 câu mỗi Set)",
  version:2,
  testOnly:true,
  pilotFixedFormat:true,
  trackSetCompletion:true,
  questions,
  explanations,
  explanationById,
  levelConfig:{
    1:{label:"A2–B1",name:"Dễ",title:"Set 1 – Dễ",note:"Bản thử · 2/20 câu · Synonym + Guided Cloze",fixedOrder:true,pool:setPools[1]},
    2:{label:"B2–C2",name:"Khó",title:"Set 2 – Khó",note:"Bản thử · 2/20 câu · Synonym + Guided Cloze",fixedOrder:true,pool:setPools[2]}
  }
};
})();
