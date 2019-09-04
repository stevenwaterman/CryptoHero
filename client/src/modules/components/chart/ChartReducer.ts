import ChartSetTypeAction, {ChartSetTypeType} from "./ChartSetTypeAction";
import ChartStore, {ChartActions, initialChartStore} from "./ChartStore";
import SetOrderDepthDataAction, {SetOrderDepthDataType} from "./SetOrderDepthDataAction";
import SetPriceHistoryAction, {SetPriceHistoryType} from "./SetPriceHistoryAction";
import SetInstrumentPriceAction, {SetInstrumentPriceType} from "../instruments/SetInstrumentPriceAction";
import OrderDepthDeltaAction, {OrderDepthDeltaType} from "./OrderDepthDeltaAction";
import {DirectionalOrderDepth, IOrderDepth, OrderDepth, OrderDepthPoint} from "../../../models/OrderDepth";
import Instrument from "../../../models/Instrument";
import {HistoricalPricePoint, IPriceHistory, PriceHistory} from "../../../models/PriceHistory";

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

function setPriceHistory(state: State, action: SetPriceHistoryAction): State {
    return {
        ...state,
        priceHistory: action.payload.priceHistory
    };
}

function orderDepthDelta(state: State, action: OrderDepthDeltaAction): State {
    const instrument: Instrument = action.payload.instrument;

    const oldOrderDepth: OrderDepth = state.orderDepth;
    const oldIOrderDepth: IOrderDepth | undefined = oldOrderDepth.get(instrument.name);
    if(oldIOrderDepth == null) return state;

    const oldBuys: DirectionalOrderDepth = oldIOrderDepth.buys;
    const oldSells: DirectionalOrderDepth = oldIOrderDepth.sells;

    const delta: IOrderDepth = action.payload.delta;
    const buyDelta: DirectionalOrderDepth = delta.buys;
    const sellDelta: DirectionalOrderDepth = delta.sells;

    const reducer: (prev: DirectionalOrderDepth, curr: OrderDepthPoint) => (OrderDepthPoint[]) = (prev: DirectionalOrderDepth, curr: OrderDepthPoint) => {
        const idx: number = prev.findIndex(it => it.price === curr.price);
        if(idx === -1){
            return prev.concat(curr);
        }
        const old = prev[idx];
        const newVolume = curr.volume + old.volume;
        if(newVolume === 0) return prev;
        const newElement: OrderDepthPoint = new OrderDepthPoint(curr.price, newVolume);
        const newArray = prev.slice();
        newArray[idx] = newElement;
        return newArray;
    };

    const allBuys: DirectionalOrderDepth = buyDelta.concat(...oldBuys);
    const reducedBuys: DirectionalOrderDepth = allBuys.reduce(reducer, []);

    const allSells: DirectionalOrderDepth = sellDelta.concat(...oldSells);
    const combinedSells: DirectionalOrderDepth = allSells.reduce(reducer, []);

    const newIOrderDepth: IOrderDepth = new IOrderDepth(reducedBuys, combinedSells);
    const newOrderDepth: OrderDepth = new Map(oldOrderDepth);
    newOrderDepth.set(instrument.name, newIOrderDepth);

    return {
        ...state,
        orderDepth: newOrderDepth
    }
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
        case SetPriceHistoryType:
            return setPriceHistory(state, action as SetPriceHistoryAction);
        case SetInstrumentPriceType:
            return appendPriceHistory(state, action as SetInstrumentPriceAction);
        case OrderDepthDeltaType:
            return orderDepthDelta(state, action as OrderDepthDeltaAction);
        default:
            return state;
    }
}

function appendPriceHistory(state: State, action: SetInstrumentPriceAction): State {
    const {instrument, newPrice, time} = action.payload;
    const history: PriceHistory = state.priceHistory;

    const iHistory: IPriceHistory | undefined = history.get(instrument.name);
    if(iHistory == null) return state;

    const newIHistory: IPriceHistory = iHistory.concat(new HistoricalPricePoint(time, newPrice));
    const newHistory: PriceHistory = new Map(history);
    newHistory.set(instrument.name, newIHistory);

    return {
        ...state,
        priceHistory: newHistory
    }
}