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

Please check the [TechStack.md](TechStack.md) file for details.

## Introduction

Demo on Kong in a system where several cameras watch over a plant, and we need to constantly monitor their status

<details>
<summary><b>Stable Releases</b></summary>

This repo is also the official support repo to my article on medium:

[![](https://img.shields.io/badge/Protecting%20Applications%20with%20Kong%20security%20plugins%20and%20using%20StatsD%20to%20monitor%20system%20states%20—%20A%20healthy%20camera%20story-12100E?style=for-the-badge&logo=medium&logoColor=white)](https://medium.com/itnext/protecting-applications-with-kong-security-plugins-and-using-statsd-to-monitor-system-states-a-eb3468d47319)


-   [1.0.0](https://github.com/jesperancinha/healthy-cameras/tree/1.0.0) - [cd516c965673570f63c5829f9f908fc9f40a48f8](https://github.com/jesperancinha/healthy-cameras/tree/1.0.0) - Spring Boot 3.2.0
-   [0.0.0](https://github.com/jesperancinha/healthy-cameras/tree/0.0.0) - [2aa6c43ad3b0a595f686c8038cb7b3df6005464a](https://github.com/jesperancinha/healthy-cameras/tree/0.0.0)

</details>

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

-   [Custom Metrics with Prometheus by Stack Doctor](https://www.youtube.com/watch?v=XToKHYXSUyc)
-   [Getting Started with Kong Ingress Controller for Kubernetes](https://www.youtube.com/watch?v=hrYqGXU-a6E)
-   [How to Use Kong Gateway OAuth2 Plugin](https://www.youtube.com/watch?v=AIYIHZbDziI)

## About me

[![GitHub followers](https://img.shields.io/github/followers/jesperancinha.svg?label=Jesperancinha&style=for-the-badge&logo=github&color=grey "GitHub")](https://github.com/jesperancinha)
