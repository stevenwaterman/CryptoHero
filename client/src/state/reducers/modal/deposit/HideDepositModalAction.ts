export const HideDepositModalType: string = "HIDE_DEPOSIT_MODAL";

export default interface HideDepositModalAction {
    type: typeof HideDepositModalType
}

export function createHideDepositModalAction(): HideDepositModalAction {
    return {
        type: HideDepositModalType,
    }
}