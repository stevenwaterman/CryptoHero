export const ShowDepositModalType: string = "SHOW_DEPOSIT_MODAL";

export default interface ShowDepositModalAction {
    type: typeof ShowDepositModalType
}

export function createShowDepositModalAction(): ShowDepositModalAction {
    return {
        type: ShowDepositModalType,
    }
}