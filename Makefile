SHELL=/bin/bash

b: build
build:
	mvn clean install
build-cypress:
	cd e2e && make build
test:
	mvn test
local: no-test
	mkdir -p bin
build-maven: no-test
build-npm:
	cd cameras-gui && yarn
no-test:
	mvn clean install -DskipTests
test-maven:
	mvn test
test-npm:
	cd cameras-gui && npm test
docker:
	docker-compose up -d --build --remove-orphans
build-images:
	docker-compose build
build-docker: stop no-test dcup
stop:
	docker ps -a -q --filter="name=kong" | xargs -I {} docker stop {}
	docker ps -a -q --filter="name=kong" | xargs -I {} docker rm {}
	docker ps -a -q --filter="name=camera" | xargs -I {} docker stop {}
	docker ps -a -q --filter="name=camera" | xargs -I {} docker rm {}
	docker ps -a -q --filter="name=prometheus" | xargs -I {} docker stop {}
	docker ps -a -q --filter="name=prometheus" | xargs -I {} docker rm {}
	docker ps -a -q --filter="name=grafana" | xargs -I {} docker stop {}
	docker ps -a -q --filter="name=grafana" | xargs -I {} docker rm {}
	docker ps -a -q --filter="name=nginx" | xargs -I {} docker stop {}
	docker ps -a -q --filter="name=nginx" | xargs -I {} docker rm {}
	docker ps -a -q --filter="name=graphite" | xargs -I {} docker stop {}
	docker ps -a -q --filter="name=graphite" | xargs -I {} docker rm {}
	docker ps -a -q --filter="name=cameras-auth-service" | xargs -I {} docker stop {}
	docker ps -a -q --filter="name=cameras-auth-service" | xargs -I {} docker rm {}
docker-clean: stop
	docker-compose down -v
	docker-compose rm -svf
update-snyk:
	npm i -g snyk
update:
	npm install -g npm-check-updates
	cd cameras-gui && npx browserslist --update-db && ncu -u && yarn
kong-deck:
	bash kong_wait.sh
	cd kong && deck sync
audit:
	cd cameras-gui && npm audit fix && yarn
hc-wait:
	bash hc_wait.sh
kong-config:
	cd kong && make kong-config
dcup-light:
	docker-compose up -d kong-database
dcup-base:
	docker-compose -f docker-compose.yml -f docker-compose.override.yml build camera-1-service camera-2-service camera-3-service camera-4-service camera-5-service camera-6-service
	docker-compose -f docker-compose.yml -f docker-compose.override.yml up -d
dcup-auth:
	docker-compose -f docker-compose-auth.yml up -d cameras-auth-service
dcup: dcd dcup-base
dcup-action: dcup hc-wait kong-config build-cameras-auth-service
dcup-full-action: dcd docker-clean build-maven build-npm build-cypress dcup hc-wait kong-config build-cameras-auth-service
dcd: stop docker-clean
	docker-compose -f docker-compose.yml -f docker-compose.override.yml -f docker-compose-auth.yml down
cypress-open-docker:
	cd e2e && yarn && npm run cypress:open:docker
cypress-open:
	cd e2e && yarn && npm run cypress
cypress-electron:
	cd e2e && make cypress-electron
cypress-chrome:
	cd e2e && make cypress-chrome
cypress-firefox:
	cd e2e && make cypress-firefox
cypress-edge:
	cd e2e && make cypress-edge
install:
	sudo apt-get install deck
local-pipeline: dcd docker-clean build-maven build-npm build-cypress test-maven test-npm
docker-stop-all:
	docker ps -a --format '{{.ID}}' | xargs -I {}  docker stop {}
	docker network prune
docker-remove-all: docker-stop-all
	docker network list --format '{{.ID}}' | xargs -I {} docker network rm  {} || echo 'Done!'
	docker ps -a --format '{{.ID}}' | xargs -I {}  docker rm {}
run-cameras-auth:
	cd cameras-auth-service && make run-cameras-auth
cameras-auth-prov-key:
	cd cameras-auth-service && make cameras-auth-prov-key
build-cameras-auth-service: stop-cameras-auth-service
	docker-compose -f docker-compose-auth.yml rm cameras-auth-service
	cd cameras-auth-service && mvn clean install -DskipTests
	cp e2e/cypress/fixtures/CC6KongProvOauth2.json cameras-auth-service/target/CC6KongProvOauth2.json
	docker-compose -f docker-compose-auth.yml build --no-cache cameras-auth-service
	make dcup-auth
build-nginx:
	docker-compose rm nginx
	docker-compose build --no-cache nginx
	docker-compose up -d nginx
stop-cameras-auth-service:
	docker-compose -f docker-compose-auth.yml stop cameras-auth-service
