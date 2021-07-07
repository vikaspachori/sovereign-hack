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
}
