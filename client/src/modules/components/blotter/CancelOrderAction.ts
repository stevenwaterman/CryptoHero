import {State} from "../../RootStore";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {Action} from "redux";

export const CancelOrderType: string = "CANCEL_ORDER";

export default interface CancelOrderAction {
    type: typeof CancelOrderType,
}

export const createCancelOrderAction = (): ThunkAction<Promise<void>, State, void, Action<any>> => {
    return async (dispatch: ThunkDispatch<State, void, Action<any>>, getState: () => State): Promise<void> => {
        const state = getState();
        await fetch(`http://localhost:4000/api/orders/${state.viewOrderModal.order.id}/cancel`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });
        dispatch({
            type: CancelOrderType
        })
    }
};
