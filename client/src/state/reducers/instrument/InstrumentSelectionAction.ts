import Instrument from "../../../models/Instrument";
import {State} from "../../store/RootStore";

interface IPayload {
    selected: Instrument
}

export const InstrumentSelectionType: string = "INSTRUMENT_SELECTION_CHANGE";

export default interface InstrumentSelectionAction {
    type: typeof InstrumentSelectionType
    payload: IPayload
}

export function createInstrumentSelectionAction(state: State, selected: Instrument): InstrumentSelectionAction {
    return {
        type: InstrumentSelectionType,
        payload: {
            selected: selected
        }
    }
}