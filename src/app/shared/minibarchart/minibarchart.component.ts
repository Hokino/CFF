import {Component, NgModule, Input} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {multi} from './minibarchartdata_model';

export interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

@Component({
  selector: 'app-minibarchart',
  templateUrl: './minibarchart.component.html',
  styleUrls: ['./minibarchart.component.scss']
})
export class MinibarchartComponent {

  @Input() graphdata: Array<Object>;

  single: any[];
  multi: any[];
  view: any[] = [125, 110];
  No_of_response: any;


  // options
  showXAxis = true;
  showYAxis = false;
  gradient = false;
  showLegend = false;
  padding = 30;
  roundEdges = false;
  tooltipDisabled = true;
  yScaleMax = 10;
  colorScheme = {
    domain: ['rgba(1, 136, 191, 1)', 'rgba(199, 234, 248, 1)']
  };


  constructor() {
    Object.assign(this, {multi})

  }

  onSelect(event) {
    console.log(event);
  }

  ngAfterViewInit() {
    if (this.graphdata) {
      let data: Array<any> = [];
      data = this.graphdata
      if (data[0].value > 10 || data[1].value > 10) {
        this.yScaleMax = 100;
      }

      this.No_of_response = this.graphdata;


    }
  }

}
