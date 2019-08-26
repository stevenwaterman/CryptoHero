import ViewTradeModalStore, {
    initialViewTradeModalStore,
    ViewTradeModalActions
} from "../../../store/modal/ViewTradeModalStore";
import IStartViewTradeAction, {StartViewTradeType} from "./IStartViewTradeAction";

type State = ViewTradeModalStore
type Actions = ViewTradeModalActions

function viewTrade(state: State, action: IStartViewTradeAction): State {
    return action.payload;
}

export function viewTradeModalReducer(
    state: State = initialViewTradeModalStore,
    action: Actions
): State {
    switch (action.type) {
        case StartViewTradeType:
            return viewTrade(state, action as IStartViewTradeAction);
        default:
            return state;
    }
}

