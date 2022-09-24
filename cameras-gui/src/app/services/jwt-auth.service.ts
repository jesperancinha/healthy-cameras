import {Injectable} from '@angular/core';
import {ProviderService} from "./provider.service";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class JwtAuthService implements ProviderService<string, string> {

  constructor(private httpClient: HttpClient) {
  }

  findCameraBasicAuthMessage(input: string): Observable<string> {
    return this.httpClient.get("", {
      responseType: 'text'
    });
  }
}
