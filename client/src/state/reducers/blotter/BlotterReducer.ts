import IBlotterShowPendingAction, {BlotterShowPendingType} from "./IBlotterShowPendingAction";
import {withChanges} from "../../../util/WithChanges";
import IBlotterShowCompletedAction, {BlotterShowCompletedType} from "./IBlotterShowCompletedAction";
import BlotterStore, {BlotterActions, initialBlotterStore} from "../../store/BlotterStore";
import ICancelOrderAction, {CancelOrderType} from "./ICancelOrderAction";

type State = BlotterStore
type Actions = BlotterActions

export function blotterReducer(
    state: State = initialBlotterStore,
    action: Actions
): State {
    switch (action.type) {
        case BlotterShowCompletedType:
            return showCompleted(state, action as IBlotterShowCompletedAction);
        case BlotterShowPendingType:
            return showPending(state, action as IBlotterShowPendingAction);
        case CancelOrderType:
            return cancelOrder(state, action as ICancelOrderAction);
        default:
            return state;
    }
}

function showCompleted(state: State, action: IBlotterShowCompletedAction): State {
    return withChanges(state, {
        showCompleted: true,
    });
}

function showPending(state: State, action: IBlotterShowPendingAction): State {
    return withChanges(state, {
        showCompleted: false,
    });
}

function cancelOrder(state: State, action: ICancelOrderAction): State {
    const newPending = state.pending.filter(it => it.id !== action.payload.id);
    return withChanges(state, {
        pending: newPending
    });
}

