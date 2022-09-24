import {Component, OnInit} from '@angular/core';
import {BasicAuthService} from "../services/basic-auth.service";
import {HmacAuthService} from "../services/hmac-auth.service";
import {Credential} from "../services/domain/credential";
import {HMACInput} from "../services/domain/hmac.input";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  baParams: Credential = {
    username: "cameraUser1",
    password: "administrator"
  };
  hmacParams: HMACInput = {
    method: "GET",
    path: "/camera-2-service/api/v1/hc"
  };

  constructor(public basicAuthService: BasicAuthService, public hmacAuthService: HmacAuthService) {
  }

  ngOnInit(): void {
  }

}
