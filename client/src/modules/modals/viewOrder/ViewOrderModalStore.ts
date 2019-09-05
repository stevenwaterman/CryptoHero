import Instrument from "../../../models/Instrument";
import ShowViewOrderModalAction from "./ShowViewOrderModalAction";
import Order from "../../../models/Order";
import Big from "big.js"

export default interface ViewOrderModalStore {
    readonly order: Order
}

export const initialViewTradeModalStore: ViewOrderModalStore = {
    order: new Order(
        "NA",
        new Date(),
        new Instrument("NA", "NA"),
        true,
        Big(1),
        Big(1),
        "NA",
        Big(1),
        Big(1)
    )
};

export type ViewTradeModalActions =
    ShowViewOrderModalAction
