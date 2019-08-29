import {State} from "../../RootStore";
import Order from "../../../models/Order";

interface IPayload {
    order: Order
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
            order: state.viewOrderModal.order
        }
    }
}