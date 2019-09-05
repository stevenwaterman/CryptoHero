import {State} from "../../../RootStore";
import Big from "big.js";

export const DepositModalSetUnitsType: string = "DEPOSIT_SET_UNITS";

export default interface DepositModalSetUnitsAction {
    type: typeof DepositModalSetUnitsType
    payload: {
        units: Big,
    }
}

export function createDepositModalSetUnitsAction(state: State, newUnits: Big): DepositModalSetUnitsAction {
    return {
        type: DepositModalSetUnitsType,
        payload: {
            units: newUnits,
        }
    }
}