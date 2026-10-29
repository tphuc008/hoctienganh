/* Grammar Topics 1 & 2 — pronunciation/stress audio.
 * Verified Commons examples (CC BY 3.0 US, Judith Franck / Association Shtooka):
 * https://commons.wikimedia.org/wiki/File:En-uk-a_ship.ogg
 * https://commons.wikimedia.org/wiki/File:En-uk-a_sheep.ogg
 * https://commons.wikimedia.org/wiki/File:En-uk-book.ogg
 * https://commons.wikimedia.org/wiki/File:En-uk-sea.ogg
 * Others: device en-GB speech synthesis, distinctly labeled (not recorded files).
 * No audio for isolated IPA glyphs, which TTS cannot reliably pronounce.
 */
(function(g){
"use strict";
const catalog={
  "a ship":{file:"En-uk-a_ship.ogg",license:"CC BY 3.0 US",author:"Judith Franck / Association Shtooka"},
  "a sheep":{file:"En-uk-a_sheep.ogg",license:"CC BY 3.0 US",author:"Judith Franck / Association Shtooka"},
  "book":{file:"En-uk-book.ogg",license:"CC BY 3.0 US",author:"Judith Franck / Association Shtooka"},
  "sea":{file:"En-uk-sea.ogg",license:"CC BY 3.0 US",author:"Judith Franck / Association Shtooka"}
};
const safe=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
let player=null,playingId="",sequenceToken=0;
function normalize(s){return String(s||"").trim().toLowerCase().replace(/[^a-z '-]/g,"").replace(/\s+/g," ");}
function valid(s){return /^[a-zA-Z][a-zA-Z' -]{0,45}$/.test(String(s||""));}
function wordIn(str){
 const quoted=String(str||"").match(/[“"]([a-z][a-z'-]*)[”"]/i);
 return quoted?quoted[1]:null;
}
function syllableTarget(s){
 const t=String(s||"");
 if(t.includes("→"))return t.split("→")[0].trim();
 if(/^[a-z]+(?:\s+\/[^/]+\/)?$/i.test(t))return t.split(/\s+/)[0];
 return null;
}
function caseWords(topic,section,c,index){
 if(topic===2 && section.id==="noun-verb-shift"){
   const word=c.name.split(/[–—-]/)[0].trim().toLowerCase();
   return valid(word)?[{word:"a "+word,label:"Danh từ",display:word+" (N)"},{word:"to "+word,label:"Động từ",display:word+" (V)"}]:[];
 }
 const x=syllableTarget(c.sentence)||c.name.split("–")[0].trim().split(/\s+/).pop();
 return valid(x)?[{word:x,label:"Nghe",display:x}]:[];
}
function exampleWords(topic,section,x){
 let target=wordIn(x.inverted);
 if(topic===2&&section.id==="noun-verb-shift"){
   target=wordIn(x.inverted)||target;
   return target&&valid(target)?[{word:"a "+target,label:"Danh từ",display:target+" (N)"},{word:"to "+target,label:"Động từ",display:target+" (V)"}]:[];
 }
 if(topic===2&&!target){
   const tail=String(x.inverted).split("?").pop().trim();
   if(/^[a-z]+$/i.test(tail))target=tail;
 }
 return target&&valid(target)?[{word:target,label:"Nghe",display:target}]:[];
}
function questionWords(topic,q){
 const x=wordIn(q.stem);
 if(topic===2 && /\bNOUN\s+to\s+VERB\b/i.test(q.stem)&&x){
   return [{word:"a "+x,label:"Danh từ",display:x+" (N)"},{word:"to "+x,label:"Động từ",display:x+" (V)"}];
 }
 return x&&valid(x)?[{word:x,label:"Nghe từ",display:x}]:[];
}
function optionWords(topic,q,i){
 if(topic!==2)return [];
 // Stress-comparison options are the answer candidates, not IPA symbols or positional descriptions.
 const value=q.options[i],isTerm=/^[a-z]+(?:-[a-z]+)?$/i.test(value);
 return isTerm?[{word:value,label:"Nghe "+value,display:value}]:[];
}
function button(item,mode,short){
 if(!item||!valid(item.word))return "";
 const label=item.label||"Nghe";
 return '<button type="button" class="g-audio-btn" data-grammar-audio-word="'+safe(item.word)+
  '" data-grammar-audio-mode="'+safe(mode||"normal")+'" title="'+safe(label+' '+item.display)+
  '" aria-label="'+safe(label+" "+item.display)+(mode==="slow"?" chậm":"")+'">'+
  '<span aria-hidden="true">🔊</span><span>'+safe(short?mode==="slow"?"Chậm":label:label)+'</span></button>';
}
function controls(items,opts){
 if(!Array.isArray(items)||!items.length)return "";
 opts=opts||{};
 const id=opts.id||"";
 let body=items.map(item=>button(item,"normal",opts.short)).join("");
 if(items.length===1){body+=button({...items[0],label:"Nghe chậm"},"slow",true);}
 if(items.length>=2){
   body+='<button type="button" class="g-audio-btn g-audio-compare" data-grammar-audio-pair="'+
      safe(items.map(x=>x.word).join("|"))+'" aria-label="Nghe đối chiếu A rồi B">'+
      '<span aria-hidden="true">↔</span><span>Nghe A → B</span></button>';
 }
 return '<div class="g-audio-controls" data-grammar-audio-controls="'+safe(id)+'">'+body+
   '<span class="g-audio-status" role="status" aria-live="polite"></span></div>';
}
function context(topic,kind,section,object,index){
 if(topic!==1&&topic!==2)return "";
 let items=[];
 if(kind==="case")items=caseWords(topic,section,object,index);
 if(kind==="example")items=exampleWords(topic,section,object);
 if(kind==="comparison"){
  const c=section.learnV11?.cases||[];
  if(c.length>=2){
   items=[caseWords(topic,section,c[0],0)[0],caseWords(topic,section,c[1],1)[0]].filter(Boolean);
   if(topic===1&&section.id==="vowels-i")items=[{word:"a ship",label:"A · /ɪ/",display:"a ship"},{word:"a sheep",label:"B · /iː/",display:"a sheep"}];
   if(topic===2&&section.id==="noun-verb-shift")items=caseWords(topic,section,c[0],0);
  }
 }
 if(kind==="question")items=questionWords(topic,object);
 if(kind==="option")items=optionWords(topic,object,index);
 return controls(items,{short:kind==="option",id:kind+"-"+(object?.id||section?.id||"")});
}
function stop(){
 sequenceToken++;
 if(player){try{player.pause();player.currentTime=0;}catch(_){ }player=null;}
 if(g.speechSynthesis)try{g.speechSynthesis.cancel()}catch(_){ }
 playingId="";
}
function pickVoice(){
 const voices=g.speechSynthesis?.getVoices?.()||[];
 return voices.find(v=>/^en[-_]GB$/i.test(v.lang))||
   voices.find(v=>/^(english.+united kingdom|british|daniel|kate|serena)/i.test(v.name||""))||
   voices.find(v=>/^en([-_]|$)/i.test(v.lang))||null;
}
function status(btn,msg){
 const wrap=btn.closest?.(".g-audio-controls")||btn.parentElement;
 const target=wrap?.querySelector?.(".g-audio-status");
 if(target)target.textContent=msg||"";
}
function speak(text,slow,token,cb,btn){
 if(!g.speechSynthesis||typeof g.SpeechSynthesisUtterance!=="function"){
   status(btn,"Thiết bị không hỗ trợ giọng đọc. Hãy thử Chrome hoặc Safari.");return;
 }
 const voice=pickVoice();
 const t=new g.SpeechSynthesisUtterance(text);
 t.lang=voice?.lang||"en-GB";
 if(voice)t.voice=voice;
 t.rate=slow?.82:1;
 t.pitch=1;
 const isBritish=voice?(/en[-_]GB/i.test(voice.lang)||/british/i.test(voice.name||"")):false;
 status(btn,isBritish?"Giọng đọc thiết bị (Anh–Anh)":voice?"Giọng đọc thiết bị — không bảo đảm Anh–Anh":"Đang dùng giọng mặc định — accent tùy thiết bị");
 t.onend=()=>{if(sequenceToken===token&&cb)cb();};
 t.onerror=()=>{if(sequenceToken===token)status(btn,"Không phát được giọng đọc trên thiết bị này.");};
 try{g.speechSynthesis.speak(t)}catch(_){status(btn,"Không thể bắt đầu phát âm thanh.");}
}
function single(text,slow,token,done,btn){
 if(!valid(text)){status(btn,"Không có từ hợp lệ để phát.");return;}
 const clip=catalog[normalize(text)];
 if(clip&&typeof g.Audio==="function"){
  const link="https://commons.wikimedia.org/wiki/Special:Redirect/file/"+encodeURIComponent(clip.file);
  const media=new g.Audio(link);
  player=media;
  media.preload="none";media.playbackRate=slow?.85:1;
  let usedFallback=false;
  const fallback=()=>{
    if(sequenceToken!==token||usedFallback)return;
    usedFallback=true;player=null;speak(text,slow,token,done,btn);
  };
  media.onended=()=>{if(sequenceToken===token){player=null;if(done)done();}};
  media.onerror=fallback;
  status(btn,"Bản ghi Anh–Anh · Wikimedia Commons (CC BY 3.0)");
  try{
    const p=media.play();
    if(p&&typeof p.catch==="function")p.catch(fallback);
  }catch(_){fallback();}
 }else speak(text,slow,token,done,btn);
}
function handleButton(btn){
 if(!btn)return false;
 const word=btn.dataset?.grammarAudioWord;
 const pair=btn.dataset?.grammarAudioPair;
 if(!word&&!pair)return false;
 stop();const token=sequenceToken;
 if(pair){
   const xs=pair.split("|").filter(valid).slice(0,2);
   if(xs.length!==2){status(btn,"Cặp từ chưa hợp lệ.");return true;}
   single(xs[0],false,token,()=>{if(token===sequenceToken)single(xs[1],false,token,null,btn)},btn);
 }else single(word,btn.dataset.grammarAudioMode==="slow",token,null,btn);
 return true;
}
g.GrammarPhoneticsAudioV1={context,handleButton,stop,questionWords,caseWords,exampleWords,
  verifiedClips:Object.keys(catalog),attribution:"Audio: Association Shtooka / Judith Franck, CC BY 3.0 US (Wikimedia Commons). Các từ còn lại: giọng đọc từ thiết bị; accent có thể thay đổi."};
})(window);