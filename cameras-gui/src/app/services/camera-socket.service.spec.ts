import { TestBed } from '@angular/core/testing';

import { CameraSocketService } from './camera-socket.service';
import {CAMERAS_HEALTH_STATUS_URLS} from "../app.module";

describe('CameraSocketService', () => {
  let service: CameraSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CAMERAS_HEALTH_STATUS_URLS,
          useValue: {
            cameras: []
          }
        }
      ]
    });
    service = TestBed.inject(CameraSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
