b: build
build:
	mvn clean install
test:
	mvn test
local: no-test
	mkdir -p bin
build-maven: no-test
no-test:
	mvn clean install -DskipTests
test-maven:
	mvn test
docker:
	docker-compose up -d --build --remove-orphans
docker-databases: stop local
	docker build ./docker-psql/. -t postgres-image
	docker run --name postgres-standalone -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=admin -e POSTGRES_MULTIPLE_DATABASES=vsa -p 5432:5432 -d postgres-image
build-images:
	docker build concert-demos-rest-service-mvc/. -t concert-demos-rest-service-mvc
	docker build concert-demos-rest-service-webflux/. -t concert-demos-rest-service-webflux
build-docker: stop no-test dcup
stop: dcd
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
docker-clean: stop
update-snyk:
	npm i -g snyk
update:
	npm install -g npm-check-updates
	cd concert-demos-gui && npx browserslist --update-db && ncu -u && yarn
kong-deck:
	bash kong_wait.sh
	cd kong && deck sync
audit:
	cd concert-demos-gui && npm audit fix && yarn
dcup-light:
	docker-compose up -d kong-database
dcup: dcd
	docker-compose up -d --build --remove-orphans
dcup-action: dcup
dcup-full-action: dcd docker-clean build-maven dcup
dcd:
	docker-compose down
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
local-pipeline: dcd docker-clean build-maven test-maven