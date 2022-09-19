FROM openjdk:17-alpine

ENV runningFolder /usr/local/bin/

WORKDIR ${runningFolder}

RUN apk --no-cache add curl

RUN apk update

RUN apk add jq

COPY target/cameras-auth-service.jar ${runningFolder}/cameras-auth-service.jar

COPY target/CC6KongProvOauth2.json ${runningFolder}/CC6KongProvOauth2.json

COPY entrypoint.sh ${runningFolder}

EXPOSE 8080

ENTRYPOINT ["entrypoint.sh"]
