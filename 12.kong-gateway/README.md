# 12. Kong API Gateway + Docker

Kong làm **API Gateway** đứng trước các microservice: định tuyến, rate-limit, auth, CORS, log, transform header… mà không phải sửa code app.

Bài này dùng **DB-less mode** — toàn bộ cấu hình nằm trong [`kong/kong.yml`](./kong/kong.yml), không cần Postgres → nhẹ, dễ version control.

## Kiến trúc

```
client ──HTTP──▶ Kong (:8000) ──proxy──▶ echo-api (:8888)
                   │
                   └── Admin API (:8001)
```

## Chạy

```bash
cp .env.example .env
make run-build
make test           # gọi GET /echo/hello qua gateway → thấy header X-Gateway: Kong
make rate-limit     # bắn 12 req, request thứ 11+ bị 429 Too Many Requests
make status         # liệt kê service & route đã load
make run-down
```

## Concept chính

| Khái niệm | Vai trò |
|---|---|
| **Service** | Mô tả upstream backend (URL, port) |
| **Route** | Path/host/method match → chuyển đến service |
| **Plugin** | Middleware: auth, rate-limit, CORS, transform, log… |
| **Consumer** | Người gọi API (gắn API key, JWT) |

## Sửa config

Đổi [`kong/kong.yml`](./kong/kong.yml) rồi:

```bash
make reload
```

## Plugin hữu ích tiếp theo

- `key-auth` / `jwt` — xác thực
- `prometheus` — export metrics (kết hợp [bài 13](../13.monitoring))
- `request-transformer` — sửa header/body trước khi forward
- `ip-restriction` — whitelist/blacklist IP

## Vì sao dùng Gateway thay vì gọi thẳng?

- Đổi backend mà không phải thông báo client.
- Áp policy (rate-limit, auth) đồng nhất cho mọi service.
- Tập trung log/metric tại 1 chỗ.
