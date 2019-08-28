import Instrument from "../../../models/Instrument";
import ShowViewTradeModalAction from "../../reducers/modal/viewTrade/ShowViewTradeModalAction";
import Trade from "../../../models/Trade";
import ShowTotalFundsModalAction from "../../reducers/modal/totalFunds/ShowTotalFundsModalAction";

export default interface TotalFundsModalStore {
    readonly funds: Map<string, number>
}

export const initialTotalFundsModalStore: TotalFundsModalStore = {
    funds: new Map()
};

export type TotalFundsModalActions =
    ShowTotalFundsModalAction
