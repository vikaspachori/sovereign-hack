import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faDollarSign, faCoins } from '@fortawesome/free-solid-svg-icons';
import { HighChartService } from 'src/app/services/high-chart.service';

import * as Highcharts from 'highcharts';
import { DataService } from 'src/app/services/data.service';
import { LendingStats } from 'src/app/models/lending.model';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private highchartService: HighChartService, private dataService: DataService) { }
  @ViewChild('charts') chartEl: ElementRef;
  faDollarSign = faDollarSign;
  faCoins = faCoins;
  lendingData: LendingStats[];
  ngOnInit(): void {
    this.lendingData = this.dataService.getLendingStats();
    this.highchartService.createChart(document.getElementById("btc"), this.dataService.getPieChartDataBTC(), "BTC");
    this.highchartService.createChart(document.getElementById("usd"), this.dataService.getPieChartDataUSD(), "USD");
  }

}
