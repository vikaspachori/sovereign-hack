import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/shared/services/events/event.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-margintrading',
  templateUrl: './margintrading.component.html',
  styleUrls: ['./margintrading.component.scss']
})
export class MargintradingComponent implements OnInit {

  constructor(private eventService: EventService) { }

  async ngOnInit(): Promise<void> {
    await this.eventService.getEvents(30, environment.soverentadress);
  }

}
