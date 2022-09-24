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


  base64url(source: any) {
    let encodedSource = this.cryptoJS.enc.Base64.stringify(source);

    encodedSource = encodedSource.replace(/=+$/, '');

    encodedSource = encodedSource.replace(/\+/g, '-');
    encodedSource = encodedSource.replace(/\//g, '_');

    return encodedSource;
  }

  encodeToken(payload: any) {
    var header = {
      "alg": "HS256",
      "typ": "JWT"
    };

    var stringifiedHeader = this.cryptoJS.enc.Utf8.parse(JSON.stringify(header));
    var encodedHeader = this.base64url(stringifiedHeader);

    var stringifiedData = this.cryptoJS.enc.Utf8.parse(JSON.stringify(payload));
    var encodedData = this.base64url(stringifiedData);

    return encodedHeader + "." + encodedData;
  }

  signToken(payload: any, key: string) {
    var secret = key;
    let token: any = this.encodeToken(payload);

    var signature: any = this.cryptoJS.HmacSHA256(token, secret);
    signature = this.base64url(signature);

    var signedToken = token + "." + signature;
    return signedToken;
  }

  createJwtHeader(secret: string, issuer: string) {
    const signature = this.signToken({
      iss: issuer,
      expiresIn: "12h",
      algorithm: "HS256"
    }, secret)
    return {
      "Authorization": `Bearer ${signature}`
    };
  }

  retrieveCameraImageRequest(input: Map<string, string>): Observable<string> {
    const headers = this.createJwtHeader(input.get("secret") || "", input.get("issuer") || "");
    return this.httpClient.get("/camera-3-service/api/v1/hc", {
      headers: headers,
      responseType: 'text'
    })
  }
}
