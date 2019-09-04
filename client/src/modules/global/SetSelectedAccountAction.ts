import {State} from "../RootStore";
import {getSocket} from "../../WebSockets";

export const SetSelectedAccountType: string = "SET_SELECTED_ACCOUNT";

export default interface SetSelectedAccountAction {
    type: typeof SetSelectedAccountType
    payload: {
        selectedAccountId: string
    }
}

export function createSetSelectedAccountAction(state: State, selectedAccountId: string): SetSelectedAccountAction {
    getSocket().emit("account listener stop", state.account.selectedId, state.account.listenerId);
    getSocket().emit("account listener start", selectedAccountId, selectedAccountId);
    return {
        type: SetSelectedAccountType,
        payload: {
            selectedAccountId: selectedAccountId
        }
    }
}
