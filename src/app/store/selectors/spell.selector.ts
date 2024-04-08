/* eslint-disable @typescript-eslint/no-explicit-any */

import { createSelector } from '@ngrx/store';
import { Spell } from '../../services/srb-model/models/spell/types';
import { spellStoreKey } from '../reducers/spell.reducer';

export const selectspell = (state: any) => {
  return state[spellStoreKey].spells;
};

export const selectLevel = (state: any) => {
  return state[spellStoreKey].levels;
};

export const selectMagicSchool = (state: any) => {
  return state[spellStoreKey].schools;
};

export const selectSpecificSpell = (spellIdx: string) => {
  return createSelector(
    selectspell,
    (value: Spell[]) => {
      let result = value.find(x => x.index === spellIdx)
      return result
    })

};


