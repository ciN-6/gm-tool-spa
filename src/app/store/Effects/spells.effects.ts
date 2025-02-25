import { Injectable } from "@angular/core";
import { SrbApiService } from "../../services/srb-api.service";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, Observable } from "rxjs";
import { map, catchError, switchMap } from 'rxjs/operators';
import * as util from '../../util/util'
import { Spell } from "../../services/srb-model/models/spell/types";
import { Apollo, gql } from "apollo-angular";

const cache = new Map();

@Injectable()
export class SpellsEffects {

  constructor(
    private actions$: Actions,
    private service: SrbApiService,
    private graphql: Apollo
  ) { }

  loadSpells = createEffect(() => this.actions$.pipe(
    ofType('[spells] get spell detail'),
    switchMap((spell: any) => {

      if (cache.has(util.transformIntoKey(spell.name))) {
        let tmp = cache.get(util.transformIntoKey(spell.name));
        if (tmp.desc) {
          return this.getCache(spell);
        }
      }
      return this.getSpellDetail(spell);

    })));

  loadOneSpell = createEffect(() => this.actions$.pipe(
    ofType('[spells] get all spells'),
    switchMap(() => {
      // return this.getAllSpellsGraphQL();
      return this.getAllSpells();
    })));




  private getCache(spell: Spell) {

    let spellData = cache.get(util.transformIntoKey(spell.name));
    return new Observable<Spell>(sub => {
      setTimeout(() => sub.next(spellData));
    }).pipe(
      map(spell => {
        return ({ type: '[spells] set spell', monster: spell })
      }),
      catchError(() => {
        console.error("SPELL EFFECT | getCache::[spells] set spell error");
        return EMPTY
      })
    );
  }

  private getAllSpells() {
    return this.service.getAllSpells()
      .pipe(
        map(spellReceived => {
          return ({ type: '[spells] set spell list', spells: spellReceived })
        }),
        catchError(() => {
          console.error("SPELL EFFECT | getAllSpells::[spells] set spell list error");
          return EMPTY
        })
      );
  }



  private getSpellDetail(spell: Spell) {
    return this.service.getSpell(spell.index)
      .pipe(
        map(spellReceived => {
          cache.set(util.transformIntoKey(spell.name), spellReceived);
          return ({ type: '[spells] set spell detail', spell: spellReceived })
        }),
        catchError(() => {
          console.error("SPELL EFFECT | getSpellDetail::[spells] set spell detail error");
          return EMPTY
        })
      );
  }
}