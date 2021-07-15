import { Component, OnInit } from '@angular/core';
import { eventData, eventItem } from 'src/app/models/events.models';
import { contractsInformation } from 'src/app/shared/models/contractsinformation';
import { EventService } from 'src/app/shared/services/events/event.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-margintrading',
  templateUrl: './margintrading.component.html',
  styleUrls: ['./margintrading.component.scss']
})
export class MargintradingComponent implements OnInit {

  constructor(private eventService: EventService, private loader: LoaderService) { }
  tradeTopicAddress = "0xf640c1cfe1a912a0b0152b5a542e5c2403142eed75b06cde526cee54b1580e5c";
  closeTopicAddress = "0x2ed7b29b4ca95cf3bb9a44f703872a66e6aa5e8f07b675fa9a5c124a1e5d7352";
  blockStartAddress = 3014334;

  public buy: Array<eventItem> | any;
  public sell: Array<eventItem> | any;
  public longs: any;
  public shorts: any;
  public profits: any;
  public loss: any;
  public totalprofit = 0;
  public totalloss = 0;
  async ngOnInit(): Promise<void> {
    this.loader.showLoader();
    this.longs = new Array<any>();
    this.shorts = new Array<any>();
    this.profits = new Array<any>();
    this.loss = new Array<any>()
    this.buy = await this.eventService.getEvents(30, this.tradeTopicAddress, this.blockStartAddress);
    this.sell = await this.eventService.getEvents(30, this.closeTopicAddress, this.blockStartAddress);
    const matchedData = [];
    this.buy.forEach(buyitem => {
      let user = buyitem.itemsarr.params[0];
      let loanid = buyitem.itemsarr.params[2];
      this.sell.filter(sellitem => {
        const userid = sellitem.itemsarr.params.filter(d => (d.name === "user" && d.value == user.value));
        const loan = sellitem.itemsarr.params.filter(d => (d.name === "loanId" && d.value == loanid.value));
        if (loan.length > 0 && userid.length > 0) {
          matchedData.push({
            buy: buyitem, sell: sellitem
          })
        }
      })
    })
    matchedData.forEach(d => {
      const buydate = new Date(d.buy.datetime);
      const sellate = new Date(d.sell.datetime);
      const exitprice = parseFloat(d.sell.itemsarr.params[8].value);
      const entryprice = parseFloat(d.buy.itemsarr.params[9].value);
      const margin = exitprice - entryprice;
      if (margin < 0) {
        this.loss.push({ pair: d, margin: margin });
        this.totalloss += margin
      }
      else {
        this.totalprofit += margin;
        this.profits.push({ pair: d, margin: margin })
      }

      this.profits = this.profits.sort((a, b) => b.margin - a.margin).slice(0, 5);
      this.loss = this.loss.sort((a, b) => a.margin - b.margin).slice(0, 5);

      if (buydate < sellate) {
        this.longs.push({
          buy: d.buy,
          sell: d.sell,
          margin: (exitprice - entryprice)
        })
      }
      else {
        this.shorts.push({
          buy: d.buy,
          sell: d.sell,
          margin: (exitprice - entryprice)
        })
      }
    })
    this.totalprofit = ((this.totalprofit) / Math.pow(10, 18));
    this.totalloss = ((this.totalloss) / Math.pow(10, 18));
    this.loader.hideLoader();
  }
  public getAdddressName(address: string): string {
    const keys = Object.keys(contractsInformation);
    const data = keys.filter(d => contractsInformation[d].address.toLowerCase() == address);
    return data.length > 0 ? data[0].split("_")[0] : "N/A"
  }
}
