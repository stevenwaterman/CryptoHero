import {initialTradeModalStore} from "../../../store/modal/TradeModalStore";
import IConfirmDepositAction, {ConfirmDepositType} from "./IConfirmDepositAction";
import DepositModalStore, {DepositModalActions} from "../../../store/modal/DepositModalStore";

type State = DepositModalStore
type Actions = DepositModalActions

export function depositModalReducer(
    state: State = initialTradeModalStore,
    action: Actions
): State {
    switch (action.type) {
        case ConfirmDepositType:
            return confirmDeposit(state, action as IConfirmDepositAction);
        default:
            return state;
    }
}

function confirmDeposit(state: State, action: IConfirmDepositAction): State {
    //TODO
    return state;
}


