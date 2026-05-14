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
	docker logs -f kafka-docker

install:
	npm install

create-topic:
	docker exec kafka-docker kafka-topics.sh --bootstrap-server localhost:9092 \
		--create --if-not-exists --topic $(TOPIC_NAME) --partitions 3 --replication-factor 1

list-topics:
	docker exec kafka-docker kafka-topics.sh --bootstrap-server localhost:9092 --list

produce:
	node producer.js

consume:
	node consumer.js

ui:
	@echo "Kafka UI → http://localhost:$(KAFKA_UI_PORT)"
