import BlotterSetCategoryAction, {BlotterSetCategoryType} from "./BlotterSetCategoryAction";
import BlotterStore, {BlotterActions, initialBlotterStore} from "./BlotterStore";
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

function setCategory(state: StateSlice, action: BlotterSetCategoryAction): StateSlice {
    return ({
        ...state,
        showState: action.payload.newState,
    });
}
