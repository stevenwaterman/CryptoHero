import Instrument from "../../models/Instrument";
import IStartTradeAction from "../reducers/trade/IStartTradeAction";
import IConfirmTradeAction from "../reducers/trade/IConfirmTradeAction";
import ISetPriceAction from "../reducers/trade/value/ISetPriceAction";
import ISetPercentAction from "../reducers/trade/value/ISetPercentAction";
import ISetPercentTextAction from "../reducers/trade/text/ISetPercentTextAction";
import ISetPriceTextAction from "../reducers/trade/text/ISetPriceTextAction";
import ISetUnitsTextAction from "../reducers/trade/text/ISetUnitsTextAction";
import ISetUnitsAction from "../reducers/trade/value/ISetUnitsAction";
import IResetPercentTextAction from "../reducers/trade/resetText/IResetPercentTextAction";
import IResetPriceTextAction from "../reducers/trade/resetText/IResetPriceTextAction";
import IResetUnitsTextAction from "../reducers/trade/resetText/IResetUnitsTextAction";

export default interface TradeStore {
    readonly buying: boolean,
    readonly instrument: Instrument,

    readonly priceText: string,
    readonly price: number,

    readonly unitsText: string,
    readonly units: number,

    readonly percentText: string,
    readonly percent: number | null,
}

export const initialTradeStore: TradeStore = {
    buying: true,
    instrument: new Instrument("GBP", "BTC"),

    priceText: "0",
    price: 0,

    unitsText: "0",
    units: 0,

    percentText: "0",
    percent: 0,
};

export type TradeActions =
    IStartTradeAction
    | IConfirmTradeAction
    | ISetPriceAction
    | ISetPercentAction
    | ISetPercentTextAction
    | ISetPriceTextAction
    | ISetUnitsTextAction
    | ISetUnitsAction
    | IResetPercentTextAction
    | IResetPriceTextAction
    | IResetUnitsTextAction
