import {State} from "../../../RootStore";

export const DepositModalSetAssetType: string = "DEPOSIT_SET_ASSET";

export default interface DepositModalSetAssetAction {
    type: typeof DepositModalSetAssetType
    payload: {
        newAsset: string,
    }
}

export function createDepositModalSetAssetAction(state: State, newAsset: string): DepositModalSetAssetAction {
    return {
        type: DepositModalSetAssetType,
        payload: {
            newAsset: newAsset,
        }
    }
}