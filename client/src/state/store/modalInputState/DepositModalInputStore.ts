import IDepositModalSetAssetAction from "../../reducers/modalInputState/deposit/IDepositModalSetAssetAction";
import IDepositModalResetUnitsTextAction
    from "../../reducers/modalInputState/deposit/IDepositModalResetUnitsTextAction";
import IDepositModalSetUnitsAction from "../../reducers/modalInputState/deposit/IDepositModalSetUnitsAction";
import IDepositModalSetUnitsTextAction from "../../reducers/modalInputState/deposit/IDepositModalSetUnitsTextAction";

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
    IDepositModalSetAssetAction
    | IDepositModalSetUnitsTextAction
    | IDepositModalSetUnitsAction
    | IDepositModalResetUnitsTextAction
