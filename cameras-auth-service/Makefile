SHELL=/bin/bash

run-cameras-auth:
	mvn clean install -DskipTests
	java -jar -Dhc.auth.oauth.provision_key=$(shell cat ../e2e/cypress/fixtures/CC6KongProvOauth2.json | jq -r '.config.provision_key') target/cameras-auth-service.jar
cameras-auth-prov-key:
	echo $(shell cat ../e2e/cypress/fixtures/CC6KongProvOauth2.json | jq -r '.config.provision_key')
