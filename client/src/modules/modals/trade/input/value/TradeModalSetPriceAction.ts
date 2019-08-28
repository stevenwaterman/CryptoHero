import {maxTradeUnits} from "../../../../../util/MaxTradeUnits";
import {State} from "../../../../RootStore";

interface IPayload {
    price: number,
    maxUnits: number | null
}

export const TradeModalSetPriceType: string = "TRADE_SET_PRICE";

export default interface TradeModalSetPriceAction {
    type: typeof TradeModalSetPriceType
    payload: IPayload
}

export function createTradeModalSetPriceAction(state: State, price: number): TradeModalSetPriceAction {
    const maxUnits = maxTradeUnits(state, price);
    return {
        type: TradeModalSetPriceType,
        payload: {
            price: price,
            maxUnits: maxUnits
        }
    }
}