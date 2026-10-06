(()=>{
const sourceBanks=[1,2,3,4,5,6,7].map(u=>window["G12_U"+u+"_SEMANTIC_BANK"]);
if(sourceBanks.some(x=>!x)){window.G12_BASIC_REVIEW_BANK=null;return;}

const clone=x=>JSON.parse(JSON.stringify(x));
const norm=s=>String(s||"").toLowerCase().replace(/\s+/g," ").trim();
const semanticByUnit={};
const clozeBlocksByUnit={};

sourceBanks.forEach((bank,idx)=>{
  const unit=idx+1;
  const seenQ=new Set();
  semanticByUnit[unit]=[];
  clozeBlocksByUnit[unit]=[];

  Object.keys(bank.levelConfig).map(Number).sort((a,b)=>a-b).forEach(setNo=>{
    const indices=bank.levelConfig[setNo].pool||[];
    indices.forEach(i=>{
      const q=bank.questions[i];
      if(q?.promptType&&q?.target){
        const key=norm(q.q)+"|"+norm(q.target);
        if(!seenQ.has(key)){seenQ.add(key);semanticByUnit[unit].push(i);}
      }
    });
    const cloze=indices.filter(i=>bank.questions[i]?.type==="reading");
    if(cloze.length===5){
      const passage=norm(bank.questions[cloze[0]]?.context);
      if(!clozeBlocksByUnit[unit].some(b=>b.passage===passage)){
        clozeBlocksByUnit[unit].push({setNo,indices:cloze,passage});
      }
    }
  });
});

const semCursor={1:0,2:0,3:0,4:0,5:0,6:0,7:0};
const blockCursor={1:0,2:0,3:0,4:0,5:0,6:0,7:0};
const questions=[],explanations=[],explanationById={},levelConfig={};

function pushSource(unit,index,id){
  const bank=sourceBanks[unit-1];
  const q=clone(bank.questions[index]);
  const d=clone(bank.explanations[index]);
  q.id=id;
  q.reviewSourceUnit=unit;
  questions.push(q);
  explanations.push(d);
  explanationById[id]=d;
  return questions.length-1;
}

function nextSemantic(unit){
  const pool=semanticByUnit[unit];
  if(!pool.length)throw new Error("Missing semantic pool for Unit "+unit);
  const index=pool[semCursor[unit]%pool.length];
  semCursor[unit]++;
  return index;
}
function nextClozeBlock(unit){
  const blocks=clozeBlocksByUnit[unit];
  if(!blocks.length)throw new Error("Missing cloze block for Unit "+unit);
  const block=blocks[blockCursor[unit]%blocks.length];
  blockCursor[unit]++;
  return block;
}

// 20 fixed review sets. Questions 1–5 deliberately rotate across five different source Units.
// Questions 6–10 preserve one original semantic-cloze passage so the paragraph remains coherent.
for(let setNo=1;setNo<=20;setNo++){
  const pool=[];
  const semanticUnits=[];
  for(let p=0;p<5;p++){
    const unit=((setNo-1+p*3)%7)+1;
    semanticUnits.push(unit);
    pool.push(pushSource(unit,nextSemantic(unit),`basic-review-s${setNo}-q${p+1}-u${unit}`));
  }

  let clozeUnit=((setNo+4)%7)+1;
  // Prefer a sixth Unit when possible so a review set spans broadly across Unit 1–7.
  if(semanticUnits.includes(clozeUnit)){
    for(let shift=1;shift<=7;shift++){
      const candidate=((clozeUnit-1+shift)%7)+1;
      if(!semanticUnits.includes(candidate)){clozeUnit=candidate;break;}
    }
  }
  const block=nextClozeBlock(clozeUnit);
  block.indices.forEach((srcIndex,j)=>{
    pool.push(pushSource(clozeUnit,srcIndex,`basic-review-s${setNo}-q${j+6}-u${clozeUnit}`));
  });

  levelConfig[setNo]={
    label:"Mixed review",
    name:"Ôn lại cơ bản",
    note:"100% nằm trong vocab đã học",
    fixedOrder:true,
    sourceUnits:[...semanticUnits,clozeUnit],
    pool
  };
}

window.G12_BASIC_REVIEW_BANK={
  grade:12,
  unit:8,
  internalUnitId:8,
  reviewMode:true,
  displayUnitLabel:"Ôn lại cơ bản",
  title:"Ôn lại cơ bản",
  subtitle:"100% nằm trong vocab đã học",
  trackSetCompletion:true,
  questions,
  explanations,
  explanationById,
  levelConfig
};
})();