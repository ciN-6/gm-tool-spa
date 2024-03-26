import { isDevMode } from '@angular/core';
import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';

export interface State { }
export const reducers: ActionReducerMap<State> = {};
export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];

export interface Counters {
  counters?: Counter[];
}

export interface Counter {
  name: string;
  amount: number;
}

export interface TokenCount {
  [key: string]: number
}

export interface turnOrderStore { turnOrder: string[]; }
