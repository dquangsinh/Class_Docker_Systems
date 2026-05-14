# 13. Monitoring — Prometheus + Grafana + Docker

Stack quan sát hệ thống Docker host **chỉ với 4 container**:

| Container | Vai trò | Cổng |
|---|---|---|
| `prometheus` | TSDB + scraper | 9090 |
| `grafana` | Dashboard | 3001 |
| `cadvisor` | Metric CPU/RAM/IO **mỗi container** | 8081 |
| `node-exporter` | Metric **host** (CPU, disk, net) | 9100 |

## Chạy

```bash
cp .env.example .env
make run-build
make urls         # in URL truy cập
make targets      # kiểm tra Prometheus đã scrape được chưa
make run-down
```

Mở Grafana → `Dashboards → New → Import` → dán **dashboard ID**:

| ID | Nội dung |
|---|---|
| **193** | Docker monitoring (cAdvisor) |
| **1860** | Node exporter full (host) |
| **893** | Docker & container overview |

Datasource đã được auto-provision (xem [`grafana/provisioning/datasources/`](./grafana/provisioning/datasources)).

## Thêm app của bạn vào Prometheus

1. Trong app, expose endpoint `/metrics` (dùng `prom-client` cho Node, `prometheus_client` cho Python…).
2. Mở [`prometheus/prometheus.yml`](./prometheus/prometheus.yml), bỏ comment block `my-app`, đổi host/port.
3. Reload không cần restart:
   ```bash
   make reload-prom
   ```

## Concept

- **Scrape**: Prometheus chủ động pull `/metrics` từ target theo `scrape_interval`.
- **TSDB**: lưu time-series dạng `metric_name{label="value"} value @timestamp`.
- **PromQL**: query language — VD `rate(http_requests_total[5m])`.
- **Cardinality**: số tổ hợp label — tránh dùng user_id, request_id làm label (nổ TSDB).

## Cảnh báo (mở rộng)

Bài này chưa cài Alertmanager. Khi cần:
1. Thêm service `alertmanager` vào compose.
2. Thêm `alerting:` block + `rule_files:` vào `prometheus.yml`.
3. Viết rule như: CPU > 80% trong 5 phút → cảnh báo Slack/Telegram.
