import Instrument from "../../../models/Instrument";

interface IPayload {
    newPrices: Array<[Instrument, string]>
}

export const InstrumentPricesType: string = "INSTRUMENT_PRICES_UPDATE";

export default interface IInstrumentPricesAction {
    type: typeof InstrumentPricesType
    payload: IPayload
}

export class InstrumentPricesAction {
    static create(newPrices: Array<[Instrument, string]>): IInstrumentPricesAction {
        return {
            type: InstrumentPricesType,
            payload: this.createPayload(newPrices)
        }
    }

    static createPayload(newPrices: Array<[Instrument, string]>): IPayload {
        return {
            newPrices: newPrices
        }
    }
}