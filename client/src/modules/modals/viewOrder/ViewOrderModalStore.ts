import Instrument from "../../../models/Instrument";
import ShowViewOrderModalAction from "./ShowViewOrderModalAction";
import Order from "../../../models/Order";

export default interface ViewOrderModalStore {
    readonly order: Order
}

export const initialViewTradeModalStore: ViewOrderModalStore = {
    order: new Order(
        "",
        new Date(),
        new Instrument("LTCGBPNA", "LTCGBPNA"),
        true,
        1,
        1,
        1,
        1
    )
};

export type ViewTradeModalActions =
    ShowViewOrderModalAction
