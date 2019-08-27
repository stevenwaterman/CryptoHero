import {maxTradeUnits} from "../../../../../util/MaxTradeUnits";
import {State} from "../../../../store/RootStore";

interface IPayload {
    percent: number,
    maxUnits: number,
}

export const TradeModalSetPercentType: string = "TRADE_SET_PERCENT";

export default interface TradeModalSetPercentAction {
    type: typeof TradeModalSetPercentType
    payload: IPayload
}

export function createTradeModalSetPercentAction(state: State, newPercent: number): TradeModalSetPercentAction | null {
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
