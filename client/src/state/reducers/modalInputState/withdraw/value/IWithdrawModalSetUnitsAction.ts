import {FuncToThunk} from "../../../../../util/FuncToThunk";
import {maxWithdraw} from "../../../../../util/MaxWithdraw";

interface IPayload {
    units: number,
    maxWithdraw: number,
}

export const WithdrawModalSetUnitsType: string = "WITHDRAW_SET_UNITS";

export default interface IWithdrawModalSetUnitsAction {
    type: typeof WithdrawModalSetUnitsType
    payload: IPayload
}

export class WithdrawModalSetUnitsAction {
    static fire = (newUnits: number) => FuncToThunk(state => {
        const max = maxWithdraw(state);
        return WithdrawModalSetUnitsAction.create(newUnits, max);
    });

    private static create(newUnits: number, maxWithdraw: number): IWithdrawModalSetUnitsAction {
        return {
            type: WithdrawModalSetUnitsType,
            payload: {
                units: newUnits,
                maxWithdraw: maxWithdraw
            }
        }
    }
}