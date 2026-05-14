include .env
export $(shell sed 's/=.*//' .env)

DOCKER_COMPOSE := docker-compose.yml

default:
	docker ps

run-build:
	docker-compose -f $(DOCKER_COMPOSE) up -d --build

run-down:
	docker-compose -f $(DOCKER_COMPOSE) down

reload:
	docker-compose -f $(DOCKER_COMPOSE) restart kong

logs:
	docker logs -f kong-docker

# Gọi qua gateway (port 8000) — sẽ thấy header X-Gateway: Kong
test:
	curl -s -i http://localhost:$(KONG_PROXY_PORT)/echo/hello

# Test rate-limit — bắn 12 req, request 11-12 sẽ bị 429
rate-limit:
	@for i in $$(seq 1 12); do \
	  echo "req $$i:"; \
	  curl -s -o /dev/null -w "  status=%{http_code}\n" http://localhost:$(KONG_PROXY_PORT)/echo/; \
	done

# Xem services/routes đã load
status:
	curl -s http://localhost:$(KONG_ADMIN_PORT)/services | jq .
	curl -s http://localhost:$(KONG_ADMIN_PORT)/routes   | jq .
