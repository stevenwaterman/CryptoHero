import IWithdrawModalSetPercentAction, {WithdrawModalSetPercentType} from "./value/IWithdrawModalSetPercentAction";
import IWithdrawModalSetUnitsAction, {WithdrawModalSetUnitsType} from "./value/IWithdrawModalSetUnitsAction";
import IWithdrawModalSetUnitsTextAction, {WithdrawModalSetUnitsTextType} from "./text/IWithdrawModalSetUnitsTextAction";
import IWithdrawModalSetPercentTextAction, {WithdrawModalSetPercentTextType} from "./text/IWithdrawModalSetPercentTextAction";
import IWithdrawModalResetPercentTextAction, {WithdrawModalResetPercentTextType} from "./resetText/IWithdrawModalResetPercentTextAction";
import IWithdrawModalResetUnitsTextAction, {WithdrawModalResetUnitsTextType} from "./resetText/IWithdrawModalResetUnitsTextAction";
import {formatInput, formatPercent} from "../../../../util/FormatMoney";
import {withChanges} from "../../../../util/WithChanges";
import IWithdrawModalSetAssetAction, {WithdrawModalSetAssetType} from "./value/IWithdrawModalSetAssetAction";
import WithdrawModalInputStore, {
    initialWithdrawModalInputStore,
    WithdrawModalInputActions
} from "../../../store/modalInputState/WithdrawModalInputStore";
import {clamp} from "../../../../util/Clamp";
import IStartWithdrawAction, {StartWithdrawType} from "../../modal/withdraw/IStartWithdrawAction";

type State = WithdrawModalInputStore
type Actions = WithdrawModalInputActions

export function withdrawModalInputReducer(
    state: State = initialWithdrawModalInputStore,
    action: Actions
): State {
    switch (action.type) {
        case StartWithdrawType:
            return startWithdraw(state, action as IStartWithdrawAction);
        case WithdrawModalSetPercentType:
            return setPercent(state, action as IWithdrawModalSetPercentAction);
        case WithdrawModalSetUnitsType:
            return setUnits(state, action as IWithdrawModalSetUnitsAction);
        case WithdrawModalSetUnitsTextType:
            return setUnitsText(state, action as IWithdrawModalSetUnitsTextAction);
        case WithdrawModalSetPercentTextType:
            return setPercentText(state, action as IWithdrawModalSetPercentTextAction);
        case WithdrawModalResetPercentTextType:
            return resetPercentText(state, action as IWithdrawModalResetPercentTextAction);
        case WithdrawModalResetUnitsTextType:
            return resetUnitsText(state, action as IWithdrawModalResetUnitsTextAction);
        case WithdrawModalSetAssetType:
            return setAsset(state, action as IWithdrawModalSetAssetAction);
        default:
            return state;
    }
}

function startWithdraw(state: State, action: IStartWithdrawAction): State {
    return {
        asset: "GBP", percent: 0, percentText: formatPercent(0), units: 0, unitsText: formatInput(0)
    }
}

function setAsset(state: State, action: IWithdrawModalSetAssetAction): State {
    const {maxWithdraw, newAsset} = action.payload;

    const newUnits = clamp(state.units, 0, maxWithdraw);
    const newUnitsText = formatInput(newUnits);
    const newPercent = 100 * newUnits / maxWithdraw;
    const newPercentText = formatPercent(newPercent);

    return withChanges(state, {
        asset: newAsset,
        units: newUnits,
        unitsText: newUnitsText,
        percent: newPercent,
        percentText: newPercentText
    })
}

function setUnits(state: State, action: IWithdrawModalSetUnitsAction): State {
    const {maxWithdraw, units} = action.payload;
    const actualUnits = clamp(units, 0, maxWithdraw);

    const percent = 100 * actualUnits / maxWithdraw;
    const percentText = formatPercent(percent);

    let unitsText = state.unitsText;
    if (units !== actualUnits) {
        unitsText = formatInput(actualUnits)
    }

    return withChanges(state, {
        units: actualUnits,
        unitsText: unitsText,
        percent: percent,
        percentText: percentText
    });
}

function setPercent(state: State, action: IWithdrawModalSetPercentAction): State {
    const {maxWithdraw, percent} = action.payload;

    let actualPercent = clamp(percent, 0, 100);
    let percentText = state.percentText;
    if (actualPercent !== percent) {
        percentText = formatPercent(actualPercent);
    }

    const units = actualPercent * maxWithdraw / 100;
    const unitsText = formatPercent(units);

    return withChanges(state, {
        unitsText: unitsText,
        units: units,
        percent: actualPercent,
        percentText: percentText
    });
}

function resetPercentText(state: State, action: IWithdrawModalResetPercentTextAction): State {
    return withChanges(state, {
        percentText: formatPercent(state.percent)
    });
}

function resetUnitsText(state: State, action: IWithdrawModalResetUnitsTextAction): State {
    return withChanges(state, {
        unitsText: formatInput(state.units)
    })
}

function setUnitsText(state: State, action: IWithdrawModalSetUnitsTextAction): State {
    return withChanges(state, {
        unitsText: action.payload.newText
    })
}

function setPercentText(state: State, action: IWithdrawModalSetPercentTextAction): State {
    return withChanges(state, {
        percentText: action.payload.newText
    })
}