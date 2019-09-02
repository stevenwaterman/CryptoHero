import Instrument from "../../../models/Instrument";
import {State} from "../../RootStore";

export const SetPricesType: string = "SET_PRICES";

export default interface SetPricesAction {
    type: typeof SetPricesType
    payload: {
        prices: Map<Instrument, number>
    }
}

export function createSetPricesAction(state: State, prices: Map<Instrument, number>): SetPricesAction {
    return {
        type: SetPricesType,
        payload: {
            prices: prices
        }
    }
}