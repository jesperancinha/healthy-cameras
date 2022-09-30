# Healthy Cameras Log Book

<ins<2022/09/22</ins>

```shell
ng generate component camera-view
ng generate component control
ng generate component overview
ng generate component statsd
ng generate service basic-auth
ng generate service hmac-auth
ng generate service jwt-auth
ng generate service key-auth
ng generate service ldap-auth
ng generate service oauth2-auth
ng generate service camera-socket
```

<ins>2022/09/21</ins>

camera-service -> Generic cameras service from 1 to 6
cameras-auth-service -> Authentication Provider - Simulates GitHub, Facebook, Google authentication - It communicates directly with the OAuth Layer via Kong
cameras-client-service -> Application configured with Spring to create the OAuth2 Layer and protect the application in a standalone way

Established as goals to create an angular application to access cameras via modularized interfaces and give the user the possibility to fill in the necessary fields.

<ins>2022/06/02</ins>

Adds First Camera Service plus PostgresSQL

<ins>2022/05/19</ins>

The bot detection mechanism seems to introduce a simple way to detect bots attempting to access the website

## TODO list

1. StatsD Explorer: [prometheus / statsd_exporter](https://github.com/prometheus/statsd_exporter)
2. Explore a Kong example: [Kong API Gateway – Observability with Prometheus, Grafana and OpsGenie by Daniel Kocot](https://blog.codecentric.de/en/2019/12/kong-api-gateway-observability-with-prometheus-grafana-and-opsgenie/)

## Configuring Grafana

[![alt img](./docs/grafana.setup.png)]()
