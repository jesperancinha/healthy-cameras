FROM openjdk:17-alpine

ENV runningFolder /usr/local/bin/

WORKDIR ${runningFolder}

RUN apk --no-cache add curl

COPY target/camera-service.jar ${runningFolder}/camera-service.jar

COPY entrypoint.sh ${runningFolder}

EXPOSE 8080

ENTRYPOINT ["entrypoint.sh"]
