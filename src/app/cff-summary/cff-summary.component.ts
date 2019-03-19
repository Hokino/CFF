import { ChartsService } from './../charts.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cff-summary',
  templateUrl: './cff-summary.component.html',
  styleUrls: ['./cff-summary.component.css']
})
export class CffSummaryComponent implements OnInit {

  qtdSelected = true;
  lineChartData = [];
  pieCharts = [];
  barCharts = [];
  pieChartColors = ['multi', 'blue', 'red', 'green'];
  pieChartNames = ['COMBINED CFF', 'STORE', 'PICKUP', 'OGP'];

  constructor(
    private chartsService: ChartsService,
  ) { }

  ngOnInit() {
    this.pieCharts = this.chartsService.getStaticPieChartMultipleData();
  }

  onQtdSelectedChange(event: boolean) {
    this.qtdSelected = event;
  }

  onSelect(event) {
    console.log(event);
  }

}
