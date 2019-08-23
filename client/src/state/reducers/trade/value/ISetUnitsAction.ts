import {maxTradeUnits} from "./MaxTradeUnits";
import {FuncToThunk} from "../../../../util/FuncToThunk";

interface IPayload {
    units: number,
    maxUnits: number | null,
}

export const SetUnitsType: string = "TRADE_SET_UNITS";

export default interface ISetUnitsAction {
    type: typeof SetUnitsType
    payload: IPayload
}

export class SetUnitsAction {
    static fire = (newUnits: number) => FuncToThunk(state => {
        const maxUnits = maxTradeUnits(state);
        return SetUnitsAction.create(newUnits, maxUnits);
    });

    private static create(newUnits: number, maxUnits: number | null) {
        return {
            type: SetUnitsType,
            payload: {
                units: newUnits,
                maxUnits: maxUnits
            }
        }
    }
}