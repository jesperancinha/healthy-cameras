import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsdComponent } from './statsd.component';

describe('StatsdComponent', () => {
  let component: StatsdComponent;
  let fixture: ComponentFixture<StatsdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
