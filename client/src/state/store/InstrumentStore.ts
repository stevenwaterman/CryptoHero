import IInstrumentSelectionAction from "../reducers/instrument/IInstrumentSelectionAction";
import IInstrumentPricesAction from "../reducers/instrument/IInstrumentPricesAction";
import Instrument from "../../models/Instrument";

export default interface InstrumentStore {
    readonly prices: Array<[Instrument, number]>;
    readonly selectedInstrument: Instrument;
}

export const initialInstrumentStore: InstrumentStore = {
    prices: [
        [new Instrument("BTC", "GBP"), 8611.82157],
        [new Instrument("LTC", "GBP"), 62.38872],
        [new Instrument("ETH", "GBP"), 161.39427],
        [new Instrument("DASH", "GBP"), 78.07013],
    ],
    selectedInstrument: new Instrument("GBP", "BTC")
};

export type InstrumentActions = IInstrumentSelectionAction | IInstrumentPricesAction