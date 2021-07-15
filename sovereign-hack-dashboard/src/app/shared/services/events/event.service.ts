import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  //3514334

  //0x2ed7b29b4ca95cf3bb9a44f703872a66e6aa5e8f07b675fa9a5c124a1e5d7352 closewithswap

  //0xf640c1cfe1a912a0b0152b5a542e5c2403142eed75b06cde526cee54b1580e5c trade

  async getEvents(chainAddress: number, contractAddress: string, blockNumber: number): Promise<any>{
    const apiUrl = `${environment.apiUrl}${chainAddress}/events/topics/${contractAddress}/?starting-block=${blockNumber}&ending-block=latest&key=${environment.apiKey}`;
    const data = await this.http.get(apiUrl).toPromise() as any;
    return data;

  }
}
