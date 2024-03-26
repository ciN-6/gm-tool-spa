import { diceRoller } from "../reducers/dice-roller.reducer";

export const selectDiceRoll = (state: any) => {
    return state['diceRoller']['diceRoll'];
}

export const selectHopeDiceRoll = (state: any) => {
    return state['hopeDieRoll'];
}



