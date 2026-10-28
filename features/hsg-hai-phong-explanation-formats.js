/* Hải Phòng-only review format, 2026-10-28.
 * Presentation ONLY. Never use these editorial answers for scoring.
 * Requires existing answer-release gate in hsg-tinh.js.
 */
(function(global){
"use strict";
const h=x=>String(x??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const P=(en,vi)=>({en,vi});
/* Original, standalone usage examples keyed by stable A-D positions.
 * The text in the original question is NEVER presented as an example.
 * Deliberately invalid word-order alternatives (Q34) do not receive fake
 * "correct" example sentences.
 */
const EX={
21:[P("The most noticeable characteristic of the town is its old bridge.","Đặc điểm nổi bật nhất của thị trấn là cây cầu cổ."),P("She's optimistic by nature.","Cô ấy lạc quan từ bản tính."),P("His friendly personality puts new students at ease.","Tính cách thân thiện của anh ấy giúp học sinh mới thoải mái."),P("Her reaction to the news surprised us.","Phản ứng của cô ấy trước tin tức khiến chúng tôi bất ngờ.")],
22:[P("It suddenly dawned on me that I had forgotten my passport.","Tôi chợt nhận ra mình đã quên hộ chiếu."),P("The team refused to give in to pressure.","Nhóm từ chối nhượng bộ trước áp lực."),P("I came across an interesting article yesterday.","Hôm qua tôi tình cờ đọc được một bài báo thú vị."),P("The report sets out three possible solutions.","Báo cáo trình bày ba giải pháp khả thi.")],
23:[P("The contract sets out a procedure whereby either party can appeal.","Hợp đồng nêu quy trình mà theo đó mỗi bên đều có thể kháng nghị."),P("She was tired, but she continued working.","Cô ấy mệt nhưng vẫn tiếp tục làm việc."),P("Take a jacket in case it gets cold.","Mang theo áo khoác phòng khi trời lạnh."),P("The journey was long. It was enjoyable, though.","Chuyến đi dài nhưng dù vậy vẫn thú vị.")],
24:[P("Do your homework before dinner.","Hãy làm bài tập trước bữa tối."),P("She made a careful decision.","Cô ấy đã đưa ra một quyết định thận trọng."),P("Our class took the initiative to clean the playground.","Lớp chúng tôi chủ động dọn sân chơi."),P("You can get help from the support team.","Bạn có thể nhận sự trợ giúp từ nhóm hỗ trợ.")],
25:[P("After the warning, he turned over a new leaf.","Sau lời cảnh báo, anh ấy quyết tâm thay đổi theo hướng tốt hơn."),P("She was over the moon when she won the scholarship.","Cô ấy vui sướng vô cùng khi nhận học bổng."),P("His name rings a bell, but I can't remember where we met.","Tên anh ấy nghe quen nhưng tôi không nhớ đã gặp ở đâu."),P("The supervisor had to carry the can for the costly mistake.","Người giám sát phải chịu trách nhiệm cho sai lầm tốn kém.")],
26:[P("I suspect that something went wrong.","Tôi nghi có chuyện không ổn."),P("Don't miss the last train.","Đừng bỏ lỡ chuyến tàu cuối."),P("Please arrive by nine without fail.","Nhất định hãy đến trước chín giờ."),P("He neglected to check the figures.","Anh ấy đã lơ là việc kiểm tra số liệu.")],
27:[P("Please pay attention to the road signs.","Hãy chú ý các biển báo đường bộ."),P("I lost touch with my former classmates.","Tôi mất liên lạc với các bạn học cũ."),P("Could you keep an eye on my bag?","Bạn có thể để mắt tới túi của tôi không?"),P("I caught sight of a deer near the forest.","Tôi thoáng nhìn thấy một con hươu gần khu rừng.")],
28:[P("I remember him asking for directions.","Tôi nhớ anh ấy từng hỏi đường."),P("The teacher asked him to ask a more precise question.","Giáo viên yêu cầu anh ấy đặt câu hỏi chính xác hơn."),P("I remember asking him about the deadline.","Tôi nhớ mình đã hỏi anh ấy về hạn chót."),P("His being asked to leave caused some confusion.","Việc anh ấy bị yêu cầu rời đi đã gây ra chút bối rối.")],
29:[P("Were you to change your mind, we would understand.","Nếu bạn có thay đổi ý định, chúng tôi sẽ thông cảm."),P("Should you require assistance, call reception.","Nếu cần hỗ trợ, hãy gọi lễ tân."),P("All required documents must be submitted by Friday.","Mọi giấy tờ được yêu cầu phải nộp trước thứ Sáu."),P("Had you required more time, we could have extended the deadline.","Nếu khi đó bạn cần thêm thời gian, chúng tôi đã có thể gia hạn.")],
30:[P("The new regulations will come into force in June.","Các quy định mới sẽ có hiệu lực vào tháng Sáu."),P("The policy takes effect immediately.","Chính sách có hiệu lực ngay."),P("Please take notice of the warning signs.","Vui lòng chú ý các biển cảnh báo."),P("We take turns leading the discussion.","Chúng tôi luân phiên điều phối thảo luận.")],
31:[P("Food prices may go up next month.","Giá thực phẩm có thể tăng vào tháng tới."),P("The temperature went down overnight.","Nhiệt độ giảm qua đêm."),P("This tie goes with your suit.","Chiếc cà vạt này hợp với bộ vest của bạn."),P("Don't let a rare opportunity go by.","Đừng để một cơ hội hiếm có trôi qua.")],
32:[P("Journalists reported the president's speech.","Các nhà báo đã tường thuật bài phát biểu của tổng thống."),P("She delivered a moving speech at graduation.","Cô ấy đã có bài phát biểu xúc động tại lễ tốt nghiệp."),P("The software can generate a draft speech.","Phần mềm có thể tạo bản nháp bài phát biểu."),P("The device detects speech in noisy rooms.","Thiết bị nhận diện lời nói trong phòng ồn.")],
33:[P("Virtually everyone in the group agreed.","Hầu như mọi người trong nhóm đều đồng ý."),P("Someone left a notebook on the desk.","Có ai đó để quên vở trên bàn."),P("Anyone can join the workshop.","Bất kỳ ai cũng có thể tham gia buổi học."),P("Virtually no one noticed the change.","Hầu như không ai nhận ra sự thay đổi.")],
34:[null,P("The used phone isn't worth all that much.","Chiếc điện thoại cũ không đáng giá đến thế."),null,null],
35:[P("Cycling to work can kill two birds with one stone: save money and exercise.","Đạp xe đi làm vừa tiết kiệm vừa tập thể dục, một công đôi việc."),P("His unexpected question put the cat among the pigeons.","Câu hỏi bất ngờ của anh ấy đã gây xáo trộn."),P("She decided to take the bull by the horns and confront the issue.","Cô ấy quyết định đối diện và giải quyết vấn đề."),P("He left the corporate rat race to start a farm.","Anh ấy rời cuộc đua công sở để mở trang trại.")],
36:[P("The hikers were exhausted after the climb.","Những người đi bộ đường dài kiệt sức sau cuộc leo núi."),P("The inquiry involved an exhaustive review of the evidence.","Cuộc điều tra bao gồm việc xem xét bằng chứng toàn diện."),P("Coal is an exhaustible resource.","Than đá là tài nguyên có thể cạn kiệt."),P("Preparing the exhibition was exhausting.","Việc chuẩn bị triển lãm rất mệt mỏi.")],
37:[P("We only have a rough estimate of the cost.","Chúng tôi chỉ có ước tính sơ bộ về chi phí."),P("The workers faced harsh winter conditions.","Những người lao động phải đối mặt với mùa đông khắc nghiệt."),P("It was a tough decision to make.","Đó là một quyết định khó khăn."),P("The school has strict safety rules.","Trường có các quy định an toàn nghiêm ngặt.")],
38:[P("The report, which has sparked debate, was published yesterday.","Báo cáo vốn đã gây tranh luận được công bố hôm qua."),P("The decision has sparked widespread concern.","Quyết định đã làm dấy lên mối lo ngại rộng rãi."),P("Recent changes have sparked new discussions.","Những thay đổi gần đây đã khơi mào các cuộc thảo luận."),P("The researchers who have sparked debate will speak tonight.","Những nhà nghiên cứu gây tranh luận sẽ phát biểu tối nay.")],
39:[P("The instructions explicitly prohibit mobile phones.","Hướng dẫn cấm điện thoại di động một cách rõ ràng."),P("Costs rose; accordingly, the price increased.","Chi phí tăng, vì thế giá bán tăng theo."),P("I was utterly surprised by the result.","Tôi vô cùng bất ngờ với kết quả."),P("The two proposals are fundamentally different.","Hai đề xuất khác nhau về cơ bản.")],
40:[P("The forms have been completed.","Các biểu mẫu đã được hoàn thành."),P("The results will be announced tomorrow.","Kết quả sẽ được công bố ngày mai."),P("They requested that every applicant be present.","Họ yêu cầu mọi ứng viên phải có mặt."),P("Being prepared makes interviews easier.","Việc chuẩn bị kỹ giúp phỏng vấn dễ dàng hơn.")],
41:[P("Other students chose the earlier class.","Những học sinh khác chọn lớp sớm hơn."),P("Two seats are occupied; the others are free.","Hai chỗ đã có người ngồi, những chỗ còn lại đều trống."),P("Would you like another cup of tea?","Bạn muốn thêm một tách trà nữa không?"),P("Some people prefer buses; others take the train.","Một số người thích xe buýt, những người khác đi tàu.")],
42:[P("The café is in the middle of the town.","Quán cà phê nằm giữa thị trấn."),P("She stood by the side of the road.","Cô ấy đứng bên đường."),P("A note appears at the bottom of the page.","Có một ghi chú ở cuối trang."),P("We changed the plan for the sake of safety.","Chúng tôi đổi kế hoạch vì sự an toàn.")],
43:[P("At the centre of the policy lies a commitment to fairness.","Trọng tâm chính sách là cam kết về sự công bằng."),P("Several difficult choices lie ahead.","Một số lựa chọn khó khăn đang chờ phía trước."),P("A strong commitment lies at the heart of the plan.","Một cam kết mạnh mẽ nằm ở cốt lõi kế hoạch."),P("Where does a manager's responsibility lie?","Trách nhiệm của người quản lý nằm ở đâu?")],
44:[P("The service lived up to our expectations.","Dịch vụ đáp ứng được kỳ vọng của chúng tôi."),P("The new tenants moved in last weekend.","Những người thuê mới chuyển đến cuối tuần trước."),P("She came up with a clever solution.","Cô ấy nghĩ ra giải pháp thông minh."),P("His clear explanation stood out.","Lời giải thích rõ ràng của anh ấy rất nổi bật.")],
45:[P("The government announced new fiscal measures.","Chính phủ công bố các biện pháp tài khóa mới."),P("The city has a long mercantile history.","Thành phố có lịch sử thương mại lâu đời."),P("He chose the job for pecuniary reasons.","Anh ấy chọn công việc vì lý do tiền bạc."),P("Trustees have fiduciary duties to beneficiaries.","Người được ủy thác có nghĩa vụ quản lý vì lợi ích của người thụ hưởng.")],
46:[P("Please remember to inform the staff of any changes.","Hãy nhớ thông báo cho nhân viên về mọi thay đổi."),P("Informing patients clearly is essential.","Thông tin rõ ràng cho bệnh nhân là điều thiết yếu."),P("We look forward to informing you of the result.","Chúng tôi mong được thông báo kết quả cho bạn."),P("Inform the reception desk before leaving.","Hãy báo cho lễ tân trước khi rời đi.")],
49:[P("Managers need to control project costs.","Người quản lý cần kiểm soát chi phí dự án."),P("Researchers observed changes in productivity.","Các nhà nghiên cứu quan sát sự thay đổi năng suất."),P("Companies must adapt their methods to new conditions.","Các công ty phải điều chỉnh phương pháp theo hoàn cảnh mới."),P("Regular breaks can enhance concentration.","Nghỉ giải lao đều đặn có thể cải thiện sự tập trung.")],
50:[P("The company advertised a new vacancy.","Công ty đăng tuyển một vị trí còn trống."),P("An accountant checked the financial statements.","Một kế toán viên kiểm tra báo cáo tài chính."),P("Contact the HR department about your contract.","Hãy liên hệ phòng nhân sự về hợp đồng."),P("Our bank opened a new branch downtown.","Ngân hàng mở chi nhánh mới ở trung tâm.")]
};

/* Contextual Vietnamese meaning, not a fabricated full-sentence translation. */
const TRANSLATIONS={
21:"vốn là một người rất tình cảm",22:"trình bày các ý hỗ trợ rõ ràng hơn",
23:"dù vậy, hai cơn đau tim vẫn không khiến anh ấy ngừng hút thuốc",
24:"chủ động hành động trong công việc nhóm",
25:"người phải chịu trách nhiệm nếu mọi chuyện xấu đi",
26:"thứ Hai và thứ Tư đều đặn, không bỏ lần nào",
27:"thoáng nhìn thấy cô ấy rồi mất dấu",
28:"nhớ Henry từng hỏi những câu rất ngớ ngẩn",
29:"nếu cần thêm thông tin, vui lòng liên hệ",
30:"chính sách bắt đầu có hiệu lực",
31:"để một cơ hội như vậy trôi qua",
32:"trình bày một bài phát biểu đầy nhiệt huyết",
33:"hầu như không ai",34:"không đáng giá đến thế",
35:"trực tiếp đối mặt với vấn đề và bắt đầu lại",
36:"đã tiến hành một cuộc nghiên cứu toàn diện",
37:"ước tính sơ bộ về tổng chi phí",
38:"mối lo ngại ngày càng lớn làm dấy lên tranh luận gay gắt",
39:"vì vậy, chúng tôi buộc phải tăng giá",
40:"yêu cầu tất cả nhân viên có mặt",
41:"những ngôi nhà còn lại trong nhóm được so sánh",
42:"nền tảng của triết lý thiết kế",
43:"ở trung tâm là cam kết về ý thức sinh thái",
44:"khách hàng đã chuyển vào ở",
45:"khả năng mua những căn nhà này xét về mặt tài chính (cụm gốc ít thông dụng)",
46:"chúng tôi muốn thông báo cho bạn",
47:"xét đến phản hồi gần đây",
48:"miễn là họ bảo đảm trực tuyến",
49:"nâng cao năng suất của nhân viên",
50:"hãy liên hệ phòng nhân sự"
};
const GLOSSES={
21:["đặc điểm","bản tính","tính cách","phản ứng"],
22:["chợt nhận ra","nhượng bộ","tình cờ gặp/phát hiện","trình bày"],
23:["theo đó","nhưng","phòng khi","dù vậy"],
24:["làm","tạo ra","chủ động thực hiện","nhận được"],
25:["thay đổi tốt lên","vui sướng tột độ","nghe quen","chịu trách nhiệm"],
26:["nghi ngờ","bỏ lỡ","nhất định (without fail)","bỏ bê"],
27:["chú ý","mất liên lạc","để mắt","thoáng trông thấy"],
28:["nhớ anh ấy hỏi","để anh ấy hỏi","hỏi anh ấy","việc anh ấy bị hỏi"],
29:["nếu giả sử cần","nếu cần","được yêu cầu","nếu trước đó cần"],
30:["hiệu lực (force)","hiệu lực (effect)","chú ý","lượt"],
31:["tăng","giảm","hợp với","trôi qua"],
32:["thuật lại","phát biểu","tạo ra","phát hiện"],
33:["mọi người","ai đó","bất kỳ ai","không ai"],
34:["sai trật tự","đến thế","sai trật tự","sai trật tự"],
35:["một công đôi việc","gây xáo trộn","đương đầu khó khăn","thoát cạnh tranh"],
36:["kiệt sức","toàn diện","có thể cạn kiệt","gây mệt mỏi"],
37:["sơ bộ","khắc nghiệt","khó khăn","nghiêm ngặt"],
38:["which + has sparked","has sparked: số ít","have sparked: số nhiều","who + have sparked"],
39:["rõ ràng","vì vậy","hoàn toàn","về cơ bản"],
40:["đã được","sẽ được","be nguyên mẫu","việc đang"],
41:["khác + danh từ","các cái còn lại","một cái khác","những cái khác"],
42:["ở giữa","bên cạnh","ở phần dưới","vì lợi ích"],
43:["đảo ngữ vị trí","nằm (số nhiều)","cam kết nằm ở","đảo câu hỏi"],
44:["đáp ứng kỳ vọng","chuyển vào","nghĩ ra","nổi bật"],
45:["thuộc tài khóa","thuộc thương mại","thuộc tiền bạc","thuộc nghĩa vụ tín thác"],
46:["để thông báo","việc thông báo","đến việc thông báo","thông báo"],
47:["bằng phương tiện","bất chấp","xét đến","thay mặt"],
48:["nhận được","bảo đảm (make sure)","lấy/thực hiện","ở lại"],
49:["kiểm soát","quan sát","thích nghi","nâng cao"],
50:["vị trí trống","kế toán viên","bộ phận","chi nhánh"]
};
const WORD_TYPE={56:"Danh từ (noun)",57:"Trạng từ (adverb)",58:"Động từ quá khứ (past simple)",59:"Tính từ (adjective)",60:"Danh từ (noun)",61:"Tính từ (adjective)",62:"Danh từ (noun)",63:"Tính từ (adjective)",64:"Danh từ (noun)",65:"Danh từ số nhiều (plural noun)"};
const FOCUS={
81:"Câu main idea: tìm chủ đề bao quát các đoạn, không chọn một chi tiết hoặc ví dụ riêng lẻ.",
82:"Câu hỏi nghĩa từ trong ngữ cảnh: xác định nghĩa của excluded từ câu chứa từ.",
83:"Từ khóa EXCEPT: tìm phương án KHÔNG được bài đọc nêu như một trở ngại.",
84:"Câu hỏi quy chiếu: xác định that thay thế kỳ vọng nào trong câu trước.",
85:"Câu suy luận: đối chiếu kỳ vọng thăng tiến với thực tế được người phát biểu mô tả.",
86:"Câu hỏi diễn giải: tìm việc phần mềm đầu tiên được dùng để thực hiện.",
87:"Câu suy luận từ chi tiết: xác định chiếc hộp giày minh họa điều gì về nguồn lực lúc khởi đầu.",
88:"Câu hỏi nghĩa từ: xác định hurdles trong văn cảnh doanh nghiệp.",
89:"Câu suy luận: nối khó khăn huy động vốn với quy mô doanh nghiệp.",
90:"Câu hỏi thái độ tác giả: xác định sắc thái từ dự báo ở kết bài."
};
function para(text){return text?'<p>'+h(text)+'</p>':""}
function field(label,value){return value?'<p><strong>'+h(label)+':</strong> '+h(value)+'</p>':""}
function section(n,title,body){return '<section class="semantic-step ev1-step"><div class="semantic-step-label"><span>'+n+'</span><div><b>'+h(title)+'</b></div></div><div class="semantic-prose">'+(body||'<p class="ev1-muted">Nội dung cần đối chiếu nguồn.</p>')+'</div></section>'}
function locate(passage,needle){
 const text=String(passage||""),source=text.replace(/\s+/g," ").trim(),key=String(needle||"").replace(/\s+/g," ").trim();
 if(!key)return null;
 const ix=source.toLowerCase().indexOf(key.toLowerCase());
 if(ix<0)return null;
 const prefix=source.slice(0,ix),suffix=source.slice(ix);
 const start=Math.max(0,prefix.lastIndexOf(". ")+2,prefix.lastIndexOf("? ")+2,prefix.lastIndexOf("! ")+2);
 const candidates=[suffix.indexOf(". "),suffix.indexOf("? "),suffix.indexOf("! ")].filter(n=>n>=0);
 const end=candidates.length?ix+Math.min(...candidates)+1:Math.min(source.length,ix+key.length+170);
 const sentence=source.slice(start,Math.min(end,start+470)).trim();
 const lines=text.split(/\n+/).map(s=>s.trim()).filter(Boolean);
 const paragraphIndex=lines.findIndex(line=>line.toLowerCase().replace(/\s+/g," ").includes(key.toLowerCase()));
 return {sentence,locator:paragraphIndex>=0?"Đoạn nguồn "+(paragraphIndex+1):"Trong bài đọc"};
}
function evidence(spec,passage,anchor,n){
 const items=Array.isArray(spec?.evidence)?spec.evidence:[];
 if(n===83)return field("Locate","Đoạn 1 · câu nêu ba trở ngại")+
   para("“Discrimination against women in business, the demands of caring for families, and lack of business training had kept the number of women entrepreneurs small.”");
 if(n===80)return field("Locate","Đoạn liệt kê cách luyện tập của hyperglots")+
   para("“Some simply imagine conversations in their heads.”");
 const located=locate(passage,anchor);
 if(located)return field("Locate",located.locator)+field("Câu chứa dẫn chứng",located.sentence);
 return items.map(item=>field("Locate",item.locator)+field("Dẫn chứng",item.quote)+field("Giải thích",item.note)).join("")||
  '<p class="ev1-muted">Chưa xác định được câu chứa đáp án trong nguồn trích xuất.</p>';
}
function optionAnalysis(spec,n){
 const list=(spec?.options||[]).map((x,i)=>{
  let analysis=String(x.analysis||"").trim();
  if(n===83&&i===0)analysis='Có liên hệ đến “demands of caring for families”, nhưng “required to stay at home” (bắt buộc ở nhà) mạnh hơn thông tin về gánh nặng chăm sóc gia đình.';
  if(n===83&&i===1)analysis='Đúng với yêu cầu EXCEPT: thiếu đào tạo (lack of training) không đồng nghĩa với thiếu năng lực (lack of ability). Bài không khẳng định phụ nữ thiếu năng lực kinh doanh.';
  return '<div class="ev1-choice semantic-option'+(x.correct?' correct-analysis':'')+'"><div class="semantic-option-head"><span>'+"ABCD"[i]+'</span><b>'+h(x.word||"")+'</b>'+((x.meaning||GLOSSES[n]?.[i])?'<em>'+h(x.meaning||GLOSSES[n][i])+'</em>':"")+'</div>'+para(analysis||"Cần đối chiếu lý do cho phương án này.")+'</div>';
 });
 return list.length?'<div class="semantic-options-grid">'+list.join("")+'</div>':'<p class="ev1-muted">Chưa trích xuất được đầy đủ phương án A–D.</p>';
}
function examples(n,q,spec){
 const list=EX[n]||((spec?.examples||[]).length===4?spec.examples.map(x=>({en:x.en,vi:x.vi})):null);
 if(!list)return '<p class="ev1-muted">Chưa có đủ bốn ví dụ A–D được biên tập và đối chiếu.</p>';
 const rows=list.map((item,i)=>{
  const label="ABCD"[i]+(q?.options?.[i]?' · '+q.options[i]:'');
  if(!item)return '<p><strong>'+h(label)+':</strong> Cụm này sai trật tự từ trong tiếng Anh; không thể tạo ví dụ đúng với nguyên cụm.</p>';
  return '<div class="ev1-example semantic-example"><div class="semantic-example-title"><span>'+"ABCD"[i]+'</span><b>'+h(q?.options?.[i]||"Ví dụ vận dụng")+'</b></div><p class="example-en">'+h(item.en)+'</p><p class="example-vi">→ '+h(item.vi)+'</p></div>';
 }).join("");
 return '<div class="semantic-examples-grid">'+rows+'</div>';
}
function errorLine(n,source,wrong){
 if(n===51)return "1 (đã đối chiếu)";
 const model=global.HSGErrorLines?.parse?.(source);
 if(model?.hasOriginalLines){
  const word=String(wrong||"").trim().toLowerCase();
  const line=model.lines.find(row=>row.text.toLowerCase().includes(word));
  if(line)return String(line.number)+" (theo số dòng đề gốc)";
 }
 return "Chưa xác định chắc chắn từ nguồn trích xuất; không suy số dòng từ vị trí câu.";
}
function render(groupId,n,q,passage,spec){
 const raw=global.HSGHaiPhongExpandedV11?.entries?.find(x=>x.g===groupId&&x.n===Number(n));
 if(!spec)return "";
 const answer=spec.answer||raw?.answer||"Đang đối chiếu";
 const why=spec.quickReason||raw?.why||"";
 const rule=raw?.rule||spec.remember||"";
 const application=raw?.use||spec.application||"";
 const anchor=raw?.anchor||spec.evidence?.[0]?.quote||"";
 const parts=[];
 if(["g1","g2a","g2b"].includes(groupId)){
  parts.push(section(1,"Giải thích collocation / idiom / phrase / grammar",
   field("Dấu hiệu trong câu",anchor)+para(why)+field("Cấu trúc và cách dùng",rule)+optionAnalysis(spec,n)));
  parts.push(section(2,"Dịch / nghĩa tiếng Việt",para(TRANSLATIONS[n]||why)));
  parts.push(section(3,"Bốn ví dụ thực tế B1–C1 cho A–D",
   examples(n,q,spec)+field("Ghi nhớ",rule)));
 }else if(groupId==="e"){
  const match=String(answer).match(/(?:Dòng\s*\d+\s*:\s*)?(.+?)\s*→\s*(.+)$/);
  const wrong=match?.[1]?.trim()||"",fix=match?.[2]?.trim()||"";
  parts.push(section(1,"Dòng · Lỗi · Sửa",
   field("Dòng",errorLine(n,passage,wrong))+
   field("Lỗi",wrong)+field("Sửa",fix)));
  parts.push(section(2,"Giải thích",
   field("Quy tắc",rule)+field("Vì sao sai",why)+field("Áp dụng vào câu khác",application)));
 }else if(groupId==="wf"||groupId==="wp"){
  const transformation=n===61?"promote (động từ) → promotion (danh từ) → promotional (tính từ)":rule;
  parts.push(section(1,"Giải thích Word Formation",
   field("Từ loại cần điền",WORD_TYPE[n]||"Cần kiểm tra vị trí ô trống")+
   field("Biến đổi",transformation)+field("Nghĩa và căn cứ",why)+
   (n===61?field("Lưu ý","Không dùng promote (động từ) trước campaigns; promotional là tính từ bổ nghĩa danh từ."): "")+
   field("Áp dụng",application)));
 }else if(groupId==="oc"){
  parts.push(section(1,"Căn cứ",field("Dấu hiệu trong bài",anchor)+field("Cấu trúc / collocation",rule)));
  parts.push(section(2,"Giải thích",para(why)));
  if([67,68,69,71,72,73,74,75].includes(Number(n))){
   parts.push(section(3,"Loại trừ",
    field("Điểm dễ nhầm",({
      67:"Không dùng by now nếu ý chính là trạng thái kéo dài đến hiện tại; cho đến nay = until now.",
      68:"Sau was first cần phân từ II given để tạo bị động; give (nguyên mẫu) không đủ cấu trúc.",
      69:"Khoảng hai mốc đi với between ... and ..., không dùng between ... to ...",
      71:"Cần mệnh đề danh ngữ làm chủ ngữ; how/which không thay thế cùng chức năng ở đây.",
      72:"Mệnh đề quan hệ không xác định sau dấu phẩy dùng which cho sự vật/khả năng vừa nhắc.",
      73:"Ngày hoặc thứ mà một sự kiện rơi vào đi với giới từ on, không phải in.",
      74:"Hardly + a moment diễn tả gần như không chần chừ; hard là tính từ/trạng từ nghĩa khác.",
      75:"How hỏi phương thức; what hỏi sự vật, không phù hợp câu hỏi về cách thực hiện."
    })[n])));
  }
  parts.push(section(parts.length+1,"Ghi nhớ",field("Cấu trúc có thể tái sử dụng",rule)+field("Ví dụ",application)));
 }else if(groupId==="rc"){
  parts.push(section(1,"Dẫn chứng (Context Clue)",evidence(spec,passage,anchor,n)+field("Dấu hiệu",why)));
  parts.push(section(2,"Logic liên kết (Coherence)",
    n===80?para("They → hyperglots; also → bổ sung cách học khác; other techniques → tiếp nối chuỗi phương pháp luyện ngôn ngữ. Phương án C bổ sung kỹ thuật học từ trong ngữ cảnh.")
      :field("Mối liên hệ giữa các ý",rule)+para(why)));
  parts.push(section(3,"Loại trừ (Elimination)",optionAnalysis(spec,n)));
 }else if(groupId==="r"){
  parts.push(section(1,"Xác định yêu cầu (Question Focus)",para(FOCUS[n]||"Đọc kỹ loại thông tin cần tìm.")));
  parts.push(section(2,"Dẫn chứng (Evidence)",evidence(spec,passage,anchor,n)+field("Cơ chế suy luận",why)));
  parts.push(section(3,"Đối chiếu đáp án (Option Analysis)",optionAnalysis(spec,n)));
  parts.push(section(4,"Bẫy cần tránh (Key Takeaway)",
    n===83?para("Không đánh đồng thiếu cơ hội được đào tạo với thiếu năng lực. Với EXCEPT, kiểm tra cả việc một phương án có nói mạnh hơn chứng cứ gốc hay không.")
      :field("Điểm cần phân biệt",rule)));
 }else if(groupId==="w"){
  // The user did not specify a replacement format for sentence transformations.
  // Keep the existing explanation structure for this part.
  return null;
 }else return null;
 const warn='<p class="ev1-review-label">Lời giải tham khảo đang chờ đối chiếu đáp án và nguồn gốc; không dùng để chấm điểm.</p>';
 return '<div class="ev1 feedback semantic-feedback hsg-hp-format" data-hsg-hp-format="'+h(groupId)+'" data-explanation-v1="1" data-review-status="needs_review">'+
   '<div class="feedback-title ev1-answer">Đáp án: '+h(answer)+'</div>'+warn+
   '<div class="ev1-full">'+parts.join("")+'</div></div>';
}
global.HSGHaiPhongFormat=Object.freeze({render,version:"2026-10-28",exampleCoverage:Object.freeze(Object.keys(EX).map(Number))});
})(window);
