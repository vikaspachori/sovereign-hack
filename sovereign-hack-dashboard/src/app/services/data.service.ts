import { Injectable } from '@angular/core';
import { LendingStats } from '../models/lending.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getLendingStats(): LendingStats[] {
    let tempARra = new Array<LendingStats>();
    tempARra = [
      {
        assetName: "RBTC",
        logo: "https://live.sovryn.app/static/media/rbtc.2784c73e.png",
        assetborrowed: "0.43",
        assetsupplied: "18.97",
        available: "18.54",
        borrowAPR: "0.0593 %",
        supplyAPR: "213548%"
      },
      {
        assetName: "XUDC",
        logo: "https://live.sovryn.app/static/media/xusd.ff9d001f.svg",
        assetborrowed: "0.43",
        assetsupplied: "18.97",
        available: "18.54",
        borrowAPR: "0.0593 %",
        supplyAPR: "213548%"

      },
      {
        assetName: "DOC",
        logo: "https://live.sovryn.app/static/media/doc.c6d24857.svg",
        assetborrowed: "0.43",
        assetsupplied: "18.97",
        available: "18.54",
        borrowAPR: "0.0593 %",
        supplyAPR: "213548%"

      },
      {
        assetName: "USDT",
        logo: "https://live.sovryn.app/static/media/doc.c6d24857.svg",
        assetborrowed: "0.43",
        assetsupplied: "18.97",
        available: "18.54",
        borrowAPR: "0.0593 %",
        supplyAPR: "213548%"

      },
      {
        assetName: "BPRO",
        logo: "https://live.sovryn.app/static/media/bpro.5a35f755.svg",
        assetborrowed: "0.43",
        assetsupplied: "18.97",
        available: "18.54",
        borrowAPR: "0.0593 %",
        supplyAPR: "213548%"

      },
      {
        assetName: "DOC",
        logo: "https://live.sovryn.app/static/media/doc.c6d24857.svg",
        assetborrowed: "0.43",
        assetsupplied: "18.97",
        available: "18.54",
        borrowAPR: "0.0593 %",
        supplyAPR: "213548%"

      },
      {
        assetName: "DOC",
        logo: "https://live.sovryn.app/static/media/doc.c6d24857.svg",
        assetborrowed: "0.43",
        assetsupplied: "18.97",
        available: "18.54",
        borrowAPR: "0.0593 %",
        supplyAPR: "213548%"

      },
    ]

    return tempARra;
  }

  getPieChartDataBTC(): any {
    return [{
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
  }

  getPieChartDataUSD(): any {
    return [{
      name: 'Protocol Contract',
      y: 3323372.36
    }, {
      name: 'Lending Contract',
      y: 5075297.78
    }, {
      name: 'Amm Contract',
      y: 49778264.73
    }, {
      name: 'Bitocracy Staking Contract',
      y: 663072123.61
    }]
  }
}
