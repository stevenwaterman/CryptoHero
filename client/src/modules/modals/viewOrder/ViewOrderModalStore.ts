import Instrument from "../../../models/Instrument";
import ShowViewOrderModalAction from "./ShowViewOrderModalAction";
import Order from "../../../models/Order";

export default interface ViewOrderModalStore {
    readonly order: Order
}

export const initialViewTradeModalStore: ViewOrderModalStore = {
    order: new Order(
        "6a3ef434-26cb-40d5-9844-ca189a83c177",
        new Date(),
        new Instrument("BTC", "GBP"),
        true,
        100000,
        1.523,
        68000,
        1.514
    )
};

export type ViewTradeModalActions =
    ShowViewOrderModalAction
