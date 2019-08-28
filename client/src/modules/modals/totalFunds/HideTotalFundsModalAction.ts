export const HideTotalFundsModalType: string = "HIDE_TOTAL_FUNDS_MODAL";

export default interface HideTotalFundsModalAction {
    type: typeof HideTotalFundsModalType;
}

export function createHideTotalFundsModalAction(): HideTotalFundsModalAction {
    return {
        type: HideTotalFundsModalType,
    }
}
