import ConfirmDepositAction from "./ConfirmDepositAction";
import ConfirmWithdrawAction from "./ConfirmWithdrawAction";
import ShowTotalFundsModalAction from "../../modals/totalFunds/ShowTotalFundsModalAction";
import CancelOrderAction from "../blotter/CancelOrderAction";

export default interface AvailableFundsStore {
    readonly availableFunds: Map<string, number>;
}

export const initialFundsStore: AvailableFundsStore = {
    availableFunds: new Map([
        ["GBP", 1123.34],
        ["BTC", 185.27],
        ["LTC", 1123.62],
        ["ETH", 94.175],
        ["DASH", 352.126]
    ]),
};

export type FundsActions = ConfirmDepositAction | ConfirmWithdrawAction | CancelOrderAction