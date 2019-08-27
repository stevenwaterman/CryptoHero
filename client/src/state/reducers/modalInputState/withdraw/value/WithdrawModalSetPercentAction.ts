import {maxWithdraw} from "../../../../../util/MaxWithdraw";
import {State} from "../../../../store/RootStore";

interface IPayload {
    percent: number,
    maxWithdraw: number,
}

export const WithdrawModalSetPercentType: string = "WITHDRAW_SET_PERCENT";

export default interface WithdrawModalSetPercentAction {
    type: typeof WithdrawModalSetPercentType
    payload: IPayload
}

export function createWithdrawModalSetPercentAction(state: State, newPercent: number): WithdrawModalSetPercentAction {
    const max = maxWithdraw(state);
    return {
        type: WithdrawModalSetPercentType,
        payload: {
            percent: newPercent,
            maxWithdraw: max
        }
    }
}