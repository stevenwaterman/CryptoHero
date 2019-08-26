import {FuncToThunk} from "../../../../../util/FuncToThunk";
import {maxWithdraw} from "../../../../../util/MaxWithdraw";

interface IPayload {
    percent: number,
    maxWithdraw: number,
}

export const WithdrawModalSetPercentType: string = "WITHDRAW_SET_PERCENT";

export default interface IWithdrawModalSetPercentAction {
    type: typeof WithdrawModalSetPercentType
    payload: IPayload
}

export class WithdrawModalSetPercentAction {
    static fire = (newPercent: number) => FuncToThunk(state => {
        const max = maxWithdraw(state);
        return WithdrawModalSetPercentAction.create(newPercent, max);
    });

    private static create(newPercent: number, maxWithdraw: number): IWithdrawModalSetPercentAction {
        return {
            type: WithdrawModalSetPercentType,
            payload: {
                percent: newPercent,
                maxWithdraw: maxWithdraw
            }
        }
    }
}