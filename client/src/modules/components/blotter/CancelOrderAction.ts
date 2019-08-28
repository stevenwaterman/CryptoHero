import {State} from "../../RootStore";
import Order from "../../../models/Order";

interface IPayload {
    trade: Order
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