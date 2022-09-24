import {Injectable} from '@angular/core';
import {ProviderService} from "./provider.service";
import {Observable} from "rxjs/internal/Observable";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LdapAuthService implements ProviderService<string> {

  constructor(private httpClient: HttpClient) {
  }

  retrieveWelcomeMessage(input: Map<string, string>): Observable<string> {
    const credentials = btoa(`${input.get("username")}:${input.get("password")}`);
    return this.httpClient.get(input.get("path") || "", {
      headers: {
        "Authorization": `ldap ${credentials}`
      },
      responseType: 'text'
    })
  }
}
