import {maxTradeUnits} from "../../../../../util/MaxTradeUnits";
import {FuncToThunk} from "../../../../../util/FuncToThunk";

interface IPayload {
    units: number,
    maxUnits: number | null,
}

export const TradeModalSetUnitsType: string = "TRADE_SET_UNITS";

export default interface ITradeModalSetUnitsAction {
    type: typeof TradeModalSetUnitsType
    payload: IPayload
}

export class TradeModalSetUnitsAction {
    static fire = (newUnits: number) => FuncToThunk(state => {
        const maxUnits = maxTradeUnits(state);
        return TradeModalSetUnitsAction.create(newUnits, maxUnits);
    });

    private static create(newUnits: number, maxUnits: number | null): ITradeModalSetUnitsAction {
        return {
            type: TradeModalSetUnitsType,
            payload: {
                units: newUnits,
                maxUnits: maxUnits
            }
        }
    }
}