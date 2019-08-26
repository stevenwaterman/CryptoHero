import {FuncToThunk} from "../../../../../util/FuncToThunk";

export const WithdrawModalResetPercentTextType: string = "WITHDRAW_RESET_PERCENT_TEXT";

export default interface IWithdrawModalResetPercentTextAction {
    type: typeof WithdrawModalResetPercentTextType
}

export class WithdrawModalResetPercentTextAction {
    static fire = () => FuncToThunk(() => WithdrawModalResetPercentTextAction.create());

    private static create(): IWithdrawModalResetPercentTextAction {
        return {
            type: WithdrawModalResetPercentTextType,
        }
    }
}