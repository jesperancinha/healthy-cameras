import {Component, OnInit} from '@angular/core';
import {BasicAuthService} from "../services/basic-auth.service";
import {HmacAuthService} from "../services/hmac-auth.service";
import {JwtAuthService} from "../services/jwt-auth.service";
import {KeyAuthService} from "../services/key-auth.service";
import {LdapAuthService} from "../services/ldap-auth.service";
import {Oauth2AuthService} from "../services/oauth2-auth.service";
import {CameraSocketService} from "../services/camera-socket.service";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  standalone: false
})
export class OverviewComponent implements OnInit {
  baParams: Map<string, string> = new Map(Object.entries({
    username: "cameraUser1",
    password: "administrator",
    path: "/camera-1-service/api/v1/hc"
  }));
  hmacParams: Map<string, string> = new Map(Object.entries({
    method: "GET",
    path: "/camera-2-service/api/v1/hc"
  }));
  jwtParams: Map<string, string> = new Map(Object.entries({
    secret: "",
    issuer: "",
    path: "/camera-3-service/api/v1/hc"

  }));
  keyParams: Map<string, string> = new Map(Object.entries({
    key: "",
    path: "/camera-4-service/api/v1/hc"
  }));
  ldapParams: Map<string, string> = new Map(Object.entries({
    username: "admin",
    password: "password",
    path: "/camera-5-service/api/v1/hc"
  }));
  oauth2Params: Map<string, string> = new Map(Object.entries({
    username: "admin",
    password: "admin",
    pathAuth: "/cameras-auth-service/api/v1/cameras/auth/login",
    path: "/camera-6-service/api/v1/hc"
  }));

  constructor(
    public basicAuthService: BasicAuthService,
    public hmacAuthService: HmacAuthService,
    public jwtAuthService :JwtAuthService,
    public keyAuthService :KeyAuthService,
    public ldapAuthService :LdapAuthService,
    public oauth2AuthService :Oauth2AuthService,
    public cameraSocketService: CameraSocketService,
  ) {
    cameraSocketService.start();
  }

  ngOnInit(): void {
  }

}
