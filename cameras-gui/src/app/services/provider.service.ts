import {Observable} from "rxjs";

export interface ProviderService<OUT> {
  retrieveWelcomeMessage(input: Map<string, string>): Observable<OUT>;
}
