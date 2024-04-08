import { createAction, props } from '@ngrx/store';
import { Spell } from '../../services/srb-model/models/spell/types';



export const getSpellDetail = createAction(
  '[spells] get spell detail',
  props<Spell>());

export const setSpellDetail = createAction(
  '[spells] set spell detail',
  props<SpellAction>());

export const setSpellList = createAction(
  '[spells] set spell list',
  props<SpellsAction>());

export const getAllSpells = createAction(
  '[spells] get all spells');


/**
 * Interfaces
 */


export interface SpellsAction {
  spells: Spell[];
}
export interface SpellAction {
  spell: Spell;
}
export interface SpellStore {
  spells: Spell[];
  schools: string[];
  levels: number[];
}
