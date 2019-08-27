import ConfirmDepositAction from "../reducers/funds/ConfirmDepositAction";
import ConfirmWithdrawAction from "../reducers/funds/ConfirmWithdrawAction";
import ShowTotalFundsModalAction from "../reducers/modal/totalFunds/ShowTotalFundsModalAction";

export default interface FundsStore {
    readonly availableFunds: Array<[string, number]>;
    readonly totalFunds: Array<[string, number]>;
}

export const initialFundsStore: FundsStore = {
    availableFunds: [
        ["GBP", 1123.34],
        ["BTC", 185.27],
        ["LTC", 1123.62],
        ["ETH", 94.175],
        ["DASH", 352.126]
    ],
    totalFunds: [
        ["GBP", 1123.34],
        ["BTC", 185.27],
        ["LTC", 1123.62],
        ["ETH", 94.175],
        ["DASH", 352.126]
    ]
};

export type FundsActions = ConfirmDepositAction | ConfirmWithdrawAction | ShowTotalFundsModalAction