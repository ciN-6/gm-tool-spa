import { createSelector } from "@ngrx/store";
import { TokenCount } from '..';



export const selectToken = (state:any) =>
    state["tokenCount"];

export const newSelectTokenCounter = (key: string) => {
    return createSelector(
        selectToken,
        (token: TokenCount) => {
            return token[key]
        })
}


