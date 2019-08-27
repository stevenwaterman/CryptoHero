import {State} from "../../../../store/RootStore";

interface IPayload {
    newText: string,
}

export const TradeModalSetPriceTextType: string = "TRADE_SET_PRICE_TEXT";

export default interface TradeModalSetPriceTextAction {
    type: typeof TradeModalSetPriceTextType
    payload: IPayload
}

export function createTradeModalSetPriceTextAction(state: State, newText: string): TradeModalSetPriceTextAction {
    return {
        type: TradeModalSetPriceTextType,
        payload: {
            newText: newText
        }
    }
}