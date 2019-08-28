import {State} from "../../RootStore";
import Trade from "../../../models/Trade";
import {ThunkDsp} from "../../../util/Thunker";
import Instrument from "../../../models/Instrument";

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
            newTrade: state.viewTradeModal.trade //TODO
        }
    }
}