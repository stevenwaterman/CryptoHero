import ChartSetTypeAction from "./ChartSetTypeAction";
import SetOrderDepthDataAction from "./SetOrderDepthDataAction";
import SetPriceHistoryAction from "./SetPriceHistoryAction";
import SetInstrumentPriceAction from "../instruments/SetInstrumentPriceAction";
import OrderDepthDeltaAction from "./OrderDepthDeltaAction";
import {OrderDepth} from "../../../models/OrderDepth";
import {PriceHistory} from "../../../models/PriceHistory";

export default interface ChartStore {
    readonly showHistorical: boolean;
    readonly orderDepth: OrderDepth;
    readonly priceHistory: PriceHistory;
}

export const initialChartStore: ChartStore = {
    showHistorical: false,
    orderDepth: new Map(),
    priceHistory: new Map(),
};

export type ChartActions =
    ChartSetTypeAction
    | SetOrderDepthDataAction
    | SetPriceHistoryAction
    | SetInstrumentPriceAction
    | OrderDepthDeltaAction