import TradeModalStore, {initialTradeModalStore, TradeModalActions} from "../../../store/modal/TradeModalStore";
import IShowTradeModalAction, {ShowTradeModalType} from "./IShowTradeModalAction";
import IConfirmTradeAction, {ConfirmTradeType} from "./IConfirmTradeAction";

type State = TradeModalStore
type Actions = TradeModalActions

export function tradeModalReducer(
    state: State = initialTradeModalStore,
    action: Actions
): State {
    switch (action.type) {
        case ShowTradeModalType:
            return startTrade(state, action as IShowTradeModalAction);
        case ConfirmTradeType:
            return confirmTrade(state, action as IConfirmTradeAction);
        default:
            return state;
    }
}

function confirmTrade(state: State, action: IConfirmTradeAction): State {
    //TODO
    return state;
}

function startTrade(state: State, action: IShowTradeModalAction): State {
    const {instrument, buying} = action.payload;
    return {
        ...state,
        instrument: instrument,
        buying: buying
    }
}