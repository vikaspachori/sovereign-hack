import { Component, OnInit } from '@angular/core';
import { SwapInterface } from 'src/app/shared/models/swap.model';
import { CovalentapService } from 'src/app/shared/services/covalentap.service';

@Component({
  selector: 'app-swap',
  templateUrl: './swap.component.html',
  styleUrls: ['./swap.component.scss']
})
export class SwapComponent implements OnInit {

  constructor(private covalentapi: CovalentapService) { }
  data: Array<SwapInterface>
  async ngOnInit(): Promise<void> {
    this.data = await this.covalentapi.getSwapData("30");
    document.getElementById("swaptable").style.height = (window.innerHeight - 88) + "px"

  }

}
