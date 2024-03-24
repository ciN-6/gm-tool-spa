import { createSelector } from "@ngrx/store";
import { Counters } from '../reducers';


export const selectAllTokenCounters = (state: Counters) =>
    state.counters;

export const selectTokenCounter = (name: string) => {
    return createSelector(selectAllTokenCounters, (allCounters: any) => {
        if (allCounters) {
            return allCounters.counters?.find((x: any) => x.name === name)
        }
    })
};
