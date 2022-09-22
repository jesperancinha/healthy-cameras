import { TestBed } from '@angular/core/testing';

import { HmacAuthService } from './hmac-auth.service';

describe('HmacAuthService', () => {
  let service: HmacAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HmacAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
