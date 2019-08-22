import Instrument from "../../../models/Instrument";

interface IPayload {
    buying: boolean,
    instrument: Instrument,
    price: number
}

export const StartTradeType: string = "TRADE_START";

export default interface IStartTradeAction {
    type: typeof StartTradeType
    payload: IPayload
}

export class StartTradeAction {
    static create(buying: boolean, instrument: Instrument, price: number): IStartTradeAction {
        return {
            type: StartTradeType,
            payload: this.createPayload(buying, instrument, price)
        }
    }

    static createPayload(buying: boolean, instrument: Instrument, price: number): IPayload {
        return {
            buying: buying,
            instrument: instrument,
            price: price
        }
    }
}