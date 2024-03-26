import { createReducer, createSelector, on } from '@ngrx/store';
import * as Action from '../actions/dice-roller.actions';
import { Die } from '../../models/die';
import { DiceRollerStore } from '.';
import { HopeDie } from '../../models/HopeDie';


export const diceRoller = 'diceRoller';
export const initialValue: DiceRollerStore = { diceRoll: [], hopeDieRoll: [] };

export const diceRollerReducer = createReducer(
  initialValue,
  on(Action.logDiceRoll, (state, rolledDice) => logDiceRoll(state, rolledDice)),
  on(Action.logHopeDiceRoll, (state, rolledDice) => logHopeDiceRoll(state, rolledDice))
);

function logDiceRoll(state: DiceRollerStore, rolledDice: any) {

  let newState:DiceRollerStore = {
    ...state,
    diceRoll: [
      ...state.diceRoll, {
        modifier: rolledDice.diceRoll.modifier,
        roll: rolledDice.diceRoll.roll
      }
    ]
  };

  return newState
}


function logHopeDiceRoll(state: DiceRollerStore, rolledDice: any) {

  let newHopeDie = [...state.hopeDieRoll, rolledDice]
  return {
    ...state,
    hopeDieRoll: newHopeDie
  };
}

