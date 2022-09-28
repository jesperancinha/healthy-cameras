#!/usr/bin/env sh

# Camera 1 Config
curl -d "username=camera1&custom_id=CC1" http://127.0.0.1:8001/consumers/
curl -X POST http://127.0.0.1:8001/consumers/camera1/basic-auth \
  --data "username=cameraUser1" \
  --data "password=administrator"

# Camera 2 Config
curl -d "username=camera2&custom_id=CC2" http://127.0.0.1:8001/consumers/
curl -X POST http://127.0.0.1:8001/consumers/camera2/hmac-auth \
  --data "username=cameraUser2" \
  -d "secret=dragon"

# Camera 3 Config
curl -d "username=camera3&custom_id=CC3" http://127.0.0.1:8001/consumers/
curl -X POST http://127.0.0.1:8001/consumers/camera3/jwt -H "Content-Type: application/x-www-form-urlencoded"
curl -X GET http://127.0.0.1:8001/consumers/camera3/jwt > ../e2e/cypress/fixtures/CC3KongToken.json

# Camera 4 Config
curl -d "username=camera4&custom_id=CC4" http://127.0.0.1:8001/consumers/
curl -X POST http://127.0.0.1:8001/consumers/camera4/key-auth
curl -X GET http://127.0.0.1:8001/key-auths > ../e2e/cypress/fixtures/CC4KongKeys.json

# Camera 6 Config
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
  --data "redirect_uris=https://127.0.0.1:8443/camera-6-service/api/v1/hc" \
  --data "hash_secret=true" > ../e2e/cypress/fixtures/CC6KongOauth2.json
curl -X GET http://127.0.0.1:8001/oauth2_tokens/
