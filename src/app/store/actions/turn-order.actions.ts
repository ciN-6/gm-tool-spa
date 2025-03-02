import { createAction, props } from '@ngrx/store';
import { TurnOrderCharacter } from '../../models/TurnOrderCharacter';
import { Monster } from '../../services/srb-model/models/monster/types';



export const reorderCharacter = createAction(
  '[turn-order] reorder',
  props<TurnOrderCharactersTypeAction>());

export const addFilteredCharacter = createAction(
  '[turn-order] add one player',
  props<TurnOrderCharacter>());

export const setFliteredCharacterList = createAction(
  '[turn-order] replace player list',
  props<TurnOrderCharactersTypeAction>());

export const setMonster = createAction(
  '[monster-card] set monster',
  props<{ monster: Monster }>());

export const getMonster = createAction(
  '[Monster] get monster',
  props<{ name?: string }>());

export const setCurrentCharacter = createAction(
  '[monster-card] set current monster',
  props<{ monster: Monster }>());

/**
 * Interfaces
 */

export interface TurnOrderCharactersTypeAction {
  characters: TurnOrderCharacter[];
}

export interface CharacterStore {
  currentCharacter?: Monster;
  characterOrder: TurnOrderCharacter[];
  filteredPlayerList: TurnOrderCharacter[];
}

