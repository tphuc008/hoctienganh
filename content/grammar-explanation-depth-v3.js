/* Grammar 5 · 19 · 21 · 22 — reviewed explanatory depth, version 3.
 * Supplemental pedagogy only: never changes stems, choices, keys or storage.
 * Core instruction follows cause/evidence -> rule -> result; exceptions stay scoped.
 */
(function(g){
"use strict";
const lessons={
5:{
 heads:"Đầu tiên khoanh cụm danh từ làm chủ ngữ, sau đó xác định nó là số ít hay số nhiều. Trong hiện tại đơn, chủ ngữ ngôi ba số ít thường có -s/-es ở động từ thường; với be/have phải dùng is/has. Danh từ không đếm được như information không đi với are.",
 modifiers:"Trong the list of names, từ quyết định số của động từ là list; of names chỉ cho biết danh sách gồm những gì. Ngược lại, the names on the list có trung tâm là names nên dùng động từ số nhiều. Hãy thử bỏ cụm of/on/in để nhận ra chủ ngữ thực.",
 indefinite:"Each và every phân phối ý nghĩa đến từng cá thể nên danh từ đi theo thường số ít; everyone, nobody, someone cũng được xem là chủ ngữ số ít. Với either/neither of + danh từ số nhiều, văn viết trang trọng ưu tiên số ít, dù cách dùng số nhiều vẫn xuất hiện trong giao tiếp.",
 coordination:"Hai đối tượng riêng biệt nối bằng and thường tạo chủ ngữ số nhiều. Với either…or, neither…nor và not only…but also, dạng động từ thường theo thành phần gần nhất; nếu hai thành phần khác số, cách viết lại câu đôi khi rõ hơn.",
 amounts:"Three hours có hình thức số nhiều nhưng có thể biểu thị một khoảng thời gian thống nhất; khi nói đó là 'một khoảng lâu', động từ thường số ít. Tương tự, mathematics/physics là tên môn học và news là danh từ không đếm được: chữ -s không tự động khiến động từ số nhiều.",
 collectives:"Phải phân biệt a team với team members. Team có thể được hiểu như một đơn vị; trong một số cách dùng Anh-Anh có thể dùng động từ số nhiều khi nói về từng thành viên. Nhưng members là danh từ số nhiều rõ ràng, còn every member là số ít.",
 fractions:"A number of students nghĩa là 'một số học sinh' nên thường dùng are; the number of students nghĩa là 'số lượng học sinh', trung tâm là number nên dùng is. Với half/most/percent of, cần xem danh từ sau of là số nhiều hay không đếm được để chọn động từ.",
 existential:"There ở đầu câu tồn tại không phải chủ ngữ mang số. Đọc tiếp danh ngữ theo sau để chọn there is hay there are. Scissors và trousers có dạng số nhiều, nhưng a pair of scissors có từ trung tâm pair số ít."
},
19:{
 zero:"Câu loại 0 nói về quy luật hoặc mối quan hệ luôn/thường đúng, nên cả điều kiện lẫn kết quả thường dùng hiện tại đơn. Không phải mọi câu có if đều đang đoán tương lai. Hãy nhìn ngữ cảnh 'whenever/when/if' để phân biệt quy luật với một dự đoán.",
 first:"Điều kiện tương lai có thể xảy ra thường chia hiện tại đơn ở mệnh đề if, còn kết quả có thể dùng will, can, may hoặc câu mệnh lệnh. Đừng dùng will để đánh dấu tương lai ở cả hai vế một cách máy móc; will trong if có những cách dùng khác như ý sẵn lòng.",
 second:"Hình thức quá khứ trong if không nhất thiết kể chuyện quá khứ mà biểu thị khoảng cách với sự thật hiện tại. Vì thế If I owned …, I would … diễn đạt một giả định, không chứng minh người nói từng sở hữu. Were thường được ưu tiên trong lối viết giả định trang trọng.",
 third:"Đầu tiên xác định sự kiện đã không xảy ra trong quá khứ. Mệnh đề if dùng had + V3, còn kết quả tưởng tượng dùng would/could/might have + V3; đó là hai vai trò khác nhau. Dùng would + V không có have sẽ chuyển kết quả sang một mốc thời gian khác.",
 mixed:"Phải phân tích hai mốc thời gian riêng. Nếu nguyên nhân thuộc quá khứ nhưng hệ quả vẫn liên quan hiện tại, dùng if + had + V3 với would + V trong kết quả; nếu điều kiện hiện tại giả định ảnh hưởng một việc đã qua, kết quả dùng would have + V3.",
 unless:"Unless thường có nghĩa 'trừ khi', đặt ra một ngoại lệ làm thay đổi kết quả. Khi đổi từ if … not sang unless, phải kiểm tra lại cực tính: nếu điều kiện xảy ra thì kết quả có còn đúng như câu gốc không? Một câu dùng if có thể đúng ngữ pháp nhưng bị đảo nghĩa.",
 provided:"Provided that/as long as nêu điều kiện được đáp ứng, trong khi only if nhấn mạnh tính cần thiết của điều kiện. Vì thế không thể thay tùy ý bằng because (nguyên nhân), although (nhượng bộ) hoặc even if (dù điều kiện có xảy ra hay không).",
 inversion:"Đảo điều kiện không phải đảo bất kỳ động từ nào lên đầu. Khi lược if, dùng Had + S + V3 cho giả định quá khứ, Were + S + to V/bổ ngữ cho giả định, hoặc Should + S + V cho tình huống dự phòng. Với phủ định, not đứng sau chủ ngữ."
},
21:{
 mechanics:"Đưa trạng ngữ mang nghĩa phủ định như Never/Rarely lên đầu làm thay đổi vị trí trợ động từ, nhưng không tự thay đổi thời của câu. Với thì đơn và động từ thường, thêm do/does/did rồi chuyển động từ chính về nguyên mẫu; với hiện tại hoàn thành, đảo have/has.",
 negative:"Kiểm tra phạm vi tác động của cụm phủ định: nếu cụm phủ định mở đầu cả mệnh đề thì thường đảo trợ động từ. Nhưng nếu not only nối hai chủ ngữ, động từ vẫn theo quy tắc hòa hợp của cụm chủ ngữ, không nhất thiết đảo.",
 only:"Tách phần Only when/after/if hoặc Not until khỏi mệnh đề chính. Chỉ mệnh đề chính bị đảo; mệnh đề thời gian/điều kiện giữ trật tự thông thường. Riêng cấu trúc chẻ It was not until … that … không đảo sau that.",
 time:"Hai sự kiện nối tiếp nhau rất nhanh được diễn tả bằng Hardly/Scarcely…when hoặc No sooner…than. Nếu sự kiện đầu dùng quá khứ hoàn thành, đảo had trước chủ ngữ, giữ V3; cần kiểm tra đúng cặp liên từ, không chọn theo một từ đơn lẻ.",
 conditional:"Bỏ if phải giữ nguyên mốc và tính giả định. Had + S + V3 thay cho if + S + had + V3; Were… diễn tả giả định; Should… diễn tả điều kiện dự phòng. Dùng Did hoặc đặt not sai vị trí sẽ làm hỏng cấu trúc.",
 "so-such":"So đi với tính từ/trạng từ được nhấn mạnh; Such đi với danh từ/cụm danh từ. Sau khi đưa cụm nhấn mạnh lên đầu, đảo be hoặc trợ động từ ở mệnh đề chính. Phân biệt so…that chỉ mức độ/hệ quả với so that chỉ mục đích.",
 full:"Đảo hoàn toàn đưa động từ chính lên trước chủ ngữ danh từ sau trạng ngữ nơi chốn, như Beside the river stood a cottage. Nếu chủ ngữ là đại từ, cách nói thông dụng thường không đảo: Here it comes, không phải Here comes it.",
 agreement:"Muốn nói 'tôi cũng vậy', lấy đúng trợ động từ/be/modal tương ứng với câu trước rồi đặt trước chủ ngữ mới: So do I, Neither have we. Câu trước phủ định dùng Neither/Nor mà không thêm not. So I do lại xác nhận lời vừa nói, khác So do I."
},
22:{
 persons:"Không chỉ dựa vào việc tiền ngữ là người: kiểm tra vai trò ngay trong mệnh đề quan hệ. Who có thể làm chủ ngữ; whom thường là tân ngữ, đặc biệt sau giới từ; whose phải đi với danh từ để chỉ quan hệ sở hữu, chẳng hạn whose daughter.",
 things:"Which hoặc that có thể chỉ vật trong mệnh đề quan hệ xác định, tùy cách dùng. Nhưng nếu là mệnh đề bổ sung có dấu phẩy, phải dùng which chứ không dùng that; what không dùng khi trước đó đã có tiền ngữ.",
 object:"Nhìn sau đại từ: trong The book which I read, I đã là chủ ngữ, còn which làm tân ngữ của read nên có thể lược. Trong The book which changed my mind, which là chủ ngữ của changed nên không thể bỏ.",
 commas:"Thông tin dùng để xác định chính xác đối tượng thường không cần dấu phẩy; thông tin chỉ bổ sung được tách bằng dấu phẩy. Mệnh đề không xác định không dùng that và không lược đại từ quan hệ, vì dấu phẩy là một phần tạo nghĩa của câu.",
 adverbs:"Where thường tương đương at/in which, when tương đương on/in which, why tương đương for which tùy ngữ cảnh. Điều quan trọng là mệnh đề phụ đang thiếu một trạng ngữ, không phải thiếu chủ ngữ hoặc tân ngữ; có danh từ chỉ địa điểm thôi chưa đủ để chọn where.",
 prepositions:"Khi giới từ được đặt ngay trước đại từ quan hệ trong văn viết trang trọng, dùng whom cho người và which cho vật/tổ chức. Không dùng that ngay sau giới từ; trong lối nói thường, có thể để giới từ ở cuối mệnh đề và dùng who/which/that theo cấu trúc phù hợp.",
 quantifiers:"Trong cấu trúc two/some/all of whom/which, lượng từ chỉ một phần của nhóm đã nhắc đến. Of whom dùng với người; of which với vật. Mệnh đề này thường bổ sung thông tin nên cần dấu phẩy và không dùng that sau of.",
 reduction:"V-ing có thể rút mệnh đề quan hệ mang nghĩa chủ động, còn V3 dùng cho quan hệ bị động. Không rút tự động nếu mất mốc thời gian hoặc đổi nghĩa; which sau dấu phẩy cũng có thể chỉ cả sự việc trước, không phải một danh từ đơn lẻ."
}};
const focused21={
 mechanics:(q)=>/Never/.test(q.stem)?"Dấu hiệu quyết định là Never được đưa lên đầu; kiểm tra thì gốc và trợ động từ đã có.":/Rarely|Seldom|hardly ever/i.test(q.stem)?"Trạng ngữ tần suất phủ định đứng đầu; xác định chủ ngữ và thì của động từ thường để chọn trợ động từ.":"Tìm trạng ngữ phủ định đầu câu và xác định thì gốc trước khi đảo.",
 negative:(q)=>/not only/i.test(q.stem)?"Xét Not only đang mở đầu mệnh đề hay nối hai thành phần chủ ngữ; hai trường hợp có trật tự khác nhau.":/little/i.test(q.stem)?"Little đầu câu mang nghĩa 'nào ngờ/hầu như không'; xem mốc thời gian của hành động nhận thức.":"Cụm phủ định/giới hạn đứng đầu; kiểm tra sắc thái cấm đoán hay sự việc quá khứ để chọn modal/trợ động từ.",
 only:(q)=>/It was not until/i.test(q.stem)?"Câu chẻ It was not until … that … không đảo động từ trong mệnh đề sau that.":/Only Jenny|only the head teacher|Only the students|not only the students/i.test(q.stem)?"Only bổ nghĩa trực tiếp cho chủ ngữ; không áp dụng quy tắc đảo mệnh đề chính.":/Not until|Only when|Only after|Only with|Only by|Only if|Only later/i.test(q.stem)?"Tách cụm Only/Not until ở đầu khỏi mệnh đề chính; xác định chính xác phần cần đảo.":"Kiểm tra phạm vi của Only: nó bổ nghĩa cho trạng ngữ hay trực tiếp cho chủ ngữ.",
 time:(q)=>/No sooner/i.test(q.stem)?"No sooner đòi kết nối than trong mẫu hai sự kiện nối tiếp; xem động từ ở sự kiện đầu là had + V3 hay be.":/Hardly|Scarcely|Barely/i.test(q.stem)?"Hardly/Scarcely/Barely thường đi với when; phân biệt sự kiện xảy ra trước và sự kiện đến ngay sau.":"Bài kiểm tra cặp liên từ và trật tự đảo thời gian; so sánh No sooner…than với Hardly…when.",
 conditional:(q)=>/\bHad\b|would have|might have|If .+ had/i.test(q.stem)?"Kết quả would/might have + V3 báo giả định quá khứ: cần Had + S + V3 khi bỏ if.":/\bWere\b|to deteriorate|were not for/i.test(q.stem)?"Mẫu Were + S + to V/bổ ngữ là giả định hiện tại hoặc tương lai; không dùng Had thay thế.":"Điều kiện dự phòng thường dùng Should + chủ ngữ + động từ nguyên mẫu.",
 "so-such":(q)=>/so that|purpose/i.test(q.stem)?"Phân biệt so that + mệnh đề chỉ mục đích với so + tính từ/trạng từ + that chỉ mức độ dẫn tới kết quả.":/Such|noun phrase|patience|determination|confusion|impact/i.test(q.stem)?"Phần nhấn mạnh là danh từ/cụm danh từ; xét mẫu Such + be + N + that.":"Phần nhấn mạnh là tính từ/trạng từ; dùng So + tính từ/trạng từ rồi đảo be hoặc trợ động từ.",
 full:(q)=>/pronoun|Here (it|she)|comes it|are it|Down the hill/i.test(q.stem)?"Chủ ngữ là đại từ (it/she): giữ đại từ trước động từ, không đảo hoàn toàn.":/Only Jenny|only the head teacher/i.test(q.stem)?"Only đang bổ nghĩa cho chủ ngữ, vì vậy trật tự S–V thường được giữ.":"Cụm chỉ nơi chốn đứng đầu; phân biệt đảo động từ chính trước danh từ với đảo trợ động từ.",
 agreement:(q)=>/So I do|confirms|about yourself/i.test(q.stem)?"So I do xác nhận điều đã nói về chính người đáp; khác So do I mang nghĩa 'tôi cũng vậy'.":/Neither|Nor|haven't|wasn't|can't|don't|isn't/i.test(q.stem)?"Câu gốc phủ định: dùng Neither/Nor + trợ động từ đúng thì/modal + chủ ngữ mới, không thêm not.":"Câu gốc khẳng định: dùng So + trợ động từ/be/modal đúng thì + chủ ngữ mới."
};
const mechanisms={
 5:{
  heads:q=>"Danh từ trung tâm trong chủ ngữ quyết định số của động từ, không phải danh từ xuất hiện gần chỗ trống. "+q.why,
  modifiers:q=>"Hãy bỏ tạm cụm bổ nghĩa (of/in/on + danh từ) để nhận ra danh từ trung tâm. "+q.why,
  indefinite:q=>"Each/every/đại từ bất định thường chi phối số ít trong cách dùng này; đừng chọn động từ theo danh từ số nhiều nằm sau of. "+q.why,
  coordination:q=>"Nhìn xem các thành phần nối bằng and hay cấu trúc or/nor; với or/nor, xét thành phần gần động từ nhất. "+q.why,
  amounts:q=>"Ở đây lượng đo/tên môn học được hiểu như một đơn vị hoặc một danh từ không đếm được; chữ -s không quyết định số. "+q.why,
  collectives:q=>"Phân biệt group/team như một đơn vị với members là danh từ số nhiều thật sự. "+q.why,
  fractions:q=>"Phân biệt a number of với the number of; với phần trăm/phân số, xét danh từ đứng sau of. "+q.why,
  existential:q=>"Trong there is/are, there không quyết định số; xem danh ngữ theo sau. Với a pair of, pair là trung tâm. "+q.why
 },
 19:{
  zero:q=>"Câu đang mô tả một mối quan hệ có tính quy luật, không phải kết quả tưởng tượng. "+q.why,
  first:q=>"Mệnh đề if nêu khả năng ở tương lai; một động từ hiện tại đơn ở if có thể chỉ sự việc tương lai. "+q.why,
  second:q=>"Hình thức quá khứ trong mệnh đề if biểu thị giả định không thật/khó xảy ra hiện tại, không phải kể sự việc đã qua. "+q.why,
  third:q=>"Điều kiện quá khứ trái thực tế dùng had + V3; kết quả tưởng tượng đã không xảy ra dùng modal + have + V3. "+q.why,
  mixed:q=>"Xác định riêng mốc thời gian của điều kiện và kết quả (now/today so với yesterday/last month). "+q.why,
  unless:q=>"Thay lựa chọn vào câu rồi dịch cả mệnh đề: 'trừ khi' không đồng nghĩa với 'nếu' khẳng định. "+q.why,
  provided:q=>"Cần phân biệt điều kiện tiên quyết với nguyên nhân, nhượng bộ hoặc ước muốn. "+q.why,
  inversion:q=>"Đối chiếu mẫu sau chỗ trống: Had + S + V3, Were + S + to V/bổ ngữ, hoặc Should + S + V. "+q.why
 },
 22:{
  persons:q=>"Xem đại từ làm chủ ngữ, tân ngữ hay chỉ sở hữu trong mệnh đề phụ; không chỉ nhìn tiền ngữ là người. "+q.why,
  things:q=>"Đại từ chỉ vật phải đúng chức năng trong mệnh đề; dấu phẩy cũng có thể loại trừ that. "+q.why,
  object:q=>"Mệnh đề quan hệ đã có chủ ngữ riêng; đại từ được chọn đóng vai trò tân ngữ và có thể lược trong mệnh đề xác định. "+q.why,
  commas:q=>"Hai dấu phẩy báo thông tin bổ sung; không dùng that hoặc bỏ đại từ trong mệnh đề này. "+q.why,
  adverbs:q=>"Mệnh đề thiếu trạng ngữ nơi/thời gian/lý do, chứ không thiếu một chủ ngữ hoặc tân ngữ. "+q.why,
  prepositions:q=>"Giới từ đứng ngay trước đại từ quan hệ: whom cho người, which cho vật; tránh that đứng trực tiếp sau giới từ. "+q.why,
  quantifiers:q=>"Of whom chỉ một phần nhóm người; of which chỉ một phần nhóm vật; đó là thông tin bổ sung. "+q.why,
  reduction:q=>"Phải xét quan hệ chủ động (V-ing), bị động (V3), hoặc which thay cả mệnh đề; các dạng này không hoán đổi được. "+q.why
 }
};
function allQs(d){
 return [...d.sections.flatMap(s=>s.checks),...(d.practice||[]),...(d.mastery||[]),...(d.repairs||[]),...(d.review||[]),...Object.values(d.reviewSets||{}).flat()];
}
function install(num,d){
 if(!d?.sections||d.sections.length!==8)throw Error("Grammar depth v3 expected 8 lessons for "+num);
 const guide=lessons[num];
 for(const sec of d.sections){
  if(!guide[sec.id])throw Error("No Vietnamese teaching reasoning for "+num+" / "+sec.id);
  sec.learnV1=sec.learnV1||{};
  sec.learnV1.reason=guide[sec.id];
 }
 const qs=allQs(d);
 const seen=new Set();
 for(const q of qs){
  if(!q||seen.has(q.id))continue;
  seen.add(q.id);
  q.explain=q.explain||{};
  const old=q.explain.rule||q.why||"";
  if(!old)throw Error("Missing grammar rationale: "+q.id);
  // Preserve the correct, item-specific rationale; add the mechanism as a second explanatory step.
  if(num===21){
   const clue=q.explain.clue||"";
   if(!clue||/^(Chú ý từ\/cụm đầu câu|Đọc toàn bộ câu, xác định mệnh đề)/.test(clue)){
     q.explain.clue=focused21[q.skill]?.(q)||"Xác định đúng mệnh đề và thành phần quyết định trật tự từ trong câu.";
   }
   q.explain.reasoning=mechanism21(q);
  }else{
   const make=mechanisms[num][q.skill];
   if(!make)throw Error("Unknown skill "+q.skill+" in "+q.id);
   let reason=make(q);
   if(q.why&&reason.endsWith(q.why))reason=reason.slice(0,-q.why.length).trim();
   q.explain.reasoning=reason;
  }
  // Correct a misleading diagnosis in the existing bank without changing the option.
  if(num===5&&/Our teachers ___ concepts patiently/.test(q.stem)){
   const index=q.options.indexOf("is explaining");
   if(index>=0)q.explain.wrong[index]="“is explaining” là cấu trúc tiếp diễn đầy đủ (is + V-ing), không phải thiếu trợ động từ. Nó sai ở sự hòa hợp: teachers số nhiều không đi với is; hơn nữa câu này diễn tả hoạt động thường lệ nên cần explain.";
  }
 }
 return seen.size;
}
function mechanism21(q){
 const s=q.skill,stem=q.stem;
 if(s==="mechanics")return "Xác định thì và trợ động từ có sẵn trước khi đảo: thì đơn dùng do/does/did + động từ nguyên mẫu, còn thì hoàn thành đảo have/has/had.";
 if(s==="negative")return /not only/i.test(stem)?"Phải xem Not only đang mở đầu mệnh đề hay chỉ nối hai thành phần chủ ngữ; chỉ trường hợp mở đầu mệnh đề mới kích hoạt đảo.":"Cụm phủ định đầu mệnh đề cần đảo trợ động từ; khi chọn modal hãy giữ sắc thái cấm đoán/khả năng của ngữ cảnh.";
 if(s==="only")return /It was not until/i.test(stem)?"Đây là câu chẻ: sau that dùng trật tự chủ ngữ–động từ thông thường, không áp dụng đảo như mẫu mở đầu trực tiếp bằng Not until.":"Tách trạng ngữ Only/Not until khỏi mệnh đề chính; nếu nó chỉ bổ nghĩa cho chủ ngữ thì giữ trật tự thường.";
 if(s==="time")return /No sooner/i.test(stem)?"Liên hệ hai sự kiện sát nhau bằng No sooner…than; kiểm tra had + V3 ở vế đầu hoặc biến thể có be.":"Liên hệ hai sự kiện sát nhau bằng Hardly/Scarcely…when; nếu vế đầu ở quá khứ hoàn thành thì đảo had trước chủ ngữ.";
 if(s==="conditional")return "Giữ đúng mốc thời gian giả định: Had thay if + had + V3; Were và Should chỉ các dạng điều kiện khác, không tùy ý thay nhau.";
 if(s==="so-such")return /so that|purpose/i.test(stem)?"So that + mệnh đề có thể diễn đạt mục đích; phân biệt với so + tính từ/trạng từ + that chỉ kết quả của mức độ.":"Nhìn loại từ ngay sau So/Such: tính từ/trạng từ cần So; danh ngữ thường cần Such, rồi mới xét trật tự đảo.";
 if(s==="full")return "Đảo hoàn toàn áp dụng với chủ ngữ danh từ sau cụm nơi chốn; với đại từ it/she thường giữ trật tự đại từ trước động từ.";
 if(s==="agreement")return /confirms|So I do/i.test(stem)?"So I do xác nhận lời nói về chính người đáp, còn So do I nêu sự đồng tình 'tôi cũng vậy'.":"Giữ đúng trợ động từ/modal và tính khẳng định–phủ định của câu trước; Neither/Nor không đi kèm not lần nữa.";
 return "Xác định cấu trúc và đối chiếu trợ động từ, ngữ cảnh cũng như vai trò của từng thành phần.";
}
const result={};
for(const n of [5,19,21,22]){
 const d=n===21?g.GrammarTopic21Data:g["GrammarTopic"+n+"Data"];
 if(!d)continue; // Distinct route loaders initialize different data subsets.
 result[n]=install(n,d);
}
if(!Object.keys(result).length)throw Error("Grammar depth v3 loaded before topic data");
g.GrammarExplanationDepthV3=result;
})(window);