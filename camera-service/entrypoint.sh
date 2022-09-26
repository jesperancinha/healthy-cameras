#!/usr/bin/env sh
java -jar -Dspring.profiles.active=prod,docker -Dhc.camera.number="${CAMERA_NO}" camera-service.jar