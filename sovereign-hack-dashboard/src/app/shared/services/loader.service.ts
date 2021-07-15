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

    
   setTimeout(() => {
    document.getElementById("loader").style.display = "none";
    document.getElementById("pagecontainer").classList.remove("filter");
   }, 1000);
  }
}
