import TradeModalStore, {initialTradeModalStore, TradeModalActions} from "../../../store/modal/TradeModalStore";
import ShowTradeModalAction, {ShowTradeModalType} from "./ShowTradeModalAction";
import ConfirmTradeAction, {ConfirmTradeType} from "./ConfirmTradeAction";

type State = TradeModalStore
type Actions = TradeModalActions

export function tradeModalReducer(
    state: State = initialTradeModalStore,
    action: Actions
): State {
    switch (action.type) {
        case ShowTradeModalType:
            return startTrade(state, action as ShowTradeModalAction);
        case ConfirmTradeType:
            return confirmTrade(state, action as ConfirmTradeAction);
        default:
            return state;
    }
}

function confirmTrade(state: State, action: ConfirmTradeAction): State {
    //TODO
    return state;
}

function startTrade(state: State, action: ShowTradeModalAction): State {
    const {instrument, buying} = action.payload;
    return {
        ...state,
        instrument: instrument,
        buying: buying
    }
}