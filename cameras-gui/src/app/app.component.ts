import {Component} from '@angular/core';
import {routes} from "./app-routing.module";
import {Router} from "@angular/router";

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


  getButtonText(path?: string) {
    if (!path) {
      return "Main"
    }
    return path.toLowerCase()
      .replace(/\w/, capital => capital.toUpperCase());
  }

  navigateTo(path?: string) {
    this.router.navigate([path]).then(_ => {
    })
  }
}
