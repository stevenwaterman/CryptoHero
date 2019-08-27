import {maxTradeUnits} from "../../../../../util/MaxTradeUnits";
import {State} from "../../../../store/RootStore";

interface IPayload {
    units: number,
    maxUnits: number | null,
}

export const TradeModalSetUnitsType: string = "TRADE_SET_UNITS";

export default interface TradeModalSetUnitsAction {
    type: typeof TradeModalSetUnitsType
    payload: IPayload
}

export function createTradeModalSetUnitsAction(state: State, newUnits: number): TradeModalSetUnitsAction {
    const maxUnits = maxTradeUnits(state);
    return {
        type: TradeModalSetUnitsType,
        payload: {
            units: newUnits,
            maxUnits: maxUnits
        }
    }
}