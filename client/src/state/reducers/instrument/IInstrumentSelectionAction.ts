import Instrument from "../../../models/Instrument";

interface IPayload {
    newInstrument: Instrument
}

export const InstrumentSelectionType: string = "INSTRUMENT_SELECTION_CHANGE";

export default interface IInstrumentSelectionAction {
    type: typeof InstrumentSelectionType
    payload: IPayload
}

export class InstrumentSelectionAction {
    static create(newInstrument: Instrument): IInstrumentSelectionAction {
        return {
            type: InstrumentSelectionType,
            payload: this.createPayload(newInstrument)
        }
    }

    private static createPayload(newInstrument: Instrument): IPayload {
        return {
            newInstrument: newInstrument
        }
    }
}