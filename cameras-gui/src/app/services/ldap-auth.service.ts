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

  retrieveWelcomeMessage = (input: Map<string, string>): Observable<string> => this.httpClient.get(input.get("path") || "", {
    headers: {
      "Authorization": `ldap ${(this.getCredentials(input))}`
    },
    responseType: 'text'
  })


  private getCredentials(input: Map<string, string>) {
    return btoa(`${input.get("username")}:${input.get("password")}`);
  }

  getImage = (input: Map<string, string>): Observable<ArrayBuffer> =>
    this.httpClient.get(`${input.get("path") || ""}/camera`, {
      headers: {
        "Authorization": `ldap ${this.getCredentials(input)}`
      },
      responseType: 'arraybuffer'
    });
}
