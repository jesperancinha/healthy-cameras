SHELL := /bin/bash
GITHUB_RUN_ID ?=123

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
	cd cameras-gui && yarn && npm run build
no-test:
	mvn clean install -DskipTests
test-maven:
	mvn test
test-npm:
	cd cameras-gui && npm test
coverage-npm:
	cd cameras-gui && npm run coverage
docker:
	docker-compose -p ${GITHUB_RUN_ID} up -d --build --remove-orphans
build-images:
	docker-compose -p ${GITHUB_RUN_ID} build
build-docker: stop no-test dcup
stop: stop-auth-service
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
stop-auth-service:
	docker ps -a -q --filter="name=cameras-auth-service" | xargs -I {} docker stop {}
	docker ps -a -q --filter="name=cameras-auth-service" | xargs -I {} docker rm {}
docker-clean: stop
	docker-compose -p ${GITHUB_RUN_ID} down -v
	docker-compose -p ${GITHUB_RUN_ID} rm -svf
update-snyk:
	npm i -g snyk
kong-deck:
	bash kong_wait.sh
	cd kong && deck sync
audit:
	cd cameras-gui && npm audit fix && yarn
hc-wait:
	bash hc_wait.sh
kong-config:
	cd kong && make kong-config
dcup-light: dcd
	docker-compose -p ${GITHUB_RUN_ID} up -d kong-database kong kong-migration kong-deck camera-1-service
	make kong-config
dcup-light-camera-3: dcd
	docker-compose -p ${GITHUB_RUN_ID} up -d kong-database kong kong-migration kong-deck camera-3-service
	make kong-config
dcup-light-camera-4: dcd
	docker-compose -p ${GITHUB_RUN_ID} up -d kong-database kong kong-migration kong-deck camera-4-service
	make kong-config
dcup-light-camera-5: dcd
	docker-compose -p ${GITHUB_RUN_ID} up -d kong-database kong kong-migration kong-deck openldap camera-5-service
dcup-light-camera-6: dcd
	docker-compose -p ${GITHUB_RUN_ID} up -d kong-database kong kong-migration kong-deck camera-6-service
	make kong-config build-cameras-auth-service
dcup-base:
	docker-compose -p ${GITHUB_RUN_ID} -f docker-compose.yml -f docker-compose.override.yml build camera-1-service camera-2-service camera-3-service camera-4-service camera-5-service camera-6-service
	docker-compose -p ${GITHUB_RUN_ID} -f docker-compose.yml -f docker-compose.override.yml up -d
	docker-compose -p ${GITHUB_RUN_ID} -f docker-compose.yml -f docker-compose.override.yml -f docker-compose-deck.yml up -d
dcup-isolated-base:
	docker-compose -p ${GITHUB_RUN_ID} -f docker-compose.yml -f docker-compose-pipeline.override.yml build camera-1-service camera-2-service camera-3-service camera-4-service camera-5-service camera-6-service
	docker-compose -p ${GITHUB_RUN_ID} -f docker-compose.yml -f docker-compose-pipeline.override.yml up -d
	docker-compose -p ${GITHUB_RUN_ID} -f docker-compose.yml -f docker-compose-pipeline.override.yml -f docker-compose-deck.yml up -d
dcup-auth:
	docker-compose -p ${GITHUB_RUN_ID} -f docker-compose.yml -f docker-compose-auth.yml up -d cameras-auth-service
dcup: dcd dcup-base
create-network:
	docker network create healthy-cameras_healthy-cameras
dcup-isolated: dcd dcup-isolated-base
dcup-action: dcup hc-wait kong-config build-cameras-auth-service
install-utils:
	npm install process
	npm install webpack
dcup-full-action: dcd docker-clean build-maven build-npm build-cypress install-utils dcup hc-wait kong-config build-cameras-auth-service
dcup-full-isolated-action: dcd docker-clean build-maven build-npm build-cypress install-utils dcup-isolated hc-wait kong-config build-cameras-auth-service
dcd: stop docker-clean install-utils
	docker-compose -p ${GITHUB_RUN_ID} -f docker-compose.yml -f docker-compose.override.yml -f docker-compose-auth.yml down
cypress-open-docker:
	cd e2e && yarn && npm run cypress:open:docker
cypress-open:
	cd e2e && yarn && npm run cypress:open:electron
cypress-electron: status-containers
	cd e2e && make cypress-electron
cypress-chrome: status-containers
	cd e2e && make cypress-chrome
cypress-firefox: status-containers
	cd e2e && make cypress-firefox
cypress-edge: status-containers
	cd e2e && make cypress-edge
install:
	sudo apt-get install deck
local-pipeline: dcd docker-clean build-maven build-npm build-cypress test-maven test-npm
docker-stop-all:
	docker ps -a --format '{{.ID}}' | xargs -I {}  docker stop {}
	docker ps -a --format '{{.ID}}' | xargs -I {}  docker rm {}
	docker network prune
docker-remove-all: docker-stop-all
	docker network list --format '{{.ID}}' | xargs -I {} docker network rm  {} || echo 'Done!'
	docker ps -a --format '{{.ID}}' | xargs -I {}  docker rm {}
run-cameras-auth:
	cd cameras-auth-service && make run-cameras-auth
cameras-auth-prov-key:
	cd cameras-auth-service && make cameras-auth-prov-key
build-cameras-auth-service: stop-cameras-auth-service
	docker-compose -p ${GITHUB_RUN_ID} -f docker-compose.yml -f docker-compose-auth.yml rm cameras-auth-service
	cd cameras-auth-service && mvn clean install -DskipTests
	cp e2e/cypress/fixtures/CC6KongProvOauth2.json cameras-auth-service/target/CC6KongProvOauth2.json
	docker-compose -p ${GITHUB_RUN_ID} -f docker-compose.yml -f docker-compose-auth.yml build --no-cache cameras-auth-service
	make dcup-auth
build-nginx:
	docker-compose -p ${GITHUB_RUN_ID} rm nginx
	make build-npm
	docker-compose -p ${GITHUB_RUN_ID} build --no-cache nginx
	docker-compose -p ${GITHUB_RUN_ID} up -d nginx
build-graphite:
	docker-compose -p ${GITHUB_RUN_ID} rm graphite
	docker-compose -p ${GITHUB_RUN_ID} build --no-cache graphite
	docker-compose -p ${GITHUB_RUN_ID} up -d graphite
build-kong:
	docker-compose -p ${GITHUB_RUN_ID} rm kong
	docker-compose -p ${GITHUB_RUN_ID} build --no-cache kong
	docker-compose -p ${GITHUB_RUN_ID} up -d kong
stop-cameras-auth-service: stop-auth-service
status-containers:
	docker ps
	docker-compose -p ${GITHUB_RUN_ID} -f docker-compose.yml -f docker-compose-deck.yml logs kong
	docker-compose -p ${GITHUB_RUN_ID} -f docker-compose.yml -f docker-compose-deck.yml logs kong-deck
node-update-old:
	sudo npm cache clean -f
	sudo npm install -g n
	sudo n stable
node-update:
	curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | sh
	source ~/.nvm/nvm.sh
	nvm install --lts
	nvm use --lts
remove-lock-files:
	find . -name "package-lock.json" | xargs -I {} rm {}; \
	find . -name "yarn.lock" | xargs -I {} rm {};
update: remove-lock-files
	git pull; \
	curl --compressed -o- -L https://yarnpkg.com/install.sh | bash; \
	npm install caniuse-lite; \
	npm install -g npm-check-updates; \
	cd cameras-gui; \
		yarn; \
		npx browserslist --update-db; \
		ncu -u; \
		yarn; \
	cd ..; \
	cd e2e; \
		yarn; \
		npx browserslist --update-db; \
		ncu -u; \
		yarn;
deps-update: update
revert-deps-cypress-update:
	if [ -f  e2e/docker-composetmp.yml ]; then rm e2e/docker-composetmp.yml; fi
	if [ -f  e2e/packagetmp.json ]; then rm e2e/packagetmp.json; fi
	git checkout e2e/docker-compose.yml
	git checkout e2e/package.json
deps-cypress-update:
	curl -sL https://raw.githubusercontent.com/jesperancinha/project-signer/master/cypressUpdateOne.sh | bash
deps-plugins-update:
	curl -sL https://raw.githubusercontent.com/jesperancinha/project-signer/master/pluginUpdatesOne.sh | bash
deps-node-update:
	curl -sL https://raw.githubusercontent.com/jesperancinha/project-signer/master/nodeUpdatesOne.sh | bash
deps-java-update:
	curl -sL https://raw.githubusercontent.com/jesperancinha/project-signer/master/javaUpdatesOne.sh | bash
deps-quick-update: deps-cypress-update deps-plugins-update deps-java-update deps-node-update
