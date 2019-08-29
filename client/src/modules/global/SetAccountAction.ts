import {State} from "../RootStore";
import {ThunkAction, ThunkDispatch} from "redux-thunk"

export const SetAccountType = "SET_ACCOUNT";

export interface SetAccountAction{
    type: typeof SetAccountType,
    payload: {
        accountId: string
    }
}

export const createAccountAction = (): ThunkAction<Promise<void>, State, void, SetAccountAction> => {
    return async (dispatch: ThunkDispatch<void, State, SetAccountAction>): Promise<void> => {
        console.log("Promise returned");
        const response: Response = await fetch("http://localhost:4000/api/account/create", {
            method: "POST",
            headers: {},
        });
        console.log("Got Response");
        console.log(response);
        const accountId: string = await response.json() as string;
        console.log("Got Account ID");
        console.log(accountId);
        const action: SetAccountAction = {
            type: SetAccountType,
            payload: {
                accountId: accountId
            }
        };
        console.log("Created Action");
        console.log(action);
        dispatch(action);
    }
};
