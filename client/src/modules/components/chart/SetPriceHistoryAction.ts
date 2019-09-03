import {State} from "../../RootStore";
import Order from "../../../models/Order";
import {PriceHistory} from "../../../models/PriceHistory";

export const SetPriceHistoryType: string = "SET_PRICE_HISTORY";

export default interface SetPriceHistoryAction {
    type: typeof SetPriceHistoryType,
    payload: {
        priceHistory: PriceHistory
    }
}

export function createSetPriceHistoryAction(state: State, priceHistory: PriceHistory): SetPriceHistoryAction {
    return {
        type: SetPriceHistoryType,
        payload: {
            priceHistory: priceHistory
        }
    }
}