import { InjectionToken } from '@angular/core';
import { CamerasHealthUrls } from './services/domain/cameras.health.urls';

export const CAMERAS_HEALTH_STATUS_URLS = new InjectionToken<CamerasHealthUrls>('Cameras Url Health Socket Health Checks');

const getCameraStatusHost = () => `${window.location.hostname == 'nginx' ? 'kong' : window.location.hostname}:8000`;

export const APP_PROVIDERS = [
  {
    provide: CAMERAS_HEALTH_STATUS_URLS,
    useValue: {
      cameras: [
        {url: `ws://${getCameraStatusHost()}/camera-1-service/api/v1/hc/camera-states-emitter`, ref: 'ba'},
        {url: `ws://${getCameraStatusHost()}/camera-2-service/api/v1/hc/camera-states-emitter`, ref: 'hmac'},
        {url: `ws://${getCameraStatusHost()}/camera-3-service/api/v1/hc/camera-states-emitter`, ref: 'jwt'},
        {url: `ws://${getCameraStatusHost()}/camera-4-service/api/v1/hc/camera-states-emitter`, ref: 'key'},
        {url: `ws://${getCameraStatusHost()}/camera-5-service/api/v1/hc/camera-states-emitter`, ref: 'ldap'},
        {url: `ws://${getCameraStatusHost()}/camera-6-service/api/v1/hc/camera-states-emitter`, ref: 'oauth2'},
      ]
    }
  }
];
