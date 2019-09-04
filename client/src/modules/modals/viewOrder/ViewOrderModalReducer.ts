import ViewOrderModalStore, {initialViewTradeModalStore, ViewTradeModalActions} from "./ViewOrderModalStore";
import ShowViewOrderModalAction, {ShowViewOrderModalType} from "./ShowViewOrderModalAction";
import UpdateOrderAction, {UpdateOrderType} from "../../components/blotter/updateOrderAction";

type State = ViewOrderModalStore
type Actions = ViewTradeModalActions

function updateOrder(state: State, action: UpdateOrderAction): State {
    return {
        ...state,
        order: action.payload.order
    }
}

export function viewOrderModalReducer(
    state: State = initialViewTradeModalStore,
    action: Actions
): State {
    switch (action.type) {
        case ShowViewOrderModalType:
            return viewOrder(state, action as ShowViewOrderModalAction);
        case UpdateOrderType:
            return updateOrder(state, action as UpdateOrderAction);
        default:
            return state;
    }
}

function viewOrder(state: State, action: ShowViewOrderModalAction): State {
    return action.payload;
}

