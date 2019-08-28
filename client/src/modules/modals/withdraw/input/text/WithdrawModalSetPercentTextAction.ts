import {State} from "../../../../RootStore";

interface IPayload {
    newText: string,
}

export const WithdrawModalSetPercentTextType: string = "WITHDRAW_SET_PERCENT_TEXT";

export default interface WithdrawModalSetPercentTextAction {
    type: typeof WithdrawModalSetPercentTextType
    payload: IPayload
}

export function createWithdrawModalSetPercentTextAction(state: State, newText: string): WithdrawModalSetPercentTextAction {
    return {
        type: WithdrawModalSetPercentTextType,
        payload: {
            newText: newText
        }
    }
}
