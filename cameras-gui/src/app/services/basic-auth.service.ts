import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProviderService} from "./provider.service";
import {Credential} from "./domain/credential";

@Injectable({
  providedIn: 'root'
})
export class BasicAuthService implements ProviderService<string> {

  constructor(private http: HttpClient) {

  }

  retrieveWelcomeMessage(credential: Map<string, string>) {
    const token = btoa(`${credential.get("username")}:${credential.get("password")}`)
    return this.http.get(credential.get("path") || "", {
      headers: {
        'Content-Type': 'application/text',
        'Authorization': `Basic ${token}`
      },
      responseType: 'text'
    });
  }
}
