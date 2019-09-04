import AccountStore, {AccountActions, initialAccountStore} from "./AccountStore";
import {CreateAccountAction, CreateAccountType} from "./CreateAccountAction";
import SetSelectedAccountAction, {SetSelectedAccountType} from "./SetSelectedAccountAction";
import SetAccountListenerIdAction, {SetAccountListenerIdType} from "./SetAccountListenerIdAction";

type StateSlice = AccountStore
type Actions = AccountActions

function createAccount(state: StateSlice, action: CreateAccountAction): StateSlice {
    return {
        ...state,
        selectedId: action.payload.accountId,
        accounts: state.accounts.concat(action.payload.accountId)
    };
}

function setAccount(state: StateSlice, action: SetSelectedAccountAction): StateSlice {
    return {
        ...state,
        selectedId: action.payload.selectedAccountId
    };
}

function setAccountListener(state: StateSlice, action: SetAccountListenerIdAction): StateSlice {
    return {
        ...state,
        listenerId: action.payload.accountListenerId
    };
}

export function accountReducer(
    state: StateSlice = initialAccountStore,
    action: Actions
): StateSlice {
    switch (action.type) {
        case CreateAccountType:
            return createAccount(state, action as CreateAccountAction);
        case SetSelectedAccountType:
            return setAccount(state, action as SetSelectedAccountAction);
        case SetAccountListenerIdType:
            return setAccountListener(state, action as SetAccountListenerIdAction);
        default:
            return state;
    }
}
