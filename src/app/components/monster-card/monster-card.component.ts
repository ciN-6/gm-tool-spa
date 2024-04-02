import { Component, Input, OnChanges, SimpleChanges, type OnDestroy, type OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import * as fakeapi from './data';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CharacterStore } from '../../store/actions/turn-order.actions';
import { Store } from '@ngrx/store';
import { SrbApiService } from '../../services/srb-api.service';
import { Monster } from '../../services/srb-model/models/monster/types';
import { Subscription } from 'rxjs';
import * as actions from '../../store/actions/turn-order.actions';
import * as selector from '../../store/selectors/turn-order.selector';
import { MatButtonModule } from '@angular/material/button';
import { DndStatsComponent } from '../dnd-stats/dnd-stats.component';


@Component({
  selector: 'app-monster-card',
  standalone: true,
  imports: [
    DndStatsComponent,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule],
  templateUrl: './monster-card.component.html',
  styleUrl: './monster-card.component.scss'
})
export class MonsterCardComponent implements OnInit, OnDestroy, OnChanges {

  @Input() monsterName!: string;

  private readonly subs: Subscription = new Subscription();
  public conditions = fakeapi.condition.results;
  public monster!: Monster;

  ngOnInit(): void {
    this.getMonster();
    this.store.select(selector.selectCurrentCharacter).subscribe({
      next: (currentMonster) => {
        this.monster = currentMonster;
      }
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  constructor(
    private readonly store: Store<CharacterStore>,
    private readonly srbApi: SrbApiService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['monsterName'].previousValue !== changes['monsterName'].currentValue) {
      this.monsterName = changes['monsterName'].currentValue;
      this.getMonster();
    }
  }


  private getMonsterSpecific(newMonsterName: string): void {
    // console.log('getMonsterSpecific', newMonsterName)
    // if (newMonsterName)
    //   this.store.dispatch(actions.getMonster({ name: newMonsterName }));
  }

  private getMonster(): void {
    this.store.dispatch(actions.getMonster({ name: this.monsterName }));
    // this.subs.add(this.srbApi.getMonster(this.monsterName).subscribe({
    //   next: (val) => {
    //     this.monster = val;
    //     this.store.dispatch(actions.setMonster(val));
    //   },
    //   error: (error) => console.log(this.monsterName, 'not found.', error)
    // }));
  }
}
