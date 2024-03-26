import { isDevMode } from '@angular/core';
import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { Die } from '../../models/die';
import { HopeDie } from '../../models/HopeDie';

export interface State { }
export const reducers: ActionReducerMap<State> = {};
export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];

/**
 * Token counters
 */
export interface CounterStore {
  counters?: Counter[];
}

export interface Counter {
  name: string;
  amount: number;
}

export interface TokenCount {
  [key: string]: number
}

/**
 * Turn Order Store
 */
export interface TurnOrderStore { turnOrder: string[]; }


/**
 * Dice Roller Store
 */

export interface DiceRollerStore {
  diceRoll: DiceRoll[];
  hopeDieRoll: HopeDiceRoll[];
}

export interface DiceRoll{
  modifier: number, 
  roll: Die[]
}

export interface HopeDiceRoll{
  modifier: number, 
  roll: HopeDie[]
}