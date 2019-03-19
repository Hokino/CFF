import { ChartsService } from '../charts.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cff-details',
  templateUrl: './cff-details.component.html',
  styleUrls: ['./cff-details.component.css']
})
export class CffDetailsComponent implements OnInit {

  qtdSelected = true;
  lineChartData = [];
  pieCharts = [];
  barCharts = [];

  constructor(
    private chartsService: ChartsService
  ) { }

  ngOnInit() {
    this.barCharts = this.chartsService.getStaticMiniChartData();
    this.pieCharts = this.chartsService.getStaticPieChartSingleData();
    this.lineChartData = this.chartsService.getStaticLineChartData();
  }

  onQtdSelectedChange(event: boolean) {
    this.qtdSelected = event;
  }

  onSelect(event) {
    console.log(event);
  }

}
