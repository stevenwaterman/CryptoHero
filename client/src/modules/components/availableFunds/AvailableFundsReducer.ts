import AvailableFundsStore, {FundsActions, initialFundsStore} from "./AvailableFundsStore";
import SetAvailableFundsAction, {SetAvailableFundsType} from "./SetAvailableFundsAction";

type StateSlice = AvailableFundsStore
type Actions = FundsActions

export function availableFundsReducer(
    state: StateSlice = initialFundsStore,
    action: Actions
): StateSlice {
    switch (action.type) {
        case SetAvailableFundsType:
            return setAvailableFunds(state, action as SetAvailableFundsAction);
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
