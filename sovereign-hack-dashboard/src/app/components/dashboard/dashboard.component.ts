import { Component, OnInit } from '@angular/core';
import { faDollarSign,faCoins } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  faDollarSign = faDollarSign;
  faCoins = faCoins;

  ngOnInit(): void {
  }

}
