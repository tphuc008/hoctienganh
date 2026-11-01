/* School Grade 10 · Unit 3/4 — original PDF practice in the Grade 10 Mid-Term interaction pattern. */
(function(global){
'use strict';
const TITLES={3:'Music',4:'For a Better Community'};
const SECTION={A:'Phonetics',B:'Vocabulary',C:'Grammar',D:'Sentence Arrangement',E:'Reading'};
const TASKS={A:{1:'Pronunciation',2:'Word Stress'},B:{1:'Closest Meaning',2:'Opposite Meaning',3:'Vocabulary & Usage'},C:{1:'Grammar Practice',2:'Grammar Practice',3:'Grammar Practice',4:'Grammar MCQ'},D:{1:'Conversation Arrangement',2:'Letter & Paragraph Arrangement'},E:{1:'Advertisement',2:'Cloze Passage',3:'Text Completion',4:'Reading Comprehension',5:'Reading Comprehension'}};
const KEYS={
  3:{'A-1':'C D A B C B D A C D','A-2':'D C B D A B A C D C','B-1':'C D A D C','B-2':'A C B A B','B-3':'A A C B B B D B A B D C A B A A A D C D A A C D C B C A C B','C-3':'B A C B A C D B D C B A A C D A D C A B','D-1':'A B A D','D-2':'B B A A','E-1':'A D C B D','E-2':'A B D B C','E-3':'C A B D A B','E-4':'C D B C D C A C','E-5':'C B A A C B D A C A'},
  4:{'A-1':'D B C D B A C A D A','A-2':'D B C C A B C D A B','B-1':'B B D C C','B-2':'D A C D B','B-3':'C D B C A C B D A B C B C B C B A C A C B D D B A B A D C A','C-4':'D B A B D C B A C D B A C D A D B B A C C B A B D','D-1':'C A C B','D-2':'C D A D','E-1':'D C A B D','E-2':'B C A B A','E-3':'D B D A A D','E-4':'B C D A B D B B','E-5':'C C B B D C C B C D'}
};
const WRITTEN={
  3:{'C-1':["I'd like to go to the party, but I'm too busy.","It was rainy, so Lan took an umbrella.","Anna is an amazing dancer, and her parents are proud of her.","You can vote online for your favourite singer, or you can send text messages.","Lisa went shopping yesterday, but she didn't buy anything.","John's parents own a restaurant, and sometimes he helps in the kitchen at weekends.","Go inside or you will catch a cold.","Rita is a good drummer, so she will probably be invited to join the band.","She can’t sing, nor can she play any musical instruments.","He went to the concert, for he loved the band’s music."],
      'C-2':['to buy','apologise','to go','to visit','go','to find','cross','eat','to take','to learn']},
  4:{'C-1':['d','f','a','h','c','g','b','e'],
      'C-2':['decided; were preparing','arrived; were still playing','decided; were waiting','was having; rang','were having; agreed','came; was helping','were presenting; raised','got; was writing','volunteered; cooked','was volunteering; discovered','delivered','was helping; met','were sorting','was joining; had','participated; helped','set; helped'],
      'C-3':["While I was doing my homework, I broke my pen.","When it started to rain, we were walking home from school.","When I went to get the tickets, I realized I didn’t have any money.","I met Nhi on the street while she was volunteering at a blood donation event.","While Tri was watching TV, he saw his friends taking part in the clean-up project on TV.","When I got to the cafe, my friends were waiting for me.","We fell asleep while we were watching a film.","The car began to make a strange noise when I was driving home.","I met Joe yesterday afternoon while she was working in a clothes shop.","Ann learnt Italian when she was living in Rome.","Ha was donating her clothes to the charity event when I saw her on my way home.","While they were visiting the remote villages, they decided to help build a playground for kids.","When he arrived at the centre, we were recording the donations."]}
};
const WARNINGS={
 '3:C-1:2':'Đáp án in trong PDF viết “It was sunny”, trái với đề “It was rainy”. Ở đây giữ dữ kiện rainy của câu hỏi và sửa lỗi chép trong KEY.',
 '3:A-1:*':'Phần gạch chân được phục dựng từ vị trí ký tự trong PDF gốc. Đáp án được đối chiếu phát âm; tài liệu không in KEY cho dạng này.',
 '4:A-1:*':'Phần gạch chân được phục dựng từ vị trí ký tự trong PDF gốc. Đáp án được đối chiếu phát âm; tài liệu không in KEY cho dạng này.',
 '4:E-3:5':'“One another” và “each other” đều dùng được sau supported; đề có hai lựa chọn hợp lệ. Chấp nhận cả A lẫn D.',
 '4:C-4:22':'Cả “volunteered” và “was volunteering” có thể phù hợp trong ngữ cảnh này. Chấp nhận cả A và B.',
 '3:B-3:2':'“Competition at the regional music competition” bị lặp từ trong câu gốc PDF; đáp án A vẫn là từ loại phù hợp nhất.',
 '4:E-1:1':'PDF có ghi chú tiếng Việt ngay trong lựa chọn; trình bày lại các lựa chọn theo đúng văn bản nguồn.'
};
const UNDERLINE={3:[[0,0,1,6],[3,2,4,2],[6,5,4,3],[4,2,3,1],[1,2,1,0],[1,4,3,8],[6,7,4,4],[1,2,1,1],[1,1,1,2],[0,4,2,3]],4:[[1,3,1,1],[0,0,4,1],[1,1,1,3],[1,0,1,1],[2,4,1,2],[7,5,6,4],[2,2,0,3],[0,0,0,0],[7,8,0,0],[2,0,2,4]]};
const ALTERNATIVES={'4:E-3:5':['A','D'],'4:C-4:22':['A','B']};
const NEEDS_REVIEW=new Set(['3:B-1:5','4:E-3:4']);
let cached=null, session=null;
function safe(value){return String(value==null?'':value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}
function clean(raw){return String(raw||'').replace(/^EXERCISE BOOK - GRADE 10[^\n]*\n/gm,'').replace(/^\s*DINH TIEN HOANG SCHOOL[^\n]*\n?/gm,'').replace(/\u0000/g,'');}
function vocab(unit){
 const pages=global.SCHOOL_G10_PDF_PAGES||[];
 const input=(unit===3?pages.slice(0,2):pages.slice(12,14)).join('\n'),seen=new Map();
 for(const ln of input.split('\n')){
  const m=ln.match(/^\s*(\d{1,2})\.\s+(.+?)\s{2,}(\((?:n|v|adj|adv|phr|prep)[^)]{0,15}\))\s+(.+?)\s{2,}(.+)$/i);
  if(m)seen.set(+m[1],{no:+m[1],word:m[2].trim(),pos:m[3],ipa:m[4].trim(),vi:m[5].trim()});
 }
 if(unit===3){if(seen.has(35))seen.get(35).word='play an important role';}
 else {if(seen.has(8))seen.get(8).word='get involved = join, take part in';
   if(!seen.has(18))seen.set(18,{no:18,word:'donate = raise money for charity',pos:'(v)',ipa:'/dəʊˈneɪt/',vi:'quyên góp'});
   if(!seen.has(42))seen.set(42,{no:42,word:'non-profit organisation',pos:'(n.phr)',ipa:'/nɒn-ˈprɒfɪt ˌɔːgənaɪˈzeɪʃən/',vi:'tổ chức phi lợi nhuận'});}
 return [...seen.values()].sort((a,b)=>a.no-b.no);
}
function taskParts(unit){
 const p=global.SCHOOL_G10_PDF_PAGES||[];
 const input=(unit===3?p.slice(2,12):p.slice(14,26)).map(clean).join('\n');
 let section='A',task=0,current=null,groups=[];
 const push=()=>{if(current)groups.push(current);};
 for(const line of input.split('\n')){
  const s=line.trim(), sec=s.match(/^([A-E])\.\s*(PHONETICS|VOCABULARY|GRAMMAR|ARRANGEMENT|READING)/i);
  if(sec){push();current=null;section=sec[1];task=0;continue;}
  const m=s.match(/^Task\s+(\d+)\s*:/i);
  if(m){push();task=+m[1];current={section,task,text:s+'\n'};continue;}
  if(current)current.text+=line+'\n';
 }
 push();return groups;
}
function parseTask(unit,src){
 const name=src.section+'-'+src.task, text=src.text.replace(/\n\s*KEY\b[\s\S]*$/i,'');
 const indexes=[...text.matchAll(/^\s*(\d{1,2})\.\s*([^\n]*)/gm)];
 const context=text.slice(0,indexes[0]?indexes[0].index:text.length).replace(/^Task\s+\d+:[^\n]*(?:\n[^\n]*)?/i,'').trim();
 const key=(KEYS[unit][name]||'').split(/\s+/).filter(Boolean);
 const written=WRITTEN[unit][name]||[];
 const items=[];
 for(let i=0;i<indexes.length;i++){
  const m=indexes[i],start=m.index,end=i+1<indexes.length?indexes[i+1].index:text.length;
  let block=text.slice(start,end).trim();
  const opt=[...block.matchAll(/(?:^|\s)([A-D])\.\s+/gm)];
  const mcq=opt.length===4;
  let stem=mcq?block.slice(0,opt[0].index).replace(/^\d+\.\s*/,'').trim():block.replace(/^\d+\.\s*/,'').trim();
  if(!stem)stem=src.section==='A'?(src.task===1?'Choose the word whose underlined part is pronounced differently (see original PDF for underlines).':'Choose the word with different primary stress.'):'Choose the best option for blank ('+(i+1)+') in the passage.';
  stem=stem.replace(/\s*=>\s*_{3,}[\s\S]*$/,'').replace(/_{8,}/g,'______').replace(/\n{3,}/g,'\n\n').trim();
  const options=mcq?opt.map((o,j)=>{let raw=block.slice(o.index+o[0].length,j+1<opt.length?opt[j+1].index:block.length).trim();if(unit===4&&name==='E-1'&&j===3)raw=raw.split('\n')[0];return raw.replace(/\s+/g,' ');}):[];
  // Content after last option may contain a source-reference or the end marker, not an answer choice.
  if(mcq){options[3]=options[3].replace(/\s*--- THE END ---[\s\S]*$/,'').trim();if(unit===4&&name==='E-1')options[3]=options[3].split('\n')[0].trim();}
  const answer=mcq?(key[i]||null):(written[i]||null);
  const id=unit+':'+name+':'+(i+1),warning=WARNINGS[id]||WARNINGS[unit+':'+name+':*']||'';
  const eligible=!!answer && !NEEDS_REVIEW.has(id);
  items.push({id,no:+m[1],stem,options,kind:mcq?'mcq':'written',answer,warning,eligible,
    section:src.section,task:src.task,group:name,context:src.section==='E'?context:''});
 }
 return {id:name,section:src.section,task:src.task,title:TASKS[src.section]?.[src.task]||('Task '+src.task),items,context};
}
function data(){
 if(cached)return cached;
 if(!Array.isArray(global.SCHOOL_G10_PDF_PAGES)||global.SCHOOL_G10_PDF_PAGES.length!==26)throw Error('Thiếu nội dung PDF 26 trang.');
 cached={};for(const unit of [3,4]){
  const groups=taskParts(unit).map(x=>parseTask(unit,x));
  const count=unit===3?142:164;
  if(groups.reduce((sum,x)=>sum+x.items.length,0)!==count)throw Error('Số câu của Unit '+unit+' không khớp PDF.');
  if(vocab(unit).length!==(unit===3?72:68))throw Error('Từ vựng Unit '+unit+' bị thiếu.');
  cached[unit]={unit,title:TITLES[unit],groups,words:vocab(unit),count};
 }
 return cached;
}
function route(unit,group){return 'school/grade-10/unit-'+unit+(group?'/'+group:'');}

function ensureStyles(){
 if(document.getElementById('school-grade10-midterm-css'))return;
 const st=document.createElement('style');st.id='school-grade10-midterm-css';
 st.textContent='.mt-subtle{color:var(--muted);font-size:13px;line-height:1.7}.mt-question{margin:18px 0 22px;padding:22px;border:1px solid var(--line);border-radius:20px;background:var(--card,rgba(255,255,255,.5))}.mt-stem{font-size:16px;line-height:1.9;white-space:pre-wrap;overflow-wrap:anywhere;margin:15px 0 22px}.mt-option{display:flex;align-items:flex-start;gap:13px;padding:15px;margin:9px 0;border:1px solid var(--line);border-radius:14px;cursor:pointer;transition:.12s background}.mt-option input{margin-top:5px;accent-color:#c02675}.mt-option b{width:20px;flex:none}.mt-option:hover{background:rgba(227,97,150,.07)}.mt-option.selected{border-color:#d94691;background:rgba(236,72,153,.075)}.mt-option:has(input:disabled){cursor:default}.mt-passage{margin:16px 0;padding:16px 18px;border-radius:16px;background:rgba(125,110,160,.07);border:1px solid var(--line)}.mt-passage summary{font-weight:800;cursor:pointer}.mt-passage-text{white-space:pre-wrap;line-height:1.8;font-size:14px;margin-top:14px;overflow-wrap:anywhere}.mt-controls{display:flex;align-items:center;flex-wrap:wrap;gap:10px;margin:16px 0}.mt-controls button{max-width:100%}.mt-count{font-size:13px;color:var(--muted);font-weight:700}.mt-progress{display:flex;gap:3px;margin:12px 0}.mt-progress i{height:6px;flex:1;min-width:3px;border-radius:12px;background:var(--line)}.mt-progress i.done{background:#16a34a}.mt-progress i.current{background:#d94691}.mt-written{min-height:92px;width:100%;background:var(--bg);border:1px solid var(--line);border-radius:13px;padding:12px;color:inherit;font:inherit;line-height:1.6}.mt-score{font-size:18px;font-weight:800}.mt-badge{display:inline-block;background:rgba(108,105,170,.1);padding:6px 10px;border-radius:20px;font-size:12px;font-weight:700}.mt-note{border:1px solid #d97706;background:rgba(245,158,11,.08);padding:13px 15px;border-radius:14px;line-height:1.7;margin:12px 0}.mt-quiz-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:14px}.mt-quiz-grid .exercise-card{text-align:left;cursor:pointer}.mt-review-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(58px,1fr));gap:8px;margin:20px 0}.mt-review-grid button{padding:10px 3px;border:1px solid var(--line);border-radius:10px;background:var(--card);color:inherit;cursor:pointer}.mt-review-grid .completed{border-color:#16a34a}.mt-review-grid .missed{border-color:#dc2626}.school-vocab-table{border-collapse:collapse;width:100%;font-size:13px}.school-vocab-table th,.school-vocab-table td{padding:9px 12px;border-bottom:1px solid var(--line);text-align:left;vertical-align:top}.school-vocab-table th{white-space:nowrap}.school-analysis-options p{margin:10px 0;line-height:1.8}@media(max-width:640px){.mt-question{padding:15px;margin:12px 0}.mt-option{padding:11px}.mt-stem{font-size:15px}.mt-controls button{flex:1}}';
 document.head.appendChild(st);
}
function base(){ensureStyles();const m=document.getElementById('pageMount');m.style.display='block';const q=document.getElementById('quizShell');if(q)q.style.display='none';const r=document.getElementById('resultScreen');if(r)r.style.display='none';return m;}
function crumb(unit,tail){return '<div class="breadcrumbs"><button class="crumb-btn" onclick="location.hash=\'school/grade-10\'">Lớp 10</button><span>›</span>'+(tail?'<button class="crumb-btn" onclick="location.hash=\''+route(unit)+'\'">Unit '+unit+'</button><span>›</span>'+safe(tail):'Unit '+unit)+'</div>';}
function scroll(){window.scrollTo({top:0,behavior:'smooth'});}
function renderUnit(unit){
 const d=data()[unit];if(!d)return;
 session=null;
 const cards=d.groups.map(g=>'<button class="exercise-card" onclick="location.hash=\''+route(unit,g.id)+'\'"><div class="exercise-icon">'+safe(g.section)+g.task+'</div><h3>'+safe(SECTION[g.section]+' · '+g.title)+'</h3><div class="meta"><span class="chip">'+g.items.length+' questions</span><span class="chip">Trang PDF gốc</span></div></button>').join('');
 const grammar=unit===3?'Compound Sentences · To-infinitives & Bare Infinitives':'Past Simple vs. Past Continuous (When / While)';
 const rows=d.words.map(w=>'<tr><td>'+w.no+'</td><td><b>'+safe(w.word)+'</b></td><td>'+safe(w.pos)+'</td><td>'+safe(w.ipa)+'</td><td>'+safe(w.vi)+'</td></tr>').join('');
 base().innerHTML=crumb(unit,'')+'<div class="unit-hero"><div class="eyebrow">School · Grade 10 · Original PDF</div><h1>Unit '+unit+': '+safe(d.title)+'</h1><p>'+d.count+' bài tập gốc · '+d.words.length+' mục từ vựng · '+safe(grammar)+'</p></div>'+ 
  '<div class="section-title"><h2>Practice</h2><span>'+d.groups.length+' tasks</span></div><div class="mt-quiz-grid">'+cards+'</div>'+
  '<div class="section-title" style="margin-top:30px"><h2>Knowledge · Kiến thức</h2><span>Vocabulary & Grammar</span></div><div class="mt-question"><h3>Grammar</h3><p>'+safe(grammar)+'</p><p class="mt-subtle">Các dạng ngữ pháp được luyện trong nhóm Grammar bên trên, với đáp án gốc (nếu PDF cung cấp).</p></div>'+
  '<details class="mt-passage"><summary>Vocabulary · Xem đủ '+d.words.length+' mục từ</summary><div style="overflow-x:auto;margin-top:12px"><table class="school-vocab-table"><thead><tr><th>#</th><th>Word</th><th>POS</th><th>IPA</th><th>Meaning</th></tr></thead><tbody>'+rows+'</tbody></table></div><p class="mt-subtle">Giữ nguyên nội dung gốc của PDF; lưu ý một số cách dịch/phiên âm trong tài liệu có thể cần hiệu đính.</p></details>';
 scroll();
}
function key(unit,group){return 'school/grade-10/unit-'+unit+'/'+group;}
function save(){
 if(!session)return;
 const s=session;
 if(!global.LearningCore?.userId?.()||s.owner!==LearningCore.userId())return;
 LearningCore.writeDraft('school',key(s.unit,s.group.id),{answers:s.answers,checked:s.checked,revealed:s.revealed,index:s.index,startedAt:s.startedAt,submissionId:s.submissionId,recorded:s.recorded,sourceVersion:LearningCore.fingerprint(s.group.items)});
 const done=s.group.items.filter(x=>s.checked[x.id]).length;
 global.LearningFlow?.track?.({category:'school',slug:key(s.unit,s.group.id),ownerId:s.owner,started:true,startedAt:s.startedAt,done,total:s.group.items.length,completed:done===s.group.items.length,mode:'submit'});
}
function restore(unit,group){
 const owner=global.LearningCore?.userId?.()||null;
 const existing=global.LearningCore?.readDraft?.('school',key(unit,group.id));
 const version=global.LearningCore?.fingerprint?.(group.items);
 const valid=existing&&existing.sourceVersion===version;
 const items=new Set(group.items.map(x=>x.id));
 const only=a=>Object.fromEntries(Object.entries(a||{}).filter(x=>items.has(x[0])));
 session={unit,group,owner,answers:valid?only(existing.answers):{},checked:valid?only(existing.checked):{},revealed:valid?only(existing.revealed):{},index:valid?Math.max(0,Math.min(group.items.length-1,Number(existing.index)||0)):0,startedAt:valid?existing.startedAt:Date.now(),submissionId:valid?existing.submissionId:(global.LearningCore?.uuid?.()||String(Date.now())),recorded:valid?!!existing.recorded:false};
 save();
}
function norm(s){return String(s||'').toLowerCase().replace(/[’‘]/g,"'").replace(/[.,!?;:]+$/g,'').replace(/\s+/g,' ').trim();}
function answerOk(q,value){
 if(!q.eligible)return false;
 if(q.kind==='mcq')return (ALTERNATIVES[q.id]||[q.answer]).includes(value);
 const actual=norm(value),expected=norm(q.answer);
 if(!actual)return false;
 if(q.group==='C-2')return norm(actual.replace(/\s*[,;]\s*/g,'; '))===norm(expected.replace(/\s*[,;]\s*/g,'; '));
 if(q.group==='C-1'&&q.id.startsWith('4:'))return actual===expected;
 // Multiple ways of joining a complex sentence may be correct; exact-match autocorrection is only a reference.
 return actual===expected;
}
function progress(){const s=session;return '<div class="mt-count">'+s.group.items.filter(x=>s.checked[x.id]).length+'/'+s.group.items.length+' câu đã kiểm tra</div><div class="mt-progress">'+s.group.items.map((x,i)=>'<i class="'+(s.checked[x.id]?'done':i===s.index?'current':'')+'"></i>').join('')+'</div>';}
function optionLabel(q,o,i){if(q.section==='A'&&q.task===1){const pos=UNDERLINE[+q.id[0]]?.[q.no-1]?.[i];if(pos!=null)return safe(o.slice(0,pos))+'<u>'+safe(o.slice(pos,pos+((q.no===8&&q.id[0]==='3')?2:1)))+'</u>'+safe(o.slice(pos+((q.no===8&&q.id[0]==='3')?2:1)));}return safe(o);}
function correctLabel(q){if(!q.answer)return 'Chưa có đáp án xác thực';return q.kind==='mcq'?q.answer+'. '+q.options['ABCD'.indexOf(q.answer)]:q.answer;}
function explain(q){
 const answer=correctLabel(q),plain=q.stem.replace(/\s+/g,' ').slice(0,450),isRead=q.section==='E',isGrammar=q.section==='C';
 let clue='Dữ kiện trong câu gốc: “'+safe(plain)+'”.';
 if(isRead)clue='Đọc đoạn văn gốc phía trên để xác định thông tin trực tiếp, quan hệ tham chiếu hoặc điều kiện ngữ pháp trước và sau chỗ trống.';
 if(isGrammar)clue='Xác định dấu hiệu thời gian, quan hệ giữa các mệnh đề và cấu trúc động từ trong câu gốc trước khi chọn hình thức phù hợp.';
 if(q.section==='D')clue='Xem câu mở đầu, cặp hỏi–đáp, chủ thể, đại từ hồi chỉ và logic chuyển ý; không chỉ dựa vào một từ nối.';
 let quick=q.answer?'Đáp án tham khảo: '+safe(answer)+'. '+clue:'Đề gốc chưa cung cấp đáp án đủ tin cậy để chấm. '+clue;
 let analyses='';
 if(q.kind==='mcq'){
  analyses='<div class="school-analysis-options">'+q.options.map((o,i)=>{
   const k='ABCD'[i],isCorrect=(ALTERNATIVES[q.id]||[q.answer]).includes(k);
   return '<p><b>'+k+'. '+safe(o)+' — '+(q.eligible?(isCorrect?'Đáp án chấp nhận':'Phương án đối chiếu'):'Chưa xác minh')+'.</b> '+(isCorrect?'Đối chiếu chính xác cụm từ/cấu trúc này với dữ kiện ở câu hỏi và ngữ cảnh nguồn.':'Cần đối chiếu nghĩa, loại từ, cấu trúc và phạm vi thông tin của phương án này với đáp án; tài liệu không cung cấp giải thích chi tiết riêng cho lựa chọn.')+'</p>';
  }).join('')+'</div>';
 }else analyses='<p>Đối chiếu câu gốc với cấu trúc hoặc từ nối được yêu cầu. Đáp án mẫu: <b>'+safe(answer)+'</b>. Với câu viết lại, câu diễn đạt tương đương khác có thể vẫn đúng dù bộ chấm tự động chưa nhận ra.</p>';
 let applying='';
 if(q.group==='C-2'&&q.id.startsWith('3:'))applying='<p><b>To-infinitive:</b> agree / decide / promise / want + to V. <b>Bare infinitive:</b> make / let + O + V; can / could + V.</p>';
 else if(q.section==='C'&&q.id.startsWith('4:'))applying='<p><b>Past continuous:</b> was/were + V-ing cho hành động đang diễn ra. <b>Past simple:</b> V2/ed cho sự việc đã hoàn thành hoặc xen vào. When/while phải phù hợp quan hệ thời gian trong câu.</p>';
 else if(q.group==='C-1'&&q.id.startsWith('3:'))applying='<p>Compound sentence: mệnh đề độc lập + dấu phẩy + and/but/or/so/for/nor (tùy quan hệ nghĩa). Với nor, kiểm tra đảo trợ động từ.</p>';
 else if(q.section==='D')applying='<p>Thử ghép các câu theo thứ tự trong phương án được chọn, sau đó kiểm tra mọi đại từ, lời đáp, và quan hệ thông tin cũ → mới.</p>';
 else if(isRead)applying='<p>Với Reading, xác định đúng câu trong bài hỗ trợ phương án; đừng suy ra điều tác giả không nói hoặc chọn chỉ vì thấy một từ trùng với bài.</p>';
 else applying='<p>Ghi nhớ toàn bộ cụm từ và cách dùng trong ngữ cảnh, không học rời một từ khỏi phần bổ nghĩa/giới từ đi cùng.</p>';
 const note=q.warning?'<div class="mt-note">⚠ '+safe(q.warning)+'</div>':'';
 if(global.ExplanationV1?.render){
   return global.ExplanationV1.render({type:q.kind==='mcq'?'school':'written',answer:q.answer?answer:'Chưa xác minh',quickReason:quick,evidence:[clue],evidenceHtml:'<p>'+clue+'</p>',analysisHtml:analyses,applicationHtml:applying,remember:'Luôn kiểm tra cấu trúc và ngữ cảnh của đề gốc trước khi kết luận.',needsReview:!q.eligible})+note;
 }
 return '<div class="feedback semantic-feedback"><p><b>Quick:</b> '+quick+'</p><details><summary>Xem giải thích chi tiết</summary><h4>01 · Bằng chứng</h4><p>'+clue+'</p><h4>02 · Phân tích</h4>'+analyses+'<h4>03 · Vận dụng</h4>'+applying+'</details>'+note+'</div>';
}
function renderQuiz(){
 const s=session,q=s.group.items[s.index],total=s.group.items.length,checked=!!s.checked[q.id],value=s.answers[q.id]||'';
 const feedback=checked?'<div class="mt-note" style="border-color:'+(q.eligible?(answerOk(q,value)?'#16a34a':'#dc2626'):'#d97706')+'"><b>'+(q.eligible?(s.revealed[q.id]?'Đã mở lời giải':answerOk(q,value)?'✓ Chính xác':'✕ Chưa đúng'):'⚠ Chưa chấm điểm câu này')+'</b> · '+(q.kind==='mcq'?'Bạn chọn '+safe(value||'chưa chọn')+'. ':'')+(q.eligible?'Đáp án tham khảo: '+safe(correctLabel(q)):'Nguồn không đủ dữ liệu để chấm tự động.')+'</div>'+explain(q):'';
 const options=q.kind==='mcq'?q.options.map((o,i)=>'<label class="mt-option '+(value==='ABCD'[i]?'selected':'')+'"><input type="radio" name="schoolUnitChoice" '+(value==='ABCD'[i]?'checked':'')+' '+(checked?'disabled':'')+' onchange="schoolUnitChoose(\''+'ABCD'[i]+'\')"><b>'+'ABCD'[i]+'.</b><span>'+safe(o)+'</span></label>').join(''):'<label class="mt-subtle" for="schoolUnitWritten">Nhập câu trả lời theo đề (hoặc thứ tự từ/động từ nếu có nhiều chỗ trống):</label><textarea id="schoolUnitWritten" class="mt-written" '+(checked?'disabled':'')+' oninput="schoolUnitType(this.value)" placeholder="Nhập đáp án của bạn…">'+safe(value)+'</textarea>';
 const ctx=q.context?'<details class="mt-passage" open><summary>Đoạn văn / Ngữ cảnh gốc từ PDF</summary><div class="mt-passage-text">'+safe(q.context)+'</div></details>':'';
 const controls='<div class="mt-controls"><button class="secondary" onclick="schoolUnitPrev()" '+(s.index===0?'disabled':'')+'>← Câu trước</button>'+(checked?'<button class="primary" onclick="'+(s.index===total-1?'schoolUnitResult()':'schoolUnitNext()')+'">'+(s.index===total-1?'Xem kết quả':'Câu tiếp theo →')+'</button>':'<button class="primary" onclick="schoolUnitCheck()">Kiểm tra đáp án</button><button class="secondary" onclick="schoolUnitReveal()">Xem đáp án & lời giải</button>')+'<span class="mt-count">Câu '+(s.index+1)+' / '+total+'</span></div>';
 base().innerHTML=crumb(s.unit,SECTION[q.section]+' · '+s.group.title)+'<div class="unit-hero"><div class="eyebrow">School · Grade 10 · Unit '+s.unit+' · '+SECTION[q.section]+'</div><h1>'+safe(s.group.title)+'</h1><p>Trả lời từng câu · Kiểm tra để xem lời giải</p></div>'+progress()+'<section class="mt-question"><div class="mt-badge">'+safe(SECTION[q.section])+' · Task '+q.task+'</div><div class="mt-stem"><b>Question '+q.no+'.</b> '+safe(q.stem)+'</div>'+ctx+'<div class="mt-answers">'+options+'</div>'+controls+feedback+'</section><div class="mt-controls"><button class="secondary" onclick="schoolUnitResult()">Xem tiến độ & chọn câu</button><button class="secondary" onclick="schoolUnitPrint()">In đề này</button><button class="secondary" onclick="location.hash=\''+route(s.unit)+'\'">← Danh sách bài tập</button></div>';
 scroll();
}
function openTask(unit,group){
 const g=data()[unit]?.groups.find(x=>x.id===group);
 if(!g){location.hash=route(unit);return;}
 if(!session||session.unit!==unit||session.group.id!==group||session.owner!==(global.LearningCore?.userId?.()||null))restore(unit,g);
 renderQuiz();
}
function choose(val){if(!session)return;const q=session.group.items[session.index];if(session.checked[q.id])return;session.answers[q.id]=val;save();document.querySelectorAll('.mt-option').forEach(x=>x.classList.toggle('selected',!!x.querySelector('input:checked')));}
function type(val){if(!session)return;const q=session.group.items[session.index];if(session.checked[q.id])return;session.answers[q.id]=val;save();}
function check(){if(!session)return;const q=session.group.items[session.index];if(!String(session.answers[q.id]||'').trim()){alert('Chọn hoặc nhập đáp án trước khi kiểm tra.');return;}session.checked[q.id]=true;save();renderQuiz();}
function reveal(){if(!session)return;const q=session.group.items[session.index];session.checked[q.id]=true;session.revealed[q.id]=true;save();renderQuiz();}
function jump(n){if(!session)return;session.index=Math.max(0,Math.min(session.group.items.length-1,n));save();renderQuiz();}
function result(){
 if(!session)return;
 const s=session,items=s.group.items,done=items.filter(q=>s.checked[q.id]).length,graded=items.filter(q=>q.eligible).length,correct=items.filter(q=>q.eligible&&s.checked[q.id]&&!s.revealed[q.id]&&answerOk(q,s.answers[q.id])).length;
 if(done===items.length&&!s.recorded){s.recorded=true;save();if(graded){global.LearningCore?.submitPractice?.({category:'school',slug:key(s.unit,s.group.id),correct,total:graded,duration:Math.round((Date.now()-s.startedAt)/1000),submissionId:s.submissionId,details:{checked:done,originalPdf:true}})?.catch(e=>console.warn('Save school unit score:',e));}}
 base().innerHTML=crumb(s.unit,s.group.title)+'<div class="unit-hero"><div class="eyebrow">Unit '+s.unit+' · '+safe(s.group.title)+'</div><h1>Tiến độ làm bài</h1><p class="mt-score">'+correct+'/'+graded+' câu đúng (tính điểm) · '+done+'/'+items.length+' câu đã kiểm tra</p><p class="mt-subtle">Các câu thiếu dữ liệu hoặc có lỗi nguồn được ghi chú riêng; không tự động tính sai.</p></div><div class="mt-review-grid">'+items.map((q,i)=>'<button class="'+(s.checked[q.id]?(q.eligible&&answerOk(q,s.answers[q.id])&&!s.revealed[q.id]?'completed':'missed'):'')+'" onclick="schoolUnitJump('+i+')">'+q.no+'</button>').join('')+'</div><div class="mt-controls"><button class="primary" onclick="schoolUnitJump('+s.index+')">Tiếp tục làm bài</button><button class="secondary" onclick="schoolUnitPrint()">In đề</button><button class="secondary" onclick="location.hash=\''+route(s.unit)+'\'">← Unit '+s.unit+'</button><button class="secondary" onclick="schoolUnitRestart()">Làm lại từ đầu</button></div>';
 scroll();
}
function restart(){const s=session;if(!s)return;global.LearningCore?.clearDraft?.('school',key(s.unit,s.group.id));global.LearningFlow?.reset?.('school',key(s.unit,s.group.id));restore(s.unit,s.group);renderQuiz();}
function printTask(){
 if(!session)return;const g=session.group;
 const questions=g.items.map((q,i)=>'<div class="pq"><b>Question '+q.no+'.</b> '+safe(q.stem).replace(/\n/g,'<br>')+(q.kind==='mcq'?'<ol type="A">'+q.options.map(o=>'<li>'+safe(o)+'</li>').join('')+'</ol>':'<div class="ansline">_______________________________________________</div>')+'</div>').join('');
 const passage=g.section==='E'?'<section><h3>Reading passage / Source</h3><p>'+safe(g.context).replace(/\n/g,'<br>')+'</p></section>':'';
 const w=window.open('','_blank');if(!w){alert('Trình duyệt đang chặn cửa sổ in. Hãy cho phép pop-up và thử lại.');return;}
 w.document.write('<!doctype html><html><head><meta charset="utf-8"><title>Unit '+session.unit+' · '+safe(g.title)+'</title><style>body{font:13px/1.6 Georgia,serif;color:#111;max-width:790px;margin:30px auto}h1{font-size:24px}.pq{break-inside:avoid;margin:14px 0}ol{padding-left:25px;list-style-type:upper-alpha;display:grid;grid-template-columns:1fr 1fr;gap:2px 30px}.ansline{margin:18px 0}p{white-space:normal}section{padding:12px;border:1px solid #bbb;margin:18px 0}@media print{body{margin:0}.pq{page-break-inside:avoid}}</style></head><body><small>Grade 10 · Original PDF practice</small><h1>Unit '+session.unit+' · '+safe(g.title)+'</h1>'+passage+questions+'</body></html>');w.document.close();w.focus();setTimeout(()=>w.print(),200);
}
window.schoolUnitHome=renderUnit;window.schoolUnitTask=openTask;window.schoolUnitChoose=choose;window.schoolUnitType=type;window.schoolUnitCheck=check;window.schoolUnitReveal=reveal;window.schoolUnitPrev=()=>jump(session.index-1);window.schoolUnitNext=()=>jump(session.index+1);window.schoolUnitJump=jump;window.schoolUnitResult=result;window.schoolUnitRestart=restart;window.schoolUnitPrint=printTask;
window.schoolUnitData=data;
})(window);