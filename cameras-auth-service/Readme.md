# Camera Authentication App

This app is here to illustrate the role of authentications done by Google, GitHub, Facebook and others in the OAuth2 specification.

It is NOT intended to show how they are implemented. The implementation of the authentication mechanism itself is not a part of this project.

## Login page

- [Auth Page](http://localhost:8095/api/v1/cameras/auth)

##  Useful commands

##### 1. Make an curl request ignoring trust to the cameras HTTPS endpoint.

```shell
curl https://127.0.0.1:8443/camera-6-service/api/v1/hc -k
```
