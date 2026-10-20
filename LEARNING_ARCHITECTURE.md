# Website Học Tiếng Anh — cấu trúc dùng chung

Đây là kiến trúc **mở rộng dần, tương thích ngược** với website đã xuất bản. Không thay đổi đề gốc, đáp án hoặc lời giải khi chỉ muốn thêm bài.

## Cấu trúc mã nguồn

- `core/learning-core.js`: đăng ký bài học, kiểm tra ID và route trùng nhau, autosave theo tài khoản, chữ ký phiên bản nội dung, hàng đợi đồng bộ kết quả và idempotent submission ID.
- `features/`: các tính năng độc lập như lịch sử học tập.
- `grade*.js`, `school-ui.js`, `listening-*.js`: các engine hiện có, giữ nguyên cơ chế tương tác theo môn.
- `grade10-midterm.js`: các đề lớp 10, vẫn tải dữ liệu gốc từ `grade10-midterm-source.txt`.
- `tests/`, `.github/workflows/`: kiểm tra tĩnh, logic lưu bài, Chromium học sinh giả lập.
- `migrations/`: thay đổi SQL cộng thêm, không xóa lịch sử.

## Quy tắc phát hành nội dung

1. Mỗi bài có ID và route **duy nhất, cố định**: `LearningCore.register({id,route,title,category,grade,render})`. Không sao chép nguyên engine chỉ để tạo một bài khác.
2. Dữ liệu bài (câu hỏi/đáp án/giải thích) nằm trong module nội dung; giao diện, đồng hồ, nhập đáp án và giải thích nằm trong engine tương ứng.
3. Chỉ ghi bài theo ID tài khoản đăng nhập. `LearningCore.writeDraft/readDraft` giữ tiến độ; chữ ký `fingerprint` vô hiệu hóa bản nháp khi đề nguồn đã đổi.
4. Điểm các hoạt động dùng `LearningCore.submitPractice` vào `public.practice_submissions`; category hiện dùng: `school`, `listening`, `grammar`, `vocabulary`, `reading`, `exam`. Giữ cả bảng lịch sử cũ `scores`, `reading_submissions`.
5. UUID của một lượt nộp bài không đổi khi thử gửi lại. Không cộng streak chỉ vì học sinh tải lại màn hình kết quả.
6. Bổ sung unit/bài mới bằng module dữ liệu và một mục registry tương ứng. **Chưa có CMS tự động nhập nội dung**; đây là nền tảng chuẩn hóa, không phải hệ thống xuất bản one-click.
7. Không lưu thông tin xác thực nhạy cảm vào kho mã. Chỉ dùng public publishable key ở trình duyệt; các secret của Supabase phải ở phía server.

## Cơ sở dữ liệu

Hai migration mở rộng `practice_submissions` và quyền đọc điểm học sinh đã được áp dụng trong đợt sửa 19/10. Migration `migrations/20261020_exam_category.sql` bổ sung category `exam` đã áp dụng thành công ngày 20/10. Mọi ràng buộc RLS sẵn có vẫn giữ nguyên.

## Cổng kiểm soát chất lượng trước khi merge

- `npm test`: kiểm tra cú pháp JS, file liên kết, ID route, account isolation, khôi phục và đồng bộ thất bại.
- GitHub Actions `Chromium learner journeys`: đăng nhập giả, các route lớp 10, Reading/Listening và refresh/resume School/Midterm, **không gọi Supabase thật**.
- Kiểm thử bằng tài khoản thử thật trên máy tính và điện thoại: đăng nhập, truy cập khu vực, làm/nộp/làm lại bài, đồng bộ Supabase, âm thanh YouTube, hiển thị mobile.
- Lưu một nhánh backup của `main` trước khi triển khai; quay lại commit trước nếu phát hiện lỗi nghiêm trọng.

## Chưa tự động hóa

Bật Supabase Auth leaked-password protection trong Supabase Dashboard và rà soát RPC `record_tutoring_activity` về rate limiting / chống gọi lặp. Đây là cấu hình bảo mật vận hành riêng, không thể được xác nhận chỉ bằng kiểm thử frontend.
