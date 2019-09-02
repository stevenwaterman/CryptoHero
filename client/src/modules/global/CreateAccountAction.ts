import {State} from "../RootStore";
import {ThunkAction, ThunkDispatch} from "redux-thunk"
import {Action} from "redux";
import {createLoadAction} from "./LoadAccountAction";

export const CreateAccountType = "CREATE_ACCOUNT";

export interface CreateAccountAction {
    type: typeof CreateAccountType,
    payload: {
        accountId: string
    }
}

export const createCreateAccountAction = (): ThunkAction<Promise<void>, State, void, Action<any>> => {
    return async (dispatch: ThunkDispatch<State, void, Action<any>>): Promise<void> => {
        const response: Response = await fetch("http://localhost:4000/api/account/create", {
            method: "POST",
            headers: {},
        });

        const accountId: string = await response.json() as string;
        dispatch({
            type: CreateAccountType,
            payload: {
                accountId: accountId
            }
        });
        await dispatch(createLoadAction(accountId));
    }
};
