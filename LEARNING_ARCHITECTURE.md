# Website Học Tiếng Anh — Content Manifest v1

## Nguyên tắc

`content/manifest.js` là **nguồn duy nhất** cho danh sách Grade, Unit Vocabulary,
bài Grammar và đường dẫn của Reading, Listening, School, Mid-term.
`index.html` không còn chứa bản sao của `GRADES`, `UNITS`, `BANKS`
hay bộ định tuyến từng bài.

`core/learning-core.js` giữ registry, draft theo tài khoản, kết quả và retry queue.
Manifest điều khiển **nội dung ở đâu và mở bằng engine nào**, không thay đổi ngân hàng đề,
đáp án, lời giải hoặc logic chấm của các engine hiện có.

## Thêm Unit Vocabulary mới (ví dụ: Grade 12 Unit 9)

1. Tạo file `grade12-unit9.js` ở thư mục gốc, trong đó xuất ngân hàng dữ liệu qua
   `window.G12_U9_BANK`. Dữ liệu cần có tối thiểu `grade`, `unit`,
   `title`, `questions`, `explanations`, `levelConfig`.
   `levelConfig` liệt kê các set và chỉ số câu hỏi trong mỗi set.
2. Thêm **một mục** vào mảng `vocabulary` trong `content/manifest.js`, ví dụ:

   - `grade:12`, `id:9`
   - `title:"Unit 9"`, `subtitle:"Tên chủ đề"`
   - `bankGlobal:"G12_U9_BANK"`, `source:"grade12-unit9.js"`

3. Đẩy hai file lên GitHub. Website tự hiển thị Unit ở lớp 12,
   hỗ trợ route `grade-12/unit-9` và các link
   `grade-12/unit-9/vocabulary-practice-N` dựa trên `levelConfig`.
   **Không thêm script tag, không sửa `UNITS` hay `BANKS` trong `index.html`.**

File mới phải là **bank độc lập**, đã định nghĩa đúng dạng câu hỏi và lời giải hiện có.
Đừng yêu cầu formatter cũ chạy lại trên tất cả Unit chỉ để thêm một Unit mới.
Muốn thêm Grade 11 lần đầu thì chuyển `grades[].live` của Grade 11 thành `true`
trong cùng Manifest.

## Thêm bài Grammar

- File dữ liệu mới phải nối thêm vào `window.GRAMMAR_BANKS[slug]`
  (không ghi đè các Grammar bank đang có).
- Thêm một mục `{slug,title,subtitle,source,bankGlobal:"GRAMMAR_BANKS"}`
  vào mảng `grammar` ở Manifest.
- Đường dẫn danh mục, bài và Set được suy ra tự động từ `slug` và `levelConfig`.

## Thêm trang Reading / Listening / School / Exam

Đối với bài sử dụng renderer riêng, thêm một mục vào `pages`:

- `id`: duy nhất toàn website
- `route`: duy nhất, cố định
- `title`, `category`, `grade` (nếu có), `listing` (nếu muốn vào danh sách Reading)
- `kind:"handler"`
- `handler:"tênHàmToànCục"` mà file nội dung đăng ký trên `window`
- `source:"duong-dan-file.js"` để Manifest tự tải nếu renderer chưa có sẵn
- `args:[...]` nếu renderer cần tham số

Danh mục và đường dẫn sẽ có mặt trong LearningCore Registry.
Các nội dung có cách trình bày đặc thù vẫn dùng engine/renderer riêng; Manifest
không biến các bài khác cấu trúc thành cùng một kiểu quiz.

## Quy tắc an toàn bắt buộc

- Không đổi ID/route đã phát hành: bản nháp, điểm và bookmark của học sinh
  có thể tham chiếu các giá trị này.
- Không xóa hay đổi tên bảng `scores`, `reading_submissions`,
  `practice_submissions` khi chuyển sang Manifest.
- Không thay đổi ngân hàng câu hỏi hoặc lời giải cũ trong một PR cấu trúc.
- Trước khi merge: chạy `npm test` và hai bài Chromium
  `tests/browser-smoke.cjs`, `tests/manifest-browser.cjs`.
- Test Manifest xác nhận ID/route duy nhất, file nguồn tồn tại, link Set trực tiếp,
  và mô phỏng thêm một Vocabulary Unit + một trang Reading chỉ bằng file mới và mục Manifest.
- Luôn giữ nhánh backup; deployment production chỉ sau khi PR đạt toàn bộ test.
- Dữ liệu đăng nhập giả được sử dụng trong Chromium; không gửi bài kiểm thử
  đến Supabase thật.

## Giới hạn / tiếp theo

- Các **module cũ** vẫn được nạp qua script tag trước đây, để giữ nguyên thứ tự
  phụ thuộc của bộ formatter Semantic Precision và các bộ giải thích. **Bài mới**
  nạp động theo `source` trong Manifest; làm sạch toàn bộ script tag cũ và
  lazy-load từng module là hạng mục hiệu năng riêng, không nên gộp với bước di chuyển catalogue.
- Manifest quản lý việc xuất bản từ **mã nguồn**, chưa có trình soạn thảo/CMS.
  Với quy trình tạo nội dung bằng ChatGPT/Google Docs, cần xuất gói dữ liệu
  theo schema của engine rồi đăng ký vào Manifest.
- Lịch sử kết quả vẫn đọc bảng chung và bảng cũ; giải trùng và thay đổi streak
  là ưu tiên riêng, tránh sửa lẫn khi đang thay đổi routing.


## Ưu tiên 2 — vòng đời bài làm thống nhất (LearningFlow)

`core/learning-flow.js` cung cấp cùng một hợp đồng trạng thái cho **Vocabulary, Grammar,
School, Listening Part, Reading, Mid-term**. Các engine không bị ép dùng cùng thuật toán chấm.

- `ready` / **Chưa bắt đầu**: học sinh chưa khởi động lượt làm.
- `in_progress` / **Đang làm · đã làm/tổng số câu**: lượt làm đang diễn ra và có thể khôi phục.
- `completed` / **Đã hoàn thành** (mastery: School/Vocabulary/Grammar), hoặc
  **Đã nộp** (Reading/Listening/Mid-term): mỗi môn giữ nguyên ngưỡng/chính sách nộp bài.
- `synced`: chỉ đánh dấu `true` khi engine nhận thành công kết nối lưu tương ứng;
  không tự suy ra rằng một lượt đã hoàn thành thì Supabase đã lưu.
- `track` dùng cùng `LearningCore.writeDraft("lifecycle", category+"/"+slug, metadata)`
  để lưu **bản tóm tắt**, không ghi đè đáp án hay draft của engine.
- `reset` xóa metadata của lượt làm riêng; các engine vẫn chịu trách nhiệm tạo
  UUID mới, xoá draft của mình và xác nhận trước thao tác có thể mất dữ liệu.
- `LearningFlow.markup/paint` hiển thị nhãn và tiến độ theo cùng một cấu trúc;
  `LearningFlow.labels` thống nhất tên nút phổ biến, trong khi các nút đặc thù như
  “Hiện đáp án”, “Nghe lại đoạn sai”, “Nộp từng Part” được giữ nguyên.

**Lưu ý phạm vi:** Đây là bản tóm tắt trạng thái trên **thiết bị hiện dùng**, theo tài khoản.
Chưa triển khai đồng bộ bản nháp xuyên thiết bị hoặc thay cơ chế lưu legacy của Reading.
Sửa điểm/streak và loại bản ghi lịch sử trùng thuộc ưu tiên 3, không trộn vào refactor này.

Các kiểm thử bổ sung:
- `tests/learning-flow.test.cjs`: trạng thái hợp lệ, per-account isolation, reset,
  active vs submitted (không mặc định đủ số câu = đã nộp), metadata và nhãn;
- `tests/flow-browser.cjs`: tương tác Chromium qua cả 6 nhóm bài và refresh;
- Hai bộ kiểm thử cũ `browser-smoke.cjs` và `manifest-browser.cjs` phải vẫn đạt.


## Ưu tiên 3 — kết quả/lịch sử/streak (canonical submissions)

`practice_submissions` là nguồn kết quả chuẩn cho **mọi môn**. Bảng
`scores` và `reading_submissions` vẫn giữ để không làm mất lịch sử và các
giao diện cũ, nhưng lịch sử hợp nhất dùng `core/history-core.js`:

1. Nối kết quả bằng **cùng submission UUID**. Reading đã lưu UUID liên kết;
   điểm Vocabulary mới từ nay có `scores.practice_submission_id` trùng UUID
   của `practice_submissions.submission_id`.
2. Nếu kết quả thuộc cả hai bảng, chỉ hiện một mục chuẩn.
3. Kết quả cũ không có liên kết UUID **vẫn hiển thị**, tuyệt đối không tự
   gộp bằng thời gian/điểm gần nhau vì có thể là một lần làm lại thật.
4. Cột tổng số bài phản ánh **các lượt đã tải (giới hạn 150/bảng)**;
   không được mô tả là tổng số bài từ trước đến nay khi vượt giới hạn đó.
5. Vocabulary, Grammar và School có điểm *đúng lần đầu*; Reading,
   Listening, Mid-term dùng số câu đúng. Các chỉ số này không bị trộn thành
   một phần trăm trung bình không cùng ý nghĩa.

Streak chỉ được tính khi Postgres **chấp nhận một INSERT mới**
vào `practice_submissions`. Trigger `credit_completed_practice_streak_on_insert`
và hàm `credit_completed_practice_streak` tự động cộng ngày theo giờ Việt Nam;
gửi lại cùng UUID bằng `on_conflict=submission_id` sẽ không cộng trùng.
Điều kiện thống nhất là *lượt hoàn thành có dữ liệu và được ghi nhận ở server*:
- Vocabulary/Grammar/School: sau khi engine đã hoàn tất bài.
- Reading: khi bài nộp bằng tay hoặc hết giờ (theo cách làm IELTS).
- Listening: hoàn thành **đủ số câu của Part**; nộp thiếu vẫn lưu điểm nhưng
  không cộng streak (giữ tiêu chuẩn Listening đã có).
- Mid-term: toàn bộ câu gốc được kiểm tra trước khi nộp kết quả.

`record_tutoring_activity` không còn được phép gọi bởi học viên; frontend
không gọi RPC này nữa. Đừng gọi trực tiếp server/RPC chỉ để tăng streak.

### Triển khai database an toàn

Migration: `migrations/20261020_canonical_history_and_streak.sql`.
Mở rộng nullable column, unique index, AFTER INSERT trigger; **không xóa hoặc
viết lại** bất kỳ điểm, đáp án, ngày học hoặc tài khoản hiện có. Cần áp dụng
migration trước khi dùng phiên bản frontend mới vì lịch sử đọc cột
`practice_submission_id`. Supabase/PostgREST được yêu cầu reload schema.
Backup mã nguồn: `backup/main-before-priority3-20261020`.

Các trường hợp giới hạn: số liệu chấm vẫn do browser truyền lên, không thể
được coi là bảng xếp hạng chống gian lận; ngăn client tạo nhiều UUID giả
phải có chấm điểm authoritative trên server, ngoài phạm vi hiện tại.
