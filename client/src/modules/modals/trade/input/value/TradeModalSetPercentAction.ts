import {maxTradeUnits} from "../../../../../util/MaxTradeUnits";
import {State} from "../../../../RootStore";
import Big from "big.js";

export const TradeModalSetPercentType: string = "TRADE_SET_PERCENT";

export default interface TradeModalSetPercentAction {
    type: typeof TradeModalSetPercentType
    payload: {
        percent: Big,
        maxUnits: Big,
    }
}

export function createTradeModalSetPercentAction(state: State, newPercent: Big): TradeModalSetPercentAction | null {
    const maxUnits = maxTradeUnits(state);
    if (maxUnits === null) return null;
    return {
        type: TradeModalSetPercentType,
        payload: {
            percent: newPercent,
            maxUnits: maxUnits
        }
    }
}
