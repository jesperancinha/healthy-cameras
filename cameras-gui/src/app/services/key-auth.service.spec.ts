import { TestBed } from '@angular/core/testing';

import { KeyAuthService } from './key-auth.service';

describe('KeyAuthService', () => {
  let service: KeyAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeyAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
