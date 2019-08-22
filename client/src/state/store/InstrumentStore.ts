import IInstrumentSelectionAction from "../reducers/instrument/IInstrumentSelectionAction";
import IInstrumentPricesAction from "../reducers/instrument/IInstrumentPricesAction";
import Instrument from "../../models/Instrument";

export default interface InstrumentStore {
    readonly prices: Array<[Instrument, string]>;
    readonly selectedInstrument: Instrument;
}

export const initialInstrumentStore: InstrumentStore = {
    prices: [
        [new Instrument("GBP", "BTC"), "1.3"],
        [new Instrument("GBP", "LTC"), "1.2"]
    ],
    selectedInstrument: new Instrument("GBP", "BTC")
};

export type InstrumentActions = IInstrumentSelectionAction | IInstrumentPricesAction