import {Component, Input, ElementRef, AfterViewInit, OnChanges} from '@angular/core';
import * as d3 from 'd3/index';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.scss']
})

export class LinechartComponent implements AfterViewInit, OnChanges {
  @Input() graphdata: Array<Object>;
  @Input() isWait
    ?: string;
  @Input() LinechartType: string;
  private data: any;
  private allData: any;
  protected width: number;
  protected height: number;
  private margin = {top: 5, right: 5, bottom: 5, left: 5};
  tooltipHtml = '';

  constructor() {
  }

  ngAfterViewInit() {

    setTimeout(() => {
    }, 1);
  }

  // Part of remodel changes assigning GOALS color
  scaleZ() {
    if (this.graphdata[0]['name'] === 'GOALS') {
      return d3.scaleOrdinal(['#32CD32', '#4DA1FF', '#9FE0FA']);
    } else {
      return d3.scaleOrdinal(['#4DA1FF', '#9FE0FA']);
    }
  }

  drawchart() {

    if (this.graphdata && this.graphdata.length === 0) {
      return;
    }
    let screenWidth;
    // Laxminarayan -- enable this back when remodel is going live - this piece of code shuffling data indices - need to check.
    // this.graphdata.splice(0, 0, this.graphdata.splice(this.graphdata.indexOf(e => {e.name == "GOALS"}))[0]);

    if (navigator.platform === 'iPhone' || navigator.platform === 'iPad') {
      screenWidth = window.innerWidth;
    } else {
      screenWidth = window.outerWidth;
    }
    // Filtering LY in UI instead oF WS for remodel related changes
    // Laxminarayan -- enable this back when remodel is going live
    // this.graphdata = this.graphdata.filter(x => !(x["name"] == "LY"));
    this.data = this.graphdata;
    this.allData = this.data;

    let newWidth = 575;

    let margin = {top: 25, right: 80, bottom: 40, left: 50};
    let dType = 'store';
    const level = this.data[0].name;

    if (window.location.href.includes('qpf')) {
      dType = 'pharmacy';
    }
    // Only for pharmacy
    if (dType === 'pharmacy') {

      if (screenWidth <= 1315) {
        margin = {top: 25, right: 80, bottom: 40, left: 80};
        newWidth = 450;
      }
      if (screenWidth <= 1130) {
        margin = {top: 25, right: 40, bottom: 40, left: 40};
        newWidth = 425;
      }
      if (screenWidth <= 1060) {
        margin = {top: 25, right: 40, bottom: 40, left: 40};
        newWidth = 270;
      }
      if (screenWidth <= 825) {
        margin = {top: 25, right: 40, bottom: 40, left: 40};
        newWidth = 245;
      }

      if (screenWidth <= 601) {
        margin = {top: 25, right: 40, bottom: 40, left: 40};
        newWidth = 270;
      }
      if (screenWidth <= 450) {
        margin = {top: 25, right: 40, bottom: 40, left: 40};
        newWidth = 180;
      }
    } else {
      // Non Pharmacy
      if (screenWidth <= 768) {
        margin = {top: 25, right: 40, bottom: 40, left: 40};
        newWidth = 425;
      }
    }

    const windowWidth = screenWidth - margin.left - margin.right;

    const width = windowWidth - margin.left - margin.right,
      height = 200 - margin.top - margin.bottom;

    const x = d3.scaleLinear().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);
    const z = this.scaleZ();

    const valueline = d3.line()
      .curve(d3.curveBasis)
      .defined(function (d: any) {
        return d.value != null;
      })
      .x((d: any) => {
        return x(d.name);
      })
      .y((d: any) => {
        return y(d.value);
      });

    const svg = d3.select('#newlinechart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + (margin.top + 5) + ')');

    const tooltip: any = d3.select('#tooltip');

    const xMin: any = d3.min(this.data, (c: any) => {
      return d3.min(c.series, (d: any) => {
        return d.name;
      });
    });

    x.domain([0, 52]);

    const yMin: any = d3.min(this.data, (c: any) => {
      return d3.min(c.series, (d: any) => {
        return d.value;
      });
    });

    const yMax: any = d3.max(this.data, (c: any) => {
      return d3.max(c.series, (d: any) => {
        return d.value;
      });
    });

    y.domain([yMin - 0.3, yMax + 0.3]);

    let xaxe = [4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52];
    const qvaxe = [
      {key: 'Q1', val: 13},
      {key: 'Q2', val: 26},
      {key: 'Q3', val: 39},
      {key: 'Q4', val: 52}];

    if (dType === 'pharmacy') {
      xaxe = [1, 13, 26, 39, 52];
    }
    const tickValuesForAxis = qvaxe.map(d => d.val);

    // This is for plotting the Quadrant Quarter Labels
    let count = -1;

    const xAxisBottom1 = d3.axisBottom(x).tickValues(xaxe);
    const xAxisBottom2 = d3.axisBottom(x).tickValues(tickValuesForAxis)
      .tickSizeOuter(0).tickSizeInner(-height).tickFormat(function (d: any) {
        count++;
        return qvaxe[count].key;
      }).tickPadding(-height - 15);

    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .style('font-size', '12px')
      .style('font-family', '\'Open Sans\', Semi-Bold')
      .style('color', 'grey')
      .call(xAxisBottom1);

    svg.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(0,' + height + ')')
      .style('font-size', '12px')
      .style('font-family', '\'Open Sans\', Bold')
      .style('color', 'grey')
      .call(xAxisBottom2);

    svg.append('g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(0,' + (height - 135) + ')')
      .style('font-size', '12px')
      .style('font-family', '\'Open Sans\', Semi-Bold')
      .style('color', 'grey')
      .call(d3.axisLeft(y).ticks(5));

    const ticks = d3.selectAll('.tick line');

    ticks.style('stroke', 'gray');

    svg.append('text')
      .attr('x', (width / 2) + 17)
      .attr('y', height + margin.bottom - 5)
      .style('text-anchor', 'middle')
      .style('font-family', '\'Open Sans\', Semi-Bold')
      .style('font-size', '0.9em')
      .text('WEEK');

    svg.append('text')
      .attr('x', (width / 2) + 300)
      .attr('y', height + margin.bottom - 3)
      .style('text-anchor', 'middle')
      .style('font-family', '\'Open Sans\', Semi-Bold')
      .style('font-size', '14px');


    let txt = 'SCORE';
    let scorex = -45;
    if (dType === 'pharmacy') {
      if (this.LinechartType === 'WAIT TIME') {
        txt = 'WAIT TIME (MIN)';
      } else if (window.location.href.includes('qpfMarket') ||
        window.location.href.includes('qpfRegion') ||
        window.location.href.includes('qpfDivision') ||
        window.location.href.includes('qpfGbu')) {
        txt = 'SATISFACTION';
      } else {
        txt = this.LinechartType.toUpperCase() + ' SCORE';
      }


      if (this.LinechartType === 'OVERALL SATISFACTION' && (level === 'Store')) {
        scorex = 25;
      } else {
        scorex = -20;
      }
    } else if (this.isWait && this.isWait.indexOf('WAIT TIME') > -1) {
      txt = 'WAIT TIME (MIN)';
      scorex = -10;
    }

    svg.append('g')
      .attr('class', 'axis axis--y')
      .style('transform', 'rotate(-90deg)')

      .append('text')
      .attr('class', 'axis-title')
      .attr('y', -30)
      .attr('x', scorex)

      .style('text-anchor', 'end')
      .style('font-family', '\'Open Sans\', Semi-Bold')
      .style('font-size', '0.9em')

      .text(txt);

    const defaultTooltip: any = [];

    this.allData.forEach(d => {


        const line = svg.append('g').attr('class', 'line');
        line.append('path')
          .datum(d.series)
          .attr('class', 'path')
          .attr('fill', 'none')


          .attr('stroke-width', 3.0)
          .style('stroke', function () {
            // Add the colours dynamically
            return d.color = z(d.name);
          })
          .attr('d', valueline(d.series));

      svg.selectAll('dot')
        .data(d.series.filter(function (d) {
          return d.value != null;
        }))
        .enter().append('circle')
        .attr('r', 6)
        .attr('cx', function (d: any) {
          return x(d.name);
        })
        .attr('cy', function (d: any) {
          return y(d.value);
        })

          .attr('stroke', function (d: any) {
            if (d.name === 13 || d.name === 26 || d.name === 39 || d.name === 52) {
              return 'white';
            } else {
              return 'none';
            }
          })
          .style('stroke-width', '5px')
          .style('opacity', '1')

          .style('fill', function (d: any) {
            if (d.name === 13 || d.name === 26 || d.name === 39 || d.name === 52) {
              return '#4DA1FF';
            } else {
              return 'none';
            }
          });


      }
    );


    d3.selectAll('path.domain')
      .style('stroke', '#e3e3e3');


    const legendRectSize = 13,
      legendSpacing = 4;
    let wid = 70;
    if (dType === 'pharmacy') {
      wid = 75;
    }

    const dt: Array<any> = [];

    // this.data =[{}]
    // name=goal = index
    // splice that object

    Object.assign(dt, this.data);


    const legend1 = svg.selectAll('.legend')
      .data(dt)
      .enter()
      .append('g')
      .attr('transform', function (d, i) {
        const height = legendRectSize + legendSpacing;
        let horz = width - 30 - (i * wid);
        // For single lines, manually setting up the legend location to ensure it stays within container
        if (i === 0 && dt.length === 1) {
          horz = width - 40;
        }
        const vert = height - 45;
        return 'translate(' + horz + ',' + vert + ')';
      });

    if (this.graphdata[0]['name'] === 'GOALS') {
      const colors = ['#32CD32', '#4DA1FF', '#9FE0FA'];
    } else {
      const colors = ['#4DA1FF', '#9FE0FA'];
    }

    // var texts = ['GOALS', 'QTD', 'TY'];


    if (dType === 'pharmacy' && level === 'Store') {

        legend1.append('rect')
          .attr('width', legendRectSize)
          .attr('height', legendRectSize)
          .attr('x', legendRectSize + legendSpacing - 70)
          .attr('y', legendRectSize - legendSpacing - 9)
          .style('fill', function (d, i) {
            return colors[i];
          })
          .style('stroke', function (d, i) {
            return colors[i];
          });


        legend1.append('text')
          .attr('class', 'legend')
          .attr('x', legendRectSize + legendSpacing - 50)
          .attr('y', legendRectSize - legendSpacing + 3)
          .style('font-weight', '400')
          .style('font-size', '15px')

          .text(function (d, i) {
            return d.name;
          });

    } else {
      legend1.append('rect')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .attr('x', legendRectSize + legendSpacing - 70)
        .attr('y', legendRectSize - legendSpacing - 9)
        .style('fill', function (d, i) {
          return colors[i];
        })
        .style('stroke', function (d, i) {
          return colors[i];
        });


      legend1.append('text')
        .attr('class', 'legend')
        .attr('x', legendRectSize + legendSpacing - 50)
        .attr('y', legendRectSize - legendSpacing + 3)
        .style('font-weight', '400')
        .style('font-size', '15px')

        .text(function (d) {
          return d.name;
        });
    }


    const mouseG = svg.append('g')
      .attr('class', 'mouse-over-effects');

    const legend = mouseG.append('g').attr('class', 'legend');
    const tooltipLine = legend.append('line')
      .attr('class', 'mouse-line')
      .style('stroke', 'black')
      .style('stroke-width', '1px')
      .style('opacity', '0');


    const mousePerLine = mouseG.selectAll('.mouse-per-line')
      .data(this.allData)
      .enter()
      .append('g')
      .attr('class', 'mouse-per-line');

    mousePerLine.append('circle')
      .attr('r', 6)
      .style('stroke', 'white')
      .style('fill', '#4DA1FF')
      .style('stroke-width', '5px')
      .style('opacity', '0');


    const tipBox: any = mouseG.append('svg:rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .on('mouseout', () => {
        d3.select('.mouse-line')
          .style('opacity', '0');
        d3.selectAll('.mouse-per-line circle')
          .style('opacity', '0');
        if (tooltip) {
          tooltip.style('display', 'none');
        }
      })
      .on('mouseover', () => {
        d3.select('.mouse-line')
          .style('opacity', '1');
        d3.selectAll('.mouse-per-line circle')
          .style('opacity', '1');
      })
      .on('mousemove', () => {
        const mouse = d3.mouse(d3.event.currentTarget);

        d3.selectAll('.mouse-per-line')
          .attr('transform', (d: any, i) => {
            const data = d.series;
            const x0 = x.invert(mouse[0]);
            const bisect = d3.bisector((d: any) => {
              return d.name;
            }).right;
            const j = bisect(data, x0);
            const d1 = data[j];
            if (d1) {
              let d0 = data[j - 1];

              if (!d0) { d0 = d1; }
              const d = x0 - d0.name > d1.name - x0 ? d1 : d0;


              d3.select('.mouse-line')
                .attr('x1', x(d.name))
                .attr('x2', x(d.name))
                .attr('y1', 0)
                .style('stroke', '#e3e3e3')
                .attr('y2', 0);

              return 'translate(' + x(d.name) + ',' +
                y(d.value) + ')';
            } else {
              return 'translate(-100,-100)';
            }


          });


        const date = Math.round((x.invert(d3.mouse(tipBox.node())[0])));


        // let tooltipHtml = "<div>Goal "+ this.toolTipObj.Goal +"<br> Week: " +this.toolTipObj.Week +"<br> QTD: " +this.toolTipObj.QTD +"<br> LY: " +this.toolTipObj.LY +"<br> LYResponses: " +this.toolTipObj.LYResponses
        // +"<br> TY: " +this.toolTipObj.TY+"<br> TYResponses: " +this.toolTipObj.TYResponses;


        let flagLoop = true;
        tooltip.html('')
          .style('width', '180px')
          .style('opacity', 1)
          // Fix for week 51 & above tooltip going out of screen
          .style(
            'left',
            () => {
              if (date > 39) {
                return x(date) - 150 + 'px';
              } else {
                return x(date) + 60 + 'px';
              }
            })

          .style('top', height / 2 + 'px')
          .style('display', 'block')
          .selectAll()
          .data(this.allData).enter()
          .append('div')
          .style('display', (d) => {
            if (d.isGoal) {
              return 'none';
            } else {
              return 'block';
            }
          })
          .style('color', 'black')
          .style('background', 'white')
          .style('box-shadow', '0px 3px 6px grey')
          .style('font-family', '\'Open Sans\', Semi-Bold')
          .style('font-size', '12px')
          .html(
            d => {
              if (d) {
                const val = d.series.find(h => h.name === date);
                if (val && val.remodelToolTip && flagLoop) {
                  this.remodelToolTip(date);
                  flagLoop = false;
                  return this.tooltipHtml;
                } else if (val && !val.remodelToolTip) {
                  let respon: any;
                if ((val && val.value && this.isWait && this.isWait.includes('WAIT') ) || (this.LinechartType === 'WAIT TIME' && val)) {
                  return '<div style=\'padding:10px 15px\'>WEEK : ' + val.name + '<br>' + d.name + ' : ' + val.value.toString().replace('.', ':') + '<br> No of Responses : ' + val.responses + '</div>';
                } else if (val && val.value) {
                  return '<div style=\'padding:10px 15px\'>WEEK : ' + val.name + '<br>' + d.name + ' : ' + val.value + '<br> No of Responses : ' + val.responses + '</div>';
                }
                }
              }
            }
          );


      });
  }

  remodelToolTip(currentWeek) {
    let msg = '<div>';
    this.allData.forEach((d) =>
      d.series.forEach((e) => {
          if (e.name === currentWeek && d.name === 'TY') {
            msg += 'TY: ' + e.value;
            msg += '<br>TY Responses: ' + e.responses + '<br>';
          }

          if (e.name === currentWeek && d.name === 'GOALS') {
            msg += 'Week: ' + e.name;
            msg += '<br>Goal: ' + e.value + '<br>';
          }


          if (e.name === currentWeek && d.name === 'QTD') {
            msg += 'QTD: ' + e.value + '<br>';
          }

          // let tooltipHtml = "<div>Goal "+ this.toolTipObj.Goal +"<br> Week: " +this.toolTipObj.Week +"<br> QTD: " +this.toolTipObj.QTD+ "<br> TY: " +this.toolTipObj.TY+"<br> TYResponses: " +this.toolTipObj.TYResponses;
          this.tooltipHtml = msg + '</div>';
        }
      )
    );
  }

  ngOnChanges() {
    if (this.graphdata) {
      d3.select('#newlinechart svg').remove();
      this.drawchart();

    }

  }

  onResize(event) {
    if (this.graphdata) {
      d3.select('#newlinechart').select('svg').remove();
      this.drawchart();
    }


  }

}
