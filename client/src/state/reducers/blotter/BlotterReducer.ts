import BlotterSetCategoryAction, {BlotterSetCategoryType} from "./BlotterSetCategoryAction";
import BlotterStore, {BlotterActions, initialBlotterStore} from "../../store/BlotterStore";
import CancelOrderAction, {CancelOrderType} from "./CancelOrderAction";
import ConfirmTradeAction, {ConfirmTradeType} from "../modal/trade/ConfirmTradeAction";

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
        case ConfirmTradeType:
            return confirmTrade(state, action as ConfirmTradeAction);
        default:
            return state;
    }
}

function confirmTrade(state: State, action: ConfirmTradeAction): State {
    return {
        ...state,
        pending: state.pending.concat(action.payload.newTrade)
    };
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