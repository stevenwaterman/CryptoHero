import Instrument from "../../../models/Instrument";
import ShowViewTradeModalAction from "../../reducers/modal/viewTrade/ShowViewTradeModalAction";
import Trade from "../../../models/Trade";

export default interface ViewTradeModalStore {
    readonly trade: Trade
}

export const initialViewTradeModalStore: ViewTradeModalStore = {
    trade: new Trade("123", new Instrument("BTC", "GBP"), new Date(), 1, 1, true)
};

export type ViewTradeModalActions =
    ShowViewTradeModalAction
