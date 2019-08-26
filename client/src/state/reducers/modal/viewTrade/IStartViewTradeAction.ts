import {FuncToThunk} from "../../../../util/FuncToThunk";
import Instrument from "../../../../models/Instrument";

interface IPayload {
    id: string,
    time: Date,
    buying: boolean,
    instrument: Instrument,
    units: number,
    price: number,
    remaining: number,
    averagePrice: number | null;
}

export const StartViewTradeType: string = "START_VIEW_TRADE";

export default interface IStartViewTradeAction {
    type: typeof StartViewTradeType
    payload: IPayload
}

export class StartViewTradeAction {
    static fire = (id: string) => FuncToThunk((state) => {
        //TODO this should do a server request.
        const time = new Date();
        const buying = true;
        const instrument = new Instrument("BTC", "GBP");
        const units = 1;
        const price = 1;
        const remaining = 1;
        const averagePrice = null;
        return StartViewTradeAction.create(id, time, buying, instrument, units, price, remaining, averagePrice)
    });

    private static create(id: string, time: Date, buying: boolean, instrument: Instrument, units: number, price: number, remaining: number, averagePrice: number | null): IStartViewTradeAction {
        return {
            type: StartViewTradeType,
            payload: {
                id: id,
                time: time,
                buying: buying,
                instrument: instrument,
                units: units,
                price: price,
                remaining: remaining,
                averagePrice: averagePrice
            }
        }
    }
}