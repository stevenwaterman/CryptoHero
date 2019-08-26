import {FuncToThunk} from "../../../../../util/FuncToThunk";

interface IPayload {
    newText: string,
}

export const WithdrawModalSetPercentTextType: string = "WITHDRAW_SET_PERCENT_TEXT";

export default interface IWithdrawModalSetPercentTextAction {
    type: typeof WithdrawModalSetPercentTextType
    payload: IPayload
}

export class WithdrawModalSetPercentTextAction {
    static fire = (newText: string) => FuncToThunk(() => WithdrawModalSetPercentTextAction.create(newText));

    private static create(newText: string): IWithdrawModalSetPercentTextAction {
        return {
            type: WithdrawModalSetPercentTextType,
            payload: {
                newText: newText
            }
        }
    }
}