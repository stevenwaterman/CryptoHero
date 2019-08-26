import IBlotterSetCategoryAction, {BlotterSetCategoryType} from "./IBlotterSetCategoryAction";
import BlotterStore, {BlotterActions, initialBlotterStore} from "../../store/BlotterStore";
import ICancelOrderAction, {CancelOrderType} from "./ICancelOrderAction";

type State = BlotterStore
type Actions = BlotterActions

export function blotterReducer(
    state: State = initialBlotterStore,
    action: Actions
): State {
    switch (action.type) {
        case BlotterSetCategoryType:
            return setCategory(state, action as IBlotterSetCategoryAction);
        case CancelOrderType:
            return cancelOrder(state, action as ICancelOrderAction);
        default:
            return state;
    }
}

function setCategory(state: State, action: IBlotterSetCategoryAction): State {
    return ({
        ...state,
        showPending: action.payload.pendingSelected,
    });
}

function cancelOrder(state: State, action: ICancelOrderAction): State {
    const newPending = state.pending.filter(it => it.id !== action.payload.id);
    return ({
        ...state,
        pending: newPending
    });
}
