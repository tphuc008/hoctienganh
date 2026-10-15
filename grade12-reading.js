
/* Marketing and the Information Age — Grade 12 IELTS Reading (14 items, 25 minutes).
   Standalone, framework-free module. All correct answers/reviews are revealed only on submit. */
(function(){
"use strict";
const PATH="grade-12/reading/marketing-and-the-information-age";
const STORE="grade12-mis-reading-v1";
const LIMIT=25*60;
const PASSAGE=[
"For the early practitioners of marketing in the late 19th and early 20th centuries, the business of selling was simply a matter of continually finding new customers. By contrast, marketing managers in the current era recognise the importance of gathering information about the market and about potential customers. They recognise that if companies are to be profitable, customers must gain and retain their perceptions of value from the brands they buy over a long time frame, rather than from a single transaction. This also means that customers must see value in returning continually to the stores where they shop, as well as to the service providers they deal with.",
"Marketing practitioners and marketing scientists have never worked more closely than they currently do. There are many reasons for this, including the fact that this is the information age where convergence in telecommunications, media and technology is causing old ways to be challenged, and new methods and tools to be tested. Customer expectations have risen as new technologies allow new approaches. For instance, the subscriber-TV music channel Channel [V] encourages its viewers to sign up for text messages and email alerts that tell them when their favourite artists and songs are about to be broadcast. Competitive advantage lies in being able to recognise which customers can be given greater attention, not just because they demand it but because it makes commercial sense to provide high levels of product quality and service.",
"Modern marketing information systems rely on information technology to enable marketing intelligence to be gathered and to store and analyse marketing research information. While some of the information used is gathered by government bodies such as the Australian Bureau of Statistics and Statistics New Zealand, most of it is purposefully gathered by marketing organisations for client companies. In the process, computer technology is used to manipulate the data and then to present the information in such a way that executives can readily identify any problems or issues, and quickly arrive at solutions.",
"In order to produce superior value and satisfaction for customers, marketing managers need information at almost every turn. They need information about customers – end-users and resellers – as well as competitors and governmental and other forces in the marketplace. One marketing executive put it this way: ‘To manage a business well is to manage its future; and to manage the future is to manage information.’ Increasingly, marketers are viewing information not just as an input for making better decisions but also as an important strategic asset and marketing tool. As household incomes increase, choice widens and buyers become better at discriminating, so sellers need information about how buyers respond to different products and advertising campaigns.",
"The supply of information has also increased greatly. It has been suggested by the futurist and best-selling author John Naisbitt that the United States and, by observation, developed countries such as Australia, New Zealand and Singapore are moving from industrial to information-based economies. These post-industrial economies earn 70–80% of their Gross Domestic Product from services, and have entered what some commentators have termed the ‘Information Age’ or the ‘Information Technology Era’.",
"One study found that with all the information now available through supermarket scanners, a packaged-goods product controller is bombarded with one million to one billion new numbers each week. As Naisbitt points out: ‘Running out of information is not a problem, but drowning in it is.’ Yet marketers frequently complain that they lack information of the right kind but have plenty of the wrong kind, or they claim that marketing information is so widely spread throughout the organisation that it takes great effort to locate even simple facts. In addition, subordinates may withhold information they believe will reflect badly on their performance and important information often arrives too late to be useful, or on-time information is not accurate. So marketing managers need better information. Although marketing organisations have greater capacity to provide managers with information, they often do not use it well. As a result, many marketing organisations are now studying their managers’ information needs and designing information systems specifically to meet those needs.",
"One solution is to use a Marketing Information System (MIS). This consists of people, equipment and procedures which, when put together, are able to gather, analyse, evaluate and distribute needed, timely and accurate information to marketing decision-makers. The MIS begins and ends with marketing managers. First, it interacts with these managers to assess the information needs they have. Next, it develops the needed information from internal records, marketing intelligence activities and the research process. The analysis unit processes the data to make it more useful and, finally, the MIS distributes it to managers in the right form and at the right time to help them make better marketing decisions.",
"However, the costs of obtaining, processing, storing and delivering information can mount quickly. In some cases additional information will do little to change or improve a manager’s decision, or the costs of the information will exceed the returns from the improved decision. For example, if an organisation estimates that launching a new product without any further information will yield a profit of $500,000, then it would be foolish to spend $30,000 for additional information that would increase the profit to only $525,000. By itself, information is valueless – its value comes from its use."
];
const Q=[
{id:27,type:"match",question:"The fact that there may be too much information to cope with",answer:"F",p:5,quote:"Running out of information is not a problem, but drowning in it is.",why:"Đoạn F nêu ví dụ người quản lý phải tiếp nhận một triệu đến một tỷ số liệu mới mỗi tuần. Hình ảnh “drowning in it” (chìm ngập trong thông tin) mô tả tình trạng lượng dữ liệu vượt quá khả năng xử lý. Câu hỏi không chỉ hỏi liệu dữ liệu có nhiều hay không, mà còn hỏi khả năng ứng phó với khối lượng đó.",paraphrase:"too much information to cope with ↔ drowning in information",trap:"Đoạn E cũng nói nguồn cung thông tin gia tăng, nhưng không diễn tả trực tiếp vấn đề quá tải đến mức khó xử lý."},
{id:28,type:"match",question:"The relevance of generating repeat business",answer:"A",p:0,quote:"customers must see value in returning continually to the stores where they shop",why:"Tác giả so sánh cách bán hàng trước đây, vốn chú trọng tìm khách hàng mới liên tục, với marketing hiện đại, chú trọng giá trị lâu dài và khiến khách hàng quay lại. “Repeat business” có nghĩa khách hàng tiếp tục mua hàng hoặc sử dụng dịch vụ của cùng doanh nghiệp, đúng với “returning continually”.",paraphrase:"generating repeat business ↔ customers returning continually",trap:"Đừng chọn B chỉ vì đoạn đó nói tới quan hệ với khách hàng; ví dụ B là cá nhân hóa việc thông báo nội dung."},
{id:29,type:"match",question:"An example of personalised marketing",answer:"B",p:1,quote:"Channel [V] encourages its viewers to sign up for text messages and email alerts",why:"Channel [V] cho người xem đăng ký tin nhắn và email liên quan đến nghệ sĩ, bài hát mà chính họ yêu thích. Thông tin được gửi theo sở thích từng người, nên đây là một ví dụ cụ thể về marketing cá nhân hóa.",paraphrase:"personalised marketing ↔ alerts about their favourite artists and songs",trap:"Sự xuất hiện của công nghệ trong đoạn C không tự động có nghĩa đó là ví dụ về việc cá nhân hóa."},
{id:30,type:"match",question:"An illustration of a situation where commissioning new information research might not be advisable",answer:"H",p:7,quote:"it would be foolish to spend $30,000 for additional information",why:"Ví dụ đoạn H: không nghiên cứu thì lợi nhuận dự kiến là 500.000 USD; có thông tin bổ sung thì lợi nhuận tăng lên 525.000 USD, tức tăng 25.000 USD. Chi phí lấy thông tin là 30.000 USD, lớn hơn phần lợi ích tăng thêm 5.000 USD. Vì vậy, việc bỏ tiền nghiên cứu trong tình huống này không đáng.",paraphrase:"might not be advisable ↔ it would be foolish to spend",trap:"Đoạn F phê bình thông tin kém hữu ích, nhưng không có minh họa bằng phép so sánh chi phí–lợi ích của một nghiên cứu mới."},
{id:31,type:"match",question:"How the greater wealth of customers enables them to select from a broader range of products",answer:"D",p:3,quote:"As household incomes increase, choice widens and buyers become better at discriminating",why:"Tác giả thiết lập chuỗi quan hệ: thu nhập hộ gia đình tăng → lựa chọn mua sắm mở rộng → người mua biết phân biệt các sản phẩm tốt hơn. Vì thế doanh nghiệp cần dữ liệu về cách khách hàng phản hồi với sản phẩm và quảng cáo.",paraphrase:"greater wealth ↔ household incomes increase; broader range ↔ choice widens",trap:"Từ “discriminating” ở đây là khả năng phân biệt, chọn lọc sản phẩm, không phải hành vi phân biệt đối xử."},
{id:32,type:"ynng",question:"The majority of marketing statistics are gathered by government agencies.",answer:"NO",p:2,quote:"most of it is purposefully gathered by marketing organisations for client companies",why:"Đoạn C thừa nhận các cơ quan chính phủ thu thập MỘT PHẦN dữ liệu (“some”), nhưng nói PHẦN LỚN (“most”) do các tổ chức marketing thu thập cho khách hàng. Nhận định trong câu hỏi đảo ngược chủ thể thu thập phần lớn dữ liệu nên mâu thuẫn trực tiếp với bài.",paraphrase:"majority ↔ most; government agencies ≠ marketing organisations",trap:"Không phải NOT GIVEN vì đoạn văn đưa ra thông tin rõ ràng về bên thu thập phần lớn dữ liệu."},
{id:33,type:"ynng",question:"The move from an industrial to an information-based economy has happened more quickly in New Zealand than in Australia.",answer:"NOT GIVEN",p:4,quote:"developed countries such as Australia, New Zealand and Singapore are moving from industrial to information-based economies",why:"Đoạn E chỉ cho biết Australia và New Zealand đều thuộc nhóm nền kinh tế đang chuyển đổi. Không có số liệu, mốc thời gian hay đánh giá so sánh TỐC ĐỘ giữa hai nước. Do vậy, không đủ căn cứ để xác nhận cũng như bác bỏ việc New Zealand chuyển đổi nhanh hơn.",paraphrase:"both countries are moving ↛ New Zealand is moving faster",trap:"Không chọn NO: NO phải có bằng chứng cho rằng tốc độ New Zealand không nhanh hơn Australia. Chỉ thiếu phép so sánh thì phải chọn NOT GIVEN."},
{id:34,type:"ynng",question:"Employees sometimes hide information that gives a poor impression of them.",answer:"YES",p:5,quote:"subordinates may withhold information they believe will reflect badly on their performance",why:"“Subordinates” là nhân viên/cấp dưới. Họ có thể cố tình giữ lại thông tin vì cho rằng nó khiến thành tích công việc của họ bị đánh giá xấu. Như vậy, nội dung khớp với ý nhân viên đôi khi che giấu thông tin tạo ấn tượng bất lợi về bản thân.",paraphrase:"sometimes hide ↔ may withhold; gives a poor impression ↔ reflect badly on their performance",trap:"“May” cho thấy khả năng xảy ra, không có nghĩa mọi nhân viên luôn che giấu thông tin."},
{id:35,type:"ynng",question:"Managers frequently fail to make good use of the information they receive.",answer:"YES",p:5,quote:"they often do not use it well",why:"Theo đáp án chuẩn của bộ câu hỏi, câu này là YES. “Frequently” tương ứng với “often”; “fail to make good use of” tương ứng với “do not use it well”. Ý chung của đoạn F là dù có khả năng tiếp cận nhiều thông tin, việc khai thác thông tin vẫn kém hiệu quả.",paraphrase:"frequently ↔ often; fail to make good use ↔ do not use it well",trap:"Lưu ý học thuật: đại từ “they” trong câu gốc có thể quy chiếu tới “marketing organisations” hơn là trực tiếp “managers”. Vì vậy phép chuyển chủ thể ở câu hỏi chưa thật chặt chẽ, dù đáp án thông dụng vẫn là YES."},
{id:36,type:"ynng",question:"Marketing information has to be used to be valuable.",answer:"YES",p:7,quote:"By itself, information is valueless – its value comes from its use.",why:"Tác giả khẳng định thông tin tự thân không có giá trị: giá trị chỉ phát sinh khi nó được sử dụng để cải thiện quyết định. Do vậy, nhận định rằng thông tin marketing phải được sử dụng mới có giá trị là đúng.",paraphrase:"has to be used to be valuable ↔ its value comes from its use",trap:"Đoạn H không phủ nhận giá trị của dữ liệu nói chung; tác giả đang nói giá trị ấy phụ thuộc vào hiệu quả sử dụng."},
{id:37,type:"input",question:"The MIS begins and ends with the ...",answer:"marketing managers",p:6,quote:"The MIS begins and ends with marketing managers.",why:"Câu đầu của chu trình chỉ rõ MIS bắt đầu và kết thúc ở người quản lý marketing. Họ cung cấp yêu cầu thông tin ban đầu và cuối cùng nhận kết quả phân phối. Điền đúng cụm danh từ “marketing managers”, gồm hai từ theo giới hạn đề.",paraphrase:"the MIS begins and ends with ↔ first and final participant: marketing managers",trap:"Không điền “marketing decision-makers” vì sơ đồ và câu văn mở đầu quy trình nêu chính xác “marketing managers”."},
{id:38,type:"input",question:"Find out their ...",answer:"information needs",p:6,quote:"to assess the information needs they have",why:"Ở bước đầu, hệ thống tương tác với nhà quản lý để đánh giá xem họ cần những thông tin nào. Sơ đồ viết “Find out their ...”, tức tìm hiểu nhu cầu thông tin của họ. Hai từ gốc cần điền là “information needs”.",paraphrase:"find out ↔ assess; their ↔ they have",trap:"Không điền “marketing intelligence”: đó là một nguồn dữ liệu của bước sau, không phải nhu cầu của nhà quản lý."},
{id:39,type:"input",question:"Developed through: ...; marketing intelligence activities; research process",answer:"internal records",p:6,quote:"from internal records, marketing intelligence activities and the research process",why:"Đoạn G liệt kê ba nguồn thông tin theo thứ tự: internal records, marketing intelligence activities, research process. Sơ đồ đã in sẵn hai nguồn cuối nên ô 39 buộc là nguồn đầu tiên, “internal records”.",paraphrase:"developed through ↔ develops the needed information from",trap:"Không dùng “computer technology” (đoạn C): đó là công cụ xử lý dữ liệu, không thuộc danh sách ba nguồn ở đoạn G."},
{id:40,type:"input",question:"Processed by the ...",answer:"analysis unit",p:6,quote:"The analysis unit processes the data to make it more useful",why:"Đoạn G ở thể chủ động: “The analysis unit processes the data”. Sơ đồ biến đổi sang bị động “Processed by the ...”. Sau “the” phải điền tên bộ phận thực hiện hành động: “analysis unit”.",paraphrase:"The analysis unit processes the data → Processed by the analysis unit",trap:"Không điền “data”: đó là đối tượng được xử lý, không phải chủ thể thực hiện việc xử lý."}
];
let state=null;
let timer=null;
let selection=null;
function el(id){return document.getElementById(id)}
function html(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function read(){try{return JSON.parse(sessionStorage.getItem(STORE)||"null")}catch(e){return null}}
function save(){try{sessionStorage.setItem(STORE,JSON.stringify(state))}catch(e){}}
function cleaned(s){return String(s||"").trim().replace(/\s+/g," ").toLowerCase()}
function correct(q){return cleaned(state.answers[q.id])===cleaned(q.answer)}
function answered(q){return !!cleaned(state.answers[q.id])}
function mmss(sec){sec=Math.max(0,Math.floor(sec));return String(Math.floor(sec/60)).padStart(2,"0")+":"+String(sec%60).padStart(2,"0")}
function remaining(){return Math.max(0,Math.ceil((state.startedAt+LIMIT*1000-Date.now())/1000))}
function completed(){return Q.filter(answered).length}
function score(){return Q.filter(correct).length}
function stopTimer(){if(timer!==null){clearInterval(timer);timer=null}}
function tick(){
 if(!state||!el("mis-clock"))return;
 const seconds=remaining();
 el("mis-clock").textContent=state.submitted?mmss((state.submittedAt-state.startedAt)/1000):mmss(seconds);
 el("mis-clock").classList.toggle("warning",!state.submitted&&seconds<=120);
 if(seconds<=0&&!state.submitted)submit(true);
}
function fresh(){
 return {startedAt:Date.now(),submitted:false,submittedAt:null,answers:{},focus:27,highlights:[],mobileTab:"reading",split:52};
}
function exitPage(){
 if(state&&!state.submitted&&!window.confirm("Bạn muốn thoát bài đang làm? Tiến độ và thời gian sẽ vẫn được lưu trong tab này."))return;
 location.hash="grade-12/reading";
}
function start(reset){
 const old=read();
 if(reset&&old&&!old.submitted&&!window.confirm("Làm lại từ đầu? Câu trả lời đã nhập và thời gian hiện tại sẽ bị xóa."))return;
 state=reset||!old?fresh():old;
 save();renderReader();
}
function continueReading(){start(false)}
function resetReading(){start(true)}
function switchTab(tab){
 if(!el("mis-app"))return;
 state.mobileTab=tab==="reading"?"reading":"questions";
 el("mis-app").dataset.tab=state.mobileTab;
 document.querySelectorAll(".mis-mobile-switch button").forEach(function(btn){btn.classList.toggle("active",btn.dataset.tab===state.mobileTab)});
 save();
}
function markText(text,p){
 const marks=[];
 (state.highlights||[]).filter(function(x){return x.p===p}).forEach(function(x){
  let pos=text.indexOf(x.text);
  if(pos>=0)marks.push({start:pos,end:pos+x.text.length,kind:"user"});
 });
 if(state.submitted){
  const q=Q.find(function(x){return x.id===Number(state.focus)});
  if(q&&q.p===p){let pos=text.indexOf(q.quote);if(pos>=0)marks.push({start:pos,end:pos+q.quote.length,kind:"evidence"})}
 }
 marks.sort(function(a,b){return a.start-b.start||(a.kind==="evidence"?-1:1)});
 let result="",pos=0;
 marks.forEach(function(m){
  if(m.start<pos)return;
  result+=html(text.slice(pos,m.start));
  result+='<mark class="'+(m.kind==="evidence"?"mis-evidence":"")+'">'+html(text.slice(m.start,m.end))+"</mark>";
  pos=m.end;
 });
 return result+html(text.slice(pos));
}
function passageHTML(){
 return '<div class="mis-kicker">IELTS Academic Reading · Passage 3</div><h1 class="mis-passage-title">Marketing and the Information Age</h1>'+
 '<div class="mis-passage-sub">Reading Passage · Paragraphs A–H</div>'+
 '<div class="mis-reading-tools"><button type="button" onclick="misHighlight()">✎ Highlight</button><button type="button" onclick="misDictionary()">⚑ Tra từ (Cambridge)</button></div>'+
 '<div class="mis-selection-status" id="mis-selection-status">Chọn một đoạn chữ, sau đó nhấn Highlight hoặc Tra từ.</div>'+
 PASSAGE.map(function(p,i){return '<p class="mis-paragraph'+(state.submitted&&Q.some(function(q){return q.id===Number(state.focus)&&q.p===i})?" mis-current-para":"")+'" id="mis-p-'+i+'" data-p="'+i+'"><strong>'+String.fromCharCode(65+i)+'.</strong> '+markText(p,i)+'</p>'}).join("");
}
function optionsHTML(q){
 const opts=q.type==="match"?["A","B","C","D","E","F","G","H"]:["YES","NO","NOT GIVEN"];
 return '<div class="mis-options" role="group" aria-label="Câu '+q.id+'">'+opts.map(function(o){
  const picked=cleaned(state.answers[q.id])===cleaned(o);
  const solution=state.submitted&&o===q.answer;
  const wrong=state.submitted&&picked&&!solution;
  return '<button type="button" class="mis-option'+(solution?" mis-answer-correct":"")+(wrong?" mis-answer-wrong":"")+'" data-option="'+html(o)+'" aria-pressed="'+picked+'" '+(state.submitted?'disabled ':'')+'onclick="misSetChoice('+q.id+',\''+o+'\')">'+html(o)+'</button>';
 }).join("")+"</div>";
}
function reviewHTML(q){
 if(!state.submitted)return "";
 return '<div class="mis-review'+(correct(q)?"":" wrong")+'"><h3>'+(correct(q)?"✓ Chính xác":"✕ Chưa chính xác")+' · Đáp án: '+html(q.answer)+'</h3>'+
 '<div><strong>Bạn chọn:</strong> '+html(answered(q)?state.answers[q.id]:"(chưa trả lời)")+'</div>'+
 '<blockquote>Đoạn '+String.fromCharCode(65+q.p)+': “'+html(q.quote)+'”</blockquote>'+
 '<div><strong>Giải thích:</strong> '+html(q.why)+'</div>'+
 '<div class="mis-paraphrase"><strong>Paraphrase / Logic:</strong> '+html(q.paraphrase)+'</div>'+
 '<div><strong>Điểm dễ nhầm:</strong> '+html(q.trap)+'</div>'+
 '<button type="button" class="mis-tool" style="margin-top:9px" onclick="misGoQuestion('+q.id+')">↖ Tô sáng dẫn chứng trong bài đọc</button></div>';
}
function questionHTML(q){
 return '<article class="mis-q-card'+(Number(state.focus)===q.id?" mis-focus":"")+'" id="mis-q-'+q.id+'">'+
 '<p class="mis-question-text"><span class="mis-num">'+q.id+'</span> '+html(q.question)+'</p>'+
 optionsHTML(q)+reviewHTML(q)+'</article>';
}
function inputHTML(q){
 let v=state.answers[q.id]||"";
 return '<div class="mis-q-card'+(Number(state.focus)===q.id?" mis-focus":"")+'" id="mis-q-'+q.id+'">'+
 '<p class="mis-question-text"><span class="mis-num">'+q.id+'</span> '+html(q.question)+'</p>'+
 '<div class="mis-flow-row"><label for="mis-in-'+q.id+'">Answer</label><input id="mis-in-'+q.id+'" class="mis-input" maxlength="60" autocomplete="off" spellcheck="false" placeholder="NO MORE THAN TWO WORDS" value="'+html(v)+'" '+(state.submitted?"disabled":"")+' oninput="misSetInput('+q.id+',this.value)" /></div>'+
 reviewHTML(q)+'</div>';
}
function diagramHTML(){
 return '<div class="mis-diagram-scroll" aria-label="Sơ đồ Marketing Information System có 4 ô trống 37 đến 40">'+
 '<svg class="mis-diagram" viewBox="0 0 920 420" role="img" aria-label="Sơ đồ quy trình MIS với bốn chỗ trống đánh số 37, 38, 39 và 40." xmlns="http://www.w3.org/2000/svg">'+
 '<defs><marker id="mis-arr" markerWidth="12" markerHeight="12" refX="9" refY="6" orient="auto"><path d="M1 1L11 6L1 11Z" fill="#171717"/></marker></defs>'+
 '<text x="460" y="33" text-anchor="middle" font-size="23" font-weight="700" fill="#171717">The Marketing Information System (MIS)</text>'+
 '<g fill="white" stroke="#262626" stroke-width="2"><rect x="25" y="90" width="136" height="285"/><rect x="245" y="90" width="184" height="165"/><rect x="521" y="90" width="375" height="165"/><rect x="245" y="290" width="184" height="86"/><rect x="521" y="290" width="375" height="86"/></g>'+
 '<g fill="none" stroke="#181818" stroke-width="8" marker-end="url(#mis-arr)"><path d="M176 173H219"/><path d="M439 173H493"/><path d="M709 263V280"/><path d="M512 338H450"/><path d="M234 338H178"/></g>'+
 '<g fill="#151515" font-family="Arial, sans-serif" font-size="21"><text x="45" y="250" font-weight="700">37 _____</text>'+
 '<text x="261" y="154">Find out their</text><text x="261" y="191" font-weight="700">38 _____</text>'+
 '<text x="538" y="126">Developed through:</text><text x="550" y="162" font-weight="700">•   39 _____</text>'+
 '<text x="550" y="194" font-size="19">•   marketing intelligence activities</text>'+
 '<text x="550" y="228">•   research process</text>'+
 '<text x="260" y="322" font-size="18">Timely and</text><text x="260" y="342" font-size="18">accurate data</text><text x="260" y="362" font-size="18">distribution</text>'+
 '<text x="540" y="340">Processed by the  <tspan font-weight="700">40 _____</tspan></text></g></svg></div>';
}
function questionsHTML(){
 const resultHead=state.submitted?
 '<div class="mis-results-banner"><strong>'+score()+'/14 câu đúng</strong><div>Thời gian làm bài: '+mmss((state.submittedAt-state.startedAt)/1000)+' · Nhấn vào số câu ở thanh dưới để xem bằng chứng và lời giải.</div></div>':"";
 const matching=Q.filter(function(q){return q.type==="match"}).map(questionHTML).join("");
 const ynng=Q.filter(function(q){return q.type==="ynng"}).map(questionHTML).join("");
 const blanks=Q.filter(function(q){return q.type==="input"}).map(inputHTML).join("");
 return resultHead+
 '<section class="mis-q-section"><h2>Questions 27–31</h2><p class="mis-q-instruction"><strong>Matching Information.</strong> Which paragraph A–H contains each piece of information? Choose the correct letter.</p>'+matching+'</section>'+
 '<section class="mis-q-section"><h2>Questions 32–36</h2><p class="mis-q-instruction"><strong>YES / NO / NOT GIVEN.</strong> YES: agrees with the passage; NO: contradicts it; NOT GIVEN: no information.</p>'+ynng+'</section>'+
 '<section class="mis-q-section"><h2>Questions 37–40</h2><p class="mis-q-instruction"><strong>Flow-chart Completion.</strong> Complete the diagram. Choose <strong>NO MORE THAN TWO WORDS</strong> from the passage for each answer.</p>'+diagramHTML()+
 '<div class="mis-flow-fields">'+blanks+'</div></section>';
}
function navHTML(){
 return Q.map(function(q){return '<button id="mis-nav-'+q.id+'" type="button" class="mis-jump" onclick="misGoQuestion('+q.id+')" aria-label="Đến câu '+q.id+'">'+q.id+'</button>'}).join("");
}
function renderReader(){
 stopTimer();selection=null;document.body.classList.add("mis-reading-mode");
 const mount=el("pageMount");mount.style.display="block";
 mount.innerHTML='<div id="mis-app" class="mis-app" data-tab="'+html(state.mobileTab||"questions")+'">'+
 '<header class="mis-topbar"><div class="mis-top-left"><button class="mis-exit" aria-label="Thoát bài Reading" onclick="misExit()">×</button><div><div class="mis-title">Marketing and the Information Age</div><div class="mis-subtitle">IELTS Academic Reading · Passage 3 · Questions 27–40</div></div></div>'+
 '<div class="mis-top-mid"><span class="mis-clock" id="mis-clock">25:00</span><span class="mis-score-mini" id="mis-status"></span></div>'+
 '<div class="mis-top-actions">'+
 (state.submitted?'<button type="button" class="mis-submit" onclick="misReset()">Làm bài khác ↻</button>':'<button type="button" class="mis-submit" onclick="misSubmit(false)">Nộp bài →</button>')+
 '</div></header>'+
 '<div class="mis-mobile-switch"><button type="button" data-tab="reading" class="'+((state.mobileTab||"questions")==="reading"?"active":"")+'" onclick="misSwitchTab(\'reading\')">Bài đọc</button><button type="button" data-tab="questions" class="'+((state.mobileTab||"questions")==="questions"?"active":"")+'" onclick="misSwitchTab(\'questions\')">Câu hỏi</button></div>'+
 '<div class="mis-workspace" id="mis-layout" style="grid-template-columns:minmax(320px,'+Number(state.split||55)+'fr) 8px minmax(320px,'+(100-Number(state.split||55))+'fr)">'+
 '<div class="mis-left" id="mis-passage-pane">'+passageHTML()+'</div><div class="mis-divider" id="mis-divider" title="Kéo để điều chỉnh độ rộng hai cột" role="separator" aria-orientation="vertical"></div>'+
 '<div class="mis-right" id="mis-question-pane">'+questionsHTML()+'</div></div>'+
 '<footer class="mis-bottom"><div class="mis-progress-grid" aria-label="Điều hướng câu hỏi">'+navHTML()+'</div><div class="mis-bottom-actions">'+
 (state.submitted?'<button type="button" class="mis-footer-btn" onclick="misReset()">Làm lại bài</button>':'<button type="button" class="mis-footer-btn" onclick="misSubmit(false)">Nộp bài</button>')+
 '</div></footer></div>';
 const passage=el("mis-passage-pane");
 passage.addEventListener("mouseup",captureSelection);
 passage.addEventListener("keyup",captureSelection);
 setupDivider();
 updateProgress();
 tick();
 if(!state.submitted)timer=setInterval(tick,600);
}
function updateProgress(){
 if(!el("mis-app"))return;
 Q.forEach(function(q){
  const n=el("mis-nav-"+q.id);if(!n)return;
  n.className="mis-jump"+(state.submitted?(correct(q)?" right":" wrong"):(answered(q)?" done":""))+(q.id===Number(state.focus)?" focused":"");
 });
 if(el("mis-status"))el("mis-status").innerHTML=state.submitted?'<strong>'+score()+'/14</strong> câu đúng':'<strong>'+completed()+'/14</strong> đã làm';
}
function setChoice(id,value){
 if(!state||state.submitted)return;
 state.answers[id]=value;state.focus=id;save();
 const card=el("mis-q-"+id);
 if(card){card.querySelectorAll(".mis-option").forEach(function(btn){const on=btn.dataset.option===value;btn.setAttribute("aria-pressed",String(on))});}
 updateProgress();
}
function setInput(id,value){
 if(!state||state.submitted)return;
 const input=el("mis-in-"+id);
 if(cleaned(value).split(" ").filter(Boolean).length>2){if(input)input.classList.add("error")}else if(input)input.classList.remove("error");
 state.answers[id]=value;state.focus=id;save();updateProgress();
}
function submit(automatic){
 if(!state||state.submitted)return;
 const invalid=Q.filter(function(q){return q.type==="input"&&answered(q)&&cleaned(state.answers[q.id]).split(" ").length>2});
 if(invalid.length&&!automatic){window.alert("Câu "+invalid.map(function(q){return q.id}).join(", ")+" vượt quá TWO WORDS. Vui lòng sửa đáp án trước khi nộp.");return}
 const missing=14-completed();
 if(!automatic&&!window.confirm("Nộp bài ngay? "+(missing?"Bạn còn "+missing+" câu chưa trả lời. ":"")+"Đáp án và giải thích sẽ hiện sau khi nộp."))return;
 state.submitted=true;state.submittedAt=automatic?state.startedAt+LIMIT*1000:Date.now();state.focus=27;save();
 const scroll=el("mis-question-pane")?.scrollTop||0;
 renderReader();
 const qp=el("mis-question-pane");if(qp)qp.scrollTop=0;
}
function goQuestion(id){
 if(!state||!Q.some(function(q){return q.id===Number(id)}))return;
 state.focus=Number(id);save();
 if(el("mis-app")&&window.innerWidth<=730)switchTab("questions");
 document.querySelectorAll(".mis-q-card").forEach(function(card){card.classList.toggle("mis-focus",card.id==="mis-q-"+id)});
 const card=el("mis-q-"+id);if(card)card.scrollIntoView({behavior:"smooth",block:"start"});
 updateProgress();
 if(state.submitted){
  const left=el("mis-passage-pane");const top=left?left.scrollTop:0;
  if(left)left.innerHTML=passageHTML();
  const next=el("mis-p-"+Q.find(function(q){return q.id===Number(id)}).p);
  if(next)next.scrollIntoView({behavior:"smooth",block:"center"});
  if(left){left.addEventListener("mouseup",captureSelection);left.addEventListener("keyup",captureSelection)}
 }
}
function captureSelection(){
 const sel=window.getSelection();
 const txt=sel&&String(sel.toString()).trim();
 const node=sel&&sel.anchorNode;
 const para=node&&(node.nodeType===1?node:node.parentElement)?.closest?.(".mis-paragraph");
 if(txt&&txt.length<=500&&para){
  selection={p:Number(para.dataset.p),text:txt};
  if(el("mis-selection-status"))el("mis-selection-status").textContent="Đã chọn: “"+txt.slice(0,75)+(txt.length>75?"…":"")+"”";
 }
}
function highlight(){
 if(!selection){window.alert("Hãy bôi đen một cụm trong passage trước khi nhấn Highlight.");return}
 const p=PASSAGE[selection.p];if(!p||!p.includes(selection.text)){window.alert("Hãy chọn chữ nằm trong một đoạn văn.");return}
 if(!(state.highlights||[]).some(function(x){return x.p===selection.p&&x.text===selection.text})){
  state.highlights.push(selection);save();
 }
 const left=el("mis-passage-pane");const scroll=left.scrollTop;
 left.innerHTML=passageHTML();left.scrollTop=scroll;
 left.addEventListener("mouseup",captureSelection);left.addEventListener("keyup",captureSelection);
}
function dictionary(){
 if(!selection||!selection.text){window.alert("Hãy chọn một từ hoặc cụm từ tiếng Anh trong passage.");return}
 const term=selection.text.trim().split(/\s+/).slice(0,5).join(" ");
 window.open("https://dictionary.cambridge.org/dictionary/english/"+encodeURIComponent(term),"_blank","noopener,noreferrer");
}
function setupDivider(){
 const handle=el("mis-divider"),layout=el("mis-layout");
 if(!handle||!layout)return;
 handle.addEventListener("pointerdown",function(e){
  if(window.innerWidth<=730)return;
  e.preventDefault();handle.setPointerCapture(e.pointerId);
  const onMove=function(ev){
   if(!handle.hasPointerCapture(ev.pointerId))return;
   const rect=layout.getBoundingClientRect();
   const ratio=Math.max(32,Math.min(68,Math.round((ev.clientX-rect.left)/rect.width*100)));
   state.split=ratio;
   layout.style.gridTemplateColumns="minmax(320px,"+ratio+"fr) 8px minmax(320px,"+(100-ratio)+"fr)";
  };
  const onUp=function(ev){save();handle.removeEventListener("pointermove",onMove);handle.removeEventListener("pointerup",onUp);handle.removeEventListener("pointercancel",onUp)};
  handle.addEventListener("pointermove",onMove);handle.addEventListener("pointerup",onUp);handle.addEventListener("pointercancel",onUp);
 });
}
function landing(){
 stopTimer();document.body.classList.remove("mis-reading-mode");
 const old=read();
 const mount=el("pageMount");mount.style.display="block";
 mount.innerHTML='<div class="breadcrumbs"><button class="crumb-btn" onclick="goAreaHome()">Home</button><span>›</span><button class="crumb-btn" onclick="goGrade(12)">Lớp 12</button><span>›</span><span>Reading</span></div>'+
 '<div class="unit-hero"><div class="eyebrow">Grade 12 · IELTS Reading</div><h1>Reading</h1><p>Luyện tập Reading theo dạng bài IELTS Academic, chấm điểm và giải thích tiếng Việt sau khi nộp.</p></div>'+
 '<div class="section-title"><h2>Reading Passages</h2><span>1 bài đọc</span></div>'+
 '<div class="exercise-grid"><button class="exercise-card" onclick="location.hash=\''+PATH+'\'"><div class="exercise-icon">📖</div><h3>Marketing and the Information Age</h3><p>Passage 3 · Matching Information · YES/NO/NOT GIVEN · Flow-chart Completion</p><div class="meta"><span class="chip">25 phút</span><span class="chip">14 câu (27–40)</span><span class="chip">Giải thích chi tiết tiếng Việt</span>'+(old?.startedAt?'<span class="chip">'+(old.submitted?"Đã làm · "+Q.filter(function(q){return cleaned(old.answers?.[q.id])===cleaned(q.answer)}).length+"/14":"Đang làm dở")+'</span>':"")+'</div></button></div>';
 window.scrollTo({top:0,behavior:"smooth"});
}
function exercise(){
 const old=read();
 if(old&&old.startedAt){state=old;renderReader();return}
 const mount=el("pageMount");mount.style.display="block";
 mount.innerHTML='<div class="breadcrumbs"><button class="crumb-btn" onclick="goGrade(12)">Lớp 12</button><span>›</span><button class="crumb-btn" onclick="location.hash=\'grade-12/reading\'">Reading</button><span>›</span><span>Marketing and the Information Age</span></div>'+
 '<div class="exercise-intro"><div class="eyebrow">IELTS Academic Reading · Passage 3</div><h1><span class="gradient">Marketing and the Information Age</span></h1>'+
 '<p>8 đoạn (A–H) · 14 câu hỏi (27–40) · Thời gian giới hạn 25 phút. Hai cột bài đọc và câu hỏi cuộn độc lập; có highlight, tra từ và điều hướng nhanh.</p>'+
 '<div class="pills"><span class="pill">Matching Information</span><span class="pill">YES / NO / NOT GIVEN</span><span class="pill">Flow-chart Completion</span><span class="pill">Chỉ hiện đáp án sau khi nộp</span></div>'+
 '<p><strong>Quy định:</strong> Đồng hồ bắt đầu khi nhấn nút dưới đây. Hết 25 phút sẽ tự động nộp bài; câu chưa trả lời được tính sai.</p>'+
 '<button class="primary" onclick="misContinue()">Bắt đầu làm bài →</button></div>';
 window.scrollTo({top:0,behavior:"smooth"});
}
window.renderMISReadingHome=landing;
window.renderMISReadingExercise=exercise;
window.destroyMISReading=function(){stopTimer();document.body.classList.remove("mis-reading-mode")};
window.misExit=exitPage;
window.misContinue=continueReading;
window.misReset=resetReading;
window.misSetChoice=setChoice;
window.misSetInput=setInput;
window.misSubmit=submit;
window.misGoQuestion=goQuestion;
window.misHighlight=highlight;
window.misDictionary=dictionary;
window.misSwitchTab=switchTab;
})();