import { TestBed } from '@angular/core/testing';

import { LdapAuthService } from './ldap-auth.service';
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";

describe('LdapAuthService', () => {
  let service: LdapAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(LdapAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
