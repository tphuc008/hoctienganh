(function(){
"use strict";

var VIDEO_ID="75d_29QWELk";
var VIDEO_TITLE="Change Your Life – One Tiny Step at a Time";
var player=null;
var playerTimer=null;
var submitted=false;
var answersVisible=false;
var results={};

var QUESTIONS=[
{id:1,type:"mc",time:0,prompt:"What central problem does the narrator introduce at the start?",options:["People usually set goals that are too easy.","There is often a gap between who people are and who they want to become.","Most people do not know which hobbies they enjoy."],answer:"B"},
{id:2,type:"mc",time:12,prompt:"Which activity is contrasted with actually doing your hobby?",options:["Reading more","Learning a language","Browsing Reddit"],answer:"C"},
{id:3,type:"mc",time:25,prompt:"According to the narrator, what kind of person may seem necessary in order to achieve difficult goals?",options:["Someone more consistent and disciplined","Someone with more free time and fewer hobbies","Someone who avoids all uncomfortable tasks"],answer:"A"},
{id:4,type:"mc",time:35,prompt:"What often happens after people try very hard to change themselves?",options:["The effort works permanently from the first attempt.","It works for a while, but old patterns return.","They immediately choose a completely different goal."],answer:"B"},
{id:5,type:"mc",time:47,prompt:"How can repeated failed attempts affect people emotionally?",options:["They become more frustrated and annoyed with themselves.","They become less interested in understanding change.","They feel more confident about using willpower."],answer:"A"},
{id:6,type:"mc",time:53,prompt:"What does the narrator say the online 'success and hustle' message tends to imply?",options:["Failure means you did not want success enough.","Failure is mainly caused by established brain highways.","Failure depends mostly on stress levels."],answer:"A"},
{id:7,type:"mc",time:68,prompt:"Why does the narrator want to explain why change is hard?",options:["Because explanation can make change easier to approach.","Because people need to avoid routines completely.","Because habits only work when they are consciously planned."],answer:"A"},
{id:8,type:"mc",time:78,prompt:"What does the jungle analogy mainly illustrate about making a decision or taking action?",options:["It is naturally effortless once a goal is important.","It can require energy, like moving through dense vegetation.","It depends mainly on having a clear reward at the end."],answer:"B"},
{id:9,type:"mc",time:94,prompt:"What happens in the brain when an action or behavior is repeated?",options:["The mental trail becomes more pronounced.","The brain removes the old path immediately.","The action becomes less familiar each time."],answer:"A"},
{id:10,type:"mc",time:113,prompt:"What is the final stage of the narrator's path metaphor after years of repetition?",options:["A rough trail","A street","A highway"],answer:"C"},
{id:11,type:"mc",time:131,prompt:"Why do people tend to keep doing what they have always done?",options:["Established mental highways feel familiar and comfortable.","Adults have fewer routines than younger people.","The brain deliberately avoids all rewarding behavior."],answer:"A"},
{id:12,type:"mc",time:149,prompt:"Which two concepts does the narrator say must be distinguished to understand how brain 'highways' are built?",options:["Goals and rewards","Routines and habits","Willpower and motivation"],answer:"B"},
{id:13,type:"mc",time:167,prompt:"Which example is used first to illustrate a routine?",options:["Cooking a favourite dish with the same ingredients and order","Setting an alarm for 6:30 before bed","Unlocking a phone after seeing it"],answer:"A"},
{id:14,type:"mc",time:180,prompt:"How is the 'wise planner' described?",options:["Impulsive and focused on immediate desires","Slow, analytical and aware of future outcomes","Automatic and triggered by familiar contexts"],answer:"B"},
{id:15,type:"mc",time:189,prompt:"What can the wise planner make a person do?",options:["Choose actions that support a specific outcome even if they are uncomfortable.","Avoid any action that requires mental calculation.","Repeat only behaviors that provide instant gratification."],answer:"A"},
{id:16,type:"mc",time:207,prompt:"Why can habits feel easier than routines?",options:["They are performed largely without conscious thought.","They never require physical energy.","They always produce a stronger reward than routines."],answer:"A"},
{id:17,type:"mc",time:227,prompt:"What role do triggers play in a habit?",options:["They signal the brain to begin a behavior or action.","They make the brain calculate long-term consequences.","They prevent familiar actions from becoming automatic."],answer:"A"},
{id:18,type:"mc",time:245,prompt:"Which example involves doing something even though there is no physical need for it?",options:["Unlocking a phone when you see it","Reaching for a seat belt in a car","Buying a cookie with coffee when you are not hungry"],answer:"C"},
{id:19,type:"mc",time:262,prompt:"What characterizes the 'impulsive toddler' in the analogy?",options:["It focuses on immediate desires rather than long-term goals.","It carefully compares several possible future outcomes.","It is responsible for complex calculations and planning."],answer:"A"},
{id:20,type:"mc",time:280,prompt:"Why does the toddler want a cookie when coffee is bought?",options:["Because the cookie is needed for energy in the morning.","Because the repeated morning pattern has become familiar.","Because the wise planner deliberately chooses the cookie."],answer:"B"},
{id:21,type:"mc",time:297,prompt:"How does the narrator explain the birth of many bad habits?",options:["Rewarding feelings encourage the behavior to be repeated.","Bad habits are usually created by long-term planning.","They begin when a routine has no trigger at all."],answer:"A"},
{id:22,type:"mc",time:312,prompt:"Why is it useful to let habits handle some tasks?",options:["They allow the brain to manage repetitive tasks while dealing with harder mental challenges.","They eliminate the need for the wise planner in every situation.","They make every daily action pleasurable and rewarding."],answer:"A"},

{id:23,type:"fill",time:333,prompt:"Outsourcing ______ tasks to habits reduces the load on the planner.",answerText:"mundane and repetitive",answers:["mundane and repetitive"]},
{id:24,type:"fill",time:344,prompt:"This helps the brain manage ______ more easily.",answerText:"daily life",answers:["daily life"]},
{id:25,type:"fill",time:348,prompt:"When introducing change, the narrator recommends focusing on ______ rather than big ones.",answerText:"small things",answers:["small things"]},
{id:26,type:"fill",time:360,prompt:"Small changes can have a large effect over ______.",answerText:"months and years",answers:["months and years"]},
{id:27,type:"fill",time:368,prompt:"A practical approach is to create ______ and then turn them into habits.",answerText:"new routines",answers:["new routines"]},
{id:28,type:"fill",time:384,prompt:"The wise planner is asked to construct the ______.",answerText:"first trail",answers:["first trail"]},
{id:29,type:"fill",time:394,prompt:"The narrator uses wanting to ______ as an example of a common goal.",answerText:"work out",answers:["work out"]},
{id:30,type:"fill",time:401,prompt:"One specific, controllable action suggested is doing ______.",answerText:"ten squats",answers:["ten squats","10 squats"]},
{id:31,type:"fill",time:412,prompt:"The example routine is to do the squats ______.",answerText:"every morning",answers:["every morning"]},
{id:32,type:"fill",time:420,prompt:"A routine should already include ______ that the toddler can later recognize.",answerText:"clear triggers",answers:["clear triggers"]},
{id:33,type:"fill",time:431,prompt:"A visual trigger could be seeing your ______.",answerText:"training outfit",answers:["training outfit"]},
{id:34,type:"fill",time:441,prompt:"The action should always begin in a ______.",answerText:"specific context",answers:["specific context"]},
{id:35,type:"fill",time:451,prompt:"Eventually, the trigger works like a ______ for the action.",answerText:"start button",answers:["start button"]},
{id:36,type:"fill",time:460,prompt:"In the home-workout example, the person should wear their ______.",answerText:"exercise gear",answers:["exercise gear"]},
{id:37,type:"fill",time:470,prompt:"The action and trigger should be repeated regularly, ______.",answerText:"ideally every day",answers:["ideally every day"]},
{id:38,type:"fill",time:476,prompt:"With repetition, the decision to do the squats can feel like a ______ of the day.",answerText:"regular part",answers:["regular part"]},
{id:39,type:"fill",time:493,prompt:"Many desired habits do not provide as much ______ as wasting time online.",answerText:"instant gratification",answers:["instant gratification"]},
{id:40,type:"fill",time:504,prompt:"The narrator suggests making the behavior itself ______.",answerText:"more enjoyable",answers:["more enjoyable"]},
{id:41,type:"fill",time:509,prompt:"One example is listening to a ______ only while exercising.",answerText:"favorite podcast",answers:["favorite podcast","favourite podcast"]},
{id:42,type:"fill",time:520,prompt:"People need to discover what ______ personally.",answerText:"works for you",answers:["works for you"]},
{id:43,type:"fill",time:527,prompt:"The time needed to establish a habit ______.",answerText:"varies widely",answers:["varies widely"]},
{id:44,type:"fill",time:538,prompt:"Habit formation may depend partly on a person's ______.",answerText:"stress levels",answers:["stress levels"]},
{id:45,type:"fill",time:547,prompt:"The narrator says that starting is the ______.",answerText:"easy part",answers:["easy part","the easy part"]},
{id:46,type:"fill",time:563,prompt:"The difficult part is continuing to do the action ______.",answerText:"every day",answers:["every day"]},
{id:47,type:"fill",time:574,prompt:"The narrator says there are no ______ for change.",answerText:"silver bullets",answers:["silver bullets"]},
{id:48,type:"fill",time:584,prompt:"Doing a little good is better than being unhappy and ______.",answerText:"changing nothing",answers:["changing nothing"]},
{id:49,type:"fill",time:596,prompt:"In the narrator's conclusion, change is described as ______, not a destination.",answerText:"a direction",answers:["a direction"]},
{id:50,type:"fill",time:607,prompt:"The narrator stresses that you do not need to buy anything to ______.",answerText:"work on yourself",answers:["work on yourself"]},
{id:51,type:"fill",time:622,prompt:"The journal is designed to track habit progress for a person's ______.",answerText:"desired behavior",answers:["desired behavior","desired behaviour"]},
{id:52,type:"fill",time:633,prompt:"Before regular journaling starts, users go through a ______.",answerText:"tutorial part",answers:["tutorial part"]},
{id:53,type:"fill",time:642,prompt:"Examples, ______ and reflections are included throughout the journal.",answerText:"science breaks",answers:["science breaks"]},
{id:54,type:"fill",time:652,prompt:"The product is compared with the team's ______.",answerText:"Gratitude Journal",answers:["gratitude journal"]},
{id:55,type:"fill",time:659,prompt:"The book contains many ______.",answerText:"beautiful illustrations",answers:["beautiful illustrations"]},
{id:56,type:"fill",time:668,prompt:"Buying from the shop is described as the ______ to support the channel.",answerText:"best way",answers:["best way","the best way"]}
];

function injectStyles(){
  if(document.getElementById("listeningStyles"))return;
  var s=document.createElement("style");
  s.id="listeningStyles";
  s.textContent=[
    ".listening-unit-card .exercise-icon{font-size:22px}",
    ".listening-hero{margin-bottom:18px}",
    ".listening-hero h1{font-size:clamp(30px,3.4vw,50px)}",
    ".listening-workspace{display:grid;grid-template-columns:minmax(0,1.55fr) minmax(430px,.95fr);gap:18px;align-items:start}",
    ".listening-video-column{position:sticky;top:16px;min-width:0}",
    ".video-shell{border:1px solid var(--line);background:rgba(0,0,0,.22);border-radius:22px;overflow:hidden}",
    ".video-frame{aspect-ratio:16/9;background:#020617}",
    ".video-frame iframe{width:100%;height:100%;display:block}",
    ".video-meta{padding:15px 17px;border-top:1px solid var(--line);display:flex;gap:10px;align-items:flex-start;justify-content:space-between;flex-wrap:wrap}",
    ".video-meta strong{display:block;font-size:16px;margin-bottom:4px}",
    ".video-meta span{color:var(--muted);font-size:12px;line-height:1.5}",
    ".listening-tip{margin-top:12px;padding:13px 15px;border:1px solid rgba(103,232,249,.18);border-radius:15px;background:rgba(103,232,249,.045);color:#cbd7e8;font-size:13px;line-height:1.55}",
    ".listening-questions{height:clamp(620px,calc(100vh - 170px),820px);min-height:0;border:1px solid var(--line);border-radius:22px;background:rgba(255,255,255,.025);overflow-y:auto;scrollbar-gutter:stable}",
    ".listening-q-head{position:sticky;top:0;z-index:5;padding:15px 17px;background:rgba(8,18,33,.96);backdrop-filter:blur(15px);border-bottom:1px solid var(--line)}",
    ".listening-q-head-row{display:flex;justify-content:space-between;align-items:center;gap:12px}",
    ".listening-q-head h2{font-size:20px;margin:0}",
    ".listening-progress{font-size:12px;color:var(--muted)}",
    ".listening-instructions{margin-top:8px;color:var(--muted);font-size:12px;line-height:1.5}",
    ".listening-section-label{padding:13px 16px 7px;color:#c4b5fd;font-size:11px;font-weight:900;letter-spacing:.12em;text-transform:uppercase}",
    ".listening-q-list{padding:0 12px 94px}",
    ".listening-q{position:relative;margin:9px 0;padding:15px;border:1px solid var(--line);border-radius:16px;background:rgba(255,255,255,.035);transition:.18s ease}",
    ".listening-q.active{border-color:rgba(103,232,249,.56);box-shadow:0 0 0 2px rgba(103,232,249,.08);background:rgba(103,232,249,.055)}",
    ".listening-q.correct{border-color:rgba(52,211,153,.48);background:rgba(52,211,153,.06)}",
    ".listening-q.wrong{border-color:rgba(251,113,133,.52);background:rgba(251,113,133,.065);cursor:pointer}",
    ".listening-q.wrong:hover{transform:translateY(-1px);border-color:rgba(251,113,133,.8)}",
    ".listening-q-top{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:9px}",
    ".listening-q-num{font-size:11px;font-weight:900;letter-spacing:.08em;color:#c4b5fd}",
    ".listening-time{border:1px solid var(--line);background:rgba(255,255,255,.04);color:#cbd7e8;border-radius:999px;padding:4px 8px;font-size:11px}",
    ".listening-prompt{font-size:14px;line-height:1.55;font-weight:700;margin-bottom:11px}",
    ".listening-options{display:grid;gap:7px}",
    ".listening-option{display:flex;align-items:flex-start;gap:9px;padding:9px 10px;border:1px solid rgba(255,255,255,.075);border-radius:12px;background:rgba(255,255,255,.025);font-size:13px;line-height:1.45;cursor:pointer}",
    ".listening-option input{margin-top:3px;accent-color:#8b5cf6}",
    ".listening-fill{width:100%;border:1px solid var(--line);background:rgba(255,255,255,.045);color:var(--text);border-radius:12px;padding:11px 12px;font:inherit;font-size:14px;outline:none}",
    ".listening-fill:focus{border-color:rgba(103,232,249,.55);box-shadow:0 0 0 3px rgba(103,232,249,.07)}",
    ".listening-fill-note{margin-top:6px;color:var(--muted);font-size:10.5px;text-transform:uppercase;letter-spacing:.08em}",
    ".listening-status{display:none;margin-top:10px;font-size:12px;font-weight:800}",
    ".listening-q.correct .listening-status{display:block;color:#a7f3d0}",
    ".listening-q.wrong .listening-status{display:block;color:#fecdd3}",
    ".listening-answer{display:none;margin-top:10px;padding:10px 11px;border-radius:11px;background:rgba(139,92,246,.1);border:1px solid rgba(167,139,250,.18);font-size:12px;line-height:1.45;color:#ddd6fe}",
    ".listening-answer.show{display:block}",
    ".listening-actions{position:sticky;bottom:0;z-index:6;display:flex;align-items:center;justify-content:space-between;gap:10px;padding:13px 15px;background:rgba(8,18,33,.97);backdrop-filter:blur(15px);border-top:1px solid var(--line)}",
    ".listening-actions-left{min-width:0}",
    ".listening-score{font-size:13px;font-weight:850}",
    ".listening-score-note{font-size:11px;color:var(--muted);margin-top:2px}",
    ".listening-actions-btns{display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end}",
    ".listening-actions .primary,.listening-actions .secondary{padding:10px 13px;border-radius:12px;font-size:12px}",
    ".listening-replay{display:inline-flex;align-items:center;gap:6px;margin-top:7px;color:#fecdd3;font-size:11px;font-weight:800}",
    "@media(max-width:1100px){.listening-workspace{grid-template-columns:minmax(0,1.35fr) minmax(380px,.95fr)}}",
    "@media(max-width:900px){.listening-workspace{grid-template-columns:1fr}.listening-video-column{position:relative;top:auto}.listening-questions{height:auto;max-height:none;overflow:visible}.listening-q-head,.listening-actions{position:relative}.listening-q-list{padding-bottom:10px}}",
    "@media(max-width:560px){.video-meta{padding:12px}.listening-q-list{padding-left:8px;padding-right:8px}.listening-q{padding:13px}.listening-actions{align-items:flex-start;flex-direction:column}.listening-actions-btns{width:100%;justify-content:stretch}.listening-actions-btns button{flex:1}}"
  ].join("");
  document.head.appendChild(s);
}

function escHtml(value){
  return String(value==null?"":value).replace(/[&<>"']/g,function(ch){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch];});
}
function fmtTime(sec){
  var m=Math.floor(sec/60),s=Math.floor(sec%60);
  return m+":"+String(s).padStart(2,"0");
}
function norm(v){
  return String(v||"").toLowerCase().replace(/[–—-]/g," ").replace(/[^a-z0-9\s']/g," ").replace(/\s+/g," ").trim();
}
function questionHtml(q){
  var body="";
  if(q.type==="mc"){
    body='<div class="listening-options">'+q.options.map(function(opt,i){
      var letter=String.fromCharCode(65+i);
      return '<label class="listening-option"><input type="radio" name="ent-q-'+q.id+'" value="'+letter+'"><span><b>'+letter+'.</b> '+escHtml(opt)+'</span></label>';
    }).join("")+'</div>';
  }else{
    body='<input class="listening-fill" id="ent-input-'+q.id+'" autocomplete="off" spellcheck="false" placeholder="Type 2–3 words"><div class="listening-fill-note">Write 2–3 words from the audio</div>';
  }
  return '<article class="listening-q" id="ent-q-'+q.id+'" data-qid="'+q.id+'">'+
    '<div class="listening-q-top"><span class="listening-q-num">QUESTION '+q.id+'</span><span class="listening-time">'+fmtTime(q.time)+'</span></div>'+
    '<div class="listening-prompt">'+escHtml(q.prompt)+'</div>'+body+
    '<div class="listening-status" id="ent-status-'+q.id+'"></div>'+
    '<div class="listening-answer" id="ent-answer-'+q.id+'"></div>'+
  '</article>';
}

function allQuestionsHtml(){
  var mc=QUESTIONS.filter(function(q){return q.type==="mc";}).map(questionHtml).join("");
  var fill=QUESTIONS.filter(function(q){return q.type==="fill";}).map(questionHtml).join("");
  return '<div class="listening-section-label">IELTS Listening Part 3 style · Multiple Choice</div>'+mc+
    '<div class="listening-section-label">IELTS Listening Part 4 style · Note Completion</div>'+fill;
}

function ensureYouTubeApi(){
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
function initPlayer(){
  ensureYouTubeApi().then(function(){
    var mount=document.getElementById("entertainmentPlayer");
    if(!mount)return;
    player=new YT.Player("entertainmentPlayer",{
      videoId:VIDEO_ID,
      playerVars:{playsinline:1,rel:0,modestbranding:1,origin:location.origin},
      events:{onReady:function(){startPlayerSync();}}
    });
    window.entertainmentPlayer=player;
  });
}
function startPlayerSync(){
  if(playerTimer)clearInterval(playerTimer);
  playerTimer=setInterval(function(){
    if(!player||typeof player.getCurrentTime!=="function")return;
    var t=player.getCurrentTime();
    var current=QUESTIONS[0];
    for(var i=0;i<QUESTIONS.length;i++){
      if(t>=QUESTIONS[i].time)current=QUESTIONS[i];else break;
    }
    document.querySelectorAll(".listening-q.active").forEach(function(el){el.classList.remove("active");});
    var card=document.getElementById("ent-q-"+current.id);
    if(card)card.classList.add("active");
  },600);
}
function seekQuestion(id){
  var q=QUESTIONS.find(function(x){return x.id===Number(id);});
  if(!q)return;
  var target=Math.max(0,q.time-2);
  if(player&&typeof player.seekTo==="function"){
    player.seekTo(target,true);
    if(typeof player.playVideo==="function")player.playVideo();
  }
  var card=document.getElementById("ent-q-"+q.id);
  if(card&&window.innerWidth<901)card.scrollIntoView({behavior:"smooth",block:"center"});
}
function readAnswer(q){
  if(q.type==="mc"){
    var checked=document.querySelector('input[name="ent-q-'+q.id+'"]:checked');
    return checked?checked.value:"";
  }
  var input=document.getElementById("ent-input-"+q.id);
  return input?input.value:"";
}
function isCorrect(q,value){
  if(q.type==="mc")return value===q.answer;
  var v=norm(value);
  return q.answers.some(function(a){return norm(a)===v;});
}
function answerLabel(q){
  if(q.type==="mc"){
    var idx=q.answer.charCodeAt(0)-65;
    return q.answer+". "+q.options[idx];
  }
  return q.answerText;
}
function updateProgress(){
  var answered=QUESTIONS.filter(function(q){return readAnswer(q).trim()!=="";}).length;
  var el=document.getElementById("listeningProgress");
  if(el)el.textContent=answered+" / "+QUESTIONS.length+" answered";
}
function submitEntertainment(){
  submitted=true;
  answersVisible=false;
  results={};
  var correct=0;
  QUESTIONS.forEach(function(q){
    var value=readAnswer(q);
    var ok=isCorrect(q,value);
    results[q.id]=ok;
    if(ok)correct++;
    var card=document.getElementById("ent-q-"+q.id);
    var status=document.getElementById("ent-status-"+q.id);
    if(card){
      card.classList.remove("correct","wrong");
      card.classList.add(ok?"correct":"wrong");
    }
    if(status)status.innerHTML=ok?"✓ Correct":"✕ Incorrect · <span class=\"listening-replay\">▶ Click this question to listen again from "+fmtTime(q.time)+"</span>";
    document.querySelectorAll('input[name="ent-q-'+q.id+'"]').forEach(function(el){el.disabled=true;});
    var fill=document.getElementById("ent-input-"+q.id);
    if(fill)fill.disabled=true;
    var ans=document.getElementById("ent-answer-"+q.id);
    if(ans){ans.classList.remove("show");ans.textContent="";}
  });
  var score=document.getElementById("listeningScore");
  var note=document.getElementById("listeningScoreNote");
  var showBtn=document.getElementById("showAnswersBtn");
  var submitBtn=document.getElementById("submitListeningBtn");
  if(score)score.textContent=correct+" / "+QUESTIONS.length+" correct";
  if(note)note.textContent="Incorrect answers are still hidden. Click a red question to replay its evidence.";
  if(showBtn){showBtn.style.display="inline-flex";showBtn.textContent="Hiện đáp án";}
  if(submitBtn)submitBtn.textContent="Nộp lại đáp án";
  var firstWrong=QUESTIONS.find(function(q){return !results[q.id];});
  if(firstWrong){
    var c=document.getElementById("ent-q-"+firstWrong.id);
    if(c)c.scrollIntoView({behavior:"smooth",block:"center"});
  }
}
function toggleAnswers(){
  if(!submitted)return;
  answersVisible=!answersVisible;
  QUESTIONS.forEach(function(q){
    var ans=document.getElementById("ent-answer-"+q.id);
    if(!ans)return;
    ans.textContent="Đáp án: "+answerLabel(q);
    ans.classList.toggle("show",answersVisible);
  });
  var btn=document.getElementById("showAnswersBtn");
  if(btn)btn.textContent=answersVisible?"Ẩn đáp án":"Hiện đáp án";
}
function resetEntertainment(){
  submitted=false;
  answersVisible=false;
  results={};
  QUESTIONS.forEach(function(q){
    var card=document.getElementById("ent-q-"+q.id);
    if(card)card.classList.remove("correct","wrong");
    document.querySelectorAll('input[name="ent-q-'+q.id+'"]').forEach(function(el){el.disabled=false;el.checked=false;});
    var fill=document.getElementById("ent-input-"+q.id);
    if(fill){fill.disabled=false;fill.value="";}
    var status=document.getElementById("ent-status-"+q.id);
    if(status)status.textContent="";
    var ans=document.getElementById("ent-answer-"+q.id);
    if(ans){ans.textContent="";ans.classList.remove("show");}
  });
  var score=document.getElementById("listeningScore");
  var note=document.getElementById("listeningScoreNote");
  var showBtn=document.getElementById("showAnswersBtn");
  var submitBtn=document.getElementById("submitListeningBtn");
  if(score)score.textContent="Ready";
  if(note)note.textContent="Answers stay hidden after submission until you choose to reveal them.";
  if(showBtn)showBtn.style.display="none";
  if(submitBtn)submitBtn.textContent="Nộp đáp án";
  updateProgress();
}
function bindWorkspace(){
  var panel=document.getElementById("listeningQuestionPanel");
  if(!panel)return;
  panel.addEventListener("input",updateProgress);
  panel.addEventListener("change",updateProgress);
  panel.addEventListener("click",function(e){
    var card=e.target.closest(".listening-q");
    if(!card||!submitted||!card.classList.contains("wrong"))return;
    if(e.target.closest("input,label,button"))return;
    seekQuestion(card.dataset.qid);
  });
}
function destroyEntertainmentPlayer(){
  if(playerTimer){clearInterval(playerTimer);playerTimer=null;}
  if(player&&typeof player.destroy==="function"){try{player.destroy();}catch(e){}}
  player=null;
  window.entertainmentPlayer=null;
}

function renderListeningHome(){
  injectStyles();
  var mount=document.getElementById("pageMount");
  if(!mount)return;
  mount.style.display="block";
  mount.innerHTML=
    '<div class="breadcrumbs"><button class="crumb-btn" onclick="goAreaHome()">Home</button><span>›</span><span>Listening</span></div>'+
    '<div class="unit-hero"><div class="eyebrow">Listening</div><h1>Listening</h1><p>Video-based listening practice with IELTS-style questions, timestamped review and replay.</p></div>'+
    '<div class="section-title"><h2>Units</h2><span>1 unit</span></div>'+
    '<div class="units"><button class="unit-card listening-unit-card" onclick="location.hash=\'listening/entertainment\'">'+
      '<div class="unit-top"><span class="unit-no">UNIT 01</span><span class="status live">Available</span></div>'+
      '<h3>Entertainment</h3><p>Watch, answer, submit, then replay only the parts you missed.</p><span class="unit-arrow">→</span>'+
    '</button></div>';
  window.scrollTo({top:0,behavior:"smooth"});
}

function renderEntertainment(){
  injectStyles();
  submitted=false;answersVisible=false;results={};
  var mount=document.getElementById("pageMount");
  if(!mount)return;
  mount.style.display="block";
  mount.innerHTML=
    '<div class="breadcrumbs"><button class="crumb-btn" onclick="goAreaHome()">Home</button><span>›</span><button class="crumb-btn" onclick="location.hash=\'listening\'">Listening</button><span>›</span><span>Entertainment</span></div>'+
    '<div class="unit-hero listening-hero"><div class="eyebrow">Listening · Entertainment · Unit 01</div><h1>'+escHtml(VIDEO_TITLE)+'</h1><p>IELTS-style listening practice generated from the video transcript. Multiple choice is followed by 2–3 word note completion.</p></div>'+
    '<div class="listening-workspace">'+
      '<section class="listening-video-column">'+
        '<div class="video-shell"><div class="video-frame"><div id="entertainmentPlayer"></div></div>'+
        '<div class="video-meta"><div><strong>'+escHtml(VIDEO_TITLE)+'</strong><span>Kurzgesagt – In a Nutshell · YouTube</span></div><span>56 questions · ~10–15 seconds per question</span></div></div>'+
        '<div class="listening-tip"><b>Review mode:</b> after you submit, incorrect questions turn red. Click the red question itself to jump back to the relevant moment. The correct answer remains hidden until you press <b>Hiện đáp án</b>.</div>'+
      '</section>'+
      '<section class="listening-questions" id="listeningQuestionPanel">'+
        '<div class="listening-q-head"><div class="listening-q-head-row"><h2>Questions</h2><span class="listening-progress" id="listeningProgress">0 / '+QUESTIONS.length+' answered</span></div>'+
        '<div class="listening-instructions">Part 3 style: choose A, B or C. Part 4 style: write 2–3 words from the audio.</div></div>'+
        '<div class="listening-q-list">'+allQuestionsHtml()+'</div>'+
        '<div class="listening-actions"><div class="listening-actions-left"><div class="listening-score" id="listeningScore">Ready</div><div class="listening-score-note" id="listeningScoreNote">Answers stay hidden after submission until you choose to reveal them.</div></div>'+
        '<div class="listening-actions-btns"><button class="secondary" type="button" id="showAnswersBtn" style="display:none" onclick="toggleEntertainmentAnswers()">Hiện đáp án</button><button class="secondary" type="button" onclick="resetEntertainmentListening()">Làm lại</button><button class="primary" type="button" id="submitListeningBtn" onclick="submitEntertainmentListening()">Nộp đáp án</button></div></div>'+
      '</section>'+
    '</div>';
  bindWorkspace();
  initPlayer();
  window.scrollTo({top:0,behavior:"smooth"});
}

injectStyles();
window.renderListeningHome=renderListeningHome;
window.renderEntertainment=renderEntertainment;
window.submitEntertainmentListening=submitEntertainment;
window.toggleEntertainmentAnswers=toggleAnswers;
window.resetEntertainmentListening=resetEntertainment;
window.seekEntertainmentQuestion=seekQuestion;
window.destroyEntertainmentPlayer=destroyEntertainmentPlayer;
window.LISTENING_ENTERTAINMENT_QUESTIONS=QUESTIONS;
})();