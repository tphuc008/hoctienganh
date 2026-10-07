(function(){
"use strict";

var NEWS_VIDEO_ID="79l9u2T-1lo";
var NEWS_VIDEO_TITLE="Former OpenAI employee: 'Yes, AI might really kill us all'";
var NEWS_VIDEO_SLUG="former-openai-employee-ai-might-really-kill-us-all";
var NEWS_VIDEOS=[
  {id:NEWS_VIDEO_ID,slug:NEWS_VIDEO_SLUG,title:NEWS_VIDEO_TITLE,channel:"CNN",thumbnail:"https://i.ytimg.com/vi/"+NEWS_VIDEO_ID+"/hqdefault.jpg"}
];

var newsPlayer=null;
var activeNewsPart=1;

var NEWS_PARTS=[
  {
    id:1,
    label:"Phần 1",
    approx:"Khoảng 6 phút",
    start:0,
    end:375,
    questions:[
      {id:1,type:"mc",time:8,prompt:"What does the former OpenAI researcher say lawmakers should do first?",options:["Speed up AI investment","Slow the pace of AI progress","Ban all current AI systems"],answer:"B"},
      {id:2,type:"fill",time:27,prompt:"More than a thousand AI employees signed an ______ calling for slower development.",answerText:"open letter",answers:["open letter"]},
      {id:3,type:"mc",time:48,prompt:"Why does the researcher think AI progress may accelerate further?",options:["AI systems are beginning to automate AI research itself.","Governments are reducing spending on human researchers.","Companies are sharing all of their models with competitors."],answer:"A"},
      {id:4,type:"fill",time:68,prompt:"AI systems are being trained to conduct ______ on their own.",answerText:"research experiments",answers:["research experiments"]},
      {id:5,type:"mc",time:90,prompt:"What does the researcher predict could happen within roughly one or two years?",options:["Most AI companies will stop training new models.","AI research could largely be carried out by AI rather than humans.","Congress will have completed comprehensive AI legislation."],answer:"B"},
      {id:6,type:"fill",time:111,prompt:"In the predicted future, research could be done by ______ instead of humans.",answerText:"AIs",answers:["AIs","AI"]},
      {id:7,type:"mc",time:133,prompt:"How certain is the researcher about the exact amount of time lawmakers have?",options:["He says the deadline is exactly two years.","He says there is uncertainty, but action should come sooner rather than later.","He believes Congress has at least a decade."],answer:"B"},
      {id:8,type:"fill",time:154,prompt:"He dismisses the company's response as a ______.",answerText:"corporate PR statement",answers:["corporate PR statement"]},
      {id:9,type:"mc",time:175,prompt:"What does he say AI companies are not prepared to do safely?",options:["Automate AI research and trigger recursive self-improvement","Publish research papers for the public","Hire enough software engineers"],answer:"A"},
      {id:10,type:"fill",time:196,prompt:"The researcher calls ______ an inherently dangerous process.",answerText:"recursive self-improvement",answers:["recursive self-improvement"]},
      {id:11,type:"mc",time:217,prompt:"How does he respond to the argument that slowing U.S. development would let another country get ahead?",options:["He says the risk should simply be ignored.","He says domestic companies should first be brought under control while international negotiations begin.","He says only private companies should negotiate."],answer:"B"},
      {id:12,type:"fill",time:238,prompt:"He says the first step is to control their ______.",answerText:"own companies",answers:["own companies"]},
      {id:13,type:"mc",time:259,prompt:"Why could an AI system help someone work on a dangerous biological project?",options:["It can physically conduct laboratory experiments by itself.","It has broad knowledge across many fields and can supply expertise.","It can legally purchase restricted equipment."],answer:"B"},
      {id:14,type:"fill",time:279,prompt:"The researcher says AI systems are very ______ across many fields.",answerText:"broadly knowledgeable",answers:["broadly knowledgeable"]},
      {id:15,type:"mc",time:300,prompt:"According to the explanation, what would a human still need to provide?",options:["Hands-on experiments and equipment","A new internet connection","A public scientific license"],answer:"A"},
      {id:16,type:"fill",time:320,prompt:"A human paired with AI might complete work they previously lacked the ______ to do.",answerText:"expertise",answers:["expertise"]},
      {id:17,type:"mc",time:341,prompt:"What kind of incident is cited as evidence of AI acting independently?",options:["An AI system refusing to answer a user","AI agents hacking third-party infrastructure","A company accidentally deleting training data"],answer:"B"},
      {id:18,type:"fill",time:361,prompt:"The agents carried out what was described as a concentrated ______.",answerText:"hacking spree",answers:["hacking spree"]}
    ]
  },
  {
    id:2,
    label:"Phần 2",
    approx:"Khoảng 6 phút",
    start:375,
    end:747,
    questions:[
      {id:19,type:"mc",time:378,prompt:"What probability does a current AI employee reportedly assign to AI killing all humans within the next decade?",options:["Less than one percent","Greater than ten percent","More than fifty percent"],answer:"B"},
      {id:20,type:"fill",time:398,prompt:"The commentator says the story is not mainly about ______.",answerText:"evil AI",answers:["evil AI"]},
      {id:21,type:"mc",time:418,prompt:"What does Scott Galloway identify as the central problem?",options:["A shortage of computing power","Mediocre political leadership","A lack of consumer interest in AI"],answer:"B"},
      {id:22,type:"fill",time:438,prompt:"He argues that there is no effective ______ overseeing this area.",answerText:"regulatory body",answers:["regulatory body"]},
      {id:23,type:"mc",time:458,prompt:"Why does Galloway think some apocalyptic AI rhetoric may be exaggerated?",options:["It can generate publicity and support fundraising.","Scientists have proved advanced AI is harmless.","The technology has stopped improving."],answer:"A"},
      {id:24,type:"fill",time:478,prompt:"He says some catastrophizing may be connected to ______.",answerText:"fundraising",answers:["fundraising"]},
      {id:25,type:"mc",time:498,prompt:"How does Galloway characterize the international AI race?",options:["As a harmless competition between software products","As a dangerous situation in which everyone has an interest in cooperation","As a race that can only be solved by one country winning"],answer:"B"},
      {id:26,type:"fill",time:518,prompt:"Countries have a mutually vested interest in ______ on major risks.",answerText:"cooperating",answers:["cooperating"]},
      {id:27,type:"mc",time:538,prompt:"What does Galloway say may be prioritized over concerns about AI risks?",options:["Academic research","Shareholder value","Public education"],answer:"B"},
      {id:28,type:"fill",time:558,prompt:"He specifically refers to the prioritization of ______.",answerText:"shareholder value",answers:["shareholder value"]},
      {id:29,type:"mc",time:579,prompt:"What does he say about earlier predictions of a large AI-driven job collapse?",options:["They have already been fully confirmed.","The predicted job apocalypse has not occurred as claimed.","They were never discussed by AI leaders."],answer:"B"},
      {id:30,type:"fill",time:599,prompt:"He describes exaggerated claims about technology as ______.",answerText:"techno-narcissism",answers:["techno-narcissism","techno narcissism"]},
      {id:31,type:"mc",time:619,prompt:"Why does CNN say some suspicious biological queries may not necessarily have been malicious?",options:["They could have related to legitimate scientific work such as vaccine development.","The users were all government scientists.","The AI model refused every biological question."],answer:"A"},
      {id:32,type:"fill",time:639,prompt:"One legitimate scientific purpose mentioned is ______.",answerText:"vaccine development",answers:["vaccine development"]},
      {id:33,type:"mc",time:659,prompt:"What does Galloway argue should happen if even a fraction of the stated risk is real?",options:["AI products should face meaningful independent review.","Private firms should regulate themselves without oversight.","All AI research should immediately move overseas."],answer:"A"},
      {id:34,type:"fill",time:679,prompt:"He proposes review by a ______ of highly qualified people.",answerText:"blue ribbon panel",answers:["blue ribbon panel"]},
      {id:35,type:"mc",time:699,prompt:"What broader pattern does Galloway criticize in the technology industry?",options:["Companies privatize gains while society absorbs the risks.","Governments receive all profits from new technology.","Consumers control the largest AI companies."],answer:"A"},
      {id:36,type:"fill",time:719,prompt:"He says companies privatize the upside and the ______.",answerText:"shareholder gains",answers:["shareholder gains"]},
      {id:37,type:"mc",time:736,prompt:"How does Galloway ultimately describe the lack of effective oversight?",options:["A temporary marketing problem","A failure of governance and leadership","A technical problem that engineers alone can solve"],answer:"B"}
    ]
  }
];

var newsState={};
NEWS_PARTS.forEach(function(part){
  newsState[part.id]={submitted:false,answersVisible:false,results:{}};
});

function newsEsc(value){
  return String(value==null?"":value).replace(/[&<>"']/g,function(ch){
    return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch];
  });
}
function newsNorm(value){
  return String(value||"").toLowerCase().replace(/[–—-]/g," ").replace(/[^a-z0-9\s']/g," ").replace(/\s+/g," ").trim();
}
function getNewsPart(id){
  return NEWS_PARTS.find(function(p){return p.id===Number(id);});
}
function getNewsQuestion(partId,qid){
  var part=getNewsPart(partId);
  return part&&part.questions.find(function(q){return q.id===Number(qid);});
}
function newsQuestionHtml(part,q){
  var body="";
  if(q.type==="mc"){
    body='<div class="listening-options">'+q.options.map(function(opt,i){
      var letter=String.fromCharCode(65+i);
      return '<label class="listening-option"><input type="radio" name="news-p'+part.id+'-q-'+q.id+'" value="'+letter+'"><span><b>'+letter+'.</b> '+newsEsc(opt)+'</span></label>';
    }).join("")+'</div>';
  }else{
    var words=String(q.answerText||"").trim().split(/\s+/).filter(Boolean).length;
    body='<input class="listening-fill" id="news-p'+part.id+'-input-'+q.id+'" autocomplete="off" spellcheck="false" placeholder="Điền đúng '+words+' từ"><div class="listening-fill-note">Cần điền đúng '+words+' từ từ audio</div>';
  }
  var typeLabel=q.type==="mc"?"Multiple Choice":"Note Completion · "+String(q.answerText||"").trim().split(/\s+/).filter(Boolean).length+" từ";
  return '<article class="listening-q" id="news-p'+part.id+'-q-'+q.id+'" data-part="'+part.id+'" data-qid="'+q.id+'">'+
    '<div class="listening-q-top"><span class="listening-q-num">QUESTION '+q.id+'</span><span class="listening-q-type">'+typeLabel+'</span></div>'+
    '<div class="listening-prompt">'+newsEsc(q.prompt)+'</div>'+body+
    '<div class="listening-status" id="news-p'+part.id+'-status-'+q.id+'"></div>'+
    '<div class="listening-answer" id="news-p'+part.id+'-answer-'+q.id+'"></div>'+
  '</article>';
}
function newsPartHtml(part){
  return '<section class="listening-part '+(part.id===1?"active":"")+'" id="newsPart'+part.id+'">'+
    '<div class="listening-part-head"><h2>'+newsEsc(part.label)+'</h2><span class="listening-progress" id="newsProgress'+part.id+'">0 / '+part.questions.length+' answered</span></div>'+
    '<div class="listening-q-list">'+part.questions.map(function(q){return newsQuestionHtml(part,q);}).join("")+'</div>'+
    '<div class="listening-actions">'+
      '<div class="listening-actions-left"><div class="listening-score" id="newsScore'+part.id+'">Chưa nộp</div><div class="listening-score-note" id="newsScoreNote'+part.id+'">Đáp án chỉ được hiện khi bạn chủ động bấm “Hiện đáp án”.</div></div>'+
      '<div class="listening-actions-btns">'+
        '<button class="secondary" type="button" id="newsShowAnswers'+part.id+'" style="display:none" onclick="toggleNewsAnswers('+part.id+')">Hiện đáp án</button>'+
        '<button class="secondary" type="button" onclick="resetNewsListening('+part.id+')">Làm lại phần</button>'+
        '<button class="primary" type="button" id="newsSubmit'+part.id+'" onclick="submitNewsListening('+part.id+')">Nộp đáp án</button>'+
      '</div>'+
    '</div>'+
  '</section>';
}

function ensureNewsYouTubeApi(){
  if(window.YT&&window.YT.Player)return Promise.resolve();
  if(window.__listeningYTApiPromise)return window.__listeningYTApiPromise;
  window.__listeningYTApiPromise=new Promise(function(resolve){
    var old=window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady=function(){
      if(typeof old==="function"){try{old();}catch(e){}}
      resolve();
    };
    if(!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')){
      var tag=document.createElement("script");
      tag.src="https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }
  });
  return window.__listeningYTApiPromise;
}
function initNewsPlayer(){
  ensureNewsYouTubeApi().then(function(){
    var mount=document.getElementById("newsListeningPlayer");
    if(!mount)return;
    newsPlayer=new YT.Player("newsListeningPlayer",{
      videoId:NEWS_VIDEO_ID,
      playerVars:{playsinline:1,rel:0,modestbranding:1,origin:location.origin}
    });
    window.newsListeningPlayer=newsPlayer;
  });
}
function seekNewsQuestion(partId,qid){
  var q=getNewsQuestion(partId,qid);
  if(!q)return;
  var target=Math.max(0,q.time-3);
  if(newsPlayer&&typeof newsPlayer.seekTo==="function"){
    newsPlayer.seekTo(target,true);
    if(typeof newsPlayer.playVideo==="function")newsPlayer.playVideo();
  }
  if(window.innerWidth<901){
    var card=document.getElementById("news-p"+partId+"-q-"+qid);
    if(card)card.scrollIntoView({behavior:"smooth",block:"center"});
  }
}
function readNewsAnswer(part,q){
  if(q.type==="mc"){
    var checked=document.querySelector('input[name="news-p'+part.id+'-q-'+q.id+'"]:checked');
    return checked?checked.value:"";
  }
  var input=document.getElementById("news-p"+part.id+"-input-"+q.id);
  return input?input.value:"";
}
function newsCorrect(q,value){
  if(q.type==="mc")return value===q.answer;
  var v=newsNorm(value);
  return q.answers.some(function(a){return newsNorm(a)===v;});
}
function newsAnswerLabel(q){
  if(q.type==="mc"){
    var idx=q.answer.charCodeAt(0)-65;
    return q.answer+". "+q.options[idx];
  }
  return q.answerText;
}
function updateNewsProgress(partId){
  var part=getNewsPart(partId);
  if(!part)return;
  var answered=part.questions.filter(function(q){return readNewsAnswer(part,q).trim()!=="";}).length;
  var el=document.getElementById("newsProgress"+part.id);
  if(el)el.textContent=answered+" / "+part.questions.length+" answered";
}
function submitNewsPart(partId){
  var part=getNewsPart(partId);
  if(!part)return;
  var st=newsState[part.id];
  st.submitted=true;
  st.answersVisible=false;
  st.results={};
  var correct=0;
  part.questions.forEach(function(q){
    var value=readNewsAnswer(part,q);
    var ok=newsCorrect(q,value);
    st.results[q.id]=ok;
    if(ok)correct++;
    var card=document.getElementById("news-p"+part.id+"-q-"+q.id);
    var status=document.getElementById("news-p"+part.id+"-status-"+q.id);
    if(card){
      card.classList.remove("correct","wrong");
      card.classList.add(ok?"correct":"wrong");
    }
    if(status)status.textContent=ok?"✓ Đúng":"✕ Sai · Bấm vào câu này để nghe lại";
    document.querySelectorAll('input[name="news-p'+part.id+'-q-'+q.id+'"]').forEach(function(el){el.disabled=true;});
    var fill=document.getElementById("news-p"+part.id+"-input-"+q.id);
    if(fill)fill.disabled=true;
    var ans=document.getElementById("news-p"+part.id+"-answer-"+q.id);
    if(ans){ans.classList.remove("show");ans.textContent="";}
  });
  var score=document.getElementById("newsScore"+part.id);
  var note=document.getElementById("newsScoreNote"+part.id);
  var showBtn=document.getElementById("newsShowAnswers"+part.id);
  var submitBtn=document.getElementById("newsSubmit"+part.id);
  if(score)score.textContent=correct+" / "+part.questions.length+" correct";
  if(note)note.textContent="Câu sai vẫn chưa hiện đáp án. Bấm vào câu màu đỏ để nghe lại đúng đoạn.";
  if(showBtn){showBtn.style.display="inline-flex";showBtn.textContent="Hiện đáp án";}
  if(submitBtn){submitBtn.textContent="Đã nộp";submitBtn.disabled=true;}
  var streakAnswered=part.questions.filter(function(q){return readNewsAnswer(part,q).trim()!=="";}).length;
  if(streakAnswered===part.questions.length&&typeof window.recordTutoringActivity==="function")window.recordTutoringActivity("listening_news_part");
  var firstWrong=part.questions.find(function(q){return !st.results[q.id];});
  if(firstWrong){
    var c=document.getElementById("news-p"+part.id+"-q-"+firstWrong.id);
    if(c)c.scrollIntoView({behavior:"smooth",block:"center"});
  }
}
function toggleNewsPartAnswers(partId){
  var part=getNewsPart(partId);
  if(!part)return;
  var st=newsState[part.id];
  if(!st.submitted)return;
  st.answersVisible=!st.answersVisible;
  part.questions.forEach(function(q){
    var ans=document.getElementById("news-p"+part.id+"-answer-"+q.id);
    if(!ans)return;
    ans.textContent="Đáp án: "+newsAnswerLabel(q);
    ans.classList.toggle("show",st.answersVisible);
  });
  var btn=document.getElementById("newsShowAnswers"+part.id);
  if(btn)btn.textContent=st.answersVisible?"Ẩn đáp án":"Hiện đáp án";
}
function resetNewsPart(partId){
  var part=getNewsPart(partId);
  if(!part)return;
  newsState[part.id]={submitted:false,answersVisible:false,results:{}};
  part.questions.forEach(function(q){
    var card=document.getElementById("news-p"+part.id+"-q-"+q.id);
    if(card)card.classList.remove("correct","wrong");
    document.querySelectorAll('input[name="news-p'+part.id+'-q-'+q.id+'"]').forEach(function(el){el.disabled=false;el.checked=false;});
    var fill=document.getElementById("news-p"+part.id+"-input-"+q.id);
    if(fill){fill.disabled=false;fill.value="";}
    var status=document.getElementById("news-p"+part.id+"-status-"+q.id);
    if(status)status.textContent="";
    var ans=document.getElementById("news-p"+part.id+"-answer-"+q.id);
    if(ans){ans.textContent="";ans.classList.remove("show");}
  });
  var score=document.getElementById("newsScore"+part.id);
  var note=document.getElementById("newsScoreNote"+part.id);
  var showBtn=document.getElementById("newsShowAnswers"+part.id);
  var submitBtn=document.getElementById("newsSubmit"+part.id);
  if(score)score.textContent="Chưa nộp";
  if(note)note.textContent="Đáp án chỉ được hiện khi bạn chủ động bấm “Hiện đáp án”.";
  if(showBtn)showBtn.style.display="none";
  if(submitBtn){submitBtn.textContent="Nộp đáp án";submitBtn.disabled=false;}
  updateNewsProgress(part.id);
}
function switchNewsPart(partId){
  activeNewsPart=Number(partId);
  document.querySelectorAll("#newsListeningQuestionPanel .listening-part").forEach(function(el){el.classList.remove("active");});
  document.querySelectorAll("#newsListeningQuestionPanel .listening-part-tab").forEach(function(el){el.classList.remove("active");});
  var part=document.getElementById("newsPart"+activeNewsPart);
  var tab=document.getElementById("newsPartTab"+activeNewsPart);
  if(part)part.classList.add("active");
  if(tab)tab.classList.add("active");
  var panel=document.getElementById("newsListeningQuestionPanel");
  if(panel)panel.scrollTop=0;
}
function bindNewsWorkspace(){
  var panel=document.getElementById("newsListeningQuestionPanel");
  if(!panel)return;
  panel.addEventListener("input",function(e){
    var card=e.target.closest(".listening-q");
    if(card)updateNewsProgress(card.dataset.part);
  });
  panel.addEventListener("change",function(e){
    var card=e.target.closest(".listening-q");
    if(card)updateNewsProgress(card.dataset.part);
  });
  panel.addEventListener("click",function(e){
    var card=e.target.closest(".listening-q");
    if(!card)return;
    var partId=Number(card.dataset.part);
    if(!newsState[partId]||!newsState[partId].submitted||!card.classList.contains("wrong"))return;
    if(e.target.closest("button"))return;
    seekNewsQuestion(partId,card.dataset.qid);
  });
}
function destroyNewsPlayer(){
  if(newsPlayer&&typeof newsPlayer.destroy==="function"){try{newsPlayer.destroy();}catch(e){}}
  newsPlayer=null;
  window.newsListeningPlayer=null;
}

function renderNews(){
  var mount=document.getElementById("pageMount");
  if(!mount)return;
  mount.style.display="block";
  mount.innerHTML=
    '<div class="breadcrumbs"><button class="crumb-btn" onclick="goAreaHome()">Home</button><span>›</span><button class="crumb-btn" onclick="location.hash=\'listening\'">Listening</button><span>›</span><span>News</span></div>'+
    '<div class="unit-hero"><div class="eyebrow">News</div><h1>News</h1><p>News-based listening practice organised by individual videos.</p></div>'+
    '<div class="section-title"><h2>Videos</h2><span>'+NEWS_VIDEOS.length+' video'+(NEWS_VIDEOS.length===1?"":"s")+'</span></div>'+
    '<div class="entertainment-video-grid">'+
      NEWS_VIDEOS.map(function(video){
        return '<button class="entertainment-video-card" type="button" onclick="location.hash=\'listening/news/'+newsEsc(video.slug)+'\'">'+
          '<div class="entertainment-thumb"><img src="'+newsEsc(video.thumbnail)+'" alt="'+newsEsc(video.title)+' thumbnail" loading="lazy"><span class="entertainment-play">▶</span></div>'+
          '<div class="entertainment-video-info"><h3>'+newsEsc(video.title)+'</h3><p>'+newsEsc(video.channel)+'</p></div>'+
        '</button>';
      }).join("")+
    '</div>';
  window.scrollTo({top:0,behavior:"smooth"});
}

function renderNewsVideo(){
  NEWS_PARTS.forEach(function(part){newsState[part.id]={submitted:false,answersVisible:false,results:{}};});
  activeNewsPart=1;
  var mount=document.getElementById("pageMount");
  if(!mount)return;
  mount.style.display="block";
  mount.innerHTML=
    '<div class="breadcrumbs"><button class="crumb-btn" onclick="goAreaHome()">Home</button><span>›</span><button class="crumb-btn" onclick="location.hash=\'listening\'">Listening</button><span>›</span><button class="crumb-btn" onclick="location.hash=\'listening/news\'">News</button><span>›</span><span>'+newsEsc(NEWS_VIDEO_TITLE)+'</span></div>'+
    '<div class="listening-compact-title"><div class="eyebrow">News</div><h1>'+newsEsc(NEWS_VIDEO_TITLE)+'</h1></div>'+
    '<div class="listening-workspace">'+
      '<section class="listening-video-column">'+
        '<div class="video-shell"><div class="video-frame"><div id="newsListeningPlayer"></div></div>'+
        '<div class="video-meta"><div><strong>'+newsEsc(NEWS_VIDEO_TITLE)+'</strong><span>CNN · YouTube</span></div></div></div>'+
        '<div class="listening-tip"><b>Chế độ xem lại:</b> Sau khi nộp bài, câu sai sẽ chuyển sang màu đỏ. Bấm vào câu sai để video quay lại đúng đoạn cần nghe. Đáp án đúng vẫn được ẩn cho đến khi bạn bấm <b>Hiện đáp án</b>.</div>'+
      '</section>'+
      '<section class="listening-questions" id="newsListeningQuestionPanel">'+
        '<div class="listening-part-tabs">'+
          NEWS_PARTS.map(function(part){return '<button type="button" class="listening-part-tab '+(part.id===1?"active":"")+'" id="newsPartTab'+part.id+'" onclick="switchNewsListeningPart('+part.id+')"><strong>'+newsEsc(part.label)+'</strong><span>'+newsEsc(part.approx)+' · '+part.questions.length+' câu</span></button>';}).join("")+
        '</div>'+
        NEWS_PARTS.map(newsPartHtml).join("")+
      '</section>'+
    '</div>';
  bindNewsWorkspace();
  initNewsPlayer();
  window.scrollTo({top:0,behavior:"smooth"});
}

window.renderNews=renderNews;
window.renderNewsVideo=renderNewsVideo;
window.submitNewsListening=submitNewsPart;
window.toggleNewsAnswers=toggleNewsPartAnswers;
window.resetNewsListening=resetNewsPart;
window.switchNewsListeningPart=switchNewsPart;
window.destroyNewsPlayer=destroyNewsPlayer;
window.LISTENING_NEWS_PARTS=NEWS_PARTS;
})();