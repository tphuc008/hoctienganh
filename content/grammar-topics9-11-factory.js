/* Grammar Topics 9–11: content authoring adapter for established Topic 5 studio.
 * Keeps the exact 8 × (10 paired examples + 2 checks) / 24 Practice /
 * 12 Mastery / 24+24 Review structure; full Vietnamese explanations.
 */
(function(g){
"use strict";
const parse=s=>{const x=s.split(" ~ ").map(t=>t.trim());if(x.length!==8||x.some(v=>!v))throw Error("Expected 8 populated fields in "+s);return x};
function make(n,title,lessons,writing){
 if(lessons.length!==8)throw Error("Need 8 lesson groups for "+n);
 const originalIds=new Set();
 const config={number:n,title,writing,lessons:lessons.map(l=>{
  if(l.rows.length!==10)throw Error("Need 10 questions for "+n+"/"+l.id);
  if(!l.form||!l.core||!l.meaning||!l.steps||l.steps.length!==3||!l.pitfalls?.length||!l.cases?.length||l.cases.length!==3)throw Error("Incomplete V1.1 lesson "+l.id);
  if(originalIds.has(l.id))throw Error("Duplicated skill "+l.id);originalIds.add(l.id);
  const rows=l.rows.map(parse);
  for(const x of rows){
   if(x[1].split("___").length!==2||new Set(x.slice(2,6)).size!==4)throw Error("Ambiguous or malformed choices "+n+"/"+l.id+": "+x[1]);
  }
  return {id:l.id,title:l.title,meaning:l.meaning,form:l.form,core:l.core,contrast:l.contrast,
    outcome:l.outcome||"Sử dụng đúng "+l.title.toLowerCase(),minutes:9,clue:l.clue,checkA:l.checkA||l.clue,
    checkB:"Dựa vào hình thức của từ gần chỗ trống mà không xét câu",faults:l.faults||[],
    entries:rows,extras:l.pitfalls};
 })};
 const d=g.GrammarTopicCompiler.build(config);
 for(let k=0;k<8;k++){
  const l=lessons[k],s=d.sections[k],first=s.examples[0],second=s.examples[1];
  // Error-clinic must not present a grammatical alternative with a different
  // meaning (e.g. stop to smoke) or a conversational same-polarity tag as wrong.
  const preferSyntaxError=(n===10||(n===9&&(l.id==="meaning-shifts"||l.id==="try-regret")));
  if(preferSyntaxError){
    const q=s.checks[0],incorrect=q.stem.replace("___",q.options[2]);
    d.detectives[k].wrongSentence=incorrect;
    d.detectives[k].choices=[s.examples[0].inverted,incorrect];
    d.detectives[k].clues=[l.clue,l.core];
  }
  s.learnV11={
    intro:l.meaning,
    cases:l.cases.map((item,i)=>{
     const ex=s.examples[i];
     return {name:item[0],formula:item[1],sentence:ex.inverted,vi:ex.vi,why:item[2]||ex.why};
    }),
    steps:l.steps,
    contrast:l.pair||[first.normal,first.inverted,l.contrast||l.core],
    pitfalls:l.pitfalls.map(p=>({title:p[0],rule:p[1],example:p[2],vi:p[3]})),
    fullFormula:l.form,formulaLabel:"Công thức tổng hợp",specialKind:"grammar"
  };
  if(!s.learnV11.contrast.every(Boolean))throw Error("Contrast missing "+l.id);
  const qlist=[...s.checks,...d.practice,...d.mastery,...d.reviewSets.set1,...d.reviewSets.set2].filter(q=>q.skill===l.id);
  const ids=new Set();
  for(const q of qlist){
   if(ids.has(q.id))continue;ids.add(q.id);
   q.explain.clue=l.clue||l.core;
   q.explain.rule=q.why;
   q.explain.reasoning=l.reasoning||l.core;
   // Distinguish syntax from meanings, polarity, comparison scope.
   for(let a=1;a<4;a++){
    const opt=q.options[a],right=q.options[0],label="“"+opt+"”";
    let why;
    if(n===9){
      const gerund=/ing(?:\s|$)/.test(opt);
      const to=/^to\s/.test(opt);
      why=(l.diagnostics?.[a-1]||l.core);
      if(l.id==="meaning-shifts"||l.id==="try-regret")why+=" Dạng này có thể tạo một câu khác về nghĩa, nhưng không diễn đạt sự kiện/mục đích được yêu cầu.";
      else why+=" Cấu trúc đang kiểm tra yêu cầu “"+right+"”, không phải "+(gerund?"V-ing":"to-infinitive");
    }else if(n===10){
      const wrongNeg=/n't\b/.test(opt);
      const rightNeg=/n't\b/.test(right);
      const polarity=wrongNeg!==rightNeg?"Cực tính của câu hỏi đuôi đang bị đảo sai. ":"";
      why=polarity+(l.diagnostics?.[a-1]||"Đại từ hoặc trợ động từ không khớp với mệnh đề chính.")+
          " Đối chiếu với dạng “"+right+"”: "+q.why;
    }else{
      why=(l.diagnostics?.[a-1]||"Hình thức so sánh không tương ứng với số âm tiết, quan hệ so sánh hoặc đối tượng được nêu.")+
          " Trong câu này phải dùng “"+right+"”: "+q.why;
    }
    q.explain.wrong[a]=label+": "+why;
   }
   if(q.discovery){
    q.discovery.options=[l.checkA||l.clue||"Xác định cấu trúc câu", "Chỉ dựa vào một từ gần ô trống mà bỏ qua ngữ cảnh"];
    q.discovery.why=q.explain.clue;
   }
  }
 }
 g["GrammarTopic"+n+"Data"]=d;
 return d;
}
g.GrammarTopics9to11Factory={make};
})(window);