import {EventEmitter, Injectable} from '@angular/core';
import {ProviderService} from "./provider.service";
import {Observable} from "rxjs/internal/Observable";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class KeyAuthService implements ProviderService<string> {

  private newHeaderEvent = new EventEmitter<string>();

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
      headers: {
        apiKey: input.get("key") || ""
      },
      responseType: 'arraybuffer'
    });

  retrieveWelcomeMessage(input: Map<string, string>): Observable<string> {
    return this.httpClient.get(input.get("path") || "", {
      headers: this.emit({
        apiKey: input.get("key") || ""
      }),
      responseType: 'text'
    })
  }
}
