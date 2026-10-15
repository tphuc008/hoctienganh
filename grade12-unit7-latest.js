(()=>{
"use strict";
// Unit 7 · Bài mới nhất. Source: review comments and replies in the supplied Google Doc.
// Keep the existing ten Semantic Precision sets untouched.
const bank=window.G12_U7_SEMANTIC_BANK;
if(!bank||!Array.isArray(bank.questions)||!bank.levelConfig||bank.levelConfig[11])return;

const vocabulary={
  "disputable":["có thể bị tranh cãi","Whether the decision was fair is disputable.","Việc quyết định ấy có công bằng hay không vẫn có thể tranh cãi."],
  "debated":["đang được thảo luận/tranh cãi","The proposal is still being debated in public.","Đề xuất vẫn đang được công chúng tranh luận."],
  "undisputed":["không bị tranh cãi, được thừa nhận rộng rãi","She is the undisputed winner of the contest.","Cô ấy là người chiến thắng không ai tranh cãi của cuộc thi."],
  "indisputable":["không thể bác bỏ/tranh cãi một cách hợp lý","The video provides indisputable evidence of the mistake.","Video đưa ra bằng chứng không thể bác bỏ về sai sót."],
  "credible":["đáng tin, có cơ sở để tin","The journalist quoted a credible source.","Nhà báo trích dẫn một nguồn đáng tin."],
  "plausible":["nghe hợp lý, có vẻ có thể đúng","She offered a plausible explanation, but we still need proof.","Cô ấy đưa ra một lời giải thích có vẻ hợp lý, nhưng vẫn cần bằng chứng."],
  "genuine":["thật, không giả mạo","The museum confirmed that the signature was genuine.","Bảo tàng xác nhận chữ ký là thật."],
  "believable":["có thể tin được, nghe thuyết phục","His story sounded believable at first.","Câu chuyện của anh ấy thoạt nghe có vẻ đáng tin."],
  "lie":["lời nói dối, lời khẳng định sai có chủ ý","He told a lie to hide his involvement.","Anh ấy nói dối để che giấu sự liên quan của mình."],
  "falseness":["tính giả dối/sai sự thật","She noticed the falseness of his friendly manner.","Cô ấy nhận ra sự giả tạo trong thái độ thân thiện của anh ấy."],
  "fault":["lỗi, trách nhiệm gây ra sai sót","The editing error was my fault.","Lỗi biên tập là do tôi."],
  "failing":["khuyết điểm, điểm yếu","One failing of the report is its lack of evidence.","Một điểm yếu của báo cáo là thiếu bằng chứng."],
  "outdated":["lỗi thời, không còn cập nhật","The guide contains outdated information.","Cuốn hướng dẫn chứa thông tin đã lỗi thời."],
  "inaccessible":["không thể tiếp cận/truy cập","The archive is inaccessible without a password.","Không thể truy cập kho lưu trữ nếu không có mật khẩu."],
  "disputed":["đang bị tranh cãi","The disputed claim appeared in several articles.","Tuyên bố gây tranh cãi xuất hiện trong nhiều bài báo."],
  "up-to-date":["mới nhất, được cập nhật và còn phù hợp","The newsroom uses up-to-date security software.","Tòa soạn dùng phần mềm bảo mật được cập nhật."],
  "active":["chủ động/đang hoạt động","She plays an active role in the community project.","Cô ấy đóng vai trò tích cực trong dự án cộng đồng."],
  "available":["có sẵn, có thể dùng/nhận được","The full report is available online.","Toàn bộ báo cáo có sẵn trên mạng."],
  "dependent":["phụ thuộc vào","The station is dependent on donations.","Đài phát thanh phụ thuộc vào tiền quyên góp."],
  "influential":["có sức ảnh hưởng đến người khác hoặc quyết định","She is an influential voice in local journalism.","Cô ấy là tiếng nói có ảnh hưởng trong báo chí địa phương."],
  "prove":["chứng minh một khẳng định là đúng bằng bằng chứng","The records helped prove that the claim was false.","Hồ sơ giúp chứng minh tuyên bố đó sai."],
  "verify":["xác minh tính chính xác của thông tin","Please verify the figures before publication.","Hãy xác minh số liệu trước khi đăng."],
  "notice":["nhận thấy/chú ý đến; cũng có thể là thông báo/biển báo (danh từ)","Did you notice the correction below the article?","Bạn có nhận thấy lời đính chính bên dưới bài báo không?"],
  "state":["phát biểu/nêu rõ bằng lời hoặc văn bản","The notice states that the library closes at six.","Thông báo nêu rõ thư viện đóng cửa lúc sáu giờ."],
  "alarm":["làm ai đó sợ hãi hoặc lo lắng","The sudden siren alarmed nearby residents.","Tiếng còi bất ngờ khiến người dân gần đó hoảng sợ."],
  "alert":["cảnh báo để ai đó chú ý đến rủi ro","Officials alerted residents to the approaching storm.","Cơ quan chức năng cảnh báo cư dân về cơn bão sắp tới."],
  "spread":["lan truyền, lan rộng","The correction spread quickly across social media.","Lời đính chính lan nhanh trên mạng xã hội."],
  "stretch":["kéo giãn, duỗi một bộ phận cơ thể/vật liệu","Stretch your arms after working at the desk.","Hãy duỗi tay sau khi làm việc tại bàn."],
  "expand":["mở rộng quy mô, phạm vi hoặc dung lượng","The newspaper plans to expand its local coverage.","Tờ báo dự định mở rộng phạm vi đưa tin địa phương."],
  "extend":["kéo dài thời gian/thời hạn hoặc chiều dài","They agreed to extend the deadline by two days.","Họ đồng ý gia hạn thời hạn thêm hai ngày."],
  "raise":["nâng lên; làm tăng mức hoặc số lượng","The campaign raised public awareness of corruption.","Chiến dịch nâng cao nhận thức công chúng về tham nhũng."],
  "lift":["nhấc/nâng vật lên","He lifted the heavy box onto the desk.","Anh ấy nhấc thùng nặng lên bàn."],
  "provide":["cung cấp thứ gì cho ai","The agency provides accurate updates to residents.","Cơ quan cung cấp cập nhật chính xác cho người dân."],
  "seek":["tìm kiếm, cố đạt được","The reporter sought confirmation from two witnesses.","Phóng viên tìm sự xác nhận từ hai nhân chứng."],
  "afford":["có khả năng chi trả hoặc chấp nhận hậu quả","We cannot afford to overlook this serious risk.","Chúng ta không thể chấp nhận hậu quả của việc bỏ qua rủi ro nghiêm trọng này."]
};

const passage="A metropolitan news outlet wants to expand its coverage and make reporting accessible to disadvantaged communities. Its editors value transparent reporting, especially when a disputed claim goes viral. Before repeating such a claim, they must (6) ______ its accuracy against the original source. When a genuine safety threat arises, officials should (7) ______ residents to the danger without needlessly frightening them. To check further evidence, the newsroom may (8) ______ its publication deadline. After the correction is published, it can (9) ______ quickly through social media. Because falsehoods can damage public trust, the outlet cannot (10) ______ to ignore serious mistakes.";

const items=[
{
  kind:"SYNONYM",target:"disputed",
  q:"The broadcaster's account remains disputed even after it issued an official announcement.",
  o:["disputable","debated","undisputed","indisputable"],a:1,
  explanation:[
    "Disputed mô tả một nhận định đang bị tranh cãi trên thực tế. Từ gần nghĩa nhất trong câu là debated: có những bên đang bàn cãi, chưa đạt đồng thuận.",
    "Disputable chỉ việc một nhận định CÓ THỂ được tranh cãi; disputed chỉ thực trạng nó ĐANG bị tranh cãi. Undisputed và indisputable đều đi theo hướng không có tranh cãi, nhưng indisputable mạnh hơn vì ngụ ý khó thể bác bỏ."
  ],
  analyses:[
    "Sai về thời điểm/trạng thái: disputable nói khả năng bị tranh cãi, không xác nhận tranh cãi thực sự đang xảy ra.",
    "Đúng: debated mô tả vấn đề đang được tranh luận, phù hợp với remains disputed.",
    "Sai và gần như trái nghĩa: undisputed nghĩa là không có bên nào tranh cãi về kết luận.",
    "Sai: indisputable còn mạnh hơn undisputed, nhấn mạnh bằng chứng/kết luận khó thể phản bác."
  ],
  remember:"disputable = có thể bị tranh cãi; disputed/debated = đang bị tranh cãi; undisputed = không bị tranh cãi; indisputable = không thể bác bỏ hợp lý."
},
{
  kind:"SYNONYM",target:"authentic",
  q:"Before airing the recording, the reporter checked that it was authentic rather than a fabricated copy.",
  o:["credible","plausible","genuine","believable"],a:2,
  explanation:[
    "Authentic trong cụm authentic recording nói tính xác thực về nguồn gốc: đoạn ghi âm thật, không phải bản giả mạo. Genuine diễn đạt đúng đặc điểm này.",
    "Credible/believable nói mức độ người nghe thấy đáng tin; plausible nói lời giải thích nghe có lý. Một bản ghi âm giả vẫn có thể nghe believable hoặc plausible, nên chúng không thay thế authentic trong câu."
  ],
  analyses:[
    "Credible nói thông tin hoặc nguồn có thể tin cậy; không tự chứng minh bản ghi là vật thật.",
    "Plausible thường mô tả lời giải thích/kịch bản có vẻ hợp lý, không xác định bản ghi có bị làm giả.",
    "Đúng: genuine và authentic đều nhấn mạnh thật, không giả mạo, đúng với fabricated copy.",
    "Believable nói người nghe có thể tin nội dung; một đoạn giả được dựng khéo vẫn có thể believable."
  ],
  remember:"authentic/genuine = thật về nguồn gốc; credible = đáng tin; believable = nghe đáng tin; plausible explanation = lời giải thích có vẻ hợp lý (chưa hẳn được chứng minh)."
},
{
  kind:"SYNONYM",target:"falsehood",
  q:"The spokesperson knowingly repeated a falsehood in order to mislead the audience.",
  o:["lie","falseness","fault","failing"],a:0,
  explanation:[
    "Falsehood là một lời khẳng định/điều sai sự thật. Clue knowingly và in order to mislead bổ sung yếu tố chủ ý, khiến lie (lời nói dối) là cách diễn đạt tương đương nhất trong câu.",
    "Không nên đánh đồng falsehood với falseness: falsehood là một phát biểu sai cụ thể, còn falseness là tính chất sai/giả tạo. Fault và failing nói lỗi hoặc điểm yếu, không chỉ một lời khẳng định sai."
  ],
  analyses:[
    "Đúng: lie chỉ lời nói sai có chủ đích, khớp với knowingly và mislead.",
    "Falseness là tính chất giả dối/sai, không phải một lời phát biểu đơn lẻ có thể được repeated.",
    "Fault nói trách nhiệm gây lỗi hoặc khuyết điểm, không thay được a falsehood trong collocation repeat a falsehood.",
    "Failing thường là điểm yếu/khuyết điểm; không mang nghĩa lời tuyên bố không đúng."
  ],
  remember:"a falsehood = một điều/lời nói sai sự thật (chưa tự chứng minh ý định); a lie = lời nói dối có chủ ý; falseness = tính giả dối; fault/failing = lỗi hoặc điểm yếu."
},
{
  kind:"ANTONYM",target:"obsolete",
  q:"The once-popular device is now obsolete because modern systems no longer support it.",
  o:["outdated","inaccessible","disputed","up-to-date"],a:3,
  explanation:[
    "Obsolete có nghĩa lỗi thời đến mức không còn được sử dụng/hỗ trợ hoặc đã bị công nghệ mới thay thế. Ở đây no longer support it cho thấy nghĩa mạnh này.",
    "Câu hỏi yêu cầu ANTONYM. Up-to-date nghĩa đang được cập nhật và phù hợp với hiện tại, đối lập với obsolete. Outdated gần nghĩa chứ không đối nghĩa, và thường nhẹ hơn: một thứ outdated vẫn có thể dùng được."
  ],
  analyses:[
    "Sai vì cùng hướng nghĩa: outdated = lỗi thời, nhưng có thể vẫn dùng được; obsolete thường mạnh hơn.",
    "Inaccessible nghĩa không thể truy cập/tiếp cận, không tự động hàm ý cũ hay mới.",
    "Disputed nói có tranh cãi về một vấn đề, không chỉ mức độ cập nhật của thiết bị.",
    "Đúng: up-to-date = được cập nhật, còn phù hợp; đối lập với obsolete."
  ],
  remember:"obsolete thường gợi việc đã bị thay thế/không còn cần thiết; outdated chỉ không còn mới hoặc cập nhật; up-to-date = hiện hành, được cập nhật."
},
{
  kind:"SYNONYM",target:"reliant",
  q:"Some local news organisations remain reliant on advertising revenue to cover their operating costs.",
  o:["active","available","dependent","influential"],a:2,
  explanation:[
    "Reliant on something = dependent on something: phải dựa vào một nguồn lực để hoạt động. Trong câu, advertising revenue là nguồn tiền mà cơ quan báo chí phụ thuộc vào.",
    "Active mô tả mức độ hoạt động; available mô tả sự có sẵn; influential mô tả sức ảnh hưởng. Không từ nào mã hóa quan hệ phụ thuộc tài chính như reliant on."
  ],
  analyses:[
    "Active nói chủ động/đang hoạt động, không nói phải dựa vào nguồn tiền nào.",
    "Available nói có sẵn, có thể dùng; không diễn đạt sự phụ thuộc của tổ chức.",
    "Đúng: dependent on advertising revenue = reliant on advertising revenue.",
    "Influential nói có ảnh hưởng đối với công chúng/quyết định, không đồng nghĩa phụ thuộc."
  ],
  remember:"reliant ON / dependent ON + somebody/something. Đừng lẫn available (có sẵn) với accessible (có thể tiếp cận/truy cập)."
},
{
  kind:"CLOZE",context:passage,blank:6,
  o:["prove","verify","notice","state"],a:1,
  explanation:[
    "Blank (6) cần động từ chỉ việc kiểm tra tính chính xác của thông tin với nguồn gốc trước khi chia sẻ. Verify its accuracy against the original source là cách kết hợp cụ thể và chính xác nhất.",
    "Prove thường nhấn mạnh đưa bằng chứng để thiết lập một kết luận là đúng; verify nhấn mạnh quy trình xác minh. Notice chỉ nhận thấy; state chỉ phát biểu, không có bước kiểm tra."
  ],
  analyses:[
    "Prove mang nghĩa chứng minh kết luận bằng bằng chứng, nhưng không sát bằng verify cho quy trình checking against a source.",
    "Đúng: verify the accuracy/details/information = xác minh độ chính xác, chi tiết hoặc thông tin.",
    "Notice là nhận ra/để ý, không bảo đảm tính đúng sai của thông tin.",
    "State là nêu ra hoặc phát biểu, không phải xác minh trước khi đăng."
  ],
  remember:"verify information/accuracy (xác minh) khác prove a claim (chứng minh); state a fact (nêu ra) khác notice a detail (để ý thấy)."
},
{
  kind:"CLOZE",context:passage,blank:7,
  o:["alarm","state","alert","notice"],a:2,
  explanation:[
    "Đoạn văn yêu cầu cảnh báo cư dân về mối nguy mà không cố ý khiến họ sợ hãi. Alert residents to the danger là collocation trực tiếp và chính xác.",
    "Alarm somebody nhấn mạnh làm người ấy sợ hoặc hoảng hốt. Alert somebody to something nhấn mạnh giúp họ nhận biết và phòng tránh nguy hiểm; mục tiêu ngữ nghĩa khác nhau."
  ],
  analyses:[
    "Alarm somebody = khiến ai đó sợ/lo; trái với without needlessly frightening them.",
    "State phù hợp với việc phát biểu thông tin, nhưng state residents to danger là sai cấu trúc.",
    "Đúng: alert somebody to a danger/risk = cảnh báo để họ chú ý đến nguy cơ.",
    "Notice là nhận thấy hoặc danh từ chỉ thông báo; không phù hợp mẫu động từ + residents + to the danger."
  ],
  remember:"alert somebody TO something; alert somebody ABOUT something; alarm somebody = làm ai đó hoảng sợ."
},
{
  kind:"CLOZE",context:passage,blank:8,
  o:["spread","stretch","expand","extend"],a:3,
  explanation:[
    "Deadline là một mốc thời gian, nên extend a deadline nghĩa là gia hạn thời hạn. Đây là clue collocation quyết định tại blank (8).",
    "Expand nhấn mạnh mở rộng quy mô/phạm vi (expand coverage/business); stretch là duỗi/kéo giãn cơ thể hoặc vật; spread là lan rộng tin tức. Dù đều có ý mở rộng theo cách nào đó, chúng không thay extend trong ngữ cảnh gia hạn."
  ],
  analyses:[
    "Spread dùng cho tin đồn, nội dung hoặc hiện tượng lan ra, không dùng để gia hạn deadline.",
    "Stretch trong ghi chú gắn với stretch my arms = duỗi tay; stretch a deadline không phải cách nói chuẩn ở đây.",
    "Expand collocate với coverage/business/operations, không tự nhiên bằng extend với deadline.",
    "Đúng: extend a deadline = gia hạn thời hạn, kéo dài thêm thời gian."
  ],
  remember:"extend a deadline; expand a business/coverage; stretch your arms; spread rumours."
},
{
  kind:"CLOZE",context:passage,blank:9,
  o:["extend","raise","spread","lift"],a:2,
  explanation:[
    "Chủ ngữ it chỉ correction; cụm quickly through social media mô tả thông tin lan qua các kênh. Spread là động từ phù hợp nhất, có thể đứng không cần tân ngữ: a correction can spread.",
    "Raise là nâng mức độ (raise awareness), lift là nhấc vật, extend là kéo dài; không chỉ quá trình một tin được nhiều người chia sẻ."
  ],
  analyses:[
    "Extend nói kéo dài thời hạn/thời gian, không đúng nghĩa thông tin được phát tán.",
    "Raise thường cần tân ngữ như raise awareness hoặc raise prices; không dùng a correction can raise quickly.",
    "Đúng: information/rumours/news spread quickly = thông tin/tin đồn/tin tức lan nhanh.",
    "Lift nhấn mạnh nhấc vật lên, không mô tả thông tin truyền qua mạng."
  ],
  remember:"spread/disseminate rumours = lan truyền/phổ biến tin đồn; raise awareness = nâng cao nhận thức; lift a box = nhấc thùng; extend the deadline = gia hạn."
},
{
  kind:"CLOZE",context:passage,blank:10,
  o:["provide","seek","afford","raise"],a:2,
  explanation:[
    "Cannot afford to ignore không chỉ nói chuyện có tiền hay không. Đây là cách dùng nghĩa bóng của afford: không thể chấp nhận hậu quả nếu phớt lờ vấn đề.",
    "Ngữ cảnh serious mistakes và damage public trust tạo clue về cái giá phải trả của hành động, nên cannot afford to là lựa chọn đúng."
  ],
  analyses:[
    "Provide = cung cấp; provide to ignore là không đúng cấu trúc hoặc nghĩa.",
    "Seek = tìm kiếm/cố đạt được; cannot seek to ignore không diễn đạt nguy cơ phải trả giá trong câu.",
    "Đúng: cannot afford to + verb = không thể chi trả hoặc không thể chấp nhận hậu quả của việc làm gì.",
    "Raise = nâng/tăng; cannot raise to ignore vừa sai kết hợp vừa sai ý nghĩa."
  ],
  remember:"cannot afford to do something = không thể chi trả hoặc không thể chịu nổi hậu quả; can ill afford to do something là cách nhấn mạnh hơn."
}
];

const pool=[];
items.forEach(function(item,index){
  const options=item.o.slice();
  if(options.length!==4||item.a<0||item.a>3||!options.every(function(w){return !!vocabulary[w]}))throw new Error("Unit 7 latest vocabulary invalid at question "+(index+1));
  const question={
    id:"u7-latest-"+(index+1),
    lockOptions:true,
    q:item.kind==="CLOZE"?"Which option best fits blank ("+item.blank+")?":item.q,
    o:options,
    a:item.a,
    e:options[item.a]+" — "+item.explanation[0]
  };
  if(item.kind==="CLOZE"){
    question.type="reading";
    question.context=item.context;
  }else{
    question.promptType=item.kind;
    question.target=item.target;
  }
  const exp={
    mode:"semantic_precision",
    step1:item.explanation,
    options:options.map(function(w,i){
      return {label:"ABCD"[i],word:w,meaning:vocabulary[w][0],analysis:item.analyses[i]};
    }),
    examples:options.map(function(w,i){
      return {label:"ABCD"[i],word:w,en:vocabulary[w][1],vi:vocabulary[w][2]};
    }),
    remember:item.remember
  };
  const position=bank.questions.length;
  bank.questions.push(question);
  bank.explanations.push(exp);
  bank.explanationById[question.id]=exp;
  pool.push(position);
});
bank.levelConfig[11]={
  label:"B2–C1",
  name:"Bài mới nhất",
  title:"Bài mới nhất",
  note:"5 Synonym/Antonym · 5 Semantic Cloze",
  fixedOrder:true,
  sessionSize:10,
  pool:pool
};
})();