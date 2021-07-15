import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faDollarSign, faCoins } from '@fortawesome/free-solid-svg-icons';
import { HighChartService } from 'src/app/services/high-chart.service';

import * as Highcharts from 'highcharts';
import { DataService } from 'src/app/services/data.service';
import { LendingData, LendingStats } from 'src/app/models/lending.model';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { CovalentapService } from 'src/app/shared/services/covalentap.service';
import { WallterVolume } from 'src/app/shared/models/walletvolume.model';
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
  lendingData: LendingData[];
  btc24: number;
  chartdatalables = [];
  chartdatavals = [];
  async ngOnInit() {
    this.loaderService.showLoader();
    const voldata = await this.covAPI.get24Vol("30");
    this.updateVolWidgets(voldata)
    this.lendingData = await this.covAPI.getLendingStats("30");
    debugger;
    this.highchartService.createCombinationChart(document.getElementById("volcharts"), this.chartdatalables, this.chartdatavals, "Last 24 Hours", "Wallet Volume", null, 'bar')
    this.highchartService.createChart(document.getElementById("btc"), this.dataService.getPieChartDataBTC(), "BTC");
    this.highchartService.createChart(document.getElementById("usd"), this.dataService.getPieChartDataUSD(), "USD");
    this.loaderService.hideLoader()
  }

  updateVolWidgets(data: Array<WallterVolume>) {
    this.btc24 = 0;
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      let tempCal = 0;
      if (element.balance_24h) {
        tempCal = (parseFloat(element.balance_24h) / (Math.pow(10, element.contract_decimals)));
      }
      this.btc24 += tempCal;
      this.chartdatalables.push(element.contract_ticker_symbol);
      this.chartdatavals.push(parseFloat(tempCal.toFixed(2)));

    }
    this.btc24 = parseFloat(this.btc24.toFixed(2));
  }

}
