#!/usr/bin/env sh
java -jar -Dspring.profiles.active=prod,docker -Dhc.auth.oauth.provision_key="$(cat CC6KongProvOauth2.json | jq -r '.config.provision_key')" cameras-auth-service.jar