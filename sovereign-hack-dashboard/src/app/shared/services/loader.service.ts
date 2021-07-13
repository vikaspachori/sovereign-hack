import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }
  showLoader() {
    document.getElementById("pagecontainer").classList.add("filter");
    document.getElementById("loader").style.display = "block";
  }

  hideLoader() {
    document.getElementById("pagecontainer").classList.remove("filter");
    document.getElementById("loader").style.display = "none";
  }
}
