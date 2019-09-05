import {maxTradeUnits} from "../../../../../util/MaxTradeUnits";
import {State} from "../../../../RootStore";
import Big from "big.js";

export const TradeModalSetPriceType: string = "TRADE_SET_PRICE";

export default interface TradeModalSetPriceAction {
    type: typeof TradeModalSetPriceType
    payload: {
        price: Big,
        maxUnits: Big | null
    }
}

export function createTradeModalSetPriceAction(state: State, price: Big): TradeModalSetPriceAction {
    const maxUnits = maxTradeUnits(state, price);
    return {
        type: TradeModalSetPriceType,
        payload: {
            price: price,
            maxUnits: maxUnits
        }
    }
}