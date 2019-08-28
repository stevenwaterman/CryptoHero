import Instrument from "../../../models/Instrument";
import {State} from "../../RootStore";

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

export function createShowTradeModalAction(state: State, [buying, instrument]: [boolean, Instrument]): ShowTradeModalAction {
    const price: number = state.instruments.prices.get(instrument) as number;
    return {
        type: ShowTradeModalType,
        payload: {
            buying: buying,
            instrument: instrument,
            startPrice: price
        }
    }
}