/* Single catalogue for pages, lessons and published units.
 * New Vocabulary/Grammar content: add a bank JS file and ONE entry here.
 * Existing banks remain statically loaded until their legacy formatters are migrated.
 */
(function(global){
  "use strict";
  const grades=[
    {id:6,title:"Lớp 6",live:true},
    {id:9,title:"Lớp 9",live:true},{id:10,title:"Lớp 10",live:true},
    {id:11,title:"Lớp 11",live:false},{id:12,title:"Lớp 12",live:true}
  ];
  const vocabulary=[
    {grade:9,id:1,title:"Unit 1",subtitle:"Local Community",bankGlobal:"G9_U1_BANK",source:"grade9-unit1.js"},
    {grade:9,id:2,title:"Unit 2",subtitle:"City Life",bankGlobal:"G9_U2_BANK",source:"grade9-unit2.js"},
    {grade:9,id:3,title:"Unit 3",subtitle:"Healthy Living for Teens",bankGlobal:"G9_U3_BANK",source:"grade9-unit3.js"},
    {grade:9,id:4,title:"Unit 4",subtitle:"Remembering the Past",bankGlobal:"G9_U4_BANK",source:"grade9-unit4.js"},
    {grade:9,id:5,title:"Unit 5",subtitle:"Our Experiences",bankGlobal:"G9_U5_BANK",source:"grade9-unit5.js"},
    {grade:10,id:3,title:"Unit 3",subtitle:"Music",bankGlobal:"G10_U3_BANK",source:"grade10-unit3.js"},
    {grade:12,id:1,title:"Unit 1",subtitle:"Life Stories We Admire",bankGlobal:"G12_U1_SEMANTIC_BANK",source:"grade12-unit1-semantic.js"},
    {grade:12,id:2,title:"Unit 2",subtitle:"A Multicultural World",bankGlobal:"G12_U2_SEMANTIC_BANK",source:"grade12-unit2-semantic.js"},
    {grade:12,id:3,title:"Unit 3",subtitle:"Green Living",bankGlobal:"G12_U3_SEMANTIC_BANK",source:"grade12-unit3-semantic.js"},
    {grade:12,id:4,title:"Unit 4",subtitle:"Urbanization",bankGlobal:"G12_U4_SEMANTIC_BANK",source:"grade12-unit4-semantic.js"},
    {grade:12,id:5,title:"Unit 5",subtitle:"The World of Work",bankGlobal:"G12_U5_SEMANTIC_BANK",source:"grade12-unit5-semantic.js"},
    {grade:12,id:6,title:"Unit 6",subtitle:"Artificial Intelligence",bankGlobal:"G12_U6_SEMANTIC_BANK",source:"grade12-unit6-semantic.js"},
    {grade:12,id:7,title:"Unit 7",subtitle:"The World of Mass Media",bankGlobal:"G12_U7_SEMANTIC_BANK",source:"grade12-unit7-semantic.js"},
    {grade:12,id:8,title:"Ôn lại cơ bản",subtitle:"100% nằm trong vocab đã học",bankGlobal:"G12_BASIC_REVIEW_BANK",source:"grade12-basic-review.js",review:true}
  ];
  const grammar=[
    {slug:"prefix-suffix",title:"Prefix & Suffix",subtitle:"Word building and contextual choice",source:"grammar-prefix-suffix-bank.js",bankGlobal:"GRAMMAR_BANKS"}
  ];
  const units=[
    {grade:6,id:1,title:"Unit 1",subtitle:"My New School",live:true,route:"grade-6/unit-1",type:"lesson-practice"},
    {grade:6,id:2,title:"Unit 2",subtitle:"My Home",live:false,route:"grade-6/unit-2",type:"lesson-practice"},
    {grade:6,id:3,title:"Unit 3",subtitle:"My Friends",live:false,route:"grade-6/unit-3",type:"lesson-practice"},
    ...vocabulary.map(x=>({grade:x.grade,id:x.id,title:x.title,subtitle:x.subtitle,live:true,
      route:"grade-"+x.grade+"/unit-"+x.id,review:!!x.review,type:"vocabulary"})),
    {grade:10,id:99,title:"Mid Term Test",subtitle:"Test 1–6 · 279 câu · Đề gốc & luyện tập",
      live:true,midterm:true,type:"exam",route:"grade-10/mid-term-test"}
  ];
  const pages=[
    {id:"g6-unit1-knowledge",route:"grade-6/unit-1",title:"Unit 1 · Kiến thức",category:"grade6-unit",grade:6,
      kind:"handler",handler:"renderGrade6Unit1",args:["knowledge"],source:"features/grade6-unit1.js?v=20261025-v5",
      dependencies:["content/grade6-unit1-part-a.js?v=20261025-v2","content/grade6-unit1-part-b.js?v=20261025-v3"]},
    {id:"g6-unit1-original",route:"grade-6/unit-1/original",title:"Unit 1 · Bài tập gốc",category:"grade6-unit",grade:6,
      kind:"handler",handler:"renderGrade6Unit1",args:["original"],source:"features/grade6-unit1.js?v=20261025-v5",
      dependencies:["content/grade6-unit1-part-a.js?v=20261025-v2","content/grade6-unit1-part-b.js?v=20261025-v3"]},
    {id:"g6-unit1-practice",route:"grade-6/unit-1/practice",title:"Unit 1 · Luyện tập thêm",category:"grade6-unit",grade:6,
      kind:"handler",handler:"renderGrade6Unit1",args:["practice"],source:"features/grade6-unit1.js?v=20261025-v5",
      dependencies:["content/grade6-unit1-part-a.js?v=20261025-v2","content/grade6-unit1-part-b.js?v=20261025-v3"]},
    {id:"grammar-home",route:"grammar",title:"Grammar",category:"grammar-home",kind:"handler",handler:"renderGrammarHome"},
    {id:"school-g10-home",route:"school/grade-10",title:"Lớp 10",category:"school-home",kind:"handler",handler:"renderSchoolGrade10",source:"school-ui.js?v=20261020-allprint1"},
    {id:"school-g10-midterm1",route:"school/grade-10/midterm-1",title:"Ôn tập giữa kì 1",category:"school-home",kind:"handler",handler:"renderSchoolMidterm1",source:"school-ui.js?v=20261020-allprint1"},
    // Separate lesson-plan catalogue and routes, independent of old Vocabulary Units.
    {id:"g12-lesson-plans-home",route:"grade-12/lesson-plans",title:"Lesson Plans & Practice",
      category:"lesson-plans-home",grade:12,kind:"handler",handler:"renderLessonPlansHome",
      source:"features/lesson-plans.js?v=20261021-compact2",dependencies:["content/lesson-plans-data.js?v=20261020-inline1"]},
    {id:"g12-lesson-plans-unit-7",route:"grade-12/lesson-plans/unit-7",title:"Unit 7 · Bài học & câu hỏi",
      category:"lesson-plans-unit",grade:12,kind:"handler",handler:"renderLessonPlansUnit",
      source:"features/lesson-plans.js?v=20261021-compact2",dependencies:["content/lesson-plans-data.js?v=20261020-inline1"],args:[7]},
    {id:"g12-lesson-plans-unit-7-practice",route:"grade-12/lesson-plans/unit-7/practice",title:"Unit 7 · Luyện tập thêm",
      category:"lesson-plans-unit",grade:12,kind:"handler",handler:"renderLessonPlansPractice",
      source:"features/lesson-plans.js?v=20261021-compact2",dependencies:["content/lesson-plans-data.js?v=20261020-inline1"],args:[7]},
    {id:"g12-lesson-plans-unit-7-print",route:"grade-12/lesson-plans/unit-7/print",title:"Unit 7 · In đề",
      category:"lesson-plans-unit",grade:12,kind:"handler",handler:"renderLessonPlansPrint",
      source:"features/lesson-plans.js?v=20261021-compact2",dependencies:["content/lesson-plans-data.js?v=20261020-inline1"],args:[7]},
    {id:"reading-home",route:"grade-12/reading",title:"Reading",category:"reading-home",grade:12,kind:"handler",handler:"renderMISReadingHome",source:"grade12-reading.js?v=20261021-compact1"},
    {id:"reading-marketing",route:"grade-12/reading/marketing-and-the-information-age",
      title:"Marketing and the Information Age",category:"reading",grade:12,listing:true,questions:14,minutes:25,
      kind:"handler",handler:"renderMISReadingExercise",source:"grade12-reading.js?v=20261021-compact1"},
    {id:"reading-robots",route:"grade-12/reading/robots-and-us",
      title:"Robots and us",category:"reading",grade:12,listing:true,questions:14,minutes:20,
      kind:"handler",handler:"renderRobotsReadingExercise",source:"grade12-robots-reading.js?v=20261021-compact2"},
    {id:"listening-home",route:"listening",title:"Listening",category:"listening-home",kind:"handler",handler:"renderListeningHome",source:"listening-entertainment.js?v=20261021-compact1"},
    {id:"listening-entertainment-home",route:"listening/entertainment",title:"Entertainment",category:"listening-home",kind:"handler",handler:"renderEntertainment",source:"listening-entertainment.js?v=20261021-compact1"},
    {id:"listening-entertainment-habits",route:"listening/entertainment/change-your-life-one-tiny-step-at-a-time",
      title:"Change Your Life",category:"listening",kind:"handler",handler:"renderEntertainmentVideo",source:"listening-entertainment.js?v=20261021-compact1"},
    {id:"listening-news-home",route:"listening/news",title:"News",category:"listening-home",kind:"handler",handler:"renderNews",source:"listening-news.js?v=20261021-compact1"},
    {id:"listening-news-ai",route:"listening/news/former-openai-employee-ai-might-really-kill-us-all",
      title:"Former OpenAI employee",category:"listening",kind:"handler",handler:"renderNewsVideo",source:"listening-news.js?v=20261021-compact1"},
    {id:"grade10-midterm",route:"grade-10/mid-term-test",title:"Grade 10 Mid-term Test",category:"exam",grade:10,kind:"handler",handler:"renderG10MidTermHome",source:"grade10-midterm.js?v=20261022-clean-v2"},
    ...Array.from({length:7},(_,i)=>({id:"school-g10-midterm1-set-"+(i+1),
      route:"school/grade-10/midterm-1/set-"+(i+1),title:"Ôn tập giữa kì 1 · Set "+(i+1),
      category:"school",grade:10,kind:"handler",handler:"renderSchoolSetIntro",source:"school-ui.js?v=20261020-allprint1",args:[i+1]})),
    ...[1,2,3,4,5,6].map(n=>({id:"grade10-midterm-test-"+n,route:"grade-10/mid-term-test/test-"+n,
      title:"Grade 10 Mid-term · Test "+n,category:"exam",grade:10,
      kind:"handler",handler:"renderG10MidTermTest",source:"grade10-midterm.js?v=20261022-clean-v2",args:[n]})),
    ...[1,2,3,4,5,6].map(n=>({id:"grade10-midterm-source-"+n,route:"grade-10/mid-term-test/source-test-"+n,
      title:"Grade 10 Mid-term · Original Test "+n,category:"exam",grade:10,
      kind:"handler",handler:"renderG10MidTermSourceTest",source:"grade10-midterm.js?v=20261022-clean-v2",args:[n]}))
  ];
  const entries=[
    ...grades.map(x=>({id:"grade-"+x.id,route:"grade-"+x.id,title:x.title,
      category:"grade-home",grade:x.id,kind:"grade"})),
    ...vocabulary.map(x=>({id:"vocabulary-"+x.grade+"-"+x.id,
      route:"grade-"+x.grade+"/unit-"+x.id,title:x.title,grade:x.grade,unit:x.id,
      category:"vocabulary-home",kind:"vocabulary-unit"})),
    {id:"grammar-category",route:"grammar",title:"Grammar",category:"grammar-home",kind:"handler",handler:"renderGrammarHome"},
    ...grammar.map(x=>({id:"grammar-"+x.slug,route:"grammar/"+x.slug,title:x.title,
      category:"grammar-unit",slug:x.slug,kind:"grammar-unit"})),
    ...pages.filter(x=>x.route!=="grammar")
  ];
  const loaded=new Map();
  function validate(){
    const seenId=new Set(),seenRoute=new Set(),seenUnit=new Set();
    for(const entry of entries){
      if(!entry.id||!entry.route||!entry.title||seenId.has(entry.id)||seenRoute.has(entry.route))
        throw new Error("Content Manifest: duplicate/invalid ID or route: "+entry.route);
      seenId.add(entry.id);seenRoute.add(entry.route);
    }
    for(const item of vocabulary){
      const key=item.grade+"-"+item.id;
      if(seenUnit.has(key)||!item.source||!item.bankGlobal||!Number.isInteger(item.id))
        throw new Error("Content Manifest: invalid vocabulary unit "+key);
      seenUnit.add(key);
    }
    for(const item of grammar){
      if(!item.slug||!item.source)throw new Error("Content Manifest: invalid grammar source");
    }
    return true;
  }
  function loadedBanks(){
    const result={};
    vocabulary.forEach(x=>{const bank=global[x.bankGlobal];if(bank)result[x.grade+"-"+x.id]=bank});
    return result;
  }
  function vocabularyItem(grade,unit){return vocabulary.find(x=>x.grade===Number(grade)&&x.id===Number(unit))||null}
  function grammarItem(slug){return grammar.find(x=>x.slug===slug)||null}
  function loadScript(source){
    if(loaded.has(source))return loaded.get(source);
    // Only manifest-controlled relative JS files may be loaded.
    if(!/^(?:[a-z0-9_-]+\/)*[a-z0-9_-]+\.js(?:\?v=[a-z0-9_-]+)?$/i.test(source))
      return Promise.reject(new Error("Content Manifest: unsafe script path "+source));
    const promise=new Promise((resolve,reject)=>{
      const tag=document.createElement("script");
      tag.src=source;tag.async=false;
      tag.onload=resolve;tag.onerror=()=>reject(new Error("Không tải được dữ liệu bài học: "+source));
      document.head.appendChild(tag);
    });
    loaded.set(source,promise);
    promise.catch(()=>loaded.delete(source));
    return promise;
  }
  async function ensureBank(item){
    const descriptor=item.kind?.startsWith("grammar")?grammarItem(item.slug):vocabularyItem(item.grade,item.unit);
    if(!descriptor)throw new Error("Không tìm thấy bài học trong Content Manifest");
    if(item.kind?.startsWith("grammar")){
      if(!global.GRAMMAR_BANKS?.[descriptor.slug])await loadScript(descriptor.source);
      const bank=global.GRAMMAR_BANKS?.[descriptor.slug];
      if(!bank)throw new Error("Grammar bank chưa được xuất bản: "+descriptor.slug);
      return bank;
    }
    if(!global[descriptor.bankGlobal])await loadScript(descriptor.source);
    const bank=global[descriptor.bankGlobal];
    if(!bank||!Array.isArray(bank.questions)||!Array.isArray(bank.explanations)||!bank.levelConfig)
      throw new Error("Dữ liệu Vocabulary không hợp lệ: "+descriptor.grade+"-"+descriptor.id);
    return bank;
  }
  // Only a legacy renderer's true prerequisites are loaded, in their original order.
  // All routes for a renderer share this mapping; pages remain declarative.
  const handlerDependencies=Object.freeze({
    "school-ui.js":["school-grade10-midterm1.js","school-grade10-explanations.js"],
    "grade10-midterm.js":[
      "grade10-midterm-data.js?v=20261022-clean-v2","grade10-midterm-explanations.js?v=20261022-clean-v1",
      "grade10-midterm-precision.js?v=20261022-clean-v1","grade10-midterm-reading-details.js?v=20261022-clean-v2",
      "grade10-midterm-quality.js?v=20261022-clean-v2",
      "features/grade10-midterm-progress.js?v=20261021-unified-v1",
      "features/grade10-midterm-six-tests.js?v=20261021-unified-v1",
      "grade10-midterm-firsttwo-data.js",
      "grade10-midterm-test1-notes.js",
      "grade10-midterm-test2-notes.js",
      "grade10-midterm-firsttwo-usage.js",
      "grade10-midterm-firsttwo-context-examples.js",
      "grade10-midterm-firsttwo-explain.js?v=20261022-clean-v2"
    ]
  });
  async function ensureHandler(item){
    if(!item||item.kind!=="handler"||typeof item.handler!=="string")
      throw new Error("Content Manifest: invalid page renderer");
    if(typeof global[item.handler]!=="function"){
      if(!item.source)throw new Error("Page renderer is unavailable: "+item.handler);
      for(const dependency of (item.dependencies||handlerDependencies[item.source.split("?")[0]]||[]))
        await loadScript(dependency);
      await loadScript(item.source);
    }
    if(typeof global[item.handler]!=="function")
      throw new Error("The content file did not export "+item.handler);
    return global[item.handler];
  }
  function matchSetRoute(route){
    let match=route.match(/^grade-(9|10|11|12)\/unit-(\d+)\/vocabulary-practice-(\d+)$/);
    if(match&&vocabularyItem(match[1],match[2]))return {
      kind:"vocabulary-set",grade:Number(match[1]),unit:Number(match[2]),setNo:Number(match[3]),route
    };
    match=route.match(/^grammar\/([^/]+)\/set-(\d+)$/);
    if(match&&grammarItem(match[1]))return {kind:"grammar-set",slug:match[1],setNo:Number(match[2]),route};
    return null;
  }
  validate();
  global.ContentManifest=Object.freeze({
    grades,units,vocabulary,grammar,entries,validate,loadedBanks,
    vocabularyItem,grammarItem,ensureBank,ensureHandler,matchSetRoute
  });
})(window);
