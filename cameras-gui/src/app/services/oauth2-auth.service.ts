import {EventEmitter, Injectable} from '@angular/core';
import {ProviderService} from "./provider.service";
import {Observable} from "rxjs/internal/Observable";
import {HttpClient} from "@angular/common/http";
import {flatMap} from "rxjs";
import {ResponseToken} from "./domain/response.token";

@Injectable({
  providedIn: 'root'
})
export class Oauth2AuthService implements ProviderService<string> {

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

  getImage = (input: Map<string, string>): Observable<ArrayBuffer> => this.httpClient.post<ResponseToken>(input.get("pathAuth") || "",
    `username=${input.get("username")}&password=${input.get("password")}`,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
    .pipe(flatMap((response => this.httpClient.get(`${input.get("path") || ""}/camera`, {
        headers: {
          'Content-Type': 'application/text',
          'Authorization': `Bearer ${response.access_token}`,
        },
        responseType: 'arraybuffer'
      })
    )));

  retrieveWelcomeMessage = (input: Map<string, string>): Observable<string> => this.httpClient.post<ResponseToken>(input.get("pathAuth") || "",
    this.emit(`username=${input.get("username")}&password=${input.get("password")}`),
    {
      headers: this.emit({
        "Content-Type": "application/x-www-form-urlencoded"
      })
    })
    .pipe(flatMap((response => this.httpClient.get(input.get("path") || "", {
        headers: this.emit({
          'Content-Type': 'application/text',
          'Authorization': `Bearer ${response.access_token}`,
        }),
        responseType: 'text'
      })
    )));
}

