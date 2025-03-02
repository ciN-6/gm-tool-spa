/* eslint-disable @typescript-eslint/no-explicit-any */
import { createReducer, on } from '@ngrx/store';
import * as Action from '../actions/turn-order.actions';
import { CharacterStore } from '../actions/turn-order.actions';
import { TurnOrderCharacter } from '../../models/TurnOrderCharacter';
import { Monster } from '../../services/srb-model/models/monster/types';
import * as util from '../../util/util';
import { TurnOrderCharactersTypeAction } from '../actions/turn-order.actions';

export const characterStoreKey = 'characterStore';

export const initialValue: CharacterStore = {
  filteredPlayerList: [],
  characterOrder: []
};

export const turnOrderReducer = createReducer(
  initialValue,
  on(Action.reorderCharacter, (state, characterList) => reorderCharacter(state, characterList)),
  on(Action.addFilteredCharacter, (state, playerList) => addFilteredCharacter(state, playerList)),
  on(Action.setFliteredCharacterList, (state, playerList) => setFilteredPlayerList(state, playerList)),
  on(Action.setMonster, (state, monster) => setMonster(state, monster)),
  on(Action.setMonster, (state, monster) => setCurrentMonster(state, monster))
);


function setCurrentMonster(state: CharacterStore, monster: { monster: Monster } & any) {

  let newState: CharacterStore = {
    ...state,
    currentCharacter: monster.monster
  };

  return newState;
}

function setMonster(state: CharacterStore, monster: { monster: Monster } & any) {
  if (!monster)
    return state;
  let character: TurnOrderCharacter | undefined;
  let characters: TurnOrderCharacter[] = JSON.parse(JSON.stringify(state.characterOrder));
  if (characters.length > 0) {
    character = characters.find((char: TurnOrderCharacter) => {
      if (char.charcterName) {
        return util.transformIntoKey(char.charcterName) === util.transformIntoKey(monster.monster.name)
      } else return false;
    });
    if (character && !character.monster) {
      character.monster = monster.monster;
    }
  } else {
    characters = [{ charcterName: monster.monster.name, isMonster: true, monster: monster.monster }]
  }

  const newState: CharacterStore = {
    ...state,
    characterOrder: characters
  };
  return newState;
}

function reorderCharacter(state: CharacterStore, newCharacterOrder: TurnOrderCharactersTypeAction) {

  const newState: CharacterStore = {
    ...state,
    characterOrder: newCharacterOrder.characters
  };
  return newState;
}

function addFilteredCharacter(state: CharacterStore, character: TurnOrderCharacter) {
  const newFilteredList: TurnOrderCharacter[] = [...state.filteredPlayerList];
  if (character.charcterName !== undefined) {
    newFilteredList.push(character);
  }
  const newState: CharacterStore = {
    ...state,
    filteredPlayerList: newFilteredList
  };
  return newState;
}

function setFilteredPlayerList(state: CharacterStore, characterList: TurnOrderCharactersTypeAction) {
  const newState: CharacterStore = { ...state, filteredPlayerList: characterList.characters };
  return newState;
}

