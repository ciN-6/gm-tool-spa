/* eslint-disable @typescript-eslint/no-explicit-any */

import { characterStoreKey } from '../reducers/turn-order.reducer';

export const selectTurnOrder = (state: any) => {
  return state[characterStoreKey].characterOrder;
};

export const selectCurrentCharacter = (state: any) => {
  return state[characterStoreKey].currentCharacter;
};

export const selectFilteredPlayerList = (state: any) => {
  return state[characterStoreKey].filteredPlayerList;
};



