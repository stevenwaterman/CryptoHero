import Order from "../../../models/Order";
import BlotterSetCategoryAction from "./BlotterSetCategoryAction";
import CancelOrderAction from "./CancelOrderAction";
import ConfirmTradeAction from "../../modals/trade/ConfirmTradeAction";
import SetOrdersAction from "./SetOrdersAction";

export default interface BlotterStore {
    readonly orders: Array<Order>;
    readonly showPending: boolean;
}

export const initialBlotterStore: BlotterStore = {
    orders: [],
    showPending: true,
};

export type BlotterActions = BlotterSetCategoryAction | CancelOrderAction | ConfirmTradeAction | SetOrdersAction