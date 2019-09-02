import Order from "../../../models/Order";
import BlotterSetCategoryAction from "./BlotterSetCategoryAction";
import CancelOrderAction from "./CancelOrderAction";
import ConfirmTradeAction from "../../modals/trade/ConfirmTradeAction";
import SetOrdersAction from "./SetOrdersAction";

export default interface BlotterStore {
    readonly orders: Array<Order>;
    readonly showState: string;
}

export const initialBlotterStore: BlotterStore = {
    orders: [],
    showState: "pending",
};

export type BlotterActions = BlotterSetCategoryAction | CancelOrderAction | ConfirmTradeAction | SetOrdersAction