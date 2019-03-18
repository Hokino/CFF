import {Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation} from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';


@Component({
  selector: 'app-bar-chart',
  templateUrl: './doughnut.component.html',
  styleUrls: ['./doughnut.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class DoughnutComponent implements OnInit {
  @Input() id: string;
  @Input() graphdata: Array<Object>;
  @Input() graphdata1: Array<Object>;
  @Input() type: string;
  @Input() donuttype: string;
  @Input() timeframe: string;
  @Input() toola: string;
  @Input() isQpf?: boolean;
  newwidth: number;
  newheight: number;
  private svgContainer: any;
  private svg: any;
  private radius: number;
  private arc: any;
  private pie: any;
  private color: any;
  private g: any;
  private div: any;
  private path: any;
  private legendItemSize: number = 12;
  private legendSpacing: number = 4;
  private legendItemSize1: number = 13;
  private legendSpacing1: number = 4;
  public perc: any;
  private hoveredStore: String = "";


  constructor() {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {

    setTimeout(() => {
      this.initSvg3(this.graphdata);
      this.drawChart3(this.graphdata);
      this.initSvg(this.graphdata);
      this.drawChart(this.graphdata, this.graphdata1);
      this.initSvg2(this.graphdata1);
      this.drawChart2(this.graphdata1);

    }, 1);

  }

  //Detect pharmacy donut in store dashbaords
  checkQpf() {
    if (this.isQpf == true) {
      return true;
    } else {
      return false;
    }
  }

  //Detect donut inside pharmacy dashbaords
  chkQpf() {
    if (window.location.href.indexOf('qpf') > -1) {
      return true;
    } else {
      return false;
    }
  }

  private initSvg3(data: any[]) {

    this.toola ? null : this.toola = "left";

    if (this.type == "STORE QPF") {
      this.type = "PHARMACY"
    }
    if (this.type == "MARKET QPF") {
      this.type = "PHARMACYmarket"
      this.donuttype = "Market"
    }
    if (this.type == "REGION QPF") {
      this.type = "PHARMACYregion"
      this.donuttype = "Region"
    }
    if (this.type == "DIVISION QPF") {
      this.type = "PHARMACYdivision"
      this.donuttype = "Division"
    }
    if (this.type == "GBU QPF") {
      this.type = "PHARMACYgbu"
      this.donuttype = "GBU"
    }

    var rng;
    if (data[0].Timeframe == "QTD") {
      rng = data[0].value;
    }
    if (this.type == "COMBINED CFF" || this.type == "PHARMACYmarket" || this.type == "PHARMACYregion" || this.type == "PHARMACYdivision" || this.type == "PHARMACYgbu") {
      this.newwidth = 250;
      this.newheight = 210;
    }
    else {
      this.newwidth = 240;
      this.newheight = 190;
    }


    this.radius = Math.min(this.newwidth, this.newheight) / 2;


    this.arc = d3Shape.arc()
      .outerRadius(this.radius - 21)
      .innerRadius(this.radius - 28)

    this.pie = d3Shape.pie()
      .sort(null)
      .value((d: any) => d.value);

    var colr
    var rng


    this.color = d3Scale.scaleOrdinal()
      .range(["DFE2EA"]);

    this.svgContainer = d3.select("#" + this.id)
      .append("svg");

    this.svg = this.svgContainer
      .append("g")
      .attr("transform", "translate(" + this.newwidth / 2 + "," + this.newheight / 2 + ")");

  }


  private drawChart3(data: any[]) {
    let tempdt: any[] =
      [
        {
          "value": 10
        }
      ]


    let g = this.svg.selectAll(".arc")
      .data(this.pie(tempdt))
      .enter().append("g")
      .attr("class", "arc");
    g.append("path")
      .attr("d", this.arc)
      .style("fill", d => this.color(d.data.value));
  }

  private initSvg(data: any[]) {

    if (this.type == "GREET" || this.type == "HELP" || this.type == "THANK") {
      this.donuttype = "GHT"
    }

    var rng;
    if (data[0].Timeframe == "QTD") {
      rng = data[0].value;
    }

    if (this.type == "COMBINED CFF" || this.type == "PHARMACYmarket" || this.type == "PHARMACYregion" || this.type == "PHARMACYdivision" || this.type == "PHARMACYgbu") {
      this.newwidth = 250;
      this.newheight = 210;
    }
    else {
      this.newwidth = 240;
      this.newheight = 190;
    }

    this.radius = Math.min(this.newwidth, this.newheight) / 2;
    this.arc = d3Shape.arc()
      .outerRadius(this.radius - 20)
      .innerRadius(this.radius - 30)
      .cornerRadius(5);
    this.pie = d3Shape.pie()
      .sort(null)
      .value((d: any) => d.value);
    var colr
    var rng


    if (data[0].Timeframe == "QTD") {
      rng = data[0].goal;
    }

    if (this.donuttype == "store") {

      if (rng >= 100) {
        colr = "#5C9A1B"
      }
      else {
        if (rng >= 97.5)
        {
          colr = "#F38216"
        }
        else {
          colr = "F03364"
        }
      }

    }
    else {
      colr = "#00A8ED"
    }


    this.color = d3Scale.scaleOrdinal()
      .range([colr, "rgba(223, 226, 234,0)"]);
    this.svg = this.svgContainer
      .attr("width", 210)
      .attr("height", 190)
      .append("g")
      .attr("transform", "translate(" + this.newwidth / 2 + "," + this.newheight / 2 + ")");

  }


  private drawChart(data: any[], data2: any[]) {
    let belowRange: any[] = [
      {Timeframe: 'QTD', value: 0},
      {Timeframe: 'QTD_diff', value: 10},
    ];
    let inputData: any = data;
    if (this.donuttype == "store") {
      if (parseFloat(data[0] && data[0].response && data[0].response.replace(/,/g, '')) > 9) {
        inputData = data
      }
      else {
        inputData = belowRange
      }
    }

    let g = this.svg.selectAll(".arc")
      .data(this.pie(inputData))
      .enter().append("g")
      .attr("class", "arc")

      .on("mouseover", (d) => {
        this.div = d3.select("body")
          .append("div")
          .attr("class", "tooltip");

        let mouseVal = d3.mouse(d3.event.currentTarget);
        if (d.data.Timeframe !== "QTD_diff") {
          let hor: any;
          if (this.type === "COMBINED CFF") {

            if (this.donuttype == "store") {
              hor = d.data.Timeframe + " GA: " + d.data.goal + "%";
            }
            else if (this.donuttype == "market") {
              hor = "% of Stores at/above Target (QTD): " + d.data.value + "%";
            }
            else {
              hor = "% of Stores at/above Target (" + this.timeframe + "): " + d.data.value + "%";
            }

            this.div
              .html(hor)

              .style("left", (d3.event.pageX + 5) + "px")
              .style("top", (d3.event.pageY + 20) + "px")
              .style("opacity", 1)
              .style("visibility", "visible")
              .style("display", "block");
          }
          else {


            if (this.donuttype == "store") {
              if (this.type === "PHARMACY") {
                hor = "L13W Score: " + d.data.value;
              }
              else {
                hor = d.data.Timeframe + " Score: " + d.data.value;
              }
            }
            else if (this.donuttype == "market") {
              if (this.type === "PHARMACYmarket") {
                hor = "% of Stores at/above Target (L13W): " + d.data.value + "%";
              }
              else
                hor = "% of Stores at/above Target (QTD): " + d.data.value + "%";
            }
            else {
              if (this.type === "PHARMACYmarket") {
                hor = "% of Stores at/above Target (L13W): " + d.data.value + "%";
              } else if (this.type === "PHARMACYregion") {
                hor = "% of Stores at/above Target (" + d.data.arcTimeframe + "): " + d.data.value + "%";
              }
              else if (this.type === "PHARMACYdivision") {
                hor = "% of Stores at/above Target (" + d.data.arcTimeframe + "): " + d.data.value + "%";
              }
              else if (this.type === "PHARMACYgbu") {

                hor = "% of Stores at/above Target (" + d.data.arcTimeframe + "): " + d.data.value + "%";
              }
              else
                hor = "% of Stores at/above Target (" + this.timeframe + "): " + d.data.value + "%";
            }
            let group: any;

            if ((this.type === "PHARMACY" && this.toola !== "right") || (this.type === "PHARMACYmarket" && this.toola !== "right" ) || (this.type === "PHARMACYregion" && this.toola !== "right") || (this.type === "PHARMACYdivision" && this.toola !== "right") || (this.type === "PHARMACYgbu" && this.toola !== "right")) {
              group = (d3.event.pageX - 160) + "px";
            }
            else {
              group = (d3.event.pageX + 5) + "px";
            }
            this.div
              .html(hor)
              .style("left", group)
              .style("top", (d3.event.pageY + 20) + "px")
              .style("opacity", 1)
              .style("visibility", "visible")
              .style("display", "block");
            if (this.donuttype == "GHT") {
              this.div.style("visibility", "hidden");
            }
          }

        }

      })
      .on("mouseout", () => {
        this.div.style("visibility", "hidden");
      })

    g.append("path")
      .attr("d", this.arc)
      .style("fill", d => this.color(d.data.Timeframe));

    let legend = this.svg.selectAll(".legend")
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', (d, i) => {
        var height = 25;
        var offset = height;
        var x = this.legendItemSize * -3.5;
        var y = (i * height) - offset;
        return `translate(${x}, ${y})`
      })
    var fnt: any
    var fnt2: any
    var fnt3: any
    var qtdh: number
    var qtdnh: number
    var qtdnw: number
    var divider: any
    var dividerw: number
    if (data[0].Timeframe == "QTD") {
      if (this.type == "COMBINED CFF" || this.type == "PHARMACYmarket" || this.type == "PHARMACYregion" || this.type == "PHARMACYdivision" || this.type == "PHARMACYgbu") {
        fnt = "QTDB"
        fnt2 = "QTDBN"
        fnt3 = "QTDBR"
        qtdh = 15

        if (data[0].value >= 100) {
          qtdnh = 10
          qtdnw = -5
        }
        else {
          qtdnh = 10
          qtdnw = 2
        }

        divider = "________"
        dividerw = 2
      }
      else {
        fnt = "QTDB"
        fnt2 = "QTDBN"
        fnt3 = "QTDBR"
        qtdh = 12
        qtdnh = 12
        qtdnw = 1
        divider = "_______"
        dividerw = 0

      }
    }

    legend.append('text')
      .attr('x', this.legendItemSize + this.legendSpacing + 10)
      .attr('y', this.legendItemSize - this.legendSpacing - qtdh)
      .attr("class", fnt)
      .text((d) => {
        if (d.Timeframe == "QTD") {
          if (this.donuttype == "region" || this.donuttype == "division" || this.donuttype == "gbu") {
            return this.timeframe;
          }
          else {
            if (this.donuttype == "GHT") {
              return "MTD"
            }
            if (this.type == "PHARMACY" || this.type == "PHARMACYmarket" || this.type == "STORE QPF" || this.type == "MARKET QPF" || this.type == "REGION QPF" || this.type == "DIVISION QPF" || this.type == "GBU QPF") {
              return "L13W"
            }
            if (this.type == "PHARMACYregion" || this.type == 'PHARMACYdivision' || this.type == "PHARMACYgbu") {
              return d.arcTimeframe;
            }

            else {
              return d.Timeframe;
            }
          }

        }
      });

    legend.append('text')
      .attr('x', this.legendItemSize + this.legendSpacing1 - dividerw)
      .attr('y', this.legendItemSize - this.legendSpacing1 + 17)
      .attr("class", fnt3)
      .style('fill', "#373A3C")
      .style('text-align', "left")
      .text(function (d) {
        if (d.Timeframe == "QTD") {
          return divider
        }
      });

    let hoverText = legend.append('text')
      .attr('x', this.legendItemSize + this.legendSpacing + qtdnw)
      .attr('y', this.legendItemSize - this.legendSpacing + qtdnh)
      .attr("class", fnt2)
      .text((d) => {
        if (d.Timeframe == "QTD") {
          if (d.value == null) {
            if (this.donuttype == "store") {
              return " I/S"
            }
            return "0%"
          }
          else {
            if (this.donuttype == "store" || this.type == "PHARMACY") {
              let dvalue = d.value;
              if (parseFloat(data[0] && data[0].response && data[0].response.replace(/,/g, '')) <= 9) {
                dvalue = " I/S"
              }
              if (this.type == "COMBINED CFF" || this.type == "PHARMACYmarket" || this.type == "PHARMACYregion" || this.type == 'PHARMACYdivision' || this.type == "PHARMACYgbu") {
                if (dvalue == " I/S") {
                  return dvalue
                }
                else {
                  return dvalue + "%";
                }
              }
              else {
                return dvalue
              }
            }
            else {
              if (this.type == "PHARMACYmarket") {
                if (parseFloat(data[0] && data[0].response && data[0].response.replace(/,/g, '')) <= 9) {
                  return " I/S"
                }
                else {
                  return d.value + "%";
                }
              } else if (this.type == "PHARMACYregion" || this.type == 'PHARMACYdivision' || this.type == "PHARMACYgbu") {
                if (parseFloat(data[0] && data[0].response && data[0].response.replace(/,/g, '')) <= 9) {
                  return " I/S"
                }
                else {
                  return d.value + "%";
                }
              }
              else
                return d.value + "%";
            }
          }
        }
      });


    this.div = d3.select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)


    hoverText
      .on("mousemove", (d) => {
        let mouse = d3.mouse(d3.event.currentTarget);
        this.div
          .style("opacity", 1)
          .style("visibility", "visible")
          .style("color", "black");
        let hor: any;
        let responsecnt: any;
        let dvalue: any;
        let Absolutescore: any;
        d.score ? Absolutescore = d.score : Absolutescore = 0;
        d.value ? dvalue = d.value : dvalue = 0;
        d.noOfStores ? null : d.noOfStores = 0;
        d.rank ? null : d.rank = 0;
        d.response ? responsecnt = d.response : responsecnt = 0;

        if (this.type == "COMBINED CFF") {
          if (this.donuttype == "store") {
            if ((parseFloat(data[0] && data[0].response && data[0].response.replace(/,/g, '')) <= 9) || (d.value == null)) {
              hor = "Insufficient sample (<10)"
            }
            else {
              hor = d.Timeframe + " GA :                 " + d.goal + "%<br>No of Responses : " + responsecnt;
            }
          }
          else {
            if (this.donuttype == "market") {
              hor = "% of Stores at/above Target (QTD) :   "
                + dvalue + "%<br>Total stores (QTD) :                                "
                + d.combinoOfStores + "<br>Stores at/above Target (QTD) :            " + d.rank;
            }
            else {
              hor = "% of Stores at/above Target (" + this.timeframe + ") :   "
                + dvalue + "%<br>Total stores (" + this.timeframe + ") :                                "
                + d.combinoOfStores + "<br>Stores at/above Target (" + this.timeframe + ") :            " + d.rank;
            }

          }


          this.div.html(hor)
            .style("left", (d3.event.pageX + 5) + "px")
            .style("top", (d3.event.pageY + 20) + "px");
        }
        else {
          if (this.donuttype == "store") {
            if ((parseFloat(data[0] && data[0].response && data[0].response.replace(/,/g, '')) <= 9) || (d.value == null)) {
              hor = "Insufficient sample (<10)"
            }
            else {
              if (this.type == "PHARMACY") {
                hor = "L13W GA :            " + Absolutescore + "%"
                  + "<br>L13W Score :           " + dvalue
                  + "<br>No of Responses : " + responsecnt;
              }
              else
                hor = d.Timeframe + " Score :            " + dvalue + "<br>No of Responses : " + responsecnt;
            }
          }
          else {
            if (this.donuttype == "market") {
              if ((parseFloat(data[0] && data[0].response && data[0].response.replace(/,/g, '')) <= 9) || (d.value == null)) {
                hor = "Insufficient sample (<10)"
              }
              else {
                if (this.type == "PHARMACYmarket") {
                  //LC- Market qpf change
                  hor = "% of Stores at/above Target (L13W) :   "
                    + dvalue + "%<br>Total stores (L13W) :                                "
                    + d.noOfStores + "<br>Stores at/above Target (L13W) :            " + d.rank;
                } else if (this.type == "PHARMACYregion") {
                  //LC- Market qpf change
                  hor = "% of Stores at/above Target (L13W) :   "
                    + dvalue + "%<br>Total stores (L13W) :                                "
                    + d.noOfStores + "<br>Stores at/above Target (L13W) :            " + d.rank;
                }
                else if (this.type == "PHARMACYdivision") {
                  //LC- REGION qpf change
                  hor = "% of Stores at/above Target (L13W) :   "
                    + dvalue + "%<br>Total stores (L13W) :                                "
                    + d.noOfStores + "<br>Stores at/above Target (L13W) :            " + d.rank;
                }
                else if (this.type == "PHARMACYgbu") {
                  //LC- REGION qpf change
                  hor = "% of Stores at/above Target (L13W) :   "
                    + dvalue + "%<br>Total stores (L13W) :                                "
                    + d.noOfStores + "<br>Stores at/above Target (L13W) :            " + d.rank;
                }
                else
                  hor = "% of Stores at/above Target (QTD) :   "
                    + dvalue + "%<br>Total stores (QTD) :                                "
                    + d.noOfStores + "<br>Stores at/above Target (QTD) :            " + d.rank;
              }
            }
            else {
              if (this.donuttype == "GHT") {
                this.div.style("visibility", "hidden");
              } else {
                if (this.type == "PHARMACYmarket") {
                  if ((parseFloat(data[0] && data[0].response && data[0].response.replace(/,/g, '')) <= 9) || (d.value == null)) {
                    hor = "Insufficient sample (<10)"
                  }
                  else
                  // Market QPF changes
                    hor = "% of Stores at/above Target (L13W) :   "
                      + dvalue + "%<br>Total stores (L13W) :                               "
                      + d.combinoOfStores + "<br>Stores at/above Target (L13W) :            " + d.rank + "<br>Average QPF score (L13W) :                   " + d.avgQpfQtd;
                } else if (this.type == "PHARMACYregion") {
                  if ((parseFloat(data[0] && data[0].response && data[0].response.replace(/,/g, '')) <= 9) || (d.value == null)) {
                    hor = "Insufficient sample (<10)"
                  }
                  else
                    hor = "% of Stores at/above Target (" + d.arcTimeframe + ") :   "
                      + dvalue + "%<br>Total stores (" + d.arcTimeframe + ") :                               "
                      + d.combinoOfStores + "<br>Stores at/above Target (" + d.arcTimeframe + ") :            " + d.rank +
                      "<br>Avg QPF Region Score (" + d.arcTimeframe + ") :              " + d.avgQpfqtd;
                } else if (this.type == "PHARMACYdivision") {
                  if ((parseFloat(data[0] && data[0].response && data[0].response.replace(/,/g, '')) <= 9) || (d.value == null)) {
                    hor = "Insufficient sample (<10)"
                  }
                  else
                    hor = "% of Stores at/above Target (" + d.arcTimeframe + ") :   "
                      + dvalue + "%<br>Total stores (" + d.arcTimeframe + ") :                               "
                      + d.combinoOfStores + "<br>Stores at/above Target (" + d.arcTimeframe + ") :            " + d.rank +
                      "<br>Avg QPF Division Score (" + d.arcTimeframe + ") :            " + d.avgQpfqtd;
                } else if (this.type == "PHARMACYgbu") {
                  if ((parseFloat(data[0] && data[0].response && data[0].response.replace(/,/g, '')) <= 9) || (d.value == null)) {
                    hor = "Insufficient sample (<10)"
                  }
                  else
                    hor = "% of Stores at/above Target (" + d.arcTimeframe + ") :    "
                      + dvalue + "%<br>Total stores (" + d.arcTimeframe + ") :                                "
                      + d.combinoOfStores + "<br>Stores at/above Target (" + d.arcTimeframe + ") :            " + d.rank +
                      "<br>Avg QPF GBU Score (" + d.arcTimeframe + ") :                  " + d.avgQpfqtd;
                }
                else
                  hor = "% of Stores at/above Target (" + this.timeframe + ") :   "
                    + dvalue + "%<br>Total stores (" + this.timeframe + ") :                                "
                    + d.noOfStores + "<br>Stores at/above Target (" + this.timeframe + ") :            " + d.rank;
              }
            }
          }

          let group: any;
          if ((this.type === "PHARMACY" && this.toola !== "right") || (this.type === "PHARMACYmarket" && this.toola !== "right") || (this.type === "PHARMACYregion" && this.toola !== "right") || (this.type === "PHARMACYdivision" && this.toola !== "right") || (this.type === "PHARMACYgbu" && this.toola !== "right")) {
            group = (d3.event.pageX - 160) + "px";
          }
          else {
            group = (d3.event.pageX + 5) + "px";
          }

          this.div.html(hor)
            .style("left", group)
            .style("top", (d3.event.pageY + 20) + "px");
        }

      })
      .on("mouseout", () => {
        this.div.style("visibility", "hidden");
      })


  }

  //second Chart
  private initSvg2(data: any[]) {


    var rng;
    if (data[0].Timeframe == "YTD") {
      rng = data[0].value;
    }

    if (this.type == "COMBINED CFF" || this.type == "PHARMACYmarket" || this.type == "PHARMACYregion" || this.type == 'PHARMACYdivision' || this.type == 'PHARMACYgbu') {
      this.newwidth = 250;
      this.newheight = 210;
    }
    else {
      this.newwidth = 240;
      this.newheight = 190;
    }


    this.radius = Math.min(this.newwidth, this.newheight) / 2;

    var colr


    if (data[0].Timeframe == "YTD") {
      rng = data[0].goal;
    }


    if (this.donuttype == "store") {

      if (rng >= 100) {
        colr = "#9DDF00"
      }
      else {
        if (rng >= 97.5)
        {
          colr = "#FDBB30"
        }
        else {
          colr = "rgba(255, 143, 173, 1)"
        }
      }

    }
    else {
      colr = "#9FE0FA"
    }

    this.color = d3Scale.scaleOrdinal()

      .range([colr, "rgba(245, 245, 245, 0)"]);


    this.arc = d3Shape.arc()
      .outerRadius(this.radius - 28)
      .innerRadius(this.radius - 38)
      .cornerRadius(5);

    this.pie = d3Shape.pie()
      .sort(null)
      .value((d: any) => d.value);


    this.svg = this.svgContainer
      .append("g")
      .attr("transform", "translate(" + this.newwidth / 2 + "," + this.newheight / 2 + ")");


  }

  private drawChart2(data: any[]) {
    let belowRange: any[] = [
      {Timeframe: 'YTD', value: 0},
      {Timeframe: 'YTD_diff', value: 10},
    ];
    let inputData: any = data;
    if (this.donuttype == "store") {
      if (parseFloat(data[0] && data[0].response && data[0].response.replace(/,/g, '')) > 9) {
        inputData = data
      }
      else {
        inputData = belowRange
      }
    }


    let g = this.svg.selectAll(".arc")
      .data(this.pie(inputData))
      .enter().append("g")
      .attr("class", "arc").on("mouseover", (d) => {
        this.div = d3.select("body")
          .append("div")
          .attr("class", "tooltip")
          .style("color", "#989898");

        let mouseVal = d3.mouse(d3.event.currentTarget);
        if (d.data.Timeframe !== "YTD_diff") {
          let hor: any;
          if (this.type == "COMBINED CFF") {

            if (this.donuttype == "store") {
              hor = d.data.Timeframe + " GA: " + d.data.goal + "%";
            }
            else {
              hor = "% of Stores at/above Target (YTD): " + d.data.value + "%";
            }
            this.div
              .html(hor)
              .style("left", (d3.event.pageX + 5) + "px")
              .style("top", (d3.event.pageY + 20) + "px")
              .style("opacity", 1)
              .style("visibility", "visible")
              .style("display", "block");
          }
          else {
            if (this.donuttype == "store") {
              if (this.type == "PHARMACY") {
                hor = d.data.Timeframe + " Score: " + d.data.value;
              }
              else
                hor = d.data.Timeframe + " Score: " + d.data.value;
            }
            else {
              if (this.type == "PHARMACYmarket") {
                // MARKET QPF
                hor = "% of Stores at/above Target (YTD): " + d.data.value + "%";
              } else if (this.type == "PHARMACYregion") {
                // region QPF
                hor = "% of Stores at/above Target (YTD): " + d.data.value + "%";
              } else if (this.type == "PHARMACYdivision") {
                // division QPF
                hor = "% of Stores at/above Target (YTD): " + d.data.value + "%";
              } else if (this.type == "PHARMACYgbu") {
                // gbu QPF
                hor = "% of Stores at/above Target (YTD): " + d.data.value + "%";
              }
              else
                hor = "% of Stores at/above Target (YTD): " + d.data.value + "%";
            }
            let group: any;
            if (this.type === "PHARMACY" && this.toola !== "right") {
              group = (d3.event.pageX - 160) + "px";
            }
            else {
              group = (d3.event.pageX + 5) + "px";
            }
            this.div
              .html(hor)
              .style("left", (group))
              .style("top", (d3.event.pageY + 20) + "px")
              .style("opacity", 1)
              .style("visibility", "visible")
              .style("display", "block");
            if (this.donuttype == "GHT") {
              this.div.style("visibility", "hidden");
            }
          }
        }
      })
      .on("mouseout", () => {
        this.div.style("visibility", "hidden");
      })

    g.append("path")
      .attr("d", this.arc)
      .style("fill", d => this.color(d.data.Timeframe));

    let legend = this.svg.selectAll(".legend")
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', (d, i) => {

        var height = 2
        var offset = height / 70
        var x = this.legendItemSize * -3.5;
        var y = (i * height) + 7
        return `translate(${x}, ${y})`
      })

    var yfnt: any
    var yfnt2: any
    var yqtdh: number
    var yqtdnh: number
    var yqtdnw: number
    var ydivider: any
    var ydividerw: number
    if (data[0].Timeframe == "YTD") {
      if (this.type == "COMBINED CFF" || this.type == "PHARMACYmarket" || this.type == "PHARMACYregion" || this.type == "PHARMACYdivision" || this.type == "PHARMACYgbu") {
        yfnt = "YTDB"
        yfnt2 = "YTDBN"
        yqtdh = -2
        if (data[0].value >= 100) {
          yqtdnh = 25
          yqtdnw = -4
        }
        else {
          yqtdnh = 25
          yqtdnw = 2
        }

      }
      else {
        yfnt = "YTDS"
        yfnt2 = "YTDSN"
        yqtdh = -2
        yqtdnh = 25
        yqtdnw = 1
      }
    }


    legend.append('text')
      .attr('x', this.legendItemSize + this.legendSpacing1 + 11)
      .attr('y', this.legendItemSize - this.legendSpacing1 - yqtdh)
      .attr('class', yfnt)
      .text(function (d) {
        if (d.Timeframe == "YTD") {
          return d.Timeframe;
        }
      });

    let hoverText = legend.append('text')
      .attr('x', this.legendItemSize + this.legendSpacing1 + yqtdnw)
      .attr('y', this.legendItemSize - this.legendSpacing1 + yqtdnh)
      .attr('class', yfnt2)
      .text((d) => {
        if (d.Timeframe == "YTD") {
          if (d.value == null) {
            if (this.donuttype == "store") {
              return " I/S"
            }
            return "0%"
          }
          else {
            if (this.donuttype == "store" || this.type == "PHARMACY") {
              let dvalue = d.value;
              if (parseFloat(data[0] && data[0].response && data[0].response.replace(/,/g, '')) <= 9) {
                dvalue = " I/S"
              }
              if (this.type == "COMBINED CFF" || this.type == "PHARMACYmarket" || this.type == "PHARMACYregion" || this.type == 'PHARMACYdivision' || this.type == "PHARMACYgbu") {
                if (dvalue == " I/S") {
                  return dvalue
                }
                else
                  return dvalue + "%";
              }
              else {
                return dvalue
              }
            }
            else {
              if (this.type == "PHARMACYmarket") {
                if (parseFloat(data[0] && data[0].response && data[0].response.replace(/,/g, '')) <= 9) {
                  return " I/S"
                }
                else {
                  return d.value + "%";
                }
              } else if (this.type == "PHARMACYregion" || this.type == 'PHARMACYdivision' || this.type == "PHARMACYgbu") {
                if (parseFloat(data[0] && data[0].response && data[0].response.replace(/,/g, '')) <= 9) {
                  return " I/S"
                }
                else {
                  return d.value + "%";
                }
              }

              return d.value + "%";
            }
          }
        }
      });

    this.div = d3.select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .style(" line-height", 1.6)
      .style("color", "#989898");

    hoverText

      .on("mousemove", (d) => {
        let mouse = d3.mouse(d3.event.currentTarget);
        this.div
          .style("opacity", 1)
          .style("visibility", "visible")
          .style("color", "#989898");


        let hor: any;
        let responsecnt: any;
        let dvalue: any;
        let Absolutescore: any;
        d.score ? Absolutescore = d.score : Absolutescore = 0;
        d.value ? dvalue = d.value : dvalue = 0;
        d.noOfStores ? null : d.noOfStores = 0;
        d.rank ? null : d.rank = 0;
        d.response ? responsecnt = d.response : responsecnt = 0;

        if (this.type == "COMBINED CFF") {
          if (this.donuttype == "store") {
            if ((parseFloat(data[0] && data[0].response && data[0].response.replace(/,/g, '')) <= 9) || (d.value == null)) {
              hor = "Insufficient sample (<10)"
            } else {
              hor = d.Timeframe + " GA :                  " + d.goal + "%<br>No of Responses : " + responsecnt;
            }
          }
          else {
            hor = "% of Stores at/above Target (YTD) :   "
              + dvalue + "%<br>Total stores (YTD) :                                "
              + d.combinoOfStores + "<br>Stores at/above Target (YTD) :            " + d.rank;
          }
          this.div.html(hor)
            .style("left", (d3.event.pageX + 5) + "px")
            .style("top", (d3.event.pageY + 20) + "px");
        }
        else {
          if (this.donuttype == "store") {
            if ((parseFloat(data[0] && data[0].response && data[0].response.replace(/,/g, '')) <= 9) || (d.value == null)) {
              hor = "Insufficient sample (<10)"
            } else {
              if (this.type == "PHARMACY") {
                hor = d.Timeframe + " GA :                   " + Absolutescore + "%"
                  + "<br>YTD Score :              " + dvalue
                  + "<br>No of Responses :  " + responsecnt
                  + '<br>YTD Market Rank : ' + d.qpfMarketRank;
              }
              else
                hor = d.Timeframe + " Score :             " + dvalue + "<br>No of Responses : " + responsecnt;
            }
          }
          else {
            if (this.donuttype == "GHT") {
              this.div.style("visibility", "hidden");
            } else {
              if (this.type == "PHARMACYmarket") {
                if ((parseFloat(data[0] && data[0].response && data[0].response.replace(/,/g, '')) <= 9) || (d.value == null)) {
                  hor = "Insufficient sample (<10)"
                } else
                // QPF Market changes
                  hor = "% of Stores at/above Target (YTD) :   "
                    + dvalue + "%<br>Total stores (YTD) :                                "
                    + d.combinoOfStores + "<br>Stores at/above Target (YTD) :             " + d.rank + "<br>Average QPF score (YTD) :                    " + d.avgQpfYtd;
              } else if (this.type == "PHARMACYregion") {
                if ((parseFloat(data[0] && data[0].response && data[0].response.replace(/,/g, '')) <= 9) || (d.value == null)) {
                  hor = "Insufficient sample (<10)"
                } else
                // QPF region changes
                  hor = "% of Stores at/above Target (YTD) :    "
                    + dvalue + "%<br>Total stores (YTD) :                                "
                    + d.combinoOfStores + "<br>Stores at/above Target (YTD) :             " + d.rank +
                    "<br>Avg QPF Region Score (YTD) :              " + d.avgQpfytd;
              } else if (this.type == "PHARMACYdivision") {
                if ((parseFloat(data[0] && data[0].response && data[0].response.replace(/,/g, '')) <= 9) || (d.value == null)) {
                  hor = "Insufficient sample (<10)"
                } else
                // QPF division changes
                  hor = "% of Stores at/above Target (YTD) :   "
                    + dvalue + "%<br>Total stores (YTD) :                               "
                    + d.combinoOfStores + "<br>Stores at/above Target (YTD) :            " + d.rank +
                    "<br>Avg QPF Division Score (YTD) :            " + d.avgQpfytd;
              }
              else if (this.type == "PHARMACYgbu") {
                if ((parseFloat(data[0] && data[0].response && data[0].response.replace(/,/g, '')) <= 9) || (d.value == null)) {
                  hor = "Insufficient sample (<10)"
                } else
                // QPF gbu changes
                  hor = "% of Stores at/above Target (YTD) :    "
                    + dvalue + "%<br>Total stores (YTD) :                                "
                    + d.combinoOfStores + "<br>Stores at/above Target (YTD) :            " + d.rank +
                    "<br>Avg QPF GBU Score (YTD) :                  " + d.avgQpfytd;
              }
              else
                hor = "% of Stores at/above Target (YTD) :   "
                  + dvalue + "%<br>Total stores (YTD) :                               "
                  + d.noOfStores + "<br>Stores at/above Target (YTD) :              " + d.rank;
            }
          }
          let group: any;
          if ((this.type === "PHARMACY" && this.toola !== "right") || (this.type === "PHARMACYmarket" && this.toola !== "right") || (this.type === "PHARMACYregion" && this.toola !== "right") || (this.type === "PHARMACYdivision" && this.toola !== "right") || (this.type === "PHARMACYgbu" && this.toola !== "right")) {
            group = (d3.event.pageX - 160) + "px";
          }
          else {
            group = (d3.event.pageX + 5) + "px";
          }
          this.div.html(hor)
            .style("left", group)
            .style("top", (d3.event.pageY + 20) + "px");
        }
      })
      .on("mouseout", () => {
        this.div.style("visibility", "hidden");
        this.div.style("top", "0px");
        this.div.style("left", "0px");
      })
  }

// Workaround for market - gbu qpf doughnuts to force update on clicking include/exclude  and time frames
  changeEvent(idValue, donuttype, datatype, allTypeqtd, allTypeytd) {
    d3.select("svg").remove();
    this.id = idValue;
    this.graphdata = allTypeqtd;
    this.graphdata1 = allTypeytd;
    this.type = datatype
    this.donuttype = donuttype;
    setTimeout(() => {
      this.initSvg3(this.graphdata);
      this.drawChart3(this.graphdata);
      this.initSvg(this.graphdata);
      this.drawChart(this.graphdata, this.graphdata1);
      this.initSvg2(this.graphdata1);
      this.drawChart2(this.graphdata1);

    }, 1);

  }

}
