import {State} from "../../../RootStore";

export const DepositModalSetUnitsTextType: string = "DEPOSIT_SET_UNITS_TEXT";

export default interface DepositModalSetUnitsTextAction {
    type: typeof DepositModalSetUnitsTextType
    payload: {
        newText: string,
    }
}

export function createDepositModalSetUnitsTextAction(state: State, newText: string): DepositModalSetUnitsTextAction {
    return {
        type: DepositModalSetUnitsTextType,
        payload: {
            newText: newText
        }
    }
}