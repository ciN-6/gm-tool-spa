import { Injectable } from "@angular/core";
import { SrbApiService } from "../../services/srb-api.service";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, Observable } from "rxjs";
import { map, catchError, switchMap } from 'rxjs/operators';
import { Monster } from "../../services/srb-model/models/monster/types";
import * as util from '../../util/util'

const cache = new Map();

@Injectable()
export class TurnOrderEffects {

  loadMonster = createEffect(() => this.actions$.pipe(
    ofType('[Monster] get monster'),
    switchMap((mstr: any) => {
      if (cache.has(util.transformIntoKey(mstr.name))) {
        return this.getCache(mstr);
      } else {
        return this.callService(mstr);
      }
    })));

  constructor(
    private actions$: Actions,
    private service: SrbApiService
  ) { }


  private getCache(mstr: Monster) {
    let monster = cache.get(util.transformIntoKey(mstr.name));


    return new Observable<Monster>(sub => {
      setTimeout(() => sub.next(monster));
      //sub.complete();
    }).pipe(

      map(monster => {
        return ({ type: '[monster-card] set monster', monster })
      }),
      catchError(() => {
        console.error("TURN-ORDER Effect | getCache::[monster-card] set monster error");
        return EMPTY
      })
    );
  }

  private callService(mstr: Monster): Observable<{ type: string; monster: Monster; }> {
    return this.service.getMonster(mstr.name)
      .pipe(
        map(monster => {
          cache.set(util.transformIntoKey(mstr.name), monster);
          return ({ type: '[monster-card] set monster', monster })
        }),
        catchError(() => {
          console.error("TURN-ORDER Effect | callService::[monster-card] set monster error");
          return EMPTY
        })
      );
  }
}