import Instrument from "../../../models/Instrument";
import {State} from "../../RootStore";

export const InstrumentSelectionType: string = "INSTRUMENT_SELECTION_CHANGE";

export default interface InstrumentSelectionAction {
    type: typeof InstrumentSelectionType
    payload: {
        selected: Instrument
    }
}

export function createInstrumentSelectionAction(state: State, selected: Instrument): InstrumentSelectionAction {
    return {
        type: InstrumentSelectionType,
        payload: {
            selected: selected
        }
    }
}