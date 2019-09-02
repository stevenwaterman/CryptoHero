import TradeModalStore, {initialTradeModalStore, TradeModalActions} from "./TradeModalStore";
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
        default:
            return state;
    }
}

function startTrade(state: State, action: ShowTradeModalAction): State {
    const {instrument, buying} = action.payload;
    return {
        instrument: instrument,
        buying: buying
    }
}