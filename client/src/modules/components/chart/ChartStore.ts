import ChartSetTypeAction from "./ChartSetTypeAction";
import OrderDepthData from "../../../models/OrderDepthData";
import SetOrderDepthDataAction from "./SetOrderDepthDataAction";

export default interface ChartStore {
    readonly showHistorical: boolean;
    readonly orderDepth: OrderDepthData
}

export const initialChartStore: ChartStore = {
    showHistorical: true,
    orderDepth: new OrderDepthData([])
};

export type ChartActions = ChartSetTypeAction | SetOrderDepthDataAction