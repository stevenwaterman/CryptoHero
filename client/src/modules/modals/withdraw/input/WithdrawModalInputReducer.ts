import WithdrawModalSetPercentAction, {WithdrawModalSetPercentType} from "./value/WithdrawModalSetPercentAction";
import WithdrawModalSetUnitsAction, {WithdrawModalSetUnitsType} from "./value/WithdrawModalSetUnitsAction";
import WithdrawModalSetUnitsTextAction, {WithdrawModalSetUnitsTextType} from "./text/WithdrawModalSetUnitsTextAction";
import WithdrawModalSetPercentTextAction, {WithdrawModalSetPercentTextType} from "./text/WithdrawModalSetPercentTextAction";
import WithdrawModalResetPercentTextAction, {WithdrawModalResetPercentTextType} from "./resetText/WithdrawModalResetPercentTextAction";
import WithdrawModalResetUnitsTextAction, {WithdrawModalResetUnitsTextType} from "./resetText/WithdrawModalResetUnitsTextAction";
import {formatInput, formatPercent} from "../../../../util/FormatMoney";
import WithdrawModalSetAssetAction, {WithdrawModalSetAssetType} from "./value/WithdrawModalSetAssetAction";
import WithdrawModalInputStore, {
    initialWithdrawModalInputStore,
    WithdrawModalInputActions
} from "./WithdrawModalInputStore";
import {clampBig} from "../../../../util/Clamp";
import ShowWithdrawModalAction, {ShowWithdrawModalType} from "../ShowWithdrawModalAction";
import Big from "big.js";

type State = WithdrawModalInputStore
type Actions = WithdrawModalInputActions

export function withdrawModalInputReducer(
    state: State = initialWithdrawModalInputStore,
    action: Actions
): State {
    switch (action.type) {
        case ShowWithdrawModalType:
            return startWithdraw(state, action as ShowWithdrawModalAction);
        case WithdrawModalSetPercentType:
            return setPercent(state, action as WithdrawModalSetPercentAction);
        case WithdrawModalSetUnitsType:
            return setUnits(state, action as WithdrawModalSetUnitsAction);
        case WithdrawModalSetUnitsTextType:
            return setUnitsText(state, action as WithdrawModalSetUnitsTextAction);
        case WithdrawModalSetPercentTextType:
            return setPercentText(state, action as WithdrawModalSetPercentTextAction);
        case WithdrawModalResetPercentTextType:
            return resetPercentText(state, action as WithdrawModalResetPercentTextAction);
        case WithdrawModalResetUnitsTextType:
            return resetUnitsText(state, action as WithdrawModalResetUnitsTextAction);
        case WithdrawModalSetAssetType:
            return setAsset(state, action as WithdrawModalSetAssetAction);
        default:
            return state;
    }
}

function startWithdraw(state: State, action: ShowWithdrawModalAction): State {
    return {
        asset: "GBP",
        percent: Big(0),
        percentText: formatPercent(Big(0)),
        units: Big(0),
        unitsText: formatInput(Big(0))
    }
}

function setAsset(state: State, action: WithdrawModalSetAssetAction): State {
    const {maxWithdraw, newAsset} = action.payload;

    const newUnits = clampBig(state.units, 0, maxWithdraw);
    const newUnitsText = formatInput(newUnits);
    const newPercent = newUnits.div(maxWithdraw).mul(100);
    const newPercentText = formatPercent(newPercent);

    return {
        ...state,
        asset: newAsset,
        units: newUnits,
        unitsText: newUnitsText,
        percent: newPercent,
        percentText: newPercentText
    }
}

function setUnits(state: State, action: WithdrawModalSetUnitsAction): State {
    const {maxWithdraw, units} = action.payload;
    const actualUnits = clampBig(units, 0, maxWithdraw);

    const percent = actualUnits.div(maxWithdraw).mul(100);
    const percentText = formatPercent(percent);

    let unitsText = state.unitsText;
    if (units !== actualUnits) {
        unitsText = formatInput(actualUnits)
    }

    return {
        ...state,
        units: actualUnits,
        unitsText: unitsText,
        percent: percent,
        percentText: percentText
    };
}

function setPercent(state: State, action: WithdrawModalSetPercentAction): State {
    const {maxWithdraw, percent} = action.payload;

    let actualPercent = clampBig(percent, 0, 100);
    let percentText = state.percentText;
    if (actualPercent !== percent) {
        percentText = formatPercent(actualPercent);
    }

    const units = actualPercent.mul(maxWithdraw).div(100);
    const unitsText = formatPercent(units);

    return {
        ...state,
        unitsText: unitsText,
        units: units,
        percent: actualPercent,
        percentText: percentText
    };
}

function resetPercentText(state: State, action: WithdrawModalResetPercentTextAction): State {
    return {
        ...state,
        percentText: formatPercent(state.percent)
    };
}

function resetUnitsText(state: State, action: WithdrawModalResetUnitsTextAction): State {
    return {
        ...state,
        unitsText: formatInput(state.units)
    };
}

function setUnitsText(state: State, action: WithdrawModalSetUnitsTextAction): State {
    return {
        ...state,
        unitsText: action.payload.newText
    };
}

function setPercentText(state: State, action: WithdrawModalSetPercentTextAction): State {
    return {
        ...state,
        percentText: action.payload.newText
    };
}