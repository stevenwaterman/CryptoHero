interface Payload {
    "newInstrument": string
}

export const InstrumentSelectionType: string = "INSTRUMENT_SELECTION_CHANGE";

export default interface InstrumentSelectionActionInterface {
    type: typeof InstrumentSelectionType
    payload: Payload
}

export class InstrumentSelectionAction implements InstrumentSelectionActionInterface {
    type: string = InstrumentSelectionType;
    payload: Payload;

    constructor(newInstrument: string) {
        this.payload = {
            "newInstrument": newInstrument
        }
    }
}