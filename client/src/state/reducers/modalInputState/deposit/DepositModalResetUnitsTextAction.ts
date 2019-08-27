export const DepositModalResetUnitsTextType: string = "DEPOSIT_RESET_UNITS_TEXT";

export default interface DepositModalResetUnitsTextAction {
    type: typeof DepositModalResetUnitsTextType
}

export function createDepositModalResetUnitsTextAction(): DepositModalResetUnitsTextAction {
    return {
        type: DepositModalResetUnitsTextType,
    }
}