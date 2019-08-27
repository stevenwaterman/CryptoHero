export const TradeModalResetPriceTextType: string = "TRADE_RESET_PRICE_TEXT";

export default interface TradeModalResetPriceTextAction {
    type: typeof TradeModalResetPriceTextType
}

export function createTradeModalResetPriceTextAction(): TradeModalResetPriceTextAction {
    return {
        type: TradeModalResetPriceTextType,
    }
}