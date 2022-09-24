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

  retrieveCameraImageRequest(input: Map<string, string>): Observable<string> {
    return this.httpClient.get(input.get("path") || "", {
      headers: {
        apiKey: input.get("key") || ""
      },
      responseType: 'text'
    })
  }
}
