import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {routes} from "./app-routing.module";
import {Router} from "@angular/router";
import {capitalizeText} from "./services/utils";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
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
