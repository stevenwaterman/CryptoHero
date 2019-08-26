import {maxTradeUnits} from "../../../../../util/MaxTradeUnits";
import {FuncToThunk} from "../../../../../util/FuncToThunk";

interface IPayload {
    percent: number,
    maxUnits: number,
}

export const TradeModalSetPercentType: string = "TRADE_SET_PERCENT";

export default interface ITradeModalSetPercentAction {
    type: typeof TradeModalSetPercentType
    payload: IPayload
}

export class TradeModalSetPercentAction {
    static fire = (newPercent: number) => FuncToThunk(state => {
        const maxUnits = maxTradeUnits(state);
        if (maxUnits === null) return null;
        return TradeModalSetPercentAction.create(newPercent, maxUnits);
    });

    private static create(newPercent: number, maxUnits: number): ITradeModalSetPercentAction {
        return {
            type: TradeModalSetPercentType,
            payload: {
                percent: newPercent,
                maxUnits: maxUnits
            }
        }
    }
}