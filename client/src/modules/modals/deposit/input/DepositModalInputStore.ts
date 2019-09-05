import DepositModalSetAssetAction from "./DepositModalSetAssetAction";
import DepositModalResetUnitsTextAction from "./DepositModalResetUnitsTextAction";
import DepositModalSetUnitsAction from "./DepositModalSetUnitsAction";
import DepositModalSetUnitsTextAction from "./DepositModalSetUnitsTextAction";
import Big from "big.js";

export default interface DepositModalInputStore {
    readonly asset: string,

    readonly unitsText: string,
    readonly units: Big,
}

export const initialDepositModalInputStore: DepositModalInputStore = {
    asset: "NA",

    unitsText: "0",
    units: Big(0),
};

export type DepositModalInputActions =
    DepositModalSetAssetAction
    | DepositModalSetUnitsTextAction
    | DepositModalSetUnitsAction
    | DepositModalResetUnitsTextAction
