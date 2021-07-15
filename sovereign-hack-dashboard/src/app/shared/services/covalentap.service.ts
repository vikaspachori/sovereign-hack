import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { SwapData, SwapInterface } from '../models/swap.model';
import { environment } from 'src/environments/environment';
import { contractsInformation } from '../models/contractsinformation';
import { WallterVolume } from '../models/walletvolume.model';
import { LendingData, LendingDataForGet } from 'src/app/models/lending.model';

@Injectable({
  providedIn: 'root'
})
export class CovalentapService {

  constructor(private http: HttpClient) { }

  public async getSwapData(chainid: string): Promise<SwapData> {
    const d = new Date();
    const endDate = this.formatDate(d);
    d.setDate(d.getDate() - 7);
    const startDate = this.formatDate(d);
    const getBlockapiUlrl = `${environment.apiUrl + chainid}/block_v2/${startDate}/${endDate}/?limit=1&key=${environment.apiKey}`;
    const heightData = await this.http.get(getBlockapiUlrl).toPromise() as any
    const blockHeight = heightData.data.items[0].height;
    const swapDataurl = `${environment.apiUrl}${chainid}/events/address/${environment.swapNetworkAddress}/?starting-block=${blockHeight}&ending-block=latest&key=${environment.apiKey}`;
    const swapdata = await this.http.get(swapDataurl).toPromise() as any;
    return this.formatSwapData(swapdata.data.items)
  }

  public async get24Vol(chaini: string): Promise<Array<WallterVolume>> {
    const apiUrl = `${environment.apiUrl}${chaini}/address/${environment.soverentadress}/balances_v2/?&key=${environment.apiKey}`;
    const data = await this.http.get(apiUrl).toPromise() as any;
    const returnARray = new Array<WallterVolume>()
    data.data.items.forEach(element => {
      returnARray.push(element)
    });
    return returnARray

  }
  private getAdddressName(address: string): string {
    const keys = Object.keys(contractsInformation);
    const data = keys.filter(d => contractsInformation[d].address.toLowerCase() == address);
    return data.length > 0 ? data[0] : "N/A"
  }
  private formatSwapData(data: any): SwapData {
    const swappedDataArray = new Array<SwapInterface>();
    const hashFromObj = {};
    const hashToObject = {};
    for (let index = 0; index < data.length; index++) {
      const swapData: SwapInterface = {};

      const params = data[index].decoded.params;
      for (let i = 0; i < params.length; i++) {
        const element = params[i];
        switch (element.name) {
          case "_fromToken": {
            swapData.fromTokenAddress = element.value;
            swapData.fromTokenName = this.getAdddressName(element.value);
            if (!hashFromObj[swapData.fromTokenName]) {
              hashFromObj[swapData.fromTokenName] = 1;
            }
            else {

              hashFromObj[swapData.fromTokenName] += 1;
            }
          }
            break;
          case "_toToken": {
            swapData.toTokenAddress = element.value;
            swapData.toTokenName = this.getAdddressName(element.value);
            if (!hashToObject[swapData.toTokenName]) {
              hashToObject[swapData.toTokenName] = 1;
            }
            else {

              hashToObject[swapData.toTokenName] += 1;
            }

          }
            break;
          case "_fromAmount":
            {
              swapData.fromTokenValue = element.value;

            }
            break;
          case "_toAmount":
            {
              swapData.toTokenValue = element.value;
            }
            break;
          case "_trader": {
            swapData.traderAddres = element.value;
            swapData.traderName = this.getAdddressName(element.value);
          }
            break;

          default:
            break;
        }
      }
      swappedDataArray.push(swapData)
    }

    const swapdata: SwapData = {
      fromVal: hashFromObj,
      toVal: hashToObject,
      swapdata: swappedDataArray
    }
    return swapdata;
  }



  async getLendingStats(chainid: string): Promise<any> {
    const d = new Date();
    let gethelpdata = new Array<LendingDataForGet>();
    const endDate = this.formatDate(d);
    d.setDate(d.getDate() - 7);
    const startDate = this.formatDate(d);
    const getBlockapiUlrl = `${environment.apiUrl + chainid}/block_v2/${startDate}/${endDate}/?limit=1&key=${environment.apiKey}`;
    const heightData = await this.http.get(getBlockapiUlrl).toPromise() as any
    const blockHeight = heightData.data.items[0].height;

    gethelpdata = Object.keys(contractsInformation).map(d => {
      if (d.includes("_lending")) {
        return {
          name: d,
          address: `${environment.apiUrl}${chainid}/events/address/${contractsInformation[d].address}/?starting-block=${blockHeight}&ending-block=latest&key=${environment.apiKey}`
        };
      }
    }).filter(d => d) as any;

    return await this.getAllUrls(gethelpdata);

  }


  parseToLendingData(items) {

  }
  async getAllUrls(urls) {
    try {
      var data = await Promise.all(
        urls.map(
          url =>
            fetch(url.address).then(
              async (response) => {
                const tempdata = await response.json();
                let filteredarr = [];
                if (tempdata.data.items && tempdata.data.items.length > 0) {
                  filteredarr = tempdata.data.items.filter(d => d.decoded.name === "Transfer")
                }
                return {
                  name: url.name,
                  data: filteredarr
                }
              }
            )));

      return (data)

    } catch (error) {
      console.log(error)

      throw (error)
    }
  }

  private formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }
}
