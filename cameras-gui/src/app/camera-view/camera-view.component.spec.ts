import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraViewComponent } from './camera-view.component';
import {HttpClientModule} from "@angular/common/http";
import {CAMERAS_HEALTH_STATUS_URLS} from "../app.module";
import {MatCardModule} from "@angular/material/card";

describe('CameraViewComponent', () => {
  let component: CameraViewComponent<string>;
  let fixture: ComponentFixture<CameraViewComponent<string>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CameraViewComponent ],
      imports: [
        HttpClientModule,
        MatCardModule
      ],
      providers: [
        {
          provide: CAMERAS_HEALTH_STATUS_URLS,
          useValue: {
            cameras: []
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CameraViewComponent<string>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
