SHELL=/bin/bash

create-consumer-1:
	curl -d "username=camera1&custom_id=CC1" http://127.0.0.1:8001/consumers/
	curl -X POST http://127.0.0.1:8001/consumers/consumer_admin/basic-auth \
	  --data "username=cameraUser1" \
	  --data "password=administrator"
connect-camera-1:
	curl http://localhost:8000/camera-1-service/api/v1/hc -H "Authorization: Basic $(shell echo "cameraUser1:administrator" | base64)"

kong-config: create-consumer-1
