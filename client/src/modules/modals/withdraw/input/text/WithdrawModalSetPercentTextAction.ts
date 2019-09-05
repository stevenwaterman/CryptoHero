import {State} from "../../../../RootStore";

export const WithdrawModalSetPercentTextType: string = "WITHDRAW_SET_PERCENT_TEXT";

export default interface WithdrawModalSetPercentTextAction {
    type: typeof WithdrawModalSetPercentTextType
    payload: {
        newText: string,
    }
}

export function createWithdrawModalSetPercentTextAction(state: State, newText: string): WithdrawModalSetPercentTextAction {
    return {
        type: WithdrawModalSetPercentTextType,
        payload: {
            newText: newText
        }
    }
}
