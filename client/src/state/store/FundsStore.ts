import ConfirmDepositAction from "../reducers/funds/ConfirmDepositAction";
import ConfirmWithdrawAction from "../reducers/funds/ConfirmWithdrawAction";
import ShowTotalFundsModalAction from "../reducers/modal/totalFunds/ShowTotalFundsModalAction";
import CancelOrderAction from "../reducers/blotter/CancelOrderAction";

export default interface FundsStore {
    readonly availableFunds: Map<string, number>;
}

export const initialFundsStore: FundsStore = {
    availableFunds: new Map([
        ["GBP", 1123.34],
        ["BTC", 185.27],
        ["LTC", 1123.62],
        ["ETH", 94.175],
        ["DASH", 352.126]
    ]),
};

export type FundsActions = ConfirmDepositAction | ConfirmWithdrawAction | CancelOrderAction