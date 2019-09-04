import {State} from "../../RootStore";
import Order from "../../../models/Order";
import {OrderDepth} from "../../../models/OrderDepth";

export const SetOrderDepthDataType: string = "SET_ORDER_DEPTH_DATA";

export default interface SetOrderDepthDataAction {
    type: typeof SetOrderDepthDataType,
    payload: {
        orderDepthData: OrderDepth
    }
}

export function createSetOrderDepthDataAction(state: State, orderDepthData: OrderDepth): SetOrderDepthDataAction {
    return {
        type: SetOrderDepthDataType,
        payload: {
            orderDepthData: orderDepthData
        }
    }
}