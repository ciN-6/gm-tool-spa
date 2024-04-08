/* eslint-disable @typescript-eslint/no-explicit-any */
import { createReducer, on } from '@ngrx/store';
import { Spell } from '../../services/srb-model/models/spell/types';
import * as Action from '../actions/spells.actions';
import { SpellsAction, SpellStore } from '../actions/spells.actions';
import { TypedAction } from '@ngrx/store/src/models';

export const spellStoreKey = 'spellStore';

export const initialValue: SpellStore = { spells: [], schools: [], levels: [] };

export const spellReducer = createReducer(
  initialValue,
  on(Action.setSpellDetail, (state, spell) => setSpellDetail(state, spell)),
  on(Action.setSpellList, (state, spell) => setSpellList(state, spell)),
);


function setSpellList(state: SpellStore,
  newSpell: SpellsAction & TypedAction<"[spells] set spell list">) {

  let schoolFilterOptions = [
    ...new Set(newSpell.spells.map(spell => spell.school.name))
  ];
  let levelFilterOptions = [
    ...new Set(newSpell.spells.map(spell => spell.level))
  ];

  let newState: SpellStore = {
    ...state,
    spells: newSpell.spells,
    schools: schoolFilterOptions,
    levels: levelFilterOptions.sort((a, b) => a - b)
  };

  return newState;
}

function setSpellDetail(state: SpellStore,
  newSpell: Action.SpellAction & TypedAction<"[spells] set spell detail">) {

  let nSpell: Spell = newSpell.spell;
  let oldSpellIdx = state.spells.findIndex(x => x.index === nSpell.index);
  let newSpellStore: SpellStore = JSON.parse(JSON.stringify(state))
  newSpellStore.spells.splice(oldSpellIdx, 1, nSpell);
  return newSpellStore;
}



