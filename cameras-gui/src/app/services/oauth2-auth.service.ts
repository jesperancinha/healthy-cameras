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
    `username=${input.get("username")}&password=${input.get("password")}`,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
    .pipe(flatMap((response => this.httpClient.get(input.get("path") || "", {
        headers: {
          'Content-Type': 'application/text',
          'Authorization': `Bearer ${response.access_token}`,
        },
        responseType: 'text'
      })
    )));
}

