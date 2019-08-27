export const HideViewTradeModalType: string = "HIDE_VIEW_TRADE_MODAL";

export default interface HideViewTradeModalAction {
    type: typeof HideViewTradeModalType
}

export function createHideViewTradeModalAction(): HideViewTradeModalAction {
    return {
        type: HideViewTradeModalType,
    }
}