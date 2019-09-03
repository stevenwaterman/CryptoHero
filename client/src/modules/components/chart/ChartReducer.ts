import ChartSetTypeAction, {ChartSetTypeType} from "./ChartSetTypeAction";
import ChartStore, {ChartActions, initialChartStore} from "./ChartStore";
import SetOrderDepthDataAction, {SetOrderDepthDataType} from "./SetOrderDepthDataAction";
import SetPriceHistoryAction, {SetPriceHistoryType} from "./SetPriceHistoryAction";
import SetInstrumentPriceAction, {SetInstrumentPriceType} from "../instruments/SetInstrumentPriceAction";
import {InstrumentPriceHistory, PriceHistory} from "../../../models/PriceHistory";
import OrderDepthDeltaAction, {OrderDepthDeltaType} from "./OrderDepthDeltaAction";
import {InstrumentOrderDepthData, OrderDepthData, OrderDepthPoint} from "../../../models/OrderDepthData";
import Instrument from "../../../models/Instrument";

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

    const oldInstrumentOrderDepth = state.orderDepth.get(instrument.name);
    if(oldInstrumentOrderDepth == null) return state;

    const oldBuys = oldInstrumentOrderDepth.buys;
    const oldSells = oldInstrumentOrderDepth.sells;

    const delta: InstrumentOrderDepthData = action.payload.delta;
    const buyDelta = delta.buys;
    const sellDelta = delta.sells;

    const reducer: (prev: Array<OrderDepthPoint>, curr: OrderDepthPoint) => (OrderDepthPoint[]) = (prev: Array<OrderDepthPoint>, curr: OrderDepthPoint) => {
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

    const allBuys = buyDelta.concat(...oldBuys);
    const combinedBuys = allBuys.reduce(reducer, []);

    const allSells = sellDelta.concat(...oldSells);
    const combinedSells = allSells.reduce(reducer, []);

    const newInstrumentOrderDepthData = new InstrumentOrderDepthData(combinedBuys, combinedSells);

    const orderDepthData: OrderDepthData = new Map([[instrument.name, newInstrumentOrderDepthData]])
    state.orderDepth.forEach((data, instrumentName) => {
        if(instrumentName !== instrument.name){
            orderDepthData.set(instrumentName, data);
        }
    });

    return {
        ...state,
        orderDepth: orderDepthData
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
    const history = state.priceHistory;

    const iPrices = history.get(instrument.name) as InstrumentPriceHistory;
    if(iPrices == null) return state;
    //TODO this is the issue
    const newIPrices = new InstrumentPriceHistory(iPrices.data.concat([time, newPrice]));

    const newPrices: PriceHistory = new Map([[instrument.name, newIPrices]]);
    history.forEach((instrumentPriceData: InstrumentPriceHistory, instrumentName: string) => {
        if(instrumentName !== instrument.name){
            newPrices.set(instrumentName, instrumentPriceData);
        }
    });

    return {
        ...state,
        priceHistory: new Map(newPrices)
    }
}