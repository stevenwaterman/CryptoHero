import ChartSetTypeAction from "../reducers/chart/ChartSetTypeAction";

export default interface ChartStore {
    readonly showHistorical: boolean;
}

export const initialChartStore: ChartStore = {
    showHistorical: true,
};

export type ChartActions = ChartSetTypeAction