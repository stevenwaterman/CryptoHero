interface Payload {
    "newPrices": Array<[string, string]>
}

export const InstrumentPricesType: string = "INSTRUMENT_PRICES_UPDATE";

export default interface InstrumentPricesActionInterface {
    type: typeof InstrumentPricesType
    payload: Payload
}

export class InstrumentPricesAction implements InstrumentPricesActionInterface {
    type: string = InstrumentPricesType;
    payload: Payload;

    constructor(newPrices: Array<[string, string]>) {
        this.payload = {
            "newPrices": newPrices
        }
    }
}