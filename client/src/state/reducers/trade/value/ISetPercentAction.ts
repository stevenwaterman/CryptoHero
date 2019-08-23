import {maxTradeUnits} from "./MaxTradeUnits";
import {FuncToThunk} from "../../../../util/FuncToThunk";

interface IPayload {
    percent: number,
    maxUnits: number,
}

export const SetPercentType: string = "TRADE_SET_PERCENT";

export default interface ISetPercentAction {
    type: typeof SetPercentType
    payload: IPayload
}

export class SetPercentAction {
    static fire = (newPercent: number) => FuncToThunk(state => {
        const maxUnits = maxTradeUnits(state);
        if (maxUnits === null) return null;
        return SetPercentAction.create(newPercent, maxUnits);
    });

    private static create(newPercent: number, maxUnits: number): ISetPercentAction{
        return {
            type: SetPercentType,
            payload: {
                percent: newPercent,
                maxUnits: maxUnits
            }
        }
    }
}