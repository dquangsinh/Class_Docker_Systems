# RabbitMQ + Docker

## Chạy

```bash
cp .env.example .env
make run-build         # khởi động broker
make ui                # in URL Management UI
make install           # cài amqplib + dotenv
make consume           # mở terminal 1 — chờ message
make produce           # mở terminal 2 — gửi 5 message test
make run-down          # tắt
```

Mở Management UI tại http://localhost:15672 (admin/admin123) để xem queue, exchange, message rate.

## Concept

- **Queue**: nơi message ngồi đợi consumer.
- **`durable: true`**: queue còn lại sau khi broker restart.
- **`persistent: true`**: message được ghi xuống đĩa.
- **`prefetch(1)`**: consumer chỉ nhận 1 message tại một thời điểm (fair dispatch).
- **`ack`**: xác nhận đã xử lý xong — nếu consumer chết trước khi ack, broker gửi lại cho consumer khác.

## Use case

- Background job (gửi email, xử lý ảnh)
- Tách biệt service: API enqueue → worker xử lý
- RPC pattern (reply queue)
