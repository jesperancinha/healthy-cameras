import {Injectable} from '@angular/core';
import crypto from "crypto";
import {ProviderService} from "./provider.service";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HmacAuthService implements ProviderService {

  constructor(private httpClient: HttpClient) {
  }


  createCamera2HmacHeaders(method: string, path: string): Partial<any> {
    const username = 'cameraUser2', secret = 'dragon', algorithm = 'hmac-sha256';
    const dateFormat = new Date().toUTCString();
    const digestBodyHeader = `SHA-256=${crypto.createHash('sha256').digest('base64')}`;
    const signingString = `x-date: ${dateFormat}\n${method} ${path} HTTP/1.1\ndigest: ${digestBodyHeader}`;
    const signature = crypto.createHmac('sha256', secret).update(signingString).digest('base64');
    const authorization = `hmac username="${username}", algorithm="${algorithm}", headers="x-date request-line digest", signature="${signature}"`;
    return {
      'Digest': digestBodyHeader,
      'Authorization': authorization,
      'X-Date': dateFormat,
      'Content-Type': 'application/json',
    };
  }

  findCameraBasicAuthMessage(username: string, password: string): Observable<string> {
    const token = btoa(`${username}:${password}`)
    return this.httpClient.get("/camera-2-service/api/v1/hc", {
      headers: this.createCamera2HmacHeaders(username,password),
      responseType: 'text'
    });
  }
}
