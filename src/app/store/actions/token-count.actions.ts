import { createAction, props } from '@ngrx/store';
import { Counter, TokenCount } from '../reducers';

export const incrementToken = createAction('[Token] Increment',props<any>());
export const decrementToken = createAction('[Token] Decrement',props<any>());
export const removeToken = createAction('[Token] Remove',props<any>());
export const addToken = createAction('[Token] Add',props<any>());
