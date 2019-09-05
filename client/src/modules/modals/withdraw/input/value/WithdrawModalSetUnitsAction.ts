import {State} from "../../../../RootStore";
import Big from "big.js";

export const WithdrawModalSetUnitsType: string = "WITHDRAW_SET_UNITS";

export default interface WithdrawModalSetUnitsAction {
    type: typeof WithdrawModalSetUnitsType
    payload: {
        units: Big,
        maxWithdraw: Big,
    }
}

export function createWithdrawModalSetUnitsAction(state: State, newUnits: Big): WithdrawModalSetUnitsAction {
    const max = state.funds.availableFunds.get(state.withdrawModalInput.asset) as Big;
    return {
        type: WithdrawModalSetUnitsType,
        payload: {
            units: newUnits,
            maxWithdraw: max
        }
    }
}
