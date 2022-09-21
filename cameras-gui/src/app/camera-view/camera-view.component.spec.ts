import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraViewComponent } from './camera-view.component';

describe('CameraViewComponent', () => {
  let component: CameraViewComponent;
  let fixture: ComponentFixture<CameraViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CameraViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CameraViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
