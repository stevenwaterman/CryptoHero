import {State} from "../../RootStore";
import Big from "big.js";

export const SetAvailableFundsType: string = "SET_AVAILABLE_FUNDS";

export default interface SetAvailableFundsAction {
    type: typeof SetAvailableFundsType
    payload: {
        funds: Map<string, Big>
    }
}

export function createSetAvailableFundsAction(state: State, funds: Map<string, Big>): SetAvailableFundsAction {
    return {
        type: SetAvailableFundsType,
        payload: {
            funds: funds
        }
    }
}