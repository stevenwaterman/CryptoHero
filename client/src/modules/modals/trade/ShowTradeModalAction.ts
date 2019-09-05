import Instrument from "../../../models/Instrument";
import {State} from "../../RootStore";
import Big from "big.js";

export const ShowTradeModalType: string = "SHOW_TRADE_MODAL";

export default interface ShowTradeModalAction {
    type: typeof ShowTradeModalType
    payload: {
        buying: boolean,
        instrument: Instrument,
        startPrice: Big
    }
}

export function createShowTradeModalAction(state: State, [buying, instrument]: [boolean, Instrument]): ShowTradeModalAction {
    const price: Big = state.instruments.prices.get(instrument.name) as Big;
    return {
        type: ShowTradeModalType,
        payload: {
            buying: buying,
            instrument: instrument,
            startPrice: price
        }
    }
}