(function(){
  const previousExpand=window.expandGrade12Banks;

  const SYN={
    community:["neighbourhood group","isolation","machine","deadline"],local:["nearby","international","temporary","artificial"],volunteer:["unpaid helper","customer","opponent","manager"],awareness:["understanding","ignorance","silence","distance"],responsibility:["duty","freedom","reward","delay"],preserve:["protect","destroy","ignore","replace"],sustainable:["long-lasting","wasteful","temporary","unsafe"],cooperate:["work together","compete","withdraw","refuse"],participate:["take part","observe only","avoid","cancel"],
    bustling:["lively","silent","empty","remote"],liveable:["habitable","dangerous","temporary","crowded"],modern:["contemporary","ancient","rural","traditional"],attractive:["appealing","unpleasant","ordinary","harmful"],peaceful:["calm","violent","noisy","crowded"],polluted:["contaminated","clean","quiet","modern"],noisy:["loud","silent","safe","expensive"],pricey:["expensive","cheap","crowded","remote"],dangerous:["risky","safe","simple","quiet"],unsafe:["dangerous","secure","modern","useful"],commute:["travel regularly","stay home","retire","wander"],
    healthy:["well","ill","ancient","rare"],routine:["regular habit","accident","celebration","emergency"],balanced:["well-proportioned","extreme","random","temporary"],reduce:["decrease","increase","maintain","collect"],maintain:["keep","abandon","damage","replace"],benefit:["advantage","harm","delay","risk"],stress:["pressure","relaxation","reward","silence"],exhausted:["very tired","energetic","confused","angry"],nutritious:["nourishing","harmful","expensive","spicy"],
    ancient:["very old","modern","temporary","future"],magnificent:["splendid","ordinary","damaged","tiny"],communal:["shared","private","temporary","foreign"],tradition:["custom","prediction","machine","argument"],restore:["repair","destroy","hide","abandon"],challenging:["difficult","easy","familiar","quiet"],embarrassing:["awkward","proud","ordinary","calm"],exhilarating:["thrilling","boring","frightened","routine"],memorable:["unforgettable","ordinary","temporary","unclear"],
    artist:["performer","audience member","judge","organiser"],singer:["vocalist","listener","writer","judge"],performer:["entertainer","spectator","critic","manager"],talented:["gifted","ordinary","careless","unknown"],famous:["well-known","hidden","temporary","local"],audience:["spectators","performers","judges","organisers"],participant:["contestant","spectator","critic","reporter"],career:["profession","hobby","location","schedule"],
    illustrious:["distinguished","ordinary","unknown","brief"],vibrant:["lively","dull","silent","temporary"],refine:["improve","damage","abandon","copy"],ambitious:["aspiring","indifferent","passive","ordinary"],accessible:["easy to use","restricted","hidden","expensive"],diversity:["variety","uniformity","shortage","conflict"],traditional:["customary","novel","temporary","artificial"],popular:["well-liked","unknown","rare","private"],unique:["distinctive","ordinary","identical","common"],captivated:["fascinated","bored","confused","annoyed"],influence:["affect","ignore","copy","avoid"],reflect:["show","hide","erase","prevent"],
    recycle:["process again","throw away","purchase","hide"],conserve:["save","waste","destroy","replace"],renewable:["replenishable","finite","harmful","artificial"],urban:["city-based","rural","temporary","natural"],rural:["countryside","urban","industrial","central"],migrate:["move","remain","hide","return"],affordable:["inexpensive","costly","rare","complex"],employee:["worker","customer","owner","competitor"],occupation:["job","vacation","hobby","location"],recruit:["hire","dismiss","ignore","retire"],resign:["quit","join","promote","hire"],promotion:["advancement","dismissal","retirement","training"],salary:["pay","debt","tax","profit"],colleague:["coworker","customer","competitor","manager"],flexible:["adaptable","rigid","permanent","formal"],demanding:["challenging","easy","optional","brief"],
    accurate:["precise","incorrect","biased","slow"],efficient:["productive","wasteful","uncertain","manual"],bias:["prejudice","balance","accuracy","privacy"],ethical:["moral","harmful","illegal","automatic"],reliable:["dependable","untrustworthy","temporary","biased"],innovative:["novel","traditional","ordinary","outdated"],transform:["change","preserve","copy","delay"],assist:["help","prevent","ignore","replace"],broadcast:["transmit","hide","delete","store"],journalist:["reporter","viewer","advertiser","editor"],headline:["title","footnote","source","caption"],misleading:["deceptive","accurate","neutral","reliable"],viral:["widely shared","private","unread","temporary"],source:["origin","result","opinion","headline"]
  };

  const TOPICS={
    "9-1":["a neighbourhood renewal project","a group of student volunteers","borrowed tables, recycled wood and donated tools","cleaner shared spaces and stronger cooperation","protecting local heritage"],
    "9-2":["a new urban mobility plan","a city transport team","temporary signs, portable barriers and rented sensors","safer streets and shorter journeys","pedestrian safety"],
    "9-3":["a teen wellness programme","a school health team","borrowed exercise mats, printed food guides and a spare classroom","better sleep, healthier routines and lower stress","evidence-based health advice"],
    "9-4":["a local-history exhibition","a group of young museum volunteers","old display boards, borrowed lamps and copied photographs","greater interest in family memories and local history","preserving historical evidence"],
    "9-5":["an outdoor learning expedition","a youth activity team","borrowed tents, improvised signs and shared equipment","more confidence and stronger teamwork","participant safety"],
    "10-3":["a community music festival","a team of young musicians and organisers","borrowed speakers, temporary staging and recycled decorations","more opportunities for young performers and a larger audience","fair treatment of performers"],
    "12-2":["an intercultural festival","a student cultural committee","borrowed booths, handmade signs and donated decorations","more respectful cross-cultural contact","respect for cultural identity"],
    "12-3":["a low-waste living campaign","a school environmental club","reused containers, repaired furniture and donated seedlings","less waste and lower resource use","avoiding greenwashing"],
    "12-4":["a neighbourhood redevelopment plan","an urban planning group","temporary maps, portable counters and borrowed survey equipment","better public services and more liveable streets","affordable access to housing and transport"],
    "12-5":["a workplace apprenticeship scheme","a training and recruitment team","shared workstations, borrowed equipment and temporary training rooms","better job skills and clearer career pathways","fair recruitment"],
    "12-6":["an AI-assisted learning project","a team of teachers and student developers","loaned laptops, open-source tools and temporary test accounts","faster feedback and more personalised practice","privacy and human oversight"],
    "12-7":["a student media-literacy newsroom","a group of young reporters and editors","borrowed cameras, free editing tools and a temporary studio","more careful source checking and clearer reporting","accuracy before speed"]
  };

  const norm=s=>String(s||"").toLowerCase().replace(/[’‘]/g,"'").replace(/[^a-z0-9]+/g," ").trim();
  const answer=(bank,i)=>{const q=bank.questions[i]||{};return q.kind==="input"?(q.answers?.[0]||q.answer||""):(Array.isArray(q.o)&&Number.isInteger(q.a)?q.o[q.a]:"")};
  const core=t=>String(t||"").replace(/^Choose the vocabulary item that best completes the source sentence:\s*/i,"").replace(/^Choose the most precise vocabulary item from the source:\s*/i,"").replace(/^Choose the vocabulary item that best completes the sentence:\s*/i,"").trim();
  const escReg=s=>String(s).replace(/[.*+?^$()|[\]\\{}]/g,"\\$&");

  function gloss(bank,i){
    const q=bank.questions[i]||{},d=bank.explanations[i]||{},a=answer(bank,i);
    let m=String(q.q||"").match(/(?:means|có nghĩa|nghĩa là?)\s*[“"]([^”"]+)[”"]/i);
    if(m)return m[1].trim();
    for(const raw of [q.e,d.meaning]){
      const t=String(raw||"");
      if(a){m=t.match(new RegExp(escReg(a)+"\\s*(?:\\([^)]*\\))?\\s*=\\s*([^.;]+)","i"));if(m)return m[1].trim()}
      m=t.match(/(?:=|—)\s*[“"]?([^.;”"]+)/);if(m)return m[1].trim();
    }
    return "";
  }
  function family(detail){
    let f=String(detail?.family||"").trim();
    if(!f){const m=String(detail?.usage||"").match(/Word family:\s*([^.]*(?:→[^.]*)?)/i);if(m)f=m[1].trim()}
    return f.includes("→")&&!/rare|không mở rộng|tài liệu|cụm cố định/i.test(f)?f:"";
  }
  function cue(detail,a){
    const f=family(detail);if(!f||/\s/.test(String(a).trim()))return "";
    const terms=[...f.matchAll(/([A-Za-z][A-Za-z'-]*)\s*\((?:n|v|adj|adv)[^)]*\)/gi)].map(m=>m[1]);
    return terms.find(x=>norm(x)!==norm(a))||"";
  }
  const translation=(key,i,d)=>d?.translation||window.SENTENCE_TRANSLATIONS?.[key]?.[i]||"";
  const clean=t=>String(t||"").replace(/Trong (?:Unit|chủ đề|tài liệu)[^.]*\.\s*/gi,"").replace(/Ở dạng nhận diện nghĩa[^.]*\.\s*/gi,"").replace(/Set (?:Easy|Intermediate|Hard)[^.]*\.\s*/gi,"").replace(/Mở rộng chủ đề[^.]*\.\s*/gi,"").trim();

  function explain(bank,key,i,qid,why,tr){
    const d=bank.explanations[i]||{},q=bank.questions[i]||{},a=answer(bank,i);
    return {questionId:qid,meaning:clean(d.meaning||q.e||(a+" = "+gloss(bank,i))),why:clean(why||d.why||q.e||("“"+a+"” phù hợp với nghĩa và cấu trúc của câu.")),usage:clean(d.usage||""),contrast:clean(d.contrast||""),family:family(d),translation:tr!==undefined?tr:translation(key,i,d),preserve:true,standard:true};
  }
  function options(bank,i,a){
    const q=bank.questions[i]||{};if(Array.isArray(q.o)&&q.o.length===4)return [...q.o];
    const out=[a];for(let x=0;x<bank.questions.length&&out.length<4;x++){const z=answer(bank,x);if(z&&norm(z)!==norm(a)&&!out.some(y=>norm(y)===norm(z)))out.push(z)}
    return out;
  }
  function add(state,q,e,pool){const i=state.questions.length;state.questions.push(q);state.explanations.push(e);state.explanationById[q.id]=e;pool.push(i);return i}
  const qid=(key,set,no)=>"fixed-"+key+"-s"+set+"-"+String(no).padStart(2,"0");

  function meaningQ(bank,key,set,src,no,state,pool){
    const a=answer(bank,src),g=gloss(bank,src);if(!a||!g)return false;
    const o=options(bank,src,a);let ai=o.findIndex(x=>norm(x)===norm(a));if(ai<0){o[0]=a;ai=0}
    const id=qid(key,set,no);add(state,{id,targetId:id,kind:"mcq",type:"meaning",q:"Từ/cụm từ nào có nghĩa “"+g+"”?",o,a:ai},explain(bank,key,src,id,"“"+a+"” diễn đạt đúng nghĩa “"+g+"”.",""),pool);return true;
  }
  function contextQ(bank,key,set,src,no,state,pool){
    const q=bank.questions[src]||{},a=answer(bank,src),text=core(q.q);if(!a||!/_{2,}/.test(text)||!Array.isArray(q.o))return false;
    const id=qid(key,set,no);add(state,{id,targetId:id,kind:"mcq",type:"context",q:text,o:[...q.o],a:q.a},explain(bank,key,src,id,undefined,translation(key,src,bank.explanations[src]||{})),pool);return true;
  }
  function synonymQ(bank,key,set,src,no,state,pool){
    const a=answer(bank,src),o=SYN[norm(a)];if(!a||!o)return false;
    const id=qid(key,set,no);add(state,{id,targetId:id,kind:"mcq",type:"synonym",q:"The word/phrase “"+a+"” is closest in meaning to ______.",o:[...o],a:0},explain(bank,key,src,id,"“"+a+"” gần nghĩa nhất với “"+o[0]+"”; các lựa chọn còn lại lệch nghĩa hoặc đối lập về sắc thái.",""),pool);return true;
  }
  function wordFormQ(bank,key,set,src,no,state,pool){
    const q=bank.questions[src]||{},a=answer(bank,src),d=bank.explanations[src]||{},c=cue(d,a),text=core(q.q);
    if(!c||!a||!Array.isArray(q.o)||!/_{2,}/.test(text)||norm(c)===norm(a))return false;
    const id=qid(key,set,no);add(state,{id,targetId:id,kind:"input",type:"wordform",q:text+" ("+c.toUpperCase()+")",answers:[a],wordFormCue:c},explain(bank,key,src,id,"Từ gợi ý “"+c+"” phải đổi sang “"+a+"” để đúng từ loại và cấu trúc của vị trí chỗ trống.",translation(key,src,d)),pool);return true;
  }
  const candidates=(bank,pool,test)=>[...new Set([...(pool||[]).filter(test),...bank.questions.map((_,i)=>i).filter(test)])];
  const next=(list,used)=>list.find(i=>!used.has(i));

  function reading(bank,key,set,pool,used,state,targetPool){
    const all=candidates(bank,pool,i=>Array.isArray(bank.questions[i]?.o)&&/_{2,}/.test(core(bank.questions[i]?.q))&&!!answer(bank,i)),pick=[];
    for(const i of all){if(!used.has(i)){pick.push(i);if(pick.length===5)break}}
    for(const i of all){if(pick.length>=5)break;if(!pick.includes(i))pick.push(i)}
    if(pick.length<5)return;
    const passage=pick.map((src,j)=>core(bank.questions[src].q).replace(/_{2,}/,"("+(16+j)+") ______")).join(" ");
    pick.forEach((src,j)=>{const q=bank.questions[src],id=qid(key,set,16+j),d=bank.explanations[src]||{};add(state,{id,targetId:id,kind:"mcq",type:"reading",q:"Choose the best option for blank ("+(16+j)+").",o:[...q.o],a:q.a,context:passage,focus:"("+(16+j)+") ______"},explain(bank,key,src,id,undefined,translation(key,src,d)),targetPool);used.add(src)});
  }

  function build(key,bank){
    const state={questions:[],explanations:[],explanationById:{}},levels={1:[],2:[],3:[]};
    for(const set of [1,2,3]){
      const pool=[...(bank.levelConfig?.[set]?.pool||bank.questions.map((_,i)=>i).slice((set-1)*20,set*20))],used=new Set(),target=levels[set];
      const M=candidates(bank,pool,i=>!!gloss(bank,i)),C=candidates(bank,pool,i=>Array.isArray(bank.questions[i]?.o)&&/_{2,}/.test(core(bank.questions[i]?.q))),Y=candidates(bank,pool,i=>!!SYN[norm(answer(bank,i))]),W=candidates(bank,pool,i=>!!cue(bank.explanations[i]||{},answer(bank,i))&&/_{2,}/.test(core(bank.questions[i]?.q)));
      const plan=["M","C","Y","W","M","C","C","W","Y","C","M","C","W","M","C"];let no=1;
      for(const type of plan){
        const list=type==="M"?M:type==="C"?C:type==="Y"?Y:W;let src=next(list,used),ok=false;
        if(src!==undefined)ok=type==="M"?meaningQ(bank,key,set,src,no,state,target):type==="C"?contextQ(bank,key,set,src,no,state,target):type==="Y"?synonymQ(bank,key,set,src,no,state,target):wordFormQ(bank,key,set,src,no,state,target);
        if(!ok){for(const fallback of [C,M,Y]){src=next(fallback,used);if(src===undefined)continue;ok=/_{2,}/.test(core(bank.questions[src]?.q))?contextQ(bank,key,set,src,no,state,target):meaningQ(bank,key,set,src,no,state,target);if(ok)break}}
        if(ok){used.add(src);no++}
      }
      while(target.length<15){const src=next(M,used);if(src===undefined)break;if(meaningQ(bank,key,set,src,target.length+1,state,target))used.add(src);else used.add(src)}
      reading(bank,key,set,pool,used,state,target);
    }
    const out={grade:bank.grade,unit:bank.unit,title:bank.title,source:bank.source||"",version:(bank.version||1)+10,pilotFixedFormat:true,questions:state.questions,explanations:state.explanations,explanationById:state.explanationById,levelConfig:{1:{label:"A2–B1",name:"Easy",note:"Easy",sessionSize:20,readingTail:true,pool:levels[1]},2:{label:"B1–B2",name:"Intermediate",note:"Intermediate",sessionSize:20,readingTail:true,pool:levels[2]},3:{label:"B2–C1",name:"Hard",note:"Hard",sessionSize:20,readingTail:true,pool:levels[3]}}};
    addContextGuessing(key,out);return out;
  }

  const DEF={
    b1b2:[
      ["chary","cautious and reluctant","immediately enthusiastic","careless and impulsive","completely unaware","“hesitated and watched carefully before agreeing” trực tiếp cho thấy thái độ dè dặt và chưa sẵn sàng chấp nhận.","Chary là từ ít gặp, hàm ý vừa thận trọng vừa miễn cưỡng.","be chary of/about something","wary gần nghĩa nhưng thông dụng hơn; chary thường thêm sắc thái miễn cưỡng."],
      ["jury-rigged","improvised quickly from available materials","built permanently to a high standard","hidden from public view","designed mainly for decoration","“assembled quickly ... while a permanent arrangement was still being prepared” cho thấy giải pháp ứng biến tạm thời.","Jury-rigged nhấn mạnh việc lắp ghép nhanh từ những gì đang có.","jury-rigged equipment/system","makeshift gần nghĩa; jury-rigged nhấn mạnh hành động lắp ghép ứng biến."],
      ["indefatigable","able to keep working without seeming to tire","frequently absent from work","unwilling to solve difficult problems","easily discouraged by criticism","“after long days ... returned early ... kept solving problems” cho thấy sức bền làm việc phi thường.","Mạnh hơn hard-working: gần như không biết mệt trong nỗ lực kéo dài.","indefatigable worker/efforts","persistent = kiên trì; indefatigable thêm sắc thái năng lượng bền bỉ gần như không cạn."],
      ["pellucid","exceptionally clear and easy to understand","deliberately vague","highly emotional","technically inaccurate","“complicated details became easy to understand” và “plain examples and clear comparisons” diễn giải trực tiếp nghĩa.","Pellucid là từ trang trọng, nhấn mạnh độ rõ ràng nổi bật.","pellucid explanation/prose","clear thông dụng hơn; pellucid trang trọng hơn."],
      ["salutary","beneficial and producing a good effect","harmful over time","purely symbolic","unexpectedly expensive","“producing ... benefits rather than the problems critics had predicted” cho thấy tác động có lợi.","Salutary thường dùng cho effect/lesson/change mang lại tác dụng có ích.","salutary effect/lesson","beneficial gần nghĩa và thông dụng hơn; salutary thường mang sắc thái một tác động có ích hoặc sửa sai."]
    ],
    c1c2:[
      ["perspicacious","quick to notice and understand subtle details","eager to simplify every issue","unable to compare evidence","indifferent to hidden patterns","“noticed patterns that less attentive people missed” cho thấy khả năng nhận ra điều tinh tế.","Perspicacious nhấn mạnh nhận thức và phán đoán sắc bén.","perspicacious observer/analysis","perceptive gần nghĩa; perspicacious trang trọng hơn."],
      ["trenchant","sharp and forcefully effective","vague and indirect","long but uninformative","polite but irrelevant","“concise, forceful and direct enough to expose weak assumptions” giải thích nghĩa của từ.","Trenchant thường dùng cho criticism, analysis, remarks có sức cắt vào vấn đề.","trenchant criticism/analysis","incisive gần nghĩa; trenchant thường mạnh và trực diện hơn."],
      ["diffident","lacking confidence in expressing oneself","aggressively dominant","unusually proud","careless about others","“hesitating before speaking” và mời người trẻ trình bày trước cho thấy sự dè dặt thiếu tự tin.","Diffident không đồng nghĩa thiếu năng lực; nó nói cách thể hiện bản thân.","diffident manner; diffident about doing something","shy thiên về ngại giao tiếp; diffident nhấn mạnh thiếu tự tin khi phát biểu/hành động."],
      ["munificent","extremely generous, especially with resources or money","reluctant to provide support","careful to hide spending","generous only in symbolic ways","“resources on a scale far beyond an ordinary donation” chỉ mức độ hào phóng rất lớn.","Munificent mạnh hơn generous, thường gắn với tài trợ lớn.","munificent donation/gift/patron","generous = hào phóng nói chung; munificent = hào phóng ở quy mô nổi bật."],
      ["intransigent","unwilling to compromise or change a position","easily persuaded by pressure","uncertain about principles","eager to avoid disagreement","“urged them to relax that standard ... they refused to yield” diễn giải trực tiếp việc không chịu nhượng bộ.","Intransigent có thể mang sắc thái cứng rắn; context quyết định đánh giá tích cực hay tiêu cực.","intransigent position/opponent","steadfast thường tích cực; intransigent nhấn mạnh việc không chịu thỏa hiệp."]
    ]
  };

  function passages(key){
    const t=TOPICS[key]||["a community project","a small project team","borrowed equipment and temporary materials","clear benefits for participants","fairness and accuracy"],P=t[0],A=t[1],M=t[2],B=t[3],R=t[4];
    return {
      b1b2:"When "+A+" launched "+P+", many people were initially **chary** of the idea: they hesitated and watched carefully before agreeing to take part. The first setup was **jury-rigged**, assembled quickly from "+M+" while a permanent arrangement was still being prepared. Even so, the coordinator was **indefatigable**; after long days of work, she returned early the next morning and kept solving problems without complaint. Her explanations were unusually **pellucid**: complicated details became easy to understand because she used plain examples and clear comparisons. After several weeks, the project had a **salutary** effect, producing "+B+" rather than the problems critics had predicted.",
      c1c2:"A **perspicacious** observer of "+P+" noticed patterns that less attentive people missed, especially the gap between public enthusiasm and actual behaviour. Her written assessment was **trenchant**: concise, forceful and direct enough to expose weak assumptions in the plan. Curiously, she was personally **diffident**, often hesitating before speaking in meetings and inviting junior members to present first. A **munificent** supporter then provided resources on a scale far beyond an ordinary donation, allowing the team to improve its work without cutting essential activities. Yet the organisers remained **intransigent** about "+R+"; when others urged them to relax that standard for convenience, they refused to yield."
    };
  }
  function addContextGuessing(key,bank){
    if(bank.levelConfig?.[4]?.contextGuessing)return bank;
    const P=passages(key),pools={b1b2:[],c1c2:[]};
    for(const level of ["b1b2","c1c2"]){
      DEF[level].forEach((d,j)=>{
        const target=d[0],correct=d[1],id="fixed-"+key+"-cg-"+level+"-"+(j+1);
        const e={questionId:id,meaning:"“"+target+"” ≈ "+correct+".",why:d[5],usage:d[7],contrast:d[8],family:"",translation:"",inferenceNuance:d[6],mode:"context_guessing",preserve:true,standard:true};
        const q={id,targetId:id,kind:"mcq",type:"context_guessing",q:"Based on the context, “"+target+"” most nearly means:",o:[correct,d[2],d[3],d[4]],a:0,context:P[level],focus:target,targetWord:target};
        const idx=bank.questions.length;bank.questions.push(q);bank.explanations.push(e);bank.explanationById=bank.explanationById||{};bank.explanationById[id]=e;pools[level].push(idx);
      });
    }
    bank.levelConfig[4]={label:"B1–B2 / C1–C2",name:"Context Guessing",note:"Context Guessing",sessionSize:10,contextGuessing:true,levels:{b1b2:{label:"B1–B2",pool:pools.b1b2},c1c2:{label:"C1–C2",pool:pools.c1c2}},pool:pools.b1b2.concat(pools.c1c2)};
    bank.pilotFixedFormat=true;return bank;
  }
  function augment(key,bank){
    bank.explanationById=bank.explanationById||{};
    bank.questions.forEach((q,i)=>{if(!q.id){q.id="fixed-"+key+"-legacy-"+(i+1);q.targetId=q.id}const e=bank.explanations[i]||{};e.questionId=q.id;e.preserve=true;e.standard=true;bank.explanationById[q.id]=e});
    bank.pilotFixedFormat=true;return addContextGuessing(key,bank);
  }

  window.expandGrade12Banks=function(BANKS){
    if(previousExpand)previousExpand(BANKS);
    for(const key of ["9-1","9-2","9-3","9-4","9-5","10-3","12-1","12-2","12-3","12-4","12-5","12-6","12-7"]){
      const bank=BANKS[key];if(!bank)continue;
      if(key==="12-1"&&bank.pilotFixedFormat){addContextGuessing(key,bank);continue}
      if(key==="12-2"&&bank.pilotMixedFormat){BANKS[key]=augment(key,bank);continue}
      BANKS[key]=build(key,bank);
    }
    window.TUTORING_FIXED_FORMAT_READY=true;
  };
})();