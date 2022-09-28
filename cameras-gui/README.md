# CamerasGui


## Notes:

```text
/render/?width=700&height=508&target=statsd.numStats&target=stats.statsd.camera-1-service.request.size&target=stats.statsd.camera-1-service.response.size
```

##### HMAC tests

```shell
curl http://localhost:4200/camera-2-service/api/v1/hc -H 'Authorization: hmac username="{{USERNAME}}", algorithm="hmac-sha256", headers="x-date request-line digest", signature="{{SIGNATURE}}"' -H 'x-date: Wed, 28 Sep 2022 09:17:55 GMT'
```

## References

- [Test WebSocket Servers](https://www.piesocket.com/websocket-tester)

---

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
