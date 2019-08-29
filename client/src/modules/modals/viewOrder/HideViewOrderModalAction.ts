export const HideViewTradeModalType: string = "HIDE_VIEW_Order_MODAL";

export default interface HideViewOrderModalAction {
    type: typeof HideViewTradeModalType
}

export function createHideViewTradeModalAction(): HideViewOrderModalAction {
    return {
        type: HideViewTradeModalType,
    }
}