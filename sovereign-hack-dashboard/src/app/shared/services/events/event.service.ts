import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  async getEvents(chainAddress: number, contractAddress: string): Promise<any>{

    const apiUrl = `${environment.apiUrl}${chainAddress}/events/address/${contractAddress}/?&key=${environment.apiKey}`;
    const data = await this.http.get(apiUrl).toPromise() as any;
    debugger;
    return data;

  }
}
