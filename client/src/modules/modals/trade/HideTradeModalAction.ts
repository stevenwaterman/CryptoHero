export const HideTradeModalType: string = "HIDE_TRADE_MODAL";

export default interface HideTradeModalAction {
    type: typeof HideTradeModalType
}

export function createHideTradeModalAction(): HideTradeModalAction {
    return {
        type: HideTradeModalType,
    }
}