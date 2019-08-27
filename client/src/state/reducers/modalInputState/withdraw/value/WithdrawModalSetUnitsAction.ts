import {maxWithdraw} from "../../../../../util/MaxWithdraw";
import {State} from "../../../../store/RootStore";

interface IPayload {
    units: number,
    maxWithdraw: number,
}

export const WithdrawModalSetUnitsType: string = "WITHDRAW_SET_UNITS";

export default interface WithdrawModalSetUnitsAction {
    type: typeof WithdrawModalSetUnitsType
    payload: IPayload
}

export function createWithdrawModalSetUnitsAction(state: State, newUnits: number): WithdrawModalSetUnitsAction {
    const max = maxWithdraw(state);
    return {
        type: WithdrawModalSetUnitsType,
        payload: {
            units: newUnits,
            maxWithdraw: max
        }
    }
}
