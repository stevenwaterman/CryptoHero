import Instrument from "../../../models/Instrument";
import {State} from "../../store/RootStore";

interface IPayload {
    instrument: Instrument,
    newPrice: number
}

export const SetPriceType: string = "SET_PRICE";

export default interface SetPriceAction {
    type: typeof SetPriceType
    payload: IPayload
}

export function createSetPriceAction(state: State, [instrument, newPrice]: [Instrument, number]): SetPriceAction {
    return {
        type: SetPriceType,
        payload: {
            instrument: instrument,
            newPrice: newPrice
        }
    }
}