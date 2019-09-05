import WithdrawModalSetAssetAction from "./value/WithdrawModalSetAssetAction";
import WithdrawModalSetPercentAction from "./value/WithdrawModalSetPercentAction";
import WithdrawModalResetPercentTextAction from "./resetText/WithdrawModalResetPercentTextAction";
import WithdrawModalSetUnitsAction from "./value/WithdrawModalSetUnitsAction";
import WithdrawModalSetPercentTextAction from "./text/WithdrawModalSetPercentTextAction";
import WithdrawModalSetUnitsTextAction from "./text/WithdrawModalSetUnitsTextAction";
import WithdrawModalResetUnitsTextAction from "./resetText/WithdrawModalResetUnitsTextAction";
import Big from "big.js";

export default interface WithdrawModalInputStore {
    readonly asset: string,

    readonly unitsText: string,
    readonly units: Big,

    readonly percentText: string,
    readonly percent: Big,
}

export const initialWithdrawModalInputStore: WithdrawModalInputStore = {
    asset: "NA",

    unitsText: "0",
    units: Big(0),

    percentText: "0",
    percent: Big(0),
};

export type WithdrawModalInputActions =
    WithdrawModalSetAssetAction
    | WithdrawModalSetPercentAction
    | WithdrawModalSetPercentTextAction
    | WithdrawModalSetUnitsTextAction
    | WithdrawModalSetUnitsAction
    | WithdrawModalResetPercentTextAction
    | WithdrawModalResetUnitsTextAction
