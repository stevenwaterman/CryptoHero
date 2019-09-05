import {State} from "../../../../RootStore";

export const TradeModalSetPriceTextType: string = "TRADE_SET_PRICE_TEXT";

export default interface TradeModalSetPriceTextAction {
    type: typeof TradeModalSetPriceTextType
    payload: {
        newText: string,
    }
}

export function createTradeModalSetPriceTextAction(state: State, newText: string): TradeModalSetPriceTextAction {
    return {
        type: TradeModalSetPriceTextType,
        payload: {
            newText: newText
        }
    }
}