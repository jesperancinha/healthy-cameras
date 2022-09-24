import { TestBed } from '@angular/core/testing';

import { LdapAuthService } from './ldap-auth.service';

describe('LdapAuthService', () => {
  let service: LdapAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LdapAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
