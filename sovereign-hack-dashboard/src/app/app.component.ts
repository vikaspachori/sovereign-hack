import { Component } from '@angular/core';
import { StorageService } from './shared/services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sovereign-hack-dashboard';
  constructor(private st: StorageService) {
  
  }
}
