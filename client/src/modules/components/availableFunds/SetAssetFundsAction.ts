import Big from "big.js";

export const SetAssetFundsType: string = "SET_ASSET_FUNDS";

export default interface SetAssetFundsAction {
    type: typeof SetAssetFundsType
    payload: {
        asset: string
        newAmount: Big
    }
}

export function createSetAssetFundsAction(asset: string, newAmount: Big): SetAssetFundsAction {
    return {
        type: SetAssetFundsType,
        payload: {
            asset: asset,
            newAmount: newAmount
        }
    }
}