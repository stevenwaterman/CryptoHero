import ChartSetTypeAction from "./ChartSetTypeAction";
import OrderDepthData from "../../../models/OrderDepthData";
import SetOrderDepthDataAction from "./SetOrderDepthDataAction";
import HistoricalPriceData from "../../../models/HistoricalPriceData";
import SetHistoricalPricesDataAction from "./SetHistoricalPricesDataAction";

export default interface ChartStore {
    readonly showHistorical: boolean;
    readonly orderDepth: OrderDepthData;
    readonly historicalPrices: HistoricalPriceData;
}

export const initialChartStore: ChartStore = {
    showHistorical: true,
    orderDepth: new OrderDepthData([]),
    historicalPrices: new HistoricalPriceData([]),
};

export type ChartActions = ChartSetTypeAction | SetOrderDepthDataAction | SetHistoricalPricesDataAction