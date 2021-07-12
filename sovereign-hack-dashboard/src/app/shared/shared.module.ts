import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { HttpClientModule } from "@angular/common/http";


@NgModule({
  declarations: [SideNavComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [SideNavComponent]
})
export class SharedModule { }
