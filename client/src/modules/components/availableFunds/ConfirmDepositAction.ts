import {State} from "../../RootStore";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {createLoadAction} from "../../global/LoadAccountAction";

export const ConfirmDepositType: string = "CONFIRM_DEPOSIT";

export default interface ConfirmDepositAction {
    type: typeof ConfirmDepositType
}

export const createConfirmDepositAction = (): ThunkAction<Promise<void>, State, void, Action<any>> => {
    return async (dispatch: ThunkDispatch<State, void, Action<any>>, getState: () => State): Promise<void> => {
        const state = getState();
        await fetch(`http://localhost:4000/api/account/${state.account.selectedId}/assets/${state.depositModalInput.asset}/deposit`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                units: state.depositModalInput.units.toString()
            })
        });

        dispatch({
            type: ConfirmDepositType
        });

        await dispatch(createLoadAction(state.account.selectedId));
    }
};