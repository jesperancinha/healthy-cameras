import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProviderService} from "./provider.service";
import {Observable} from "rxjs/internal/Observable";

@Injectable({
  providedIn: 'root'
})
export class BasicAuthService implements ProviderService<string> {

  private newHeaderEvent = new EventEmitter<string>();

  constructor(private http: HttpClient) {

  }

  emit = <T> (info: T): T => {
    this.newHeaderEvent.emit(JSON.stringify(info))
    return info;
  }

  eventEmitter(): EventEmitter<string> {
    return this.newHeaderEvent;
  }

  getImage = (input: Map<string, string>): Observable<ArrayBuffer> => {
    const token = btoa(`${input.get("username")}:${input.get("password")}`)
    return this.http.get(`${input.get("path") || ""}/camera`, {
      headers: {
        'Accept': 'image/jpeg',
        'Authorization': `Basic ${token}`
      },
      responseType: 'arraybuffer'
    });
  }

  retrieveWelcomeMessage = (input: Map<string, string>) => {
    const token = btoa(`${input.get("username")}:${input.get("password")}`)
    const headers = {
      'Content-Type': 'application/text',
      'Authorization': `Basic ${token}`
    };
    this.eventEmitter().emit(JSON.stringify(headers))
    return this.http.get(input.get("path") || "", {
      headers: headers,
      responseType: 'text'
    });
  }
}
