import {State} from "../../../../RootStore";

interface IPayload {
    newText: string,
}

export const WithdrawModalSetUnitsTextType: string = "WITHDRAW_SET_UNITS_TEXT";

export default interface WithdrawModalSetUnitsTextAction {
    type: typeof WithdrawModalSetUnitsTextType
    payload: IPayload
}

export function createWithdrawModalSetUnitsTextAction(state: State, newText: string): WithdrawModalSetUnitsTextAction {
    return {
        type: WithdrawModalSetUnitsTextType,
        payload: {
            newText: newText
        }
    }
}
