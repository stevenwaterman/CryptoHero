import InstrumentSelectionAction from "./InstrumentSelectionAction";
import SetInstrumentPriceAction from "./SetInstrumentPriceAction";
import Instrument from "../../../models/Instrument";
import SetPricesAction from "./SetPricesAction";

export default interface InstrumentStore {
    readonly prices: Map<Instrument, number>;
    readonly selectedInstrument: Instrument;
}

export const initialInstrumentStore: InstrumentStore = {
    prices: new Map(),
    selectedInstrument: new Instrument("LTCGBPNA", "LTCGBPNA")
};

export type InstrumentActions = InstrumentSelectionAction | SetInstrumentPriceAction | SetPricesAction