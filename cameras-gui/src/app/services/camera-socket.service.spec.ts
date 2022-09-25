import { TestBed } from '@angular/core/testing';

import { CameraSocketService } from './camera-socket.service';

describe('CameraSocketService', () => {
  let service: CameraSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CameraSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
