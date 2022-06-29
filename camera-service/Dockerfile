# https://spring.io/guides/gs/spring-boot-docker/
ARG VERSION=8-jdk-alpine
FROM openjdk:$VERSION

ARG JAR_FILE
COPY maven/target/${JAR_FILE} /deployments/app.jar

WORKDIR .
VOLUME /tmp

EXPOSE 8080
ENTRYPOINT ["java","-jar","/deployments/app.jar"]
