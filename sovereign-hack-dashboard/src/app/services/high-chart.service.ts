import { Injectable } from '@angular/core';
import * as Highcharts from 'highcharts';
@Injectable({
  providedIn: 'root'
})
export class HighChartService {
  defaultOptions: any
  constructor() {

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
              text: total.toFixed(2),
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
      title: {
        text: 'TOTAL VALUE LOCKED(BTC)'
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
        name: 'TOTAL VALUE LOCKED(BTC)',
        colorByPoint: true,
        data: [{
          name: 'Protocol Contract',
          y: 95.1265
        }, {
          name: 'Lending Contract',
          y: 146.1551
        }, {
          name: 'Amm Contract',
          y: 1425.1608
        }, {
          name: 'Bitocracy Staking Contract',
          y: 19140.5178
        }]
      }]
    }
  }
  charts = [];



  createChart(container, options?: Object) {
    let opts = this.defaultOptions;
    console.log(opts)
    let e = document.createElement("div");

    container.appendChild(e);

    if (opts.chart) {
      // opts.chart['renderTo'] = e;
    }
    Highcharts.chart(container, opts);
  }
}
