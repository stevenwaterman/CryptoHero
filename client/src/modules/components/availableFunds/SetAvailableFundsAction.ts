import {State} from "../../RootStore";

export const SetAvailableFundsType: string = "SET_AVAILABLE_FUNDS";

export default interface SetAvailableFundsAction {
    type: typeof SetAvailableFundsType
    payload: {
        funds: Map<string, number>
    }
}

export function createSetAvailableFundsAction(state: State, funds: Map<string, number>): SetAvailableFundsAction {
    return {
        type: SetAvailableFundsType,
        payload: {
            funds: funds
        }
    }
}