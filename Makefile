b: build
build:
	mvn clean install
test:
	mvn test
local: no-test
	mkdir -p bin
no-test:
	mvn clean install -DskipTests
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
	docker ps -a -q --filter="name=postgres" | xargs docker stop
	docker ps -a -q --filter="name=postgres" | xargs docker rm
	docker ps -a -q --filter="name=postgres-image" | xargs docker stop
	docker ps -a -q --filter="name=postgres-image" | xargs docker rm
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
	make kong-deck
dcd:
	docker-compose down
