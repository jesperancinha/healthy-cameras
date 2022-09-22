import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProviderService} from "./provider.service";

@Injectable({
  providedIn: 'root'
})
export class BasicAuthService implements ProviderService {

  constructor(private http: HttpClient) {

  }

  findCameraBasicAuthMessage(username: string, password: string) {
    const token = btoa(`${username}:${password}`)
    return this.http.get("/camera-1-service/api/v1/hc", {
      headers: {
        'Content-Type': 'application/text',
        'Authorization': `Basic ${token}`
      },
      responseType: 'text'
    });
  }
}
