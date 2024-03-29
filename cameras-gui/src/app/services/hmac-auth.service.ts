 import {EventEmitter, Injectable} from '@angular/core';
// @ts-ignore
import crypto from "crypto";
import {ProviderService} from "./provider.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class HmacAuthService implements ProviderService<string> {

  private newHeaderEvent = new EventEmitter<string>();

  constructor(private httpClient: HttpClient) {
  }

  emit = <T> (info: T): T => {
    this.newHeaderEvent.emit(JSON.stringify(info))
    return info;
  }

  eventEmitter(): EventEmitter<string> {
    return this.newHeaderEvent;
  }

  getImage = (input: Map<string, string>): Observable<ArrayBuffer> => this.httpClient.get(`${input.get("path") || ""}/camera`, {
    headers: this.createCamera2HmacHeaders(input.get("method") || "", `${input.get("path") || ""}/camera`),
    responseType: 'arraybuffer'
  });


  createCamera2HmacHeaders = (method: string, path: string): Partial<any> => {
    const username = 'cameraUser2', secret = 'dragon', algorithm = 'hmac-sha256';
    const currentDateTimeUtc = new Date().toUTCString();
    const digestBodyHeader = `SHA-256=${crypto.createHash('sha256').digest('base64')}`;
    const signingString = `x-date: ${currentDateTimeUtc}\n${method} ${path} HTTP/1.1\ndigest: ${digestBodyHeader}`;
    const signature = crypto.createHmac('sha256', secret).update(signingString).digest('base64');
    const authorization = `hmac username="${username}", algorithm="${algorithm}", headers="x-date request-line digest", signature="${signature}"`;
    return {
      'Digest': digestBodyHeader,
      'Authorization': authorization,
      'X-Date': currentDateTimeUtc,
      'Content-Type': 'application/json',
    };
  }

  retrieveWelcomeMessage = (input: Map<string, string>): Observable<string> => this.httpClient.get(input.get("path") || "", {
    headers: this.emit(this.createCamera2HmacHeaders(input.get("method") || "", input.get("path") || "")),
    responseType: 'text'
  });
}
