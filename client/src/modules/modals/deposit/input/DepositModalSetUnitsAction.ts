import {State} from "../../../RootStore";

interface IPayload {
    units: number,
}

export const DepositModalSetUnitsType: string = "DEPOSIT_SET_UNITS";

export default interface DepositModalSetUnitsAction {
    type: typeof DepositModalSetUnitsType
    payload: IPayload
}

export function createDepositModalSetUnitsAction(state: State, newUnits: number): DepositModalSetUnitsAction {
    return {
        type: DepositModalSetUnitsType,
        payload: {
            units: newUnits,
        }
    }
}