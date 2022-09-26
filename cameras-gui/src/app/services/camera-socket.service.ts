import {Inject, Injectable} from '@angular/core';
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
      createCameraSocket(cf, cameraStatus);
    })
  }

  getStatus(ref: string) {
    return this.cameraStatus.get(ref);
  }
}

function createCameraSocket(cf: { url: string; ref: string }, cameraStatus: Map<string, string>) {
  const clientWebSocket = new WebSocket(cf.url);
  clientWebSocket.onopen = function () {
    clientWebSocket.send("Accepted!");
  }
  clientWebSocket.onerror = function (error) {
    cameraStatus.set(cf.ref, error.type);
    createCameraSocket(cf, cameraStatus)

  }
  clientWebSocket.onmessage = function (messageEvent) {
    cameraStatus.set(cf.ref, JSON.parse(messageEvent.data).status.status);
  }
  clientWebSocket.onclose = function (error) {
    cameraStatus.set(cf.ref, "CLOSED");
    createCameraSocket(cf, cameraStatus)
  }
}
