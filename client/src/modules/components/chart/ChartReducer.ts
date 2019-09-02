import ChartSetTypeAction, {ChartSetTypeType} from "./ChartSetTypeAction";
import ChartStore, {ChartActions, initialChartStore} from "./ChartStore";
import SetOrderDepthDataAction, {SetOrderDepthDataType} from "./SetOrderDepthDataAction";

type State = ChartStore
type Actions = ChartActions

function setType(state: State, action: ChartSetTypeAction): State {
    return {
        ...state,
        showHistorical: action.payload.historicalSelected
    };
}

function setOrderDepthData(state: State, action: SetOrderDepthDataAction): State {
    return {
        ...state,
        orderDepth: action.payload.orderDepthData
    };
}

export function chartReducer(
    state: State = initialChartStore,
    action: Actions
): State {
    switch (action.type) {
        case ChartSetTypeType:
            return setType(state, action as ChartSetTypeAction);
        case SetOrderDepthDataType:
            return setOrderDepthData(state, action as SetOrderDepthDataAction);
        default:
            return state;
    }
}
