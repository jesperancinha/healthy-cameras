import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ControlComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
