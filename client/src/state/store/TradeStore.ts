import Instrument from "../../models/Instrument";
import IStartTradeAction from "../reducers/trade/IStartTradeAction";
import IConfirmTradeAction from "../reducers/trade/IConfirmTradeAction";

export default interface TradeStore {
    readonly buying: boolean,
    readonly instrument: Instrument,
    readonly price: number
}

export const initialTradeStore: TradeStore = {
    buying: true, instrument: new Instrument("GBP", "BTC"), price: 0
};

export type TradeActions = IStartTradeAction | IConfirmTradeAction