import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MargintradingComponent } from './components/margintrading/margintrading.component';
import { SwapComponent } from './components/swap/swap.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'swap',
    component: SwapComponent
  },
  {
    path: 'margintrading',
    component: MargintradingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
