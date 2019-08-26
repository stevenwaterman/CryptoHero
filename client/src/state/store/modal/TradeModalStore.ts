import Instrument from "../../../models/Instrument";
import IShowTradeModalAction from "../../reducers/modal/trade/IShowTradeModalAction";
import IConfirmTradeAction from "../../reducers/modal/trade/IConfirmTradeAction";

export default interface TradeModalStore {
    readonly buying: boolean,
    readonly instrument: Instrument,
}

export const initialTradeModalStore: TradeModalStore = {
    buying: true,
    instrument: new Instrument("GBP", "BTC"),
};

export type TradeModalActions =
    IShowTradeModalAction
    | IConfirmTradeAction
