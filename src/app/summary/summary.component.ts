import { Component, OnInit } from '@angular/core';
import { single, multi, pieSingle} from './../data';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  pieSingle = [...pieSingle];


  numberStores = pieSingle[0].value;
  designatedTotal = 4679;

  pieChart = {
    single: this.pieSingle,
    showXAxis: true,
    showYAxis: true,
    gradient: false,
    showLegend: true,
    showXAxisLabel: true,
    xAxisLabel: 'Country',
    showYAxisLabel: true,
    designatedTotal: this.designatedTotal,
    yAxisLabel: 'Population',
    colorScheme: {
      domain: ['#5AA454']
    }
  };

  pieChartNames = ['COMBINED CFF', 'STORE', 'PICKUP', 'OGP'];
  pieChartColors = ['multi', 'blue', 'red', 'green'];

  pieCharts = [{...this.pieChart}, {...this.pieChart}, {...this.pieChart}, {...this.pieChart}];

  constructor() {
    Object.assign(this, { single, multi, pieSingle });
  }

  ngOnInit() {
  }

}
