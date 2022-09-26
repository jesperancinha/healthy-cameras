import {Observable} from "rxjs";

export interface ProviderService<OUT> {
  retrieveWelcomeMessage(input: Map<string, string>): Observable<OUT>;

  getImage(input: Map<string, string>): Observable<ArrayBuffer>
}
