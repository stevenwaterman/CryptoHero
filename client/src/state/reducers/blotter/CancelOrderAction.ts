import {State} from "../../store/RootStore";
import Trade from "../../../models/Trade";

interface IPayload {
    trade: Trade
}

export const CancelOrderType: string = "CANCEL_ORDER";

export default interface CancelOrderAction {
    type: typeof CancelOrderType,
    payload: IPayload
}

export function createCancelOrderAction(state: State): CancelOrderAction {
    return {
        type: CancelOrderType,
        payload: {
            trade: state.viewTradeModal.trade
        }
    }
}