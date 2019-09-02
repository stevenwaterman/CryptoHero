import {CreateAccountAction} from "./CreateAccountAction";
import SetSelectedAccountAction from "./SetSelectedAccountAction";

export default interface AccountStore {
    readonly selectedId: string;
    readonly accounts: Array<string>;
}

export const initialAccountStore: AccountStore = {
    selectedId: "",
    accounts: []
};

export type AccountActions = SetSelectedAccountAction | CreateAccountAction