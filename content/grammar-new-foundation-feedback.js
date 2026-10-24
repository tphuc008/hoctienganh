/* Explain every choice with a topic-specific criterion, not a generic rejection. */
(function(g){"use strict";
const phoneme={
 "/ɪ/":"nguyên âm trước ngắn của ship /ʃɪp/",
 "/iː/":"nguyên âm trước dài của sheep /ʃiːp/",
 "/e/":"nguyên âm trong bed /bed/",
 "/æ/":"nguyên âm mở trước trong bad /bæd/",
 "/ʌ/":"nguyên âm trong cup /kʌp/",
 "/ɑː/":"nguyên âm dài trong car /kɑː/ (BrE)",
 "/ɒ/":"nguyên âm ngắn trong lot /lɒt/ (BrE)",
 "/ɔː/":"nguyên âm dài trong law /lɔː/",
 "/ʊ/":"nguyên âm ngắn trong book /bʊk/",
 "/uː/":"nguyên âm dài trong food /fuːd/",
 "/eɪ/":"nguyên âm đôi trong day /deɪ/",
 "/aɪ/":"nguyên âm đôi trong time /taɪm/",
 "/ɔɪ/":"nguyên âm đôi trong boy /bɔɪ/",
 "/aʊ/":"nguyên âm đôi trong now /naʊ/",
 "/əʊ/":"nguyên âm đôi trong go /ɡəʊ/ (BrE)",
 "/θ/":"âm xát răng vô thanh ở đầu thin /θɪn/",
 "/ð/":"âm xát răng hữu thanh ở đầu this /ðɪs/",
 "/ʃ/":"âm xát lợi sau vô thanh ở đầu ship /ʃɪp/",
 "/tʃ/":"âm tắc-xát vô thanh ở đầu chair /tʃeə/",
 "/dʒ/":"âm tắc-xát hữu thanh ở đầu judge /dʒʌdʒ/",
 "/t/":"âm cuối vô thanh thường gặp trong worked",
 "/d/":"âm cuối hữu thanh thường gặp trong played",
 "/ɪd/":"một âm tiết đuôi bổ sung như trong wanted",
 "/f/":"âm xát môi-răng vô thanh trong phone",
 "/k/":"âm tắc vòm mềm vô thanh trong chemistry",
 "/ɡ/":"âm tắc vòm mềm hữu thanh trong game",
 "silent (không đọc)":"không có âm đuôi; đây không phải cách đọc -ed hay -s/-es của từ đang hỏi"
};
const stressLabel={
 "first syllable":"âm tiết đầu","second syllable":"âm tiết thứ hai","third syllable":"âm tiết thứ ba","fourth syllable":"âm tiết thứ tư",
 "last syllable":"âm tiết cuối","second-to-last syllable":"âm áp cuối","third-to-last syllable":"âm thứ ba từ cuối","fourth-to-last syllable":"âm thứ tư từ cuối",
 "first → second":"danh từ nhấn âm đầu và động từ nhấn âm sau",
 "second → first":"danh từ nhấn âm sau và động từ nhấn âm đầu",
 "first → first":"cả hai từ loại cùng nhấn âm đầu",
 "second → second":"cả hai từ loại cùng nhấn âm sau"
};
const disallowed={
 "turn off it":"turn off là cụm tách được; tân ngữ đại từ it phải ở giữa: turn it off",
 "turn on it":"turn on là cụm tách được; đặt it giữa turn và on",
 "pick up her":"pick up là cụm tách được; đại từ her phải xen giữa pick và up",
 "put away it":"put away là cụm tách được: put it away",
 "put away them":"them thay cho số nhiều nhưng câu này nói tới một từ điển",
 "look her after":"look after không tách được; đúng thứ tự là look after her",
 "look up her":"nếu dùng look up với đại từ, phải nói look her up, không phải look up her; ở đây còn sai nghĩa",
 "ran him into":"run into ở nghĩa tình cờ gặp không tách được; him phải ở sau into",
 "ran over him":"run over someone là cán phải ai bằng phương tiện, không phải tình cờ gặp",
 "look up it":"look up là cụm tách được; nói look it up",
 "look it after":"look after không tách được và không có nghĩa tra từ",
 "call off it":"call off là cụm tách được: call it off",
 "call it on":"call on không diễn tả hủy sự kiện và không đặt đại từ kiểu này",
 "call on it":"call on something không có nghĩa hủy sự kiện; có thể call on someone (gọi mời ai phát biểu)",
 "hand in it":"hand in là cụm tách được: hand it in",
 "hand it out":"hand out là phát cho nhiều người, không phải nộp lại cho người nhận",
 "hand it over":"hand over là giao lại/chuyển quyền giữ; không nhấn việc nộp bài/đơn đúng hạn như hand in",
 "get it over":"get something over with là làm xong việc khó chịu, không đồng nghĩa get over a setback",
 "get by it":"get by là xoay xở đủ sống hoặc đối phó; không cấu trúc get by it để nói vượt qua thất bại",
 "get off it":"get off it không có nghĩa hồi phục cảm xúc từ thất bại",
 "come it across":"come across không tách được, nói come across it",
 "come up with it":"come up with là nghĩ ra ý tưởng; không phải tình cờ phát hiện tấm bưu thiếp",
 "come across him":"him chỉ người, không thể thay cho tấm bưu thiếp đang được nhắc đến",
 "look after it":"look after là chăm sóc; không phù hợp khi ngữ cảnh cần tra cứu hoặc đại từ cần chỉ người",
 "pick it up":"it chỉ vật, trong khi ngữ cảnh nêu cô ấy tại sân bay",
 "drop her off":"drop off là đưa người xuống xe, trái hướng với đón khách khi máy bay đáp"
};
function optionExplanation(n,q,opt){
 const x=String(opt),correct=String(q.options[0]);
 if(n===1){
  const desc=phoneme[x]||"âm không khớp với phiên âm của từ";
  return "“"+x+"”: "+desc+". Tuy nhiên từ được hỏi cần “"+correct+"”, không phải “"+x+"”. Đối chiếu từ thực tế: "+q.why;
 }
 if(n===2){
  let detail;
  if(["noun-two","verb-two","adjective-two"].includes(q.skill)){
   const actual=q.skill==="verb-two"?"âm tiết thứ hai":"âm tiết đầu";
   detail="“"+x+"” là từ có trọng âm chính ở "+actual+" trong nhóm đối chiếu; câu yêu cầu tìm từ có kiểu nhấn khác nhóm này.";
  }else{
   detail="“"+x+"” nghĩa là "+(stressLabel[x]||"vị trí trọng âm khác")+", nhưng không phải vị trí trọng âm chính của từ đang được hỏi.";
  }
  return detail+" Đáp án là “"+correct+"”. Chứng cứ âm tiết/từ loại: "+q.why;
 }
 const dict=g.GrammarTopic7Glossary||{};
 let detail=disallowed[x];
 if(!detail&&dict[x])detail=x+" nghĩa là “"+dict[x]+"”";
 if(!detail){
  const found=Object.keys(dict).filter(k=>x===k||x.startsWith(k+" ")||x.endsWith(" "+k)).sort((a,b)=>b.length-a.length)[0];
  detail=found?found+" mang nghĩa “"+dict[found]+"” nhưng cách kết hợp/vai nghĩa ở lựa chọn này không phù hợp":"cấu trúc, tân ngữ hoặc nghĩa của cụm không phù hợp với câu hoàn chỉnh";
 }
 return "“"+x+"”: "+detail+". Trong ngữ cảnh này phải chọn “"+correct+"”: "+q.why;
}
let total=0;
for(const n of [1,2,7]){
 const d=g["GrammarTopic"+n+"Data"];
 if(!d||d.sections.length!==8)throw Error("Missing foundation topic "+n);
 const all=[...d.sections.flatMap(s=>s.checks),...d.practice,...d.mastery,...d.repairs,...d.reviewSets.set1,...d.reviewSets.set2];
 const uniq=new Map(all.map(q=>[q.id,q]));
 if(uniq.size!==80)throw Error("Expected 80 authored items for Topic "+n+", got "+uniq.size);
 for(const q of uniq.values()){
  if(q.options.length!==4||new Set(q.options).size!==4||!q.why||!q.vi)
   throw Error("Bad item "+q.id);
  q.explain=q.explain||{};
  q.explain.clue="Đọc đầy đủ: “"+q.stem+"”. Dấu hiệu quyết định: "+q.why;
  q.explain.rule=q.why;
  q.explain.wrong={};
  for(const k of [1,2,3]){
   const msg=optionExplanation(n,q,q.options[k]);
   if(!msg.includes("“"+q.options[k]+"”")||msg.length<75)throw Error("Bad explanation "+q.id+" "+k);
   q.explain.wrong[k]=msg;
  }
 }
 for(const s of d.sections)for(const q of s.checks){
  q.discovery={
   prompt:n===1?"Em cần xác định chữ viết hay âm thanh IPA của từ?":n===2?"Cần xét vị trí trọng âm nào trong từ và vai trò từ loại không?":"Cụm động từ nào mô tả đúng hành động và kết hợp tân ngữ hợp lệ?",
   options:[n===1?"Phiên âm, âm cuối/đầu và sự tương ứng giữa cách viết với âm.":n===2?"Vị trí trọng âm chính, hậu tố và vai trò danh từ/động từ.":"Ngữ cảnh, nghĩa cụm từ và khả năng tách tân ngữ.", "Đoán theo từ gần chỗ trống mà không xem cấu trúc và ngữ cảnh."],
   correct:0,why:"Đối chiếu trực tiếp: "+q.why
  };
 }
 total+=uniq.size;
}
g.GrammarNewFoundationExplanationAudit=total;
})(window);