/* Two-step discovery prompts and corrective Error Detective questions. */
(function(g){"use strict";
const d=g.GrammarTopic21Data;if(!d)throw Error("Load Topic 21 data first");
const cueRows=[
["l1q1","Câu gốc 'have witnessed' thuộc thì nào?","Hiện tại hoàn thành","Quá khứ đơn",0,"Have + V3 là hiện tại hoàn thành; khi đảo giữ have."],
["l1q2","'This student' là chủ ngữ số ít hay số nhiều?","Số ít","Số nhiều",0,"Một học sinh: số ít; dùng does trước chủ ngữ."],
["l2q1","'Under no circumstances' trong nội quy mang ý gì?","Kể một việc quá khứ","Cấm trong mọi trường hợp",1,"Cụm này mang nghĩa cấm tuyệt đối; cần một modal thích hợp."],
["l2q2","'Proposed' ở vế sau cho biết thì nào?","Quá khứ đơn","Hiện tại đơn",0,"Vế sau ở quá khứ; mệnh đề Not only cũng dùng did."],
["l3q1","Chỗ nào cần đảo sau 'Only when the results were published'?","Trong mệnh đề phụ","Trong mệnh đề chính",1,"Mệnh đề when giữ trật tự thường; mệnh đề chính mới đảo."],
["l3q2","'She returned' là mệnh đề nào sau Only when?","Mệnh đề phụ","Mệnh đề chính",0,"She returned thuộc when-clause nên không đảo bên trong."],
["l4q1","No sooner thường đi với liên từ nào?","When","Than",1,"No sooner … than diễn tả việc thứ hai xảy ra ngay sau việc thứ nhất."],
["l4q2","'Hardly ___ the guests arrived' cần thì gì cho việc xảy ra trước?","Quá khứ hoàn thành","Hiện tại hoàn thành",0,"Hardly had + chủ ngữ + V3 + when …"],
["l5q1","'Would have acted' báo hiệu loại giả định nào?","Tương lai có thể xảy ra","Quá khứ trái thực tế",1,"Kết quả would have + V3 gắn với If … had + V3."],
["l5q2","'Please email the office' nói về tình huống nào?","Có thể phát sinh trong tương lai","Đã chắc chắn xảy ra",0,"Có thể dùng Should you need để nói 'nếu bạn cần'."],
["l6q1","'Strong' sau chỗ trống là từ loại nào?","Danh từ","Tính từ",1,"So + tính từ + be + chủ ngữ + that."],
["l6q2","'Determination' là từ loại nào?","Danh từ","Tính từ",0,"Such was + cụm danh từ + that."],
["l7q1","'It' trong 'Here it comes' là gì?","Cụm danh từ","Đại từ",1,"Với đại từ, giữ Here it comes, không đảo comes it."],
["l7q2","'Only' trong 'Only the head teacher' bổ nghĩa cho gì?","Chủ ngữ","Trạng ngữ thời gian",0,"Only giới hạn người biết, không bắt buộc đảo."],
];
for(const q of d.sections.flatMap(s=>s.checks)){
 const row=cueRows.find(x=>x[0]===q.id);if(!row)throw Error("Missing discovery: "+q.id);
 q.discovery={prompt:row[1],options:[row[2],row[3]],correct:row[4],why:row[5]};
}
d.detectives=[
 ["mechanics","Rarely does she makes such mistakes.","Rarely does she make such mistakes.","Rarely makes she such mistakes.","Does đã mang dấu hiệu hiện tại đơn, nên động từ chính dùng nguyên mẫu make.","Rarely được đưa lên đầu nên cần đảo trợ động từ.","Sau does phải là make, không phải makes."],
 ["negative","Not only she explained the plan, but she also helped us.","Not only did she explain the plan, but she also helped us.","Not only did she explained the plan, but she also helped us.","Not only mở đầu nên phải đảo did she explain; sau did dùng explain.","Not only đứng đầu mệnh đề thứ nhất.","Với quá khứ đơn: did + S + nguyên mẫu."],
 ["only","Only when had we finished the work could we leave.","Only when we had finished the work could we leave.","Only when we finished the work we could leave.","Mệnh đề phụ when we had finished không đảo; mệnh đề chính could we leave mới đảo.","Chia câu thành mệnh đề phụ và chính.","Không đảo trong mệnh đề Only when …."],
 ["time","No sooner had the bus left when it began to rain.","No sooner had the bus left than it began to rain.","No sooner did the bus left than it began to rain.","No sooner đi với than, không đi với when trong cặp chuẩn.","Hai hành động xảy ra liên tiếp gần như tức thì.","Dùng No sooner … than."],
 ["conditional","Had I knew about the deadline, I would have applied.","Had I known about the deadline, I would have applied.","Had I know about the deadline, I would have applied.","Had I known = If I had known; sau had cần V3 known.","Would have applied chỉ giả định quá khứ.","Had + chủ ngữ + V3."],
 ["so-such","So was the storm severe that all roads were closed.","So severe was the storm that all roads were closed.","Such severe was the storm that all roads were closed.","Severe là tính từ: đưa cả So severe lên đầu trước was.","Severe là tính từ.","So + adjective + be + subject + that."],
 ["full","Here comes it!","Here it comes!","Here does it come!","It là đại từ nên giữ it trước comes: Here it comes.","It là đại từ, không phải danh ngữ như the bus.","Here comes the bus nhưng Here it comes."],
].map((r,i)=>({id:"e0"+(i+1),skill:r[0],wrongSentence:r[1],choices:[r[2],r[3]],correct:0,why:r[4],clues:[r[5],r[6]]}));
if(d.detectives.length!==d.skills.length||cueRows.length!==14)throw Error("Incomplete guided exercise bank");
})(window);