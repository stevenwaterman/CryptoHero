import ITradeModalSetPriceAction from "../../reducers/modalInputState/trade/value/ITradeModalSetPriceAction";
import ITradeModalSetPercentAction from "../../reducers/modalInputState/trade/value/ITradeModalSetPercentAction";
import ITradeModalSetPercentTextAction from "../../reducers/modalInputState/trade/text/ITradeModalSetPercentTextAction";
import ITradeModalSetUnitsAction from "../../reducers/modalInputState/trade/value/ITradeModalSetUnitsAction";
import ITradeModalSetUnitsTextAction from "../../reducers/modalInputState/trade/text/ITradeModalSetUnitsTextAction";
import ITradeModalResetPriceTextAction
    from "../../reducers/modalInputState/trade/resetText/ITradeModalResetPriceTextAction";
import ITradeModalResetUnitsTextAction
    from "../../reducers/modalInputState/trade/resetText/ITradeModalResetUnitsTextAction";
import ITradeModalResetPercentTextAction
    from "../../reducers/modalInputState/trade/resetText/ITradeModalResetPercentTextAction";
import ITradeModalSetPriceTextAction from "../../reducers/modalInputState/trade/text/ITradeModalSetPriceTextAction";
import IShowTradeModalAction from "../../reducers/modal/trade/IShowTradeModalAction";

export default interface TradeModalInputStore {
    readonly priceText: string,
    readonly price: number,

    readonly unitsText: string,
    readonly units: number,

    readonly percentText: string,
    readonly percent: number | null,
}

export const initialTradeModalInputStore: TradeModalInputStore = {
    priceText: "0",
    price: 0,

    unitsText: "0",
    units: 0,

    percentText: "0",
    percent: 0,
};

export type TradeModalInputActions =
    IShowTradeModalAction
    | ITradeModalSetPriceAction
    | ITradeModalSetPercentAction
    | ITradeModalSetPercentTextAction
    | ITradeModalSetPriceTextAction
    | ITradeModalSetUnitsTextAction
    | ITradeModalSetUnitsAction
    | ITradeModalResetPercentTextAction
    | ITradeModalResetPriceTextAction
    | ITradeModalResetUnitsTextAction
