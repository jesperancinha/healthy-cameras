import {EventEmitter, Injectable} from '@angular/core';
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

  private newHeaderEvent = new EventEmitter<string>();

  private cryptoJS = CryptoJS;

  constructor(private httpClient: HttpClient) {
  }

  emit = <T>(info: T): T => {
    this.newHeaderEvent.emit(JSON.stringify(info))
    return info;
  }

  eventEmitter(): EventEmitter<string> {
    return this.newHeaderEvent;
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

  encodeToken = (payload: any) => {
    const header = {
      "alg": "HS256",
      "typ": "JWT"
    };
    const encodedHeader = this.encodeObject(header);
    const encodedData = this.encodeObject(payload);
    return `${encodedHeader}.${encodedData}`;
  }

  private encodeObject = <T>(object: T) => this.base64url(this.cryptoJS.enc.Utf8.parse(JSON.stringify(object)));

  signToken = (body: any, secret: string) => {
    const jwtToken: any = this.encodeToken(body);
    const signature = this.base64url(this.cryptoJS.HmacSHA256(jwtToken, secret));
    return `${jwtToken}.${signature}`;
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

  retrieveWelcomeMessage = (input: Map<string, string>): Observable<string> => this.httpClient.get(input.get("path") || "", {
    headers: this.emit(this.createJwtHeader(input.get("secret") || "", input.get("issuer") || "")),
    responseType: 'text'
  })
}
