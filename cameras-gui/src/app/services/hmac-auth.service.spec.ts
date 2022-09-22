import { TestBed } from '@angular/core/testing';

import { HmacAuthService } from './hmac-auth.service';
import {HttpClientModule} from "@angular/common/http";

describe('HmacAuthService', () => {
  let service: HmacAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(HmacAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
