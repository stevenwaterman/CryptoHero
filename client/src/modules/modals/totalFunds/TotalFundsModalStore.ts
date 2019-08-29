import Instrument from "../../../models/Instrument";
import ShowViewOrderModalAction from "../viewOrder/ShowViewOrderModalAction";
import Order from "../../../models/Order";
import ShowTotalFundsModalAction from "./ShowTotalFundsModalAction";

export default interface TotalFundsModalStore {
    readonly funds: Map<string, number>
}

export const initialTotalFundsModalStore: TotalFundsModalStore = {
    funds: new Map()
};

export type TotalFundsModalActions =
    ShowTotalFundsModalAction
