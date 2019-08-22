import Instrument from "../../../models/Instrument";

interface IPayload {
    newPrices: Array<[Instrument, number]>
}

export const InstrumentPricesType: string = "INSTRUMENT_PRICES_UPDATE";

export default interface IInstrumentPricesAction {
    type: typeof InstrumentPricesType
    payload: IPayload
}

export class InstrumentPricesAction {
    static create(newPrices: Array<[Instrument, number]>): IInstrumentPricesAction {
        return {
            type: InstrumentPricesType,
            payload: this.createPayload(newPrices)
        }
    }

    static createPayload(newPrices: Array<[Instrument, number]>): IPayload {
        return {
            newPrices: newPrices
        }
    }
}