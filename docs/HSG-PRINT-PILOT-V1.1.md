# HSG PRINT PILOT V1.1 — REVIEW GATE

**Ngày:** 21/10/2026
**Phạm vi đã sửa:** chỉ tính năng in của HSG tỉnh.
**Phạm vi CHƯA sửa:** các mục Vocabulary, IELTS và các phần in còn lại.
**Tiêu chuẩn gốc:** docs/EXAM-PRINT-DESIGN-SYSTEM-V1.md.

## Kiến trúc pilot hiện tại
- features/hsg-print-engine.js: renderer thuần cho trang in, câu hỏi A–D và bốn loại structured part: guided_cloze, reading_comprehension, open_cloze, word_formation.
- features/hsg-print.css: stylesheet in A4 **duy nhất**, không chung với CSS giao diện làm bài.
- features/hsg-tinh.js: phần chọn toàn bộ/nhiều Part cùng gọi một bộ dựng trang. Các đề chưa có dữ liệu structured vẫn dùng renderer dự phòng theo dạng câu hỏi.
- features/hsg-tinh.css: chỉ còn CSS giao diện HSG, không còn các khối @media print cũ.
- tests/hsg-print-standard-v11.test.cjs: semantic regression test có thể chạy bằng Node mà không cài thêm package.

## Layout chung trên giấy
- A4 portrait; margin trên 16mm, trái/phải 17mm, dưới 17mm.
- Nền trắng; Inter 10.5pt, line-height ~1.58; burgundy #800040 dùng làm điểm nhấn.
- Exam header một lần → Part header → instruction → passage → question/answer spaces → footer.
- Đáp án <=50 ký tự mỗi option và <=150 ký tự tổng cộng dùng 2 cột, ngược lại 1 cột.
- Passage không bị ép trọn một trang; paragraph được phép tiếp tục ở trang sau, widow/orphan 3 dòng.
- Trang in không kèm lời giải/đáp án đã chọn; in nhiều Part theo thứ tự gốc.

## Type-specific layout
| Dạng bài | Cách in |
|---|---|
| Grammar MCQ | Số câu bên trái, stem + A–D dạng grid |
| Guided Cloze | Passage in một lần; các bộ A–D theo từng gap |
| Open Cloze | Passage một lần, bảng answer spaces nhiều cột |
| Reading Comprehension | Passage một lần, stem đầy đủ và A–D |
| Word Formation | Passage + bảng answer spaces và source word |
| Matching | Shared legend một lần, statement + ô trả lời (legacy renderer) |
| Error Correction | Số dòng gốc và ô line/error/correction (legacy renderer) |
| Writing/Rewrite | Stem và dòng viết tay (legacy renderer) |
| PTNK | Chỉ mã đề đang mở, không ghép mã đề khác |

**Tính hoàn chỉnh:** Đề Hải Phòng có sáu structured parts hiện dùng renderer chuyên biệt. Các phần không có structured dataset vẫn có nguy cơ OCR/source-boundary sai. Không kết luận tám bộ đề hoàn toàn đạt chuẩn chỉ từ unit test.

## QA đã kiểm tra
- Đọc lại CSS: 1 @media print và 1 @page duy nhất trong module in, CSS HSG screen không còn @media print.
- JS syntax hợp lệ, nút in gọi engine mới.
- Hải Phòng structured dataset: 6 parts / 40 items / 100 option cells / 15 answer spaces.
- Browser-generated sample PDF: 3 trang A4 dùng nội dung thực gợi từ nguồn đề Hải Phòng; đã render PNG để kiểm tra font, bố cục và ngắt trang. Lưu ý sample PDF là bản dựng độc lập theo cùng tokens/layout, **không phải ảnh chụp phiên in trực tiếp từ website đã đăng nhập**.

## Approval gate — yêu cầu người dùng duyệt
1. Người dùng mở file PDF mẫu để xem tỷ lệ chữ, line spacing, vị trí A–D, passage và bảng answer spaces.
2. Người dùng in thử HSG tỉnh trên website với 1 full paper và 2–3 Part chọn bất kỳ; kiểm tra ít nhất một bài scan/OCR.
3. Nếu có lỗi trình bày, chỉ sửa HSG pilot và xuất lại PDF kiểm thử.
4. Chỉ khi người dùng **xác nhận duyệt**, mới mở công việc kết nối các loại bài Vocabulary/IELTS và các trang khác vào cùng hệ design tokens, nhưng renderer theo từng loại bài.

## Không thực hiện trước khi duyệt
- Không tự động đổi renderer / stylesheet / nút In của các chuyên mục ngoài HSG tỉnh.
- Không nói toàn bộ website đã được đồng bộ.
- Không coi deploy Github Pages thành công là chứng nhận visual QA.
