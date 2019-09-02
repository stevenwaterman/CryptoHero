import {State} from "../../RootStore";

export const BlotterSetCategoryType: string = "BLOTTER_SET_CATEGORY";

export default interface BlotterSetCategoryAction {
    type: typeof BlotterSetCategoryType
    payload: {
        newState: string
    }
}

export function createBlotterSetCategoryAction(state: State, newState: string): BlotterSetCategoryAction {
    return {
        type: BlotterSetCategoryType,
        payload: {
            newState: newState
        }
    }
}
