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
    if (oldIOrderDepth == null) return state;

    const oldBuys: DirectionalOrderDepth = oldIOrderDepth.buys;
    const oldSells: DirectionalOrderDepth = oldIOrderDepth.sells;

    const delta: IOrderDepth = action.payload.delta;
    const buyDelta: DirectionalOrderDepth = delta.buys;
    const sellDelta: DirectionalOrderDepth = delta.sells;

    const newBuys = oldBuys.slice();
    buyDelta.forEach(newBuy => {
        const currentIdx = newBuys.findIndex(check => check.price === newBuy.price);
        if (currentIdx === -1) {
            if (newBuy.volume > 0) {
                newBuys.push(newBuy);
            }
        } else {
            if (newBuy.volume > 0) {
                newBuys.splice(currentIdx, 1, new OrderDepthPoint(newBuy.price, newBuy.volume));
            } else {
                newBuys.splice(currentIdx, 1);
            }
        }
    });

    const newSells = oldSells.slice();
    sellDelta.forEach(newSell => {
        const currentIdx = newSells.findIndex(check => check.price === newSell.price);
        if (currentIdx === -1) {
            if (newSell.volume > 0) {
                newSells.push(newSell);
            }
        } else {
            if (newSell.volume > 0) {
                sellDelta.splice(currentIdx, 1, new OrderDepthPoint(newSell.price, newSell.volume));
            } else {
                sellDelta.splice(currentIdx, 1);
            }
        }
    });

    newBuys.sort((a, b) => b.price - a.price);
    newSells.sort((a, b) => a.price - b.price);

    const newIOrderDepth: IOrderDepth = new IOrderDepth(newBuys, newSells);
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
    if (iHistory == null) return state;

    const newIHistory: IPriceHistory = iHistory.concat(new HistoricalPricePoint(time, newPrice));
    const newHistory: PriceHistory = new Map(history);
    newHistory.set(instrument.name, newIHistory);

    return {
        ...state,
        priceHistory: newHistory
    }
}