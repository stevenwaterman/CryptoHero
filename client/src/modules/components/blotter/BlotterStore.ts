import Trade from "../../../models/Trade";
import BlotterSetCategoryAction from "./BlotterSetCategoryAction";
import CancelOrderAction from "./CancelOrderAction";
import ConfirmTradeAction from "../../modals/trade/ConfirmTradeAction";

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