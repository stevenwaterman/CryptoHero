import Trade from "../../models/Trade";
import BlotterSetCategoryAction from "../reducers/blotter/BlotterSetCategoryAction";
import CancelOrderAction from "../reducers/blotter/CancelOrderAction";

export default interface BlotterStore {
    readonly completed: Array<Trade>;
    readonly pending: Array<Trade>;
    readonly showPending: boolean;
}

export const initialBlotterStore: BlotterStore = {
    completed: [],
    pending: [],
    showPending: false,
};

export type BlotterActions = BlotterSetCategoryAction | CancelOrderAction