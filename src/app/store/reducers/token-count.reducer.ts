import { createReducer, createSelector, on } from '@ngrx/store';
import * as Action from '../actions/token-count.actions';
import { Counter, TokenCount } from '..';

export const tokenCount = 'tokenCount';
export const initialCounters: TokenCount = {};

export const tokenCountReducer = createReducer(
  initialCounters,
  on(Action.incrementToken, (state, counter) => incrementAction(state, counter)),
  on(Action.decrementToken, (state, counter) => decrementAction(state, counter)),
  on(Action.removeToken, (state, counter) => removeAction(state, counter)),
  on(Action.addToken, (state, counter) => addCounterAction(state, counter))

);


function addCounterAction(state: TokenCount, counter: Counter): TokenCount {


  if (state[counter.name] > 0) {
    return state;
  }

  if (state === initialCounters) {
    let temp = { [counter.name]: counter.amount }
    return temp;
  }

  let newState = {
    ...state,
    [counter.name]: counter.amount
  }
  return newState;
}

function removeAction(state: TokenCount, counter: Counter): any {
  let newState = { ...state }
  delete newState[counter.name];
  return newState;
}

function incrementAction(state: TokenCount, counter: Counter): TokenCount {
  let newCount = state[counter.name] + 1;
  let newState = {
    ...state,
    [counter.name]: newCount
  }
  return newState;
}

function decrementAction(state: TokenCount, counter: Counter): TokenCount {
  let newCount = state[counter.name] - 1;
  let newState = {
    ...state,
    [counter.name]: newCount
  }
  return newState;
}






