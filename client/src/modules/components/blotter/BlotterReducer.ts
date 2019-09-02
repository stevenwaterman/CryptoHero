import BlotterSetCategoryAction, {BlotterSetCategoryType} from "./BlotterSetCategoryAction";
import BlotterStore, {BlotterActions, initialBlotterStore} from "./BlotterStore";
import CancelOrderAction, {CancelOrderType} from "./CancelOrderAction";
import ConfirmTradeAction, {ConfirmTradeType} from "../../modals/trade/ConfirmTradeAction";
import SetOrdersAction, {SetOrdersType} from "./SetOrdersAction";

type StateSlice = BlotterStore
type Actions = BlotterActions

export function blotterReducer(
    state: StateSlice = initialBlotterStore,
    action: Actions
): StateSlice {
    switch (action.type) {
        case BlotterSetCategoryType:
            return setCategory(state, action as BlotterSetCategoryAction);
        case CancelOrderType:
            return cancelOrder(state, action as CancelOrderAction);
        case ConfirmTradeType:
            return confirmTrade(state, action as ConfirmTradeAction);
        case SetOrdersType:
            return setOrders(state, action as SetOrdersAction);
        default:
            return state;
    }
}

function setOrders(state: StateSlice, action: SetOrdersAction): StateSlice {
    return {
        ...state,
        orders: action.payload.orders
    };
}

function confirmTrade(state: StateSlice, action: ConfirmTradeAction): StateSlice {
    return {
        ...state,
        orders: state.orders.concat(action.payload.newOrder)
    };
}

function setCategory(state: StateSlice, action: BlotterSetCategoryAction): StateSlice {
    return ({
        ...state,
        showPending: action.payload.pendingSelected,
    });
}

function cancelOrder(state: StateSlice, action: CancelOrderAction): StateSlice {
    return ({
        ...state,
        orders: state.orders.filter(it => it.id !== action.payload.order.id)
    });
}
