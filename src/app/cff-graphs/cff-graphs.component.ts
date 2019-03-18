import { MiniChartData } from './../mini-chart-data';
import { LineData } from './../line-chart-data';
import { Component, OnInit } from '@angular/core';
import { single, multi, pieSingle} from './../data';

@Component({
  selector: 'app-cff-graphs',
  templateUrl: './cff-graphs.component.html',
  styleUrls: ['./cff-graphs.component.css']
})
export class CffGraphsComponent implements OnInit {
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
  // barChart = {
  //   single: this.single,
  //   showXAxis: true,
  //   gradient: false,
  //   colorScheme: {
  //     domain: ['rgba(1, 136, 191, 1)', 'rgba(199, 234, 248, 1)']
  //   }
  // };

  lineData = LineData;
  pieCharts = [{...this.pieChart}];
  barChartData = MiniChartData;

  // barChartData.forEach(item => {
  //   const allTypeBarvalue = [
  //     {name: 'QTD', value: item.qtd, responses: item.qtdTotalResponses},
  //     {name: 'YTD', value: item.ytd, responses: item.ytdTotalResponses}
  //   ],

  //   if (item.type === 'StoreCFF') {
  //     const storedataqtd = [
  //       {Timeframe: 'QTD', value: item.qtd},
  //       {Timeframe: 'QTD_diff', value: item.qtdDiff}
  //     ];

  //     this.storedataytd = [
  //       {Timeframe: 'YTD', value: item.ytd},
  //       {Timeframe: 'YTD_diff', value: item.ytdDiff}
  //     ];
  //   }

  //   if (item.yoyScore > 0) {
  //     this.showArrowUpYtd = true;
  //   } else {
  //     this.showArrowUpYtd = false;
  //     item.yoyScore = Math.abs(item.yoyScore);
  //   }


  //   if (item.wowScore > 0)
  //     this.showArrowUpQtd = true;
  //   else {
  //     this.showArrowUpQtd = false;
  //     item.wowScore = Math.abs(item.wowScore);
  //   }

  // });


  constructor() {
  }

  ngOnInit() {
  }

  onSelect(event) {
    console.log(event);
  }

}
