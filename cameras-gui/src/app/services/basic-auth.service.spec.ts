import {TestBed} from '@angular/core/testing';

import {BasicAuthService} from './basic-auth.service';
import {HttpClientModule} from "@angular/common/http";

describe('BasicAuthService', () => {
  let service: BasicAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(BasicAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
