import Instrument from "../../../models/Instrument";
import ShowViewTradeModalAction from "../viewTrade/ShowViewTradeModalAction";
import Trade from "../../../models/Trade";
import ShowTotalFundsModalAction from "./ShowTotalFundsModalAction";

export default interface TotalFundsModalStore {
    readonly funds: Map<string, number>
}

export const initialTotalFundsModalStore: TotalFundsModalStore = {
    funds: new Map()
};

export type TotalFundsModalActions =
    ShowTotalFundsModalAction
