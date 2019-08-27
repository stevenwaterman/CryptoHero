export const TradeModalResetPercentTextType: string = "TRADE_RESET_PERCENT_TEXT";

export default interface TradeModalResetPercentTextAction {
    type: typeof TradeModalResetPercentTextType
}

export function createTradeModalResetPercentTextAction(): TradeModalResetPercentTextAction {
    return {
        type: TradeModalResetPercentTextType,
    }
}
