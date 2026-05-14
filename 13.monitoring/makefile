include .env
export $(shell sed 's/=.*//' .env)

DOCKER_COMPOSE := docker-compose.yml

default:
	docker ps

run-build:
	docker-compose -f $(DOCKER_COMPOSE) up -d --build

run-down:
	docker-compose -f $(DOCKER_COMPOSE) down

run-clean:
	docker-compose -f $(DOCKER_COMPOSE) down -v

logs:
	docker-compose -f $(DOCKER_COMPOSE) logs -f --tail=50

# Reload Prometheus mà không restart container (đã enable --web.enable-lifecycle)
reload-prom:
	curl -s -X POST http://localhost:$(PROMETHEUS_PORT)/-/reload && echo " ✓ reloaded"

urls:
	@echo "Prometheus    → http://localhost:$(PROMETHEUS_PORT)"
	@echo "Grafana       → http://localhost:$(GRAFANA_PORT)  ($(GRAFANA_USER)/$(GRAFANA_PASS))"
	@echo "cAdvisor      → http://localhost:$(CADVISOR_PORT)"
	@echo "node-exporter → http://localhost:$(NODE_EXPORTER_PORT)/metrics"

# Liệt kê target Prometheus đang scrape
targets:
	curl -s http://localhost:$(PROMETHEUS_PORT)/api/v1/targets | jq '.data.activeTargets[] | {job: .labels.job, health, scrapeUrl}'
