import TradeModalSetPriceAction from "./value/TradeModalSetPriceAction";
import TradeModalSetPercentAction from "./value/TradeModalSetPercentAction";
import TradeModalSetPercentTextAction from "./text/TradeModalSetPercentTextAction";
import TradeModalSetUnitsAction from "./value/TradeModalSetUnitsAction";
import TradeModalSetUnitsTextAction from "./text/TradeModalSetUnitsTextAction";
import TradeModalResetPriceTextAction from "./resetText/TradeModalResetPriceTextAction";
import TradeModalResetUnitsTextAction from "./resetText/TradeModalResetUnitsTextAction";
import TradeModalResetPercentTextAction from "./resetText/TradeModalResetPercentTextAction";
import TradeModalSetPriceTextAction from "./text/TradeModalSetPriceTextAction";
import ShowTradeModalAction from "../ShowTradeModalAction";
import Big from "big.js";

export default interface TradeModalInputStore {
    readonly priceText: string,
    readonly price: Big,

    readonly unitsText: string,
    readonly units: Big,

    readonly percentText: string,
    readonly percent: Big | null,
}

export const initialTradeModalInputStore: TradeModalInputStore = {
    priceText: "0",
    price: Big(0),

    unitsText: "0",
    units: Big(0),

    percentText: "0",
    percent: Big(0),
};

export type TradeModalInputActions =
    ShowTradeModalAction
    | TradeModalSetPriceAction
    | TradeModalSetPercentAction
    | TradeModalSetPercentTextAction
    | TradeModalSetPriceTextAction
    | TradeModalSetUnitsTextAction
    | TradeModalSetUnitsAction
    | TradeModalResetPercentTextAction
    | TradeModalResetPriceTextAction
    | TradeModalResetUnitsTextAction
