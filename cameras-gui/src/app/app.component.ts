import {Component, OnInit} from '@angular/core';
import {routes} from "./app-routing.module";
import {Router} from "@angular/router";
import {BasicAuthService} from "./services/basic-auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'cameras-gui';

  public buttons = routes;
  basicMessage: string | undefined;

  public constructor(private router: Router,private basicAuthService:BasicAuthService) {

  }

  ngOnInit(): void {
    this.basicAuthService.findCameraBasicAuthMessage("cameraUser1","administrator").subscribe(data => {
      this.basicMessage = data;
    })
  }

  getButtonText(path?: string) {
    if (!path) {
      return "Main";
    }
    if (path === "statsd") {
      return "StatsD";
    }
    return path.toLowerCase()
      .replace(/\w/, capital => capital.toUpperCase());
  }

  navigateTo(path?: string) {
    this.router.navigate([path]).then(_ => {
    })
  }
}
