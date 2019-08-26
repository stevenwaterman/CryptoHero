import {FuncToThunk} from "../../../../util/FuncToThunk";

interface IPayload {
    newAsset: string,
}

export const DepositModalSetAssetType: string = "DEPOSIT_SET_ASSET";

export default interface IDepositModalSetAssetAction {
    type: typeof DepositModalSetAssetType
    payload: IPayload
}

export class DepositModalSetAssetAction {
    static fire = (newAsset: string) => FuncToThunk(() => DepositModalSetAssetAction.create(newAsset));

    private static create(newAsset: string): IDepositModalSetAssetAction {
        return {
            type: DepositModalSetAssetType,
            payload: {
                newAsset: newAsset,
            }
        }
    }
}