import {FuncToThunk} from "../../../../../util/FuncToThunk";

interface IPayload {
    newText: string,
}

export const WithdrawModalSetUnitsTextType: string = "WITHDRAW_SET_UNITS_TEXT";

export default interface IWithdrawModalSetUnitsTextAction {
    type: typeof WithdrawModalSetUnitsTextType
    payload: IPayload
}

export class WithdrawModalSetUnitsTextAction {
    static fire = (newText: string) => FuncToThunk(() => WithdrawModalSetUnitsTextAction.create(newText));

    private static create(newText: string): IWithdrawModalSetUnitsTextAction {
        return {
            type: WithdrawModalSetUnitsTextType,
            payload: {
                newText: newText
            }
        }
    }
}