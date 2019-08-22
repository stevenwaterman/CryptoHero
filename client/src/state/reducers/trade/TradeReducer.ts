import TradeStore, {initialTradeStore, TradeActions} from "../../store/TradeStore";
import IStartTradeAction, {StartTradeType} from "./IStartTradeAction";
import IConfirmTradeAction, {ConfirmTradeType} from "./IConfirmTradeAction";

type State = TradeStore
type Actions = TradeActions

export function tradeReducer(
    state: State = initialTradeStore,
    action: Actions
): State {
    switch (action.type) {
        case StartTradeType:
            return startTrade(state, action as IStartTradeAction);
        case ConfirmTradeType:
            return confirmTrade(state, action as IConfirmTradeAction);
        default:
            return state;
    }
}

function confirmTrade(state: State, action: IConfirmTradeAction): State {
    return state;
}

function startTrade(state: State, action: IStartTradeAction): State {
    const {instrument, buying, price} = action.payload;
    return {
        buying: buying, instrument: instrument, price: price
    }
}

