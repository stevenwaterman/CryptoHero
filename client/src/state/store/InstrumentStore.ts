import InstrumentSelectionActionInterface from "../actions/InstrumentSelectionActionInterface";
import InstrumentPricesActionInterface from "../actions/InstrumentPricesActionInterface";

export interface InstrumentStore {
    readonly prices: Array<[string, string]>;
    readonly selectedInstrument: string;
}

export type InstrumentActions = InstrumentSelectionActionInterface | InstrumentPricesActionInterface