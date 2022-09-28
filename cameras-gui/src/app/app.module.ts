import {InjectionToken, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import {CameraViewComponent} from './camera-view/camera-view.component';
import {OverviewComponent} from './overview/overview.component';
import {ControlComponent} from './control/control.component';
import {MatButtonModule} from "@angular/material/button";
import {StatsdComponent} from './statsd/statsd.component';
import {HttpClientModule} from "@angular/common/http";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {FormsModule} from "@angular/forms";
import {CamerasHealthUrls} from "./services/domain/cameras.health.urls";
import {MatSelectModule} from "@angular/material/select";

export const CAMERAS_HEALTH_STATUS_URLS = new InjectionToken<CamerasHealthUrls>('Cameras Url Health Socket Health Checks');

@NgModule({
  declarations: [
    AppComponent,
    CameraViewComponent,
    OverviewComponent,
    ControlComponent,
    StatsdComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    FormsModule,
    MatSelectModule
  ],
  providers: [
    {
      provide: CAMERAS_HEALTH_STATUS_URLS,
      useValue: {
        cameras: [
          {url: "ws://localhost:8000/camera-1-service/api/v1/hc/camera-states-emitter", ref: 'ba'},
          {url: "ws://localhost:8000/camera-2-service/api/v1/hc/camera-states-emitter", ref: 'hmac'},
          {url: "ws://localhost:8000/camera-3-service/api/v1/hc/camera-states-emitter", ref: 'jwt'},
          {url: "ws://localhost:8000/camera-4-service/api/v1/hc/camera-states-emitter", ref: 'key'},
          {url: "ws://localhost:8000/camera-5-service/api/v1/hc/camera-states-emitter", ref: 'ldap'},
          {url: "ws://localhost:8000/camera-6-service/api/v1/hc/camera-states-emitter", ref: 'oauth2'},
        ]
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
