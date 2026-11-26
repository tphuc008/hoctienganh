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
// Navigation snapshots are detached, inert, same-user catalogue copies only.
// Never retain a protected reading/exam/teacher page while awaiting authorization.
let pending=null,snapshot=null,source=null,native=null,overlay=null,serial=0;
const renderedOwners=new WeakMap();
const hashNow=()=>global.location.hash.replace(/^#/,"");
const catalogueSelector=".pw-portal,.td-dashboard,.cl-library,.uw-workspace,.uw-g6-head";
const safeRoute=h=>h==="tutoring"||/^grade-(6|9|10|11|12)(?:\/unit-\d+(?:\/vocabulary-practice-\d+)?)?$/.test(h);
function cleanup(){
 if(pending){clearTimeout(pending.timer);pending.observer?.disconnect();pending=null}
 if(native){native.skipTransition?.();native=null}
 global.document.documentElement.classList.remove("motion-native");
 if(overlay){overlay.remove();overlay=null}
}
function capture(mount,owner){
 // Capture before hideAll, but keep it detached until the next route is verified.
 snapshot=null;
 if(reduced()||!owner||renderedOwners.get(mount)!==String(owner)||mount.style.display==="none"||mount.firstElementChild?.inert||!mount.firstElementChild?.matches(catalogueSelector))return;
 const node=mount.firstElementChild.cloneNode(true),rect=mount.firstElementChild.getBoundingClientRect();
 if(!rect.width||!rect.height)return;
 node.querySelectorAll(".pw-teacher,script,iframe,video,audio,canvas,dialog,input,textarea,select").forEach(el=>el.remove());
 for(const el of [node,...node.querySelectorAll("*")]){
  el.removeAttribute("id");
  for(const attr of [...el.attributes])if(/^on/i.test(attr.name))el.removeAttribute(attr.name);
 }
 node.inert=true;node.setAttribute("aria-hidden","true");
 snapshot={node,owner:String(owner),rect};
}
function loading(hash,mount){
 if(!pending||pending.hash!==hash||pending.mount!==mount)return;
 if(pending.slow)showLoading(pending);
}
function showLoading(p){
 if(pending!==p||hashNow()!==p.hash)return;
 p.slow=true;snapshot=null;
 p.mount.innerHTML='<div class="motion-route-loading" role="status" aria-live="polite"><span class="motion-loading-label">Đang tải…</span><div class="motion-loading-line" aria-hidden="true"></div><div class="motion-loading-grid" aria-hidden="true"><span></span><span></span><span></span></div></div>';
 p.mount.style.display="block";
}
function beginRoute(hash,mount){
 cleanup();
 const p={hash,mount,token:++serial,owner:null,slow:false,timer:null,observer:null};
 pending=p;renderedOwners.delete(mount);running.get(mount)?.cancel();mount.replaceChildren();mount.style.display="block";
 p.timer=setTimeout(()=>showLoading(p),150);
 // Legacy or error renderers may still render themselves; stop loading on completion.
 if(typeof global.MutationObserver==="function"){
  p.observer=new global.MutationObserver(()=>{
   if(pending!==p||hashNow()!==hash){p.observer.disconnect();return}
   const first=mount.firstElementChild;
   if(!first||first.classList.contains("motion-route-loading")||mount.style.display==="none")return;
   if(first.classList.contains("empty")&&/Đang (?:tải|kiểm tra)/i.test(first.textContent||""))return;
   clearTimeout(p.timer);p.observer.disconnect();pending=null;snapshot=null;
   if(!mount.querySelector(".mis-app,.hsg-hp-focus,.hsg-exam-ws-v1,[data-school-quiz],.listening-video-layout"))enter(mount,4,280);
  });
  p.observer.observe(mount,{childList:true});
 }
 return p.token;
}
function authorize(hash,owner){
 if(pending?.hash===hash)pending.owner=owner?String(owner):null;
}
function iconBridge(mount,hash){
 if(source&&source.hash===hash&&Date.now()-source.at<1500){
  const target=mount.querySelector(".uw-hero-icon");
  if(target&&!reduced()){
   const rect=target.getBoundingClientRect(),dx=source.x-(rect.left+rect.width/2),dy=source.y-(rect.top+rect.height/2);
   animate(target,[{opacity:.6,transform:"translate("+Math.max(-60,Math.min(60,dx))+"px,"+Math.max(-40,Math.min(40,dy))+"px) scale(.86) rotate(-7deg)"},{opacity:1,transform:"rotate(-7deg)"}],320);
  }
 }
 source=null;
}
function commit(hash,mount,render){
 if(hashNow()!==hash)return;
 const p=pending;
 if(!p||p.hash!==hash||p.mount!==mount){render();return}
 clearTimeout(p.timer);p.observer?.disconnect();pending=null;
 const old=!p.slow&&p.owner&&snapshot?.owner===p.owner&&safeRoute(hash)&&!reduced()?snapshot:null;
 snapshot=null;
 const valid=()=>serial===p.token&&hashNow()===hash;
 const finish=()=>{if(!valid())return;render();if(p.owner&&mount.firstElementChild?.matches(catalogueSelector))renderedOwners.set(mount,p.owner);iconBridge(mount,hash)};
 // Native snapshot crossfade only after both authorization and asset preparation.
 if(old&&typeof global.document.startViewTransition==="function"){
  const doc=global.document;
  mount.replaceChildren(old.node);mount.style.display="block";
  doc.documentElement.classList.add("motion-native");
  try{
   const vt=doc.startViewTransition(()=>{
    if(!valid())return;
    mount.replaceChildren();finish();
   });
   native=vt;
   const done=()=>{if(native===vt){native=null;doc.documentElement.classList.remove("motion-native")}};
   vt.finished.then(done,done);
   vt.updateCallbackDone?.catch(()=>{if(valid()){mount.replaceChildren();mount.innerHTML='<div class="empty"><b>Không thể mở trang</b>Vui lòng tải lại trang.</div>'} });
   return;
  }catch(_){doc.documentElement.classList.remove("motion-native");mount.replaceChildren()}
 }
 // Web Animations fallback: paint new content immediately and overlap an inert old visual.
 finish();
 if(!valid()||reduced()||mount.style.display==="none")return;
 const focused=mount.querySelector(".mis-app,.hsg-hp-focus,.hsg-exam-ws-v1,[data-school-quiz],.listening-video-layout");
 if(focused)return;
 if(old&&typeof mount.animate==="function"){
  const layer=global.document.createElement("div");layer.className="motion-old-layer";layer.inert=true;layer.setAttribute("aria-hidden","true");
  Object.assign(layer.style,{left:old.rect.left+"px",top:old.rect.top+"px",width:old.rect.width+"px",height:old.rect.height+"px"});
  layer.appendChild(old.node);global.document.body.appendChild(layer);overlay=layer;
  const incoming=animate(mount,[{opacity:.35,transform:"translateY(4px)"},{opacity:1,transform:"none"}],280);
  const outgoing=animate(layer,[{opacity:1},{opacity:0}],200);
  if(outgoing)outgoing.finished.then(()=>{layer.remove();if(overlay===layer)overlay=null},()=>{layer.remove();if(overlay===layer)overlay=null});
  else{layer.remove();overlay=null}
 }else enter(mount,4,280);
}
const prefetched=new Set();
function prefetch(e){
 const a=e.target?.closest?.("a.cl-card[href],a.uw-card[href]");
 if(!a||global.navigator?.connection?.saveData||reduced()||prefetched.size>=24)return;
 const hash=a.getAttribute("href").replace(/^#/,"");
 const m=hash.match(/^grade-(6|9|10|12)\/unit-(\d+)(?:\/vocabulary-practice-\d+)?$/);
 if(!m)return;
 const manifest=global.ContentManifest,descriptor=manifest?.vocabularyItem?.(Number(m[1]),Number(m[2]))||manifest?.entries?.find(x=>x.route===hash);
 const url=descriptor?.source;
 if(typeof url!=="string"||!/^(?:features\/|content\/)?grade[0-9][a-z0-9-]*\.js(?:\?v=[a-zA-Z0-9-]+)?$/.test(url)||prefetched.has(url))return;
 prefetched.add(url);
 const link=global.document.createElement("link");link.rel="prefetch";link.as="script";link.href=url;global.document.head.appendChild(link);
}
if(global.document?.addEventListener){
 global.document.addEventListener("pointerover",prefetch,{passive:true});
 global.document.addEventListener("focusin",prefetch);
 global.document.addEventListener("click",e=>{
  const link=e.target?.closest?.("a.cl-card[href]");
  if(!link||e.defaultPrevented||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
  const art=link.querySelector(".cl-art-icon");if(!art)return;
  const rect=art.getBoundingClientRect(),hash=link.getAttribute("href").replace(/^#/,"");
  source={hash,x:rect.left+rect.width/2,y:rect.top+rect.height/2,at:Date.now()};
 },true);
}
global.MotionCore=Object.freeze({reduced,scrollBehavior,animate,enter,question,result,capture,beginRoute,loading,authorize,commit});
})(window);
