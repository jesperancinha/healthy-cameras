import {EventEmitter, Inject, Injectable, Output} from '@angular/core';
import {CAMERAS_HEALTH_STATUS_URLS} from "../app.module";
import {CamerasHealthUrls} from "./domain/cameras.health.urls";


@Injectable({
  providedIn: 'root'
})
export class CameraSocketService {

  private camerasConfig: CamerasHealthUrls;

  private cameraStatus = new Map<string, string>();

  constructor(@Inject(CAMERAS_HEALTH_STATUS_URLS) camerasConfig: CamerasHealthUrls
  ) {
    this.camerasConfig = camerasConfig;
  }

  start() {
    const cameraStatus = this.cameraStatus;
    this.camerasConfig.cameras.forEach(cf => {
      const clientWebSocket = new WebSocket(cf.url);
      clientWebSocket.onopen = function () {
        clientWebSocket.send("Accepted!");
      }
      clientWebSocket.onerror = function (error) {
        console.error(error);
        cameraStatus.set(cf.ref, error.type);
      }
      clientWebSocket.onmessage = function (messageEvent) {
        console.log(messageEvent.data);
        cameraStatus.set(cf.ref, JSON.parse(messageEvent.data).status.status);
      }
      clientWebSocket.onclose = function (error) {
        cameraStatus.set(cf.ref, "CLOSED");
      }
    })
  }

  getStatus(ref: string) {
    return this.cameraStatus.get(ref);
  }
}
