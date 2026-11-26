/* Motion System V1. Presentation only; scoring, timers and access remain in their engines. */
(function(global){
"use strict";
const EASE="cubic-bezier(.22,1,.36,1)",running=new WeakMap();
const reduced=()=>typeof global.matchMedia==="function"&&global.matchMedia("(prefers-reduced-motion: reduce)").matches;
const scrollBehavior=()=>reduced()?"auto":"smooth";
function animate(node,frames,duration){
 if(!node||reduced()||typeof node.animate!=="function")return null;
 try{running.get(node)?.cancel();const a=node.animate(frames,{duration,easing:EASE,fill:"none"});running.set(node,a);return a}catch(_){return null}
}
function enter(node,distance=6,duration=240){return animate(node,[{opacity:.72,transform:"translateY("+distance+"px)"},{opacity:1,transform:"none"}],duration)}
function question(root,opts={}){
 const card=root.querySelector(".question-card");if(!card)return;
 if(opts.direction){
  const pane=card.querySelector(".reading-question-pane")||card;
  animate(pane,[{opacity:.65,transform:"translateX("+(opts.direction<0?-12:12)+"px)"},{opacity:1,transform:"none"}],220);
 }else if(opts.feedback){
  animate(root.querySelector("#feedbackMount .feedback"),[{opacity:.55},{opacity:1}],180);
  animate(root.querySelector(".answer.correct"),[{opacity:.72},{opacity:1}],150);
 }
}
const resultFrames=new WeakMap();
function result(root,score){
 const ring=root.querySelector(".score-ring"),n=Number(score);
 if(!ring||!Number.isFinite(n)||reduced())return;
 const target=Math.max(0,Math.min(100,n));
 if(typeof global.requestAnimationFrame==="function"){
  const previous=resultFrames.get(ring);if(previous)global.cancelAnimationFrame(previous.id);
  const bg=ring.style.background,color=bg.includes("var(--accent2)")?"var(--accent2)":"var(--accent)",track=bg.includes("rgba(190,24,93")?"rgba(190,24,93,.10)":"rgba(120,145,180,.12)";
  const run={id:0},start=global.performance.now();resultFrames.set(ring,run);
  const tick=t=>{
   if(resultFrames.get(ring)!==run)return;
   if(!ring.isConnected||!root.getClientRects().length||reduced()){ring.style.background=bg;resultFrames.delete(ring);return}
   const p=Math.min(1,Math.max(0,(t-start)/650)),v=target*(1-Math.pow(1-p,3));
   ring.style.background="conic-gradient("+color+" "+v*3.6+"deg,"+track+" 0deg)";
   if(p<1)run.id=global.requestAnimationFrame(tick);else{ring.style.background=bg;resultFrames.delete(ring)}
  };
  run.id=global.requestAnimationFrame(tick);
 }
 root.querySelectorAll(".stat").forEach((el,i)=>enter(el,4,220+Math.min(i,3)*35));
}
let observer=null,source=null;
function beginRoute(hash,mount){
 observer?.disconnect();observer=null;
 // Replace stale protected content immediately; never delay permission checks.
 mount.innerHTML='<div class="motion-route-loading" role="status" aria-live="polite"><span class="motion-loading-label">Đang tải…</span><div class="motion-loading-line" aria-hidden="true"></div><div class="motion-loading-grid" aria-hidden="true"><span></span><span></span><span></span></div></div>';
 mount.style.display="block";
 if(typeof global.MutationObserver!=="function")return;
 const watch=new global.MutationObserver(()=>{
  if(global.location.hash.replace(/^#/,"")!==hash){watch.disconnect();return}
  const first=mount.firstElementChild;
  if(!first||first.classList.contains("motion-route-loading"))return;
  if(first.classList.contains("empty")&&/Đang (?:tải|kiểm tra)/i.test(first.textContent||""))return;
  if(mount.style.display==="none")return;
  watch.disconnect();if(observer===watch)observer=null;
  const focused=mount.querySelector(".mis-app,.hsg-hp-focus,.hsg-exam-ws-v1,[data-school-quiz]");
  if(!focused)enter(mount);
  if(source&&source.hash===hash&&Date.now()-source.at<2000){
   const target=mount.querySelector(".uw-hero-icon");
   if(target&&!reduced()){
    const rect=target.getBoundingClientRect(),dx=source.x-(rect.left+rect.width/2),dy=source.y-(rect.top+rect.height/2);
    const x=Math.max(-72,Math.min(72,dx)),y=Math.max(-48,Math.min(48,dy));
    animate(target,[{opacity:.6,transform:"translate("+x+"px,"+y+"px) scale(.8) rotate(-7deg)"},{opacity:1,transform:"rotate(-7deg)"}],350);
   }
  }
  source=null;
 });
 observer=watch;watch.observe(mount,{childList:true});
}
if(global.document?.addEventListener)global.document.addEventListener("click",e=>{
 const link=e.target?.closest?.("a.cl-card[href]");
 if(!link||e.defaultPrevented||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
 const art=link.querySelector(".cl-art-icon");if(!art)return;
 const rect=art.getBoundingClientRect(),hash=link.getAttribute("href").replace(/^#/,"");
 source={hash,x:rect.left+rect.width/2,y:rect.top+rect.height/2,at:Date.now()};
},true);
global.MotionCore=Object.freeze({reduced,scrollBehavior,animate,enter,question,result,beginRoute});
})(window);
