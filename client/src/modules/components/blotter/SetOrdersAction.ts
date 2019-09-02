import {State} from "../../RootStore";
import Order from "../../../models/Order";

export const SetOrdersType: string = "SET_ORDERS";

export default interface SetOrdersAction {
    type: typeof SetOrdersType,
    payload: {
        orders: Array<Order>
    }
}

export function createSetOrdersAction(state: State, orders: Array<Order>): SetOrdersAction {
    return {
        type: SetOrdersType,
        payload: {
            orders: orders
        }
    }
}