import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ChartsComponent } from './charts/charts.component';
import { TokenManagerComponent } from './token-manager/token-manager.component';
import { TurnOrderComponent } from './turn-order/turn-order.component';
import { DiceRollerComponent } from './dice-roller/dice-roller.component';
import { DaggerheartDiceRollerComponent } from './daggerheart-dice-roller/daggerheart-dice-roller.component';

export const routes: Routes = [ 
  
  {path:'player-turn-order', component: TurnOrderComponent},
  {path:'dual-roller', component: DaggerheartDiceRollerComponent},
  {path:'dice-roller', component: DiceRollerComponent},
  {path:'counters', component: TokenManagerComponent},
  {path:'charts', component: ChartsComponent},
  {path:'**', component: LandingPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }