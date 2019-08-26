import IDepositModalSetUnitsAction, {DepositModalSetUnitsType} from "./IDepositModalSetUnitsAction";
import IDepositModalSetAssetAction, {DepositModalSetAssetType} from "./IDepositModalSetAssetAction";
import DepositModalInputStore, {
    DepositModalInputActions,
    initialDepositModalInputStore
} from "../../../store/modalInputState/DepositModalInputStore";
import {clamp} from "../../../../util/Clamp";
import IShowDepositModalAction, {ShowDepositModalType} from "../../modal/deposit/IShowDepositModalAction";
import IDepositModalSetUnitsTextAction, {DepositModalSetUnitsTextType} from "./IDepositModalSetUnitsTextAction";
import IDepositModalResetUnitsTextAction, {DepositModalResetUnitsTextType} from "./IDepositModalResetUnitsTextAction";
import {formatInput} from "../../../../util/FormatMoney";

type State = DepositModalInputStore
type Actions = DepositModalInputActions

export function depositModalInputReducer(
    state: State = initialDepositModalInputStore,
    action: Actions
): State {
    switch (action.type) {
        case ShowDepositModalType:
            return startDeposit(state, action as IShowDepositModalAction);
        case DepositModalSetUnitsType:
            return setUnits(state, action as IDepositModalSetUnitsAction);
        case DepositModalSetUnitsTextType:
            return setUnitsText(state, action as IDepositModalSetUnitsTextAction);
        case DepositModalResetUnitsTextType:
            return resetUnitsText(state, action as IDepositModalResetUnitsTextAction);
        case DepositModalSetAssetType:
            return setAsset(state, action as IDepositModalSetAssetAction);
        default:
            return state;
    }
}

function startDeposit(state: State, action: IShowDepositModalAction): State {
    return {
        asset: "GBP", units: 0, unitsText: formatInput(0)
    }
}

function setAsset(state: State, action: IDepositModalSetAssetAction): State {
    const {newAsset} = action.payload;

    return ({
        ...state,
        asset: newAsset,
    })
}

function setUnits(state: State, action: IDepositModalSetUnitsAction): State {
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

function resetUnitsText(state: State, action: IDepositModalResetUnitsTextAction): State {
    return ({
        ...state,
        unitsText: formatInput(state.units)
    })
}

function setUnitsText(state: State, action: IDepositModalSetUnitsTextAction): State {
    return ({
        ...state,
        unitsText: action.payload.newText
    })
}
