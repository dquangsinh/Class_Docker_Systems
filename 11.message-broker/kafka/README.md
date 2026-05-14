# Kafka (KRaft) + Docker

Single-node Kafka chạy ở **KRaft mode** — không cần Zookeeper, đơn giản cho dev/test.

## Chạy

```bash
cp .env.example .env
make run-build         # khởi động kafka + kafka-ui
make create-topic      # tạo demo-topic (3 partitions)
make ui                # in URL Kafka UI
make install           # cài kafkajs + dotenv
make consume           # terminal 1 — subscribe
make produce           # terminal 2 — gửi 5 event
make run-down          # tắt
```

Kafka UI: http://localhost:8080 — xem topic, partition, consumer group, lag.

## Concept

- **Topic**: stream của event, chia thành **partition** để scale.
- **Partition**: thứ tự đảm bảo *trong* partition (cùng key → cùng partition).
- **Consumer group**: mỗi partition giao cho 1 consumer trong group → song song hoá xử lý.
- **Offset**: vị trí đã đọc, do consumer giữ — có thể replay bằng cách reset offset.

## RabbitMQ vs Kafka — chọn khi nào?

| | RabbitMQ | Kafka |
|---|---|---|
| Mô hình | Push, queue | Pull, log |
| Lưu message sau khi consume | ❌ (xoá) | ✅ (retention) |
| Replay | Khó | Dễ (reset offset) |
| Throughput | Medium | Rất cao |
| Phù hợp | Task queue, RPC | Event sourcing, log pipeline, analytics |
