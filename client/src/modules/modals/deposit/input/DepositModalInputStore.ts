import DepositModalSetAssetAction from "./DepositModalSetAssetAction";
import DepositModalResetUnitsTextAction from "./DepositModalResetUnitsTextAction";
import DepositModalSetUnitsAction from "./DepositModalSetUnitsAction";
import DepositModalSetUnitsTextAction from "./DepositModalSetUnitsTextAction";

export default interface DepositModalInputStore {
    readonly asset: string,

    readonly unitsText: string,
    readonly units: number,
}

export const initialDepositModalInputStore: DepositModalInputStore = {
    asset: "LTCGBPNA",

    unitsText: "0",
    units: 0,
};

export type DepositModalInputActions =
    DepositModalSetAssetAction
    | DepositModalSetUnitsTextAction
    | DepositModalSetUnitsAction
    | DepositModalResetUnitsTextAction
