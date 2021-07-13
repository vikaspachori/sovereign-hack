import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { HighChartService } from 'src/app/services/high-chart.service';
import { SwapData, SwapInterface } from 'src/app/shared/models/swap.model';
import { CovalentapService } from 'src/app/shared/services/covalentap.service';

@Component({
  selector: 'app-swap',
  templateUrl: './swap.component.html',
  styleUrls: ['./swap.component.scss']
})
export class SwapComponent implements OnInit {

  constructor(private covalentapi: CovalentapService, private dataService: DataService, private highChart: HighChartService) { }
  data: Array<SwapInterface>;
  swapdata: SwapData;
  fromvalueChartData = {};
  toValueChartData = {};
  totalFromVal = 0;
  totalToVal = 0;
  async ngOnInit(): Promise<void> {
    this.swapdata = await this.covalentapi.getSwapData("30");
    this.data = this.swapdata.swapdata;
    this.getBarChartData(this.data);
    this.highChart.createChart(document.getElementById("fromaddress"), this.getKeyvalue(this.swapdata.fromVal), "", "Contribution from token ( wallet freq)");
    this.highChart.createChart(document.getElementById("toaddress"), this.getKeyvalue(this.swapdata.toVal), "", "Contribution to token( wallet freq)");
    const fromSeriesData = Object.keys(this.fromvalueChartData).map(d => this.fromvalueChartData[d]);
    const toSeriesData = Object.keys(this.toValueChartData).map(d => this.toValueChartData[d]);
    debugger
    this.highChart.createCombinationChart(document.getElementById("fromaddressbar"), Object.keys(this.fromvalueChartData), fromSeriesData, "Transaction From", "From Transaction By Wallet", this.totalFromVal);
    this.highChart.createCombinationChart(document.getElementById("toaddressbar"), Object.keys(this.toValueChartData), toSeriesData, "Transaction To", "To Transaction By Wallet", this.totalToVal);
  }


  private getBarChartData(data: Array<SwapInterface>): void {

    const power10 = Math.pow(10, 18);
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      const fromTokenValue = parseFloat(element.fromTokenValue) / power10;
      this.totalFromVal += fromTokenValue;
      const toTokenValue = parseFloat(element.toTokenValue) / power10;
      this.totalToVal += toTokenValue;
      if (!this.fromvalueChartData[element.fromTokenName]) {
        this.fromvalueChartData[element.fromTokenName] = fromTokenValue;
      }
      else {
        this.fromvalueChartData[element.fromTokenName] += fromTokenValue
      }


      if (!this.toValueChartData[element.toTokenName]) {
        this.toValueChartData[element.toTokenName] = this.totalToVal;
      }
      else {
        this.toValueChartData[element.toTokenName] += this.totalToVal
      }
    }
    
  }

  private getKeyvalue(data): any {
    const formattedArray = [];
    const keys = Object.keys(data);
    for (let index = 0; index < keys.length; index++) {
      const element = keys[index];
      formattedArray.push({
        name: element,
        y: data[element]
      })

    }
    return formattedArray;
  }
}
