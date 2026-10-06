(()=>{
function escText(s){return String(s??"").trim()}
function lc(s){const x=String(s||"");return x?x.charAt(0).toLowerCase()+x.slice(1):x}
function fillTheme(text,theme){return String(text||"").replaceAll("{theme}",theme)}
function meta(config,word){
  const v=config.defs[word];
  if(!v) return {word,vi:word,scope:"Từ này thuộc cùng trường nghĩa nhưng cần xét collocation và phạm vi nghĩa trong ngữ cảnh cụ thể.",colloc:"",ex:"The context determines the most precise word choice.",exVi:"Ngữ cảnh quyết định lựa chọn từ chính xác nhất."};
  return {word,vi:v[0],scope:v[1],colloc:v[2],ex:v[3],exVi:v[4]};
}
function optionAnalysis(config,opt,correct,clue,sense){
  const m=meta(config,opt),isCorrect=opt===correct;
  if(isCorrect){
    return `${m.word} = ${m.vi}. ${m.scope} ${m.colloc?"Cách kết hợp điển hình: "+m.colloc+". ":""}Trong câu này, clue “${clue}” yêu cầu đúng sắc thái “${sense}”, nên ${m.word} là lựa chọn khớp nhất cả về nghĩa lẫn phạm vi dùng.`;
  }
  return `${m.word} = ${m.vi}. ${m.scope} ${m.colloc?"Cách kết hợp thường gặp: "+m.colloc+". ":""}Từ này có vẻ hợp vì nằm gần cùng semantic field, nhưng ngữ cảnh đang yêu cầu “${sense}”; trọng tâm của ${m.word} không trùng hoàn toàn với yêu cầu đó, nên kém chính xác hơn ${correct}.`;
}
function examples(config,options){
  return options.map((w,i)=>{
    const m=meta(config,w);
    return {label:"ABCD"[i],word:w,en:m.ex,vi:m.exVi};
  });
}
function semanticExplanation(config,qSpec){
  const targetMeta=meta(config,qSpec.target);
  const correctMeta=meta(config,qSpec.correct);
  const promptType=qSpec.promptType||"SYNONYM";
  const relation=promptType==="ANTONYM"
    ?"một từ mang nghĩa đối lập đúng trên chính chiều nghĩa mà câu đang nhấn mạnh"
    :"một từ gần nghĩa nhất nhưng vẫn giữ được sắc thái và phạm vi nghĩa trong câu";
  const step1=[
    `${qSpec.target} = ${targetMeta.vi}. ${qSpec.translation}`,
    `Clue quyết định là “${qSpec.clue}”. Ở đây ${qSpec.target} không được hỏi theo nghĩa từ điển rộng, mà theo sắc thái “${qSpec.sense}”. Vì vậy cần chọn ${relation}.`,
    `${qSpec.correct} = ${correctMeta.vi}. ${correctMeta.scope} ${correctMeta.colloc?"Collocation đáng nhớ: "+correctMeta.colloc+".":""} Chính điểm này khiến ${qSpec.correct} chính xác hơn những lựa chọn chỉ gần nghĩa bề mặt.`
  ];
  return {
    mode:"semantic_precision",
    step1,
    options:qSpec.options.map((w,i)=>({
      label:"ABCD"[i],word:w,meaning:meta(config,w).vi,
      analysis:optionAnalysis(config,w,qSpec.correct,qSpec.clue,qSpec.sense)
    })),
    examples:examples(config,qSpec.options),
    remember:qSpec.remember||`${qSpec.target} → ${qSpec.correct} trong ngữ cảnh này. Khi các đáp án gần nghĩa, ưu tiên từ khớp nhất với collocation, phạm vi nghĩa và clue của câu thay vì chỉ dịch từng từ sang tiếng Việt.`
  };
}
function clozeExplanation(config,item,completedSentence,viSentence){
  const correctMeta=meta(config,item.correct);
  const step1=[
    `${item.correct} = ${correctMeta.vi}. Câu hoàn chỉnh: “${completedSentence}” → ${viSentence}`,
    `Clue quan trọng là “${item.clue}”. Các phương án đều có thể gần đúng về mặt ngữ pháp, nhưng vị trí này cần sắc thái “${item.sense}”. Vì vậy phải phân biệt semantic scope và collocation chứ không thể chỉ loại đáp án bằng cấu trúc.`,
    `${correctMeta.scope} ${correctMeta.colloc?"Collocation quyết định: "+correctMeta.colloc+". ":""}Do đó ${item.correct} tạo ra cách diễn đạt chính xác nhất trong mạch nghĩa của đoạn.`
  ];
  return {
    mode:"semantic_precision",
    step1,
    options:item.options.map((w,i)=>({
      label:"ABCD"[i],word:w,meaning:meta(config,w).vi,
      analysis:optionAnalysis(config,w,item.correct,item.clue,item.sense)
    })),
    examples:examples(config,item.options),
    remember:item.remember||`${correctMeta.colloc||item.correct} — ghi nhớ cả cụm và object đi kèm. Những từ gần nghĩa trong câu này khác nhau chủ yếu ở phạm vi nghĩa và loại quan hệ chúng thường diễn đạt.`
  };
}
function addTheme(sentence,theme){
  const s=fillTheme(sentence,theme);
  return s.includes("{theme}")?s:s;
}
function buildGeneratedSet(config,setNo){
  const theme=config.themes[(setNo-1)%config.themes.length];
  const questions=[], explanations=[];
  const synCount=config.syn.length;
  const synStart=((setNo-1)*5)%synCount;
  for(let i=0;i<5;i++){
    const base=config.syn[(synStart+i)%synCount];
    const sentence=fillTheme(base.sentence,theme);
    const id=`u${config.unit}-s${setNo}-sem-${i+1}`;
    const q={id,lockOptions:true,promptType:base.promptType||"SYNONYM",target:base.target,q:sentence,o:[...base.options],a:base.options.indexOf(base.correct),e:`${base.target} → ${base.correct}`};
    questions.push(q);
    explanations.push(semanticExplanation(config,{...base,translation:fillTheme(base.translation,theme)}));
  }
  const clozeCount=config.cloze.length;
  const clozeStart=((setNo-1)*5)%clozeCount;
  const selected=[];
  for(let i=0;i<5;i++)selected.push(config.cloze[(clozeStart+i)%clozeCount]);
  const passageIntro=fillTheme(config.passageIntro||"",theme);
  const passageSentences=selected.map((item,i)=>fillTheme(item.sentence,theme).replace("______",`(${i+6}) ______`));
  const passage=[passageIntro,...passageSentences].filter(Boolean).join(" ");
  selected.forEach((item,i)=>{
    const blankNo=i+6;
    const raw=fillTheme(item.sentence,theme);
    const completed=raw.replace("______",item.correct);
    const id=`u${config.unit}-s${setNo}-cloze-${blankNo}`;
    const q={id,lockOptions:true,type:"reading",context:passage,q:`Which option best fits blank (${blankNo})?`,o:[...item.options],a:item.options.indexOf(item.correct),e:`${item.correct} = ${meta(config,item.correct).vi}`};
    questions.push(q);
    explanations.push(clozeExplanation(config,item,completed,fillTheme(item.translation,theme)));
  });
  return {questions,explanations};
}
window.buildSemanticUnitBank=function(config,pilotBank){
  const questions=[], explanations=[], levelConfig={}, explanationById={};
  for(let setNo=1;setNo<=10;setNo++){
    let set;
    if(config.unit===1&&setNo===1&&pilotBank){
      set={questions:pilotBank.questions.map(q=>({...q})),explanations:pilotBank.explanations.map(x=>({...x}))};
    }else set=buildGeneratedSet(config,setNo);
    const pool=[];
    set.questions.forEach((q,i)=>{
      const idx=questions.length;pool.push(idx);questions.push(q);
      const d=set.explanations[i]||{};explanations.push(d);explanationById[q.id]=d;
    });
    levelConfig[setNo]={
      label:"B2–C2",
      name:"Semantic Precision",
      note:setNo<=5?"Vocabulary nuance · semantic precision":"Advanced semantic precision",
      fixedOrder:true,
      pool
    };
  }
  return {
    grade:12,unit:config.unit,title:config.title,subtitle:config.subtitle||"",
    pilotFixedFormat:true,semanticPrecisionPilot:true,trackSetCompletion:true,
    questions,explanations,explanationById,levelConfig
  };
};
})();