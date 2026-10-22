/* Grammar studio content compiler: original authored topic examples and answer banks.
 * Every lesson has 10 contrasted pairs, one Vietnamese translation per pair.
 * Every quiz item has exactly one best answer, 3 distractors and V2 feedback.
 */
(function(g){
"use strict";
function build(cfg){
 const sections=cfg.lessons.map((l,idx)=>{
  if(l.entries.length!==10)throw Error("Exactly ten examples required in "+l.id);
  const examples=l.entries.map(row=>{
   const [normal,stem,answer,b,c,e,vi,why]=row;
   if(stem.split("___").length!==2||!answer||new Set([answer,b,c,e]).size!==4||!vi||!why)throw Error("Invalid example "+l.id);
   return {normal,inverted:stem.replace("___",answer),vi,why};
  });
  const explainWrong=(opt,why,fault,stem)=>{
    const key=String(opt).trim().toLowerCase();
    const specifics={
      "that":"That không dùng trong mệnh đề quan hệ không xác định có dấu phẩy, cũng không đứng ngay sau giới từ.",
      "who":"Who chỉ người làm chủ ngữ; không dùng thay where/which/whose nếu chức năng khác.",
      "whom":"Whom là dạng tân ngữ chỉ người; không phù hợp nếu mệnh đề cần chủ ngữ.",
      "whose":"Whose thể hiện sở hữu và phải đi với danh từ phía sau.",
      "which":"Which chỉ vật/sự việc; không thay whom cho người sau giới từ.",
      "where":"Where chỉ quan hệ nơi chốn, không làm tân ngữ hoặc chủ ngữ thay vật tùy ý.",
      "when":"When nối thời gian, không thay đại từ quan hệ chỉ vật/người.",
      "why":"Why nối lí do, thường sau reason trong mệnh đề xác định.",
      "will be":"Will be không diễn tả trạng thái giả định hiện tại theo mẫu were.",
      "are":"Are là dạng hiện tại hoặc số nhiều; cần đối chiếu chủ ngữ thật và mốc thời gian.",
      "is":"Is là dạng hiện tại số ít; cần xem chủ ngữ trung tâm có số ít hay không.",
      "was":"Was là dạng quá khứ số ít, không phù hợp với tất cả ngữ cảnh hiện tại.",
      "were":"Were là dạng quá khứ hoặc số nhiều; cần kiểm tra thì và chủ ngữ.",
      "be":"Be nguyên mẫu không tự làm vị ngữ ở thì hiện tại đơn khi thiếu modal.",
      "had":"Had đòi hỏi quá khứ phân từ ở mẫu đảo điều kiện quá khứ.",
      "did":"Did không phải một trong ba trợ động từ Had/Were/Should dùng để bỏ if."
    };
    const direct=specifics[key];
    return "“"+opt+"”: "+(direct||fault||"không phù hợp vị trí, thì hoặc quan hệ nghĩa đang kiểm tra")+
      " Quy tắc cần dùng: "+why;
  };
  const questions=l.entries.map((row,j)=>{
   const [normal,stem,answer,b,c,e,vi,why]=row;
   const options=[answer,b,c,e];
   const stemLabel=stem;
   const wrong={};
   for(let k=1;k<4;k++){
    const fault=l.faults?.[k-1]||"không thỏa điều kiện ngữ pháp trong câu";
    wrong[k]=explainWrong(options[k],why,fault,stem);
   }
   const id="t"+cfg.number+"-"+l.id+"-"+String(j+1).padStart(2,"0");
   return {id,skill:l.id,stem:stemLabel,options,correct:0,
      why,vi,solution:stem.replace("___",answer),type:["gap","rewrite","error","nuance"][j%4],
      explain:{clue:l.clue||"Xác định cấu trúc và phạm vi mà quy tắc tác động.",rule:why,wrong}};
  });
  const checks=questions.slice(0,2).map((q,j)=>({...q,discovery:{
    prompt:"Để giải câu này, em cần nhận diện yếu tố nào trước?",
    options:[l.checkA||"Chủ ngữ và cấu trúc liên quan",l.checkB||"Chỉ đoán theo từ đứng gần chỗ trống"],
    correct:0,why:"Tìm "+(l.checkA||"chủ ngữ, cấu trúc và ý nghĩa")+" để quyết định hình thức đúng."
  }}));
  const extras=(l.extras||[]).map(v=>({title:v[0],rule:v[1],example:v[2],vi:v[3]}));
  return {id:l.id,tag:l.tag||"GRAMMAR",title:l.title,minutes:l.minutes||8,
   outcome:l.outcome,concept:l.meaning,form:l.form,contrast:l.contrast||l.core,
   steps:l.steps||["Đọc cả câu để xác định quan hệ ngữ pháp.","Tìm thành phần chi phối lựa chọn.","Loại từng phương án sai về hình thức hoặc ý nghĩa."],
   examples,vi:{meaning:l.meaning,examples:examples.map(x=>x.vi)},checks,
   misconception:l.mistake,extras,learnV1:{meaning:l.meaning,formula:l.form,core:l.core},
   allQuestions:questions};
 });
 const skills=sections.map(s=>({id:s.id,title:s.title,outcome:s.outcome}));
 // Across lessons keep the same content weight; specific review sets do not share a stem.
 const practice=sections.flatMap(s=>s.allQuestions.slice(2,5));
 const mastery=sections.flatMap((s,i)=>s.allQuestions.slice(5,i<4?7:6));
 const reviewSets={set1:sections.flatMap(s=>s.allQuestions.slice(7,10)),set2:sections.flatMap(s=>s.allQuestions.slice(4,7))};
 const repairs=sections.map(s=>s.allQuestions[7]);
 const detectives=sections.map((s,i)=>({
  id:"d"+cfg.number+"-"+(i+1),skill:s.id,
  wrongSentence:s.checks[0].stem.replace("___",s.checks[0].options[1]),
  choices:[s.examples[0].inverted,s.checks[0].stem.replace("___",s.checks[0].options[1])],correct:0,
  why:s.examples[0].why,clues:[s.contrast,s.misconception]
 }));
 for(const s of sections)delete s.allQuestions;
 const writing=(cfg.writing||[]).map((v,i)=>({id:"w"+cfg.number+"-"+i,task:v[0],model:v[1],checks:v[2]}));
 const data={title:cfg.title,sections,skills,practice,mastery,repairs,
   review:reviewSets.set1.slice(0,6),reviewSets,detectives,writing};
 const ids=new Set();
 for(const q of [...sections.flatMap(s=>s.checks),...practice,...mastery,...repairs,...reviewSets.set1,...reviewSets.set2]){
   if(!skills.some(s=>s.id===q.skill)||!q.options[0]||q.options.length!==4||Object.keys(q.explain.wrong).length!==3)throw Error("Invalid question "+q.id);
   // Duplicates across stages are allowed because answers live in separate stage namespaces.
   ids.add(q.id);
 }
 if(practice.length!==24||mastery.length!==12||reviewSets.set1.length!==24||reviewSets.set2.length!==24)throw Error("Stage counts invalid");
 if(reviewSets.set1.some(x=>reviewSets.set2.some(y=>x.stem===y.stem)))throw Error("Repeated question across Review sets");
 return data;
}
g.GrammarTopicCompiler={build};
})(window);