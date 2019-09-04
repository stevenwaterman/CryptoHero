import {CreateAccountAction} from "./CreateAccountAction";
import SetSelectedAccountAction from "./SetSelectedAccountAction";
import SetAccountListenerIdAction from "./SetAccountListenerIdAction";

export default interface AccountStore {
    readonly selectedId: string;
    readonly listenerId: [string, string, string];
    readonly accounts: Array<string>;
}

export const initialAccountStore: AccountStore = {
    selectedId: "",
    listenerId: ["", "", ""],
    accounts: []
};

export type AccountActions = SetSelectedAccountAction | CreateAccountAction | SetAccountListenerIdAction