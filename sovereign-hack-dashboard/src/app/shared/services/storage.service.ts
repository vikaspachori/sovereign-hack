import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setData(chainid, address) {
    localStorage.setItem("chainid", chainid);
    localStorage.setItem("address", address)
  }

  getData() {
    return {
      chainid: localStorage.getItem("chainid"),
      address: localStorage.getItem("address")
    }
  }
}
