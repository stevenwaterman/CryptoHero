import {State} from "../../store/RootStore";

interface IPayload {
    historicalSelected: boolean
}

export const ChartSetTypeType: string = "CHART_SET_TYPE";

export default interface ChartSetTypeAction {
    type: typeof ChartSetTypeType
    payload: IPayload
}

export function createChartSetTypeAction(state: State, selectHistorical: boolean): ChartSetTypeAction {
    return {
        type: ChartSetTypeType,
        payload: {
            historicalSelected: selectHistorical
        }
    }
}
