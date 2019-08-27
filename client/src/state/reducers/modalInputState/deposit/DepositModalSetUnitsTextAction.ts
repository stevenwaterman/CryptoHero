import {State} from "../../../store/RootStore";

interface IPayload {
    newText: string,
}

export const DepositModalSetUnitsTextType: string = "DEPOSIT_SET_UNITS_TEXT";

export default interface DepositModalSetUnitsTextAction {
    type: typeof DepositModalSetUnitsTextType
    payload: IPayload
}

export function createDepositModalSetUnitsTextAction(state: State, newText: string): DepositModalSetUnitsTextAction {
    return {
        type: DepositModalSetUnitsTextType,
        payload: {
            newText: newText
        }
    }
}