import {initialTradeModalStore} from "../../../store/modal/TradeModalStore";
import IConfirmWithdrawAction, {ConfirmWithdrawType} from "./IConfirmWithdrawAction";
import WithdrawModalStore, {WithdrawModalActions} from "../../../store/modal/WithdrawModalStore";

type State = WithdrawModalStore
type Actions = WithdrawModalActions

export function withdrawModalReducer(
    state: State = initialTradeModalStore,
    action: Actions
): State {
    switch (action.type) {
        case ConfirmWithdrawType:
            return confirmWithdraw(state, action as IConfirmWithdrawAction);
        default:
            return state;
    }
}

function confirmWithdraw(state: State, action: IConfirmWithdrawAction): State {
    //TODO
    return state;
}


