import {TestBed} from '@angular/core/testing';

import {KeyAuthService} from './key-auth.service';
import {HttpClientModule} from "@angular/common/http";

describe('KeyAuthService', () => {
  let service: KeyAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(KeyAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
