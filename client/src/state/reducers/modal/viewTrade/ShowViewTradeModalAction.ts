import Instrument from "../../../../models/Instrument";
import {State} from "../../../store/RootStore";
import Trade from "../../../../models/Trade";

interface IPayload {
    trade: Trade
}

export const ShowViewTradeModalType: string = "SHOW_VIEW_TRADE";

export default interface ShowViewTradeModalAction {
    type: typeof ShowViewTradeModalType
    payload: IPayload
}

export function createShowViewTradeModalAction(state: State, id: string): ShowViewTradeModalAction {
    return {
        type: ShowViewTradeModalType,
        payload: {
            trade: state.viewTradeModal.trade //TODO
        }
    }
}