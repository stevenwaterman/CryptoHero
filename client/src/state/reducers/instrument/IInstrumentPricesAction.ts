import Instrument from "../../../models/Instrument";
import {FuncToThunk} from "../../../util/FuncToThunk";

interface IPayload {
    newPrices: Array<[Instrument, number]>
}

export const InstrumentPricesType: string = "INSTRUMENT_PRICES_UPDATE";

export default interface IInstrumentPricesAction {
    type: typeof InstrumentPricesType
    payload: IPayload
}

export class InstrumentPricesAction {
    static fire = (newPrices: Array<[Instrument, number]>) => FuncToThunk(() => InstrumentPricesAction.create(newPrices));

    private static create(newPrices: Array<[Instrument, number]>): IInstrumentPricesAction {
        return {
            type: InstrumentPricesType,
            payload: {
                newPrices: newPrices
            }
        }
    }
}