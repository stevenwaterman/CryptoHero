import DepositModalSetAssetAction from "../../reducers/modalInputState/deposit/DepositModalSetAssetAction";
import DepositModalResetUnitsTextAction from "../../reducers/modalInputState/deposit/DepositModalResetUnitsTextAction";
import DepositModalSetUnitsAction from "../../reducers/modalInputState/deposit/DepositModalSetUnitsAction";
import DepositModalSetUnitsTextAction from "../../reducers/modalInputState/deposit/DepositModalSetUnitsTextAction";

export default interface DepositModalInputStore {
    readonly asset: string,

    readonly unitsText: string,
    readonly units: number,
}

export const initialDepositModalInputStore: DepositModalInputStore = {
    asset: "GBP",

    unitsText: "0",
    units: 0,
};

export type DepositModalInputActions =
    DepositModalSetAssetAction
    | DepositModalSetUnitsTextAction
    | DepositModalSetUnitsAction
    | DepositModalResetUnitsTextAction
