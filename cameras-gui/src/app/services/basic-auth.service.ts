import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProviderService} from "./provider.service";
import {Observable} from "rxjs/internal/Observable";

@Injectable({
  providedIn: 'root'
})
export class BasicAuthService implements ProviderService<string> {

  constructor(private http: HttpClient) {

  }

  retrieveWelcomeMessage = (input: Map<string, string>) => {
    const token = btoa(`${input.get("username")}:${input.get("password")}`)
    return this.http.get(input.get("path") || "", {
      headers: {
        'Content-Type': 'application/text',
        'Authorization': `Basic ${token}`
      },
      responseType: 'text'
    });
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
}
