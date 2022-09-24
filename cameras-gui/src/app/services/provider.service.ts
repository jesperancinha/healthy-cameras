import {Observable} from "rxjs";

export interface ProviderService<OUT> {
  findCameraBasicAuthMessage(input: Map<string, string>): Observable<OUT>;
}
