import {Observable} from "rxjs";

export interface ProviderService<OUT> {
  retrieveCameraImageRequest(input: Map<string, string>): Observable<OUT>;
}
