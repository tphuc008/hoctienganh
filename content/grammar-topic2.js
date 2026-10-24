/* Topic 02 — English word stress: evidence-based rules, exceptions and contrast. */
(function(g){"use strict";
const ordinal=["first syllable","second syllable","third syllable","fourth syllable"];
const relative=["last syllable","second-to-last syllable","third-to-last syllable","fourth-to-last syllable"];
const raw=[
{id:"noun-two",kind:"pick-second",title:"Danh từ hai âm tiết – trọng âm đầu và ngoại lệ",meaning:"Nhiều danh từ hai âm tiết nhấn âm tiết đầu (TAble, TEAcher), nhưng hotel, machine, advice... nhấn âm tiết sau. Đây là khuynh hướng, không phải quy tắc tuyệt đối.",form:"TA-ble vs ho-TEL; TEA-cher vs ma-CHINE",core:"Không áp dụng máy móc 'danh từ hai âm tiết luôn nhấn âm đầu'; kiểm tra cách phát âm của chính từ cần dùng.",mistake:"Không áp quy tắc phổ biến cho hotel, advice, event hay success.",decoys:["table","teacher","mother","garden","window","student","coffee","paper","doctor","picture","station","market","lesson"],rows:[
["hotel","ho-TEL","khách sạn"],["machine","ma-CHINE","máy móc"],["balloon","ba-LOON","bóng bay"],["guitar","gui-TAR","đàn ghi-ta"],["police","po-LICE","cảnh sát"],
["advice","ad-VICE","lời khuyên"],["mistake","mis-TAKE","sai lầm"],["event","e-VENT","sự kiện"],["result","re-SULT","kết quả"],["success","suc-CESS","thành công"]]},
{id:"verb-two",kind:"pick-first",title:"Động từ hai âm tiết – nhận diện trọng âm đầu",meaning:"Nhiều động từ hai âm tiết nhấn âm cuối (beGIN, deCIDE), nhưng ANswer, LISten, OPen, HAPpen... nhấn âm đầu. Cần biết các ngoại lệ thường gặp.",form:"AN-swer vs be-GIN; LIS-ten vs de-CIDE",core:"Phân biệt khuynh hướng nhấn âm hai ở động từ với động từ nhấn âm đầu; sử dụng phiên âm để kiểm tra.",mistake:"Không nhấn âm cuối của mọi động từ hai âm tiết.",decoys:["begin","decide","arrive","explain","enjoy","invite","repeat","forget","relax","agree","prepare","suggest","return"],rows:[
["answer","AN-swer","trả lời"],["listen","LIS-ten","lắng nghe"],["open","O-pen","mở"],["happen","HAP-pen","xảy ra"],["visit","VI-sit","thăm"],
["follow","FOL-low","đi theo"],["borrow","BOR-row","mượn"],["finish","FIN-ish","hoàn tất"],["enter","EN-ter","đi vào"],["offer","OF-fer","đề nghị"]]},
{id:"adjective-two",kind:"pick-second",title:"Tính từ hai âm tiết – kiểm tra ngoại lệ",meaning:"Nhiều tính từ hai âm tiết nhấn đầu như HAPpy, SIMple; một số tính từ như poLITE, aLONE, aFRAID lại nhấn cuối. Không thể đoán chính xác chỉ bằng từ loại.",form:"HAP-py vs po-LITE; SIM-ple vs a-LONE",core:"So sánh tính từ nhấn âm tiết đầu với nhóm nhấn âm tiết thứ hai; đọc dạng IPA theo từ.",mistake:"Không gọi mọi tính từ hai âm tiết là 'trọng âm đầu' vì polite và extreme có trọng âm sau.",decoys:["happy","clever","quiet","simple","lovely","careful","basic","pretty","angry","friendly","useful","gentle"],rows:[
["polite","po-LITE","lịch sự"],["alone","a-LONE","một mình"],["afraid","a-FRAID","sợ hãi"],["awake","a-WAKE","thức"],["complete","com-PLETE","hoàn chỉnh"],
["severe","se-VERE","nghiêm trọng"],["extreme","ex-TREME","cực đoan"],["intense","in-TENSE","mãnh liệt"],["secure","se-CURE","an toàn"],["bizarre","bi-ZARRE","kỳ lạ"]]},
{id:"noun-verb-shift",kind:"shift",title:"Cùng cách viết, đổi trọng âm theo từ loại",meaning:"Một số cặp danh từ/động từ hai âm tiết có cùng cách viết nhưng khác trọng âm: REcord (danh từ) so với reCORD (động từ). Đây là nhóm cụ thể, không phải mọi từ đa chức năng.",form:"REcord (n.) → reCORD (v.); PREsent (n.) → preSENT (v.)",core:"Đọc từ trong vai trò danh từ hay động từ trước khi chọn trọng âm; không lấy một cách đọc áp cho cả hai.",mistake:"Không nhấn REcord khi từ đó đóng vai trò động từ 'record a video'.",rows:[
["record","RE-cord / re-CORD","bản ghi / ghi âm"],["present","PRE-sent / pre-SENT","món quà / trình bày"],["object","OB-ject / ob-JECT","vật thể / phản đối"],
["permit","PER-mit / per-MIT","giấy phép / cho phép"],["project","PRO-ject / pro-JECT","dự án / chiếu, phóng"],["conduct","CON-duct / con-DUCT","hành vi / thực hiện"],
["export","EX-port / ex-PORT","hàng xuất khẩu / xuất khẩu"],["import","IM-port / im-PORT","hàng nhập khẩu / nhập khẩu"],
["contrast","CON-trast / con-TRAST","sự tương phản / tương phản"],["contest","CON-test / con-TEST","cuộc thi / tranh cãi, phản đối"]]},
{id:"tion-sion",kind:"ordinal3",title:"Hậu tố -tion/-sion và trọng âm trước hậu tố",meaning:"Với nhiều từ kết thúc bằng -tion/-sion, trọng âm chính đặt ở âm tiết ngay trước hậu tố: eduCAtion, inforMAtion. Xem số âm tiết để định vị, không nhấn vào -tion.",form:"ed-u-CA-tion (4 âm tiết) · in-for-MA-tion (4 âm tiết)",core:"Xác định ranh giới hậu tố rồi đặt trọng âm ngay trước -tion/-sion; xét chính xác số âm tiết của từ.",mistake:"Không nhấn vào âm tiết tion và không suy ra từ bốn chữ viết là bốn âm tiết.",rows:[
["education","ed-u-CA-tion","giáo dục"],["information","in-for-MA-tion","thông tin"],["celebration","cel-e-BRA-tion","lễ kỷ niệm"],
["population","pop-u-LA-tion","dân số"],["invitation","in-vi-TA-tion","lời mời"],["competition","com-pe-TI-tion","cuộc thi"],
["decoration","dec-o-RA-tion","sự trang trí"],["operation","op-e-RA-tion","hoạt động, cuộc mổ"],
["explanation","ex-pla-NA-tion","lời giải thích"],["preparation","prep-a-RA-tion","sự chuẩn bị"]]},
{id:"ic-suffix",kind:"ordinal3",title:"Hậu tố -ic và âm tiết được nhấn",meaning:"Nhiều từ kết thúc bằng -ic nhấn vào âm tiết ngay trước -ic: acaDEMic, geoGRAPHic. Một số từ có thêm trọng âm phụ nhưng chỉ xét trọng âm chính trong bài.",form:"a-ca-DEM-ic · ge-o-GRAPH-ic · pho-to-GRAPH-ic",core:"Tìm hậu tố -ic ở cuối và nhận diện âm tiết ngay trước nó; tránh nhầm trọng âm phụ với trọng âm chính.",mistake:"Không nhấn trực tiếp âm ic trong academic hay automatic.",rows:[
["economic","e-co-NOM-ic","thuộc kinh tế"],["scientific","sci-en-TIF-ic","thuộc khoa học"],["geographic","ge-o-GRAPH-ic","thuộc địa lý"],["academic","a-ca-DEM-ic","thuộc học thuật"],["democratic","dem-o-CRAT-ic","dân chủ"],
["energetic","en-er-GET-ic","tràn đầy năng lượng"],["automatic","au-to-MAT-ic","tự động"],["sympathetic","sym-pa-THET-ic","thông cảm"],["photographic","pho-to-GRAPH-ic","thuộc nhiếp ảnh"],["realistic","re-a-LIS-tic","thực tế"]]},
{id:"ee-eer-ese",kind:"last",title:"Hậu tố -ee, -eer, -ese thường mang trọng âm",meaning:"Nhiều từ có hậu tố -ee, -eer, -ese nhấn chính ở âm tiết cuối: employEE, engiNEER, JapaNESE. Có thể có trọng âm phụ ở phần trước.",form:"em-ploy-EE · en-gi-NEER · Jap-a-NESE",core:"Xác định trọng âm chính nằm ở âm tiết chứa hậu tố, không đọc đều cả ba âm tiết.",mistake:"Không nhấn âm đầu trong employee, volunteer hay refugee nếu hỏi trọng âm chính.",rows:[
["nominee","nom-i-NEE","người được đề cử"],["engineer","en-gi-NEER","kỹ sư"],["volunteer","vol-un-TEER","tình nguyện viên"],["refugee","ref-u-GEE","người tị nạn"],["Japanese","Jap-a-NESE","người/tiếng Nhật"],
["Vietnamese","Viet-na-MESE","người/tiếng Việt"],["Chinese","Chi-NESE","người/tiếng Trung"],["pioneer","pi-o-NEER","người tiên phong"],["guarantee","guar-an-TEE","sự bảo đảm"],["trainee","train-EE","người thực tập"]]},
{id:"third-from-end",kind:"third-last",title:"Một số đuôi -cy, -ty, -phy, -gy và trọng âm",meaning:"Trong các từ mẫu như photography, democracy, biology, technology, trọng âm chính ở âm tiết thứ ba tính từ cuối. Đây là mô hình của nhóm từ được học, không phải quy tắc áp dụng cho mọi từ có cùng đuôi.",form:"pho-TOG-ra-phy · de-MOC-ra-cy · bi-OL-o-gy",core:"Đếm âm tiết từ phải sang trái: âm cuối = 1, áp cuối = 2, âm thứ ba từ cuối = 3.",mistake:"Không chuyển trọng âm photography về âm đầu vì photograph nhấn PHO; dạng dẫn xuất có thể đổi trọng âm.",rows:[
["photography","pho-TOG-ra-phy","nhiếp ảnh"],["geography","ge-OG-ra-phy","địa lý"],["democracy","de-MOC-ra-cy","nền dân chủ"],["biology","bi-OL-o-gy","sinh học"],["technology","tech-NOL-o-gy","công nghệ"],["psychology","psy-CHOL-o-gy","tâm lý học"],
["economy","e-CON-o-my","nền kinh tế"],["electricity","e-lec-TRI-ci-ty","điện năng"],["nationality","na-tion-AL-i-ty","quốc tịch"],["responsibility","re-spon-si-BIL-i-ty","trách nhiệm"]]}
];
const lessons=raw.map(l=>{
 const entries=l.rows.map((r,i)=>{
  const [word,pattern,meaning]=r;let stem="",options=[],why="";
  if(l.kind==="pick-second"||l.kind==="pick-first"){
   options=[word,l.decoys[(i*3)%l.decoys.length],l.decoys[(i*3+1)%l.decoys.length],l.decoys[(i*3+2)%l.decoys.length]];
   const stress=l.kind==="pick-first"?"first":"second";
   stem="Stress comparison "+(i+1)+": Which word has its main stress on the "+stress+" syllable? ___";
   why="“"+word+"” ("+meaning+") đọc "+pattern+": trọng âm ở âm tiết "+(stress==="first"?"đầu":"thứ hai")+". Ba từ còn lại có kiểu trọng âm đối lập trong nhóm này.";
  }else if(l.kind==="shift"){
   options=["first → second","second → first","first → first","second → second"];
   stem="For “"+word+"”, how does the primary stress change from NOUN to VERB? ___";
   why="Trong cặp "+pattern+" ("+meaning+"), danh từ nhấn âm đầu; động từ nhấn âm thứ hai. Cần xác định từ loại trước.";
  }else if(l.kind==="ordinal3"){
   options=[ordinal[2],ordinal[0],ordinal[1],ordinal[3]];
   stem="Which syllable has primary stress in “"+word+"” ("+meaning+")? ___";
   why="“"+word+"” đọc "+pattern+": trọng âm chính ở âm thứ ba, ngay trước hậu tố "+(l.id==="tion-sion"?"-tion/-sion.":"-ic.") ;
  }else if(l.kind==="last"){
   options=[relative[0],relative[1],relative[2],relative[3]];
   stem="In “"+word+"”, where is the primary stress counted from the end? ___";
   why="“"+word+"” đọc "+pattern+": trọng âm rơi vào âm tiết cuối, thuộc nhóm hậu tố -ee/-eer/-ese.";
  }else{
   options=[relative[2],relative[0],relative[1],relative[3]];
   stem="In “"+word+"”, where is primary stress counted from the end? ___";
   why="“"+word+"” đọc "+pattern+": đếm từ cuối lên, trọng âm ở âm thứ ba từ cuối (không nhất thiết là âm thứ ba từ đầu).";
  }
  return [stem.replace("___",options[1]),stem,...options,"Trọng âm của “"+word+"” ("+meaning+") là "+pattern+".",why];
 });
 return {id:l.id,title:l.title,meaning:l.meaning,form:l.form,core:l.core,mistake:l.mistake,
  outcome:"Xác định trọng âm có cơ sở: "+l.title.toLowerCase()+".",
  faults:["trọng âm của từ hoặc vai trò từ loại không khớp yêu cầu","không trùng vị trí trọng âm trong từ mẫu","nhầm vị trí tính từ đầu với vị trí tính từ cuối"],entries};
});
g.GrammarTopic2Data=g.GrammarTopicCompiler.build({
 number:2,title:"CHUYÊN ĐỀ 2. TRỌNG ÂM – WORD STRESS",lessons,
 writing:[
 ["Mark the main stress in hotel, table and machine.","ho-TEL; TA-ble; ma-CHINE.",["hotel và machine nhấn sau","table nhấn đầu"]],
 ["Explain the noun–verb contrast for record and present.","RE-cord (n.) / re-CORD (v.); PRE-sent (n.) / pre-SENT (v.).",["xác định từ loại","không đánh đồng hai cách đọc"]],
 ["Mark the main stress in education and scientific.","ed-u-CA-tion; sci-en-TIF-ic.",["-tion không nhận trọng âm","-ic thường có trọng âm ngay trước"]],
 ["Compare photograph and photography.","PHO-to-graph → pho-TOG-ra-phy.",["hình thức dẫn xuất thay trọng âm","đếm âm tiết trước khi xác định"]]
 ]});
})(window);