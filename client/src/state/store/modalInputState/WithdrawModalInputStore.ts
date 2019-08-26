import IWithdrawModalSetAssetAction from "../../reducers/modalInputState/withdraw/value/IWithdrawModalSetAssetAction";
import IWithdrawModalSetPercentAction
    from "../../reducers/modalInputState/withdraw/value/IWithdrawModalSetPercentAction";
import IWithdrawModalResetPercentTextAction
    from "../../reducers/modalInputState/withdraw/resetText/IWithdrawModalResetPercentTextAction";
import IWithdrawModalSetUnitsAction from "../../reducers/modalInputState/withdraw/value/IWithdrawModalSetUnitsAction";
import IWithdrawModalSetPercentTextAction
    from "../../reducers/modalInputState/withdraw/text/IWithdrawModalSetPercentTextAction";
import IWithdrawModalSetUnitsTextAction
    from "../../reducers/modalInputState/withdraw/text/IWithdrawModalSetUnitsTextAction";
import IWithdrawModalResetUnitsTextAction
    from "../../reducers/modalInputState/withdraw/resetText/IWithdrawModalResetUnitsTextAction";

export default interface WithdrawModalInputStore {
    readonly asset: string,

    readonly unitsText: string,
    readonly units: number,

    readonly percentText: string,
    readonly percent: number,
}

export const initialWithdrawModalInputStore: WithdrawModalInputStore = {
    asset: "GBP",

    unitsText: "0",
    units: 0,

    percentText: "0",
    percent: 0,
};

export type WithdrawModalInputActions =
    IWithdrawModalSetAssetAction
    | IWithdrawModalSetPercentAction
    | IWithdrawModalSetPercentTextAction
    | IWithdrawModalSetUnitsTextAction
    | IWithdrawModalSetUnitsAction
    | IWithdrawModalResetPercentTextAction
    | IWithdrawModalResetUnitsTextAction
