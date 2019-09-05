import ShowTotalFundsModalAction from "./ShowTotalFundsModalAction";
import Big from "big.js";

export default interface TotalFundsModalStore {
    readonly funds: Map<string, Big>
}

export const initialTotalFundsModalStore: TotalFundsModalStore = {
    funds: new Map()
};

export type TotalFundsModalActions =
    ShowTotalFundsModalAction
