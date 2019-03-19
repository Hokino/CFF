import { LineChartData } from './../line-chart-data';
import { Component, OnInit } from '@angular/core';
import { single, multi, pieSingle} from './../data';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  pieSingle = [...pieSingle];
  single = [...single];

  numberStores = pieSingle[0].value;
  designatedTotal = 4679;

  pieChart = {
    name: '',
    single: this.pieSingle,
    showXAxis: true,
    showYAxis: true,
    gradient: false,
    showLegend: true,
    showXAxisLabel: true,
    xAxisLabel: 'Country',
    showYAxisLabel: true,
    yAxisLabel: 'Population',
    designatedTotal: this.designatedTotal,
    colorScheme: {
      domain: ['rgba(1, 136, 191, 1)', 'rgba(199, 234, 248, 1)']
    }
  };
  graphNames = ['CLEAN', 'FAST', 'FRIENDLY', 'AVAILABLITY', 'PRICE', 'PRODUCT QUALITY'];
  barChart = {
    single: this.single,
    showXAxis: true,
    gradient: false,
    colorScheme: {
      domain: ['rgba(1, 136, 191, 1)', 'rgba(199, 234, 248, 1)']
    }
  };

  lineChartData = LineChartData;
  pieCharts = [{...this.pieChart}];
  barCharts = [{...this.barChart}, {...this.barChart}, {...this.barChart}, {...this.barChart}, {...this.barChart}, {...this.barChart}];


  constructor() {
  }

  ngOnInit() {
  }

  onSelect(event) {
    console.log(event);
  }

}
