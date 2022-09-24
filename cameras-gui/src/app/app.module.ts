import {NgModule} from '@angular/core';
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
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
