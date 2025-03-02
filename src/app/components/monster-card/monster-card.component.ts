import { Component, Input, OnChanges, SimpleChanges, type OnDestroy, type OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import * as fakeapi from './data';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CharacterStore } from '../../store/actions/turn-order.actions';
import { Store } from '@ngrx/store';
import { SrbApiService } from '../../services/srb-api.service';
import { Monster, SpecialAbility } from '../../services/srb-model/models/monster/types';
import { Subscription } from 'rxjs';
import * as actions from '../../store/actions/turn-order.actions';
import * as selector from '../../store/selectors/turn-order.selector';
import { MatButtonModule } from '@angular/material/button';
import { CharacterAbilityScore } from '../character-sheet/character-ability-scores/character-ability-scores.component';
import { CharacterCardSimpleListSectionComponent } from '../character-sheet/character-card-simple-list-section/character-card-simple-list-section.component';
import { CharacterActionComponent } from '../character-sheet/character-action/character-action.component';
import { TurnOrderCharacter } from '../../models/TurnOrderCharacter';
import { Router } from '@angular/router';
import { transformIntoKey } from '../../util/util';
import { J } from '@angular/cdk/keycodes';

export interface SpellLevel {
  slots: string;
  spells: string[];
}


@Component({
  selector: 'app-monster-card',
  standalone: true,
  imports: [
    CharacterActionComponent,
    CharacterCardSimpleListSectionComponent,
    CharacterAbilityScore,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule],
  templateUrl: './monster-card.component.html',
  styleUrl: './monster-card.component.scss'
})
export class MonsterCardComponent implements OnInit, OnDestroy, OnChanges {

  @Input() monsterReceived!: TurnOrderCharacter;

  private readonly subs: Subscription = new Subscription();
  public conditions = fakeapi.condition.results;
  public monster!: Monster;

  public spellList: Map<string, SpellLevel> = new Map<string, SpellLevel>();

  ngOnInit(): void {
    this.subs.add(
      this.store.select(selector.selectCurrentCharacter).subscribe({
        next: (currentMonster) => {
          this.monster = currentMonster;
        }
      }));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  constructor(
    private readonly store: Store<CharacterStore>,
    private readonly srbApi: SrbApiService,
    private readonly route: Router
  ) { }

  /**
   * Catch les changements provenant du parent.
   * @param changes 
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['monsterReceived'].previousValue !== changes['monsterReceived'].currentValue) {
      this.monster = changes['monsterReceived'].currentValue.monster;
      this.getMonster();
    }
  }

  /**
   * Consume one spell slot.
   * @param level 
   * @returns 
   */
  substract(level: string) {
    let spell = this.spellList.get(level);
    if (!spell) {
      return;
    }

    let match = spell?.slots.match(/(\d+)(\s\w+)/);
    if (match) {
      let numberOfSpells = parseInt(match[1]) - 1;
      spell.slots = numberOfSpells + match[2];
    }
    this.store.dispatch(actions.setCurrentCharacter({ monster: this.monster }));
  }


  public routeToSpell(spell: string) {
    this.route.navigateByUrl(`/spells/${transformIntoKey(spell)}`);
  }


  /**
   * Check is l'ability est un spellcasting et extrait les spells.
   * @param ability 
   * @returns 
   */
  public isSpellCastingThenExtractSpells(ability: SpecialAbility) {
    if (ability.name === 'Spellcasting') {
      if (this.spellList.size === 0) {
        this.parseAbility(ability.desc);
      }
      return true;
    }
    return false;
  }

  /**
   * Parse la description pour en extraire un joli Map object qui contiens les monsterSpellLevel.
   * @param ability 
   */
  public parseAbility(ability: string) {

    let parsedString = ability.split('- ');
    let spells: Map<string, SpellLevel> = new Map();
    for (let level of parsedString) {
      let spellLine = level.match(/(.*) \((.*)\):(.*),*/);
      if (spellLine?.[2] === undefined) {
        continue;
      }
      let spellList = spellLine?.[3].split(',').map(spell => spell.trim());
      let spellLevel = {
        slots: spellLine?.[2],
        spells: spellList
      }
      spells.set(spellLine?.[1], spellLevel)
    }

    this.spellList = spells;
  }

  private getMonster(): void {
    this.store.dispatch(actions.getMonster({ name: this.monsterReceived?.charcterName }));
  }


}
