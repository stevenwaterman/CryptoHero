import {State} from "../../../store/RootStore";
import Trade from "../../../../models/Trade";
import {ThunkDsp} from "../../../../util/Thunker";
import Instrument from "../../../../models/Instrument";

interface IPayload {
    newTrade: Trade
}

export const ConfirmTradeType: string = "TRADE_CONFIRM";

export default interface ConfirmTradeAction {
    type: typeof ConfirmTradeType
    payload: IPayload
}

export function createConfirmTradeAction(state: State, params: null, dispatch: ThunkDsp<ConfirmTradeAction>): ConfirmTradeAction {
    return {
        type: ConfirmTradeType,
        payload: {
            newTrade: new Trade("1234", new Instrument("BTC", "GBP"), new Date(), 1, 1, true)
        }
    }
}