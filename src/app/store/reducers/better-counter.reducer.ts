import { createReducer, createSelector, on } from '@ngrx/store';
import * as Action from '../counter.actions';
import { Counters, Counter } from '.';

export const counters = 'counters';
export const initialCounters: Counters = {
  counters: undefined
};

export const betterCounterReducer = createReducer(
  initialCounters,
  on(Action.incrementToken, (state, counter) => incrementAction(state, counter)),
  on(Action.decrementToken, (state, counter) => decrementAction(state, counter)),
  on(Action.removeToken, (state, counter) => removeAction(state, counter)),
  on(Action.addToken, (state, counter) => addCounterAction(state, counter))

);


function addCounterAction(state: Counters, counter: Counter): Counters {
  let newState: Counters;
  if (!state.counters) {
    newState = {
      counters:
        [{ amount: counter.amount, name: counter.name }]
    };
  } else {
    newState = {
      counters:
        [...state.counters,
        { amount: counter.amount, name: counter.name }]
    };
  }
  return newState;
}

function removeAction(state: Counters, counter: Counter) {
  let newState: Counters = {
    counters: getOtherToken(state, counter)
  }
  return newState;
}

function getOldToken(state: Counters, counter: Counter): Counter {
  let oldToken: Counter = state.counters?.find(
    stateCounter => stateCounter.name === counter.name
  ) || counter;

  if (!oldToken) {
    addCounterAction(state, counter);
  }
  return oldToken;
}

function incrementAction(state: Counters, counter: Counter): Counters {

  let oldToken = getOldToken(state, counter);

  let newCounter = {
    name: counter.name,
    amount: oldToken.amount ? oldToken.amount + 1 : 1
  };
  let otherToken: Counter[] = [{ name: "", amount: 0 }];
  otherToken = getOtherToken(state, counter);

  let newState: Counters = {
    counters: [
      ...otherToken,
      newCounter
    ]
  };
  return newState;

}

function decrementAction(state: Counters, counter: Counter): Counters {
  let oldToken = getOldToken(state, counter);

  let newCounter = {
    name: counter.name,
    amount: oldToken.amount ? oldToken.amount - 1 : 0
  };
  let otherToken: Counter[];
  otherToken = getOtherToken(state, counter);


  let newState: Counters = {
    counters: [
      ...otherToken,
      newCounter
    ]
  };
  return newState;
}

function getOtherToken(state: Counters, counter: Counter): Counter[] {
  let returnVal =  state.counters?.filter(
    (stateCounter: Counter) => stateCounter.name !== counter.name
  ) || [{ name: "default", amount: 0 }];

  return returnVal;
}




