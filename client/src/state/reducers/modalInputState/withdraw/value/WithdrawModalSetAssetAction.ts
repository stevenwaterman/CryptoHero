import {fundsAvailable} from "../../../../../util/FundsAvailable";
import {State} from "../../../../store/RootStore";

interface IPayload {
    newAsset: string,
    maxWithdraw: number,
}

export const WithdrawModalSetAssetType: string = "WITHDRAW_SET_ASSET";

export default interface WithdrawModalSetAssetAction {
    type: typeof WithdrawModalSetAssetType
    payload: IPayload
}

export function createWithdrawModalSetAssetAction(state: State, newAsset: string): WithdrawModalSetAssetAction {
    const max: number = fundsAvailable(state.funds.availableFunds, newAsset);
    return {
        type: WithdrawModalSetAssetType,
        payload: {
            newAsset: newAsset,
            maxWithdraw: max
        }
    }
}
