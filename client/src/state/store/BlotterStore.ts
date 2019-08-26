import TradeSimple from "../../models/TradeSimple";
import IBlotterSetCategoryAction from "../reducers/blotter/IBlotterSetCategoryAction";
import ICancelOrderAction from "../reducers/blotter/ICancelOrderAction";

export default interface BlotterStore {
    readonly completed: Array<TradeSimple>;
    readonly pending: Array<TradeSimple>;
    readonly showPending: boolean;
}

export const initialBlotterStore: BlotterStore = {
    completed: [],
    pending: [],
    showPending: false,
};

export type BlotterActions = IBlotterSetCategoryAction | ICancelOrderAction