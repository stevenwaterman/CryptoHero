import {InstrumentOrderDepthData} from "../../../models/OrderDepthData";
import Instrument from "../../../models/Instrument";

export const OrderDepthDeltaType: string = "ADJUST_ORDER_DEPTH";

export default interface OrderDepthDeltaAction {
    type: typeof OrderDepthDeltaType,
    payload: {
        instrument: Instrument,
        delta: InstrumentOrderDepthData,
    }
}

export function createOrderDepthDeltaAction(
    instrument: Instrument,
    orderDepthData: InstrumentOrderDepthData
): OrderDepthDeltaAction {
    return {
        type: OrderDepthDeltaType,
        payload: {
            instrument: instrument,
            delta: orderDepthData
        }
    }
}