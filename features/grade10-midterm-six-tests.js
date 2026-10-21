/* Grade 10 Tutoring: faithful reading view of the uploaded 24-page, six-test Word document.
 * Read-only: no invented answer key for Tests 1–2.
 */
(function(global){
  "use strict";
  const SOURCE="./content/grade10-midterm-six-tests.txt?v=20261021-all6-1";
  const TEACHERS={1:"Mr. Khanh",2:"Ms. Oanh",3:"Mr. Tuấn Anh",4:"Ms. Nguyên",5:"Mr. Trí",6:"Mrs. Quyên 2"};
  const COUNTS={1:50,2:43,3:45,4:50,5:45,6:46};
  let cache=null;
  function esc(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}
  async function load(){
    if(cache)return cache;
    const r=await fetch(SOURCE,{cache:"no-store"});if(!r.ok)throw Error("Không tải được bản đề gốc ("+r.status+")");
    const text=await r.text();
    const matches=[...text.matchAll(/^TEST\s+([1-6])\s+\(([^)\n]+)\)/gm)];
    if(matches.length!==6||matches.map(m=>m[1]).join("")!=="123456")throw Error("File nguồn không có đủ 6 TEST liên tục");
    cache={};
    for(let i=0;i<matches.length;i++){
      const m=matches[i],end=i+1<matches.length?matches[i+1].index:text.length;
      cache[Number(m[1])]=text.slice(m.index,end).trim();
    }
    return cache;
  }
  function style(){
    if(document.getElementById("g10-six-source-style"))return;
    const el=document.createElement("style");el.id="g10-six-source-style";
    el.textContent=".g10-source-sheet{white-space:pre-wrap;overflow-wrap:anywhere;line-height:1.85;font-size:14px;padding:24px;border:1px solid var(--line);border-radius:16px;background:var(--card,#fff);font-family:inherit}.g10-source-nav{display:flex;flex-wrap:wrap;gap:10px;margin:16px 0}.g10-source-nav button{min-height:39px}.g10-source-help{border:1px solid var(--line);border-radius:12px;padding:12px 16px;line-height:1.7;color:var(--muted)}@media(max-width:640px){.g10-source-sheet{padding:14px;font-size:13px}}";
    document.head.appendChild(el);
  }
  async function render(id){
    id=Number(id);
    if(!Number.isInteger(id)||id<1||id>6){location.hash="grade-10/mid-term-test";return}
    style();
    const m=document.getElementById("pageMount");
    m.style.display="block";
    const quiz=document.getElementById("quizShell");if(quiz)quiz.style.display="none";
    m.innerHTML='<div class="unit-hero"><h1>Đang mở đề gốc…</h1></div>';
    try{
      const tests=await load();
      if(location.hash!="#grade-10/mid-term-test/source-test-"+id)return;
      m.innerHTML='<div class="breadcrumbs"><button class="crumb-btn" onclick="goGrade(10)">Lớp 10</button><span>›</span><button class="crumb-btn" onclick="location.hash=\'grade-10/mid-term-test\'">Mid Term Test</button><span>›</span><span>Đề gốc '+id+'</span></div>'+
      '<div class="unit-hero"><div class="eyebrow">Học thêm · Lớp 10 · Bản gốc</div><h1>Test '+id+' · '+esc(TEACHERS[id])+'</h1><p>'+COUNTS[id]+' câu · Giữ nguyên nội dung trích từ tài liệu Word 24 trang.</p></div>'+
      '<div class="g10-source-help">Đây là bản xem văn bản gốc. Test 3–6 có phiên bản tương tác với lời giải tại trang Mid Term Test. Test 1–2 hiện ở dạng đề để đọc/đối chiếu, chưa có đáp án xác minh.</div>'+
      '<div class="g10-source-nav">'+(id>1?'<button class="secondary" onclick="location.hash=\'grade-10/mid-term-test/source-test-'+(id-1)+'\'">← Test '+(id-1)+'</button>':'')+
      '<button class="secondary" onclick="location.hash=\'grade-10/mid-term-test\'">6 đề thi</button>'+
      (id>=3?'<button class="primary" onclick="location.hash=\'grade-10/mid-term-test/test-'+id+'\'">Làm Test '+id+' tương tác →</button>':'')+
      (id<6?'<button class="secondary" onclick="location.hash=\'grade-10/mid-term-test/source-test-'+(id+1)+'\'">Test '+(id+1)+' →</button>':'')+'</div>'+
      '<article class="g10-source-sheet">'+esc(tests[id])+'</article>';
      window.scrollTo({top:0,behavior:"smooth"});
    }catch(err){m.innerHTML='<div class="unit-hero"><h1>Không mở được đề gốc</h1><p>'+esc(err.message||err)+'</p><button class="secondary" onclick="location.hash=\'grade-10/mid-term-test\'">Quay lại</button></div>'}
  }
  global.renderG10MidTermSourceTest=render;
})(window);
