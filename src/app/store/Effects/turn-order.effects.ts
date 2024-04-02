import { Injectable } from "@angular/core";
import { SrbApiService } from "../../services/srb-api.service";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from "rxjs";
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { Monster } from "../../services/srb-model/models/monster/types";

@Injectable()
export class TurnOrderEffects {

  loadMonster = createEffect(() => this.actions$.pipe(
    ofType('[Monster] get monster'),
    exhaustMap((mstr: { name: string }) => {
      return this.service.getMonster(mstr.name)
        .pipe(
          map(monster => {
            return ({ type: '[monster-card] set monster', monster })
          }),
          catchError(() => {
            console.log("error");
            return EMPTY
          })
        )
    })
  ));

  constructor(
    private actions$: Actions,
    private service: SrbApiService
  ) { }
}