import { TestBed } from '@angular/core/testing';

import { JwtAuthService } from './jwt-auth.service';
import {HttpClientModule} from "@angular/common/http";

describe('JwtAuthService', () => {
  let service: JwtAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(JwtAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
