import Instrument from "../../../models/Instrument";
import {State} from "../../RootStore";

interface IPayload {
    instrument: Instrument,
    newPrice: number
}

export const SetInstrumentPriceType: string = "SET_INSTRUMENT_PRICE";

export default interface SetInstrumentPriceAction {
    type: typeof SetInstrumentPriceType
    payload: IPayload
}

export function createSetInstrumentPriceAction(state: State, [instrument, newPrice]: [Instrument, number]): SetInstrumentPriceAction {
    return {
        type: SetInstrumentPriceType,
        payload: {
            instrument: instrument,
            newPrice: newPrice
        }
    }
}