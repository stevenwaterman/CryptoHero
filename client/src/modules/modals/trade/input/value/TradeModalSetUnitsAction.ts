import {maxTradeUnits} from "../../../../../util/MaxTradeUnits";
import {State} from "../../../../RootStore";
import Big from "big.js";

export const TradeModalSetUnitsType: string = "TRADE_SET_UNITS";

export default interface TradeModalSetUnitsAction {
    type: typeof TradeModalSetUnitsType
    payload: {
        units: Big,
        maxUnits: Big | null,
    }
}

export function createTradeModalSetUnitsAction(state: State, newUnits: Big): TradeModalSetUnitsAction {
    const maxUnits = maxTradeUnits(state);
    return {
        type: TradeModalSetUnitsType,
        payload: {
            units: newUnits,
            maxUnits: maxUnits
        }
    }
}