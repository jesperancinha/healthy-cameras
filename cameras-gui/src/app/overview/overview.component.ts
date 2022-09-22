import {Component, OnInit} from '@angular/core';
import {BasicAuthService} from "../services/basic-auth.service";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  constructor(public basicAuthService: BasicAuthService) {
  }

  ngOnInit(): void {
  }

}
