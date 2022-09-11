cypress-open-docker:
	npm run cypress:open:docker
cypress-open:
	npm run cypress
cypress-electron:
	docker-compose -f ../docker-compose.yml -f docker-compose.yml up --exit-code-from e2e-electron e2e-electron
cypress-chrome:
	docker-compose -f ../docker-compose.yml -f docker-compose.yml up --exit-code-from e2e-chrome e2e-chrome
cypress-firefox:
	docker-compose -f ../docker-compose.yml -f docker-compose.yml up --exit-code-from e2e-firefox e2e-firefox
cypress-edge:
	docker-compose -f ../docker-compose.yml -f docker-compose.yml up --exit-code-from e2e-edge e2e-edge
build:
	yarn
dcd:
	cd .. && make dcd
dcup-full-action:
	cd .. && make dcup-full-action
