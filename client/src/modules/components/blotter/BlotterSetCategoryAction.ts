import {State} from "../../RootStore";

interface IPayload {
    pendingSelected: boolean
}

export const BlotterSetCategoryType: string = "BLOTTER_SET_CATEGORY";

export default interface BlotterSetCategoryAction {
    type: typeof BlotterSetCategoryType
    payload: IPayload
}

export function createBlotterSetCategoryAction(state: State, selectPending: boolean): BlotterSetCategoryAction {
    return {
        type: BlotterSetCategoryType,
        payload: {
            pendingSelected: selectPending
        }
    }
}
