import {FuncToThunk} from "../../../../../util/FuncToThunk";
import {fundsAvailable} from "../../../../../util/FundsAvailable";

interface IPayload {
    newAsset: string,
    maxWithdraw: number,
}

export const WithdrawModalSetAssetType: string = "WITHDRAW_SET_ASSET";

export default interface IWithdrawModalSetAssetAction {
    type: typeof WithdrawModalSetAssetType
    payload: IPayload
}

export class WithdrawModalSetAssetAction {
    static fire = (newAsset: string) => FuncToThunk(state => {
        const max: number = fundsAvailable(state.funds.availableFunds, newAsset);
        return WithdrawModalSetAssetAction.create(newAsset, max);
    });

    private static create(newAsset: string, maxWithdraw: number): IWithdrawModalSetAssetAction {
        return {
            type: WithdrawModalSetAssetType,
            payload: {
                newAsset: newAsset,
                maxWithdraw: maxWithdraw
            }
        }
    }
}