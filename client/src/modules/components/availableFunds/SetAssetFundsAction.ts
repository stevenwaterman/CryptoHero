export const SetAssetFundsType: string = "SET_ASSET_FUNDS";

export default interface SetAssetFundsAction {
    type: typeof SetAssetFundsType
    payload: {
        asset: string
        newAmount: number
    }
}

export function createSetAssetFundsAction(asset: string, newAmount: number): SetAssetFundsAction {
    return {
        type: SetAssetFundsType,
        payload: {
            asset: asset,
            newAmount: newAmount
        }
    }
}