import TradeModalStore, {initialTradeModalStore, TradeModalActions} from "../../../store/modal/TradeModalStore";
import IStartTradeAction, {StartTradeType} from "./IStartTradeAction";
import IConfirmTradeAction, {ConfirmTradeType} from "./IConfirmTradeAction";

type State = TradeModalStore
type Actions = TradeModalActions

export function tradeModalReducer(
    state: State = initialTradeModalStore,
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
    //TODO
    return state;
}

function startTrade(state: State, action: IStartTradeAction): State {
    const {instrument, buying} = action.payload;
    return {
        buying: buying,
        instrument: instrument,
    }
}