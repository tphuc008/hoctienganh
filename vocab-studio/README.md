# Vocabulary Studio — Structure Preview

Website demo được dựng từ hệ màu của English Practice Hub hiện có.

## Phạm vi bản demo
- Trang chủ và danh sách Unit
- Trình xem bài giảng: các khu vực nội dung, knowledge slot và notes
- Màn hình luyện tập: tab bài gốc và bài mới, có thể kiểm tra một bộ câu hỏi khi nạp dữ liệu
- Trang in: bật/tắt bài giảng, notes, câu gốc, câu mới, đáp án; chọn 10/20 câu mới; sửa bản in dạng văn bản; in/lưu PDF bằng trình duyệt
- Trang Quản lý: paste văn bản hoặc JSON kết quả ChatGPT, lưu để xem thử

## Quan trọng
- Đây **chỉ là bản duyệt cấu trúc**, chưa có nội dung từ vựng chuẩn và chưa tích hợp code quiz của website cũ.
- Chưa kết nối cơ sở dữ liệu hay hệ thống tài khoản. Dữ liệu giáo viên lưu thử chỉ tồn tại trong localStorage của *trình duyệt đang sử dụng*, không đồng bộ cho học sinh ở thiết bị khác.
- Chưa có API AI; website chỉ nhận nội dung đã xử lý sẵn trong ChatGPT.
- Format chuyên môn Vocabulary và gói JSON chính thức sẽ được quyết định sau khi duyệt giao diện.

## JSON demo (không phải schema nội dung cuối cùng)
\`\`\`json
{
  "title": "Unit 01",
  "topic": "Tên chủ đề",
  "overview": "Nội dung bài giảng",
  "notes": ["Ghi chú thứ nhất"],
  "sections": [{"title": "Tên mục", "body": "Nội dung"}],
  "originalQuestions": [],
  "newQuestions": []
}
\`\`\`

## Nguồn tham chiếu thiết kế
- Trang gốc: https://tphuc008.github.io/hoctienganh/
- Bảng màu gốc: nền #06111f, accent #8b5cf6, accent phụ #22d3ee.

Demo được đặt tại thư mục riêng \`vocab-studio/\`, không chỉnh sửa \`index.html\` gốc.
