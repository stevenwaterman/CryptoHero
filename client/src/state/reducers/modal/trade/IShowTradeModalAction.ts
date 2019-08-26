import Instrument from "../../../../models/Instrument";
import {FuncToThunk} from "../../../../util/FuncToThunk";

interface IPayload {
    buying: boolean,
    instrument: Instrument,
    startPrice: number
}

export const ShowTradeModalType: string = "SHOW_TRADE_MODAL";

export default interface IShowTradeModalAction {
    type: typeof ShowTradeModalType
    payload: IPayload
}

function getPrice(prices: Array<[Instrument, number]>, instrument: Instrument): number {
    const [_, amount] = prices.find(([check]) => check.name === instrument.name) as [Instrument, number];
    return amount;
}

export class ShowTradeModalAction {
    static fire = (buying: boolean, instrument: Instrument) => FuncToThunk(state => {
        const price = getPrice(state.instruments.prices, instrument);
        return ShowTradeModalAction.create(buying, instrument, price)
    });

    private static create(buying: boolean, instrument: Instrument, price: number): IShowTradeModalAction {
        return {
            type: ShowTradeModalType,
            payload: {
                buying: buying,
                instrument: instrument,
                startPrice: price
            }
        }
    }
}