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
    accurate:["precise","incorrect","biased","slow"],efficient:["productive","wasteful","uncertain","manual"],bias:["prejudice","balance","accuracy","privacy"],ethical:["moral","harmful","illegal","automatic"],reliable:["dependable","untrustworthy","temporary","biased"],innovative:["novel","traditional","ordinary","outdated"],transform:["change","preserve","copy","delay"],assist:["help","prevent","ignore","replace"],broadcast:["transmit","hide","delete","store"],journalist:["reporter","viewer","advertiser","editor"],headline:["title","footnote","source","caption"],misleading:["deceptive","accurate","neutral","reliable"],viral:["widely shared","private","unread","temporary"],source:["origin","result","opinion","headline"],
    "circular economy":["a closed-loop system that keeps materials in use","a system based on immediate disposal","a policy that bans all production","a method of increasing landfill use"],
    "carbon sequestration":["long-term capture and storage of carbon","short-term release of carbon","measurement of household waste","pricing of recycled goods"],
    "environmental justice":["fair distribution of environmental benefits and burdens","rapid expansion of industrial land","replacement of environmental laws","private ownership of natural resources"],
    "urban sprawl":["low-density outward expansion of a city","dense redevelopment inside a city centre","temporary closure of city streets","movement from cities to villages"],
    gentrification:["neighbourhood change driven by wealthier residents and rising costs","construction of rural farming zones","decline in public transport use","creation of a new satellite town"],
    walkability:["ease and safety of walking in an area","cost of renting a home","speed of road traffic","distance between two cities"],
    "gig economy":["a labour market based on short-term task-based work","a system of permanent government jobs","a form of unpaid volunteering","a fixed retirement scheme"],
    burnout:["work-related exhaustion caused by prolonged stress","brief excitement before starting work","formal evaluation of job performance","temporary absence for a holiday"],
    "employee retention":["an organisation's ability to keep employees long-term","the process of dismissing all new staff","a method of calculating overtime pay","a short period of job shadowing"],
    "machine learning":["AI systems learning patterns from data","manual programming without data","a rule that limits internet access","storage of files in a database"],
    hallucination:["plausible AI output unsupported by facts or data","a verified model prediction","a method for encrypting training data","a human review process"],
    explainability:["ability to explain why a model produced an output","ability to increase model size","ability to hide training data","ability to automate data entry"],
    "AI governance":["frameworks for managing AI risks, responsibilities and use","a method for training larger neural networks","a system for compressing datasets","a technique for generating images"],
    gatekeeping:["selection of information for publication","automatic translation of a report","measurement of audience size","sale of advertising space"],
    misinformation:["false information shared without necessarily intending to deceive","verified information from an official source","private information protected by law","advertising clearly marked as sponsored"],
    "editorial independence":["newsroom freedom from outside interference","government ownership of every newspaper","automatic publication of all submitted content","a ban on investigative reporting"],
    "source verification":["checking a source's identity, reliability and evidence","rewriting a headline for style","increasing the number of advertisements","measuring social-media engagement"]
  };

  const TOPICS={
    "9-1":["a neighbourhood renewal project","a group of student volunteers","borrowed tables, recycled wood and donated tools","cleaner shared spaces and stronger cooperation","protecting local heritage"],
    "9-2":["a new urban mobility plan","a city transport team","temporary signs, portable barriers and rented sensors","safer streets and shorter journeys","pedestrian safety"],
    "9-3":["a teen wellness programme","a school health team","borrowed exercise mats, printed food guides and a spare classroom","better sleep, healthier routines and lower stress","evidence-based health advice"],
    "9-4":["a local-history exhibition","a group of young museum volunteers","old display boards, borrowed lamps and copied photographs","greater interest in family memories and local history","preserving historical evidence"],
    "9-5":["an outdoor learning expedition","a youth activity team","borrowed tents, improvised signs and shared equipment","more confidence and stronger teamwork","participant safety"],
    "10-3":["a community music festival","a team of young musicians and organisers","borrowed speakers, temporary staging and recycled decorations","more opportunities for young performers and a larger audience","fair treatment of performers"],
    "12-1":["a life-story research project","a team of student biographers","borrowed archives, scanned letters and temporary interview equipment","richer biographical evidence and more careful interpretation","accuracy and respect for the people being studied"],
    "12-2":["an intercultural festival","a student cultural committee","borrowed booths, handmade signs and donated decorations","more respectful cross-cultural contact","respect for cultural identity"],
    "12-3":["a low-waste living campaign","a school environmental club","reused containers, repaired furniture and donated seedlings","less waste and lower resource use","avoiding greenwashing"],
    "12-4":["a neighbourhood redevelopment plan","an urban planning group","temporary maps, portable counters and borrowed survey equipment","better public services and more liveable streets","affordable access to housing and transport"],
    "12-5":["a workplace apprenticeship scheme","a training and recruitment team","shared workstations, borrowed equipment and temporary training rooms","better job skills and clearer career pathways","fair recruitment"],
    "12-6":["an AI-assisted learning project","a team of teachers and student developers","loaned laptops, open-source tools and temporary test accounts","faster feedback and more personalised practice","privacy and human oversight"],
    "12-7":["a student media-literacy newsroom","a group of young reporters and editors","borrowed cameras, free editing tools and a temporary studio","more careful source checking and clearer reporting","accuracy before speed"]
  };

  const CUSTOM_WF={"12-3":{"3":[["Long-term carbon ______ in forests can remove carbon dioxide from the atmosphere.","SEQUESTER","sequestration","sự cô lập/lưu giữ carbon","Trong dài hạn, việc lưu giữ carbon trong rừng có thể loại bỏ carbon dioxide khỏi khí quyển."],["The policy links climate action with environmental ______ for vulnerable communities.","JUST","justice","công lý môi trường","Chính sách gắn hành động khí hậu với công lý môi trường cho các cộng đồng dễ bị tổn thương."],["The city wants to improve energy ______ in public buildings.","EFFICIENT","efficiency","hiệu quả năng lượng","Thành phố muốn cải thiện hiệu quả năng lượng trong các tòa nhà công cộng."]]},"12-4":{"3":[["High urban ______ can make frequent public transport more viable.","DENSE","density","mật độ đô thị","Mật độ đô thị cao có thể giúp giao thông công cộng tần suất cao khả thi hơn."],["The redevelopment plan must protect housing ______ for low-income residents.","AFFORD","affordability","khả năng chi trả nhà ở","Kế hoạch tái phát triển phải bảo vệ khả năng chi trả nhà ở cho cư dân thu nhập thấp."],["The council is considering the ______ of the historic centre.","PEDESTRIAN","pedestrianisation","sự ưu tiên người đi bộ/hạn chế xe cơ giới","Hội đồng đang cân nhắc việc chuyển khu trung tâm lịch sử thành khu ưu tiên người đi bộ."]]},"12-5":{"3":[["Clear career paths can improve employee ______ over time.","RETAIN","retention","khả năng giữ chân nhân viên","Lộ trình nghề nghiệp rõ ràng có thể cải thiện khả năng giữ chân nhân viên theo thời gian."],["An annual performance ______ gives employees structured feedback.","APPRAISE","appraisal","đánh giá hiệu suất","Một kỳ đánh giá hiệu suất hằng năm cung cấp phản hồi có cấu trúc cho nhân viên."],["Rapid technological change makes continuous ______ increasingly important.","SKILL","upskilling","việc nâng cao kỹ năng","Thay đổi công nghệ nhanh khiến việc nâng cao kỹ năng liên tục ngày càng quan trọng."]]},"12-6":{"1":[["The assistant produced a ______ answer that matched the information in the source.","RELY","reliable","đáng tin cậy","Trợ lý tạo ra một câu trả lời đáng tin cậy, phù hợp với thông tin trong nguồn."],["The update improved the app's ______ for students using assistive technology.","ACCESSIBLE","accessibility","khả năng tiếp cận","Bản cập nhật đã cải thiện khả năng tiếp cận của ứng dụng đối với học sinh sử dụng công nghệ hỗ trợ."],["The system saved each file ______ after the task was completed.","AUTOMATIC","automatically","một cách tự động","Hệ thống tự động lưu từng tệp sau khi nhiệm vụ hoàn tất."]],"2":[["The company wants to increase ______ so routine digital tasks require less manual work.","AUTOMATE","automation","mức độ tự động hóa","Công ty muốn tăng mức độ tự động hóa để các tác vụ số thường xuyên cần ít thao tác thủ công hơn."],["The team measured the model's ______ before allowing students to use it.","RELIABLE","reliability","độ tin cậy","Nhóm đã đo độ tin cậy của mô hình trước khi cho phép học sinh sử dụng."],["Clearer instructions helped the system respond more ______ across repeated tests.","CONSISTENT","consistently","một cách nhất quán","Hướng dẫn rõ ràng hơn giúp hệ thống phản hồi nhất quán hơn qua nhiều lần kiểm thử."]],"3":[["Independent model ______ is necessary before high-stakes deployment.","EVALUATE","evaluation","việc đánh giá mô hình","Việc đánh giá mô hình độc lập là cần thiết trước khi triển khai trong tình huống rủi ro cao."],["Researchers test a model's ______ on data it has never seen before.","GENERAL","generalization","khả năng khái quát hóa","Các nhà nghiên cứu kiểm tra khả năng khái quát hóa của mô hình trên dữ liệu mà nó chưa từng thấy."],["Clear audit trails strengthen organisational ______ for AI decisions.","ACCOUNTABLE","accountability","trách nhiệm giải trình","Dấu vết kiểm toán rõ ràng củng cố trách nhiệm giải trình của tổ chức đối với các quyết định AI."]]},"12-7":{"3":[["Source ______ should happen before a serious claim is published.","VERIFY","verification","việc xác minh nguồn tin","Việc xác minh nguồn tin nên diễn ra trước khi một tuyên bố nghiêm trọng được công bố."],["Editorial ______ protects newsroom decisions from outside pressure.","INDEPENDENT","independence","sự độc lập biên tập","Sự độc lập biên tập bảo vệ các quyết định của tòa soạn khỏi áp lực bên ngoài."],["Platforms use content ______ to enforce their community guidelines.","MODERATE","moderation","việc kiểm duyệt/quản lý nội dung","Các nền tảng sử dụng việc quản lý nội dung để thực thi nguyên tắc cộng đồng."]]}};

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

  const VERB_START=new Set(["read","hold","join","judge","reduce","use","grow","change","protect","develop","build","pay","follow","feel","look","be","work","apply","supervise","sort","take","open","place","promote","run","post","access","connect","offer","design","distribute","fact-check","rely","warn","alert","emit","settle","maintain","encourage","migrate","revitalize","improve","control","spread","prevent","experience","transition","align","evaluate","adopt","conduct","introduce","redevelop","make","implement","address","create","achieve","ensure","increase","raise","keep","provide","support"]);
  function usagePhrase(detail){
    let u=String(detail?.usage||"").replace(/^Collocation\/cách dùng:\s*/i,"").replace(/^Collocations?:\s*/i,"").trim();
    if(!u)return "";
    u=u.split(";")[0].replace(/\.$/,"").trim();
    return u.length<=90?u:"";
  }
  function inferPos(detail,a){
    const f=family(detail),term=String(a||"").trim();
    if(f){
      for(const p of f.split("→").map(x=>x.trim())){
        if(p.toLowerCase().includes(term.toLowerCase())){
          if(/\(adv/i.test(p))return "adv";
          if(/\(adj/i.test(p))return "adj";
          if(/\(v/i.test(p))return "v";
          if(/\(n/i.test(p))return "n";
        }
      }
    }
    const first=norm(term).split(" ")[0];
    if(VERB_START.has(first)||/^(get|give|look|work|show|put|draw|pay|run|post|connect|offer|take|carry|cut|fill|remove|settle|migrate|rely|warn|alert)\b/i.test(term))return "v";
    if(/ly$/i.test(term))return "adv";
    if(/(ous|ful|less|able|ible|ive|al|ic|ary|ory|ed)$/i.test(term)&&!term.includes(" "))return "adj";
    return "n";
  }
  function synthContext(key,bank,src,blank){
    blank=blank||"______";
    const a=answer(bank,src),d=bank.explanations[src]||{},g=gloss(bank,src)||a,topic=(TOPICS[key]||["the project"])[0];
    const pos=inferPos(d,a),u=usagePhrase(d),re=a?new RegExp(escReg(a),"i"):null;
    if(u&&re&&re.test(u)){
      const phrase=u.replace(re,blank),first=norm(u).split(" ")[0];
      if(VERB_START.has(first)){
        const soft=["feel","look","be","experience"].includes(first);
        return soft
          ? {text:"During "+topic+", some participants may "+phrase+".",translation:"Trong dự án, một số người tham gia có thể ở trạng thái liên quan đến “"+g+"”."}
          : {text:"As part of "+topic+", participants were asked to "+phrase+".",translation:"Trong dự án, người tham gia được yêu cầu thực hiện hành động liên quan đến “"+g+"”."};
      }
      return {text:"During "+topic+", the discussion focused on "+phrase+".",translation:"Trong dự án, phần thảo luận tập trung vào “"+g+"”."};
    }
    if(pos==="v")return {text:"As "+topic+" developed, the team decided to "+blank+" as part of its plan.",translation:"Khi dự án phát triển, nhóm quyết định "+g+" như một phần của kế hoạch."};
    if(pos==="adj")return {text:"During "+topic+", the situation became increasingly "+blank+".",translation:"Trong dự án, tình hình ngày càng "+g+"."};
    if(pos==="adv")return {text:"During "+topic+", the team handled the task "+blank+".",translation:"Trong dự án, nhóm xử lý nhiệm vụ một cách "+g+"."};
    return {text:"During "+topic+", the team discussed "+blank+" in detail.",translation:"Trong dự án, nhóm đã thảo luận chi tiết về "+g+"."};
  }
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
    const q=bank.questions[src]||{},a=answer(bank,src),text=core(q.q);
    if(!a||!Array.isArray(q.o))return false;
    const generated=/_{2,}/.test(text)
      ? {text:text,translation:translation(key,src,bank.explanations[src]||{})}
      : synthContext(key,bank,src);
    const id=qid(key,set,no);
    add(state,{id:id,targetId:id,kind:"mcq",type:"context",q:generated.text,o:[...q.o],a:q.a},
      explain(bank,key,src,id,undefined,generated.translation),pool);
    return true;
  }
  function synonymQ(bank,key,set,src,no,state,pool){
    const a=answer(bank,src),o=SYN[norm(a)];if(!a||!o)return false;
    const id=qid(key,set,no);add(state,{id,targetId:id,kind:"mcq",type:"synonym",q:"The word/phrase “"+a+"” is closest in meaning to ______.",o:[...o],a:0},explain(bank,key,src,id,"“"+a+"” gần nghĩa nhất với “"+o[0]+"”; các lựa chọn còn lại lệch nghĩa hoặc đối lập về sắc thái.",""),pool);return true;
  }
  function wordFormQ(bank,key,set,src,no,state,pool){
    const q=bank.questions[src]||{},a=answer(bank,src),d=bank.explanations[src]||{},c=cue(d,a),text=core(q.q);
    if(!c||!a||norm(c)===norm(a))return false;
    const generated=/_{2,}/.test(text)
      ? {text:text,translation:translation(key,src,d)}
      : synthContext(key,bank,src);
    const id=qid(key,set,no);
    add(state,{id:id,targetId:id,kind:"input",type:"wordform",q:generated.text+" ("+c.toUpperCase()+")",answers:[a],wordFormCue:c},
      explain(bank,key,src,id,"Từ gợi ý “"+c+"” phải đổi sang “"+a+"” để đúng từ loại và cấu trúc của vị trí chỗ trống.",generated.translation),pool);
    return true;
  }
  function customWordFormQ(key,set,no,slot,state,pool){
    const row=CUSTOM_WF[key]?.[set]?.[slot];
    if(!row)return false;
    const id=qid(key,set,no);
    const q={id:id,targetId:id,kind:"input",type:"wordform",q:row[0]+" ("+row[1]+")",answers:[row[2]],wordFormCue:row[1].toLowerCase()};
    const e={questionId:id,meaning:"“"+row[2]+"” = "+row[3]+".",why:"Từ gợi ý “"+row[1].toLowerCase()+"” phải đổi sang “"+row[2]+"” để đúng từ loại và cấu trúc của câu.",usage:"",contrast:"",family:row[1].toLowerCase()+" → "+row[2],translation:row[4],preserve:true,standard:true};
    add(state,q,e,pool);
    return true;
  }
  const candidates=(bank,pool,test)=>[...new Set([...(pool||[]).filter(test),...bank.questions.map((_,i)=>i).filter(test)])];
  const next=(list,used)=>list.find(i=>!used.has(i));

  function reading(bank,key,set,pool,used,state,targetPool){
    const ordered=[...(pool||[]),...bank.questions.map((_,i)=>i)],all=[];
    for(const i of ordered){
      if(all.includes(i)||!answer(bank,i)||!Array.isArray(bank.questions[i]?.o))continue;
      all.push(i);
    }
    const pick=[];
    for(const i of all){if(!used.has(i)){pick.push(i);if(pick.length===5)break}}
    for(const i of all){if(pick.length>=5)break;if(!pick.includes(i))pick.push(i)}
    if(pick.length<5)return;
    const rows=pick.map((src,j)=>{
      const raw=core(bank.questions[src].q);
      const g=/_{2,}/.test(raw)?{text:raw,translation:translation(key,src,bank.explanations[src]||{})}:synthContext(key,bank,src);
      return {text:g.text.replace(/_{2,}/,"("+(16+j)+") ______"),translation:g.translation};
    });
    const passage=rows.map(x=>x.text).join(" ");
    pick.forEach((src,j)=>{
      const q=bank.questions[src],id=qid(key,set,16+j);
      add(state,{id:id,targetId:id,kind:"mcq",type:"reading",q:"Choose the best option for blank ("+(16+j)+").",o:[...q.o],a:q.a,context:passage,focus:"("+(16+j)+") ______"},
        explain(bank,key,src,id,undefined,rows[j].translation),targetPool);
      used.add(src);
    });
  }

  function build(key,bank){
    const state={questions:[],explanations:[],explanationById:{}},levels={1:[],2:[],3:[]};
    for(const set of [1,2,3]){
      const pool=[...(bank.levelConfig?.[set]?.pool||bank.questions.map((_,i)=>i).slice((set-1)*20,set*20))],used=new Set(),target=levels[set];
      const M=candidates(bank,pool,i=>!!gloss(bank,i));
      const C=candidates(bank,pool,i=>Array.isArray(bank.questions[i]?.o)&&!!answer(bank,i));
      const Y=candidates(bank,pool,i=>!!SYN[norm(answer(bank,i))]);
      const W=candidates(bank,pool,i=>!!cue(bank.explanations[i]||{},answer(bank,i)));
      const plan=["M","C","Y","W","M","C","C","W","Y","C","M","C","W","M","C"];
      let no=1,wfSlot=0;
      for(const type of plan){
        let list=type==="M"?M:type==="C"?C:type==="Y"?Y:W;
        let src=next(list,used),ok=false,usedCustom=false;
        if(type==="W"&&CUSTOM_WF[key]?.[set]?.[wfSlot]){
          ok=customWordFormQ(key,set,no,wfSlot,state,target);
          wfSlot++; usedCustom=ok;
        }else if(src!==undefined){
          ok=type==="M"?meaningQ(bank,key,set,src,no,state,target):type==="C"?contextQ(bank,key,set,src,no,state,target):type==="Y"?synonymQ(bank,key,set,src,no,state,target):wordFormQ(bank,key,set,src,no,state,target);
        }
        if(!ok){
          for(const pair of [["C",C],["M",M],["Y",Y]]){
            src=next(pair[1],used);
            if(src===undefined)continue;
            ok=pair[0]==="C"?contextQ(bank,key,set,src,no,state,target):pair[0]==="Y"?synonymQ(bank,key,set,src,no,state,target):meaningQ(bank,key,set,src,no,state,target);
            if(ok)break;
          }
        }
        if(ok){if(!usedCustom&&src!==undefined)used.add(src);no++}
      }
      while(target.length<15){
        const src=next(M,used);
        if(src===undefined)break;
        if(meaningQ(bank,key,set,src,target.length+1,state,target))used.add(src);else used.add(src);
      }
      reading(bank,key,set,pool,used,state,target);
    }
    const out={grade:bank.grade,unit:bank.unit,title:bank.title,source:bank.source||"",version:(bank.version||1)+10,pilotFixedFormat:true,questions:state.questions,explanations:state.explanations,explanationById:state.explanationById,levelConfig:{1:{label:"A2–B1",name:"Easy",note:"Easy",sessionSize:20,readingTail:true,pool:levels[1]},2:{label:"B1–B2",name:"Intermediate",note:"Intermediate",sessionSize:20,readingTail:true,pool:levels[2]},3:{label:"B2–C1",name:"Hard",note:"Hard",sessionSize:20,readingTail:true,pool:levels[3]}}};
    addContextGuessing(key,out);
    return out;
  }

  // Context Guessing uses a large rotating bank. Grade 12 now has 30 unique topic-linked targets per unit.\n// A session samples adaptively from the combined unit pool with no fixed B1-B2/C1-C2 quota.\n  const CG_CATALOG={
    b1b2:{
      "chary":["cautious and reluctant",["immediately enthusiastic","careless and impulsive","completely unaware"],"At first, people were **{w}** about {P}: they hesitated, watched carefully and delayed agreeing to take part.","The hesitation, careful watching and delayed agreement point to caution plus reluctance.","Chary is uncommon and slightly formal; it often implies both caution and unwillingness.","be chary of/about something","wary is more common; chary more strongly suggests reluctance as well as caution."],
      "jury-rigged":["improvised quickly from available materials",["built permanently to a high standard","hidden from public view","designed mainly for decoration"],"The first setup was **{w}**, assembled quickly from {M} while a permanent arrangement was still being prepared.","Assembled quickly from whatever was available, before a permanent solution existed, directly signals improvisation.","Jury-rigged stresses an improvised construction made from materials at hand.","jury-rigged equipment/system/repair","makeshift is broader; jury-rigged especially suggests something assembled or repaired ingeniously on the spot."],
      "indefatigable":["able to keep working without seeming to tire",["frequently absent from work","easily discouraged by criticism","unwilling to solve difficult problems"],"The coordinator seemed **{w}**: after long days on {P}, she returned early the next morning and kept solving problems without complaint.","Long days followed by an early return and continued effort show exceptional stamina.","Stronger than hard-working: it suggests energy and effort that seem almost impossible to exhaust.","indefatigable worker/campaigner/efforts","persistent means continuing despite difficulty; indefatigable additionally emphasizes tireless energy."],
      "pellucid":["exceptionally clear and easy to understand",["deliberately vague","highly emotional","technically inaccurate"],"Her explanation of {R} was **{w}**: complicated details became easy to understand because she used plain examples and clear comparisons.","The sentence explicitly says complicated details became easy to understand through plain examples.","Pellucid is formal and often used for prose, explanations or reasoning of striking clarity.","pellucid explanation/prose/account","clear is neutral and common; pellucid is more literary/formal and emphasizes remarkable clarity."],
      "salutary":["beneficial and producing a good effect",["harmful over time","purely symbolic","unexpectedly expensive"],"After several weeks, the project had a **{w}** effect, producing {B} rather than the problems critics had predicted.","The contrast with predicted problems and the stated benefits reveals a positive effect.","Often used for an effect, lesson or change that improves a situation or corrects a problem.","salutary effect/lesson/influence","beneficial is broader and common; salutary often implies a useful corrective or improving effect."],
      "tacit":["understood without being openly stated",["formally written and announced","openly disputed by everyone","accidental and unnoticed"],"Within {A}, there was a **{w}** agreement to protect {R}: nobody announced the rule, yet everyone behaved as if it had been accepted.","Nobody stated the rule, but everyone acted as though it existed.","Tacit describes shared understanding communicated indirectly rather than in explicit words.","tacit agreement/approval/understanding","implicit is broader; tacit often concerns agreement, consent or understanding shown through silence or behaviour."],
      "deft":["skilful, quick and effective",["clumsy and slow","stubbornly resistant","secretive and dishonest"],"When a problem threatened {P}, the coordinator made a **{w}** adjustment, solving it quickly without disrupting the rest of the work.","The adjustment solved the problem quickly and smoothly without causing new disruption.","Deft often describes skilful handling, movement, wording or problem-solving.","deft touch/move/handling/response","skillful is general; deft often suggests lightness, speed and precision."],
      "sporadic":["irregular and occurring only from time to time",["continuous and predictable","rapidly increasing","carefully scheduled"],"Early participation in {P} was **{w}**: some days many people appeared, while on other days almost nobody came.","Alternating busy days with almost empty days shows irregular occurrence.","Used for events or activity that appear at scattered, inconsistent intervals.","sporadic outbreaks/attendance/contact","occasional simply means not frequent; sporadic additionally suggests an irregular, scattered pattern."],
      "scant":["barely sufficient or very limited",["abundant and more than enough","precisely measured","completely unusable"],"Evidence for the claim was **{w}**: the team had only two brief observations and no long-term records.","Only two brief observations and no long-term records indicate very little evidence.","Scant means small in amount, often so small that it is inadequate.","scant evidence/information/resources","scarce means hard to obtain; scant focuses on the small amount actually available."],
      "fraught":["filled with difficulty, tension or risk",["simple and completely safe","unrelated to the main issue","delayed for administrative reasons"],"The decision about {R} was **{w}** with risk; one careless choice could undermine the whole project.","The explicit mention of risk and the possibility of serious damage show a tense, difficult situation.","Commonly appears as fraught with + danger/difficulty/tension, or simply a fraught situation.","fraught with danger/difficulty; a fraught meeting","risky focuses on danger; fraught suggests a situation heavily loaded with tension, problems or risk."],
      "dogged":["very persistent despite difficulty",["easily discouraged","careless about details","impatient for quick rewards"],"Despite repeated setbacks, the team remained **{w}**, returning to the task each time instead of giving up.","Repeated setbacks followed by continued effort directly signal stubborn persistence.","Dogged often carries a positive sense of determined persistence, though it can sound stubborn.","dogged determination/persistence/effort","persistent is neutral; dogged emphasizes refusing to quit even when progress is difficult."],
      "austere":["plain and without comfort or decoration",["luxurious and richly decorated","chaotic and disorganized","brightly coloured and festive"],"The temporary workspace was **{w}**, containing only {M}, with no decoration and almost no comfort.","Only basic equipment, no decoration and little comfort define a very plain environment.","Austere may describe places, styles, lifestyles or policies that are severely plain or restrained.","austere room/design/lifestyle","plain is neutral; austere often suggests deliberate severity, restraint or lack of comfort."],
      "salient":["most noticeable or especially relevant",["hidden and insignificant","irrelevant to the discussion","impossible to verify"],"The most **{w}** concern in meetings about {P} was {R}; it appeared repeatedly in questions, notes and feedback.","The issue appears repeatedly and is identified as the main concern.","Salient marks the feature that stands out or matters most in a particular discussion.","salient point/feature/issue","important is broad; salient means especially prominent or relevant in the immediate context."],
      "moot":["no longer practically relevant",["certain to happen soon","secretly controversial","easy to solve"],"Once the original plan became impossible, the argument about its timetable was **{w}** because the schedule could no longer affect what happened.","If the plan cannot happen, debating its timetable has no practical consequence.","In this sense, moot means an issue has become academic or irrelevant in practice.","a moot point/question; render something moot","debatable can be one meaning of moot, but render moot means make something practically irrelevant."],
      "nascent":["only beginning to develop",["fully mature and established","rapidly collapsing","deliberately concealed"],"The initiative was still **{w}**: only a few people had joined, and most procedures were still being created.","Few participants and procedures still being created show an early stage of development.","Nascent is formal and often used for organisations, industries, movements or ideas just emerging.","nascent industry/movement/technology","new is general; nascent emphasizes the earliest stage of formation and development."],
      "piecemeal":["done in separate small stages rather than as one coordinated whole",["comprehensive and coordinated","completed instantly","kept entirely secret"],"Improvements to {P} arrived in a **{w}** way—one small fix at a time rather than through a coordinated plan.","The phrase one small fix at a time, contrasted with a coordinated plan, gives the meaning directly.","Piecemeal often criticizes an approach for being fragmented or lacking overall coordination.","piecemeal reform/change/approach","gradual can be planned and coherent; piecemeal stresses fragmentation."],
      "tenuous":["weak, slight or not strongly supported",["strong and firmly established","obvious to everyone","permanent and irreversible"],"The claimed link between the change and {B} was **{w}**; the evidence was weak and several other explanations were possible.","Weak evidence and multiple alternative explanations show an uncertain connection.","Often used for a connection, argument, claim or hold that lacks strength.","tenuous link/connection/claim","weak is general; tenuous often describes an abstract connection or argument that is barely supported."],
      "arduous":["requiring great effort over a long or difficult process",["effortless and simple","brief and entertaining","routine and predictable"],"Implementing {P} was **{w}**, demanding long hours, repeated revisions and sustained effort from the team.","Long hours, repeated revisions and sustained effort point to a demanding task.","Arduous is stronger and more formal than difficult; it emphasizes sustained effort.","arduous task/journey/process","difficult is broad; arduous specifically suggests exhausting or prolonged effort."],
      "fortuitous":["happening by chance with a useful result",["carefully planned in advance","harmful and unavoidable","repeated at regular intervals"],"A **{w}** encounter with an experienced adviser unexpectedly solved a problem that had delayed {P} for weeks.","The encounter was unexpected and happened to produce a useful result.","Fortuitous primarily means happening by chance; context often makes the chance event beneficial.","fortuitous coincidence/meeting/timing","fortunate means lucky; fortuitous emphasizes chance, though it often carries a favorable result in modern use."],
      "paltry":["disappointingly small or inadequate",["substantial and generous","exactly sufficient","hidden from public view"],"The initial budget for {P} was **{w}**, barely enough to cover the most basic materials.","Barely enough for basic materials shows an amount considered inadequately small.","Paltry is evaluative and often expresses criticism or contempt for a small amount.","paltry sum/amount/pay","small is neutral; paltry implies the amount is embarrassingly or disappointingly inadequate."],
      "fledgling":["new, inexperienced and not yet fully developed",["long-established and highly experienced","permanently closed","large but disorganized"],"The **{w}** team had existed for only a few weeks and was still learning how to organise its work.","Only a few weeks old and still learning clearly signals a new, inexperienced group.","Originally a young bird; figuratively, a new organisation, industry or professional.","fledgling company/team/industry","new is neutral; fledgling highlights inexperience and early development."],
      "viable":["capable of working successfully in practice",["impossible to carry out","unnecessarily expensive","legally compulsory"],"After a small trial, the team concluded that {P} was **{w}**: it could work with the available time, people and resources.","The plan can work with existing constraints, which establishes practical feasibility.","Viable is common in planning, business and policy for options that can realistically succeed.","viable option/solution/business","possible means it can happen; viable means it can work successfully and sustainably in practice."],
      "ramshackle":["poorly built or in bad physical condition",["sturdy and newly constructed","hidden underground","designed for easy transport"],"The first station looked **{w}**: mismatched parts, loose panels and a frame that seemed close to falling apart.","Loose panels, mismatched parts and near-collapse directly describe a badly built structure.","Often describes buildings, vehicles or systems that look unstable and neglected.","ramshackle building/shed/structure","run-down means neglected; ramshackle additionally suggests shaky, badly constructed physical condition."],
      "haphazard":["lacking a clear plan or order",["systematic and carefully organised","deliberately cautious","slow but accurate"],"Early record-keeping was **{w}**, with notes stored in random places and no consistent method for naming files.","Random storage and no consistent method reveal lack of organisation.","Haphazard describes actions or arrangements made without a systematic plan.","haphazard approach/arrangement/method","random concerns chance; haphazard often criticizes poor planning or organisation."],
      "cursory":["quick and lacking careful attention",["thorough and detailed","deliberately secret","highly technical"],"The first review of {P} was **{w}**: it lasted only a few minutes and several obvious problems were overlooked.","A very brief review that misses obvious problems shows insufficient attention.","Cursory usually criticizes a glance, check or examination for being too quick and superficial.","cursory glance/check/examination","brief only describes duration; cursory implies the work was too quick to be careful."],
      "desultory":["lacking a clear plan, purpose or continuous effort",["systematic and sustained","highly successful","strictly confidential"],"Work on {P} became **{w}**: the team jumped from one issue to another, left tasks unfinished and followed no clear sequence.","Jumping between unrelated tasks with no sequence or completion reveals unfocused, disconnected effort.","Desultory often describes conversation, work or activity that wanders without a coherent plan.","desultory discussion/effort/work","haphazard stresses poor organisation; desultory also suggests weak continuity or lack of purposeful momentum."],
      "onerous":["involving a heavy burden of effort, responsibility or cost",["easy to manage","entirely optional","brief and entertaining"],"The reporting requirement became **{w}**, demanding hours of paperwork every week from a very small team.","Hours of recurring paperwork for a small team create a heavy burden.","Onerous is formal and often used for duties, obligations, costs or conditions that impose a significant burden.","onerous duty/requirement/obligation","difficult is broad; onerous specifically emphasizes the burden imposed on someone."],
      "prosaic":["ordinary and lacking imagination or excitement",["highly imaginative","dangerously unpredictable","deeply controversial"],"The final design was surprisingly **{w}**: functional and sensible, but plain enough that nobody found it memorable.","Functional yet plain and unmemorable points to something ordinary rather than imaginative.","Prosaic often contrasts practical ordinariness with creativity, romance or excitement.","prosaic explanation/design/reality","ordinary is neutral; prosaic often carries a mildly disappointed sense of dullness."],
      "staid":["serious, conventional and not adventurous",["wildly experimental","carelessly informal","openly rebellious"],"The organisation had a **{w}** culture: meetings followed old routines, dress was formal and unusual ideas were treated cautiously.","Old routines, formal dress and cautious treatment of unusual ideas indicate a conventional, unadventurous style.","Staid often describes people or institutions that are respectable but conservative and rather dull.","staid institution/style/reputation","conservative is broader; staid suggests sober respectability and lack of excitement."],
      "makeshift":["temporary and created from whatever is available",["permanent and purpose-built","expensive and decorative","hidden and inaccessible"],"Because the proper equipment had not arrived, the team used a **{w}** solution made from spare boards, tape and borrowed tools.","A temporary solution built from available materials directly signals improvisation.","Makeshift is common for temporary rooms, repairs, shelters or solutions assembled out of necessity.","makeshift shelter/solution/repair","jury-rigged emphasizes improvised assembly; makeshift more generally means temporary and improvised."],
      "meagre":["very small in amount and barely adequate",["abundant and generous","precisely calculated","unlimited in supply"],"The evidence was **{w}**: just one short interview and two incomplete records supported the claim.","Only a tiny amount of weak evidence indicates insufficiency.","Meagre often describes income, resources, evidence or portions that are disappointingly small.","meagre resources/evidence/income","scant and meagre are close; meagre often adds a stronger judgment of inadequacy."],
      "wayward":["unpredictable, difficult to control or departing from the expected path",["stable and disciplined","carefully regulated","perfectly predictable"],"One **{w}** part of the process kept behaving differently from week to week, resisting every attempt to make it follow the normal pattern.","Repeated unpredictable deviation from the expected pattern shows something difficult to control.","Wayward can describe behaviour, people, machines or trends that do not reliably follow the expected course.","wayward behaviour/child/trend","erratic stresses irregularity; wayward can imply resistance to control or the expected path."],
      "dwindling":["gradually becoming smaller in amount or number",["rapidly increasing","remaining constant","suddenly disappearing"],"Support for {P} was **{w}**: attendance fell a little each week until only a small group remained.","A steady week-by-week decline directly indicates gradual reduction.","Dwindling commonly describes resources, numbers, support or opportunities that progressively shrink.","dwindling resources/support/numbers","declining is broad; dwindling often suggests the amount is becoming worryingly small."],
      "impromptu":["done without being planned or prepared in advance",["carefully rehearsed","officially scheduled months earlier","repeated as a routine"],"When the venue suddenly closed, the team held an **{w}** meeting in a nearby café with no agenda and no preparation.","No prior plan, agenda or preparation shows spontaneity.","Impromptu often describes speeches, meetings, performances or decisions made on the spot.","impromptu speech/meeting/performance","spontaneous is broader; impromptu specifically means unplanned and arranged or performed immediately."]
    },
    c1c2:{
      "perspicacious":["quick to notice and understand subtle details",["eager to simplify every issue","unable to compare evidence","indifferent to hidden patterns"],"A **{w}** observer of {P} noticed patterns that less attentive people missed, especially the gap between public enthusiasm and actual behaviour.","Noticing patterns missed by less attentive people directly signals sharp perception.","Formal word for unusually perceptive, insightful observation or judgment.","perspicacious observer/analysis/comment","perceptive is common; perspicacious is more formal and strongly emphasizes intellectual insight."],
      "trenchant":["sharp, direct and forcefully effective",["vague and indirect","long but uninformative","polite but irrelevant"],"Her written assessment was **{w}**: concise, forceful and direct enough to expose weak assumptions in the plan.","Concise, forceful and direct criticism that exposes weakness defines trenchant.","Often describes criticism, analysis or remarks that cut directly to the important point.","trenchant criticism/analysis/remarks","incisive is close; trenchant often feels more forceful and confrontational."],
      "diffident":["lacking confidence in expressing oneself",["aggressively dominant","unusually proud of one's expertise","careless about other people's views"],"Although knowledgeable, she was personally **{w}**, hesitating before speaking and often inviting junior members to present first.","Hesitation before speaking despite knowledge signals lack of self-confidence in expression.","Diffident concerns manner and self-expression, not lack of ability.","diffident manner; diffident about doing something","shy is broader social timidity; diffident specifically emphasizes lack of confidence in putting oneself forward."],
      "munificent":["extremely generous, especially with money or resources",["reluctant to provide support","careful to hide spending","generous only in symbolic ways"],"A **{w}** supporter provided resources far beyond an ordinary donation, allowing {P} to expand without cutting essential work.","Resources far beyond an ordinary donation reveal exceptional generosity.","Stronger than generous and often associated with large gifts, patrons or funding.","munificent gift/donation/patron","generous is general; munificent implies conspicuously large-scale generosity."],
      "intransigent":["unwilling to compromise or change a position",["easily persuaded by pressure","uncertain about basic principles","eager to avoid disagreement"],"The organisers remained **{w}** about {R}; when others urged them to relax that standard for convenience, they refused to yield.","Refusing to yield after pressure to compromise is a direct clue.","Often has a critical tone because it stresses refusal to compromise, though context can make the principle admirable.","intransigent position/opponent; remain intransigent","steadfast is usually positive; intransigent specifically emphasizes unwillingness to compromise."],
      "assiduous":["showing persistent, careful and sustained effort",["casually interested","frequently absent","satisfied with superficial work"],"The project benefited from an **{w}** coordinator who checked progress every day, followed up unresolved issues and rarely left details unfinished.","Daily checking, follow-up and careful completion show sustained diligence.","Formal word for diligent attention maintained over time.","assiduous worker/research/attention","diligent is common; assiduous is more formal and emphasizes continuous attentive effort."],
      "equivocal":["ambiguous or deliberately unclear",["completely explicit","strongly supportive","obviously false"],"When asked whether {R} would be protected, the official gave an **{w}** reply—neither a clear yes nor a clear no.","Neither yes nor no makes the reply ambiguous.","Often describes statements, evidence or responses that permit more than one interpretation.","equivocal answer/evidence/position","ambiguous is neutral; equivocal often suggests hesitation, evasiveness or unwillingness to commit."],
      "parsimonious":["extremely unwilling to spend or use resources",["lavishly generous","carelessly wasteful","unable to calculate costs"],"The committee was **{w}** with funding, approving only the bare minimum even when additional resources would clearly improve {P}.","Approving only the bare minimum despite a clear need indicates extreme unwillingness to spend.","More critical and formal than economical; it often implies excessive stinginess.","parsimonious with money/resources; parsimonious budget","frugal can be positive and sensible; parsimonious usually criticizes excessive economy."],
      "perfunctory":["done with minimal effort or attention",["thorough and painstaking","innovative and experimental","emotionally intense"],"The safety review was **{w}**: it lasted only minutes, boxes were ticked mechanically and important questions were never examined.","A rushed box-ticking review with no real examination shows minimal attention.","Perfunctory actions are performed as a routine obligation, without genuine care or interest.","perfunctory check/review/apology","brief only describes length; perfunctory criticizes superficial effort and lack of care."],
      "obdurate":["stubbornly refusing to change one's view or behaviour",["readily persuaded","uncertain and hesitant","carefully neutral"],"Even after new evidence and repeated appeals, the manager remained **{w}**, rejecting every proposal without reconsidering the original decision.","New evidence and repeated appeals fail to change the decision, showing stubborn resistance.","Strongly negative word for hard, unyielding stubbornness.","obdurate opponent/refusal; remain obdurate","intransigent often concerns a position in negotiation; obdurate stresses hard-hearted stubborn refusal to change."],
      "circumspect":["careful to consider risks before acting or speaking",["recklessly spontaneous","openly hostile","unable to make decisions"],"Before announcing changes to {P}, the team was **{w}**, checking possible consequences and avoiding promises it could not guarantee.","Checking consequences and avoiding premature promises show cautious judgment.","Formal positive word for prudent, guarded behaviour in uncertain situations.","circumspect approach/response; be circumspect about","cautious is general; circumspect suggests deliberate consideration of many possible risks and consequences."],
      "sagacious":["showing wise and farsighted judgment",["technically inexperienced","narrowly self-interested","easily confused"],"A **{w}** adviser predicted a problem months before it appeared and recommended a modest change that later prevented major disruption.","Foresight plus sound judgment that prevents a later problem indicates wisdom.","Literary/formal word for wise practical judgment, especially based on experience.","sagacious advice/leader/decision","wise is broad; sagacious often highlights shrewd, farsighted practical judgment."],
      "profligate":["recklessly wasteful with money or resources",["extremely economical","carefully transparent","moderately generous"],"The early phase was **{w}** in its use of materials, discarding usable supplies and replacing equipment that could easily have been repaired.","Discarding usable supplies and replacing repairable equipment shows reckless waste.","Strongly critical word for wasteful spending or use of resources.","profligate spending/use; a profligate government","wasteful is general; profligate suggests conspicuous, reckless excess."],
      "obfuscatory":["intended or tending to make something harder to understand",["exceptionally transparent","brief but accurate","emotionally persuasive"],"The report used **{w}** language, burying a simple issue beneath jargon and long sentences until readers struggled to see the main point.","Jargon and long sentences that hide a simple issue show language that obscures understanding.","Usually critical; often implies that complexity may be deliberate rather than accidental.","obfuscatory language/tactics","complex language may be difficult unintentionally; obfuscatory language obscures or clouds meaning."],
      "fastidious":["very attentive to detail and demanding high standards",["careless about accuracy","satisfied with rough work","unable to finish tasks"],"The editor was **{w}** about records, checking every label, date and source before allowing the material to be published.","Checking every small detail before approval indicates exacting standards.","Can be positive for meticulous care or mildly negative for excessive fussiness.","fastidious about detail/cleanliness; fastidious standards","meticulous stresses precision; fastidious can also imply being hard to satisfy."],
      "deleterious":["causing harm or damage",["strongly beneficial","merely decorative","difficult to measure"],"The shortcut had a **{w}** effect on {P}: errors increased, trust fell and several participants stopped taking part.","Increased errors, lower trust and withdrawal show harmful consequences.","Formal adjective frequently used in academic writing for harmful effects.","deleterious effect/impact/consequences","harmful is general; deleterious is formal and often used for gradual or systemic damage."],
      "ameliorative":["making a bad situation better",["making the problem worse","hiding the problem temporarily","leaving conditions unchanged"],"The revised policy proved **{w}**, reducing the main problems and improving access without creating serious new costs.","Reduced problems and improved access indicate an improving effect.","Formal academic adjective related to ameliorate, meaning improve an undesirable condition.","ameliorative measure/effect/policy","beneficial is broad; ameliorative specifically means improving an existing problem."],
      "inexorable":["continuing or advancing in a way that cannot easily be stopped",["easily reversible","brief and unpredictable","entirely voluntary"],"Pressure for change seemed **{w}**: despite repeated attempts to delay it, the demand kept growing month after month.","Repeated attempts fail to stop a continuing trend.","Often used for processes, pressure, decline, growth or movement that feels unstoppable.","inexorable rise/decline/pressure","inevitable means certain to happen; inexorable emphasizes relentless continuation or advance."],
      "quixotic":["idealistic but impractical",["cynically self-interested","carefully evidence-based","modest and easily achievable"],"The proposal was **{w}**: its goal was admirable, but it required resources the team did not have and assumed obstacles would simply disappear.","Admirable intention combined with unrealistic assumptions and missing resources signals impractical idealism.","Often describes noble ambitions that are unrealistic in practice.","quixotic plan/quest/ambition","idealistic may be positive; quixotic adds the judgment that the idealism is impractical."],
      "recondite":["difficult to understand because it is highly specialised or obscure",["widely familiar","deliberately entertaining","obviously incorrect"],"The technical section was **{w}**, full of specialised concepts that even well-informed non-experts struggled to understand.","Specialised concepts difficult for informed non-experts indicate obscurity.","Formal word for knowledge or writing accessible mainly to specialists.","recondite subject/argument/knowledge","technical may simply be specialised; recondite strongly emphasizes obscurity and difficulty."],
      "laconic":["using very few words",["needlessly repetitive","highly emotional","deliberately misleading"],"Asked for a detailed explanation, the director gave a **{w}** reply: 'Not yet. More evidence needed.'","A very short reply to a request for detail directly indicates extreme brevity.","Laconic often implies concise, restrained speech, sometimes appearing dry or abrupt.","laconic reply/style/comment","concise is usually positive efficiency; laconic emphasizes striking brevity and may sound terse."],
      "magnanimous":["generous and forgiving, especially toward a rival",["vindictive after disagreement","unwilling to share credit","secretly resentful"],"After winning the dispute, the leader was **{w}**, praising the opposing team and publicly sharing credit for the final improvement.","Praising opponents and sharing credit after winning shows generosity of spirit.","Often describes noble generosity toward someone one could have treated harshly.","magnanimous gesture/victory/response","generous can concern resources; magnanimous especially concerns gracious treatment of rivals or defeated opponents."],
      "capricious":["changing suddenly and unpredictably without clear reason",["stable and rule-based","carefully negotiated","strict but consistent"],"Participants found the rules **{w}** because requirements changed suddenly from week to week with no explanation.","Sudden unexplained changes from week to week show unpredictability.","Often negative; used for decisions, rules, moods or authorities that seem arbitrary.","capricious decision/rules/behaviour","unpredictable is neutral; capricious often suggests arbitrary changes based on whim."],
      "myopic":["focused on the short term while ignoring wider consequences",["strategically farsighted","carefully impartial","unusually innovative"],"The decision was **{w}**: it saved a little money immediately but ignored larger costs that would emerge the following year.","Immediate savings are prioritized while later costs are ignored.","Figurative extension of short-sighted; common in policy and business criticism.","myopic policy/view/decision","short-term describes time horizon; myopic criticizes failure to see broader or longer-term consequences."],
      "specious":["appearing convincing or true but actually misleading",["obviously absurd","fully supported by evidence","deliberately incomplete"],"The argument sounded persuasive at first, but it was **{w}**: its main claim depended on evidence that disappeared when the figures were checked closely.","An initially persuasive argument collapses under scrutiny, showing only superficial plausibility.","Specious is formal and often describes arguments, reasoning or excuses that look convincing but are false or misleading.","specious argument/reasoning/claim","plausible may genuinely be possible; specious only appears plausible and is actually unsound."],
      "inimical":["harmful or hostile to something",["strongly supportive of","unrelated to","temporarily inconvenient for"],"A policy that discouraged participation and reduced trust was clearly **{w}** to {B}, because it undermined the very outcome the project was meant to achieve.","Undermining the desired outcome shows a harmful relationship.","Inimical is formal and commonly followed by to, especially in analytical writing.","inimical to growth/trust/progress","harmful is general; inimical often describes a condition, policy or force fundamentally opposed to another goal."],
      "meretricious":["superficially attractive but lacking real value or quality",["plain but highly effective","deeply researched","technically sophisticated"],"The proposal looked impressive with polished graphics and fashionable slogans, yet its analysis was **{w}**, offering little substance beneath the surface.","An attractive surface combined with very little substance directly signals shallow value.","Meretricious is strongly critical and often targets flashy presentation that disguises poor substance.","meretricious display/argument/appeal","superficial means lacking depth; meretricious adds the idea of showy attractiveness used to impress."],
      "jejune":["dull, simplistic or lacking intellectual substance",["subtle and sophisticated","carefully balanced","emotionally moving"],"The discussion of {R} was **{w}**, reducing a complicated issue to a few obvious slogans and ignoring every difficult trade-off.","Oversimplifying a complex issue into obvious slogans shows intellectual thinness.","Jejune can mean dull or immaturely simplistic, especially in ideas, writing or discussion.","jejune argument/prose/discussion","simple can be clear and effective; jejune implies shallow, immature or uninteresting simplicity."],
      "unctuous":["excessively flattering or ingratiating in an insincere way",["openly hostile","calmly objective","awkwardly shy"],"The spokesperson became **{w}**, praising every questioner extravagantly and agreeing with them in a way that sounded more calculated than sincere.","Excessive praise and calculated agreement suggest insincere flattery.","Unctuous is strongly negative and usually describes manner, speech or behaviour that feels oily and ingratiating.","unctuous manner/tone/speech","flattering can be sincere; unctuous implies excessive, insincere charm used to win favour."],
      "procrustean":["forcing different cases into one rigid standard",["flexible and tailored","deliberately experimental","completely unregulated"],"The new rule was **{w}**, requiring every team to follow exactly the same procedure even when their resources, goals and constraints were completely different.","One rigid procedure imposed on very different cases reveals forced uniformity.","Procrustean is a rare formal adjective for systems that impose artificial uniformity regardless of individual differences.","procrustean rule/system/approach","standardized may be neutral; procrustean criticizes rigid standardization that distorts real differences."],
      "sclerotic":["rigid, slow to change and resistant to adaptation",["highly flexible","rapidly expanding","temporarily disorganized"],"The institution had become **{w}**: outdated procedures remained untouched for years, and even small reforms were blocked by layers of resistance.","Outdated procedures plus strong resistance to reform indicate institutional rigidity.","Borrowed metaphorically from medicine; common in commentary about bureaucracies, institutions and systems that cannot adapt.","sclerotic institution/system/bureaucracy","rigid is general; sclerotic often implies long-term institutional stagnation and inability to adapt."],
      "disingenuous":["not fully honest or sincere, especially while pretending to be",["completely candid","openly confused","deliberately humorous"],"It was **{w}** to claim that nobody had raised concerns when the meeting notes clearly recorded several objections.","The claim contradicts documented objections, suggesting insincere pretence rather than simple error.","Disingenuous often describes statements that hide knowledge or motives while presenting an innocent appearance.","disingenuous claim/argument/response","dishonest is broad; disingenuous often involves pretending not to know or intend something one actually does."],
      "recalcitrant":["stubbornly resisting authority, control or change",["eager to cooperate","uncertain about instructions","too inexperienced to participate"],"A **{w}** department ignored repeated instructions, resisted every new procedure and continued using the old system despite direct orders to change.","Repeated resistance to instructions and authority directly signals defiance.","Recalcitrant is formal and often used for people, groups or problems that resist control or reform.","recalcitrant employee/group/problem","stubborn is broad; recalcitrant specifically emphasizes resistance to authority, rules or change."],
      "peremptory":["commanding and allowing no discussion or refusal",["tentative and open-ended","friendly and collaborative","confused and hesitant"],"The chair gave a **{w}** instruction: 'Stop the discussion now. Submit the final version by five. No further debate.'","The order is abrupt, authoritative and explicitly closes off discussion.","Peremptory describes commands, tones or behaviour that are imperious and not open to challenge.","peremptory order/tone/dismissal","firm can still allow discussion; peremptory conveys abrupt authority and no room for refusal."],
      "mendacious":["habitually or deliberately dishonest",["scrupulously truthful","merely mistaken","carefully neutral"],"The report proved **{w}**: its authors had knowingly altered figures and repeated claims they already knew were false.","Knowing alteration of figures and repetition of known falsehoods indicate deliberate dishonesty.","Mendacious is a formal, strong word for lying or untruthful behaviour.","mendacious claim/account/person","false describes information; mendacious describes deliberate or habitual lying."],
      "pusillanimous":["showing a shameful lack of courage or determination",["bold and resolute","patient and methodical","carefully diplomatic"],"Faced with mild criticism, the board made a **{w}** retreat, abandoning a defensible policy simply to avoid a difficult conversation.","Abandoning a defensible position merely to avoid mild criticism suggests cowardice rather than prudence.","Pusillanimous is very formal and strongly disapproving; it means timid in a way seen as contemptible.","pusillanimous decision/retreat/leadership","cautious can be sensible; pusillanimous condemns an excessive lack of courage."]
    }
  };

  const CG_TOPIC_WORDS={
    "9-1":{
      b1b2:["chary","jury-rigged","dogged","tacit","piecemeal","salient","scant","fledgling","arduous","deft","salutary","sporadic","cursory","onerous","makeshift","dwindling"],
      c1c2:["perspicacious","trenchant","munificent","intransigent","assiduous","circumspect","magnanimous","equivocal","perfunctory","myopic","ameliorative","obdurate","disingenuous","recalcitrant","peremptory","specious"]
    },
    "9-2":{
      b1b2:["viable","piecemeal","fraught","salient","scant","tenuous","arduous","deft","nascent","moot","sporadic","salutary","haphazard","wayward","onerous","dwindling","impromptu"],
      c1c2:["inexorable","deleterious","myopic","circumspect","trenchant","perspicacious","capricious","ameliorative","obfuscatory","fastidious","equivocal","quixotic","sclerotic","procrustean","specious","inimical","peremptory"]
    },
    "9-3":{
      b1b2:["salutary","arduous","tenuous","sporadic","tacit","scant","dogged","chary","salient","paltry","viable","fledgling","meagre","onerous","dwindling","cursory"],
      c1c2:["deleterious","assiduous","circumspect","equivocal","perfunctory","inexorable","myopic","ameliorative","fastidious","trenchant","perspicacious","obdurate","inimical","jejune","disingenuous","specious"]
    },
    "9-4":{
      b1b2:["austere","salient","scant","tenuous","piecemeal","tacit","fledgling","arduous","fortuitous","deft","chary","moot","prosaic","staid","cursory","meagre","dwindling"],
      c1c2:["recondite","perspicacious","trenchant","equivocal","circumspect","assiduous","obfuscatory","laconic","fastidious","magnanimous","intransigent","quixotic","jejune","meretricious","disingenuous","mendacious","specious"]
    },
    "9-5":{
      b1b2:["arduous","dogged","scant","chary","fraught","fortuitous","deft","jury-rigged","sporadic","tenuous","salutary","fledgling","wayward","onerous","makeshift","impromptu"],
      c1c2:["circumspect","assiduous","capricious","inexorable","magnanimous","perspicacious","trenchant","obdurate","myopic","equivocal","perfunctory","deleterious","recalcitrant","peremptory","inimical","pusillanimous"]
    },
    "10-3":{
      b1b2:["fledgling","deft","sporadic","paltry","arduous","dogged","fortuitous","salient","tenuous","chary","tacit","austere","prosaic","staid","impromptu","cursory","dwindling","wayward"],
      c1c2:["diffident","munificent","perspicacious","trenchant","fastidious","magnanimous","assiduous","capricious","equivocal","perfunctory","intransigent","laconic","unctuous","meretricious","jejune","peremptory","disingenuous","pusillanimous"]
    },
    "12-1":{
      b1b2:["dogged","arduous","indefatigable","fortuitous","scant","chary","salient","fledgling","tacit","salutary","deft","austere","cursory","meagre","staid","onerous","dwindling","impromptu"],
      c1c2:["perspicacious","trenchant","diffident","munificent","intransigent","assiduous","magnanimous","obdurate","laconic","circumspect","quixotic","equivocal","disingenuous","mendacious","pusillanimous","recalcitrant","peremptory","specious"]
    },
    "12-2":{
      b1b2:["tacit","chary","salient","tenuous","sporadic","piecemeal","deft","salutary","fledgling","scant","fortuitous","austere","prosaic","staid","impromptu","cursory","meagre"],
      c1c2:["circumspect","magnanimous","intransigent","perspicacious","trenchant","equivocal","myopic","obfuscatory","assiduous","munificent","perfunctory","capricious","unctuous","disingenuous","recalcitrant","peremptory","specious"]
    },
    "12-3":{
      b1b2:["salutary","piecemeal","viable","tenuous","scant","salient","fledgling","arduous","jury-rigged","tacit","chary","dogged","meagre","dwindling","onerous","haphazard","makeshift","cursory"],
      c1c2:["deleterious","ameliorative","inexorable","myopic","parsimonious","profligate","circumspect","obfuscatory","equivocal","trenchant","perspicacious","quixotic","inimical","procrustean","sclerotic","specious","disingenuous","mendacious"]
    },
    "12-4":{
      b1b2:["viable","piecemeal","fraught","salient","scant","tenuous","arduous","nascent","moot","sporadic","paltry","salutary","haphazard","dwindling","onerous","wayward","cursory"],
      c1c2:["inexorable","myopic","deleterious","ameliorative","circumspect","perspicacious","trenchant","parsimonious","capricious","equivocal","obdurate","quixotic","sclerotic","procrustean","inimical","recalcitrant","specious"]
    },
    "12-5":{
      b1b2:["arduous","dogged","fledgling","scant","paltry","tacit","chary","salient","sporadic","viable","deft","fraught","onerous","meagre","cursory","dwindling","staid","haphazard"],
      c1c2:["assiduous","diffident","munificent","intransigent","perfunctory","fastidious","circumspect","equivocal","myopic","magnanimous","parsimonious","trenchant","recalcitrant","peremptory","disingenuous","mendacious","pusillanimous","unctuous"]
    },
    "12-6":{
      b1b2:["nascent","tenuous","salient","piecemeal","viable","scant","fraught","chary","deft","salutary","moot","sporadic","haphazard","cursory","wayward","onerous","dwindling","prosaic"],
      c1c2:["recondite","obfuscatory","perspicacious","trenchant","equivocal","circumspect","deleterious","ameliorative","inexorable","myopic","fastidious","perfunctory","specious","procrustean","sclerotic","disingenuous","mendacious","jejune"]
    },
    "12-7":{
      b1b2:["sporadic","salient","scant","tenuous","tacit","fraught","deft","chary","fledgling","piecemeal","moot","salutary","cursory","meagre","wayward","impromptu","prosaic","dwindling"],
      c1c2:["trenchant","equivocal","obfuscatory","perfunctory","circumspect","perspicacious","laconic","deleterious","myopic","capricious","intransigent","fastidious","specious","disingenuous","mendacious","unctuous","meretricious","jejune"]
    }
  };


  // === GRADE 12 EXPANDED CONTEXT BANK START ===
  // 30 unique topic-linked targets per Grade 12 unit (210 unique targets total).
  // Level labels are metadata only: a session samples adaptively from the combined unit pool.
  const G12_CONTEXT_EXPANDED={"12-1":{"b1b2":[["resilient","able to recover quickly after difficulty"],["tenacious","very determined and unwilling to give up"],["diligent","careful and hard-working"],["steadfast","firm and loyal despite pressure"],["selfless","putting other people's needs before one's own"],["visionary","having original ideas about how the future could be improved"],["pioneering","introducing new ideas or methods for the first time"],["resourceful","good at finding clever practical solutions"],["humble","not showing excessive pride in one's achievements"],["courageous","showing bravery in a difficult or dangerous situation"],["exemplary","serving as an excellent example to others"],["influential","having a strong effect on people or events"],["determined","having a firm intention to achieve something"],["compassionate","showing concern for people who are suffering"],["accomplished","highly skilled and successful"]],"c1c2":[["indefatigable","able to keep working without seeming to tire"],["magnanimous","generous and forgiving, especially toward a rival"],["perspicacious","quick to notice and understand subtle details"],["assiduous","showing great care and persistent effort"],["intrepid","fearless and adventurous in difficult situations"],["altruistic","motivated by concern for other people's welfare rather than personal gain"],["redoubtable","formidable and deserving respect because of strength or ability"],["sagacious","showing wise and perceptive judgment"],["stoic","enduring pain or difficulty without complaining"],["audacious","boldly willing to take unusual risks"],["indomitable","impossible to defeat or discourage"],["prodigious","remarkably great in amount, degree, or ability"],["illustrious","famous and highly respected because of notable achievements"],["conscientious","careful to do one's work or duties properly"],["unwavering","not changing in determination or support"]]},"12-2":{"b1b2":[["diverse","including people or things of many different types"],["inclusive","welcoming and allowing different groups to participate"],["bilingual","able to use two languages"],["heritage","traditions, culture, and history passed down through generations"],["identity","the qualities and affiliations that shape how a person or group sees itself"],["tolerance","willingness to accept beliefs or practices different from one's own"],["assimilate","to become absorbed into the dominant culture"],["integrate","to become part of a larger society while participating in it"],["coexist","to live or exist together peacefully"],["diaspora","a population dispersed from its original homeland"],["cosmopolitan","having an international and culturally varied character"],["multicultural","involving several cultural groups"],["cross-cultural","involving comparison or interaction between different cultures"],["open-minded","willing to consider unfamiliar ideas fairly"],["community-minded","concerned with the interests of the local community"]],"c1c2":[["pluralistic","allowing multiple groups, beliefs, or ways of life to coexist"],["acculturation","cultural change resulting from contact with another culture"],["ethnocentric","judging other cultures by the standards of one's own culture"],["syncretic","combining elements from different cultural or religious traditions"],["intercultural","involving communication or exchange between cultures"],["xenophobic","showing fear or hostility toward foreigners"],["assimilationist","favoring absorption into a dominant culture"],["heterogeneity","the state of being varied or diverse"],["hybridity","the mixing of different cultural influences into new forms"],["transnational","extending across national borders"],["diasporic","relating to communities dispersed from an ancestral homeland"],["cosmopolitanism","the outlook that people belong to a broader global community"],["polyglot","a person who speaks several languages"],["cultural relativism","the principle of understanding a culture in its own context"],["homogenization","the process of becoming increasingly similar"]]},"12-3":{"b1b2":[["sustainable","able to continue without exhausting resources or causing severe environmental harm"],["renewable","naturally replenished and usable again"],["biodegradable","able to break down naturally by biological processes"],["conserve","to protect something from waste or loss"],["recycle","to process used material so it can be used again"],["emissions","gases or substances released into the environment"],["footprint","the environmental impact produced by an activity or person"],["eco-friendly","causing relatively little harm to the environment"],["reusable","designed to be used many times"],["compostable","able to break down into compost under suitable conditions"],["depletion","the reduction of a resource because it is being used up"],["conservation","the protection and careful management of natural resources"],["biodiversity","the variety of living species in an area"],["circular economy","a system that keeps materials in use through reuse, repair, and recycling"],["energy-efficient","using less energy to perform the same task"]],"c1c2":[["deleterious","causing harm or damage"],["ameliorative","making a bad situation better"],["anthropogenic","caused by human activity"],["decarbonize","to reduce or eliminate carbon dioxide emissions from an activity"],["sequestration","the capture and long-term storage of carbon dioxide"],["mitigation","action that reduces the severity of a harmful problem"],["remediation","the process of repairing environmental damage or contamination"],["regenerative","restoring and improving natural systems rather than merely reducing harm"],["carbon-neutral","producing no net increase in carbon dioxide emissions"],["resource-intensive","requiring large amounts of materials, energy, or water"],["ecocentric","placing ecological systems at the center of moral concern"],["degradation","the process of becoming damaged or reduced in quality"],["profligate","recklessly wasteful in the use of resources"],["parsimonious","extremely sparing in the use of resources or money"],["ecological resilience","the ability of an ecosystem to recover after disturbance"]]},"12-4":{"b1b2":[["urban sprawl","the uncontrolled outward spread of a city"],["infrastructure","basic systems and facilities needed for a city to function"],["migration","movement of people from one place to another"],["congestion","overcrowding of roads or urban systems"],["affordable housing","housing that people on ordinary incomes can reasonably pay for"],["population density","the number of people living in a given area"],["metropolitan","relating to a large city and its surrounding urban area"],["suburb","a residential area on the edge of a city"],["informal settlement","a residential area built without full legal planning or secure services"],["commuter","a person who regularly travels between home and work"],["redevelopment","the process of rebuilding or improving an urban area"],["displacement","the forced movement of people from their homes or area"],["overcrowded","containing more people than a space can comfortably support"],["amenities","useful or pleasant facilities available in an area"],["zoning","rules that control how land in different areas may be used"]],"c1c2":[["gentrification","neighbourhood change driven by wealthier residents and investment, often displacing poorer residents"],["agglomeration","the concentration of people or businesses in one area"],["peri-urban","located in the transition zone between city and countryside"],["megacity","a very large city with more than ten million inhabitants"],["densification","the process of increasing the number of people or buildings in an existing urban area"],["municipal","relating to a city or local government"],["spatial inequality","unequal access to resources or opportunities across different locations"],["transit-oriented development","urban development concentrated around public transport"],["exurban","located beyond the suburbs but still economically linked to a city"],["conurbation","a large continuous urban area formed when towns or cities grow together"],["demographic transition","a long-term shift in birth and death rates as societies develop"],["deindustrialization","the decline of industrial activity in an area"],["decentralization","the movement of activities or authority away from a central location"],["encroachment","gradual intrusion into land or space that was previously protected or unused"],["residential segregation","the separation of population groups into different residential areas"]]},"12-5":{"b1b2":[["employable","having skills and qualities that make someone suitable for work"],["apprenticeship","a period of learning a skilled job through supervised work and training"],["internship","a short period of work experience, often for students or graduates"],["workload","the amount of work a person has to do"],["promotion","advancement to a higher position at work"],["redundancy","loss of a job because the position is no longer needed"],["freelance","working independently for different clients rather than one employer"],["recruit","to find and hire new workers"],["retain","to keep employees instead of losing them"],["transferable skills","abilities useful across different jobs and industries"],["upskill","to develop additional or more advanced job skills"],["reskill","to learn new skills for a different type of job"],["productivity","the amount of useful output produced from given inputs"],["flexible working","work arrangements that vary in time or location"],["occupation","a person's job or profession"]],"c1c2":[["precarious employment","work that is insecure, unstable, or poorly protected"],["remunerative","providing financial reward or payment"],["vocational","related to practical preparation for a particular job"],["attrition","gradual reduction in staff because people leave and are not replaced"],["underemployment","a situation in which someone works less than they want or below their skill level"],["occupational mobility","movement between jobs, occupations, or career levels"],["meritocratic","based on ability and achievement rather than status or connections"],["hierarchical","organized in levels of authority or rank"],["contingent workforce","workers employed on temporary, contract, or non-permanent arrangements"],["moonlighting","doing a second job in addition to one's main job"],["entrepreneurial","showing initiative in creating or developing business opportunities"],["workplace autonomy","the degree of independence employees have in deciding how to do their work"],["credentialism","excessive reliance on formal qualifications as proof of ability"],["deskilling","the reduction of skill required to perform a job"],["laborious","requiring a great deal of time and effort"]]},"12-6":{"b1b2":[["algorithm","a set of rules or steps used to solve a problem or process information"],["automated","controlled or carried out by machines or software rather than people"],["autonomous","able to operate or make some decisions independently"],["dataset","a collection of data used for analysis or training"],["bias","a systematic tendency that produces unfair or distorted results"],["chatbot","software designed to conduct conversation with users"],["prompt","an instruction or input given to an AI system"],["inference","the process of using a trained model to produce an output"],["machine learning","a method in which systems learn patterns from data"],["neural network","a computing model made of interconnected processing units inspired loosely by the brain"],["deploy","to put a system into real-world use"],["accuracy","the degree to which results are correct"],["privacy","the protection of personal information from unwanted access or use"],["surveillance","close monitoring of people's activities or behaviour"],["synthetic data","artificially generated data designed to resemble real data"]],"c1c2":[["opaque model","a model whose internal reasoning is difficult to inspect or understand"],["explainable AI","AI designed so humans can understand the reasons behind its outputs"],["probabilistic","expressing outcomes in terms of likelihood rather than certainty"],["hallucination","a plausible-sounding AI output that is not supported by facts or input data"],["adversarial attack","a deliberately crafted input intended to make an AI system fail"],["multimodal","able to process or combine more than one type of data"],["generative AI","AI that creates new content such as text, images, or audio"],["discriminative model","a model that predicts labels or distinctions between categories"],["emergent behavior","a capability that appears unexpectedly as a complex system scales"],["alignment","the effort to make AI behavior conform to intended human goals and values"],["interpretability","the degree to which humans can understand how a model reaches a result"],["data provenance","information about where data came from and how it was collected or changed"],["robust","able to continue performing well despite noise, variation, or stress"],["scalable","able to handle growth in users, data, or workload without breaking down"],["anthropomorphic","describing non-human systems as if they had human qualities"]]},"12-7":{"b1b2":[["headline","the title of a news story designed to summarize or attract attention"],["broadcast","to transmit a programme by television, radio, or online media"],["audience","the people who watch, read, or listen to media content"],["subscription","an arrangement to pay regularly for access to content"],["viral","spreading extremely quickly online"],["credible","believable and trustworthy"],["misinformation","false or inaccurate information shared without necessarily intending to deceive"],["sensational","designed to provoke strong excitement or shock, often by exaggerating"],["editorial","an article or statement expressing the opinion of a publication"],["coverage","the reporting of an event or issue by the media"],["platform","a digital service through which content is published or shared"],["engagement","the level of interaction users have with media content"],["journalist","a person who gathers and reports news"],["source","a person, document, or record that provides information for a report"],["streaming","delivering audio or video over the internet as it is watched or heard"]],"c1c2":[["disinformation","false information deliberately created or spread to deceive"],["clickbait","online content with a misleading or exaggerated title designed to attract clicks"],["polarization","the process of dividing people into strongly opposed groups"],["agenda-setting","the media's influence on which issues people regard as important"],["framing","the way media presentation shapes how an issue is interpreted"],["gatekeeping","the process of deciding which information reaches an audience"],["echo chamber","an environment where people mostly encounter views similar to their own"],["amplification","the process of increasing the reach or visibility of a message"],["virality","the tendency of online content to spread rapidly from user to user"],["punditry","public commentary by experts or opinion figures, especially in the media"],["propagandistic","designed to influence opinion through one-sided or manipulative messaging"],["defamatory","containing false statements that damage someone's reputation"],["tabloidization","the shift toward sensational, simplified, entertainment-focused news"],["media literacy","the ability to evaluate and interpret media messages critically"],["astroturfing","creating a false appearance of grassroots public support"]]}};
  const G12_CONTEXT_TOPIC_LABELS={"12-1":"Life Stories We Admire","12-2":"A Multicultural World","12-3":"Green Living","12-4":"Urbanisation","12-5":"The World of Work","12-6":"Artificial Intelligence","12-7":"The World of Mass Media"};
  Object.entries(G12_CONTEXT_EXPANDED).forEach(function([key,levels]){
    const topicWords={b1b2:[],c1c2:[]};
    for(const level of ["b1b2","c1c2"]){
      const entries=levels[level]||[];
      entries.forEach(function(entry,i){
        const word=entry[0],meaning=entry[1];
        const distractors=[1,2,3].map(function(step){return entries[(i+step)%entries.length][1]});
        const topicLabel=G12_CONTEXT_TOPIC_LABELS[key]||"this topic";
        CG_CATALOG[level][word]=[
          meaning,
          distractors,
          "In a passage about {P}, **{w}** is used in a situation whose surrounding details point to "+meaning+".",
          "The surrounding details point to the idea “"+meaning+"”.",
          "In this unit, the word is interpreted through contextual evidence rather than prior memorisation.",
          "Common in discussions of "+topicLabel+".",
          "Choose it when the context specifically supports “"+meaning+"”; the other options describe different ideas from the same topic."
        ];
        topicWords[level].push(word);
      });
    }
    CG_TOPIC_WORDS[key]=topicWords;
  });
  // === GRADE 12 EXPANDED CONTEXT BANK END ===

  function cgSentence(key,word,row){
    const t=TOPICS[key]||["a community project","a small project team","borrowed equipment and temporary materials","clear benefits for participants","fairness and accuracy"];
    const vars={P:t[0],A:t[1],M:t[2],B:t[3],R:t[4],w:word};
    return String(row[2]||"").replace(/\{([PAMBRw])\}/g,function(_,k){return vars[k]||""});
  }

  function addContextGuessing(key,bank){
    const topic=CG_TOPIC_WORDS[key]||CG_TOPIC_WORDS["9-1"];
    const pools={b1b2:[],c1c2:[]};
    bank.explanationById=bank.explanationById||{};
    for(const level of ["b1b2","c1c2"]){
      const words=topic[level]||[];
      words.forEach(function(word){
        const row=CG_CATALOG[level][word];
        if(!row)return;
        const id="cg-"+key+"-"+level+"-"+word.replace(/[^a-z0-9]+/gi,"-").toLowerCase();
        const sentence=cgSentence(key,word,row);
        const e={
          questionId:id,
          meaning:"“"+word+"” ≈ "+row[0]+".",
          why:row[3],
          usage:row[5],
          contrast:row[6],
          family:"",
          translation:"",
          inferenceNuance:row[4],
          mode:"context_guessing",
          preserve:true,
          standard:true
        };
        const q={
          id:id,targetId:id,kind:"mcq",type:"context_guessing",
          q:"Based on the context, “"+word+"” most nearly means:",
          o:[row[0]].concat(row[1]),a:0,
          context:sentence,contextSentence:sentence,focus:word,targetWord:word,contextLevelLabel:level==="b1b2"?"B1–B2":"C1–C2"
        };
        const idx=bank.questions.length;
        bank.questions.push(q);
        bank.explanations.push(e);
        bank.explanationById[id]=e;
        pools[level].push(idx);
      });
    }
    const bankSize=pools.b1b2.length+pools.c1c2.length;
    bank.levelConfig[4]={
      label:"B1–B2 / C1–C2",name:"Context Guessing",note:"Context Guessing",
      sessionSize:10,bankSize:bankSize,contextGuessing:true,
      levels:{
        b1b2:{label:"B1–B2",pool:pools.b1b2},
        c1c2:{label:"C1–C2",pool:pools.c1c2}
      },
      pool:pools.b1b2.concat(pools.c1c2)
    };
    bank.contextGuessingBank={topic:key,bankSize:bankSize,b1b2:pools.b1b2.length,c1c2:pools.c1c2.length};
    bank.pilotFixedFormat=true;
    return bank;
  }

  function augment(key,bank){
    bank.explanationById=bank.explanationById||{};
    bank.questions.forEach((q,i)=>{if(!q.id){q.id="fixed-"+key+"-legacy-"+(i+1);q.targetId=q.id}if(q.kind==="input"&&!q.wordFormCue){const m=String(q.q||"").match(/\(([^()]+)\)\s*$/);if(m)q.wordFormCue=m[1].toLowerCase()}const e=bank.explanations[i]||{};e.questionId=q.id;e.preserve=true;e.standard=true;bank.explanationById[q.id]=e});
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