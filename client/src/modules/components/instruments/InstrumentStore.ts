import InstrumentSelectionAction from "./InstrumentSelectionAction";
import SetInstrumentPriceAction from "./SetInstrumentPriceAction";
import Instrument from "../../../models/Instrument";
import SetPricesAction from "./SetPricesAction";

export default interface InstrumentStore {
    readonly prices: Map<string, number>;
    readonly selectedInstrument: Instrument;
    readonly instrumentList: Array<Instrument>;
}

export const initialInstrumentStore: InstrumentStore = {
    prices: new Map(),
    selectedInstrument: new Instrument("NA", "NA"),
    instrumentList: [],
};

export type InstrumentActions = InstrumentSelectionAction | SetInstrumentPriceAction | SetPricesAction