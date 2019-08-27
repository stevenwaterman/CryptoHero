import BlotterSetCategoryAction, {BlotterSetCategoryType} from "./BlotterSetCategoryAction";
import BlotterStore, {BlotterActions, initialBlotterStore} from "../../store/BlotterStore";
import CancelOrderAction, {CancelOrderType} from "./CancelOrderAction";

type State = BlotterStore
type Actions = BlotterActions

export function blotterReducer(
    state: State = initialBlotterStore,
    action: Actions
): State {
    switch (action.type) {
        case BlotterSetCategoryType:
            return setCategory(state, action as BlotterSetCategoryAction);
        case CancelOrderType:
            return cancelOrder(state, action as CancelOrderAction);
        default:
            return state;
    }
}

function setCategory(state: State, action: BlotterSetCategoryAction): State {
    return ({
        ...state,
        showPending: action.payload.pendingSelected,
    });
}

function cancelOrder(state: State, action: CancelOrderAction): State {
    const newPending = state.pending.filter(it => it.id !== action.payload.id);
    return ({
        ...state,
        pending: newPending
    });
}
