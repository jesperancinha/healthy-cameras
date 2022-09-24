import {Injectable} from '@angular/core';
import {ProviderService} from "./provider.service";
import {Observable} from "rxjs/internal/Observable";
import {HttpClient} from "@angular/common/http";
import {flatMap} from "rxjs";
import {ResponseToken} from "./domain/response.token";

@Injectable({
  providedIn: 'root'
})
export class Oauth2AuthService implements ProviderService<string> {

  constructor(private httpClient: HttpClient) {
  }

  retrieveWelcomeMessage(input: Map<string, string>): Observable<string> {
    const token = btoa(`${input.get("username")}:${input.get("password")}`)
    return this.httpClient.get<ResponseToken>(input.get("pathOauth2") || "", {
      headers: {
        'Content-Type': 'application/text',
        'Authorization': `Basic ${token}`
      },
      responseType: 'json'
    }).pipe(flatMap(response => {
      return this.httpClient.get(input.get("path") || "", {
        headers: {
          'Content-Type': 'application/text',
          'Authorization': `Bearer ${response.access_token}`,
        },
        responseType: 'text'
      });
    }))
  }
}

