import TradeModalSetPriceAction from "../../reducers/modalInputState/trade/value/TradeModalSetPriceAction";
import TradeModalSetPercentAction from "../../reducers/modalInputState/trade/value/TradeModalSetPercentAction";
import TradeModalSetPercentTextAction from "../../reducers/modalInputState/trade/text/TradeModalSetPercentTextAction";
import TradeModalSetUnitsAction from "../../reducers/modalInputState/trade/value/TradeModalSetUnitsAction";
import TradeModalSetUnitsTextAction from "../../reducers/modalInputState/trade/text/TradeModalSetUnitsTextAction";
import TradeModalResetPriceTextAction
    from "../../reducers/modalInputState/trade/resetText/TradeModalResetPriceTextAction";
import TradeModalResetUnitsTextAction
    from "../../reducers/modalInputState/trade/resetText/TradeModalResetUnitsTextAction";
import TradeModalResetPercentTextAction
    from "../../reducers/modalInputState/trade/resetText/TradeModalResetPercentTextAction";
import TradeModalSetPriceTextAction from "../../reducers/modalInputState/trade/text/TradeModalSetPriceTextAction";
import ShowTradeModalAction from "../../reducers/modal/trade/ShowTradeModalAction";

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
