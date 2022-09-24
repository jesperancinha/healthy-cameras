import {Injectable} from '@angular/core';
// @ts-ignore
import crypto from "crypto";
import {ProviderService} from "./provider.service";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HmacAuthService implements ProviderService<string> {

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

  findCameraBasicAuthMessage(input: Map<string, string>): Observable<string> {
    return this.httpClient.get(input.get("path") || "", {
      headers: this.createCamera2HmacHeaders(input.get("method") || "", input.get("path") || ""),
      responseType: 'text'
    });
  }
}
