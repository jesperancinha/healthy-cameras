import {Observable} from "rxjs";

export interface ProviderService<IN, OUT> {
  findCameraBasicAuthMessage(input :IN | undefined): Observable<OUT>;
}
