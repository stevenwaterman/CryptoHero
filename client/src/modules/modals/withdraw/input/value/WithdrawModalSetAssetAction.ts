import {State} from "../../../../RootStore";
import Big from "big.js";

export const WithdrawModalSetAssetType: string = "WITHDRAW_SET_ASSET";

export default interface WithdrawModalSetAssetAction {
    type: typeof WithdrawModalSetAssetType
    payload: {
        newAsset: string,
        maxWithdraw: Big,
    }
}

export function createWithdrawModalSetAssetAction(state: State, newAsset: string): WithdrawModalSetAssetAction {
    const max = state.funds.availableFunds.get(state.withdrawModalInput.asset) as Big;
    return {
        type: WithdrawModalSetAssetType,
        payload: {
            newAsset: newAsset,
            maxWithdraw: max
        }
    }
}
