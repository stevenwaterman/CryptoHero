import IStartTradeAction from "../reducers/trade/IStartTradeAction";
import Instrument from "../../models/Instrument";

export default interface TradeStore {
    readonly buying: boolean,
    readonly instrument: Instrument,
    readonly price: string
}

export const initialTradeStore: TradeStore = {
    buying: true, instrument: new Instrument("GBP", "BTC"), price: "0"
};

export type TradeActions = IStartTradeAction