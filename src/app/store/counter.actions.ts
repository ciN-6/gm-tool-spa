import { createAction, props } from '@ngrx/store';
import { Counter } from './reducers';

export const incrementToken = createAction('[CountToken] Increment',props<Counter>());
export const decrementToken = createAction('[CountToken] Decrement',props<Counter>());
export const removeToken = createAction('[Counter Component] Remove',props<Counter>());
export const addToken = createAction('[Counter Component] Add',props<Counter>());
