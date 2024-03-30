import { createReducer, on } from '@ngrx/store';
import * as Action from '../actions/turn-order.actions';
import { CharacterStore, TurnOrderStore as TurnOrderStore } from '..';
import { TurnOrderCharacter } from '../../models/TurnOrderCharacter';
import { TypedAction } from '@ngrx/store/src/models';

export const turnOrder = 'turnOrder';
export const initialValue: TurnOrderStore = { order: [], filteredPlayerList: [] };

export const initialValue2: CharacterStore = { 
  filteredPlayerList:[],
  characterOrder:[]
 };

export const turnOrderReducer = createReducer(
  initialValue2,
  // on(Action.reorder, (state, tokenCounter) => reorder(state, tokenCounter)),
  // on(Action.addFilteredPlayer, (state, playerName) => addFilteredPlayer(state, playerName)),
  // on(Action.setFliteredPlayerList, (state, playerList) => setFilteredPlayerList(state, playerList)),
  
  // newstuff

  on(Action.reorderCharacter, (state, characterList) => reorderCharacter(state, characterList)),
  on(Action.addFilteredCharacter, (state, playerList) => addFilteredCharacter(state, playerList)),
  on(Action.setFliteredCharacterList, (state, playerList) => setFilteredPlayerList(state, playerList))

);



function reorderCharacter(state: CharacterStore, newCharacterOrder: TurnOrderCharacter[]|any) {
  let newState:CharacterStore = { 
    ...state,
    characterOrder:newCharacterOrder.order
   }
  return newState;
}

function addFilteredCharacter(state: CharacterStore, character: TurnOrderCharacter|any) {

  let newFilteredList: TurnOrderCharacter[] = [...state.filteredPlayerList]
  newFilteredList.push(character);
  let newState: CharacterStore = {
    ...state,
    filteredPlayerList: newFilteredList
  };

  return newState;
}

function setFilteredPlayerList(state: CharacterStore, characterList: TurnOrderCharacter[]|any) {
  let newState:CharacterStore = { ...state, filteredPlayerList: characterList.characters };
  return newState;
}








//OLD>>
// function reorder(state: TurnOrderStore, newTurnOrder: any) {

//   let newState = { ...state, order: newTurnOrder.order }
//   return newState;
// }

// function addFilteredPlayer(state: TurnOrderStore, list: any) {

//   let newFilteredList: string[] = JSON.parse(JSON.stringify(state.filteredPlayerList));
//   newFilteredList.push(list.playerName);
//   let newState: TurnOrderStore = {
//     ...state,
//     filteredPlayerList: newFilteredList
//   };

//   return newState;
// }

// function setFilteredPlayerList(state: TurnOrderStore, list: any) {
//   let newState = { ...state, filteredPlayerList: list.playerNames };
//   return newState;
// }
//<<OLD