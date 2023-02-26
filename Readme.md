# healthy-cameras

---

[![Twitter URL](https://img.shields.io/twitter/url?logoColor=blue&style=social&url=https%3A%2F%2Fimg.shields.io%2Ftwitter%2Furl%3Fstyle%3Dsocial)](https://twitter.com/intent/tweet?text=%20Checkout%20this%20%40github%20repo%20by%20%40joaofse%20%F0%9F%91%A8%F0%9F%8F%BD%E2%80%8D%F0%9F%92%BB%3A%20https%3A//github.com/jesperancinha/healthy-cameras)
[![Generic badge](https://img.shields.io/static/v1.svg?label=GitHub&message=Healthy%20Cameras%20📹&color=informational)](https://github.com/jesperancinha/healthy-cameras)

[![GitHub License](https://img.shields.io/badge/license-Apache%20License%202.0-blue.svg?style=flat)](https://www.apache.org/licenses/LICENSE-2.0)

[![Build, Test, Coverage and Report](https://github.com/jesperancinha/healthy-cameras/actions/workflows/healthy-camera.yml/badge.svg)](https://github.com/jesperancinha/healthy-cameras/actions/workflows/healthy-camera.yml)
[![e2e-healthy-cameras](https://github.com/jesperancinha/healthy-cameras/actions/workflows/healthy-cameras-e2e.yml/badge.svg)](https://github.com/jesperancinha/healthy-cameras/actions/workflows/healthy-cameras-e2e.yml)
[![Build status](https://ci.appveyor.com/api/projects/status/1l4f2sx9geqi8ab2?svg=true)](https://ci.appveyor.com/project/jesperancinha/healthy-cameras)

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/2d1524195d9f45e5b666c44e39440c92)](https://www.codacy.com/gh/jesperancinha/healthy-cameras/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=jesperancinha/healthy-cameras&amp;utm_campaign=Badge_Grade)
[![Known Vulnerabilities](https://snyk.io/test/github/jesperancinha/healthy-cameras/badge.svg)](https://snyk.io/test/github/jesperancinha/healthy-cameras)

[![Codacy Badge](https://app.codacy.com/project/badge/Coverage/2d1524195d9f45e5b666c44e39440c92)](https://www.codacy.com/gh/jesperancinha/healthy-cameras/dashboard?utm_source=github.com&utm_medium=referral&utm_content=jesperancinha/healthy-cameras&utm_campaign=Badge_Coverage)
[![Coverage Status](https://coveralls.io/repos/github/jesperancinha/healthy-cameras/badge.svg?branch=main)](https://coveralls.io/github/jesperancinha/healthy-cameras?branch=main)
[![codecov](https://codecov.io/github/jesperancinha/healthy-cameras/branch/main/graph/badge.svg?token=lhP00hiGrC)](https://codecov.io/github/jesperancinha/healthy-cameras)

[![GitHub language count](https://img.shields.io/github/languages/count/jesperancinha/healthy-cameras.svg)](#)
[![GitHub top language](https://img.shields.io/github/languages/top/jesperancinha/healthy-cameras.svg)](#)
[![GitHub top language](https://img.shields.io/github/languages/code-size/jesperancinha/healthy-cameras.svg)](#)

---

## Technologies used

---

[![alt text](https://raw.githubusercontent.com/jesperancinha/project-signer/master/project-signer-templates/icons-50/kotlin-50.png "Kotlin")](https://kotlinlang.org/)
[![alt text](https://raw.githubusercontent.com/jesperancinha/project-signer/master/project-signer-templates/icons-50/spring-50.png "Spring Framework")](https://spring.io/projects/spring-framework)
[![alt text](https://raw.githubusercontent.com/jesperancinha/project-signer/master/project-signer-templates/icons-50/spring-boot-50.png "Spring Boot")](https://spring.io/projects/spring-boot)
[![alt text](https://raw.githubusercontent.com/jesperancinha/project-signer/master/project-signer-templates/icons-50/spring-webflux-50.png "Spring Webfllux")](https://spring.io/projects/spring-boot)
[![alt text](https://raw.githubusercontent.com/jesperancinha/project-signer/master/project-signer-templates/icons-50/kotest-50.png "Kotest")](https://kotest.io/)
[![alt text](https://raw.githubusercontent.com/jesperancinha/project-signer/master/project-signer-templates/icons-50/mockk-50.png "MockK")](https://mockk.io/)
[![alt text](https://raw.githubusercontent.com/jesperancinha/project-signer/master/project-signer-templates/icons-50/jupiter5-50.png "Jupiter 5")](https://junit.org/junit5/docs/current/user-guide/)
[![alt text](https://raw.githubusercontent.com/jesperancinha/project-signer/master/project-signer-templates/icons-50/docker-50.png "Docker")](https://www.docker.com/)
[![alt text](https://raw.githubusercontent.com/jesperancinha/project-signer/master/project-signer-templates/icons-50/docker-compose-50.png "Docker Compose")](https://docs.docker.com/compose/)
[![alt text](https://raw.githubusercontent.com/jesperancinha/project-signer/master/project-signer-templates/icons-50/testcontainers-50.png "Test containers")](https://www.testcontainers.org/)
[![alt text](https://raw.githubusercontent.com/jesperancinha/project-signer/master/project-signer-templates/icons-50/swagger-50.png "Swagger")](https://swagger.io/)
[![alt text](https://raw.githubusercontent.com/jesperancinha/project-signer/master/project-signer-templates/icons-50/cypress-50.png "Cypress")](https://www.cypress.io/)

---

## Introduction

Demo on Kong in a system where several cameras watch over a plant, and we need to constantly monitor their status

#### Stable releases

-   [0.0.0](https://github.com/jesperancinha/healthy-cameras/tree/0.0.0) - [2aa6c43ad3b0a595f686c8038cb7b3df6005464a](https://github.com/jesperancinha/healthy-cameras/tree/0.0.0)

## How to run

##### Simple run

```shell
docker-compose up -d
```

or

```shell
make dcup
```

-   [Prometheus on port 9090 - http://localhost:9090/](http://localhost:9090/)
-   [Grafana on port 3000 - http://localhost:3000/](http://localhost:3000/)
-   [Prometheus' metrics raw in the Camera Service on port 8080 - http://localhost:8080/actuator/prometheus](http://localhost:8080/actuator/prometheus)
-   [Prometheus targets on port 9090 - http://localhost:9090/targets?search=](http://localhost:9090/targets?search=)
-   [Camera Welcome Message for camera 1 - http://localhost:8000/camera-1-service/api/v1/hc](http://localhost:8000/camera-1-service/api/v1/hc)
-   [Metrics in Kong - http://localhost:8001/metrics](http://localhost:8001/metrics)
-   [Graphite Page - http://localhost:8085](http://localhost:8085)

## References

#### Online

-   [StatsD @ Etsy](https://www.etsy.com/codeascraft/measure-anything-measure-everything)
-   [statsd / statsd  @ GitHub](https://github.com/statsd/statsd)
-   [What is StatsD exactly? @ Datadog](https://www.datadoghq.com/blog/statsd/)
-   [Kubernetes Documentation / Concepts Services / Load Balancing / Networking Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/)
-   [A Deep Dive Into the Four Types of Prometheus Metrics](https://www.timescale.com/blog/four-types-prometheus-metrics-to-collect/)
-   [Defining custom metrics in a Spring Boot application using Micrometer](https://autsoft.net/defining-custom-metrics-in-a-spring-boot-application-using-micrometer/)
-   [Kong Blog Posts](https://github.com/danielkocot/kong-blogposts)
-   [Kong API Gateway – Observability with Prometheus, Grafana and OpsGenie by Daniel Kocot](https://blog.codecentric.de/en/2019/12/kong-api-gateway-observability-with-prometheus-grafana-and-opsgenie/)
-   [Defining custom metrics in a Spring Boot application using Micrometer](https://autsoft.net/defining-custom-metrics-in-a-spring-boot-application-using-micrometer/)
-   [Spring Boot app metrics - with Prometheus and Micrometer](https://www.tutorialworks.com/spring-boot-prometheus-micrometer/#adding-a-custom-metric)
-   [https://github.com/prometheus/statsd_exporter](https://github.com/prometheus/statsd_exporter)
-   [StatsD: What Is It and How To Monitor It](https://www.metricfire.com/blog/statsd-what-is-it-and-how-to-monitor-it/)
-   [Kong Gateway](https://docs.konghq.com/gateway/)
-   [Kong Vitals](https://docs.konghq.com/gateway/2.8.x/vitals/)
-   [Kong Plugin Hub](https://docs.konghq.com/hub/)
-   [Kong Lua Rules](https://docs.konghq.com/hub/kong-inc/bot-detection/)

#### Videos

<div align="center"> 
      <a title="Custom Metrics with Prometheus by Stack Doctor" href="https://www.youtube.com/watch?v=XToKHYXSUyc">
     <img 
          src="https://img.youtube.com/vi/XToKHYXSUyc/0.jpg" 
          style="width:20%;">
      </a>
     <a title="Getting Started with Kong Ingress Controller for Kubernetes" href="https://www.youtube.com/watch?v=hrYqGXU-a6E">
     <img 
          src="https://img.youtube.com/vi/hrYqGXU-a6E/0.jpg" 
          style="width:20%;">
      </a>
     <a title="Getting Started with Kong Ingress Controller for Kubernetes" href="https://www.youtube.com/watch?v=AIYIHZbDziI">
     <img 
          src="https://img.youtube.com/vi/AIYIHZbDziI/0.jpg" 
          style="width:20%;">
      </a>
</div>

## About me

[![](https://img.shields.io/badge/youtube-%230077B5.svg?style=for-the-badge&logo=youtube&color=red)](https://www.youtube.com/@joaoesperancinha)
[![](https://img.shields.io/badge/Medium-12100E?style=for-the-badge&logo=medium&logoColor=white)](https://medium.com/@jofisaes)
[![](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/joaoesperancinha/)
[![](https://img.shields.io/badge/Spotify-1ED760?style=for-the-badge&logo=spotify&logoColor=white)](https://open.spotify.com/user/jlnozkcomrxgsaip7yvffpqqm)
[![alt text](https://raw.githubusercontent.com/jesperancinha/project-signer/master/project-signer-templates/icons-20/JEOrgLogo-20.png "João Esperancinha Homepage")](http://joaofilipesabinoesperancinha.nl)
[![GitHub followers](https://img.shields.io/github/followers/jesperancinha.svg?label=Jesperancinha&style=social "GitHub")](https://github.com/jesperancinha)
[![alt text](https://raw.githubusercontent.com/jesperancinha/project-signer/master/project-signer-templates/icons-20/mastodon-20.png "Mastodon")](https://masto.ai/@jesperancinha)
[![Twitter Follow](https://img.shields.io/twitter/follow/joaofse?label=João%20Esperancinha&style=social "Twitter")](https://twitter.com/joaofse)
| [Sessionize](https://sessionize.com/joao-esperancinha/)
| [Instagram](https://www.instagram.com/joaofisaes/)
| [Buy me a coffee](https://www.buymeacoffee.com/jesperancinha)
| [Credly Badges](https://www.credly.com/users/joao-esperancinha)
| [Google Apps](https://play.google.com/store/apps/developer?id=Joao+Filipe+Sabino+Esperancinha)
| [Sonatype Search Repos](https://search.maven.org/search?q=org.jesperancinha)
| [Docker Images](https://hub.docker.com/u/jesperancinha)
| [Stack Overflow Profile](https://stackoverflow.com/users/3702839/joao-esperancinha)
| [Reddit](https://www.reddit.com/user/jesperancinha/)
| [Dev.TO](https://dev.to/jofisaes)
| [Hackernoon](https://hackernoon.com/@jesperancinha)
| [Code Project](https://www.codeproject.com/Members/jesperancinha)
| [BitBucket](https://bitbucket.org/jesperancinha)
| [GitLab](https://gitlab.com/jesperancinha)
| [Coursera](https://www.coursera.org/user/da3ff90299fa9297e283ee8e65364ffb)
| [FreeCodeCamp](https://www.freecodecamp.org/jofisaes)
| [HackerRank](https://www.hackerrank.com/jofisaes)
| [LeetCode](https://leetcode.com/jofisaes)
| [Codebyte](https://coderbyte.com/profile/jesperancinha)
| [CodeWars](https://www.codewars.com/users/jesperancinha)
| [Code Pen](https://codepen.io/jesperancinha)
| [Hacker Earth](https://www.hackerearth.com/@jofisaes)
| [Khan Academy](https://www.khanacademy.org/profile/jofisaes)
| [Hacker News](https://news.ycombinator.com/user?id=jesperancinha)
| [InfoQ](https://www.infoq.com/profile/Joao-Esperancinha.2/)
| [LinkedIn](https://www.linkedin.com/in/joaoesperancinha/)
| [Xing](https://www.xing.com/profile/Joao_Esperancinha/cv)
| [Tumblr](https://jofisaes.tumblr.com/)
| [Pinterest](https://nl.pinterest.com/jesperancinha/)
| [Quora](https://nl.quora.com/profile/Jo%C3%A3o-Esperancinha)
| [VMware Spring Professional 2021](https://www.credly.com/badges/762fa7a4-9cf4-417d-bd29-7e072d74cdb7)
| [Oracle Certified Professional, Java SE 11 Programmer](https://www.credly.com/badges/87609d8e-27c5-45c9-9e42-60a5e9283280)
| [Oracle Certified Professional, JEE7 Developer](https://www.credly.com/badges/27a14e06-f591-4105-91ca-8c3215ef39a2)
| [IBM Cybersecurity Analyst Professional](https://www.credly.com/badges/ad1f4abe-3dfa-4a8c-b3c7-bae4669ad8ce)
| [Certified Advanced JavaScript Developer](https://cancanit.com/certified/1462/)
| [Certified Neo4j Professional](https://graphacademy.neo4j.com/certificates/c279afd7c3988bd727f8b3acb44b87f7504f940aac952495ff827dbfcac024fb.pdf)
| [Deep Learning](https://www.credly.com/badges/8d27e38c-869d-4815-8df3-13762c642d64)
| [![Generic badge](https://img.shields.io/static/v1.svg?label=GitHub&message=JEsperancinhaOrg&color=yellow "jesperancinha.org dependencies")](https://github.com/JEsperancinhaOrg)
[![Generic badge](https://img.shields.io/static/v1.svg?label=All%20Badges&message=Badges&color=red "All badges")](https://joaofilipesabinoesperancinha.nl/badges)
[![Generic badge](https://img.shields.io/static/v1.svg?label=Status&message=Project%20Status&color=red "Project statuses")](https://github.com/jesperancinha/project-signer/blob/master/project-signer-quality/Build.md)
