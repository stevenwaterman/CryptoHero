export const WithdrawModalResetUnitsTextType: string = "WITHDRAW_RESET_UNITS_TEXT";

export default interface WithdrawModalResetUnitsTextAction {
    type: typeof WithdrawModalResetUnitsTextType
}

export function createWithdrawModalResetUnitsTextAction(): WithdrawModalResetUnitsTextAction {
    return {
        type: WithdrawModalResetUnitsTextType,
    }
}
