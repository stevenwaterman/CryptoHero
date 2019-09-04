import AvailableFundsStore, {FundsActions, initialFundsStore} from "./AvailableFundsStore";
import SetAvailableFundsAction, {SetAvailableFundsType} from "./SetAvailableFundsAction";
import SetAssetFundsAction, {SetAssetFundsType} from "./SetAssetFundsAction";

type StateSlice = AvailableFundsStore
type Actions = FundsActions

function setAssetFunds(state: StateSlice, action: SetAssetFundsAction): StateSlice {
    const {asset, newAmount} = action.payload;
    const newFunds: Map<string, number> = new Map(state.availableFunds);
    newFunds.set(asset, newAmount);
    return {
        ...state,
        availableFunds: newFunds
    }
}

export function availableFundsReducer(
    state: StateSlice = initialFundsStore,
    action: Actions
): StateSlice {
    switch (action.type) {
        case SetAvailableFundsType:
            return setAvailableFunds(state, action as SetAvailableFundsAction);
        case SetAssetFundsType:
            return setAssetFunds(state, action as SetAssetFundsAction);
        default:
            return state;
    }
}

function setAvailableFunds(state: StateSlice, action: SetAvailableFundsAction): StateSlice {
    return {
        ...state,
        availableFunds: action.payload.funds
    };
}
