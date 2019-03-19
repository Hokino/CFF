import { PieChartMultipleData } from './pie-chart-data-multiple';
import { OnInit } from '@angular/core';
import { PieChartSingleData } from './pie-chart-data-single';
import { MiniChartData } from './mini-chart-data';
import { LineChartData } from './line-chart-data';

export class ChartsService implements OnInit {

  constructor() {
    this.pieChartSingleArray =  this.initializeStaticPieChartData([...this.pieChartSingleData]);
    this.pieChartMultipleArray = this.initializeStaticPieChartData([...this.pieChartMultipleData]);
    this.miniChartArray = this.intializeStaticMiniChartData([...this.miniChartData]);
  }

  private pieChartSingleData = [...PieChartSingleData];
  private miniChartData = [...MiniChartData];
  private lineChartData = [...LineChartData];
  private pieChartMultipleData = [...PieChartMultipleData];

  private miniChartArray = [];
  private pieChartSingleArray = [];
  private pieChartMultipleArray = [];

  ngOnInit() {
  }

  intializeStaticMiniChartData(miniData) {
    const miniChartArray = [];
    miniData.forEach(item => {
      const allTypeBarvalue = [
        {name: 'QTD', value: item.qtd, responses: item.qtdTotalResponses},
        {name: 'YTD', value: item.ytd, responses: item.ytdTotalResponses}
      ];
      const miniChartItem = item;
      if (miniChartItem.yoyScore > 0) {
        miniChartItem.showArrowUpYtd = true;
      } else {
        miniChartItem.showArrowUpYtd = false;
      }
      if (item.wowScore > 0) {
        miniChartItem.showArrowUpQtd = true;
      } else {
        miniChartItem.showArrowUpQtd = false;
      }
      miniChartItem.allTypeBarvalue = allTypeBarvalue;
      miniChartArray.push(miniChartItem);
    });
    return miniChartArray;
  }

  initializeStaticPieChartData(pieData) {
    const pieChartArray = [];
    pieData.forEach(item => {
      const idValue = 'svg' + item.type.split('')[1];
      const pieChartItem = item;
      const allTypeqtd = [
        {
          Timeframe: 'QTD',
          value: item.qtd,
          goal: item.qtdGoalAttainment,
          response: item.qtdTotalResponses,
          noOfStores: item.qtdNumberOfStores,
          rank: item.qtdTargetStores,
          combinoOfStores: item.qtdTotalStores,
          arcTimeframe: 'QTD'
        },
        {Timeframe: 'QTD_diff', value: item.qtdDiff}
      ];
      const allTypeytd = [
        {
          Timeframe: 'YTD',
          value: item.ytd,
          goal: item.ytdGoalAttainment,
          response: item.ytdTotalResponses,
          noOfStores: item.ytdNumberOfStores,
          rank: item.ytdTargetStores,
          combinoOfStores: item.ytdTotalStores
        },
        {Timeframe: 'YTD_diff', value: item.ytdDiff}
      ];

      // if (Object.prototype.hasOwnProperty.call(item, 'avgQpfytd') && Object.prototype.hasOwnProperty.call(item, 'avgQpfqtd')) {
      //   allTypeytd[0]['avgQpfytd'] = item.avgQpfytd;
      //   allTypeqtd[0]['avgQpfqtd'] = item.avgQpfqtd;
      // }

      if (pieChartItem.yoyScore >= 0) {
        pieChartItem.showArrowUpYtd = true;
      } else {
        pieChartItem.showArrowUpYtd = false;
        pieChartItem.yoyScore = Math.abs(item.yoyScore);
      }

      if (pieChartItem.wowScore >= 0) {
        pieChartItem.showArrowUpQtd = true;
      } else {
        pieChartItem.showArrowUpQtd = false;
        pieChartItem.wowScore = Math.abs(item.wowScore);
      }

      // if (pieChartItem.type === 'COMBINEDCFF') {
      //   pieChartItem.ytd += '%';
      //   pieChartItem.qtd += '%';
      // }

      pieChartItem.allTypeytd = allTypeytd;
      pieChartItem.allTypeqtd = allTypeqtd;
      pieChartItem.idValue = idValue;
      pieChartItem.donuttype = 'gbu';
      pieChartItem.gbutype = 'QTD';

      pieChartArray.push(pieChartItem);
    });
    return pieChartArray;
  }

  getStaticLineChartData() {
    return [...this.lineChartData];
  }

  getStaticMiniChartData() {
    return [...this.miniChartArray];
  }

  getStaticPieChartSingleData() {
    return [...this.pieChartSingleArray];
  }

  getStaticPieChartMultipleData() {
    return [...this.pieChartMultipleArray];
  }

}
