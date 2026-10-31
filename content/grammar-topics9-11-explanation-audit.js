/* Grammar 9–11 — contextual, accurate distractor explanations (V2).
 * No question / choice / key / storage mutations.
 */
(function(g){
"use strict";
const shapes={
 9:{
 "gerund-verbs":"Động từ chính thuộc nhóm nhận V-ing làm tân ngữ hành động.",
 "to-inf-verbs":"Động từ chính thuộc nhóm nhận to + nguyên mẫu cho dự định, lời hứa hoặc kế hoạch.",
 "prepositions":"Động từ đứng sau giới từ cần V-ing; to trong look forward to/be used to là giới từ.",
 "object-to-v":"Động từ chính đã có tân ngữ chỉ người; hành động theo sau ở dạng to + nguyên mẫu.",
 "bare-inf":"Modal/let/make/had better/would rather ở mẫu này theo sau bởi nguyên mẫu không to.",
 "meaning-shifts":"Hai dạng V-ing và to V đều có thể tồn tại, nhưng V-ing nói hoạt động đã diễn ra/đã dừng; to V nói mục đích/việc phải làm.",
 "try-regret":"Hai dạng đều có thể xuất hiện sau try/regret/go on, nhưng mỗi dạng nhấn một nghĩa hoặc trình tự hành động khác nhau.",
 "structures":"Nhận diện nguyên cả cấu trúc: worth/no use/busy/can't help cần V-ing; too/enough cần to V; used to và be used to khác nhau."
 },
 10:{
 "be-present":"Tag lặp be ở hiện tại và dùng đại từ tương ứng, thường đảo cực tính.",
 "be-past":"Tag lặp was/were trong mệnh đề chính, đúng quá khứ và cực tính.",
 "simple-present":"Động từ thường hiện tại đơn dùng do/does trong tag theo chủ ngữ.",
 "simple-past":"Động từ thường quá khứ đơn dùng did trong tag, không dùng was/were nếu mệnh đề chính không có be.",
 "perfect-modals":"Tag lặp chính trợ động từ have/has hoặc modal will/can/should/would.",
 "negative-words":"Từ never/hardly/nobody/few/little mang cực tính phủ định nên tag xác nhận thông thường là khẳng định.",
 "special":"I am → aren't I; Let's → shall we; mệnh lệnh có thể dùng will you; there → there; this/that → it.",
 "advanced":"Động từ chính have to dùng do/does; used to thường did; ought to thường shouldn't; needn't giữ need."
 },
 11:{
 "short-er":"Tính từ ngắn so sánh hơn với -er và than, có thể gấp đôi phụ âm hoặc đổi -y thành -ier.",
 "long-more":"Tính từ dài dùng more + adjective, không thêm -er đồng thời.",
 "irregular":"Một số tính từ và lượng từ có dạng bất quy tắc better, worse, more, less.",
 "short-est":"Một đối tượng đạt mức cao nhất trong cả nhóm: the + tính từ ngắn + -est.",
 "long-most":"Một đối tượng đạt mức cao nhất trong nhóm: the most + tính từ dài.",
 "equal-as":"As + nguyên cấp + as biểu thị bằng nhau; not as…as chỉ thấp hơn, theo phạm vi câu.",
 "less-fewer":"Fewer thường kết hợp danh từ đếm được số nhiều; less đi với lượng không đếm được theo văn viết chuẩn.",
 "double":"The + comparative ở hai vế biểu thị quan hệ biến thiên; so sánh hơn lặp với and biểu thị tăng/giảm dần."
 }
};
const gerund=x=>/ing(?:\s|$)/.test(x);
const toV=x=>/^to\s/.test(x);
function diagnose9(q,opt){
 const s=q.skill,right=q.options[0],form=gerund(opt)?"V-ing":toV(opt)?"to-infinitive":"động từ nguyên mẫu/động từ đã chia";
 const req=gerund(right)?"V-ing":toV(right)?"to-infinitive":"nguyên mẫu không to";
 if(s==="meaning-shifts"||s==="try-regret"){
   if((gerund(opt)&&toV(right))||(toV(opt)&&gerund(right)))
     return "Về mặt hình thức, “"+opt+"” có thể tạo một cấu trúc khác, nhưng đổi nghĩa: "+q.why+" Trong ngữ cảnh này, “"+right+"” giữ đúng hành động/mục đích hoặc mốc ký ức.";
 }
 if(s==="structures"){
   if(q.stem.includes("used to ___"))return "Ở used to chỉ thói quen quá khứ, sau to là động từ nguyên mẫu. “"+opt+"” không thuộc mẫu này.";
   if(q.stem.includes("is used to")||q.stem.includes("accustomed to"))return "To là giới từ trong be used to/accustomed to nên cần V-ing. “"+opt+"” không đúng hình thức bổ ngữ.";
   if(q.stem.includes("worth")||q.stem.includes("no use")||q.stem.includes("help")||q.stem.includes("busy"))
     return "Cụm cố định ngay trước chỗ trống chi phối dạng V-ing. “"+opt+"” không phải dạng phù hợp cho cụm này.";
   return "Cấu trúc too/enough + adjective + to V yêu cầu to-infinitive; “"+opt+"” không đáp ứng mẫu.";
 }
 if(s==="prepositions"){
   if(toV(opt))return "“"+opt+"” mở to-infinitive; nhưng trước ô trống đã có giới từ. Sau giới từ cần V-ing (đặc biệt to trong look forward to và be used to).";
   return "“"+opt+"” không phải V-ing làm bổ ngữ của giới từ; "+q.why;
 }
 if(s==="bare-inf"){
   if(toV(opt))return "“"+opt+"” có to, nhưng "+q.stem.split("___")[0].trim()+" yêu cầu nguyên mẫu không to.";
   if(gerund(opt))return "“"+opt+"” là V-ing, không thể làm động từ chính ngay sau modal/let/make/had better/would rather trong câu này.";
   return "“"+opt+"” là dạng đã chia, nhưng sau cấu trúc đang xét cần nguyên mẫu không to (“"+right+"”).";
 }
 if(gerund(opt)&&req==="to-infinitive")return "“"+opt+"” là V-ing nhưng động từ đang chi phối bổ ngữ to V. "+q.why;
 if(toV(opt)&&req==="V-ing")return "“"+opt+"” là to-infinitive nhưng cấu trúc đang xét nhận V-ing. "+q.why;
 if(!gerund(opt)&&!toV(opt))return "“"+opt+"” thiếu thành phần "+(req==="V-ing"?"-ing":req==="to-infinitive"?"to":"nguyên mẫu đúng")+" làm bổ ngữ; "+q.why;
 return "“"+opt+"” không giữ đúng mẫu "+req+": "+q.why;
}
function diagnose10(q,opt){
 const correct=q.options[0];
 const neg=x=>/(?:n't\b|\bnot\b)/.test(x);
 const pieces=x=>x.trim().split(/\s+/);
 const [a,pron]=pieces(opt),[want,wantPron]=pieces(correct);
 if(neg(opt)!==neg(correct))return "“"+opt+"” không phù hợp mẫu câu hỏi đuôi xác nhận thông thường: mệnh đề chính "+(neg(correct)?"khẳng định nên tag phủ định":"phủ định nên tag khẳng định")+". Tag cùng cực tính có thể dùng để bộc lộ ngạc nhiên, nhưng không phải ý của câu hỏi này. "+q.why;
 if(pron!==wantPron)return "“"+opt+"” dùng đại từ “"+(pron||"")+"” không quy chiếu đúng chủ ngữ của mệnh đề chính; cần “"+wantPron+"”. "+q.why;
 if(a!==want)return "“"+opt+"” có trợ động từ/modal “"+a+"” không khớp thì hoặc loại động từ của mệnh đề chính; cần “"+want+"”. "+q.why;
 return "“"+opt+"” không tương ứng với cấu trúc chính: "+q.why;
}
function diagnose11(q,opt){
 const s=q.skill,c=q.options[0],o=opt;
 if(s==="equal-as"){
  if(o.includes("as ")&&o.includes("er "))return "“"+o+"” dùng dạng so sánh hơn giữa hai as; phải dùng tính từ/trạng từ nguyên cấp.";
  return "“"+o+"” có thể là cấu trúc so sánh khác, nhưng làm đổi quan hệ bằng nhau/không bằng nhau đã được xác định trong ngữ cảnh. "+q.why;
 }
 if(s==="less-fewer"){
  if(o==="less"&&c==="fewer")return "“less” có thể gặp với danh từ đếm được số nhiều trong khẩu ngữ; văn viết chuẩn trong bài ưu tiên “fewer” với "+(q.stem.includes("mistakes")?"mistakes":"danh từ số nhiều")+".";
  if(o==="fewer"&&c==="less")return "“fewer” dùng với danh từ đếm được số nhiều; danh từ đang xét là lượng không đếm được, nên dùng less.";
  return "“"+o+"” khác về mức so sánh hoặc lượng theo sau; "+q.why;
 }
 if(s==="double"){
  if(o.startsWith("The ")&&o.includes("est"))return "“"+o+"” là dạng so sánh nhất, nhưng cấu trúc cần so sánh hơn tương ứng giữa hai biến số.";
  if(!o.startsWith("The ")&&/^The\b/.test(c))return "“"+o+"” thiếu the đứng trước so sánh hơn ở vế này của mẫu 'the + comparative, the + comparative'.";
  return "“"+o+"” không tạo mẫu tăng dần/biến thiên đúng. "+q.why;
 }
 if(s==="short-er"||s==="long-more"){
  if(/\bmost\b|est\b/.test(o))return "“"+o+"” diễn đạt so sánh nhất; câu đang so hai đối tượng với than hoặc so mức độ hơn.";
  if(o==="tall"||o==="big"||o==="cold"||o==="small"||o==="long"||o==="young"||o==="short")return "“"+o+"” là nguyên cấp, thiếu dấu so sánh hơn trước than.";
  return "“"+o+"” không theo quy tắc hình thành so sánh hơn của tính từ này; "+q.why;
 }
 if(s==="short-est"||s==="long-most"){
  if(o.includes("than")||/\bmore\b/.test(o)||/\ber\b/.test(o))return "“"+o+"” là dạng hơn để so hai đối tượng, nhưng câu đang xác định một phần tử cao nhất trong cả nhóm.";
  return "“"+o+"” không phải dạng nhất được sử dụng với nhóm đối tượng: "+q.why;
 }
 if(s==="irregular"){
  if(o===c)return "Đáp án đúng.";
  if(o==="few"||o==="much"||o==="many"||o==="little")return "“"+o+"” chưa biểu thị mức so sánh hơn; "+q.why;
  return "“"+o+"” không phải dạng so sánh hơn bất quy tắc thích hợp; "+q.why;
 }
 return "“"+o+"” không phù hợp dạng so sánh của câu. "+q.why;
}
let total=0;
for(const n of [9,10,11]){
 const d=g["GrammarTopic"+n+"Data"];
 if(!d)throw Error("Topic "+n+" must exist before explanation audit");
 const all=new Map([...d.sections.flatMap(s=>s.checks),...d.practice,...d.mastery,...d.reviewSets.set1,...d.reviewSets.set2,...d.repairs].map(q=>[q.id,q]));
 if(all.size!==80)throw Error("Wrong audit count Topic "+n);
 for(const q of all.values()){
  const scope=shapes[n][q.skill];
  if(!scope)throw Error("Unknown skill "+n+" "+q.skill);
  q.explain.clue=scope;
  q.explain.rule=q.why;
  q.explain.reasoning=(n===9?"Xác định động từ hoặc giới từ chi phối bổ ngữ. ":n===10?"Đầu tiên xác định cực tính và trợ động từ của mệnh đề chính. ":"Trước hết xác định phạm vi và quan hệ so sánh. ")+scope+" Dấu hiệu áp dụng trong câu: "+q.why;
  for(let i=1;i<=3;i++){
   const diagnosis=(n===9?diagnose9:n===10?diagnose10:diagnose11)(q,q.options[i]);
   q.explain.wrong[i]=diagnosis.startsWith("“"+q.options[i]+"”")?diagnosis:"“"+q.options[i]+"”: "+diagnosis;
  }
  if(q.discovery){
   q.discovery.options=[scope,"Chỉ đoán theo dạng quen mắt mà không kiểm tra cấu trúc và nghĩa"];
   q.discovery.why=scope;
  }
  total++;
 }
}
if(total!==240)throw Error("Expected 240 feedback records");
g.GrammarTopics9to11ExplanationAudit=total;
})(window);