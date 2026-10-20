/* A single learner-facing attempt lifecycle, without imposing a common grading
 * algorithm on Vocabulary, Reading, Listening, School or examinations.
 * The existing engine remains authoritative for answers and grading.
 */
(function(global){
  "use strict";
  const PHASES=Object.freeze({ready:"ready",inProgress:"in_progress",completed:"completed"});
  const categories=new Set(["vocabulary","grammar","school","listening","reading","exam"]);
  function snapshot(input={}){
    const total=Number(input.total);
    const count=Number(input.done);
    if(!Number.isSafeInteger(total)||total<1||total>1000)
      throw new Error("LearningFlow: invalid total");
    if(!Number.isSafeInteger(count)||count<0||count>total)
      throw new Error("LearningFlow: invalid progress");
    const phase=input.completed?PHASES.completed:input.started?PHASES.inProgress:PHASES.ready;
    const synced=input.synced===true;
    const percent=Math.round(count/total*100);
    const label=phase===PHASES.ready?"Chưa bắt đầu":
      phase===PHASES.completed?(input.mode==="mastery"?"Đã hoàn thành":"Đã nộp"):"Đang làm";
    return Object.freeze({phase,done:count,total,percent,synced,
      label,text:label+" · "+count+"/"+total});
  }
  function valid(input){
    if(!input||!categories.has(input.category)||typeof input.slug!=="string"||
      !input.slug.trim()||input.slug.length>180)
      throw new Error("LearningFlow: invalid attempt identity");
  }
  function track(input){
    valid(input);
    if(input.ownerId&&String(input.ownerId)!==global.LearningCore.userId())return null;
    const status=snapshot(input);
    const key=input.category+"/"+input.slug;
    const old=global.LearningCore.readDraft("lifecycle",key);
    const meta={
      category:input.category,slug:input.slug,phase:status.phase,
      done:status.done,total:status.total,percent:status.percent,synced:status.synced,
      startedAt:Number(input.startedAt)||old?.startedAt||Date.now(),
      updatedAt:Date.now(),completedAt:status.phase==="completed"
        ?old?.completedAt||Date.now():null
    };
    global.LearningCore.writeDraft("lifecycle",key,meta);
    return status;
  }
  function read(category,slug){
    valid({category,slug});
    return global.LearningCore.readDraft("lifecycle",category+"/"+slug);
  }
  function reset(category,slug){
    valid({category,slug});
    global.LearningCore.clearDraft("lifecycle",category+"/"+slug);
  }
  function esc(value){return String(value??"").replace(/[&<>"']/g,c=>
    ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
  function markup(input){
    const s=snapshot(input);
    return '<span class="learning-flow-badge" data-learning-phase="'+esc(s.phase)+
      '" role="status" aria-live="polite">'+esc(s.text)+'</span>';
  }
  function paint(element,input){
    const s=snapshot(input);
    if(!element)return s;
    element.classList.add("learning-flow-badge");
    element.dataset.learningPhase=s.phase;
    element.textContent=s.text;
    element.setAttribute("role","status");
    return s;
  }
  const styles=document.createElement("style");
  styles.id="learningFlowStyles";
  styles.textContent=".learning-flow-badge{display:inline-flex;align-items:center;gap:5px;max-width:100%;padding:5px 10px;border-radius:999px;border:1px solid var(--line,rgba(120,130,140,.2));background:var(--soft,rgba(80,90,110,.09));color:var(--text,inherit);font-size:12px;font-weight:750;white-space:nowrap;line-height:1.4}.learning-flow-badge[data-learning-phase=completed]{border-color:rgba(52,211,153,.35);color:var(--good,#15803d)}";
  document.head.appendChild(styles);
  global.LearningFlow=Object.freeze({PHASES,snapshot,track,read,reset,markup,paint});
})(window);
