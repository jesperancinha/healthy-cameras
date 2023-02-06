import { TestBed } from '@angular/core/testing';

import { LdapAuthService } from './ldap-auth.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('LdapAuthService', () => {
  let service: LdapAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(LdapAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
