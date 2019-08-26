import TradeSimple from "../../models/TradeSimple";
import IBlotterShowPendingAction from "../reducers/blotter/IBlotterShowPendingAction";
import IBlotterShowCompletedAction from "../reducers/blotter/IBlotterShowCompletedAction";
import ICancelOrderAction from "../reducers/blotter/ICancelOrderAction";

export default interface BlotterStore {
    readonly completed: Array<TradeSimple>;
    readonly pending: Array<TradeSimple>;
    readonly showCompleted: boolean;
}

export const initialBlotterStore: BlotterStore = {
    completed: [],
    pending: [],
    showCompleted: false,
};

export type BlotterActions = IBlotterShowPendingAction | IBlotterShowCompletedAction | ICancelOrderAction