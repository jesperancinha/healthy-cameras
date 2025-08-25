import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-statsd',
  templateUrl: './statsd.component.html',
  styleUrls: ['./statsd.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatSelectModule],
})
export class StatsdComponent implements OnInit {
  minuteRanges = [1].concat([...Array.from(Array(12).keys()).map(x => x * 5 + 5)]);

  public minRange: number = 10;
  timestamp: string = Date.now().toString();

  constructor() {
  }

  ngOnInit(): void {
  }

  refresh() {
    this.timestamp = Date.now().toString();
  }
}
