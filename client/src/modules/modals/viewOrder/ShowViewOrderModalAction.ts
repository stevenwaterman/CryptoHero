import {State} from "../../RootStore";
import Order from "../../../models/Order";

export const ShowViewOrderModalType: string = "SHOW_VIEW_ORDER";

export default interface ShowViewOrderModalAction {
    type: typeof ShowViewOrderModalType
    payload: {
        order: Order
    }
}

export function createShowViewOrderModalAction(state: State, order: Order): ShowViewOrderModalAction {
    return {
        type: ShowViewOrderModalType,
        payload: {
            order: order
        }
    }
}