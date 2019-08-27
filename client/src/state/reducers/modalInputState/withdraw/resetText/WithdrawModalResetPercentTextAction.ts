export const WithdrawModalResetPercentTextType: string = "WITHDRAW_RESET_PERCENT_TEXT";

export default interface WithdrawModalResetPercentTextAction {
    type: typeof WithdrawModalResetPercentTextType
}

export function createWithdrawModalResetPercentTextAction(): WithdrawModalResetPercentTextAction {
    return {
        type: WithdrawModalResetPercentTextType,
    }
}
