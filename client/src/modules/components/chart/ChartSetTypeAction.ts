import {State} from "../../RootStore";

export const ChartSetTypeType: string = "CHART_SET_TYPE";

export default interface ChartSetTypeAction {
    type: typeof ChartSetTypeType
    payload: {
        historicalSelected: boolean
    }
}

export function createChartSetTypeAction(state: State, selectHistorical: boolean): ChartSetTypeAction {
    return {
        type: ChartSetTypeType,
        payload: {
            historicalSelected: selectHistorical
        }
    }
}
