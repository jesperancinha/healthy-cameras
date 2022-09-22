import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OverviewComponent} from "./overview/overview.component";
import {ControlComponent} from "./control/control.component";
import {StatsdComponent} from "./statsd/statsd.component";

export const routes: Routes = [
  {path: "overview", component: OverviewComponent},
  {path: "control", component: ControlComponent},
  {path: "statsd", component: StatsdComponent},
  {path: "", component: OverviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
