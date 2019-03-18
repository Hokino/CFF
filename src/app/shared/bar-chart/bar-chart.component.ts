import { Component, OnInit, Input } from '@angular/core';
import { single } from '../../data';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  @Input() bar;
  colorScheme = {};
  single = single;
  constructor() { }

  ngOnInit() {
    this.colorScheme = this.bar.colorScheme;
  }

}
