import { createAction, props } from '@ngrx/store';
import { HopeDie } from '../../models/HopeDie';
import { Die } from '../../models/die';

export const logDiceRoll = createAction(
    '[dice-roller] dice log',
    props<{
        diceRoll: {
            modifier: number,
            roll: Die[],
        }
    }>());

export const clearDiceLog = createAction(
    '[dice-roller] clear dice log');


export const logHopeDiceRoll = createAction(
    '[dice-roller] hope dice log',
    props<{
        hopeDieRoll: {
            modifier: number,
            roll: HopeDie[]
        }
    }>());