# 11. Message Broker — Docker

Bài học giới thiệu hai message broker phổ biến chạy bằng Docker.

| Sub-lesson | Khi nào dùng |
|---|---|
| [`rabbitmq/`](./rabbitmq) | Task queue, RPC, fan-out — dễ bắt đầu, có Management UI |
| [`kafka/`](./kafka) | Event streaming, log pipeline, throughput cao — dùng KRaft (không cần Zookeeper) |

## Concept nhanh

- **Producer** → đẩy message vào broker
- **Broker** → giữ message, đảm bảo delivery
- **Consumer** → đọc và xử lý message

Khác nhau:
- RabbitMQ: **push-based**, queue-centric, ACK từng message.
- Kafka: **pull-based**, topic + partition, consumer giữ offset.

Mỗi sub-lesson đều có `producer.js` + `consumer.js` để chạy thử.
