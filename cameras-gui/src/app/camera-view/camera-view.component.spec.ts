import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraViewComponent } from './camera-view.component';
import {HttpClientModule} from "@angular/common/http";

describe('CameraViewComponent', () => {
  let component: CameraViewComponent<string>;
  let fixture: ComponentFixture<CameraViewComponent<string>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CameraViewComponent ],
      imports: [
        HttpClientModule
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
