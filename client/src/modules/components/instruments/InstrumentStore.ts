import InstrumentSelectionAction from "./InstrumentSelectionAction";
import SetInstrumentPriceAction from "./SetInstrumentPriceAction";
import Instrument from "../../../models/Instrument";

export default interface InstrumentStore {
    readonly prices: Map<Instrument, number>;
    readonly selectedInstrument: Instrument;
}

export const initialInstrumentStore: InstrumentStore = {
    prices: new Map([
        [new Instrument("BTC", "GBP"), 8611.82157],
        [new Instrument("LTC", "GBP"), 62.38872],
        [new Instrument("ETH", "GBP"), 161.39427],
        [new Instrument("DASH", "GBP"), 78.07013],
    ]),
    selectedInstrument: new Instrument("BTC", "GBP")
};

export type InstrumentActions = InstrumentSelectionAction | SetInstrumentPriceAction