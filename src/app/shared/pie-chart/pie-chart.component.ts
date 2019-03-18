import { Component, OnInit, Input } from '@angular/core';
import { pieSingle } from '../../data';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  @Input() pieChart;

  colorScheme = {};
  constructor() { }

  ngOnInit() {
    console.log('in piechart, this.piechart', this.pieChart);
  }
}
