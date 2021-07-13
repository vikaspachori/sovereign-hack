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
  async ngOnInit(): Promise<void> {
    this.swapdata = await this.covalentapi.getSwapData("30");
    this.data = this.swapdata.swapdata;

    document.getElementById("swaptable").style.height = (window.innerHeight - 88) + "px"
    this.highChart.createChart(document.getElementById("fromaddress"), this.getKeyvalue(this.swapdata.fromVal), "","Contribution from token");
    this.highChart.createChart(document.getElementById("toaddress"),this.getKeyvalue(this.swapdata.toVal), "","Contribution to token");
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
