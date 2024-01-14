# Cameras Client App

This module is here to provide a comparison between a manually implemented OAuth2 layer and one that is created via Kong

## Login page

-   [Auth Page](http://localhost:8095/api/v1/cameras/auth)

##  Useful commands

##### 1.  Make an curl request ignoring trust to the cameras HTTPS endpoint.

```shell
curl https://127.0.0.1:8443/camera-6-service/api/v1/hc -k
```

##### 2.  Make a curl command with a bearer token

```shell
curl https://127.0.0.1:8443/camera-6-service/api/v1/hc -k -H 'Authorization: bearer <BEARER_TOKEN>'
```

## About me

[![GitHub followers](https://img.shields.io/github/followers/jesperancinha.svg?label=Jesperancinha&style=for-the-badge&logo=github&color=grey "GitHub")](https://github.com/jesperancinha)
