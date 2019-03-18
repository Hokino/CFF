export class BarChart1 {
  single: any[];
  showXAxis: boolean;
  showYAxis: boolean;
  gradient: boolean;
  showLegend: boolean;
  showXAxisLabel: boolean;
  xAxisLabel: string;
  showYAxisLabel: boolean;
  yAxisLabel: string;
  colorScheme: {
    domain: string[];
  };

  constructor (single, showXAxis = true, showYAxis = true, gradient = false, showLegend = true,
    showXAxisLabel = true, xAxisLabel = 'Country', showYAxisLabel = true, yAxisLabel = 'Population',
    colorScheme = {
      domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    }) {
    this.single = single;
    this.showXAxis = showXAxis;
    this.showYAxis = showYAxis;
    this.gradient = gradient;
    this.showLegend = showLegend;
    this.showXAxisLabel = showXAxisLabel;
    this.xAxisLabel = xAxisLabel;
    this.showYAxisLabel = showYAxisLabel;
    this.yAxisLabel = yAxisLabel;
    this.colorScheme = colorScheme;
  }
}
