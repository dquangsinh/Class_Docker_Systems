# CLAUDE.md

Project guide cho Claude Code và mọi sub-agent trong repo này.
Mọi agent (main + sub-agents qua Task tool) đều phải tuân thủ các skill được import bên dưới.

## Skills luôn áp dụng

Các file dưới đây được nạp vào context của **mọi** phiên làm việc và **mọi** agent:

@.claude/skills/token.md

> Khi thêm skill mới vào `.claude/skills/`, hãy thêm một dòng `@.claude/skills/<tên>.md` vào danh sách trên để nó được tự động import.

## Quy tắc chung

- Tuân thủ nghiêm các skill đã import ở trên trước khi trả lời.
- Trả lời ngắn gọn, đúng trọng tâm — không lan man, không lặp lại context.
- Đọc file có scope (dùng `offset`/`limit` khi file lớn), tránh đọc toàn bộ khi không cần.
- Ưu tiên tool chuyên dụng (Read/Edit/Grep) thay vì `cat`/`sed`/`awk` qua Bash.
- Khi spawn sub-agent qua Task tool, nhắc rõ trong prompt: "Tuân thủ CLAUDE.md và mọi skill được import trong đó."

## Ngôn ngữ

- Trả lời người dùng bằng tiếng Việt trừ khi được yêu cầu khác.
- Code, commit message, tên biến: giữ tiếng Anh theo chuẩn.
