import {Component} from '@angular/core';
import {routes} from "./app-routing.module";
import {Router} from "@angular/router";
import {capitalizeText} from "./services/utils";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent {
  title = 'cameras-gui';

  public buttons = routes;

  public constructor(private router: Router) {

  }

  getButtonText = (path?: string) => capitalizeText(path || "")

  navigateTo = (path?: string) => this.router.navigate([path]).then(_ => {
  })

  navigateToExternal = (externalUrl: string) => window.location.href = externalUrl;

  getCurrentApp = () => window.location.href.indexOf("8000") > -1? "Kong" : "NGINX";
}

