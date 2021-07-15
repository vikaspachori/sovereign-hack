import { Component, OnInit } from '@angular/core';
import { eventData } from 'src/app/models/events.models';
import { EventService } from 'src/app/shared/services/events/event.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-margintrading',
  templateUrl: './margintrading.component.html',
  styleUrls: ['./margintrading.component.scss']
})
export class MargintradingComponent implements OnInit {

  constructor(private eventService: EventService, private loader: LoaderService) { }
  tradeTopicAddress = "0xf640c1cfe1a912a0b0152b5a542e5c2403142eed75b06cde526cee54b1580e5c";
  closeTopicAddress = "0x2ed7b29b4ca95cf3bb9a44f703872a66e6aa5e8f07b675fa9a5c124a1e5d7352";
  blockStartAddress = 3514334;

  public buy: eventData | any;
  public sell: eventData | any;

  async ngOnInit(): Promise<void> {
    this.loader.showLoader();
    this.buy = await this.eventService.getEvents(30, this.tradeTopicAddress, this.blockStartAddress);


    
    this.sell = await this.eventService.getEvents(30, this.closeTopicAddress, this.blockStartAddress);

    this.loader.hideLoader();
  }

}
