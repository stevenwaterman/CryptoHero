import {State} from "../../RootStore";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {createLoadAction} from "../../global/LoadAccountAction";

export const ConfirmWithdrawType: string = "CONFIRM_WITHDRAW";

export default interface ConfirmWithdrawAction {
    type: typeof ConfirmWithdrawType
}

export const createConfirmWithdrawAction = (): ThunkAction<Promise<void>, State, void, Action<any>> => {
    return async (dispatch: ThunkDispatch<State, void, Action<any>>, getState: () => State): Promise<void> => {
        const state = getState();
        await fetch(`http://localhost:4000/api/account/${state.account.selectedId}/assets/${state.withdrawModalInput.asset}/withdraw`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                units: state.withdrawModalInput.units.toString()
            })
        });
        dispatch({
            type: ConfirmWithdrawType
        });

        await dispatch(createLoadAction(state.account.selectedId));
    }
};