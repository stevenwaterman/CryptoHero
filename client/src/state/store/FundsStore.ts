import IDepositFundsAction from "../reducers/funds/IDepositAction";
import IWithdrawFundsAction from "../reducers/funds/IWithdrawAction";

export default interface FundsStore {
    readonly availableFunds: Array<[string, number]>;
}

export const initialFundsStore: FundsStore = {
    availableFunds: [
        ["GBP", 1123.34],
        ["BTC", 185.27],
        ["LTC", 1123.62],
        ["ETH", 94.175],
        ["DASH", 352.126]
    ],
};

export type FundsActions = IDepositFundsAction | IWithdrawFundsAction