import Trade from "../../models/Trade";
import BlotterSetCategoryAction from "../reducers/blotter/BlotterSetCategoryAction";
import CancelOrderAction from "../reducers/blotter/CancelOrderAction";
import ConfirmTradeAction from "../reducers/modal/trade/ConfirmTradeAction";

export default interface BlotterStore {
    readonly completed: Array<Trade>;
    readonly pending: Array<Trade>;
    readonly showPending: boolean;
}

export const initialBlotterStore: BlotterStore = {
    completed: [],
    pending: [],
    showPending: true,
};

export type BlotterActions = BlotterSetCategoryAction | CancelOrderAction | ConfirmTradeAction