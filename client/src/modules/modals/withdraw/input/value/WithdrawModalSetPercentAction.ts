import {State} from "../../../../RootStore";
import Big from "big.js";

export const WithdrawModalSetPercentType: string = "WITHDRAW_SET_PERCENT";

export default interface WithdrawModalSetPercentAction {
    type: typeof WithdrawModalSetPercentType
    payload: {
        percent: Big,
        maxWithdraw: Big,
    }
}

export function createWithdrawModalSetPercentAction(state: State, newPercent: Big): WithdrawModalSetPercentAction {
    const max = state.funds.availableFunds.get(state.withdrawModalInput.asset) as Big;
    return {
        type: WithdrawModalSetPercentType,
        payload: {
            percent: newPercent,
            maxWithdraw: max
        }
    }
}