export const ShowWithdrawModalType: string = "SHOW_WITHDRAW_MODAL";

export default interface ShowWithdrawModalAction {
    type: typeof ShowWithdrawModalType
}

export function createShowWithdrawModalAction(): ShowWithdrawModalAction {
    return {
        type: ShowWithdrawModalType,
    }
}