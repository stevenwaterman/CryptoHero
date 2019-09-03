import ChartSetTypeAction from "./ChartSetTypeAction";
import SetOrderDepthDataAction from "./SetOrderDepthDataAction";
import SetPriceHistoryAction from "./SetPriceHistoryAction";
import {PriceHistory, InstrumentPriceHistory} from "../../../models/PriceHistory";
import SetInstrumentPriceAction from "../instruments/SetInstrumentPriceAction";
import OrderDepthDeltaAction from "./OrderDepthDeltaAction";
import {OrderDepthData} from "../../../models/OrderDepthData";

export default interface ChartStore {
    readonly showHistorical: boolean;
    readonly orderDepth: OrderDepthData;
    readonly priceHistory: PriceHistory;
}

export const initialChartStore: ChartStore = {
    showHistorical: true,
    orderDepth: new Map(),
    priceHistory: new Map(),
};

export type ChartActions = ChartSetTypeAction | SetOrderDepthDataAction | SetPriceHistoryAction | SetInstrumentPriceAction | OrderDepthDeltaAction