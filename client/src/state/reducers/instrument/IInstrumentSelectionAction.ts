import Instrument from "../../../models/Instrument";
import {FuncToThunk} from "../../../util/FuncToThunk";

interface IPayload {
    selected: Instrument
}

export const InstrumentSelectionType: string = "INSTRUMENT_SELECTION_CHANGE";

export default interface IInstrumentSelectionAction {
    type: typeof InstrumentSelectionType
    payload: IPayload
}

export class InstrumentSelectionAction {
    static fire = (selected: Instrument) => FuncToThunk(() => InstrumentSelectionAction.create(selected));

    static create(selected: Instrument): IInstrumentSelectionAction {
        return {
            type: InstrumentSelectionType,
            payload: {
                selected: selected
            }
        }
    }
}