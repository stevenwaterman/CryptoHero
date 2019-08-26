import ViewTradeModalStore, {
    initialViewTradeModalStore,
    ViewTradeModalActions
} from "../../../store/modal/ViewTradeModalStore";
import IShowViewTradeModalAction, {ShowViewTradeModalType} from "./IShowViewTradeModalAction";

type State = ViewTradeModalStore
type Actions = ViewTradeModalActions

function viewTrade(state: State, action: IShowViewTradeModalAction): State {
    return action.payload;
}

export function viewTradeModalReducer(
    state: State = initialViewTradeModalStore,
    action: Actions
): State {
    switch (action.type) {
        case ShowViewTradeModalType:
            return viewTrade(state, action as IShowViewTradeModalAction);
        default:
            return state;
    }
}

