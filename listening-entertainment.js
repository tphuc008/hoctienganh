(function(){
"use strict";

var VIDEO_ID="75d_29QWELk";
var VIDEO_TITLE="Change Your Life – One Tiny Step at a Time";
var VIDEO_SLUG="change-your-life-one-tiny-step-at-a-time";
var ENTERTAINMENT_VIDEOS=[
  {id:VIDEO_ID,slug:VIDEO_SLUG,title:VIDEO_TITLE,channel:"Kurzgesagt – In a Nutshell",thumbnail:"https://i.ytimg.com/vi/"+VIDEO_ID+"/hqdefault.jpg"}
];
var player=null;
var activePart=1;

var PARTS=[
  {
    id:1,
    label:"Phần 1",
    approx:"Khoảng 5–6 phút",
    start:0,
    end:348,
    questions:[
      {id:1,type:"mc",time:0,prompt:"What problem does the narrator introduce at the beginning?",options:["People set goals that are too easy.","There is a gap between who people are and who they want to be.","People spend too much time choosing hobbies."],answer:"B"},
      {id:2,type:"mc",time:19,prompt:"Which activity is contrasted with actually doing a hobby?",options:["Reading more","Learning a language","Browsing Reddit"],answer:"C"},
      {id:3,type:"mc",time:39,prompt:"What often happens after people initially succeed at changing themselves?",options:["They permanently lose interest in the goal.","They slip back into their old ways.","They choose a more difficult goal immediately."],answer:"B"},
      {id:4,type:"fill",time:58,prompt:"The narrator stresses that change is ______.",answerText:"hard",answers:["hard"]},
      {id:5,type:"mc",time:78,prompt:"What does the jungle analogy mainly show about making decisions and taking action?",options:["It can require energy and effort.","It becomes impossible in adulthood.","It depends mainly on motivation."],answer:"A"},
      {id:6,type:"fill",time:96,prompt:"When a behavior begins, it creates rough, ______ through the undergrowth.",answerText:"improvised trails",answers:["improvised trails"]},
      {id:7,type:"mc",time:113,prompt:"What happens to a repeatedly used mental path over time?",options:["It disappears when the brain gets bored.","It develops from a path into a street and eventually a highway.","It becomes harder to use because it requires more attention."],answer:"B"},
      {id:8,type:"fill",time:149,prompt:"To understand how brain highways are built, the narrator distinguishes between ______.",answerText:"routines and habits",answers:["routines and habits"]},
      {id:9,type:"mc",time:167,prompt:"Which example is used to illustrate a routine?",options:["Cooking a favorite dish with familiar ingredients and steps","Unlocking a phone whenever it appears","Buying food even when you are not hungry"],answer:"A"},
      {id:10,type:"fill",time:189,prompt:"The wise planner is responsible for strategizing and ______.",answerText:"mental calculations",answers:["mental calculations"]},
      {id:11,type:"mc",time:205,prompt:"What can the wise planner make a person do?",options:["Choose actions that support a future outcome even if they are uncomfortable","Avoid any behavior that takes physical effort","Act only when an immediate reward is available"],answer:"A"},
      {id:12,type:"fill",time:218,prompt:"Habits are sequences of actions carried out ______.",answerText:"without thinking",answers:["without thinking"]},
      {id:13,type:"mc",time:231,prompt:"What is the main function of a trigger in a habit?",options:["It signals the brain to begin a behavior.","It evaluates several long-term outcomes.","It makes the action physically easier."],answer:"A"},
      {id:14,type:"fill",time:262,prompt:"The impulsive toddler responds to your ______.",answerText:"immediate desires",answers:["immediate desires"]},
      {id:15,type:"mc",time:280,prompt:"Why does the toddler choose the familiar 'easy road' in the brain?",options:["It expects a familiar rewarding result.","It wants to plan for distant goals.","It tries to avoid all repeated behavior."],answer:"A"},
      {id:16,type:"fill",time:300,prompt:"Bad habits are reinforced by ______ associated with an action.",answerText:"rewarding feelings",answers:["rewarding feelings"]},
      {id:17,type:"fill",time:333,prompt:"The brain can outsource ______ tasks to habits.",answerText:"mundane and repetitive",answers:["mundane and repetitive"]}
    ]
  },
  {
    id:2,
    label:"Phần 2",
    approx:"Khoảng 5–6 phút",
    start:348,
    end:691,
    questions:[
      {id:18,type:"mc",time:350,prompt:"What approach does the narrator recommend when introducing a new behavior?",options:["Focus on small changes rather than ambitious ones.","Rely on willpower until the behavior becomes automatic.","Change several major areas of life at the same time."],answer:"A"},
      {id:19,type:"fill",time:370,prompt:"One way to make change easier is to create ______ and then turn them into habits.",answerText:"new routines",answers:["new routines"]},
      {id:20,type:"mc",time:389,prompt:"Why should a vague goal such as getting fitter be broken down?",options:["To make the action clear, specific and manageable","To make the long-term goal more impressive","To remove the need for any trigger"],answer:"A"},
      {id:21,type:"fill",time:408,prompt:"A concrete example of a small action is doing ______ every morning.",answerText:"ten squats",answers:["ten squats","10 squats"]},
      {id:22,type:"mc",time:427,prompt:"Which of the following can serve as a trigger?",options:["Only a particular time of day","Only a visual object","A visual cue, a time, a place, or a combination of them"],answer:"C"},
      {id:23,type:"fill",time:447,prompt:"The action should always begin in a ______.",answerText:"specific context",answers:["specific context"]},
      {id:24,type:"mc",time:468,prompt:"What does the home-workout example recommend?",options:["Changing the place and time every day","Using the same gear, place and time and repeating the action regularly","Increasing the number of exercises before creating a trigger"],answer:"B"},
      {id:25,type:"fill",time:492,prompt:"Many desired habits provide less ______ than wasting time online.",answerText:"instant gratification",answers:["instant gratification"]},
      {id:26,type:"mc",time:510,prompt:"How does the narrator suggest making a new action easier to repeat?",options:["Make the behavior itself more enjoyable.","Give yourself a large reward every time.","Wait until motivation is very high."],answer:"A"},
      {id:27,type:"fill",time:532,prompt:"The time required to establish a habit may depend partly on a person's ______.",answerText:"stress levels",answers:["stress levels"]},
      {id:28,type:"mc",time:548,prompt:"What does the narrator say about the time needed for a new habit to become automatic?",options:["It is almost always two weeks.","It can range widely, from about 15 to 250 days.","It is fixed once the trigger is chosen."],answer:"B"},
      {id:29,type:"fill",time:566,prompt:"According to the narrator, starting is the ______.",answerText:"easy part",answers:["easy part"]},
      {id:30,type:"mc",time:586,prompt:"What broader message follows the statement that there are no 'silver bullets' for change?",options:["Change is possible regardless of age, and even small improvements count.","Only young people can build new habits reliably.","A habit is successful only if it completely transforms your life."],answer:"A"},
      {id:31,type:"fill",time:602,prompt:"In the conclusion, change is described as ______, not a destination.",answerText:"a direction",answers:["a direction"]},
      {id:32,type:"mc",time:625,prompt:"What is the main purpose of the habit journal described near the end?",options:["To track progress toward a desired behavior","To replace the need for routines","To compare users with other people"],answer:"A"},
      {id:33,type:"fill",time:644,prompt:"During the guided process, users receive ______ and reflect on their progress.",answerText:"helpful pointers",answers:["helpful pointers"]},
      {id:34,type:"mc",time:668,prompt:"How is the journal physically described?",options:["As a digital-only workbook","As a cloth-bound book with a hardcover and illustrations","As a loose collection of printable pages"],answer:"B"}
    ]
  }
];

var state={};
PARTS.forEach(function(part){
  state[part.id]={submitted:false,answersVisible:false,results:{}};
});

function injectStyles(){
  if(document.getElementById("listeningStyles"))return;
  var s=document.createElement("style");
  s.id="listeningStyles";
  s.textContent=[
    ".listening-compact-title{display:flex;align-items:center;gap:10px;min-width:0;margin:0 0 16px;padding:12px 16px;border:1px solid var(--line);border-radius:16px;background:linear-gradient(135deg,rgba(139,92,246,.09),rgba(34,211,238,.045))}",
    ".listening-compact-title .eyebrow{flex:0 0 auto;font-size:10px;letter-spacing:.11em}",
    ".listening-compact-title h1{min-width:0;margin:0;font-size:clamp(18px,2vw,27px);line-height:1.2;letter-spacing:-.025em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
    ".entertainment-video-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}",
    ".entertainment-video-card{display:block;padding:0;overflow:hidden;border:1px solid var(--line);border-radius:20px;background:linear-gradient(145deg,rgba(255,255,255,.07),rgba(255,255,255,.025));color:var(--text);text-align:left;cursor:pointer;transition:.2s ease}",
    ".entertainment-video-card:hover{transform:translateY(-3px);border-color:rgba(103,232,249,.38)}",
    ".entertainment-thumb{position:relative;aspect-ratio:16/9;background:#020617;overflow:hidden}",
    ".entertainment-thumb img{width:100%;height:100%;display:block;object-fit:cover}",
    ".entertainment-play{position:absolute;left:14px;bottom:12px;width:42px;height:42px;border-radius:50%;display:grid;place-items:center;background:rgba(6,17,31,.86);border:1px solid rgba(255,255,255,.2);font-size:16px}",
    ".entertainment-video-info{padding:14px 15px 16px}",
    ".entertainment-video-info h3{margin:0 0 6px;font-size:17px;line-height:1.35}",
    ".entertainment-video-info p{margin:0;color:var(--muted);font-size:12px}",
    ".listening-workspace{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;align-items:start}",
    ".listening-video-column{position:sticky;top:14px;min-width:0}",
    ".video-shell{border:1px solid var(--line);background:rgba(0,0,0,.22);border-radius:20px;overflow:hidden}",
    ".video-frame{aspect-ratio:16/9;background:#020617}",
    ".video-frame iframe{width:100%;height:100%;display:block}",
    ".video-meta{padding:12px 15px;border-top:1px solid var(--line);display:flex;gap:10px;align-items:center;justify-content:space-between}",
    ".video-meta strong{display:block;font-size:15px;margin-bottom:3px}",
    ".video-meta span{color:var(--muted);font-size:11px;line-height:1.45}",
    ".listening-tip{margin-top:10px;padding:12px 14px;border:1px solid rgba(103,232,249,.18);border-radius:14px;background:rgba(103,232,249,.045);color:#cbd7e8;font-size:12.5px;line-height:1.55}",
    ".listening-questions{height:min(690px,calc(100vh - 155px));min-height:560px;border:1px solid var(--line);border-radius:20px;background:rgba(255,255,255,.025);overflow-y:auto;scrollbar-gutter:stable}",
    ".listening-part-tabs{position:sticky;top:0;z-index:8;display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:12px;background:rgba(8,18,33,.97);backdrop-filter:blur(15px);border-bottom:1px solid var(--line)}",
    ".listening-part-tab{border:1px solid var(--line);background:rgba(255,255,255,.04);color:var(--text);border-radius:12px;padding:10px 12px;text-align:left;cursor:pointer;transition:.18s}",
    ".listening-part-tab strong{display:block;font-size:13px;margin-bottom:2px}",
    ".listening-part-tab span{font-size:10.5px;color:var(--muted)}",
    ".listening-part-tab.active{border-color:rgba(103,232,249,.48);background:rgba(103,232,249,.08)}",
    ".listening-part{display:none}",
    ".listening-part.active{display:block}",
    ".listening-part-head{padding:14px 16px 4px;display:flex;align-items:center;justify-content:space-between;gap:12px}",
    ".listening-part-head h2{margin:0;font-size:18px}",
    ".listening-progress{font-size:11px;color:var(--muted)}",
    ".listening-q-list{padding:3px 11px 92px}",
    ".listening-q{position:relative;margin:9px 0;padding:14px;border:1px solid var(--line);border-radius:15px;background:rgba(255,255,255,.035);transition:.18s ease}",
    ".listening-q.correct{border-color:rgba(52,211,153,.48);background:rgba(52,211,153,.06)}",
    ".listening-q.wrong{border-color:rgba(251,113,133,.55);background:rgba(251,113,133,.065);cursor:pointer}",
    ".listening-q.wrong:hover{transform:translateY(-1px);border-color:rgba(251,113,133,.82)}",
    ".listening-q-top{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px}",
    ".listening-q-num{font-size:10.5px;font-weight:900;letter-spacing:.08em;color:#c4b5fd}",
    ".listening-q-type{font-size:9.5px;font-weight:800;letter-spacing:.05em;text-transform:uppercase;color:var(--muted);border:1px solid var(--line);border-radius:999px;padding:4px 7px}",
    ".listening-prompt{font-size:13.5px;line-height:1.52;font-weight:700;margin-bottom:10px}",
    ".listening-options{display:grid;gap:7px}",
    ".listening-option{width:100%;display:flex;align-items:flex-start;gap:10px;padding:12px 13px;border:1px solid rgba(255,255,255,.075);border-radius:12px;background:rgba(255,255,255,.025);font-size:13.5px;line-height:1.48;cursor:pointer}",
    ".listening-option input{margin-top:2px;accent-color:#8b5cf6}",
    ".listening-fill{width:100%;min-height:48px;border:1px solid var(--line);background:rgba(255,255,255,.045);color:var(--text);border-radius:12px;padding:13px 14px;font:inherit;font-size:14px;outline:none}",
    ".listening-fill:focus{border-color:rgba(103,232,249,.55);box-shadow:0 0 0 3px rgba(103,232,249,.07)}",
    ".listening-fill-note{margin-top:5px;color:var(--muted);font-size:9.5px;text-transform:uppercase;letter-spacing:.07em}",
    ".listening-status{display:none;margin-top:9px;font-size:11.5px;font-weight:800}",
    ".listening-q.correct .listening-status{display:block;color:#a7f3d0}",
    ".listening-q.wrong .listening-status{display:block;color:#fecdd3}",
    ".listening-answer{display:none;margin-top:9px;padding:9px 10px;border-radius:10px;background:rgba(139,92,246,.1);border:1px solid rgba(167,139,250,.18);font-size:11.5px;line-height:1.45;color:#ddd6fe}",
    ".listening-answer.show{display:block}",
    ".listening-actions{position:sticky;bottom:0;z-index:7;display:flex;align-items:center;justify-content:space-between;gap:10px;padding:12px 14px;background:rgba(8,18,33,.97);backdrop-filter:blur(15px);border-top:1px solid var(--line)}",
    ".listening-actions-left{min-width:0}",
    ".listening-score{font-size:12.5px;font-weight:850}",
    ".listening-score-note{font-size:10.5px;color:var(--muted);margin-top:2px;max-width:300px}",
    ".listening-actions-btns{display:flex;gap:7px;flex-wrap:wrap;justify-content:flex-end}",
    ".listening-actions .primary,.listening-actions .secondary{padding:9px 11px;border-radius:11px;font-size:11.5px}",
    "@media(max-width:1120px){.listening-workspace{grid-template-columns:repeat(2,minmax(0,1fr))}}",
    "@media(max-width:900px){.entertainment-video-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.listening-compact-title{margin-bottom:10px;padding:9px 12px}.listening-compact-title .eyebrow{display:none}.listening-compact-title h1{font-size:17px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.listening-workspace{grid-template-columns:1fr;gap:10px}.listening-video-column{position:relative;top:auto}.video-shell{border-radius:14px}.video-meta{display:none}.listening-tip{display:none}.listening-questions{height:clamp(320px,calc(100dvh - 330px),560px);min-height:320px;max-height:560px;overflow-y:auto;overflow-x:hidden;overscroll-behavior-y:contain;-webkit-overflow-scrolling:touch;touch-action:pan-y;scrollbar-gutter:stable}.listening-part-tabs{position:sticky;top:0}.listening-actions{position:sticky;bottom:0}.listening-q-list{padding-bottom:92px}}",
    "@media(max-width:560px){.entertainment-video-grid{grid-template-columns:1fr}.entertainment-video-info{padding:12px 13px 14px}.listening-compact-title{display:block;padding:8px 10px}.listening-compact-title h1{font-size:15px}.listening-part-tabs{gap:6px;padding:8px}.listening-part-tab{padding:8px 9px}.listening-q-list{padding-left:7px;padding-right:7px;padding-bottom:96px}.listening-q{padding:12px}.listening-questions{height:clamp(300px,calc(100dvh - 300px),520px);min-height:300px}.listening-actions{align-items:flex-start;flex-direction:column;padding:10px}.listening-actions-btns{width:100%;justify-content:stretch}.listening-actions-btns button{flex:1}}"
  ].join("");
  document.head.appendChild(s);
}

function escHtml(value){
  return String(value==null?"":value).replace(/[&<>"']/g,function(ch){
    return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch];
  });
}
function norm(v){
  return String(v||"").toLowerCase().replace(/[–—-]/g," ").replace(/[^a-z0-9\s']/g," ").replace(/\s+/g," ").trim();
}
function getPart(partId){
  return PARTS.find(function(p){return p.id===Number(partId);});
}
function getQuestion(partId,qid){
  var part=getPart(partId);
  return part&&part.questions.find(function(q){return q.id===Number(qid);});
}
function questionHtml(part,q){
  var body="";
  if(q.type==="mc"){
    body='<div class="listening-options">'+q.options.map(function(opt,i){
      var letter=String.fromCharCode(65+i);
      return '<label class="listening-option"><input type="radio" name="ent-p'+part.id+'-q-'+q.id+'" value="'+letter+'"><span><b>'+letter+'.</b> '+escHtml(opt)+'</span></label>';
    }).join("")+'</div>';
  }else{
    var requiredWords=String(q.answerText||"").trim().split(/\s+/).filter(Boolean).length;
    body='<input class="listening-fill" id="ent-p'+part.id+'-input-'+q.id+'" autocomplete="off" spellcheck="false" placeholder="Điền đúng '+requiredWords+' từ"><div class="listening-fill-note">Cần điền đúng '+requiredWords+' từ từ audio</div>';
  }
  var typeLabel=q.type==="mc"?"Multiple Choice":"Note Completion · "+String(q.answerText||"").trim().split(/\s+/).filter(Boolean).length+" từ";
  return '<article class="listening-q" id="ent-p'+part.id+'-q-'+q.id+'" data-part="'+part.id+'" data-qid="'+q.id+'">'+
    '<div class="listening-q-top"><span class="listening-q-num">QUESTION '+q.id+'</span><span class="listening-q-type">'+typeLabel+'</span></div>'+
    '<div class="listening-prompt">'+escHtml(q.prompt)+'</div>'+body+
    '<div class="listening-status" id="ent-p'+part.id+'-status-'+q.id+'"></div>'+
    '<div class="listening-answer" id="ent-p'+part.id+'-answer-'+q.id+'"></div>'+
  '</article>';
}
function partHtml(part){
  return '<section class="listening-part '+(part.id===1?"active":"")+'" id="listeningPart'+part.id+'">'+
    '<div class="listening-part-head"><h2>'+escHtml(part.label)+'</h2><span class="listening-progress" id="listeningProgress'+part.id+'">0 / '+part.questions.length+' answered</span></div>'+
    '<div class="listening-q-list">'+part.questions.map(function(q){return questionHtml(part,q);}).join("")+'</div>'+
    '<div class="listening-actions">'+
      '<div class="listening-actions-left"><div class="listening-score" id="listeningScore'+part.id+'">Chưa nộp</div><div class="listening-score-note" id="listeningScoreNote'+part.id+'">Đáp án chỉ được hiện khi bạn chủ động bấm “Hiện đáp án”.</div></div>'+
      '<div class="listening-actions-btns">'+
        '<button class="secondary" type="button" id="showAnswersBtn'+part.id+'" style="display:none" onclick="toggleEntertainmentAnswers('+part.id+')">Hiện đáp án</button>'+
        '<button class="secondary" type="button" onclick="resetEntertainmentListening('+part.id+')">Làm lại phần</button>'+
        '<button class="primary" type="button" id="submitListeningBtn'+part.id+'" onclick="submitEntertainmentListening('+part.id+')">Nộp đáp án</button>'+
      '</div>'+
    '</div>'+
  '</section>';
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
      playerVars:{playsinline:1,rel:0,modestbranding:1,origin:location.origin}
    });
    window.entertainmentPlayer=player;
  });
}
function seekQuestion(partId,qid){
  var q=getQuestion(partId,qid);
  if(!q)return;
  var target=Math.max(0,q.time-3);
  if(player&&typeof player.seekTo==="function"){
    player.seekTo(target,true);
    if(typeof player.playVideo==="function")player.playVideo();
  }
  if(window.innerWidth<901){
    var card=document.getElementById("ent-p"+partId+"-q-"+qid);
    if(card)card.scrollIntoView({behavior:"smooth",block:"center"});
  }
}
function readAnswer(part,q){
  if(q.type==="mc"){
    var checked=document.querySelector('input[name="ent-p'+part.id+'-q-'+q.id+'"]:checked');
    return checked?checked.value:"";
  }
  var input=document.getElementById("ent-p"+part.id+"-input-"+q.id);
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
function updateProgress(partId){
  var part=getPart(partId);
  if(!part)return;
  var answered=part.questions.filter(function(q){return readAnswer(part,q).trim()!=="";}).length;
  var el=document.getElementById("listeningProgress"+part.id);
  if(el)el.textContent=answered+" / "+part.questions.length+" answered";
}
function submitPart(partId){
  var part=getPart(partId);
  if(!part)return;
  var st=state[part.id];
  st.submitted=true;
  st.answersVisible=false;
  st.results={};
  var correct=0;
  part.questions.forEach(function(q){
    var value=readAnswer(part,q);
    var ok=isCorrect(q,value);
    st.results[q.id]=ok;
    if(ok)correct++;
    var card=document.getElementById("ent-p"+part.id+"-q-"+q.id);
    var status=document.getElementById("ent-p"+part.id+"-status-"+q.id);
    if(card){
      card.classList.remove("correct","wrong");
      card.classList.add(ok?"correct":"wrong");
    }
    if(status)status.textContent=ok?"✓ Đúng":"✕ Sai · Bấm vào câu này để nghe lại";
    document.querySelectorAll('input[name="ent-p'+part.id+'-q-'+q.id+'"]').forEach(function(el){el.disabled=true;});
    var fill=document.getElementById("ent-p"+part.id+"-input-"+q.id);
    if(fill)fill.disabled=true;
    var ans=document.getElementById("ent-p"+part.id+"-answer-"+q.id);
    if(ans){ans.classList.remove("show");ans.textContent="";}
  });
  var score=document.getElementById("listeningScore"+part.id);
  var note=document.getElementById("listeningScoreNote"+part.id);
  var showBtn=document.getElementById("showAnswersBtn"+part.id);
  var submitBtn=document.getElementById("submitListeningBtn"+part.id);
  if(score)score.textContent=correct+" / "+part.questions.length+" correct";
  if(note)note.textContent="Câu sai vẫn chưa hiện đáp án. Bấm vào câu màu đỏ để nghe lại đúng đoạn.";
  if(showBtn){showBtn.style.display="inline-flex";showBtn.textContent="Hiện đáp án";}
  if(submitBtn){submitBtn.textContent="Đã nộp";submitBtn.disabled=true;}
  if(typeof window.recordTutoringActivity==="function")window.recordTutoringActivity("listening_entertainment_part");
  var firstWrong=part.questions.find(function(q){return !st.results[q.id];});
  if(firstWrong){
    var c=document.getElementById("ent-p"+part.id+"-q-"+firstWrong.id);
    if(c)c.scrollIntoView({behavior:"smooth",block:"center"});
  }
}
function toggleAnswers(partId){
  var part=getPart(partId);
  if(!part)return;
  var st=state[part.id];
  if(!st.submitted)return;
  st.answersVisible=!st.answersVisible;
  part.questions.forEach(function(q){
    var ans=document.getElementById("ent-p"+part.id+"-answer-"+q.id);
    if(!ans)return;
    ans.textContent="Đáp án: "+answerLabel(q);
    ans.classList.toggle("show",st.answersVisible);
  });
  var btn=document.getElementById("showAnswersBtn"+part.id);
  if(btn)btn.textContent=st.answersVisible?"Ẩn đáp án":"Hiện đáp án";
}
function resetPart(partId){
  var part=getPart(partId);
  if(!part)return;
  state[part.id]={submitted:false,answersVisible:false,results:{}};
  part.questions.forEach(function(q){
    var card=document.getElementById("ent-p"+part.id+"-q-"+q.id);
    if(card)card.classList.remove("correct","wrong");
    document.querySelectorAll('input[name="ent-p'+part.id+'-q-'+q.id+'"]').forEach(function(el){el.disabled=false;el.checked=false;});
    var fill=document.getElementById("ent-p"+part.id+"-input-"+q.id);
    if(fill){fill.disabled=false;fill.value="";}
    var status=document.getElementById("ent-p"+part.id+"-status-"+q.id);
    if(status)status.textContent="";
    var ans=document.getElementById("ent-p"+part.id+"-answer-"+q.id);
    if(ans){ans.textContent="";ans.classList.remove("show");}
  });
  var score=document.getElementById("listeningScore"+part.id);
  var note=document.getElementById("listeningScoreNote"+part.id);
  var showBtn=document.getElementById("showAnswersBtn"+part.id);
  var submitBtn=document.getElementById("submitListeningBtn"+part.id);
  if(score)score.textContent="Chưa nộp";
  if(note)note.textContent="Đáp án chỉ được hiện khi bạn chủ động bấm “Hiện đáp án”.";
  if(showBtn)showBtn.style.display="none";
  if(submitBtn){submitBtn.textContent="Nộp đáp án";submitBtn.disabled=false;}
  updateProgress(part.id);
}
function switchPart(partId){
  activePart=Number(partId);
  document.querySelectorAll(".listening-part").forEach(function(el){el.classList.remove("active");});
  document.querySelectorAll(".listening-part-tab").forEach(function(el){el.classList.remove("active");});
  var part=document.getElementById("listeningPart"+activePart);
  var tab=document.getElementById("listeningPartTab"+activePart);
  if(part)part.classList.add("active");
  if(tab)tab.classList.add("active");
  var panel=document.getElementById("listeningQuestionPanel");
  if(panel)panel.scrollTop=0;
}
function bindWorkspace(){
  var panel=document.getElementById("listeningQuestionPanel");
  if(!panel)return;
  panel.addEventListener("input",function(e){
    var card=e.target.closest(".listening-q");
    if(card)updateProgress(card.dataset.part);
  });
  panel.addEventListener("change",function(e){
    var card=e.target.closest(".listening-q");
    if(card)updateProgress(card.dataset.part);
  });
  panel.addEventListener("click",function(e){
    var card=e.target.closest(".listening-q");
    if(!card)return;
    var partId=Number(card.dataset.part);
    if(!state[partId]||!state[partId].submitted||!card.classList.contains("wrong"))return;
    if(e.target.closest("button"))return;
    seekQuestion(partId,card.dataset.qid);
  });
}
function destroyEntertainmentPlayer(){
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
    '<div class="unit-hero"><div class="eyebrow">Listening</div><h1>Listening</h1><p>Video-based listening practice with IELTS-style questions and replay for incorrect answers.</p></div>'+
    '<div class="section-title"><h2>Videos</h2><span>Choose a category</span></div>'+
    '<div class="units">'+
      '<button class="unit-card listening-unit-card" onclick="location.hash=\'listening/entertainment\'">'+
        '<div class="unit-top"><span class="unit-no">ENTERTAINMENT</span><span class="status live">Available</span></div>'+
        '<h3>Entertainment</h3><p>Video listening practice organised by individual videos.</p><span class="unit-arrow">→</span>'+
      '</button>'+
      '<button class="unit-card listening-unit-card" onclick="location.hash=\'listening/news\'">'+
        '<div class="unit-top"><span class="unit-no">NEWS</span><span class="status live">Available</span></div>'+
        '<h3>News</h3><p>Current-affairs listening practice organised by individual videos.</p><span class="unit-arrow">→</span>'+
      '</button>'+
    '</div>';
  window.scrollTo({top:0,behavior:"smooth"});
}

function renderEntertainment(){
  injectStyles();
  var mount=document.getElementById("pageMount");
  if(!mount)return;
  mount.style.display="block";
  mount.innerHTML=
    '<div class="breadcrumbs"><button class="crumb-btn" onclick="goAreaHome()">Home</button><span>›</span><button class="crumb-btn" onclick="location.hash=\'listening\'">Listening</button><span>›</span><span>Entertainment</span></div>'+
    '<div class="unit-hero"><div class="eyebrow">Entertainment</div><h1>Entertainment</h1><p>Choose a video to start its listening practice.</p></div>'+
    '<div class="section-title"><h2>Videos</h2><span>'+ENTERTAINMENT_VIDEOS.length+' video'+(ENTERTAINMENT_VIDEOS.length===1?"":"s")+'</span></div>'+
    '<div class="entertainment-video-grid">'+
      ENTERTAINMENT_VIDEOS.map(function(video){
        return '<button class="entertainment-video-card" type="button" onclick="location.hash=\'listening/entertainment/'+escHtml(video.slug)+'\'">'+
          '<div class="entertainment-thumb"><img src="'+escHtml(video.thumbnail)+'" alt="'+escHtml(video.title)+' thumbnail" loading="lazy"><span class="entertainment-play">▶</span></div>'+
          '<div class="entertainment-video-info"><h3>'+escHtml(video.title)+'</h3><p>'+escHtml(video.channel)+'</p></div>'+
        '</button>';
      }).join("")+
    '</div>';
  window.scrollTo({top:0,behavior:"smooth"});
}

function renderEntertainmentVideo(){
  injectStyles();
  PARTS.forEach(function(part){state[part.id]={submitted:false,answersVisible:false,results:{}};});
  activePart=1;
  var mount=document.getElementById("pageMount");
  if(!mount)return;
  mount.style.display="block";
  mount.innerHTML=
    '<div class="breadcrumbs"><button class="crumb-btn" onclick="goAreaHome()">Home</button><span>›</span><button class="crumb-btn" onclick="location.hash=\'listening\'">Listening</button><span>›</span><button class="crumb-btn" onclick="location.hash=\'listening/entertainment\'">Entertainment</button><span>›</span><span>'+escHtml(VIDEO_TITLE)+'</span></div>'+
    '<div class="listening-compact-title"><div class="eyebrow">Entertainment</div><h1>'+escHtml(VIDEO_TITLE)+'</h1></div>'+
    '<div class="listening-workspace">'+
      '<section class="listening-video-column">'+
        '<div class="video-shell"><div class="video-frame"><div id="entertainmentPlayer"></div></div>'+
        '<div class="video-meta"><div><strong>'+escHtml(VIDEO_TITLE)+'</strong><span>Kurzgesagt – In a Nutshell · YouTube</span></div></div></div>'+
        '<div class="listening-tip"><b>Chế độ xem lại:</b> Sau khi nộp bài, câu sai sẽ chuyển sang màu đỏ. Bấm vào câu sai để video quay lại đúng đoạn cần nghe. Đáp án đúng vẫn được ẩn cho đến khi bạn bấm <b>Hiện đáp án</b>.</div>'+
      '</section>'+
      '<section class="listening-questions" id="listeningQuestionPanel">'+
        '<div class="listening-part-tabs">'+
          PARTS.map(function(part){return '<button type="button" class="listening-part-tab '+(part.id===1?"active":"")+'" id="listeningPartTab'+part.id+'" onclick="switchEntertainmentPart('+part.id+')"><strong>'+escHtml(part.label)+'</strong><span>'+escHtml(part.approx)+' · '+part.questions.length+' câu</span></button>';}).join("")+
        '</div>'+
        PARTS.map(partHtml).join("")+
      '</section>'+
    '</div>';
  bindWorkspace();
  initPlayer();
  window.scrollTo({top:0,behavior:"smooth"});
}

injectStyles();
window.renderListeningHome=renderListeningHome;
window.renderEntertainment=renderEntertainment;
window.renderEntertainmentVideo=renderEntertainmentVideo;
window.submitEntertainmentListening=submitPart;
window.toggleEntertainmentAnswers=toggleAnswers;
window.resetEntertainmentListening=resetPart;
window.switchEntertainmentPart=switchPart;
window.seekEntertainmentQuestion=seekQuestion;
window.destroyEntertainmentPlayer=destroyEntertainmentPlayer;
window.LISTENING_ENTERTAINMENT_PARTS=PARTS;
})();