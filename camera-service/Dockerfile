FROM openjdk:17-slim-buster

ENV runningFolder /usr/local/bin/

WORKDIR ${runningFolder}

RUN apt-get update

COPY target/camera-service.jar ${runningFolder}/camera-service.jar

COPY entrypoint.sh ${runningFolder}

EXPOSE 8080

ENTRYPOINT ["entrypoint.sh"]
