import {State} from "../../../store/RootStore";

interface IPayload {
    newAsset: string,
}

export const DepositModalSetAssetType: string = "DEPOSIT_SET_ASSET";

export default interface DepositModalSetAssetAction {
    type: typeof DepositModalSetAssetType
    payload: IPayload
}

export function createDepositModalSetAssetAction(state: State, newAsset: string): DepositModalSetAssetAction {
    return {
        type: DepositModalSetAssetType,
        payload: {
            newAsset: newAsset,
        }
    }
}