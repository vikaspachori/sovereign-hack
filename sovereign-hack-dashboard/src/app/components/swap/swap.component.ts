import { Component, OnInit } from '@angular/core';
import { CovalentapService } from 'src/app/shared/services/covalentap.service';

@Component({
  selector: 'app-swap',
  templateUrl: './swap.component.html',
  styleUrls: ['./swap.component.scss']
})
export class SwapComponent implements OnInit {

  constructor(private covalentapi: CovalentapService) { }

  async ngOnInit(): Promise<void> {
    const data = await this.covalentapi.getSwapData("30");
    debugger;
  }

}
