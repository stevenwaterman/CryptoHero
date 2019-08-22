import TradeStore, {initialTradeStore, TradeActions} from "../../store/TradeStore";
import IStartTradeAction, {StartTradeType} from "./IStartTradeAction";

type State = TradeStore
type Actions = TradeActions

export function tradeReducer(
    state: State = initialTradeStore,
    action: Actions
): State {
    switch (action.type) {
        case StartTradeType:
            return startTrade(state, <IStartTradeAction>action);
        default:
            return state;
    }
}

function startTrade(state: State, action: IStartTradeAction): State {
    const {instrument, buying, price} = action.payload;
    return {
        buying: buying, instrument: instrument, price: price

    }
}

