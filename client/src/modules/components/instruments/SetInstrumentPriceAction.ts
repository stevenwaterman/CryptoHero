import Instrument from "../../../models/Instrument";
import Big from "big.js";

export const SetInstrumentPriceType: string = "SET_INSTRUMENT_PRICE";

export default interface SetInstrumentPriceAction {
    type: typeof SetInstrumentPriceType
    payload: {
        instrument: Instrument,
        newPrice: Big,
        time: number,
    }
}

export function createSetInstrumentPriceAction(instrument: Instrument, newPrice: Big, time: number): SetInstrumentPriceAction {
    return {
        type: SetInstrumentPriceType,
        payload: {
            instrument: instrument,
            newPrice: newPrice,
            time: time,
        }
    }
}