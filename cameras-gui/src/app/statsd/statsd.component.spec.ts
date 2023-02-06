import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsdComponent } from './statsd.component';
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatCardModule} from "@angular/material/card";
import {FormsModule} from "@angular/forms";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('StatsdComponent', () => {
  let component: StatsdComponent;
  let fixture: ComponentFixture<StatsdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatOptionModule,
        MatSelectModule,
        FormsModule,
        NoopAnimationsModule
      ],
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
