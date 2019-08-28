import Order from "../../../models/Order";
import BlotterSetCategoryAction from "./BlotterSetCategoryAction";
import CancelOrderAction from "./CancelOrderAction";
import ConfirmTradeAction from "../../modals/trade/ConfirmTradeAction";

export default interface BlotterStore {
    readonly completed: Array<Order>;
    readonly pending: Array<Order>;
    readonly showPending: boolean;
}

export const initialBlotterStore: BlotterStore = {
    completed: [],
    pending: [],
    showPending: true,
};

export type BlotterActions = BlotterSetCategoryAction | CancelOrderAction | ConfirmTradeAction