import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {BasicAuthService} from "../services/basic-auth.service";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  constructor(private router: Router, public basicAuthService: BasicAuthService) {
  }

  ngOnInit(): void {
  }

}
