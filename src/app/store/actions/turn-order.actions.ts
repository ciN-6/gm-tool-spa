import { createAction, props } from '@ngrx/store';

export const reorder = createAction(
    '[turn-order] reorder',
    props<{turnOrder: string[]}>());
