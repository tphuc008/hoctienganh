/* Grade 6 Unit 2 · Lesson & Practice. Reuses the website's cards, quiz, and concise explanation styling. */
(function (global) {
"use strict";
const A=global.G6_U2_PART_A, B=global.G6_U2_PART_B;
if(!A||!B)throw Error("Missing Grade 6 Unit 2 source data");
const all=[...A.groups,...B.groups];
// Keep the legacy paragraph in source data but do not show it in the Unit 2 worksheet.
const original=all.filter(g=>g.id!=="extra"&&g.id!=="paragraph");
const extra=B.extra;
extra.items.forEach((q,i)=>{q.id=q.id||("extra-"+(i+1));q.no=i+1;});
const practiceSets=[1,2,3].map(n=>({number:n,items:extra.items.filter(q=>q.set===n)}));
if(practiceSets.some(s=>s.items.length!==10))throw Error("Grade 6 practice sets must each contain 10 items");
const originalTotal=original.reduce((n,g)=>n+g.items.length,0);
const VERSION=global.LearningCore?.fingerprint?.([A.groups,B.groups,extra.items])||"g6-1";
const BASE="grade-6/unit-2";
const STORE="grade6-unit-2";
const IPA={
"boarding school":"/ˈbɔːr.dɪŋ ˌskuːl/","greenhouse":"/ˈɡriːn.haʊs/","swimming pool":"/ˈswɪm.ɪŋ ˌpuːl/","equipment":"/ɪˈkwɪp.mənt/","art":"/ɑːt/",
"school bag":"/ˈskuːl.bæɡ/","pencil case":"/ˈpen.səl ˌkeɪs/","notebook":"/ˈnoʊtˌbʊk/","textbook":"/ˈtekstˌbʊk/","pencil sharpener":"/ˈpen.səl ˌʃɑːr.pə.nər/","ruler":"/ˈruː.lər/","rubber":"/ˈrʌb.ər/","calculator":"/ˈkæl.kjə.leɪ.tər/","compass":"/ˈkʌm.pəs/",
"classmate":"/ˈklæs.meɪt/","international":"/ˌɪn.tərˈnæʃ.ə.nəl/","overseas":"/ˈoʊ.vərˈsiːz/",
"activity":"/ækˈtɪv.ə.ti/","judo":"/ˈdʒuː.doʊ/","interview":"/ˈɪn.tər.vjuː/","help":"/help/","share":"/ʃer/",
"creative":"/kriˈeɪ.tɪv/","excited":"/ɪkˈsaɪ.tɪd/","smart":"/smɑːrt/","friendly":"/ˈfrend.li/","hardworking":"/ˌhɑːdˈwɜː.kɪŋ/","confident":"/ˈkɒn.fɪ.dənt/",
"bicycle":"/ˈbaɪ.sɪ.kəl/","pocket money":"/ˈpɑː.kɪt ˌmʌn.i/","poem":"/ˈpoʊ.əm/","remember":"/rɪˈmem.bər/","knock":"/nɑːk/","surround":"/səˈraʊnd/"
};
let state=null,owner=null,activeTab="knowledge";
function esc(v){return String(v==null?"":v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function rich(v){return esc(v).replace(/&lt;u&gt;/g,"<u>").replace(/&lt;\/u&gt;/g,"</u>").replace(/\n/g,"<br>");}
function normalized(v){return String(v||"").toLowerCase().trim().replace(/[’‘]/g,"'").replace(/\s*\|\s*/g,"|").replace(/[.!?]+$/g,"").replace(/\s+/g," ");}
function findItem(id){for(const g of [...all,extra]){const q=g.items.find(x=>x.id===id);if(q)return {q,g};}return null;}
function fresh(){return {version:VERSION,answers:{},checked:{},group:original[0].id,practiceSet:1};}
function hydrate(){
 const who=global.LearningCore?.userId?.()||"guest";
 if(state&&owner===who)return;
 owner=who;
 const stored=global.LearningCore?.readDraft?.("grade6",STORE);
 const validIds=new Set([...all,extra].flatMap(g=>g.items.map(q=>q.id)));
 state=stored&&stored.answers&&stored.checked?{
   ...fresh(),...stored,version:VERSION,
   answers:Object.fromEntries(Object.entries(stored.answers).filter(([id])=>validIds.has(id))),
   checked:Object.fromEntries(Object.entries(stored.checked).filter(([id])=>validIds.has(id)))
 }:fresh();
 if(!original.some(g=>g.id===state.group))state.group=original[0].id;
 if(![1,2,3].includes(Number(state.practiceSet)))state.practiceSet=1;
}
function save(){global.LearningCore?.writeDraft?.("grade6",STORE,state);}
function answer(id){return state.answers[id]||"";}
function scored(q,g){if(q.kind==="essay")return null;
 if(q.kind==="mcq")return q.a===null?null:String(q.a)===String(answer(q.id));
 if(!q.answers?.length)return null;
 if(g.id==="transformation"||g.id==="rearrangement")return null;
 if(q.kind==="mcq")return String(q.a)===String(answer(q.id));
 return q.answers.some(x=>normalized(x)===normalized(answer(q.id)));
}
function countDone(g){return g.items.filter(q=>state.checked[q.id]).length;}
function styles(){
 if(document.getElementById("g6unit2Styles"))return;
 const el=document.createElement("style");el.id="g6unit2Styles";
 el.textContent=".g6-u2-root{max-width:1120px;margin:auto}.g6-tabs{display:flex;gap:9px;flex-wrap:wrap;margin:19px 0 24px;border-bottom:1px solid var(--line);padding-bottom:12px}.g6-tabs a{padding:11px 16px;border-radius:12px;color:inherit;text-decoration:none;border:1px solid var(--line);font-weight:700;font-size:14px}.g6-tabs a.current{background:#eaf2ff;border-color:#8daedf;color:#144c83}.g6-lead{color:var(--muted);line-height:1.75}.g6-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:13px}.g6-tile{background:var(--card);border:1px solid var(--line);border-radius:17px;padding:20px}.g6-tile h3{margin:4px 0 9px;font-size:18px}.g6-table{width:100%;border-collapse:collapse;font-size:14px}.g6-table th,.g6-table td{padding:11px 13px;border-bottom:1px solid var(--line);text-align:left;vertical-align:top}.g6-table th{font-size:12px;color:var(--muted);text-transform:uppercase}.g6-table td:first-child{font-weight:700}.g6-vocab-group{border:1px solid var(--line);border-radius:17px;margin:12px 0;overflow:hidden;background:var(--card)}.g6-vocab-group h3{font-size:15px;margin:0;padding:13px 16px;background:rgba(125,147,192,.08)}.g6-word-search{width:100%;padding:13px 15px;border-radius:12px;border:1px solid var(--line);background:var(--card);color:inherit;font:inherit}.g6-lesson{border:1px solid var(--line);border-radius:18px;background:var(--card);padding:19px;margin:13px 0;line-height:1.75}.g6-lesson summary{cursor:pointer;font-weight:800;font-size:17px}.g6-formula{background:rgba(126,145,186,.09);padding:11px 14px;border-radius:10px;display:block;margin:8px 0;font-weight:650}.g6-groups{display:grid;grid-template-columns:repeat(auto-fill,minmax(185px,1fr));gap:10px;margin:15px 0 21px}.g6-group{padding:12px 13px;border:1px solid var(--line);border-radius:12px;background:var(--card);color:inherit;text-align:left;cursor:pointer}.g6-group.selected{border-color:#729aca;background:rgba(116,162,217,.12)}.g6-group b{display:block;font-size:13px}.g6-group small{display:block;color:var(--muted);margin-top:5px}.g6-block{padding:19px;border:1px solid var(--line);border-radius:18px;background:var(--card);margin:15px 0}.g6-block h3{margin:0 0 9px}.g6-bank{display:flex;flex-wrap:wrap;gap:8px;margin:14px 0}.g6-bank span{background:rgba(118,152,206,.13);border-radius:9px;padding:6px 10px;font-size:13px}.g6-item{border:1px solid var(--line);border-radius:15px;padding:18px;margin:13px 0;background:var(--card)}.g6-item h4{font-size:15px;line-height:1.65;font-weight:650;white-space:normal;margin:5px 0 13px}.g6-no{color:var(--muted);font-weight:700;font-size:12px}.g6-opts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.g6-option{display:flex;align-items:flex-start;gap:8px;border:1px solid var(--line);border-radius:11px;padding:10px;cursor:pointer;font-size:14px;line-height:1.5;min-width:0}.g6-option:has(input:checked){border-color:#638ac3;background:rgba(107,159,222,.10)}.g6-option input{accent-color:#3469a8;margin-top:4px}.g6-option span{overflow-wrap:anywhere}.g6-input,.g6-essay{box-sizing:border-box;display:block;width:100%;max-width:700px;border:1px solid var(--line);border-radius:11px;background:var(--card);color:inherit;font:inherit;line-height:1.5;padding:12px}.g6-essay{min-height:190px;max-width:none}.g6-small{font-size:12px;color:var(--muted);margin:7px 0}.g6-check{margin-top:12px;padding:9px 15px;border-radius:10px;border:1px solid #729aca;background:#eaf2ff;color:#214d7a;font-weight:700;cursor:pointer}.g6-check[disabled]{opacity:.48;cursor:not-allowed}.g6-result{margin-top:13px;border:1px solid var(--line);border-radius:12px;padding:12px 14px;background:rgba(96,137,187,.08);line-height:1.65}.g6-result strong{display:block;margin-bottom:5px}.g6-result p{margin:0}.g6-issue{border-left:3px solid #a77b32;padding-left:10px;margin-top:8px!important;color:var(--muted);font-size:13px}.g6-note{background:rgba(119,150,186,.08);border-radius:11px;padding:12px 14px;line-height:1.7}.g6-passage{white-space:pre-wrap;line-height:1.85;border:1px solid var(--line);border-radius:13px;padding:17px;margin:14px 0;background:rgba(132,164,202,.06)}.g6-setup{display:flex;align-items:center;gap:13px;flex-wrap:wrap}.g6-setup select{padding:9px;border:1px solid var(--line);border-radius:10px;background:var(--card);color:inherit}.g6-section-title{margin:26px 0 12px}.g6-progress{font-size:13px;color:var(--muted)}@media(max-width:620px){.g6-opts{grid-template-columns:1fr}.g6-table th,.g6-table td{padding:9px 6px;font-size:12px}.g6-item{padding:13px}.g6-tabs a{flex:1 1 30%;text-align:center;padding:10px 7px;font-size:12px}.g6-groups{grid-template-columns:repeat(2,minmax(0,1fr))}.g6-group{padding:10px}}";
 el.textContent+=".g6-u2-root .g6-quick{line-height:1.7;font-size:14px}.g6-u2-root .g6-quick p{margin:0 0 7px}.g6-u2-root .g6-quick p:last-child{margin-bottom:0}.g6-u2-root .g6-quick p{overflow-wrap:anywhere}.g6-u2-root .g6-quick .g6-issue{font-size:13px;margin-top:9px!important}.g6-u2-root .g6-quick b{font-weight:750}";
 el.textContent+=".g6-u2-root .g6-example-set{margin-top:11px;padding-top:9px;border-top:1px solid var(--line)}.g6-u2-root .g6-example-row{padding:8px 0;border-bottom:1px solid var(--line);display:grid;gap:1px;font-size:13px}.g6-u2-root .g6-example-row:last-child{border-bottom:0}.g6-u2-root .g6-example-row span{display:block}.g6-u2-root .g6-example-vi{color:var(--muted)}.g6-u2-root .g6-reading-location{margin-top:9px;padding-top:7px;border-top:1px solid var(--line)}.g6-u2-root .g6-cited-sentence{margin:6px 0!important;padding-left:9px;border-left:2px solid var(--line);font-size:13px;line-height:1.6}";
 el.textContent+=".g6-u2-root .g6-example-meaning{font-size:12px;color:var(--muted);font-weight:550}";
 el.textContent+=".g6-word-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:10px;padding:13px}.g6-word{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:14px 15px;line-height:1.62}.g6-word-heading{display:flex;justify-content:space-between;align-items:flex-start;gap:8px;flex-wrap:wrap}.g6-word-heading b{font-size:17px;display:block}.g6-ipa{display:block;color:var(--muted);font-size:12px}.g6-meaning{font-size:13px;font-weight:650;color:#24568d}.g6-usage{font-size:13px;margin:10px 0 8px;color:var(--muted)}.g6-word-examples p{margin:5px 0;font-size:13px}.g6-word-examples small{color:var(--muted);margin-right:6px}.g6-grammar-usage{font-weight:500}.g6-lesson .g6-formula{display:flex;flex-wrap:wrap;gap:12px;justify-content:space-between}.g6-lesson .g6-formula b{font-size:13px}.g6-grammar-examples{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:11px;margin:9px 0 18px}.g6-grammar-examples>div{border:1px solid var(--line);padding:12px;border-radius:12px}.g6-grammar-examples p{margin:5px 0}.g6-grammar-examples small{color:var(--muted)}.g6-set-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin:16px 0}.g6-set{position:relative;text-align:left;display:flex;flex-direction:column;gap:10px;border:1px solid var(--line);border-radius:16px;padding:19px;background:var(--card);color:inherit;cursor:pointer;overflow:hidden}.g6-set.selected{background:rgba(117,155,207,.12);border-color:#729aca}.g6-set span{font-size:11px;letter-spacing:.12em;color:var(--muted);font-weight:800}.g6-set strong{font-size:16px}.g6-set small{color:var(--muted)}.g6-set i{position:absolute;bottom:0;left:0;height:4px;background:#5b91cc;transition:width .2s}.g6-set-header{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap}.g6-reset{padding:9px 13px;border:1px solid var(--line);background:var(--card);color:inherit;border-radius:10px;cursor:pointer}.g6-word[hidden]{display:none}@media(max-width:620px){.g6-word-grid{grid-template-columns:1fr}.g6-set-grid{gap:7px}.g6-set{padding:12px 9px}.g6-set strong{font-size:13px}}";
 document.head.appendChild(el);
}
function header(tab){
 const tabs=[["knowledge","01 · Kiến thức"],["original","02 · Bài tập gốc"],["practice","03 · Luyện tập thêm"]];
 return '<div class="breadcrumbs"><button class="crumb-btn" onclick="goAreaHome()">Home</button><span>›</span><button class="crumb-btn" onclick="goGrade(6)">Lớp 6</button><span>›</span><span>Unit 2</span></div>'+
 '<div class="unit-hero"><div class="eyebrow">GRADE 6 · UNIT 02</div><h1>My Home</h1><p>Vocabulary · There is / There are · Prepositions</p><div class="meta"><span class="chip">'+A.words.reduce((n,g)=>n+g.items.length,0)+' từ vựng</span><span class="chip">'+originalTotal+' bài tập gốc</span><span class="chip">30 câu luyện thêm</span></div></div>'+
 '<nav class="g6-tabs" aria-label="Phần học trong Unit 2">'+tabs.map(x=>'<a href="#'+BASE+(x[0]==="knowledge"?"":"/"+x[0])+'" class="'+(x[0]===tab?"current":"")+'" '+(x[0]===tab?'aria-current="page"':'')+'>'+x[1]+'</a>').join("")+'</nav>';
}
function lesson(){
 const listing=A.words.map(category=>'<section class="g6-vocab-group"><h3>'+esc(category.group)+' · '+category.items.length+' words</h3><div class="g6-word-grid">'+
 category.items.map(w=>'<article class="g6-word" data-g6-u2-word-row="'+esc((w.word+" "+w.meaning+" "+(w.usage||"")+" "+(w.examples||[]).join(" ")).toLowerCase())+'">'+
 '<div class="g6-word-heading"><div><b>'+esc(w.word)+'</b><span class="g6-ipa">'+esc(w.ipa||"")+'</span></div><span class="g6-meaning">'+esc(w.meaning)+'</span></div>'+
 (w.usage?'<div class="g6-usage"><b>Cách dùng:</b> '+esc(w.usage)+'</div>':"")+
 '<div class="g6-word-examples">'+(w.examples||[]).slice(0,2).map((example,i)=>'<p><small>'+String(i+1).padStart(2,"0")+'</small> '+esc(example)+'</p>').join("")+'</div></article>').join("")+'</div></section>').join("");
 const grammar=A.grammar.map((g,i)=>'<details class="g6-lesson" '+(i===0?'open':'')+'><summary>'+esc(g.title)+'</summary>'+
 '<p class="g6-grammar-usage">'+esc(g.usage)+'</p>'+
 '<div class="g6-formula"><b>Khẳng định</b><span>'+esc(g.positive)+'</span></div>'+
 '<div class="g6-formula"><b>Phủ định</b><span>'+esc(g.negative)+'</span></div>'+
 '<div class="g6-formula"><b>Nghi vấn</b><span>'+esc(g.question)+'</span></div>'+
 '<p><b>Dấu hiệu thường gặp:</b> '+esc(g.signals)+'</p>'+
 '<h4>Ví dụ theo cấu trúc</h4><div class="g6-grammar-examples">'+(g.forms||[]).map(f=>'<div><b>'+esc(f.label)+'</b><p>'+esc(f.example)+'</p><small>'+esc(f.why)+'</small></div>').join("")+'</div>'+
 '<h4>Điểm dễ nhầm</h4><ul>'+g.rules.map(r=>'<li>'+esc(r)+'</li>').join("")+'</ul></details>').join("");
 return '<div class="g6-u2-root"><h2 class="g6-section-title">01 · Vocabulary</h2>'+
 '<input class="g6-word-search" data-g6-u2-search type="search" placeholder="Tìm từ / nghĩa / ví dụ…" aria-label="Tìm từ vựng"/>'+listing+
 '<h2 class="g6-section-title">02 · Grammar</h2>'+grammar+'</div>';
}
function groupSelector(){return '<div class="g6-groups">'+original.map(g=>'<button type="button" class="g6-group '+(state.group===g.id?"selected":"")+'" data-g6-u2-group="'+esc(g.id)+'"><b>'+esc(g.title)+'</b><small>'+countDone(g)+' / '+g.items.length+' câu · trang '+esc(g.page)+'</small></button>').join("")+'</div>';}
function sectionProgress(g){const checked=g.items.filter(x=>state.checked[x.id]).length;const valid=g.items.filter(x=>x.kind!=="essay"&&(x.kind!=="mcq"||x.a!==null)&&x.answers?.length!==0);return '<div class="g6-progress">Đã kiểm tra '+checked+' / '+g.items.length+' mục · '+valid.length+' câu có đáp án tham khảo/chấm được</div>';}
function mcqLabels(q,g){
 if(g.id!=="pronunciation")return q.o.map(esc);
 const decorated=q.q.split(": ").slice(1).join(": ").split(" / ");
 return decorated.length===4?decorated.map(rich):q.o.map(esc);
}
const G6_WORD_HELP=Object.fromEntries(
 ("kindergarten:trường mẫu giáo;activities:những hoạt động;hobby:sở thích;equipments:dạng số nhiều không dùng vì equipment không đếm được;overseas:ở nước ngoài;high school:trường trung học phổ thông;secondary school:trường trung học;pay:trả tiền;knock:gõ cửa;borrow:mượn;help:giúp đỡ;gym:phòng thể dục;meals:những bữa ăn;break time:giờ nghỉ;poem:bài thơ;warm:ấm áp;healthy:khỏe mạnh;quiet:yên tĩnh;hard-working:chăm chỉ;uniform:đồng phục;pocket money:tiền tiêu vặt;worry:lo lắng;interesting:thú vị;studied:đã học;had:đã có;played:đã chơi;did:đã làm;studying:đang học;doing:đang làm;playing:đang chơi;having:đang có hoặc đang dùng;have:có;does:làm hoặc trợ động từ của ngôi ba;plays:chơi (ngôi ba);has:có (ngôi ba);studies:học (ngôi ba);do:làm;play:chơi;on:trên hoặc chỉ ngày;at:ở hoặc chỉ giờ;for:cho;to:đến;about:về;with:với;surrounded:được bao quanh;built:được xây;covered:được phủ;grounded:được tiếp đất;table tennis:bóng bàn;football:bóng đá;Where:ở đâu;What:cái gì;When:khi nào;What time:mấy giờ;rubbers:những cục tẩy;calculators:những máy tính;pencils:những bút chì;dictionaries:những cuốn từ điển;private:tư thục hoặc riêng tư;public:công lập hoặc công cộng;international:quốc tế;clothing:quần áo;coat:áo khoác;suit:bộ com-lê;takes:mang hoặc lấy;send:gửi;lend:cho mượn;nice:tốt đẹp;pleasant:dễ chịu;disappointing:đáng thất vọng;taking:đang làm hoặc tham gia;making:đang tạo ra;working:đang làm việc;writing:đang viết;sink:bồn rửa;wardrobe:tủ quần áo;cupboar:từ bị thiếu chữ d (cupboard);country house:nhà ở vùng quê;flat:căn hộ;hall:đại sảnh;activity:hoạt động;personality:tính cách;appearance:ngoại hình;bedroom:phòng ngủ;living room:phòng khách;kitchen:nhà bếp;bathroo:từ bị thiếu chữ m (bathroom);dinner:bữa tối;lunch:bữa trưa;breakfast:bữa sáng;younger:nhỏ tuổi hơn;little:nhỏ;small:nhỏ;older:lớn tuổi hơn;getting:dạng V-ing của get;to get:động từ nguyên mẫu có to;gets:động từ ngôi ba của get;get:lấy hoặc trở nên;music room:phòng âm nhạc;library:thư viện;sport center:trung tâm thể thao;computer room:phòng máy tính;quietly:một cách yên lặng;quieter:yên tĩnh hơn;look at:nhìn vào;take part in:tham gia;put on:mặc vào;participate:tham gia;air-conditioners:máy điều hòa;projectors:máy chiếu;chairs:những chiếc ghế;All are correct:tất cả đều đúng;do:làm;wear:mặc;wears:mặc (ngôi ba);is wearing:đang mặc (ngôi ba);wearing:dạng V-ing của wear;study:học;share:chia sẻ;surround:bao quanh;remember:ghi nhớ;greenhouse:nhà kính;swimming pool:hồ bơi;ruler:thước kẻ;confident:tự tin;shy:rụt rè;tired:mệt;noisy:ồn ào;write:viết;writes:viết (ngôi ba);is write:cấu trúc sai;Are:trợ động từ số nhiều;Is:trợ động từ số ít;Does:trợ động từ hiện tại đơn ngôi ba;Do:trợ động từ hiện tại đơn;looks:trông có vẻ;classmate:bạn cùng lớp;boarding:thuộc nội trú;equipment:thiết bị;rubber:cục tẩy;calculator:máy tính;judo:môn võ judo")
 .split(";").map(part=>{const p=part.indexOf(":");return [part.slice(0,p),part.slice(p+1)];}));
const G6_READING_CLUES={
"reading-cloze-1":"Every day, she gets up at seven o'clock. After waking up, she washes her face and brushes her teeth.",
"reading-cloze-2":"She is eleven years old. She is in grade 6. / Mike is her (2) _____ brother. He is in grade 10.",
"reading-cloze-3":"Jane goes to school after (3) _____ dressed at 7:45 in the morning.",
"reading-cloze-4":"a (4) _____ full of interesting books",
"reading-cloze-5":"read storybooks and do her homework (5) _____",
"reading-comprehension-1":"they learn Literature in both Vietnamese and English; and they also study Science and Geography in English.",
"reading-comprehension-2":"students also play sports and join many different clubs.",
"reading-comprehension-3":"The classrooms are bright and modern, with big windows, air-conditioners, projectors, and comfortable chairs.",
"reading-comprehension-4":"Students love studying here because the teachers are friendly and the facilities are excellent.",
"reading-comprehension-5":"they only need to wear uniform on Mondays and Fridays. Besides studying, students also play sports and join many different clubs."
};
const G6_SOUNDS=[
["/ʌ/","/ʌ/","/ʌ/","/juː/"],["/æ/","/ɑː/","/ɑː/","/ɑː/"],
["/k/","/tʃ/","/tʃ/","/tʃ/"],["/ɑː/","/ɑː/","/ə/","/ɑː/"],
["/ʌ/","/əʊ/","/ʌ/","/ʌ/"]
];
const G6_STRESS=[[1,1,2,1],[1,1,1,2],[2,1,1,1],[2,1,2,2],[2,1,1,1]];
const G6_WORDS=Object.fromEntries(A.words.flatMap(g=>g.items).map(w=>[w.word,w]));
function G6Filled(q){
 const example=(q.answers||[])[0]||"";
 if(!example)return "";
 const fills=example.split(/\s*\|\s*/);let pos=0;
 let text=q.q.replace(/______/g,()=>fills[pos++]||"______")
              .replace(/\([A-Za-z ]+\)\s*/g,"");
 return text.replace(/\s+/g," ").trim();
}
function G6Clue(q,g){
 if(G6_READING_CLUES[q.id])return G6_READING_CLUES[q.id];
 if(g.id==="pronunciation")return "Các phần chữ được gạch chân trong bốn từ của câu.";
 if(g.id==="stress")return q.o.join(" / ");
 return q.q.replace(/<[^>]*>/g,"").replace(/\s+/g," ").slice(0,270);
}
function G6OptionInfo(q,g,i){
 const opt=q.o[i],correct=q.a===i;
 if(g.id==="pronunciation"){
   const sound=G6_SOUNDS[q.no-1]?.[i]||"";
   return {word:opt,meaning:sound,correct,analysis:(correct?"Đáp án khác nhóm: ":"Cùng nhóm phát âm: ")+sound+". "+(correct?q.note:"So sánh âm được gạch chân, không dựa vào cách viết.")};
 }
 if(g.id==="stress"){
   const n=G6_STRESS[q.no-1]?.[i];
   return {word:opt,meaning:n?"Nhấn âm "+n:"",correct,analysis:(correct?"Trọng âm khác nhóm. ":"Trọng âm cùng nhóm. ")+q.note};
 }
 const known=G6_WORDS[opt],meaning=known?.meaning||G6_WORD_HELP[opt]||"";
 if(correct)return {word:opt,meaning,correct:true,analysis:q.note};
 if(q.a===null)return {word:opt,meaning,correct:false,analysis:meaning?"Nghĩa/cách dùng: "+meaning+". Cần xét cùng các lựa chọn khác trước khi xác định đáp án.":"Đề gốc chưa xác định được một đáp án duy nhất."};
 if(g.id==="reading-comprehension")return {word:opt,meaning,correct:false,analysis:"Đối chiếu với câu dẫn chứng: "+G6Clue(q,g)+" Chi tiết này không trả lời đầy đủ câu hỏi bằng phương án "+String.fromCharCode(65+i)+"."};
 if(g.id==="reading-cloze")return {word:opt,meaning,correct:false,analysis:(meaning?"Nghĩa: "+meaning+". ":"")+"Khi đặt vào chỗ trống, phương án này không đáp ứng chi tiết hoặc cấu trúc: "+q.note};
 return {word:opt,meaning,correct:false,analysis:(meaning?"Nghĩa/cách dùng: "+meaning+". ":"")+"Không phù hợp với yêu cầu của câu: "+q.note};
}
function G6Application(q,g){
 const opt=q.kind==="mcq"&&q.a!==null?q.o[q.a]:"";
 const known=G6_WORDS[opt];
 if(known?.examples?.length)return "Ví dụ A2–B1: "+known.examples[0]+(known.usage?" · Cụm thường dùng: "+known.usage:"");
 if(g.id==="pronunciation")return "Đọc từng từ và so sánh đúng âm đã gạch chân; cùng một chữ cái có thể mang những âm khác nhau.";
 if(g.id==="stress")return "Tách từ thành các âm tiết rồi nhận diện âm tiết được nhấn mạnh nhất.";
 if(g.id==="reading-comprehension")return "Khi đọc lại đoạn văn, đối chiếu nguyên ý của dẫn chứng với câu hỏi, không chỉ tìm từ xuất hiện giống nhau.";
 if(g.id==="reading-cloze"&&opt)return "Thử đặt "+opt+" vào cả câu trong đoạn văn để kiểm tra nghĩa và cấu trúc.";
 if(q.kind==="input"&&q.answers?.length)return "Câu hoàn chỉnh / mẫu biến đổi: "+G6Filled(q);
 if(opt&&q.q.includes("______"))return "Đặt vào câu: "+q.q.replace("______",opt);
 if(g.id==="paragraph")return "Gợi ý bố cục: mở đầu giới thiệu ngày đầu đi học; thân bài kể 1–2 hoạt động cụ thể; kết bài nêu cảm xúc.";
 return q.note;
}
function G6Explanation(q,g){
 const isMC=q.kind==="mcq",ambiguous=isMC&&q.a===null;
 const answerText=isMC?(ambiguous?"Chưa có đáp án duy nhất":String.fromCharCode(65+q.a)+". "+q.o[q.a]):q.answers?.length?q.answers.join(" / "):"Cần giáo viên rà soát";
 const warning=q.flag?'<p class="g6-issue"><b>Lưu ý đề gốc:</b> '+esc(q.flag)+'</p>':"";
 if(g.id==="reading-cloze"||g.id==="reading-comprehension"){
   const citations=Array.isArray(q.readingEvidence)?q.readingEvidence:[];
   const location=citations.length?'Đoạn '+citations[0].paragraph+', câu '+citations.map(x=>x.sentence).join(", "):"Chưa xác minh";
   const excerpts=citations.map(x=>'<p class="g6-cited-sentence"><b>Câu '+esc(x.sentence)+':</b> '+esc(x.text)+'</p>').join("");
   return '<div class="g6-quick" data-unit-reading-explanation="1">'+
     '<p><b>Đáp án:</b> '+esc(answerText)+'</p>'+
     '<p><b>Giải thích tiếng Việt:</b> '+esc(q.note)+'</p>'+
     '<div class="g6-reading-location"><p><b>Vị trí trong bài:</b> '+esc(location)+'</p>'+
     '<p><b>Câu chứa bằng chứng:</b></p>'+excerpts+'</div>'+warning+'</div>';
 }
 if(isMC){
   const examples=Array.isArray(q.examples)?q.examples:[];
   const valid=examples.length===4&&examples.every((x,i)=>x.word===q.o[i]&&x.meaning&&x.en);
   const exRows=valid?examples.map((x,i)=>'<div class="g6-example-row">'+
     '<b>'+String.fromCharCode(65+i)+'. '+esc(x.word)+'</b>'+
     '<span class="g6-example-meaning">Nghĩa thường gặp: '+esc(x.meaning)+'</span>'+
     '<span>'+esc(x.en)+'</span></div>').join(""):
     '<p class="g6-issue">Bốn ví dụ chưa được kiểm duyệt đầy đủ.</p>';
   return '<div class="g6-quick" data-unit-mcq-explanation="1">'+
     '<p><b>Đáp án:</b> '+esc(answerText)+'</p>'+
     '<p><b>Giải thích collocation / idiom / phrase / cấu trúc:</b> '+esc(q.note)+'</p>'+
     '<p><b>Dịch tiếng Việt:</b> '+esc(q.translation||"")+'</p>'+
     '<div class="g6-example-set"><b>4 ví dụ B1–C1 (A–D):</b>'+exRows+'</div>'+warning+'</div>';
 }
 return '<div class="g6-quick" data-unit-written-explanation="1">'+
    '<p><b>Đáp án:</b> '+esc(answerText)+'</p>'+
    '<p><b>Vùng kiến thức:</b> '+esc(q.zone||g.title)+'</p>'+
    '<p><b>Giải thích:</b> '+esc(q.note)+'</p>'+
    (q.translation?'<p><b>Dịch:</b> '+esc(q.translation)+'</p>':'')+warning+'</div>';
}
function feedback(q,g){
 if(!state.checked[q.id])return "";
 if(q.kind==="essay")return '<div class="g6-result"><strong>Đã lưu bài viết</strong><div class="g6-quick"><p><b>Vùng kiến thức:</b> '+esc(q.zone||g.title)+'</p><p><b>Gợi ý:</b> '+esc(q.note)+'</p><p><b>Dịch đề:</b> '+esc(q.translation||q.q)+'</p><p>Giáo viên cần nhận xét thủ công; bài không có một đáp án cố định.</p></div></div>';
 const ungraded=q.kind==="mcq"?(q.a===null):(!q.answers?.length||g.id==="transformation"||g.id==="rearrangement");
 const correct=scored(q,g);
 const label=ungraded?"Đáp án tham khảo · Không chấm tự động":correct?"✓ Chính xác":"✕ Chưa chính xác";
 return '<div class="g6-result" role="status"><strong>'+label+'</strong>'+G6Explanation(q,g)+'</div>';
}
function G6VisiblePrompt(q,g){
 if(["pronunciation","stress"].includes(g.id))return "";
 if(g.id==="reading-cloze")return "Blank "+q.no;
 return q.q;
}
function questionBlock(q,g){
 const checked=!!state.checked[q.id],val=answer(q.id);
 let answerHTML="";
 if(q.kind==="mcq"){
 const labels=mcqLabels(q,g);
 answerHTML='<div class="g6-opts">'+labels.map((opt,i)=>'<label class="g6-option"><input type="radio" name="g6-'+esc(q.id)+'" data-g6-u2-answer="'+esc(q.id)+'" value="'+i+'" '+(val===String(i)?"checked":"")+'><span><b>'+("ABCD"[i])+'.</b> '+opt+'</span></label>').join("")+'</div>';
 }else if(q.kind==="essay"){
 const count=val.trim()?val.trim().split(/\s+/).length:0;
 answerHTML='<textarea class="g6-essay" data-g6-u2-answer="'+esc(q.id)+'" rows="8" placeholder="Write your paragraph here...">'+esc(val)+'</textarea><p class="g6-small" data-g6-u2-word-count="'+esc(q.id)+'">'+count+' words · Mục tiêu 80–100 từ</p>';
 }else{
 const slots=q.q.split("______").length-1;
 const parts=val.split(/\s*\|\s*/);
 answerHTML=slots>1?'<div class="g6-grid">'+Array.from({length:slots},(_,i)=>'<label><span class="g6-small">Chỗ trống '+(i+1)+'</span><input type="text" class="g6-input" data-g6-u2-answer="'+esc(q.id)+'" data-g6-u2-index="'+i+'" value="'+esc(parts[i]||"")+'" autocomplete="off" placeholder="Nhập đáp án '+(i+1)+'"/></label>').join("")+'</div>':
 '<input type="text" class="g6-input" data-g6-u2-answer="'+esc(q.id)+'" value="'+esc(val)+'" autocomplete="off" spellcheck="false" placeholder="Nhập đáp án…"/>';
 }
 return '<article class="g6-item" id="g6-q-'+esc(q.id)+'"><div class="g6-no">QUESTION '+String(q.no).padStart(2,"0")+'</div>'+(G6VisiblePrompt(q,g)?'<h4>'+rich(G6VisiblePrompt(q,g))+'</h4>':"")+
 answerHTML+
 (q.kind==="essay"?'<button class="g6-check" type="button" data-g6-u2-check="'+esc(q.id)+'">Lưu bài viết</button>':
 '<button class="g6-check" type="button" data-g6-u2-check="'+esc(q.id)+'" '+((!val.trim()||q.kind==="input"&&q.q.split("______").length>2&&val.split("|").some(x=>!x.trim()))?"disabled":"")+'>Kiểm tra / Đối chiếu</button>')+
 feedback(q,g)+'</article>';
}
function renderOriginal(){const g=original.find(x=>x.id===state.group)||original[0];
 return '<div class="g6-u2-root"><h2>Bài tập gốc · Original Worksheet</h2><p class="g6-small">Worksheet Unit 2 G6 · GV Nguyễn Bích Vân</p>'+groupSelector()+'<section class="g6-block"><h3>'+esc(g.title)+'</h3>'+sectionProgress(g)+
 (g.wordBank?'<div class="g6-bank">'+g.wordBank.map(x=>'<span>'+esc(x)+'</span>').join("")+'</div>':"")+
 (g.passage?'<div class="g6-passage">'+esc(g.passage)+'</div>':"")+
 g.items.map(q=>questionBlock(q,g)).join("")+'</section></div>';
}
function renderPractice(){
 const selected=practiceSets.find(x=>x.number===Number(state.practiceSet))||practiceSets[0];
 const tiles='<div class="g6-set-grid">'+practiceSets.map(set=>{
   const completed=set.items.filter(q=>state.checked[q.id]).length;
   const correct=set.items.filter(q=>state.checked[q.id]&&scored(q,extra)===true).length;
   return '<button type="button" class="g6-set '+(selected.number===set.number?"selected":"")+'" data-g6-u2-set="'+set.number+'" aria-pressed="'+(selected.number===set.number)+'"><span>SET '+String(set.number).padStart(2,"0")+'</span><strong>Practice Set '+set.number+'</strong><small>'+completed+' / 10 câu · '+correct+' đúng</small><i style="width:'+(completed*10)+'%"></i></button>';
 }).join("")+'</div>';
 const checked=selected.items.filter(q=>state.checked[q.id]).length;
 const correct=selected.items.filter(q=>state.checked[q.id]&&scored(q,extra)===true).length;
 return '<div class="g6-u2-root"><h2>Luyện tập thêm · 3 Sets</h2>'+tiles+
 '<div class="g6-block"><div class="g6-set-header"><div><h3>Practice Set '+selected.number+'</h3><p class="g6-progress">'+checked+' / 10 câu đã kiểm tra · '+correct+' câu đúng</p></div>'+
 '<button type="button" class="g6-reset" data-g6-u2-reset-set="'+selected.number+'">Làm lại set này</button></div>'+
 selected.items.map((q,i)=>questionBlock({...q,no:i+1},extra)).join("")+'</div></div>';
}
function render(tab,keepScroll){
 hydrate();styles();
 activeTab=["original","practice"].includes(tab)?tab:"knowledge";
 const mount=document.getElementById("pageMount");if(!mount)return;
 const scroll=keepScroll?global.scrollY:0;
 mount.style.display="block";
 const quiz=document.getElementById("quizShell"),result=document.getElementById("resultScreen");if(quiz)quiz.style.display="none";if(result)result.style.display="none";
 mount.innerHTML=header(activeTab)+(activeTab==="knowledge"?lesson():activeTab==="original"?renderOriginal():renderPractice());
 if(keepScroll)global.scrollTo(0,scroll);else global.scrollTo(0,0);
}
function captureAnswer(t){
 hydrate();const id=t.dataset.g6Answer;
 if(t.hasAttribute("data-g6-u2-index")){
   const values=(state.answers[id]||"").split("|");values[Number(t.dataset.g6Index)]=t.value;
   state.answers[id]=values.map(x=>x.trim()).join(" | ");
 }else state.answers[id]=t.value;
 delete state.checked[id];save();
 const block=t.closest(".g6-item");block?.querySelector(".g6-result")?.remove();
 const inputs=block?.querySelectorAll("[data-g6-u2-index]")||[];
 const incomplete=inputs.length?Array.from(inputs).some(x=>!x.value.trim()):!t.value.trim();
 const check=block?.querySelector("[data-g6-u2-check]");if(check)check.disabled=incomplete;
}
function onChange(ev){
 const t=ev.target;
 if(!t.closest?.(".g6-u2-root"))return;
 if(t.matches("[data-g6-u2-answer]"))captureAnswer(t);
 
}
function onInput(ev){
 const t=ev.target;
 if(t.matches?.("[data-g6-u2-search]")){
 const query=t.value.toLocaleLowerCase("vi").trim();document.querySelectorAll("[data-g6-u2-word-row]").forEach(row=>{row.hidden=!row.dataset.g6WordRow.includes(query)});return;
 }
 if(!t.matches?.("[data-g6-u2-answer]"))return;
 captureAnswer(t);
 const counter=document.querySelector('[data-g6-u2-word-count="'+t.dataset.g6Answer+'"]');if(counter)counter.textContent=(t.value.trim()?t.value.trim().split(/\s+/).length:0)+" words · Mục tiêu 80–100 từ";
}
function onClick(ev){
 const g=ev.target.closest?.("[data-g6-u2-group]");if(g){hydrate();state.group=g.dataset.g6Group;save();render("original",true);return;}
 const choice=ev.target.closest?.("[data-g6-u2-set]");if(choice){hydrate();state.practiceSet=Number(choice.dataset.g6Set);save();render("practice",false);return;}
 const reset=ev.target.closest?.("[data-g6-u2-reset-set]");if(reset){
   hydrate();const set=practiceSets.find(x=>x.number===Number(reset.dataset.g6ResetSet));
   if(!set)return;
   if(typeof global.confirm==="function"&&!global.confirm("Xóa câu trả lời trong Set "+set.number+"?"))return;
   set.items.forEach(q=>{delete state.answers[q.id];delete state.checked[q.id];});
   save();render("practice",true);return;
 }
 const t=ev.target.closest?.("[data-g6-u2-check]");if(!t)return;
 hydrate();const x=findItem(t.dataset.g6Check);if(!x)return;
 state.checked[x.q.id]=true;save();render(activeTab,true);
 const result=document.getElementById("g6-q-"+x.q.id)?.querySelector(".g6-result");if(result)result.scrollIntoView({block:"nearest"});
}
document.addEventListener("change",onChange);
document.addEventListener("input",onInput);
document.addEventListener("click",onClick);
global.renderGrade6Unit2=function(tab){render(tab||"knowledge",false);};
})(window);
