include .env
export $(shell sed 's/=.*//' .env)

DOCKER_COMPOSE := docker-compose.yml

default:
	docker ps

run-build:
	docker-compose -f $(DOCKER_COMPOSE) up -d --build

run-down:
	docker-compose -f $(DOCKER_COMPOSE) down

logs:
	docker logs -f rabbitmq-docker

install:
	npm install

produce:
	node producer.js

consume:
	node consumer.js

ui:
	@echo "Management UI → http://localhost:$(RABBITMQ_MGMT_PORT)  (user: $(RABBITMQ_USER) / pass: $(RABBITMQ_PASS))"
