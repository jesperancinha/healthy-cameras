SHELL=/bin/bash

create-consumer-1:
	curl -d "username=camera1&custom_id=CC1" http://127.0.0.1:8001/consumers/
	curl -X POST http://127.0.0.1:8001/consumers/camera1/basic-auth \
	  --data "username=cameraUser1" \
	  --data "password=administrator"
create-consumer-2:
	curl -d "username=camera2&custom_id=CC2" http://127.0.0.1:8001/consumers/
	curl -X POST http://127.0.0.1:8001/consumers/camera2/hmac-auth \
	  --data "username=cameraUser2" \
	  -d "secret=dragon"
create-consumer-3:
	curl -d "username=camera3&custom_id=CC3" http://127.0.0.1:8001/consumers/
	curl -X POST http://127.0.0.1:8001/consumers/camera3/jwt -H "Content-Type: application/x-www-form-urlencoded"
	curl -X GET http://127.0.0.1:8001/consumers/camera3/jwt > ../e2e/cypress/fixtures/CC3KongToken.json
create-consumer-4:
	curl -d "username=camera4&custom_id=CC4" http://127.0.0.1:8001/consumers/
	curl -X POST http://127.0.0.1:8001/consumers/camera4/key-auth
	curl -X GET http://127.0.0.1:8001/key-auths > ../e2e/cypress/fixtures/CC4KongKeys.json
create-consumer-6:
	curl -X POST http://127.0.0.1:8001/consumers/ \
	  --data "username=camera6" \
	  --data "custom_id=CC6"
	curl -X POST \
	  --url http://127.0.0.1:8001/services/camera-6-service/plugins/ \
	  --data "name=oauth2" \
	  --data "config.enable_password_grant=true" \
	  --data "config.enable_client_credentials=true" \
	  --data "config.scopes=admin" \
	  --data "config.scopes=observer" \
	  --data "config.scopes=visitor" \
	  --data "config.scopes=researcher" \
	  --data "config.mandatory_scope=true" \
	  --data "config.enable_authorization_code=true" > ../e2e/cypress/fixtures/CC6KongProvOauth2.json
	cp ../e2e/cypress/fixtures/CC6KongProvOauth2.json ../cameras-auth-service/target/CC6KongProvOauth2.json
	curl -X POST http://127.0.0.1:8001/consumers/camera6/oauth2 \
	  --data "name=Camera%20Application" \
	  --data "client_id=CAMERA06CLIENTID" \
	  --data "client_secret=CAMERA06CLIENTSECRET" \
	  --data "redirect_uris=https://localhost:8443/camera-6-service/api/v1/hc" \
	  --data "hash_secret=true" > ../e2e/cypress/fixtures/CC6KongOauth2.json
	curl -X GET http://127.0.0.1:8001/oauth2_tokens/
# By default the client secret is return in the clear
create-credentials-6:
	curl -X POST http://127.0.0.1:8001/consumers/camera6/oauth2/ \
	  --data "name=Camera%20Application" \
	  --data "redirect_uris[]=https://localhost:8443/camera-6-service/api/v1/hc"
# By specifying a hash, the client secret is return as a hashed value
create-credentials-6-v2:
	curl -X POST http://127.0.0.1:8001/consumers/camera6/oauth2/ \
	  --data "name=Camera%20Application" \
	  --data "redirect_uris=https://localhost:8443/camera-6-service/api/v1/hc" \# By specifying a hash, the client secret is return as a hashed value
create-custom-credentials-6:
	curl -X POST http://127.0.0.1:8001/consumers/camera6/oauth2 \
	  --data "name=Camera%20Application" \
	  --data "client_id=CAMERA06CLIENTID" \
	  --data "client_secret=CAMERA06CLIENTSECRET" \
	  --data "redirect_uris=https://127.0.0.1:8443/camera-6-service/api/v1/hc" \
	  --data "hash_secret=true"
create-generic-credentials-6:
	curl -X POST http://127.0.0.1:8001/consumers/camera6/oauth2/ \
	  --data "name=Camera%20Application" \
	  --data "redirect_uris[]=https://127.0.0.1:8443/camera-6-service/api/v1/hc"
protect-camera-2-hmac:
	curl -X POST http://127.0.0.1:8001/services/camera-2-service/plugins \
		--data "name=hmac-auth"
protect-camera-3-jwt:
	curl -X POST http://127.0.0.1:8001/services/camera-3-service/plugins \
		--data "name=jwt"
protect-camera-auth:
	curl -X POST http://127.0.0.1:8001/services/camera-4-service/plugins \
		--data "name=key-auth"
list-camera-jwt:
	curl -X GET http://127.0.0.1:8001/consumers/camera3/jwt
list-camera-key-auth:
	curl -X GET http://127.0.0.1:8001/key-auths
list-camera-oauth:
	curl -X GET http://127.0.0.1:8001/oauth2_tokens/
connect-camera-1:
	curl http://127.0.0.1:8000/camera-1-service/api/v1/hc -H "Authorization: Basic $(shell echo "cameraUser1:administrator" | base64)"
kong-config: create-consumer-1 create-consumer-2 create-consumer-3 create-consumer-4 create-consumer-6
dcd:
	cd .. && make dcd
dcup-full-action:
	cd .. && make dcup-full-action
deck-update-to-3:
	deck convert --from kong-gateway-2.x --to kong-gateway-3.x
install-deck-mac-os:
	brew tap kong/deck
	brew install deck
install-deck-linux:
	curl -sL https://github.com/kong/deck/releases/download/v1.15.0/deck_1.15.0_linux_amd64.tar.gz -o deck.tar.gz
	tar -xf deck.tar.gz -C /tmp
	sudo cp /tmp/deck /usr/local/bin/
