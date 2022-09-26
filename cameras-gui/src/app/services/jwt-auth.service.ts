import {Injectable} from '@angular/core';
import {ProviderService} from "./provider.service";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import CryptoJS from 'crypto-js'

/**
 * https://stackoverflow.com/questions/69060122/how-to-create-a-json-web-token-from-angular
 */

@Injectable({
  providedIn: 'root'
})
export class JwtAuthService implements ProviderService<string> {

  private cryptoJS = CryptoJS;

  constructor(private httpClient: HttpClient) {
  }

  getImage = (input: Map<string, string>): Observable<ArrayBuffer> =>
    this.httpClient.get(`${input.get("path") || ""}/camera`, {
      headers: this.createJwtHeader(input.get("secret") || "", input.get("issuer") || ""),
      responseType: 'arraybuffer'
    });

  base64url = (source: any) => this.cryptoJS.enc.Base64.stringify(source)
    .replace(/=+$/, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  encodeToken(payload: any) {
    const header = {
      "alg": "HS256",
      "typ": "JWT"
    };
    const encodedHeader = this.base64url(this.cryptoJS.enc.Utf8.parse(JSON.stringify(header)));
    const encodedData = this.base64url(this.cryptoJS.enc.Utf8.parse(JSON.stringify(payload)));

    return `${encodedHeader}.${encodedData}`;
  }

  signToken = (payload: any, secret: string) => {
    const token: any = this.encodeToken(payload);
    const signature = this.base64url(this.cryptoJS.HmacSHA256(token, secret));
    return `${token}.${signature}`;
  }

  createJwtHeader = (secret: string, issuer: string) => {
    const signature = this.signToken({
      iss: issuer,
      expiresIn: "12h",
      algorithm: "HS256"
    }, secret)
    return {
      "Authorization": `Bearer ${signature}`
    };
  }

  retrieveWelcomeMessage(input: Map<string, string>): Observable<string> {
    const headers = this.createJwtHeader(input.get("secret") || "", input.get("issuer") || "");
    return this.httpClient.get(input.get("path") || "", {
      headers: headers,
      responseType: 'text'
    })
  }
}
