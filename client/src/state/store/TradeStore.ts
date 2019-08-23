import Instrument from "../../models/Instrument";
import IStartTradeAction from "../reducers/trade/IStartTradeAction";
import IConfirmTradeAction from "../reducers/trade/IConfirmTradeAction";
import ISetPriceAction from "../reducers/trade/value/ISetPriceAction";
import ISetAmountAction from "../reducers/trade/value/ISetAmountAction";
import ISetPercentTextAction from "../reducers/trade/text/ISetPercentTextAction";
import ISetPriceTextAction from "../reducers/trade/text/ISetPriceTextAction";
import ISetUnitsTextAction from "../reducers/trade/text/ISetUnitsTextAction";

export default interface TradeStore {
    readonly buying: boolean,
    readonly instrument: Instrument,

    readonly priceText: string,
    readonly price: number,

    readonly unitsText: string,
    readonly units: number,

    readonly percentText: string,
    readonly percent: number,
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

export type TradeActions = IStartTradeAction | IConfirmTradeAction | ISetPriceAction | ISetAmountAction | ISetPercentTextAction | ISetPriceTextAction | ISetUnitsTextAction