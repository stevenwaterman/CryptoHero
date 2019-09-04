import {IOrderDepth} from "../../../models/OrderDepth";
import Instrument from "../../../models/Instrument";

export const OrderDepthDeltaType: string = "ADJUST_ORDER_DEPTH";

export default interface OrderDepthDeltaAction {
    type: typeof OrderDepthDeltaType,
    payload: {
        instrument: Instrument,
        delta: IOrderDepth,
    }
}

export function createOrderDepthDeltaAction(
    instrument: Instrument,
    orderDepthData: IOrderDepth
): OrderDepthDeltaAction {
    return {
        type: OrderDepthDeltaType,
        payload: {
            instrument: instrument,
            delta: orderDepthData
        }
    }
}