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
	curl -X POST http://localhost:8001/consumers/camera3/jwt -H "Content-Type: application/x-www-form-urlencoded"
protect-camera-2-hmac:
	curl -X POST http://localhost:8001/services/camera-2-service/plugins \
		--data "name=hmac-auth"
protect-camera-3-jwt:
	curl -X POST http://localhost:8001/services/camera-3-service/plugins \
		--data "name=jwt"
camera-3:
	curl -X GET http://localhost:8001/consumers/camera3/jwt
connect-camera-1:
	curl http://localhost:8000/camera-1-service/api/v1/hc -H "Authorization: Basic $(shell echo "cameraUser1:administrator" | base64)"
kong-config: create-consumer-1 create-consumer-2 create-consumer-3
dcd:
	cd .. && make dcd
dcd:
	cd .. && make dcd
dcup-full-action:
	cd .. && make dcup-full-action