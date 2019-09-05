import Instrument from "../../../models/Instrument";
import {State} from "../../RootStore";
import Big from "big.js";

export const SetPricesType: string = "SET_PRICES";

export default interface SetPricesAction {
    type: typeof SetPricesType
    payload: {
        prices: Map<Instrument, Big>
    }
}

export function createSetPricesAction(state: State, prices: Map<Instrument, Big>): SetPricesAction {
    return {
        type: SetPricesType,
        payload: {
            prices: prices
        }
    }
}