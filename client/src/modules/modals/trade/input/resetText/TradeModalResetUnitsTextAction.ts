export const TradeModalResetUnitsTextType: string = "TRADE_RESET_UNITS_TEXT";

export default interface TradeModalResetUnitsTextAction {
    type: typeof TradeModalResetUnitsTextType
}

export function createTradeModalResetUnitsTextAction(): TradeModalResetUnitsTextAction {
    return {
        type: TradeModalResetUnitsTextType,
    }
}