import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ChartsComponent } from './charts/charts.component';
import { TokenManagerComponent } from './token-manager/token-manager.component';
import { TurnOrderComponent } from './turn-order/turn-order.component';

export const routes: Routes = [ 
  
  {path:'player-turn-order', component: TurnOrderComponent},
  {path:'counters', component: TokenManagerComponent},
  {path:'charts', component: ChartsComponent},
  {path:'**', component: LandingPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
