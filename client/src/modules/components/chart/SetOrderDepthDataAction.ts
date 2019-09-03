import {State} from "../../RootStore";
import Order from "../../../models/Order";
import OrderDepthData from "../../../models/OrderDepthData";

export const SetOrderDepthDataType: string = "SET_ORDER_DEPTH_DATA";

export default interface SetOrderDepthDataAction {
    type: typeof SetOrderDepthDataType,
    payload: {
        orderDepthData: OrderDepthData
    }
}

export function createSetOrderDepthDataAction(state: State, orderDepthData: OrderDepthData): SetOrderDepthDataAction {
    return {
        type: SetOrderDepthDataType,
        payload: {
            orderDepthData: orderDepthData
        }
    }
}