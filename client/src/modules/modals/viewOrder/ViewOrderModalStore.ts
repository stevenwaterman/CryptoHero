import Instrument from "../../../models/Instrument";
import ShowViewOrderModalAction from "./ShowViewOrderModalAction";
import Order from "../../../models/Order";

export default interface ViewOrderModalStore {
    readonly order: Order
}

export const initialViewTradeModalStore: ViewOrderModalStore = {
    order: new Order(
        "NA",
        new Date(),
        new Instrument("NA", "NA"),
        true,
        1,
        1,
        "NA",
        1,
        1
    )
};

export type ViewTradeModalActions =
    ShowViewOrderModalAction
