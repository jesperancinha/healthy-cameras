import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-statsd',
  templateUrl: './statsd.component.html',
  styleUrls: ['./statsd.component.scss']
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
