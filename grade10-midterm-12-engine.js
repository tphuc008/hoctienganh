/* Extend existing Mid Term Test assessment with Word-grounded Tests 1–2. */
(function(global){
"use strict";
const KEY=global.G10_MIDTERM_12_KEY;
function parseTests(text){
 const api=global.G10MidtermPaperParser;
 if(!api||!KEY)throw new Error("Missing original-test parser or answer data");
 const tests=[];
 for(const n of [1,2]){
  const doc=api.parsePaper(api.testText(text,n),n);api.correctCounts(doc,n);
  const rawKeys=KEY.KEYS[n].split(/\s+/),seen=0;
  const questions=doc.questions.map((src,i)=>{
   const isChoice=!!src.choices;
   const answer=isChoice?rawKeys[i]:KEY.WRITTEN[n+"-"+src.number];
   const id=n+"-"+src.number;
   if(!answer)throw new Error("Missing checked answer "+id);
   const num=src.number;
   const section=n===1&&num>=44?"Passive Voice":(n===1&&num>=41||n===2&&num>=36)?"Sentence Rearrangement":num>=31?"Reading Comprehension":num>=23?"Text Completion":"Main";
   const question={id,number:num,section,stem:src.prompt||"Choose the answer for gap ("+num+") in the passage.",options:src.choices||null,
     context:src.intro||"",answer,hint:KEY.HINTS[n][i]||"Đối chiếu chủ ngữ, thời gian, vị trí trống và nghĩa của từng đáp án.",warning:KEY.FLAGS[id]||""};
   return question;
  });
  tests.push({id:n,title:"Test "+n,questions});
 }
 return tests;
}
const prev=global.G10_MIDTERM_EXPLAIN;
const grammarPatterns=[
 ["sau động từ khuyết thiếu","Động từ theo sau modal ở dạng nguyên mẫu không to; dạng V-ing/V2/to-V không thay thế được."],
 ["hiện tại đơn","Chủ ngữ và trạng từ tần suất phải khớp dạng động từ."],
 ["hiện tại tiếp diễn","Tạo bởi am/is/are + V-ing; dùng cho hành động diễn ra quanh thời điểm nói."],
 ["bị động","Công thức be + V3, be phải chia theo thì và chủ ngữ mới."],
 ["cụm từ","Đối chiếu cả kết hợp từ (collocation) và nghĩa của toàn câu."]
];
const gloss={
"gratitude":"lòng biết ơn","sadness":"nỗi buồn","influence":"ảnh hưởng","advantage":"lợi thế",
"unharmed":"không bị thương","harmful":"có hại","harmless":"vô hại","harm":"tác hại; làm hại",
"relaxed":"thoải mái, ít nghiêm khắc","strict":"nghiêm khắc","lazy":"lười biếng","funny":"hài hước",
"messes":"sự bừa bộn","chores":"việc nhà","rests":"sự nghỉ ngơi","bonds":"mối gắn kết",
"picked up":"nhặt lên; đón","turned off":"đã tắt","broke down":"bị hỏng; suy sụp","raised up":"nâng lên",
"carbon":"carbon","waste":"rác thải","energy":"năng lượng","water":"nước",
"regularly":"đều đặn","rarely":"hiếm khi","quickly":"nhanh chóng","messily":"một cách lộn xộn",
"golden":"vàng","sandwich":"bị kẹp giữa hai trách nhiệm","lost":"bị mất","silver":"bạc",
"create":"tạo ra (động từ)","creative":"sáng tạo (tính từ)","creatively":"một cách sáng tạo (trạng từ)","creativity":"sự sáng tạo (danh từ)",
"outgoing":"hòa đồng","responsible":"có trách nhiệm","easygoing":"dễ tính","independent":"tự lập",
"fosters":"nuôi dưỡng; thúc đẩy","relies":"dựa vào","distracts":"làm xao nhãng","prepares":"chuẩn bị",
"take":"lấy, cầm","spend":"dành/tiêu","kill":"giết; giết thời gian",
"runner-up":"người về nhì","judge":"giám khảo; chấm","participant":"người tham gia","fan":"người hâm mộ",
"reach":"đạt tới","delay":"trì hoãn","eliminate":"loại bỏ","perform":"biểu diễn",
"and":"và; thêm vào","or":"hoặc; lựa chọn","but":"nhưng; tương phản","so":"vì vậy; kết quả",
"ring":"reo; ngân","chime":"tiếng chuông ngân","sound":"âm thanh; phát ra tiếng","strike":"đánh; tác động",
"make":"tạo, thực hiện","do":"làm","get":"nhận; đạt",
"limits":"giới hạn","surpasses":"vượt qua","divides":"chia tách","includes":"bao gồm",
"platforms":"nền tảng","people":"con người","stars":"ngôi sao","performers":"người biểu diễn",
"homemaker":"người nội trợ","breadwinner":"người kiếm thu nhập chính","housework":"việc nhà (không đếm được)","achievement":"thành tựu",
"household chores":"những công việc trong gia đình","method":"phương pháp","playtime":"giờ vui chơi","achievements":"các thành tựu",
"shares":"chia sẻ","damages":"làm hư hại","discusses":"thảo luận","cooks":"nấu ăn",
"encourage":"khuyến khích","drop":"làm rơi; bỏ","prepare":"chuẩn bị","reduce":"cắt giảm",
"collect":"thu gom","organize":"tổ chức","public transport":"giao thông công cộng","natural resources":"tài nguyên thiên nhiên",
"an appliance":"một thiết bị gia dụng","a device":"một thiết bị","strengthen":"củng cố","divide":"chia tách",
"equally":"đồng đều, công bằng","spotlessly":"sạch bong","honestly":"một cách thành thật","truthfully":"một cách trung thực",
"chemicals":"hóa chất","appliances":"thiết bị gia dụng","devices":"thiết bị","materials":"vật liệu",
"awareness":"nhận thức","atmosphere":"bầu không khí","temperature":"nhiệt độ","estimate":"ước tính",
"reuse":"dùng lại","litter":"xả rác","pollute":"làm ô nhiễm","identify with":"đồng cảm/đồng nhất với",
"depend on":"phụ thuộc vào","take part in":"tham gia","base on":"dựa vào",
"if":"nếu; điều kiện","because":"bởi vì; nguyên nhân","although":"mặc dù; nhượng bộ",
"applause":"tiếng vỗ tay","cheer":"cổ vũ","audience":"khán giả","organizer":"người tổ chức",
"instead of":"thay vì","in contrast":"trái lại","however":"tuy nhiên","where":"nơi mà","when":"khi","how":"bằng cách nào",
"oversea":"ở nước ngoài (dạng tính từ trong đề chưa chuẩn)","local":"địa phương","native":"bản địa","original":"nguyên gốc",
"facts":"sự thật","instruments":"nhạc cụ","cutures":"lỗi chính tả của cultures (các nền văn hóa)","aspects":"khía cạnh"
};
function summarizeChoice(q,label,value){
 const txt=String(value).trim(),lower=txt.toLowerCase();
 if(/^[a-g](?:\s*[-–]\s*[a-g]){2,}$/.test(lower)){
   const expected=String(q.options?.["ABCD".indexOf(q.answer)]||"").toLowerCase().replace(/\s/g,"");
   const actual=lower.replace(/\s/g,"");const seq=actual.split(/[-–]/),target=expected.split(/[-–]/);
   const clash=seq.findIndex((c,i)=>c!==target[i]);
   return "Trình tự "+seq.join(" → ")+". "+(clash<0?"Các câu nối tiếp đúng theo trật tự mở đầu, thông tin tiếp diễn và kết luận.":"Khác mạch chuẩn từ vị trí "+(clash+1)+": ở đây dùng câu "+seq[clash]+" thay cho câu "+target[clash]+". Cần kiểm tra người nói, đại từ và quan hệ nguyên nhân – kết quả.");
 }
 const base=gloss[lower];
 if(base)return "Nghĩa: "+base+". "+(label===q.answer?"Khớp clue: ":"Khác trọng tâm cần điền: ")+q.hint+".";
 if(/^(?:am|is|are|was|were|will|has|have|do|does|did|should|to|is going|are going|being)\b/i.test(txt)||/\b(?:-ing|-ed)\b/i.test(txt))return "Kiểm tra dạng động từ “"+txt+"” theo chủ ngữ, trợ động từ, thời gian và câu chủ động/bị động. "+q.hint+".";
 return "Phương án “"+txt+"”: xét sự liên kết ngữ pháp và nghĩa với câu nguồn. "+q.hint+".";
}
function specificExample(value,q){
 const v=String(value).trim();
 const l=v.toLowerCase();
 if(/^[a-g](?:\s*[-–]\s*[a-g]){2,}$/.test(l)){
  return ["Arrange the sentences so that each reply follows its question.","Sắp xếp câu sao cho mỗi lời đáp nối tiếp câu hỏi tương ứng."];
 }
 if(/^(?:paragraph \d+)$/i.test(v))return ["The answer can be found in "+v+".","Có thể tìm thấy câu trả lời trong "+v+"."];
 const examples={
 gratitude:["I feel deep gratitude towards my teachers.","Tôi biết ơn sâu sắc những người thầy cô của mình."],
 harmful:["Harmful chemicals should not enter rivers.","Hóa chất độc hại không nên chảy vào sông."],
 strict:["My parents are strict about bedtime.","Cha mẹ tôi rất nghiêm về giờ ngủ."],
 bonds:["Shared meals strengthen family bonds.","Bữa ăn chung giúp gia đình gắn kết hơn."],
 waste:["We try to reduce food waste.","Chúng tôi cố gắng giảm rác thực phẩm."],
 regularly:["She exercises regularly after class.","Cô ấy tập thể dục đều đặn sau giờ học."],
 sandwich:["The sandwich generation cares for children and ageing parents.","Thế hệ sandwich chăm sóc cả con cái lẫn cha mẹ già."],
 creativity:["Art classes encourage creativity.","Lớp mỹ thuật khuyến khích óc sáng tạo."],
 responsible:["We are responsible for our decisions.","Chúng tôi chịu trách nhiệm về quyết định của mình."],
 fosters:["Respect fosters trust in a family.","Tôn trọng giúp nuôi dưỡng niềm tin trong gia đình."],
 spend:["I spend time reading with my sister.","Tôi dành thời gian đọc sách với em gái."],
 "runner-up":["She finished as runner-up in the singing contest.","Cô ấy về nhì cuộc thi hát."],
 reach:["The band reached the top of the chart.","Ban nhạc đạt vị trí đầu bảng xếp hạng."],
 "ring":["Does that name ring a bell?","Cái tên đó có gợi cho bạn sự quen thuộc không?"],
 make:["Practice makes progress possible.","Luyện tập giúp tạo ra tiến bộ."],
 "breadwinner":["Her mother is the family's breadwinner.","Mẹ cô ấy là người kiếm thu nhập chính trong nhà."],
 "household chores":["Everyone shares household chores.","Mọi người cùng chia việc nhà."],
 shares:["He shares the housework with his brother.","Anh ấy chia việc nhà với em trai."],
 encourage:["Teachers encourage students to ask questions.","Giáo viên khuyến khích học sinh đặt câu hỏi."],
 reduce:["Public transport can reduce emissions.","Giao thông công cộng có thể giảm khí thải."],
 "public transport":["I take public transport to school.","Tôi đi phương tiện công cộng đến trường."],
 strengthen:["Good communication strengthens friendships.","Giao tiếp tốt củng cố tình bạn."],
 equally:["We divide household tasks equally.","Chúng tôi chia việc nhà công bằng."],
 chemicals:["The factory released dangerous chemicals.","Nhà máy thải các hóa chất nguy hiểm."],
 awareness:["The campaign raises public awareness.","Chiến dịch nâng cao nhận thức cộng đồng."],
 reuse:["We reuse glass jars for storage.","Chúng tôi dùng lại lọ thủy tinh để đựng đồ."],
 "identify with":["I identify with the character's struggles.","Tôi đồng cảm với khó khăn của nhân vật."],
 "instead of":["Use a reusable cup instead of a disposable one.","Dùng cốc tái sử dụng thay vì cốc một lần."],
 "where":["This is the shop where my sister works.","Đây là cửa hàng nơi chị tôi làm việc."],
 "aspects":["The article discusses several aspects of music.","Bài báo đề cập một số khía cạnh của âm nhạc."]
 };
 if(examples[l])return examples[l];
 const meaning=gloss[l];
 if(meaning&&/^[a-z]+$/i.test(v))return ["The word “"+v+"” has a different use in other contexts.","Từ “"+v+"” có cách dùng khác tùy ngữ cảnh."];
 return ["Compare the complete phrase with the sentence in the question.","So sánh toàn bộ cụm từ với câu trong đề."];
}
global.G10_MIDTERM_12_PARSE=parseTests;
global.G10_MIDTERM_EXPLAIN=function(q,context){
 if(!/^[12]-/.test(q.id))return prev(q,context);
 const base=prev(q,context);
 const choices=q.options||[];
 if(base.step1.length<3)base.step1=[];
 const snippet=String(q.stem||"").slice(0,270);
 const evidence=String(context||q.context||"").slice(0,240);
 base.step1=[
  "Dịch và xác định ý: "+q.hint+". Câu gốc: “"+snippet+"”.",
  "Clue: "+(evidence?"Đối chiếu thông tin trong đoạn văn “"+evidence+"…”; ":"Đối chiếu trực tiếp cấu trúc/chủ ngữ/trạng từ trong câu. ")+q.hint+".",
  "Đáp án "+q.answer+" — "+choices["ABCD".indexOf(q.answer)]+". "+q.hint+"."
 ];
 base.options=choices.map((v,i)=>{
  const label="ABCD"[i],detail=summarizeChoice(q,label,v);
  return {label,word:v,meaning:gloss[String(v).trim().toLowerCase()]||"",analysis:detail};
 });
 base.examples=choices.map((v,i)=>{const [en,vi]=specificExample(v,q);return {label:"ABCD"[i],word:v,en,vi}});
 base.remember=q.hint+". Đối chiếu cả nghĩa, cấu trúc và quan hệ với câu nguồn trước khi chọn.";
 return base;
};
})(window);