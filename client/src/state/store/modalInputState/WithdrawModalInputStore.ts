import WithdrawModalSetAssetAction from "../../reducers/modalInputState/withdraw/value/WithdrawModalSetAssetAction";
import WithdrawModalSetPercentAction from "../../reducers/modalInputState/withdraw/value/WithdrawModalSetPercentAction";
import WithdrawModalResetPercentTextAction
    from "../../reducers/modalInputState/withdraw/resetText/WithdrawModalResetPercentTextAction";
import WithdrawModalSetUnitsAction from "../../reducers/modalInputState/withdraw/value/WithdrawModalSetUnitsAction";
import WithdrawModalSetPercentTextAction
    from "../../reducers/modalInputState/withdraw/text/WithdrawModalSetPercentTextAction";
import WithdrawModalSetUnitsTextAction
    from "../../reducers/modalInputState/withdraw/text/WithdrawModalSetUnitsTextAction";
import WithdrawModalResetUnitsTextAction
    from "../../reducers/modalInputState/withdraw/resetText/WithdrawModalResetUnitsTextAction";

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
    WithdrawModalSetAssetAction
    | WithdrawModalSetPercentAction
    | WithdrawModalSetPercentTextAction
    | WithdrawModalSetUnitsTextAction
    | WithdrawModalSetUnitsAction
    | WithdrawModalResetPercentTextAction
    | WithdrawModalResetUnitsTextAction
