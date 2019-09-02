import Instrument from "../../../models/Instrument";
import ShowTradeModalAction from "./ShowTradeModalAction";
import ConfirmTradeAction from "./ConfirmTradeAction";

export default interface TradeModalStore {
    readonly buying: boolean,
    readonly instrument: Instrument,
}

export const initialTradeModalStore: TradeModalStore = {
    buying: true,
    instrument: new Instrument("LTCGBPNA", "LTCGBPNA"),
};

export type TradeModalActions =
    ShowTradeModalAction
    | ConfirmTradeAction
