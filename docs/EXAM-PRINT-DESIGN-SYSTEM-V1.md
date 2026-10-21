# WEBSITE VOCAB — EXAM PRINT DESIGN SYSTEM V1.0

**Ngày lập:** 21/10/2026  
**Áp dụng:** HSG tỉnh; tái sử dụng cho IELTS, Vocabulary và những bài kiểm tra khác.  
**Trạng thái:** Đặc tả mục tiêu + checklist QA. Không đồng nghĩa toàn bộ renderer hiện tại đã đạt chuẩn.  
**Nguồn:** bản PDF audit Hải Phòng 3 trang đã dựng trong cuộc trao đổi; mã nguồn features/hsg-tinh.js, features/hsg-tinh.css; Google Docs mẫu Passive Voice - Two Objects & Double Passive; các nguyên tắc trình bày đề thi Cambridge paper-based.

## 1. Mục tiêu bất biến

Bản in phải giống một đề thi giấy được biên soạn chuyên nghiệp. Độ ưu tiên:

1. Đúng từng câu chữ, câu hỏi, option, gap và ngữ liệu gốc.
2. Đúng cây cấu trúc Part → Instruction → Passage → Question → Choices/Answer space.
3. Dễ đọc, dễ khoanh A–D, dễ điền đáp án.
4. Phân trang A4 cân đối, không tạo một trang gần như trắng chỉ vì một câu.
5. Inter và burgundy từ Google Docs là hệ nhận diện, không được che khuất lỗi parser.

In toàn bộ đề hoặc chọn nhiều Part; Part được in theo thứ tự gốc, không theo thứ tự bấm. Với PTNK, "toàn bộ" nghĩa là mã đề đang mở. Không in nội dung bài làm, đáp án hoặc lời giải; giữ quy tắc loại phần Listening.

## 2. Kết quả phân tích PDF audit — lỗi cần nhớ

**Quan trọng:** số liệu sau thuộc file audit cũ, KHÔNG đại diện cho mọi bản in live hiện tại.

| Trang | Số từ (PyMuPDF) | Phạm vi chữ theo trục y | Quan sát |
|---|---:|---|---|
| 1 | 271 | 47–782 pt / chiều cao 843 pt | Advertisement thành khối dài; các đáp án A/B đôi khi dính; câu 45 bị ngắt |
| 2 | 228 | 47–779 pt / 843 pt | Letter, bullets và đoạn văn thiếu phân tách; cách đáp án quá thất thường |
| 3 | **20** | 48–185 pt / 843 pt | Câu 50 nằm lẻ và trang gần như trống |

Vùng chữ ngang khoảng x = 49–548 pt trên bề ngang xấp xỉ 596 pt, nên nguyên nhân cốt lõi **không phải lề giấy**.

Các lỗi tái phát cần kiểm tra: (i) A và B bị nhập thành một dòng văn bản; (ii) một lựa chọn D của câu trước bị đẩy sang trang sau; (iii) passage không có paragraph thật, bullet chạy giữa câu; (iv) heading và instruction bị dính với phần trước; (v) last-page whitespace bất thường. Không chữa các lỗi này chỉ bằng padding/CSS nếu dữ liệu đã bị nối sai.

## 3. Định dạng giấy: tokens cố định

| Token | Mặc định | Ghi chú |
|---|---|---|
| Paper | A4 portrait, **210 × 297 mm** | Không in screenshot màn hình |
| Top margin | **16 mm** | |
| Bottom margin | **17 mm** | |
| Left/right margin | **17 mm mỗi bên** | Vùng nội dung rộng **176 mm** |
| Usable page height | **264 mm** | Trước vùng header/footer nội bộ |
| Background | **#FFFFFF** | Không dùng hồng nhạt phủ toàn bộ tờ giấy |
| Main font | **Inter**, fallback Segoe UI/Arial | Font fallback phải giữ bố cục |
| Text | **#273241** | Phải dễ đọc khi in đen trắng |
| Accent | **#800040** (burgundy) | Chỉ cho heading, số câu, đường nhấn |
| Secondary text | **#64748B** | Metadata/hướng dẫn phụ |
| Pale pink | **#FCF0F0** | Chỉ dải scope hoặc nhãn nhỏ |
| Divider | **#D8C0CA** | 0.5–1 pt, không làm nhiều hộp nặng nề |

Chỉ có **một thiết lập @page canonical**. Nội dung in không được phụ thuộc người dùng bật Background graphics.

## 4. Thang phân cấp chữ và khoảng cách

| Thành phần | Cỡ chữ | Độ đậm | Line-height & spacing |
|---|---:|---:|---|
| Header nhỏ / site label | 7.3–8 pt | 650–800 | 1.3 |
| Tên đề | **19 pt** | 800 | 1.23, margin dưới 5 pt |
| Năm học / subtitle | **9.5 pt** | 400 | 1.45 |
| Part title | **13.5 pt** | 800 | 1.28, cách phần sau 10–13 pt |
| Section heading | 12–13.5 pt | 750–800 | 1.28 |
| Passage/article title | **11 pt** | 750–800 | 1.34 |
| Instructions | **10 pt** | 650 | 1.53, margin trên/dưới khoảng 10 pt |
| Passage paragraph / question stem | **10.5 pt** | 400 | **1.55–1.60**, margin giữa paragraph 9–10 pt |
| Question number | **10 pt** | 800 | Màu burgundy, gutter trái |
| A–D option text | **10.2 pt** | 400 | **1.46**, khoảng cách hàng 5–6 pt |
| Footer | **8 pt** | 400 | 1.4 |

Vertical rhythm dùng hệ khoảng cách 4–6–9–12–16–20 pt; tránh mỗi câu có một khoảng cách ngẫu nhiên. Khoảng cách passage → câu hỏi khoảng 12–16 pt, giữa câu 12–16 pt, giữa các Part khoảng 20–22 pt. Không giảm body dưới 10 pt chỉ để ép vừa trang.

## 5. Phân vùng trên một tờ giấy

Thứ tự trong DOM / dòng đọc phải là:

**A. Exam header (một lần)**  
Site label → tên đề thi → năm học, mã đề/phạm vi → dòng họ tên và lớp. Header chỉ chiếm một phần nhỏ đầu trang 1, không có bìa riêng mặc định.

**B. Part heading (mỗi Part một lần)**  
PART xx → tên Part → range (ví dụ 46–50). Nhãn PART không chiếm vùng giấy quá lớn. Khi in nhiều Part, chỉ hiển thị Part đã chọn.

**C. Instruction (theo Part/task)**  
Viết nguyên văn hướng dẫn, không xóa giới hạn số từ hoặc cách chọn A–D. Giữ với ít nhất vài dòng của passage/câu kế tiếp.

**D. Source / shared material**  
Passage, article, letter, advert, notice, bullet, numbered lines, shared matching legends — đúng thứ tự gốc, in MỘT LẦN cho nhóm câu chung.

**E. Questions**  
Số câu ở gutter → stem → choices hoặc answer space. Không để các lựa chọn từ câu này chảy sang câu sau.

**F. End footer**  
Một dòng ngắn gọn chỉ ở cuối đề, không đẩy thành trang mới.

Toàn bộ đề dùng **một cột nội dung**. Chỉ nhóm đáp án ngắn bên trong từng câu có thể chia hai cột.

## 6. Cấu trúc dữ liệu trước khi in

Bắt buộc dựng semantic tree trước khi dựng HTML:

Exam → ordered Parts → instructionBlocks + passageBlocks + sharedChoices + questionItems + answerSpaces.

Mỗi block phải phân biệt đúng type:
- examTitle, sectionTitle, partTitle, instruction;
- passageTitle, paragraph, bullet, salutation, closing;
- originalNumberedLine (Error Correction);
- question, stem, optionA/B/C/D;
- matchingLegend, answerBlank, essayWritingSpace.

Block cần gắn partId; câu hỏi phải định danh theo (examId, codeId, partId, questionNo), vì có đề lặp lại câu 1–10 ở nhiều Part.

**Priority nguồn:**
1. Dữ liệu structured đã validate (chẳng hạn schema HSGPartSystem và *.structured.json).
2. Văn bản trích xuất được kiểm tra đầy đủ ranh giới Part/câu.
3. Legacy/OCR fallback có cảnh báo chất lượng.
4. Nếu không đủ chắc chắn thì báo cần đối chiếu PDF gốc, KHÔNG tự bịa stem hay phương án.

Không trực tiếp đổ text của toàn trang PDF vào một thẻ pre. Không tự diễn đạt lại nội dung. Hard line break từ OCR không mặc nhiên là paragraph, nhưng blank line, title, salutation, closing và bullet là dấu hiệu ranh giới cần được giữ.

## 7. Phân bố nội dung theo loại bài

### 7.1. Independent MCQ / Grammar
- Một question unit gồm number → stem → 4 option objects, không phải một chuỗi A. ... B. ... C. ... D. ...
- Gutter số câu: **29 pt**; gap giữa gutter và thân câu: **9 pt**.
- Compact: **2 cột** khi mọi option không quá **50 ký tự**, tổng độ dài 4 option không quá **150 ký tự**, và không cần wrap; A/B hàng một, C/D hàng hai.
- Long: **1 cột**, A, B, C, D theo chiều dọc. Chuyển sang chế độ này khi một phương án dài hơn ngưỡng hoặc có text wrap.
- Mỗi lựa chọn có nhãn chữ cái riêng, căn đều, không dùng dấu cách để mô phỏng grid.

### 7.2. Guided Cloze
- Instruction → **passage một lần** (các marker như 41 _____ vẫn nằm trong đoạn) → câu 41 và A–D → câu 42...
- Không in lặp cả passage trong từng question.
- Nếu letter, giữ đúng thứ tự: TITLE → To/Dear → body paragraphs → bullets → closing/signature.
- Không cho D bị lẻ trang, không để question card vô tình nuốt heading Part kế.

### 7.3. Open Cloze / Summary Completion
- Instruction → passage một lần → compact numbered answer grid.
- Answer grid mặc định **2–3 cột** chỉ chứa số câu + dòng ghi đáp án.
- Mỗi gap trong passage phải được map đúng số câu; không tạo 10 lần câu “Complete blank ...” sau đoạn văn.

### 7.4. Reading Comprehension
- Bài đọc có heading và paragraph tách rõ; paragraph có thể tiếp tục trên trang sau.
- Ngữ liệu in một lần trước nhóm question; các A–D theo compact/long rule.
- Không dùng break-inside: avoid cho TOÀN BỘ passage dài, vì dễ gây khoảng trắng khổng lồ.

### 7.5. Matching / Matching Headings
- Passage/sections → danh sách lựa chọn A–H hoặc headings **một lần** → từng statement / question + ô trả lời.
- Không lặp legend 8 lần nếu có 8 câu.
- Giữ đúng thứ tự các heading/statement của đề gốc.

### 7.6. Error Correction
- Mỗi original source line là một row với số dòng gốc.
- **Không reflow và đánh số dòng mới**, vì làm sai đáp án dựa trên line number.
- Chừa khu vực cho học sinh ghi line, error và correction; không đưa lời giải.

### 7.7. Word Formation / Transformation / Writing
- Giữ từ gợi ý, stem, blank, số câu.
- Rewrite: đủ 1–3 dòng câu trả lời tùy bài, không ngắt câu gốc.
- Essay/Letter: vùng viết đủ lớn phù hợp yêu cầu; không dùng 3 dòng mặc định cho cả bài.
- Không lặp một shared passage khi có nhiều gaps.

## 8. Ngắt trang và mật độ giấy

| Loại khối | Page-break rules |
|---|---|
| Part heading / section heading | Giữ với hướng dẫn và ít nhất 2–3 dòng nội dung tiếp theo |
| Instruction | Không nằm một mình dưới đáy trang |
| Passage paragraph | Cho phép tách trang, nhưng widows/orphans tối thiểu **3 dòng** |
| Short MCQ | Cố giữ **stem + 4 lựa chọn** cùng một trang |
| Long MCQ | Chỉ chia nếu bắt buộc; không để một đáp án đơn độc sang trang |
| Error Correction | Giữ trọn từng source line, không bẻ số dòng gốc |
| Matching legend | Không tách heading khỏi danh sách ngay bên dưới |
| Footer | Không gây ra trang trắng hoặc trang mới chỉ để hiện footer |

**Last-page diagnostic:** trang cuối chỉ có một câu ngắn và còn hơn khoảng 75% vùng nội dung trống là regression cần kiểm tra. Xem lại page-break, grouping và margin trước. Không ép lại bằng cách xóa nội dung, giảm font cực nhỏ hoặc phá paragraph.

Nếu passage dài thực sự phải qua trang 2, cứ để nó chảy tự nhiên; trang không cần lấp đầy bằng mọi giá.

## 9. Quy trình in toàn bộ / nhiều Part

**Full paper:** tất cả các Part của đúng đề/mã, theo thứ tự gốc; tránh in trùng passage và answer sheets không dùng. Phần đã có structured source phải in từ structured source.

**Selected Parts:** checkbox nhiều lựa chọn; chọn tất cả/bỏ chọn; ít nhất một Part; sắp xếp theo trình tự đề gốc dù học sinh chọn đảo lộn; không in Part không được chọn. Mỗi task phải tự đủ instruction và shared passage.

**Display vs print:** root in riêng, không in sidebar, nút tương tác, passage đang scroll, đáp án đã chọn hoặc chỉ câu đang xem.

## 10. Preflight trước khi được coi là đạt

**Semantic QA** — cho từng Part:
- [ ] Số câu thực bằng range đã định; không thiếu/lặp/đổi số.
- [ ] MCQ luôn có đúng A, B, C, D một lần/câu.
- [ ] Không có A/B dính vào cùng text node.
- [ ] Passage title, paragraph, salutation, bullet, closing đúng thứ tự và chỉ xuất hiện khi liên quan.
- [ ] Không cắt mất instruction; không nuốt câu/Part kế bên.
- [ ] Không in bảng YOUR ANSWERS, giải thích hoặc đáp án gốc ngoài phạm vi đề.
- [ ] Số gap/answer space khớp đầy đủ.

**Rendered PDF QA** — không được bỏ:
- [ ] In/Save as PDF trên Chromium, render ít nhất trang đầu, trang có passage dài, và trang cuối thành ảnh.
- [ ] Kiểm tra bằng mắt 4 đáp án, paragraph/bullets, page-break và màu khi in đen trắng.
- [ ] Không tràn chữ, thiếu glyph, gạch ngang đè chữ hoặc dính nhãn A–D.
- [ ] Không cô lập lựa chọn D, footer hoặc câu 50 trên trang gần như trắng.
- [ ] Thử một full paper, chọn 2 Part không liên tiếp và ít nhất một mẫu cho mỗi kind.
- [ ] Với scan/OCR lỗi, gắn cảnh báo “Cần đối chiếu PDF gốc”; không tự tuyên bố đạt.

**Bộ hồi quy bắt buộc từ Hải Phòng:**
- Q41–45: advertisement phải có title, bullets, gaps đúng và A–D tách rời; câu 45 không bị bẻ vỡ vô lý.
- Q46–50: letter phải giữ title, To all staff, body, bullets, closing; Q49 và Q50 không giãn cách bất thường.
- Không tạo lại tờ thứ ba chỉ vì một câu 50.

## 11. Quy tắc bảo trì và sử dụng ở lần sau

- **Đây là chuẩn mặc định** cho Website Vocab khi user nói “format in như trước / chuẩn in / chuẩn Google Docs-Cambridge”.
- Chỉ thay đổi design tokens khi có lý do và minh chứng từ PDF output.
- Một nguồn truth cho @page; refactor CSS print thành module riêng khi có thời gian. Tại snapshot 21/10/2026, features/hsg-tinh.css có **15 khối @media print và nhiều quy tắc @page**, có rủi ro ghi đè; đó là technical debt cần xử lý, không phải format mong muốn.
- Triển khai tốt phải đi theo source schema → semantic blocks → HTML print → PDF rendered → visual QA.
- Deploy GitHub Pages thành công KHÔNG phải bằng chứng đã kiểm tra thẩm mỹ bản in.
- Khi cập nhật chuẩn, thêm mục Version history; không xóa nguyên nhân của những lỗi đã từng phát hiện.

## 12. Version history

- **V1.0 — 21/10/2026:** Chuẩn hóa A4, typography, information hierarchy, text distribution, per-question layouts, page breaks và quality gates; trích lỗi từ PDF audit Hải Phòng. Chưa xác nhận toàn bộ 8 bộ đề đạt các tiêu chí sau cập nhật code.

**Quy tắc ghi nhớ ngắn nhất:** SOURCE ĐÚNG → BLOCK ĐÚNG → TRANG A4 ĐỌC TỐT; màu sắc/font chỉ hỗ trợ cấu trúc, không thay thế việc xác minh ngữ liệu.
