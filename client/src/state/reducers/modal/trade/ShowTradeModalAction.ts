import Instrument from "../../../../models/Instrument";
import {State} from "../../../store/RootStore";

interface IPayload {
    buying: boolean,
    instrument: Instrument,
    startPrice: number
}

export const ShowTradeModalType: string = "SHOW_TRADE_MODAL";

export default interface ShowTradeModalAction {
    type: typeof ShowTradeModalType
    payload: IPayload
}

function getPrice(prices: Array<[Instrument, number]>, instrument: Instrument): number {
    const [_, amount] = prices.find(([check]) => check.name === instrument.name) as [Instrument, number];
    return amount;
}

export function createShowTradeModalAction(state: State, [buying, instrument]: [boolean, Instrument]): ShowTradeModalAction {
    const prices = state.instruments.prices;
    const instrumentPrice = getPrice(prices, instrument);
    return {
        type: ShowTradeModalType,
        payload: {
            buying: buying,
            instrument: instrument,
            startPrice: instrumentPrice
        }
    }
}