import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ChartsComponent } from './components/charts/charts.component';
import { TokenManagerComponent } from './components/token-manager/token-manager.component';
import { TurnOrderComponent } from './components/turn-order/turn-order.component';
import { DiceRollerComponent } from './components/dice-roller/dice-roller.component';
import { DaggerheartDiceRollerComponent } from './components/daggerheart-dice-roller/daggerheart-dice-roller.component';
import { provideState } from '@ngrx/store';
import { tokenCount, tokenCountReducer } from './store/reducers/token-count.reducer';
import { turnOrder, turnOrderReducer } from './store/reducers/turn-order.reducer';

export const routes: Routes = [

  {
    path: 'player-turn-order', component: TurnOrderComponent,
    providers: [provideState(
      { name: turnOrder, reducer: turnOrderReducer }),
    ]
  },
  { path: 'dual-roller', component: DaggerheartDiceRollerComponent },
  { path: 'dice-roller', component: DiceRollerComponent },
  {
    path: 'counters', component: TokenManagerComponent,
    providers: [
      provideState(
        { name: tokenCount, reducer: tokenCountReducer }),
    ]
  },
  { path: 'charts', component: ChartsComponent },
  { path: '**', component: LandingPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
