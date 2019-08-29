import AccountStore, {AccountActions, initialAccountStore} from "./AccountStore";
import RootStore from "../RootStore";
import {createAccountAction, SetAccountAction, SetAccountType} from "./SetAccountAction";

type StateSlice = AccountStore
type Actions = AccountActions

function setAccount(state: StateSlice, action: SetAccountAction): StateSlice {
    console.log("setting account");
    return {
        ...state,
        id: action.payload.accountId
    };
}

export function accountReducer(
    state: StateSlice = initialAccountStore,
    action: Actions
): StateSlice {
    switch (action.type) {
        case SetAccountType:
            return setAccount(state, action as SetAccountAction);
        default:
            return state;
    }
}
