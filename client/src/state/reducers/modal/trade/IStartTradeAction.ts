import Instrument from "../../../../models/Instrument";
import {FuncToThunk} from "../../../../util/FuncToThunk";

interface IPayload {
    buying: boolean,
    instrument: Instrument,
    startPrice: number
}

export const StartTradeType: string = "TRADE_START";

export default interface IStartTradeAction {
    type: typeof StartTradeType
    payload: IPayload
}

function getPrice(prices: Array<[Instrument, number]>, instrument: Instrument): number {
    const [_, amount] = prices.find(([check]) => check.name === instrument.name) as [Instrument, number];
    return amount;
}

export class StartTradeAction {
    static fire = (buying: boolean, instrument: Instrument) => FuncToThunk(state => {
        const price = getPrice(state.instruments.prices, instrument);
        return StartTradeAction.create(buying, instrument, price)
    });

    private static create(buying: boolean, instrument: Instrument, price: number): IStartTradeAction {
        return {
            type: StartTradeType,
            payload: {
                buying: buying,
                instrument: instrument,
                startPrice: price
            }
        }
    }
}