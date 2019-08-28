import Instrument from "../../../models/Instrument";
import {State} from "../../RootStore";
import Order from "../../../models/Order";

interface IPayload {
    trade: Order
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