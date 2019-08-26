import {FuncToThunk} from "../../../../util/FuncToThunk";

interface IPayload {
    units: number,
}

export const DepositModalSetUnitsType: string = "DEPOSIT_SET_UNITS";

export default interface IDepositModalSetUnitsAction {
    type: typeof DepositModalSetUnitsType
    payload: IPayload
}

export class DepositModalSetUnitsAction {
    static fire = (newUnits: number) => FuncToThunk(() => DepositModalSetUnitsAction.create(newUnits));

    private static create(newUnits: number): IDepositModalSetUnitsAction {
        return {
            type: DepositModalSetUnitsType,
            payload: {
                units: newUnits,
            }
        }
    }
}