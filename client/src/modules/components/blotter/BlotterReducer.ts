import BlotterSetCategoryAction, {BlotterSetCategoryType} from "./BlotterSetCategoryAction";
import BlotterStore, {BlotterActions, initialBlotterStore} from "./BlotterStore";
import SetOrdersAction, {SetOrdersType} from "./SetOrdersAction";
import UpdateOrderAction, {UpdateOrderType} from "./updateOrderAction";
import SetBlotterPageAction, {SetBlotterPageType} from "./SetBlotterPageAction";

type StateSlice = BlotterStore
type Actions = BlotterActions

function updateOrder(state: StateSlice, action: UpdateOrderAction): StateSlice {
    const newOrders = state.orders.slice();
    const idx: number = newOrders.findIndex(it => it.id === action.payload.order.id);
    if (idx === -1) {
        newOrders.push(action.payload.order);
    } else {
        newOrders.splice(idx, 1, action.payload.order)
    }
    newOrders.sort((a, b) => a.time.getTime() - b.time.getTime());

    let newPage = state.currentPage;

    return {
        ...state,
        orders: newOrders,
        currentPage: newPage
    }
}

function setPage(state: StateSlice, action: SetBlotterPageAction): StateSlice {
    return {
        ...state,
        currentPage: action.payload.newPage
    };
}

export function blotterReducer(
    state: StateSlice = initialBlotterStore,
    action: Actions
): StateSlice {
    switch (action.type) {
        case BlotterSetCategoryType:
            return setCategory(state, action as BlotterSetCategoryAction);
        case SetOrdersType:
            return setOrders(state, action as SetOrdersAction);
        case UpdateOrderType:
            return updateOrder(state, action as UpdateOrderAction);
        case SetBlotterPageType:
            return setPage(state, action as SetBlotterPageAction);
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

function setCategory(state: StateSlice, action: BlotterSetCategoryAction): StateSlice {
    return ({
        ...state,
        showState: action.payload.newState,
    });
}
