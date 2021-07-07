import { Injectable } from '@angular/core';
import * as Highcharts from 'highcharts';
@Injectable({
  providedIn: 'root'
})
export class HighChartService {
  defaultOptions: any
  suffix = "BTC";

  public updateSuffix(data) {
    this.suffix = data;
  }
  constructor() {
    const me = this;
    this.defaultOptions = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        
        events: {
          load: function (event) {
            var chart = this,
              points = chart.series[0].points,
              len = points.length,
              total = 0,
              i = 0;

            for (; i < len; i++) {
              total += points[i].y;
            }

            chart.setTitle({
              text: total.toFixed(2) + me.suffix,
              align: 'center',
              verticalAlign: 'middle',
              y: -10,
              style: {
                fontWeight: 'bold'
              },
            });
          }
        }
      },

      tooltip: {
        pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.y}',
          },
          showInLegend: true
        }
      },
      series: [{
        size: '60%',
        innerSize: '85%',
        colorByPoint: true,
        data: []
      }]
    }
  }
  charts = [];



  createChart(container, seriesData: any, suffix: string) {
    let opts = this.defaultOptions;
    this.defaultOptions.series[0].data = seriesData;
    this.updateSuffix(suffix)
    let e = document.createElement("div");

    container.appendChild(e);

    if (opts.chart) {
      // opts.chart['renderTo'] = e;
    }
    Highcharts.chart(container, opts);
  }
}
