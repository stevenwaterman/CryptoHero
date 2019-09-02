import {State} from "../../RootStore";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {createLoadAction} from "../../global/LoadAccountAction";
import {Action} from "redux";

export const ConfirmTradeType: string = "TRADE_CONFIRM";

export default interface ConfirmTradeAction {
    type: typeof ConfirmTradeType
}

export const createConfirmTradeAction = (): ThunkAction<Promise<void>, State, void, Action<any>> => {
    return async (dispatch: ThunkDispatch<State, void, Action<any>>, getState: () => State): Promise<void> => {
        const state = getState();
        await fetch("http://localhost:4000/api/orders/place", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                account: state.account.selectedId,
                direction: state.tradeModal.buying ? "buy" : "sell",
                instrument: state.tradeModal.instrument.name,
                units: state.tradeModalInput.units,
                unitPrice: state.tradeModalInput.price,
            })
        });
        await dispatch(createLoadAction(state.account.selectedId));
        dispatch({
            type: ConfirmTradeType
        })
    }
};
