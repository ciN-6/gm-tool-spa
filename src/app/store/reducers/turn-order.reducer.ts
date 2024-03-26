import { createReducer, createSelector, on } from '@ngrx/store';
import * as Action from '../actions/turn-order.actions';
import { turnOrderStore as TurnOrderStore } from '.';

export const turnOrder = 'turnOrder';
export const initialValue: TurnOrderStore = {turnOrder:[]};

export const turnOrderReducer = createReducer(
  initialValue,
  on(Action.reorder, (state, counter) => reorder(state, counter))
);

function reorder(state:TurnOrderStore, turnOrder: TurnOrderStore) {
  let newTurn = Object.create({turnOrder:turnOrder.turnOrder});
  return newTurn;
}


