import {State} from "../RootStore";

export const SetSelectedAccountType: string = "SET_SELECTED_ACCOUNT";

export default interface SetSelectedAccountAction {
    type: typeof SetSelectedAccountType
    payload: {
        selectedAccountId: string
    }
}

export function createSetSelectedAccountAction(state: State, selectedAccountId: string): SetSelectedAccountAction {
    return {
        type: SetSelectedAccountType,
        payload: {
            selectedAccountId: selectedAccountId
        }
    }
}
