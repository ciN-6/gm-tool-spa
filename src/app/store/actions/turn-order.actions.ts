import { createAction, props } from '@ngrx/store';
import { TurnOrderCharacter } from '../../models/TurnOrderCharacter';



export const reorderCharacter = createAction(
    '[turn-order] reorder',
    props<{ order: TurnOrderCharacter[] }>());

export const addFilteredCharacter = createAction(
    '[turn-order] add one player',
    props<TurnOrderCharacter>());

export const setFliteredCharacterList = createAction(
    '[turn-order] replace player list',
    props<{ characters: TurnOrderCharacter[] }>());





// OLD CODE>>
export const reorder = createAction(
    '[turn-order] reorder',
    props<{ order: string[] }>());

export const addFilteredPlayer = createAction(
    '[turn-order] add one player',
    props<{ playerName: string }>());

export const setFliteredPlayerList = createAction(
    '[turn-order] replace player list',
    props<{ playerNames: string[] }>());

// <<OLD CODE
