import ViewTradeModalStore, {
    initialViewTradeModalStore,
    ViewTradeModalActions
} from "./ViewTradeModalStore";
import ShowViewTradeModalAction, {ShowViewTradeModalType} from "./ShowViewTradeModalAction";

type State = ViewTradeModalStore
type Actions = ViewTradeModalActions

function viewTrade(state: State, action: ShowViewTradeModalAction): State {
    return action.payload;
}

export function viewTradeModalReducer(
    state: State = initialViewTradeModalStore,
    action: Actions
): State {
    switch (action.type) {
        case ShowViewTradeModalType:
            return viewTrade(state, action as ShowViewTradeModalAction);
        default:
            return state;
    }
}

