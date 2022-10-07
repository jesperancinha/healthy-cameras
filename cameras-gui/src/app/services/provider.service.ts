import {Observable} from "rxjs";
import {EventEmitter} from "@angular/core";

export interface ProviderService<OUT> {

  retrieveWelcomeMessage(input: Map<string, string>): Observable<OUT>;

  getImage(input: Map<string, string>): Observable<ArrayBuffer>

  emit<T extends Object>(info: T): T

  eventEmitter(): EventEmitter<string>
}
