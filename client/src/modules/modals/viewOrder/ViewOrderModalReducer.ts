import ViewOrderModalStore, {
    initialViewTradeModalStore,
    ViewTradeModalActions
} from "./ViewOrderModalStore";
import ShowViewOrderModalAction, {ShowViewOrderModalType} from "./ShowViewOrderModalAction";

type State = ViewOrderModalStore
type Actions = ViewTradeModalActions

export function viewOrderModalReducer(
    state: State = initialViewTradeModalStore,
    action: Actions
): State {
    switch (action.type) {
        case ShowViewOrderModalType:
            return viewOrder(state, action as ShowViewOrderModalAction);
        default:
            return state;
    }
}

function viewOrder(state: State, action: ShowViewOrderModalAction): State {
    return action.payload;
}

