import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OverviewComponent} from './overview.component';
import {HttpClientModule} from "@angular/common/http";
import {CAMERAS_HEALTH_STATUS_URLS} from "../app.module";
import {MatCardModule} from "@angular/material/card";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverviewComponent],
      imports: [
        HttpClientModule,
        MatCardModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
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
    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
