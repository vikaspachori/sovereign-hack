import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { SwapInterface } from '../models/swap.model';
import { environment } from 'src/environments/environment';
import { contractsInformation } from '../models/contractsinformation';

@Injectable({
  providedIn: 'root'
})
export class CovalentapService {

  constructor(private http: HttpClient) { }

  public async getSwapData(chainid: string): Promise<Array<SwapInterface>> {
    const d = new Date();
    const endDate = this.formatDate(d);
    d.setDate(d.getDate() - 7);
    const startDate = this.formatDate(d);
    const getBlockapiUlrl = `${environment.apiUrl + chainid}/block_v2/${startDate}/${endDate}/?limit=1&key=${environment.apiKey}`;
    const heightData = await this.http.get(getBlockapiUlrl).toPromise() as any
    const blockHeight = heightData.data.items[0].height;
    const swapDataurl = `${environment.apiUrl}${chainid}/events/address/${environment.address}/?starting-block=${blockHeight}&ending-block=latest&key=${environment.apiKey}`;
    const swapdata = await this.http.get(swapDataurl).toPromise() as any;
    return this.formatSwapData(swapdata.data.items)
  }

  private getAdddressName(address: string): string {
    const keys = Object.keys(contractsInformation);
    const data = keys.filter(d => contractsInformation[d].address.toLowerCase() == address);
    return data.length > 0 ? data[0] : "N/A"
  }
  private formatSwapData(data: any): Array<SwapInterface> {
    const swappedDataArray = new Array<SwapInterface>();
    const hashObject = {};
    for (let index = 0; index < data.length; index++) {
      const swapData: SwapInterface = {};

      const params = data[index].decoded.params;
      for (let i = 0; i < params.length; i++) {
        const element = params[i];
        switch (element.name) {
          case "_fromToken": {
            swapData.fromTokenAddress = element.value;
            swapData.fromTokenName = this.getAdddressName(element.value);
          }
            break;
          case "_toToken": {
            swapData.toTokenAddress = element.value;
            swapData.toTokenName = this.getAdddressName(element.value);
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
    return swappedDataArray;
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
