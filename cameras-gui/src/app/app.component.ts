import {Component, OnInit} from '@angular/core';
import {routes} from "./app-routing.module";
import {Router} from "@angular/router";
import {BasicAuthService} from "./services/basic-auth.service";
import {capitalizeText} from "./services/utils";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cameras-gui';

  public buttons = routes;

  public constructor(private router: Router) {

  }

  getButtonText = (path?: string) => capitalizeText(path || "")

  navigateTo(path?: string) {
    this.router.navigate([path]).then(_ => {
    })
  }
}
