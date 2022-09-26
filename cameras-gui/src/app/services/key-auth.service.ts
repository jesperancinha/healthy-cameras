import {Injectable} from '@angular/core';
import {ProviderService} from "./provider.service";
import {Observable} from "rxjs/internal/Observable";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class KeyAuthService implements ProviderService<string> {

  constructor(private httpClient: HttpClient) {
  }

  retrieveWelcomeMessage(input: Map<string, string>): Observable<string> {
    return this.httpClient.get(input.get("path") || "", {
      headers: {
        apiKey: input.get("key") || ""
      },
      responseType: 'text'
    })
  }

  getImage = (input: Map<string, string>): Observable<ArrayBuffer> =>
    this.httpClient.get(`${input.get("path") || ""}/camera`, {
      headers: {
        apiKey: input.get("key") || ""
      },
      responseType: 'arraybuffer'
    });
}
