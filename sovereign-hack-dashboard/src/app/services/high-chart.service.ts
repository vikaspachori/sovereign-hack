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



            chart.setSubtitle({
              text: "Total: " + total.toFixed(2) + me.suffix,
              style: {
                fontWeight: 'bold',
              },
            });

            chart.setTitle({
              text: 'TOTAL VALUE LOCKED(' + me.suffix + ')',
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
        size: '90%',
        innerSize: '55%',
        colorByPoint: true,
        data: []
      }]
    }
  }
  charts = [];



  createChart(container, seriesData: any, suffix: string, title: String = null) {
    let opts = this.defaultOptions;
    this.defaultOptions.series[0].data = seriesData;

    if (title) {
      delete this.defaultOptions.chart.events
      this.defaultOptions.title = {
        text: title
      }
    }

    this.updateSuffix(suffix)
    let e = document.createElement("div");

    container.appendChild(e);

    if (opts.chart) {
      // opts.chart['renderTo'] = e;
    }
    Highcharts.chart(container, opts);
  }
}
