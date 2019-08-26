import {FuncToThunk} from "../../../../../util/FuncToThunk";

export const WithdrawModalResetUnitsTextType: string = "WITHDRAW_RESET_UNITS_TEXT";

export default interface IWithdrawModalResetUnitsTextAction {
    type: typeof WithdrawModalResetUnitsTextType
}

export class WithdrawModalResetUnitsTextAction {
    static fire = () => FuncToThunk(() => WithdrawModalResetUnitsTextAction.create());

    private static create(): IWithdrawModalResetUnitsTextAction {
        return {
            type: WithdrawModalResetUnitsTextType,
        }
    }
}