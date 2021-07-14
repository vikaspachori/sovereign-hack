import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faDollarSign, faCoins } from '@fortawesome/free-solid-svg-icons';
import { HighChartService } from 'src/app/services/high-chart.service';

import * as Highcharts from 'highcharts';
import { DataService } from 'src/app/services/data.service';
import { LendingStats } from 'src/app/models/lending.model';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { CovalentapService } from 'src/app/shared/services/covalentap.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private highchartService: HighChartService, private dataService: DataService, private loaderService: LoaderService, private covAPI: CovalentapService) { }
  @ViewChild('charts') chartEl: ElementRef;
  faDollarSign = faDollarSign;
  faCoins = faCoins;
  lendingData: LendingStats[];
  async ngOnInit() {
    const voldata = await this.covAPI.get24Vol("30");
    debugger
    this.lendingData = this.dataService.getLendingStats();
    this.highchartService.createChart(document.getElementById("btc"), this.dataService.getPieChartDataBTC(), "BTC");
    this.highchartService.createChart(document.getElementById("usd"), this.dataService.getPieChartDataUSD(), "USD");
  }

}
