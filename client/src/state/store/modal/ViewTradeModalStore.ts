import Instrument from "../../../models/Instrument";
import ShowViewTradeModalAction from "../../reducers/modal/viewTrade/ShowViewTradeModalAction";
import Trade from "../../../models/Trade";

export default interface ViewTradeModalStore {
    readonly trade: Trade
}

export const initialViewTradeModalStore: ViewTradeModalStore = {
    trade: new Trade(
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
    ShowViewTradeModalAction
