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
import { characterStoreKey, turnOrderReducer } from './store/reducers/turn-order.reducer';
import { diceRoller, diceRollerReducer } from './store/reducers/dice-roller.reducer';
import { spellReducer, spellStoreKey } from './store/reducers/spell.reducer'
import { SpellSearchComponent } from './components/spells/spell-search/spell-search.component';

export const routes: Routes = [

  {
    path: 'player-turn-order', component: TurnOrderComponent,
    providers: [provideState(
      { name: characterStoreKey, reducer: turnOrderReducer }),
    ]
  },
  {
    path: 'dual-roller', component: DaggerheartDiceRollerComponent,
    providers: [provideState(
      { name: diceRoller, reducer: diceRollerReducer }),
    ]
  },
  {
    path: 'dice-roller', component: DiceRollerComponent,
    providers: [provideState(
      { name: diceRoller, reducer: diceRollerReducer }),
    ]
  },
  {
    path: 'counters', component: TokenManagerComponent,
    providers: [
      provideState(
        { name: tokenCount, reducer: tokenCountReducer }),
    ]
  },
  {
    path: 'spells', component: SpellSearchComponent,
    providers: [
      provideState(
        { name: spellStoreKey, reducer: spellReducer }),
    ]
  },
  { path: 'charts', component: ChartsComponent },
  {
    path: '**', component: TurnOrderComponent,
    providers: [provideState(
      { name: characterStoreKey, reducer: turnOrderReducer }),
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
