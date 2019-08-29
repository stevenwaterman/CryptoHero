import {SetAccountAction} from "./SetAccountAction";

export default interface AccountStore {
    readonly id: string;
}

export const initialAccountStore: AccountStore = {
    id: "not set"
};

export type AccountActions = SetAccountAction