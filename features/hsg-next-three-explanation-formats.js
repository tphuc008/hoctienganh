/* Type-specific explanation layer for the next three HSG papers after Hai Phong:
 * Dai hoc Vinh, Phu Tho and Son La. This is a VIEW over sourced reference
 * records: it never creates missing keys, never scores answers, and does not
 * replace original exam questions or the existing review/unlock gate.
 */
(function(global) {
"use strict";
const EXAMS=new Set(["dh-vinh","phu-tho","son-la"]);
const grammar={ "dh-vinh":new Set(["b1"]), "phu-tho":new Set(["g"]), "son-la":new Set(["g1","g2"]) };
const reading={"dh-vinh":new Set(["c1","c2","c4","c6"]), "phu-tho":new Set(["r3"]), "son-la":new Set(["m","r","h","tf"])};
const cloze={"dh-vinh":new Set(["c3","c5"]), "phu-tho":new Set(["r2"]), "son-la":new Set(["oc","pr"])};
const guided={"phu-tho":new Set(["r1"])};
const words={"dh-vinh":new Set(["b3"]), "phu-tho":new Set(["wf"]), "son-la":new Set(["wf"])};
const errors={"dh-vinh":new Set(["b2"]), "phu-tho":new Set(["e"])};
const rewrite={"dh-vinh":new Set(["d"]), "phu-tho":new Set(["w"]), "son-la":new Set(["w"])};
const esc=v=>String(v==null?"":v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const p=s=>s?'<p>'+esc(s)+'</p>':"";
const field=(label,value)=>String(value||"").trim()?'<p><strong>'+esc(label)+':</strong> '+esc(value)+'</p>':"";
const section=(n,title,body)=>'<section class="semantic-step ev1-step"><div class="semantic-step-label"><span>'+n+'</span><div><b>'+esc(title)+'</b></div></div><div class="semantic-prose">'+(body||'<p class="ev1-muted">Chưa có dữ liệu để xác định.</p>')+'</div></section>';
const missing=s=>'<p class="ev1-muted">'+esc(s)+'</p>';
const meaningOr=(x,alt)=>String(x||"").trim()||alt;
const key=(exam,g,n)=>exam+":"+g+":"+n;
/* Exact printed rewritten-sentence prefixes and suffixes; only applied when
 * a matching source-backed answer exists for this precise exam/part/number.
 * Corrections to answer fragments are committed separately in solution data.
 */
const W={
 "dh-vinh:d:1": ["Not only "," opens doors to understanding diverse educational systems.","Not only + auxiliary + S + V, but + S + also + V","Đảo trợ động từ lên trước chủ ngữ sau Not only ở đầu câu để nhấn mạnh hai lợi ích song song.","not only ... but also ...|không những ... mà còn ...","open doors to something|mở ra cơ hội tiếp cận điều gì"],
 "dh-vinh:d:2": ["If I were "," than 11 o’clock.","If I were + somebody, I would + V; no later than + time","If I were ... đưa ra lời khuyên giả định theo góc nhìn của người khác; no later than chỉ hạn chót.","If I were in your shoes|nếu tôi ở hoàn cảnh của bạn","no later than + time|không muộn hơn thời điểm nào"],
 "dh-vinh:d:3": ["You are "," the presentation outline before Saturday.","S + be not obliged to + V","Be obliged to nhấn mạnh nghĩa vụ phải làm gì; phủ định nghĩa là không bị bắt buộc. Đồng nghĩa với do not have to, không phải must not.","be obliged to do something|có nghĩa vụ phải làm gì","be under no obligation to do something|không có nghĩa vụ phải làm gì"],
 "dh-vinh:d:4": ["It was "," Vietnam’s national football team to the victory in the last Sea Games.","It + be + focus + that/who + clause","Câu chẻ It was ... that ... nhấn mạnh chiến thuật thông minh của huấn luyện viên là nguyên nhân dẫn đến chiến thắng. Đề in 'to the victory'; cách kết hợp phổ biến hơn là lead someone to victory.","It was ... that ...|chính ... là điều mà ...","lead somebody to victory|giúp ai đi đến chiến thắng"],
 "dh-vinh:d:5": ["Most modern companies insist "," employed.","S + insist on + N / V-ing / somebody's V-ing","Insist on thể hiện yêu cầu mạnh hơn want. Sau giới từ on cần một cụm danh từ hoặc V-ing; being employed ở dạng bị động.","insist on doing something|khăng khăng đòi làm gì","intercultural communication skills|kỹ năng giao tiếp liên văn hóa"],
 "dh-vinh:d:6": ["Anyone caught "," in Singapore.","Anyone caught + V-ing + be + V3/ed + on the spot","Anyone caught dropping litter dùng mệnh đề quan hệ rút gọn bị động; is fined diễn tả hình phạt. On the spot là ngay tại nơi vi phạm.","be caught doing something|bị bắt gặp đang làm gì","on the spot|ngay tại chỗ"],
 "dh-vinh:d:7": ["The investors should "," positive light.","S + should have + V3; view + something + in a positive light","Should have viewed diễn tả sự đánh giá đáng lẽ nên xảy ra trong quá khứ. Thành ngữ bắt buộc có mạo từ 'a': in a positive light, không phải in positive light.","view something in a positive light|nhìn nhận điều gì tích cực","be pessimistic about something|bi quan về việc gì"],
 "dh-vinh:d:8": ["I don’t know "," a decision.","what + prompt + somebody + to + V; so + adjective + a/an + N","What prompted Fred ... là mệnh đề danh ngữ gián tiếp trả lời nguyên nhân. Cấu trúc so extraordinary a decision giữ nghĩa 'such an extraordinary decision'.","prompt somebody to do something|thúc đẩy ai làm gì","so + adjective + a/an + noun|một điều ... đến mức như vậy"],
 "dh-vinh:d:9": ["My close friend "," and I was quite upset about it.","S + take + what somebody said + out of context","Take ... out of context nghĩa là tách lời nói khỏi ngữ cảnh khiến ý bị bóp méo, sát với changed the meaning of what I said.","take something out of context|trích dẫn sai/bỏ qua ngữ cảnh","be upset about something|buồn hoặc bực vì điều gì"],
 "dh-vinh:d:10":["Minh "," to become a politician.","S + overcome + obstacles + to + V","Overcome obstacles diễn tả vượt qua khó khăn; to become đưa ra mục đích. Đồng nghĩa với let nothing stand in one's way.","overcome obstacles|vượt qua trở ngại","stand in somebody's way|cản trở ai đạt mục tiêu"],
 "phu-tho:w:81":["Never ",".","Never + auxiliary/modal + S + V","Never đứng đầu câu khiến trợ động từ hoặc động từ khuyết thiếu đảo lên trước chủ ngữ: Never would Jane agree, không phải Never Jane would agree.","under no circumstances|dù trong hoàn cảnh nào cũng không","agree to a demand|chấp nhận một yêu cầu"],
 "phu-tho:w:82":["The company expanded ",".","S + V + so + adv + that + S + V","Đổi such + a/an + adjective + noun + that thành so + adverb + that khi chuyển rapid expansion thành expanded rapidly.","so + adjective/adverb + that|quá ... đến nỗi ...","expand rapidly|mở rộng nhanh chóng"],
 "phu-tho:w:83":["Although Anna ",".","Although + S + V, S + V","Đổi In spite of + V-ing thành Although + mệnh đề hữu hạn có chủ ngữ và động từ, giữ nguyên quan hệ nhượng bộ.","in spite of + N/V-ing|mặc dù (theo sau bằng danh từ/danh động từ)","manage to do something|xoay xở làm được việc gì"],
 "phu-tho:w:84":["If it had ",".","If it had not been for + N, S + would not have + V3","Câu điều kiện loại 3 nêu điều kiện không có thật trong quá khứ. Nếu không nhờ mức lương cao, Tony đã không nhận công việc.","if it hadn't been for ...|nếu hồi đó không nhờ/có ...","accept a job offer|chấp nhận lời mời làm việc"],
 "phu-tho:w:85":["Some people are ",".","S + be + completely mystified by + N","Thay 'something is a complete mystery to somebody' bằng 'somebody is mystified by something' để giữ đúng người trải nghiệm trạng thái không hiểu.","be mystified by something|cảm thấy khó hiểu về điều gì","remain a mystery to somebody|vẫn là điều bí ẩn đối với ai"],
 "phu-tho:w:86":["Linda feels like "," in the new office.","S + feel like a fish out of water + (in/at + place)","Thành ngữ mô tả cảm giác lạc lõng khi rơi vào môi trường không quen thuộc, tương đương doesn't fit in.","feel like a fish out of water|cảm thấy lạc lõng","fit in with somebody|hòa nhập với ai"],
 "phu-tho:w:87":["The answer is "," – don’t tell me!","S + be + on the tip of + possessive + tongue","Diễn đạt trạng thái sắp nhớ hoặc nói ra được một từ/thông tin nhưng chưa thể gọi tên; my tương ứng với người nói I trong câu gốc.","on the tip of my tongue|sắp nhớ ra, sắp nói ra được","come to mind|chợt xuất hiện trong trí óc"],
 "phu-tho:w:88":["My teacher is never "," in every situation.","S + be (never) at a loss for words","At a loss for words nghĩa là không biết phải nói gì. Never phủ định thành ngữ này để giữ ý luôn biết cách diễn đạt.","be at a loss for words|không biết nói gì","find the right words|tìm được lời diễn đạt phù hợp"],
 "phu-tho:w:89":["She only called her sister for some advice ",".","S + do something + as a last resort","As a last resort chỉ phương án được dùng sau khi những cách khác không hiệu quả, khớp với Only after having tried all methods.","as a last resort|như phương án cuối cùng","exhaust all options|thử hết mọi phương án"],
 "phu-tho:w:90":["My daughter "," when I criticised her for not finishing her homework.","S + (suddenly) turn on the waterworks + when + clause","Turn on the waterworks là thành ngữ thân mật diễn tả việc bật khóc; suddenly cần được giữ lại để bảo toàn sắc thái đột ngột trong đề gốc.","turn on the waterworks|bật khóc, đôi khi hàm ý khóc để gây tác động","dissolve into tears|òa lên khóc"],
 "son-la:w:76":["Only after ",".","Only after + clause + auxiliary + S + V","Only after đứng đầu câu kéo theo đảo trợ động từ did ở mệnh đề chính, trong khi mệnh đề sau after giữ trật tự bình thường.","only after + clause|chỉ sau khi ...","remember an appointment|nhớ lại một cuộc hẹn"],
 "son-la:w:77":["The young programmer, whose ",".","S, whose + N + V, + V ...","Whose là đại từ quan hệ sở hữu, đưa dedication của người lập trình vào mệnh đề quan hệ không xác định; mệnh đề chính vẫn có động từ developed.","whose + noun|mà ... của người đó","inspire the whole class|truyền cảm hứng cho cả lớp"],
 "son-la:w:78":["The principal is ",".","S + be expected to + V","Chuyển They expect that ... sang bị động tường thuật; to announce hướng đến hành động tương lai, không dùng to have announced.","be expected to do something|được dự kiến sẽ làm gì","announce the winner|công bố người chiến thắng"],
 "son-la:w:79":["There is no point ",".","There is no point (in) + V-ing","Cấu trúc này diễn đạt việc làm nào đó không có ích hay không đáng làm; sau in (có thể lược) dùng danh động từ.","there is no point (in) doing something|không ích gì khi làm gì","memorize something overnight|học thuộc điều gì chỉ trong một đêm"],
 "son-la:w:80":["Sophia has not ",".","S + have/has not + V3 + for + duration","Đổi The last time ... was two months ago sang hiện tại hoàn thành phủ định với for two months, diễn tả khoảng thời gian không còn liên lạc.","the last time + past simple|lần cuối làm gì là vào ...","have not heard from somebody for + time|không nhận được tin từ ai trong ..."]
};
function evidence(record){
 const refs=(record.evidence||[]).filter(x=>x?.location&&x?.quote);
 return refs.map(x=>{
  const quote=String(x.quote||"").trim();
  const possiblePlaceholder=/^[A-D]$|^Question\s+\d+$/i.test(quote);
  return field("Vị trí theo tư liệu",x.location)+
   (possiblePlaceholder?missing("Dẫn chứng trích xuất chưa đủ rõ để xác định câu/đoạn. Cần kiểm tra nguồn gốc."):field("Dẫn chứng",quote))+
   field("Tác dụng của dẫn chứng",x.note);
 }).join("")||missing("Câu/đoạn chứng minh chưa được đối chiếu từ nguồn.");
}
function optionAnalysis(record,q){
 const options=Array.isArray(q?.options)&&q.options.length===4?q.options:null;
 const notes=Array.isArray(record.optionNotes)&&record.optionNotes.length===4?record.optionNotes:null;
 const keyIdx=/^[A-D]$/.test(record.correctAnswer)?record.correctAnswer.charCodeAt(0)-65:-1;
 let lines=[];
 if(options){
  lines=options.map((v,i)=>{
   const note=notes?.[i]?.analysis||(i===keyIdx?record.explanation:"");
   return '<div class="ev1-choice semantic-option'+(i===keyIdx?' correct-analysis':'')+'">'+
    '<div class="semantic-option-head"><span>'+"ABCD"[i]+'</span><b>'+esc(v)+'</b>'+
    (notes?.[i]?.meaning?'<em>'+esc(notes[i].meaning)+'</em>':"")+'</div>'+
    (note?p(note):missing("Chưa có phân tích độc lập đủ nguồn cho lựa chọn này."))+'</div>';
  });
 }
 const extra=(record.distractorAnalysis||[]).filter(Boolean).map(x=>p(typeof x==="string"?x:x.reason)).join("");
 return (lines.length?'<div class="semantic-options-grid">'+lines.join("")+'</div>':missing("Chưa trích xuất được đủ bốn phương án A–D từ bản đề; không suy đoán nội dung lựa chọn."))+
  (extra?'<div class="semantic-option-notes">'+extra+'</div>':"");
}
function examples(record,q){
 const items=Array.isArray(record.examples)?record.examples.filter(x=>x?.en&&x?.vi):[];
 const rows=items.map(x=>'<div class="ev1-example semantic-example">'+
  field("Ví dụ minh họa"+(x.word?" ("+x.word+")":""),x.en)+field("Nghĩa",x.vi)+'</div>').join("");
 return rows+((items.length<4)?missing("Hiện mới có "+items.length+"/4 ví dụ A–D được biên tập; không tạo ví dụ giả cho các phương án còn thiếu."):"");
}
function errorParts(record){
 const m=String(record.correctAnswer||"").match(/^\s*(.+?)\s*→\s*(.+?)\s*$/);
 const sourceLine=Number(record.line)>0?"Dòng "+record.line+" (theo lời giải tham khảo; cần đối chiếu định dạng đề gốc)":"Chưa xác minh số dòng gốc.";
 return [
  section(1,"Dòng · Lỗi · Sửa",field("Dòng",sourceLine)+field("Lỗi",m?.[1]||"Cần kiểm tra")+field("Sửa",m?.[2]||record.correctAnswer)),
  section(2,"Quy tắc và vì sao sai",field("Cấu trúc",record.transferablePattern)+p(record.explanation)),
  section(3,"Áp dụng vào câu khác",record.application?p(record.application):missing("Chưa có câu ví dụ áp dụng được đối chiếu, cần biên tập thêm."))
 ];
}
function wordParts(record){
 const base=record.baseWord||"Chưa xác định từ gốc từ bản đề";
 return [
  section(1,"Đáp án và từ loại",field("Đáp án",record.correctAnswer)+field("Từ loại",record.partOfSpeech||"Cần xem vị trí ô trống trong câu gốc.")),
  section(2,"Biến đổi từ",field("Từ gốc",base)+field("Căn cứ trong đề",record.evidence?.[0]?.quote)+p(record.explanation)),
  section(3,"Ghi nhớ và dễ nhầm",field("Cấu trúc cần nhớ",record.transferablePattern)+(record.confusionNote?p(record.confusionNote):missing("Chưa có trường hợp dễ nhầm được xác minh cho câu này.")))
 ];
}
function fillParts(record){
 const result=[
  section(1,"Đáp án và nghĩa",field("Đáp án",record.correctAnswer)+field("Ý nghĩa / ngữ pháp trong câu",record.explanation)),
  section(2,"Căn cứ",evidence(record)),
  section(3,"Giải thích",field("Cấu trúc",record.transferablePattern)+p(record.explanation))
 ];
 if((record.distractorAnalysis||[]).length)result.push(section(4,"Loại trừ",record.distractorAnalysis.map(x=>p(typeof x==="string"?x:x.reason)).join("")));
 result.push(section(result.length+1,"Ghi nhớ (Key Takeaway)",field("Có thể tái sử dụng",record.transferablePattern)));
 return result;
}
function grammarParts(record,q){
 return [
  section(1,"Giải thích collocation / idiom / phrase / grammar",evidence(record)+p(record.explanation)+field("Cấu trúc",record.transferablePattern)+optionAnalysis(record,q)),
  section(2,"Dịch / nghĩa tiếng Việt",record.translation?p(record.translation):field("Nghĩa / chức năng của cấu trúc",record.explanation)+missing("Chưa có bản dịch toàn câu được biên tập; không coi mô tả quy tắc là bản dịch nguyên câu.")),
  section(3,"Bốn ví dụ thực tế B1–C1 cho A–D",examples(record,q)+field("Ghi nhớ",record.transferablePattern))
 ];
}
function guideParts(record,q){
 return [
  section(1,"Context Clue – Dấu hiệu trong câu",evidence(record)),
  section(2,"Coherence – Logic liên kết",record.coherenceAnalysis?p(record.coherenceAnalysis):p(record.explanation)+missing("Nếu câu yêu cầu quan hệ giữa các mệnh đề, cần kiểm tra đoạn trước/sau; không tự suy diễn quan hệ nối.")),
  section(3,"Elimination – Loại trừ",optionAnalysis(record,q)),
  section(4,"Key Takeaway",field("Cấu trúc / chiến thuật",record.transferablePattern))
 ];
}
function readingParts(record,q,partId){
 const isMatching=["c2","c4","c6","m","h","tf"].includes(partId);
 return [
  section(1,"Question Focus",p(isMatching?
   "Xác định dạng đối chiếu/ghép thông tin trước khi chọn: phân biệt được nêu, suy ra và không có trong bài.":"Xác định đúng yêu cầu câu hỏi và phạm vi thông tin cần tìm, không suy rộng từ một chi tiết.")),
  section(2,"Evidence – Dẫn chứng & vị trí",evidence(record)+field("Suy luận",record.explanation)),
  section(3,isMatching?"Logic đối chiếu":"Option Analysis A–D",isMatching?p(record.explanation)+optionAnalysis(record,q):optionAnalysis(record,q)),
  section(4,"Key Takeaway",field("Điểm cần phân biệt / ghi nhớ",record.transferablePattern))
 ];
}
function writingParts(exam,g,n,record,q){
 const meta=W[key(exam,g,n)];
 if(!meta)return null;
 const [prefix,suffix,pattern,meaning,...takeaways]=meta;
 const quote=String(record.evidence?.[0]?.quote||"");
 const stem=String(q?.stem||"");
 const answer=String(record.correctAnswer||"").trim();
 // The old Vinh/Phu Tho PDFs sometimes omit whitespace near the blank.
 // Require BOTH the printed target prefix and overlap with the source quote.
 const norm=s=>String(s||"").toLowerCase().replace(/[^a-z0-9]/g,"");
 const quoteStart=quote.split(/\s[—>]\s/)[0];
 const sourceHead=norm(quoteStart).slice(0,34);
 if(!answer||norm(stem).length<35||!norm(stem).includes(norm(prefix))||
    !sourceHead||!norm(stem).includes(sourceHead))return null;
 const full=prefix+answer+suffix;
 const safeTakeaways=takeaways.map(x=>{
  const [phrase,...meaningParts]=x.split("|");
  return field(phrase,meaningParts.join("|"));
 }).join("");
 return [
  section(1,"Đáp án",p(answer)),
  section(2,"Câu hoàn chỉnh",p(full)),
  section(3,"Cấu trúc ngữ pháp",field("Công thức",pattern)+field("Giải thích nghĩa và cách dùng",meaning)),
  section(4,"Ghi nhớ (Key Takeaway)",safeTakeaways)
 ];
}
function render(exam,partId,n,q,record,spec){
 if(!EXAMS.has(exam)||!record||record.partId!==partId||record.number!==Number(n)||
    record.verified!==true||!spec)return null;
 if(q?.type==="essay")return null; // Preserve the existing essay guidance.
 let parts=null;
 if(grammar[exam]?.has(partId))parts=grammarParts(record,q);
 else if(guided[exam]?.has(partId))parts=guideParts(record,q);
 else if(reading[exam]?.has(partId))parts=readingParts(record,q,partId);
 else if(cloze[exam]?.has(partId))parts=fillParts(record);
 else if(words[exam]?.has(partId))parts=wordParts(record);
 else if(errors[exam]?.has(partId))parts=errorParts(record);
 else if(rewrite[exam]?.has(partId))parts=writingParts(exam,partId,Number(n),record,q);
 else return null;
 if(!parts)return null;
 const isWriting=rewrite[exam]?.has(partId);
 const review=record.editorialStatus||spec.needsReview?"needs_review":"source_based";
 return '<div class="ev1 feedback semantic-feedback hsg-next-three-format" data-hsg-next-three-format="'+
  esc(exam)+'" data-explanation-v1="1" data-review-status="'+review+'">'+
  (isWriting?"":'<div class="feedback-title ev1-answer">Đáp án: '+esc(spec.answer||record.correctAnswer)+'</div>')+
  '<p class="ev1-review-label">Lời giải học tập tham khảo, không phải đáp án chính thức. Một số dòng/trích dẫn còn cần đối chiếu với đề gốc.</p>'+
  '<div class="ev1-full">'+parts.join("")+'</div></div>';
}
global.HSGNextThreeFormat=Object.freeze({render,version:"2026-10-28",writingKeys:Object.freeze(Object.keys(W))});
})(window);
