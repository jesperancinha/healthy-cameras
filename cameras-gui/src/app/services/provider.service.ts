import {Observable} from "rxjs";

export interface ProviderService {

  findCameraBasicAuthMessage(username: string, password: string): Observable<string>;

}
