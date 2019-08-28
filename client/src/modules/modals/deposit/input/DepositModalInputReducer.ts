import DepositModalSetUnitsAction, {DepositModalSetUnitsType} from "./DepositModalSetUnitsAction";
import DepositModalSetAssetAction, {DepositModalSetAssetType} from "./DepositModalSetAssetAction";
import DepositModalInputStore, {
    DepositModalInputActions,
    initialDepositModalInputStore
} from "./DepositModalInputStore";
import {clamp} from "../../../../util/Clamp";
import ShowDepositModalAction, {ShowDepositModalType} from "../ShowDepositModalAction";
import DepositModalSetUnitsTextAction, {DepositModalSetUnitsTextType} from "./DepositModalSetUnitsTextAction";
import DepositModalResetUnitsTextAction, {DepositModalResetUnitsTextType} from "./DepositModalResetUnitsTextAction";
import {formatInput} from "../../../../util/FormatMoney";

type State = DepositModalInputStore
type Actions = DepositModalInputActions

export function depositModalInputReducer(
    state: State = initialDepositModalInputStore,
    action: Actions
): State {
    switch (action.type) {
        case ShowDepositModalType:
            return startDeposit(state, action as ShowDepositModalAction);
        case DepositModalSetUnitsType:
            return setUnits(state, action as DepositModalSetUnitsAction);
        case DepositModalSetUnitsTextType:
            return setUnitsText(state, action as DepositModalSetUnitsTextAction);
        case DepositModalResetUnitsTextType:
            return resetUnitsText(state, action as DepositModalResetUnitsTextAction);
        case DepositModalSetAssetType:
            return setAsset(state, action as DepositModalSetAssetAction);
        default:
            return state;
    }
}

function startDeposit(state: State, action: ShowDepositModalAction): State {
    return {
        asset: "GBP", units: 0, unitsText: formatInput(0)
    }
}

function setAsset(state: State, action: DepositModalSetAssetAction): State {
    const {newAsset} = action.payload;

    return ({
        ...state,
        asset: newAsset,
    })
}

function setUnits(state: State, action: DepositModalSetUnitsAction): State {
    const {units} = action.payload;
    const actualUnits = clamp(units, 0);

    let unitsText = state.unitsText;
    if (units !== actualUnits) {
        unitsText = formatInput(actualUnits)
    }

    return ({
        ...state,
        units: actualUnits,
        unitsText: unitsText,
    });
}

function resetUnitsText(state: State, action: DepositModalResetUnitsTextAction): State {
    return ({
        ...state,
        unitsText: formatInput(state.units)
    })
}

function setUnitsText(state: State, action: DepositModalSetUnitsTextAction): State {
    return ({
        ...state,
        unitsText: action.payload.newText
    })
}
