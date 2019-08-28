export const HideWithdrawModalType: string = "HIDE_WITHDRAW_MODAL";

export default interface HideWithdrawModalAction {
    type: typeof HideWithdrawModalType
}

export function createHideWithdrawModalAction(): HideWithdrawModalAction {
    return {
        type: HideWithdrawModalType,
    }
}