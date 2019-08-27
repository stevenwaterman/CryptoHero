import Instrument from "../../../models/Instrument";
import ShowTradeModalAction from "../../reducers/modal/trade/ShowTradeModalAction";
import ConfirmTradeAction from "../../reducers/modal/trade/ConfirmTradeAction";

export default interface TradeModalStore {
    readonly buying: boolean,
    readonly instrument: Instrument,
}

export const initialTradeModalStore: TradeModalStore = {
    buying: true,
    instrument: new Instrument("GBP", "BTC"),
};

export type TradeModalActions =
    ShowTradeModalAction
    | ConfirmTradeAction
